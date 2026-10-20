# Learning Engine & Study4 catalog — 5.9

Người học xác nhận bắt đầu Study4 từ đầu. Baseline tự báo: Listening 4.0–4.5, Reading 5.0, Writing 4.5, Speaking 5.0. Mục tiêu overall 6.5, mỗi kỹ năng ít nhất 6.0; 5 buổi/tuần, mỗi buổi 90–120 phút, hướng tới hè 2027. Không nhập các lần thử tiện ích hoặc tỷ lệ hoàn thành trên website thành tiến độ học thật. Không xóa dữ liệu cũ để giả lập bắt đầu mới.

## Cách dùng

1. Mở **Lộ trình 6.5 → Học từng bước**. Xem “Hôm nay học gì?”, bấm mở gợi ý rồi **Bắt đầu buổi hôm nay**. Mở trang đơn thuần không tính là học.
2. Làm đúng bước đang mở. Lưu sản phẩm, nguồn/phạm vi, điểm lượt đầu và nguyên nhân sai. Chưa làm xong thì lưu và tiếp tục lần sau, không chạy quá 120 phút.
3. L/R cần hai nhóm mới liên tiếp đạt ít nhất 4/5. W/S giữ luồng xuất prompt → model ngoài → nhập JSON → tự sửa và làm phần mới → checkpoint. Đây là mục tiêu luyện, không phải chấm band chính thức.
4. App chọn tiếp dựa trên bước đang dở, mốc nền, lượt bắt đầu/checkpoint gần đây, lỗi chẩn đoán và lịch ôn. Có thể đổi sang kỹ năng khác. Nút đổi bài khóa các phụ thuộc thực sự cần thiết; không bắt học toàn bộ video trước.
5. Kiểm lại sau 7 ngày, sau đó 14 ngày kể từ lượt kiểm lại đạt đầu tiên, rồi 30 và 60 ngày. Dùng phần mới. W/S kiểm lại vẫn cần nguồn phản hồi; transcript không đủ để xác nhận phát âm.

## Phạm vi chọn bài

- 8 buổi đầu viết chi tiết và 66 buổi/subskill mở rộng có bài lý thuyết Study4 cụ thể, quy trình tự làm–học–chữa–phần mới–chốt. Các nhánh Reading/Listening dạng câu hỏi, Writing Task 1/2 và Speaking Part 1/2/3 được ánh xạ bằng mã bài đã đối chiếu.
- Bộ chọn là **code xác định được**, không gọi LLM để tự quyết định mastery, không gửi lịch sử ra cloud. Lỗi từ vựng ưu tiên paraphrase/Lexical; lỗi vị trí ưu tiên scanning/keywords/signposting; lỗi câu/ý ưu tiên lập luận/TR/CC nếu đủ nền.
- Quy tắc cân bằng dùng lịch sử buổi bắt đầu và checkpoint thực sự, không dùng các trang vừa mở như thành tích. Ba lần kiểm tra chưa đạt cần đổi cách chữa trước khi thử tiếp.
- Với L/R, Practice Zone là bộ chọn đề bên trong Study4: người học vẫn chọn đúng dạng và ghi phạm vi 5 câu mới theo hướng dẫn. App chưa xác minh toàn bộ ngân hàng câu hỏi nhúng, không tự nộp bài, không tự biết một câu đã lộ đáp án ngoài app. W/S chọn đề thực tế từ khóa và giữ đề/hình/audio để gửi model ngoài.
- 74 là số buổi/subskill có thể chọn, không phải lịch cứng 74 ngày hay số buổi bảo đảm lên band. Khung mock ở “Tổng quan 32 buổi” vẫn là phần tham chiếu; engine không tự suy ra đủ điều kiện thi từ việc học hết danh sách.

## Danh mục khóa học

Đọc trực tiếp tài khoản đã đăng nhập ngày 20/10/2026, duyệt hết 105 trang danh mục nhóm bài (kể cả phân trang): **5 khóa, 29 nhóm, 6.428 hoạt động duy nhất**.

| Khóa | Hoạt động |
|---|---:|
| IELTS Intensive Listening | 1.533 |
| IELTS Intensive Reading | 3.169 |
| IELTS Intensive Speaking | 1.265 |
| IELTS Intensive Writing | 259 |
| Luyện nghe nói cùng TED Talks | 202 |

Các mục gồm video, lý thuyết, bài mẫu, dictation, từ vựng và hoạt động luyện. Không phải 6.428 video, cũng không phải ngân hàng mọi câu hỏi nhúng trong Practice Zone. Chỉ lưu tên, nhóm, URL và ID; không sao chép nội dung khóa/video, không xuất danh tính hay cookie tài khoản. TED được tìm kiếm trong kho, không ép vào lịch IELTS.

**Thời lượng:** danh mục không công bố đầy đủ độ dài video. Snapshot ban đầu có `durationSeconds: null`. Tiện ích cập nhật khi HTML media hoặc iframe YouTube đang mở gửi metadata thời lượng hợp lệ. Chỉ nhận thông điệp từ đúng iframe nhúng có sẵn và origin YouTube đã kiểm tra; không xin quyền truy cập YouTube mới. Video chưa phát/cấp metadata có thể vẫn chưa có thời lượng. UI hiển thị số mục có metadata và không lấy “30 phút bài thi” trong nội dung làm độ dài bài giảng. Phút của kế hoạch là ngân sách học dự kiến, tách biệt với độ dài media.

## Đồng bộ bằng tiện ích 1.3

Sau khi cập nhật file tiện ích, tải lại **VocabMaster Study4** ở `chrome://extensions`, rồi F5 trang Study4. Quyền vẫn là Study4 và localhost như trước.

- Tại app: mở Danh mục Study4 → Đồng bộ lại từ Study4. Hoặc panel → Lưu từ & lỗi → Đồng bộ các khóa Study4.
- Bắt đầu từ trang khóa đã kích hoạt, đọc tuần tự các trang khóa/nhóm/phân trang cùng origin, giới hạn 250 trang, có nút dừng. Không crawl nội dung từng hoạt động, không truy cập cài đặt tài khoản hay endpoint nộp bài. Mất quyền/hết phiên/mạng lỗi được ghi là chưa đầy đủ.
- Sau đồng bộ, bấm **Nhận dữ liệu vừa đồng bộ**. Khi app tắt, metadata được giữ trong outbox Chrome; bấm **Chuyển lại danh mục** khi phần chạy nền hoạt động lại. Chỉ bỏ gói sau phản hồi máy chủ thành công.
- Khi mở bài/kết quả đã chấm, thu metadata và điểm đúng/tổng nếu các dòng kết quả đầy đủ. Quan sát không tự cộng mastery. Có thể đưa kết quả vào nháp bước hiện tại; app không đổi điểm /10 thành /5, không tự tick “phần mới”.
- Cầu nối yêu cầu token tiện ích đã ghép nối cho ghi danh mục; chỉ app localhost đọc được. Dữ liệu tài khoản/quan sát mới ở `.study4-private/bridge.json`, không đưa lên GitHub. Thẻ, DB và SRS giữ nguyên.

## Kiểm tra

`npm test` kiểm tra lựa chọn cho người mới, phụ thuộc/nhánh, hạn mức buổi, lịch ôn, nguồn bài/budget, parser danh mục, chưa biết thời lượng, ghép nối/quyền API, dữ liệu trùng, outbox và luồng checkpoint/ngoại chấm hiện có. Dùng origin QA riêng, không nhập kết quả thử vào hồ sơ thật.

Kiểm tra trực tiếp sau khi người dùng tải lại tiện ích: đọc **111 trang** (trang tài khoản + 5 trang khóa + 105 trang nhóm/phân trang), nhận **6.462 mục** = 5 khóa + 29 nhóm + 6.428 hoạt động; không có lỗi truy cập. App thật vẫn 0/74 checkpoint và 0/5 buổi bắt đầu. Mở thử một bài chỉ tạo quan sát, không tăng tiến độ. Tại thời điểm kiểm tra, chưa thu được thời lượng video; không tuyên bố đã có thời lượng cho mọi bài. Khung thử 420px không tràn ngang.
