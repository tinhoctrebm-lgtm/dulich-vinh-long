import { LocationItem, ProjectInfo } from '../types/tourism';

export const INITIAL_LOCATIONS: LocationItem[] = [
  {
    id: 'pham-hung-memorial',
    code: 'VL-HIST-001',
    name: 'Khu lưu niệm Chủ tịch Hội đồng Bộ trưởng Phạm Hùng',
    area: 'Vĩnh Long',
    category: 'historic',
    categoryLabel: 'Di tích lịch sử',
    status: 'published',
    isFeatured: true,
    shortDescription: 'Địa chỉ đỏ giáo dục truyền thống cách mạng, nơi tưởng niệm nhà lãnh đạo kiên trung, người con ưu tú của quê hương Vĩnh Long.',
    fullDescription: 'Khu lưu niệm Chủ tịch Hội đồng Bộ trưởng Phạm Hùng được xây dựng tại xã Long Phước, huyện Long Hồ, tỉnh Vĩnh Long. Đây là công trình văn hóa lịch sử có ý nghĩa to lớn, tôn vinh cuộc đời, thân thế và sự nghiệp vẻ vang của đồng chí Phạm Hùng – nhà cách mạng tiền bối, người cộng sản kiên cường, trọn đời cống hiến vì độc lập dân tộc và hạnh phúc của nhân dân.',
    history: 'Đồng chí Phạm Hùng (1912 – 1988), tên khai sinh là Phạm Văn Thiện, sinh ra tại làng Long Hồ, quận Châu Thành, tỉnh Vĩnh Long. Đồng chí tham gia hoạt động cách mạng từ rất sớm và từng đảm nhiệm nhiều trọng trách quan trọng như Ủy viên Bộ Chính trị, Phó Chủ tịch Hội đồng Bộ trưởng kiêm Bộ trưởng Bộ Nội vụ, Chủ tịch Hội đồng Bộ trưởng nước CHXHCN Việt Nam. Khu lưu niệm được khánh thành năm 2004 nhân kỷ niệm 92 năm ngày sinh của đồng chí.',
    culturalValue: 'Khu lưu niệm không chỉ là nơi lưu giữ hàng trăm hiện vật, tư liệu, hình ảnh quý giá về cuộc đời hoạt động cách mạng của đồng chí Phạm Hùng mà còn là điểm hẹn văn hóa, trung tâm giáo dục lý tưởng cách mạng sâu sắc cho thế hệ trẻ hôm nay và mai sau.',
    highlights: [
      'Đền tưởng niệm tôn nghiêm với kiến trúc truyền thống',
      'Phòng trưng bày hơn 500 tư liệu và hiện vật cách mạng',
      'Mô hình phục dựng căn nhà thời niên thiếu của đồng chí Phạm Hùng',
      'Khu hoa viên cây xanh và hồ sen thanh tịnh'
    ],
    experiences: [
      'Dâng hương tưởng niệm tại đền thờ chính với lòng tri ân sâu sắc',
      'Tham quan nhà trưng bày hình ảnh, tư liệu và hiện vật gắn với quá trình hoạt động cách mạng của đồng chí Phạm Hùng',
      'Chiêm ngưỡng mô hình phục dựng căn nhà thời niên thiếu của đồng chí',
      'Dạo bước trong khuôn viên rợp bóng cây xanh, hồ sen và không gian trang nghiêm thanh tịnh'
    ],
    visitorGuide: 'Trang phục lịch sự, chỉnh tề khi vào đền tưởng niệm; đi nhẹ, nói khẽ, giữ gìn trật tự và không chạm tay vào các hiện vật trưng bày.',
    visitingHours: '07:30 – 11:30 & 13:30 – 17:00 (Mở cửa tất cả các ngày trong tuần)',
    visitingDuration: '60 – 90 phút',
    ticketPrice: 'Miễn phí vé tham quan (Hỗ trợ đoàn học sinh & khách viếng)',
    visitorNotes: 'Đoàn đông người có thể liên hệ trước với Ban Quản lý để được hướng dẫn viên thuyết minh trực tiếp.',
    environmentalNotes: 'Thực hiện nếp sống văn minh nơi di tích: Tuyệt đối không vứt rác bừa bãi, không hái hoa, bẻ cành cây xanh trong khuôn viên, giữ gìn vệ sinh chung sạch đẹp.',
    sources: {
      title: 'Cổng thông tin điện tử Sở Văn hóa, Thể thao và Du lịch tỉnh Vĩnh Long & Bảo tàng Vĩnh Long',
      url: 'https://vinhlong.gov.vn',
      author: 'Ban Quản lý Di tích tỉnh Vĩnh Long',
      editorName: 'Ban Biên tập Địa phương',
      verifiedDate: '2026-03-15',
      reviewStatus: 'Đã kiểm duyệt'
    },
    verifiedDate: '2026-03-15',
    verifiedStatus: 'Đã kiểm chứng',
    coordinates: {
      lat: 10.2366,
      lng: 105.9928
    },
    address: 'Ấp Long Thuận A, Xã Long Phước, Huyện Long Hồ, Tỉnh Vĩnh Long',
    imageUrl: '/src/assets/images/location_pham_hung_memorial_1794138195226.jpg',
    galleryUrls: [
      '/src/assets/images/location_pham_hung_memorial_1794138195226.jpg',
      '/src/assets/images/hero_vinhlong_scenery_1794138193648.jpg'
    ],
    imageCredit: 'Sở VHTTDL Vĩnh Long & Nhóm nghiên cứu KHKT',
    audioScript: 'Kính chào quý khách! Mời quý khách tìm hiểu Khu lưu niệm Chủ tịch Hội đồng Bộ trưởng Phạm Hùng – địa chỉ giáo dục truyền thống lịch sử của quê hương Vĩnh Long. Khu lưu niệm là nơi tưởng nhớ và giới thiệu về thân thế, sự nghiệp cách mạng của đồng chí Phạm Hùng, người có nhiều đóng góp cho sự nghiệp cách mạng Việt Nam. Khi tham quan, chúng ta hãy dành thời gian tìm hiểu tư liệu trưng bày, giữ gìn vệ sinh, ứng xử trang nghiêm và trân trọng giá trị lịch sử của di tích.',
    multilingualScripts: {
      vi: 'Kính chào quý khách! Mời quý khách tìm hiểu Khu lưu niệm Chủ tịch Hội đồng Bộ trưởng Phạm Hùng – địa chỉ giáo dục truyền thống lịch sử của quê hương Vĩnh Long. Khu lưu niệm là nơi tưởng nhớ và giới thiệu về thân thế, sự nghiệp cách mạng của đồng chí Phạm Hùng, người có nhiều đóng góp cho sự nghiệp cách mạng Việt Nam. Khi tham quan, chúng ta hãy dành thời gian tìm hiểu tư liệu trưng bày, giữ gìn vệ sinh, ứng xử trang nghiêm và trân trọng giá trị lịch sử của di tích.',
      en: 'Welcome visitors! We invite you to explore the Memorial Site of Council of Ministers Chairman Pham Hung – a prime historical education landmark of Vinh Long. The site commemorates the life and revolutionary career of Comrade Pham Hung. Please maintain solemnity and preserve the clean environment when visiting.',
      km: 'សូមស្វាគមន៍ភ្ញៀវទេសចរ! សូមអញ្ជើញមកទស្សនាកន្លែងរំលឹកអនុស្សាវរីយ៍ប្រធានក្រុមប្រឹក្សារដ្ឋមន្ត្រី Pham Hung ដែលជាទីតាំងប្រវត្តិសាស្ត្រដ៏ពិសិដ្ឋនៃខេត្ត Vinh Long។'
    },
    quizzes: [
      {
        id: 'ph-q1',
        question: 'Đồng chí Phạm Hùng quê hương ở đâu?',
        options: [
          'Huyện Long Hồ, tỉnh Vĩnh Long',
          'Huyện Tam Bình, tỉnh Vĩnh Long',
          'Huyện Vũng Liêm, tỉnh Vĩnh Long',
          'Thành phố Vĩnh Long'
        ],
        correctAnswer: 0,
        explanation: 'Đồng chí Phạm Hùng sinh ngày 11/6/1912 tại ấp Long Thuận, làng Long Phước, quận Châu Thành, tỉnh Vĩnh Long (nay thuộc xã Long Phước, huyện Long Hồ, tỉnh Vĩnh Long).'
      },
      {
        id: 'ph-q2',
        question: 'Đồng chí Phạm Hùng từng giữ chức vụ lãnh đạo cao nhất nào trong bộ máy Nhà nước Việt Nam?',
        options: [
          'Chủ tịch nước',
          'Chủ tịch Hội đồng Bộ trưởng (nay tương đương Thủ tướng Chính phủ)',
          'Chủ tịch Quốc hội',
          'Tổng Bí thư'
        ],
        correctAnswer: 1,
        explanation: 'Đồng chí Phạm Hùng từng giữ chức Chủ tịch Hội đồng Bộ trưởng nước CHXHCN Việt Nam từ năm 1987 đến năm 1988 (tương đương cương vị Thủ tướng Chính phủ ngày nay).'
      },
      {
        id: 'ph-q3',
        question: 'Ý nghĩa giáo dục quan trọng nhất của Khu lưu niệm Chủ tịch Hội đồng Bộ trưởng Phạm Hùng đối với học sinh là gì?',
        options: [
          'Chỉ là nơi tham quan giải trí cuối tuần',
          'Giáo dục lòng yêu nước, tinh thần cách mạng kiên trung và đạo đức lối sống cho thế hệ trẻ',
          'Tổ chức các hoạt động thương mại mua bán',
          'Nơi trưng bày các thiết bị công nghệ hiện đại'
        ],
        correctAnswer: 1,
        explanation: 'Khu lưu niệm là địa chỉ đỏ quan trọng giáo dục truyền thống yêu nước, đạo đức cách mạng mẫu mực của nhà lãnh đạo kiên trung cho thế hệ trẻ học tập và noi theo.'
      },
      {
        id: 'ph-q4',
        question: 'Khi đến dâng hương và tham quan khu tưởng niệm di tích, hành vi nào sau đây là văn minh và chuẩn mực?',
        options: [
          'Mặc quần áo lịch sự, đi nhẹ nói khẽ, không vứt rác bừa bãi',
          'Chạy nhảy, đùa giỡn lớn tiếng trong đền thờ',
          'Chạm tay vào các hiện vật lịch sử được bảo quản',
          'Bẻ hoa và cành cây trong hoa viên mang về'
        ],
        correctAnswer: 0,
        explanation: 'Tham quan di tích lịch sử đòi hỏi thái độ tôn nghiêm: trang phục kín đáo lịch sự, giữ gìn trật tự và bảo vệ cảnh quan môi trường.'
      },
      {
        id: 'ph-q5',
        question: 'Vì sao chúng ta cần bảo tồn và phát huy giá trị các di tích lịch sử văn hóa dân tộc?',
        options: [
          'Để ghi nhớ nguồn cội, trao truyền giá trị tinh thần quý báu cho các thế hệ tương lai',
          'Chỉ để thu hút khách quốc tế',
          'Bảo tồn di tích không quan trọng bằng phát triển công nghiệp',
          'Để thay thế hoàn toàn các trường học'
        ],
        correctAnswer: 0,
        explanation: 'Bảo tồn di tích lịch sử giúp gìn giữ cội nguồn văn hóa, bồi đắp lòng tự hào dân tộc và tạo nền tảng tinh thần bền vững cho sự phát triển đất nước.'
      }
    ],
    tasks: [
      {
        id: 'ph-t1',
        title: 'Quan sát và ghi chép tư liệu lịch sử',
        description: 'Lựa chọn một hiện vật hoặc bức ảnh tư liệu về đồng chí Phạm Hùng mà em ấn tượng nhất. Ghi chép lại niên đại, nội dung sự kiện và ý nghĩa của hiện vật đó.',
        type: 'observe',
        promptTip: 'Chú ý bảng chú thích hiện vật trưng bày tại gian triển lãm chính.'
      },
      {
        id: 'ph-t2',
        title: 'Tìm hiểu thân thế và sự nghiệp cách mạng',
        description: 'Tóm tắt những dấu mốc lớn trong cuộc đời hoạt động cách mạng của đồng chí Phạm Hùng từ lúc trẻ đến khi giữ cương vị Chủ tịch Hội đồng Bộ trưởng.',
        type: 'history',
        promptTip: 'Có thể kết hợp đọc tài liệu tại khu lưu niệm hoặc tra cứu nguồn tư liệu chính thống.'
      },
      {
        id: 'ph-t3',
        title: 'Đề xuất giải pháp bảo vệ cảnh quan di tích',
        description: 'Cùng nhóm bạn thảo luận và đề xuất 3 hành động cụ thể mà học sinh THCS có thể đóng góp để giữ gìn di tích xanh – sạch – đẹp và trang nghiêm.',
        type: 'environment',
        promptTip: 'Ví dụ: tổ chức phong trào nhặt rác tình nguyện, tuyên truyền ứng xử văn minh khi đi tham quan...'
      },
      {
        id: 'ph-t4',
        title: 'Viết bài thu hoạch cảm nhận truyền thống',
        description: 'Viết một đoạn văn ngắn (150 - 200 từ) chia sẻ suy nghĩ và cảm xúc tự hào sau chuyến về nguồn tại Khu lưu niệm Phạm Hùng.',
        type: 'reflection',
        promptTip: 'Nêu bật bài học về ý chí vượt khó và tinh thần phục vụ Tổ quốc của Bác Hai Phạm Hùng.'
      }
    ]
  },
  {
    id: 'ao-ba-om',
    code: 'VL-CULT-002',
    name: 'Danh lam thắng cảnh Ao Bà Om',
    area: 'Trà Vinh (trước đây)',
    category: 'culture',
    categoryLabel: 'Văn hóa – tâm linh',
    status: 'published',
    isFeatured: true,
    shortDescription: 'Thắng cảnh nổi tiếng gắn liền với huyền tích dân gian và bản sắc văn hóa đặc sắc của đồng bào Khmer Nam Bộ.',
    fullDescription: 'Ao Bà Om (còn có tên gọi là Ao Vuông) là một di tích danh thắng quốc gia nổi tiếng. Mặt ao trong xanh phẳng lặng hình chữ nhật gần vuông, được bao bọc bởi những bờ cát cao và hàng trăm cây cổ thụ sao, dầu hàng trăm năm tuổi với bộ rễ trồi lên mặt đất uốn lượn kỳ thú. Liền kề ao là Chùa Âng (Angkorajaborey) – ngôi chùa Khmer cổ kính và Bảo tàng Văn hóa dân tộc Khmer.',
    history: 'Theo truyền thuyết dân gian Khmer, ao được hình thành từ cuộc thi đào ao lấy nước ngọt giữa nhóm nam và nhóm nữ nhằm phân định ai thắng sẽ không phải đi cưới hỏi. Nhờ trí thông minh và sự khéo léo, nhóm phái nữ do bà Om chỉ huy đã chiến thắng trước bình minh. Ao đào xong được người dân trân trọng đặt tên là Ao Bà Om.',
    culturalValue: 'Ao Bà Om là trung tâm sinh hoạt văn hóa tín ngưỡng cộng đồng thiêng liêng của đồng bào Khmer. Đây là nơi diễn ra các lễ hội lớn truyền thống như Ok Om Bok (lễ cúng trăng), Chôl Chnăm Thmây và Sene Dolta, thu hút đông đảo du khách trong và ngoài nước về trẩy hội.',
    highlights: [
      'Mặt hồ xanh phẳng lặng được bao quanh bởi rặng sao dầu cổ thụ',
      'Hàng chục bộ rễ cây khổng lồ trồi lên uốn lượn như tác phẩm điêu khắc',
      'Chùa Âng cổ kính với kiến trúc Khmer truyền thống kế bên',
      'Không gian lễ hội Ok Om Bok tưng bừng rằm tháng 10 âm lịch'
    ],
    experiences: [
      'Ngắm nhìn mặt nước êm đềm và khám phá những gốc cây sao, dầu cổ thụ trăm năm tuổi với bộ rễ kỳ vĩ độc đáo',
      'Thưởng thức không khí trong lành, bình yên dưới tán rừng cây xanh mát',
      'Tham quan Chùa Âng cổ kính với kiến trúc Angkor đặc trưng kề bên',
      'Tìm hiểu đời sống và hiện vật tại Bảo tàng Văn hóa Khmer Trà Vinh',
      'Hòa mình vào không khí rộn ràng của lễ hội Ok Om Bok và thưởng thức cốm dẹp truyền thống'
    ],
    visitorGuide: 'Nên ghé thăm vào buổi sáng sớm hoặc hoàng hôn để tận hưởng không gian mát mẻ. Không leo trèo hoặc làm tổn hại lên những bộ rễ cây cổ thụ quý giá.',
    visitingHours: 'Cả ngày (06:00 – 18:00)',
    visitingDuration: '1.5 – 2.5 giờ',
    ticketPrice: 'Vào cổng tham quan tự do miễn phí',
    visitorNotes: 'Khi tham quan Chùa Âng bên cạnh, lưu ý trang phục kín đáo, cởi giày dép trước khi vào chính điện.',
    environmentalNotes: 'Ao Bà Om là lá phổi xanh và di sản sinh thái quý. Khách tham quan cần giữ gìn cảnh quan tự nhiên, thu gom rác đúng nơi quy định, không vứt túi ni lông hoặc chai nhựa xuống lòng ao.',
    sources: {
      title: 'Hồ sơ Di tích Lịch sử – Văn hóa Cấp Quốc gia Ao Bà Om (Bộ VHTT&DL công nhận năm 1994)',
      url: 'https://travinh.gov.vn',
      author: 'Sở Văn hóa, Thể thao và Du lịch',
      editorName: 'Ban Biên tập Địa phương',
      verifiedDate: '2026-03-20',
      reviewStatus: 'Đã kiểm duyệt'
    },
    verifiedDate: '2026-03-20',
    verifiedStatus: 'Đã kiểm chứng',
    coordinates: {
      lat: 9.9452,
      lng: 106.3155
    },
    address: 'Khóm 3, Phường 8, Thành phố Trà Vinh (khu vực thuộc tỉnh Vĩnh Long mới)',
    imageUrl: '/src/assets/images/location_ao_ba_om_1794138195595.jpg',
    galleryUrls: [
      '/src/assets/images/location_ao_ba_om_1794138195595.jpg',
      '/src/assets/images/hero_vinhlong_scenery_1794138193648.jpg'
    ],
    imageCredit: 'Sở VHTTDL & Nhiếp ảnh gia địa phương',
    audioScript: 'Chào mừng bạn đến với Ao Bà Om, một thắng cảnh nổi tiếng gắn với văn hóa Khmer ở vùng Trà Vinh trước đây, nay thuộc tỉnh Vĩnh Long. Ao có dáng gần vuông, mặt nước yên ả; xung quanh là những hàng cây cổ thụ tạo nên không gian xanh mát. Nơi đây còn gắn với những câu chuyện dân gian được lưu truyền trong cộng đồng. Khi tìm hiểu Ao Bà Om, chúng ta có thể khám phá cảnh quan thiên nhiên, bản sắc văn hóa Khmer và ý thức bảo vệ môi trường.',
    multilingualScripts: {
      vi: 'Chào mừng bạn đến với Ao Bà Om, một thắng cảnh nổi tiếng gắn với văn hóa Khmer ở vùng Trà Vinh trước đây, nay thuộc tỉnh Vĩnh Long. Ao có dáng gần vuông, mặt nước yên ả; xung quanh là những hàng cây cổ thụ tạo nên không gian xanh mát. Nơi đây còn gắn với những câu chuyện dân gian được lưu truyền trong cộng đồng. Khi tìm hiểu Ao Bà Om, chúng ta có thể khám phá cảnh quan thiên nhiên, bản sắc văn hóa Khmer và ý thức bảo vệ môi trường.',
      en: 'Welcome to Ba Om Pond, a renowned natural beauty associated with Khmer culture in former Tra Vinh, now in Vinh Long province. The serene pond is surrounded by centuries-old dipterocarp trees with artistic root formations.',
      km: 'សូមស្វាគមន៍មកកាន់ស្រះបារោម (Ao Bà Om) ជាទីកម្សាន្តធម្មជាតិល្បីល្បាញផ្សារភ្ជាប់នឹងវប្បធម៌ខ្មែរនៅតំបន់ត្រាវិញពីមុន ឥឡូវជាខេត្តវិញឡុង។'
    },
    quizzes: [
      {
        id: 'ao-q1',
        question: 'Ao Bà Om còn có tên gọi dân gian nào khác do hình dáng độc đáo của nó?',
        options: [
          'Ao Tròn',
          'Ao Vuông',
          'Ao Sen',
          'Hồ Tây Nam Bộ'
        ],
        correctAnswer: 1,
        explanation: 'Ao Bà Om còn được gọi là Ao Vuông vì mặt nước có hình dáng chữ nhật gần như vuông (dài khoảng 500m, rộng khoảng 300m).'
      },
      {
        id: 'ao-q2',
        question: 'Theo truyền thuyết dân gian, ai là người đã lãnh đạo nhóm phụ nữ giành chiến thắng trong cuộc thi đào ao?',
        options: [
          'Bà Trưng',
          'Bà Triệu',
          'Bà Om',
          'Bà Chúa Xứ'
        ],
        correctAnswer: 2,
        explanation: 'Theo truyền thuyết dân gian Khmer, người phụ nữ tài trí lãnh đạo nhóm phái nữ đào ao thắng cuộc tên là bà Om, do đó ao mang tên Ao Bà Om.'
      },
      {
        id: 'ao-q3',
        question: 'Lễ hội truyền thống đặc sắc nào của đồng bào Khmer thường được tổ chức tưng bừng tại quần thể thắng cảnh Ao Bà Om?',
        options: [
          'Lễ hội Ok Om Bok (Lễ Cúng Trăng)',
          'Lễ hội đâm trâu',
          'Lễ hội Chùa Hương',
          'Lễ hội Cầu Ngư'
        ],
        correctAnswer: 0,
        explanation: 'Ao Bà Om là nơi diễn ra lễ hội Ok Om Bok lớn nhất hàng năm vào rằm tháng 10 âm lịch, với các hoạt động thả đèn hoa đăng, thi đấu thể thao dân gian và đút cốm dẹp.'
      },
      {
        id: 'ao-q4',
        question: 'Cây cối bao bọc xung quanh Ao Bà Om có đặc điểm gì nổi bật khiến du khách thích thú?',
        options: [
          'Là rừng tràm ngập nước',
          'Hàng trăm cây sao, dầu cổ thụ với bộ rễ khổng lồ uốn lượn trên mặt cát',
          'Vườn hoa anh đào nhân tạo',
          'Những cánh đồng lau sậy'
        ],
        correctAnswer: 1,
        explanation: 'Bao quanh ao là những hàng cổ thụ sao, dầu hàng trăm năm tuổi có bộ rễ trồi lên mặt đất với những hình thù kỳ thú, tạo nên cảnh sắc thiên nhiên độc đáo hiếm có.'
      },
      {
        id: 'ao-q5',
        question: 'Hành động nào sau đây giúp gìn giữ và bảo vệ cảnh quan Ao Bà Om xanh sạch đẹp?',
        options: [
          'Tự giác bỏ rác vào thùng, không xả rác xuống ao và không khắc tên lên rễ cây cổ thụ',
          'Leo trèo bẻ gãy rễ cây để chụp ảnh check-in',
          'Thả các loài rùa tai đỏ hoặc cá ngoại lai xâm hại vào ao',
          'Đốt lửa trại dưới gốc cây sao cổ thụ'
        ],
        correctAnswer: 0,
        explanation: 'Bảo vệ di tích sinh thái đòi hỏi ý thức cộng đồng: không vứt rác, không leo trèo làm hư hại bộ rễ cây và giữ gìn môi trường sống tự nhiên.'
      }
    ],
    tasks: [
      {
        id: 'ao-t1',
        title: 'Khám phá huyền tích dân gian và phân biệt sử liệu',
        description: 'Kể lại tóm tắt câu chuyện dân gian về cuộc thi đào ao của bà Om, phân tích ý nghĩa ca ngợi sự thông minh của phụ nữ và làm rõ đây là truyền thuyết dân gian bổ trợ cho di tích.',
        type: 'culture',
        promptTip: 'Ghi nhớ lời dặn trong bài thuyết minh: phân biệt rõ giữa truyền thuyết truyền miệng và tư liệu lịch sử.'
      },
      {
        id: 'ao-t2',
        title: 'Tìm hiểu kiến trúc Chùa Âng kề bên',
        description: 'Ghi lại 3 nét hoa văn, kiến trúc tiêu biểu của ngôi chùa Khmer cổ kính nằm cạnh Ao Bà Om.',
        type: 'observe',
        promptTip: 'Chú ý mái ngói nhiều tầng cong vút và tượng thần chim Krud, tượng rắn thần Naga.'
      },
      {
        id: 'ao-t3',
        title: 'Thiết kế thông điệp bảo vệ cổ thụ',
        description: 'Vẽ hoặc viết một khẩu hiệu ngắn gọn kêu gọi du khách chung tay không xâm hại những gốc cây cổ thụ trăm năm tuổi tại Ao Bà Om.',
        type: 'environment',
        promptTip: 'Khẩu hiệu nên ngắn gọn, dễ nhớ, tạo cảm xúc yêu quý thiên nhiên.'
      },
      {
        id: 'ao-t4',
        title: 'Chụp ảnh và viết lời giới thiệu du lịch thông minh',
        description: 'Đóng vai một hướng dẫn viên du lịch nhí, viết một đoạn thuyết trình ngắn 1 phút mời du khách bạn bè đến trải nghiệm lễ hội Ok Om Bok.',
        type: 'reflection',
        promptTip: 'Nhắc đến không khí thả đèn nước lung linh và món cốm dẹp thơm ngon truyền thống.'
      }
    ]
  },
  {
    id: 'bien-ba-dong',
    code: 'VL-COAST-003',
    name: 'Khu du lịch Biển Ba Động',
    area: 'Trà Vinh (trước đây)',
    category: 'coastal',
    categoryLabel: 'Du lịch biển',
    status: 'published',
    isFeatured: true,
    shortDescription: 'Bãi biển thơ mộng miền Duyên hải Tây Nam Bộ với hàng phi lao chắn gió, cát mịn và hải sản phong phú.',
    fullDescription: 'Biển Ba Động tọa lạc tại xã Trường Long Hòa, thị xã Duyên Hải. Đây là bãi biển hiếm hoi ở vùng Đồng bằng sông Cửu Long sở hữu dải cát dài thoai thoải, dòng nước biển trong xanh theo mùa cùng những hàng phi lao (dương xanh) rì rào trong gió biển. Nơi đây từ đầu thế kỷ 20 đã được khai thác làm nơi nghỉ dưỡng với tên gọi Ba Động vì khi thủy triều xuống bộc lộ ba đụn cát nhấp nhô tuyệt đẹp.',
    history: 'Vào thời kỳ thực dân Pháp, người Pháp đã cho xây dựng một khu nghỉ mát tại Ba Động dành cho các quan chức. Trong hai cuộc kháng chiến chống Pháp và chống Mỹ, vùng biển Ba Động và Duyên Hải là căn cứ địa cách mạng quan trọng, điểm tiếp nhận những chuyến tàu Không số chở vũ khí từ miền Bắc vào chi viện cho chiến trường miền Nam trên Đường Hồ Chí Minh trên biển.',
    culturalValue: 'Biển Ba Động thể hiện nét đặc trưng sinh động của đời sống ngư dân miền duyên hải: nghề đánh bắt gần bờ, cào nghêu, đóng đáy, nghề làm muối và cánh đồng quạt gió năng lượng sạch hiện đại. Đây cũng là nơi du khách trải nghiệm ẩm thực hải sản trù phú như chù ụ rang me, dưa bồn bồn, nghêu, tôm sú.',
    highlights: [
      'Bãi cát thoai thoải trải dài ven hàng phi lao rì rào chắn sóng',
      'Check-in cánh đồng tuabin điện gió Duyên Hải kỳ vĩ',
      'Di tích bến tàu Không số trên Đường Hồ Chí Minh trên biển',
      'Đặc sản ẩm thực độc đáo: con chù ụ rang me, bánh tét Trà Cuôn'
    ],
    experiences: [
      'Dạo bước trên bãi cát mịn dưới bóng mát của rặng phi lao chắn sóng',
      'Đón bình minh rạng rỡ và hoàng hôn lộng gió trên biển Tây Nam',
      'Tham quan cánh đồng điện gió Duyên Hải với những trụ tuabin gió khổng lồ kỳ vĩ',
      'Tìm hiểu văn hóa làng chài, trải nghiệm cào nghêu và sinh hoạt cùng ngư dân địa phương',
      'Thưởng thức các đặc sản biển độc đáo như con chù ụ, cua biển, cá khoai'
    ],
    visitorGuide: 'Tuân thủ các biển báo an toàn cứu hộ bờ biển; không bơi ra xa khi có sóng lớn hoặc thủy triều xuống mạnh; luôn mang áo phao khi tham gia các hoạt động trên mặt nước.',
    visitingHours: 'Cả ngày (khuyến khích 05:30 – 18:30)',
    visitingDuration: 'Nửa ngày hoặc 1 ngày',
    ticketPrice: 'Vào bãi biển miễn phí (Các dịch vụ chòi nghỉ, ăn uống tính phí riêng)',
    visitorNotes: 'Nên chuẩn bị kem chống nắng, mũ nón và dép nhẹ đi biển.',
    environmentalNotes: 'Cực kỳ chú trọng bảo vệ môi trường biển: Tuyệt đối không xả rác thải nhựa, bao bì, chai nước trên bãi cát; tích cực tham gia chiến dịch làm sạch bãi biển xanh, chung tay giảm thiểu rác thải nhựa đại dương.',
    sources: {
      title: 'Địa chí Văn hóa Du lịch Duyên Hải – Sở Văn hóa, Thể thao và Du lịch',
      url: 'https://travinh.gov.vn/du-lich-bien-ba-dong',
      author: 'Trung tâm Xúc tiến Du lịch',
      editorName: 'Ban Biên tập Địa phương',
      verifiedDate: '2026-03-25',
      reviewStatus: 'Đã kiểm duyệt'
    },
    verifiedDate: '2026-03-25',
    verifiedStatus: 'Đã kiểm chứng',
    coordinates: {
      lat: 9.6868,
      lng: 106.5684
    },
    address: 'Ấp Nhà Mát, Xã Trường Long Hòa, Thị xã Duyên Hải (vùng duyên hải tỉnh Vĩnh Long mới)',
    imageUrl: '/src/assets/images/location_bien_ba_dong_1794138196028.jpg',
    galleryUrls: [
      '/src/assets/images/location_bien_ba_dong_1794138196028.jpg',
      '/src/assets/images/hero_vinhlong_scenery_1794138193648.jpg'
    ],
    imageCredit: 'Trung tâm Xúc tiến Du lịch',
    audioScript: 'Xin chào quý khách! Biển Ba Động là điểm đến ven biển thuộc khu vực Trà Vinh trước đây, nay thuộc tỉnh Vĩnh Long. Bãi biển có nét riêng của vùng ven biển Đồng bằng sông Cửu Long, với bờ cát, hàng dương và không gian biển thoáng đãng. Khi đến đây, du khách có thể tìm hiểu đời sống cư dân ven biển, cảnh quan tự nhiên và các hoạt động gắn với biển. Mỗi người hãy cùng giữ gìn vệ sinh, không xả rác và tuân thủ hướng dẫn an toàn khi tắm biển.',
    multilingualScripts: {
      vi: 'Xin chào quý khách! Biển Ba Động là điểm đến ven biển thuộc khu vực Trà Vinh trước đây, nay thuộc tỉnh Vĩnh Long. Bãi biển có nét riêng của vùng ven biển Đồng bằng sông Cửu Long, với bờ cát, hàng dương và không gian biển thoáng đãng. Khi đến đây, du khách có thể tìm hiểu đời sống cư dân ven biển, cảnh quan tự nhiên và các hoạt động gắn với biển. Mỗi người hãy cùng giữ gìn vệ sinh, không xả rác và tuân thủ hướng dẫn an toàn khi tắm biển.',
      en: 'Hello visitors! Ba Dong Beach is an attractive coastal destination in former Tra Vinh, now in Vinh Long province. It offers a scenic shoreline lined with casuarina pine trees, fresh seafood, and modern offshore wind turbines.',
      km: 'សូមជម្រាបសួរភ្ញៀវទេសចរ! ឆ្នេរសមុទ្រ Ba Dong ជាគោលដៅទេសចរណ៍មាត់សមុទ្រដ៏ស្រស់ស្អាតនៅតំបន់ត្រាវិញពីមុន ឥឡូវជាខេត្តវិញឡុង។'
    },
    quizzes: [
      {
        id: 'bd-q1',
        question: 'Tên gọi "Ba Động" xuất phát từ đặc điểm địa hình tự nhiên nào?',
        options: [
          'Có ba hang động đá vôi lớn',
          'Có ba động cát (đụn cát) nhô cao nhấp nhô khi thủy triều rút xuống',
          'Có ba dòng sông cùng đổ ra biển',
          'Do ba hòn đảo nhỏ ngoài khơi'
        ],
        correctAnswer: 1,
        explanation: 'Tên gọi Ba Động bắt nguồn từ việc khi thủy triều rút, bờ biển bộc lộ ba đụn cát (động cát) thoai thoải tuyệt đẹp.'
      },
      {
        id: 'bd-q2',
        question: 'Cây chắn sóng, chắn gió phổ biến nhất tạo nên vẻ đẹp xanh mát cho bờ biển Ba Động là cây gì?',
        options: [
          'Cây bạch đàn',
          'Cây phi lao (cây dương)',
          'Cây cao su',
          'Cây thông tuyết'
        ],
        correctAnswer: 1,
        explanation: 'Rặng phi lao (cây dương) xanh ngát chạy dài dọc bờ biển có tác dụng chắn gió bão cát và mang lại bóng mát dễ chịu cho du khách.'
      },
      {
        id: 'bd-q3',
        question: 'Công trình công nghệ xanh hiện đại nào nằm gần khu vực Biển Ba Động trở thành điểm tham quan check-in nổi tiếng?',
        options: [
          'Nhà máy nhiệt điện than cũ',
          'Nhà máy điện hạt nhân',
          'Cánh đồng điện gió (tuabin gió ngoài khơi)',
          'Khu lọc hóa dầu'
        ],
        correctAnswer: 2,
        explanation: 'Dự án các cánh đồng điện gió Duyên Hải với những cánh quạt khổng lồ vươn mình trên biển là điểm nhấn ấn tượng của phát triển năng lượng xanh.'
      },
      {
        id: 'bd-q4',
        question: 'Loài giáp xác đặc sản nổi tiếng nào của vùng biển Ba Động thường được chế biến món rang me thơm ngon?',
        options: [
          'Con tôm hùm Alaska',
          'Con chù ụ',
          'Con cá hồi',
          'Con bạch tuộc khổng lồ'
        ],
        correctAnswer: 1,
        explanation: 'Chù ụ thuộc họ cua, sống ở vùng rừng ngập mặn và bãi bồi ven biển Ba Động, có thịt thơm ngọt, đặc biệt món chù ụ rang me là đặc sản nức tiếng.'
      },
      {
        id: 'bd-q5',
        question: 'Vì sao việc giảm thiểu rác thải nhựa tại bờ biển Ba Động lại có ý nghĩa sống còn đối với sinh thái?',
        options: [
          'Rác thải nhựa không phân hủy làm chết sinh vật biển và gây ô nhiễm nguồn hải sản của con người',
          'Rác nhựa làm tăng thêm màu sắc cho bãi cát',
          'Nhựa giúp nước biển sạch hơn',
          'Rác thải nhựa không ảnh hưởng gì đến biển'
        ],
        correctAnswer: 0,
        explanation: 'Rác nhựa mất hàng trăm năm để phân hủy, gây nghẹt thở cho rùa biển, chim biển và vỡ vụn thành vi nhựa xâm nhập vào chuỗi thức ăn con người.'
      }
    ],
    tasks: [
      {
        id: 'bd-t1',
        title: 'Tìm hiểu đời sống ngư dân ven biển',
        description: 'Quan sát và ghi chép lại các công việc thường nhật của ngư dân làng chài Ba Động (chuẩn bị thuyền, gỡ lưới, phân loại cá tôm).',
        type: 'observe',
        promptTip: 'Có thể trò chuyện ngắn với các bác ngư dân đang neo thuyền cạnh bờ.'
      },
      {
        id: 'bd-t2',
        title: 'Chiến dịch "Bãi biển Không rác thải nhựa"',
        description: 'Lập kế hoạch một buổi sinh hoạt Đội/Đoàn trường cùng các bạn học sinh thu gom 100 chiếc vỏ chai nhựa trên bãi cát và mang về điểm tái chế.',
        type: 'environment',
        promptTip: 'Đừng quên mang bao tay bảo hộ và túi vải đựng rác tái chế.'
      },
      {
        id: 'bd-t3',
        title: 'Tìm hiểu di tích Bến tiếp nhận vũ khí Cà Mau - Trà Vinh',
        description: 'Tra cứu sự kiện tàu Không số cập bến duyên hải trong chiến tranh vệ quốc và ý nghĩa của Đường Hồ Chí Minh trên biển.',
        type: 'history',
        promptTip: 'Ghi lại bài học về lòng quả cảm kiên cường của các chiến sĩ hải quân.'
      },
      {
        id: 'bd-t4',
        title: 'Cảm nghĩ sau chuyến đi thực địa biển quê hương',
        description: 'Viết bức thư gửi bạn bè phương xa giới thiệu về vẻ đẹp hoang sơ của Biển Ba Động và tình cảm gắn bó với biển đảo quê hương.',
        type: 'reflection',
        promptTip: 'Bày tỏ mong muốn gìn giữ biển quê hương luôn trong xanh và thanh bình.'
      }
    ]
  },
  {
    id: 'lo-gom-mang-thit',
    code: 'VL-CRAFT-004',
    name: 'Làng gốm đỏ Mang Thít – Vương quốc Đỏ',
    area: 'Vĩnh Long',
    category: 'craft',
    categoryLabel: 'Làng nghề truyền thống',
    status: 'published',
    isFeatured: true,
    shortDescription: 'Di sản làng nghề gạch gốm đỏ thủ công độc nhất vô nhị trải dọc kênh Thầy Cai và sông Cổ Chiên.',
    fullDescription: 'Huyện Mang Thít, tỉnh Vĩnh Long được mệnh danh là "Vương quốc đỏ" với hàng ngàn lò gạch gốm san sát nhau hình vòm nung đỏ rực soi bóng bên dòng kênh Thầy Cai. Nghề sản xuất gạch gốm nơi đây đã tồn tại hơn 100 năm, tạo ra những sản phẩm gốm đất sét nung đỏ mang nét đẹp mộc mạc xuất khẩu khắp thế giới.',
    history: 'Từ cuối thế kỷ 19, nguồn đất sét phù sa dồi dào dọc sông Cổ Chiên đã hình thành nên nghề làm gạch nung thủ công. Trải qua hơn một thế kỷ thăng trầm, vùng đất Mang Thít từng có hơn 2.000 miệng lò hoạt động rực lửa ngày đêm. Hiện nay, tỉnh Vĩnh Long đang triển khai đề án "Di sản đương đại Mang Thít" để bảo tồn các lò gạch cổ thành điểm đến du lịch di sản độc đáo.',
    culturalValue: 'Mỗi lò gạch Mang Thít như một tác phẩm kiến trúc vòm tự nhiên kỳ vĩ. Làng nghề là minh chứng sống động cho bàn tay tài hoa, khối óc sáng tạo và tinh thần lao động bền bỉ của người dân miền Tây sông nước.',
    highlights: [
      'Quần thể hàng ngàn lò gạch vòm đỏ san sát soi bóng kênh Thầy Cai',
      'Đề án Di sản Đương đại Mang Thít tầm cỡ quốc tế',
      'Trải nghiệm xoay gốm trên bàn xoay và nung thủ công cùng nghệ nhân'
    ],
    experiences: [
      'Đi thuyền trên kênh Thầy Cai chiêm ngưỡng quần thể lò nung gạch đất nung cổ kính',
      'Tham quan bên trong lò nung vòm với hiệu ứng ánh sáng tự nhiên huyền ảo từ miệng lò',
      'Trải nghiệm tự tay chuốt gốm trên bàn xoay và nặn đất sét cùng nghệ nhân địa phương',
      'Check-in chụp ảnh với sắc đỏ nồng ấm của gạch nung miền sông nước'
    ],
    visitorGuide: 'Nên mang giày mềm chống trượt khi đi tham quan lò nung; tôn trọng nơi làm việc của các thợ thủ công; đi lại cẩn thận ven mép kênh.',
    visitingHours: '07:00 – 17:30 hằng ngày',
    visitingDuration: '2 – 3 giờ',
    ticketPrice: 'Miễn phí tham quan dọc tuyến kênh (Một số xưởng gốm trải nghiệm thu phí 30.000đ – 50.000đ/người)',
    visitorNotes: 'Cần chú ý an toàn tàu thuyền khi di chuyển trên kênh.',
    environmentalNotes: 'Ủng hộ đề án chuyển đổi công nghệ nung thân thiện với môi trường, hạn chế khói bụi và giữ gìn dòng kênh trong xanh sạch sẽ.',
    sources: {
      title: 'Đề án Di sản Đương đại Mang Thít – UBND tỉnh Vĩnh Long',
      url: 'https://vinhlong.gov.vn/di-san-mang-thit',
      author: 'Sở Kế hoạch & Đầu tư tỉnh Vĩnh Long',
      editorName: 'Ban Biên tập Địa phương',
      verifiedDate: '2026-03-10',
      reviewStatus: 'Đã kiểm duyệt'
    },
    verifiedDate: '2026-03-10',
    verifiedStatus: 'Đã kiểm chứng',
    coordinates: {
      lat: 10.1585,
      lng: 106.0712
    },
    address: 'Dọc dòng kênh Thầy Cai, Xã Mỹ Phước & Nhơn Phú, Huyện Mang Thít, Tỉnh Vĩnh Long',
    imageUrl: '/src/assets/images/location_gom_mang_thit_1794138196802.jpg',
    galleryUrls: [
      '/src/assets/images/location_gom_mang_thit_1794138196802.jpg',
      '/src/assets/images/hero_vinhlong_scenery_1794138193648.jpg'
    ],
    imageCredit: 'Sở VHTTDL tỉnh Vĩnh Long',
    audioScript: 'Chào mừng quý khách đến với Làng gốm đỏ Mang Thít, nơi được mệnh danh là Vương quốc Đỏ của tỉnh Vĩnh Long! Trải dọc theo dòng kênh Thầy Cai là hàng ngàn lò gạch gốm đất nung hình vòm độc đáo có tuổi đời hơn một thế kỷ. Nơi đây kết tinh bàn tay tài hoa của những người thợ làm gốm miền Tây. Khi tham quan, quý khách hãy cùng trân trọng di sản làng nghề truyền thống và ủng hộ các sản phẩm thủ công tinh tế của quê hương Vĩnh Long.',
    multilingualScripts: {
      vi: 'Chào mừng quý khách đến với Làng gốm đỏ Mang Thít, nơi được mệnh danh là Vương quốc Đỏ của tỉnh Vĩnh Long! Trải dọc theo dòng kênh Thầy Cai là hàng ngàn lò gạch gốm đất nung hình vòm độc đáo có tuổi đời hơn một thế kỷ.',
      en: 'Welcome to Mang Thit Red Ceramic Village, known as the Kingdom of Red Ceramics in Vinh Long! Thousands of dome-shaped red brick kilns line the canal with over a century of artisanal heritage.'
    },
    quizzes: [
      {
        id: 'mt-q1',
        question: 'Vì sao huyện Mang Thít thuộc tỉnh Vĩnh Long được ví von là "Vương quốc Đỏ"?',
        options: [
          'Vì trồng rất nhiều cây hoa phượng đỏ',
          'Vì tập trung hàng ngàn lò nung gạch gốm đỏ hình vòm san sát bên bờ kênh',
          'Vì đất đai ở đây có màu đỏ bazan núi lửa',
          'Vì người dân thường mặc áo đỏ'
        ],
        correctAnswer: 1,
        explanation: 'Mang Thít được mệnh danh là Vương quốc Đỏ bởi quần thể hàng ngàn lò gạch gốm đất sét nung đỏ rực trải dài hàng chục km dọc theo kênh rạch.'
      },
      {
        id: 'mt-q2',
        question: 'Đề án phát triển du lịch di sản quan trọng nào đang được tỉnh Vĩnh Long triển khai tại đây?',
        options: [
          'Đề án Thành phố công nghiệp nặng',
          'Đề án Di sản đương đại Mang Thít',
          'Đề án Đô thị thông minh sa mạc',
          'Đề án Trung tâm thương mại siêu thị'
        ],
        correctAnswer: 1,
        explanation: 'Đề án "Di sản đương đại Mang Thít" nhằm bảo tồn quần thể lò gạch cổ và chuyển đổi làng nghề thành điểm đến du lịch di sản văn hóa đặc sắc quốc tế.'
      },
      {
        id: 'mt-q3',
        question: 'Nguyên liệu tự nhiên quý giá nào tạo nên chất lượng gốm đất nung Mang Thít nổi tiếng?',
        options: [
          'Đất sét phù sa trầm tích mịn dẻo từ dòng sông Cổ Chiên',
          'Đá hoa cương',
          'Cát trắng sa mạc',
          'Xi măng công nghiệp'
        ],
        correctAnswer: 0,
        explanation: 'Dòng sông Cổ Chiên bồi đắp nguồn đất sét phù sa dẻo mịn đặc biệt, khi nung ở nhiệt độ cao cho ra màu đỏ gạch tự nhiên đượm đà và bền chắc.'
      },
      {
        id: 'mt-q4',
        question: 'Hình dáng kiến trúc đặc trưng nhất của những chiếc lò gạch nung Mang Thít là gì?',
        options: [
          'Hình khối lập phương',
          'Hình tháp vòm tròn tựa như một tòa lâu đài thu nhỏ',
          'Hình tam giác nhọn',
          'Hình chữ nhật phẳng'
        ],
        correctAnswer: 1,
        explanation: 'Lò nung Mang Thít có dáng vòm tròn thuôn dần lên trên như quả chuông úp hay lâu đài cổ, giúp đối lưu nhiệt độ hoàn hảo khi nung chín gốm.'
      },
      {
        id: 'mt-q5',
        question: 'Thế hệ trẻ chúng ta có thể làm gì để lan tỏa giá trị của làng nghề gốm thủ công quê hương?',
        options: [
          'Quảng bá hình ảnh làng nghề qua các sản phẩm truyền thông số, tôn vinh nghệ nhân',
          'Không quan tâm vì làm gốm là việc vất vả',
          'Khuyên nghệ nhân đập bỏ toàn bộ lò cổ',
          'Chê bai các sản phẩm thủ công mỹ nghệ'
        ],
        correctAnswer: 0,
        explanation: 'Ứng dụng công nghệ số và truyền thông để giới thiệu vẻ đẹp di sản làng gốm Mang Thít giúp gìn giữ nghề truyền thống và phát triển du lịch bền vững.'
      }
    ],
    tasks: [
      {
        id: 'mt-t1',
        title: 'Ghi chép quy trình tạo ra một sản phẩm gốm đỏ',
        description: 'Quan sát và ghi lại các bước chính: lấy đất, nhồi đất, tạo hình trên bàn xoay, phơi khô mộc và đưa vào lò nung.',
        type: 'observe',
        promptTip: 'Hỏi thăm nghệ nhân về thời gian nung và cách canh lửa lò.'
      },
      {
        id: 'mt-t2',
        title: 'Khám phá kiến trúc lò nung vòm kỳ thú',
        description: 'Đo lường và ước tính chiều cao, đường kính chân lò, ghi nhận cảm xúc khi đứng dưới vòm ánh sáng tự nhiên chiếu rọi từ đỉnh lò.',
        type: 'culture',
        promptTip: 'Góc chụp từ đáy lò hướng lên bầu trời cho bức ảnh nghệ thuật tuyệt đẹp.'
      },
      {
        id: 'mt-t3',
        title: 'Sáng kiến bảo vệ môi trường làng nghề',
        description: 'Đề xuất giải pháp xử lý khói bụi và chuyển đổi nhiên liệu sạch (trấu, điện) để giữ bầu không khí làng nghề trong lành.',
        type: 'environment',
        promptTip: 'Gắn liền với định hướng phát triển du lịch xanh của địa phương.'
      },
      {
        id: 'mt-t4',
        title: 'Ý tưởng số hóa làng nghề gốm Mang Thít',
        description: 'Đề xuất ý tưởng xây dựng tour tham quan ảo 3D hoặc mã QR thuyết minh gắn tại các lò gạch mẫu.',
        type: 'reflection',
        promptTip: 'Liên hệ trực tiếp với giải pháp Smart Tourism mà nhóm tác giả đang nghiên cứu.'
      }
    ]
  },
  {
    id: 'cu-lao-an-binh',
    code: 'VL-ECO-005',
    name: 'Cù lao An Bình – Thiên đường Miệt vườn',
    area: 'Vĩnh Long',
    category: 'eco',
    categoryLabel: 'Sinh thái – miệt vườn',
    status: 'published',
    isFeatured: true,
    shortDescription: 'Miệt vườn cây trái trĩu quả bốn mùa giữa bốn bề sông nước Tiền Giang và Cổ Chiên.',
    fullDescription: 'Cù lao An Bình gồm 4 xã (An Bình, Bình Hòa Phước, Hòa Ninh và Đồng Phú) thuộc huyện Long Hồ. Nơi đây được phù sa hai nhánh sông Tiền và Cổ Chiên bồi đắp quanh năm, tạo nên những vườn cây ăn trái sum suê nổi tiếng như chôm chôm, sầu riêng, nhãn xuồng, măng cụt cùng hệ sinh thái homestay miệt vườn đặc sắc.',
    history: 'Từ thế kỷ 18, vùng đất cù lao trù phú này đã đón những lưu dân người Việt đến khai hoang lập ấp. Nhờ hệ thống kinh rạch chằng chịt và nguồn nước ngọt mát lành, An Bình nhanh chóng trở thành trung tâm cung cấp hoa thơm trái ngọt hàng đầu miền Nam. Nơi đây cũng lưu giữ ngôi chùa Tiên Châu cổ kính hơn 250 năm tuổi.',
    culturalValue: 'Cù lao An Bình là cái nôi của mô hình du lịch sinh thái nông nghiệp và homestay cộng đồng Vĩnh Long. Du khách được sống trong không gian nhà rường gỗ Nam Bộ, nghe đờn ca tài tử Nam Bộ – Di sản văn hóa phi vật thể của nhân loại, và cảm nhận sự hiếu khách, chân tình của người dân Tây Nam Bộ.',
    highlights: [
      'Vườn cây ăn trái trĩu quả bốn mùa: chôm chôm, sầu riêng, nhãn xuồng',
      'Đò chèo len lỏi qua rạch dừa nước rợp bóng mát',
      'Chùa cổ Tiên Châu hơn 250 năm bên bờ sông Cổ Chiên',
      'Đờn ca tài tử Nam Bộ và ẩm thực cá lóc nướng trui miệt vườn'
    ],
    experiences: [
      'Đi đò chèo len lỏi qua các con rạch nhỏ rợp bóng dừa nước',
      'Tự tay hái và thưởng thức chôm chôm chín đỏ, sầu riêng chín cây tại vườn',
      'Thưởng thức đờn ca tài tử Nam Bộ trong không gian nhà vườn thanh tịnh',
      'Trải nghiệm tát mương bắt cá và thưởng thức cá lóc nướng trui cuộn bánh tráng rau rừng',
      'Đạp xe dạo quanh đường làng rợp bóng cây xanh'
    ],
    visitorGuide: 'Nên đi vào mùa trái cây chín rộ từ tháng 5 đến tháng 8 âm lịch. Tôn trọng cây trái của nhà vườn, chỉ hái khi có sự hướng dẫn của gia chủ.',
    visitingHours: '06:30 – 18:00 hằng ngày',
    visitingDuration: 'Nửa ngày đến 1 ngày (hoặc nghỉ dưỡng homestay qua đêm)',
    ticketPrice: 'Vé vào vườn trái cây: 50.000đ – 80.000đ/người (bao bụng ăn chôm chôm/nhãn)',
    visitorNotes: 'Mang trang phục thoải mái, nón rộng vành và thuốc chống côn trùng khi đi dạo vườn.',
    environmentalNotes: 'Giữ gìn dòng kênh không rác thải; không sử dụng túi ni lông một lần khi tham quan vườn; bảo vệ đa dạng sinh học các loài cây cỏ bản địa.',
    sources: {
      title: 'Tài liệu hướng dẫn Du lịch Sinh thái Cù lao An Bình – Trung tâm Thông tin Xúc tiến Du lịch Vĩnh Long',
      url: 'https://vinhlongtourist.vn',
      author: 'Sở VHTTDL tỉnh Vĩnh Long',
      editorName: 'Ban Biên tập Địa phương',
      verifiedDate: '2026-03-01',
      reviewStatus: 'Đã kiểm duyệt'
    },
    verifiedDate: '2026-03-01',
    verifiedStatus: 'Đã kiểm chứng',
    coordinates: {
      lat: 10.2745,
      lng: 105.9878
    },
    address: 'Các xã An Bình, Bình Hòa Phước, Hòa Ninh, Đồng Phú, Huyện Long Hồ, Tỉnh Vĩnh Long',
    imageUrl: '/src/assets/images/hero_vinhlong_scenery_1794138193648.jpg',
    galleryUrls: [
      '/src/assets/images/hero_vinhlong_scenery_1794138193648.jpg',
      '/src/assets/images/location_pham_hung_memorial_1794138195226.jpg'
    ],
    imageCredit: 'Trung tâm Xúc tiến Du lịch Vĩnh Long',
    audioScript: 'Kính chào quý khách! Mời quý khách ghé thăm Cù lao An Bình, viên ngọc xanh miệt vườn giữa dòng sông Tiền và Cổ Chiên của tỉnh Vĩnh Long. Đến với An Bình, quý khách sẽ được tận hưởng không khí trong lành, tự tay hái những trái chôm chôm, nhãn xuồng trĩu quả ngọt lành, lắng nghe câu đờn ca tài tử mộc mạc và cảm nhận tình người nồng hậu của quê hương Vĩnh Long.',
    multilingualScripts: {
      vi: 'Kính chào quý khách! Mời quý khách ghé thăm Cù lao An Bình, viên ngọc xanh miệt vườn giữa dòng sông Tiền và Cổ Chiên của tỉnh Vĩnh Long.',
      en: 'Welcome to An Binh Island, the lush eco-fruit paradise situated between Tien and Co Chien rivers in Vinh Long province!'
    },
    quizzes: [
      {
        id: 'ab-q1',
        question: 'Cù lao An Bình được phù sa của hai nhánh sông lớn nào bồi đắp quanh năm?',
        options: [
          'Sông Hồng và sông Thái Bình',
          'Sông Tiền và sông Cổ Chiên',
          'Sông Đồng Nai và sông Sài Gòn',
          'Sông Ba và sông Trà Khúc'
        ],
        correctAnswer: 1,
        explanation: 'Cù lao An Bình nằm giữa dòng chảy hiền hòa của sông Tiền và sông Cổ Chiên, đón nhận lượng phù sa dồi dào giúp đất đai màu mỡ quanh năm.'
      },
      {
        id: 'ab-q2',
        question: 'Loại hình nghệ thuật truyền thống nào được UNESCO công nhận là Di sản văn hóa phi vật thể mà du khách thường được thưởng thức tại An Bình?',
        options: [
          'Hát Quan họ Bắc Ninh',
          'Đờn ca tài tử Nam Bộ',
          'Nhã nhạc Cung đình Huế',
          'Hát Xoan Phú Thọ'
        ],
        correctAnswer: 1,
        explanation: 'Đờn ca tài tử Nam Bộ là nét văn hóa tinh thần đặc sắc không thể thiếu trong các buổi đón tiếp khách tại nhà vườn cù lao An Bình.'
      },
      {
        id: 'ab-q3',
        question: 'Ngôi chùa cổ có niên đại hơn 250 năm nổi tiếng trên cù lao An Bình mang tên là gì?',
        options: [
          'Chùa Một Cột',
          'Chùa Tiên Châu (Di Đà Tự)',
          'Chùa Bái Đính',
          'Chùa Thiên Mụ'
        ],
        correctAnswer: 1,
        explanation: 'Chùa Tiên Châu tọa lạc bên bờ sông Cổ Chiên thuộc cù lao An Bình, được xây dựng từ giữa thế kỷ 18 với kiến trúc gỗ cổ kính thanh tịnh.'
      },
      {
        id: 'ab-q4',
        question: 'Món ăn dân dã đặc trưng nào thường gắn liền với hoạt động trải nghiệm "tát mương bắt cá" ở miệt vườn?',
        options: [
          'Pizza hải sản',
          'Cá lóc nướng trui cuốn bánh tráng',
          'Bánh mỳ kẹp xúc xích',
          'Bò bít tết khoai tây'
        ],
        correctAnswer: 1,
        explanation: 'Cá lóc đồng nướng trui rơm thơm lừng cuốn với bánh tráng, rau sống vườn nhà và chấm mắm me là trải nghiệm ẩm thực miệt vườn khó quên.'
      },
      {
        id: 'ab-q5',
        question: 'Phát triển du lịch sinh thái nông nghiệp tại Cù lao An Bình mang lại lợi ích gì cho địa phương?',
        options: [
          'Tăng thu nhập cho nông dân, quảng bá nông sản sạch và giữ gìn môi trường sinh thái sông nước',
          'Làm cạn kiệt nguồn nước ngọt',
          'Chặt phá hết vườn cây ăn quả để xây nhà cao tầng',
          'Làm mất đi bản sắc văn hóa địa phương'
        ],
        correctAnswer: 0,
        explanation: 'Du lịch nông nghiệp bền vững giúp người nông dân nâng cao giá trị trái cây, bảo tồn vườn cây cổ thụ và lan tỏa nét đẹp văn hóa miệt vườn.'
      }
    ],
    tasks: [
      {
        id: 'ab-t1',
        title: 'Khảo sát các loại trái cây bản địa',
        description: 'Lập bảng danh mục ít nhất 4 loại trái cây đặc sản trên cù lao kèm theo mùa thu hoạch chính trong năm.',
        type: 'observe',
        promptTip: 'Tìm hiểu về chôm chôm Java, chôm chôm nhãn, sầu riêng Ri6 và bưởi năm roi.'
      },
      {
        id: 'ab-t2',
        title: 'Tìm hiểu nhạc cụ Đờn ca tài tử',
        description: 'Ghi tên và hình dung cách chơi của ít nhất 3 loại nhạc cụ trong ban nhạc tài tử (đàn kìm, đàn tranh, đàn cò, đàn bầu hoặc guitar phím lõm).',
        type: 'culture',
        promptTip: 'Chú ý tiếng đàn kìm giữ nhịp và tiếng đàn tranh bay bổng.'
      },
      {
        id: 'ab-t3',
        title: 'Bảo vệ nguồn nước kinh rạch cù lao',
        description: 'Đề xuất biện pháp ngăn ngừa việc vứt rác nhựa và túi nilon xuống dòng sông, bảo vệ sinh vật thủy sinh.',
        type: 'environment',
        promptTip: 'Nhấn mạnh vai trò nguồn nước tưới tiêu cho vườn cây ăn trái trĩu quả.'
      },
      {
        id: 'ab-t4',
        title: 'Nhật ký trải nghiệm một ngày làm nông dân miệt vườn',
        description: 'Viết bài thu hoạch ghi lại trải nghiệm chèo đò ngắm cảnh và tham quan vườn cây trái của cù lao quê hương.',
        type: 'reflection',
        promptTip: 'Chia sẻ niềm yêu mến và tự hào về miền quê thanh bình trù phú.'
      }
    ]
  }
];

export const CATEGORIES_CONFIG = [
  { key: 'all', label: 'Tất cả địa điểm', icon: 'Sparkles' },
  { key: 'historic', label: 'Di tích lịch sử', icon: 'Landmark' },
  { key: 'culture', label: 'Văn hóa – tâm linh', icon: 'Church' },
  { key: 'eco', label: 'Sinh thái – miệt vườn', icon: 'Trees' },
  { key: 'coastal', label: 'Du lịch biển', icon: 'Waves' },
  { key: 'craft', label: 'Làng nghề truyền thống', icon: 'Hammer' },
  { key: 'community', label: 'Du lịch cộng đồng', icon: 'Users' },
] as const;

export const REGIONS_CONFIG = [
  'Tất cả khu vực',
  'Vĩnh Long',
  'Trà Vinh (trước đây)',
  'Bến Tre (trước đây)'
];

export const INITIAL_PROJECT_INFO: ProjectInfo = {
  projectName: 'DU LỊCH VĨNH LONG THÔNG MINH – SMART TOURISM VĨNH LONG',
  englishName: 'Smart Tourism Website with AI Voice Guide & Dynamic CMS',
  competition: 'Hội thi Khoa học kỹ thuật cấp tỉnh dành cho học sinh THCS',
  schoolYear: 'Năm học 2026 – 2027',
  schoolUnit: 'Trường THCS Trọng Điểm Vĩnh Long',
  students: [
    'Nguyễn Văn An (Trưởng nhóm - Lập trình & Dữ liệu)',
    'Trần Thị Mai Phương (Thành viên - Khảo sát & Biên tập Thuyết minh)'
  ],
  mentorTeacher: 'Thầy Lê Hoàng Nam (Giáo viên Tin học & Hướng dẫn KHKT)',
  motivation: 'Tỉnh Vĩnh Long và các khu vực lân cận sở hữu kho tàng di sản lịch sử cách mạng, danh lam thắng cảnh và bản sắc văn hóa sông nước, văn hóa Khmer, duyên hải trù phú. Tuy nhiên, việc tiếp cận thông tin thuyết minh tại điểm đến đối với học sinh và khách du lịch còn hạn chế, chủ yếu dựa vào bảng chỉ dẫn tĩnh hoặc phải có hướng dẫn viên đi kèm. Nhóm tác giả mong muốn ứng dụng công nghệ Trí tuệ Nhân tạo (AI), nhận dạng và tổng hợp tiếng nói tiếng Việt (Text-to-Speech) cùng hệ thống định vị bản đồ và mã QR để tạo ra một người bạn đồng hành số thông minh, phục vụ đắc lực cho công tác quảng bá du lịch và đổi mới giáo dục địa phương.',
  researchGoal: 'Nghiên cứu, thiết kế và phát triển nền tảng web du lịch thông minh đa nền tảng, tích hợp hệ thống quản trị nội dung CMS động, trợ lý thuyết minh tự động bằng giọng nói tiếng Việt chuẩn, bản đồ tương tác định vị trực quan, tra cứu mã QR tại chỗ, phân hệ câu hỏi trắc nghiệm giáo dục lịch sử địa phương và chatbot hỏi đáp AI thông minh dựa trên dữ liệu đã được thẩm định.',
  practicalProblem: 'Học sinh thiếu công cụ trực quan để học tập môn Giáo dục địa phương; khách du lịch đến các điểm tham quan tại Vĩnh Long, Ao Bà Om hay Biển Ba Động thường thiếu thông tin thuyết minh chuyên sâu; các giải pháp thương mại thường tốn kém, phụ thuộc phần cứng đắt tiền hoặc không có tính tương tác học đường.',
  proposedSolution: 'Xây dựng website "Du Lịch Vĩnh Long Thông Minh" hoạt động ngay trên trình duyệt điện thoại và máy tính, không cần cài đặt phức tạp, kết hợp Web Speech API và AI Gemini API, bản đồ Leaflet OpenStreetMap và hệ thống câu hỏi tương tác chấm điểm tức thì.',
  innovations: [
    'Hệ thống Quản trị Nội dung (CMS) động hoàn chỉnh: Cho phép người quản trị thêm không giới hạn địa điểm du lịch, tải ảnh, biên tập kịch bản thuyết minh, gắn tọa độ GPS và thiết lập bộ câu hỏi học tập tự động mà không cần sửa code.',
    'Tích hợp Thuyết minh AI giọng nói Tiếng Việt trực quan với các tùy chọn tốc độ, âm lượng, chọn giọng đọc vùng miền và giao diện nghe đồng bộ văn bản.',
    'Mỗi địa điểm có mã QR động riêng biệt, hỗ trợ in ấn và tải về định dạng PNG để gắn trực tiếp tại di tích thực tế.',
    'Phân hệ Góc học tập – Giáo dục địa phương với ngân hàng câu hỏi trắc nghiệm 4 lựa chọn, phản hồi đúng/sai kèm giải thích cặn kẽ và nhiệm vụ trải nghiệm thực tế cho học sinh THCS.',
    'Trợ lý ảo AI Chatbot hỏi đáp du lịch Vĩnh Long được huấn luyện theo nguyên tắc chỉ dùng dữ liệu lịch sử - văn hóa đã kiểm chứng, phân biệt rõ sử liệu và truyền thuyết, không suy đoán sai lệch.',
    'Bản đồ số định vị Leaflet trực quan, lọc nhanh theo loại hình du lịch và tích hợp dẫn đường Google Maps vệ tinh.',
    'Cơ chế phân quyền người dùng và bảo mật: Khách tham quan chỉ xem nội dung công khai, chỉ tài khoản quản trị viên mới có quyền thêm/sửa/xóa và quản lý bản nháp.'
  ],
  technologies: [
    'React 19 + TypeScript + Vite: Nền tảng xây dựng giao diện hiệu năng cao, phản hồi nhanh.',
    'Tailwind CSS v4: Thiết kế Responsive chuẩn hiện đại, thẩm mỹ trang nhã miền Tây Nam Bộ.',
    'Dynamic CMS State Architecture: Quản lý và đồng bộ dữ liệu thời gian thực.',
    'Web Speech API (SpeechSynthesis): Xử lý giọng nói tiếng Việt mượt mà ngay trên trình duyệt mà không tốn chi phí API.',
    'Google GenAI SDK (@google/genai) với mô hình gemini-3.8-flash: Xử lý chatbot hỏi đáp thông minh server-side an toàn bảo mật.',
    'Leaflet & OpenStreetMap: Bản đồ tương tác định vị địa lý không giới hạn.',
    'QRCode Generator: Tự động kết xuất mã QR đồ họa và hỗ trợ tải về / in ấn.',
    'JSON Persistence & LocalStorage: Quản lý trạng thái học tập và sao lưu phục hồi dữ liệu.'
  ],
  tourismImpact: 'Góp phần hiện thực hóa mục tiêu Chuyển đổi số trong ngành Du lịch tỉnh Vĩnh Long; quảng bá hình ảnh di tích lịch sử Bác Hai Phạm Hùng, vẻ đẹp Ao Bà Om, biển Ba Động và làng gốm Mang Thít đến bạn bè trong nước và quốc tế; hỗ trợ du khách tiếp cận thông tin mọi lúc mọi nơi.',
  educationImpact: 'Đổi mới phương pháp dạy và học nội dung Giáo dục địa phương cho học sinh THCS; biến những chuyến đi thực tế thành hành trình khám phá sinh động với các nhiệm vụ học tập bổ ích; khơi dậy lòng tự hào quê hương và ý thức bảo vệ môi trường, di sản.'
};
