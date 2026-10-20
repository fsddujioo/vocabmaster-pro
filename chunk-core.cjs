'use strict';
const trim=(v,n)=>String(v||'').trim().slice(0,n),norm=v=>String(v).normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();
const types={noun_phrase:'Cụm danh từ',verb_phrase:'Cụm động từ',adjective_phrase:'Cụm tính từ',adverb_phrase:'Cụm trạng từ',prepositional_phrase:'Cụm giới từ',expression:'Cách diễn đạt'};
const contains=(value,sequence)=>new RegExp('(?<![\\p{L}\\p{N}])'+sequence.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![\\p{L}\\p{N}])','u').test(value);
function validate(data,word){
  if(!Array.isArray(data.phrases))throw Error('AI chưa tạo được danh sách cụm hợp lệ.');
  const seen=new Set(),root=norm(word),phrases=[];
  for(const raw of data.phrases){const c={word:trim(raw?.word,300),meaning:trim(raw?.meaningVi||raw?.meaning,2000),example:trim(raw?.exampleEn||raw?.example,2000),exampleTranslation:trim(raw?.exampleVi||raw?.exampleTranslation,2000),phraseType:types[raw?.phraseType]||'',usageNote:trim(raw?.usageNoteVi||raw?.usageNote,1500)};const key=norm(c.word);if(!c.word||!c.meaning||!c.example||!c.exampleTranslation||!c.phraseType||key.split(' ').length<2||!contains(key,root)||!contains(norm(c.example),key)||/\b(?:about|of|to|for|in|on|with|from|by|at)$/.test(key)||seen.has(key))continue;seen.add(key);phrases.push(c);if(phrases.length===3)break;}
  if(!phrases.length)throw Error('Gợi ý chưa đạt yêu cầu: cụm phải chứa từ đã nhập và ví dụ phải dùng đúng cụm. Thử thêm ngữ cảnh hoặc nhập thủ công.');
  return {phrases};
}
module.exports={validate};
