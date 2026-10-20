(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./study4-core.js'):root.VMStudy4Core);if(typeof module==='object'&&module.exports)module.exports=api;else root.VMStudy4Reader=api;})(typeof window==='undefined'?globalThis:window,C=>{
  const text=node=>String(node?.innerText||node?.textContent||'').trim();
  function detailsLink(doc,url){const a=[...doc.querySelectorAll('a[href]')].find(a=>/Xem chi tiết đáp án/i.test(text(a)));if(!a)return '';try{const u=new URL(a.getAttribute('href'),url),base=new URL(url);return C.sourceUrl(u.href)&&u.origin===base.origin&&/\/results\/\d+\/details\//.test(u.pathname)?u.href:'';}catch{return '';}}
  function summary(doc,source){return [...doc.querySelectorAll('.result-answers-item')].filter(row=>row.querySelector('.text-wrong,.text-unanswer')).map(row=>{const number=text(row.querySelector('.question-number')),a=row.querySelector('.result-answer-detail');return {number,expected:text(row.querySelector('.text-answerkey')),attempt:row.querySelector('.text-unanswer')?'':text(row.querySelector('i')),wrong:!!row.querySelector('.text-wrong'),unanswered:!!row.querySelector('.text-unanswer'),detailUrl:a?.getAttribute('data-href')?new URL(a.getAttribute('data-href'),source.url).href:'',row};});}
  function details(doc,source){return [...doc.querySelectorAll('.question-wrapper')].flatMap(row=>{
    const expectedNode=[...row.querySelectorAll('.text-success')].find(e=>/Đáp án đúng\s*:/i.test(text(e)));if(!expectedNode)return [];
    const expected=text(expectedNode).replace(/^\s*Đáp án đúng\s*:\s*/i,''),number=text(row.querySelector('.question-number')),input=row.querySelector('input[data-type="question-answer"],input[readonly],textarea[readonly]');
    const parent=row.closest('.question-item-wrapper')||row.parentElement,part=row.closest('[id^="partcontent-"]');
    const ownContext=text(parent.querySelector('.context-wrapper'));const group=row.closest('.question-twocols');const context=ownContext||text(group?.querySelector('.question-twocols-left'));
    const questionType=text(parent.querySelector('.question-item-concepts')),qid=row.getAttribute('data-qid')||row.id.replace('question-wrapper-','');
    const explanation=parent.querySelector('.question-explanation-wrapper .collapse');const evidenceParts=explanation?[...explanation.querySelectorAll('div')].filter(e=>e.querySelector('strong')&&/Trích đoạn chứa đáp án/.test(text(e.querySelector('strong')))).map(text):[];
    const attempt=input?.value??input?.getAttribute('value')??'';
    const item=C.errorFromFields({wrong:true,unanswered:!attempt.trim(),expected,attempt,number},{...source,questionNumber:number,questionType,questionId:qid,url:source.url.split('#')[0]+'#question-wrapper-'+qid});
    if(!item)return [];item.id=typeof crypto!=='undefined'?crypto.randomUUID():undefined;item.context=C.text(context,2400);item.evidence=C.text(evidenceParts.join('\n').replace(/^Trích đoạn chứa đáp án\s*:?\s*/,''),3000);item.source.lesson=text(doc.querySelector('.test-navigation__inner h6'))||source.lesson||source.title;return [{item,row}];
  });}
  function direct(doc,source){return summary(doc,source).flatMap(fields=>{const item=C.errorFromFields(fields,source);return item?[{item,row:fields.row}]:[];});}
  async function collect(doc,source,fetchDocument,number){
    const fields=summary(doc,source),local=details(doc,source);
    if(!fields.length){const items=local.map(x=>x.item);return number?items.filter(c=>c.source.questionNumber===number):items;}
    const selected=number?fields.filter(f=>f.number===number):fields;if(!selected.length)return [];
    let lookup=new Map(local.map(x=>[x.item.source.questionNumber,x.item]));
    if(selected.some(f=>!f.expected)&&!lookup.size){const link=detailsLink(doc,source.url);if(!link)throw Error('Trang này chưa hiện đáp án chuẩn. Mở “Xem chi tiết đáp án” rồi lưu lỗi tại đó.');const detailDoc=await fetchDocument(link);lookup=new Map(details(detailDoc,{...source,url:link}).map(x=>[x.item.source.questionNumber,x.item]));}
    return selected.map(fields=>{let item=fields.expected?C.errorFromFields(fields,source):lookup.get(fields.number);if(!item)throw Error('Chưa đọc được đáp án chuẩn câu '+fields.number+'. Mở trang chi tiết để kiểm tra; chưa lưu đáp án đoán.');item={...item,id:item.id||(typeof crypto!=='undefined'?crypto.randomUUID():undefined),attempt:fields.unanswered?'':fields.attempt,source:{...item.source,parentUrl:source.url}};return item;});
  }
  return {text,detailsLink,summary,details,direct,collect};
});
