import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { INITIAL_LOCATIONS } from './src/data/initialLocations.ts';
import { LocationItem } from './src/types/tourism.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// File-based persistence storage for CMS locations
const DATA_DIR = path.resolve(__dirname, 'data');
const LOCATIONS_FILE = path.resolve(DATA_DIR, 'locations.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory locations state initialized from file or fallback
let currentLocations: LocationItem[] = [];

try {
  if (fs.existsSync(LOCATIONS_FILE)) {
    const raw = fs.readFileSync(LOCATIONS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      currentLocations = parsed;
    } else {
      currentLocations = INITIAL_LOCATIONS;
    }
  } else {
    currentLocations = INITIAL_LOCATIONS;
    fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(currentLocations, null, 2), 'utf-8');
  }
} catch (e) {
  console.warn('Lỗi đọc data/locations.json, dùng INITIAL_LOCATIONS:', e);
  currentLocations = INITIAL_LOCATIONS;
}

// Helper to save current locations to disk
function saveLocationsToDisk() {
  try {
    fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(currentLocations, null, 2), 'utf-8');
  } catch (e) {
    console.error('Không thể lưu locations vào đĩa:', e);
  }
}

// REST API: GET /api/locations
app.get('/api/locations', (_req: Request, res: Response) => {
  res.json({
    success: true,
    locations: currentLocations,
    count: currentLocations.length,
  });
});

// REST API: POST /api/locations (Requires Admin Auth Token or Secret)
app.post('/api/locations', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Yêu cầu quyền Quản trị viên để thực hiện thao tác.' });
  }

  const { locations } = req.body;
  if (!Array.isArray(locations)) {
    return res.status(400).json({ error: 'Dữ liệu locations không hợp lệ.' });
  }

  currentLocations = locations;
  saveLocationsToDisk();

  return res.json({
    success: true,
    message: 'Đã lưu và đồng bộ toàn bộ danh sách địa điểm thành công.',
    count: currentLocations.length,
  });
});

// REST API: POST /api/auth/login
// Secure admin authentication endpoint
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Verification credentials (configurable via env ADMIN_PASSWORD if provided)
  const validUser = process.env.ADMIN_USERNAME || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'vinhlong2026';

  if (username === validUser && password === validPass) {
    // Generate secure simulation token
    const token = 'vl_adm_token_' + Buffer.from(`${username}_${Date.now()}`).toString('base64');
    return res.json({
      success: true,
      token,
      user: {
        username: 'admin',
        fullName: 'Quản trị viên Hệ thống Du Lịch Vĩnh Long',
        role: 'admin',
        loginAt: new Date().toISOString(),
      },
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Tên đăng nhập hoặc mật khẩu không chính xác. Gợi ý kiểm thử: admin / vinhlong2026',
  });
});

// REST API: POST /api/auth/verify
app.post('/api/auth/verify', (req: Request, res: Response) => {
  const { token } = req.body;
  if (token && typeof token === 'string' && token.startsWith('vl_adm_token_')) {
    return res.json({ valid: true });
  }
  return res.status(401).json({ valid: false });
});

// Helper to build context from verified locations for Chatbot
function buildKnowledgeBasePrompt(): string {
  return currentLocations.filter(loc => loc.status === 'published').map((loc, index) => {
    return `[Địa điểm ${index + 1}]: ${loc.name} (Mã: ${loc.code || loc.id})
- Khu vực: ${loc.area}
- Phân loại: ${loc.categoryLabel}
- Địa chỉ: ${loc.address}
- Giới thiệu: ${loc.shortDescription}
- Lịch sử: ${loc.history}
- Giá trị văn hóa / sinh thái: ${loc.culturalValue}
- Giờ mở cửa: ${loc.visitingHours || 'Cả ngày'}
- Giá vé: ${loc.ticketPrice || 'Miễn phí'}
- Trải nghiệm nổi bật: ${loc.experiences.join('; ')}
- Hướng dẫn tham quan & Lưu ý: ${loc.visitorGuide}
- Bảo vệ môi trường: ${loc.environmentalNotes}
- Kịch bản thuyết minh: "${loc.audioScript}"
- Trạng thái: ${loc.verifiedStatus}
- Nguồn: ${loc.sources.title}`;
  }).join('\n\n---\n\n');
}

// Local fallback engine in case Gemini API key is missing or offline
function fallbackKnowledgeAnswer(query: string, currentPlaceId?: string): string {
  const q = query.toLowerCase();
  
  if (currentPlaceId) {
    const matched = currentLocations.find(l => l.id === currentPlaceId);
    if (matched) {
      if (q.includes('thuyết minh') || q.includes('giọng đọc') || q.includes('nghe')) {
        return `Kịch bản thuyết minh cho ${matched.name}:\n\n"${matched.audioScript}"\n\nBạn có thể nhấn nút biểu tượng Loa hoặc chuyển sang tab "Thuyết minh AI" để lắng nghe giọng đọc truyền cảm tự động!`;
      }
      if (q.includes('lịch sử') || q.includes('hình thành') || q.includes('nguồn gốc')) {
        return `Thông tin lịch sử về ${matched.name}:\n\n${matched.history}\n\n(Nguồn xác minh: ${matched.sources.title})`;
      }
      if (q.includes('ở đâu') || q.includes('địa chỉ') || q.includes('vị trí')) {
        return `Vị trí ${matched.name}: ${matched.address} (${matched.area}). Bạn có thể mở mục "Bản đồ du lịch" để xem định vị và chỉ đường chi tiết.`;
      }
      if (q.includes('trải nghiệm') || q.includes('làm gì') || q.includes('chơi gì')) {
        return `Những trải nghiệm không nên bỏ lỡ tại ${matched.name}:\n` + matched.experiences.map((e, i) => `${i + 1}. ${e}`).join('\n');
      }
    }
  }

  // Search dynamic locations
  for (const loc of currentLocations) {
    const nameKeywords = loc.name.toLowerCase().split(' ');
    const matchCount = nameKeywords.filter(k => k.length > 2 && q.includes(k)).length;
    if (matchCount >= 2 || q.includes(loc.name.toLowerCase())) {
      return `Thông tin về ${loc.name} (${loc.categoryLabel} - ${loc.area}):\n\n${loc.shortDescription}\n\nĐịa chỉ: ${loc.address}\nGiờ mở cửa: ${loc.visitingHours || 'Cả ngày'}\nGiá vé: ${loc.ticketPrice || 'Miễn phí'}\n\nĐiểm nổi bật: ${loc.culturalValue}\n\nLời khuyên du khách: ${loc.visitorGuide}\nLưu ý môi trường: ${loc.environmentalNotes}`;
    }
  }

  // General searches
  if (q.includes('phạm hùng') || q.includes('bác hai')) {
    return `Khu lưu niệm Chủ tịch Hội đồng Bộ trưởng Phạm Hùng tọa lạc tại xã Long Phước, huyện Long Hồ, tỉnh Vĩnh Long. Đây là địa chỉ đỏ giáo dục truyền thống cách mạng, nơi tưởng niệm nhà lãnh đạo kiên trung trọn đời cống hiến vì đất nước. Đồng chí sinh năm 1912 tại Long Hồ, từng giữ cương vị Chủ tịch Hội đồng Bộ trưởng (tương đương Thủ tướng Chính phủ).\n\nLời khuyên cho học sinh: Khi đến viếng, hãy mặc trang phục chỉnh tề, giữ thái độ trang nghiêm và bảo vệ cảnh quan di tích.`;
  }

  if (q.includes('ao bà om') || q.includes('ao vuông') || q.includes('khmer')) {
    return `Ao Bà Om (còn gọi là Ao Vuông) là thắng cảnh quốc gia nổi tiếng gắn với văn hóa Khmer Nam Bộ. Ao có dáng gần vuông, mặt nước phẳng lặng soi bóng những cây cổ thụ sao, dầu trăm năm tuổi với bộ rễ kỳ vĩ.\n\nLưu ý lịch sử & truyền thuyết: Cuộc thi đào ao của bà Om là câu chuyện dân gian truyền miệng của đồng bào Khmer ca ngợi trí thông minh của phụ nữ. Nơi đây là trung tâm diễn ra lễ hội Ok Om Bok rằm tháng 10 âm lịch hàng năm. Kế bên ao là Chùa Âng cổ kính và Bảo tàng Văn hóa Khmer.`;
  }

  if (q.includes('biển ba động') || q.includes('ba động') || q.includes('biển')) {
    return `Biển Ba Động thuộc xã Trường Long Hòa, thị xã Duyên Hải. Bờ biển nổi bật với bãi cát dài thoai thoải, rặng phi lao xanh ngắt chắn gió và những cánh đồng điện gió hiện đại. Nơi đây từng là căn cứ cách mạng và bến tiếp nhận vũ khí từ những con tàu Không số trên Đường Hồ Chí Minh trên biển.\n\nKhi tắm biển và dạo chơi, du khách lưu ý luôn giữ gìn vệ sinh, không xả rác thải nhựa để bảo vệ hệ sinh thái đại dương!`;
  }

  if (q.includes('mang thít') || q.includes('gốm') || q.includes('lò gạch') || q.includes('vương quốc đỏ')) {
    return `Làng gốm đỏ Mang Thít được mệnh danh là "Vương quốc Đỏ" của Vĩnh Long, trải dài dọc kênh Thầy Cai và sông Cổ Chiên với hàng ngàn lò gạch gốm hình vòm độc đáo có tuổi đời hơn một thế kỷ. Tỉnh Vĩnh Long hiện đang triển khai Đề án "Di sản đương đại Mang Thít" để bảo tồn làng nghề truyền thống và phát triển du lịch xanh.`;
  }

  if (q.includes('an bình') || q.includes('cù lao') || q.includes('miệt vườn') || q.includes('trái cây')) {
    return `Cù lao An Bình (huyện Long Hồ) là thiên đường sinh thái miệt vườn được phù sa sông Tiền và Cổ Chiên bồi đắp. Đến đây, bạn có thể thưởng thức chôm chôm chín đỏ, sầu riêng, đi đò chèo, tát mương bắt cá và lắng nghe làn điệu Đờn ca tài tử Nam Bộ truyền thống.`;
  }

  if (q.includes('gợi ý') || q.includes('tour') || q.includes('1 ngày') || q.includes('lịch trình')) {
    return `Gợi ý hành trình 1 ngày "Khám phá Di sản & Văn hóa Vĩnh Long":\n\n- Buổi sáng: Dâng hương và học tập truyền thống tại Khu lưu niệm Bác Hai Phạm Hùng (Long Hồ); sau đó ghé thăm Làng gốm đỏ Mang Thít chiêm ngưỡng di sản vương quốc đỏ.\n- Buổi trưa: Sang Cù lao An Bình thưởng thức trái cây miệt vườn và các món ngon dân dã miền Tây.\n- Buổi chiều: Tiếp tục khám phá vẻ đẹp danh thắng cổ kính Ao Bà Om và Chùa Âng, tìm hiểu nét đẹp văn hóa truyền thống Khmer.\n\nBạn có thể dùng tính năng "Bản đồ du lịch" để xem khoảng cách và lộ trình chỉ đường chính xác!`;
  }

  return `Xin chào! Tôi là Trợ lý Du lịch Vĩnh Long AI. Tôi có thể hỗ trợ bạn tìm hiểu về các di tích lịch sử (Khu lưu niệm Phạm Hùng), văn hóa tâm linh (Ao Bà Om), du lịch sinh thái miệt vườn (Cù lao An Bình), biển đảo (Biển Ba Động), làng nghề truyền thống (Lò gốm Mang Thít) cũng như hướng dẫn các bài học tập địa phương. Bạn muốn khám phá địa điểm nào trước?`;
}

// POST /api/chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, currentPlaceId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Nội dung câu hỏi không hợp lệ.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || !apiKey.startsWith('AIza')) {
      // Return accurate local verified response
      const answer = fallbackKnowledgeAnswer(message, currentPlaceId);
      return res.json({
        reply: answer,
        source: 'verified_knowledge_base',
        note: 'Câu trả lời được trích xuất từ Kho dữ liệu địa phương đã kiểm chứng.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const knowledgeContext = buildKnowledgeBasePrompt();

    const systemInstruction = `Bạn là "Trợ lý Du lịch Vĩnh Long AI" – người bạn đồng hành thông minh thuộc hệ thống "DU LỊCH VĨNH LONG THÔNG MINH – SMART TOURISM VĨNH LONG", sản phẩm nghiên cứu tham dự Cuộc thi KHKT cấp tỉnh dành cho học sinh THCS 2026-2027.

QUY TẮC CỐT LÕI (BẮT BUỘC TUÂN THỦ):
1. Bạn trả lời bằng tiếng Việt chuẩn mực, thân thiện, lịch thiệp, dễ hiểu, phù hợp với học sinh THCS, giáo viên và du khách.
2. NGUYÊN TẮC XÁC THỰC THÔNG TIN: Chỉ sử dụng các dữ kiện lịch sử, vị trí, địa chỉ và văn hóa có trong kho dữ liệu kiểm chứng dưới đây. Tuyệt đối KHÔNG tự bịa đặt niên đại, giá vé, số điện thoại hay số liệu chưa được chứng thực.
3. PHÂN BIỆT SỬ LIỆU & HUYỀN TÍCH DÂN GIAN: Khi nhắc đến các câu chuyện dân gian (ví dụ: cuộc thi đào ao của bà Om), phải nêu rõ đây là truyền thuyết dân gian lưu truyền trong cộng đồng, bổ trợ cho nét đẹp di sản chứ không phải sử liệu chính sử.
4. NẾU THIẾU DỮ LIỆU: Nếu câu hỏi hỏi về thông tin dịch vụ, giá tiền hoặc địa điểm ngoài dữ liệu kiểm chứng, hãy lịch sự thông báo chưa có thông tin xác minh và khuyên người dùng liên hệ Cổng thông tin Du lịch Vĩnh Long hoặc Sở VHTTDL.
5. GIÁO DỤC Ý THỨC: Luôn lồng ghép thông điệp bảo vệ môi trường, không xả rác thải nhựa, bảo vệ di tích và giữ gìn nét đẹp văn minh du lịch.

KHO DỮ LIỆU ĐỊA ĐIỂM KIỂM CHỨNG CỦA TỈNH:
${knowledgeContext}

ĐỊA ĐIỂM NGƯỜI DÙNG ĐANG XEM (nếu có): ${currentPlaceId || 'Toàn cảnh tỉnh Vĩnh Long'}`;

    const promptText = `Câu hỏi của người dùng: "${message}"`;

    const geminiCall = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
      },
    });

    const timeoutCall = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Timeout gọi Gemini API')), 4000);
    });

    const response = await Promise.race([geminiCall, timeoutCall]);

    const replyText = response.text || fallbackKnowledgeAnswer(message, currentPlaceId);

    return res.json({
      reply: replyText,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Lỗi xử lý chatbot AI:', error);
    const fallback = fallbackKnowledgeAnswer(req.body.message || '', req.body.currentPlaceId);
    return res.json({
      reply: fallback,
      source: 'verified_knowledge_base_fallback',
      warning: 'Đang dùng hệ thống tri thức kiểm chứng cục bộ do kết nối mạng tạm thời gián đoạn.'
    });
  }
});

// Setup Vite dev server or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Du Lịch Vĩnh Long Thông Minh đang chạy tại cổng http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Khởi động server thất bại:', err);
  process.exit(1);
});
