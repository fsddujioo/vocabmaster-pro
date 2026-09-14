// Bộ dữ liệu từ vựng mẫu chuẩn Cambridge phân theo Thư mục & Học phần (CEFR A1 - C1)
const SAMPLE_DATA = {
  folders: [
    {
      id: "folder-daily-comm",
      name: "Giao Tiếp & Đời Sống Hàng Ngày",
      description: "Các từ vựng thiết yếu trong sinh hoạt, công việc và giao tiếp hàng ngày",
      icon: "💬",
      color: "#3b82f6",
      createdAt: "2026-09-01T08:00:00.000Z"
    },
    {
      id: "folder-academic-ielts",
      name: "Học Thuật & Luyện Thi IELTS/TOEIC",
      description: "Từ vựng cấp độ B2 - C1 nâng cao cho bài luận, thuyết trình và thảo luận học thuật",
      icon: "🎓",
      color: "#8b5cf6",
      createdAt: "2026-09-01T08:00:00.000Z"
    },
    {
      id: "folder-business",
      name: "Tiếng Anh Thương Mại & Kinh Doanh",
      description: "Từ vựng chuyên sâu về tài chính, kinh doanh, tiếp thị và quan hệ đối tác",
      icon: "💼",
      color: "#10b981",
      createdAt: "2026-09-01T08:00:00.000Z"
    }
  ],
  modules: [
    {
      id: "mod-workplace",
      folderId: "folder-daily-comm",
      title: "Môi trường Công sở & Công việc (Workplace)",
      description: "Từ vựng cốt lõi về đàm phán, cộng tác và quản lý công việc",
      tags: ["Work", "Office", "B1-B2"],
      createdAt: "2026-09-01T08:30:00.000Z"
    },
    {
      id: "mod-travel",
      folderId: "folder-daily-comm",
      title: "Du lịch & Trải nghiệm (Travel & Lifestyle)",
      description: "Từ vựng thông dụng khi khám phá điểm đến mới và giao lưu quốc tế",
      tags: ["Travel", "Lifestyle", "A1-A2"],
      createdAt: "2026-09-01T08:30:00.000Z"
    },
    {
      id: "mod-academic-debate",
      folderId: "folder-academic-ielts",
      title: "Tranh luận & Tư duy Phản biện (Debate & Analysis)",
      description: "Từ vựng học thuật C1 diễn đạt ý kiến sâu sắc và logic",
      tags: ["Academic", "Debate", "C1"],
      createdAt: "2026-09-01T08:30:00.000Z"
    },
    {
      id: "mod-business-finance",
      folderId: "folder-business",
      title: "Đầu tư & Thị trường (Finance & Investment)",
      description: "Từ vựng tài chính doanh nghiệp và phân tích thị trường",
      tags: ["Business", "Finance", "B2"],
      createdAt: "2026-09-01T08:30:00.000Z"
    }
  ],
  cards: [
    // Module: Workplace
    {
      id: "card-collab",
      moduleId: "mod-workplace",
      word: "Collaborate",
      wordType: "verb",
      cefrLevel: "B2",
      ipaUk: "/kəˈlæb.ə.reɪt/",
      ipaUs: "/kəˈlæb.ə.reɪt/",
      audioUkUrl: "https://api.dictionaryapi.dev/media/pronunciations/en/collaborate-uk.mp3",
      audioUsUrl: "https://api.dictionaryapi.dev/media/pronunciations/en/collaborate-us.mp3",
      primaryMeaningVi: "hợp tác, cộng tác",
      primaryMeaningEn: "to work jointly on an activity or project",
      definitions: [
        {
          meaningVi: "hợp tác, phối hợp cùng làm việc để tạo ra kết quả",
          meaningEn: "to work with someone else for a special purpose",
          context: "Công việc & Dự án",
          exampleEn: "Our marketing and tech teams collaborated on the new product launch.",
          exampleVi: "Đội ngũ tiếp thị và kỹ thuật của chúng tôi đã hợp tác trong đợt ra mắt sản phẩm mới."
        },
        {
          meaningVi: "cộng tác (với kẻ địch / mang nghĩa tiêu cực trong lịch sử)",
          meaningEn: "to cooperate traitorously with an enemy that has occupied one's country",
          context: "Lịch sử / Chính trị",
          exampleEn: "He was accused of collaborating with the enemy forces.",
          exampleVi: "Anh ta bị cáo buộc đã cộng tác với lực lượng đối phương."
        }
      ],
      usageNotes: "Thường đi kèm giới từ 'with' (người) hoặc 'on' (dự án). Ví dụ: 'collaborate with colleagues on a report'. Phân biệt với 'cooperate' (hợp tác làm theo yêu cầu) còn 'collaborate' mang tính sáng tạo cùng nhau.",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-negotiate",
      moduleId: "mod-workplace",
      word: "Negotiate",
      wordType: "verb",
      cefrLevel: "B1",
      ipaUk: "/nəˈɡəʊ.ʃi.eɪt/",
      ipaUs: "/nəˈɡoʊ.ʃi.eɪt/",
      audioUkUrl: "https://api.dictionaryapi.dev/media/pronunciations/en/negotiate-uk.mp3",
      audioUsUrl: "https://api.dictionaryapi.dev/media/pronunciations/en/negotiate-us.mp3",
      primaryMeaningVi: "đàm phán, thương lượng",
      primaryMeaningEn: "obtain or bring about by discussion",
      definitions: [
        {
          meaningVi: "thương lượng, bàn bạc để đi đến thỏa thuận chung",
          meaningEn: "to have formal discussions with someone in order to reach an agreement",
          context: "Kinh doanh & Đàm phán",
          exampleEn: "We managed to negotiate a lower price for the software license.",
          exampleVi: "Chúng tôi đã thương lượng được mức giá thấp hơn cho bản quyền phần mềm."
        },
        {
          meaningVi: "vượt qua một chướng ngại vật hay đoạn đường khó khăn",
          meaningEn: "to successfully pass a difficult path, route, or obstacle",
          context: "Di chuyển / Thể thao",
          exampleEn: "The car skillfully negotiated the sharp turns on the mountain road.",
          exampleVi: "Chiếc xe khéo léo vượt qua những khúc cua gắt trên đường đèo."
        }
      ],
      usageNotes: "Cụm từ phổ biến: 'negotiate a contract/deal' (đàm phán hợp đồng), 'negotiate terms' (thương lượng các điều khoản). Danh từ là 'negotiation'.",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-deadline",
      moduleId: "mod-workplace",
      word: "Deadline",
      wordType: "noun",
      cefrLevel: "A2",
      ipaUk: "/ˈded.laɪn/",
      ipaUs: "/ˈded.laɪn/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "hạn chót, thời hạn hoàn thành",
      primaryMeaningEn: "the latest time or date by which something should be completed",
      definitions: [
        {
          meaningVi: "thời điểm cuối cùng bắt buộc phải nộp hoặc hoàn thành công việc",
          meaningEn: "a specific time or date by which you have to do something",
          context: "Công việc & Học tập",
          exampleEn: "I have to work late tonight to meet the project deadline tomorrow.",
          exampleVi: "Tối nay tôi phải làm việc muộn để kịp hạn chót dự án vào ngày mai."
        }
      ],
      usageNotes: "Các collocations cực kỳ hay gặp: 'meet a deadline' (kịp hạn), 'miss a deadline' (trễ hạn), 'extend a deadline' (gia hạn), 'tight deadline' (thời hạn gấp gáp).",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-efficient",
      moduleId: "mod-workplace",
      word: "Efficient",
      wordType: "adjective",
      cefrLevel: "B1",
      ipaUk: "/ɪˈfɪʃ.ənt/",
      ipaUs: "/ɪˈfɪʃ.ənt/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "hiệu quả, có năng suất cao (tiết kiệm thời gian/nguồn lực)",
      primaryMeaningEn: "working in a well-organized and competent way",
      definitions: [
        {
          meaningVi: "làm việc năng suất, đạt kết quả tốt nhất mà tốn ít công sức và thời gian nhất",
          meaningEn: "achieving maximum productivity with minimum wasted effort or expense",
          context: "Năng suất & Quản lý",
          exampleEn: "The new automation tool has made our workflow significantly more efficient.",
          exampleVi: "Công cụ tự động hóa mới đã giúp quy trình làm việc của chúng tôi hiệu quả hơn đáng kể."
        }
      ],
      usageNotes: "Phân biệt 'Efficient' (hiệu quả về tối ưu chi phí, thời gian, công sức) với 'Effective' (mang lại kết quả mong muốn, có tác dụng).",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-feedback",
      moduleId: "mod-workplace",
      word: "Feedback",
      wordType: "noun",
      cefrLevel: "B1",
      ipaUk: "/ˈfiːd.bæk/",
      ipaUs: "/ˈfiːd.bæk/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "ý kiến phản hồi, nhận xét",
      primaryMeaningEn: "information about reactions to a product or a person's performance",
      definitions: [
        {
          meaningVi: "nhận xét hoặc góp ý để cải thiện chất lượng công việc",
          meaningEn: "information or criticism that will help someone improve their work",
          context: "Đánh giá & Giao tiếp",
          exampleEn: "Constructive feedback from managers helps employees grow rapidly.",
          exampleVi: "Ý kiến phản hồi mang tính xây dựng từ các quản lý giúp nhân viên phát triển nhanh chóng."
        },
        {
          meaningVi: "tiếng hú chói tai của hệ thống âm thanh (do micro bắt lại tiếng loa)",
          meaningEn: "an annoying high-pitched noise produced when sound from a speaker enters a microphone",
          context: "Âm thanh & Kỹ thuật",
          exampleEn: "Adjust the microphone to avoid loud acoustic feedback during the presentation.",
          exampleVi: "Hãy chỉnh lại micro để tránh tiếng hú âm thanh trong suốt bài thuyết trình."
        }
      ],
      usageNotes: "'Feedback' là danh từ KHÔNG đếm được (uncountable). Không nói 'a feedback' hay 'feedbacks', mà nói 'some feedback' hoặc 'a piece of feedback'.",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-delegate",
      moduleId: "mod-workplace",
      word: "Delegate",
      wordType: "verb",
      cefrLevel: "B2",
      ipaUk: "/ˈdel.ɪ.ɡeɪt/",
      ipaUs: "/ˈdel.ə.ɡeɪt/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "ủy thác, giao phó (công việc, trách nhiệm)",
      primaryMeaningEn: "entrust a task or responsibility to another person",
      definitions: [
        {
          meaningVi: "giao phó một nhiệm vụ hoặc quyền quyết định cho cấp dưới hoặc người khác",
          meaningEn: "to give a particular job, duty, or right to someone else so that they do it for you",
          context: "Quản lý lãnh đạo",
          exampleEn: "A good leader knows how to delegate tasks effectively across the team.",
          exampleVi: "Một người lãnh đạo giỏi luôn biết cách ủy thác công việc hiệu quả cho cả nhóm."
        },
        {
          meaningVi: "người đại diện, đại biểu tham dự hội nghị (danh từ phát âm: /ˈdel.ɪ.ɡət/)",
          meaningEn: "a person sent or authorized to represent others, in particular an elected representative sent to a conference",
          context: "Hội nghị & Chính trị",
          exampleEn: "Over 500 international delegates attended the environmental summit.",
          exampleVi: "Hơn 500 đại biểu quốc tế đã tham dự hội nghị thượng đỉnh môi trường."
        }
      ],
      usageNotes: "Lưu ý phát âm: Động từ phát âm là /ˈdel.ɪ.ɡeɪt/ (-ate âm 'eɪ'), còn danh từ 'đại biểu' phát âm là /ˈdel.ɪ.ɡət/ (-ate âm 'ət').",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },

    // Module: Travel & Lifestyle
    {
      id: "card-destination",
      moduleId: "mod-travel",
      word: "Destination",
      wordType: "noun",
      cefrLevel: "A2",
      ipaUk: "/ˌdes.tɪˈneɪ.ʃən/",
      ipaUs: "/ˌdes.təˈneɪ.ʃən/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "điểm đến, đích đến",
      primaryMeaningEn: "the place to which someone or something is going",
      definitions: [
        {
          meaningVi: "nơi chốn mà một người đang hướng tới hoặc đi du lịch đến",
          meaningEn: "the place to which someone or something is going or being sent",
          context: "Du lịch",
          exampleEn: "Da Nang has become one of the top holiday destinations in Southeast Asia.",
          exampleVi: "Đà Nẵng đã trở thành một trong những điểm đến nghỉ dưỡng hàng đầu Đông Nam Á."
        }
      ],
      usageNotes: "Thường dùng: 'popular tourist destination' (điểm đến du lịch nổi tiếng), 'reach one's destination' (đến đích an toàn).",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-itinerary",
      moduleId: "mod-travel",
      word: "Itinerary",
      wordType: "noun",
      cefrLevel: "B1",
      ipaUk: "/aɪˈtɪn.ər.ər.i/",
      ipaUs: "/aɪˈtɪn.ə.rer.i/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "lịch trình chuyến đi, hành trình",
      primaryMeaningEn: "a planned route or journey",
      definitions: [
        {
          meaningVi: "bản kế hoạch chi tiết về thời gian, các địa điểm tham quan trong chuyến đi",
          meaningEn: "a detailed plan or route of a journey including dates and places to visit",
          context: "Lên kế hoạch du lịch",
          exampleEn: "We prepared a 5-day travel itinerary covering both Kyoto and Osaka.",
          exampleVi: "Chúng tôi đã chuẩn bị lịch trình du lịch 5 ngày bao gồm cả Kyoto và Osaka."
        }
      ],
      usageNotes: "Phát âm lưu ý trọng âm rơi vào âm tiết thứ 2: /aɪˈtɪn.ər.i/. Cụm từ: 'stick to the itinerary' (bám sát lịch trình).",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-hospitable",
      moduleId: "mod-travel",
      word: "Hospitable",
      wordType: "adjective",
      cefrLevel: "B2",
      ipaUk: "/hɒsˈpɪt.ə.bəl/",
      ipaUs: "/ˈhɑː.spɪ.t̬ə.bəl/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "hiếu khách, mến khách",
      primaryMeaningEn: "friendly and welcoming to visitors or guests",
      definitions: [
        {
          meaningVi: "niềm nở, ân cần đón tiếp và thết đãi khách thập phương",
          meaningEn: "welcoming, generous, and friendly towards visitors or strangers",
          context: "Văn hóa & Đời sống",
          exampleEn: "The local villagers were incredibly hospitable and offered us hot tea.",
          exampleVi: "Người dân trong làng vô cùng hiếu khách và đã mời chúng tôi trà nóng."
        },
        {
          meaningVi: "môi trường thuận lợi cho sinh vật phát triển",
          meaningEn: "having conditions that make it easy to live or grow",
          context: "Thiên nhiên / Khí hậu",
          exampleEn: "Few plants can survive in such inhospitable desert conditions.",
          exampleVi: "Rất ít loài thực vật có thể sống sót trong điều kiện sa mạc khắc nghiệt không thuận lợi như vậy."
        }
      ],
      usageNotes: "Trọng âm Anh-Anh thường rơi vào âm thứ 2 /hɒsˈpɪt.ə.bəl/, Anh-Mỹ thường rơi vào âm đầu /ˈhɑː.spɪ.t̬ə.bəl/. Trái nghĩa: 'inhospitable'.",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-breathtaking",
      moduleId: "mod-travel",
      word: "Breathtaking",
      wordType: "adjective",
      cefrLevel: "B1",
      ipaUk: "/ˈbreθˌteɪ.kɪŋ/",
      ipaUs: "/ˈbreθˌteɪ.kɪŋ/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "ngoạn mục, đẹp đến nín thở",
      primaryMeaningEn: "astonishing or awe-inspiring in quality, so as to take one's breath away",
      definitions: [
        {
          meaningVi: "cực kỳ đẹp, ấn tượng và hùng vĩ khiến người ngắm sững sờ",
          meaningEn: "extremely exciting, beautiful, or surprising",
          context: "Cảnh quan & Trải nghiệm",
          exampleEn: "From the mountain peak, we enjoyed a breathtaking view of the valley below.",
          exampleVi: "Từ đỉnh núi, chúng tôi đã chiêm ngưỡng khung cảnh đẹp đến nín thở của thung lũng bên dưới."
        }
      ],
      usageNotes: "Thường dùng mô tả: 'breathtaking scenery/views' (phong cảnh ngoạn mục), 'breathtaking performance' (màn trình diễn xuất thần).",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },

    // Module: Academic & Debate (C1)
    {
      id: "card-eloquent",
      moduleId: "mod-academic-debate",
      word: "Eloquent",
      wordType: "adjective",
      cefrLevel: "C1",
      ipaUk: "/ˈel.ə.kwənt/",
      ipaUs: "/ˈel.ə.kwənt/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "hùng biện, lưu loát, giàu sức thuyết phục",
      primaryMeaningEn: "fluent or persuasive in speaking or writing",
      definitions: [
        {
          meaningVi: "có tài dùng ngôn từ diễn đạt uyển chuyển, thuyết phục và truyền cảm hứng",
          meaningEn: "giving a clear, strong message; using language clearly and effectively",
          context: "Hùng biện & Văn phong",
          exampleEn: "The defense lawyer gave an eloquent speech that moved the entire jury.",
          exampleVi: "Luật sư bào chữa đã có một bài phát biểu hùng biện lay động cả bồi thẩm đoàn."
        },
        {
          meaningVi: "biểu cảm sâu sắc (ánh mắt, sự im lặng diễn tả nhiều ý nghĩa)",
          meaningEn: "clearly expressing or indicating something without using words",
          context: "Biểu cảm nghệ thuật",
          exampleEn: "Her silence was an eloquent testimony to her profound grief.",
          exampleVi: "Sự im lặng của cô ấy là minh chứng hùng hồn cho nỗi đau thương sâu sắc."
        }
      ],
      usageNotes: "Danh từ tương ứng là 'eloquence'. Trạng từ là 'eloquently'. Thường khen ngợi diễn giả tài ba hoặc bài văn phong cách lịch lãm.",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-scrutinize",
      moduleId: "mod-academic-debate",
      word: "Scrutinize",
      wordType: "verb",
      cefrLevel: "C1",
      ipaUk: "/ˈskruː.tɪ.naɪz/",
      ipaUs: "/ˈskruː.t̬ən.aɪz/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "xem xét kỹ lưỡng, soi xét cẩn thận",
      primaryMeaningEn: "examine or inspect closely and thoroughly",
      definitions: [
        {
          meaningVi: "nghiên cứu, phân tích đến từng tiểu tiết để tìm ra lỗi hoặc hiểu rõ bản chất",
          meaningEn: "to examine something very carefully in order to discover information",
          context: "Nghiên cứu & Pháp lý",
          exampleEn: "Scientists carefully scrutinized the research data before publishing their findings.",
          exampleVi: "Các nhà khoa học đã cẩn trọng soi xét từng số liệu nghiên cứu trước khi công bố phát hiện."
        }
      ],
      usageNotes: "Danh từ là 'scrutiny'. Cụm hay dùng: 'come under close scrutiny' (bị soi xét kỹ lưỡng). Anh-Anh có thể viết là 'scrutinise'.",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-substantiate",
      moduleId: "mod-academic-debate",
      word: "Substantiate",
      wordType: "verb",
      cefrLevel: "C1",
      ipaUk: "/səbˈstæn.ʃi.eɪt/",
      ipaUs: "/səbˈstæn.ʃi.eɪt/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "chứng minh, đưa ra bằng chứng xác thực",
      primaryMeaningEn: "provide evidence to support or prove the truth of",
      definitions: [
        {
          meaningVi: "chứng thực một khẳng định hay luận điểm bằng bằng chứng xác thực và vững chắc",
          meaningEn: "to show something to be true, or to support a claim with facts",
          context: "Học thuật & Tranh luận",
          exampleEn: "You cannot make bold claims without empirical evidence to substantiate them.",
          exampleVi: "Bạn không thể đưa ra những tuyên bố táo bạo mà không có bằng chứng thực nghiệm để chứng minh chúng."
        }
      ],
      usageNotes: "Thường đi kèm với: 'substantiate a claim / an allegation / a theory' (chứng thực luận điểm / cáo buộc / học thuyết). Tính từ là 'substantiated'.",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-plausible",
      moduleId: "mod-academic-debate",
      word: "Plausible",
      wordType: "adjective",
      cefrLevel: "B2",
      ipaUk: "/ˈplɔː.zə.bəl/",
      ipaUs: "/ˈplɑː.zə.bəl/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "hợp lý, đáng tin cậy (có vẻ đúng sự thật)",
      primaryMeaningEn: "seeming reasonable or probable",
      definitions: [
        {
          meaningVi: "có khả năng xảy ra, có vẻ hợp logic và đáng tin",
          meaningEn: "possibly true; able to be believed or reasonable",
          context: "Lập luận & Khoa học",
          exampleEn: "She offered a plausible explanation for why the experiments had failed.",
          exampleVi: "Cô ấy đã đưa ra một lời giải thích hợp lý về lý do tại sao các thí nghiệm thất bại."
        }
      ],
      usageNotes: "Trái nghĩa: 'implausible' (phi lý, khó tin). Collocations: 'a plausible explanation / excuse / scenario'.",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },

    // Module: Business & Finance
    {
      id: "card-dividend",
      moduleId: "mod-business-finance",
      word: "Dividend",
      wordType: "noun",
      cefrLevel: "B2",
      ipaUk: "/ˈdɪv.ɪ.dend/",
      ipaUs: "/ˈdɪv.ə.dend/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "cổ tức (lợi nhuận chia cho cổ đông)",
      primaryMeaningEn: "a sum of money paid regularly by a company to its shareholders out of its profits",
      definitions: [
        {
          meaningVi: "khoản tiền thưởng hoặc lợi nhuận được công ty chi trả đều đặn cho các cổ đông",
          meaningEn: "a share of the profits made by a company which is paid to the people that own shares in it",
          context: "Chứng khoán & Tài chính",
          exampleEn: "The company announced an attractive quarterly dividend of 50 cents per share.",
          exampleVi: "Công ty đã công bố mức cổ tức quý hấp dẫn là 50 xu cho mỗi cổ phiếu."
        },
        {
          meaningVi: "lợi ích dài hạn thu được từ sự nỗ lực",
          meaningEn: "a benefit from an action or policy",
          context: "Đời sống / Triết lý",
          exampleEn: "Investing in education pays immense dividends for future generations.",
          exampleVi: "Đầu tư vào giáo dục sẽ đem lại những lợi ích vô cùng to lớn cho các thế hệ tương lai."
        }
      ],
      usageNotes: "Thành ngữ: 'pay dividends' (đem lại lợi ích to lớn sau này). Ví dụ: 'Patience will pay dividends'.",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    },
    {
      id: "card-revenue",
      moduleId: "mod-business-finance",
      word: "Revenue",
      wordType: "noun",
      cefrLevel: "B2",
      ipaUk: "/ˈrev.ən.juː/",
      ipaUs: "/ˈrev.ə.nuː/",
      audioUkUrl: "",
      audioUsUrl: "",
      primaryMeaningVi: "doanh thu, tổng thu nhập",
      primaryMeaningEn: "income, especially when of a company or organization and of a substantial nature",
      definitions: [
        {
          meaningVi: "tổng số tiền mà một công ty nhận được từ việc bán hàng hoặc cung cấp dịch vụ",
          meaningEn: "the total amount of money that a company receives from selling products or services",
          context: "Kế toán & Kinh doanh",
          exampleEn: "Annual revenue increased by 25% thanks to overseas market expansion.",
          exampleVi: "Doanh thu hàng năm đã tăng 25% nhờ mở rộng thị trường nước ngoài."
        }
      ],
      usageNotes: "Phân biệt 'Revenue' (tổng doanh thu trước khi trừ chi phí) với 'Profit' (lợi nhuận ròng sau khi đã trừ toàn bộ chi phí).",
      srsStage: 0,
      nextReviewDate: new Date().toISOString(),
      reviewCount: 0,
      mistakeCount: 0,
      lastReviewed: null,
      history: []
    }
  ]
};

if (typeof window !== 'undefined') {
  window.SAMPLE_DATA = SAMPLE_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SAMPLE_DATA;
}
