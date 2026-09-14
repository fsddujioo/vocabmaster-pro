// Module Từ Điển Thông Minh (Cambridge & Translation Integration)
// Tự động sinh đầy đủ thông tin: IPA UK/US, Nghĩa tiếng Việt, Định nghĩa Cambridge,
// Cấp độ CEFR, Câu ví dụ song ngữ, Collocations và Lưu ý ngữ pháp chỉ từ Từ Vựng & Từ Loại.

class DictionaryService {
  constructor() {
    this.cacheKey = 'vocabmaster_dict_cache_v4';
    this.memoryCache = this.loadCache();
  }

  loadCache() {
    let cache = {};
    try {
      const data = localStorage.getItem(this.cacheKey);
      if (data) cache = JSON.parse(data);
    } catch (e) {
      cache = {};
    }
    // Nạp sẵn từ mẫu Cambridge nếu có
    if (typeof SAMPLE_DATA !== 'undefined' && SAMPLE_DATA.cards) {
      SAMPLE_DATA.cards.forEach(c => {
        const w = c.word.toLowerCase();
        if (!cache[w]) {
          cache[w] = {
            word: c.word,
            wordType: c.wordType || 'noun',
            cefrLevel: c.cefrLevel || 'B1',
            ipaUk: c.ipaUk || `/${c.word}/`,
            ipaUs: c.ipaUs || `/${c.word}/`,
            audioUkUrl: c.audioUkUrl || '',
            audioUsUrl: c.audioUsUrl || '',
            primaryMeaningVi: c.primaryMeaningVi || '',
            primaryMeaningEn: c.primaryMeaningEn || '',
            definitions: c.definitions || [],
            usageNotes: c.usageNotes || ''
          };
        }
      });
    }
    return cache;
  }

  saveCache() {
    try {
      localStorage.setItem(this.cacheKey, JSON.stringify(this.memoryCache));
    } catch (e) {
      // ignore
    }
  }

  // Dịch thuật nhanh qua Google Translate API công khai
  async translateToVietnamese(text) {
    if (!text || !navigator.onLine) return '';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data && data[0]) {
          return data[0].map(item => item[0]).join('').trim();
        }
      }
    } catch (e) {
      console.warn('[Dictionary] Lỗi dịch tiếng Việt:', e);
    }
    return '';
  }

  // Ước lượng cấp độ CEFR (A1 -> C1) dựa trên độ dài & từ vựng học thuật
  estimateCefrLevel(word, length) {
    const w = word.toLowerCase().trim();
    const c1Words = ['eloquent', 'scrutinize', 'substantiate', 'ubiquitous', 'paradigm', 'meticulous', 'anomaly', 'pragmatic', 'juxtapose', 'ephemeral', 'mitigate', 'profound', 'lucid', 'advocate', 'comprehensive', 'resilience', 'perseverance', 'unprecedented'];
    const b2Words = ['collaborate', 'hospitable', 'plausible', 'dividend', 'revenue', 'delegate', 'coincide', 'implement', 'subsequent', 'criteria', 'innovate', 'feasible', 'integrity', 'sustainable', 'infrastructure'];
    const b1Words = ['negotiate', 'efficient', 'feedback', 'itinerary', 'breathtaking', 'frequently', 'essential', 'challenge', 'recommend', 'achieve', 'environment', 'confidence', 'strategy'];
    const a2Words = ['deadline', 'destination', 'journey', 'schedule', 'improve', 'prepare', 'comfortable', 'popular', 'experience'];

    if (c1Words.includes(w)) return 'C1';
    if (b2Words.includes(w)) return 'B2';
    if (b1Words.includes(w)) return 'B1';
    if (a2Words.includes(w)) return 'A2';

    if (length <= 4) return 'A1';
    if (length <= 6) return 'A2';
    if (length <= 9) return 'B1';
    if (length <= 12) return 'B2';
    return 'C1';
  }

  // TỰ ĐỘNG SINH TOÀN BỘ THÔNG TIN CHI TIẾT KHI NGƯỜI DÙNG CHỈ CUNG CẤP TỪ VÀ TỪ LOẠI
  async autoEnrichWord(rawWord, preferredType = 'noun') {
    const word = rawWord.trim();
    const wLower = word.toLowerCase();
    const cleanType = (preferredType && preferredType !== 'auto') ? preferredType : 'noun';

    // 1. Kiểm tra cache trước
    if (this.memoryCache[wLower] && this.memoryCache[wLower].primaryMeaningVi) {
      const cached = { ...this.memoryCache[wLower] };
      if (cleanType) cached.wordType = cleanType;
      return cached;
    }

    let ipaUk = '';
    let ipaUs = '';
    let audioUkUrl = '';
    let audioUsUrl = '';
    let primaryMeaningEn = '';
    let detectedType = cleanType;
    let definitions = [];
    let exampleEn = '';
    let exampleVi = '';
    let primaryMeaningVi = '';

    // 2. Tra cứu song song: Từ điển API + Dịch nghĩa tiếng Việt
    const [dictResult, viMeaningResult] = await Promise.allSettled([
      this.fetchDictionaryApi(wLower),
      this.translateToVietnamese(wLower)
    ]);

    if (viMeaningResult.status === 'fulfilled' && viMeaningResult.value) {
      primaryMeaningVi = viMeaningResult.value.toLowerCase();
    }

    if (dictResult.status === 'fulfilled' && dictResult.value) {
      const apiData = dictResult.value;
      if (apiData && apiData.length > 0) {
        const entry = apiData[0];

        // Lấy IPA & Audio
        if (entry.phonetics && entry.phonetics.length > 0) {
          for (const ph of entry.phonetics) {
            const audio = ph.audio || '';
            const text = ph.text || '';
            if (audio.includes('-uk') || audio.includes('uk/')) {
              audioUkUrl = audio;
              if (text) ipaUk = text;
            } else if (audio.includes('-us') || audio.includes('us/')) {
              audioUsUrl = audio;
              if (text) ipaUs = text;
            }
            if (!ipaUk && text) ipaUk = text;
            if (!ipaUs && text) ipaUs = text;
            if (!audioUkUrl && audio) audioUkUrl = audio;
            if (!audioUsUrl && audio) audioUsUrl = audio;
          }
        }

        // Lấy định nghĩa Cambridge & Ví dụ theo từ loại
        if (entry.meanings && entry.meanings.length > 0) {
          // Ưu tiên nghĩa trùng với preferredType nếu có
          let matchedMeaningGroup = entry.meanings.find(m => m.partOfSpeech === cleanType);
          if (!matchedMeaningGroup) matchedMeaningGroup = entry.meanings[0];

          detectedType = matchedMeaningGroup.partOfSpeech || cleanType;

          for (let i = 0; i < Math.min(matchedMeaningGroup.definitions.length, 3); i++) {
            const d = matchedMeaningGroup.definitions[i];
            if (!primaryMeaningEn) primaryMeaningEn = d.definition;
            if (!exampleEn && d.example) exampleEn = d.example;

            definitions.push({
              meaningVi: '', // sẽ bổ sung
              meaningEn: d.definition,
              context: `${detectedType.toUpperCase()}`,
              exampleEn: d.example || '',
              exampleVi: ''
            });
          }
        }
      }
    }

    // 3. Nếu có câu ví dụ, tự động dịch câu ví dụ sang tiếng Việt
    if (exampleEn) {
      exampleVi = await this.translateToVietnamese(exampleEn);
    } else {
      // Tự sinh câu ví dụ mẫu ngữ cảnh
      exampleEn = `It is important to understand the concept of ${wLower} in daily life.`;
      exampleVi = `Điều quan trọng là phải hiểu khái niệm về ${primaryMeaningVi || wLower} trong cuộc sống hàng ngày.`;
    }

    // 4. Fallback các giá trị còn thiếu
    if (!ipaUk) ipaUk = `/${wLower}/`;
    if (!ipaUs) ipaUs = ipaUk;
    if (!primaryMeaningVi) primaryMeaningVi = wLower;
    if (!primaryMeaningEn) primaryMeaningEn = `The definition and usage of ${wLower}`;

    const cefr = this.estimateCefrLevel(wLower, wLower.length);

    if (definitions.length === 0) {
      definitions = [
        {
          meaningVi: primaryMeaningVi,
          meaningEn: primaryMeaningEn,
          context: detectedType,
          exampleEn: exampleEn,
          exampleVi: exampleVi
        }
      ];
    } else {
      definitions[0].meaningVi = primaryMeaningVi;
      definitions[0].exampleEn = exampleEn;
      definitions[0].exampleVi = exampleVi;
    }

    const usageNotes = `Từ loại: ${detectedType}. Cấp độ ước lượng: CEFR ${cefr}. Thường dùng trong văn cảnh giao tiếp và học thuật.`;

    const fullCardData = {
      word: word.charAt(0).toUpperCase() + word.slice(1),
      wordType: detectedType,
      cefrLevel: cefr,
      ipaUk: ipaUk,
      ipaUs: ipaUs,
      audioUkUrl: audioUkUrl,
      audioUsUrl: audioUsUrl,
      primaryMeaningVi: primaryMeaningVi,
      primaryMeaningEn: primaryMeaningEn,
      definitions: definitions,
      exampleEn: exampleEn,
      exampleVi: exampleVi,
      usageNotes: usageNotes
    };

    // Lưu vào memory cache để lần sau tra siêu nhanh
    this.memoryCache[wLower] = fullCardData;
    this.saveCache();

    return fullCardData;
  }

  async fetchDictionaryApi(word) {
    if (!navigator.onLine) return null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) return await res.json();
    } catch (e) {
      // ignore
    }
    return null;
  }

  async lookupWord(rawWord) {
    return await this.autoEnrichWord(rawWord);
  }
}

window.dictionaryService = new DictionaryService();
