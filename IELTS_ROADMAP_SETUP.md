# Lộ trình IELTS 6.5 trong VocabMaster

Mở VocabMaster → **Lộ trình 6.5**; hoặc mở **Kho & ôn tập** trong bảng VocabMaster Study4 rồi chọn **Lộ trình 6.5**. Nếu app đã mở từ trước bản cập nhật, tải lại trang app một lần hoặc đóng/mở lại tab Kho & ôn tập sau khi lưu biểu mẫu đang làm. Không cần tải lại tiện ích Chrome cho thay đổi này.

Mục tiêu mặc định: IELTS Academic overall 6.5 và không kỹ năng nào dưới 6.0. Mốc tự báo ngày 20/10/2026: R≈5.0, L≈4.0–4.5, W≈4.5, S≈5.0. Ngày thi và phiếu chấm chưa được đối chiếu. Nếu nơi nhận yêu cầu 6.5 từng kỹ năng, cần sửa mục tiêu và các mốc mock tương ứng.

Có 32 buổi khung, không quy định 32 ngày hoặc cam kết thời hạn tăng band. Buổi 1–3 chốt điểm yếu; 4–9 ưu tiên nghe nhận âm và diễn đạt; 10–19 luyện dạng bài; 20–27 ghép dạng và tăng áp lực thời gian; 28–32 đối chiếu hai bộ mock mới. Các buổi thường 90 phút; buổi 27 là 120 phút, buổi 32 là 180 phút, có thể chia phiên. Chữa bài và chờ nhận xét có thể cần phiên khác.

Hai phương pháp trọng tâm:

1. Nhớ lại chủ động theo lịch ôn, bằng cụm và câu: che đáp án → tự nhớ → tự đặt câu → sửa → ôn lại theo SRS → dùng trong tình huống mới.
2. Luyện có mục tiêu và phản hồi: tự làm trước mẫu → đối chiếu tiêu chí/chứng cứ → sửa 1–2 lỗi lớn → làm lại → thử đề mới.

Mỗi buổi có link bài Study4 đã đối chiếu, thứ tự từng bước, sản phẩm đầu ra, checklist, số liệu khi cần và hướng xử lý nếu chưa đạt. Bài mẫu diễn đạt minh họa trong tab phương pháp do trợ lý tự soạn; không lấy làm mẫu Cambridge hoặc đề thi chính thức.

## Lưu checkpoint

- Ghi tên/mã bài, bằng chứng (đoạn tự làm, tên file/link bản thu, bản trước/sau sửa) và lỗi/cách sửa.
- Ghi chú tự lưu sau khi dừng nhập ngắn; chờ dòng **Đã lưu nháp trên máy**, hoặc bấm **Lưu nháp** trước khi đóng. Khi chuyển buổi/tab trong app, phần đang nhập được lưu trước khi chuyển.
- Bấm **Kiểm tra checkpoint** để đối chiếu thông tin đã nhập. Checklist định tính là người học tự kiểm tra; app không tự nghe bài nói hoặc đánh giá chất lượng đoạn viết từ ghi chú.
- Nếu chưa đạt, giữ buổi đó, luyện bằng bài mới và cập nhật ghi chú. Lịch sử giữ tối đa 40 lượt checkpoint mỗi buổi (nguồn, số liệu, lỗi/cách sửa); bản nháp hiện tại giữ bằng chứng đầy đủ.
- Mock Nói/Viết cần ghi nguồn phản hồi người chấm có kinh nghiệm theo tiêu chí. Tự chấm/AI được lưu tham khảo và ở trạng thái chờ phản hồi.
- Mốc raw score là ngưỡng luyện, không phải bảng đổi band chính xác cho mọi đề. Mock B dùng band theo bảng đề và người chấm, overall ≥6.5, mỗi kỹ năng ≥6.0, cùng ba checkpoint Mock A đã đạt. Đây là chỉ dấu luyện tập, không chứng nhận điểm thi thật.
- Tab **Mục tiêu & nguồn → Xuất tiến độ và ghi chú JSON** để lưu một bản sao trên máy. Bản này chưa có giao diện nhập/khôi phục JSON.

## Phạm vi thay đổi và xác minh

Thêm ba script `ielts-plan.js`, `ielts-core.js`, `ielts-roadmap.js` và stylesheet riêng, nạp từ index và service worker. Dữ liệu tiến độ nằm trong khóa settings `vm-ielts-roadmap-v1`; không đổi schema IndexedDB, không tự ghi điểm/hoàn thành Study4, không tăng lượt SRS hay sửa thời khóa biểu.

169 kiểm tra tự động qua: dữ liệu 32 buổi, checkpoint/khung thời gian, nhập số sai, minh chứng, phân biệt AI/người chấm, làm tròn overall, yêu cầu hai mock mới, giữ lịch sử và trộn tiến độ từng buổi, nguồn link hợp lệ, không ghi dữ liệu ôn thẻ. Kiểm tra giao diện ở origin QA riêng: bản nháp/checkpoint còn sau tải lại, đề xuất buổi chưa đạt, lượt chưa đạt→đạt giữ lịch sử, mở biểu mẫu thêm cụm và khung nhúng hẹp 420px không tràn ngang. Dữ liệu QA không chép sang app thật.

Hướng dẫn đầy đủ và nguồn chính thức: [IELTS_6.5_ROADMAP.md](IELTS_6.5_ROADMAP.md).
