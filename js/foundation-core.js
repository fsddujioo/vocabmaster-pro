(function(r,f){if(typeof module==='object'&&module.exports)module.exports=f();else r.VMFoundationCore=f();})(typeof window==='undefined'?globalThis:window,()=>{
  const KEY='vm-ielts-foundation-v1',DAY=86400000;
  const norm=s=>String(s??'').normalize('NFKC').trim().toLowerCase().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
  const empty=()=>({version:1,records:{},drafts:{}});
  const recordKey=(kind,id)=>kind+':'+id;
  function lesson(data,kind,id){return (kind==='chunks'?data.packs:data.grammar).find(x=>x.id===id);}
  function items(data,kind,id,mode='learn'){
    const l=lesson(data,kind,id);if(!l)throw Error('Không tìm thấy bài nền tảng.');
    if(kind==='grammar')return mode==='review'?l.delayed:l.diagnostic;
    return l.chunks.map(cid=>{const c=data.chunks.find(c=>c.id===cid);return {id:cid,prompt:c.meaning,answer:c.phrase,why:c.example};});
  }
  function due(record,now=Date.now(),days=7){return !!record?.completedAt&&now-new Date(record.completedAt).getTime()>=days*DAY;}
  function assess(data,kind,id,mode,draft,state,now=Date.now()){
    const qs=items(data,kind,id,mode),record=state.records[recordKey(kind,id)],answers=qs.map(q=>String(draft.answers?.[q.id]??'').trim().slice(0,1000));
    const checks=qs.map((q,i)=>norm(answers[i])===norm(q.answer)),score=checks.filter(Boolean).length,required=kind==='grammar'&&mode!=='review'?8:4;
    const production=Array.from({length:kind==='grammar'?5:2},(_,i)=>String(draft.production?.[i]||'').trim().slice(0,2000));
    const issues=[];
    if(answers.some(x=>!x))issues.push('Trả lời đủ câu trước khi ghi kết quả.');
    if(mode==='review'&&!due(record,now,data.reviewDays))issues.push('Lượt kiểm lại mở sau '+data.reviewDays+' ngày kể từ lần hoàn thành đầu tiên.');
    if(score<required)issues.push('Cần '+required+'/'+qs.length+' câu đúng; lượt này '+score+'/'+qs.length+'.');
    if(production.some(x=>x.split(/\s+/).filter(Boolean).length<(kind==='grammar'?3:6)))issues.push(kind==='grammar'?'Tự viết đủ 5 câu theo bài vận dụng, mỗi câu ít nhất 3 từ.':'Tự viết hai câu mới, mỗi câu ít nhất 6 từ.');
    if(kind==='chunks'){
      const l=lesson(data,kind,id),cs=l.chunks.map(cid=>data.chunks.find(c=>c.id===cid));
      const used=production.map(s=>cs.find(c=>norm(s).includes(norm(c.phrase))));
      if(!used[0]||!used[1]||used[0].id===used[1].id)issues.push('Mỗi câu cần chứa một cụm khác nhau trong gói, giữ đúng dạng cụm của bài kiểm tra này.');
      if(production.some(s=>cs.some(c=>norm(c.example)===norm(s))))issues.push('Đổi ngữ cảnh; không chép nguyên câu ví dụ.');
    }
    if(draft.selfCheck!==true)issues.push('Tự kiểm tra nghĩa và ngữ pháp của các câu; máy chỉ đối chiếu đáp án và sự có mặt của cụm.');
    const attempted=answers.every(Boolean)&&(mode!=='review'||due(record,now,data.reviewDays));
    return {attempted,passed:attempted&&issues.length===0,score,total:qs.length,required,checks,answers,production,issues,selfCheck:draft.selfCheck===true,mode,at:new Date(now).toISOString()};
  }
  function append(state,kind,id,result,attemptId){
    if(!result.attempted)throw Error(result.issues[0]||'Chưa đủ câu trả lời.');
    const key=recordKey(kind,id),old=state.records[key]||{attempts:[]};if(old.attempts.some(a=>a.id===attemptId))return state;
    const record={...old,attempts:[...old.attempts,{...result,id:attemptId}].slice(-100)};
    if(result.passed&&result.mode==='learn'&&!record.completedAt)record.completedAt=result.at;
    if(result.mode==='review')record.strongAt=result.passed?result.at:null;
    return {...state,records:{...state.records,[key]:record}};
  }
  function importPlan({data,packId,targetId,modules,cards,uuid=()=>crypto.randomUUID(),now=new Date().toISOString()}){
    const pack=lesson(data,'chunks',packId);if(!pack)throw Error('Gói cụm không tồn tại.');
    let mod=targetId==='__auto__'?modules.find(m=>m.foundationSet==='ielts-100'):modules.find(m=>m.id===targetId);const records={modules:[],cards:[]};
    if(targetId!=='__auto__'&&!mod)throw Error('Bộ đã bị xóa, hãy chọn lại.');
    if(!mod){mod={id:'mod-'+uuid(),title:'IELTS 6.5 · 100 cụm nền',description:'Cụm và ví dụ tự biên soạn; học dần theo gói 5 cụm.',tags:['IELTS','Cụm từ'],foundationSet:'ielts-100',createdAt:now};records.modules.push(mod);}
    let skipped=0;
    for(const cid of pack.chunks){const c=data.chunks.find(c=>c.id===cid);if(cards.some(x=>x.moduleId===mod.id&&norm(x.word)===norm(c.phrase))){skipped++;continue;}
      records.cards.push({id:'card-'+uuid(),moduleId:mod.id,word:c.phrase,wordType:'Cụm từ',primaryMeaningVi:c.meaning,definitions:[{meaningVi:c.meaning,exampleEn:c.example}],clozeText:c.example,usageNotes:'Ví dụ tự biên soạn. '+c.usage,foundationChunkId:c.id,source:'vocabmaster-authored-foundation',srsStage:0,reviewCount:0,mistakeCount:0,history:[],nextReviewDate:now,createdAt:now});
    }
    return {records,moduleId:mod.id,added:records.cards.length,skipped};
  }
  return {KEY,DAY,norm,empty,recordKey,lesson,items,due,assess,append,importPlan};
});
