import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle, Download, FileCode, Settings, 
  Layers, Megaphone, ShieldCheck, Sparkles, HelpCircle, ArrowLeft,
  FolderArchive, Code, CheckCircle2, Globe, Cpu, Wrench, Eye
} from 'lucide-react';
import { ThemeLanguage } from '../types';

interface Props {
  onGoToPreview?: () => void;
  onDownloadDemoContent?: () => void;
  onDownloadWpZip?: () => void;
  onDownloadXml?: () => void;
  language?: ThemeLanguage;
}

export const InstallGuide: React.FC<Props> = ({ 
  onGoToPreview,
  onDownloadDemoContent,
  onDownloadWpZip,
  onDownloadXml,
  language = 'en'
}) => {
  const isEn = language === 'en';
  const [activePlatform, setActivePlatform] = useState<'wordpress' | 'blogger'>('wordpress');

  const handleDownloadDemo = () => {
    if (onDownloadDemoContent) {
      onDownloadDemoContent();
    } else {
      window.open('/blogger-demo-content.xml', '_blank');
    }
  };

  const handleDownloadThemeXml = () => {
    if (onDownloadXml) {
      onDownloadXml();
    } else if (onGoToPreview) {
      onGoToPreview();
    }
  };

  const bloggerSteps = isEn ? [
    {
      number: '01',
      title: 'Download Theme File (theme.xml)',
      desc: 'Click the "Download Blogger XML" button to install on your blog via: Blogger Dashboard > Theme > Restore > Upload File.',
      icon: Download,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
    },
    {
      number: '02',
      title: 'Import Demo Content & Sample Apps',
      desc: 'Download the demo content XML (blogger-demo-content.xml) and go to Blogger: Settings > Manage Blog > Import Content. Your site will instantly populate with sample apps!',
      icon: Sparkles,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      number: '03',
      title: 'Customize Links & Menus in Layout',
      desc: 'Open the "Layout" tab in Blogger to configure social channels, navigation links, header banners, and sidebar widgets easily with 1-click controls.',
      icon: Settings,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      number: '04',
      title: 'Disable Legacy Mobile Theme',
      desc: 'In Blogger Dashboard > Theme > Mobile settings dropdown > Select "Desktop" mode so the modern responsive design activates seamlessly across mobile and tablet.',
      icon: FileCode,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ] : [
    {
      number: '01',
      title: 'تحميل ملف القالب (theme.xml)',
      desc: 'اضغط على زر "تحميل قالب بلوجر (.xml)" لتركيبه على مدونتك من خلال: لوحة تحكم بلوجر > المظهر > استعادة > رفع الملف.',
      icon: Download,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
    },
    {
      number: '02',
      title: 'استيراد المقالات والتطبيقات التجريبية (مهم جداً)',
      desc: 'حمّل ملف المحتوى التجريبي (blogger-demo-content.xml) ثم اذهب في بلوجر إلى: الإعدادات > إدارة المدونة > استيراد المحتوى. ستظهر كل التطبيقات بمدونتك فوراً!',
      icon: Sparkles,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      number: '03',
      title: 'تخصيص الروابط والقوائم من خانة "التنسيق"',
      desc: 'اذهب إلى قائمة "التنسيق (Layout)" في بلوجر لتعديل روابط السوشيال ميديا، روابط الصفحات الثابتة، القائمة العلوية، والسلايدر الجانبي بضغطة زر.',
      icon: Settings,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      number: '04',
      title: 'إلغاء وضع الجوال القديم (Desktop Mode)',
      desc: 'من لوحة تحكم بلوجر > المظهر > السهم الصغير بجانب تخصيص > إعدادات الجوال > اختر "سطح المكتب" واضغط حفظ ليعمل التصميم المتجاوب الحديث.',
      icon: FileCode,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  const wpSteps = isEn ? [
    {
      number: '01',
      title: 'Download WordPress Theme ZIP',
      desc: 'Click "Download WordPress Package (.zip)" to get the complete, production-ready theme package ready for instant WordPress activation.',
      icon: FolderArchive,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      number: '02',
      title: 'Upload and Activate in WP-Admin',
      desc: 'Log in to WordPress Admin > Appearance > Themes > Add New > Upload Theme > Select the downloaded ZIP file and click Install and Activate.',
      icon: Cpu,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
    },
    {
      number: '03',
      title: 'Publish Apps with Direct Download Mirrors',
      desc: 'When creating any new post, use the custom meta box below the editor to set version number, file size, direct mirrors (Mediafire, Drive, Telegram), and download countdown timers.',
      icon: Sparkles,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      number: '04',
      title: 'Customize Widgets, Menus, & Social Links',
      desc: 'Go to Appearance > Customize to adjust telegram channels and ticker news, and Appearance > Widgets to arrange sidebar sliders and social buttons.',
      icon: Settings,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ] : [
    {
      number: '01',
      title: 'تحميل حزمة القالب (TechnoApp_WP.zip)',
      desc: 'اضغط على زر "تحميل قالب ووردبريس (.zip)" لتحميل ملف القالب المضغوط الجاهز للتنصيب المباشر على منصة ووردبريس.',
      icon: FolderArchive,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      number: '02',
      title: 'رفع وتفعيل القالب في ووردبريس',
      desc: 'ادخل للوحة تحكم ووردبريس (WP-Admin) > المظهر (Appearance) > قوالب (Themes) > أضف جديد (Add New) > رفع قالب (Upload Theme) > اختر ملف ZIP واضغط تنصيب ثم تفعيل.',
      icon: Cpu,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
    },
    {
      number: '03',
      title: 'إضافة ونشر التطبيقات مع روابط التحميل المباشرة',
      desc: 'عند إنشاء أي مقال جديد (مقالات > أضف مقالاً جديداً)، ستجد في أسفل المحرر صندوقاً مخصصاً (معلومات وبيانات التطبيق) لكتابة رقم الإصدار، الحجم، روابط التحميل المباشرة (Mediafire, Drive, Telegram)، ومؤقت الثواني.',
      icon: Sparkles,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      number: '04',
      title: 'تخصيص القوائم والودجات وتيليزام وسوشيال ميديا',
      desc: 'من لوحة تحكم ووردبريس > المظهر > تخصيص (Customize) لضبط رابط قناة التيليجرام وشريط الأخبار، ومن المظهر > ودجات (Widgets) لترتيب الشريط الجانبي والأدوات.',
      icon: Settings,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  const currentSteps = activePlatform === 'wordpress' ? wpSteps : bloggerSteps;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Platform Switcher */}
      <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePlatform('wordpress')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition ${
              activePlatform === 'wordpress'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-950 shadow-lg shadow-blue-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FolderArchive className="w-4 h-4" />
            <span>{isEn ? 'WordPress Installation Guide' : 'دليل تنصيب ووردبريس (WordPress Guide)'}</span>
          </button>

          <button
            onClick={() => setActivePlatform('blogger')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition ${
              activePlatform === 'blogger'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>{isEn ? 'Blogger Installation Guide' : 'دليل تركيب بلوجر (Blogger Guide)'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 px-3">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isEn ? 'Step-by-step setup for all platforms' : 'إرشادات تفصيلية سهلة لجميع المنصات'}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              {activePlatform === 'wordpress' 
                ? (isEn ? 'WordPress Theme Setup & Guide (2026 Edition)' : 'دليل تنصيب وضبط قالب ووردبريس (WordPress 2026 Edition)')
                : (isEn ? 'Blogger XML Template Setup & Demo Import' : 'طريقة تركيب قالب بلوجر واستيراد التطبيقات الجاهزة بضغطة واحدة')}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              {activePlatform === 'wordpress'
                ? (isEn ? 'Lightweight, ultra-fast WordPress theme with native custom fields, download timers, dark mode, and SEO schema.' : 'قالب ووردبريس خفيف وسريع متوافق مع ووردبريس 6.x مع دعم كامل للحقول المخصصة ومؤقت التحميل والوضع الليلي.')
                : (isEn ? 'Install the theme and import ready-made apps to make your blog 100% identical to the live showcase in minutes.' : 'قم بتركيب القالب واستيراد كل التطبيقات والبرامج التجريبية لمدونتك لتبدو مطابقة 100% للمعرض ثم عدّل عليها.')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-slate-800">
          {activePlatform === 'wordpress' ? (
            <>
              {onDownloadWpZip ? (
                <button
                  onClick={onDownloadWpZip}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-blue-950"
                >
                  <FolderArchive className="w-4 h-4" />
                  <span>{isEn ? 'Download WordPress Theme (.zip)' : 'تحميل حزمة ووردبريس كاملة (TechnoApp_WP.zip)'}</span>
                </button>
              ) : null}
              {onGoToPreview ? (
                <button
                  onClick={onGoToPreview}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition border border-slate-700"
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>{isEn ? 'Return to Live Preview' : 'العودة لمعاينة القالب الحية'}</span>
                </button>
              ) : null}
            </>
          ) : (
            <>
              <button
                onClick={handleDownloadDemo}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-amber-950"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isEn ? 'Download Demo Content (XML)' : 'تحميل ملف التطبيقات والمحتوى التجريبي (Demo Content XML)'}</span>
              </button>

              <button
                onClick={handleDownloadThemeXml}
                className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>{isEn ? 'Download Theme Code (theme.xml)' : 'تحميل كود القالب (theme.xml)'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Step by Step Timeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>
            {activePlatform === 'wordpress' 
              ? (isEn ? 'WordPress Quick Setup (2 Minutes)' : 'خطوات التنصيب على ووردبريس (خلال دقيقتين فقط)') 
              : (isEn ? 'Blogger Installation Steps (5 Minutes)' : 'خطوات التركيب على منصة بلوجر (5 دقائق فقط)')}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${step.bgColor} ${step.color} flex items-center justify-center border ${step.borderColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 font-mono">{step.number}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>{isEn ? 'Key Features & Pro Tips' : 'نصائح تقنية ومميزات القالب'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{isEn ? 'Google AdSense Ready' : 'جاهز لإعلانات أدسنس'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn 
                ? 'Optimized ad slots in header, post body, sidebar, and download page to maximize CTR.' 
                : 'أماكن إعلانية مجهزة في الهيدر، بين الفقرات، في الشريط الجانبي، وأعلى أزرار التحميل لزيادة الأرباح.'}
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>{isEn ? '100/100 PageSpeed Score' : 'سرعة فائقة وأكواد نظيفة'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn 
                ? 'Ultra-clean CSS/JS code structure delivering 98+ Google PageSpeed mobile score without heavy plugins.' 
                : 'أكواد CSS مصغرة وخطوط سريعة تمنح موقعك سرعة 98+ على Google PageSpeed بدون أي بطء.'}
            </p>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Megaphone className="w-4 h-4" />
              <span>{isEn ? 'Built-in Download Timer' : 'مؤقت تحميل الثواني المدمج'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn 
                ? 'Interactive countdown counter increases visitor time on page, boosting ad impressions and safety score.' 
                : 'عداد ثواني تفاعلي يزيد من مدة بقاء الزائر داخل المقال مما يرفع تصنيف الموقع في جوجل.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
