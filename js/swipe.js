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
    if (!str) return '';
    return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }

  startSession(cards, moduleId = null, moduleTitle = 'Học phần') {
    if (!cards || cards.length === 0) return;
    this.currentCards = [...cards];
    this.currentIndex = 0;
    this.moduleId = moduleId;
    this.moduleTitle = moduleTitle;
    this.results = { remembered: [], forgotten: [] };
    this.isFlipped = false;

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
  async handleAnswer(isRemembered) {
    if (this.isTransitioning) return;
    const card = this.getCurrentCard();
    if (!card) return;
    this.isTransitioning = true;

    if (isRemembered) {
      this.results.remembered.push(card);
      window.soundEngine.playCorrectSound();
      if (this.cardElement) {
        this.cardElement.classList.add('swipe-right-exit');
      }
    } else {
      this.results.forgotten.push(card);
      window.soundEngine.playWrongSound();
      if (this.cardElement) {
        this.cardElement.classList.add('swipe-left-exit');
      }
    }

    // Cập nhật trạng thái SRS vào cơ sở dữ liệu IndexedDB
    const updatedCard = window.srsEngine.calculateNextState(card, isRemembered);
    await window.vocabDB.saveCard(updatedCard);

    // Ghi nhận log tiến độ theo ngày
    await window.vocabDB.logStudyActivity(1, isRemembered ? 1 : 0, 0, 1);

    // Đợi hiệu ứng animation hoàn thành rồi chuyển thẻ kế tiếp
    setTimeout(() => {
      this.currentIndex++;
      this.isFlipped = false;
      if (this.currentIndex < this.currentCards.length) {
        this.renderCurrentCard();
      } else {
        this.renderSessionSummary();
      }
    }, 280);
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
              <span class="badge-cefr badge-cefr-${(card.cefrLevel || 'B1').toLowerCase()}">CEFR ${card.cefrLevel || 'B1'}</span>
              <span class="card-word-type">${card.wordType || 'noun'}</span>
              <span class="card-srs-level">Hộp SRS: ${card.srsStage || 0}</span>
            </div>

            <div class="card-front-center">
              <h1 class="card-word">${card.word}</h1>
              
              <div class="card-phonetics-group">
                <div class="phonetic-pill">
                  <span class="accent-tag">UK</span>
                  <span class="ipa-text">${card.ipaUk || ''}</span>
                  <button type="button" class="btn-audio-pill" onclick="event.stopPropagation(); window.soundEngine.speak('${this.esc(card.word)}', 'UK', '${this.esc(card.audioUkUrl)}');">
                    🔊 UK
                  </button>
                </div>

                <div class="phonetic-pill">
                  <span class="accent-tag">US</span>
                  <span class="ipa-text">${card.ipaUs || ''}</span>
                  <button type="button" class="btn-audio-pill" onclick="event.stopPropagation(); window.soundEngine.speak('${this.esc(card.word)}', 'US', '${this.esc(card.audioUsUrl)}');">
                    🔊 US
                  </button>
                </div>
              </div>

              <div class="card-flip-prompt">
                <span>🔄 Nhấn vào thẻ hoặc bấm phím Space để xem nghĩa</span>
              </div>
            </div>

            <div class="card-footer-hints">
              <span class="hint-context">💡 Ngữ cảnh: ${card.definitions && card.definitions[0] ? card.definitions[0].context : 'Thông dụng'}</span>
            </div>
          </div>

          <!-- MẶT SAU: Nghĩa tiếng Việt, Định nghĩa Cambridge, Nhiều tầng nghĩa & Ví dụ -->
          <div class="flashcard-face flashcard-back">
            <div class="card-header-bar">
              <span class="badge-cefr badge-cefr-${(card.cefrLevel || 'B1').toLowerCase()}">CEFR ${card.cefrLevel || 'B1'}</span>
              <span class="back-word-title">${card.word} (${card.wordType})</span>
              <button type="button" class="btn-icon-mini" onclick="event.stopPropagation(); window.soundEngine.speak('${this.esc(card.word)}', 'US');">🔊</button>
            </div>

            <div class="card-back-scroll">
              <div class="primary-meaning-box">
                <div class="meaning-label">Nghĩa thông dụng nhất:</div>
                <div class="meaning-vi-main">${card.primaryMeaningVi || (card.definitions && card.definitions[0] ? card.definitions[0].meaningVi : '')}</div>
                <div class="meaning-en-sub">${card.primaryMeaningEn || (card.definitions && card.definitions[0] ? card.definitions[0].meaningEn : '')}</div>
              </div>

              <!-- Chi tiết các tầng nghĩa & cách sử dụng (Cambridge multi-sense) -->
              <div class="multi-meanings-section">
                <div class="section-title-sm">Các tầng nghĩa &amp; Cách sử dụng chi tiết:</div>
                ${(card.definitions || []).map((d, idx) => `
                  <div class="meaning-item-card">
                    <div class="item-context-tag">${idx + 1}. [${d.context || 'Ngữ cảnh'}]</div>
                    <div class="item-meaning-vi">${d.meaningVi || d.meaningEn}</div>
                    ${d.exampleEn ? `
                      <div class="item-example-box">
                        <div class="example-en">"${d.exampleEn}"</div>
                        ${d.exampleVi ? `<div class="example-vi">${d.exampleVi}</div>` : ''}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>

              ${card.usageNotes ? `
                <div class="usage-notes-box">
                  <div class="notes-header">📌 Lưu ý ngữ pháp &amp; Collocations:</div>
                  <div class="notes-body">${card.usageNotes}</div>
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
    this.setupSwipePhysics(this.cardElement);

    // Tự động phát âm khi mở từ mới
    setTimeout(() => {
      window.soundEngine.speak(card.word, 'US', card.audioUsUrl);
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
      if (!studyView || studyView.classList.contains('hidden')) return;

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
        if (card) window.soundEngine.speak(card.word, 'US', card.audioUsUrl);
      }
    });
  }

  // MÀN HÌNH TỔNG KẾT HỌC PHẦN
  async renderSessionSummary() {
    this.isTransitioning = false;
    window.soundEngine.playVictorySound();
    
    const total = this.currentCards.length;
    const rememberedCount = this.results.remembered.length;

    // CHÍNH THỨC HOÀN THÀNH HỌC PHẦN -> Ghi nhận để tính 1 Streak!
    if (window.vocabDB && typeof window.vocabDB.logModuleCompleted === 'function') {
      await window.vocabDB.logModuleCompleted(this.moduleId, total, rememberedCount);
      console.log('[Study] Hoàn thành học phần! Đã ghi nhận chuỗi Streak.');
    }
    if (window.app && typeof window.app.showToast === 'function') {
      window.app.showToast('🔥 Chúc mừng! Bạn đã hoàn thành bài học và đạt thêm 1 ngày Streak!');
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
          <div class="summary-subtitle">${this.moduleTitle}</div>
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
                  <span>${c.word}</span>
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
                  <span>${c.word}</span>
                  <span class="chip-meaning">${c.primaryMeaningVi || ''}</span>
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
