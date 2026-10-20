/* Local adaptive practice: recognition -> retrieval, with spaced retry and a durable checkpoint. */
class AdaptiveLearn {
  constructor() { this.running=false;this.saving=false; }
  async start(cards,moduleId,title,options) {
    this.cards=[...cards];this.moduleId=moduleId;this.title=title||'Learn';this.options=options;
    this.levels=Object.fromEntries(cards.map(c=>[c.id,0]));this.queue=window.VMLearning.shuffle(cards.map(c=>c.id));
    this.correct=0;this.attempts=0;this.startedAt=Date.now();this.elapsed=0;this.completed=false;
    this.running=true;window.app.showView('learn');await this.persist();this.render();
  }
  async resume(state) {
    const cards=await window.vocabDB.getCards();const wanted=new Set(state.cardIds);
    this.cards=cards.filter(c=>wanted.has(c.id));if(!this.cards.length)return window.vmPremium.notify('Các thẻ trong phiên trước đã bị xóa.','info');
    Object.assign(this,{moduleId:state.moduleId,title:state.title,options:state.options,levels:state.levels,correct:state.correct||0,attempts:state.attempts||0,elapsed:state.elapsed||0});
    this.queue=state.queue.filter(id=>this.cards.some(c=>c.id===id));this.startedAt=Date.now();this.completed=false;this.running=true;
    window.app.showView('learn');this.render();
  }
  pause() { if(this.running&&!this.completed){this.elapsed+=Date.now()-this.startedAt;this.startedAt=Date.now();this.running=false;this.persist().catch(console.warn);} }
  target() { return this.options.goal==='master'?2:1; }
  async persist() {
    await window.vocabDB.put('settings',{key:'vm-learn-resume',value:this.completed?null:{moduleId:this.moduleId,title:this.title,options:this.options,cardIds:this.cards.map(c=>c.id),levels:this.levels,queue:this.queue,correct:this.correct,attempts:this.attempts,elapsed:this.elapsed+(this.running?Date.now()-this.startedAt:0)}});
  }
  render() {
    if(!this.queue.length)return this.finish();
    const card=this.cards.find(c=>c.id===this.queue[0]);if(!card){this.queue.shift();return this.render();}
    const goal=this.options.goal,level=this.levels[card.id]||0;
    const type=goal==='cloze'?'cloze':goal==='write'||goal==='master'&&level>0?'written':'mc';
    this.current=window.VMLearning.question(card,this.cards,type,this.options.direction);this.pending=null;this.saving=false;
    const q=this.current,e=window.VMLearning.escape,mastered=this.cards.filter(c=>(this.levels[c.id]||0)>=this.target()).length;
    document.getElementById('learn-root').innerHTML=`<header class="vm-session-top"><button class="btn-secondary" id="vm-learn-exit">← Tạm dừng</button><div><span class="vm-eyebrow">LEARN THÍCH NGHI</span><h2>${e(this.title)}</h2></div><strong>${mastered}/${this.cards.length} từ đã nhớ</strong></header><progress class="vm-progress" max="${this.cards.length}" value="${mastered}"></progress><section class="vm-question-card"><div class="vm-question-meta"><span class="vm-tag">${type==='mc'?'Nhận diện':'Tự nhớ'} · ${q.kind==='cloze'?'Điền khuyết':q.type==='written'?'Viết đáp án':'Chọn đáp án'}</span><button class="vm-icon-button" id="vm-learn-star" aria-label="Gắn sao thẻ">${card.starred?'★':'☆'}</button></div><h1>${e(q.prompt)}</h1>${q.type==='written'?'<form id="vm-learn-form"><label>Đáp án của bạn<input id="vm-learn-written" class="form-input vm-answer-input" autocomplete="off" autocapitalize="off" spellcheck="false" required></label><button class="btn-primary" type="submit">Kiểm tra đáp án</button></form>':`<div class="vm-answer-options">${q.options.map((v,i)=>`<button class="vm-answer-option" data-answer="${i}"><span>${i+1}</span>${e(v)}</button>`).join('')}</div>`}<div class="vm-question-footer"><button class="btn-secondary" id="vm-learn-skip">Chưa biết</button><details><summary>Gợi ý</summary><p>${e(card.hint||'Hãy nghĩ đến nghĩa và ngữ cảnh của từ trước khi xem đáp án.')}</p></details></div><div id="vm-learn-feedback" aria-live="polite"></div></section><p class="vm-note vm-center">Câu sai sẽ quay lại sau các thẻ khác. Bạn có thể dừng và tiếp tục bất cứ lúc nào.</p>`;
    const root=document.getElementById('learn-root');root.querySelector('#vm-learn-exit').onclick=()=>window.app.navigate('modules');
    root.querySelector('#vm-learn-star').onclick=async event=>{const fresh=await window.vocabDB.getCard(card.id);if(!fresh)return;card.starred=!fresh.starred;await window.vocabDB.saveCard({...fresh,starred:card.starred});event.target.textContent=card.starred?'★':'☆';};
    root.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>this.answer(q.options[Number(b.dataset.answer)]));
    const form=root.querySelector('form');if(form){form.onsubmit=event=>{event.preventDefault();this.answer(root.querySelector('input').value);};root.querySelector('input').focus();}
    root.querySelector('#vm-learn-skip').onclick=()=>this.answer('');
  }
  answer(value) {
    if(this.pending)return;
    const q=this.current,result=window.VMLearning.grade(value,q.accepted,this.options.grading);
    this.pending={value:String(value),correct:result.correct,typo:result.typo};this.feedback();
  }
  feedback() {
    const p=this.pending,q=this.current,e=window.VMLearning.escape,root=document.getElementById('learn-root');
    root.querySelectorAll('[data-answer],#vm-learn-written,#vm-learn-form button,#vm-learn-skip').forEach(el=>el.disabled=true);
    const out=root.querySelector('#vm-learn-feedback');out.innerHTML=`<div class="vm-feedback ${p.correct?'correct':'incorrect'}"><h3>${p.correct?'Đúng rồi'+(p.typo?' · chấp nhận lỗi gõ nhỏ':''):'Chưa đúng — cùng xem lại'}</h3><p><strong>Đáp án:</strong> ${e(q.answer)}</p>${q.card.definitions?.[0]?.exampleEn?`<p>${e(q.card.definitions[0].exampleEn)}</p>`:''}<div class="vm-actions"><button id="vm-learn-next" class="btn-primary">${p.correct?'Tiếp tục':'Đã hiểu, ôn lại sau'}</button>${!p.correct&&p.value?'<button id="vm-learn-override" class="btn-secondary">Tự chấp nhận đáp án này</button>':''}<button id="vm-learn-ai" class="btn-secondary">✦ Vì sao?</button></div></div>`;
    out.querySelector('#vm-learn-next').onclick=()=>this.next();
    const override=out.querySelector('#vm-learn-override');if(override)override.onclick=()=>{this.pending.correct=true;this.pending.selfAccepted=true;this.feedback();};
    out.querySelector('#vm-learn-ai').onclick=()=>window.vmPremium.tutor(`Câu hỏi: ${q.prompt}\nĐáp án lưu trong bộ thẻ: ${q.answer}\nNgười học trả lời: ${p.value}\nGiải thích ngắn vì sao đáp án đúng và một mẹo ghi nhớ.`);
    out.querySelector('#vm-learn-next').focus();
  }
  async next() {
    if(this.saving||!this.pending)return;this.saving=true;
    const q=this.current,p=this.pending,oldLevel=this.levels[q.card.id]||0;
    const nextLevel=p.correct?oldLevel+1:Math.max(0,oldLevel-1);
    try {
      const fresh=await window.vocabDB.getCard(q.card.id);if(!fresh)throw new Error('Thẻ đã bị xóa. Hãy quay lại học phần.');
      let update={...fresh,learnAttempts:(fresh.learnAttempts||0)+1,learnCorrect:(fresh.learnCorrect||0)+(p.correct?1:0)};
      if(!p.correct)update=window.srsEngine.calculateNextState(update,'again');
      else if(nextLevel>=this.target())update=window.srsEngine.calculateNextState(update,'good');
      const levels={...this.levels,[q.card.id]:nextLevel},queue=this.queue.slice(1);
      if(nextLevel<this.target())queue.splice(Math.min(queue.length,2),0,q.card.id);
      const date=window.vocabDB.getLocalDateString(),id='log-'+date,old=await window.vocabDB.get('study_logs',id);
      const log={...(old||{}),id,date,cardsReviewed:(old?.cardsReviewed||0)+1,cardsMastered:(old?.cardsMastered||0)+(p.correct&&nextLevel>=this.target()?1:0)};
      const correct=this.correct+(p.correct?1:0),attempts=this.attempts+1;
      const state={moduleId:this.moduleId,title:this.title,options:this.options,cardIds:this.cards.map(c=>c.id),levels,queue,correct,attempts,elapsed:this.elapsed+Date.now()-this.startedAt};
      await window.vocabDB.putBatch({cards:[update],study_logs:[log],settings:[{key:'vm-learn-resume',value:state}]});
      this.levels=levels;this.queue=queue;this.correct=correct;this.attempts=attempts;
      this.cards[this.cards.findIndex(c=>c.id===q.card.id)]=update;this.render();
    }catch(error){this.saving=false;window.vmPremium.notify(error.message,'danger');}
  }
  async finish() {
    if(this.completed)return;this.completed=true;this.running=false;
    const totalTime=this.elapsed+Date.now()-this.startedAt;
    await window.vocabDB.logStudyActivity(0,0,0,totalTime/60000);
    const all=this.moduleId?await window.vocabDB.getCardsByModule(this.moduleId):[];
    if(all.length&&all.length===this.cards.length&&all.every(c=>(this.levels[c.id]||0)>=this.target()))await window.vocabDB.logModuleCompleted(this.moduleId,0,0);
    await this.persist();
    const e=window.VMLearning.escape;document.getElementById('learn-root').innerHTML=`<section class="vm-complete"><span class="vm-eyebrow">PHIÊN HỌC HOÀN TẤT</span><h1>Đã luyện nhớ ${this.cards.length} từ.</h1><p>${e(this.title)}</p><div class="vm-summary-metrics"><div><strong>${this.attempts?Math.round(this.correct/this.attempts*100):0}%</strong><span>Đúng trên số lượt thử</span></div><div><strong>${this.attempts}</strong><span>Lượt trả lời</span></div><div><strong>${Math.round(totalTime/60000*10)/10}</strong><span>Phút học</span></div></div><div class="vm-actions"><button class="btn-primary" id="vm-learn-again">Luyện lại</button><button class="btn-secondary" id="vm-learn-finish">Về học phần</button></div></section>`;
    document.getElementById('vm-learn-again').onclick=()=>this.start(this.cards,this.moduleId,this.title,this.options);
    document.getElementById('vm-learn-finish').onclick=()=>window.app.navigate('modules');
    window.soundEngine.playVictorySound();
  }
}
window.learnEngine=new AdaptiveLearn();
