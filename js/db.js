// IndexedDB & LocalStorage Hybrid Storage Engine cho VocabMaster Pro
// Đảm bảo không bao giờ bị deadlock và tự động fallback sang LocalStorage nếu IndexedDB không khả dụng.

const DB_NAME = 'VocabMasterDB';
const DB_VERSION = 1;

class VocabDB {

  // Tự động xóa các nhật ký giả định trước đây để đưa về 0 ngày thật cho người dùng
  async purgeLegacyFakeLogs() {
    try {
      if (localStorage.getItem('vm_study_logs_purged_v4') !== 'true') {
        console.log('[DB] Đang reset lại toàn bộ ngày học cũ theo yêu cầu người dùng...');
        localStorage.removeItem('vm_study_logs');
        if (this.db) {
          const tx = this.db.transaction('study_logs', 'readwrite');
          const store = tx.objectStore('study_logs');
          store.clear();
        }
        localStorage.setItem('vm_study_logs_purged_v4', 'true');
        console.log('[DB] Đã reset ngày học thành công! Bắt đầu tính streak thật.');
      }
    } catch (e) {
      console.warn('[DB] Lỗi purge logs cũ:', e);
    }
  }

  constructor() {
    this.db = null;
    this.initPromise = null;
    this.useLocalStorage = false;
  }

  async init() {
    if (this.db) return this.db;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve) => {
      // Kiểm tra hỗ trợ IndexedDB
      if (!window.indexedDB) {
        console.warn('[DB] Trình duyệt không hỗ trợ IndexedDB, chuyển sang LocalStorage');
        this.useLocalStorage = true;
        this.seedInitialDataSync();
        resolve(null);
        return;
      }

      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('folders')) {
            const folderStore = db.createObjectStore('folders', { keyPath: 'id' });
            folderStore.createIndex('name', 'name', { unique: false });
            folderStore.createIndex('createdAt', 'createdAt', { unique: false });
          }
          if (!db.objectStoreNames.contains('modules')) {
            const moduleStore = db.createObjectStore('modules', { keyPath: 'id' });
            moduleStore.createIndex('folderId', 'folderId', { unique: false });
            moduleStore.createIndex('title', 'title', { unique: false });
          }
          if (!db.objectStoreNames.contains('cards')) {
            const cardStore = db.createObjectStore('cards', { keyPath: 'id' });
            cardStore.createIndex('moduleId', 'moduleId', { unique: false });
            cardStore.createIndex('word', 'word', { unique: false });
            cardStore.createIndex('srsStage', 'srsStage', { unique: false });
            cardStore.createIndex('nextReviewDate', 'nextReviewDate', { unique: false });
          }
          if (!db.objectStoreNames.contains('study_logs')) {
            const logStore = db.createObjectStore('study_logs', { keyPath: 'id' });
            logStore.createIndex('date', 'date', { unique: false });
          }
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' });
          }
        };

        request.onsuccess = async (event) => {
          this.db = event.target.result;
          console.log('[DB] IndexedDB đã sẵn sàng!');
          try {
            await this.seedInitialDataIfEmpty();
            await this.purgeLegacyFakeLogs();
          } catch (e) {
            console.warn('[DB] Lỗi seed dữ liệu:', e);
          }
          resolve(this.db);
        };

        request.onerror = (event) => {
          console.warn('[DB] Lỗi mở IndexedDB, tự động chuyển sang LocalStorage:', event.target.error);
          this.useLocalStorage = true;
          this.seedInitialDataSync();
          resolve(null);
        };
      } catch (err) {
        console.warn('[DB] Ngoại lệ IndexedDB, tự động chuyển sang LocalStorage:', err);
        this.useLocalStorage = true;
        this.seedInitialDataSync();
        resolve(null);
      }
    });

    return this.initPromise;
  }

  // --- LOCALSTORAGE FALLBACK ENGINE ---
  lsGetItems(storeName) {
    try {
      const data = localStorage.getItem('vm_' + storeName);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  lsSetItems(storeName, items) {
    try {
      localStorage.setItem('vm_' + storeName, JSON.stringify(items));
    } catch (e) {
      console.warn('[DB] Không thể ghi LocalStorage:', e);
    }
  }

  seedInitialDataSync() {
    const folders = this.lsGetItems('folders');
    if (folders.length === 0 && typeof SAMPLE_DATA !== 'undefined') {
      console.log('[DB] Khởi tạo dữ liệu mẫu vào LocalStorage...');
      this.lsSetItems('folders', SAMPLE_DATA.folders);
      this.lsSetItems('modules', SAMPLE_DATA.modules);
      this.lsSetItems('cards', SAMPLE_DATA.cards);

      const logs = [];
      const today = new Date();
      for (let i = 0; i < 5; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        logs.push({
          id: 'log-' + dateStr,
          date: dateStr,
          cardsReviewed: 10 + i * 2,
          cardsMastered: 6 + i,
          quizCount: 2,
          durationMinutes: 15
        });
      }
      this.lsSetItems('study_logs', logs);
    }
  }

  // Tự động nạp bộ dữ liệu mẫu ban đầu nếu DB đang trống (IndexedDB)
  async seedInitialDataIfEmpty() {
    if (this.useLocalStorage) {
      this.seedInitialDataSync();
      return;
    }

    const folderCount = await this.count('folders');
    if (folderCount === 0 && typeof SAMPLE_DATA !== 'undefined') {
      console.log('[DB] Đang nạp dữ liệu mẫu Cambridge vào IndexedDB...');
      for (const folder of SAMPLE_DATA.folders) {
        await this.put('folders', folder);
      }
      for (const mod of SAMPLE_DATA.modules) {
        await this.put('modules', mod);
      }
      for (const card of SAMPLE_DATA.cards) {
        await this.put('cards', card);
      }

// Đã xóa toàn bộ fake logs - chỉ tính khi người dùng chính thức học xong
      console.log('[DB] Nạp dữ liệu mẫu IndexedDB thành công!');
    }
  }

  // --- HELPER THAO TÁC CƠ SỞ DỮ LIỆU ---
  async ensureDb() {
    if (this.useLocalStorage) return null;
    if (this.db) return this.db;
    return await this.init();
  }

  async get(storeName, key) {
    if (this.useLocalStorage) {
      const items = this.lsGetItems(storeName);
      return items.find(item => item.id === key || item.key === key) || null;
    }
    const db = await this.ensureDb();
    if (!db) {
      const items = this.lsGetItems(storeName);
      return items.find(item => item.id === key) || null;
    }

    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  }

  async getAll(storeName) {
    if (this.useLocalStorage) {
      return this.lsGetItems(storeName);
    }
    const db = await this.ensureDb();
    if (!db) return this.lsGetItems(storeName);

    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      } catch (err) {
        resolve(this.lsGetItems(storeName));
      }
    });
  }

  async getAllByIndex(storeName, indexName, value) {
    if (this.useLocalStorage) {
      const items = this.lsGetItems(storeName);
      return items.filter(item => item[indexName] === value);
    }
    const db = await this.ensureDb();
    if (!db) {
      const items = this.lsGetItems(storeName);
      return items.filter(item => item[indexName] === value);
    }

    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const index = store.index(indexName);
        const req = index.getAll(value);
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      } catch (err) {
        const items = this.lsGetItems(storeName);
        resolve(items.filter(item => item[indexName] === value));
      }
    });
  }

  async put(storeName, value) {
    if (this.useLocalStorage) {
      const items = this.lsGetItems(storeName);
      const idKey = value.id ? 'id' : 'key';
      const idx = items.findIndex(item => item[idKey] === value[idKey]);
      if (idx >= 0) {
        items[idx] = value;
      } else {
        items.push(value);
      }
      this.lsSetItems(storeName, items);
      return value;
    }

    const db = await this.ensureDb();
    if (!db) {
      return this.putFallback(storeName, value);
    }

    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.put(value);
        req.onsuccess = () => resolve(req.result);
        req.onerror = (e) => {
          this.putFallback(storeName, value);
          resolve(value);
        };
      } catch (err) {
        this.putFallback(storeName, value);
        resolve(value);
      }
    });
  }

  putFallback(storeName, value) {
    const items = this.lsGetItems(storeName);
    const idKey = value.id ? 'id' : 'key';
    const idx = items.findIndex(item => item[idKey] === value[idKey]);
    if (idx >= 0) items[idx] = value;
    else items.push(value);
    this.lsSetItems(storeName, items);
    return value;
  }

  async delete(storeName, key) {
    if (this.useLocalStorage) {
      const items = this.lsGetItems(storeName);
      const filtered = items.filter(item => item.id !== key && item.key !== key);
      this.lsSetItems(storeName, filtered);
      return;
    }
    const db = await this.ensureDb();
    if (!db) {
      const items = this.lsGetItems(storeName);
      this.lsSetItems(storeName, items.filter(item => item.id !== key));
      return;
    }

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
      } catch (err) {
        resolve();
      }
    });
  }

  async count(storeName) {
    if (this.useLocalStorage) {
      return this.lsGetItems(storeName).length;
    }
    const db = await this.ensureDb();
    if (!db) return this.lsGetItems(storeName).length;

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.count();
        req.onsuccess = () => resolve(req.result || 0);
        req.onerror = () => resolve(0);
      } catch (err) {
        resolve(0);
      }
    });
  }

  // --- Thư mục (Folders) ---
  async getFolders() {
    return await this.getAll('folders');
  }

  async getFolder(id) {
    return await this.get('folders', id);
  }

  async saveFolder(folder) {
    if (!folder.id) {
      folder.id = 'folder-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
    }
    if (!folder.createdAt) {
      folder.createdAt = new Date().toISOString();
    }
    await this.put('folders', folder);
    return folder;
  }

  async deleteFolder(folderId) {
    const modules = await this.getModulesByFolder(folderId);
    for (const mod of modules) {
      await this.deleteModule(mod.id);
    }
    await this.delete('folders', folderId);
  }

  // --- Học phần (Modules) ---
  async getModules() {
    return await this.getAll('modules');
  }

  async getModule(id) {
    return await this.get('modules', id);
  }

  async getModulesByFolder(folderId) {
    return await this.getAllByIndex('modules', 'folderId', folderId);
  }

  async saveModule(mod) {
    if (!mod.id) {
      mod.id = 'mod-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
    }
    if (!mod.createdAt) {
      mod.createdAt = new Date().toISOString();
    }
    await this.put('modules', mod);
    return mod;
  }

  async deleteModule(moduleId) {
    const cards = await this.getCardsByModule(moduleId);
    for (const c of cards) {
      await this.delete('cards', c.id);
    }
    await this.delete('modules', moduleId);
  }

  // --- Flashcards ---
  async getCards() {
    return await this.getAll('cards');
  }

  async getCard(id) {
    return await this.get('cards', id);
  }

  async getCardsByModule(moduleId) {
    return await this.getAllByIndex('cards', 'moduleId', moduleId);
  }

  async saveCard(card) {
    if (!card.id) {
      card.id = 'card-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
    }
    if (typeof card.srsStage === 'undefined') card.srsStage = 0;
    if (!card.nextReviewDate) card.nextReviewDate = new Date().toISOString();
    if (typeof card.reviewCount === 'undefined') card.reviewCount = 0;
    if (typeof card.mistakeCount === 'undefined') card.mistakeCount = 0;
    if (!card.history) card.history = [];
    
    await this.put('cards', card);
    return card;
  }

  async deleteCard(cardId) {
    await this.delete('cards', cardId);
  }

  // --- Tiến độ & Lịch học theo Ngày/Tháng/Năm (Study Logs) ---
  
  getLocalDateString(date) {
    const d = date || new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // CHÍNH THỨC GHI NHẬN HOÀN THÀNH 1 HỌC PHẦN (ĐỂ TÍNH 1 STREAK)
  async logModuleCompleted(moduleId, totalCards = 0, masteredCards = 0) {
    const todayStr = this.getLocalDateString();
    const existing = await this.get('study_logs', 'log-' + todayStr);
    
    if (existing) {
      existing.modulesCompleted = (existing.modulesCompleted || 0) + 1;
      existing.cardsReviewed = (existing.cardsReviewed || 0) + totalCards;
      existing.cardsMastered = (existing.cardsMastered || 0) + masteredCards;
      if (!existing.completedModuleIds) existing.completedModuleIds = [];
      if (moduleId && !existing.completedModuleIds.includes(moduleId)) {
        existing.completedModuleIds.push(moduleId);
      }
      await this.put('study_logs', existing);
      console.log(`[DB] Đã ghi nhận hoàn thành học phần cho ngày ${todayStr}. Tổng học phần hôm nay: ${existing.modulesCompleted}`);
      return existing;
    } else {
      const newLog = {
        id: 'log-' + todayStr,
        date: todayStr,
        cardsReviewed: totalCards,
        cardsMastered: masteredCards,
        quizCount: 0,
        durationMinutes: 8,
        modulesCompleted: 1,
        completedModuleIds: moduleId ? [moduleId] : []
      };
      await this.put('study_logs', newLog);
      console.log(`[DB] Tạo log mới: Hoàn thành học phần đầu tiên trong ngày ${todayStr}! Streak +1.`);
      return newLog;
    }
  }

  async logStudyActivity(cardsReviewed = 1, cardsMastered = 0, quizCount = 0, durationMinutes = 2) {
    const todayStr = new Date().toISOString().split('T')[0];
    const existing = await this.get('study_logs', 'log-' + todayStr);
    
    if (existing) {
      existing.cardsReviewed = (existing.cardsReviewed || 0) + cardsReviewed;
      existing.cardsMastered = (existing.cardsMastered || 0) + cardsMastered;
      existing.quizCount = (existing.quizCount || 0) + quizCount;
      existing.durationMinutes = (existing.durationMinutes || 0) + durationMinutes;
      await this.put('study_logs', existing);
      return existing;
    } else {
      const newLog = {
        id: 'log-' + todayStr,
        date: todayStr,
        cardsReviewed,
        cardsMastered,
        quizCount,
        durationMinutes
      };
      await this.put('study_logs', newLog);
      return newLog;
    }
  }

  async getAllStudyLogs() {
    return await this.getAll('study_logs');
  }

  async getStudyLogByDate(dateStr) {
    return await this.get('study_logs', 'log-' + dateStr);
  }
}

window.vocabDB = new VocabDB();
