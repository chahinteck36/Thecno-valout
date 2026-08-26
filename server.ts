import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Tech Post & App Review Generator endpoint
  app.post("/api/generate-post", async (req, res) => {
    try {
      const { appName, category, platform, customFeatures } = req.body;

      const ai = getGeminiClient();
      if (!ai) {
        // Fallback generator if no key is configured
        const fallbackDescription = `يعد تطبيق ${appName || "التطبيق التقني"} من أبرز الأدوات المبتكرة في قسم ${category || "التطبيقات التقنية"} لمنصة ${platform || "أندرويد والكمبيوتر"}.\n\nيوفر التطبيق تجربة مستخدم سلسة وعالية الأداء مع واجهة مستخدم حديثة تدعم الوضع الليلي وتمنحك تحكماً كاملاً بالوظائف المتقدمة.\n\nأهم المميزات:\n- سرعة فائقة واستهلاك منخفض للموارد والبطارية.\n- حماية وأمان متقدم مع فحص خلو من البرمجيات الضارة بنسبة 100%.\n- توافق كامل وتحديثات دورية مستمرة.\n- روابط تحميل مباشرة وسريعة تدعم استئناف التحميل.`;
        
        return res.json({
          title: `تحميل تطبيق ${appName || "التقني"} أحدث إصدار للأجهزة برابط مباشر`,
          description: fallbackDescription,
          summary: `مراجعة شاملة وروابط تحميل تطبيق ${appName || "التقني"} مع جدول المواصفات الفنية وطريقة التثبيت.`,
          features: [
            "واجهة مستخدم عصرية وسهلة الاستخدام",
            "أداء سريع واستقرار عالي بدون إعلانات مزعجة",
            "دعم كامل للغة العربية والوضع الليلي",
            "روابط تحميل مباشرة وسيرفرات سريعة",
          ],
          source: "fallback",
        });
      }

      const prompt = `أنت خبير في التدوين التقني ومراجعة تطبيقات وبرامج الهواتف والحواسب لمواقع بلوجر التقنية.
اكتب مراجعة احترافية وجذابة للتطبيق التالي:
- اسم التطبيق/البرنامج: ${appName}
- التصنيف: ${category}
- المنصة: ${platform}
- تفاصيل إضافية: ${customFeatures || "أحدث إصدار مع مميزات حصرية"}

قم بصياغة الرد بصيغة JSON محددة ودقيقة بالعربية:
{
  "title": "عنوان جذاب للسيو يتضمن اسم التطبيق والتحميل برابط مباشر",
  "description": "مقال تعريفي وشرح مفصل للتطبيق في 3-4 فقرات غنية بالكلمات الدلالية والمعلومات التقنية",
  "summary": "ملخص سريع في سطرين",
  "features": ["ميزة 1", "ميزة 2", "ميزة 3", "ميزة 4", "ميزة 5"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      res.json({ ...parsed, source: "gemini" });
    } catch (error: any) {
      console.error("Gemini post generation error:", error);
      res.status(500).json({
        error: "فشل في توليد المحتوى بواسطة الذكاء الاصطناعي، يرجى المحاولة لاحقاً.",
        details: error.message,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Blogger Theme Studio running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
