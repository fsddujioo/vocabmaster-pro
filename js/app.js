// Bộ Điều Khiển Chính của Ứng Dụng (Application Master Controller)
// Quản lý chuyển đổi màn hình (Routing), Modal Thư mục, Học phần, Thẻ thông minh
// và tích hợp Tra cứu Từ điển Cambridge tự động.

class VocabApp {

  // Hiển thị thông báo Toast đẹp mắt
  showToast(message, type = 'success') {
    let container = document.getElementById('app-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'app-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    const icon = type === 'success' ? '✅' : (type === 'danger' ? '❌' : 'ℹ️');
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  constructor() {
    this.currentView = 'dashboard';
    this.selectedFolderId = null;
    this.selectedModuleId = null;
    this.isOnline = navigator.onLine;

    this.initNetworkListener();
  }

  // Helper: escape single quotes for inline onclick attributes
  esc(str) {
    if (!str) return '';
    return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  initNetworkListener() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.updateOnlineBadge();
    });
    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.updateOnlineBadge();
    });
  }

  updateOnlineBadge() {
    const badge = document.getElementById('online-status-badge');
    if (!badge) return;
    if (this.isOnline) {
      badge.className = 'status-indicator status-online';
      badge.innerHTML = '<span class="status-dot"></span> Online &amp; Đồng bộ từ điển';
    } else {
      badge.className = 'status-indicator status-offline';
      badge.innerHTML = '<span class="status-dot dot-offline"></span> Offline (Dùng bộ nhớ máy)';
    }
  }

  async init() {
    console.log('[App] Đang khởi tạo VocabMaster Pro...');
    try {
      await window.vocabDB.init();
    } catch (e) {
      console.warn('[App] Lỗi khởi tạo DB:', e);
    }
    this.updateOnlineBadge();
    this.bindEvents();
    await this.navigate('dashboard');
    console.log('[App] VocabMaster Pro đã sẵn sàng!');
  }

  bindEvents() {
    // Điều hướng navigation bar
    document.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = el.dataset.nav;
        if (targetView) this.navigate(targetView);
      });
    });

    // Nút tìm kiếm từ điển tự động trong modal tạo thẻ
    const btnLookup = document.getElementById('btn-dict-lookup');
    if (btnLookup) {
      btnLookup.addEventListener('click', () => this.handleDictionaryAutoFill());
    }

    const inputWord = document.getElementById('card-input-word');
    if (inputWord) {
      inputWord.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleDictionaryAutoFill();
        }
      });
    }

    // Hỗ trợ bấm Enter trong input thư mục
    const folderInput = document.getElementById('folder-input-name');
    if (folderInput) {
      folderInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.saveFolderFromModal();
        }
      });
    }

    // Hỗ trợ bấm Enter trong input học phần
    const moduleInput = document.getElementById('module-input-title');
    if (moduleInput) {
      moduleInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.saveModuleFromModal();
        }
      });
    }
  }

  // Chuyển đổi giữa các màn hình
  async navigate(viewName, params = {}) {
    if (window.gameEngine) window.gameEngine.stopAllGames();
    this.currentView = viewName;
    if (viewName === 'modules' && !params.folderId) {
      this.selectedFolderId = null;
    }

    // Cập nhật trạng thái active trên thanh điều hướng
    document.querySelectorAll('[data-nav]').forEach(el => {
      if (el.dataset.nav === viewName) {
        el.classList.add('nav-active');
      } else {
        el.classList.remove('nav-active');
      }
    });

    // Ẩn tất cả các view
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.add('hidden');
    });

    // Hiển thị view được chọn
    const targetEl = document.getElementById(`view-${viewName}`);
    if (targetEl) {
      targetEl.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Nạp dữ liệu tương ứng cho view
    try {
      switch (viewName) {
        case 'dashboard':
          await this.renderDashboard();
          break;
        case 'folders':
          await this.renderFoldersView();
          break;
        case 'modules':
          await this.renderModulesView(params.folderId);
          break;
        case 'cards':
          await this.renderCardsView(params.moduleId);
          break;
        case 'analytics':
          await this.renderAnalyticsView();
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(`[App] Lỗi khi render view ${viewName}:`, err);
    }
  }

  showView(viewId) {
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.add('hidden');
    });
    const targetEl = document.getElementById(viewId.startsWith('view-') ? viewId : `view-${viewId}`);
    if (targetEl) {
      targetEl.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // --- MÀN HÌNH DASHBOARD (TRANG CHỦ) ---
  async renderDashboard() {
    const allCards = await window.vocabDB.getCards();
    const streak = await window.analyticsTracker.calculateStreak();
    const analysis = window.srsEngine.analyzeKnowledgeGaps(allCards);

    // Cập nhật các chỉ số tổng quan
    const elStreak = document.getElementById('dash-streak-count');
    const elTotal = document.getElementById('dash-total-words');
    const elDue = document.getElementById('dash-due-words');
    const elRetention = document.getElementById('dash-retention-rate');

    if (elStreak) elStreak.textContent = `${streak} ngày 🔥`;
    if (elTotal) elTotal.textContent = `${analysis.totalCards} từ`;
    if (elDue) elDue.textContent = `${analysis.dueCards.length} từ`;
    if (elRetention) elRetention.textContent = `${analysis.retentionScore}%`;

    // Thông điệp chẩn đoán thông minh (Bộ xử lý biết học thiếu ở đâu)
    const diagnosisEl = document.getElementById('dash-diagnosis-msg');
    if (diagnosisEl) diagnosisEl.textContent = analysis.diagnosisMessage;

    // Danh sách các từ cần ôn gấp (Weak & Due Cards)
    const weakListContainer = document.getElementById('dash-weak-words-list');
    if (weakListContainer) {
      const urgentCards = [...analysis.dueCards, ...analysis.weakCards].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i).slice(0, 6);

      if (urgentCards.length === 0) {
        weakListContainer.innerHTML = `
          <div class="dash-empty-state">
            <span class="empty-icon">🎉</span>
            <p>Tuyệt vời! Hiện không có từ nào bị quá hạn hay nhầm lẫn.</p>
          </div>
        `;
      } else {
        // BUG FIX: Use card.id to lookup card at click time instead of referencing `c` variable
        weakListContainer.innerHTML = `
          <div class="urgent-cards-grid">
            ${urgentCards.map(c => `
              <div class="urgent-card-item">
                <div class="urgent-card-top">
                  <span class="badge-cefr badge-cefr-${(c.cefrLevel || 'B1').toLowerCase()}">${c.cefrLevel || 'B1'}</span>
                  <span class="card-stage-tag">Hộp ${c.srsStage || 0}</span>
                </div>
                <div class="urgent-card-word">${c.word}</div>
                <div class="urgent-card-ipa">${c.ipaUk || c.ipaUs || ''}</div>
                <div class="urgent-card-meaning">${c.primaryMeaningVi || (c.definitions && c.definitions[0] ? c.definitions[0].meaningVi : '')}</div>
                <div class="urgent-card-actions">
                  <button type="button" class="btn-sound-mini" onclick="window.soundEngine.speak('${this.esc(c.word)}', 'US');">🔊</button>
                  <button type="button" class="btn-study-single" onclick="window.app.studySingleCard('${this.esc(c.id)}')">Ôn từ này</button>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }
    }

    // Lịch thu nhỏ
    await window.analyticsTracker.renderCalendar('dash-mini-calendar');
  }

  // BUG FIX: New method to study a single card by ID (replaces broken inline [c] reference)
  async studySingleCard(cardId) {
    const card = await window.vocabDB.getCard(cardId);
    if (!card) {
      alert('Không tìm thấy thẻ từ vựng này!');
      return;
    }
    this.startStudyCards([card], 'Ôn từ: ' + card.word);
  }

  // --- MÀN HÌNH QUẢN LÝ THƯ MỤC (FOLDERS) ---
  async renderFoldersView() {
    const folders = await window.vocabDB.getFolders();
    const modules = await window.vocabDB.getModules();
    const cards = await window.vocabDB.getCards();
    const container = document.getElementById('folders-grid-container');
    if (!container) return;

    if (folders.length === 0) {
      container.innerHTML = `
        <div class="empty-placeholder-card">
          <span class="placeholder-icon">📁</span>
          <h3>Chưa có thư mục nào</h3>
          <p>Tạo thư mục đầu tiên để phân loại các chủ đề học tập của bạn.</p>
          <button type="button" class="btn-primary" onclick="window.app.openCreateFolderModal()">+ Tạo thư mục mới</button>
        </div>
      `;
      return;
    }

    container.innerHTML = folders.map(f => {
      const folderModules = modules.filter(m => m.folderId === f.id);
      const moduleIds = folderModules.map(m => m.id);
      const folderCardCount = cards.filter(c => moduleIds.includes(c.moduleId)).length;

      return `
        <div class="folder-card" style="border-top: 4px solid ${f.color || '#3b82f6'};" onclick="window.app.navigate('modules', { folderId: '${this.esc(f.id)}' })">
          <div class="folder-card-header">
            <span class="folder-icon-large">${f.icon || '📁'}</span>
            <div class="folder-actions" onclick="event.stopPropagation();">
              <button class="btn-action-icon" title="Chỉnh sửa" onclick="window.app.openEditFolderModal('${this.esc(f.id)}')">✏️</button>
              <button class="btn-action-icon text-danger" title="Xóa" onclick="window.app.deleteFolderPrompt('${this.esc(f.id)}')">🗑️</button>
            </div>
          </div>
          <h3 class="folder-title">${f.name}</h3>
          <p class="folder-desc">${f.description || 'Không có mô tả'}</p>
          <div class="folder-footer-stats">
            <span>📚 ${folderModules.length} học phần</span>
            <span>🃏 ${folderCardCount} từ vựng</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- MÀN HÌNH QUẢN LÝ HỌC PHẦN (MODULES) ---
  async renderModulesView(folderId = null) {
    if (folderId) this.selectedFolderId = folderId;

    const folders = await window.vocabDB.getFolders();
    const allModules = await window.vocabDB.getModules();
    const allCards = await window.vocabDB.getCards();

    let currentFolder = null;
    let modulesToDisplay = allModules;

    if (this.selectedFolderId) {
      currentFolder = folders.find(f => f.id === this.selectedFolderId);
      modulesToDisplay = allModules.filter(m => m.folderId === this.selectedFolderId);
    }

    const titleEl = document.getElementById('modules-view-title');
    if (titleEl) {
      titleEl.textContent = currentFolder ? `Thư mục: ${currentFolder.name}` : 'Tất Cả Học Phần';
    }

    const container = document.getElementById('modules-grid-container');
    if (!container) return;

    if (modulesToDisplay.length === 0) {
      container.innerHTML = `
        <div class="empty-placeholder-card">
          <span class="placeholder-icon">📖</span>
          <h3>Chưa có học phần nào</h3>
          <p>Tạo học phần mới để chứa các flashcard từ vựng.</p>
          <button type="button" class="btn-primary" onclick="window.app.openCreateModuleModal()">+ Tạo học phần mới</button>
        </div>
      `;
      return;
    }

    container.innerHTML = modulesToDisplay.map(m => {
      const modCards = allCards.filter(c => c.moduleId === m.id);
      const masteredCount = modCards.filter(c => (c.srsStage || 0) >= 4).length;
      const percent = modCards.length > 0 ? Math.round((masteredCount / modCards.length) * 100) : 0;

      return `
        <div class="module-card">
          <div class="module-card-header">
            <div class="module-tags-row">
              ${(m.tags || []).map(t => `<span class="module-tag-badge">${t}</span>`).join('')}
            </div>
            <div class="module-menu" onclick="event.stopPropagation();">
              <button class="btn-action-icon text-danger" title="Xóa học phần" onclick="window.app.deleteModulePrompt('${this.esc(m.id)}')">🗑️</button>
            </div>
          </div>

          <h3 class="module-title">${m.title}</h3>
          <p class="module-desc">${m.description || ''}</p>

          <div class="module-progress-bar-wrap">
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: ${percent}%;"></div>
            </div>
            <div class="progress-text-row">
              <span>Đã thuộc: ${masteredCount}/${modCards.length} từ</span>
              <span>${percent}%</span>
            </div>
          </div>

          <!-- NÚT HÀNH ĐỘNG HỌC TẬP -->
          <div class="module-action-buttons">
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn-primary" style="flex: 1;" onclick="window.app.startStudyModule('${this.esc(m.id)}')">
                📇 Học Flashcard (${modCards.length} từ)
              </button>
              <button type="button" class="btn-success-action" style="padding: 8px 14px; font-weight: 700;" title="Thêm Flashcard vào học phần này" onclick="window.openCardModalAction('${this.esc(m.id)}')">
                ➕ Thêm Thẻ
              </button>
            </div>
            <div class="module-sub-buttons">
              <button type="button" class="btn-sub-action" title="Ghép thẻ" onclick="window.app.startMatchFromModule('${this.esc(m.id)}')">
                🧩 Ghép thẻ
              </button>
              <button type="button" class="btn-sub-action" title="Nối từ" onclick="window.app.startConnectFromModule('${this.esc(m.id)}')">
                🔗 Nối từ
              </button>
              <button type="button" class="btn-sub-action" title="Kiểm tra" onclick="window.app.startQuizFromModule('${this.esc(m.id)}')">
                📝 Trắc nghiệm
              </button>
              <button type="button" class="btn-sub-action" title="Quản lý thẻ" onclick="window.app.navigate('cards', { moduleId: '${this.esc(m.id)}' })">
                ⚙️ DS Thẻ
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- MÀN HÌNH QUẢN LÝ DANH SÁCH THẺ TRONG HỌC PHẦN (CARDS) ---
  async renderCardsView(moduleId = null) {
    if (moduleId) this.selectedModuleId = moduleId;
    const currentMod = await window.vocabDB.getModule(this.selectedModuleId);
    const cards = await window.vocabDB.getCardsByModule(this.selectedModuleId);

    const titleEl = document.getElementById('cards-view-title');
    if (titleEl) {
      titleEl.textContent = currentMod ? `Học phần: ${currentMod.title}` : 'Danh sách Flashcard';
    }

    const container = document.getElementById('cards-list-container');
    if (!container) return;

    if (cards.length === 0) {
      container.innerHTML = `
        <div class="empty-placeholder-card">
          <span class="placeholder-icon">🃏</span>
          <h3>Chưa có Flashcard nào trong học phần này</h3>
          <p>Thêm từ vựng đầu tiên của bạn bằng bộ tra cứu từ điển Cambridge tự động.</p>
          <button type="button" class="btn-primary" onclick="window.app.openCreateCardModal()">+ Thêm Flashcard mới</button>
        </div>
      `;
      return;
    }

    container.innerHTML = cards.map(c => `
      <div class="card-list-item">
        <div class="item-word-block">
          <div class="item-top-row">
            <span class="badge-cefr badge-cefr-${(c.cefrLevel || 'B1').toLowerCase()}">CEFR ${c.cefrLevel || 'B1'}</span>
            <span class="item-word-type">(${c.wordType || 'noun'})</span>
            <span class="item-srs-badge">Hộp SRS: ${c.srsStage || 0}</span>
          </div>
          <div class="item-word-title">${c.word}</div>
          <div class="item-ipa-row">
            <span class="accent-label">UK:</span> ${c.ipaUk || ''}
            <button class="btn-sound-mini" onclick="window.soundEngine.speak('${this.esc(c.word)}', 'UK', '${this.esc(c.audioUkUrl)}')">🔊</button>
            <span class="accent-label ml-2">US:</span> ${c.ipaUs || ''}
            <button class="btn-sound-mini" onclick="window.soundEngine.speak('${this.esc(c.word)}', 'US', '${this.esc(c.audioUsUrl)}')">🔊</button>
          </div>
        </div>

        <div class="item-meaning-block">
          <div class="item-meaning-vi"><strong>Nghĩa:</strong> ${c.primaryMeaningVi || (c.definitions && c.definitions[0] ? c.definitions[0].meaningVi : '')}</div>
          <div class="item-meaning-en text-muted">${c.primaryMeaningEn || (c.definitions && c.definitions[0] ? c.definitions[0].meaningEn : '')}</div>
        </div>

        <div class="item-actions-block">
          <button class="btn-action-icon text-danger" title="Xóa thẻ" onclick="window.app.deleteCardPrompt('${this.esc(c.id)}')">🗑️</button>
        </div>
      </div>
    `).join('');
  }

  // --- MÀN HÌNH THEO DÕI TIẾN ĐỘ & PHÂN TÍCH (ANALYTICS) ---
  async renderAnalyticsView() {
    const allCards = await window.vocabDB.getCards();
    const streak = await window.analyticsTracker.calculateStreak();
    const analysis = window.srsEngine.analyzeKnowledgeGaps(allCards);

    const elStreak = document.getElementById('analytics-streak-display');
    const elTotal = document.getElementById('analytics-total-cards');
    const elRetention = document.getElementById('analytics-retention-score');

    if (elStreak) elStreak.textContent = `${streak} Ngày Liên Tiếp 🔥`;
    if (elTotal) elTotal.textContent = `${analysis.totalCards}`;
    if (elRetention) elRetention.textContent = `${analysis.retentionScore}%`;

    // Phân bố các hộp SRS
    const dist = analysis.distribution;
    const s0 = document.getElementById('dist-stage-0');
    const s1 = document.getElementById('dist-stage-1');
    const s2 = document.getElementById('dist-stage-2');
    const s3 = document.getElementById('dist-stage-3');
    const s4 = document.getElementById('dist-stage-4');
    const s5 = document.getElementById('dist-stage-5');

    if (s0) s0.textContent = dist.stage0;
    if (s1) s1.textContent = dist.stage1;
    if (s2) s2.textContent = dist.stage2;
    if (s3) s3.textContent = dist.stage3;
    if (s4) s4.textContent = dist.stage4;
    if (s5) s5.textContent = dist.stage5;

    await window.analyticsTracker.renderCalendar('analytics-full-calendar');
  }

  // --- HÀNH ĐỘNG HỌC TẬP & TRÒ CHƠI ---
  async startStudyModule(moduleId) {
    const mod = await window.vocabDB.getModule(moduleId);
    const cards = await window.vocabDB.getCardsByModule(moduleId);
    if (!cards || cards.length === 0) {
      alert('Học phần này chưa có flashcard nào. Vui lòng thêm từ vựng trước!');
      return;
    }
    this.startStudyCards(cards, mod ? mod.title : 'Học phần', moduleId);
  }

  startStudyCards(cards, title, moduleId = null) {
    this.showView('view-study');
    window.studySession.startSession(cards, moduleId, title);
  }

  async startMatchFromModule(moduleId) {
    const cards = await window.vocabDB.getCardsByModule(moduleId);
    if (!cards || cards.length < 2) {
      alert('Học phần cần ít nhất 2 thẻ để chơi ghép thẻ!');
      return;
    }
    window.gameEngine.startMatchGame(cards);
  }

  async startConnectFromModule(moduleId) {
    const cards = await window.vocabDB.getCardsByModule(moduleId);
    if (!cards || cards.length < 2) {
      alert('Học phần cần ít nhất 2 thẻ để chơi nối từ!');
      return;
    }
    window.gameEngine.startConnectGame(cards);
  }

  async startQuizFromModule(moduleId) {
    const mod = await window.vocabDB.getModule(moduleId);
    const cards = await window.vocabDB.getCardsByModule(moduleId);
    if (!cards || cards.length < 2) {
      alert('Học phần cần ít nhất 2 thẻ để tạo bài kiểm tra!');
      return;
    }
    window.quizEngine.openQuizModal(cards, mod ? mod.title : 'Bài kiểm tra');
  }

  async cramDueCards() {
    const allCards = await window.vocabDB.getCards();
    const analysis = window.srsEngine.analyzeKnowledgeGaps(allCards);
    if (analysis.dueCards.length === 0) {
      alert('Hiện chưa có từ nào đến hạn ôn tập hôm nay!');
      return;
    }
    this.startStudyCards(analysis.dueCards, 'Ôn tập từ đến hạn hôm nay');
  }

  async cramWeakCards() {
    const allCards = await window.vocabDB.getCards();
    const analysis = window.srsEngine.analyzeKnowledgeGaps(allCards);
    if (analysis.weakCards.length === 0) {
      alert('Tuyệt vời! Không có từ vựng khó nào cần ôn lại.');
      return;
    }
    this.startStudyCards(analysis.weakCards, 'Ôn tập các từ hay quên');
  }

  // --- CÁC MODAL QUẢN LÝ ---
  openCreateFolderModal() {
    document.getElementById('modal-folder-title').textContent = 'Tạo Thư Mục Mới';
    document.getElementById('folder-input-id').value = '';
    document.getElementById('folder-input-name').value = '';
    document.getElementById('folder-input-desc').value = '';
    document.getElementById('folder-input-icon').value = '📁';
    document.getElementById('folder-input-color').value = '#3b82f6';
    document.getElementById('modal-folder').classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('folder-input-name').focus();
    }, 100);
  }

  async openEditFolderModal(folderId) {
    const folder = await window.vocabDB.getFolder(folderId);
    if (!folder) return;
    document.getElementById('modal-folder-title').textContent = 'Chỉnh Sửa Thư Mục';
    document.getElementById('folder-input-id').value = folder.id;
    document.getElementById('folder-input-name').value = folder.name;
    document.getElementById('folder-input-desc').value = folder.description || '';
    document.getElementById('folder-input-icon').value = folder.icon || '📁';
    document.getElementById('folder-input-color').value = folder.color || '#3b82f6';
    document.getElementById('modal-folder').classList.remove('hidden');
  }

  async saveFolderFromModal() {
    try {
      const id = document.getElementById('folder-input-id').value;
      const name = document.getElementById('folder-input-name').value.trim();
      const desc = document.getElementById('folder-input-desc').value.trim();
      const icon = document.getElementById('folder-input-icon').value.trim() || '📁';
      const color = document.getElementById('folder-input-color').value || '#3b82f6';

      if (!name) {
        alert('Vui lòng nhập tên thư mục!');
        return;
      }

      await window.vocabDB.saveFolder({ id: id || undefined, name, description: desc, icon, color });
      document.getElementById('modal-folder').classList.add('hidden');
      await this.renderFoldersView();
      if (window.soundEngine) window.soundEngine.playCorrectSound();
      this.showToast('Đã lưu thư mục thành công!');
    } catch (err) {
      console.error('[App] Lỗi khi lưu thư mục:', err);
      alert('Không thể lưu thư mục: ' + (err.message || err));
    }
  }

  async deleteFolderPrompt(folderId) {
    if (confirm('Bạn có chắc chắn muốn xóa thư mục này cùng toàn bộ học phần và flashcard bên trong?')) {
      await window.vocabDB.deleteFolder(folderId);
      await this.renderFoldersView();
    }
  }

  async openCreateModuleModal() {
    const folders = await window.vocabDB.getFolders();
    if (!folders || folders.length === 0) {
      alert('Vui lòng tạo thư mục trước khi tạo học phần!');
      this.openCreateFolderModal();
      return;
    }
    const selectEl = document.getElementById('module-select-folder');
    if (selectEl) {
      selectEl.innerHTML = folders.map(f => `
        <option value="${f.id}" ${f.id === this.selectedFolderId ? 'selected' : ''}>${f.name}</option>
      `).join('');
    }

    document.getElementById('module-input-title').value = '';
    document.getElementById('module-input-desc').value = '';
    document.getElementById('module-input-tags').value = 'B1, Giao tiếp';
    document.getElementById('modal-module').classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('module-input-title').focus();
    }, 100);
  }

  async saveModuleFromModal() {
    try {
      const folderId = document.getElementById('module-select-folder').value;
      const title = document.getElementById('module-input-title').value.trim();
      const desc = document.getElementById('module-input-desc').value.trim();
      const rawTags = document.getElementById('module-input-tags').value.trim();
      const tags = rawTags ? rawTags.split(',').map(t => t.trim()).filter(Boolean) : [];

      if (!title) {
        alert('Vui lòng nhập tên học phần!');
        return;
      }

      await window.vocabDB.saveModule({ folderId, title, description: desc, tags });
      document.getElementById('modal-module').classList.add('hidden');
      await this.renderModulesView(folderId);
      if (window.soundEngine) window.soundEngine.playCorrectSound();
      this.showToast('Đã lưu học phần thành công!');
    } catch (err) {
      console.error('[App] Lỗi khi lưu học phần:', err);
      alert('Không thể lưu học phần: ' + (err.message || err));
    }
  }

  async deleteModulePrompt(moduleId) {
    if (confirm('Bạn có chắc chắn muốn xóa học phần này cùng toàn bộ flashcard bên trong?')) {
      await window.vocabDB.deleteModule(moduleId);
      await this.renderModulesView(this.selectedFolderId);
    }
  }

  // --- MODAL TẠO FLASHCARD & TỰ ĐỘNG TRA TỪ ĐIỂN CAMBRIDGE ---
  async openCreateCardModal(defaultModuleId = null) {
    let modules = await window.vocabDB.getModules();
    if (!modules || modules.length === 0) {
      // Tự động tạo một học phần mặc định để người dùng luôn tạo được thẻ ngay lập tức!
      const defaultFolder = (await window.vocabDB.getFolders())[0];
      const newMod = await window.vocabDB.saveModule({
        folderId: defaultFolder ? defaultFolder.id : undefined,
        title: 'Học Phần Căn Bản (General)',
        description: 'Tự động tạo cho các từ vựng mới thêm',
        tags: ['Căn bản', 'Từ vựng']
      });
      modules = [newMod];
    }
    const targetModuleId = defaultModuleId || this.selectedModuleId || (modules[0] ? modules[0].id : null);
    const selectEl = document.getElementById('card-select-module');
    if (selectEl) {
      selectEl.innerHTML = modules.map(m => `
        <option value="${m.id}" ${m.id === targetModuleId ? 'selected' : ''}>${m.title}</option>
      `).join('');
    }

    document.getElementById('card-input-word').value = '';
    document.getElementById('card-input-ipa-uk').value = '';
    document.getElementById('card-input-ipa-us').value = '';
    document.getElementById('card-input-cefr').value = 'B1';
    document.getElementById('card-input-type').value = 'noun';
    document.getElementById('card-input-meaning-vi').value = '';
    document.getElementById('card-input-meaning-en').value = '';
    document.getElementById('card-input-example-en').value = '';
    document.getElementById('card-input-example-vi').value = '';
    document.getElementById('card-input-notes').value = '';

    document.getElementById('modal-card').classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('card-input-word').focus();
    }, 100);
  }

  async handleDictionaryAutoFill() {
    const wordInput = document.getElementById('card-input-word');
    const word = wordInput ? wordInput.value.trim() : '';
    if (!word) {
      alert('Vui lòng nhập từ tiếng Anh trước khi tra từ điển!');
      return;
    }

    const btn = document.getElementById('btn-dict-lookup');
    if (btn) btn.textContent = '⏳ Đang tra...';

    try {
      const entry = await window.dictionaryService.lookupWord(word);
      if (entry) {
        document.getElementById('card-input-ipa-uk').value = entry.ipaUk || '';
        document.getElementById('card-input-ipa-us').value = entry.ipaUs || '';
        document.getElementById('card-input-cefr').value = entry.cefrLevel || 'B1';
        document.getElementById('card-input-type').value = entry.wordType || 'noun';
        document.getElementById('card-input-meaning-en').value = entry.primaryMeaningEn || '';
        
        if (entry.definitions && entry.definitions[0]) {
          document.getElementById('card-input-example-en').value = entry.definitions[0].exampleEn || '';
        }
        if (entry.usageNotes) {
          document.getElementById('card-input-notes').value = entry.usageNotes;
        }

        // Phát âm thử ngay
        window.soundEngine.speak(entry.word, 'US', entry.audioUsUrl);
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (btn) btn.textContent = '🔍 Tra từ điển';
    }
  }

  async saveCardFromModal() {
    const btn = document.getElementById('btn-save-card');
    const originalBtnText = btn ? btn.textContent : 'Lưu Flashcard';
    try {
      let moduleId = document.getElementById('card-select-module').value;
      const word = document.getElementById('card-input-word').value.trim();
      const wordType = document.getElementById('card-input-type').value || 'noun';
      
      let ipaUk = document.getElementById('card-input-ipa-uk').value.trim();
      let ipaUs = document.getElementById('card-input-ipa-us').value.trim();
      let cefr = document.getElementById('card-input-cefr').value;
      let meaningVi = document.getElementById('card-input-meaning-vi').value.trim();
      let meaningEn = document.getElementById('card-input-meaning-en').value.trim();
      let exEn = document.getElementById('card-input-example-en').value.trim();
      let exVi = document.getElementById('card-input-example-vi').value.trim();
      let notes = document.getElementById('card-input-notes').value.trim();

      const errBox = document.getElementById('card-form-error');
      if (errBox) errBox.classList.add('hidden');

      if (!word) {
        if (errBox) {
          errBox.textContent = '⚠️ Vui lòng nhập từ vựng tiếng Anh!';
          errBox.classList.remove('hidden');
        } else {
          alert('Vui lòng nhập từ vựng tiếng Anh!');
        }
        document.getElementById('card-input-word').focus();
        return;
      }

      // NẾU NGƯỜI DÙNG CHỈ NHẬP TỪ VỰNG VÀ TỪ LOẠI:
      // TỰ ĐỘNG TRA CỨU 100% CÁC THÔNG TIN CÒN LẠI TỪ CAMBRIDGE & DỊCH THUẬT!
      if (!meaningVi || !ipaUk || !meaningEn) {
        if (btn) btn.textContent = '⏳ Đang tự động tra Cambridge & dịch nghĩa...';
        try {
          const enriched = await window.dictionaryService.autoEnrichWord(word, wordType);
          if (enriched) {
            if (!meaningVi) meaningVi = enriched.primaryMeaningVi;
            if (!ipaUk) ipaUk = enriched.ipaUk;
            if (!ipaUs) ipaUs = enriched.ipaUs;
            if (!cefr || cefr === 'B1') cefr = enriched.cefrLevel || cefr;
            if (!meaningEn) meaningEn = enriched.primaryMeaningEn;
            if (!exEn && enriched.exampleEn) exEn = enriched.exampleEn;
            if (!exVi && enriched.exampleVi) exVi = enriched.exampleVi;
            if (!notes && enriched.usageNotes) notes = enriched.usageNotes;
          }
        } catch (e) {
          console.warn('[App] Lỗi tự động làm giàu từ vựng:', e);
        }
      }

      if (!meaningVi) meaningVi = word;

      // Đảm bảo có học phần
      if (!moduleId) {
        const mods = await window.vocabDB.getModules();
        if (mods.length > 0) {
          moduleId = mods[0].id;
        } else {
          const newMod = await window.vocabDB.saveModule({ title: 'Học Phần Căn Bản', tags: ['Từ vựng'] });
          moduleId = newMod.id;
        }
      }

      const cardData = {
        moduleId,
        word: word.charAt(0).toUpperCase() + word.slice(1),
        wordType,
        cefrLevel: cefr || 'B1',
        ipaUk: ipaUk || `/${word}/`,
        ipaUs: ipaUs || ipaUk || `/${word}/`,
        audioUkUrl: '',
        audioUsUrl: '',
        primaryMeaningVi: meaningVi,
        primaryMeaningEn: meaningEn || `Definition of ${word}`,
        definitions: [
          {
            meaningVi,
            meaningEn: meaningEn || `Definition of ${word}`,
            context: wordType,
            exampleEn: exEn || `Example sentence with ${word}.`,
            exampleVi: exVi || `Câu ví dụ với ${meaningVi}.`
          }
        ],
        usageNotes: notes || `Từ loại: ${wordType}. Cấp độ: CEFR ${cefr}.`,
        srsStage: 0,
        nextReviewDate: new Date().toISOString()
      };

      await window.vocabDB.saveCard(cardData);
      document.getElementById('modal-card').classList.add('hidden');
      this.selectedModuleId = moduleId;
      await this.navigate('cards', { moduleId });
      if (window.soundEngine) window.soundEngine.playCorrectSound();
      this.showToast(`✅ Đã tạo thẻ "${word}" (${wordType}) với đầy đủ dữ liệu Cambridge!`);
    } catch (err) {
      console.error('[App] Lỗi khi lưu flashcard:', err);
      alert('Không thể lưu flashcard: ' + (err.message || err));
    } finally {
      if (btn) btn.textContent = originalBtnText;
    }
  }

  async deleteCardPrompt(cardId) {
    if (confirm('Bạn có chắc chắn muốn xóa flashcard này?')) {
      await window.vocabDB.deleteCard(cardId);
      await this.renderCardsView(this.selectedModuleId);
    }
  }
}

// Khởi động ứng dụng ngay khi script sẵn sàng
const launchApp = () => {
  if (!window.app) {
    window.app = new VocabApp();
    window.app.init();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', launchApp);
} else {
  launchApp();
}
