# Bản sửa ngày 20/10/2026 — VocabMaster 5.3, tiện ích 1.2.0

Đã cập nhật trực tiếp thư mục app đang dùng và người dùng đã tải lại tiện ích. Không đổi origin localhost:8080, ID tiện ích, quyền website hoặc phiên bản cơ sở dữ liệu.

## Thêm từ và học theo cụm

Trong bảng tiện ích: **Lưu từ & lỗi → + Thêm từ**. Nhập từ hoặc lấy từ đang bôi đen, rồi bấm **Chọn bộ flashcard & tạo cụm**. Biểu mẫu mở ngay trong bảng bên cạnh, có danh sách bộ đã có và **+ Tạo bộ flashcard mới…**.

Trong biểu mẫu, dùng **Gợi ý cụm với AI local** để lấy bản nháp gồm cụm, loại cụm, nghĩa tiếng Việt, ví dụ, bản dịch ví dụ và lưu ý. Chọn một cụm, sửa nếu cần, chọn bộ và lưu. Có thể nhập thủ công nếu không dùng AI. Từ gốc, ví dụ và ngữ cảnh nguồn được giữ; câu ví dụ được dùng cho chế độ điền khuyết hiện có. Chưa có tự chấm câu nói/bài luận mở.

Đã thử Ollama gemma3:4b thật với `decision`, chọn `reach a decision`, sửa nghĩa tiếng Việt và lưu thành thẻ trong bộ mới ở môi trường thử riêng. AI có thể trả ít hơn ba gợi ý, dùng từ chưa sát ngữ cảnh hoặc dịch chưa tự nhiên; cần duyệt. Bộ kiểm tra chặn cụm không chứa từ gốc, ví dụ không dùng đúng cụm và loại cụm sai cấu trúc. Nếu bản nháp đầu không đạt kiểm tra, server thử lại một lần; vẫn không đạt thì báo rõ và giữ lựa chọn nhập thủ công.

## Lỗi Lưu lỗi đã sửa

Đúng bài người dùng chỉ: **PRACTICE ZONE → IELTS Collection 1 Listening Test 1 → Recording 1**, kết quả 39027204. Trước đó nút xuất hiện cạnh câu sai/bỏ trống nhưng trang tổng kết không có `.text-answerkey`. Bộ đọc cũ không tìm ra đáp án và trả về rỗng; thao tác bấm dừng im lặng.

Bản mới đọc liên kết **Xem chi tiết đáp án**, lấy đáp án chuẩn cho đúng số câu, giữ nguyên câu trả lời cũ/bỏ trống, số câu, nguồn và trích đoạn chứa đáp án nếu có. Không đoán đáp án còn thiếu. Có báo đang lấy, thành công hoặc lỗi ngay trên trang và trong bảng tiện ích.

Đã xác minh trực tiếp: câu 4 có đáp án **radio**, câu cũ **e ed ed ed**. Người dùng đã xác nhận biểu mẫu trong bảng Chrome hiện đủ hai phần và có lựa chọn bộ flashcard. Ở môi trường thử đã lưu cả flashcard và sổ lỗi trong một giao dịch; danh sách thẻ hiện “Lần trước: e ed ed ed”. Không tự nộp hay hoàn thành bài Study4, không thay đổi điểm bài làm.

Với đáp án viết được, mặc định có tùy chọn **Lưu thêm flashcard đáp án chuẩn, kèm lỗi cũ**. Có thể bỏ chọn để chỉ giữ sổ lỗi. Khi chưa nhập nghĩa, thẻ dùng nhãn/ngữ cảnh sửa lỗi, không gán bản dịch tự bịa. Câu lựa chọn A/B/C, TRUE/FALSE… dùng sổ lỗi và chế độ giải thích.

## Các lỗi liên quan được tìm và sửa

- Bản nháp lỗi cũ không có ID riêng; lưu nhiều mục khiến hàng chờ có thể chỉ giữ một mục. Nay mỗi mục có ID và có kiểm tra xác nhận đầy đủ trước khi bỏ khỏi hàng chờ.
- Nút lấy lỗi trong panel chỉ hỏi frame 0. Nay thu từ các khung Study4 đã đăng ký và loại trùng kết quả; nhận được bài lồng trong Practice Zone.
- Trang chi tiết trước đó không có nút lưu cạnh đáp án sai. Nay hỗ trợ cả tổng kết lẫn trang chi tiết.
- Lưu đáp án nhưng thiếu nghĩa trước đó chỉ tạo mục sổ lỗi, dễ khiến người dùng tưởng mất flashcard. Nay có lựa chọn tạo thẻ sửa lỗi rõ ràng, giữ đáp án và lỗi cũ.
- Chọn bộ chưa có lựa chọn tạo mới; việc gộp thẻ có thể bỏ qua bộ người dùng đã chọn. Nay tôn trọng bộ được chọn và kiểm tra bộ đã xóa/tên bộ trùng.
- Bảng kho đôi khi chưa kịp tải để nhận thông báo mở bản nháp. Nay có thông báo sẵn sàng và xác nhận mở đúng mục; không ngắt biểu mẫu/phiên luyện đang làm.
- Giữ SRS, ghi chú và lịch sử của thẻ đã có khi gộp nguồn/lỗi; dùng khóa ghi giữa các luồng Study4 khi trình duyệt hỗ trợ Web Locks.
- Khi đóng biểu mẫu, yêu cầu AI đang chạy được hủy. Không tự lưu bản nháp AI.
- Dạng đáp án `66/sixty-six Lake` được giữ thành `66 Lake` và `sixty-six Lake`, thay vì chấp nhận nhầm `66` đứng riêng. Quy tắc này dành cho dạng số kèm hậu tố chung; không khẳng định xử lý mọi ký hiệu đáp án rút gọn trên site.

## Kiểm tra

**188 kiểm tra tự động đều qua trên mã bản sửa:**

- 57 kiểm tra bộ đọc từ HTML thật tối thiểu của bài bị lỗi; câu sai/bỏ trống; đáp án chuẩn và bằng chứng; thu khung nhúng; lưu 10 mục với ID khác nhau; giữ hàng chờ khi offline; flashcard + sổ lỗi; tạo/chọn bộ; giữ lịch ôn và kiểm tra cấu trúc cụm AI.
- 54 kiểm tra API, nguồn hợp lệ, ghép nối, xác thực, giới hạn đọc, ghi bền vững, chống trùng và chấm chính tả.
- 19 kiểm tra bảng nhúng, chuyển tab, phản hồi khi offline, thử lại và giữ nguyên quyền.
- 58 kiểm tra hồi quy SRS, nhập CSV/TSV, giữ lịch sử, giao dịch dữ liệu, hoàn tác và chặn ghi lượt trùng.

Toàn bộ JavaScript thay đổi đã qua kiểm tra cú pháp. Môi trường thử dùng cổng 8088; dữ liệu QA không được chép sang app thật. Đã khởi động lại server thật ở 8080 và xác minh health trả phiên bản 5.3.

Đã kiểm tra nút lưu câu 4 trên trang thật; thao tác chuyển và biểu mẫu của Chrome side panel được người dùng xác nhận vì công cụ không điều khiển được phần bảng Chrome. Kiểm tra lưu hàng loạt 10 mục và chuyển khung dùng HTML thật/bộ giả lập API extension; chưa tự động bấm lưu hàng loạt trên dữ liệu thật. Không khẳng định đã kiểm tra mọi kiểu bài trên Study4.

Ảnh `study4-repair/error-card-qa.png` và `phrase-card-qa.png` là kiểm tra ở môi trường thử. Gói mã nguồn không chứa token, hộp chờ hoặc các mẫu HTML đề thi dùng kiểm tra.
