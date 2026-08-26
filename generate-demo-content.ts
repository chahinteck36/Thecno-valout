import fs from 'fs';
import { MOCK_POSTS, DEFAULT_THEME_CONFIG } from './src/data/mockPosts';
import { generateBloggerXml } from './src/utils/bloggerXmlGenerator';

function escapeXml(str: string) {
  return str
    ? str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
    : '';
}

let atomEntries = '';

// 1. Add All App Posts
MOCK_POSTS.forEach((post, index) => {
  const publishedDate = new Date(Date.now() - index * 86400000).toISOString();

  const contentHtml = `
<div class="tech-app-article-content" dir="rtl">
  <div class="separator" style="clear: both; text-align: center; margin-bottom: 20px;">
    <a href="${post.coverImage || post.iconUrl}" style="margin-left: 1em; margin-right: 1em;">
      <img border="0" data-original-height="600" data-original-width="1200" src="${post.coverImage || post.iconUrl}" alt="${post.title}" style="max-width: 100%; height: auto; border-radius: 16px; border: 1px solid #334155;" />
    </a>
  </div>

  <p style="font-size: 16px; line-height: 1.8; color: #e2e8f0; margin-bottom: 20px;">
    ${post.description.split('\n\n').join('</p><p style="font-size: 16px; line-height: 1.8; color: #e2e8f0; margin-bottom: 20px;">')}
  </p>

  <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid #334155; border-radius: 16px; padding: 20px; margin: 25px 0;">
    <h3 style="color: #10b981; font-weight: bold; margin-bottom: 12px; font-size: 18px;">✨ أهم مميزات وخصائص هذا الإصدار:</h3>
    <ul style="margin: 0; padding-right: 20px; color: #cbd5e1; line-height: 1.8;">
      ${(post.features || []).map((f) => `<li>${f}</li>`).join('')}
    </ul>
  </div>

  <!-- THE ULTIMATE TECH APP DOWNLOAD HUB & SPECS TABLE -->
  <div class="tech-app-download-hub" style="background: linear-gradient(180deg, #020617 0%, #0f172a 100%); border: 2px solid #06b6d4; border-radius: 20px; padding: 24px; margin: 35px 0; box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.15);">
    
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 16px;">
      <img src="${post.iconUrl}" alt="${post.title}" style="width: 70px; height: 70px; border-radius: 16px; border: 2px solid #06b6d4; object-fit: cover;" />
      <div>
        <h3 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 800;">${post.title}</h3>
        <div style="color: #94a3b8; font-size: 13px; margin-top: 4px;">
          المطور: <strong style="color: #06b6d4;">${post.developer}</strong> | الحجم: <strong>${post.size}</strong> | الإصدار: <strong>${post.version}</strong>
        </div>
        <div style="color: #10b981; font-size: 12px; font-weight: bold; margin-top: 4px;">
          🛡️ فحص الأمان: سليم 100% وخالي من الفيروسات (VirusTotal Clean)
        </div>
      </div>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; text-align: right; background: rgba(2, 6, 23, 0.6); border-radius: 12px; overflow: hidden;">
      <tbody>
        <tr style="border-bottom: 1px solid #1e293b;">
          <td style="padding: 10px 14px; background: rgba(30, 41, 59, 0.5); color: #94a3b8; width: 35%; font-weight: bold;">نظام التشغيل المطلوب</td>
          <td style="padding: 10px 14px; color: #f8fafc;">${post.techSpecs.requiresAndroid || post.techSpecs.requiresWindows || 'كافة الأجهزة'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #1e293b;">
          <td style="padding: 10px 14px; background: rgba(30, 41, 59, 0.5); color: #94a3b8; font-weight: bold;">نوع الترخيص</td>
          <td style="padding: 10px 14px; color: #10b981; font-weight: bold;">${post.techSpecs.license || 'مجاني / Free'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #1e293b;">
          <td style="padding: 10px 14px; background: rgba(30, 41, 59, 0.5); color: #94a3b8; font-weight: bold;">التقييم</td>
          <td style="padding: 10px 14px; color: #fbbf24; font-weight: bold;">★ ${post.rating} / 5.0 (${post.downloadsCount})</td>
        </tr>
        <tr>
          <td style="padding: 10px 14px; background: rgba(30, 41, 59, 0.5); color: #94a3b8; font-weight: bold;">آخر تحديث</td>
          <td style="padding: 10px 14px; color: #f8fafc;">${post.updatedDate}</td>
        </tr>
      </tbody>
    </table>

    <div style="text-align: center; margin-top: 20px;">
      <div style="font-weight: bold; color: #06b6d4; margin-bottom: 12px; font-size: 14px;">⚡ سيرفرات وروابط التحميل المباشرة:</div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${post.downloadLinks
          .map(
            (dl) => `
          <a href="${dl.url}" target="_blank" rel="noopener noreferrer" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; background: linear-gradient(135deg, #06b6d4, #2563eb); color: #020617; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 14px; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.3);">
            <span>📥 ${dl.title}</span>
            <span style="font-size: 12px; background: rgba(0,0,0,0.15); padding: 4px 10px; border-radius: 6px;">تحميل سريع (${dl.size || post.size})</span>
          </a>
        `
          )
          .join('')}
      </div>
    </div>

  </div>
</div>
`;

  atomEntries += `
  <entry>
    <id>tag:blogger.com,1999:blog-1000000000000000000.post-${index + 1001}</id>
    <published>${publishedDate}</published>
    <updated>${publishedDate}</updated>
    <category scheme="http://schemas.google.com/g/2005#kind" term="http://schemas.google.com/blogger/2008/kind#post"/>
    <category scheme="http://www.blogger.com/atom/ns#" term="${post.categorySlug}"/>
    <category scheme="http://www.blogger.com/atom/ns#" term="${post.category}"/>
    <title type="text">${escapeXml(post.title)}</title>
    <content type="html">${escapeXml(contentHtml)}</content>
    <author>
      <name>${escapeXml(post.developer)}</name>
      <email>noreply@blogger.com</email>
    </author>
  </entry>
`;
});

// 2. Add Static Pages (About, Privacy, Contact, Disclaimer)
const staticPages = [
  {
    title: 'من نحن - About Us',
    slug: 'about',
    html: `
<div class="static-page-content" dir="rtl">
  <h2>مرحباً بكم في ${DEFAULT_THEME_CONFIG.siteName}</h2>
  <p>نحن المنصة العربية الرائدة المتخصصة في تقديم وشرح أحدث تطبيقات الهواتف الذكية وبرامج الحاسوب والأدوات التقنية وحلول الذكاء الاصطناعي بروابط آمنة وسريعة ومباشرة.</p>
  <h3>رسالتنا:</h3>
  <p>توفير محتوى تقني دقيق وموثوق خالي من الروابط الإعلانية المضللة، وفحص كافة الملفات والتطبيقات قبل طرحها للتأكد من سلامتها وخلوها من البرمجيات الضارة.</p>
  <h3>فريق العمل:</h3>
  <p>يضم فريقنا نخبة من المطورين والمهتمين بالتقنية وأمن المعلومات، الذين يواكبون كل جديد يومياً ليقدموا لكم الأفضل دائماً.</p>
</div>
`
  },
  {
    title: 'سياسة الخصوصية - Privacy Policy',
    slug: 'privacy',
    html: `
<div class="static-page-content" dir="rtl">
  <h2>سياسة الخصوصية لـ ${DEFAULT_THEME_CONFIG.siteName}</h2>
  <p>في ${DEFAULT_THEME_CONFIG.siteName}، نعتبر خصوصية زوارنا ذات أهمية بالغة بالنسبة لنا. توضح هذه الوثيقة أنواع المعلومات الشخصية التي نجمعها وكيفية استخدامها وحمايتها.</p>
  <h3>ملفات السجل (Log Files):</h3>
  <p>مثل معظم المواقع على شبكة الإنترنت، نستخدم ملفات السجل التي تشمل عناوين بروتوكول الإنترنت (IP)، نوع المتصفح، ومزود خدمة الإنترنت (ISP).</p>
  <h3>كوكيز جوجل أدسنس وإعلانات الطرف الثالث:</h3>
  <p>نستخدم إعلانات Google AdSense وشركاء إعلانات معتمدين لعرض إعلانات مخصصة عند زيارتك لموقعنا وفقاً لسياسات Google الخصوصية.</p>
</div>
`
  },
  {
    title: 'اتصل بنا - Contact Us',
    slug: 'contact',
    html: `
<div class="static-page-content" dir="rtl">
  <h2>تواصل مع إدارة الموقع</h2>
  <p>يسعدنا دائماً استقبال استفساراتكم واقتراحاتكم وطلبات إضافة أو تحديث التطبيقات والبرامج عبر قنواتنا الرسمية:</p>
  <ul>
    <li>قناة التيليجرام: <a href="${DEFAULT_THEME_CONFIG.telegramChannelUrl}" target="_blank">${DEFAULT_THEME_CONFIG.telegramChannelUrl}</a></li>
    <li>البريد الإلكتروني: contact@technoapp-pro.com</li>
  </ul>
</div>
`
  },
  {
    title: 'إخلاء المسؤولية - Disclaimer',
    slug: 'disclaimer',
    html: `
<div class="static-page-content" dir="rtl">
  <h2>إخلاء المسؤولية وحقوق الملكية الفكرية (DMCA)</h2>
  <p>كافة الأسماء التجارية والعلامات المسجلة والتطبيقات المذكورة في هذا الموقع هي ملك لأصحابها ومطوريها الأصليين. نحن نقدم مراجعات وشروحات تقنية للأغراض التعليمية والتجريبية فقط.</p>
  <p>إذا كنت صاحب حق ملكية لأي محتوى وترغب في حذفه، يرجى التواصل معنا فوراً وسنقوم بإزالته خلال 24 ساعة.</p>
</div>
`
  }
];

staticPages.forEach((sp, idx) => {
  const publishedDate = new Date(Date.now() - (idx + 20) * 86400000).toISOString();
  atomEntries += `
  <entry>
    <id>tag:blogger.com,1999:blog-1000000000000000000.page-${idx + 5001}</id>
    <published>${publishedDate}</published>
    <updated>${publishedDate}</updated>
    <category scheme="http://schemas.google.com/g/2005#kind" term="http://schemas.google.com/blogger/2008/kind#page"/>
    <title type="text">${escapeXml(sp.title)}</title>
    <content type="html">${escapeXml(sp.html)}</content>
    <author>
      <name>Admin</name>
      <email>noreply@blogger.com</email>
    </author>
  </entry>
`;
});

const bloggerImportXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:openSearch="http://a9.com/-/spec/opensearchrss/1.0/" xmlns:blogger="http://schemas.google.com/blogger/2008" xmlns:georss="http://www.georss.org/georss" xmlns:gd="http://schemas.google.com/g/2005" xmlns:thr="http://purl.org/syndication/thread/1.0">
  <id>tag:blogger.com,1999:blog-1000000000000000000</id>
  <updated>${new Date().toISOString()}</updated>
  <title type="text">TechnoApp Pro Demo Content &amp; Pages</title>
  <subtitle type="text">Sample applications, software and static pages for TechnoApp Pro Blogger Theme</subtitle>
${atomEntries}
</feed>`;

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}

// Generate the updated theme.xml and blogger-demo-content.xml
const themeXml = generateBloggerXml(DEFAULT_THEME_CONFIG);

fs.writeFileSync('./public/theme.xml', themeXml, 'utf-8');
fs.writeFileSync('./theme.xml', themeXml, 'utf-8');

fs.writeFileSync('./public/blogger-demo-content.xml', bloggerImportXml, 'utf-8');
fs.writeFileSync('./blogger-demo-content.xml', bloggerImportXml, 'utf-8');

console.log('Successfully generated theme.xml and blogger-demo-content.xml with all posts and static pages!');
