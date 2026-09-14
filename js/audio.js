// Hệ thống Âm thanh đa năng: Phát âm chuẩn Anh-Anh (UK) & Anh-Mỹ (US)
// Hỗ trợ cả Web Speech API (offline) lẫn âm thanh gốc từ điển (online),
// kèm bộ tạo hiệu ứng âm thanh Web Audio API tự sinh (không phụ thuộc file ngoài).

class SoundEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.audioContext = null;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      this.voices = this.synth.getVoices();
    };
    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  getAudioContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  // Phát âm chuẩn Anh-Anh (UK) hoặc Anh-Mỹ (US)
  speak(text, accent = 'US', directAudioUrl = null) {
    if (!text) return;

    // 1. Thử phát file audio từ điển nếu online và có đường dẫn
    if (directAudioUrl && navigator.onLine) {
      const audio = new Audio(directAudioUrl);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[Audio] Không phát được audio stream, chuyển sang Web Speech API:', err);
          this.speakSpeechSynthesis(text, accent);
        });
        return;
      }
    }

    // 2. Sử dụng Web Speech API (hoạt động offline tốt trên Windows/Mac/Android/iOS)
    this.speakSpeechSynthesis(text, accent);
  }

  speakSpeechSynthesis(text, accent = 'US') {
    if (!this.synth) {
      console.warn('[Audio] Trình duyệt không hỗ trợ Web Speech API');
      return;
    }

    this.synth.cancel(); // Hủy các từ đang nói dở

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = accent === 'UK' ? 'en-GB' : 'en-US';
    utterance.lang = targetLang;
    utterance.rate = 0.92; // Tốc độ tự nhiên, rõ ràng cho người học
    utterance.pitch = 1.0;

    // Lựa chọn voice chuẩn xác nhất cho accent
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }

    let selectedVoice = null;
    if (accent === 'UK') {
      selectedVoice = this.voices.find(v => v.lang === 'en-GB' || v.name.includes('United Kingdom') || v.name.includes('British') || v.name.includes('English (UK)'));
    } else {
      selectedVoice = this.voices.find(v => v.lang === 'en-US' || v.name.includes('United States') || v.name.includes('American') || v.name.includes('English (US)'));
    }

    if (!selectedVoice) {
      // Fallback tìm bất kỳ voice tiếng Anh nào
      selectedVoice = this.voices.find(v => v.lang.startsWith('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    this.synth.speak(utterance);
  }

  // --- Hiệu ứng âm thanh bằng Web Audio API (Tự tổng hợp, không cần file mp3) ---
  playFlipSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // silent catch
    }
  }

  playCorrectSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc2.frequency.setValueAtTime(1046.50, now + 0.2); // C6

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.2);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.35);
    } catch (e) {
      // silent catch
    }
  }

  playWrongSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {
      // silent catch
    }
  }

  playVictorySound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      let delay = 0;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const noteDuration = i === notes.length - 1 ? 0.4 : 0.12;
        const startTime = ctx.currentTime + delay;
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + noteDuration);
        delay += 0.1;
      });
    } catch (e) {
      // silent catch
    }
  }
}

window.soundEngine = new SoundEngine();
