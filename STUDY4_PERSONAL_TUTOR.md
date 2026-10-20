# Cập nhật 5.8 — model ngoài chấm W/S

Chấm W/S hiện dùng xuất prompt → nhập JSON → tự sửa/chấm lại → checkpoint. Xem [STUDY4_EXTERNAL_GRADING.md](STUDY4_EXTERNAL_GRADING.md). Các phần dưới mô tả chặng học và nguồn; người chữa có thể là model bên ngoài với phiếu hợp lệ hoặc giáo viên. Không tự dùng phản hồi local để xác nhận W/S.

# Study4 — gia sư cá nhân từng bước

Bản 5.7 · 20/10/2026. Áp dụng quy trình từ bản người học gửi, đã chỉnh theo thông tin người học xác nhận.

## Cách mở

VocabMaster → Lộ trình 6.5 → **Học từng bước** (mặc định). Trong bảng Study4: lưu nháp rồi đóng/mở Kho & ôn tập để tải bản mới. Không cần tải lại extension.

## Hồ sơ và nhịp học

Overall ≥6.5 · mỗi kỹ năng ≥6.0. Hè 2027 (tháng 6–8), chưa có ngày thi cụ thể.

5 buổi/tuần, mỗi buổi 90–120 phút. Hai ngày nghỉ linh hoạt, chưa chọn thứ cố định. Tuần thi NEU: giảm/hoãn bài dài, giữ ôn ngắn khi có sức; dời nhiệm vụ, không tích nợ và không học bù dồn.

Baseline tự báo: L ≈4.0–4.5, R ≈5.0, W ≈4.5, S ≈5.0. Tài liệu gửi có W5.0, nhưng chưa có xác nhận thay đổi nên giữ mốc W4.5 trước đó; không tự tính overall hiện tại từ điểm ước lượng.

Chu kỳ tham khảo:

1. Listening: chẩn đoán lỗi hoặc sửa micro-skill
2. Reading: chứng cứ và paraphrase
3. Writing: ý → đoạn → tự sửa
4. Listening: tự làm bài mới và kiểm tra lại
5. Speaking: ghi âm và sửa; mỗi hai tuần dùng một phiên để nhận chữa S/W

Bài đang làm chưa xong thì dời sang phiên tiếp; ngày nhận chữa S/W thay phiên học mới, không cộng ngoài quỹ. Không chỉnh thời khóa biểu NEU hoặc DATAAAA.

## Chu trình đã áp dụng

Chẩn đoán ngắn → học đúng điểm vướng → chữa có hướng dẫn → tự làm phần mới → phản hồi → sửa nguyên nhân → kiểm tra mốc luyện → tiến lên → kiểm lại sau bảy ngày.

- Chỉ một bước hiện tại được giao để làm. Bước sau trong cùng buổi mở khi đã có sản phẩm/checklist cần thiết; các kỹ năng khác vẫn mở.
- Listening/Reading: hai nhóm mới liên tiếp, mặc định mỗi nhóm 5 câu/mục và ≥4/5. Nếu lượt sau không đạt, chuỗi bắt đầu lại với phần mới; lịch sử cũ giữ nguyên. Ngưỡng này là ngưỡng luyện nhỏ, không quy band.
- Sau ba lượt thực sự dưới mốc: cần ghi lại nguyên nhân và cách luyện khác trước khi thử tiếp. Không tính việc thiếu trường nhập là bằng chứng học kém.
- Speaking/Writing: sản phẩm tự tạo → phản hồi người có kinh nghiệm được ghi nguồn → bản làm lại/bài mới. Trước đó hiển thị chờ phản hồi, không gọi tick đủ bước là thành thạo.
- MASTERED trong hệ thống là đạt mốc luyện theo bằng chứng người học nhập, không phải xác minh độc lập hay band chính thức. Đến hạn sau bảy ngày hiện REVIEW_DUE; tự kiểm lại bằng phần mới.
- Thẻ đến hạn được đếm từ SRS hiện có. Lấy cụm và lỗi ngữ pháp từ bài Study4 vừa học; bộ 100 cụm cũ giữ ở mục tùy chọn. Không thêm thẻ hoặc ghi lượt ôn tự động.

## AI local

Mỗi bước có mục Nhờ Ollama gợi ý chữa phần đã tự làm. Chỉ gửi văn bản người học chủ động cung cấp đến Ollama trên máy qua bridge đã có. AI đưa điểm đã làm tốt, nhận xét theo tiêu chí phù hợp, tối đa ba ưu tiên và bài sửa nhỏ. Không viết hộ toàn essay, không có trường band hoặc quyết định mastery trong kết quả API. Trích dẫn không khớp phần cung cấp bị đánh dấu chưa đối chiếu.

AI không mở link Study4, đọc file chỉ từ tên, nghe audio, xác nhận phát âm hoặc đánh giá lưu loát từ transcript. Gemma3:4b có thể nhận xét sai; đối chiếu với Study4 và người chữa. Phản hồi AI lưu riêng cùng bước, không tự mở khóa checkpoint.

## Kế hoạch các chặng

### 0 · Phân tích đầu vào

Chặng đầu

Dùng điểm/bài cũ đang có, kiểm tra ngắn chỗ chưa rõ; có 3–5 lỗi ưu tiên, không yêu cầu full mock lại cả bốn kỹ năng.

### 1 · Sửa điểm vướng nền tảng

Gợi ý 10–11/2026; điều chỉnh theo bằng chứng

Các lỗi ưu tiên giảm trong bài mới; có sản phẩm Nói/Viết được chữa và làm lại. Chỉ sửa subskill đang vướng.

### 2 · Làm độc lập từng dạng

Gợi ý 12/2026–02/2027

L/R: hai phần mới liên tiếp đạt mốc luyện; Nói/Viết: sản phẩm tự tạo, phản hồi và bản sửa/bài mới. Xem hết video chưa đủ.

### 3 · Ghép kỹ năng và tính giờ

Gợi ý 03–05/2027

Làm part/passage rồi full test; mỗi 3–4 tuần xem xu hướng và lỗi lặp, không đổi lộ trình vì một buổi kém.

### 4 · Xác nhận sẵn sàng thi

Hè 2027, theo ngày thi thực tế

Nhiều bộ mock mới ổn định. Dùng mốc Mock A/B đã có; điểm AI chỉ tham khảo, không đảm bảo band vào ngày cố định.

## Tám buổi đầu đã có chỉ dẫn chi tiết

### 1. Nghe Part 1: tìm đúng chỗ mình bị hụt

L · nhận thông tin Part 1 · 115 phút

Mục tiêu: Biết hai nguyên nhân sai, sửa được chúng và thử 5 câu nghe chưa gặp. Mốc luyện cần hai nhóm mới liên tiếp đạt 4/5, không tính điểm nghe/đọc lại.

Lý do: Listening thấp nhất trong các mốc m tự báo, nên bắt đầu bằng một bài ngắn để xác định lỗi thật. Chưa gán sẵn nguyên nhân mất dấu hay thiếu từ vựng khi chưa thấy bài làm. Các buổi sau chọn theo sản phẩm và lỗi ghi nhận.

#### Bước 1. Mở đúng bài, giữ lượt đầu · 5 phút

[Listening · Luyện đề tổng hợp](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/)

1. Mở IELTS Collection 1 Listening Test 2 – Recording 1 (18963). Nếu đã biết đáp án, đổi sang Test 3 – Recording 1 (18967).
2. Chỉ mở phần câu hỏi; chưa xem đáp án, transcript hoặc mẫu. Ghi nguyên tên bộ/test/part và phạm vi câu ở ô bên dưới.
3. Audio 1x, một lượt trong bước tự làm. Mọi lượt replay ở bước chữa phải được ghi là luyện lại.

Nộp: Tên bài thực tế + phạm vi câu + xác nhận chưa biết đáp án.

- Đã chọn đúng bài và ghi mã/phạm vi câu.
- Chưa đọc đáp án hoặc mẫu của phần sẽ tự làm.

#### Bước 2. Tự nghe 10 câu một lượt · 15 phút



1. Đọc 10 câu trước audio, đánh dấu chỗ cần tên/số/danh từ. Không tra từ trong lượt này.
2. Nghe một lượt 1x, điền đủ sức mình rồi giữ nguyên. Sau đó mới chấm bằng đáp án Study4.
3. Ghi đúng /10 để chẩn đoán. Điểm thấp ở bước này vẫn được đi tiếp để chữa; không làm lại chỉ để tăng điểm.

Nộp: Mã bài + số đúng /10 + số câu chưa chắc + đáp án gốc ở hai câu đó.

- Đã giữ điểm/đáp án lượt đầu.
- Đã chấm sau khi nghe xong, không sửa đè lên bản gốc.
- Số đúng lượt đầu /10 · chỉ chẩn đoán · chỉ chẩn đoán

#### Bước 3. Học đúng một điểm cần sửa · 20 phút

[Listening · Numbers and letters](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19551/) · [Listening · Identifying paraphrase](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19549/)

1. Mở Numbers and letters, đọc phần hướng dẫn nhận dạng số/tên. Chỉ học phần liên quan hai câu m sai.
2. Nếu sai vì không hiểu nội dung, đọc phần paraphrase; nếu là chính tả/số nhiều, ghi đúng một mẫu gây nhầm.
3. Viết bằng lời mình thao tác sẽ làm ở lượt mới; chưa cần xem hết video.

Nộp: Hai nguyên nhân cụ thể và thao tác sẽ thử.

- Đã xác định được lỗi nghe âm, cụm, vị trí hoặc chính tả.
- Có thao tác sửa tương ứng từng lỗi.

#### Bước 4. Chữa hai lỗi cụ thể · 25 phút

[Listening · Luyện đề tổng hợp](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/)

1. Với mỗi câu, nghe đoạn 10–20 giây 2 lần không chữ → viết điều nghe được → mở transcript/giải thích Study4 → gạch chỗ khớp đáp án → đóng chữ và nghe lại. Ghi mốc audio/câu.
2. Chọn hai lỗi sai/khó nhất. Nếu không sai, chọn hai chỗ phải đoán. Mỗi lỗi ghi: đáp án/câu gốc → chỗ vướng → chứng cứ hoặc quy tắc → bản sửa.
3. Lấy tối đa 3 cụm hữu ích từ chính bài, giữ câu nguồn; đóng mẫu và dùng 2 cụm trong câu của m. Chỉ sửa một lỗi ngữ pháp đang lặp.
4. Chỉ thêm tối đa 5 cụm từ bài nếu cần; ưu tiên ôn thẻ đến hạn. Backlog cao thì giảm còn 0–3 cụm, không chạy số lượng.

Nộp: Hai cặp trước → sau sửa, lý do và 2 câu dùng cụm của bài.

- Có hai lỗi/chỗ khó và chứng cứ cụ thể.
- Có câu tự diễn đạt sau khi đóng mẫu, không chỉ chép đáp án.

#### Bước 5. Tự làm phần mới · lượt 1 · 20 phút

[Listening · Luyện đề tổng hợp](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/)

1. Dùng Test 3 – Recording 1 (18967), câu 1–5, nếu chưa dùng ở bước đầu. Nếu đã dùng thì chọn Test 2 – Recording 2 (18964), câu 1–5. Ghi đúng nguồn thực tế.
2. Chỉ đo đoạn chưa nghe/chưa biết đáp án. Nghe 1x một lượt, chấm sau khi xong; cần ít nhất 4/5.
3. Nếu dưới 4/5: giữ bước này, chữa một nguyên nhân chính rồi lấy 5 câu/mục khác chưa gặp. Không dùng điểm nghe lại làm điểm chuyển tiếp.

Nộp: Mã bài/phạm vi mới, số đúng /5 và chứng cứ cho câu sai/khó.

- Đã dùng 5 câu của đoạn chưa nghe, chấm lượt đầu.
- Có chứng cứ hoặc mốc audio cho một câu khó.
- Số đúng trong 5 mục/câu mới · mốc ≥4/5

#### Bước 6. Tự làm phần mới · lượt 2 · 20 phút

[Listening · Luyện đề tổng hợp](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/)

1. Chọn 5 câu/mục chưa gặp khác với cả phần chẩn đoán và lượt 1; dùng các nguồn Study4 đã liên kết. Ghi đủ tên bài và phạm vi, không dùng lại phần vừa chữa.
2. Làm độc lập một lượt rồi chấm. Cần ≥4/5 ở cả hai lượt mới liên tiếp. Nếu một lượt dưới mốc, chữa nguyên nhân rồi bắt đầu lại chuỗi hai lượt bằng phần mới.
3. Nếu đã không đạt ba lượt thực sự, dừng giao bài lặp: ghi lại nguyên nhân và một cách dạy/luyện khác sẽ thử. Có thể học kỹ năng khác trong lúc chờ chữa.
4. Nếu đã dùng hết phần chưa gặp trong lựa chọn chính/dự phòng, giữ bước và ghi “cần chọn bài mới”; không tự coi bài đã gặp là mới. Nguồn gợi ý tiếp: IELTS Collection 1 Listening Test 2 · Recording 1 · part 18963.

Nộp: Mã bài/phạm vi mới, số đúng /5 và chứng cứ cho câu sai/khó.

- Đã dùng 5 câu của đoạn chưa nghe, chấm lượt đầu.
- Có chứng cứ hoặc mốc audio cho một câu khó.
- Số đúng trong 5 mục/câu mới · mốc ≥4/5

#### Bước 7. Chốt hôm nay và giữ việc cần ôn · 10 phút



1. Ghi một điều đã làm được bằng bài mới và một lỗi cần quay lại. Không cần học thêm cho đủ số từ.
2. Bấm lưu; lần sau app mở lại bước chưa xong. Sau 7 ngày có mục kiểm lại bằng phần chưa làm trong Study4.
3. Nếu hết 120 phút trước khi hoàn tất, dừng và lưu nháp; lần sau tiếp tục cùng buổi.
4. Nếu là Nói/Viết, hoàn tất bước học vẫn cần giữ phản hồi và sản phẩm sửa ở mục Người chữa của buổi mới được ghi nhận đạt mốc luyện. Không chặn học kỹ năng khác.

Nộp: Điều đã làm được → lỗi còn lại → cách kiểm lại.

- Đã lưu bài gốc và phần sửa hoặc nơi lưu chúng.
- Biết lỗi ưu tiên và việc kiểm lại, không tự gán band từ bài ngắn.

### 2. Đọc: trả lời có dòng chứng cứ

R · tìm chứng cứ và paraphrase · 115 phút

Mục tiêu: Tách việc hiểu bài với đoán đáp án; tìm được chứng cứ và paraphrase. Mốc luyện cần hai nhóm mới liên tiếp đạt 4/5, không tính điểm nghe/đọc lại.

Lý do: Luyện R · tìm chứng cứ và paraphrase; bước chẩn đoán của buổi sẽ cho biết có cần phần hướng dẫn/sửa nào. Nếu đã có bài mới tương đương và đạt tiêu chí, dùng bằng chứng đó, không phải học lại toàn khóa.

#### Bước 1. Mở đúng bài, giữ lượt đầu · 5 phút

[Reading · Luyện đề tổng hợp](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/)

1. Mở IELTS Collection 1 Reading Test 1 – Passage 1 (18929). Nếu đã biết đáp án, đổi sang Test 2 – Passage 1 (18932).
2. Chỉ mở phần câu hỏi; chưa xem đáp án, transcript hoặc mẫu. Ghi nguyên tên bộ/test/part và phạm vi câu ở ô bên dưới.
3. Bước tự làm giữ nguyên câu trả lời trước khi xem lời giải.

Nộp: Tên bài thực tế + phạm vi câu + xác nhận chưa biết đáp án.

- Đã chọn đúng bài và ghi mã/phạm vi câu.
- Chưa đọc đáp án hoặc mẫu của phần sẽ tự làm.

#### Bước 2. Làm một passage trong 20 phút · 20 phút



1. Đặt 20 phút. Đọc câu hỏi, làm trong khả năng, không tra từ; hết giờ đánh dấu câu bỏ trống.
2. Giữ bản gốc rồi chấm Study4. Ghi đúng/tổng và hai câu sai hoặc phải đoán. Không đổi điểm passage thành band.

Nộp: Tên passage + đúng/tổng + thời gian + hai câu cần chữa.

- Có kết quả và thời gian lượt đầu.
- Đã tách câu chắc với câu đoán/bỏ trống.

#### Bước 3. Đọc ý chính rồi tìm chi tiết · 15 phút

[Reading · Skimming](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/19540/) · [Reading · Scanning](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/19541/)

1. Mở Skimming và Scanning trong Study4. Dùng phần chữ nếu muốn, chỉ xem hướng dẫn phù hợp hai câu đang vướng.
2. Với ba đoạn của passage vừa làm, ghi mỗi đoạn một ý chính ngắn bằng tiếng Việt. Sau đó chỉ đúng đoạn chứa chứng cứ của hai câu đã chọn.

Nộp: Ba ý chính và vị trí chứng cứ của hai câu.

- Có ý chính cho ba đoạn.
- Phân biệt được ý chính với một chi tiết riêng.

#### Bước 4. Chữa hai lỗi cụ thể · 25 phút

[Reading · Luyện đề tổng hợp](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/)

1. Thử lại hai câu sai trước khi xem giải thích. Sau đó tìm dòng chứng cứ trong passage, ghép cách diễn đạt câu hỏi ↔ bài đọc và giải thích vì sao đáp án khác không đúng.
2. Chọn hai lỗi sai/khó nhất. Nếu không sai, chọn hai chỗ phải đoán. Mỗi lỗi ghi: đáp án/câu gốc → chỗ vướng → chứng cứ hoặc quy tắc → bản sửa.
3. Lấy tối đa 3 cụm hữu ích từ chính bài, giữ câu nguồn; đóng mẫu và dùng 2 cụm trong câu của m. Chỉ sửa một lỗi ngữ pháp đang lặp.
4. Chỉ thêm tối đa 5 cụm từ bài nếu cần; ưu tiên ôn thẻ đến hạn. Backlog cao thì giảm còn 0–3 cụm, không chạy số lượng.

Nộp: Hai cặp trước → sau sửa, lý do và 2 câu dùng cụm của bài.

- Có hai lỗi/chỗ khó và chứng cứ cụ thể.
- Có câu tự diễn đạt sau khi đóng mẫu, không chỉ chép đáp án.

#### Bước 5. Tự làm phần mới · lượt 1 · 20 phút

[Reading · Luyện đề tổng hợp](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/)

1. Dùng Test 2 – Passage 2 (18933), 5 câu đầu chưa làm. Nếu đã dùng thì Test 1 – Passage 2 (18930), 5 câu chưa làm.
2. Tự làm tối đa 15 phút; chấm và nêu chứng cứ cho một câu khó. Cần 4/5. Đo phần mới, không tính bài vừa được chữa.
3. Nếu dưới 4/5, đọc chậm hai đoạn liên quan rồi thử nhóm 5 câu chưa làm khác trong Study4 ở phiên sau.

Nộp: Mã bài/phạm vi mới, số đúng /5 và chứng cứ cho câu sai/khó.

- Có 5 đáp án lượt đầu của phần mới.
- Chỉ ra được dòng chứng cứ và một cặp paraphrase.
- Số đúng trong 5 mục/câu mới · mốc ≥4/5

#### Bước 6. Tự làm phần mới · lượt 2 · 20 phút

[Reading · Luyện đề tổng hợp](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/)

1. Chọn 5 câu/mục chưa gặp khác với cả phần chẩn đoán và lượt 1; dùng các nguồn Study4 đã liên kết. Ghi đủ tên bài và phạm vi, không dùng lại phần vừa chữa.
2. Làm độc lập một lượt rồi chấm. Cần ≥4/5 ở cả hai lượt mới liên tiếp. Nếu một lượt dưới mốc, chữa nguyên nhân rồi bắt đầu lại chuỗi hai lượt bằng phần mới.
3. Nếu đã không đạt ba lượt thực sự, dừng giao bài lặp: ghi lại nguyên nhân và một cách dạy/luyện khác sẽ thử. Có thể học kỹ năng khác trong lúc chờ chữa.
4. Nếu đã dùng hết phần chưa gặp trong lựa chọn chính/dự phòng, giữ bước và ghi “cần chọn bài mới”; không tự coi bài đã gặp là mới. Nguồn gợi ý tiếp: IELTS Collection 1 Reading Test 1 · Passage 1 · part 18929.

Nộp: Mã bài/phạm vi mới, số đúng /5 và chứng cứ cho câu sai/khó.

- Có 5 đáp án lượt đầu của phần mới.
- Chỉ ra được dòng chứng cứ và một cặp paraphrase.
- Số đúng trong 5 mục/câu mới · mốc ≥4/5

#### Bước 7. Chốt hôm nay và giữ việc cần ôn · 10 phút



1. Ghi một điều đã làm được bằng bài mới và một lỗi cần quay lại. Không cần học thêm cho đủ số từ.
2. Bấm lưu; lần sau app mở lại bước chưa xong. Sau 7 ngày có mục kiểm lại bằng phần chưa làm trong Study4.
3. Nếu hết 120 phút trước khi hoàn tất, dừng và lưu nháp; lần sau tiếp tục cùng buổi.
4. Nếu là Nói/Viết, hoàn tất bước học vẫn cần giữ phản hồi và sản phẩm sửa ở mục Người chữa của buổi mới được ghi nhận đạt mốc luyện. Không chặn học kỹ năng khác.

Nộp: Điều đã làm được → lỗi còn lại → cách kiểm lại.

- Đã lưu bài gốc và phần sửa hoặc nơi lưu chúng.
- Biết lỗi ưu tiên và việc kiểm lại, không tự gán band từ bài ngắn.

### 3. Viết: nối ý chính với lý do

W · nối ý chính với lý do · 105 phút

Mục tiêu: Giải thích được một ý bằng câu rõ, sửa đúng chỗ thiếu liên kết.

Lý do: Luyện W · nối ý chính với lý do; bước chẩn đoán của buổi sẽ cho biết có cần phần hướng dẫn/sửa nào. Nếu đã có bài mới tương đương và đạt tiêu chí, dùng bằng chứng đó, không phải học lại toàn khóa.

#### Bước 1. Mở đúng bài, giữ lượt đầu · 5 phút

[Writing · Luận điểm và lập luận](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/)

1. Mở bài 14370 – bảng Point/Explanation trong mục 1.2.2; chọn dòng về học trực tuyến. Nếu đã biết đáp án, đổi sang dòng về việc đọc sách trong cùng bảng.
2. Chỉ mở phần câu hỏi; chưa xem đáp án, transcript hoặc mẫu. Ghi nguyên tên bộ/test/part và phạm vi câu ở ô bên dưới.
3. Bước tự làm giữ nguyên câu trả lời trước khi xem lời giải.

Nộp: Tên bài thực tế + phạm vi câu + xác nhận chưa biết đáp án.

- Đã chọn đúng bài và ghi mã/phạm vi câu.
- Chưa đọc đáp án hoặc mẫu của phần sẽ tự làm.

#### Bước 2. Tự giải thích ý trước phần phân tích · 20 phút



1. Đọc đúng dòng Point của ví dụ đã chọn, chưa đọc phần phân tích phía dưới. Viết 3–4 câu của m để giải thích vì sao ý đó có thể đúng.
2. Không cần bài văn 250 từ. Gạch câu ý chính, câu lý do và phần giải thích mối liên hệ. Giữ bản gốc.

Nộp: 3–4 câu gốc + chỉ ra ý chính và lý do.

- Có bản tự viết trước phân tích mẫu.
- Chỉ theo một ý chính.

#### Bước 3. Đối chiếu lập luận trong bài · 20 phút

[Writing · Luận điểm và lập luận](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/)

1. Đọc mục 1.1 và phân tích dòng mình vừa chọn trong 1.2.2 của bài 14370.
2. Xác định chỗ người đọc còn phải hỏi “vì sao?” trong câu của m. Viết một câu cầu nối để làm rõ quan hệ đó.
3. Nếu đọc ví dụ có số liệu minh họa, không dùng chúng như dữ kiện đã xác minh trong bài của m.

Nộp: Chỗ thiếu liên kết → một câu giải thích bổ sung.

- Đã đối chiếu đúng dòng của Study4.
- Lý do giải thích trực tiếp ý chính, không chỉ cùng chủ đề.

#### Bước 4. Chữa hai lỗi cụ thể · 25 phút

[Writing · Luận điểm và lập luận](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/) · [Writing · Các lỗi GRA](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14381/)

1. Giữ hai câu trước/sau sửa. Với mỗi câu: tìm chủ ngữ và động từ, kiểm tra thì/số ít-nhiều. Nếu câu quá dài, tách trước rồi nối lại khi quan hệ ý đã rõ.
2. Chọn hai lỗi sai/khó nhất. Nếu không sai, chọn hai chỗ phải đoán. Mỗi lỗi ghi: đáp án/câu gốc → chỗ vướng → chứng cứ hoặc quy tắc → bản sửa.
3. Lấy tối đa 3 cụm hữu ích từ chính bài, giữ câu nguồn; đóng mẫu và dùng 2 cụm trong câu của m. Chỉ sửa một lỗi ngữ pháp đang lặp.
4. Chỉ thêm tối đa 5 cụm từ bài nếu cần; ưu tiên ôn thẻ đến hạn. Backlog cao thì giảm còn 0–3 cụm, không chạy số lượng.

Nộp: Hai cặp trước → sau sửa, lý do và 2 câu dùng cụm của bài.

- Có hai lỗi/chỗ khó và chứng cứ cụ thể.
- Có câu tự diễn đạt sau khi đóng mẫu, không chỉ chép đáp án.

#### Bước 5. Thử phần mới khi đã đóng mẫu · 25 phút

[Writing · Luận điểm và lập luận](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/)

1. Chọn dòng chưa dùng về đọc sách hoặc môi trường sống của động vật trong bảng 1.2.2; chỉ đọc Point, che Explanation/phân tích.
2. Tự viết 3–4 câu: một ý chính → lý do → giải thích mối liên hệ. Mở phân tích sau khi viết và sửa một câu.
3. Đạt bước khi giải thích được vì sao lý do hỗ trợ ý chính và giữ cặp câu sửa; nếu chỉ lặp ý, quay lại method. Đây là tự đối chiếu cấu trúc, chất lượng bài cần người chữa.

Nộp: Mã câu hỏi/ví dụ mới, sản phẩm tự làm và hai chỗ đã tự đối chiếu.

- Có sản phẩm của một ví dụ Study4 chưa luyện.
- Giải thích được quan hệ ý chính–lý do bằng lời mình.
- Có một cặp câu trước/sau sửa và đã kiểm tra chủ–vị.

#### Bước 6. Chốt hôm nay và giữ việc cần ôn · 10 phút



1. Ghi một điều đã làm được bằng bài mới và một lỗi cần quay lại. Không cần học thêm cho đủ số từ.
2. Bấm lưu; lần sau app mở lại bước chưa xong. Sau 7 ngày có mục kiểm lại bằng phần chưa làm trong Study4.
3. Nếu hết 120 phút trước khi hoàn tất, dừng và lưu nháp; lần sau tiếp tục cùng buổi.
4. Nếu là Nói/Viết, hoàn tất bước học vẫn cần giữ phản hồi và sản phẩm sửa ở mục Người chữa của buổi mới được ghi nhận đạt mốc luyện. Không chặn học kỹ năng khác.

Nộp: Điều đã làm được → lỗi còn lại → cách kiểm lại.

- Đã lưu bài gốc và phần sửa hoặc nơi lưu chúng.
- Biết lỗi ưu tiên và việc kiểm lại, không tự gán band từ bài ngắn.

### 4. Nghe chính tả: số, tên và địa chỉ

L · nhận và viết số/tên/địa chỉ · 115 phút

Mục tiêu: Viết đúng thông tin nghe được, biết mình sai âm hay sai chính tả. Mốc luyện cần hai nhóm mới liên tiếp đạt 4/5, không tính điểm nghe/đọc lại.

Lý do: Luyện L · nhận và viết số/tên/địa chỉ; bước chẩn đoán của buổi sẽ cho biết có cần phần hướng dẫn/sửa nào. Nếu đã có bài mới tương đương và đạt tiêu chí, dùng bằng chứng đó, không phải học lại toàn khóa.

#### Bước 1. Mở đúng bài, giữ lượt đầu · 5 phút

[Dictation · Numbers and letters](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5418/)

1. Mở Numbers and letters 5418 – 10 mục chưa nghe, ghi vị trí mục. Nếu đã biết đáp án, đổi sang Address 5420 – 10 mục chưa nghe.
2. Chỉ mở phần câu hỏi; chưa xem đáp án, transcript hoặc mẫu. Ghi nguyên tên bộ/test/part và phạm vi câu ở ô bên dưới.
3. Audio 1x, một lượt trong bước tự làm. Mọi lượt replay ở bước chữa phải được ghi là luyện lại.

Nộp: Tên bài thực tế + phạm vi câu + xác nhận chưa biết đáp án.

- Đã chọn đúng bài và ghi mã/phạm vi câu.
- Chưa đọc đáp án hoặc mẫu của phần sẽ tự làm.

#### Bước 2. Nghe 10 mục, giữ đáp án gốc · 15 phút



1. Chọn 10 mục còn mới. Nghe mỗi mục một lượt trước khi xem đúng/sai. Nếu Study4 tự hiện đáp án sau từng mục, ghi kết quả đầu ngay khi hiện.
2. Ghi lỗi thuộc tên chữ/số, âm dễ lẫn, khoảng cách hay chính tả; không gọi điểm dictation là band IELTS.

Nộp: Vị trí 10 mục + đúng /10 + hai đáp án gốc.

- Có số mục/phạm vi cụ thể.
- Chỉ đếm đáp án đúng ngay lượt đầu.
- Đúng lượt đầu /10 mục · chỉ chẩn đoán

#### Bước 3. Học đúng chỗ dễ nhầm · 20 phút

[Listening · Numbers and letters](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19551/)

1. Mở Numbers and letters 19551, tìm hướng dẫn phù hợp lỗi vừa gặp.
2. Lập hai cặp thông tin m hay nhầm từ chính các mục vừa làm; đọc rõ rồi tự thử viết lại sau khi che.
3. Giữ một mẹo thao tác hữu ích, không phải ghi hết bài giảng.

Nộp: Hai cặp hay nhầm và thao tác nhận dạng.

- Hai cặp lấy từ bài vừa học.
- Có cách kiểm tra chính tả sau nghe.

#### Bước 4. Chữa hai lỗi cụ thể · 25 phút

[Dictation · Numbers and letters](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5418/) · [Dictation · Address](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5420/)

1. Nghe lại hai mục sai tối đa 2–3 lần → viết điều thực sự nghe được → so đáp án Study4 → nói/viết lại. Phân biệt sai nhận âm với nhận đúng âm nhưng viết sai.
2. Chọn hai lỗi sai/khó nhất. Nếu không sai, chọn hai chỗ phải đoán. Mỗi lỗi ghi: đáp án/câu gốc → chỗ vướng → chứng cứ hoặc quy tắc → bản sửa.
3. Lấy tối đa 3 cụm hữu ích từ chính bài, giữ câu nguồn; đóng mẫu và dùng 2 cụm trong câu của m. Chỉ sửa một lỗi ngữ pháp đang lặp.
4. Chỉ thêm tối đa 5 cụm từ bài nếu cần; ưu tiên ôn thẻ đến hạn. Backlog cao thì giảm còn 0–3 cụm, không chạy số lượng.

Nộp: Hai cặp trước → sau sửa, lý do và 2 câu dùng cụm của bài.

- Có hai lỗi/chỗ khó và chứng cứ cụ thể.
- Có câu tự diễn đạt sau khi đóng mẫu, không chỉ chép đáp án.

#### Bước 5. Tự làm phần mới · lượt 1 · 20 phút

[Dictation · Address](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5420/) · [Dictation · Date](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5421/)

1. Chọn 5 mục Address chưa nghe; nếu Address đã dùng ở bước đầu, dùng 5 mục Date chưa nghe. Ghi vị trí mục.
2. Nghe một lượt, cần ≥4/5. Không chọn hai mục vừa chữa hoặc replay để làm đủ điểm.
3. Nếu dưới mốc, tách một cặp âm/số để chữa rồi lấy 5 mục khác ở phiên tiếp.

Nộp: Mã bài/phạm vi mới, số đúng /5 và chứng cứ cho câu sai/khó.

- Năm mục thực sự chưa nghe, có vị trí để đối chiếu.
- Phân biệt được lỗi nghe và lỗi viết ở câu khó.
- Số đúng trong 5 mục/câu mới · mốc ≥4/5

#### Bước 6. Tự làm phần mới · lượt 2 · 20 phút

[Dictation · Address](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5420/) · [Dictation · Date](https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5421/)

1. Chọn 5 câu/mục chưa gặp khác với cả phần chẩn đoán và lượt 1; dùng các nguồn Study4 đã liên kết. Ghi đủ tên bài và phạm vi, không dùng lại phần vừa chữa.
2. Làm độc lập một lượt rồi chấm. Cần ≥4/5 ở cả hai lượt mới liên tiếp. Nếu một lượt dưới mốc, chữa nguyên nhân rồi bắt đầu lại chuỗi hai lượt bằng phần mới.
3. Nếu đã không đạt ba lượt thực sự, dừng giao bài lặp: ghi lại nguyên nhân và một cách dạy/luyện khác sẽ thử. Có thể học kỹ năng khác trong lúc chờ chữa.
4. Nếu đã dùng hết phần chưa gặp trong lựa chọn chính/dự phòng, giữ bước và ghi “cần chọn bài mới”; không tự coi bài đã gặp là mới. Nguồn gợi ý tiếp: Dictation Numbers and letters 5418 / Address 5420: các mục chưa nghe.

Nộp: Mã bài/phạm vi mới, số đúng /5 và chứng cứ cho câu sai/khó.

- Năm mục thực sự chưa nghe, có vị trí để đối chiếu.
- Phân biệt được lỗi nghe và lỗi viết ở câu khó.
- Số đúng trong 5 mục/câu mới · mốc ≥4/5

#### Bước 7. Chốt hôm nay và giữ việc cần ôn · 10 phút



1. Ghi một điều đã làm được bằng bài mới và một lỗi cần quay lại. Không cần học thêm cho đủ số từ.
2. Bấm lưu; lần sau app mở lại bước chưa xong. Sau 7 ngày có mục kiểm lại bằng phần chưa làm trong Study4.
3. Nếu hết 120 phút trước khi hoàn tất, dừng và lưu nháp; lần sau tiếp tục cùng buổi.
4. Nếu là Nói/Viết, hoàn tất bước học vẫn cần giữ phản hồi và sản phẩm sửa ở mục Người chữa của buổi mới được ghi nhận đạt mốc luyện. Không chặn học kỹ năng khác.

Nộp: Điều đã làm được → lỗi còn lại → cách kiểm lại.

- Đã lưu bài gốc và phần sửa hoặc nơi lưu chúng.
- Biết lỗi ưu tiên và việc kiểm lại, không tự gán band từ bài ngắn.

### 5. Nói Part 1: trả lời thẳng và có chi tiết

S · câu trả lời Part 1 có mở rộng · 100 phút

Mục tiêu: Tạo được câu trả lời của chính mình cho câu hỏi Home và Hometown.

Lý do: Luyện S · câu trả lời Part 1 có mở rộng; bước chẩn đoán của buổi sẽ cho biết có cần phần hướng dẫn/sửa nào. Nếu đã có bài mới tương đương và đạt tiêu chí, dùng bằng chứng đó, không phải học lại toàn khóa.

#### Bước 1. Mở đúng bài, giữ lượt đầu · 5 phút

[Speaking · Introductory questions](https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14611/)

1. Mở Introductory questions 14611 – danh sách Home, câu 1 và 2; chưa đọc phần mẫu phía dưới. Nếu đã biết đáp án, đổi sang hai câu Home khác chưa luyện.
2. Chỉ mở phần câu hỏi; chưa xem đáp án, transcript hoặc mẫu. Ghi nguyên tên bộ/test/part và phạm vi câu ở ô bên dưới.
3. Bước tự làm giữ nguyên câu trả lời trước khi xem lời giải.

Nộp: Tên bài thực tế + phạm vi câu + xác nhận chưa biết đáp án.

- Đã chọn đúng bài và ghi mã/phạm vi câu.
- Chưa đọc đáp án hoặc mẫu của phần sẽ tự làm.

#### Bước 2. Nói trước khi xem cách trả lời · 15 phút



1. Nhìn hai câu Home đã chọn. Mỗi câu nghĩ ba từ khóa rồi nói 20–30 giây bằng thông tin thật. Không viết cả kịch bản trước.
2. Giữ bản thu bằng công cụ m đang dùng hoặc ghi lại nguyên câu đã nói, đánh dấu hai chỗ bí ý. Ghi tên file nếu có; app này không tự thu âm trong buổi học.

Nộp: Câu hỏi đã dùng + bản gốc/tên file + hai chỗ ngập ngừng.

- Đã thử nói trước mẫu.
- Giữ được câu gốc để so với bản sửa.

#### Bước 3. Học mục Home của Study4 · 20 phút

[Speaking · Introductory questions](https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14611/)

1. Đọc phần cách trả lời Home trong bài 14611. Chọn một cách mở đầu đơn giản m hiểu và dùng được.
2. Xác định câu trả lời thẳng, phần giải thích và chi tiết riêng trong một ví dụ. Sau đó đóng mẫu.
3. Chỉ ghi ba từ khóa cho câu trả lời thật của m; không học thuộc cả ví dụ.

Nộp: Ba phần của câu trả lời và ba từ khóa cá nhân.

- Đã hiểu chức năng từng phần.
- Từ khóa phản ánh thông tin thật của m.

#### Bước 4. Chữa hai lỗi cụ thể · 25 phút

[Speaking · Introductory questions](https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14611/) · [Writing · Các lỗi GRA](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14381/)

1. Nói lại cùng hai câu, ưu tiên câu ngắn đủ chủ–vị. Nghe/đọc lại bản gốc và sửa hai chỗ khiến ý khó hiểu. Nếu sửa phát âm, cần nghe bản thu hoặc nhờ người nghe; transcript không đủ.
2. Chọn hai lỗi sai/khó nhất. Nếu không sai, chọn hai chỗ phải đoán. Mỗi lỗi ghi: đáp án/câu gốc → chỗ vướng → chứng cứ hoặc quy tắc → bản sửa.
3. Lấy tối đa 3 cụm hữu ích từ chính bài, giữ câu nguồn; đóng mẫu và dùng 2 cụm trong câu của m. Chỉ sửa một lỗi ngữ pháp đang lặp.
4. Chỉ thêm tối đa 5 cụm từ bài nếu cần; ưu tiên ôn thẻ đến hạn. Backlog cao thì giảm còn 0–3 cụm, không chạy số lượng.

Nộp: Hai cặp trước → sau sửa, lý do và 2 câu dùng cụm của bài.

- Có hai lỗi/chỗ khó và chứng cứ cụ thể.
- Có câu tự diễn đạt sau khi đóng mẫu, không chỉ chép đáp án.

#### Bước 5. Thử phần mới khi đã đóng mẫu · 25 phút

[Speaking · Introductory questions](https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14611/)

1. Chuyển sang Hometown: câu 1 và 2 trong danh sách 14611, nếu chưa luyện; dùng câu 3/4 nếu đã gặp. Chưa mở mẫu của hai câu mới.
2. Mỗi câu nói 20–40 giây, trả lời ngay trọng tâm, mở rộng bằng một lý do hoặc chi tiết thật. Giữ bản gốc.
3. Tự đối chiếu: câu trả lời có đúng câu hỏi không? Có đủ chủ–vị không? Người nghe có hiểu ý không? Chưa chắc thì giữ bước và gửi bản gốc cho người chấm, không ép tick qua.

Nộp: Mã câu hỏi/ví dụ mới, sản phẩm tự làm và hai chỗ đã tự đối chiếu.

- Hai câu mới đều trả lời đúng trọng tâm.
- Mỗi câu có lý do/chi tiết riêng và đã tự đối chiếu.
- Đã giữ bản thu/câu gốc để nhận chữa; chưa tự xác nhận band.

#### Bước 6. Chốt hôm nay và giữ việc cần ôn · 10 phút



1. Ghi một điều đã làm được bằng bài mới và một lỗi cần quay lại. Không cần học thêm cho đủ số từ.
2. Bấm lưu; lần sau app mở lại bước chưa xong. Sau 7 ngày có mục kiểm lại bằng phần chưa làm trong Study4.
3. Nếu hết 120 phút trước khi hoàn tất, dừng và lưu nháp; lần sau tiếp tục cùng buổi.
4. Nếu là Nói/Viết, hoàn tất bước học vẫn cần giữ phản hồi và sản phẩm sửa ở mục Người chữa của buổi mới được ghi nhận đạt mốc luyện. Không chặn học kỹ năng khác.

Nộp: Điều đã làm được → lỗi còn lại → cách kiểm lại.

- Đã lưu bài gốc và phần sửa hoặc nơi lưu chúng.
- Biết lỗi ưu tiên và việc kiểm lại, không tự gán band từ bài ngắn.

### 6. Đọc điền từ: từ giới hạn đến chứng cứ

R · completion: giới hạn và dạng từ · 115 phút

Mục tiêu: Lấy đáp án từ passage đúng giới hạn và dạng từ. Mốc luyện cần hai nhóm mới liên tiếp đạt 4/5, không tính điểm nghe/đọc lại.

Lý do: Luyện R · completion: giới hạn và dạng từ; bước chẩn đoán của buổi sẽ cho biết có cần phần hướng dẫn/sửa nào. Nếu đã có bài mới tương đương và đạt tiêu chí, dùng bằng chứng đó, không phải học lại toàn khóa.

#### Bước 1. Mở đúng bài, giữ lượt đầu · 5 phút

[Reading · Luyện đề tổng hợp](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/)

1. Mở Test 1 – Passage 2 (18930), nhóm Summary Completion chưa làm. Nếu đã biết đáp án, đổi sang Test 3 – Passage 2 (18936), nhóm Summary Completion chưa làm.
2. Chỉ mở phần câu hỏi; chưa xem đáp án, transcript hoặc mẫu. Ghi nguyên tên bộ/test/part và phạm vi câu ở ô bên dưới.
3. Bước tự làm giữ nguyên câu trả lời trước khi xem lời giải.

Nộp: Tên bài thực tế + phạm vi câu + xác nhận chưa biết đáp án.

- Đã chọn đúng bài và ghi mã/phạm vi câu.
- Chưa đọc đáp án hoặc mẫu của phần sẽ tự làm.

#### Bước 2. Tự làm nhóm completion đầu · 20 phút



1. Chọn nhóm Summary Completion đầu chưa làm trong passage này, ghi số câu và đúng/tổng thực tế; không ép một nhóm phải có 10 câu.
2. Trước mỗi chỗ trống, ghi dự đoán loại từ. Làm trong 15 phút, giữ đáp án gốc; 5 phút còn lại chấm.

Nộp: Mã nhóm/số câu + dự đoán loại từ + đáp án gốc + đúng/tổng.

- Đã ghi giới hạn từ của đúng nhóm.
- Giữ đáp án lượt đầu, không dùng số câu giả định.

#### Bước 3. Học hướng dẫn Summary Completion · 15 phút

[Reading · Summary/Note/Table/Flow-chart Completion](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/5099/)

1. Mở bài 5099. Chỉ đọc phần liên quan giới hạn từ, dự đoán loại từ và tìm chứng cứ.
2. Chọn hai câu sai/khó, chỉ ra một cặp paraphrase và vì sao dạng từ ở chỗ trống phù hợp.

Nộp: Hai câu: giới hạn từ → loại từ → dòng chứng cứ.

- Đã đối chiếu giới hạn từ và số ít/nhiều.
- Có vị trí chứng cứ cho hai câu.

#### Bước 4. Chữa hai lỗi cụ thể · 25 phút

[Reading · Luyện đề tổng hợp](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/)

1. Chữa từng câu từ passage: tìm dòng chứng cứ, đối chiếu cách hỏi, thử điền lại và đọc cả câu để kiểm nghĩa/ngữ pháp. Đánh dấu trường hợp vượt giới hạn từ hoặc thiếu số nhiều.
2. Chọn hai lỗi sai/khó nhất. Nếu không sai, chọn hai chỗ phải đoán. Mỗi lỗi ghi: đáp án/câu gốc → chỗ vướng → chứng cứ hoặc quy tắc → bản sửa.
3. Lấy tối đa 3 cụm hữu ích từ chính bài, giữ câu nguồn; đóng mẫu và dùng 2 cụm trong câu của m. Chỉ sửa một lỗi ngữ pháp đang lặp.
4. Chỉ thêm tối đa 5 cụm từ bài nếu cần; ưu tiên ôn thẻ đến hạn. Backlog cao thì giảm còn 0–3 cụm, không chạy số lượng.

Nộp: Hai cặp trước → sau sửa, lý do và 2 câu dùng cụm của bài.

- Có hai lỗi/chỗ khó và chứng cứ cụ thể.
- Có câu tự diễn đạt sau khi đóng mẫu, không chỉ chép đáp án.

#### Bước 5. Tự làm phần mới · lượt 1 · 20 phút

[Reading · Luyện đề tổng hợp](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/)

1. Dùng passage còn mới trong hai lựa chọn 18930/18936; nếu đã dùng cả hai để luyện, mở Practice Zone, lọc Summary Completion và chọn một passage chưa làm, ghi tên/part.
2. Lấy 5 câu chưa làm để kiểm tra. Nếu nhóm có ít hơn 5, lấy thêm từ nhóm mới khác và ghi cả hai nguồn. Cần 4/5; không coi đó là band Reading.
3. Nếu chưa đạt, chữa đúng nguyên nhân giới hạn/từ loại/chứng cứ rồi lấy nhóm khác vào lần học tiếp.

Nộp: Mã bài/phạm vi mới, số đúng /5 và chứng cứ cho câu sai/khó.

- Năm câu đều mới và đủ nguồn thực tế.
- Có chứng cứ, đúng giới hạn và dạng từ theo đáp án.
- Số đúng trong 5 mục/câu mới · mốc ≥4/5

#### Bước 6. Tự làm phần mới · lượt 2 · 20 phút

[Reading · Luyện đề tổng hợp](https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/)

1. Chọn 5 câu/mục chưa gặp khác với cả phần chẩn đoán và lượt 1; dùng các nguồn Study4 đã liên kết. Ghi đủ tên bài và phạm vi, không dùng lại phần vừa chữa.
2. Làm độc lập một lượt rồi chấm. Cần ≥4/5 ở cả hai lượt mới liên tiếp. Nếu một lượt dưới mốc, chữa nguyên nhân rồi bắt đầu lại chuỗi hai lượt bằng phần mới.
3. Nếu đã không đạt ba lượt thực sự, dừng giao bài lặp: ghi lại nguyên nhân và một cách dạy/luyện khác sẽ thử. Có thể học kỹ năng khác trong lúc chờ chữa.
4. Nếu đã dùng hết phần chưa gặp trong lựa chọn chính/dự phòng, giữ bước và ghi “cần chọn bài mới”; không tự coi bài đã gặp là mới. Nguồn gợi ý tiếp: IELTS Collection 1 Reading Test 1 · Passage 2 · part 18930.

Nộp: Mã bài/phạm vi mới, số đúng /5 và chứng cứ cho câu sai/khó.

- Năm câu đều mới và đủ nguồn thực tế.
- Có chứng cứ, đúng giới hạn và dạng từ theo đáp án.
- Số đúng trong 5 mục/câu mới · mốc ≥4/5

#### Bước 7. Chốt hôm nay và giữ việc cần ôn · 10 phút



1. Ghi một điều đã làm được bằng bài mới và một lỗi cần quay lại. Không cần học thêm cho đủ số từ.
2. Bấm lưu; lần sau app mở lại bước chưa xong. Sau 7 ngày có mục kiểm lại bằng phần chưa làm trong Study4.
3. Nếu hết 120 phút trước khi hoàn tất, dừng và lưu nháp; lần sau tiếp tục cùng buổi.
4. Nếu là Nói/Viết, hoàn tất bước học vẫn cần giữ phản hồi và sản phẩm sửa ở mục Người chữa của buổi mới được ghi nhận đạt mốc luyện. Không chặn học kỹ năng khác.

Nộp: Điều đã làm được → lỗi còn lại → cách kiểm lại.

- Đã lưu bài gốc và phần sửa hoặc nơi lưu chúng.
- Biết lỗi ưu tiên và việc kiểm lại, không tự gán band từ bài ngắn.

### 7. Nói: sở thích có lý do, không liệt kê từ

S · lý do và chi tiết cho sở thích · 100 phút

Mục tiêu: Dùng ý thật để mở rộng câu hỏi về thích/không thích trong Study4.

Lý do: Luyện S · lý do và chi tiết cho sở thích; bước chẩn đoán của buổi sẽ cho biết có cần phần hướng dẫn/sửa nào. Nếu đã có bài mới tương đương và đạt tiêu chí, dùng bằng chứng đó, không phải học lại toàn khóa.

#### Bước 1. Mở đúng bài, giữ lượt đầu · 5 phút

[Speaking · Liking/disliking questions](https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14612/)

1. Mở bài 14612 – hai câu hỏi ví dụ đầu chưa luyện, chỉ đọc câu hỏi. Nếu đã biết đáp án, đổi sang Home/Hometown 14611 – hai câu chưa dùng ở buổi Nói đầu tiên.
2. Chỉ mở phần câu hỏi; chưa xem đáp án, transcript hoặc mẫu. Ghi nguyên tên bộ/test/part và phạm vi câu ở ô bên dưới.
3. Bước tự làm giữ nguyên câu trả lời trước khi xem lời giải.

Nộp: Tên bài thực tế + phạm vi câu + xác nhận chưa biết đáp án.

- Đã chọn đúng bài và ghi mã/phạm vi câu.
- Chưa đọc đáp án hoặc mẫu của phần sẽ tự làm.

#### Bước 2. Nói hai câu trước mẫu · 15 phút



1. Với mỗi câu, ghi ba từ khóa, nói 20–40 giây. Trả lời trực tiếp rồi nêu một lý do bằng trải nghiệm thật.
2. Giữ bản thu/câu gốc; đánh dấu chỗ lặp từ hoặc hết ý.

Nộp: Hai câu trả lời gốc/tên file + hai chỗ cần sửa.

- Có lượt nói trước mẫu.
- Nội dung dựa vào câu hỏi Study4 đã ghi.

#### Bước 3. Đọc cách mở rộng trong Study4 · 20 phút

[Speaking · Liking/disliking questions](https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14612/)

1. Đọc hướng dẫn bài 14612. Với một mẫu, xác định ý trả lời, lý do và chi tiết hỗ trợ; chọn một cụm m hiểu rõ nghĩa.
2. Đóng mẫu và dùng cụm đó vào thông tin thật. Không cần dùng thành ngữ nếu nghe gượng hoặc chưa hiểu.

Nộp: Sơ đồ ý của mẫu và hai cụm/câu m sẽ dùng.

- Đã hiểu lý do mở rộng thay vì thêm từ rời.
- Có ví dụ mang thông tin của m.

#### Bước 4. Chữa hai lỗi cụ thể · 25 phút

[Speaking · Liking/disliking questions](https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14612/) · [Writing · Các lỗi GRA](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14381/)

1. Nghe/đọc bản gốc, sửa một chỗ diễn đạt và một lỗi câu; nói lại theo từ khóa, không đọc kịch bản. So xem lý do có trả lời đúng câu hỏi và dễ hiểu hơn không.
2. Chọn hai lỗi sai/khó nhất. Nếu không sai, chọn hai chỗ phải đoán. Mỗi lỗi ghi: đáp án/câu gốc → chỗ vướng → chứng cứ hoặc quy tắc → bản sửa.
3. Lấy tối đa 3 cụm hữu ích từ chính bài, giữ câu nguồn; đóng mẫu và dùng 2 cụm trong câu của m. Chỉ sửa một lỗi ngữ pháp đang lặp.
4. Chỉ thêm tối đa 5 cụm từ bài nếu cần; ưu tiên ôn thẻ đến hạn. Backlog cao thì giảm còn 0–3 cụm, không chạy số lượng.

Nộp: Hai cặp trước → sau sửa, lý do và 2 câu dùng cụm của bài.

- Có hai lỗi/chỗ khó và chứng cứ cụ thể.
- Có câu tự diễn đạt sau khi đóng mẫu, không chỉ chép đáp án.

#### Bước 5. Thử phần mới khi đã đóng mẫu · 25 phút

[Speaking · Liking/disliking questions](https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14612/) · [Speaking · Introductory questions](https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14611/)

1. Lấy hai câu tiếp theo chưa luyện ở 14612; nếu không còn câu mới, dùng hai câu Home/Hometown chưa dùng của 14611. Ghi đúng vị trí.
2. Nói 20–40 giây/câu, đóng mẫu. Mỗi câu có câu trả lời thẳng và lý do/chi tiết phù hợp. Giữ bản thu để nhận chữa.
3. Chưa diễn đạt rõ thì đơn giản hóa câu và thử lại ở bài khác. Nếu không tự biết đúng/sai, lưu chờ người nghe giúp thay vì xác nhận đạt.

Nộp: Mã câu hỏi/ví dụ mới, sản phẩm tự làm và hai chỗ đã tự đối chiếu.

- Hai câu mới có trả lời thẳng và lý do.
- Đã sửa một lỗi diễn đạt/câu thường gặp.
- Có bản gốc cho người chấm; đây là tự đối chiếu, chưa xác nhận band.

#### Bước 6. Chốt hôm nay và giữ việc cần ôn · 10 phút



1. Ghi một điều đã làm được bằng bài mới và một lỗi cần quay lại. Không cần học thêm cho đủ số từ.
2. Bấm lưu; lần sau app mở lại bước chưa xong. Sau 7 ngày có mục kiểm lại bằng phần chưa làm trong Study4.
3. Nếu hết 120 phút trước khi hoàn tất, dừng và lưu nháp; lần sau tiếp tục cùng buổi.
4. Nếu là Nói/Viết, hoàn tất bước học vẫn cần giữ phản hồi và sản phẩm sửa ở mục Người chữa của buổi mới được ghi nhận đạt mốc luyện. Không chặn học kỹ năng khác.

Nộp: Điều đã làm được → lỗi còn lại → cách kiểm lại.

- Đã lưu bài gốc và phần sửa hoặc nơi lưu chúng.
- Biết lỗi ưu tiên và việc kiểm lại, không tự gán band từ bài ngắn.

### 8. Viết đoạn rõ ý và gom bài gửi người chữa

W · đoạn rõ ý, sửa lỗi câu · 105 phút

Mục tiêu: Tự viết một đoạn, sửa hai lỗi ưu tiên và chuẩn bị phản hồi sau chặng đầu.

Lý do: Luyện W · đoạn rõ ý, sửa lỗi câu; bước chẩn đoán của buổi sẽ cho biết có cần phần hướng dẫn/sửa nào. Nếu đã có bài mới tương đương và đạt tiêu chí, dùng bằng chứng đó, không phải học lại toàn khóa.

#### Bước 1. Mở đúng bài, giữ lượt đầu · 5 phút

[Writing · Các lỗi GRA](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14381/) · [Writing · Luận điểm và lập luận](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/)

1. Mở bài 14381, đề ví dụ thực phẩm nhập khẩu; chỉ đọc đề trước. Nếu đã luyện đề này, chuyển sang một dòng Point chưa dùng trong bảng 1.2.2 bài 14370.
2. Chỉ mở phần câu hỏi; chưa xem đáp án, transcript hoặc mẫu. Ghi nguyên tên bộ/test/part và phạm vi câu ở ô bên dưới.
3. Bước tự làm giữ nguyên câu trả lời trước khi xem lời giải.

Nộp: Tên bài thực tế + phạm vi câu + xác nhận chưa biết đáp án.

- Đã chọn đúng bài và ghi mã/phạm vi câu.
- Chưa đọc đáp án hoặc mẫu của phần sẽ tự làm.

#### Bước 2. Viết một đoạn 80–100 từ · 20 phút



1. Từ đề Study4 đã chọn, chọn một ý cho đoạn: câu chủ đề → lý do → giải thích → ví dụ phù hợp. Viết trước khi đọc mẫu/phân tích.
2. Giữ bản gốc. Không cần viết đủ cả bài Task 2 trong buổi này. Không bịa khảo sát hay số liệu để làm dẫn chứng.

Nộp: Đề đã dùng + đoạn gốc 80–100 từ.

- Có đoạn gốc trước mẫu.
- Một ý chính, không liệt kê nhiều ý chưa giải thích.

#### Bước 3. Đối chiếu một lỗi câu đang lặp · 20 phút

[Writing · Các lỗi GRA](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14381/) · [Writing · Luận điểm và lập luận](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/)

1. Mở 14381, đọc mục 2.3 về lỗi ngữ pháp và phần ví dụ liên quan.
2. Trong đoạn của m, gạch chủ–vị, thì, danh từ đếm được/số nhiều; chọn một nhóm lỗi cần sửa trước. Đọc lại 14370 nếu lý do chưa nối với ý chính.

Nộp: Một nhóm lỗi chính và hai câu cụ thể cần sửa.

- Đã xác định lỗi trong câu của mình.
- Có quy tắc/chỗ tham khảo Study4 để đối chiếu.

#### Bước 4. Chữa hai lỗi cụ thể · 25 phút

[Writing · Các lỗi GRA](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14381/) · [Writing · Luận điểm và lập luận](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/)

1. Viết lại hai câu lỗi và đoạn yếu. So bản gốc/sửa: ý chính có rõ không, câu lý do có giải thích được vì sao không, chủ–vị có đủ không. Ghi phần còn chưa chắc để hỏi người chữa.
2. Chọn hai lỗi sai/khó nhất. Nếu không sai, chọn hai chỗ phải đoán. Mỗi lỗi ghi: đáp án/câu gốc → chỗ vướng → chứng cứ hoặc quy tắc → bản sửa.
3. Lấy tối đa 3 cụm hữu ích từ chính bài, giữ câu nguồn; đóng mẫu và dùng 2 cụm trong câu của m. Chỉ sửa một lỗi ngữ pháp đang lặp.
4. Chỉ thêm tối đa 5 cụm từ bài nếu cần; ưu tiên ôn thẻ đến hạn. Backlog cao thì giảm còn 0–3 cụm, không chạy số lượng.

Nộp: Hai cặp trước → sau sửa, lý do và 2 câu dùng cụm của bài.

- Có hai lỗi/chỗ khó và chứng cứ cụ thể.
- Có câu tự diễn đạt sau khi đóng mẫu, không chỉ chép đáp án.

#### Bước 5. Thử phần mới khi đã đóng mẫu · 25 phút

[Writing · Luận điểm và lập luận](https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/)

1. Trong bảng Point/Explanation 14370, chọn dòng chưa dùng ở buổi luyện luận điểm. Chỉ đọc Point rồi đóng phần lời giải.
2. Tự viết 3–4 câu để giải thích ý mới và áp dụng quy tắc ngữ pháp vừa sửa. Mở lại phân tích để đối chiếu sau khi viết.
3. Gom một bản nói gốc hai buổi luyện Nói và đoạn viết gốc hôm nay để gửi người chấm mình chọn. Mở tab Người chấm để ghi ngày dự kiến; chưa có người thì giữ chờ phản hồi.

Nộp: Mã câu hỏi/ví dụ mới, sản phẩm tự làm và hai chỗ đã tự đối chiếu.

- Có 3–4 câu của ý mới sau khi đóng mẫu.
- Đã kiểm lại nhóm lỗi ưu tiên và quan hệ lý do–ý chính.
- Có danh sách bản nói/viết và hai câu hỏi muốn người chấm trả lời.

#### Bước 6. Chốt hôm nay và giữ việc cần ôn · 10 phút



1. Ghi một điều đã làm được bằng bài mới và một lỗi cần quay lại. Không cần học thêm cho đủ số từ.
2. Bấm lưu; lần sau app mở lại bước chưa xong. Sau 7 ngày có mục kiểm lại bằng phần chưa làm trong Study4.
3. Nếu hết 120 phút trước khi hoàn tất, dừng và lưu nháp; lần sau tiếp tục cùng buổi.
4. Nếu là Nói/Viết, hoàn tất bước học vẫn cần giữ phản hồi và sản phẩm sửa ở mục Người chữa của buổi mới được ghi nhận đạt mốc luyện. Không chặn học kỹ năng khác.

Nộp: Điều đã làm được → lỗi còn lại → cách kiểm lại.

- Đã lưu bài gốc và phần sửa hoặc nơi lưu chúng.
- Biết lỗi ưu tiên và việc kiểm lại, không tự gán band từ bài ngắn.

## Phạm vi hiện tại và phần chưa tự động

Chặng đầu tám buổi được biên soạn thành từng bước; khung 32 buổi cũ vẫn là bản tham khảo, chưa phải tất cả đều có mức chỉ dẫn và cá nhân hóa tương đương. Chọn nội dung sau chặng đầu cần dựa vào bài làm thực tế, không nhân cùng checklist ra cả khóa.

Danh mục có tên khóa/module/bài, URL/ID và ngày đối chiếu. Đây là snapshot đã kiểm tra, chưa phải đồng bộ tự động toàn bộ lịch sử học Study4. App không biết chắc tất cả phần nào đã gặp; vì vậy có bước ghi nguồn/phạm vi và xác nhận chưa biết đáp án. So trùng hiện tại dùng chuỗi nguồn đã nhập chuẩn hóa, chưa nhận diện mọi cách viết khác nhau của cùng đề.

Chưa có planner tự đọc lịch NEU/DATAAAA, ghi phút học thực tự động, báo cáo tuần/tháng tự chạy, hay tự đặt/gửi bài cho giáo viên. Tiến độ guide lưu riêng với roadmap cũ, flashcard và tiến độ Study4; không tự tick hoàn thành khóa. JSON xuất để sao lưu chưa có giao diện nhập khôi phục.

## Kiểm tra

101 kiểm tra mới về nguồn Study4, tải học, khóa bước, hai kết quả mới liên tiếp, ba lần chưa đạt, điều kiện người chữa/bản sửa, kiểm lại bảy ngày, giữ nháp khi DB lỗi và AI không tự xác nhận tiến độ. Các bộ 103 + 91 + 169 kiểm tra cũ tiếp tục qua. Đây là kiểm tra phần mềm, không chứng minh tăng band.
