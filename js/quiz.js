/* Existing quiz flow, extended with writing, cloze, exam timing and saved reviews. */
class QuizEngine {
  constructor(){this.activeCards=[];this.timer=null;this.finished=false;this.running=false;}
  openQuizModal(cards,title){
    if(!cards?.length)return window.vmPremium.notify('Chưa có thẻ để tạo bài kiểm tra.','info');
    this.pause();this.activeCards=[...cards];this.moduleTitle=title||'Bài kiểm tra';
    document.getElementById('quiz-setup-total-cards').textContent=`${cards.length} thẻ khả dụng`;
    const modal=document.getElementById('quiz-setup-modal');modal.classList.remove('hidden');
    let button=modal.querySelector('#vm-quiz-resume');if(!button){button=document.createElement('button');button.id='vm-quiz-resume';button.className='btn-secondary';button.textContent='Tiếp tục bài đã lưu';modal.querySelector('.modal-actions-footer').prepend(button);}button.onclick=()=>this.resume();
  }
  async startQuizFromSetup(){
    let cards=[...this.activeCards];if(document.getElementById('vm-quiz-starred').checked)cards=cards.filter(c=>c.starred);
    const type=document.getElementById('quiz-question-type').value;if(type==='cloze')cards=cards.filter(c=>window.VMLearning.cloze(c));
    if(!cards.length)return window.vmPremium.notify('Không có thẻ khớp. Câu điền khuyết cần ví dụ chứa đúng từ của thẻ.','info');
    const value=document.getElementById('quiz-question-count').value,count=value==='all'?cards.length:Math.min(cards.length,Number(value)||10),minutes=Number(document.getElementById('vm-quiz-minutes').value);
    if(count>500)return window.vmPremium.notify('Mỗi bài tối đa 500 câu. Hãy chia học phần lớn thành các phần nhỏ.','info');
    if(!Number.isFinite(minutes)||minutes<0||minutes>180)return window.vmPremium.notify('Thời gian từ 0 đến 180 phút.','info');
    this.direction=document.getElementById('vm-quiz-direction').value;this.grading=document.getElementById('vm-quiz-grading').value;this.feedbackMode=document.getElementById('vm-quiz-feedback-mode').value;
    this.questions=window.VMLearning.shuffle(cards).slice(0,count).map((c,i)=>window.VMLearning.question(c,cards,type==='mixed'?['mc','tf','written'][i%3]:type,this.direction));
    this.currentQuestionIndex=0;this.userAnswers=Array(this.questions.length).fill(null);this.finished=false;this.startedAt=Date.now();this.deadline=minutes>0?Date.now()+minutes*60000:null;this.running=true;
    document.getElementById('quiz-setup-modal').classList.add('hidden');window.app.showView('quiz');await this.persist();this.renderCurrentQuestion();this.startTimer();
  }
  async persist(){
    const strip=c=>({id:c.id,moduleId:c.moduleId,word:c.word,primaryMeaningVi:window.VMLearning.meaning(c),primaryMeaningEn:c.primaryMeaningEn||'',wordType:c.wordType||'',definitions:c.definitions||[],usageNotes:c.usageNotes||''});
    await window.vocabDB.put('settings',{key:'vm-quiz-resume',value:this.finished?null:{title:this.moduleTitle,questions:this.questions.map(q=>({...q,card:strip(q.card)})),answers:this.userAnswers,index:this.currentQuestionIndex,direction:this.direction,grading:this.grading,feedbackMode:this.feedbackMode,startedAt:this.startedAt,deadline:this.deadline}});
  }
  async resume(){
    const saved=await window.vocabDB.get('settings','vm-quiz-resume');if(!saved?.value)return window.vmPremium.notify('Chưa có bài kiểm tra đang làm.','info');const s=saved.value;
    Object.assign(this,{moduleTitle:s.title,questions:s.questions,userAnswers:s.answers,currentQuestionIndex:s.index,direction:s.direction,grading:s.grading,feedbackMode:s.feedbackMode,startedAt:s.startedAt,deadline:s.deadline,finished:false,running:true});
    this.activeCards=[...new Map(this.questions.map(q=>[q.card.id,q.card])).values()];document.getElementById('quiz-setup-modal').classList.add('hidden');window.app.showView('quiz');
    if(this.deadline&&this.deadline<=Date.now())return this.renderQuizResults(true);this.renderCurrentQuestion();this.startTimer();
  }
  pause(){if(this.timer)clearInterval(this.timer);this.timer=null;if(this.running&&!this.finished){this.running=false;this.persist().catch(console.warn);}}
  startTimer(){
    if(this.timer)clearInterval(this.timer);this.timer=setInterval(()=>{if(this.finished)return clearInterval(this.timer);const node=document.getElementById('vm-quiz-clock');if(node){const n=Math.max(0,Math.ceil(((this.deadline||Date.now())-Date.now())/1000));node.textContent=this.deadline?`${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`:'Không giới hạn';}if(this.deadline&&Date.now()>=this.deadline)this.renderQuizResults(true);},500);
  }
  renderCurrentQuestion(){
    const q=this.questions[this.currentQuestionIndex];if(!q)return this.renderQuizResults();const e=window.VMLearning.escape,a=this.userAnswers[this.currentQuestionIndex],exam=this.feedbackMode==='exam';
    document.getElementById('quiz-counter-text').textContent=`Câu ${this.currentQuestionIndex+1}/${this.questions.length} · ${this.userAnswers.filter(Boolean).length} đã trả lời`;document.getElementById('quiz-progress-bar').style.width=`${this.userAnswers.filter(Boolean).length/this.questions.length*100}%`;
    const host=document.getElementById('quiz-active-container');
    host.innerHTML=`<section class="vm-question-card"><div class="vm-question-meta"><span class="vm-tag">${exam?'Bài kiểm tra':'Luyện tập'} · ${q.kind==='cloze'?'Điền khuyết':q.type==='written'?'Viết đáp án':q.type==='tf'?'Đúng / Sai':'Trắc nghiệm'}</span><span id="vm-quiz-clock">${this.deadline?'Đang tính giờ…':'Không giới hạn'}</span></div><h1>${e(q.prompt)}</h1>${q.type==='tf'?`<p class="vm-proposed">${e(q.proposed)}</p>`:''}${q.type==='written'?`<form id="vm-quiz-written-form"><label>Đáp án<input id="vm-quiz-written" class="form-input vm-answer-input" value="${e(a?.value||'')}" autocomplete="off" spellcheck="false" required ${a&&!exam?'disabled':''}></label><button class="btn-primary" ${a&&!exam?'disabled':''}>${exam?'Lưu đáp án':'Kiểm tra đáp án'}</button></form>`:`<div class="vm-answer-options">${q.options.map((opt,i)=>`<button class="vm-answer-option ${a?.value===opt?'selected':''}" data-choice="${i}" ${a&&!exam?'disabled':''}><span>${i+1}</span>${q.type==='tf'?(opt?'Đúng':'Sai'):e(opt)}</button>`).join('')}</div>`}<div id="vm-quiz-feedback"></div><div class="vm-test-nav"><button class="btn-secondary" id="vm-quiz-prev" ${this.currentQuestionIndex===0?'disabled':''}>← Câu trước</button><button class="btn-secondary" id="vm-quiz-next">${this.currentQuestionIndex===this.questions.length-1?'Kiểm tra & nộp bài':'Câu tiếp →'}</button></div><div class="vm-question-dots">${this.questions.map((_,i)=>`<button class="${i===this.currentQuestionIndex?'current':''} ${this.userAnswers[i]?'answered':''}" data-question="${i}" aria-label="Câu ${i+1}${this.userAnswers[i]?', đã trả lời':''}">${i+1}</button>`).join('')}</div></section>`;
    host.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>this.answer(q.options[Number(b.dataset.choice)]));const form=host.querySelector('form');if(form){form.onsubmit=event=>{event.preventDefault();this.answer(host.querySelector('input').value);};host.querySelector('input').focus();}
    host.querySelector('#vm-quiz-prev').onclick=()=>this.move(-1);host.querySelector('#vm-quiz-next').onclick=()=>this.currentQuestionIndex===this.questions.length-1?this.confirmSubmit():this.move(1);host.querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{this.currentQuestionIndex=Number(b.dataset.question);this.renderCurrentQuestion();});if(a&&!exam)this.renderFeedback();
  }
  async answer(value){
    if(this.finished)return;const q=this.questions[this.currentQuestionIndex];if(this.feedbackMode!=='exam'&&this.userAnswers[this.currentQuestionIndex])return;
    const result=q.type==='tf'?{correct:value===q.answer,typo:false}:window.VMLearning.grade(value,q.accepted,this.grading);this.userAnswers[this.currentQuestionIndex]={value,isCorrect:result.correct,typo:result.typo};await this.persist();this.renderCurrentQuestion();if(this.feedbackMode!=='exam')window.soundEngine[result.correct?'playCorrectSound':'playWrongSound']();
  }
  renderFeedback(){
    const q=this.questions[this.currentQuestionIndex],a=this.userAnswers[this.currentQuestionIndex],e=window.VMLearning.escape,host=document.getElementById('vm-quiz-feedback');
    host.innerHTML=`<div class="vm-feedback ${a.isCorrect?'correct':'incorrect'}"><h3>${a.isCorrect?'Chính xác'+(a.typo?' · chấp nhận lỗi gõ nhỏ':''):'Cần xem lại'}</h3><p>Đáp án: <strong>${q.type==='tf'?(q.answer?'Đúng':'Sai'):e(q.answer)}</strong></p><p>${e(q.card.primaryMeaningEn||'')}</p><p>${e(q.card.definitions?.[0]?.exampleEn||'')}</p><div class="vm-actions"><button class="btn-secondary" id="vm-quiz-explain">✦ AI giải thích</button>${!a.isCorrect&&q.type==='written'?'<button class="btn-secondary" id="vm-quiz-self">Tự chấp nhận đáp án này</button>':''}</div></div>`;
    host.querySelector('#vm-quiz-explain').onclick=()=>window.vmPremium.tutor(`Câu hỏi: ${q.prompt}\nĐáp án đã lưu: ${q.answer}\nNgười học: ${a.value}\nGiải thích và cho một ví dụ.`);const self=host.querySelector('#vm-quiz-self');if(self)self.onclick=async()=>{a.isCorrect=true;a.selfAccepted=true;await this.persist();this.renderFeedback();};
  }
  move(delta){this.currentQuestionIndex=Math.max(0,Math.min(this.questions.length-1,this.currentQuestionIndex+delta));this.persist().catch(console.warn);this.renderCurrentQuestion();}
  goToNextQuestion(){this.move(1);}
  confirmSubmit(){
    const n=this.userAnswers.filter(a=>!a).length,d=window.vmPremium.dialog('Nộp bài kiểm tra',`<p>${n?`Còn ${n} câu chưa trả lời; các câu này sẽ được tính sai.`:'Bạn đã trả lời tất cả các câu.'}</p><div class="vm-actions"><button class="btn-primary" id="vm-submit-confirm">Nộp bài & xem kết quả</button><button class="btn-secondary" id="vm-submit-back">Tiếp tục làm bài</button></div>`);d.querySelector('#vm-submit-confirm').onclick=()=>{window.vmPremium.closeDialog();this.renderQuizResults();};d.querySelector('#vm-submit-back').onclick=()=>window.vmPremium.closeDialog();
  }
  async renderQuizResults(timedOut=false){
    if(this.finished)return;this.finished=true;this.running=false;if(this.timer)clearInterval(this.timer);
    const total=this.questions.length,score=this.userAnswers.filter(a=>a?.isCorrect).length,durationSeconds=Math.max(1,(Date.now()-this.startedAt)/1000);this.score=score;
    const results=this.questions.map((q,i)=>({cardId:q.card.id,word:q.card.word,prompt:q.prompt,expected:q.type==='tf'?(q.answer?'Đúng':'Sai'):String(q.answer),actual:this.userAnswers[i]?q.type==='tf'?(this.userAnswers[i].value?'Đúng':'Sai'):String(this.userAnswers[i].value):'Chưa trả lời',isCorrect:!!this.userAnswers[i]?.isCorrect,selfAccepted:!!this.userAnswers[i]?.selfAccepted}));
    const record={id:crypto.randomUUID(),date:new Date().toISOString(),title:this.moduleTitle,score,total,durationSeconds,mode:this.feedbackMode,results};let saveError='';
    try{const old=await window.vocabDB.get('settings','vm-test-history');await window.vocabDB.put('settings',{key:'vm-test-history',value:[record,...(old?.value||[])].slice(0,50)});await window.vocabDB.logStudyActivity(0,0,1,durationSeconds/60);await this.persist();}catch(error){saveError=error.message;}
    const e=window.VMLearning.escape,host=document.getElementById('quiz-active-container');document.getElementById('quiz-counter-text').textContent='Kết quả bài kiểm tra';document.getElementById('quiz-progress-bar').style.width='100%';
    host.innerHTML=`<section class="vm-complete"><span class="vm-eyebrow">${timedOut?'ĐÃ HẾT THỜI GIAN':'BÀI KIỂM TRA HOÀN TẤT'}</span><h1>${score}/${total} · ${Math.round(score/total*100)}%</h1><p>${e(this.moduleTitle)} · ${Math.round(durationSeconds)} giây</p>${saveError?`<p class="vm-error">Kết quả chưa lưu được: ${e(saveError)}</p>`:''}<div class="vm-actions"><button id="vm-quiz-wrong" class="btn-primary" ${score===total?'disabled':''}>Ôn riêng câu sai</button><button id="vm-quiz-retry" class="btn-secondary">Làm lại</button><button id="vm-quiz-print" class="btn-secondary">In kết quả</button><button id="vm-quiz-export" class="btn-secondary">Xuất kết quả</button><button id="vm-quiz-return" class="btn-secondary">Về học phần</button></div></section><section class="vm-result-list">${results.map((r,i)=>`<article class="vm-result-row ${r.isCorrect?'correct':'incorrect'}"><div class="vm-result-status">${r.isCorrect?'✓':'×'}</div><div><h3>${i+1}. ${e(r.prompt)}</h3><p>Bạn trả lời: ${e(r.actual)}</p><p>Đáp án: <strong>${e(r.expected)}</strong>${r.selfAccepted?' · tự chấp nhận':''}</p></div><button class="btn-secondary" data-review="${i}">✦ Giải thích</button></article>`).join('')}</section>`;
    host.querySelector('#vm-quiz-wrong').onclick=()=>{const ids=new Set(results.filter(r=>!r.isCorrect).map(r=>r.cardId));this.openQuizModal(this.activeCards.filter(c=>ids.has(c.id)),this.moduleTitle+' · câu sai');};host.querySelector('#vm-quiz-retry').onclick=()=>this.openQuizModal(this.activeCards,this.moduleTitle);host.querySelector('#vm-quiz-print').onclick=()=>window.print();host.querySelector('#vm-quiz-export').onclick=()=>window.vmPremium.download('VocabMaster-test-result.json',JSON.stringify(record,null,2),'application/json');host.querySelector('#vm-quiz-return').onclick=()=>window.app.navigate('modules');host.querySelectorAll('[data-review]').forEach(b=>b.onclick=()=>{const r=results[Number(b.dataset.review)];window.vmPremium.tutor(`Câu hỏi: ${r.prompt}\nĐáp án: ${r.expected}\nNgười học: ${r.actual}`);});window.soundEngine.playVictorySound();
  }
}
window.quizEngine=new QuizEngine();
