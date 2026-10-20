(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.VMIELTSCore=factory();})(typeof window==='undefined'?globalThis:window,()=>{
  const KEY='vm-ielts-roadmap-v1';
  const trim=(value,max=12000)=>String(value??'').trim().slice(0,max);
  function empty(){return {version:1,records:{}};}
  function clean(session,draft={}){
    const fields={};for(const f of session.fields)fields[f.key]=trim(draft.fields?.[f.key],40);
    return {scoreSource:trim(draft.scoreSource,1000),source:trim(draft.source,600),artifact:trim(draft.artifact),reflection:trim(draft.reflection,5000),checks:session.checks.map((_,i)=>draft.checks?.[i]===true),fields,feedbackBy:['human','self','ai'].includes(draft.feedbackBy)?draft.feedbackBy:'',feedbackSource:trim(draft.feedbackSource,1000)};
  }
  function overall(bands){const values=Object.values(bands);return values.length===4&&values.every(v=>Number.isFinite(v)&&v>=0&&v<=9)?Math.round(values.reduce((a,b)=>a+b,0)/4*2)/2:null;}
  function evaluate(session,input,state=empty(),plan=null){
    const d=clean(session,input),issues=[];
    if(d.source.length<3)issues.push('Ghi tên/mã bài hoặc nguồn câu hỏi đã dùng.');
    if(d.artifact.length<12)issues.push('Ghi bằng chứng: câu/đoạn tự làm hoặc tên file/link bản thu, bản trước và sau sửa.');
    if(d.reflection.length<12)issues.push('Ghi lỗi chính và cách sửa cụ thể; nếu không sai, giải thích một câu khó.');
    session.checks.forEach((c,i)=>{if(!d.checks[i])issues.push('Chưa tự kiểm tra: '+c);});
    for(const f of session.fields){const raw=d.fields[f.key],n=Number(raw);if(raw===''||!Number.isFinite(n)||n<0||n>f.max||(f.integer&&!Number.isInteger(n))||(f.step&&Math.abs(n/f.step-Math.round(n/f.step))>1e-8))issues.push('Nhập đúng: '+f.label+' (0–'+f.max+').');else if(f.pass!=null&&n<f.pass)issues.push(f.label+': cần ít nhất '+f.pass+'; hiện '+n+'.');}
    let calculated=null;
    if(session.scoreSource&&d.scoreSource.length<5)issues.push('Ghi bảng/nguồn quy đổi band của đúng đề Listening/Reading; raw không tự biến thành band.');
    if(session.id==='s30'){
      const a=mockABands(state,d.fields.writing);calculated=overall(a);
      if(calculated===null)issues.push('Nhập đủ band Listening/Speaking A tại buổi 28 và Reading A tại buổi 29.');
      else if(Object.values(a).some(n=>n<6)||calculated<6.5)issues.push('Mock A cần overall ≥6.5 và từng kỹ năng ≥6.0; hiện overall '+calculated.toFixed(1)+'. L/R 7.0 chỉ là mục tiêu đệm.');
      if(!['s28','s29'].every(id=>plan?effectiveStatus(plan.sessions.find(s=>s.id===id),state,plan)==='passed':state.records?.[id]?.status==='passed'))issues.push('Hoàn tất checkpoint A ở buổi 28–29, gồm nguồn quy đổi và phản hồi Speaking.');
    }
    if(session.id==='s32'){
      calculated=overall(Object.fromEntries(['listening','reading','writing','speaking'].map(k=>[k,d.fields[k]===''?NaN:Number(d.fields[k])])));
      if(calculated!==null&&calculated<6.5)issues.push('Overall của Mock B theo điểm nhập là '+calculated.toFixed(1)+'; mục tiêu ít nhất 6.5.');
      if(!['s28','s29','s30'].every(id=>plan?effectiveStatus(plan.sessions.find(x=>x.id===id),state,plan)==='passed':state.records?.[id]?.status==='passed'))issues.push('Cần hoàn tất checkpoint Mock A ở buổi 28–30 trước khi xác nhận chặng cuối.');
      const same=s=>trim(s).toLocaleLowerCase('vi').replace(/\s+/g,' ');
      if(['s28','s29','s30'].some(id=>same(state.records?.[id]?.draft?.source)&&same(state.records[id].draft.source)===same(d.source)))issues.push('Mock B cần nguồn đề mới, không trùng mã đã dùng cho Mock A.');
    }
    const awaiting=session.human&&(d.feedbackBy!=='human'||d.feedbackSource.length<5);
    if(awaiting)issues.push('Chờ phản hồi Nói/Viết từ người chấm theo tiêu chí; ghi người/nguồn phản hồi. Điểm AI/tự chấm chỉ tham khảo.');
    return {passed:issues.length===0,status:issues.length===0?'passed':awaiting?'awaiting':'retry',issues,overall:calculated,draft:d};
  }
  function merge(state,session,draft,checkpoint=false,now=new Date().toISOString(),plan=null){
    const result=evaluate(session,draft,state,plan),old=state.records?.[session.id],same=old&&JSON.stringify(old.draft)===JSON.stringify(result.draft);
    const record={draft:result.draft,status:checkpoint?result.status:same?old.status:'draft',updatedAt:now,history:old?.history||[]};
    if(checkpoint)record.history=[...record.history,{date:now,status:result.status,overall:result.overall,fields:result.draft.fields,source:result.draft.source,scoreSource:result.draft.scoreSource,reflection:result.draft.reflection,feedbackBy:result.draft.feedbackBy,feedbackSource:result.draft.feedbackSource}].slice(-40);
    return {state:{version:1,records:{...(state.records||{}),[session.id]:record}},result};
  }
  function mockABands(state,writing=state.records?.s30?.draft?.fields?.writing){const number=v=>v==null||v===''?NaN:Number(v);return {listening:number(state.records?.s28?.draft?.fields?.listening),reading:number(state.records?.s29?.draft?.fields?.reading),writing:number(writing),speaking:number(state.records?.s28?.draft?.fields?.speaking)};}
  function effectiveStatus(session,state,plan=null){const record=state.records?.[session?.id];return record?.status==='passed'?evaluate(session,record.draft,state,plan).status:(record?.status||'new');}
  const next=(plan,state)=>plan.sessions.find(s=>effectiveStatus(s,state,plan)!=='passed')||plan.sessions.at(-1);
  function safeLink(value){try{const u=new URL(value);return u.protocol==='https:'&&['study4.com','ielts.org','www.ielts.org','assets.cambridge.org','www.cambridge.org'].includes(u.hostname)?u.href:'';}catch{return '';}}
  return {KEY,empty,clean,overall,evaluate,merge,effectiveStatus,next,safeLink,mockABands};
});
