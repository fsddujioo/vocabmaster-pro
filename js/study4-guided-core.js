(function(r,f){if(typeof module==='object'&&module.exports)module.exports=f();else r.VMStudy4GuidedCore=f();})(typeof window==='undefined'?globalThis:window,()=>{
  const KEY='vm-study4-guided-v1',DAY=86400000,trim=(v,n=10000)=>String(v??'').trim().slice(0,n),norm=v=>trim(v).toLocaleLowerCase('vi').replace(/\s+/g,' ');
  const empty=()=>({version:1,lessons:{}});
  function clean(step,input={}){return {source:trim(input.source,800),notes:trim(input.notes),checks:step.checks.map((_,i)=>input.checks?.[i]===true),score:trim(input.score,30),fresh:input.fresh===true,remediation:trim(input.remediation,2000),feedbackBy:['human','external'].includes(input.feedbackBy)?input.feedbackBy:'',errorType:['sound','vocab','sentence','locate','spelling','none'].includes(input.errorType)?input.errorType:''};}
  function externalQualified(record={}){const latest=record.externalReviews?.at(-1);if(!latest?.qualifies)return false;const request=record.externalRequests?.find(q=>q.id===latest.report.requestId),draft=record.steps?.[request?.stepId]?.draft;return !!request&&!!draft&&request.anchor===JSON.stringify({source:draft.source||'',notes:draft.notes||''});}
  function failureCount(record={}){let count=0;for(const a of (record.attempts||[]).slice().reverse()){if(a.step!=='transfer'&&a.step!=='transfer2')continue;if(a.passed)break;if(a.performanceFailure)count++;}return count;}
  function assess(step,input,record={}){const d=clean(step,input),issues=[];
    if(d.notes.length<12)issues.push('Ghi sản phẩm/bằng chứng theo ô hướng dẫn trước khi xác nhận.');
    if(step.sourceRequired&&d.source.length<5)issues.push('Ghi tên bài/part và phạm vi câu hoặc vị trí mục thực tế.');
    step.checks.forEach((s,i)=>{if(!d.checks[i])issues.push('Cần tự đối chiếu: '+s);});
    if(step.errorType&&!d.errorType)issues.push('Chọn nguyên nhân chính để lần sau biết sửa gì.');
    if(step.id==='feedback'){if(!d.feedbackBy)issues.push('Chọn nguồn chấm: người chữa hoặc model bên ngoài.');if(d.feedbackBy==='external'&&!externalQualified(record))issues.push('Cần nhập phiếu JSON khớp bản bài hiện tại và đạt mục tiêu luyện; Speaking cần audio thực sự được model xử lý.');}
    if(step.freshRequired){if(!d.fresh)issues.push('Phần kiểm tra cần câu/đoạn chưa luyện, chưa biết đáp án.');const old=Object.entries(record.steps||{}).filter(([id])=>id!==step.id&&id!=='review').map(([,v])=>norm(v.draft?.source)).filter(Boolean);if(d.source&&old.includes(norm(d.source)))issues.push('Nguồn/phạm vi đang trùng bước đã luyện. Chọn phần khác và ghi đủ số câu/mục.');}
    let performanceFailure=false;
    if(step.metric){const n=Number(d.score);if(d.score===''||!Number.isInteger(n)||n<0||n>step.metric.max)issues.push('Ghi số đúng nguyên từ 0 đến '+step.metric.max+'.');else if(step.metric.pass!=null&&n<step.metric.pass){performanceFailure=issues.length===0;issues.push('Hiện '+n+'/'+step.metric.max+'; mốc luyện ≥'+step.metric.pass+'. Làm theo mục Chưa đạt rồi thử phần mới.');}}
    if(['transfer','transfer2'].includes(step.id)&&failureCount(record)>=3&&d.remediation.length<12)issues.push('Đã ba lượt chưa đạt: ghi lại nguyên nhân và cách luyện khác trước khi tiếp tục; có thể học kỹ năng khác.');
    return {passed:issues.length===0,issues,draft:d,performanceFailure};
  }
  function status(lesson,record={}){const flags=lesson.steps.map(s=>record.steps?.[s.id]?.passed===true&&assess(s,record.steps[s.id].draft,record).passed);const first=flags.findIndex(v=>!v);return {flags,complete:first===-1,index:first===-1?lesson.steps.length-1:first,done:first===-1?flags.length:first};}
  function next(data,state){return data.lessons.find(l=>!status(l,state.lessons?.[l.id]).complete)||data.lessons.at(-1);}
  function reviewStep(lesson){return {id:'review',title:'Kiểm lại sau 7 ngày',sourceRequired:true,freshRequired:true,instructions:['Lấy phần Study4 chưa luyện cùng kỹ năng. Với L/R: 5 câu/mục mới, chỉ chấm lượt đầu. Với Nói: hai câu hỏi mới cùng dạng; với Viết: một ý/đề mới từ chính bài Study4 đã liên kết.','Đóng mẫu, tự làm rồi đối chiếu. Ghi rõ nguồn/phạm vi, lỗi còn lặp và một bản sửa. Không dùng bài vừa chữa để đo nhớ lâu.'],output:'Nguồn mới, sản phẩm lượt đầu và lỗi → cách sửa.',checks:['Đã đủ bảy ngày kể từ khi hoàn tất buổi.','Đã làm phần mới khi đóng mẫu và giữ kết quả gốc.','Đã đối chiếu Study4; phần Nói/Viết còn chưa chắc sẽ hỏi người chấm.'],...(['L','R'].includes(lesson.skill)?{metric:{label:'Số đúng lượt đầu /5',max:5,pass:4}}:{})};}
  function reviewDue(lesson,record,now=Date.now()){return status(lesson,record).complete&&record?.completedAt?Date.parse(record.completedAt)+7*DAY:null;}
  function feedbackStep(){return {id:'feedback',title:'Phản hồi và bài làm lại',sourceRequired:true,instructions:['Ghi nguồn chấm/ngày/phiếu phản hồi và hai ưu tiên sửa. Nếu dùng model ngoài, nhập JSON từ đúng prompt đã xuất. Speaking cần người hoặc model thực sự nghe audio để nhận xét phát âm.','Giữ bản gốc → nhận xét → bản tự làm lại/bài mới. Nếu phiếu yêu cầu sửa, tự sửa rồi xuất prompt mới để chấm lại. Chưa đủ dữ liệu thì giữ chờ, vẫn học kỹ năng khác.'],output:'Nhận xét theo tiêu chí và bản làm lại → lỗi đã sửa → chỗ còn vướng.',checks:['Có phản hồi cho đúng sản phẩm/phiên bản, ghi rõ nguồn người chữa hoặc model ngoài.','Có nhận xét theo tiêu chí phù hợp phần bài: S = FC/LR/GRA/P; W = TA/TR/CC/LR/GRA.','Có sản phẩm tự làm lại/bài mới và chỉ ra đã sửa lỗi nào.']};}
  function microStatus(lesson,record={},now=Date.now()){
    if(!Object.keys(record.steps||{}).length)return 'NOT_STARTED';
    const st=status(lesson,record);if(failureCount(record)>=3||['transfer','transfer2','review'].some(id=>record.steps?.[id]?.history?.at(-1)?.performanceFailure))return 'NEEDS_REMEDIATION';
    if(st.complete){if(['S','W'].includes(lesson.skill)&&!(record.steps?.feedback?.passed&&assess(feedbackStep(),record.steps.feedback.draft,record).passed))return 'AWAITING_FEEDBACK';const due=reviewDue(lesson,record);if(due&&now>=due&&!(record.steps?.review?.passed&&Date.parse(record.steps.review.updatedAt)>=due))return 'REVIEW_DUE';return 'MASTERED';}
    if(st.index<=1)return 'LEARNING';if(st.index<=3)return 'GUIDED_PRACTICE';return 'INDEPENDENT_PRACTICE';
  }
  function merge(state,lesson,step,input,checkpoint,attempt,now=new Date().toISOString()){
    const record=state.lessons?.[lesson.id]||{steps:{}},isReview=step.id==='review',before=status(lesson,record),index=lesson.steps.findIndex(s=>s.id===step.id);
    if(checkpoint&&isReview&&(!reviewDue(lesson,record)||Date.parse(now)<reviewDue(lesson,record)))throw Error('Chưa đến ngày kiểm lại hoặc buổi học chưa đủ bước.');
    if(checkpoint&&step.id==='feedback'&&!before.complete)throw Error('Giữ đủ sản phẩm của buổi trước khi xác nhận phản hồi.');
    if(checkpoint&&!isReview&&step.id!=='feedback'&&(index<0||index>before.index))throw Error('Hoàn tất bước đang học trước khi xác nhận bước sau.');
    const result=assess(step,input,record),old=record.steps?.[step.id],same=old&&JSON.stringify(old.draft)===JSON.stringify(result.draft);
    if(checkpoint&&same&&old.passed&&result.passed)return {state,result};
    if(checkpoint&&step.freshRequired&&old?.history?.some(h=>h.id!==attempt&&norm(h.draft?.source)===norm(result.draft.source))){result.passed=false;result.issues.push('Phạm vi này đã có lượt kiểm tra. Giữ kết quả cũ và chọn phần chưa luyện khác để thử lại.');}
    const entry={draft:result.draft,passed:checkpoint?result.passed:same?old.passed:false,updatedAt:now,history:old?.history||[],feedback:old?.feedback||[]};
    if(checkpoint&&!entry.history.some(x=>x.id===attempt))entry.history=[...entry.history,{id:attempt,date:now,passed:result.passed,performanceFailure:result.performanceFailure,draft:result.draft}];
    const updated={...record,steps:{...(record.steps||{}),[step.id]:entry},attempts:record.attempts||[]};
    if(checkpoint&&!updated.attempts.some(a=>a.id===attempt))updated.attempts=[...updated.attempts,{id:attempt,step:step.id,date:now,passed:result.passed,performanceFailure:result.performanceFailure,source:result.draft.source,score:result.draft.score,fresh:result.draft.fresh,errorType:result.draft.errorType}];
    if(checkpoint&&result.performanceFailure&&['transfer','transfer2'].includes(step.id))for(const id of ['transfer','transfer2'])if(updated.steps[id])updated.steps[id]={...updated.steps[id],passed:false};
    updated.completedAt=status(lesson,updated).complete?(record.completedAt||now):null;
    return {state:{...state,version:1,lessons:{...(state.lessons||{}),[lesson.id]:updated}},result};
  }
  return {KEY,DAY,empty,clean,assess,status,next,reviewStep,reviewDue,feedbackStep,microStatus,failureCount,externalQualified,merge};
});
