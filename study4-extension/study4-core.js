(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VMStudy4Core=api;})(typeof window==='undefined'?globalThis:window,function(){
  'use strict';
  const categories={unclassified:'Chưa phân loại',spelling:'Chính tả',number:'Số / ngày tháng',plural:'Số ít / số nhiều',paraphrase:'Không nhận ra paraphrase',comprehension:'Hiểu sai nội dung',time:'Thiếu thời gian',other:'Khác'};
  const text=(v,max=3000)=>String(v??'').trim().slice(0,max);
  const normalize=v=>text(v).normalize('NFKC').toLocaleLowerCase().replace(/\s+/g,' ');
  function sourceUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&['study4.com','www.study4.com'].includes(u.hostname)&&!u.username&&!u.password?u.href.slice(0,2000):'';}catch{return '';}}
  function answers(value){const raw=Array.isArray(value)?value:[value];return [...new Set(raw.flatMap(v=>{const parts=String(v||'').split(/\s*(?:\[OR\]|\bor\b|\/|;|\|)\s*/i).map(v=>text(v,300)).filter(Boolean);if(parts.length===2&&/^\d+$/.test(parts[0])){const match=parts[1].match(/^((?:(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)[- ]?)+)\s+(.+)$/i);if(match)parts[0]+=' '+match[2];}return parts;}))].slice(0,12);}
  const choice=value=>/^(?:[A-J]|TRUE|FALSE|NOT GIVEN|YES|NO)$/i.test(text(value));
  function validate(input){
    if(!input||typeof input!=='object')throw new Error('Nội dung không hợp lệ.');
    const s=input.source||{},url=sourceUrl(s.url),parentUrl=sourceUrl(s.parentUrl);
    if(!url)throw new Error('Chỉ nhận nguồn từ study4.com.');
    const type=input.type==='error'?'error':'selection',accepted=answers(input.acceptedAnswers);
    const item={id:/^[\w-]{8,80}$/.test(input.id||'')?input.id:null,type,text:text(input.text,1000),context:text(input.context,2400),attempt:text(input.attempt,1000),acceptedAnswers:accepted,category:Object.hasOwn(categories,input.category)?input.category:'unclassified',notes:text(input.notes,3000),evidence:text(input.evidence,3000),reason:text(input.reason,3000),source:{url,parentUrl,title:text(s.title,300),course:text(s.course,160),lesson:text(s.lesson,300),questionNumber:text(s.questionNumber,12),questionId:text(s.questionId,40),questionType:text(s.questionType,160),capturedAt:new Date().toISOString()}};
    if(type==='selection'&&!item.text)throw new Error('Chọn từ hoặc cụm từ để lưu.');
    if(type==='error'&&!accepted.length)throw new Error('Câu lỗi chưa có đáp án nguồn.');
    return item;
  }
  function errorFromFields(fields,source){
    if(!fields.wrong&&!fields.unanswered)return null;
    const accepted=answers(fields.expected);if(!accepted.length)return null;
    return {type:'error',text:accepted[0],context:'',attempt:fields.unanswered?'':text(fields.attempt),acceptedAnswers:accepted,category:'unclassified',source:{...source,questionNumber:text(fields.number),url:sourceUrl(fields.detailUrl)||source.url}};
  }
  function key(item){const source=item.source||{},result=([source.url,source.parentUrl].filter(Boolean).join(' ').match(/\/results\/(\d+)/)||[])[1];return [item.type,result?'study4-result-'+result:source.parentUrl||source.url,source.questionNumber||'',normalize(item.text),normalize(item.attempt)].join('\0');}
  function spellingEligible(item){return item.type==='error'&&item.acceptedAnswers.length>0&&!item.acceptedAnswers.some(choice)&&item.acceptedAnswers.every(v=>!/[()[\]]/.test(v));}
  function grade(value,accepted){return answers(accepted).some(a=>normalize(value)===normalize(a));}
  function diff(actual,expected){
    actual=text(actual,300);expected=text(expected,300);const a=[...actual],b=[...expected];
    const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
    for(let i=0;i<=a.length;i++)d[i][0]=i;for(let j=0;j<=b.length;j++)d[0][j]=j;
    for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    let i=a.length,j=b.length;const parts=[];
    while(i||j){if(i&&j&&d[i][j]===d[i-1][j-1]+(a[i-1]===b[j-1]?0:1)){parts.push({kind:a[i-1]===b[j-1]?'same':'replace',actual:a[--i],expected:b[--j]});}else if(j&&d[i][j]===d[i][j-1]+1){parts.push({kind:'missing',actual:'',expected:b[--j]});}else{parts.push({kind:'extra',actual:a[--i],expected:''});}}
    return parts.reverse();
  }
  function bestAnswer(value,accepted){return answers(accepted).sort((a,b)=>diff(normalize(value),normalize(a)).filter(p=>p.kind!=='same').length-diff(normalize(value),normalize(b)).filter(p=>p.kind!=='same').length)[0]||'';}
  return {categories,text,normalize,sourceUrl,answers,choice,validate,errorFromFields,key,spellingEligible,grade,diff,bestAnswer};
});
