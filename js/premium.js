/* Additions to the existing app. Existing folders, audio, games and calendar stay in place. */
class VocabPremium {
  constructor() {
    this.settings = {newLimit:20,speechRate:.92,model:'gemma3:4b',grading:'strict',dailyGoal:20};
    this.aiController = null;
    this.generatedCards = [];
    this.tab = 'ai';
    this.pauseTokens = 0;
  }
  get E() { return window.VMLearning.escape; }
  async init() {
    const saved=await window.vocabDB.get('settings','vm-pro-settings');
    if(saved?.value)this.settings={...this.settings,...saved.value};
    this.hookApp();this.addTools();this.setupQuiz();this.setupStudy();
    window.addEventListener('keydown',e=>{if(e.key==='Escape')this.closeDialog();});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)window.studySession?.stopAutoplay?.();});
  }
  async saveSettings() { await window.vocabDB.put('settings',{key:'vm-pro-settings',value:this.settings}); }
  notify(message,type='success') { window.app.showToast(message,type); }
  addTools() {
    const nav=document.querySelector('.header-nav-links');
    const button=document.createElement('button');button.className='nav-link vm-studio-nav';button.dataset.nav='studio';button.textContent='✦ Studio';button.addEventListener('click',()=>window.app.navigate('studio'));nav.append(button);
    const hero=document.createElement('div');hero.className='vm-feature-strip';hero.innerHTML=`<div><span class="vm-eyebrow">BÀN HỌC CỦA BẠN</span><h2>Học sâu hơn. Nhớ lâu hơn.</h2><p>Learn thích nghi · thẻ đa phương tiện · AI chạy trên máy</p></div><div class="vm-actions"><button class="btn-primary" id="vm-open-studio">✦ Mở Studio</button><button class="btn-secondary" id="vm-open-import">Nhập bộ thẻ</button><button class="btn-secondary" id="vm-open-settings">Tùy chọn học</button></div>`;
    document.getElementById('view-dashboard').prepend(hero);
    hero.querySelector('#vm-open-studio').onclick=()=>this.openStudio('ai');
    hero.querySelector('#vm-open-import').onclick=()=>this.openStudio('import');
    hero.querySelector('#vm-open-settings').onclick=()=>this.openStudio('settings');
  }
  hookApp() {
    const app=window.app;
    const navigate=app.navigate.bind(app);
    app.navigate=async(view,params={})=>{
      if(view!=='study')window.studySession?.stopAutoplay?.();
      if(view!=='learn')window.learnEngine?.pause();
      if(view!=='quiz')window.quizEngine?.pause();
      const result=await navigate(view,params);
      if(view==='studio')await this.renderStudio();
      if(view==='analytics')await this.renderHistory();
      return result;
    };
    const showView=app.showView.bind(app);
    app.showView=view=>{const name=view.replace(/^view-/,'');if(name!=='study')window.studySession?.stopAutoplay?.();if(name!=='learn')window.learnEngine?.pause();if(name!=='quiz')window.quizEngine?.pause();showView(view);};
    const renderModules=app.renderModulesView.bind(app);
    app.renderModulesView=async(...args)=>{
      await renderModules(...args);
      const container=document.getElementById('modules-grid-container');
      let tools=document.getElementById('vm-module-search');
      if(!tools){tools=document.createElement('div');tools.id='vm-module-search';tools.className='vm-search-row';tools.innerHTML='<label>Tìm học phần<input type="search" class="form-input" placeholder="Tên học phần, chủ đề…" aria-label="Tìm học phần"></label>';container.before(tools);tools.querySelector('input').oninput=e=>{for(const card of container.querySelectorAll('.module-card'))card.hidden=!window.VMLearning.normalize(card.textContent).includes(window.VMLearning.normalize(e.target.value));};}
      tools.querySelector('input').value='';
      for(const card of container.querySelectorAll('.module-card')) {
        const study=card.querySelector('[onclick*="startStudyModule"]');const match=study?.getAttribute('onclick')?.match(/startStudyModule\('([^']+)'\)/);if(!match)continue;
        const id=match[1];
        const button=document.createElement('button');button.type='button';button.className='vm-learn-button';button.textContent='✦ Learn thích nghi';button.onclick=()=>this.configureLearn(id);card.querySelector('.module-action-buttons').prepend(button);
      }
    };
    app.renderCardsView=moduleId=>this.renderCards(moduleId||app.selectedModuleId);
    app.startStudyModule=id=>this.configureStudy(id);
  }
  dialog(title,html,wide=false) {
    this.closeDialog();window.studySession?.stopAutoplay?.();
    const overlay=document.createElement('div');overlay.id='vm-pro-modal';overlay.className='modal-overlay vm-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label',title);
    overlay.innerHTML=`<div class="vm-dialog ${wide?'vm-dialog-wide':''}"><header><h2>${this.E(title)}</h2><button type="button" class="vm-icon-button" aria-label="Đóng hộp thoại">✕</button></header><div class="vm-dialog-body">${html}</div></div>`;
    overlay.querySelector('header button').onclick=()=>this.closeDialog();
    overlay.onclick=e=>{if(e.target===overlay)this.closeDialog();};
    document.body.append(overlay);overlay.querySelector('input,textarea,select,button')?.focus();
    const trap=e=>{if(e.key!=='Tab')return;const focus=[...overlay.querySelectorAll('button,input,select,textarea,a[href]')].filter(el=>!el.disabled&&el.getClientRects().length);const first=focus[0],last=focus.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}};
    overlay.addEventListener('keydown',trap);return overlay;
  }
  closeDialog() {
    window.study4Workspace?.editor?.aiController?.abort();
    clearTimeout(this.recordTimer);document.getElementById('vm-pro-modal')?.remove();
    if(this.mediaRecorder?.state==='recording')this.mediaRecorder.stop();
    this.mediaStream?.getTracks().forEach(track=>track.stop());
  }
  async configureStudy(moduleId) {
    const mod=await window.vocabDB.getModule(moduleId),cards=await window.vocabDB.getCardsByModule(moduleId);
    if(!cards.length)return this.notify('Học phần chưa có thẻ.','info');
    const resume=await window.vocabDB.get('settings','vm-study-resume');
    const canResume=resume?.value?.moduleId===moduleId;
    const d=this.dialog('Tùy chọn Flashcards',`<p class="vm-subtitle">${this.E(mod?.title)} · ${cards.length} thẻ</p><div class="vm-option-grid"><label>Cách học<select id="vm-study-mode" class="form-select"><option value="srs">Ôn ngắt quãng · 4 mức đánh giá</option><option value="browse">Duyệt thẻ · không đổi lịch ôn</option></select></label><label>Mặt trước<select id="vm-study-side" class="form-select"><option value="word">Từ tiếng Anh</option><option value="meaning">Nghĩa tiếng Việt</option></select></label><label>Lọc thẻ<select id="vm-study-filter" class="form-select"><option value="all">Tất cả thẻ</option><option value="due">Đến hạn + thẻ mới hôm nay</option><option value="starred">Chỉ thẻ gắn sao</option><option value="weak">Từ hay sai</option></select></label><label class="vm-check"><input id="vm-study-shuffle" type="checkbox">Trộn thứ tự thẻ</label></div><p class="vm-note">Vuốt và phát âm UK/US vẫn giữ nguyên. Hoàn tác khôi phục lịch ôn và số lượt vừa ghi nhận.</p><div class="vm-actions"><button class="btn-primary" id="vm-study-start">Bắt đầu học</button>${canResume?'<button class="btn-secondary" id="vm-study-resume">Tiếp tục phiên trước</button>':''}</div>`);
    d.querySelector('#vm-study-start').onclick=async()=>{
      let pool=[...cards];const filter=d.querySelector('#vm-study-filter').value;
      if(filter==='due')pool=this.dueSelection(pool,await window.vocabDB.getCards());
      if(filter==='starred')pool=pool.filter(c=>c.starred);
      if(filter==='weak')pool=window.srsEngine.analyzeKnowledgeGaps(pool).weakCards;
      if(!pool.length)return this.notify('Không có thẻ khớp bộ lọc.','info');
      if(d.querySelector('#vm-study-shuffle').checked)pool=window.VMLearning.shuffle(pool);
      const options={mode:d.querySelector('#vm-study-mode').value,reverse:d.querySelector('#vm-study-side').value==='meaning'};
      window.studySession.pendingOptions=options;this.closeDialog();window.app.startStudyCards(pool,mod.title,moduleId);
    };
    if(canResume)d.querySelector('#vm-study-resume').onclick=()=>{this.closeDialog();window.studySession.resume(resume.value);};
  }
  dueSelection(cards,allCards=cards) {
    const existing=cards.filter(c=>c.reviewCount>0&&window.srsEngine.isDueForReview(c)).sort((a,b)=>new Date(a.nextReviewDate)-new Date(b.nextReviewDate));
    const today=window.vocabDB.getLocalDateString();
    const learnedToday=allCards.filter(c=>c.reviewCount>0&&(c.firstReviewedAt||c.history?.[0]?.date)&&window.vocabDB.getLocalDateString(new Date(c.firstReviewedAt||c.history[0].date))===today).length;
    const allowance=Math.max(0,Number(this.settings.newLimit)-learnedToday);
    return [...existing,...cards.filter(c=>!c.reviewCount).slice(0,allowance)];
  }
  setupStudy() {
    const container=document.querySelector('.study-controls-bar');container.innerHTML='<div id="vm-rating-buttons" class="vm-rating-grid"></div><div id="vm-browse-controls" class="vm-actions hidden"></div>';
    const tool=document.createElement('div');tool.className='vm-study-tools';tool.id='vm-study-tools';tool.innerHTML='<button class="btn-secondary" id="vm-study-undo">↶ Hoàn tác</button><button class="btn-secondary" id="vm-study-star" aria-label="Gắn sao thẻ">☆ Gắn sao</button><button class="btn-secondary" id="vm-study-hint">Gợi ý</button><button class="btn-secondary" id="vm-study-auto">▷ Tự phát</button><button class="btn-secondary" id="vm-study-edit">Sửa thẻ</button><button class="btn-secondary" id="vm-study-tutor">✦ Giải thích</button>';
    document.getElementById('study-card-container').before(tool);
    tool.querySelector('#vm-study-undo').onclick=()=>window.studySession.undo();
    tool.querySelector('#vm-study-star').onclick=async()=>{const s=window.studySession,c=s.getCurrentCard();if(!c)return;const saved=await window.vocabDB.getCard(c.id);if(!saved)return;await window.vocabDB.saveCard({...saved,starred:!saved.starred});c.starred=!saved.starred;this.updateStudyTools();};
    tool.querySelector('#vm-study-hint').onclick=()=>{const c=window.studySession.getCurrentCard();if(!c)return;const hint=c.hint||c.definitions?.[0]?.context||`Bắt đầu bằng “${c.word?.[0]||''}” · ${c.word?.length||0} ký tự`;this.dialog('Gợi ý',`<p class="vm-tutor-text">${this.E(hint)}</p>`);};
    tool.querySelector('#vm-study-auto').onclick=()=>window.studySession.toggleAutoplay();
    tool.querySelector('#vm-study-edit').onclick=()=>{const c=window.studySession.getCurrentCard();if(c)this.editCard(c.id);};
    tool.querySelector('#vm-study-tutor').onclick=()=>{const c=window.studySession.getCurrentCard();if(c)this.tutor(`Từ: ${c.word}\nNghĩa đã lưu: ${window.VMLearning.meaning(c)}\nVí dụ: ${c.definitions?.[0]?.exampleEn||''}`);};
  }
  updateStudyTools() {
    const s=window.studySession,c=s.getCurrentCard(),e=this.E;if(!c)return;
    document.getElementById('vm-study-tools').hidden=false;
    document.getElementById('vm-study-star').textContent=c.starred?'★ Đã gắn sao':'☆ Gắn sao';
    document.getElementById('vm-study-undo').disabled=!s.undoStack?.length;
    const ratings=document.getElementById('vm-rating-buttons'),browse=document.getElementById('vm-browse-controls');
    const isBrowse=s.options?.mode==='browse';ratings.classList.toggle('hidden',isBrowse);browse.classList.toggle('hidden',!isBrowse);
    if(isBrowse){browse.innerHTML='<button class="btn-secondary" data-move="-1">← Thẻ trước</button><button class="btn-primary" data-flip>Lật thẻ</button><button class="btn-secondary" data-move="1">Thẻ tiếp →</button>';browse.querySelectorAll('[data-move]').forEach(b=>b.onclick=()=>s.moveBrowse(Number(b.dataset.move)));browse.querySelector('[data-flip]').onclick=()=>s.flipCard();document.getElementById('vm-study-auto').disabled=false;}
    else {ratings.innerHTML=[['again','Xem lại'],['hard','Khó'],['good','Ổn'],['easy','Dễ']].map(([value,label])=>`<button class="vm-rate vm-rate-${value}" data-rating="${value}"><strong>${label}</strong><span>${e(window.VMLearning.interval(c,value))}</span></button>`).join('');ratings.querySelectorAll('button').forEach(b=>b.onclick=()=>s.handleAnswer(b.dataset.rating));document.getElementById('vm-study-auto').disabled=true;}
  }
  mistakesMarkup(card) {
    const rows=(card.study4Mistakes||[]).slice(-3),e=this.E;
    return rows.length?`<div class="usage-notes-box"><div class="notes-header">↶ Lỗi trước đây trên Study4</div>${rows.map(r=>`<p class="notes-body">${e(r.attempt||'(bỏ trống)')} → <strong>${e((r.acceptedAnswers||[card.word]).join(' / '))}</strong></p>`).join('')}</div>`:'';
  }
  imageMarkup(card,reveal=false) {
    const src=window.VMLearning.safeMedia(card.imageData);if(!src.startsWith('data:image/'))return '';
    const masks=!reveal&&card.occlusion?'<span class="vm-image-mask" style="left:'+Math.max(0,Math.min(85,Number(card.occlusion.x)||0))+'%;top:'+Math.max(0,Math.min(85,Number(card.occlusion.y)||0))+'%">?</span>':'';
    return `<div class="vm-card-image"><img src="${src}" alt="Hình minh họa của thẻ">${masks}</div>`;
  }
  async renderCards(moduleId) {
    window.app.selectedModuleId=moduleId;const mod=await window.vocabDB.getModule(moduleId),cards=await window.vocabDB.getCardsByModule(moduleId);
    document.getElementById('cards-view-title').textContent=mod?.title||'Flashcards';
    const host=document.getElementById('cards-list-container'),e=this.E;
    host.innerHTML=`<div class="vm-library-toolbar"><label>Tìm từ, nghĩa hoặc ghi chú<input id="vm-card-search" class="form-input" type="search" placeholder="Tìm trong học phần…"></label><label>Lọc<select id="vm-card-filter" class="form-select"><option value="all">Tất cả ${cards.length} thẻ</option><option value="starred">Đã gắn sao</option><option value="due">Đến hạn</option><option value="weak">Hay sai</option></select></label><div class="vm-actions"><button class="btn-primary" id="vm-cards-learn">✦ Learn</button><button class="btn-secondary" id="vm-cards-test">Kiểm tra</button><button class="btn-secondary" id="vm-cards-import">Nhập thêm</button><button class="btn-secondary" id="vm-cards-export">Xuất TSV</button></div></div><p id="vm-card-count" class="vm-note"></p><div id="vm-card-rows"></div>`;
    const render=()=>{
      const term=window.VMLearning.normalize(host.querySelector('#vm-card-search').value),filter=host.querySelector('#vm-card-filter').value;
      const weak=new Set(window.srsEngine.analyzeKnowledgeGaps(cards).weakCards.map(c=>c.id));
      const filtered=cards.filter(c=>window.VMLearning.normalize([c.word,window.VMLearning.meaning(c),c.usageNotes].join(' ')).includes(term)&&(filter==='all'||filter==='starred'&&c.starred||filter==='due'&&window.srsEngine.isDueForReview(c)||filter==='weak'&&weak.has(c.id)));
      this.filteredCards=filtered;host.querySelector('#vm-card-count').textContent=`${filtered.length}/${cards.length} thẻ · ${cards.filter(c=>c.starred).length} đã gắn sao`;
      host.querySelector('#vm-card-rows').innerHTML=filtered.length?filtered.map(c=>`<article class="vm-card-row"><button class="vm-star ${c.starred?'is-starred':''}" data-star="${e(c.id)}" aria-label="${c.starred?'Bỏ sao':'Gắn sao'} ${e(c.word)}">${c.starred?'★':'☆'}</button><div><h3>${e(c.word)}</h3><p class="vm-note">${e(c.ipaUk||c.ipaUs||'')} ${e(c.wordType||'')}</p>${c.study4Mistakes?.length?`<p class="vm-note">Lần trước: ${e(c.study4Mistakes.at(-1).attempt||'(bỏ trống)')}</p>`:''}${c.imageData?'<span class="vm-tag">Có hình ảnh</span>':''}${window.VMLearning.cloze(c)?'<span class="vm-tag">Có điền khuyết</span>':''}</div><div><p>${e(window.VMLearning.meaning(c))}</p><p class="vm-note">${e(c.primaryMeaningEn||'')}</p></div><div class="vm-actions"><button class="vm-icon-button" data-speak="${e(c.id)}" aria-label="Nghe ${e(c.word)}">🔊</button><button class="btn-secondary" data-edit="${e(c.id)}">Sửa</button><button class="vm-icon-button" data-ai="${e(c.id)}" aria-label="Giải thích ${e(c.word)}">✦</button></div></article>`).join(''):'<div class="vm-empty">Không có thẻ khớp. Thử thay bộ lọc hoặc nhập bộ thẻ mới.</div>';
      host.querySelectorAll('[data-star]').forEach(b=>b.onclick=async()=>{const c=cards.find(c=>c.id===b.dataset.star);const fresh=await window.vocabDB.getCard(c.id);c.starred=!fresh.starred;await window.vocabDB.saveCard({...fresh,starred:c.starred});render();});
      host.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>this.editCard(b.dataset.edit));
      host.querySelectorAll('[data-speak]').forEach(b=>b.onclick=()=>{const c=cards.find(c=>c.id===b.dataset.speak);window.soundEngine.speak(c.word,'US',c.customAudioData||c.audioUsUrl);});
      host.querySelectorAll('[data-ai]').forEach(b=>b.onclick=()=>{const c=cards.find(c=>c.id===b.dataset.ai);this.tutor(`Giải thích từ ${c.word}: ${window.VMLearning.meaning(c)}`);});
    };
    host.querySelector('#vm-card-search').oninput=render;host.querySelector('#vm-card-filter').onchange=render;
    host.querySelector('#vm-cards-learn').onclick=()=>this.configureLearn(moduleId,this.filteredCards);
    host.querySelector('#vm-cards-test').onclick=()=>window.quizEngine.openQuizModal(this.filteredCards,mod?.title||'Bài kiểm tra');
    host.querySelector('#vm-cards-import').onclick=()=>{this.importModuleId=moduleId;this.openStudio('import');};
    host.querySelector('#vm-cards-export').onclick=()=>{const quote=v=>'"'+String(v||'').replace(/"/g,'""')+'"';this.download((mod?.title||'flashcards')+'.tsv','word\tmeaning\texample\n'+this.filteredCards.map(c=>[c.word,window.VMLearning.meaning(c),c.definitions?.[0]?.exampleEn||''].map(quote).join('\t')).join('\n'),'text/tab-separated-values');};render();
  }
  async editCard(id) {
    const card=await window.vocabDB.getCard(id);if(!card)return;
    const e=this.E;this.editMedia={imageData:card.imageData||'',customAudioData:card.customAudioData||'',occlusion:card.occlusion||null};
    const d=this.dialog('Chỉnh sửa thẻ',`<div class="vm-option-grid"><label>Từ / câu hỏi<input id="vm-edit-word" class="form-input" value="${e(card.word)}"></label><label>Nghĩa / đáp án<textarea id="vm-edit-meaning" class="form-input">${e(window.VMLearning.meaning(card))}</textarea></label><label>Đáp án khác được chấp nhận (ngăn bằng ;)<input id="vm-edit-alias" class="form-input" value="${e((card.aliases||[]).join('; '))}"></label><label>Gợi ý ngắn<input id="vm-edit-hint" class="form-input" value="${e(card.hint||'')}"></label></div><label>Câu ví dụ / điền khuyết<textarea id="vm-edit-example" class="form-input" placeholder="Câu tiếng Anh có chứa chính xác từ trên…">${e(card.clozeText||card.definitions?.[0]?.exampleEn||'')}</textarea></label><label>Ghi chú<textarea id="vm-edit-notes" class="form-input">${e(card.usageNotes||'')}</textarea></label><div class="vm-media-panel"><label>Ảnh riêng (PNG/JPG/WebP/GIF, tối đa 2 MB)<input id="vm-edit-image" type="file" accept="image/png,image/jpeg,image/webp,image/gif"></label><div id="vm-edit-image-preview"></div><p class="vm-note">Nhấp vào ảnh để che một vùng; mặt sau sẽ hiện ảnh đầy đủ. Đáp án là từ/câu hỏi của thẻ.</p><button class="btn-secondary" id="vm-remove-image">Bỏ ảnh</button><button class="btn-secondary" id="vm-remove-mask">Bỏ vùng che</button></div><div class="vm-media-panel"><label>Âm thanh riêng (tối đa 4 MB)<input id="vm-edit-audio" type="file" accept="audio/mpeg,audio/wav,audio/ogg,audio/webm,audio/mp4,audio/aac"></label><div id="vm-edit-audio-preview"></div><div class="vm-actions"><button class="btn-secondary" id="vm-record">● Ghi âm</button><button class="btn-secondary" id="vm-remove-audio">Bỏ âm thanh</button></div></div><div class="vm-actions"><button class="btn-primary" id="vm-save-edit">Lưu thay đổi</button><button class="btn-secondary" id="vm-edit-tutor">✦ AI giải thích</button></div>`,true);
    const preview=()=>{
      d.querySelector('#vm-edit-image-preview').innerHTML=this.imageMarkup(this.editMedia);
      const img=d.querySelector('#vm-edit-image-preview img');if(img)img.onclick=event=>{const r=img.getBoundingClientRect();this.editMedia.occlusion={x:Math.max(0,Math.min(85,(event.clientX-r.left)/r.width*100-7.5)),y:Math.max(0,Math.min(85,(event.clientY-r.top)/r.height*100-7.5))};preview();};
      d.querySelector('#vm-edit-audio-preview').innerHTML=this.editMedia.customAudioData?`<audio controls src="${window.VMLearning.safeMedia(this.editMedia.customAudioData)}"></audio>`:'';
    };
    d.querySelector('#vm-edit-image').onchange=async event=>{try{this.editMedia.imageData=await this.readDataFile(event.target.files[0],2_000_000,'image');this.editMedia.occlusion=null;preview();}catch(err){this.notify(err.message,'danger');}};
    d.querySelector('#vm-edit-audio').onchange=async event=>{try{this.editMedia.customAudioData=await this.readDataFile(event.target.files[0],4_000_000,'audio');preview();}catch(err){this.notify(err.message,'danger');}};
    d.querySelector('#vm-remove-image').onclick=()=>{this.editMedia.imageData='';this.editMedia.occlusion=null;preview();};d.querySelector('#vm-remove-mask').onclick=()=>{this.editMedia.occlusion=null;preview();};d.querySelector('#vm-remove-audio').onclick=()=>{this.editMedia.customAudioData='';preview();};
    d.querySelector('#vm-record').onclick=async()=>{
      try {
        if(this.mediaRecorder?.state==='recording'){this.mediaRecorder.stop();return;}
        if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw new Error('Trình duyệt chưa hỗ trợ ghi âm. Có thể chọn file âm thanh.');
        this.mediaStream=await navigator.mediaDevices.getUserMedia({audio:true});this.mediaRecorder=new MediaRecorder(this.mediaStream);const chunks=[];let size=0;
        this.mediaRecorder.ondataavailable=event=>{size+=event.data.size;if(size>4_000_000){this.mediaRecorder.stop();this.notify('Đã đạt giới hạn ghi âm 4 MB.','info');}chunks.push(event.data);};
        this.mediaRecorder.onstop=()=>{this.mediaStream.getTracks().forEach(track=>track.stop());d.querySelector('#vm-record').textContent='● Ghi âm';if(size>4_000_000)return;const blob=new Blob(chunks,{type:this.mediaRecorder.mimeType});const reader=new FileReader();reader.onload=()=>{if(!d.isConnected)return;this.editMedia.customAudioData=String(reader.result).replace(/^data:audio\/[^;,]+;codecs=[^;,]+;base64,/,'data:audio/webm;base64,');preview();};reader.readAsDataURL(blob);};
        clearTimeout(this.recordTimer);this.mediaRecorder.start(250);d.querySelector('#vm-record').textContent='■ Dừng ghi âm';this.recordTimer=setTimeout(()=>{if(this.mediaRecorder?.state==='recording')this.mediaRecorder.stop();},60000);
      }catch(err){this.notify(err.message,'danger');}
    };
    d.querySelector('#vm-save-edit').onclick=async()=>{
      const word=d.querySelector('#vm-edit-word').value.trim(),meaning=d.querySelector('#vm-edit-meaning').value.trim();if(!word||!meaning)return this.notify('Nhập từ và nghĩa trước khi lưu.','info');
      try { const fresh=await window.vocabDB.getCard(id);if(!fresh)throw new Error('Thẻ đã bị xóa.');const example=d.querySelector('#vm-edit-example').value.trim();
        const next={...fresh,...this.editMedia,word,primaryMeaningVi:meaning,aliases:d.querySelector('#vm-edit-alias').value.split(';').map(s=>s.trim()).filter(Boolean),hint:d.querySelector('#vm-edit-hint').value.trim(),usageNotes:d.querySelector('#vm-edit-notes').value.trim(),clozeText:example,definitions:[{...(fresh.definitions?.[0]||{}),meaningVi:meaning,exampleEn:example},...(fresh.definitions||[]).slice(1)],updatedAt:new Date().toISOString()};
        await window.vocabDB.saveCard(next);const s=window.studySession;const index=s.currentCards?.findIndex(c=>c.id===id);if(index>=0)s.currentCards[index]=next;
        this.closeDialog();if(!document.getElementById('view-cards').classList.contains('hidden'))await this.renderCards(fresh.moduleId);if(!document.getElementById('view-study').classList.contains('hidden'))s.renderCurrentCard();this.notify('Đã lưu thẻ và giữ lịch ôn hiện tại.');
      }catch(err){this.notify(err.message,'danger');}
    };
    d.querySelector('#vm-edit-tutor').onclick=()=>this.tutor(`Giải thích ${d.querySelector('#vm-edit-word').value}: ${d.querySelector('#vm-edit-meaning').value}`);preview();
  }
  readDataFile(file,limit,kind) {
    if(!file)return Promise.resolve('');if(file.size>limit)return Promise.reject(new Error(`File quá lớn; giới hạn ${limit/1_000_000} MB.`));
    if(!file.type.startsWith(kind+'/'))return Promise.reject(new Error('Định dạng file không phù hợp.'));
    return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>{let data=String(reader.result);if(kind==='audio')data=data.replace(/^data:audio\/[^;,]+;codecs=[^;,]+;base64,/,'data:audio/webm;base64,');if(!window.VMLearning.safeMedia(data))return reject(new Error('Định dạng chưa hỗ trợ. Dùng PNG/JPG/WebP hoặc MP3/WAV/OGG/WebM.'));resolve(data);};reader.onerror=()=>reject(new Error('Không đọc được file.'));reader.readAsDataURL(file);});
  }
  async configureLearn(moduleId,selection=null) {
    const mod=await window.vocabDB.getModule(moduleId),cards=selection||await window.vocabDB.getCardsByModule(moduleId);
    if(!cards.length)return this.notify('Không có thẻ để học.','info');
    const d=this.dialog('Learn thích nghi',`<p class="vm-subtitle">${this.E(mod?.title)} · ${cards.length} thẻ</p><p>Đi từ nhận diện đáp án đến tự nhớ và gõ lại. Câu sai được xen lại sau các từ khác.</p><div class="vm-option-grid"><label>Mục tiêu<select id="vm-learn-goal" class="form-select"><option value="master">Ghi nhớ: chọn đúng rồi viết đúng</option><option value="cram">Ôn nhanh: chọn đúng một lần</option><option value="write">Chỉ luyện viết</option><option value="cloze">Điền khuyết từ câu ví dụ</option></select></label><label>Mặt trả lời<select id="vm-learn-direction" class="form-select"><option value="word">Gõ từ tiếng Anh</option><option value="meaning">Gõ nghĩa tiếng Việt</option></select></label><label>Chấm đáp án<select id="vm-learn-grading" class="form-select"><option value="strict">Chính xác</option><option value="flexible">Chấp nhận một lỗi gõ nhỏ</option></select></label><label class="vm-check"><input id="vm-learn-starred" type="checkbox">Chỉ thẻ gắn sao</label></div><div class="vm-actions"><button id="vm-learn-start" class="btn-primary">Bắt đầu Learn</button><button id="vm-learn-resume" class="btn-secondary">Tiếp tục phiên đã lưu</button></div>`);
    d.querySelector('#vm-learn-grading').value=this.settings.grading;
    d.querySelector('#vm-learn-start').onclick=()=>{const goal=d.querySelector('#vm-learn-goal').value;let pool=d.querySelector('#vm-learn-starred').checked?cards.filter(c=>c.starred):cards;if(goal==='cloze')pool=pool.filter(c=>window.VMLearning.cloze(c));if(!pool.length)return this.notify('Không có thẻ khớp. Thêm câu ví dụ có chứa từ để học điền khuyết.','info');const options={goal,direction:d.querySelector('#vm-learn-direction').value,grading:d.querySelector('#vm-learn-grading').value};this.closeDialog();window.learnEngine.start(pool,moduleId,mod?.title,options);};
    d.querySelector('#vm-learn-resume').onclick=async()=>{const saved=await window.vocabDB.get('settings','vm-learn-resume');if(!saved?.value||saved.value.moduleId!==moduleId)return this.notify('Không có phiên đã lưu cho học phần này.','info');this.closeDialog();window.learnEngine.resume(saved.value);};
  }
  setupQuiz() {
    const select=document.getElementById('quiz-question-type');select.innerHTML='<option value="mc">Trắc nghiệm</option><option value="tf">Đúng / Sai</option><option value="written">Viết đáp án</option><option value="cloze">Điền khuyết từ ví dụ</option><option value="mixed">Kết hợp trắc nghiệm, Đúng/Sai, viết</option>';
    const panel=document.createElement('div');panel.className='vm-option-grid';panel.innerHTML='<label>Mặt trả lời<select id="vm-quiz-direction" class="form-select"><option value="meaning">Nghĩa tiếng Việt</option><option value="word">Từ tiếng Anh</option></select></label><label>Phản hồi<select id="vm-quiz-feedback-mode" class="form-select"><option value="practice">Giải thích sau mỗi câu</option><option value="exam">Chấm khi nộp bài</option></select></label><label>Giới hạn phút (0 = không giới hạn)<input id="vm-quiz-minutes" class="form-input" type="number" min="0" max="180" value="0"></label><label>Chấm đáp án<select id="vm-quiz-grading" class="form-select"><option value="strict">Chính xác</option><option value="flexible">Chấp nhận một lỗi gõ nhỏ</option></select></label><label class="vm-check"><input id="vm-quiz-starred" type="checkbox">Chỉ thẻ gắn sao</label>';
    document.querySelector('#quiz-setup-modal .modal-actions-footer').before(panel);
  }
  async openStudio(tab='ai') { this.tab=tab;await window.app.navigate('studio'); }
  async renderStudio() {
    const e=this.E,root=document.getElementById('studio-root');
    root.innerHTML=`<div class="vm-studio-header"><div><span class="vm-eyebrow">VOCABMASTER STUDIO</span><h1>Từ tài liệu đến kiến thức.</h1><p>Tạo nội dung, quản lý dữ liệu và cá nhân hóa cách học.</p></div><span class="vm-local-badge">● AI local · Ollama</span></div><nav class="vm-tabs" aria-label="Công cụ Studio">${[['ai','✦ Tạo thẻ với AI'],['guide','Hướng dẫn học'],['import','Nhập & sao lưu'],['settings','Thiết lập']].map(([id,label])=>`<button class="${this.tab===id?'active':''}" data-tab="${id}">${label}</button>`).join('')}</nav><div id="vm-studio-panel"></div>`;
    root.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{this.aiController?.abort();this.tab=b.dataset.tab;this.renderStudio();});
    if(this.tab==='ai'||this.tab==='guide')await this.renderAI();
    if(this.tab==='import')await this.renderImport();
    if(this.tab==='settings')this.renderSettings();
  }
  async renderAI() {
    const guide=this.tab==='guide',panel=document.getElementById('vm-studio-panel'),e=this.E;
    panel.innerHTML=`<div class="vm-studio-grid"><section class="vm-panel"><h2>${guide?'Tạo hướng dẫn học':'Biến ghi chú thành flashcards'}</h2><p class="vm-note">Dán nội dung hoặc chọn PDF, DOCX, TXT/MD hay ảnh. AI xử lý trên Ollama local. Xem lại nội dung trước khi lưu.</p><label>Nội dung nguồn<textarea id="vm-ai-source" class="form-input vm-source" maxlength="24000" placeholder="Ví dụ: negotiate — đàm phán; collaboration — hợp tác…"></textarea></label><label class="vm-file-drop">+ Chọn tài liệu hoặc ảnh<input id="vm-ai-file" type="file" accept=".txt,.md,.csv,.tsv,.pdf,.docx,.png,.jpg,.jpeg,.webp"></label><p id="vm-document-note" class="vm-note"></p><div class="vm-option-grid"><label>Model local<select id="vm-ai-model" class="form-select"><option>${e(this.settings.model)}</option></select></label>${guide?'':`<label>Số thẻ tối đa<input id="vm-ai-count" type="number" min="1" max="30" value="8" class="form-input"></label>`}</div><div class="vm-actions"><button class="btn-primary" id="vm-ai-generate">✦ ${guide?'Soạn hướng dẫn học':'Tạo bản nháp thẻ'}</button><button class="btn-secondary" id="vm-ai-cancel" hidden>Hủy</button></div><p id="vm-ai-status" class="vm-note" role="status">Đang kiểm tra Ollama…</p></section><section class="vm-panel"><h2>${guide?'Hướng dẫn học của bạn':'Bản nháp để xem lại'}</h2><div id="vm-ai-result" class="vm-ai-result"><div class="vm-empty">${guide?'Tóm tắt, ý chính và câu hỏi tự kiểm tra sẽ xuất hiện ở đây.':'Thẻ do AI tạo sẽ xuất hiện ở đây. Bạn có thể sửa hoặc bỏ từng thẻ trước khi lưu.'}</div></div></section></div>`;
    this.sourceImage='';
    panel.querySelector('#vm-ai-file').onchange=event=>this.readSourceFile(event.target.files[0]);
    panel.querySelector('#vm-ai-cancel').onclick=()=>this.aiController?.abort();
    panel.querySelector('#vm-ai-generate').onclick=async()=>{
      const source=panel.querySelector('#vm-ai-source').value,model=panel.querySelector('#vm-ai-model').value,count=Number(panel.querySelector('#vm-ai-count')?.value||8);
      const button=panel.querySelector('#vm-ai-generate'),cancel=panel.querySelector('#vm-ai-cancel'),status=panel.querySelector('#vm-ai-status');
      if(!source.trim()&&!this.sourceImage)return this.notify('Dán nội dung hoặc chọn ảnh trước.','info');
      button.disabled=true;cancel.hidden=false;status.textContent='Đang xử lý trên máy… lần đầu có thể cần nạp model.';
      try{const result=await this.requestAI(guide?'guide':'cards',source,{model,count,image:this.sourceImage});if(!document.getElementById('vm-ai-result'))return;if(guide)await this.renderGuide(result.data,source);else {this.generatedCards=result.data.cards.map(c=>({word:c.word,primaryMeaningVi:c.meaning,hint:c.hint,definitions:[{meaningVi:c.meaning,exampleEn:c.example}],source:'ollama-local',sourceModel:result.model}));await this.renderDraft(this.generatedCards,result.data.title||'Bộ thẻ AI');}status.textContent=`Hoàn tất · ${result.model} · nội dung AI cần được kiểm tra.`;}
      catch(error){status.textContent=error.name==='AbortError'?'Đã hủy tạo nội dung.':error.message;}
      finally{button.disabled=false;cancel.hidden=true;}
    };
    try{const response=await fetch('/api/ai/models');if(!response.ok)throw new Error();const data=await response.json();const select=panel.querySelector('#vm-ai-model');select.innerHTML=data.models.map(m=>`<option value="${e(m.name)}">${e(m.name)}</option>`).join('');if(data.models.some(m=>m.name===this.settings.model))select.value=this.settings.model;panel.querySelector('#vm-ai-status').textContent=data.models.length?'Ollama đã kết nối. Nội dung chỉ được gửi tới dịch vụ local trên máy.':'Ollama chưa có model. Cài model rồi mở lại Studio.';if(!data.models.length)panel.querySelector('#vm-ai-generate').disabled=true;}
    catch {panel.querySelector('#vm-ai-status').textContent='Chưa kết nối AI local. Mở app bằng launch_app.vbs hoặc start_app.bat và bảo đảm Ollama đang chạy.';}
    if(guide){const saved=await window.vocabDB.get('settings','vm-pro-guides');if(saved?.value?.length){const select=document.createElement('select');select.className='form-select';select.setAttribute('aria-label','Hướng dẫn học đã lưu');select.innerHTML='<option value="">Mở hướng dẫn đã lưu…</option>'+saved.value.map((g,i)=>`<option value="${i}">${e(g.title)}</option>`).join('');select.onchange=()=>{if(select.value!=='')this.renderGuide(saved.value[Number(select.value)],'',false);};panel.querySelector('#vm-ai-result').before(select);}}
  }
  async readSourceFile(file) {
    if(!file)return;const source=document.getElementById('vm-ai-source'),note=document.getElementById('vm-document-note');
    try {
      if(file.size>6_000_000)throw new Error('Tài liệu tối đa 6 MB.');
      this.sourceImage='';
      if(/\.(png|jpe?g|webp)$/i.test(file.name)){this.sourceImage=await this.readDataFile(file,4_000_000,'image');note.textContent=`Đã chọn ${file.name} · AI local sẽ đọc nội dung ảnh.`;return;}
      let text;
      if(/\.(pdf|docx)$/i.test(file.name)){
        note.textContent='Đang trích văn bản trên máy…';const base64=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result).split(',')[1]);r.onerror=reject;r.readAsDataURL(file);});
        const response=await fetch('/api/documents/extract',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:file.name,base64})});const data=await response.json();if(!response.ok)throw new Error(data.error);text=data.text;note.textContent=data.note;
      }else {text=await file.text();note.textContent=`Đã đọc ${file.name}.`;}
      source.value=text.slice(0,24000);if(text.length>24000)note.textContent+=' Chỉ dùng 24.000 ký tự đầu; có thể sửa nội dung trước khi tạo.';
    }catch(error){note.textContent=error.message;}
  }
  async requestAI(task,text,extra={}) {
    this.aiController?.abort();this.aiController=new AbortController();
    const response=await fetch('/api/ai/generate',{method:'POST',headers:{'Content-Type':'application/json'},signal:this.aiController.signal,body:JSON.stringify({task,text,model:this.settings.model,...extra})});
    let data;try{data=await response.json();}catch{throw new Error('AI local cần chạy qua launch_app.vbs hoặc start_app.bat.');}
    if(!response.ok)throw new Error(data.error||'Không kết nối được Ollama.');return data;
  }
  async renderDraft(cards,title,hostId='vm-ai-result') {
    const host=document.getElementById(hostId),modules=await window.vocabDB.getModules(),e=this.E;
    host.innerHTML=`<label>Tên học phần<input id="vm-draft-title" class="form-input" value="${e(title)}"></label><label>Lưu vào<select id="vm-draft-target" class="form-select"><option value="">Tạo học phần mới</option>${modules.map(m=>`<option value="${e(m.id)}">${e(m.title)}</option>`).join('')}</select></label><div class="vm-draft-list">${cards.map((c,i)=>`<div class="vm-draft" data-index="${i}"><label class="vm-check"><input type="checkbox" checked data-keep>Thẻ ${i+1}</label><label>Từ / câu hỏi<input class="form-input" data-word value="${e(c.word)}"></label><label>Nghĩa / đáp án<textarea class="form-input" data-meaning>${e(window.VMLearning.meaning(c))}</textarea></label><label>Ví dụ<input class="form-input" data-example value="${e(c.definitions?.[0]?.exampleEn||'')}"></label><label>Gợi ý<input class="form-input" data-hint value="${e(c.hint||'')}"></label></div>`).join('')}</div><button class="btn-primary" id="vm-save-draft">Lưu các thẻ đã chọn</button><p class="vm-note" id="vm-draft-status"></p>`;
    if(this.importModuleId&&modules.some(m=>m.id===this.importModuleId))host.querySelector('#vm-draft-target').value=this.importModuleId;
    host.querySelector('#vm-save-draft').onclick=async event=>{
      const selected=[];for(const row of host.querySelectorAll('.vm-draft')){if(!row.querySelector('[data-keep]').checked)continue;const word=row.querySelector('[data-word]').value.trim(),meaning=row.querySelector('[data-meaning]').value.trim();if(!word||!meaning)return this.notify('Thẻ được chọn cần có cả từ và nghĩa.','info');const original=cards[Number(row.dataset.index)];selected.push({...original,word,primaryMeaningVi:meaning,hint:row.querySelector('[data-hint]').value.trim(),definitions:[{...(original.definitions?.[0]||{}),meaningVi:meaning,exampleEn:row.querySelector('[data-example]').value.trim()}]});}
      if(!selected.length)return this.notify('Chọn ít nhất một thẻ để lưu.','info');
      event.target.disabled=true;
      try{let moduleId=host.querySelector('#vm-draft-target').value;const records={modules:[],cards:[]};if(!moduleId){const name=host.querySelector('#vm-draft-title').value.trim();if(!name)throw new Error('Nhập tên học phần.');moduleId='mod-'+crypto.randomUUID();records.modules.push({id:moduleId,title:name,description:'',tags:[cards[0]?.source==='ollama-local'?'AI local':'Nhập nội dung'],createdAt:new Date().toISOString()});}
        const existing=await window.vocabDB.getCardsByModule(moduleId),seen=new Set(existing.map(c=>window.VMLearning.normalize(c.word)+'\0'+window.VMLearning.normalize(window.VMLearning.meaning(c))));
        for(const card of selected){const key=window.VMLearning.normalize(card.word)+'\0'+window.VMLearning.normalize(window.VMLearning.meaning(card));if(seen.has(key))continue;seen.add(key);records.cards.push({...card,id:'card-'+crypto.randomUUID(),moduleId,srsStage:0,reviewCount:0,mistakeCount:0,history:[],nextReviewDate:new Date().toISOString()});}
        if(!records.cards.length)throw new Error('Các thẻ đã có trong học phần; không nhập trùng.');await window.vocabDB.putBatch(records);this.importModuleId=null;this.notify(`Đã lưu ${records.cards.length} thẻ.`);await window.app.navigate('cards',{moduleId});
      }catch(error){host.querySelector('#vm-draft-status').textContent=error.message;event.target.disabled=false;}
    };
  }
  async renderGuide(data,source,allowSave=true) {
    const host=document.getElementById('vm-ai-result'),e=this.E;
    host.innerHTML=`<article class="vm-guide"><h3>${e(data.title||'Hướng dẫn học')}</h3><p>${e(data.summary||'')}</p><h4>Ý chính</h4><ul>${(data.keyPoints||[]).map(t=>`<li>${e(t)}</li>`).join('')}</ul><h4>Tự kiểm tra</h4><ol>${(data.questions||[]).map(t=>`<li>${e(t)}</li>`).join('')}</ol><div class="vm-actions">${allowSave?'<button class="btn-primary" id="vm-guide-save">Lưu hướng dẫn</button>':''}<button class="btn-secondary" id="vm-guide-export">Xuất Markdown</button></div></article>`;
    if(allowSave)host.querySelector('#vm-guide-save').onclick=async()=>{const old=await window.vocabDB.get('settings','vm-pro-guides');await window.vocabDB.put('settings',{key:'vm-pro-guides',value:[{...data,createdAt:new Date().toISOString()},...(old?.value||[])].slice(0,30)});this.notify('Đã lưu hướng dẫn học.');};
    host.querySelector('#vm-guide-export').onclick=()=>this.download((data.title||'study-guide')+'.md',`# ${data.title}\n\n${data.summary}\n\n## Ý chính\n${(data.keyPoints||[]).map(t=>'- '+t).join('\n')}\n\n## Tự kiểm tra\n${(data.questions||[]).map((t,i)=>`${i+1}. ${t}`).join('\n')}`,'text/markdown');
  }
  async tutor(text) {
    const d=this.dialog('✦ Gia sư AI local',`<label>Câu hỏi<textarea id="vm-tutor-input" class="form-input">${this.E(text)}</textarea></label><div class="vm-actions"><button class="btn-primary" id="vm-tutor-send">Giải thích</button><button class="btn-secondary" id="vm-tutor-cancel">Hủy xử lý</button></div><div id="vm-tutor-answer" class="vm-tutor-text" role="status">AI xử lý trên máy bằng ${this.E(this.settings.model)}. Nội dung giải thích cần được đối chiếu.</div>`,true);
    d.querySelector('#vm-tutor-cancel').onclick=()=>this.aiController?.abort();
    d.querySelector('#vm-tutor-send').onclick=async event=>{event.target.disabled=true;const out=d.querySelector('#vm-tutor-answer');out.textContent='Đang soạn giải thích…';try{const result=await this.requestAI('tutor',d.querySelector('#vm-tutor-input').value);out.innerHTML=`<h3>Giải thích</h3><p>${this.E(result.data.explanation)}</p><h3>Ví dụ</h3><p>${this.E(result.data.example)}</p><h3>Mẹo nhớ</h3><p>${this.E(result.data.memoryTip)}</p>`;}catch(error){out.textContent=error.name==='AbortError'?'Đã hủy.':error.message;}finally{event.target.disabled=false;}};
  }
  async renderImport() {
    const panel=document.getElementById('vm-studio-panel');
    panel.innerHTML='<div class="vm-studio-grid"><section class="vm-panel"><h2>Nhập hàng loạt</h2><p class="vm-note">Mỗi dòng: từ, nghĩa, ví dụ (tùy chọn). Hỗ trợ TSV/CSV có dấu ngoặc kép; xem trước và chỉnh sửa trước khi lưu.</p><label>Định dạng<select id="vm-import-delimiter" class="form-select"><option value="tab">Tab (TSV / sao chép từ Excel)</option><option value="comma">Dấu phẩy (CSV)</option><option value="semicolon">Dấu chấm phẩy</option></select></label><label>Nội dung<textarea id="vm-import-text" class="form-input vm-source" placeholder="negotiate&#9;đàm phán&#9;We negotiate a fair price."></textarea></label><label>Hoặc chọn file<input id="vm-import-file" type="file" accept=".csv,.tsv,.txt"></label><button class="btn-primary" id="vm-import-preview">Xem trước thẻ</button><p id="vm-import-message" class="vm-note"></p></section><section class="vm-panel"><h2>Sao lưu dữ liệu của bạn</h2><p>Xuất bộ thẻ, thư mục, lịch ôn, lịch sử và thiết lập thành một file JSON.</p><button class="btn-primary" id="vm-backup-export">Tải bản sao lưu đầy đủ</button><hr><h3>Nhập từ bản sao</h3><p class="vm-note">Tạo bản sao bổ sung của thư mục và học phần, giữ lịch ôn trong file. Không xóa hoặc ghi đè bộ thẻ hiện tại. Nhật ký cùng ngày được gộp bằng giá trị lớn hơn để không đếm hai lần.</p><input id="vm-backup-file" type="file" accept=".json"><div id="vm-backup-preview"></div></section></div><section id="vm-import-draft" class="vm-panel hidden"></section>';
    panel.querySelector('#vm-import-file').onchange=async event=>{const file=event.target.files[0];if(!file)return;if(file.size>2_000_000)return this.notify('File CSV/TSV tối đa 2 MB.','info');panel.querySelector('#vm-import-text').value=await file.text();panel.querySelector('#vm-import-delimiter').value=file.name.endsWith('.csv')?'comma':'tab';};
    panel.querySelector('#vm-import-preview').onclick=async()=>{try{const delimiter={tab:'\t',comma:',',semicolon:';'}[panel.querySelector('#vm-import-delimiter').value];const result=window.VMLearning.importCards(panel.querySelector('#vm-import-text').value,delimiter);if(!result.cards.length)throw new Error('Không có dòng hợp lệ. Mỗi dòng cần ít nhất hai cột.');if(result.cards.length>1000)throw new Error('Mỗi lượt nhập tối đa 1.000 thẻ.');panel.querySelector('#vm-import-message').textContent=`${result.cards.length} thẻ; ${result.invalid.length} dòng thiếu dữ liệu đã bỏ qua.`;panel.querySelector('#vm-import-draft').classList.remove('hidden');await this.renderDraft(result.cards,'Bộ thẻ đã nhập','vm-import-draft');}catch(error){panel.querySelector('#vm-import-message').textContent=error.message;}};
    panel.querySelector('#vm-backup-export').onclick=()=>this.exportBackup();
    panel.querySelector('#vm-backup-file').onchange=async event=>{const file=event.target.files[0],out=panel.querySelector('#vm-backup-preview');try{if(!file||file.size>80_000_000)throw new Error('Bản sao lưu tối đa 80 MB.');const data=JSON.parse(await file.text());this.validateBackup(data);out.innerHTML=`<p>${data.cards.length} thẻ · ${data.modules.length} học phần · ${data.folders.length} thư mục</p><button class="btn-primary" id="vm-backup-merge">Nhập bản sao bổ sung</button>`;out.querySelector('button').onclick=async event=>{event.target.disabled=true;try{await this.mergeBackup(data);out.textContent='Đã nhập bản sao. Bộ dữ liệu hiện tại được giữ nguyên.';}catch(error){out.textContent=error.message;}};}catch(error){out.textContent=error.message;}};
  }
  async exportBackup() {
    try{const data={app:'VocabMaster Pro',version:5,exportedAt:new Date().toISOString()};for(const name of ['folders','modules','cards','study_logs','settings'])data[name]=await window.vocabDB.getAll(name);this.download(`VocabMaster-backup-${window.vocabDB.getLocalDateString()}.json`,JSON.stringify(data,null,2),'application/json');}catch(error){this.notify(error.message,'danger');}
  }
  validateBackup(data) {
    if(!data||data.app!=='VocabMaster Pro'||![4,5].includes(data.version))throw new Error('Đây không phải bản sao lưu VocabMaster được hỗ trợ.');
    for(const key of ['folders','modules','cards'])if(!Array.isArray(data[key]))throw new Error('Bản sao thiếu '+key);
    if(data.cards.length>50000||data.modules.length>5000||data.folders.length>5000)throw new Error('Bản sao vượt giới hạn số bản ghi.');
    for(const name of ['folders','modules','cards']){const ids=new Set();for(const row of data[name]){if(!row||typeof row.id!=='string'||!row.id||ids.has(row.id))throw new Error('ID trống hoặc trùng trong '+name);ids.add(row.id);}}
    if(data.folders.some(f=>typeof f.name!=='string')||data.modules.some(m=>typeof m.title!=='string'))throw new Error('Tên thư mục hoặc học phần không hợp lệ.');
    const modules=new Set(data.modules.map(m=>m.id)),folders=new Set(data.folders.map(f=>f.id));
    if(data.modules.some(m=>m.folderId&&!folders.has(m.folderId)))throw new Error('Học phần tham chiếu thư mục không tồn tại.');
    if(data.cards.some(c=>typeof c.word!=='string'||!c.word.trim()||!modules.has(c.moduleId)))throw new Error('Thẻ thiếu từ hoặc tham chiếu học phần không tồn tại.');
    if(data.study_logs&&!Array.isArray(data.study_logs))throw new Error('Nhật ký không hợp lệ.');
    return true;
  }
  async mergeBackup(data) {
    this.validateBackup(data);const ids=new Map();for(const row of [...data.folders,...data.modules,...data.cards])ids.set(row.id,crypto.randomUUID());
    const records={folders:data.folders.map(f=>({...f,id:ids.get(f.id),name:f.name+' (bản sao)'})),modules:data.modules.map(m=>({...m,id:ids.get(m.id),folderId:ids.get(m.folderId)||null})),cards:data.cards.map(c=>({...c,id:ids.get(c.id),moduleId:ids.get(c.moduleId),imageData:window.VMLearning.safeMedia(c.imageData),customAudioData:window.VMLearning.safeMedia(c.customAudioData)})),study_logs:[]};
    for(const log of data.study_logs||[]){if(!log||typeof log.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(log.date))continue;const current=await window.vocabDB.get('study_logs','log-'+log.date);const merged={id:'log-'+log.date,date:log.date};for(const key of ['cardsReviewed','cardsMastered','quizCount','durationMinutes','modulesCompleted'])merged[key]=Math.max(Number(current?.[key])||0,Number(log[key])||0,0);merged.completedModuleIds=[...new Set([...(current?.completedModuleIds||[]),...(log.completedModuleIds||[]).map(id=>ids.get(id)).filter(Boolean)])];records.study_logs.push(merged);}
    await window.vocabDB.putBatch(records);this.notify('Đã nhập bản sao dữ liệu.');
  }
  renderSettings() {
    const panel=document.getElementById('vm-studio-panel');panel.innerHTML=`<section class="vm-panel vm-settings"><h2>Học theo nhịp của bạn</h2><div class="vm-option-grid"><label>Thẻ mới tối đa mỗi ngày<input id="vm-setting-new" class="form-input" type="number" min="1" max="500" value="${this.settings.newLimit}"></label><label>Mục tiêu ôn thẻ mỗi ngày<input id="vm-setting-goal" class="form-input" type="number" min="1" max="1000" value="${this.settings.dailyGoal}"></label><label>Tốc độ phát âm<select id="vm-setting-speech" class="form-select">${[.6,.75,.92,1,1.25,1.5].map(n=>`<option value="${n}">${n}×</option>`).join('')}</select></label><label>Model Ollama mặc định<input id="vm-setting-model" class="form-input" value="${this.E(this.settings.model)}"></label><label>Chấm đáp án viết<select id="vm-setting-grading" class="form-select"><option value="strict">Chính xác</option><option value="flexible">Cho phép một lỗi gõ nhỏ (từ ≥ 5 ký tự)</option></select></label></div><button id="vm-save-settings" class="btn-primary">Lưu thiết lập</button><p class="vm-note">Chấm linh hoạt là so khớp chữ và lỗi gõ nhỏ; không tự đoán từ đồng nghĩa. Có thể thêm đáp án thay thế trong phần sửa thẻ. Mốc SRS cũ được giữ cho tới khi bạn đánh giá lại thẻ.</p></section>`;
    panel.querySelector('#vm-setting-speech').value=this.settings.speechRate;panel.querySelector('#vm-setting-grading').value=this.settings.grading;
    panel.querySelector('#vm-save-settings').onclick=async()=>{const newLimit=Number(panel.querySelector('#vm-setting-new').value),dailyGoal=Number(panel.querySelector('#vm-setting-goal').value),model=panel.querySelector('#vm-setting-model').value.trim();if(!Number.isInteger(newLimit)||newLimit<1||newLimit>500||!Number.isInteger(dailyGoal)||dailyGoal<1||dailyGoal>1000||!/^[\w.:/-]{1,100}$/.test(model))return this.notify('Kiểm tra giới hạn thẻ, mục tiêu và tên model.','info');this.settings={...this.settings,newLimit,dailyGoal,model,speechRate:Number(panel.querySelector('#vm-setting-speech').value),grading:panel.querySelector('#vm-setting-grading').value};await this.saveSettings();this.notify('Đã lưu thiết lập.');};
  }
  async renderHistory() {
    document.getElementById('vm-test-history')?.remove();const records=await window.vocabDB.get('settings','vm-test-history'),logs=await window.vocabDB.getStudyLogByDate(window.vocabDB.getLocalDateString());
    const section=document.createElement('section');section.id='vm-test-history';section.className='vm-panel';section.innerHTML=`<h2>Mục tiêu hôm nay</h2><p>${logs?.cardsReviewed||0} / ${this.settings.dailyGoal} lượt ôn</p><progress max="${this.settings.dailyGoal}" value="${Math.min(this.settings.dailyGoal,logs?.cardsReviewed||0)}"></progress><h2 style="margin-top:24px">Bài kiểm tra gần đây</h2>${(records?.value||[]).slice(0,15).map(r=>`<div class="vm-history-row"><div><strong>${this.E(r.title)}</strong><p class="vm-note">${new Date(r.date).toLocaleString('vi-VN')} · ${Math.round(r.durationSeconds||0)} giây</p></div><strong>${r.score}/${r.total} · ${Math.round(r.score/r.total*100)}%</strong></div>`).join('')||'<p class="vm-note">Chưa có bài kiểm tra đã hoàn thành.</p>'}`;document.getElementById('view-analytics').append(section);
  }
  download(name,text,type='application/octet-stream') {
    const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name.replace(/[<>:"/\\|?*]/g,'-');a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
  }
}
window.vmPremium=new VocabPremium();
window.addEventListener('vm:ready',()=>{window.vmPremiumReady=window.vmPremium.init().catch(error=>{console.error(error);window.app.showToast('Không tải được công cụ nâng cao: '+window.VMLearning.escape(error.message),'danger');});},{once:true});
