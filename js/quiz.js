// Bộ Kiểm Tra Trắc Nghiệm Cuối Học Phần (Quiz System)
// Tùy biến số câu hỏi, dạng 4 phương án & Đúng/Sai
// Có giải thích ngữ nghĩa chi tiết bên dưới mỗi câu hỏi sau khi trả lời.

class QuizEngine {
  constructor() {
    this.activeCards = [];
    this.moduleTitle = '';
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
  }

  // Mở modal cấu hình kiểm tra trước khi thi
  openQuizModal(cards, moduleTitle) {
    if (!cards || cards.length < 2) {
      alert('Học phần cần có ít nhất 2 thẻ để tạo bài kiểm tra!');
      return;
    }
    this.activeCards = cards;
    this.moduleTitle = moduleTitle;

    const modal = document.getElementById('quiz-setup-modal');
    if (!modal) return;

    // Cập nhật số câu tối đa
    const totalCards = cards.length;
    document.getElementById('quiz-setup-total-cards').textContent = `${totalCards} từ khả dụng`;

    modal.classList.remove('hidden');
  }

  // Bắt đầu làm bài thi với cấu hình người dùng chọn
  startQuizFromSetup() {
    const countSelect = document.getElementById('quiz-question-count');
    const typeSelect = document.getElementById('quiz-question-type');

    let countVal = countSelect ? countSelect.value : 'all';
    let questionType = typeSelect ? typeSelect.value : 'both'; // 'mc' (4 choices), 'tf' (true/false), 'both'

    let questionCount = this.activeCards.length;
    if (countVal === '5') questionCount = Math.min(5, this.activeCards.length);
    else if (countVal === '10') questionCount = Math.min(10, this.activeCards.length);
    else if (countVal === '15') questionCount = Math.min(15, this.activeCards.length);

    // Đóng modal setup
    const modal = document.getElementById('quiz-setup-modal');
    if (modal) modal.classList.add('hidden');

    // Sinh đề thi
    this.generateQuestions(questionCount, questionType);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];

    window.app.showView('quiz');
    this.renderCurrentQuestion();
  }

  // Thuật toán sinh câu hỏi thông minh
  generateQuestions(count, type) {
    const pool = [...this.activeCards].sort(() => 0.5 - Math.random()).slice(0, count);
    this.questions = pool.map((card, idx) => {
      // Quyết định dạng câu hỏi: 4 lựa chọn (MC) hay Đúng/Sai (TF)
      let qType = type;
      if (type === 'both') {
        qType = Math.random() > 0.4 ? 'mc' : 'tf';
      }

      if (qType === 'tf') {
        // Dạng Đúng / Sai
        const isTrue = Math.random() > 0.5;
        let displayedMeaning = card.primaryMeaningVi;

        if (!isTrue) {
          // Lấy một nghĩa của từ khác trong bộ thẻ để làm đáp án sai
          const otherCards = this.activeCards.filter(c => c.id !== card.id);
          if (otherCards.length > 0) {
            const randomOther = otherCards[Math.floor(Math.random() * otherCards.length)];
            displayedMeaning = randomOther.primaryMeaningVi;
          } else {
            displayedMeaning = 'nghĩa không chính xác';
          }
        }

        return {
          id: `q-${idx}`,
          card,
          questionType: 'tf',
          prompt: `Từ "${card.word}" có nghĩa là "${displayedMeaning}", đúng hay sai?`,
          isTrueAnswer: isTrue,
          displayedMeaning,
          explanation: this.buildExplanation(card)
        };
      } else {
        // Dạng Trắc nghiệm 4 phương án
        const correctAnswer = card.primaryMeaningVi || (card.definitions && card.definitions[0] ? card.definitions[0].meaningVi : 'Nghĩa chính');
        
        // Thu thập 3 distractors (đáp án gây nhiễu) từ các thẻ khác
        const distractors = [];
        const otherCards = this.activeCards.filter(c => c.id !== card.id).sort(() => 0.5 - Math.random());

        otherCards.forEach(c => {
          if (distractors.length < 3 && c.primaryMeaningVi && c.primaryMeaningVi !== correctAnswer) {
            distractors.push(c.primaryMeaningVi);
          }
        });

        // Nếu thiếu distractor, thêm một số nghĩa phổ biến giả định
        const genericDistractors = ['phản đối mạnh mẽ', 'phát triển bền vững', 'nghiên cứu khoa học', 'xây dựng kế hoạch'];
        for (const gd of genericDistractors) {
          if (distractors.length < 3 && gd !== correctAnswer && !distractors.includes(gd)) {
            distractors.push(gd);
          }
        }

        const options = [correctAnswer, ...distractors.slice(0, 3)].sort(() => 0.5 - Math.random());

        return {
          id: `q-${idx}`,
          card,
          questionType: 'mc',
          prompt: `Nghĩa chính xác nhất của từ "${card.word}" là gì?`,
          correctAnswer,
          options,
          explanation: this.buildExplanation(card)
        };
      }
    });
  }

  buildExplanation(card) {
    return {
      word: card.word,
      wordType: card.wordType,
      ipa: card.ipaUk || card.ipaUs || '',
      cefr: card.cefrLevel || 'B1',
      primaryMeaningVi: card.primaryMeaningVi || '',
      primaryMeaningEn: card.primaryMeaningEn || '',
      definitions: card.definitions || [],
      exampleEn: card.definitions && card.definitions[0] ? card.definitions[0].exampleEn : '',
      exampleVi: card.definitions && card.definitions[0] ? card.definitions[0].exampleVi : '',
      usageNotes: card.usageNotes || ''
    };
  }

  // Render câu hỏi hiện tại kèm ô giải thích ngữ nghĩa
  renderCurrentQuestion() {
    const container = document.getElementById('quiz-active-container');
    if (!container) return;

    const q = this.questions[this.currentQuestionIndex];
    if (!q) {
      this.renderQuizResults();
      return;
    }

    const total = this.questions.length;
    const currentNum = this.currentQuestionIndex + 1;
    const percent = Math.round(((currentNum - 1) / total) * 100);

    const progressEl = document.getElementById('quiz-progress-bar');
    if (progressEl) progressEl.style.width = `${percent}%`;

    const counterEl = document.getElementById('quiz-counter-text');
    if (counterEl) counterEl.textContent = `Câu hỏi ${currentNum} / ${total}`;

    container.innerHTML = `
      <div class="quiz-question-box">
        <div class="quiz-question-badge">
          <span class="badge-cefr badge-cefr-${(q.card.cefrLevel || 'B1').toLowerCase()}">CEFR ${q.card.cefrLevel || 'B1'}</span>
          <span class="quiz-type-tag">${q.questionType === 'tf' ? 'Đúng / Sai' : '4 Phương Án'}</span>
          <button type="button" class="btn-sound-mini" onclick="window.soundEngine.speak('${q.card.word}', 'US');">🔊 Nghe phát âm</button>
        </div>

        <h3 class="quiz-question-prompt">${q.prompt}</h3>

        <!-- CÁC PHƯƠNG ÁN TRẢ LỜI -->
        <div id="quiz-options-group" class="quiz-options-grid ${q.questionType === 'tf' ? 'tf-grid' : 'mc-grid'}">
          ${q.questionType === 'tf' ? `
            <button type="button" class="quiz-opt-btn btn-tf" data-answer="true">
              <span class="opt-key">A</span>
              <span class="opt-label">ĐÚNG</span>
            </button>
            <button type="button" class="quiz-opt-btn btn-tf" data-answer="false">
              <span class="opt-key">B</span>
              <span class="opt-label">SAI</span>
            </button>
          ` : `
            ${q.options.map((opt, i) => `
              <button type="button" class="quiz-opt-btn btn-mc" data-answer="${opt}">
                <span class="opt-key">${['A', 'B', 'C', 'D'][i]}</span>
                <span class="opt-label">${opt}</span>
              </button>
            `).join('')}
          `}
        </div>

        <!-- BẢNG GIẢI THÍCH NGỮ NGHĨA CHI TIẾT (ẨN CHO ĐẾN KHI CHỌN ĐÁP ÁN) -->
        <div id="quiz-explanation-box" class="quiz-explanation-box hidden">
          <div class="explanation-status-banner" id="explanation-status-banner"></div>

          <div class="explanation-content-body">
            <div class="exp-word-row">
              <span class="exp-word">${q.explanation.word}</span>
              <span class="exp-ipa">${q.explanation.ipa}</span>
              <span class="exp-type">(${q.explanation.wordType})</span>
              <button type="button" class="btn-sound-mini" onclick="window.soundEngine.speak('${q.explanation.word}', 'US');">🔊</button>
            </div>

            <div class="exp-meaning-row">
              <strong>Nghĩa chuẩn xác:</strong> ${q.explanation.primaryMeaningVi} 
              <span class="text-muted">(${q.explanation.primaryMeaningEn})</span>
            </div>

            ${q.explanation.exampleEn ? `
              <div class="exp-example-box">
                <div class="exp-ex-en">💬 Ví dụ: "${q.explanation.exampleEn}"</div>
                ${q.explanation.exampleVi ? `<div class="exp-ex-vi">👉 Dịch: ${q.explanation.exampleVi}</div>` : ''}
              </div>
            ` : ''}

            ${q.explanation.usageNotes ? `
              <div class="exp-notes-row">
                💡 <em>${q.explanation.usageNotes}</em>
              </div>
            ` : ''}
          </div>

          <div class="explanation-next-action">
            <button type="button" id="btn-quiz-next" class="btn-primary btn-quiz-next" onclick="window.quizEngine.goToNextQuestion()">
              ${currentNum === total ? 'Xem kết quả bài kiểm tra 🏁' : 'Câu tiếp theo ➡️'}
            </button>
          </div>
        </div>
      </div>
    `;

    // Gắn sự kiện trả lời cho các nút phương án
    const optButtons = container.querySelectorAll('.quiz-opt-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleAnswerSelected(btn, q);
      });
    });
  }

  // Xử lý khi người dùng chọn đáp án
  handleAnswerSelected(selectedBtn, question) {
    const container = document.getElementById('quiz-active-container');
    const optButtons = container.querySelectorAll('.quiz-opt-btn');
    // Vô hiệu hóa nút sau khi đã chọn
    optButtons.forEach(b => b.disabled = true);

    let isCorrect = false;
    const expBanner = document.getElementById('explanation-status-banner');
    const expBox = document.getElementById('quiz-explanation-box');

    if (question.questionType === 'tf') {
      const userChoice = selectedBtn.dataset.answer === 'true';
      isCorrect = (userChoice === question.isTrueAnswer);

      optButtons.forEach(b => {
        const val = b.dataset.answer === 'true';
        if (val === question.isTrueAnswer) b.classList.add('opt-correct');
        else if (b === selectedBtn && !isCorrect) b.classList.add('opt-wrong');
      });
    } else {
      const userChoice = selectedBtn.dataset.answer;
      isCorrect = (userChoice === question.correctAnswer);

      optButtons.forEach(b => {
        if (b.dataset.answer === question.correctAnswer) b.classList.add('opt-correct');
        else if (b === selectedBtn && !isCorrect) b.classList.add('opt-wrong');
      });
    }

    if (isCorrect) {
      this.score++;
      window.soundEngine.playCorrectSound();
      expBanner.className = 'explanation-status-banner banner-correct';
      expBanner.innerHTML = '🎉 CHÍNH XÁC! Bạn đã trả lời đúng.';
    } else {
      window.soundEngine.playWrongSound();
      expBanner.className = 'explanation-status-banner banner-wrong';
      expBanner.innerHTML = '❌ CHƯA CHÍNH XÁC. Hãy xem giải thích bên dưới để ghi nhớ:';
    }

    this.userAnswers.push({
      question,
      isCorrect
    });

    // Hiện bảng giải thích ngữ nghĩa
    if (expBox) {
      expBox.classList.remove('hidden');
      expBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  goToNextQuestion() {
    this.currentQuestionIndex++;
    this.renderCurrentQuestion();
  }

  // MÀN HÌNH KẾT QUẢ BÀI THI
  async renderQuizResults() {
    window.soundEngine.playVictorySound();
    const container = document.getElementById('quiz-active-container');
    if (!container) return;

    const total = this.questions.length;
    const percent = Math.round((this.score / total) * 100);

    // Ghi nhận log bài thi vào IndexedDB
    await window.vocabDB.logStudyActivity(0, 0, 1, 3);

    container.innerHTML = `
      <div class="quiz-results-card">
        <div class="quiz-trophy-hero">
          <div class="trophy-icon">🎯</div>
          <h2>Hoàn Thành Bài Kiểm Tra!</h2>
          <div class="text-muted">${this.moduleTitle}</div>
        </div>

        <div class="quiz-score-display">
          <div class="big-score-text">${this.score} / ${total}</div>
          <div class="score-percent-badge">${percent}% Chính Xác</div>
        </div>

        <div class="quiz-results-summary-list">
          <h4>Chi tiết các câu hỏi:</h4>
          ${this.userAnswers.map((ua, i) => `
            <div class="quiz-review-row ${ua.isCorrect ? 'row-correct' : 'row-wrong'}">
              <div class="review-status-col">${ua.isCorrect ? '✅' : '❌'}</div>
              <div class="review-info-col">
                <div class="review-word"><strong>${ua.question.card.word}</strong> (${ua.question.card.wordType})</div>
                <div class="review-meaning">${ua.question.card.primaryMeaningVi}</div>
              </div>
              <div class="review-audio-col">
                <button type="button" class="btn-sound-mini" onclick="window.soundEngine.speak('${ua.question.card.word}', 'US');">🔊</button>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="quiz-results-actions">
          <button type="button" class="btn-primary" onclick="window.quizEngine.openQuizModal(window.quizEngine.activeCards, window.quizEngine.moduleTitle)">
            🔄 Làm lại bài kiểm tra
          </button>
          <button type="button" class="btn-secondary" onclick="window.app.navigate('modules')">
            ⬅️ Quay về danh sách học phần
          </button>
        </div>
      </div>
    `;
  }
}

window.quizEngine = new QuizEngine();
