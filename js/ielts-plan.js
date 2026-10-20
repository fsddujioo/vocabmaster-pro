(function(r,f){if(typeof module==='object'&&module.exports)module.exports=f();else r.VMIELTSPlan=f();})(typeof window==='undefined'?globalThis:window,()=>({
  "version": 1,
  "id": "ielts-academic-65",
  "checkedAt": "2026-10-20",
  "title": "Từng bước tới IELTS 6.5",
  "baseline": {
    "label": "Mốc m tự báo ngày 20/10/2026, chưa có ngày thi hoặc phiếu chấm để đối chiếu",
    "reading": "≈5.0",
    "listening": "≈4.0–4.5",
    "writing": "≈4.5",
    "speaking": "≈5.0"
  },
  "target": "Overall 6.5 · mỗi kỹ năng ≥6.0",
  "strategy": "Điều kiện của cả Mock A và B: overall ≥6.5, từng kỹ năng ≥6.0. L/R khoảng 7.0 là mục tiêu đệm để giảm áp lực W/S, không phải ngưỡng bắt buộc riêng. Band L/R lấy từ bảng của đúng đề; không tự đổi một mốc raw cố định thành band.",
  "stages": [
    {
      "id": "start",
      "title": "1 · Chốt điểm xuất phát",
      "goal": "Dùng mốc tự báo để chọn độ khó; ghi bằng chứng ban đầu, chưa gán band mới."
    },
    {
      "id": "foundation",
      "title": "2 · Nghe rõ, diễn đạt rõ",
      "goal": "Tăng độ chính xác của nghe điền từ; từ câu đơn đúng đến đoạn có lý do và ví dụ."
    },
    {
      "id": "formats",
      "title": "3 · Đi từng dạng bài",
      "goal": "Luyện từng nhóm câu hỏi; tăng dần độ dài nói và viết. Dạng chưa đạt phải luyện tiếp bằng bài mới."
    },
    {
      "id": "combine",
      "title": "4 · Ghép kỹ năng, tăng áp lực thời gian",
      "goal": "Phủ các dạng còn lại; chuyển từ đoạn/part sang bài đầy đủ, giữ vòng sửa lỗi."
    },
    {
      "id": "mock",
      "title": "5 · Kiểm tra bằng đề mới",
      "goal": "Đối chiếu hai bộ mock mới và phản hồi người chấm. Chưa đạt thì quay lại điểm yếu, không đặt hạn thi tự động."
    }
  ],
  "sessions": [
    {
      "id": "s01",
      "stage": "start",
      "title": "Chốt lỗi nghe + bản nói đầu tiên",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "IELTS Collection 1 Listening Test 2 · Recording 1 · part 18963",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        {
          "label": "Test 3 · Recording 1 · part 18967",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        {
          "label": "Tổng quan bài thi IELTS LISTENING · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19548/"
        },
        {
          "label": "L · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/units/348/"
        },
        {
          "label": "Tổng quan về IELTS Speaking · Các tiêu chí chấm điểm",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14609/"
        }
      ],
      "steps": [
        {
          "title": "Nền tảng nhẹ",
          "minutes": 20,
          "text": "5 phút nghe chép một đoạn cũ, 15 phút thử cụm/ngữ pháp để tìm chỗ yếu. Không dùng đoạn đã nghe để tính điểm đầu vào."
        },
        {
          "title": "Nghe đầu vào",
          "minutes": 25,
          "text": "Chọn 10 câu Part 1 chưa từng làm, nghe 1x một lượt. Sau đó tự trả lời 3 câu Part 1 quen thuộc (study, hometown, hobbies), lưu bản thu ngoài roadmap; không học thuộc mẫu."
        },
        {
          "title": "Phân tích và lưu mốc",
          "minutes": 45,
          "text": "Đối chiếu đáp án, phân lỗi: không nhận ra âm / không biết cụm / lỡ vị trí / chính tả. Nghe lại bản nói và ghi 2 chỗ bí ý hoặc ngập ngừng; chưa cần chấm band."
        },
        {
          "title": "Checkpoint",
          "minutes": 20,
          "text": "Ghi bằng chứng, 2 nguyên nhân sai và 3 cụm muốn dùng lại. Không cần đạt ngưỡng đúng ở buổi chẩn đoán."
        }
      ],
      "checks": [
        "Đã ghi tên bài, số câu và số đúng ở lượt đầu.",
        "Đã nghe lại bản nói của chính mình và chỉ ra 2 chỗ muốn sửa.",
        "Đã chọn 3 cụm hữu ích từ chính bài, giữ cả câu nguồn."
      ],
      "fields": [
        {
          "key": "correct",
          "label": "Số câu nghe đúng ở lượt đầu /10 (chỉ chẩn đoán)",
          "max": 10,
          "pass": null,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": true,
      "human": false,
      "assignment": {
        "session": "s01",
        "primary": {
          "label": "IELTS Collection 1 Listening Test 2 · Recording 1 · part 18963",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "backup": {
          "label": "Test 3 · Recording 1 · part 18967",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "task": "Làm 10 câu lượt đầu. Trong Practice Zone chọn đúng tên/part, không bấm Hoàn thành bài học chỉ để đi tiếp. Speaking: What do you study? Why did you choose it? What do you do in your free time? (câu hỏi luyện tự soạn).",
        "foundation": "Gói 01 (3–5 cụm); chẩn đoán nhóm 1, có thể chia nhỏ."
      }
    },
    {
      "id": "s02",
      "stage": "start",
      "title": "Đọc một passage, tìm nguyên nhân sai",
      "pair": "R",
      "minutes": 110,
      "links": [
        {
          "label": "IELTS Collection 1 Reading Test 1 · Passage 1 · part 18929",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        {
          "label": "Test 2 · Passage 1 · part 18932",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        {
          "label": "Tổng quan bài thi IELTS READING ACADEMIC · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/19539/"
        },
        {
          "label": "R · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/units/347/"
        }
      ],
      "steps": [
        {
          "title": "Nền tảng nhẹ",
          "minutes": 20,
          "text": "5 phút nghe chép một đoạn cũ, 15 phút thử cụm/ngữ pháp để tìm chỗ yếu. Không dùng đoạn đã nghe để tính điểm đầu vào."
        },
        {
          "title": "Đọc lượt đầu",
          "minutes": 20,
          "text": "Chọn một passage mới, thử 20 phút không tra từ. Ghi số câu đã làm/đúng, không xem một passage thành band Reading."
        },
        {
          "title": "Tự chữa và tìm chứng cứ",
          "minutes": 50,
          "text": "Làm lại câu sai trước khi xem giải thích. Đánh dấu dòng chứng cứ, cặp paraphrase và lý do loại lựa chọn sai; chọn 3 câu để giải thích bằng lời của mình."
        },
        {
          "title": "Checkpoint",
          "minutes": 20,
          "text": "Giải thích 3 câu, chọn 2 lỗi ưu tiên. Không dùng điểm một passage làm band."
        }
      ],
      "checks": [
        "Đã lưu mã passage và tỉ lệ đúng ban đầu trong bằng chứng.",
        "Có dòng chứng cứ và giải thích cho 3 câu sai/khó (nếu không sai, chọn 3 câu khó).",
        "Đã phân biệt thiếu từ vựng với hiểu sai câu hỏi hoặc thiếu thời gian."
      ],
      "fields": [],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": true,
      "human": false,
      "assignment": {
        "session": "s02",
        "primary": {
          "label": "IELTS Collection 1 Reading Test 1 · Passage 1 · part 18929",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "backup": {
          "label": "Test 2 · Passage 1 · part 18932",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "task": "Một passage 20 phút, ghi đúng/tổng và ba dòng chứng cứ. Không đổi điểm một passage ra band.",
        "foundation": "Ôn gói 01, bắt đầu gói 02; sửa câu chủ–vị."
      }
    },
    {
      "id": "s03",
      "stage": "start",
      "title": "Viết đoạn đầu vào, chọn lỗi diễn đạt",
      "pair": "W",
      "minutes": 110,
      "links": [
        {
          "label": "Writing · Luận điểm và lập luận · 14370",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/"
        },
        {
          "label": "Writing · Opinion · 14383",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14383/"
        },
        {
          "label": "Giới thiệu Writing Task 2 · Giới thiệu",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14369/"
        },
        {
          "label": "Luận điểm và cách triển khai luận điểm · Luận điểm và Lập luận",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/"
        },
        {
          "label": "Các tiêu chí chấm điểm · Tiêu chí chấm điểm TA",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14349/"
        }
      ],
      "steps": [
        {
          "title": "Nền tảng nhẹ",
          "minutes": 20,
          "text": "5 phút nghe chép một đoạn cũ, 15 phút thử cụm/ngữ pháp để tìm chỗ yếu. Không dùng đoạn đã nghe để tính điểm đầu vào."
        },
        {
          "title": "Viết trước mẫu",
          "minutes": 30,
          "text": "Chọn một đề Task 2 mới từ Study4. Viết dàn ý và một đoạn thân bài 80–100 từ, không xem mẫu. Nếu đã có bài chấm gần đây, dùng bản gốc để đối chiếu thay vì viết lại chỉ để lấy điểm."
        },
        {
          "title": "Đối chiếu và sửa",
          "minutes": 45,
          "text": "Đọc hướng dẫn về luận điểm và ví dụ, xin phản hồi nếu có. Gạch chân câu chủ đề, lý do, ví dụ và chỗ bí cách diễn đạt; tự viết lại 3 câu khó theo cách đơn giản hơn."
        },
        {
          "title": "Checkpoint",
          "minutes": 15,
          "text": "Lưu hai phiên bản và hai lỗi ưu tiên. Chưa cần bài văn phức tạp."
        }
      ],
      "checks": [
        "Đã giữ bản trước sửa và bản sửa, hoặc ghi tên file của cả hai.",
        "Đã chọn đúng 2 lỗi ưu tiên: một lỗi câu/ngữ pháp và một lỗi triển khai ý.",
        "Đã ghi nhận điểm tự báo: R≈5.0, L≈4.0–4.5, W≈4.5, S≈5.0; chưa gọi là điểm mới."
      ],
      "fields": [],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": true,
      "human": false,
      "assignment": {
        "session": "s03",
        "primary": {
          "label": "Writing · Luận điểm và lập luận · 14370",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/"
        },
        "backup": {
          "label": "Writing · Opinion · 14383",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14383/"
        },
        "task": "Đề luyện tự soạn: Universities should provide more practical training than theoretical knowledge. To what extent do you agree? Viết một đoạn 80–100 từ trước khi mở mẫu; chưa chấm band cả Writing từ đoạn này.",
        "foundation": "Ôn cụm đang đến hạn; nhóm 1 viết 5 câu, không ép hoàn tất nếu thiếu thời gian."
      }
    },
    {
      "id": "s04",
      "stage": "foundation",
      "title": "Số, chữ cái và câu trả lời Part 1",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "Dictation · Numbers and letters · 5418",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5418/"
        },
        {
          "label": "Dictation · Address · 5420",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5420/"
        },
        {
          "label": "Listening skill: Numbers and letters · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19551/"
        },
        {
          "label": "Hướng dẫn trả lời Part 1 · Introductory questions",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14611/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Nghe 10 đáp án số, tên hoặc địa chỉ từ bài mới. Trước nghe dự đoán loại đáp án. Tự trả lời 3 câu hỏi giới thiệu bản thân bằng 2–3 câu có liên quan."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Chép lại 2 đoạn âm ngắn bị lỡ, so transcript rồi nghe lại không chữ. Với câu nói: trả lời thẳng → lý do → một chi tiết thật; thu lại, không đọc thuộc mẫu."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Đã phân biệt lỗi nghe với lỗi viết tên/số.",
        "Ba câu trả lời đều vào thẳng câu hỏi, có ít nhất một lý do hoặc chi tiết.",
        "Đã dùng 2 cụm trong câu mới của bản thân, kiểm tra giới từ và kết hợp từ."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng /10 mục dictation mới (ghi vị trí mục, không quy thành band)",
          "max": 10,
          "pass": 6,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "assignment": {
        "session": "s04",
        "primary": {
          "label": "Dictation · Numbers and letters · 5418",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5418/"
        },
        "backup": {
          "label": "Dictation · Address · 5420",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5420/"
        },
        "task": "10 mục chưa nghe trong nhóm, ghi vị trí mục để lần sau lấy mục khác. Speaking ba câu mới về lịch học, địa chỉ, kế hoạch cuối tuần; chuyển số/tên vào câu thật.",
        "foundation": "Gói 03; chẩn đoán nhóm 2 theo lỗi thì."
      }
    },
    {
      "id": "s05",
      "stage": "foundation",
      "title": "Đọc ý chính + viết câu rõ nghĩa",
      "pair": "R + W",
      "minutes": 110,
      "links": [
        {
          "label": "IELTS Collection 1 Reading Test 2 · Passage 1 · part 18932",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        {
          "label": "Test 2 · Passage 2 · part 18933",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        {
          "label": "Reading skill: Skimming · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/19540/"
        },
        {
          "label": "Reading skill: Scanning · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/19541/"
        },
        {
          "label": "Các lỗi về Grammatical Range and Accuracy · Các lỗi về GRA",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14381/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Đọc một passage: ghi ý chính từng đoạn trước khi tìm chi tiết. Chọn 5 ý đơn giản về education/work, tự viết mỗi ý thành một câu đúng chủ–vị, không dịch từng chữ."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Đối chiếu đoạn và sửa 5 câu: thì, chủ–vị, mạo từ, số ít/nhiều. Dùng câu đơn đúng trước, chỉ nối câu khi mối quan hệ ý rõ ràng."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Có ý chính viết lại bằng lời mình cho ít nhất 3 đoạn.",
        "Năm câu diễn đạt được ý muốn nói, đã tự kiểm tra chủ–vị/thì.",
        "Đã giữ ít nhất 2 cặp câu trước → sau sửa và giải thích cách sửa."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "assignment": {
        "session": "s05",
        "primary": {
          "label": "IELTS Collection 1 Reading Test 2 · Passage 1 · part 18932",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "backup": {
          "label": "Test 2 · Passage 2 · part 18933",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "task": "Bỏ qua bài đã dùng ở s02. Viết ý chính ít nhất ba đoạn và 5 câu education/work; giữ hai cặp câu trước/sau sửa.",
        "foundation": "Ôn 01–03, gói 04 khi không quá tải; sửa nhóm 2."
      }
    },
    {
      "id": "s06",
      "stage": "foundation",
      "title": "Dự đoán + paraphrase, nói có lý do",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "IELTS Collection 1 Listening Test 1 · Recording 2 · part 18960",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        {
          "label": "Test 2 · Recording 2 · part 18964",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        {
          "label": "Listening skill: Identifying paraphrase · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19549/"
        },
        {
          "label": "Listening skill: Predicting · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19550/"
        },
        {
          "label": "Hướng dẫn trả lời Part 1 · Liking/disliking questions",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14612/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm 10 câu mới trong Recording của hàng chờ, ghi loại câu hỏi thực tế và dự đoán loại đáp án trước khi nghe 1x. Với 3 câu hỏi likes/dislikes, trả lời ý chính, lý do và ví dụ thật."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Tìm 3 cặp diễn đạt khác nhau giữa câu hỏi và audio. Chỉ shadowing 2–3 câu khó rồi đóng mẫu, tự trả lời câu hỏi mới bằng ý của mình."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Có 3 cặp paraphrase từ câu hỏi và audio.",
        "Mỗi câu trả lời nói có ý chính và lý do, không chỉ liệt kê từ.",
        "Đã thử một câu hỏi mới sau khi đóng bài mẫu."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng /10 mục nghe mới đã chọn (ghi dạng bài trong nguồn)",
          "max": 10,
          "pass": 6,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "assignment": {
        "session": "s06",
        "primary": {
          "label": "IELTS Collection 1 Listening Test 1 · Recording 2 · part 18960",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "backup": {
          "label": "Test 2 · Recording 2 · part 18964",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "task": "Làm 10 câu mới trong Recording đã chọn, ghi dạng câu thực tế; đây là luyện dự đoán/paraphrase, không khẳng định tất cả là completion. Tìm 3 cặp diễn đạt giữa câu hỏi và audio. Nếu bài dự phòng đã dùng, chọn mục còn mới và ghi mã. Speaking likes/dislikes: ba câu tự soạn về môn học, đi lại, đọc sách.",
        "foundation": "Ôn đến hạn; gói 05; nhóm 3 đếm được/số nhiều."
      }
    },
    {
      "id": "s07",
      "stage": "foundation",
      "title": "Điền từ khi đọc + đoạn thân bài đầu tiên",
      "pair": "R + W",
      "minutes": 110,
      "links": [
        {
          "label": "IELTS Collection 1 Reading Test 1 · Passage 2 · part 18930 · có Summary Completion",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        {
          "label": "Test 3 · Passage 2 · part 18936 · có Summary Completion",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        {
          "label": "Question type: Summary/Note/Table/Flow-chart Completion · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/5099/"
        },
        {
          "label": "Reading skill: Predicting answers · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/19544/"
        },
        {
          "label": "Luận điểm và cách triển khai luận điểm · Luận điểm và Lập luận",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Dùng passage có Summary Completion trong hàng chờ. Tự làm 10 câu đầu chưa làm trong toàn passage để ghi chỉ số /10; ghi riêng số câu completion và vị trí chứng cứ, không gọi cả 10 là completion. Viết đoạn 80–100 từ: ý chính → giải thích → ví dụ → liên hệ."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Tìm chứng cứ cho đáp án, sửa lỗi số ít/nhiều. Đối chiếu đoạn viết với hướng dẫn Study4; bỏ câu lạc ý và viết lại chỗ giải thích quá chung."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Có chứng cứ cho 10 câu đã làm; ghi riêng kết quả nhóm completion trong bằng chứng.",
        "Đoạn có một ý chính, giải thích và ví dụ thực sự hỗ trợ ý đó.",
        "Đã sửa ít nhất 2 câu khó hiểu; ưu tiên nghĩa đúng thay vì thay từ cho sang."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng lượt đầu /10 câu đầu passage mới (hỗn hợp; tách completion trong ghi chú)",
          "max": 10,
          "pass": 6,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "assignment": {
        "session": "s07",
        "primary": {
          "label": "IELTS Collection 1 Reading Test 1 · Passage 2 · part 18930 · có Summary Completion",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "backup": {
          "label": "Test 3 · Passage 2 · part 18936 · có Summary Completion",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "task": "Làm 10 câu đầu passage mới, tách nhóm completion trong ghi chú. Đoạn luyện tự soạn 80–100 từ: giải thích một lợi ích của việc học cùng người khác, có ví dụ thật. Không dùng lại passage đã làm.",
        "foundation": "Ôn cụm đủ 7 ngày khi đến hạn; gói 06; luyện nhóm 3."
      }
    },
    {
      "id": "s08",
      "stage": "foundation",
      "title": "Nghe bẫy đổi ý + nói theo cụm ý",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "IELTS Collection 1 Listening Test 3 · Recording 1 · part 18967",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        {
          "label": "Test 3 · Recording 2 · part 18968",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        {
          "label": "Listening · Identifying distractors · 19552",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19552/"
        },
        {
          "label": "Listening skill: Identifying distractors · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19552/"
        },
        {
          "label": "Speaking · Thought groups / nhịp điệu",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/units/158/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm 10 câu nghe mới trong Recording đã chọn; sau khi chấm, đánh dấu nơi người nói sửa hoặc đổi thông tin. Nếu bài không có đủ hai ví dụ, phân tích thêm ví dụ của bài giảng 19552, ghi rõ đâu là ví dụ lý thuyết. Nói 45–60 giây về một thói quen: ý chính → lý do → ví dụ."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Chép 2 đoạn có bẫy, giải thích vì sao đáp án đầu tiên bị loại. Ghi dấu ngắt theo ý trong 3 câu nói, đọc một lượt rồi đóng chữ và nói lại."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Giải thích được ít nhất 2 bẫy đổi ý từ bài nghe.",
        "Bản nói có các cụm ý dễ theo dõi, không đọc từng từ rời.",
        "Đã nghe bản thu và sửa 2 lỗi khiến người nghe khó hiểu."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng /10 câu đầu Recording mới đã chọn",
          "max": 10,
          "pass": 6,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "assignment": {
        "session": "s08",
        "primary": {
          "label": "IELTS Collection 1 Listening Test 3 · Recording 1 · part 18967",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "backup": {
          "label": "Test 3 · Recording 2 · part 18968",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "task": "10 câu nghe mới, sau đó học Identifying distractors 19552. Chỉ ra hai bẫy đổi ý trong bài nghe hoặc ví dụ bài giảng, ghi rõ nguồn từng ví dụ. Nếu s01 đã dùng Recording 1 Test 3 thì chuyển sang bài dự phòng. Nói 45–60 giây về thói quen học; gom bản gốc S/W cho người chấm.",
        "foundation": "Ôn đến hạn; gói 07 nếu còn sức; chọn nhóm 4 hoặc sửa nhóm yếu. 100 cụm không phải chỉ tiêu hai tuần."
      }
    },
    {
      "id": "s09",
      "stage": "foundation",
      "title": "Paraphrase đọc + overview Task 1",
      "pair": "R + W",
      "minutes": 110,
      "links": [
        {
          "label": "Reading skill: Identifying keywords · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/19542/"
        },
        {
          "label": "Reading skill: Identifying paraphrase · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/19543/"
        },
        {
          "label": "Dạng bài Graph with a Trend · Trend Graph: Introduction & Overview",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14356/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm 10 câu đọc mới và ghi 3 cặp paraphrase. Với một line graph mới, chỉ viết introduction và overview; nêu đặc điểm chính, chưa sa vào mọi số liệu."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "So với mẫu sau khi đã viết. Kiểm tra overview có xu hướng lớn và so sánh nổi bật, không bịa nguyên nhân; viết lại bằng câu đơn rõ."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Có 3 cặp paraphrase có ngữ cảnh, không thay đồng nghĩa máy móc.",
        "Overview nêu ít nhất 2 đặc điểm chính đúng biểu đồ.",
        "Đã ôn lại 2 lỗi viết và 2 lỗi nghe ưu tiên từ buổi đầu."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 6,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s10",
      "stage": "formats",
      "title": "Completion Part 1–2 + Part 1 đề mới",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "Question type: Form Note Table Flowchart Summary completion · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5078/"
        },
        {
          "label": "L · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/units/348/"
        },
        {
          "label": "Hướng dẫn trả lời Part 1 · Frequency questions",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14613/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm 10 câu form/note/table completion mới. Tự trả lời 4 câu Part 1 khác chủ đề đã luyện, mỗi câu 2–4 câu tiếng Anh."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Chữa chính tả và từ loại; nghe lại đúng đoạn có đáp án. Chọn 2 câu nói còn vòng vo, viết ý ngắn rồi thu lại tự nhiên."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Không vượt giới hạn từ và không bỏ qua đuôi số nhiều.",
        "Bốn câu nói đều trả lời đúng trọng tâm và có mở rộng phù hợp.",
        "Đã chuyển 2 cụm đã học sang chủ đề mới."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s11",
      "stage": "formats",
      "title": "T/F/NG + đoạn Opinion",
      "pair": "R + W",
      "minutes": 110,
      "links": [
        {
          "label": "Question type: True/False/Not Given & Yes/No/Not Given · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/5098/"
        },
        {
          "label": "Dạng bài Opinion · Opinion",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14383/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm 10 câu T/F/NG hoặc Y/N/NG mới. Trước chọn đáp án, ghi điều đề khẳng định và chứng cứ đủ/thiếu. Viết một đoạn opinion 90–110 từ."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Giải thích khác nhau giữa mâu thuẫn và không có thông tin. Sửa đoạn opinion để lập trường, lý do và ví dụ thống nhất."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Có chứng cứ hoặc ghi rõ thông tin còn thiếu cho từng câu.",
        "Không dùng kiến thức ngoài bài để chọn True/False.",
        "Đoạn opinion có một lập trường rõ và ví dụ hỗ trợ."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s12",
      "stage": "formats",
      "title": "Map/plan + kể về một nơi",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "Question type: Map/ Plan/ Diagram labelling · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5081/"
        },
        {
          "label": "Hướng dẫn trả lời Part 2 · Describe a place",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14627/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm 10 câu map/plan mới: xác định điểm xuất phát, hướng nhìn, mốc. Chuẩn bị 1 phút và nói 1–2 phút về một nơi thật."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Vẽ đường đi theo audio, so chỗ lỡ chỉ hướng. Nghe lại bản nói, thay đoạn liệt kê tính từ bằng một chi tiết/câu chuyện cụ thể."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Có đường đi/mốc dẫn tới đáp án, không đoán theo vị trí hình.",
        "Bài nói có bối cảnh, chi tiết và cảm nhận; không nhồi cụm học thuộc.",
        "Đã nói lại với một địa điểm khác mà không nhìn bài mẫu."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s13",
      "stage": "formats",
      "title": "Reading MCQ + Opinion bài đầy đủ",
      "pair": "R + W",
      "minutes": 180,
      "links": [
        {
          "label": "Question type: Multiple choice question · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/5102/"
        },
        {
          "label": "Dạng bài Opinion · Opinion",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14383/"
        }
      ],
      "steps": [
        {
          "title": "Phiên A · nền tảng",
          "minutes": 25,
          "text": "5 phút nghe chép đoạn đã học, 20 phút cụm/ngữ pháp. Không cộng thành bài thêm ngoài quỹ phiên A."
        },
        {
          "title": "Phiên A · Reading",
          "minutes": 30,
          "text": "Làm 10 câu MCQ mới; với mỗi câu chỉ ra vì sao lựa chọn nhiễu sai. "
        },
        {
          "title": "Phiên A · chữa và chuyển giao",
          "minutes": 35,
          "text": "Tìm chứng cứ, sửa dạng sai và làm vài câu mới để đối chiếu."
        },
        {
          "title": "Phiên B · nền tảng",
          "minutes": 20,
          "text": "5 phút nghe chép, 15 phút cụm/ngữ pháp; dùng lỗi của phiên A. Tất cả nằm trong 90 phút phiên B."
        },
        {
          "title": "Phiên B · dàn ý và viết",
          "minutes": 50,
          "text": "Viết một Task 2 opinion ít nhất 250 từ, chưa ép 40 phút nếu còn khó."
        },
        {
          "title": "Phiên B · nhận chữa và checkpoint",
          "minutes": 20,
          "text": "Nhận chữa và viết lại đoạn yếu nhất, không chép cả bài mẫu. Ghi lại thời gian thật; tăng tốc sau khi đã rõ ý và bám đề."
        }
      ],
      "checks": [
        "Mỗi đáp án MCQ có chứng cứ trong bài.",
        "Task 2 có lập trường xuyên suốt và hai ý được giải thích đủ.",
        "Có bản viết lại và 2 lỗi ưu tiên cho lượt sau."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "splitNote": "Chia hai phiên 90–120 phút: phiên A làm và chữa Reading; phiên B lập dàn ý, viết và sửa Task 2. Chỉ ghi checkpoint khi đã đủ cả hai phiên."
    },
    {
      "id": "s14",
      "stage": "formats",
      "title": "Listening MCQ + giải thích Why",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "Question type: Multiple choice · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5083/"
        },
        {
          "label": "Hướng dẫn trả lời Part 3 · Why questions",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14636/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm 10 câu MCQ nghe mới; đọc ý nghĩa lựa chọn, không săn đúng một từ. Trả lời 3 câu Why Part 3: ý → nguyên nhân → ví dụ → hệ quả."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Nghe lại để loại bẫy và tóm tắt bằng lời mình. Thu lại một câu trả lời với ví dụ khác; kiểm tra mối quan hệ nguyên nhân–kết quả."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Giải thích được vì sao lựa chọn sai dù có từ xuất hiện trong audio.",
        "Ba câu Part 3 có lý do và ví dụ liên quan.",
        "Đã sửa một câu quá dài hoặc khó hiểu thành cách nói rõ hơn."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s15",
      "stage": "formats",
      "title": "Matching headings + Task 1 so sánh",
      "pair": "R + W",
      "minutes": 180,
      "links": [
        {
          "label": "Question type: Matching headings · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/5103/"
        },
        {
          "label": "Dạng bài Comparative graph · Comparative Graph",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14359/"
        }
      ],
      "steps": [
        {
          "title": "Phiên A · nền tảng và nghe chép",
          "minutes": 25,
          "text": "5 phút nghe chép một đoạn đã học, 20 phút ôn cụm/ngữ pháp. Giảm cụm mới nếu tồn nhiều thẻ."
        },
        {
          "title": "Phiên A · Reading",
          "minutes": 25,
          "text": "Làm 10 câu headings mới, tự viết ý chính một dòng trước khi so heading. "
        },
        {
          "title": "Phiên A · chữa và ghi mốc",
          "minutes": 40,
          "text": "So ý chính với chi tiết phụ để loại heading.  Ghi nguồn, điểm lượt đầu, chứng cứ và 1–2 nguyên nhân sai; lưu nháp."
        },
        {
          "title": "Phiên B · nền tảng và dàn ý",
          "minutes": 25,
          "text": "5 phút nghe chép; 15 phút ôn cụm/ngữ pháp; 5 phút dàn ý cho Task 1."
        },
        {
          "title": "Phiên B · Task 1 tự viết",
          "minutes": 30,
          "text": "Viết Task 1 comparative graph ít nhất 150 từ. Chưa cần ép tốc độ 20 phút khi đang học dạng."
        },
        {
          "title": "Phiên B · sửa và checkpoint",
          "minutes": 35,
          "text": "So ý chính với chi tiết phụ để loại heading. Sửa Task 1: chọn nhóm dữ liệu, overview và so sánh chính; kiểm tra số/đơn vị. Giữ bản trước/sau sửa; làm checkpoint khi có đủ sản phẩm của hai phiên."
        }
      ],
      "checks": [
        "Chọn heading theo ý bao quát thay vì một từ trùng.",
        "Task 1 có overview và các so sánh đúng số liệu.",
        "Có 2 câu so sánh do m tự viết và đã kiểm tra ngữ pháp."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "splitNote": "Hai phiên riêng, mỗi phiên 90 phút (có thể dùng thêm tối đa 30 phút để nghỉ/chữa). Phiên A Reading; phiên B Writing. Lưu nháp sau A; checkpoint buổi chỉ xác nhận sau cả hai. Không cộng nền tảng ngoài giờ."
    },
    {
      "id": "s16",
      "stage": "formats",
      "title": "Listening matching + kể người/trải nghiệm",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "Question type: Matching · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5080/"
        },
        {
          "label": "Hướng dẫn trả lời Part 2 · Describe a person",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14619/"
        },
        {
          "label": "Hướng dẫn trả lời Part 2 · Describe an experience",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14629/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm 10 câu matching mới, đọc quy tắc có được dùng lại lựa chọn không. Bốc một cue card người hoặc trải nghiệm, chuẩn bị 1 phút rồi nói 1–2 phút."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Đối chiếu quan hệ người–ý, ghi paraphrase thay vì chép từ đơn. Sửa trình tự câu chuyện; dùng quá khứ phù hợp và một chi tiết thật."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Đáp án matching đúng quy tắc lặp lựa chọn.",
        "Bài nói có trình tự rõ, đáp ứng cue card và có chi tiết cụ thể.",
        "Đã làm cue card thứ hai bằng dàn ý ngắn, không đọc nguyên bài."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s17",
      "stage": "formats",
      "title": "Matching information/features + Discussion",
      "pair": "R + W",
      "minutes": 180,
      "links": [
        {
          "label": "Question type: Matching Information · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/5097/"
        },
        {
          "label": "Question type: Matching features · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/5104/"
        },
        {
          "label": "Dạng bài Discussion · Discussion",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14387/"
        }
      ],
      "steps": [
        {
          "title": "Phiên A · nền tảng",
          "minutes": 25,
          "text": "5 phút nghe chép đoạn đã học, 20 phút cụm/ngữ pháp. Không cộng thành bài thêm ngoài quỹ phiên A."
        },
        {
          "title": "Phiên A · Reading",
          "minutes": 30,
          "text": "Làm tổng 10 câu information/features mới, theo dõi ai nói/đoạn nào. "
        },
        {
          "title": "Phiên A · chữa và chuyển giao",
          "minutes": 35,
          "text": "Tìm chứng cứ, sửa dạng sai và làm vài câu mới để đối chiếu."
        },
        {
          "title": "Phiên B · nền tảng",
          "minutes": 20,
          "text": "5 phút nghe chép, 15 phút cụm/ngữ pháp; dùng lỗi của phiên A. Tất cả nằm trong 90 phút phiên B."
        },
        {
          "title": "Phiên B · dàn ý và viết",
          "minutes": 50,
          "text": "Lập dàn ý rồi viết Task 2 discussion ít nhất 250 từ."
        },
        {
          "title": "Phiên B · nhận chữa và checkpoint",
          "minutes": 20,
          "text": "Phân biệt tìm một thông tin với tìm ý chính toàn đoạn. Nhận chữa bài viết: trình bày đủ hai phía và ý kiến riêng khi đề yêu cầu."
        }
      ],
      "checks": [
        "Có chứng cứ đúng chủ thể cho 10 đáp án.",
        "Bài viết không bỏ một phía của câu hỏi.",
        "Đã viết lại phần cân bằng hai quan điểm và giữ lập trường nhất quán."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "splitNote": "Chia hai phiên 90–120 phút: phiên A làm và chữa Reading; phiên B lập dàn ý, viết và sửa Task 2. Chỉ ghi checkpoint khi đã đủ cả hai phiên."
    },
    {
      "id": "s18",
      "stage": "formats",
      "title": "Notes Part 4 + ưu/nhược điểm khi nói",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "Listening skill: Signposting words · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19553/"
        },
        {
          "label": "Question type: Form Note Table Flowchart Summary completion · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5078/"
        },
        {
          "label": "Hướng dẫn trả lời Part 3 · Advantages & disadvantages",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14635/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm 10 câu notes Part 4 mới, đánh dấu signposting và dự đoán từ loại. Nói về 2 lợi ích và 1 hạn chế của một vấn đề quen thuộc."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Chia bài giảng thành cụm ý, chỉ chép ngắn phần lỡ. Sửa câu nói khái quát quá mức bằng ví dụ và điều kiện phù hợp."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Không mất toàn bộ phần sau khi lỡ một câu nghe.",
        "Có dấu mốc chuyển ý trong ghi chú nghe.",
        "Bài nói có so sánh/giải thích, không chỉ liệt kê pros/cons."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s19",
      "stage": "formats",
      "title": "Sentence endings/diagram + mixed charts",
      "pair": "R + W",
      "minutes": 180,
      "links": [
        {
          "label": "Question type: Matching sentence endings · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/5105/"
        },
        {
          "label": "Question type: Diagram labelling · Lý thuyết",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/5100/"
        },
        {
          "label": "Dạng bài Mixed Charts · Mixed Chart",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14361/"
        }
      ],
      "steps": [
        {
          "title": "Phiên A · nền tảng và nghe chép",
          "minutes": 25,
          "text": "5 phút nghe chép một đoạn đã học, 20 phút ôn cụm/ngữ pháp. Giảm cụm mới nếu tồn nhiều thẻ."
        },
        {
          "title": "Phiên A · Reading",
          "minutes": 25,
          "text": "Làm 10 câu sentence endings/diagram mới, kiểm tra nghĩa và ngữ pháp của câu ghép. "
        },
        {
          "title": "Phiên A · chữa và ghi mốc",
          "minutes": 40,
          "text": "Đối chiếu chứng cứ, không chọn chỉ vì câu ghép đúng ngữ pháp.  Ghi nguồn, điểm lượt đầu, chứng cứ và 1–2 nguyên nhân sai; lưu nháp."
        },
        {
          "title": "Phiên B · nền tảng và dàn ý",
          "minutes": 25,
          "text": "5 phút nghe chép; 15 phút ôn cụm/ngữ pháp; 5 phút dàn ý cho Task 1."
        },
        {
          "title": "Phiên B · Task 1 tự viết",
          "minutes": 30,
          "text": "Viết một Task 1 mixed charts ít nhất 150 từ. Chưa cần ép tốc độ 20 phút khi đang học dạng."
        },
        {
          "title": "Phiên B · sửa và checkpoint",
          "minutes": 35,
          "text": "Đối chiếu chứng cứ, không chọn chỉ vì câu ghép đúng ngữ pháp. Sửa overview bao quát cả hai phần hình, chọn so sánh có ý nghĩa. Giữ bản trước/sau sửa; làm checkpoint khi có đủ sản phẩm của hai phiên."
        }
      ],
      "checks": [
        "Mỗi đáp án ghép đúng cả ý lẫn cấu trúc câu.",
        "Task 1 mô tả được cả hai phần dữ liệu.",
        "Đã tự kiểm tra số liệu, đơn vị và mốc thời gian."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "splitNote": "Hai phiên riêng, mỗi phiên 90 phút (có thể dùng thêm tối đa 30 phút để nghỉ/chữa). Phiên A Reading; phiên B Writing. Lưu nháp sau A; checkpoint buổi chỉ xác nhận sau cả hai. Không cộng nền tảng ngoài giờ."
    },
    {
      "id": "s20",
      "stage": "combine",
      "title": "Part 3 hội thoại + câu hỏi nối tiếp",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "Listening skill: Identifying distractors · Lý thuyết",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/19552/"
        },
        {
          "label": "L · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/units/348/"
        },
        {
          "label": "Hướng dẫn trả lời Part 3 · Comparing questions",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14634/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm 10 câu Part 3 mới ở tốc độ 1x, một lượt. Nhờ người khác hỏi hoặc tự bốc 4 câu follow-up Part 3 chưa chuẩn bị."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Phân biệt các ý kiến/người nói và chỗ đổi quyết định. Sửa câu trả lời thiếu lý do; nói lại với ví dụ khác, không cố nhét từ hiếm."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Chỉ ra được người nói và paraphrase cho câu khó.",
        "Trả lời được câu hỏi nối tiếp, không quay về bài thuộc sẵn.",
        "Đã so hai bản nói và ghi rõ một điểm cải thiện cùng một điểm còn yếu."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s21",
      "stage": "combine",
      "title": "Reading hỗn hợp + Task 1 process",
      "pair": "R + W",
      "minutes": 180,
      "links": [
        {
          "label": "R · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/units/347/"
        },
        {
          "label": "Dạng bài Process · Natural Process",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14366/"
        }
      ],
      "steps": [
        {
          "title": "Phiên A · nền tảng và nghe chép",
          "minutes": 25,
          "text": "5 phút nghe chép một đoạn đã học, 20 phút ôn cụm/ngữ pháp. Giảm cụm mới nếu tồn nhiều thẻ."
        },
        {
          "title": "Phiên A · Reading",
          "minutes": 25,
          "text": "Làm một passage hỗn hợp mới trong khoảng 20 phút, chọn 10 câu làm chỉ số. "
        },
        {
          "title": "Phiên A · chữa và ghi mốc",
          "minutes": 40,
          "text": "Ghi dạng câu sai nhiều nhất.  Ghi nguồn, điểm lượt đầu, chứng cứ và 1–2 nguyên nhân sai; lưu nháp."
        },
        {
          "title": "Phiên B · nền tảng và dàn ý",
          "minutes": 25,
          "text": "5 phút nghe chép; 15 phút ôn cụm/ngữ pháp; 5 phút dàn ý cho Task 1."
        },
        {
          "title": "Phiên B · Task 1 tự viết",
          "minutes": 30,
          "text": "Viết process ít nhất 150 từ, ưu tiên thứ tự và động từ chính xác. Chưa cần ép tốc độ 20 phút khi đang học dạng."
        },
        {
          "title": "Phiên B · sửa và checkpoint",
          "minutes": 35,
          "text": "Ghi dạng câu sai nhiều nhất. Sửa process: overview các giai đoạn, đủ đầu–cuối; chỉ dùng bị động khi đúng với quá trình. Giữ bản trước/sau sửa; làm checkpoint khi có đủ sản phẩm của hai phiên."
        }
      ],
      "checks": [
        "Có thời gian và kết quả riêng từng dạng trong passage.",
        "Process có trình tự rõ, không bịa thêm bước.",
        "Có bản sửa động từ và kết nối các giai đoạn."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "splitNote": "Hai phiên riêng, mỗi phiên 90 phút (có thể dùng thêm tối đa 30 phút để nghỉ/chữa). Phiên A Reading; phiên B Writing. Lưu nháp sau A; checkpoint buổi chỉ xác nhận sau cả hai. Không cộng nền tảng ngoài giờ."
    },
    {
      "id": "s22",
      "stage": "combine",
      "title": "Listening Parts 1–2 + cue card mới",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "L · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/units/348/"
        },
        {
          "label": "Hướng dẫn trả lời Part 2 · Tổng quan Part 2",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14618/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm Parts 1–2 mới liên tục (20 câu), nghe một lượt. Bốc cue card chưa luyện, chuẩn bị 1 phút rồi nói 1–2 phút."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Chữa 3 nguyên nhân sai lớn nhất, chỉ giữ cụm có khả năng dùng lại. Nghe bản thu và sửa chỗ bí bằng câu đơn rõ nghĩa."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Không dừng/replay ở lượt kiểm tra.",
        "Đã thu cue card mới và không đọc mẫu.",
        "Đã sửa hai lỗi phát âm/ngữ pháp lặp lại."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Câu nghe đúng lượt đầu /20",
          "max": 20,
          "pass": 14,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s23",
      "stage": "combine",
      "title": "Reading hai passages + Task 1 map",
      "pair": "R + W",
      "minutes": 180,
      "links": [
        {
          "label": "R · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/units/347/"
        },
        {
          "label": "Dạng bài Map · Map",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14367/"
        }
      ],
      "steps": [
        {
          "title": "Phiên A · nền tảng và nghe chép",
          "minutes": 25,
          "text": "5 phút nghe chép một đoạn đã học, 20 phút ôn cụm/ngữ pháp. Giảm cụm mới nếu tồn nhiều thẻ."
        },
        {
          "title": "Phiên A · Reading",
          "minutes": 40,
          "text": "Làm hai passages mới trong 40 phút; ghi số đúng/tổng thực tế trong bằng chứng. "
        },
        {
          "title": "Phiên A · chữa và ghi mốc",
          "minutes": 25,
          "text": "Phân tích chỗ phân bổ thời gian chưa hợp lý.  Ghi nguồn, điểm lượt đầu, chứng cứ và 1–2 nguyên nhân sai; lưu nháp."
        },
        {
          "title": "Phiên B · nền tảng và dàn ý",
          "minutes": 25,
          "text": "5 phút nghe chép; 15 phút ôn cụm/ngữ pháp; 5 phút dàn ý cho Task 1."
        },
        {
          "title": "Phiên B · Task 1 tự viết",
          "minutes": 30,
          "text": "Viết Task 1 map ít nhất 150 từ, khoảng 20 phút nếu đã sẵn sàng. Chưa cần ép tốc độ 20 phút khi đang học dạng."
        },
        {
          "title": "Phiên B · sửa và checkpoint",
          "minutes": 35,
          "text": "Phân tích chỗ phân bổ thời gian chưa hợp lý. Sửa map: thay đổi chính, vị trí và thì; không thêm nguyên nhân không có trong hình. Giữ bản trước/sau sửa; làm checkpoint khi có đủ sản phẩm của hai phiên."
        }
      ],
      "checks": [
        "Có thời gian và tỉ lệ đúng thực tế của từng passage.",
        "Task 1 map nêu được thay đổi chính và vị trí rõ.",
        "Đã làm 5 câu mới cùng dạng yếu sau khi chữa, đúng ít nhất 4."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "transfer",
          "label": "Đúng trong 5 câu chuyển giao mới",
          "max": 5,
          "pass": 4,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "splitNote": "Hai phiên riêng, mỗi phiên 90 phút (có thể dùng thêm tối đa 30 phút để nghỉ/chữa). Phiên A Reading; phiên B Writing. Lưu nháp sau A; checkpoint buổi chỉ xác nhận sau cả hai. Không cộng nền tảng ngoài giờ."
    },
    {
      "id": "s24",
      "stage": "combine",
      "title": "Listening Parts 3–4 + Part 3 lập luận",
      "pair": "L + S",
      "minutes": 110,
      "links": [
        {
          "label": "L · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/units/348/"
        },
        {
          "label": "Hướng dẫn trả lời Part 3 · Prediction",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14638/"
        },
        {
          "label": "Hướng dẫn trả lời Part 3 · Effect",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/activities/14640/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Làm Parts 3–4 mới liên tục (20 câu). Trả lời 4 câu Part 3 về hệ quả, dự đoán hoặc quan điểm; giải thích và cho ví dụ."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Đối chiếu lỗi thiếu âm, từ vựng hay mất vị trí. Viết dàn ý 3 từ khóa rồi nói lại một câu trả lời, không đọc thành văn viết."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Có nguyên nhân cụ thể cho 3 câu nghe sai/khó.",
        "Mỗi câu nói có lập luận và ví dụ phù hợp, không khẳng định tuyệt đối vô căn cứ.",
        "Đã trả lời một follow-up mới sau khi sửa."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Câu nghe đúng lượt đầu /20",
          "max": 20,
          "pass": 13,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s25",
      "stage": "combine",
      "title": "Passage 3 + Advantages/Disadvantages",
      "pair": "R + W",
      "minutes": 180,
      "links": [
        {
          "label": "R · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/units/347/"
        },
        {
          "label": "Dạng bài Advantages/Disadvantages · Advantages & Disadvantages",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14389/"
        }
      ],
      "steps": [
        {
          "title": "Phiên A · nền tảng",
          "minutes": 25,
          "text": "5 phút nghe chép đoạn đã học, 20 phút cụm/ngữ pháp. Không cộng thành bài thêm ngoài quỹ phiên A."
        },
        {
          "title": "Phiên A · Reading",
          "minutes": 30,
          "text": "Làm passage 3 mới trong 20 phút, chọn 10 câu làm chỉ số. "
        },
        {
          "title": "Phiên A · chữa và chuyển giao",
          "minutes": 35,
          "text": "Tìm chứng cứ, sửa dạng sai và làm vài câu mới để đối chiếu."
        },
        {
          "title": "Phiên B · nền tảng",
          "minutes": 20,
          "text": "5 phút nghe chép, 15 phút cụm/ngữ pháp; dùng lỗi của phiên A. Tất cả nằm trong 90 phút phiên B."
        },
        {
          "title": "Phiên B · dàn ý và viết",
          "minutes": 50,
          "text": "Viết Task 2 advantages/disadvantages trong khoảng 40 phút, ít nhất 250 từ."
        },
        {
          "title": "Phiên B · nhận chữa và checkpoint",
          "minutes": 20,
          "text": "Chữa loại suy luận/paraphrase gây sai. So bài viết với đúng yêu cầu: nếu hỏi outweigh phải có đánh giá rõ; viết lại đoạn giải thích yếu."
        }
      ],
      "checks": [
        "Mỗi câu đọc khó có chứng cứ và lý do loại đáp án nhiễu.",
        "Task 2 trả lời đúng phiên bản đề đã chọn, không dùng một khuôn cho mọi đề.",
        "Có bản viết lại và nhật ký 2 lỗi ưu tiên."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 7,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "splitNote": "Chia hai phiên 90–120 phút: phiên A làm và chữa Reading; phiên B lập dàn ý, viết và sửa Task 2. Chỉ ghi checkpoint khi đã đủ cả hai phiên."
    },
    {
      "id": "s26",
      "stage": "combine",
      "title": "Listening full test + Speaking đủ 3 parts",
      "pair": "L + S",
      "minutes": 120,
      "links": [
        {
          "label": "L · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/units/348/"
        },
        {
          "label": "S · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/units/344/"
        }
      ],
      "steps": [
        {
          "title": "Nền tảng",
          "minutes": 25,
          "text": "5 phút nghe chép đoạn cũ, 20 phút ôn cụm/ngữ pháp; không xem trước đề sắp làm."
        },
        {
          "title": "Full Listening",
          "minutes": 40,
          "text": "Theo đúng hình thức máy/giấy dự định thi; chấm và ghi lượt đầu /40."
        },
        {
          "title": "Speaking đủ 3 parts",
          "minutes": 15,
          "text": "Câu hỏi mới; lưu bản thu 11–14 phút để nhận phản hồi."
        },
        {
          "title": "Phân tích và checkpoint",
          "minutes": 40,
          "text": "Ghi kết quả từng part, chọn hai nguyên nhân sai chính. Nghe bản nói, tự đối chiếu bốn tiêu chí và nhận chữa nếu có; điểm AI chỉ để tham khảo."
        }
      ],
      "checks": [
        "Listening là lượt đầu, không phụ đề/replay/tra từ.",
        "Speaking có đủ 3 parts; có bản thu để nghe lại.",
        "Đã chọn đúng 2 điểm cần sửa, có bài chuyển giao ở buổi sau."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Listening full: đúng /40",
          "max": 40,
          "pass": 27,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s27",
      "stage": "combine",
      "title": "Reading full test + Task 2 two-part",
      "pair": "R + W",
      "minutes": 120,
      "links": [
        {
          "label": "R · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/units/347/"
        },
        {
          "label": "Dạng bài Two-Part Question · Two-Part Question",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14390/"
        }
      ],
      "steps": [
        {
          "title": "Nền tảng",
          "minutes": 20,
          "text": "5 phút nghe chép đoạn cũ + 15 phút ôn cụm/ngữ pháp; không cộng thêm ngoài tổng 120 phút."
        },
        {
          "title": "Academic Reading",
          "minutes": 60,
          "text": "Làm full test mới 60 phút, không tra từ; ghi kết quả lượt đầu."
        },
        {
          "title": "Dàn ý two-part",
          "minutes": 20,
          "text": "Lập dàn ý trả lời hai câu hỏi và viết câu chủ đề cho từng vế. Phần viết hai đoạn đầy đủ chuyển sang phiên sau nếu cần."
        },
        {
          "title": "Chữa và checkpoint",
          "minutes": 20,
          "text": "Chọn lỗi đọc cần sửa, đối chiếu hai vế dàn ý và ghi bước tiếp theo."
        }
      ],
      "checks": [
        "Reading là full test mới và ghi đúng điều kiện làm bài.",
        "Dàn ý/đoạn trả lời đủ cả hai câu hỏi.",
        "Đã nhận xét thời gian và chọn 1 dạng yếu cần quay lại."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Academic Reading full: đúng /40",
          "max": 40,
          "pass": 27,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s28",
      "stage": "mock",
      "title": "Mock A · Listening + Speaking có phản hồi",
      "pair": "L + S",
      "minutes": 90,
      "links": [
        {
          "label": "L · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/units/348/"
        },
        {
          "label": "S · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/units/344/"
        },
        {
          "label": "IELTS · Speaking band descriptors",
          "url": "https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf",
          "use": "Bốn tiêu chí: trôi chảy và mạch lạc, từ vựng, ngữ pháp, phát âm."
        }
      ],
      "steps": [
        {
          "title": "Full Listening",
          "minutes": 40,
          "text": "Theo đúng hình thức máy/giấy dự định thi; chấm và ghi lượt đầu /40."
        },
        {
          "title": "Speaking đủ 3 parts",
          "minutes": 15,
          "text": "Câu hỏi mới; lưu bản thu 11–14 phút để nhận phản hồi."
        },
        {
          "title": "Phân tích và checkpoint",
          "minutes": 35,
          "text": "Nhận phản hồi Speaking từ giáo viên/người chấm có kinh nghiệm theo đủ bốn tiêu chí. Nếu chỉ có AI/tự chấm, lưu nháp và để chờ người chấm; không giả làm điểm xác nhận."
        }
      ],
      "checks": [
        "Đã dùng đề mới, đúng thời gian và không trợ giúp.",
        "Có phản hồi Speaking theo đủ 4 tiêu chí và nguồn người chấm.",
        "Đã lưu hai lỗi lớn nhất cùng cách luyện lại."
      ],
      "fields": [
        {
          "key": "correct",
          "label": "Listening A · số đúng /40 (ghi nhận, không áp raw cố định)",
          "max": 40,
          "pass": null,
          "integer": true
        },
        {
          "key": "listening",
          "label": "Listening A · band theo bảng của đúng đề",
          "max": 9,
          "pass": 6,
          "step": 0.5
        },
        {
          "key": "speaking",
          "label": "Speaking A · band người chấm phản hồi",
          "max": 9,
          "pass": 6,
          "step": 0.5
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": true,
      "scoreSource": true
    },
    {
      "id": "s29",
      "stage": "mock",
      "title": "Mock A · Academic Reading",
      "pair": "R",
      "minutes": 90,
      "links": [
        {
          "label": "R · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/units/347/"
        },
        {
          "label": "IELTS chính thức · cách tính điểm và tiêu chí 4 kỹ năng",
          "url": "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail",
          "use": "Overall là trung bình bốn kỹ năng, làm tròn theo quy tắc IELTS. Mốc khoảng 30/40 cho L và Academic R ở band 7 có thể thay đổi theo đề."
        }
      ],
      "steps": [
        {
          "title": "Academic Reading A",
          "minutes": 60,
          "text": "Làm full Academic Reading mới của bộ A trong 60 phút. Chấm theo đáp án và bảng quy đổi của đề, không lấy lại đề đã biết đáp án."
        },
        {
          "title": "Phân tích và checkpoint",
          "minutes": 30,
          "text": "Phân tích tỉ lệ đúng từng dạng, giữ 3 cặp paraphrase khó. Dùng ít nhất 5 câu mới để xác nhận đã sửa dạng yếu."
        }
      ],
      "checks": [
        "Đã ghi mã đề và đúng 60 phút, không tra từ.",
        "Điểm ghi là lượt đầu, không phải điểm sau chữa.",
        "Có kế hoạch sửa dạng yếu và kết quả chuyển giao mới."
      ],
      "fields": [
        {
          "key": "correct",
          "label": "Academic Reading A · số đúng /40 (ghi nhận)",
          "max": 40,
          "pass": null,
          "integer": true
        },
        {
          "key": "reading",
          "label": "Academic Reading A · band theo bảng của đúng đề",
          "max": 9,
          "pass": 6,
          "step": 0.5
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false,
      "scoreSource": true
    },
    {
      "id": "s30",
      "stage": "mock",
      "title": "Mock A · Writing đủ hai tasks",
      "pair": "W",
      "minutes": 90,
      "links": [
        {
          "label": "W · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/units/345/"
        },
        {
          "label": "IELTS · Writing band descriptors và tiêu chí",
          "url": "https://ielts.org/news-and-insights/ielts-writing-band-descriptors-and-key-assessment-criteria",
          "use": "Đúng yêu cầu đề; mạch lạc; từ vựng; ngữ pháp. Task 2 có trọng số lớn hơn Task 1."
        }
      ],
      "steps": [
        {
          "title": "Writing A",
          "minutes": 60,
          "text": "Viết Task 1 và Task 2 mới trong cùng 60 phút, thường chia khoảng 20/40 phút; ít nhất 150/250 từ. Để nguyên bản gốc trước khi sửa."
        },
        {
          "title": "Nhận chữa và checkpoint",
          "minutes": 30,
          "text": "Nhận chữa theo bốn tiêu chí, giữ đoạn gốc và viết lại đoạn yếu nhất. Ghi điểm Writing cho cả bài hai tasks từ người chấm. App ghép band ở 28–30 để kiểm tra overall A; chưa đủ thì sửa kỹ năng yếu ở buổi 31 và kiểm lại bằng đề mới, cập nhật cùng bộ A. Phản hồi có thể đến sau ngày làm bài."
        }
      ],
      "checks": [
        "Đã giữ cả hai bài gốc, số từ và thời gian.",
        "Có phản hồi TA/TR, CC, LR, GRA từ người chấm.",
        "Có đoạn viết lại và ghi rõ hai lỗi lặp cần sửa.",
        "Đã nhập đủ band A tại 28–30; overall A ≥6.5 và không kỹ năng nào dưới 6.0."
      ],
      "fields": [
        {
          "key": "writing",
          "label": "Writing A · band người chấm phản hồi",
          "max": 9,
          "pass": 6,
          "step": 0.5
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": true
    },
    {
      "id": "s31",
      "stage": "mock",
      "title": "Sửa điểm yếu của Mock A bằng bài mới",
      "pair": "L/R + W/S",
      "minutes": 110,
      "links": [
        {
          "label": "L · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/units/348/"
        },
        {
          "label": "R · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/units/347/"
        },
        {
          "label": "W · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/units/345/"
        },
        {
          "label": "S · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/units/344/"
        }
      ],
      "steps": [
        {
          "title": "Nghe chép + cụm/ngữ pháp",
          "minutes": 25,
          "text": "5 phút chép đoạn 10–20 giây đã học, so transcript và nghe lại không chữ; 20 phút ôn cụm/ngữ pháp. 3–5 cụm mới khi còn sức, giảm nếu tồn nhiều thẻ. Dùng lại cụm trong sản phẩm bài chính."
        },
        {
          "title": "Học đúng điểm cần sửa",
          "minutes": 15,
          "text": "Mở bài Study4 ở dưới. Chỉ xem đoạn hướng dẫn liên quan rồi tự tóm tắt bằng 2 câu. Video dài thì chia ra; chưa xong tiếp tục ở buổi sau."
        },
        {
          "title": "Tự làm trước mẫu",
          "minutes": 35,
          "text": "Chọn một dạng Nghe/Đọc yếu nhất và một lỗi Nói/Viết ảnh hưởng lớn nhất từ Mock A. Luyện tập trung, mỗi lần chỉ sửa tối đa hai nguyên nhân."
        },
        {
          "title": "Nhận phản hồi và làm lại",
          "minutes": 25,
          "text": "Làm 10 câu mới cùng dạng rồi tự tạo câu trả lời/đoạn mới không nhìn bản sửa. Nếu chưa đạt, lặp buổi này với nguồn mới thay vì làm thêm full test liên tục."
        },
        {
          "title": "Checkpoint và chuyển sang tình huống mới",
          "minutes": 10,
          "text": "Đối chiếu checklist; ghi bằng chứng và 1–2 lỗi cần sửa. Kiểm tra bằng câu hỏi hoặc ví dụ mới; đáp án đã nhớ từ bài cũ không dùng để đo khả năng chuyển sang bài mới."
        }
      ],
      "checks": [
        "Có tên hai lỗi gốc và cách khắc phục cụ thể.",
        "Bài chuyển giao thực sự mới, không chỉ nhớ đáp án cũ.",
        "Bản nói/viết mới đã áp dụng được cách sửa và có bằng chứng trước → sau."
      ],
      "fields": [
        {
          "key": "recall",
          "label": "Nhớ và dùng đúng bao nhiêu trong 5 cụm đến hạn?",
          "max": 5,
          "pass": 4,
          "integer": true
        },
        {
          "key": "correct",
          "label": "Đúng ở lượt đầu: 10 câu mới cùng dạng (không xem đáp án)",
          "max": 10,
          "pass": 8,
          "integer": true
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": false
    },
    {
      "id": "s32",
      "stage": "mock",
      "title": "Mock B · xác nhận mức sẵn sàng",
      "pair": "L + R + W + S",
      "minutes": 180,
      "links": [
        {
          "label": "L · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/units/348/"
        },
        {
          "label": "R · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/units/347/"
        },
        {
          "label": "W · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/units/345/"
        },
        {
          "label": "S · Practice Zone (chọn bài chưa làm)",
          "url": "https://study4.com/courses/27/ielts-intensive-speaking/learn/units/344/"
        },
        {
          "label": "IELTS chính thức · cách tính điểm và tiêu chí 4 kỹ năng",
          "url": "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail",
          "use": "Overall là trung bình bốn kỹ năng, làm tròn theo quy tắc IELTS. Mốc khoảng 30/40 cho L và Academic R ở band 7 có thể thay đổi theo đề."
        }
      ],
      "steps": [
        {
          "title": "Listening",
          "minutes": 40,
          "text": "Bộ B mới, một lượt, đúng quy định hình thức thi."
        },
        {
          "title": "Academic Reading",
          "minutes": 60,
          "text": "Ba passages, 40 câu, không tra từ."
        },
        {
          "title": "Academic Writing",
          "minutes": 60,
          "text": "Task 1 ≥150 từ, Task 2 ≥250 từ; giữ bản chưa sửa."
        },
        {
          "title": "Speaking",
          "minutes": 14,
          "text": "Đủ 3 parts, có tương tác nếu có người luyện cùng; giữ bản thu."
        },
        {
          "title": "Ghi mốc, chờ nhận xét",
          "minutes": 6,
          "text": "Ghi nguồn và điều kiện; quay lại checkpoint khi có phản hồi. Chấm/chữa diễn ra ở phiên khác."
        }
      ],
      "checks": [
        "Đã làm đủ 4 kỹ năng bằng đề B mới, không trợ giúp.",
        "Mock A và B đều có bằng chứng và phản hồi theo tiêu chí.",
        "Đã kiểm tra yêu cầu nơi nhận điểm; mục tiêu hiện tại là overall 6.5, mỗi kỹ năng ít nhất 6.0."
      ],
      "fields": [
        {
          "key": "listening",
          "label": "Listening B · band theo đề/người chấm",
          "max": 9,
          "pass": 6,
          "step": 0.5
        },
        {
          "key": "reading",
          "label": "Reading B · band theo đề/người chấm",
          "max": 9,
          "pass": 6,
          "step": 0.5
        },
        {
          "key": "writing",
          "label": "Writing B · band theo đề/người chấm",
          "max": 9,
          "pass": 6,
          "step": 0.5
        },
        {
          "key": "speaking",
          "label": "Speaking B · band theo đề/người chấm",
          "max": 9,
          "pass": 6,
          "step": 0.5
        }
      ],
      "retry": "Chọn một bài mới cùng dạng, giảm lượng câu nếu quá khó. Sửa tối đa hai nguyên nhân chính, rồi kiểm tra lại; chưa đạt thì giữ buổi này và thêm lượt luyện.",
      "diagnostic": false,
      "human": true,
      "splitNote": "Hai phiên: A = Listening 40 + Reading 60 + ghi mốc/nghỉ 10 (110 phút); B = Writing 60 + Speaking 14 + ghi mốc/nghỉ 6 (80 phút), dùng 10–30 phút còn lại để ôn nhẹ/chờ nhận xét. Đây là mock chia phiên theo quỹ học, chưa mô phỏng sức bền thi liên tục. Nhận chấm/chữa ở phiên sau. Không thêm khối nền tảng vào trước bài tính giờ.",
      "scoreSource": true
    }
  ],
  "sources": [
    {
      "label": "IELTS chính thức · cách tính điểm và tiêu chí 4 kỹ năng",
      "url": "https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail",
      "use": "Overall là trung bình bốn band làm tròn IELTS. L/R khoảng 7 là mục tiêu đệm; raw tham khảo thay đổi theo đề. Nhập band và nguồn quy đổi của đúng đề, không coi app là đơn vị chấm thi."
    },
    {
      "label": "IELTS chính thức · dạng bài và bài mẫu Academic",
      "url": "https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test",
      "use": "Đối chiếu dạng bài, nghe một lượt khi kiểm tra, định dạng Nói và Viết. Chọn hình thức máy/giấy rồi tuân thủ thời gian tương ứng."
    },
    {
      "label": "IELTS · Speaking band descriptors",
      "url": "https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf",
      "use": "Bốn tiêu chí: trôi chảy và mạch lạc, từ vựng, ngữ pháp, phát âm."
    },
    {
      "label": "IELTS · Writing band descriptors và tiêu chí",
      "url": "https://ielts.org/news-and-insights/ielts-writing-band-descriptors-and-key-assessment-criteria",
      "use": "Đúng yêu cầu đề; mạch lạc; từ vựng; ngữ pháp. Task 2 có trọng số lớn hơn Task 1."
    },
    {
      "label": "Cambridge · Vocabulary for IELTS (trích đoạn chính thức)",
      "url": "https://assets.cambridge.org/97811089/00607/excerpt/9781108900607_excerpt.pdf",
      "use": "Học cách kết hợp từ và dùng chủ động trong nói/viết; tự làm trước khi đọc đáp án mẫu."
    },
    {
      "label": "Nghiên cứu trên Cambridge Core · tổng quan học từ vựng L2",
      "url": "https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/review-of-laboratory-studies-of-adult-second-language-vocabulary-training/18F0A5D1FFC829CE05931B2EEE83124A",
      "use": "Cơ sở chọn nhớ lại chủ động, ôn cách quãng và tự tạo câu. Không phải bằng chứng đảm bảo tăng một số band cố định."
    },
    {
      "label": "Cambridge · ví dụ chu trình mẫu → cấu trúc → bài mới",
      "url": "https://assets.cambridge.org/052175/5336/sample/0521755336WS.pdf",
      "use": "Tài liệu giảng dạy minh họa phân tích bài mẫu, luyện cấu trúc rồi tự làm bài tương tự; lộ trình này điều chỉnh cho tự học."
    }
  ],
  "methods": [
    {
      "title": "1 · Nhớ lại chủ động theo lịch ôn, bằng cụm và câu",
      "why": "Đưa từ đã nhận ra thành từ dùng được; chỉ nhìn mặt thẻ thấy quen chưa đủ.",
      "steps": [
        "Lấy tối đa 5 cụm có ích từ bài Study4; giữ nghĩa trong ngữ cảnh, giới từ, ví dụ và lỗi cũ.",
        "Che đáp án: từ tình huống/ý tiếng Việt tự nói hoặc viết cụm và một câu của mình.",
        "Đối chiếu nghĩa và cách kết hợp từ, sửa ngay; ôn theo SRS hiện có.",
        "Dùng ít nhất 2 cụm vào câu hỏi hoặc đoạn mới ở buổi sau. Không nhồi cụm khi không hợp ý."
      ],
      "source": [
        4,
        5
      ]
    },
    {
      "title": "2 · Luyện có mục tiêu, nhận phản hồi rồi làm lại",
      "why": "Ưu tiên một lỗi ảnh hưởng lớn mỗi lượt, tăng dần từ câu → đoạn → bài; đặc biệt cho khả năng diễn đạt.",
      "steps": [
        "Tự trả lời/viết bản đầu trước mẫu; với nghe/đọc ghi đáp án lượt đầu.",
        "Đối chiếu chứng cứ, bài mẫu và tiêu chí IELTS; nhận chữa khi cần.",
        "Chỉ chọn 1–2 lỗi lớn, viết/nói lại để sửa đúng các lỗi đó.",
        "Đóng mẫu và thử đề hoặc tình huống mới. Tiến bộ cần xuất hiện ở bài mới, không chỉ ở bản đã học thuộc."
      ],
      "source": [
        0,
        4,
        6
      ]
    }
  ],
  "expression": {
    "label": "Bài thử diễn đạt · ví dụ do t tự soạn, không phải đáp án Cambridge",
    "prompt": "Do you enjoy studying alone?",
    "simple": "Yes, I do. I can concentrate better when I study alone. For example, I usually review vocabulary in a quiet room.",
    "ladder": [
      "Nói ý bằng tiếng Việt ngắn: thích học một mình vì dễ tập trung.",
      "Tự nói 2–3 câu đơn đúng: trả lời → lý do → ví dụ.",
      "Học một cụm như concentrate on a task, rồi thay bằng ví dụ thật của m.",
      "Đóng mẫu, trả lời câu mới: Do you prefer studying at home or in a library?"
    ],
    "writing": "Với Writing, mở rộng thành một đoạn: ý chính → giải thích → ví dụ → liên hệ. Khung này chỉ hỗ trợ triển khai ý, không phải mẫu bắt buộc hay tiêu chí chấm riêng."
  },
  "studyWindow": "90–120 phút mỗi phiên, tính cả nền tảng, bài chính và checkpoint; các đơn vị dài được chia phiên.",
  "foundationNote": "Khối đầu: 100 cụm và chẩn đoán 5 nhóm ngữ pháp. Có lượt kiểm lại sau 7 ngày; mở rộng sau khi xem kết quả.",
  "revision": "5.6",
  "starter": {
    "title": "8 lượt đầu · gợi ý cho hai tuần",
    "note": "Gợi ý 4 lượt/tuần nếu hợp lịch, không phải lịch đã chốt. Mỗi lượt 90–120 phút; cần ôn lại thì dời lượt kế. Bài bên dưới đã thấy trong khóa ngày 20/10/2026; chưa xác nhận toàn bộ lịch sử cá nhân. Đã biết đáp án thì đổi bài dự phòng và ghi mã; không dùng cùng bài để đo hai lần. Recording 1 Test 1 đã dùng nên chỉ làm bài chữa, không đo đầu vào.",
    "visits": [
      {
        "session": "s01",
        "primary": {
          "label": "IELTS Collection 1 Listening Test 2 · Recording 1 · part 18963",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "backup": {
          "label": "Test 3 · Recording 1 · part 18967",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "task": "Làm 10 câu lượt đầu. Trong Practice Zone chọn đúng tên/part, không bấm Hoàn thành bài học chỉ để đi tiếp. Speaking: What do you study? Why did you choose it? What do you do in your free time? (câu hỏi luyện tự soạn).",
        "foundation": "Gói 01 (3–5 cụm); chẩn đoán nhóm 1, có thể chia nhỏ."
      },
      {
        "session": "s02",
        "primary": {
          "label": "IELTS Collection 1 Reading Test 1 · Passage 1 · part 18929",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "backup": {
          "label": "Test 2 · Passage 1 · part 18932",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "task": "Một passage 20 phút, ghi đúng/tổng và ba dòng chứng cứ. Không đổi điểm một passage ra band.",
        "foundation": "Ôn gói 01, bắt đầu gói 02; sửa câu chủ–vị."
      },
      {
        "session": "s03",
        "primary": {
          "label": "Writing · Luận điểm và lập luận · 14370",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14370/"
        },
        "backup": {
          "label": "Writing · Opinion · 14383",
          "url": "https://study4.com/courses/25/ielts-intensive-writing/learn/activities/14383/"
        },
        "task": "Đề luyện tự soạn: Universities should provide more practical training than theoretical knowledge. To what extent do you agree? Viết một đoạn 80–100 từ trước khi mở mẫu; chưa chấm band cả Writing từ đoạn này.",
        "foundation": "Ôn cụm đang đến hạn; nhóm 1 viết 5 câu, không ép hoàn tất nếu thiếu thời gian."
      },
      {
        "session": "s04",
        "primary": {
          "label": "Dictation · Numbers and letters · 5418",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5418/"
        },
        "backup": {
          "label": "Dictation · Address · 5420",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/5420/"
        },
        "task": "10 mục chưa nghe trong nhóm, ghi vị trí mục để lần sau lấy mục khác. Speaking ba câu mới về lịch học, địa chỉ, kế hoạch cuối tuần; chuyển số/tên vào câu thật.",
        "foundation": "Gói 03; chẩn đoán nhóm 2 theo lỗi thì."
      },
      {
        "session": "s05",
        "primary": {
          "label": "IELTS Collection 1 Reading Test 2 · Passage 1 · part 18932",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "backup": {
          "label": "Test 2 · Passage 2 · part 18933",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "task": "Bỏ qua bài đã dùng ở s02. Viết ý chính ít nhất ba đoạn và 5 câu education/work; giữ hai cặp câu trước/sau sửa.",
        "foundation": "Ôn 01–03, gói 04 khi không quá tải; sửa nhóm 2."
      },
      {
        "session": "s06",
        "primary": {
          "label": "IELTS Collection 1 Listening Test 1 · Recording 2 · part 18960",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "backup": {
          "label": "Test 2 · Recording 2 · part 18964",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "task": "Làm 10 câu mới trong Recording đã chọn, ghi dạng câu thực tế; đây là luyện dự đoán/paraphrase, không khẳng định tất cả là completion. Tìm 3 cặp diễn đạt giữa câu hỏi và audio. Nếu bài dự phòng đã dùng, chọn mục còn mới và ghi mã. Speaking likes/dislikes: ba câu tự soạn về môn học, đi lại, đọc sách.",
        "foundation": "Ôn đến hạn; gói 05; nhóm 3 đếm được/số nhiều."
      },
      {
        "session": "s07",
        "primary": {
          "label": "IELTS Collection 1 Reading Test 1 · Passage 2 · part 18930 · có Summary Completion",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "backup": {
          "label": "Test 3 · Passage 2 · part 18936 · có Summary Completion",
          "url": "https://study4.com/courses/22/ielts-intensive-vocabulary-reading/learn/activities/13607/"
        },
        "task": "Làm 10 câu đầu passage mới, tách nhóm completion trong ghi chú. Đoạn luyện tự soạn 80–100 từ: giải thích một lợi ích của việc học cùng người khác, có ví dụ thật. Không dùng lại passage đã làm.",
        "foundation": "Ôn cụm đủ 7 ngày khi đến hạn; gói 06; luyện nhóm 3."
      },
      {
        "session": "s08",
        "primary": {
          "label": "IELTS Collection 1 Listening Test 3 · Recording 1 · part 18967",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "backup": {
          "label": "Test 3 · Recording 2 · part 18968",
          "url": "https://study4.com/courses/15/ielts-intensive-listening/learn/activities/13608/"
        },
        "task": "10 câu nghe mới, sau đó học Identifying distractors 19552. Chỉ ra hai bẫy đổi ý trong bài nghe hoặc ví dụ bài giảng, ghi rõ nguồn từng ví dụ. Nếu s01 đã dùng Recording 1 Test 3 thì chuyển sang bài dự phòng. Nói 45–60 giây về thói quen học; gom bản gốc S/W cho người chấm.",
        "foundation": "Ôn đến hạn; gói 07 nếu còn sức; chọn nhóm 4 hoặc sửa nhóm yếu. 100 cụm không phải chỉ tiêu hai tuần."
      }
    ]
  },
  "feedback": {
    "cadenceDays": 14,
    "description": "Mỗi 14 ngày: một lượt chữa Speaking và một lượt chữa Writing từ người thật. Chọn ngày đầu ở tab Người chấm; app hiện hạn khi mở mục này, không tự đặt lịch/gửi bài/đặt gia sư.",
    "visit": "Dùng một phiên 90–120 phút thay bài mới: 15 phút ôn nhẹ, 30 phút nhận chữa Speaking, 25 phút đọc/chữa Writing, 20 phút nói/viết lại, 10 phút ghi lỗi và checkpoint. Gửi bản gốc trước giờ hẹn; nếu chưa có bài đầy đủ thì nhận chữa đoạn/câu và không gán band toàn kỹ năng."
  }
}));
