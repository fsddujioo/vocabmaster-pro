// Hệ thống Trò chơi Học Tập: Ghép Thẻ (Card Match) & Nối Từ (Word Connection)
// Củng cố khả năng liên kết nhanh giữa Từ tiếng Anh, IPA và Nghĩa tiếng Việt.

class GameEngine {
  constructor() {
    this.timerInterval = null;
    this.startTime = null;
    this.isChecking = false;
  }

  stopAllGames() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isChecking = false;
  }

  // --- TRÒ CHƠI 1: GHÉP THẺ (CARD MATCH MEMORY GRID) ---
  startMatchGame(cards) {
    if (!cards || cards.length < 2) {
      alert('Học phần cần ít nhất 2 thẻ để chơi trò chơi ghép thẻ!');
      return;
    }

    this.stopAllGames();
    window.app.showView('game-match');
    const container = document.getElementById('match-game-board');
    if (!container) return;

    // Chọn tối đa 6 từ vựng (tạo thành 12 thẻ lật 4x3)
    const selected = [...cards].sort(() => 0.5 - Math.random()).slice(0, 6);
    const gameItems = [];

    selected.forEach((c, idx) => {
      // Thẻ tiếng Anh
      gameItems.push({
        id: `card-en-${idx}`,
        pairId: c.id,
        type: 'en',
        text: c.word,
        sub: c.ipaUk || '',
        matched: false
      });
      // Thẻ tiếng Việt
      gameItems.push({
        id: `card-vi-${idx}`,
        pairId: c.id,
        type: 'vi',
        text: c.primaryMeaningVi || (c.definitions && c.definitions[0] ? c.definitions[0].meaningVi : 'Nghĩa từ'),
        sub: c.wordType || '',
        matched: false
      });
    });

    // Xáo trộn các thẻ
    const shuffled = gameItems.sort(() => 0.5 - Math.random());
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;

    // Bắt đầu đếm giờ
    const timerDisplay = document.getElementById('match-timer-display');
    const movesDisplay = document.getElementById('match-moves-display');
    let seconds = 0;
    if (movesDisplay) movesDisplay.textContent = '0 lượt';
    if (timerDisplay) timerDisplay.textContent = '00:00';

    this.timerInterval = setInterval(() => {
      seconds++;
      const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
      const secs = String(seconds % 60).padStart(2, '0');
      if (timerDisplay) timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);

    // Render bảng trò chơi
    container.innerHTML = `
      <div class="match-grid">
        ${shuffled.map(item => `
          <div class="match-card" data-id="${item.id}" data-pair="${window.VMLearning.escape(item.pairId)}" data-type="${item.type}">
            <div class="match-card-inner">
              <div class="match-card-front">
                <span class="card-question-mark">?</span>
              </div>
              <div class="match-card-back ${item.type === 'en' ? 'back-en' : 'back-vi'}">
                <span class="match-card-text">${window.VMLearning.escape(item.text)}</span>
                ${item.sub ? `<span class="match-card-sub">${window.VMLearning.escape(item.sub)}</span>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Gắn sự kiện click lật thẻ với isChecking guard
    const cardElements = container.querySelectorAll('.match-card');
    cardElements.forEach(el => {
      el.addEventListener('click', () => {
        if (this.isChecking || el.classList.contains('is-flipped') || el.classList.contains('is-matched') || flippedCards.length >= 2) {
          return;
        }

        el.classList.add('is-flipped');
        window.soundEngine.playFlipSound();
        flippedCards.push(el);

        if (flippedCards.length === 2) {
          moves++;
          if (movesDisplay) movesDisplay.textContent = `${moves} lượt`;

          const card1 = flippedCards[0];
          const card2 = flippedCards[1];

          const isMatch = (card1.dataset.pair === card2.dataset.pair && card1.dataset.type !== card2.dataset.type);

          if (isMatch) {
            window.soundEngine.playCorrectSound();
            card1.classList.add('is-matched');
            card2.classList.add('is-matched');
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === selected.length) {
              clearInterval(this.timerInterval);
              this.timerInterval = null;
              window.soundEngine.playVictorySound();
              setTimeout(() => {
                alert(`🎉 Xuất sắc! Bạn đã hoàn thành ghép thẻ trong ${timerDisplay ? timerDisplay.textContent : ''} với ${moves} lượt thử!`);
              }, 400);
            }
          } else {
            this.isChecking = true;
            window.soundEngine.playWrongSound();
            card1.classList.add('shake-wrong');
            card2.classList.add('shake-wrong');

            setTimeout(() => {
              card1.classList.remove('is-flipped', 'shake-wrong');
              card2.classList.remove('is-flipped', 'shake-wrong');
              flippedCards = [];
              this.isChecking = false;
            }, 800);
          }
        }
      });
    });
  }

  // --- TRÒ CHƠI 2: NỐI TỪ (WORD CONNECTION GAME) ---
  startConnectGame(cards) {
    if (!cards || cards.length < 2) {
      alert('Học phần cần ít nhất 2 thẻ để chơi trò chơi nối từ!');
      return;
    }

    this.stopAllGames();
    window.app.showView('game-connect');
    const container = document.getElementById('connect-game-board');
    if (!container) return;

    // Chọn tối đa 5 cặp từ
    const selected = [...cards].sort(() => 0.5 - Math.random()).slice(0, 5);

    const leftCol = selected.map(c => ({
      pairId: c.id,
      word: c.word,
      ipa: c.ipaUk || c.ipaUs || '',
      type: c.wordType || ''
    })).sort(() => 0.5 - Math.random());

    const rightCol = selected.map(c => ({
      pairId: c.id,
      meaning: c.primaryMeaningVi || (c.definitions && c.definitions[0] ? c.definitions[0].meaningVi : 'Nghĩa từ'),
      enHint: c.word
    })).sort(() => 0.5 - Math.random());

    let selectedLeft = null;
    let selectedRight = null;
    let matchedCount = 0;
    const totalPairs = selected.length;

    container.innerHTML = `
      <div class="connect-game-wrapper">
        <div class="connect-instruction">
          💡 Chọn một từ tiếng Anh bên trái, sau đó chọn nghĩa tiếng Việt tương ứng bên phải để nối lại.
        </div>

        <div class="connect-columns-grid">
          <!-- Cột Trái: Tiếng Anh -->
          <div class="connect-column left-column">
            <div class="column-header">Từ Tiếng Anh &amp; IPA</div>
            ${leftCol.map(item => `
              <div class="connect-item item-left" data-pair="${window.VMLearning.escape(item.pairId)}">
                <div class="item-word-text">${window.VMLearning.escape(item.word)}</div>
                <div class="item-ipa-text">${window.VMLearning.escape(item.ipa)}</div>
                <button type="button" class="btn-sound-mini" onclick="event.stopPropagation(); window.soundEngine.speak('${window.app.esc(item.word)}', 'US');">🔊</button>
              </div>
            `).join('')}
          </div>

          <!-- Cột Phải: Nghĩa Tiếng Việt -->
          <div class="connect-column right-column">
            <div class="column-header">Giải Nghĩa Tiếng Việt</div>
            ${rightCol.map(item => `
              <div class="connect-item item-right" data-pair="${window.VMLearning.escape(item.pairId)}">
                <div class="item-meaning-text">${window.VMLearning.escape(item.meaning)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div id="connect-status-msg" class="connect-status-box">
          Đang kết nối: 0 / ${totalPairs} cặp từ
        </div>
      </div>
    `;

    const leftItems = container.querySelectorAll('.item-left');
    const rightItems = container.querySelectorAll('.item-right');
    const statusMsg = document.getElementById('connect-status-msg');

    const checkMatch = () => {
      if (!selectedLeft || !selectedRight || this.isChecking) return;

      const isMatch = selectedLeft.dataset.pair === selectedRight.dataset.pair;
      if (isMatch) {
        window.soundEngine.playCorrectSound();
        selectedLeft.classList.add('item-matched');
        selectedRight.classList.add('item-matched');
        selectedLeft.classList.remove('item-active');
        selectedRight.classList.remove('item-active');
        selectedLeft = null;
        selectedRight = null;
        matchedCount++;

        if (statusMsg) statusMsg.textContent = `Đã nối thành công: ${matchedCount} / ${totalPairs} cặp từ`;

        if (matchedCount === totalPairs) {
          window.soundEngine.playVictorySound();
          setTimeout(() => {
            alert('🎉 Tuyệt vời! Bạn đã nối chính xác toàn bộ các từ trong học phần!');
          }, 400);
        }
      } else {
        this.isChecking = true;
        window.soundEngine.playWrongSound();
        const curLeft = selectedLeft;
        const curRight = selectedRight;
        curLeft.classList.add('item-wrong');
        curRight.classList.add('item-wrong');

        setTimeout(() => {
          curLeft.classList.remove('item-wrong', 'item-active');
          curRight.classList.remove('item-wrong', 'item-active');
          if (selectedLeft === curLeft) selectedLeft = null;
          if (selectedRight === curRight) selectedRight = null;
          this.isChecking = false;
        }, 600);
      }
    };

    leftItems.forEach(el => {
      el.addEventListener('click', () => {
        if (this.isChecking || el.classList.contains('item-matched')) return;
        leftItems.forEach(i => i.classList.remove('item-active'));
        el.classList.add('item-active');
        selectedLeft = el;
        window.soundEngine.playFlipSound();
        checkMatch();
      });
    });

    rightItems.forEach(el => {
      el.addEventListener('click', () => {
        if (this.isChecking || el.classList.contains('item-matched')) return;
        rightItems.forEach(i => i.classList.remove('item-active'));
        el.classList.add('item-active');
        selectedRight = el;
        window.soundEngine.playFlipSound();
        checkMatch();
      });
    });
  }
}

window.gameEngine = new GameEngine();
