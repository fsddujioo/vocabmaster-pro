# Study4 × VocabMaster — cài đặt và sử dụng

Tiện ích: **VocabMaster Study4**. Mã nguồn nằm trong thư mục `study4-extension` của app, dùng đúng kho thẻ local và lịch ôn hiện có của VocabMaster. Chưa cần API key AI.

## Bản cập nhật 1.2 — thêm cụm và sửa lưu lỗi

Trong **Lưu từ & lỗi → + Thêm từ**, nhập từ rồi bấm **Chọn bộ flashcard & tạo cụm**. Biểu mẫu cho chọn bộ đã có hoặc **+ Tạo bộ flashcard mới…**. Dùng **Gợi ý cụm với AI local** nếu muốn tạo cụm kèm nghĩa, loại cụm, ví dụ và bản dịch; xem lại rồi lưu. Có thể nhập thủ công khi Ollama chưa chạy.

Nút **Lấy lỗi bài đang mở** hỗ trợ các khung bài Study4, bao gồm Practice Zone. Khi trang tổng kết chưa hiện đáp án, tiện ích đọc liên kết trang chi tiết để lấy đáp án chuẩn. Các lỗi đọc dữ liệu được báo rõ. Sau khi chuyển một mục, biểu mẫu mở ngay trong bảng.

Khi lưu lỗi có đáp án viết được, mặc định tạo **flashcard đáp án chuẩn kèm lỗi cũ** và ghi vào sổ lỗi; có thể bỏ chọn tạo flashcard. Nếu chưa nhập nghĩa, app dùng nhãn/ngữ cảnh sửa lỗi và giữ câu trả lời cũ, không tự bịa bản dịch. Câu lựa chọn dùng sổ lỗi và chế độ giải thích.

Chi tiết kiểm tra và giới hạn: STUDY4_REPAIR_20261020.md.

## Dùng trong một cửa sổ — tiện ích 1.1

Mở Study4 như thường → bấm **✦ VocabMaster** ở góc dưới bên phải → **Kho & ôn tập**. Kho thẻ, hộp chờ, sổ lỗi, lịch học và các chế độ ôn nằm ngay trong bảng bên cạnh. Không cần mở cửa sổ VocabMaster riêng. Khi lưu từ/lỗi xong, tiện ích chuyển sang kho để duyệt tại chỗ.

Máy này đã có shortcut **VocabMaster Background** trong Startup của Windows. Mỗi lần đăng nhập Windows, nó khởi động server local ẩn, không mở cửa sổ app; nếu server đã chạy thì giữ nguyên. Lần cài hiện tại đã bật server sẵn. Nếu m tự tắt tiến trình nền, bấm icon Desktop một lần để bật lại. Không cần mở Ollama khi chỉ học thẻ; các công cụ AI vẫn cần Ollama.

Chrome yêu cầu thao tác người dùng để mở bảng bên cạnh, vì vậy bấm nút VocabMaster một lần khi muốn mở bảng. Nút có trên các trang Study4 ở cửa sổ thường của profile đã cài tiện ích. Có thể kéo rộng bảng bên cạnh để học thoải mái hơn.

Muốn ngừng chạy cùng Windows: mở `shell:startup` trong File Explorer và bỏ shortcut **VocabMaster Background**. Việc này không xóa dữ liệu học.

Bản 1.1 không thêm quyền website hoặc quyền tiện ích mới. App nhúng giữ origin localhost:8080. Theo [tài liệu Chrome](https://developer.chrome.com/docs/extensions/develop/concepts/storage-and-cookies), iframe do trang tiện ích nhúng với host permission phù hợp dùng được kho lưu trữ gốc của site, vì vậy không tạo bản sao dữ liệu riêng trong tiện ích.

## Cài một lần trong Chrome

1. Mở `chrome://extensions` trong Chrome m dùng để học Study4.
2. Bật **Chế độ dành cho nhà phát triển / Developer mode**.
3. Chọn **Tải tiện ích đã giải nén / Load unpacked**.
4. Chọn thư mục **C:\Users\Trank\Downloads\VocabMaster-Pro\study4-extension**.
5. Mở VocabMaster bằng icon Desktop → **Study4 → Kết nối tiện ích Chrome**.
6. Tải lại các tab Study4 đã mở để hiện nút lưu lỗi.

Mở Study4 và VocabMaster trong cùng profile Chrome đã cài tiện ích. Mỗi profile có kho thẻ riêng; nếu thấy bộ thẻ khác, kiểm tra profile và địa chỉ `http://localhost:8080` trước khi nhập thêm dữ liệu.

Tiện ích chỉ có quyền với Study4 và app tại localhost:8080; có context menu, bảng bên cạnh và lưu hàng chờ trên máy. Không yêu cầu quyền tất cả website, không đổi điểm hoặc tự nộp bài Study4. App và tiện ích nhận nhau bằng mã kết nối riêng, không nhúng mã đó vào đường dẫn hoặc gói ZIP.

## Lưu từ và câu

Trên Study4, bôi đen nội dung → chuột phải → **Lưu vào VocabMaster**. Hoặc dùng **Alt+Shift+V**. Kiểm tra từ/cụm, câu ngữ cảnh và ghi chú trong bảng bên cạnh, rồi chuyển vào hộp chờ.

Trong bảng bên cạnh → **Kho & ôn tập → Study4 → Hộp chờ → Xem lại & lưu**. Thêm nghĩa theo ngữ cảnh và chọn học phần. Nếu đã có cùng từ và nghĩa, app bổ sung nguồn thay vì ghi đè lịch ôn. Nếu khác nghĩa, giữ thành thẻ riêng. Cửa sổ app riêng vẫn dùng được khi muốn học toàn màn hình.

## Lưu lỗi từ trang kết quả

Trên trang kết quả bài IELTS có bảng đáp án, dùng **Chọn lỗi để lưu** hoặc **+ Lưu lỗi** cạnh từng câu. Chọn các mục muốn giữ trong bảng bên cạnh → chuyển vào hộp chờ. App lưu đáp án đã gõ, đáp án nguồn, tên bài, số câu, loại câu hỏi khi đọc được và link chi tiết.

Trong app, xem lại đáp án, bổ sung câu hỏi/ngữ cảnh, bằng chứng, nguyên nhân và cách sửa. Nguyên nhân mặc định là **Chưa phân loại**; app không tự kết luận vì sao m làm sai. Câu dạng A/B/C hoặc True/False/Not Given dùng chế độ giải thích, không tự biến chữ cái đáp án thành một từ vựng.

## Luyện và sổ lỗi

- **Sổ lỗi:** tìm từ/bài, lọc nguyên nhân, bổ sung bằng chứng và cách sửa, mở lại nguồn.
- **Luyện chính tả:** sửa câu đã gõ hoặc nghe rồi viết, chỉ rõ ký tự thiếu/thừa/sai. Chỉ nhận những đáp án đã xác nhận; không cho qua lỗi gõ. Giữ các biến thể như stabilise/stabilize từ nguồn.
- **Câu suy luận:** tự viết cách giải/bằng chứng rồi đối chiếu ghi chú, tự đánh giá đã hiểu hoặc cần xem lại. Đây không phải chấm suy luận bằng AI.
- Mỗi lượt luyện được ghi một lần, cùng lịch ôn. Nếu có thẻ liên kết phù hợp, lịch thẻ cũng cập nhật trong cùng giao dịch.
- Có xuất sổ lỗi JSON. Bản sao lưu đầy đủ ở Studio chứa sổ lỗi trong settings. Khi nhập bản sao đầy đủ, chức năng cũ ưu tiên bộ thẻ/nhật ký và giữ settings trên máy; giữ file sổ lỗi xuất riêng khi chuyển máy. Phiên bản này chưa có nhập sổ lỗi JSON riêng.

## Khi app chưa mở

Server local thường đã chạy nền nên có thể đóng cửa sổ app riêng. Nếu server bị tắt, những mục đã bấm lưu được giữ trong hàng chờ tiện ích. Bật lại bằng icon Desktop rồi chọn **Chuyển lại hàng chờ**. Hộp chờ server nằm trên máy, tồn tại qua lần khởi động lại. Chỉ xác nhận xóa mục khỏi hộp chờ sau khi đã lưu IndexedDB thành công.

## Giới hạn

Bản đầu hỗ trợ chọn chữ trên Study4, kể cả bài nhúng cùng site, và bảng đáp án kết quả IELTS đã kiểm tra. Giao diện Study4 thay đổi có thể cần sửa bộ đọc. Câu ngữ cảnh lấy được tùy vị trí chọn; có thể cần bổ sung thủ công. Chưa tự trích toàn bộ passage, cắt audio/video, tự phân loại nguyên nhân hoặc đồng bộ tất cả tiến độ.

Kiểm tra chất lượng thẻ và phiên âm cũ trước khi ôn. Gói ZIP chỉ chứa mã nguồn; không chứa mã kết nối, hộp chờ hoặc dữ liệu học trong trình duyệt.
