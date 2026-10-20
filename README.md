# Cập nhật 5.9 — chọn bài & kho Study4

Learning Engine chọn trong 74 buổi/subskill theo checkpoint, lỗi và lịch học. Hồ sơ bắt đầu Study4 từ đầu; giữ baseline tự báo. Kho đã đọc đủ 5 khóa, 6.428 hoạt động; thời lượng chưa có metadata được ghi rõ. Xem [hướng dẫn và giới hạn thực tế](STUDY4_LEARNING_ENGINE.md). Tiện ích 1.3 giữ nguyên quyền truy cập; cần tải lại một lần.

# VocabMaster Pro

Flashcard/SRS, luyện IELTS và tiện ích Study4. App chạy trên máy, nguồn học IELTS chính là các khóa Study4 người học có quyền truy cập.

## Chạy app

Cần Node.js 20 trở lên. Mở thư mục dự án và chạy:

```sh
node server.cjs
```

Mở **http://localhost:8080**. Windows có thể dùng `start_app.bat` hoặc `launch_app.vbs`; `start_background.vbs` chỉ chạy server nền. Giữ cùng origin để dùng lại dữ liệu IndexedDB. Không mở thẳng index.html nếu muốn AI bridge/tích hợp Study4 đầy đủ.

## Các phần chính

- Flashcard, cloze, audio, gắn sao, ôn cách quãng và các chế độ luyện/quiz.
- Tiện ích Study4: lấy từ/cụm và lỗi bài làm, giữ đáp án chuẩn cùng đáp án cũ, chọn/tạo bộ thẻ và học trong bảng bên cạnh. Xem [STUDY4_SETUP.md](STUDY4_SETUP.md).
- **Lộ trình 6.5 → Học từng bước**: tám buổi đầu có bài Study4, bước đang làm, sản phẩm cần nộp, chữa lỗi và điều kiện chuyển tiếp. L/R cần hai phần mới liên tiếp đạt mốc luyện, kiểm lại sau bảy ngày; W/S cần phản hồi và bản tự sửa/bài mới. Khung 32 buổi vẫn là tham khảo dài hạn.
- **W/S chấm bên ngoài**: app xuất prompt kèm đề/bài gốc và mã phiên; người học gửi cho model mình chọn, nhập JSON về, tự sửa/chấm lại rồi đối chiếu checkpoint. Không cần nhập API key trong app. Xem [hướng dẫn chấm ngoài](STUDY4_EXTERNAL_GRADING.md).
- Kho 100 cụm/5 nhóm ngữ pháp là tài nguyên tùy chọn, không bắt chạy thêm ngoài bài Study4.

Đối chiếu số liệu và checklist không xác minh độc lập khả năng ngôn ngữ hoặc band IELTS. App không tự đánh dấu khóa Study4 hoàn thành, chưa đồng bộ toàn bộ lịch sử học và không tự thay lịch đại học.

## Tiện ích Chrome

Load unpacked thư mục `study4-extension` trong chế độ Developer mode. Tiện ích chỉ xin các quyền cần cho Study4 và app loopback; xem manifest để kiểm tra phạm vi. Việc tải lại tiện ích do người dùng thực hiện trong Chrome.

## AI local và tài liệu

Các tính năng gợi ý cụm/tạo thẻ/giải thích local dùng Ollama tại 127.0.0.1:11434, mặc định gemma3:4b đã tải trên máy; bridge từ chối model cloud. W/S theo mặc định dùng luồng model ngoài do người học chủ động copy/paste. File audio không được gửi chỉ bằng việc ghi tên file.

Đọc DOCX/PDF cần Python; bản đóng gói có pypdf trong `vendor/pypdf.zip` cùng giấy phép ở `licenses/LICENSE` bên trong. Các chức năng khác không cần Python.

## Kiểm tra

```sh
npm test
```

Các kiểm tra dùng Node built-ins và dữ liệu giả trong bộ nhớ, không ghi vào dữ liệu học thật. Chúng kiểm logic/lưu dữ liệu, không chứng minh hiệu quả tăng band.

## Dữ liệu và quyền riêng tư

Tiến độ học, thẻ, bản bài gốc/phiếu phản hồi ở IndexedDB của trình duyệt. Thông tin ghép nối bridge trong `.study4-private/` phải giữ riêng. Không commit thư mục đó, bản thu, bản xuất tiến độ, cookie/token, logs hoặc bản sao dữ liệu. App không tự gửi bài ra model ngoài.

Hướng dẫn và bài nền tự biên soạn có ghi nguồn; nội dung khóa Study4 mở trên tài khoản hợp lệ, không phân phối lại video/audio/passages của khóa trong repo.
