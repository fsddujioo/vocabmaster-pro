# Chấm Writing/Speaking bằng model bên ngoài — 5.8

App chọn bài Study4, hướng dẫn, lưu bản gốc và đối chiếu checkpoint. Người học chọn model mạnh để chấm bên ngoài rồi nhập phiếu trở lại. Không cần API key hoặc tài khoản model trong app. Không tự gửi bài ra cloud.

## Cách dùng

1. Lộ trình 6.5 → Học từng bước → buổi Writing/Speaking. Hoàn tất chuẩn bị, tự làm bài trước.
2. Ở bước tự làm/chữa/phần mới, bấm **Xuất prompt chấm W/S**. Dán đề/câu hỏi thật và bài gốc, ghi nguồn. Chọn Bài gốc/Bản tự sửa/Bài mới. Với Speaking, ghi tên bản thu và xác nhận sẽ đính kèm audio.
3. Bấm **Lưu bản gốc và tạo prompt**. Copy prompt hoặc tải TXT, dán vào model mình chọn. Tự đính kèm file audio/hình gốc nếu bài cần; tên file trong prompt không thay việc gửi file.
4. Model trả một JSON theo mẫu có requestId, lessonId, stepId, skill, bốn tiêu chí, verdict, tối đa ba lỗi ưu tiên và bài tự sửa. Không yêu cầu band từ bài ngắn.
5. Bấm **Nhập phản hồi JSON**, dán đúng JSON và xác nhận đã gửi dữ liệu đúng. App kiểm cấu trúc, ID, phiên bản gốc, chứng cứ trích dẫn/mốc audio và nguồn đánh giá.
6. Nếu needs_revision/insufficient_evidence: tự sửa hoặc bổ sung dữ liệu, xuất prompt mới cho bản đó rồi chấm lại. Không chép nguyên bản AI viết hộ.
7. Nếu phiếu mới nhất meets_practice_target, đúng phiên bản và đủ dữ liệu: hoàn tất sản phẩm/phần mới của buổi; mở **Đối chiếu phiếu chấm và bài làm lại**, chọn nguồn Model bên ngoài, ghi nguồn/việc đã sửa, tự đối chiếu checklist. Phiếu nhập không tự tick xong mọi bước.

## Những điều app kiểm được

- Mã bài, mã phiên xuất, kỹ năng và bản văn gốc còn khớp. Sửa bài trong app sau khi xuất thì cần xuất lại.
- Đúng bốn key: W TA_TR/CC/LR/GRA; S FC/LR/GRA/P.
- Chứng cứ là câu/cụm có trong văn bản hoặc mốc audio cụ thể. App kiểm khớp chuỗi/mốc, không tự kiểm sự đúng đắn của nhận xét.
- Speaking text_only phải để P=not_assessable; chưa dùng để xác nhận checkpoint Speaking đầy đủ. Audio cần được gửi và xử lý thật ở model ngoài; app lưu xác nhận người học, không tự kiểm chứng model đã nghe.
- Phiếu mới còn cần sửa không bị che bởi một phiếu cũ từng đạt.

Đây là mốc luyện dựa trên dữ liệu/nhận xét nhập, không phải xác nhận band thi thật. Mock A/B trong khung cũ vẫn dùng nguồn người chấm theo cấu hình cũ; luồng chấm ngoài mới áp dụng chặng học từng bước.

## Dữ liệu

Bản gốc, phiên xuất và phản hồi lưu trong IndexedDB trên máy cùng tiến độ học từng bước, có trong bản xuất JSON. Không đưa bài/recording/tiến độ hay thông tin ghép nối vào GitHub. Bộ 100 cụm vẫn tùy chọn; AI local giữ cho các tính năng đã có và gợi ý L/R, không là nguồn chấm chính W/S.

## Phạm vi

Tám buổi đầu có chỉ dẫn từng bước, kế hoạch 5 buổi/tuần và aim hè 2027. Khung 32 buổi là tham khảo dài hạn. Chưa tự đồng bộ toàn bộ lịch sử Study4, tự đọc thời khóa biểu NEU/DATAAAA hay tạo báo cáo tuần/tháng tự động.
