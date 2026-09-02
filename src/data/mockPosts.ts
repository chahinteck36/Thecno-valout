import { TechAppPost, CategoryInfo, ThemeConfig } from '../types';

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  language: "en", // English as Primary / Default
  siteName: "TechnoApp Pro | Tech & Apps Hub",
  siteNameEn: "TechnoApp Pro | Tech & Apps Hub",
  siteDescription: "The premier destination for downloading top Android APKs, Windows software, AI tools, and tech utilities with ultra-fast direct links.",
  siteDescriptionEn: "The premier destination for downloading top Android APKs, Windows software, AI tools, and tech utilities with ultra-fast direct links.",
  themeColor: "cyan",
  fontFamily: "Cairo",
  fontFamilyEn: "Inter",
  enableDarkMode: true,
  enableDownloadTimer: true,
  timerDuration: 10,
  enableBreakingTicker: true,
  enableRelatedPosts: true,
  enableTableOfContents: true,
  enableVirusTotalBadge: true,
  enableAdPlacements: true,
  telegramChannelUrl: "https://t.me/TechnoAppPro",
  socialLinks: {
    facebook: "https://facebook.com/TechnoAppPro",
    twitter: "https://twitter.com/TechnoAppPro",
    youtube: "https://youtube.com/@TechnoAppPro",
    telegram: "https://t.me/TechnoAppPro",
    whatsapp: "https://whatsapp.com/channel/TechnoAppPro",
    instagram: "https://instagram.com/TechnoAppPro",
    tiktok: "https://tiktok.com/@TechnoAppPro",
    github: "https://github.com/TechnoAppPro",
  },
  adSettings: {
    headerBannerCode: "<!-- Responsive Header Banner 728x90 Google AdSense -->",
    inArticleTopCode: "<!-- In-Article Top Banner 300x250 -->",
    inArticleBottomCode: "<!-- In-Article Bottom Banner 336x280 -->",
    sidebarStickyCode: "<!-- Sticky Sidebar Ad Slot 300x600 -->",
  },
  paypalSettings: {
    paypalEmail: "chahinteck36@gmail.com",
    priceUsd: 9.99,
    currency: "USD"
  },
  whatsappSettings: {
    sellerPhone: "+213563710494",
    sellerName: "TechnoApp Theme Official",
    allowWhatsAppOrder: true
  }
};

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: "cat-1",
    name: "تطبيقات أندرويد",
    nameEn: "Android Apps",
    slug: "android-apps",
    icon: "Smartphone",
    count: 48,
    color: "#10b981",
    description: "أحدث تطبيقات APK للأندرويد بروابط مباشرة وسيرفرات سريعة",
    descriptionEn: "Latest Android APK apps with ultra-fast servers and direct mirrors"
  },
  {
    id: "cat-2",
    name: "برامج ويندوز",
    nameEn: "Windows Software",
    slug: "windows-software",
    icon: "Monitor",
    count: 32,
    color: "#0284c7",
    description: "برامج الكمبيوتر والأدوات الأساسية لأنظمة ويندوز 10 و 11",
    descriptionEn: "Essential desktop software, utilities, and PC tools for Windows 10/11"
  },
  {
    id: "cat-3",
    name: "أدوات الذكاء الاصطناعي",
    nameEn: "AI Tools",
    slug: "ai-tools",
    icon: "Cpu",
    count: 24,
    color: "#8b5cf6",
    description: "تطبيقات وبرامج الذكاء الاصطناعي التوليدي والإنتاجية",
    descriptionEn: "Cutting-edge generative AI applications, LLMs, and creative productivity suites"
  },
  {
    id: "cat-4",
    name: "تطبيقات آيفون وiOS",
    nameEn: "iOS Apps",
    slug: "ios-apps",
    icon: "Apple",
    count: 19,
    color: "#64748b",
    description: "أفضل التطبيقات والأدوات الحصرية لأجهزة آبل وiPad",
    descriptionEn: "Handpicked premium applications and utilities for iPhone & iPad"
  },
  {
    id: "cat-5",
    name: "حماية وأمان رقمي",
    nameEn: "Security & VPN",
    slug: "security-tools",
    icon: "ShieldCheck",
    count: 15,
    color: "#f59e0b",
    description: "برامج مكافحة الفيروسات، VPN، وأدوات التشفير والخصوصية",
    descriptionEn: "Antivirus, VPNs, encryption tools, and digital privacy defenders"
  },
  {
    id: "cat-6",
    name: "شروحات تقنية وحلول",
    nameEn: "Tech Tutorials",
    slug: "tutorials",
    icon: "BookOpen",
    count: 29,
    color: "#ec4899",
    description: "دروس وحلول المشاكل التقنية للأجهزة والهواتف خطوة بخطوة",
    descriptionEn: "Step-by-step troubleshooting guides, OS optimizations, and tech fixes"
  }
];

export const MOCK_POSTS: TechAppPost[] = [
  {
    id: "app-1",
    title: "تحميل كاب كات برو CapCut Pro للكمبيوتر والأندرويد بدون علامة مائية أحدث إصدار",
    titleEn: "Download CapCut Pro 4K for PC & Android (No Watermark Latest 2026)",
    slug: "download-capcut-pro-apk-pc",
    category: "تطبيقات أندرويد",
    categoryEn: "Android Apps",
    categorySlug: "android-apps",
    platform: ["android", "windows"],
    version: "v12.4.0",
    developer: "Bytedance Pte. Ltd.",
    size: "135 MB",
    rating: 4.9,
    reviewsCount: 1420,
    downloadsCount: "250K+",
    updatedDate: "18 أغسطس 2026",
    updatedDateEn: "August 18, 2026",
    isFeatured: true,
    isTopDownload: true,
    iconUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&auto=format&fit=crop&q=80",
    summary: "برنامج تحرير الفيديو الاحترافي الأشهر عالمياً لصناع المحتوى مع فلاتر الذكاء الاصطناعي وتصدير بدقة 4K فائقة الجودة بدون علامة مائية.",
    summaryEn: "The world-leading video editing suite for creators featuring AI background removal, smart auto-captions, 4K 60FPS export, and zero watermarks.",
    description: `يعتبر **CapCut Pro** أحد أقوى وأشمل برامج مونتاج الفيديو للهواتف الذكية وأجهزة الكمبيوتر، حيث يوفر ترسانة متكاملة من أدوات القص، التعديل، والمؤثرات البصرية المدعومة بالذكاء الاصطناعي.

### لماذا يعتبر CapCut الخيار الأول؟
يوفر البرنامج مكتبة ضخمة من الانتقالات السينمائية، النصوص المتحركة الجاهزة، وأداة إزالة الخلفيات التلقائية بدون الحاجة إلى كروما خضراء. كما يدعم ميزة التسميات التوضيحية التلقائية بدقة متناهية.`,
    descriptionEn: `**CapCut Pro** is an all-in-one professional video editing application for mobile and desktop systems. Packed with AI-powered features, cinematic effects, and seamless export options.

### Key Highlights:
- Auto Captions with multilingual speech recognition.
- One-click AI Background Removal without green screens.
- Massive library of 3D transitions, trending music, and color grading LUTs.`,
    features: [
      "تصدير بدقة عالية تصل إلى 4K و 60 إطار في الثانية",
      "إزالة خلفية الفيديو بالذكاء الاصطناعي بضغطة زر",
      "مكتبة مؤثرات وانتقالات ثلاثية الأبعاد بدون قيود",
      "دعم الخطوط الاحترافية والتأثيرات النصية",
      "محرر صوتي متقدم مع إمكانية عزل الضوضاء"
    ],
    featuresEn: [
      "Ultra HD 4K 60FPS crystal clear video export",
      "Instant AI background removal & chroma replacement",
      "Unlimited 3D transitions, motion graphics, and effects",
      "Advanced audio editor with voice enhancer & noise cancellation",
      "Seamless synchronization across mobile and PC projects"
    ],
    whatsNew: [
      "إضافة تأثيرات الحركة السلسة 4K AI Smooth Slow-mo",
      "تحسين سرعة تصدير المشاريع بنسبة 40%",
      "تحديث حزمة الفلاتر السينمائية 2026"
    ],
    whatsNewEn: [
      "New 4K AI Smooth Slow-Motion engine",
      "40% faster GPU rendering & export pipeline",
      "Updated 2026 cinematic color LUTs"
    ],
    techSpecs: {
      requiresAndroid: "Android 8.0+",
      requiresWindows: "Windows 10/11 (64-bit)",
      ram: "4GB RAM",
      license: "مجاني / متكامل",
      licenseEn: "Free / Pro Unlocked",
      packageId: "com.lemon.lvoverseas",
      virusTotalUrl: "https://virustotal.com",
      virusScanSafe: true,
    },
    screenshots: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop&q=80"
    ],
    downloadLinks: [
      {
        id: "dl-1",
        provider: "direct",
        title: "تحميل APK مباشر (سيرفر فائق السرعة)",
        titleEn: "Fast Direct Server (APK)",
        url: "https://example.com/download/capcut-pro-v12.apk",
        size: "135 MB",
        version: "v12.4.0",
        fastServer: true
      },
      {
        id: "dl-2",
        provider: "drive",
        title: "تحميل عبر Google Drive",
        titleEn: "Download via Google Drive",
        url: "https://drive.google.com/file/d/example",
        size: "135 MB",
        version: "v12.4.0"
      },
      {
        id: "dl-3",
        provider: "mediafire",
        title: "تحميل عبر MediaFire",
        titleEn: "Download via MediaFire",
        url: "https://mediafire.com/file/example",
        size: "135 MB"
      },
      {
        id: "dl-4",
        provider: "telegram",
        title: "تحميل عبر قناة التليجرام مباشرة",
        titleEn: "Download via Telegram Channel",
        url: "https://t.me/TechnoAppPro",
        size: "135 MB"
      }
    ],
    tags: ["مونتاج", "تطبيقات أندرويد", "كاب كات", "برامج كمبيوتر"],
    tagsEn: ["Video Editor", "CapCut", "Android Apps", "Creator Tools"],
    viewsCount: 18450
  },
  {
    id: "app-2",
    title: "تحميل تطبيق تيليجرام بريميوم Telegram Pro للأندرويد مع سرعة تحميل فائقة",
    titleEn: "Download Telegram Pro Premium APK (High-Speed Downloads & Unlocked)",
    slug: "download-telegram-pro-premium-apk",
    category: "تطبيقات أندرويد",
    categoryEn: "Android Apps",
    categorySlug: "android-apps",
    platform: ["android"],
    version: "v10.9.3",
    developer: "Telegram FZ-LLC",
    size: "68 MB",
    rating: 4.8,
    reviewsCount: 980,
    downloadsCount: "180K+",
    updatedDate: "15 أغسطس 2026",
    updatedDateEn: "August 15, 2026",
    isFeatured: true,
    isTopDownload: true,
    iconUrl: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80",
    summary: "النسخة المطورة من تطبيق تيليجرام مع تفعيل أقصى سرعة تحميل للملفات الكبيرة وميزة إخفاء الظهور والترجمة الفورية للمحادثات.",
    summaryEn: "Enhanced Telegram build featuring uncapped download speeds, 4GB file uploads, real-time message translation, and custom themes.",
    description: `تطبيق **Telegram Pro** يمنح المستخدمين أفضل تجربة مراسلة مشفرة وآمنة مع إتاحة مشاركة ملفات تصل إلى 4 جيجابايت لكل ملف بدون أي بطء في السيرفرات.`,
    descriptionEn: `**Telegram Pro** offers encrypted messaging with zero server limits, 4GB file uploads, voice-to-text transcription, and advanced folder management.`,
    features: [
      "سرعة تحميل مضاعفة للملفات والفيديوهات",
      "رفع ملفات حتى 4GB للملف الواحد",
      "حفظ الرسائل والميديا بدون قيود وإخفاء وقت القراءة",
      "شارات ورموز تعبيرية متحركة حصرية"
    ],
    featuresEn: [
      "Uncapped maximum download speeds for videos and documents",
      "Upload files up to 4GB each",
      "Real-time voice-to-text and instant message translation",
      "Exclusive animated stickers, badges, and folder tabs"
    ],
    whatsNew: [
      "تحديث قاعدة البيانات السحابية لتقليل استهلاك الذاكرة",
      "دعم القصص Stories بدقة فائقة وبدون ضغط"
    ],
    whatsNewEn: [
      "Cloud database optimization reducing RAM footprint",
      "Full HD uncompressed Stories support"
    ],
    techSpecs: {
      requiresAndroid: "Android 6.0+",
      license: "مجاني بالكامل",
      licenseEn: "Free / Unlocked",
      packageId: "org.telegram.messenger",
      virusScanSafe: true,
    },
    screenshots: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=700&auto=format&fit=crop&q=80"
    ],
    downloadLinks: [
      {
        id: "dl-t1",
        provider: "direct",
        title: "تحميل APK مباشر (النسخة الرسمية المستقرة)",
        titleEn: "Direct Download APK (Stable)",
        url: "https://example.com/telegram.apk",
        size: "68 MB",
        fastServer: true
      },
      {
        id: "dl-t2",
        provider: "mediafire",
        title: "تحميل عبر ميديا فاير",
        titleEn: "Download via MediaFire",
        url: "https://mediafire.com/telegram",
        size: "68 MB"
      }
    ],
    tags: ["تيليجرام", "شات ومراسلة", "حماية"],
    tagsEn: ["Telegram", "Messenger", "Security"],
    viewsCount: 14200
  },
  {
    id: "app-3",
    title: "تحميل استوديو الذكاء الاصطناعي AI Creator Suite للكمبيوتر لمعالجة الصور وتوليد الفيديوهات",
    titleEn: "Download AI Creator Suite for PC (Offline Generative Image & Video AI)",
    slug: "ai-creator-suite-pc-download",
    category: "أدوات الذكاء الاصطناعي",
    categoryEn: "AI Tools",
    categorySlug: "ai-tools",
    platform: ["windows", "mac"],
    version: "v4.2.1",
    developer: "DeepTech Labs",
    size: "420 MB",
    rating: 4.9,
    reviewsCount: 650,
    downloadsCount: "95K+",
    updatedDate: "12 أغسطس 2026",
    updatedDateEn: "August 12, 2026",
    isFeatured: true,
    isTopDownload: false,
    iconUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&auto=format&fit=crop&q=80",
    summary: "أقوى برنامج محلي يعمل بالذكاء الاصطناعي لتوليد الصور فائقة الدقة وتعديل الصوتيات وكتابة المحتوى بدون اتصال بالإنترنت.",
    summaryEn: "Powerful local AI suite for 4K image generation, video upscaling, and voice synthesis running 100% offline with GPU acceleration.",
    description: `برنامج **AI Creator Suite** هو الاستوديو الشامل للمصممين وصناع المحتوى الذين يبحثون عن استغلال قوة كروت الشاشة RTX لتوليد صور بجودة 4K.`,
    descriptionEn: `**AI Creator Suite** empowers creators with local neural networks, Flux Pro diffusion models, and smart video enhancers completely offline.`,
    features: [
      "يعمل بدون اتصال بالإنترنت Offline بالكامل",
      "توليد الصور بدقة 4K في ثوانٍ معدودة",
      "تحسين وتكبير الصور القديمة Upscaling بدون تشويش"
    ],
    featuresEn: [
      "100% Private offline execution with zero telemetry",
      "Blazing-fast 4K diffusion generation in seconds",
      "AI Upscaling and lossless restoration"
    ],
    whatsNew: [
      "إدماج محرك Flux Pro و SDXL لتوليد نصوص واضحة داخل الصور",
      "تسريع الأداء لكروت شاشة Nvidia و AMD"
    ],
    whatsNewEn: [
      "Integrated Flux Pro & SDXL text rendering models",
      "Hardware acceleration for Nvidia CUDA & AMD ROCm"
    ],
    techSpecs: {
      requiresWindows: "Windows 10/11 64-bit",
      ram: "16GB RAM recommended",
      license: "نسخة مفتوحة المصدر / مجانية",
      licenseEn: "Open Source / Free",
      virusScanSafe: true,
    },
    screenshots: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&auto=format&fit=crop&q=80"
    ],
    downloadLinks: [
      {
        id: "dl-ai-1",
        provider: "direct",
        title: "تحميل برنامج التثبيت لويندوز (Installer)",
        titleEn: "Direct Windows Installer (.exe)",
        url: "https://example.com/ai-creator.exe",
        size: "420 MB",
        fastServer: true
      }
    ],
    tags: ["ذكاء اصطناعي", "برامج كمبيوتر", "تصميم"],
    tagsEn: ["Artificial Intelligence", "Generative AI", "Windows PC"],
    viewsCount: 11300
  },
  {
    id: "app-4",
    title: "تحميل تطبيق لايت روم Lightroom Pro للأندرويد مع أكثر من 500 بريسيت Preset احترافي جاهز",
    titleEn: "Download Adobe Lightroom Pro APK + 500 DNG Cinema Presets",
    slug: "download-lightroom-pro-apk-presets",
    category: "تطبيقات أندرويد",
    categoryEn: "Android Apps",
    categorySlug: "android-apps",
    platform: ["android", "ios"],
    version: "v9.5.1",
    developer: "Adobe Inc.",
    size: "94 MB",
    rating: 4.7,
    reviewsCount: 810,
    downloadsCount: "130K+",
    updatedDate: "10 أغسطس 2026",
    updatedDateEn: "August 10, 2026",
    isFeatured: false,
    isTopDownload: true,
    iconUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=900&auto=format&fit=crop&q=80",
    summary: "تطبيق أدوبي لايت روم الشهير لتعديل الصور ومعالجة ألوان كاميرات الهواتف مع حزمة فلاتر مسبقة الإعداد DNG قابلة للاستيراد الفوري.",
    summaryEn: "Pro camera color grading and RAW photo editing with full premium presets package for instant cinematic mobile photography.",
    description: `اجعل صور هاتفك تبدو كأنها التقطت بكاميرات احترافية مع **Adobe Lightroom**.`,
    descriptionEn: `Transform your mobile photos with **Adobe Lightroom Pro**. Includes RAW photo processing, selective masks, and high-dynamic range filters.`,
    features: [
      "تعديل ملفات الصور الخام RAW و DNG",
      "أداة الإخفاء الدقيق والفرشاة الانتقائية",
      "حزمة بريسيتات سينمائية مرفقة مجاناً"
    ],
    featuresEn: [
      "Full RAW and DNG high-resolution file support",
      "Precision masking, healing brush, and color curves",
      "Free 500+ DNG cinematic photography presets"
    ],
    whatsNew: [
      "ميزة العدسة الضبابية Lens Blur المدعومة بالذكاء الاصطناعي"
    ],
    whatsNewEn: [
      "AI-powered Lens Blur and depth estimation"
    ],
    techSpecs: {
      requiresAndroid: "Android 8.0+",
      license: "مجاني / برو",
      licenseEn: "Free / Pro Unlocked",
      packageId: "com.adobe.lrmobile",
      virusScanSafe: true,
    },
    screenshots: [
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=700&auto=format&fit=crop&q=80"
    ],
    downloadLinks: [
      {
        id: "dl-lr-1",
        provider: "direct",
        title: "تحميل APK مع حزمة الفلاتر (رابط مباشر)",
        titleEn: "Download APK + Presets Bundle",
        url: "https://example.com/lightroom-presets.apk",
        size: "94 MB",
        fastServer: true
      }
    ],
    tags: ["تصوير", "لايت روم", "فوتوشوب"],
    tagsEn: ["Photography", "Lightroom", "Presets"],
    viewsCount: 9750
  },
  {
    id: "app-5",
    title: "تحميل أداة الحماية الشاملة Malwarebytes Premium للكمبيوتر والهاتف لمكافحة الفدية والتجسس",
    titleEn: "Download Malwarebytes Premium Complete Cyber Protection (PC & Mobile)",
    slug: "malwarebytes-premium-full-protection",
    category: "حماية وأمان رقمي",
    categoryEn: "Security & VPN",
    categorySlug: "security-tools",
    platform: ["windows", "android", "mac"],
    version: "v5.1.8",
    developer: "Malwarebytes Inc.",
    size: "180 MB",
    rating: 4.9,
    reviewsCount: 520,
    downloadsCount: "78K+",
    updatedDate: "05 أغسطس 2026",
    updatedDateEn: "August 05, 2026",
    isFeatured: false,
    isTopDownload: false,
    iconUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&auto=format&fit=crop&q=80",
    summary: "برنامج الحماية الفوري لكشف وإزالة البرمجيات الخبيثة، برامج الفدية، وحظر المواقع الاحتيالية والتصيد الإلكتروني.",
    summaryEn: "Real-time threat shield detecting ransomware, zero-day exploits, adware, and malicious phishing sites with lightweight background footprint.",
    description: `يقدم **Malwarebytes** حماية حية متعددة الطبقات ضد الهجمات السيبرانية وبرامج التشفير الخبيثة دون التأثير على سرعة الجهاز أو الألعاب.`,
    descriptionEn: `**Malwarebytes Premium** provides proactive defenses against spyware, ransomware, malicious domains, and zero-day threats.`,
    features: [
      "فحص فائق السرعة ومحرك كشف سلوكي ذكي",
      "حماية حية ضد برامج الفدية Ransomware",
      "إضافة حظر الإعلانات والتتبع للمتصفحات"
    ],
    featuresEn: [
      "Hyper-fast scanning engine with behavioral AI detection",
      "Multi-layered real-time Ransomware & Trojan defense",
      "Browser extension blocking phishing, scams, and trackers"
    ],
    whatsNew: [
      "تحديث قاعدة بيانات الفيروسات والتهديدات 2026"
    ],
    whatsNewEn: [
      "Updated 2026 zero-day threat definitions"
    ],
    techSpecs: {
      requiresWindows: "Windows 7/8/10/11",
      requiresAndroid: "Android 9.0+",
      license: "نسخة مرخصة",
      licenseEn: "Licensed / Clean",
      virusScanSafe: true,
    },
    screenshots: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&auto=format&fit=crop&q=80"
    ],
    downloadLinks: [
      {
        id: "dl-mb-1",
        provider: "direct",
        title: "تحميل البرنامج لويندوز (Setup Direct)",
        titleEn: "Direct Windows Setup (.exe)",
        url: "https://example.com/malwarebytes.exe",
        size: "180 MB",
        fastServer: true
      }
    ],
    tags: ["حماية", "أمان", "مكافحة فيروسات"],
    tagsEn: ["Antivirus", "Malwarebytes", "Security"],
    viewsCount: 8200
  },
  {
    id: "app-6",
    title: "شرح طريقة تسريع أداء ويندوز 11 وإلغاء تثبيت التطبيقات الإجبارية بخطوة واحدة",
    titleEn: "Windows 11 Ultimate Optimization Guide & Debloat Script 2026",
    slug: "speed-up-windows-11-optimization-guide",
    category: "شروحات تقنية وحلول",
    categoryEn: "Tech Tutorials",
    categorySlug: "tutorials",
    platform: ["windows"],
    version: "2026 Guide",
    developer: "TechnoApp Team",
    size: "12 MB Tool",
    rating: 4.9,
    reviewsCount: 310,
    downloadsCount: "50K+",
    updatedDate: "02 أغسطس 2026",
    updatedDateEn: "August 02, 2026",
    iconUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=80",
    summary: "دليل شامل وأداة برمجية مفتوحة المصدر لتحسين إقلاع نظام ويندوز، تنظيف الذاكرة المؤقتة، وإزالة التطبيقات غير المرغوبة (Debloat).",
    summaryEn: "Comprehensive step-by-step optimization tutorial and safe open-source script to remove telemetry, boost boot speeds, and clean RAM.",
    description: `يعاني الكثير من مستخدمي ويندوز 11 من بطء الإقلاع واستهلاك الرامات بسبب خدمات مايكروسوفت الخلفية. في هذا المقال نوفر أداة آمنة تماماً لتنظيف النظام.`,
    descriptionEn: `Fix Windows 11 lag, disable background tracking, clean junk cache, and boost FPS with our verified optimization tool.`,
    features: [
      "إيقاف خدمات التتبع التلقائي لمايكروسوفت",
      "تنظيف ملفات Temp بنقرة واحدة",
      "تقليل استهلاك الذاكرة RAM بنسبة 35%"
    ],
    featuresEn: [
      "Disable intrusive background telemetry & bloat services",
      "One-click cache, temp, and prefetch junk cleanup",
      "Reduce idle RAM consumption by up to 35%"
    ],
    whatsNew: [
      "دعم كامل لتحديث ويندوز 11 24H2 الأخير"
    ],
    whatsNewEn: [
      "Full compatibility with Windows 11 24H2 update"
    ],
    techSpecs: {
      requiresWindows: "Windows 10 / 11",
      license: "أداة مجانية مفتوحة المصدر",
      licenseEn: "Free Open Source Utility",
      virusScanSafe: true,
    },
    screenshots: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80"
    ],
    downloadLinks: [
      {
        id: "dl-win-1",
        provider: "direct",
        title: "تحميل أداة تسريع الويندوز (Zip مباشر)",
        titleEn: "Direct Optimizer Tool (.zip)",
        url: "https://example.com/windows-optimizer.zip",
        size: "12 MB",
        fastServer: true
      }
    ],
    tags: ["ويندوز 11", "شروحات", "تسريع الكمبيوتر"],
    tagsEn: ["Windows 11", "Optimization", "Speed Up PC"],
    viewsCount: 7900
  }
];

