// Trình quản lý Học Flashcard & Cơ chế Vuốt (Swipe Physics)
// Hỗ trợ cảm ứng (touch), kéo chuột (mouse drag), phím tắt bàn phím
// Vuốt Trái = "Chưa nhớ" (Đỏ/Cam) | Vuốt Phải = "Đã nhớ" (Xanh lá)
// Kết thúc học phần: Báo cáo tỷ lệ %, X/Total từ, gợi ý Mini-Game & Quiz.

class FlashcardStudySession {
  constructor() {
    this.currentCards = [];
    this.currentIndex = 0;
    this.currentCard = null;
    this.isFlipped = false;
    this.results = {
      remembered: [],
      forgotten: []
    };
    this.moduleId = null;
    this.moduleTitle = '';

    // Swipe touch & mouse state
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isDragging = false;
    this.cardElement = null;

    // BUG FIX: Store bound handlers so we can remove them later
    this._boundMouseMove = null;
    this._boundMouseUp = null;

    this.bindKeyboardShortcuts();
  }

  // Helper: escape single quotes for inline onclick
  esc(str) {
    const js = String(str || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '\\r').replace(/\n/g, '\\n');
    return window.VMLearning.escape(js);
  }

  startSession(cards, moduleId = null, moduleTitle = 'Học phần') {
    if (!cards || cards.length === 0) return;
    this.stopAutoplay();
    this.options = this.pendingOptions || {mode:'srs',reverse:false};
    this.pendingOptions = null;
    this.undoStack = [];
    this._summaryLogged = false;
    this._lastActionAt = Date.now();
    this.currentCards = [...cards];
    this.currentIndex = 0;
    this.moduleId = moduleId;
    this.moduleTitle = moduleTitle;
    this.results = { remembered: [], forgotten: [] };
    this.isFlipped = !!this.options.reverse;
    this.isTransitioning = false;
    this.checkpoint().catch(console.warn);
    this.renderCurrentCard();
  }

  getCurrentCard() {
    return this.currentCards[this.currentIndex] || null;
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
    if (this.cardElement) {
      this.cardElement.classList.toggle('is-flipped', this.isFlipped);
      window.soundEngine.playFlipSound();
    }
  }

  // Vuốt hoặc bấm nút: true = Đã nhớ (Phải), false = Chưa nhớ (Trái)
  async handleAnswer(rating) {
    if (this.options?.mode === 'browse') return this.moveBrowse(rating === false || rating === 'again' ? -1 : 1);
    if (this.isTransitioning) return;
    const selected=this.getCurrentCard();if(!selected)return;
    this.isTransitioning=true;this.stopAutoplay();
    try {
      const card=await window.vocabDB.getCard(selected.id);
      if(!card)throw new Error('Thẻ đã bị xóa. Hãy quay lại học phần.');
      const updated=window.srsEngine.calculateNextState(card,rating);
      const remembered=['good','easy'].includes(updated.srsRating);
      const date=window.vocabDB.getLocalDateString(),key='log-'+date;
      const old=await window.vocabDB.get('study_logs',key);
      const minutes=Math.max(0,Math.min(30,(Date.now()-this._lastActionAt)/60000));
      const log={...(old||{}),id:key,date,cardsReviewed:(old?.cardsReviewed||0)+1,cardsMastered:(old?.cardsMastered||0)+(remembered?1:0),durationMinutes:(old?.durationMinutes||0)+minutes};
      await window.vocabDB.putBatch({cards:[updated],study_logs:[log]});
      this.undoStack.push({before:card,after:updated,index:this.currentIndex,key,date,remembered,minutes});
      this.currentCards[this.currentIndex]=updated;
      this.results[remembered?'remembered':'forgotten'].push(updated);
      window.soundEngine[remembered?'playCorrectSound':'playWrongSound']();
      this.cardElement?.classList.add(remembered?'swipe-right-exit':'swipe-left-exit');
      this.currentIndex++;this._lastActionAt=Date.now();this.isFlipped=!!this.options.reverse;
      await this.checkpoint();
      setTimeout(()=>{this.isTransitioning=false;if(document.getElementById('view-study').classList.contains('hidden'))return;if(this.currentIndex<this.currentCards.length)this.renderCurrentCard();else this.renderSessionSummary();},280);
    } catch(error) { this.isTransitioning=false;window.vmPremium.notify(error.message,'danger'); }
  }

  async checkpoint() {
    await window.vocabDB.put('settings',{key:'vm-study-resume',value:this.currentIndex>=this.currentCards.length?null:{moduleId:this.moduleId,title:this.moduleTitle,cardIds:this.currentCards.map(c=>c.id),index:this.currentIndex,options:this.options,remembered:this.results.remembered.map(c=>c.id),forgotten:this.results.forgotten.map(c=>c.id)}});
  }
  async resume(state) {
    const all=await window.vocabDB.getCards(),map=new Map(all.map(c=>[c.id,c]));
    const cards=state.cardIds.map(id=>map.get(id)).filter(Boolean);
    if(!cards.length)return window.vmPremium.notify('Các thẻ của phiên trước đã bị xóa.','info');
    this.pendingOptions=state.options;this.startSession(cards,state.moduleId,state.title);
    this.currentIndex=state.cardIds.slice(0,state.index).filter(id=>map.has(id)).length;
    this.results={remembered:(state.remembered||[]).map(id=>map.get(id)).filter(Boolean),forgotten:(state.forgotten||[]).map(id=>map.get(id)).filter(Boolean)};
    window.app.showView('study');if(this.currentIndex>=cards.length)this.renderSessionSummary();else this.renderCurrentCard();await this.checkpoint();
  }
  async undo() {
    if(this.isTransitioning||!this.undoStack?.length)return;
    const item=this.undoStack.at(-1);this.isTransitioning=true;
    try {
      const fresh=await window.vocabDB.getCard(item.before.id);
      if(!fresh||fresh.lastReviewed!==item.after.lastReviewed||fresh.reviewCount!==item.after.reviewCount)throw new Error('Thẻ đã được ôn ở phiên khác; không thể hoàn tác lượt cũ.');
      const restored={...fresh};for(const key of ['srsStage','srsRating','nextReviewDate','reviewCount','mistakeCount','lastReviewed','firstReviewedAt','history']){if(Object.hasOwn(item.before,key))restored[key]=item.before[key];else delete restored[key];}
      const log=await window.vocabDB.get('study_logs',item.key)||{id:item.key,date:item.date};
      const corrected={...log,cardsReviewed:Math.max(0,(log.cardsReviewed||0)-1),cardsMastered:Math.max(0,(log.cardsMastered||0)-(item.remembered?1:0)),durationMinutes:Math.max(0,(log.durationMinutes||0)-item.minutes)};
      await window.vocabDB.putBatch({cards:[restored],study_logs:[corrected]});
      this.undoStack.pop();this.currentIndex=item.index;this.currentCards[item.index]=restored;this.results[item.remembered?'remembered':'forgotten'].pop();this.isFlipped=!!this.options.reverse;
      await this.checkpoint();this.renderCurrentCard();
    }catch(error){window.vmPremium.notify(error.message,'danger');}finally{this.isTransitioning=false;}
  }
  moveBrowse(delta) {
    if(!this.currentCards.length)return;this.currentIndex=(this.currentIndex+delta+this.currentCards.length)%this.currentCards.length;this.isFlipped=!!this.options.reverse;this.renderCurrentCard();this.checkpoint().catch(console.warn);
  }
  stopAutoplay() {
    if(this.autoplayTimer)clearInterval(this.autoplayTimer);this.autoplayTimer=null;
    const button=document.getElementById('vm-study-auto');if(button)button.textContent='▷ Tự phát';
  }
  toggleAutoplay() {
    if(this.options?.mode!=='browse')return;
    if(this.autoplayTimer)return this.stopAutoplay();
    document.getElementById('vm-study-auto').textContent='Ⅱ Dừng tự phát';
    this.autoplayTimer=setInterval(()=>{if(this.isFlipped===!!this.options.reverse)this.flipCard();else this.moveBrowse(1);},3500);
  }

  renderCurrentCard() {
    this.isTransitioning = false;
    const card = this.getCurrentCard();
    if (!card) return;

    const studyContainer = document.getElementById('study-card-container');
    if (!studyContainer) return;

    const total = this.currentCards.length;
    const currentNum = this.currentIndex + 1;
    const progressPercent = Math.round(((currentNum - 1) / total) * 100);

    // Render thanh tiến độ
    const progressEl = document.getElementById('study-progress-bar');
    if (progressEl) progressEl.style.width = `${progressPercent}%`;

    const counterEl = document.getElementById('study-progress-counter');
    if (counterEl) counterEl.textContent = `${currentNum} / ${total}`;

    // Tạo HTML cho thẻ flashcard hai mặt
    studyContainer.innerHTML = `
      <div id="flashcard" class="flashcard-wrapper select-none">
        <div class="swipe-badge swipe-badge-left">CHƯA NHỚ 👈</div>
        <div class="swipe-badge swipe-badge-right">👉 ĐÃ NHỚ</div>

        <div class="flashcard-inner">
          <!-- MẶT TRƯỚC: Tiếng Anh, IPA, Nút UK/US, CEFR, Gợi ý ngữ cảnh -->
          <div class="flashcard-face flashcard-front">
            <div class="card-header-bar">
              <span class="badge-cefr badge-cefr-${window.VMLearning.escape((card.cefrLevel || '').toLowerCase())}">CEFR ${window.VMLearning.escape(card.cefrLevel || '—')}</span>
              <span class="card-word-type">${window.VMLearning.escape(card.wordType || '')}</span>
              <span class="card-srs-level">Hộp SRS: ${card.srsStage || 0}</span>
            </div>

            <div class="card-front-center">
              <h1 class="card-word">${card.occlusion ? 'Vùng được che là gì?' : window.VMLearning.escape(card.word)}</h1>${window.vmPremium?.imageMarkup(card)||''}
              
              <div class="card-phonetics-group">
                <div class="phonetic-pill">
                  <span class="accent-tag">UK</span>
                  <span class="ipa-text">${window.VMLearning.escape(card.ipaUk || '')}</span>
                  <button type="button" class="btn-audio-pill" onclick="event.stopPropagation(); window.soundEngine.speak('${this.esc(card.word)}', 'UK', '${this.esc(card.customAudioData || card.audioUkUrl)}');">
                    🔊 UK
                  </button>
                </div>

                <div class="phonetic-pill">
                  <span class="accent-tag">US</span>
                  <span class="ipa-text">${window.VMLearning.escape(card.ipaUs || '')}</span>
                  <button type="button" class="btn-audio-pill" onclick="event.stopPropagation(); window.soundEngine.speak('${this.esc(card.word)}', 'US', '${this.esc(card.customAudioData || card.audioUsUrl)}');">
                    🔊 US
                  </button>
                </div>
              </div>

              <div class="card-flip-prompt">
                <span>🔄 Nhấn vào thẻ hoặc bấm phím Space để xem nghĩa</span>
              </div>
            </div>

            <div class="card-footer-hints" ${card.definitions?.[0]?.context ? '' : 'hidden'}>
              <span class="hint-context">💡 Ngữ cảnh: ${window.VMLearning.escape(card.definitions && card.definitions[0] ? card.definitions[0].context : 'Thông dụng')}</span>
            </div>
          </div>

          <!-- MẶT SAU: Nghĩa tiếng Việt, Định nghĩa Cambridge, Nhiều tầng nghĩa & Ví dụ -->
          <div class="flashcard-face flashcard-back">
            <div class="card-header-bar">
              <span class="badge-cefr badge-cefr-${window.VMLearning.escape((card.cefrLevel || '').toLowerCase())}">CEFR ${window.VMLearning.escape(card.cefrLevel || '—')}</span>
              <span class="back-word-title">${window.VMLearning.escape(card.word)} (${window.VMLearning.escape(card.wordType)})</span>
              <button type="button" class="btn-icon-mini" onclick="event.stopPropagation(); window.soundEngine.speak('${this.esc(card.word)}', 'US');">🔊</button>
            </div>

            <div class="card-back-scroll">${window.vmPremium?.imageMarkup(card,true)||''}
              <div class="primary-meaning-box">
                <div class="meaning-label">Nghĩa thông dụng nhất:</div>
                <div class="meaning-vi-main">${window.VMLearning.escape(card.primaryMeaningVi || (card.definitions && card.definitions[0] ? card.definitions[0].meaningVi : ''))}</div>
                <div class="meaning-en-sub">${window.VMLearning.escape(card.primaryMeaningEn || (card.definitions && card.definitions[0] ? card.definitions[0].meaningEn : ''))}</div>
              </div>

              <!-- Chi tiết các tầng nghĩa & cách sử dụng (Cambridge multi-sense) -->
              <div class="multi-meanings-section">
                <div class="section-title-sm">Các tầng nghĩa &amp; Cách sử dụng chi tiết:</div>
                ${(card.definitions || []).map((d, idx) => `
                  <div class="meaning-item-card">
                    <div class="item-context-tag">${idx + 1}. [${window.VMLearning.escape(d.context || 'Ngữ cảnh')}]</div>
                    <div class="item-meaning-vi">${window.VMLearning.escape(d.meaningVi || d.meaningEn)}</div>
                    ${d.exampleEn ? `
                      <div class="item-example-box">
                        <div class="example-en">"${window.VMLearning.escape(d.exampleEn)}"</div>
                        ${d.exampleVi ? `<div class="example-vi">${window.VMLearning.escape(d.exampleVi)}</div>` : ''}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>

              ${window.vmPremium?.mistakesMarkup(card)||''}
              ${card.usageNotes ? `
                <div class="usage-notes-box">
                  <div class="notes-header">📌 Lưu ý ngữ pháp &amp; Collocations:</div>
                  <div class="notes-body">${window.VMLearning.escape(card.usageNotes)}</div>
                </div>
              ` : ''}
            </div>

            <div class="card-flip-prompt">
              <span>🔄 Chạm để lật lại mặt trước</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.cardElement = document.getElementById('flashcard');
    this.cardElement.querySelector('.flashcard-inner').classList.toggle('is-flipped', this.isFlipped);
    this.cardElement.classList.toggle('is-flipped', this.isFlipped);
    window.vmPremium?.updateStudyTools();
    this.setupSwipePhysics(this.cardElement);

    // Tự động phát âm khi mở từ mới
    setTimeout(() => {
      if (!document.getElementById('view-study').classList.contains('hidden')) window.soundEngine.speak(card.word, 'US', card.customAudioData || card.audioUsUrl);
    }, 150);
  }

  // Thiết lập cơ chế vuốt vật lý cảm ứng & chuột
  setupSwipePhysics(cardEl) {
    if (!cardEl) return;

    // BUG FIX: Remove previous window listeners before adding new ones
    if (this._boundMouseMove) {
      window.removeEventListener('mousemove', this._boundMouseMove);
    }
    if (this._boundMouseUp) {
      window.removeEventListener('mouseup', this._boundMouseUp);
    }

    cardEl.addEventListener('click', (e) => {
      if (Math.abs(this.currentX) < 15 && Math.abs(this.currentY) < 15) {
        this.flipCard();
      }
    });

    const onStart = (clientX, clientY) => {
      this.isDragging = true;
      this.startX = clientX;
      this.startY = clientY;
      this.currentX = 0;
      this.currentY = 0;
      cardEl.style.transition = 'none';
    };

    const onMove = (clientX, clientY) => {
      if (!this.isDragging) return;
      this.currentX = clientX - this.startX;
      this.currentY = clientY - this.startY;

      const rotate = this.currentX * 0.08;
      cardEl.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${rotate}deg)`;

      // Hiển thị huy hiệu trực quan
      const badgeLeft = cardEl.querySelector('.swipe-badge-left');
      const badgeRight = cardEl.querySelector('.swipe-badge-right');

      if (this.currentX < -40) {
        if (badgeLeft) {
          badgeLeft.style.opacity = Math.min(1, Math.abs(this.currentX) / 120);
          badgeLeft.style.transform = `scale(${Math.min(1.2, 0.8 + Math.abs(this.currentX) / 150)})`;
        }
        if (badgeRight) badgeRight.style.opacity = '0';
      } else if (this.currentX > 40) {
        if (badgeRight) {
          badgeRight.style.opacity = Math.min(1, this.currentX / 120);
          badgeRight.style.transform = `scale(${Math.min(1.2, 0.8 + this.currentX / 150)})`;
        }
        if (badgeLeft) badgeLeft.style.opacity = '0';
      } else {
        if (badgeLeft) badgeLeft.style.opacity = '0';
        if (badgeRight) badgeRight.style.opacity = '0';
      }
    };

    const onEnd = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      cardEl.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

      const threshold = 110;
      if (this.currentX > threshold) {
        this.handleAnswer(true);
      } else if (this.currentX < -threshold) {
        this.handleAnswer(false);
      } else {
        cardEl.style.transform = 'translate(0px, 0px) rotate(0deg)';
        const badgeLeft = cardEl.querySelector('.swipe-badge-left');
        const badgeRight = cardEl.querySelector('.swipe-badge-right');
        if (badgeLeft) badgeLeft.style.opacity = '0';
        if (badgeRight) badgeRight.style.opacity = '0';
      }
    };

    // Touch events (Mobile)
    cardEl.addEventListener('touchstart', (e) => {
      if (e.target.closest('button')) return;
      onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    cardEl.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    cardEl.addEventListener('touchend', onEnd);

    // Mouse events (Desktop) - BUG FIX: use bound references for cleanup
    cardEl.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      onStart(e.clientX, e.clientY);
    });

    this._boundMouseMove = (e) => {
      if (this.isDragging) {
        onMove(e.clientX, e.clientY);
      }
    };

    this._boundMouseUp = () => {
      if (this.isDragging) {
        onEnd();
      }
    };

    window.addEventListener('mousemove', this._boundMouseMove);
    window.addEventListener('mouseup', this._boundMouseUp);
  }

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      const studyView = document.getElementById('view-study');
      if (!studyView || studyView.classList.contains('hidden') || document.getElementById('vm-pro-modal') || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.flipCard();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.handleAnswer(true);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.handleAnswer(false);
      } else if (e.key === '1') {
        const card = this.getCurrentCard();
        if (card) window.soundEngine.speak(card.word, 'UK', card.audioUkUrl);
      } else if (e.key === '2') {
        const card = this.getCurrentCard();
        if (card) if (!document.getElementById('view-study').classList.contains('hidden')) window.soundEngine.speak(card.word, 'US', card.customAudioData || card.audioUsUrl);
      }
    });
  }

  // MÀN HÌNH TỔNG KẾT HỌC PHẦN
  async renderSessionSummary() {
    if (this._summaryLogged) return;
    this._summaryLogged = true;
    this.stopAutoplay();
    this.isTransitioning = false;
    document.getElementById('vm-study-tools').hidden = true;
    document.getElementById('vm-rating-buttons').innerHTML = '';
    document.getElementById('vm-browse-controls').classList.add('hidden');
    window.soundEngine.playVictorySound();
    
    const total = this.currentCards.length;
    const rememberedCount = this.results.remembered.length;

    const moduleCards=this.moduleId?await window.vocabDB.getCardsByModule(this.moduleId):[];
    const studiedIds=new Set(this.currentCards.map(c=>c.id));
    if(this.options?.mode!=='browse' && moduleCards.length && moduleCards.length===studiedIds.size && moduleCards.every(c=>studiedIds.has(c.id))) {
      await window.vocabDB.logModuleCompleted(this.moduleId,0,0);
      window.vmPremium.notify('Đã hoàn thành toàn bộ học phần và ghi nhận ngày học.');
    }
    const studyContainer = document.getElementById('study-card-container');
    if (!studyContainer) return;
    const forgottenCount = this.results.forgotten.length;
    const percent = Math.round((rememberedCount / total) * 100);

    studyContainer.innerHTML = `
      <div class="session-summary-card">
        <div class="summary-confetti-header">
          <div class="summary-trophy-icon">🏆</div>
          <h2 class="summary-title">Hoàn Thành Học Phần!</h2>
          <div class="summary-subtitle">${window.VMLearning.escape(this.moduleTitle)}</div>
        </div>

        <div class="summary-score-hero">
          <div class="score-circle">
            <span class="score-percent-num">${percent}%</span>
            <span class="score-percent-label">Tỷ lệ đã nhớ</span>
          </div>
          <div class="score-breakdown-text">
            Bạn đã ghi nhớ được <strong class="text-success">${rememberedCount}/${total} từ</strong> của học phần này.
          </div>
        </div>

        <div class="summary-lists-grid">
          <div class="summary-list-col list-remembered">
            <div class="list-col-header">
              <span class="icon-tag">✅</span>
              <span>Đã nhớ vững (${rememberedCount})</span>
            </div>
            <div class="word-chips-flow">
              ${this.results.remembered.map(c => `
                <div class="word-chip-pill chip-success" onclick="window.soundEngine.speak('${this.esc(c.word)}', 'US')">
                  <span>${window.VMLearning.escape(c.word)}</span>
                  <span class="chip-sub">🔊</span>
                </div>
              `).join('')}
              ${rememberedCount === 0 ? '<div class="empty-hint">Chưa có từ nào được đánh dấu nhớ</div>' : ''}
            </div>
          </div>

          <div class="summary-list-col list-forgotten">
            <div class="list-col-header">
              <span class="icon-tag">⚠️</span>
              <span>Cần học lại (${forgottenCount})</span>
            </div>
            <div class="word-chips-flow">
              ${this.results.forgotten.map(c => `
                <div class="word-chip-pill chip-warning" onclick="window.soundEngine.speak('${this.esc(c.word)}', 'US')">
                  <span>${window.VMLearning.escape(c.word)}</span>
                  <span class="chip-meaning">${window.VMLearning.escape(c.primaryMeaningVi || '')}</span>
                </div>
              `).join('')}
              ${forgottenCount === 0 ? '<div class="empty-hint">Rất tuyệt vời! Bạn đã thuộc 100% các từ!</div>' : ''}
            </div>
          </div>
        </div>

        <!-- CÁC HÀNH ĐỘNG TIẾP THEO: TRÒ CHƠI & BÀI KIỂM TRA -->
        <div class="summary-next-actions-box">
          <div class="next-actions-title">🎮 Củng cố kiến thức với Trò chơi &amp; Bài kiểm tra:</div>
          <div class="next-action-buttons-group">
            <button type="button" class="btn-action-hero btn-hero-games" onclick="window.gameEngine.startMatchGame(window.studySession.currentCards)">
              <span class="btn-icon">🧩</span>
              <div class="btn-text-block">
                <span class="btn-primary-text">Ghép Thẻ Trí Nhớ</span>
                <span class="btn-sub-text">Lật cặp Từ - Nghĩa tương ứng</span>
              </div>
            </button>

            <button type="button" class="btn-action-hero btn-hero-connect" onclick="window.gameEngine.startConnectGame(window.studySession.currentCards)">
              <span class="btn-icon">🔗</span>
              <div class="btn-text-block">
                <span class="btn-primary-text">Nối Từ Siêu Tốc</span>
                <span class="btn-sub-text">Nối 2 cột từ vựng và giải nghĩa</span>
              </div>
            </button>

            <button type="button" class="btn-action-hero btn-hero-quiz" onclick="window.quizEngine.openQuizModal(window.studySession.currentCards, window.studySession.moduleTitle)">
              <span class="btn-icon">📝</span>
              <div class="btn-text-block">
                <span class="btn-primary-text">Bài Kiểm Tra Trắc Nghiệm</span>
                <span class="btn-sub-text">4 phương án &amp; Đúng/Sai có giải thích</span>
              </div>
            </button>
          </div>

          <div class="summary-secondary-actions">
            ${forgottenCount > 0 ? `
              <button type="button" class="btn-secondary-action btn-cram" onclick="window.studySession.startSession(window.studySession.results.forgotten, window.studySession.moduleId, 'Ôn từ yếu')">
                🔄 Ôn lại ${forgottenCount} từ chưa nhớ ngay
              </button>
            ` : ''}
            <button type="button" class="btn-secondary-action btn-return" onclick="window.app.navigate('modules')">
              ⬅️ Quay lại danh sách học phần
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

window.studySession = new FlashcardStudySession();
