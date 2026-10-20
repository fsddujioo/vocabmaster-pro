(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./study4-core.js'):root.VMStudy4Core);if(typeof module==='object'&&module.exports)module.exports=api;else root.VMStudy4Save=api;})(typeof window==='undefined'?globalThis:window,C=>{
  function plan({item,existing=null,values,cards,modules,errors,processed,uuid=()=>crypto.randomUUID(),now=new Date().toISOString()}){
    if(!existing&&processed.includes(item.id))return {alreadyProcessed:true,records:{}};
    const isError=item.type==='error',accepted=isError?C.answers(values.word):[C.text(values.word,1000)],source={...item.source,url:C.sourceUrl(values.url||item.source.url)};
    if(!source.url)throw Error('Link nguồn cần thuộc Study4.');if(!accepted[0])throw Error('Nhập từ/cụm hoặc đáp án chuẩn.');
    const errorKey=C.key({...item,text:accepted[0],attempt:values.attempt||'',source});const base=existing||(isError?errors.find(r=>C.key(r)===errorKey):null);
    const practiceType=isError?values.practiceType:null;if(isError&&practiceType==='spelling'&&!C.spellingEligible({...item,acceptedAnswers:accepted}))throw Error('Đáp án lựa chọn hoặc ký hiệu cần luyện giải thích.');
    const meaning=C.text(values.meaning,2000),context=C.text(values.context,2400),example=C.text(values.example,2000),reason=C.text(values.reason,3000),evidence=C.text(values.evidence,3000);
    if(!isError&&!meaning)throw Error('Thêm nghĩa theo ngữ cảnh, hoặc dùng Gợi ý cụm với AI local rồi xem lại.');
    const createCard=!isError||(values.saveCard!==false&&practiceType==='spelling'),records={cards:[],modules:[],settings:[]};let cardId=base?.cardId||null,moduleId=values.moduleId||'';
    if(createCard){
      if(moduleId==='__new__'){const title=C.text(values.newModuleTitle,160);if(!title)throw Error('Nhập tên bộ flashcard mới.');if(modules.some(m=>C.normalize(m.title)===C.normalize(title)))throw Error('Đã có bộ cùng tên. Chọn bộ có sẵn để tránh trùng.');moduleId='mod-'+uuid();records.modules.push({id:moduleId,title,description:'Từ và cụm đã duyệt từ Study4',tags:['Study4'],createdAt:now});}
      else if(moduleId&&!modules.some(m=>m.id===moduleId))throw Error('Bộ flashcard không còn tồn tại. Chọn lại bộ.');
      const candidates=cards.filter(c=>(!moduleId||c.moduleId===moduleId)&&C.normalize(c.word)===C.normalize(accepted[0]));
      const linked=cardId?cards.find(c=>c.id===cardId&&C.normalize(c.word)===C.normalize(accepted[0])&&(!moduleId||c.moduleId===moduleId)):null;
      const getMeaning=c=>c.primaryMeaningVi||c.definitions?.[0]?.meaningVi||'';
      const match=linked||candidates.find(c=>meaning&&C.normalize(getMeaning(c))===C.normalize(meaning))||(isError&&!meaning&&candidates.length===1?candidates[0]:null);
      if(match){cardId=match.id;const sources=[...(match.study4Sources||[])];if(!sources.some(s=>s.url===source.url&&s.questionNumber===source.questionNumber))sources.push({...source,context});const next={...match,study4Sources:sources.slice(-50)};if(isError){const mistakes=[...(match.study4Mistakes||[])],key=C.key({...item,text:accepted[0],source,attempt:values.attempt||''});if(!mistakes.some(m=>m.key===key))mistakes.push({key,attempt:values.attempt||'',acceptedAnswers:accepted,source,at:now});next.study4Mistakes=mistakes.slice(-50);}records.cards.push(next);}
      else{
        if(!moduleId){const title='Study4 · '+(source.course||(/listening/i.test(source.title)?'Listening':/reading/i.test(source.title)?'Reading':'Từ và cụm'));const mod=modules.find(m=>m.title===title);moduleId=mod?.id||'mod-'+uuid();if(!mod)records.modules.push({id:moduleId,title,tags:['Study4'],createdAt:now});}
        cardId='card-'+uuid();const label=meaning||(context?'Đáp án đúng cho ngữ cảnh: '+context:'Đáp án đúng câu '+(source.questionNumber||'đã lưu')+' · '+(source.lesson||source.title||'Study4'));
        const notes=[values.usageNote,values.rootWord&&C.normalize(values.rootWord)!==C.normalize(accepted[0])?'Từ gốc: '+values.rootWord:'',isError?'Lần trước đã trả lời: '+(values.attempt||'(bỏ trống)'):'',reason].filter(Boolean).join('\n');
        records.cards.push({id:cardId,moduleId,word:accepted[0],aliases:accepted.slice(1),primaryMeaningVi:label,wordType:C.text(values.phraseType,80),definitions:[{meaningVi:label,exampleEn:example,exampleVi:C.text(values.exampleTranslation,2000)}],clozeText:example,usageNotes:notes,rootWord:C.text(values.rootWord,300),source:values.aiModel?'ollama-local-reviewed':'study4-reviewed',sourceModel:values.aiModel||undefined,study4Sources:[{...source,context}],study4Mistakes:isError?[{key:errorKey,attempt:values.attempt||'',acceptedAnswers:accepted,source,at:now}]:[],srsStage:0,reviewCount:0,mistakeCount:0,history:[],nextReviewDate:now,createdAt:now});
      }
    }
    if(isError){if(!base&&errors.length>=3000)throw Error('Sổ lỗi đạt 3.000 mục. Xuất sao lưu trước.');const entry={...(base||{}),id:base?.id||item.id,type:'error',text:accepted[0],acceptedAnswers:accepted,attempt:values.attempt||'',source,context:context||base?.context||'',meaning:meaning||base?.meaning||'',category:values.category==='unclassified'&&base?.category?base.category:values.category||'unclassified',practiceType,evidence:evidence||base?.evidence||'',reason:reason||base?.reason||'',cardId,status:base?.status||'new',createdAt:base?.createdAt||now,nextReviewDate:base?.nextReviewDate||now,updatedAt:now};if(existing){for(const field of ['meaning','context','reason','evidence','category'])if(values[field]!==undefined)entry[field]=values[field];}const next=errors.map(r=>r.id===entry.id?entry:r);if(!next.some(r=>r.id===entry.id))next.unshift(entry);records.settings.push({key:'vm-study4-errors',value:next});}
    if(!existing)records.settings.push({key:'vm-study4-processed',value:[...new Set([...processed,item.id])].slice(-10000)});
    return {records,cardId};
  }
  return {plan};
});
