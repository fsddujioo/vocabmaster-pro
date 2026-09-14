// Hệ thống Theo Dõi Tiến Độ Học Tập Theo Ngày / Tháng / Năm (Analytics Engine)
// - Tính toán chuỗi ngày học liên tiếp (Streak 🔥)
// - Lịch học tương tác (Activity Calendar Heatmap) theo từng tháng/năm
// - Thống kê tỷ lệ ghi nhớ và các cấp độ SRS

class AnalyticsTracker {
  constructor() {
    this.currentCalendarDate = new Date();
  }

  // BUG FIX: Use local date string instead of UTC toISOString()
  getLocalDateString(date) {
    const d = date || new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Tính toán chuỗi ngày học liên tiếp (Streak)
  async calculateStreak() {
    const logs = await window.vocabDB.getAllStudyLogs();
    if (!logs || logs.length === 0) return 0;

    // QUY TẮC CHUẨN: Chỉ tính ngày người dùng CHÍNH THỨC HỌC XONG ít nhất 1 học phần (modulesCompleted >= 1)
    const validLogs = logs.filter(l => (l.modulesCompleted || 0) >= 1);
    if (validLogs.length === 0) return 0;

    const dates = validLogs.map(l => l.date).sort().reverse();
    const today = this.getLocalDateString(new Date());

    let streak = 0;
    let checkDate = new Date();

    // Nếu hôm nay chưa hoàn thành học phần nào, kiểm tra từ ngày hôm qua
    if (!dates.includes(today)) {
      checkDate.setDate(checkDate.getDate() - 1);
      const yesterday = this.getLocalDateString(checkDate);
      if (!dates.includes(yesterday)) {
        return 0; // Đã đứt streak
      }
    }

    // Đếm lùi các ngày liên tiếp đã hoàn thành học phần
    while (true) {
      const dateStr = this.getLocalDateString(checkDate);
      if (dates.includes(dateStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  // Render Lịch học tương tác (Heatmap Calendar)
  async renderCalendar(containerId, year = null, month = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (year !== null && month !== null) {
      this.currentCalendarDate = new Date(year, month, 1);
    }

    const currentYear = this.currentCalendarDate.getFullYear();
    const currentMonth = this.currentCalendarDate.getMonth(); // 0 - 11

    const logs = await window.vocabDB.getAllStudyLogs();
    const logMap = {};
    logs.forEach(l => {
      logMap[l.date] = l;
    });

    const monthNames = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    // Ngày đầu tiên và tổng số ngày trong tháng
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Chuyển Chủ nhật thành 7 để hiển thị từ T2 -> CN
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    // BUG FIX: Use local date string for today comparison
    const todayStr = this.getLocalDateString(new Date());

    let calendarHtml = `
      <div class="calendar-header-nav">
        <button type="button" class="btn-cal-nav" onclick="window.analyticsTracker.prevMonth('${containerId}')">◀ Tháng trước</button>
        <div class="calendar-title-text">${monthNames[currentMonth]} năm ${currentYear}</div>
        <button type="button" class="btn-cal-nav" onclick="window.analyticsTracker.nextMonth('${containerId}')">Tháng sau ▶</button>
      </div>

      <div class="calendar-grid-table">
        <div class="cal-day-header">T2</div>
        <div class="cal-day-header">T3</div>
        <div class="cal-day-header">T4</div>
        <div class="cal-day-header">T5</div>
        <div class="cal-day-header">T6</div>
        <div class="cal-day-header">T7</div>
        <div class="cal-day-header text-danger">CN</div>
    `;

    // Các ô trống đầu tháng
    for (let i = 0; i < startOffset; i++) {
      calendarHtml += `<div class="cal-cell cal-cell-empty"></div>`;
    }

    // Các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const dStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const log = logMap[dStr];
      const isToday = (dStr === todayStr);

      let activityLevel = 'level-0';
      if (log) {
        const count = log.cardsReviewed || 0;
        if (count > 20) activityLevel = 'level-4';
        else if (count > 10) activityLevel = 'level-3';
        else if (count > 5) activityLevel = 'level-2';
        else if (count > 0) activityLevel = 'level-1';
      }

      calendarHtml += `
        <div class="cal-cell ${activityLevel} ${isToday ? 'is-today' : ''}" 
             data-date="${dStr}" 
             onclick="window.analyticsTracker.showDayDetail('${dStr}')"
             title="${dStr}: ${log ? log.cardsReviewed + ' từ' : 'Chưa học'}">
          <span class="cell-day-number">${day}</span>
          ${log && log.cardsReviewed > 0 ? `<span class="cell-activity-dot"></span>` : ''}
        </div>
      `;
    }

    calendarHtml += `</div>`;
    calendarHtml += `
      <div class="calendar-legend">
        <span class="legend-label">Mức độ hoạt động:</span>
        <span class="legend-box level-0" title="0 từ"></span>
        <span class="legend-box level-1" title="1-5 từ"></span>
        <span class="legend-box level-2" title="6-10 từ"></span>
        <span class="legend-box level-3" title="11-20 từ"></span>
        <span class="legend-box level-4" title=">20 từ"></span>
        <span class="legend-hint">(Nhấp vào ngày để xem chi tiết)</span>
      </div>
    `;

    container.innerHTML = calendarHtml;
  }

  prevMonth(containerId) {
    this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() - 1);
    this.renderCalendar(containerId);
  }

  nextMonth(containerId) {
    this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + 1);
    this.renderCalendar(containerId);
  }

  // Xem chi tiết hoạt động trong một ngày được chọn
  async showDayDetail(dateStr) {
    const log = await window.vocabDB.getStudyLogByDate(dateStr);
    
    // BUG FIX: Try both dashboard and analytics detail boxes
    let detailBox = document.getElementById('calendar-day-detail-box');
    if (!detailBox) {
      detailBox = document.getElementById('analytics-day-detail-box');
    }
    if (!detailBox) return;

    detailBox.classList.remove('hidden');

    const formattedDate = new Date(dateStr + 'T00:00:00').toLocaleDateString('vi-VN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    if (log) {
      detailBox.innerHTML = `
        <div class="day-detail-card">
          <div class="day-detail-header">
            <h4>📅 Nhật ký ngày ${formattedDate}</h4>
            <button class="btn-close-mini" onclick="this.closest('.day-detail-card').parentElement.classList.add('hidden')">✕</button>
          </div>
          <div class="day-stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));">
            <div class="stat-pill" style="border: 1px solid #f59e0b;">
              <span class="stat-val text-warning">${log.modulesCompleted || 0}</span>
              <span class="stat-lbl">Học phần hoàn thành</span>
            </div>
            <div class="stat-pill">
              <span class="stat-val">${log.cardsReviewed || 0}</span>
              <span class="stat-lbl">Từ đã ôn tập</span>
            </div>
            <div class="stat-pill">
              <span class="stat-val text-success">${log.cardsMastered || 0}</span>
              <span class="stat-lbl">Từ nhớ vững</span>
            </div>
            <div class="stat-pill">
              <span class="stat-val text-primary">${log.quizCount || 0}</span>
              <span class="stat-lbl">Bài kiểm tra</span>
            </div>
          </div>
        </div>
      `;
    } else {
      detailBox.innerHTML = `
        <div class="day-detail-card empty-log">
          <div class="day-detail-header">
            <h4>📅 Ngày ${formattedDate}</h4>
            <button class="btn-close-mini" onclick="this.closest('.day-detail-card').parentElement.classList.add('hidden')">✕</button>
          </div>
          <p class="text-muted">Bạn chưa ghi nhận buổi học nào trong ngày này.</p>
        </div>
      `;
    }
  }
}

window.analyticsTracker = new AnalyticsTracker();
