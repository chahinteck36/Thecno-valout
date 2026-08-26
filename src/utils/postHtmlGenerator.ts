import { TechAppPost } from '../types';

export function generatePostHtml(post: TechAppPost, enableTimer = true, timerSeconds = 10): string {
  const downloadButtonsHtml = post.downloadLinks.map((dl, idx) => {
    let iconClass = 'fa-download';
    let providerName = 'رابط مباشر';
    let btnStyleClass = 'download-mirror-btn';

    if (dl.provider === 'direct') {
      iconClass = 'fa-bolt';
      providerName = 'تحميل مباشر فائق السرعة (APK / Setup)';
      btnStyleClass = 'download-mirror-btn direct';
    } else if (dl.provider === 'drive') {
      iconClass = 'fa-google-drive';
      providerName = 'سيرفر Google Drive';
    } else if (dl.provider === 'mediafire') {
      iconClass = 'fa-cloud-arrow-down';
      providerName = 'سيرفر MediaFire';
    } else if (dl.provider === 'mega') {
      iconClass = 'fa-cloud';
      providerName = 'سيرفر Mega.nz';
    } else if (dl.provider === 'telegram') {
      iconClass = 'fa-telegram';
      providerName = 'تحميل عبر قناة تيليجرام';
    }

    return `
    <a href="${dl.url}" target="_blank" rel="noopener noreferrer" class="${btnStyleClass}" id="dl-link-${idx}">
      <span style="display:flex;align-items:center;gap:10px;">
        <i class="fa-solid ${iconClass}"></i>
        <strong>${dl.title || providerName}</strong>
      </span>
      <span style="font-size:12px;opacity:0.85;background:rgba(0,0,0,0.1);padding:3px 8px;border-radius:6px;">
        ${dl.size || post.size} <i class="fa-solid fa-arrow-down"></i>
      </span>
    </a>`;
  }).join('\n');

  const screenshotsHtml = post.screenshots && post.screenshots.length > 0 ? `
  <div class="app-screenshots-gallery" style="margin:24px 0;">
    <h3 style="font-size:18px;font-weight:800;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
      <i class="fa-solid fa-images" style="color:var(--primary);"></i> لقطات شاشة من داخل التطبيق:
    </h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:14px;">
      ${post.screenshots.map((shot, i) => `
        <a href="${shot}" target="_blank" style="border-radius:12px;overflow:hidden;border:1px solid var(--border-color);display:block;">
          <img src="${shot}" alt="${post.title} screenshot ${i + 1}" style="width:100%;height:140px;object-fit:cover;transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"/>
        </a>
      `).join('')}
    </div>
  </div>` : '';

  const featuresListHtml = post.features && post.features.length > 0 ? `
  <div class="app-features-box" style="background:var(--bg-card-alt);border:1px solid var(--border-color);border-radius:14px;padding:20px;margin:24px 0;">
    <h3 style="font-size:17px;font-weight:800;margin-bottom:12px;color:var(--text-main);display:flex;align-items:center;gap:8px;">
      <i class="fa-solid fa-star" style="color:#f59e0b;"></i> أهم مميزات ${post.title.split(' ')[1] || 'البرنامج'}:
    </h3>
    <ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:10px;">
      ${post.features.map(f => `
        <li style="display:flex;align-items:flex-start;gap:8px;font-size:14px;color:var(--text-main);">
          <i class="fa-solid fa-check-circle" style="color:#10b981;margin-top:4px;"></i>
          <span>${f}</span>
        </li>
      `).join('')}
    </ul>
  </div>` : '';

  return `<!-- ============================================== -->
<!-- كود صندوق تحميل ومعلومات التطبيق التقني المتكامل (مهيأ للسيو 100%) -->
<!-- انسخ هذا الكود والصقه في تبويب HTML بمشاركتك في بلوجر -->
<!-- ============================================== -->

<div class="app-post-container" itemscope="itemscope" itemtype="https://schema.org/SoftwareApplication" style="direction:rtl;text-align:right;font-family:inherit;">
  
  <!-- بيانات السيو الخفية لجوجل (Google Search Rich Snippets) -->
  <meta itemprop="name" content="${post.title}" />
  <meta itemprop="operatingSystem" content="${post.techSpecs.requiresAndroid || post.techSpecs.requiresWindows || 'Android / Windows / Web'}" />
  <meta itemprop="applicationCategory" content="SoftwareApplication" />
  <meta itemprop="softwareVersion" content="${post.version}" />
  <meta itemprop="fileSize" content="${post.size}" />
  <meta itemprop="image" content="${post.coverImage || post.iconUrl}" />
  <div itemprop="aggregateRating" itemscope="itemscope" itemtype="https://schema.org/AggregateRating" style="display:none;">
    <meta itemprop="ratingValue" content="${post.rating || '4.8'}" />
    <meta itemprop="bestRating" content="5" />
    <meta itemprop="ratingCount" content="380" />
  </div>
  <div itemprop="offers" itemscope="itemscope" itemtype="https://schema.org/Offer" style="display:none;">
    <meta itemprop="price" content="0" />
    <meta itemprop="priceCurrency" content="USD" />
    <meta itemprop="availability" content="https://schema.org/InStock" />
  </div>

  <!-- فقرة الوصف والمراجعة التقنية -->
  <div class="post-intro" itemprop="description" style="font-size:15px;line-height:1.8;margin-bottom:20px;color:var(--text-main);">
    <p>${post.description.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>
  </div>

  ${featuresListHtml}
  ${screenshotsHtml}

  <!-- صندوق التحميل والمواصفات التقنية الفائق -->
  <div class="app-download-box" id="appDownloadHub">
    <div class="app-box-header">
      <img src="${post.iconUrl}" alt="${post.title}" itemprop="thumbnailUrl" class="app-box-icon" />
      <div class="app-box-info">
        <h2 itemprop="headline">${post.title}</h2>
        <div class="app-box-meta-pills">
          <span class="meta-pill"><i class="fa-solid fa-code-branch"></i> الإصدار: <span itemprop="version">${post.version}</span></span>
          <span class="meta-pill"><i class="fa-solid fa-hard-drive"></i> الحجم: <span>${post.size}</span></span>
          <span class="meta-pill"><i class="fa-solid fa-user-gear"></i> المطور: <span itemprop="author">${post.developer}</span></span>
          ${post.techSpecs.virusScanSafe ? `
          <span class="meta-pill safe">
            <i class="fa-solid fa-shield-check"></i> تم الفحص وآمن 100% (VirusTotal Clean)
          </span>` : ''}
        </div>
      </div>
    </div>

    <!-- جدول المواصفات الفنية التفصيلية -->
    <table class="tech-specs-table">
      <tbody>
        <tr>
          <td><i class="fa-solid fa-mobile-screen"></i> نظام التشغيل المدعوم</td>
          <td>${post.techSpecs.requiresAndroid || post.techSpecs.requiresWindows || 'كافة الأجهزة'}</td>
        </tr>
        <tr>
          <td><i class="fa-solid fa-certificate"></i> نوع الترخيص</td>
          <td>${post.techSpecs.license || 'مجاني / Free'}</td>
        </tr>
        <tr>
          <td><i class="fa-solid fa-calendar-days"></i> تاريخ آخر تحديث</td>
          <td><time itemprop="dateModified" datetime="${post.updatedDate}">${post.updatedDate}</time></td>
        </tr>
        <tr>
          <td><i class="fa-solid fa-cloud-arrow-down"></i> إجمالي التحميلات</td>
          <td>${post.downloadsCount} تحميل موثوق</td>
        </tr>
      </tbody>
    </table>

    <!-- أزرار وروابط التحميل المباشرة والسحابية -->
    <div class="download-section-wrapper" style="margin-top:20px;">
      <h3 style="font-size:17px;font-weight:800;margin-bottom:14px;text-align:center;color:var(--text-main);">
        <i class="fa-solid fa-download" style="color:var(--primary);"></i> اختر سيرفر التحميل المفضل لديك:
      </h3>

      <div class="download-mirrors-list">
        ${downloadButtonsHtml}
      </div>
    </div>
  </div>
</div>
`;
}
