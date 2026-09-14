// Thuật toán Lặp Lại Ngắt Quãng (Spaced Repetition System - SRS)
// Theo các mốc thời gian chuẩn yêu cầu:
// - Cấp 0: Thẻ mới (Học ngay)
// - Cấp 1: 1 ngày sau (24 giờ)
// - Cấp 2: 3 ngày sau (72 giờ)
// - Cấp 3: 1 tuần sau (7 ngày)
// - Cấp 4: 1 tháng sau (30 ngày)
// - Cấp 5: Thành thạo (Mastered / 90 ngày)
// Kèm Bộ Xử Lý Phân Tích Lỗ Hổng Kiến Thức (Weakness & Deficiency Analyzer)

class SRSEngine {
  constructor() {
    // Khoảng thời gian giãn cách theo ngày cho từng cấp độ
    this.intervals = {
      0: 0,       // Mới / Ôn ngay lập tức
      1: 1,       // 1 ngày
      2: 3,       // 3 ngày
      3: 7,       // 1 tuần (7 ngày)
      4: 30,      // 1 tháng (30 ngày)
      5: 90       // Đã thuộc vững vàng
    };
  }

  // Tính toán trạng thái tiếp theo của thẻ khi học
  // isRemembered: true = Đã nhớ (vuốt sang phải), false = Chưa nhớ (vuốt sang trái)
  calculateNextState(card, isRemembered) {
    const now = new Date();
    let currentStage = card.srsStage || 0;
    let newStage = currentStage;
    let reviewCount = (card.reviewCount || 0) + 1;
    let mistakeCount = card.mistakeCount || 0;

    if (isRemembered) {
      // Nếu đã nhớ: thăng cấp chu kỳ ngắt quãng
      newStage = Math.min(5, currentStage + 1);
    } else {
      // Nếu chưa nhớ: reset về cấp 1 (1 ngày) hoặc cấp 0 để ôn lại ngay
      newStage = 1;
      mistakeCount += 1;
    }

    // Tính ngày ôn tập tiếp theo
    const daysToAdd = this.intervals[newStage] || 1;
    const nextDate = new Date(now);
    nextDate.setDate(nextDate.getDate() + daysToAdd);

    const history = card.history || [];
    history.push({
      date: now.toISOString(),
      result: isRemembered ? 'remembered' : 'forgotten',
      stageFrom: currentStage,
      stageTo: newStage
    });

    return {
      ...card,
      srsStage: newStage,
      nextReviewDate: nextDate.toISOString(),
      reviewCount,
      mistakeCount,
      lastReviewed: now.toISOString(),
      history: history.slice(-20) // Giữ 20 lần học gần nhất
    };
  }

  // Kiểm tra xem thẻ đã đến hạn cần ôn tập hay chưa
  isDueForReview(card) {
    if (!card.nextReviewDate) return true;
    return new Date(card.nextReviewDate) <= new Date();
  }

  // --- BỘ XỬ LÝ PHÂN TÍCH LỖ HỔNG KIẾN THỨC (Weakness & Deficiency Analyzer) ---
  // Tìm ra người dùng đang học thiếu ở đâu, từ nào hay sai, từ nào quá hạn chưa ôn
  analyzeKnowledgeGaps(allCards) {
    const now = new Date();
    
    // 1. Các từ đến hạn ôn tập hôm nay
    const dueCards = allCards.filter(c => this.isDueForReview(c));

    // 2. Các từ yếu / hay quên nhất (Bị đánh dấu Chưa nhớ hoặc sai nhiều lần)
    const weakCards = allCards.filter(c => {
      const mistakes = c.mistakeCount || 0;
      const reviews = c.reviewCount || 0;
      const lastHistory = c.history && c.history.length ? c.history[c.history.length - 1] : null;
      return (mistakes >= 2) || (lastHistory && lastHistory.result === 'forgotten') || (c.srsStage === 0 && reviews > 0);
    }).sort((a, b) => (b.mistakeCount || 0) - (a.mistakeCount || 0));

    // 3. Các từ chưa từng học lần nào
    const unlearnedCards = allCards.filter(c => !c.reviewCount || c.reviewCount === 0);

    // 4. Các từ đã thành thạo (Cấp 4 hoặc 5)
    const masteredCards = allCards.filter(c => (c.srsStage || 0) >= 4);

    // 5. Thống kê phân bố theo các mốc SRS
    const distribution = {
      stage0: allCards.filter(c => (c.srsStage || 0) === 0).length,
      stage1: allCards.filter(c => (c.srsStage || 0) === 1).length, // 1 ngày
      stage2: allCards.filter(c => (c.srsStage || 0) === 2).length, // 3 ngày
      stage3: allCards.filter(c => (c.srsStage || 0) === 3).length, // 1 tuần
      stage4: allCards.filter(c => (c.srsStage || 0) === 4).length, // 1 tháng
      stage5: allCards.filter(c => (c.srsStage || 0) === 5).length  // Thành thạo
    };

    // 6. Tính toán điểm ghi nhớ tổng thể (% Retention Score)
    const totalCards = allCards.length;
    let retentionScore = 0;
    if (totalCards > 0) {
      const weightedScore = (
        distribution.stage1 * 20 +
        distribution.stage2 * 45 +
        distribution.stage3 * 70 +
        distribution.stage4 * 90 +
        distribution.stage5 * 100
      );
      retentionScore = Math.round(weightedScore / (totalCards * 100) * 100);
    }

    // 7. Đưa ra gợi ý thông minh
    let diagnosisMessage = '';
    if (dueCards.length > 0) {
      diagnosisMessage = `Bạn có ${dueCards.length} từ đến hạn ôn tập hôm nay để củng cố trí nhớ dài hạn.`;
    } else if (weakCards.length > 0) {
      diagnosisMessage = `Bạn có ${weakCards.length} từ khó hay bị nhầm lẫn, hãy làm bài tập củng cố riêng.`;
    } else if (unlearnedCards.length > 0) {
      diagnosisMessage = `Bạn còn ${unlearnedCards.length} từ mới chưa học trong kho từ vựng.`;
    } else {
      diagnosisMessage = 'Tiến độ học tập rất xuất sắc! Tất cả từ vựng đều được ghi nhớ tốt.';
    }

    return {
      totalCards,
      dueCards,
      weakCards,
      unlearnedCards,
      masteredCards,
      distribution,
      retentionScore,
      diagnosisMessage
    };
  }
}

window.srsEngine = new SRSEngine();
