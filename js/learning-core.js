/* Pure learning rules shared by Flashcards, Learn, Test and import. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.VMLearning = api;
})(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => String(value ?? '').normalize('NFKC').trim().toLocaleLowerCase().replace(/[“”".!?]+$/g, '').replace(/\s+/g, ' ');
  const meaning = card => card.primaryMeaningVi || card.definitions?.[0]?.meaningVi || card.primaryMeaningEn || '';
  const shuffle = array => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
    return copy;
  };
  function oneEdit(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    let i = 0, j = 0, errors = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++errors > 1) return false;
      if (a.length >= b.length) i++;
      if (b.length >= a.length) j++;
    }
    return errors + (i < a.length || j < b.length ? 1 : 0) <= 1;
  }
  function grade(input, accepted, mode = 'strict') {
    const answer = normalize(input);
    const alternatives = (Array.isArray(accepted) ? accepted : [accepted]).flatMap(v => String(v ?? '').split(/[;|]/)).map(normalize).filter(Boolean);
    if (!answer) return { correct: false, typo: false };
    if (alternatives.includes(answer)) return { correct: true, typo: false };
    const typo = mode === 'flexible' && answer.length >= 5 && alternatives.some(v => v.length >= 5 && oneEdit(answer, v));
    return { correct: typo, typo };
  }
  function schedule(card, rating, timestamp = Date.now()) {
    rating = rating === true ? 'good' : rating === false ? 'again' : rating;
    if (!['again', 'hard', 'good', 'easy'].includes(rating)) throw new Error('Mức đánh giá không hợp lệ.');
    const stage = Math.max(0, Math.min(5, Number(card.srsStage) || 0));
    const days = [0, 1, 3, 7, 30, 90];
    let nextStage = stage, minutes;
    if (rating === 'again') { nextStage = 0; minutes = 1; }
    if (rating === 'hard') { nextStage = Math.max(0, stage - 1); minutes = stage <= 1 ? 5 : Math.max(10, Math.round(days[stage] * 1440 / 2)); }
    if (rating === 'good') { nextStage = Math.min(5, stage + 1); minutes = days[nextStage] * 1440; }
    if (rating === 'easy') { nextStage = Math.min(5, stage + 2); minutes = Math.max(4, days[nextStage]) * 1440; }
    return { ...card, srsStage: nextStage, srsRating: rating, nextReviewDate: new Date(timestamp + minutes * 60000).toISOString(),
      firstReviewedAt: card.firstReviewedAt || card.history?.[0]?.date || new Date(timestamp).toISOString(), reviewCount: (Number(card.reviewCount) || 0) + 1, mistakeCount: (Number(card.mistakeCount) || 0) + (rating === 'again' ? 1 : 0), lastReviewed: new Date(timestamp).toISOString(),
      history: [...(Array.isArray(card.history) ? card.history : []), { date: new Date(timestamp).toISOString(), rating, result: rating === 'again' ? 'forgotten' : 'remembered', stageFrom: stage, stageTo: nextStage }].slice(-100) };
  }
  function interval(card, rating) {
    const now = Date.now(), minutes = Math.round((new Date(schedule(card, rating, now).nextReviewDate).getTime() - now) / 60000);
    return minutes < 60 ? `${minutes} phút` : minutes < 1440 ? `${Math.round(minutes / 60)} giờ` : `${Math.round(minutes / 1440)} ngày`;
  }
  function cloze(card) {
    const text = card.clozeText || card.definitions?.find(d => d.exampleEn)?.exampleEn || '';
    if (!text || !card.word) return null;
    const word = String(card.word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const expression = new RegExp(`(?<![\\p{L}\\p{N}])${word}(?![\\p{L}\\p{N}])`, 'giu');
    if (!expression.test(text)) return null;
    return { prompt: text.replace(expression, '______'), answer: card.word };
  }
  function question(card, pool, type = 'mc', direction = 'meaning') {
    const reverse = direction === 'word';
    const answer = reverse ? card.word : meaning(card);
    const prompt = reverse ? meaning(card) : card.word;
    const aliases = reverse ? [answer, ...(card.aliases || [])] : [answer, ...(card.meaningAliases || [])];
    if (type === 'cloze') {
      const gap = cloze(card);
      if (gap) return { card, type: 'written', kind: 'cloze', prompt: gap.prompt, answer: gap.answer, accepted: [gap.answer, ...(card.aliases || [])] };
      type = 'written';
    }
    const otherAnswers = [...new Set(shuffle(pool).filter(c => c.id !== card.id).map(c => reverse ? c.word : meaning(c)).filter(v => v && normalize(v) !== normalize(answer)))];
    if (type === 'tf' && otherAnswers.length) {
      const truth = Math.random() >= .5;
      return { card, type: 'tf', prompt, proposed: truth ? answer : otherAnswers[0], answer: truth, options: [true, false], accepted: [truth] };
    }
    if (type === 'mc' && otherAnswers.length) return { card, type: 'mc', prompt, answer, accepted: aliases, options: shuffle([answer, ...otherAnswers.slice(0, 3)]) };
    return { card, type: 'written', prompt, answer, accepted: aliases };
  }
  function parseDelimited(text, delimiter) {
    const rows = []; let row = [], cell = '', quote = false;
    text = String(text).replace(/^\uFEFF/, '');
    if (!delimiter) delimiter = text.includes('\t') ? '\t' : ',';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        if (quote && text[i + 1] === '"') { cell += '"'; i++; }
        else if (quote || cell.length === 0) quote = !quote;
        else cell += ch;
      } else if (ch === delimiter && !quote) { row.push(cell); cell = ''; }
      else if ((ch === '\n' || ch === '\r') && !quote) {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(cell); if (row.some(v => v.trim())) rows.push(row); row = []; cell = '';
      } else cell += ch;
    }
    if (quote) throw new Error('Dấu ngoặc kép trong CSV chưa đóng.');
    row.push(cell); if (row.some(v => v.trim())) rows.push(row);
    if (rows.length && /^(word|term|từ|từ vựng)$/i.test(rows[0][0].trim()) && /meaning|definition|nghĩa/i.test(rows[0][1] || '')) rows.shift();
    return rows;
  }
  function importCards(text, delimiter) {
    const seen = new Set(), cards = [], invalid = [];
    parseDelimited(text, delimiter).forEach((row, i) => {
      const [word, definition, example = ''] = row.map(v => v.trim());
      if (!word || !definition) { invalid.push(i + 1); return; }
      const key = normalize(word) + '\u0000' + normalize(definition);
      if (seen.has(key)) return;
      seen.add(key); cards.push({ word, primaryMeaningVi: definition, primaryMeaningEn: '', wordType: '', cefrLevel: '', ipaUk: '', ipaUs: '', definitions: [{ meaningVi: definition, exampleEn: example }], source: 'user-import' });
    });
    return { cards, invalid };
  }
  const safeMedia = value => /^(data:image\/(png|jpeg|webp|gif);base64,|data:audio\/(mpeg|mp3|wav|x-wav|ogg|webm|mp4|aac|x-m4a);base64,)/i.test(String(value || '')) ? String(value) : '';
  return { escape, normalize, meaning, shuffle, grade, schedule, interval, question, cloze, parseDelimited, importCards, safeMedia };
});
