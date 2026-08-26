import JSZip from 'jszip';
import { ThemeConfig } from '../types';

export interface WordPressFile {
  name: string;
  path: string;
  description: string;
  language: string;
  content: string;
}

export function generateWordPressThemeFiles(config: ThemeConfig): WordPressFile[] {
  const colorMap: Record<string, { primary: string; hover: string; rgb: string }> = {
    cyan: { primary: '#06b6d4', hover: '#0891b2', rgb: '6, 182, 212' },
    emerald: { primary: '#10b981', hover: '#059669', rgb: '16, 185, 129' },
    indigo: { primary: '#6366f1', hover: '#4f46e5', rgb: '99, 102, 241' },
    amber: { primary: '#f59e0b', hover: '#d97706', rgb: '245, 158, 11' },
    crimson: { primary: '#f43f5e', hover: '#e11d48', rgb: '244, 63, 94' },
  };

  const activeColor = colorMap[config.themeColor] || colorMap.cyan;

  // 1. style.css
  const styleCss = `/*
Theme Name: TechnoApp Pro - WordPress Edition
Theme URI: https://technoapp-demo.com
Author: TechnoApp Studio
Author URI: https://technoapp-demo.com
Description: قالب ووردبريس تقني احترافي وفائق السرعة مخصص لعرض وتحميل التطبيقات وبرامج الكمبيوتر وأدوات الذكاء الاصطناعي مع دعم الوضع الليلي ومؤقت التحميل التنازلي وسيو متقدم 100%.
Version: 2026.1.0
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: technoapp
Tags: blog, news, custom-colors, custom-menu, featured-images, rtl-language-support, dark-mode, software-download, responsive-layout
*/

@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(config.fontFamily)}:wght@400;500;600;700;800;900&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

:root {
  --primary: ${activeColor.primary};
  --primary-hover: ${activeColor.hover};
  --primary-rgb: ${activeColor.rgb};
  --font-main: '${config.fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  --bg-main: #090d16;
  --bg-surface: #0f172a;
  --bg-card: #131d33;
  --bg-card-hover: #182542;
  --border-color: rgba(255, 255, 255, 0.08);
  --border-focus: ${activeColor.primary};
  
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --text-light: #64748b;
  
  --badge-bg: rgba(${activeColor.rgb}, 0.12);
  --badge-text: ${activeColor.primary};
  --shadow-card: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
}

body.light-theme {
  --bg-main: #f1f5f9;
  --bg-surface: #ffffff;
  --bg-card: #ffffff;
  --bg-card-hover: #f8fafc;
  --border-color: #e2e8f0;
  --text-main: #0f172a;
  --text-muted: #475569;
  --text-light: #94a3b8;
  --shadow-card: 0 10px 25px -5px rgba(0, 0, 0, 0.06);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-main);
  background-color: var(--bg-main);
  color: var(--text-main);
  direction: rtl;
  text-align: right;
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.25s ease, color 0.25s ease;
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
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Header Topbar */
.header-topbar {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  font-size: 12px;
  padding: 8px 0;
}
.header-topbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-menu ul {
  display: flex;
  list-style: none;
  gap: 16px;
}
.top-menu a:hover {
  color: var(--primary);
}
.top-socials {
  display: flex;
  align-items: center;
  gap: 12px;
}
.top-socials a {
  color: var(--text-muted);
}
.top-socials a:hover {
  color: var(--primary);
}

/* Main Header */
.site-header {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 20px;
}
.brand-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 900;
  color: var(--text-main);
}
.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary), #3b82f6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #090d16;
  font-size: 18px;
}

.header-search {
  flex: 1;
  max-width: 420px;
  position: relative;
}
.header-search input {
  width: 100%;
  background: var(--bg-main);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 10px 42px 10px 16px;
  border-radius: 12px;
  font-family: inherit;
  font-size: 13px;
  outline: none;
}
.header-search input:focus {
  border-color: var(--border-focus);
}
.header-search .search-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.theme-toggle-btn, .mobile-toggle-btn {
  background: var(--bg-main);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Nav Menu */
.main-navigation {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
}
.nav-menu-list {
  display: flex;
  list-style: none;
  gap: 6px;
  overflow-x: auto;
  padding: 4px 0;
}
.nav-menu-list a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 8px;
  color: var(--text-muted);
}
.nav-menu-list a:hover, .nav-menu-list .current-menu-item a {
  color: var(--primary);
  background: var(--badge-bg);
}

/* News Ticker */
.news-ticker-bar {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  padding: 10px 0;
  font-size: 12px;
}
.ticker-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}
.ticker-badge {
  background: var(--primary);
  color: #090d16;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

/* Main Layout */
.main-wrapper {
  padding: 30px 0;
  flex: 1;
}
.layout-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 28px;
}
@media (max-width: 992px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
}

/* App Cards Grid */
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}
.app-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
  position: relative;
}
.app-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--primary-rgb), 0.4);
  box-shadow: var(--shadow-card);
}
.card-header-flex {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}
.app-icon-img {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.app-card-title {
  font-size: 15px;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 4px;
}
.app-card-title a:hover {
  color: var(--primary);
}
.app-meta-tag {
  font-size: 11px;
  color: var(--text-muted);
}
.app-card-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 14px;
  flex: 1;
}
.app-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-color);
  padding-top: 12px;
  font-size: 12px;
}
.app-rating {
  color: #f59e0b;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
}
.app-download-cta {
  background: var(--badge-bg);
  color: var(--primary);
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 800;
  font-size: 11px;
}
.app-card:hover .app-download-cta {
  background: var(--primary);
  color: #090d16;
}

/* Single Post View */
.single-post-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 28px;
}
.app-detail-hero {
  display: flex;
  gap: 24px;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 24px;
  margin-bottom: 24px;
}
.app-hero-icon {
  width: 96px;
  height: 96px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.app-hero-info h1 {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 8px;
}
.app-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: var(--text-muted);
}
.app-hero-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Specs Table */
.specs-table {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
  background: var(--bg-main);
  border-radius: 12px;
  overflow: hidden;
}
.specs-table tr {
  border-bottom: 1px solid var(--border-color);
}
.specs-table td {
  padding: 12px 18px;
  font-size: 13px;
}
.specs-table td:first-child {
  font-weight: 700;
  color: var(--text-muted);
  width: 35%;
}

/* Download Box & Timer */
.download-hero-box {
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(59, 130, 246, 0.05));
  border: 2px dashed rgba(var(--primary-rgb), 0.4);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  margin: 32px 0;
}
.timer-countdown {
  font-size: 32px;
  font-weight: 900;
  color: var(--primary);
  margin: 12px 0;
}
.download-buttons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 20px;
}
.dl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
  color: #fff;
  transition: transform 0.2s;
}
.dl-btn:hover {
  transform: translateY(-2px);
}
.dl-btn.direct { background: linear-gradient(135deg, #10b981, #059669); color: #090d16; }
.dl-btn.mediafire { background: #0070f3; }
.dl-btn.drive { background: #4285f4; }
.dl-btn.mega { background: #d9272e; }
.dl-btn.telegram { background: #229ed9; }

/* Sidebar Widgets */
.sidebar-widget {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
}
.widget-title {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}
.widget-title i {
  color: var(--primary);
}

.telegram-card-widget {
  background: linear-gradient(135deg, #1d3e68, #0e2444);
  border: 1px solid #2563eb;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  color: #fff;
}
.telegram-card-widget h3 {
  font-size: 16px;
  font-weight: 800;
  margin: 10px 0 6px;
}
.telegram-card-widget p {
  font-size: 12px;
  color: #93c5fd;
  margin-bottom: 14px;
}
.telegram-card-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #38bdf8;
  color: #090d16;
  font-weight: 800;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13px;
}

/* Footer */
.site-footer {
  background: var(--bg-surface);
  border-top: 1px solid var(--border-color);
  padding: 40px 0 20px;
  margin-top: auto;
}
.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}
@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }
}
.footer-bottom {
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
}
`;

  // 2. functions.php
  const functionsPhp = `<?php
/**
 * TechnoApp Pro Theme Functions & Definitions
 * WordPress 2026 Edition
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// 1. Theme Setup
function technoapp_theme_setup() {
    // Add default posts and comments RSS feed links to head.
    add_theme_support('automatic-feed-links');

    // Title tag support
    add_theme_support('title-tag');

    // Post thumbnails (Featured image)
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(300, 300, true);
    add_image_size('technoapp-hero', 800, 450, true);

    // HTML5 markup support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));

    // Custom Logo
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Register Navigation Menus
    register_nav_menus(array(
        'primary-menu' => __('القائمة الرئيسية العلوية (Header Menu)', 'technoapp'),
        'top-menu'     => __('روابط الصفحات الثابتة (Top Bar)', 'technoapp'),
        'footer-menu'  => __('روابط الفوتر (Footer Menu)', 'technoapp'),
    ));
}
add_action('after_setup_theme', 'technoapp_theme_setup');

// 2. Enqueue Styles & Scripts
function technoapp_scripts() {
    wp_enqueue_style('technoapp-main-style', get_stylesheet_uri(), array(), '2026.1.0');
    
    // Main Theme JS
    wp_enqueue_script(
        'technoapp-main-js', 
        get_template_directory_uri() . '/assets/js/main.js', 
        array('jquery'), 
        '2026.1.0', 
        true
    );

    // Pass configuration to JS
    wp_localize_script('technoapp-main-js', 'technoappSettings', array(
        'timerDuration' => ${config.timerDuration || 10},
        'enableTimer'   => ${config.enableDownloadTimer ? 'true' : 'false'},
        'ajaxUrl'       => admin_url('admin-ajax.php'),
    ));
}
add_action('wp_enqueue_scripts', 'technoapp_scripts');

// 3. Register Sidebars & Widget Areas
function technoapp_widgets_init() {
    register_sidebar(array(
        'name'          => __('الشريط الجانبي الرئيسي (Main Sidebar)', 'technoapp'),
        'id'            => 'main-sidebar',
        'description'   => __('الأدوات المعروضة في الشريط الجانبي الأيسر بالموقع.', 'technoapp'),
        'before_widget' => '<div id="%1$s" class="sidebar-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('موقع إعلاني أعلى المقال (In-Article Ad)', 'technoapp'),
        'id'            => 'in-article-ad',
        'description'   => __('شفرة إعلانات أدسنس داخل صفحة تحميل التطبيق.', 'technoapp'),
        'before_widget' => '<div class="ad-placement-box">',
        'after_widget'  => '</div>',
        'before_title'  => '',
        'after_title'   => '',
    ));
}
add_action('widgets_init', 'technoapp_widgets_init');

// 4. Custom App Meta Boxes (Version, Developer, Download Links, Specs)
function technoapp_add_meta_boxes() {
    add_meta_box(
        'technoapp_app_details',
        __('معلومات وبيانات التطبيق والتحميل (App Details & Download Links)', 'technoapp'),
        'technoapp_meta_box_callback',
        'post',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'technoapp_add_meta_boxes');

function technoapp_meta_box_callback($post) {
    wp_nonce_field('technoapp_save_meta_box_data', 'technoapp_meta_box_nonce');
    
    $version     = get_post_meta($post->ID, '_app_version', true) ?: '2026.1.0';
    $developer   = get_post_meta($post->ID, '_app_developer', true) ?: 'Pro Dev';
    $size        = get_post_meta($post->ID, '_app_size', true) ?: '45 MB';
    $platform    = get_post_meta($post->ID, '_app_platform', true) ?: 'Android';
    $rating      = get_post_meta($post->ID, '_app_rating', true) ?: '4.9';
    $license     = get_post_meta($post->ID, '_app_license', true) ?: 'مجاني / Free';
    $direct_link = get_post_meta($post->ID, '_app_direct_link', true);
    $mediafire   = get_post_meta($post->ID, '_app_mediafire_link', true);
    $drive_link  = get_post_meta($post->ID, '_app_drive_link', true);
    $telegram_dl = get_post_meta($post->ID, '_app_telegram_link', true);
    $is_safe     = get_post_meta($post->ID, '_app_virus_safe', true) !== 'no';
    ?>
    <div style="direction: rtl; text-align: right; padding: 10px; font-family: inherit;">
        <table style="width: 100%; border-spacing: 12px;">
            <tr>
                <td style="width: 25%;"><label><strong>رقم الإصدار (Version):</strong></label></td>
                <td><input type="text" name="app_version" value="<?php echo esc_attr($version); ?>" style="width: 100%; padding: 6px;" /></td>
                <td style="width: 25%;"><label><strong>المطور (Developer):</strong></label></td>
                <td><input type="text" name="app_developer" value="<?php echo esc_attr($developer); ?>" style="width: 100%; padding: 6px;" /></td>
            </tr>
            <tr>
                <td><label><strong>الحجم (Size):</strong></label></td>
                <td><input type="text" name="app_size" value="<?php echo esc_attr($size); ?>" style="width: 100%; padding: 6px;" placeholder="مثال: 65 MB" /></td>
                <td><label><strong>نظام التشغيل (Platform):</strong></label></td>
                <td>
                    <select name="app_platform" style="width: 100%; padding: 6px;">
                        <option value="Android" <?php selected($platform, 'Android'); ?>>Android (أندرويد)</option>
                        <option value="Windows" <?php selected($platform, 'Windows'); ?>>Windows (ويندوز)</option>
                        <option value="iOS" <?php selected($platform, 'iOS'); ?>>iOS (آيفون)</option>
                        <option value="Mac" <?php selected($platform, 'Mac'); ?>>Mac OS (ماك)</option>
                        <option value="AI Tool" <?php selected($platform, 'AI Tool'); ?>>أداة ذكاء اصطناعي</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><label><strong>التقييم (Rating 1-5):</strong></label></td>
                <td><input type="text" name="app_rating" value="<?php echo esc_attr($rating); ?>" style="width: 100%; padding: 6px;" /></td>
                <td><label><strong>الترخيص (License):</strong></label></td>
                <td><input type="text" name="app_license" value="<?php echo esc_attr($license); ?>" style="width: 100%; padding: 6px;" /></td>
            </tr>
            <tr>
                <td><label><strong>رابط التحميل المباشر (Direct):</strong></label></td>
                <td colspan="3"><input type="url" name="app_direct_link" value="<?php echo esc_url($direct_link); ?>" style="width: 100%; padding: 6px;" placeholder="https://..." /></td>
            </tr>
            <tr>
                <td><label><strong>سيرفر ميديا فاير (MediaFire):</strong></label></td>
                <td colspan="3"><input type="url" name="app_mediafire_link" value="<?php echo esc_url($mediafire); ?>" style="width: 100%; padding: 6px;" placeholder="https://mediafire.com/..." /></td>
            </tr>
            <tr>
                <td><label><strong>سيرفر جوجل درايف (Drive):</strong></label></td>
                <td colspan="3"><input type="url" name="app_drive_link" value="<?php echo esc_url($drive_link); ?>" style="width: 100%; padding: 6px;" placeholder="https://drive.google.com/..." /></td>
            </tr>
            <tr>
                <td><label><strong>رابط ملف التيليجرام (Telegram):</strong></label></td>
                <td colspan="3"><input type="url" name="app_telegram_link" value="<?php echo esc_url($telegram_dl); ?>" style="width: 100%; padding: 6px;" placeholder="https://t.me/..." /></td>
            </tr>
            <tr>
                <td><label><strong>فحص الأمان والفايروسات:</strong></label></td>
                <td colspan="3">
                    <label>
                        <input type="checkbox" name="app_virus_safe" value="yes" <?php checked($is_safe, true); ?> />
                        الملف آمن 100% وتم فحصه عبر VirusTotal (عرض الشارة الخضراء)
                    </label>
                </td>
            </tr>
        </table>
    </div>
    <?php
}

function technoapp_save_meta_box_data($post_id) {
    if (!isset($_POST['technoapp_meta_box_nonce']) || !wp_verify_nonce($_POST['technoapp_meta_box_nonce'], 'technoapp_save_meta_box_data')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = array(
        'app_version'        => '_app_version',
        'app_developer'      => '_app_developer',
        'app_size'           => '_app_size',
        'app_platform'       => '_app_platform',
        'app_rating'         => '_app_rating',
        'app_license'        => '_app_license',
        'app_direct_link'    => '_app_direct_link',
        'app_mediafire_link' => '_app_mediafire_link',
        'app_drive_link'     => '_app_drive_link',
        'app_telegram_link'  => '_app_telegram_link',
    );

    foreach ($fields as $key => $meta_key) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$key]));
        }
    }

    $safe_val = isset($_POST['app_virus_safe']) ? 'yes' : 'no';
    update_post_meta($post_id, '_app_virus_safe', $safe_val);
}
add_action('save_post', 'technoapp_save_meta_box_data');

// 5. Customizer Settings (Telegram Link, Social Links)
function technoapp_customize_register($wp_customize) {
    $wp_customize->add_section('technoapp_general_options', array(
        'title'    => __('إعدادات TechnoApp العامة وسوشيال ميديا', 'technoapp'),
        'priority' => 30,
    ));

    // Telegram Channel URL
    $wp_customize->add_setting('technoapp_telegram_url', array(
        'default'           => '${config.telegramChannelUrl || "https://t.me/example"}',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('technoapp_telegram_url', array(
        'label'    => __('رابط قناة التيليجرام الرسمية', 'technoapp'),
        'section'  => 'technoapp_general_options',
        'type'     => 'url',
    ));

    // Ticker text
    $wp_customize->add_setting('technoapp_ticker_text', array(
        'default'           => 'تحميل أحدث إصدارات التطبيقات وبرامج الكمبيوتر لعام 2026 بروابط مباشرة وسريعة خالية من الإعلانات',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('technoapp_ticker_text', array(
        'label'    => __('نص شريط الأخبار والتحديثات العاجلة', 'technoapp'),
        'section'  => 'technoapp_general_options',
        'type'     => 'text',
    ));
}
add_action('customize_register', 'technoapp_customize_register');
`;

  // 3. header.php
  const headerPhp = `<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Header Topbar -->
<div class="header-topbar">
    <div class="container">
        <nav class="top-menu">
            <?php
            if (has_nav_menu('top-menu')) {
                wp_nav_menu(array(
                    'theme_location' => 'top-menu',
                    'container'      => false,
                    'fallback_cb'    => false,
                ));
            } else {
                echo '<ul>';
                echo '<li><a href="' . esc_url(home_url('/about')) . '">من نحن</a></li>';
                echo '<li><a href="' . esc_url(home_url('/privacy-policy')) . '">سياسة الخصوصية</a></li>';
                echo '<li><a href="' . esc_url(home_url('/contact')) . '">اتصل بنا</a></li>';
                echo '<li><a href="' . esc_url(home_url('/dmca')) . '">إخلاء المسؤولية</a></li>';
                echo '</ul>';
            }
            ?>
        </nav>
        
        <div class="top-socials">
            <span>تابعنا:</span>
            <?php $tg = get_theme_mod('technoapp_telegram_url', '${config.telegramChannelUrl || "https://t.me/example"}'); ?>
            <a href="<?php echo esc_url($tg); ?>" target="_blank" title="Telegram"><i class="fa-brands fa-telegram"></i></a>
            <a href="${config.socialLinks.youtube || "https://youtube.com"}" target="_blank" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
            <a href="${config.socialLinks.whatsapp || "https://whatsapp.com"}" target="_blank" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="${config.socialLinks.twitter || "https://twitter.com"}" target="_blank" title="X / Twitter"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="${config.socialLinks.facebook || "https://facebook.com"}" target="_blank" title="Facebook"><i class="fa-brands fa-facebook"></i></a>
        </div>
    </div>
</div>

<!-- Main Site Header -->
<header class="site-header">
    <div class="container">
        <div class="header-inner">
            <!-- Brand Logo -->
            <div class="header-logo-wrap">
                <?php if (has_custom_logo()): ?>
                    <?php the_custom_logo(); ?>
                <?php elseif (!empty('${config.logoUrl || ""}')): ?>
                    <a class="brand-logo" href="<?php echo esc_url(home_url('/')); ?>">
                        <img src="${config.logoUrl || ""}" alt="<?php bloginfo('name'); ?>" style="max-height: 44px; width: auto; border-radius: 8px;" />
                        <span><?php bloginfo('name'); ?></span>
                    </a>
                <?php else: ?>
                    <a class="brand-logo" href="<?php echo esc_url(home_url('/')); ?>">
                        <div class="logo-icon"><i class="fa-solid fa-bolt"></i></div>
                        <span><?php bloginfo('name'); ?></span>
                    </a>
                <?php endif; ?>
            </div>

            <!-- Live Search Bar -->
            <div class="header-search">
                <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
                    <input type="search" name="s" placeholder="ابحث عن تطبيق، لعبة، أو برنامج..." value="<?php echo get_search_query(); ?>" required />
                    <button type="submit" class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>

            <!-- Header Actions -->
            <div class="header-actions">
                <button class="theme-toggle-btn" id="themeToggleBtn" title="تبديل الوضع الليلي / النهاري">
                    <i class="fa-solid fa-moon"></i>
                </button>
            </div>
        </div>
    </div>
</header>

<!-- Main Navigation Menu -->
<nav class="main-navigation">
    <div class="container">
        <?php
        if (has_nav_menu('primary-menu')) {
            wp_nav_menu(array(
                'theme_location' => 'primary-menu',
                'container'      => false,
                'menu_class'     => 'nav-menu-list',
                'fallback_cb'    => false,
            ));
        } else {
            echo '<ul class="nav-menu-list">';
            echo '<li class="current-menu-item"><a href="' . esc_url(home_url('/')) . '"><i class="fa-solid fa-house"></i> الرئيسية</a></li>';
            echo '<li><a href="' . esc_url(home_url('/category/android-apps')) . '"><i class="fa-brands fa-android"></i> تطبيقات أندرويد</a></li>';
            echo '<li><a href="' . esc_url(home_url('/category/windows-software')) . '"><i class="fa-brands fa-windows"></i> برامج ويندوز</a></li>';
            echo '<li><a href="' . esc_url(home_url('/category/games-mods')) . '"><i class="fa-solid fa-gamepad"></i> ألعاب مهكرة</a></li>';
            echo '<li><a href="' . esc_url(home_url('/category/ai-tools')) . '"><i class="fa-solid fa-brain"></i> أدوات الذكاء الاصطناعي</a></li>';
            echo '<li><a href="' . esc_url(home_url('/category/mac-ios')) . '"><i class="fa-brands fa-apple"></i> ماك وآيفون</a></li>';
            echo '</ul>';
        }
        ?>
    </div>
</nav>

<!-- News Ticker -->
<div class="news-ticker-bar">
    <div class="container">
        <div class="ticker-wrap">
            <span class="ticker-badge"><i class="fa-solid fa-bolt"></i> تحديثات 2026</span>
            <span class="ticker-text"><?php echo esc_html(get_theme_mod('technoapp_ticker_text', 'تحميل أحدث إصدارات التطبيقات وبرامج الكمبيوتر لعام 2026 بروابط مباشرة وسريعة')); ?></span>
        </div>
    </div>
</div>

<div class="main-wrapper">
    <div class="container">
        <div class="layout-grid">
            <main id="primary" class="site-main">
`;

  // 4. footer.php
  const footerPhp = `            </main><!-- #primary -->

            <!-- Sidebar -->
            <?php get_sidebar(); ?>

        </div><!-- .layout-grid -->
    </div><!-- .container -->
</div><!-- .main-wrapper -->

<!-- Site Footer -->
<footer class="site-footer">
    <div class="container">
        <div class="footer-inner">
            <div class="footer-col">
                <a class="brand-logo" href="<?php echo esc_url(home_url('/')); ?>" style="margin-bottom:12px;">
                    <div class="logo-icon"><i class="fa-solid fa-cube"></i></div>
                    <span><?php bloginfo('name'); ?></span>
                </a>
                <p style="font-size:13px; color:var(--text-muted); line-height:1.7;">
                    <?php bloginfo('description'); ?> - المنصة العربية الرائدة في تقديم أحدث التطبيقات والبرامج المهكرة والمجانية بروابط مباشرة وفحص أمني شامل.
                </p>
            </div>

            <div class="footer-col">
                <h4 style="font-size:15px; font-weight:800; margin-bottom:14px; color:var(--text-main);">روابط سريعة</h4>
                <?php
                if (has_nav_menu('footer-menu')) {
                    wp_nav_menu(array(
                        'theme_location' => 'footer-menu',
                        'container'      => false,
                    ));
                } else {
                    echo '<ul style="list-style:none; font-size:13px; display:flex; flex-direction:column; gap:8px;">';
                    echo '<li><a href="' . esc_url(home_url('/about')) . '">من نحن</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/privacy-policy')) . '">سياسة الخصوصية</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/dmca')) . '">حقوق الملكية الفكرية (DMCA)</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/contact')) . '">اتصل بنا</a></li>';
                    echo '</ul>';
                }
                ?>
            </div>

            <div class="footer-col">
                <h4 style="font-size:15px; font-weight:800; margin-bottom:14px; color:var(--text-main);">قناة التيليجرام</h4>
                <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">انضم لأكثر من 50,000 مشترك لتحميل البرامج الحصرية أولاً بأول.</p>
                <?php $tg = get_theme_mod('technoapp_telegram_url', '${config.telegramChannelUrl || "https://t.me/example"}'); ?>
                <a class="telegram-card-btn" href="<?php echo esc_url($tg); ?>" target="_blank">
                    <i class="fa-brands fa-telegram"></i> انضمام مجاناً
                </a>
            </div>
        </div>

        <div class="footer-bottom">
            <p>جميع الحقوق محفوظة © <?php echo date('Y'); ?> لـ <strong><?php bloginfo('name'); ?></strong> - تم التطوير والتحسين بأعلى معايير السيو والسرعة.</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
`;

  // 5. index.php
  const indexPhp = `<?php
/**
 * The main template file (Homepage)
 * TechnoApp WordPress Theme
 */

get_header();
?>

<div class="section-title-bar" style="margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center;">
    <h2 style="font-size: 20px; font-weight: 900; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-fire" style="color:var(--primary);"></i>
        <span>أحدث التطبيقات والبرامج المضافة</span>
    </h2>
    <span style="font-size: 12px; color:var(--text-muted);">إصدارات 2026 بروابط مباشرة</span>
</div>

<div class="apps-grid">
    <?php if (have_posts()) : while (have_posts()) : the_post(); 
        $version  = get_post_meta(get_the_ID(), '_app_version', true) ?: '2026';
        $platform = get_post_meta(get_the_ID(), '_app_platform', true) ?: 'Android';
        $rating   = get_post_meta(get_the_ID(), '_app_rating', true) ?: '4.9';
        $size     = get_post_meta(get_the_ID(), '_app_size', true) ?: '45 MB';
    ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('app-card'); ?>>
            <div class="card-header-flex">
                <?php if (has_post_thumbnail()) : ?>
                    <a href="<?php the_permalink(); ?>">
                        <?php the_post_thumbnail('thumbnail', array('class' => 'app-icon-img', 'alt' => get_the_title())); ?>
                    </a>
                <?php else : ?>
                    <div class="app-icon-img" style="background:linear-gradient(135deg,#06b6d4,#3b82f6); display:flex; align-items:center; justify-content:center; color:#090d16; font-size:22px;">
                        <i class="fa-solid fa-cube"></i>
                    </div>
                <?php endif; ?>

                <div>
                    <h3 class="app-card-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <div class="app-meta-tag">
                        <span><i class="fa-solid fa-code-branch"></i> V<?php echo esc_html($version); ?></span> • 
                        <span><?php echo esc_html($platform); ?></span>
                    </div>
                </div>
            </div>

            <p class="app-card-desc">
                <?php echo wp_trim_words(get_the_excerpt(), 14, '...'); ?>
            </p>

            <div class="app-card-footer">
                <span class="app-rating">
                    <i class="fa-solid fa-star"></i> <?php echo esc_html($rating); ?>
                </span>
                <span style="color:var(--text-muted); font-size:11px;">
                    <i class="fa-solid fa-hard-drive"></i> <?php echo esc_html($size); ?>
                </span>
                <a href="<?php the_permalink(); ?>" class="app-download-cta">
                    <i class="fa-solid fa-download"></i> تحميل
                </a>
            </div>
        </article>
    <?php endwhile; else : ?>
        <p style="grid-column: 1/-1; text-align:center; padding: 40px; color:var(--text-muted);">
            لم يتم العثور على أي تطبيقات بعد. يرجى إضافة منشورات من لوحة تحكم ووردبريس.
        </p>
    <?php endif; ?>
</div>

<div class="pagination-wrapper" style="margin-top: 30px; text-align:center;">
    <?php
    the_posts_pagination(array(
        'mid_size'  => 2,
        'prev_text' => '<i class="fa-solid fa-arrow-right"></i> السابق',
        'next_text' => 'التالي <i class="fa-solid fa-arrow-left"></i>',
    ));
    ?>
</div>

<?php
get_footer();
`;

  // 6. single.php
  const singlePhp = `<?php
/**
 * The template for displaying all single app posts
 * TechnoApp WordPress Theme
 */

get_header();

while (have_posts()) : the_post();
    $version     = get_post_meta(get_the_ID(), '_app_version', true) ?: '2026.1.0';
    $developer   = get_post_meta(get_the_ID(), '_app_developer', true) ?: 'Official Developer';
    $size        = get_post_meta(get_the_ID(), '_app_size', true) ?: '55 MB';
    $platform    = get_post_meta(get_the_ID(), '_app_platform', true) ?: 'Android 8.0+';
    $rating      = get_post_meta(get_the_ID(), '_app_rating', true) ?: '4.9';
    $license     = get_post_meta(get_the_ID(), '_app_license', true) ?: 'مجاني بالكامل (Freeware)';
    $direct_link = get_post_meta(get_the_ID(), '_app_direct_link', true) ?: '#';
    $mediafire   = get_post_meta(get_the_ID(), '_app_mediafire_link', true);
    $drive_link  = get_post_meta(get_the_ID(), '_app_drive_link', true);
    $telegram_dl = get_post_meta(get_the_ID(), '_app_telegram_link', true);
    $is_safe     = get_post_meta(get_the_ID(), '_app_virus_safe', true) !== 'no';
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('single-post-container'); ?>>
    
    <!-- Hero App Header -->
    <div class="app-detail-hero">
        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('medium', array('class' => 'app-hero-icon', 'alt' => get_the_title())); ?>
        <?php else : ?>
            <div class="app-hero-icon" style="background:linear-gradient(135deg,#06b6d4,#3b82f6); display:flex; align-items:center; justify-content:center; color:#090d16; font-size:36px;">
                <i class="fa-solid fa-cube"></i>
            </div>
        <?php endif; ?>

        <div class="app-hero-info" style="flex:1;">
            <h1><?php the_title(); ?></h1>
            <div class="app-hero-meta">
                <span><i class="fa-solid fa-code-branch text-primary"></i> الإصدار: <strong><?php echo esc_html($version); ?></strong></span>
                <span><i class="fa-solid fa-building text-primary"></i> المطور: <strong><?php echo esc_html($developer); ?></strong></span>
                <span><i class="fa-solid fa-hard-drive text-primary"></i> الحجم: <strong><?php echo esc_html($size); ?></strong></span>
                <span><i class="fa-solid fa-star" style="color:#f59e0b;"></i> التقييم: <strong><?php echo esc_html($rating); ?> / 5</strong></span>
            </div>
        </div>

        <a href="#downloadSection" class="dl-btn direct" style="padding:14px 28px; border-radius:14px; font-size:15px;">
            <i class="fa-solid fa-download"></i> انتقال للتحميل
        </a>
    </div>

    <!-- Security Check Badge -->
    <?php if ($is_safe) : ?>
        <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:14px 18px; display:flex; align-items:center; justify-content:space-between; margin-bottom:24px;">
            <div style="display:flex; align-items:center; gap:10px;">
                <i class="fa-solid fa-shield-halved" style="color:#10b981; font-size:22px;"></i>
                <div>
                    <strong style="color:#10b981; font-size:14px; display:block;">تم التحقق الأمني وفحص الفيروسات بنجاح</strong>
                    <span style="font-size:12px; color:var(--text-muted);">الملف نظيف 100% وخالٍ من أي برمجيات خبيثة أو إعلانات منبثقة مزعجة</span>
                </div>
            </div>
            <span style="background:#10b981; color:#090d16; font-weight:900; font-size:11px; padding:4px 10px; border-radius:6px;">آمن ومضمون</span>
        </div>
    <?php endif; ?>

    <!-- In-Article Ad Area -->
    <?php if (is_active_sidebar('in-article-ad')) : ?>
        <div style="margin:20px 0;">
            <?php dynamic_sidebar('in-article-ad'); ?>
        </div>
    <?php endif; ?>

    <!-- Post Main Content -->
    <div class="entry-content" style="font-size:15px; line-height:1.8; color:var(--text-main);">
        <?php the_content(); ?>
    </div>

    <!-- Tech Specs Table -->
    <h3 style="font-size:18px; font-weight:900; margin:30px 0 12px; display:flex; align-items:center; gap:8px;">
        <i class="fa-solid fa-circle-info text-primary"></i>
        <span>المواصفات والمعلومات الفنية للتطبيق</span>
    </h3>
    <table class="specs-table">
        <tbody>
            <tr>
                <td>اسم التطبيق / البرنامج</td>
                <td><strong><?php the_title(); ?></strong></td>
            </tr>
            <tr>
                <td>رقم الإصدار والتحديث</td>
                <td>V<?php echo esc_html($version); ?> (2026 Edition)</td>
            </tr>
            <tr>
                <td>نظام التشغيل المدعوم</td>
                <td><?php echo esc_html($platform); ?></td>
            </tr>
            <tr>
                <td>الشركة المطورة</td>
                <td><?php echo esc_html($developer); ?></td>
            </tr>
            <tr>
                <td>حجم الملف عند التحميل</td>
                <td><?php echo esc_html($size); ?></td>
            </tr>
            <tr>
                <td>نوع الترخيص</td>
                <td><?php echo esc_html($license); ?></td>
            </tr>
        </tbody>
    </table>

    <!-- Download Section with Timer -->
    <div id="downloadSection" class="download-hero-box">
        <h3 style="font-size:22px; font-weight:900; margin-bottom:8px;">
            <i class="fa-solid fa-cloud-arrow-down text-primary"></i> روابط تحميل <?php the_title(); ?>
        </h3>
        <p style="font-size:13px; color:var(--text-muted);">اضغط على السيرفر المناسب لك لبدء التنزيل بأقصى سرعة ممكنة</p>

        <!-- Countdown Timer -->
        <div id="countdownTimerBox" style="margin:20px auto; max-width:400px; background:var(--bg-main); padding:16px; border-radius:14px; border:1px solid var(--border-color);">
            <div style="font-size:12px; color:var(--text-muted);">جاري تجهيز روابط التحميل المباشرة والسريعة...</div>
            <div class="timer-countdown" id="timerCount">10</div>
            <div style="font-size:11px; color:var(--text-light);">يرجى الانتظار ثوانٍ قليلة فقط</div>
        </div>

        <!-- Download Buttons -->
        <div class="download-buttons-grid" id="downloadLinksGrid" style="display:none;">
            <a href="<?php echo esc_url($direct_link); ?>" class="dl-btn direct" target="_blank" rel="nofollow noopener">
                <i class="fa-solid fa-bolt"></i>
                <span>تحميل مباشر من السيرفر السريع</span>
            </a>

            <?php if ($mediafire) : ?>
                <a href="<?php echo esc_url($mediafire); ?>" class="dl-btn mediafire" target="_blank" rel="nofollow noopener">
                    <i class="fa-solid fa-cloud"></i>
                    <span>تحميل عبر MediaFire</span>
                </a>
            <?php endif; ?>

            <?php if ($drive_link) : ?>
                <a href="<?php echo esc_url($drive_link); ?>" class="dl-btn drive" target="_blank" rel="nofollow noopener">
                    <i class="fa-brands fa-google-drive"></i>
                    <span>تحميل عبر Google Drive</span>
                </a>
            <?php endif; ?>

            <?php if ($telegram_dl) : ?>
                <a href="<?php echo esc_url($telegram_dl); ?>" class="dl-btn telegram" target="_blank" rel="nofollow noopener">
                    <i class="fa-brands fa-telegram"></i>
                    <span>تحميل عبر قناة التيليجرام</span>
                </a>
            <?php endif; ?>
        </div>
    </div>

</article>

<?php
endwhile;

get_footer();
`;

  // 7. page.php
  const pagePhp = `<?php
/**
 * The template for displaying static pages
 * TechnoApp WordPress Theme
 */

get_header();

while (have_posts()) : the_post();
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('single-post-container'); ?>>
    <header class="entry-header" style="border-bottom:1px solid var(--border-color); padding-bottom:16px; margin-bottom:24px;">
        <h1 style="font-size:26px; font-weight:900;"><?php the_title(); ?></h1>
    </header>

    <div class="entry-content" style="font-size:15px; line-height:1.8; color:var(--text-main);">
        <?php the_content(); ?>
    </div>
</article>

<?php
endwhile;

get_footer();
`;

  // 8. archive.php
  const archivePhp = `<?php
/**
 * The template for displaying archive pages (Categories, Tags, Authors)
 * TechnoApp WordPress Theme
 */

get_header();
?>

<div class="section-title-bar" style="margin-bottom: 24px; border-bottom:1px solid var(--border-color); padding-bottom:16px;">
    <h1 style="font-size: 24px; font-weight: 900; display:flex; align-items:center; gap:10px;">
        <i class="fa-solid fa-folder-open" style="color:var(--primary);"></i>
        <span><?php the_archive_title(); ?></span>
    </h1>
    <?php the_archive_description('<p style="font-size:13px; color:var(--text-muted); margin-top:6px;">', '</p>'); ?>
</div>

<div class="apps-grid">
    <?php if (have_posts()) : while (have_posts()) : the_post(); 
        $version  = get_post_meta(get_the_ID(), '_app_version', true) ?: '2026';
        $platform = get_post_meta(get_the_ID(), '_app_platform', true) ?: 'Android';
        $rating   = get_post_meta(get_the_ID(), '_app_rating', true) ?: '4.9';
        $size     = get_post_meta(get_the_ID(), '_app_size', true) ?: '45 MB';
    ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('app-card'); ?>>
            <div class="card-header-flex">
                <?php if (has_post_thumbnail()) : ?>
                    <a href="<?php the_permalink(); ?>">
                        <?php the_post_thumbnail('thumbnail', array('class' => 'app-icon-img', 'alt' => get_the_title())); ?>
                    </a>
                <?php else : ?>
                    <div class="app-icon-img" style="background:linear-gradient(135deg,#06b6d4,#3b82f6); display:flex; align-items:center; justify-content:center; color:#090d16; font-size:22px;">
                        <i class="fa-solid fa-cube"></i>
                    </div>
                <?php endif; ?>

                <div>
                    <h3 class="app-card-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <div class="app-meta-tag">
                        <span><i class="fa-solid fa-code-branch"></i> V<?php echo esc_html($version); ?></span> • 
                        <span><?php echo esc_html($platform); ?></span>
                    </div>
                </div>
            </div>

            <p class="app-card-desc">
                <?php echo wp_trim_words(get_the_excerpt(), 14, '...'); ?>
            </p>

            <div class="app-card-footer">
                <span class="app-rating">
                    <i class="fa-solid fa-star"></i> <?php echo esc_html($rating); ?>
                </span>
                <span style="color:var(--text-muted); font-size:11px;">
                    <i class="fa-solid fa-hard-drive"></i> <?php echo esc_html($size); ?>
                </span>
                <a href="<?php the_permalink(); ?>" class="app-download-cta">
                    <i class="fa-solid fa-download"></i> تحميل
                </a>
            </div>
        </article>
    <?php endwhile; else : ?>
        <p style="grid-column: 1/-1; text-align:center; padding: 40px; color:var(--text-muted);">
            لا توجد تطبيقات مضافة في هذا القسم حتى الآن.
        </p>
    <?php endif; ?>
</div>

<div class="pagination-wrapper" style="margin-top: 30px; text-align:center;">
    <?php
    the_posts_pagination(array(
        'mid_size'  => 2,
        'prev_text' => '<i class="fa-solid fa-arrow-right"></i> السابق',
        'next_text' => 'التالي <i class="fa-solid fa-arrow-left"></i>',
    ));
    ?>
</div>

<?php
get_footer();
`;

  // 9. sidebar.php
  const sidebarPhp = `<?php
/**
 * The sidebar containing the main widget area
 * TechnoApp WordPress Theme
 */
?>

<aside id="secondary" class="widget-area sidebar-container">
    
    <!-- 1. Telegram VIP Box -->
    <div class="telegram-card-widget" style="margin-bottom:24px;">
        <i class="fa-brands fa-telegram fa-3x" style="color:#38bdf8;"></i>
        <h3>انضم لقناتنا على التيليجرام</h3>
        <p>احصل على أحدث التطبيقات والبرامج الحصرية والمدفوعة فور نشرها يومياً</p>
        <?php $tg = get_theme_mod('technoapp_telegram_url', '${config.telegramChannelUrl || "https://t.me/example"}'); ?>
        <a class="telegram-card-btn" href="<?php echo esc_url($tg); ?>" target="_blank" style="width:100%; justify-content:center;">
            <i class="fa-solid fa-paper-plane"></i> انضمام مجاناً
        </a>
    </div>

    <!-- 2. Social Follow Widget -->
    <div class="sidebar-widget">
        <h3 class="widget-title"><i class="fa-solid fa-share-nodes"></i> تابعنا على السوشيال ميديا</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <a href="<?php echo esc_url($tg); ?>" target="_blank" style="background:#229ed9; color:#fff; padding:10px; border-radius:10px; font-size:12px; font-weight:bold; display:flex; align-items:center; gap:8px; justify-content:center;">
                <i class="fa-brands fa-telegram fa-lg"></i> تيليجرام
            </a>
            <a href="${config.socialLinks.youtube || "https://youtube.com"}" target="_blank" style="background:#ef4444; color:#fff; padding:10px; border-radius:10px; font-size:12px; font-weight:bold; display:flex; align-items:center; gap:8px; justify-content:center;">
                <i class="fa-brands fa-youtube fa-lg"></i> يوتيوب
            </a>
            <a href="${config.socialLinks.whatsapp || "https://whatsapp.com"}" target="_blank" style="background:#22c55e; color:#fff; padding:10px; border-radius:10px; font-size:12px; font-weight:bold; display:flex; align-items:center; gap:8px; justify-content:center;">
                <i class="fa-brands fa-whatsapp fa-lg"></i> واتساب
            </a>
            <a href="${config.socialLinks.facebook || "https://facebook.com"}" target="_blank" style="background:#1877f2; color:#fff; padding:10px; border-radius:10px; font-size:12px; font-weight:bold; display:flex; align-items:center; gap:8px; justify-content:center;">
                <i class="fa-brands fa-facebook fa-lg"></i> فيسبوك
            </a>
        </div>
    </div>

    <!-- 3. Dynamic Widgets -->
    <?php if (is_active_sidebar('main-sidebar')) : ?>
        <?php dynamic_sidebar('main-sidebar'); ?>
    <?php else : ?>
        <!-- Default Categories Widget -->
        <div class="sidebar-widget">
            <h3 class="widget-title"><i class="fa-solid fa-layer-group"></i> تصنيفات البرامج</h3>
            <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:13px;">
                <?php
                wp_list_categories(array(
                    'title_li'   => '',
                    'show_count' => true,
                    'style'      => 'list',
                ));
                ?>
            </ul>
        </div>
    <?php endif; ?>

</aside>
`;

  // 10. assets/js/main.js
  const mainJs = `/**
 * TechnoApp Pro - WordPress Theme Client Scripts
 * 2026 Edition
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Dark / Light Theme Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('technoapp_theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('technoapp_theme', isLight ? 'light' : 'dark');
            themeBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // 2. Download Countdown Timer
    const timerBox = document.getElementById('countdownTimerBox');
    const timerCountEl = document.getElementById('timerCount');
    const linksGrid = document.getElementById('downloadLinksGrid');

    if (timerBox && timerCountEl && linksGrid) {
        let timeLeft = (typeof technoappSettings !== 'undefined' && technoappSettings.timerDuration) ? parseInt(technoappSettings.timerDuration) : 10;
        timerCountEl.innerText = timeLeft;

        const interval = setInterval(function() {
            timeLeft--;
            timerCountEl.innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(interval);
                timerBox.style.display = 'none';
                linksGrid.style.display = 'grid';
            }
        }, 1000);
    }

});
`;

  // 11. README.txt
  const readmeTxt = `=== TechnoApp Pro - WordPress Theme ===
Contributors: TechnoApp Studio
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
License: GPLv2 or later

== Description ==
قالب ووردبريس تقني احترافي متكامل 100% مخصص لتحميل التطبيقات والبرامج وأدوات الذكاء الاصطناعي مع دعم كامل للغة العربية (RTL)، الوضع الليلي التلقائي، عداد التحميل التنازلي المباشر، وأماكن إعلانات متوافقة مع Google AdSense.

== Installation ==
1. في لوحة تحكم ووردبريس (WP-Admin)، اذهب إلى "المظهر (Appearance) > قوالب (Themes)".
2. اضغط على "أضف جديد (Add New)" ثم "رفع قالب (Upload Theme)".
3. اختر ملف "TechnoApp_Pro_WordPress_Theme_2026.zip" واضغط "التنصيب الآن (Install Now)".
4. اضغط "تفعيل (Activate)".
5. استمتع بقالبك التقني المتميز والسريع!
`;

  return [
    {
      name: 'style.css',
      path: 'style.css',
      description: 'ملف التنسيقات الرئيسي ومعلومات القالب وألوان السمة',
      language: 'css',
      content: styleCss,
    },
    {
      name: 'functions.php',
      path: 'functions.php',
      description: 'دوال القالب، دعم الصور البارزة، القوائم، والمربعات المخصصة لبيانات التطبيقات',
      language: 'php',
      content: functionsPhp,
    },
    {
      name: 'header.php',
      path: 'header.php',
      description: 'رأس الموقع، القوائم العلوية، الشعار، والبحث المباشر',
      language: 'php',
      content: headerPhp,
    },
    {
      name: 'footer.php',
      path: 'footer.php',
      description: 'تذييل الموقع، الحقوق، وروابط السوشيال وقناة التيليجرام',
      language: 'php',
      content: footerPhp,
    },
    {
      name: 'index.php',
      path: 'index.php',
      description: 'الصفحة الرئيسية وعرض شبكة بطاقات التطبيقات والبرامج',
      language: 'php',
      content: indexPhp,
    },
    {
      name: 'single.php',
      path: 'single.php',
      description: 'صفحة تفاصيل التطبيق ومواصفاته الفنية وصندوق التحميل ومؤقت الثواني',
      language: 'php',
      content: singlePhp,
    },
    {
      name: 'page.php',
      path: 'page.php',
      description: 'قالب الصفحات الثابتة (من نحن، سياسة الخصوصية، اتصل بنا)',
      language: 'php',
      content: pagePhp,
    },
    {
      name: 'archive.php',
      path: 'archive.php',
      description: 'صفحة أرشيف وتصنيفات التطبيقات (أندرويد، ويندوز، ذكاء اصطناعي)',
      language: 'php',
      content: archivePhp,
    },
    {
      name: 'sidebar.php',
      path: 'sidebar.php',
      description: 'الشريط الجانبي وصندوق قناة التيليجرام وأزرار المتابعة والتصنيفات',
      language: 'php',
      content: sidebarPhp,
    },
    {
      name: 'assets/js/main.js',
      path: 'assets/js/main.js',
      description: 'سكربتات التفاعل، تبديل الوضع الليلي، والعد التنازلي التلقائي للتحميل',
      language: 'javascript',
      content: mainJs,
    },
    {
      name: 'readme.txt',
      path: 'readme.txt',
      description: 'دليل وتعليمات التثبيت السريع على ووردبريس',
      language: 'text',
      content: readmeTxt,
    },
  ];
}

export async function createWordPressThemeZip(config: ThemeConfig): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder('technoapp-pro-wp');
  const files = generateWordPressThemeFiles(config);

  for (const file of files) {
    folder?.file(file.path, file.content);
  }

  return await zip.generateAsync({ type: 'blob' });
}
