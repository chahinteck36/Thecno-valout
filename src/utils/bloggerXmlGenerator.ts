import { ThemeConfig, TechAppPost } from '../types';

export function generateBloggerXml(config: ThemeConfig): string {
  const primaryColor = {
    cyan: '#06b6d4',
    emerald: '#10b981',
    indigo: '#6366f1',
    amber: '#f59e0b',
    crimson: '#f43f5e',
  }[config.themeColor] || '#06b6d4';

  const primaryHover = {
    cyan: '#0891b2',
    emerald: '#059669',
    indigo: '#4f46e5',
    amber: '#d97706',
    crimson: '#e11d48',
  }[config.themeColor] || '#0891b2';

  const fontName = config.fontFamily || 'Cairo';
  const fontUrlSafe = fontName.replace(/ /g, '+');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:version='2' class='v2' dir='rtl' expr:dir='data:blog.languageDirection' lang='ar' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='utf-8'></meta>
  <meta content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5' name='viewport'></meta>
  <title><data:blog.pageTitle/></title>
  <b:include data='blog' name='all-head-content'/>

  <!-- SEO Canonical & Meta Optimization -->
  <link expr:href='data:blog.canonicalUrl' rel='canonical'/>
  <b:if cond='data:blog.metaDescription != ""'>
    <meta expr:content='data:blog.metaDescription' name='description'/>
    <meta expr:content='data:blog.metaDescription' property='og:description'/>
    <meta expr:content='data:blog.metaDescription' name='twitter:description'/>
  </b:if>
  
  <!-- Open Graph & Social Cards for High CTR -->
  <meta expr:content='data:blog.pageTitle' property='og:title'/>
  <meta expr:content='data:blog.canonicalUrl' property='og:url'/>
  <meta content='website' property='og:type'/>
  <meta content='summary_large_image' name='twitter:card'/>
  <meta expr:content='data:blog.pageTitle' name='twitter:title'/>
  <b:if cond='data:blog.postImageUrl'>
    <meta expr:content='data:blog.postImageUrl' property='og:image'/>
    <meta expr:content='data:blog.postImageUrl' name='twitter:image'/>
  </b:if>

  <!-- Google Fonts Preconnect -->
  <link href='https://fonts.googleapis.com' rel='preconnect'></link>
  <link crossorigin='' href='https://fonts.gstatic.com' rel='preconnect'></link>
  <link href='https://fonts.googleapis.com/css2?family=${fontUrlSafe}:wght@300;400;500;600;700;800;900&amp;display=swap' rel='stylesheet'></link>
  
  <!-- FontAwesome Icons for Blogger -->
  <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' rel='stylesheet'></link>

  <b:skin><![CDATA[
  /*
  -----------------------------------------------
  Blogger Theme: TechnoApp Pro
  Version: 4.0.0
  -----------------------------------------------
  */

  :root {
    --primary: ${primaryColor};
    --primary-hover: ${primaryHover};
    --primary-glow: rgba(6, 182, 212, 0.15);
    --font-family: '${fontName}', system-ui, -apple-system, sans-serif;
    
    /* Light Mode */
    --bg-body: #f8fafc;
    --bg-card: #ffffff;
    --bg-card-alt: #f1f5f9;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --text-dim: #94a3b8;
    --border-color: #e2e8f0;
    --border-light: #f1f5f9;
    --card-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
    --hover-shadow: 0 12px 30px -4px rgba(15, 23, 42, 0.12);
    --badge-bg: rgba(6, 182, 212, 0.1);
    --badge-text: var(--primary);
    --header-bg: rgba(255, 255, 255, 0.95);
    --code-bg: #0f172a;
    --code-text: #38bdf8;
  }

  [data-theme="dark"] {
    --bg-body: #0b0f19;
    --bg-card: #111827;
    --bg-card-alt: #1e293b;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --text-dim: #64748b;
    --border-color: #1f293d;
    --border-light: #162032;
    --card-shadow: 0 4px 25px rgba(0, 0, 0, 0.4);
    --hover-shadow: 0 12px 35px rgba(6, 182, 212, 0.15);
    --badge-bg: rgba(6, 182, 212, 0.15);
    --badge-text: #38bdf8;
    --header-bg: rgba(17, 24, 39, 0.95);
    --code-bg: #030712;
    --code-text: #7dd3fc;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    background-color: var(--bg-body);
    color: var(--text-main);
    line-height: 1.65;
    direction: rtl;
    text-align: right;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header & Navigation */
  .site-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--header-bg);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-color);
    transition: background 0.3s ease;
  }

  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 22px;
    font-weight: 800;
    color: var(--text-main);
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .brand-slogan {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 500;
  }

  .brand-logo .logo-icon {
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, var(--primary), var(--primary-hover));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 20px;
    box-shadow: 0 4px 12px var(--primary-glow);
  }

  .nav-menu {
    display: flex;
    align-items: center;
    gap: 8px;
    list-style: none;
  }

  .nav-item a {
    padding: 8px 14px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    color: var(--text-muted);
  }

  .nav-item a:hover, .nav-item.active a {
    color: var(--primary);
    background: var(--badge-bg);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .theme-toggle-btn, .search-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    background: var(--bg-card);
    color: var(--text-main);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .theme-toggle-btn:hover, .search-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-2px);
  }

  /* Breaking Ticker */
  .ticker-bar {
    background: var(--bg-card);
    border-bottom: 1px solid var(--border-color);
    padding: 8px 0;
    font-size: 14px;
  }

  .ticker-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .ticker-badge {
    background: var(--primary);
    color: #ffffff;
    padding: 4px 10px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ticker-content {
    color: var(--text-muted);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Layout Grid */
  .main-wrapper {
    padding: 32px 0 60px;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 32px;
  }

  @media (max-width: 992px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
    .nav-menu {
      display: none;
    }
  }

  /* App Cards Grid */
  .apps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 36px;
  }

  .app-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: var(--card-shadow);
  }

  .app-card:hover {
    transform: translateY(-4px);
    border-color: var(--primary);
    box-shadow: var(--hover-shadow);
  }

  .app-card-header {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    margin-bottom: 14px;
  }

  .app-card-icon {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    object-fit: cover;
    background: var(--bg-card-alt);
    border: 1px solid var(--border-color);
    flex-shrink: 0;
  }

  .app-card-meta {
    flex: 1;
    min-width: 0;
  }

  .app-card-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-main);
    line-height: 1.4;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .app-card-dev {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
  }

  .app-card-tags {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }

  .app-tag {
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 6px;
    background: var(--bg-card-alt);
    color: var(--text-muted);
  }

  .app-tag.version {
    background: var(--badge-bg);
    color: var(--badge-text);
  }

  .app-card-footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 14px;
    border-top: 1px solid var(--border-color);
  }

  .app-card-size {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .app-download-btn {
    background: var(--primary);
    color: #ffffff;
    font-weight: 700;
    font-size: 13px;
    padding: 6px 14px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.2s;
  }

  .app-download-btn:hover {
    background: var(--primary-hover);
  }

  /* Single Post & App Details Box */
  .post-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 28px;
    box-shadow: var(--card-shadow);
  }

  .post-breadcrumbs {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  .post-title {
    font-size: 26px;
    font-weight: 800;
    line-height: 1.4;
    color: var(--text-main);
    margin-bottom: 20px;
  }

  /* THE ULTIMATE TECH APP DOWNLOAD HUB */
  .app-download-box {
    background: linear-gradient(180deg, var(--bg-card-alt) 0%, var(--bg-card) 100%);
    border: 2px solid var(--border-color);
    border-radius: 18px;
    padding: 24px;
    margin: 28px 0;
    box-shadow: var(--card-shadow);
  }

  .app-box-header {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
  }

  .app-box-icon {
    width: 80px;
    height: 80px;
    border-radius: 18px;
    object-fit: cover;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .app-box-info h2 {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 6px;
  }

  .app-box-meta-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .meta-pill {
    font-size: 12px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    color: var(--text-main);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .meta-pill.safe {
    background: #ecfdf5;
    border-color: #a7f3d0;
    color: #059669;
  }

  [data-theme="dark"] .meta-pill.safe {
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.3);
    color: #34d399;
  }

  /* Technical Specs Table */
  .tech-specs-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 24px;
    font-size: 14px;
  }

  .tech-specs-table tr {
    border-bottom: 1px solid var(--border-color);
  }

  .tech-specs-table td {
    padding: 10px 12px;
  }

  .tech-specs-table td:first-child {
    font-weight: 700;
    color: var(--text-muted);
    width: 38%;
  }

  .tech-specs-table td:last-child {
    color: var(--text-main);
    font-weight: 600;
  }

  /* Countdown & Download Buttons */
  .download-timer-container {
    background: var(--bg-card);
    border: 1px dashed var(--primary);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    margin-bottom: 20px;
  }

  .timer-number {
    font-size: 28px;
    font-weight: 900;
    color: var(--primary);
    display: inline-block;
    min-width: 40px;
  }

  .download-mirrors-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .download-mirror-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 14px 18px;
    font-weight: 700;
    font-size: 15px;
    color: var(--text-main);
    transition: all 0.25s;
  }

  .download-mirror-btn:hover {
    border-color: var(--primary);
    background: var(--badge-bg);
    color: var(--primary);
    transform: translateX(-4px);
  }

  .download-mirror-btn.direct {
    background: linear-gradient(135deg, var(--primary), var(--primary-hover));
    color: #ffffff;
    border: none;
    box-shadow: 0 4px 14px var(--primary-glow);
  }

  .download-mirror-btn.direct:hover {
    filter: brightness(1.1);
    color: #ffffff;
  }

  /* Sidebar Styling */
  .sidebar-widget {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 24px;
    box-shadow: var(--card-shadow);
  }

  .widget-title {
    font-size: 17px;
    font-weight: 800;
    color: var(--text-main);
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--badge-bg);
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .widget-title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    right: 0;
    width: 40px;
    height: 2px;
    background: var(--primary);
  }

  .categories-list {
    list-style: none;
  }

  .category-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: var(--text-muted);
    transition: all 0.2s;
  }

  .category-link:hover {
    background: var(--bg-card-alt);
    color: var(--primary);
    padding-right: 16px;
  }

  .category-count {
    background: var(--badge-bg);
    color: var(--badge-text);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 700;
  }

  /* Social Follow Widget */
  .social-follow-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 12px;
  }

  .social-card-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    color: #ffffff !important;
    font-weight: 700;
    font-size: 13px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, filter 0.2s ease;
  }

  .social-card-btn:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  .social-card-btn.telegram { background: #229ED9; }
  .social-card-btn.youtube { background: #FF0000; }
  .social-card-btn.whatsapp { background: #25D366; color: #020617 !important; }
  .social-card-btn.twitter { background: #14171A; border: 1px solid rgba(255,255,255,0.15); }
  .social-card-btn.facebook { background: #1877F2; }
  .social-card-btn.instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }

  /* Sidebar Slider Widget */
  .sidebar-slider-box {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    margin-bottom: 24px;
    box-shadow: var(--card-shadow);
  }

  .slider-header-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    border-bottom: 1px solid var(--border-color);
  }

  .slider-header-bar h3 {
    font-size: 14px;
    font-weight: 800;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0;
  }

  .slider-nav-btns button {
    background: var(--badge-bg);
    border: none;
    color: var(--text-main);
    width: 26px;
    height: 26px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.2s;
  }

  .slider-nav-btns button:hover {
    background: var(--primary);
    color: #ffffff;
  }

  .slider-body {
    padding: 14px 18px 18px;
  }

  .slider-slide {
    display: none;
  }

  .slider-slide.active {
    display: block;
    animation: fadeIn 0.4s ease;
  }

  .slider-thumb-wrap {
    position: relative;
    height: 130px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 12px;
    background: #020617;
  }

  .slider-thumb-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.75;
    transition: transform 0.4s ease;
  }

  .slider-thumb-wrap:hover img {
    transform: scale(1.05);
    opacity: 0.9;
  }

  .slider-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--primary);
    color: #ffffff;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 800;
  }

  /* Static Pages Styling */
  .static-page-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 30px;
    box-shadow: var(--card-shadow);
    margin-bottom: 30px;
  }

  .static-page-header {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 16px;
    margin-bottom: 24px;
  }

  .static-page-header h1 {
    font-size: 26px;
    font-weight: 800;
    color: var(--text-main);
  }

  /* Header Top Mini-bar */
  .header-topbar {
    background: var(--bg-card-alt);
    border-bottom: 1px solid var(--border-color);
    padding: 6px 0;
    font-size: 12px;
  }

  .header-topbar .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .top-links {
    display: flex;
    gap: 16px;
    list-style: none;
  }

  .top-links a:hover {
    color: var(--primary);
  }

  .top-socials {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .top-socials a {
    color: var(--text-muted);
    font-size: 13px;
  }

  .top-socials a:hover {
    color: var(--primary);
  }

  /* Telegram Banner Widget */
  .telegram-widget {
    background: linear-gradient(135deg, #0088cc, #00a2ed);
    color: #ffffff;
    border-radius: 16px;
    padding: 22px;
    text-align: center;
    margin-bottom: 24px;
  }

  .telegram-widget h3 {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 8px;
  }

  .telegram-widget p {
    font-size: 13px;
    opacity: 0.9;
    margin-bottom: 16px;
  }

  .telegram-join-btn {
    background: #ffffff;
    color: #0088cc;
    font-weight: 800;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 10px;
    display: inline-block;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s;
  }

  .telegram-join-btn:hover {
    transform: scale(1.04);
  }

  /* Footer */
  .site-footer {
    background: var(--bg-card);
    border-top: 1px solid var(--border-color);
    padding: 40px 0 24px;
    color: var(--text-muted);
    font-size: 14px;
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 24px;
    border-top: 1px solid var(--border-color);
    margin-top: 30px;
  }

  @media (max-width: 640px) {
    .footer-bottom {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }
  }

  /* Blogger Layout Dashboard Compatibility */
  body#layout {
    width: 100%;
    max-width: 1000px;
    margin: 20px auto;
    direction: rtl;
  }
  body#layout .header-topbar,
  body#layout .site-header,
  body#layout .ticker-bar,
  body#layout .main-wrapper,
  body#layout .site-footer {
    border: 2px dashed #94a3b8;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 12px;
  }
  ]]></b:skin>
</head>

<body>
  <!-- Header Top Bar (Customizable Widgets for Links & Socials) -->
  <div class='header-topbar'>
    <div class='container'>
      <b:section class='topbar-links' id='topbar-links' maxwidgets='1' showaddelement='yes'>
        <b:widget id='LinkList1' locked='false' title='روابط الصفحات الثابتة' type='LinkList'>
          <b:includable id='main'>
            <ul class='top-links'>
              <b:loop values='data:links' var='link'>
                <li><a expr:href='data:link.target'><data:link.name/></a></li>
              </b:loop>
            </ul>
          </b:includable>
        </b:widget>
      </b:section>

      <b:section class='topbar-social' id='topbar-social' maxwidgets='1' showaddelement='yes'>
        <b:widget id='HTML97' locked='false' title='مواقع التواصل (أعلى الصفحة)' type='HTML'>
          <b:includable id='main'>
            <div class='top-socials'>
              <b:if cond='data:content != &quot;&quot;'>
                <data:content/>
              <b:else/>
                <span>تابعنا:</span>
                <a href='${config.socialLinks.telegram || config.telegramChannelUrl}' target='_blank' title='Telegram'><i class='fa-brands fa-telegram'></i></a>
                <a href='${config.socialLinks.youtube || "https://youtube.com"}' target='_blank' title='YouTube'><i class='fa-brands fa-youtube'></i></a>
                <a href='${config.socialLinks.whatsapp || "https://whatsapp.com"}' target='_blank' title='WhatsApp'><i class='fa-brands fa-whatsapp'></i></a>
                <a href='${config.socialLinks.twitter || "https://twitter.com"}' target='_blank' title='X / Twitter'><i class='fa-brands fa-x-twitter'></i></a>
                <a href='${config.socialLinks.facebook || "https://facebook.com"}' target='_blank' title='Facebook'><i class='fa-brands fa-facebook'></i></a>
                <a href='${config.socialLinks.instagram || "https://instagram.com"}' target='_blank' title='Instagram'><i class='fa-brands fa-instagram'></i></a>
              </b:if>
            </div>
          </b:includable>
        </b:widget>
      </b:section>
    </div>
  </div>

  <!-- Header Section with Logo & Main Menu Widgets -->
  <header class='site-header'>
    <div class='container'>
      <div class='top-bar'>
        <b:section class='header-logo' id='header-logo' maxwidgets='1' showaddelement='yes'>
          <b:widget id='Header1' locked='false' title='شعار وعنوان الموقع' type='Header'>
            <b:includable id='main'>
              <div class='header-brand-wrap'>
                <b:if cond='data:useImage'>
                  <a class='brand-logo image-logo' expr:href='data:blog.homepageUrl'>
                    <img expr:alt='data:title' expr:src='data:sourceUrl' style='max-height:48px; width:auto; border-radius:8px;'/>
                  </a>
                <b:else/>
                  <a class='brand-logo' expr:href='data:blog.homepageUrl'>
                    ${config.logoUrl ? `<img src='${config.logoUrl}' alt='${config.siteName}' style='max-height:46px; width:auto; border-radius:8px;' />` : `<div class='logo-icon'><i class='fa-solid fa-bolt'></i></div>`}
                    <div class='brand-text'>
                      <span><data:title/></span>
                      <small class='brand-slogan'>${config.siteDescription || 'منصة التطبيقات والبرامج التقنية'}</small>
                    </div>
                  </a>
                </b:if>
              </div>
            </b:includable>
          </b:widget>
        </b:section>

        <b:section class='main-nav' id='main-nav' maxwidgets='1' showaddelement='yes'>
          <b:widget id='LinkList2' locked='false' title='القائمة الرئيسية' type='LinkList'>
            <b:includable id='main'>
              <ul class='nav-menu'>
                <b:loop values='data:links' var='link'>
                  <li class='nav-item'><a expr:href='data:link.target'><data:link.name/></a></li>
                </b:loop>
              </ul>
            </b:includable>
          </b:widget>
        </b:section>

        <div class='header-actions'>
          <button aria-label='Toggle Dark Mode' class='theme-toggle-btn' id='themeToggleBtn' onclick='toggleTheme()'>
            <i class='fa-solid fa-moon' id='themeIcon'></i>
          </button>
          <a class='theme-toggle-btn' href='${config.telegramChannelUrl}' target='_blank' title='قناتنا على تيليجرام'>
            <i class='fa-brands fa-telegram'></i>
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- News Ticker (Customizable Widget) -->
  <div class='ticker-bar'>
    <div class='container'>
      <b:section class='top-ticker' id='top-ticker' maxwidgets='1' showaddelement='yes'>
        <b:widget id='HTML96' locked='false' title='شريط التحديثات' type='HTML'>
          <b:includable id='main'>
            <div class='ticker-wrapper'>
              <span class='ticker-badge'><i class='fa-solid fa-bolt'></i> <data:title/></span>
              <b:if cond='data:content != &quot;&quot;'>
                <span class='ticker-content'><data:content/></span>
              <b:else/>
                <span class='ticker-content'>تحميل أحدث إصدارات التطبيقات وبرامج الكمبيوتر لعام 2026 بروابط مباشرة وسريعة خالية من الإعلانات المزعجة</span>
              </b:if>
            </div>
          </b:includable>
        </b:widget>
      </b:section>
    </div>
  </div>

  <!-- Main Content Layout -->
  <main class='main-wrapper'>
    <div class='container'>
      <div class='content-grid'>
        <!-- Main Posts Area -->
        <section class='main-content'>
          <b:section class='main' id='main' showaddelement='yes'>
            <b:widget id='Blog1' locked='true' title='رسائل المدونة الإلكترونية' type='Blog'>
              <b:includable id='main'>
                <div class='posts-container'>
                  <b:if cond='data:blog.pageType == &quot;item&quot; or data:blog.pageType == &quot;static_page&quot;'>
                    <!-- Single Post View -->
                    <b:loop values='data:posts' var='post'>
                      <article class='post-card'>
                        <div class='post-breadcrumbs'>
                          <a href='/'><i class='fa-solid fa-house'></i> الرئيسية</a>
                          <span>/</span>
                          <span><data:post.title/></span>
                        </div>

                        <h1 class='post-title'><data:post.title/></h1>

                        <!-- Post Body Content -->
                        <div class='post-body-content' id='postBody'>
                          <data:post.body/>
                        </div>
                      </article>
                    </b:loop>
                  <b:else/>
                    <!-- Grid of Apps on Homepage/Archive -->
                    <div class='apps-grid'>
                      <b:loop values='data:posts' var='post'>
                        <article class='app-card'>
                          <div class='app-card-header'>
                            <b:if cond='data:post.firstImageUrl'>
                              <img class='app-card-icon' expr:alt='data:post.title' expr:src='data:post.firstImageUrl'/>
                            <b:else/>
                              <b:if cond='data:post.thumbnailUrl'>
                                <img class='app-card-icon' expr:alt='data:post.title' expr:src='data:post.thumbnailUrl'/>
                              <b:else/>
                                <img alt='App Icon' class='app-card-icon' src='https://via.placeholder.com/80'/>
                              </b:if>
                            </b:if>
                            <div class='app-card-meta'>
                              <h2 class='app-card-title'>
                                <a expr:href='data:post.url'><data:post.title/></a>
                              </h2>
                              <span class='app-card-dev'><i class='fa-solid fa-circle-check text-primary'></i> تطبيق موثوق</span>
                            </div>
                          </div>

                          <div class='app-card-tags'>
                            <span class='app-tag version'>أحدث إصدار</span>
                            <span class='app-tag'>سريع وآمن</span>
                          </div>

                          <div class='app-card-footer'>
                            <span class='app-card-size'><i class='fa-solid fa-shield-halved text-success'></i> تم الفحص</span>
                            <a class='app-download-btn' expr:href='data:post.url'>
                              <i class='fa-solid fa-download'></i> تحميل
                            </a>
                          </div>
                        </article>
                      </b:loop>
                    </div>
                  </b:if>
                </div>
              </b:includable>
            </b:widget>
          </b:section>
        </section>

        <!-- Sidebar Area -->
        <aside class='site-sidebar'>
          <b:section class='sidebar' id='sidebar' showaddelement='yes'>
            
            <!-- 1. Sidebar Slider Widget (سلايدر جانبي للتطبيقات المميزة) -->
            <b:widget id='HTML99' locked='false' title='تطبيقات مختارة (سلايدر)' type='HTML'>
              <b:includable id='main'>
                <div class='sidebar-slider-box' id='sidebarSlider'>
                  <div class='slider-header-bar'>
                    <h3><i class='fa-solid fa-fire text-primary'></i> <data:title/></h3>
                    <div class='slider-nav-btns'>
                      <button onclick='prevSidebarSlide()' title='السابق'><i class='fa-solid fa-chevron-right'></i></button>
                      <button onclick='nextSidebarSlide()' title='التالي'><i class='fa-solid fa-chevron-left'></i></button>
                    </div>
                  </div>
                  <b:if cond='data:content != &quot;&quot;'>
                    <div class='slider-body'>
                      <data:content/>
                    </div>
                  <b:else/>
                    <div class='slider-body'>
                      <div class='slider-slide active'>
                        <div class='slider-thumb-wrap'>
                          <img alt='CapCut Pro' src='https://images.unsplash.com/photo-1616469829941-c7200edec809?w=600&amp;auto=format&amp;fit=crop&amp;q=80'/>
                          <span class='slider-badge'>أندرويد</span>
                        </div>
                        <h4 style='font-size:14px; font-weight:800; margin-bottom:4px;'><a href='/search/label/android-apps'>CapCut Pro 2026 مهكر بدون علامة</a></h4>
                        <p style='font-size:12px; color:var(--text-muted); margin-bottom:12px;'>محرر الفيديو الاحترافي مفتوح كافة الميزات مجاناً</p>
                        <a class='download-mirror-btn direct' href='/search/label/android-apps' style='padding:8px 14px; font-size:12px; border-radius:8px;'>
                          <span><i class='fa-solid fa-download'></i> تحميل مباشر</span>
                          <i class='fa-solid fa-arrow-left'></i>
                        </a>
                      </div>
                      <div class='slider-slide'>
                        <div class='slider-thumb-wrap'>
                          <img alt='IDM Full' src='https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&amp;auto=format&amp;fit=crop&amp;q=80'/>
                          <span class='slider-badge'>ويندوز</span>
                        </div>
                        <h4 style='font-size:14px; font-weight:800; margin-bottom:4px;'><a href='/search/label/windows-software'>Internet Download Manager كامل</a></h4>
                        <p style='font-size:12px; color:var(--text-muted); margin-bottom:12px;'>عملاق تسريع التحميل مدى الحياة بدون مشاكل تفعيل</p>
                        <a class='download-mirror-btn direct' href='/search/label/windows-software' style='padding:8px 14px; font-size:12px; border-radius:8px;'>
                          <span><i class='fa-solid fa-download'></i> تحميل مباشر</span>
                          <i class='fa-solid fa-arrow-left'></i>
                        </a>
                      </div>
                      <div class='slider-slide'>
                        <div class='slider-thumb-wrap'>
                          <img alt='ChatGPT Plus' src='https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&amp;auto=format&amp;fit=crop&amp;q=80'/>
                          <span class='slider-badge'>ذكاء اصطناعي</span>
                        </div>
                        <h4 style='font-size:14px; font-weight:800; margin-bottom:4px;'><a href='/search/label/ai-tools'>ChatGPT Plus &amp; Claude Pro</a></h4>
                        <p style='font-size:12px; color:var(--text-muted); margin-bottom:12px;'>طريقة الحصول على اشتراكات الذكاء الاصطناعي مجاناً</p>
                        <a class='download-mirror-btn direct' href='/search/label/ai-tools' style='padding:8px 14px; font-size:12px; border-radius:8px;'>
                          <span><i class='fa-solid fa-download'></i> تفاصيل الشرح</span>
                          <i class='fa-solid fa-arrow-left'></i>
                        </a>
                      </div>
                    </div>
                  </b:if>
                </div>
              </b:includable>
            </b:widget>

            <!-- 2. Social Media Follow Box (أزرار التواصل الاجتماعي) -->
            <b:widget id='HTML98' locked='false' title='مواقع التواصل الاجتماعي' type='HTML'>
              <b:includable id='main'>
                <div class='sidebar-widget'>
                  <h3 class='widget-title'><i class='fa-solid fa-share-nodes text-primary'></i> <data:title/></h3>
                  <b:if cond='data:content != &quot;&quot;'>
                    <data:content/>
                  <b:else/>
                    <div class='social-follow-grid'>
                      <a class='social-card-btn telegram' href='${config.socialLinks.telegram || config.telegramChannelUrl}' target='_blank'>
                        <i class='fa-brands fa-telegram fa-lg'></i>
                        <span>تيليجرام</span>
                      </a>
                      <a class='social-card-btn youtube' href='${config.socialLinks.youtube || "https://youtube.com"}' target='_blank'>
                        <i class='fa-brands fa-youtube fa-lg'></i>
                        <span>يوتيوب</span>
                      </a>
                      <a class='social-card-btn whatsapp' href='${config.socialLinks.whatsapp || "https://whatsapp.com"}' target='_blank'>
                        <i class='fa-brands fa-whatsapp fa-lg'></i>
                        <span>واتساب</span>
                      </a>
                      <a class='social-card-btn twitter' href='${config.socialLinks.twitter || "https://twitter.com"}' target='_blank'>
                        <i class='fa-brands fa-x-twitter fa-lg'></i>
                        <span>إكس / تويتر</span>
                      </a>
                      <a class='social-card-btn facebook' href='${config.socialLinks.facebook || "https://facebook.com"}' target='_blank'>
                        <i class='fa-brands fa-facebook fa-lg'></i>
                        <span>فيسبوك</span>
                      </a>
                      <a class='social-card-btn instagram' href='${config.socialLinks.instagram || "https://instagram.com"}' target='_blank'>
                        <i class='fa-brands fa-instagram fa-lg'></i>
                        <span>إنستغرام</span>
                      </a>
                    </div>
                  </b:if>
                </div>
              </b:includable>
            </b:widget>

            <!-- 3. Telegram VIP Widget -->
            <b:widget id='HTML1' locked='false' title='قناة التليجرام' type='HTML'>
              <b:includable id='main'>
                <b:if cond='data:content != &quot;&quot;'>
                  <div class='telegram-widget'>
                    <data:content/>
                  </div>
                <b:else/>
                  <div class='telegram-widget'>
                    <i class='fa-brands fa-telegram fa-3x' style='margin-bottom:12px;'></i>
                    <h3><data:title/></h3>
                    <p>احصل على أحدث التطبيقات والبرامج الحصرية والمدفوعة فور نشرها</p>
                    <a class='telegram-join-btn' href='${config.telegramChannelUrl}' target='_blank'>
                      <i class='fa-solid fa-paper-plane'></i> انضمام مجاناً
                    </a>
                  </div>
                </b:if>
              </b:includable>
            </b:widget>

            <!-- 4. Categories Widget -->
            <b:widget id='Label1' locked='false' title='أقسام الموقع' type='Label'>
              <b:includable id='main'>
                <div class='sidebar-widget'>
                  <h3 class='widget-title'><i class='fa-solid fa-layer-group'></i> <data:title/></h3>
                  <ul class='categories-list'>
                    <b:loop values='data:labels' var='label'>
                      <li><a class='category-link' expr:href='data:label.url'><span><i class='fa-solid fa-folder'></i> <data:label.name/></span> <span class='category-count'><data:label.count/></span></a></li>
                    </b:loop>
                  </ul>
                </div>
              </b:includable>
            </b:widget>
          </b:section>
        </aside>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class='site-footer'>
    <div class='container'>
      <b:section class='footer-links-section' id='footer-links-section' maxwidgets='1' showaddelement='yes'>
        <b:widget id='LinkList3' locked='false' title='روابط الفوتر' type='LinkList'>
          <b:includable id='main'>
            <div style='display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin-bottom:20px; font-weight:700; font-size:14px;'>
              <b:loop values='data:links' var='link'>
                <a expr:href='data:link.target' style='color:var(--text-main);'><data:link.name/></a>
              </b:loop>
            </div>
          </b:includable>
        </b:widget>
      </b:section>

      <b:section class='footer-copyright-section' id='footer-copyright-section' maxwidgets='1' showaddelement='yes'>
        <b:widget id='HTML95' locked='false' title='حقوق الفوتر' type='HTML'>
          <b:includable id='main'>
            <b:if cond='data:content != &quot;&quot;'>
              <div class='footer-bottom'>
                <data:content/>
              </div>
            <b:else/>
              <div class='footer-bottom'>
                <p>جميع الحقوق محفوظة © 2026 لـ <strong><data:blog.title/></strong></p>
                <p>قالب بلوجر تقني سريع واحترافي لتحميل التطبيقات والبرامج</p>
              </div>
            </b:if>
          </b:includable>
        </b:widget>
      </b:section>
    </div>
  </footer>

  <!-- Theme JavaScript Core -->
  <script type='text/javascript'>
  //<![CDATA[
  // Dark/Light Mode Management
  function initTheme() {
    const savedTheme = localStorage.getItem('techno_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('techno_theme', newTheme);
    updateThemeIcon(newTheme);
  }

  function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  // Sidebar Slider Carousel Logic
  let currentSlide = 0;
  function showSidebarSlide(index) {
    const slides = document.querySelectorAll('#sidebarSlider .slider-slide');
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  function nextSidebarSlide() {
    showSidebarSlide(currentSlide + 1);
  }

  function prevSidebarSlide() {
    showSidebarSlide(currentSlide - 1);
  }

  // Auto rotate slider every 5s
  setInterval(() => {
    nextSidebarSlide();
  }, 5000);

  // Automatic Download Timer Logic
  function startDownloadTimer(buttonId, timerContainerId, seconds) {
    const timerElem = document.getElementById(timerContainerId);
    const btnElem = document.getElementById(buttonId);
    if (!timerElem || !btnElem) return;

    let timeLeft = seconds;
    btnElem.style.display = 'none';
    timerElem.innerHTML = '<span>جاري تجهيز رابط التحميل المباشر... يرجى الانتظار <strong class="timer-number">' + timeLeft + '</strong> ثانية</span>';

    const interval = setInterval(() => {
      timeLeft--;
      const numElem = timerElem.querySelector('.timer-number');
      if (numElem) numElem.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(interval);
        timerElem.style.display = 'none';
        btnElem.style.display = 'flex';
      }
    }, 1000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
  });
  //]]>
  </script>
</body>
</html>`;
}
