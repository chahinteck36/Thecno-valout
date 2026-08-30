import React, { useState } from 'react';
import { ThemeConfig, ThemeLanguage } from '../types';
import { THEME_COLORS, THEME_FONTS } from '../utils/themeStyles';
import { t } from '../utils/translations';
import { 
  Palette, Type, Timer, Megaphone, Send, X, Check, Sparkles, 
  Lock, ShieldCheck, ShoppingCart, Image, Link, Globe, 
  Upload, Trash2, Sliders, ExternalLink, MessageCircle, 
  Youtube, Twitter, Facebook, Instagram, Languages
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: ThemeConfig;
  onChangeConfig: (newConfig: ThemeConfig) => void;
  isUnlocked?: boolean;
  onRequestUnlock?: () => void;
}

export const ThemeCustomizerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  isUnlocked = false,
  onRequestUnlock,
}) => {
  if (!isOpen) return null;

  const isEn = config.language === 'en';
  const [activeSubTab, setActiveSubTab] = useState<'branding' | 'styling' | 'links' | 'features'>('branding');
  const colorList = Object.values(THEME_COLORS);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChangeConfig({ ...config, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all"
              style={{ background: THEME_COLORS[config.themeColor]?.gradient || THEME_COLORS.cyan.gradient }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{t('customizeTheme', config.language)}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                  {isEn ? 'Live Preview' : 'معاينة فورية'}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isEn 
                  ? 'Customizations reflect instantly on live preview and exported template files.' 
                  : 'التعديلات تطبق فوراً وبشكل مباشر على المعاينة وأكواد التحميل'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="px-6 pt-3 pb-0 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveSubTab('branding')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-t border-x ${
              activeSubTab === 'branding'
                ? 'bg-slate-900 border-slate-700 text-cyan-400 border-b-2 border-b-cyan-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>{isEn ? 'Branding & Language' : 'الهوية واللوقو واللغة'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('styling')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-t border-x ${
              activeSubTab === 'styling'
                ? 'bg-slate-900 border-slate-700 text-cyan-400 border-b-2 border-b-cyan-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>{isEn ? 'Colors & Fonts' : 'الألوان والخطوط'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('links')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-t border-x ${
              activeSubTab === 'links'
                ? 'bg-slate-900 border-slate-700 text-cyan-400 border-b-2 border-b-cyan-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Link className="w-4 h-4" />
            <span>{isEn ? 'Channels & Socials' : 'الروابط وقنوات التواصل'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('features')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-t border-x ${
              activeSubTab === 'features'
                ? 'bg-slate-900 border-slate-700 text-cyan-400 border-b-2 border-b-cyan-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{isEn ? 'Features & Ads' : 'الخصائص والإعلانات'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-200">
          
          {/* License & Unlock Status Banner */}
          {!isUnlocked ? (
            <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-amber-300">
                    {isEn 
                      ? 'Custom logo, custom branding, and personalized download links are unlocked upon purchase.' 
                      : 'ميزة حفظ وتحميل القالب مع اللوقو والاسم والروابط الخاصة بك متاحة بعد الشراء'}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isEn
                      ? 'You can customize and preview all settings in real-time. Exported files will include all your custom data.'
                      : 'يمكنك تجربة واختيار الهوية والألوان والروابط بالمعاينة الحية الآن، وعند الشراء يتم تصدير ملفات القالب ببياناتك فوراً.'}
                  </div>
                </div>
              </div>
              {onRequestUnlock && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequestUnlock();
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs whitespace-nowrap shadow-md transition flex items-center gap-1.5 flex-shrink-0"
                >
                  <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{isEn ? 'Unlock License (From $4.99)' : 'شراء وتفعيل الترخيص (ابتداءً من $4.99)'}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>
                  {isEn
                    ? 'Official VIP License Active — Custom branding, logo, and links are ready for instant download.'
                    : 'الترخيص الرسمي مفعل (VIP Licensed) — التعديلات واللوقو والروابط مدمجة وجاهزة للتحميل الفوري.'}
                </span>
              </div>
            </div>
          )}

          {/* TAB 1: BRANDING (Language, Logo, Site Name, Description) */}
          {activeSubTab === 'branding' && (
            <div className="space-y-5 animate-fade-in">
              
              {/* Language Switcher Setting */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <Languages className="w-4 h-4 text-cyan-400" />
                    <span>{isEn ? 'Primary Theme Language' : 'لغة القالب الأساسية'}</span>
                  </label>
                  <span className="text-[10px] text-cyan-400 font-bold">
                    {isEn ? 'English (Default / Primary)' : 'العربية (ثانوي)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onChangeConfig({ ...config, language: 'en' })}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      config.language === 'en'
                        ? 'border-cyan-500 bg-cyan-500/10 text-white font-bold'
                        : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇺🇸</span>
                      <div className="text-left">
                        <div className="text-xs font-black">English</div>
                        <div className="text-[10px] text-slate-500">Primary / LTR</div>
                      </div>
                    </div>
                    {config.language === 'en' && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangeConfig({ ...config, language: 'ar' })}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      config.language === 'ar'
                        ? 'border-cyan-500 bg-cyan-500/10 text-white font-bold'
                        : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇸🇦</span>
                      <div className="text-right">
                        <div className="text-xs font-black">العربية</div>
                        <div className="text-[10px] text-slate-500">ثانوي / RTL</div>
                      </div>
                    </div>
                    {config.language === 'ar' && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                </div>
              </div>

              {/* Logo Settings */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-200">
                    <Image className="w-4 h-4 text-cyan-400" />
                    <span>{isEn ? 'Site Logo & Icon' : 'لوقو وشعار الموقع (Site Logo)'}</span>
                  </label>
                  {config.logoUrl && (
                    <button
                      type="button"
                      onClick={() => onChangeConfig({ ...config, logoUrl: undefined })}
                      className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 font-medium transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Remove Logo' : 'إلغاء اللوقو والاعتماد على النص'}</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  {/* Logo Preview Box */}
                  <div className="w-24 h-16 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {config.logoUrl ? (
                      <img 
                        src={config.logoUrl} 
                        alt="Logo Preview" 
                        className="max-w-full max-h-full object-contain p-1"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-center p-2">
                        <span className="text-xs text-slate-500 font-bold block">⚡</span>
                      </div>
                    )}
                  </div>

                  {/* Logo Options */}
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer px-3.5 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Upload Logo Image' : 'رفع صورة لوقو من جهازك'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleLogoUpload}
                          className="hidden" 
                        />
                      </label>
                      <span className="text-[11px] text-slate-500">{isEn ? 'or paste direct image URL:' : 'أو ضع رابط مباشر أدناه'}</span>
                    </div>

                    <input
                      type="url"
                      value={config.logoUrl || ''}
                      onChange={(e) => onChangeConfig({ ...config, logoUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      placeholder="https://example.com/logo.png"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Site Name & Slogan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    {isEn ? 'Site & Blog Name' : 'اسم الموقع والمدونة'}
                  </label>
                  <input
                    type="text"
                    value={config.siteName}
                    onChange={(e) => onChangeConfig({ ...config, siteName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-semibold"
                    placeholder={isEn ? 'TechnoApp Pro' : 'تكنو آب برو'}
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {isEn ? 'Appears in header, footer, and browser title' : 'يظهر في الهيدر والفوتر وعنوان المتصفح'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    {isEn ? 'Site Slogan & Description' : 'وصف وشعار الموقع (Slogan)'}
                  </label>
                  <input
                    type="text"
                    value={config.siteDescription}
                    onChange={(e) => onChangeConfig({ ...config, siteDescription: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                    placeholder={isEn ? 'The Ultimate Apps & Software Hub' : 'منصة تحميل أحدث التطبيقات والبرامج التقنية'}
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {isEn ? 'Appears under logo and for SEO search snippets' : 'يظهر أسفل الشعار وفي محركات البحث (SEO)'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STYLING (Colors & Fonts) */}
          {activeSubTab === 'styling' && (
            <div className="space-y-6 animate-fade-in">
              {/* Color Palette */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Palette className="w-4 h-4 text-cyan-400" />
                    <span>{isEn ? 'Theme Accent Color' : 'لون السمة الرئيسي (Theme Accent Color)'}</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {isEn ? 'Selected:' : 'اللون المحدد:'} <strong className="text-white">{THEME_COLORS[config.themeColor]?.name}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {colorList.map((c) => {
                    const isSelected = config.themeColor === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => onChangeConfig({ ...config, themeColor: c.id })}
                        style={{
                          borderColor: isSelected ? c.hex : undefined,
                          backgroundColor: isSelected ? `${c.hex}18` : undefined,
                        }}
                        className={`flex items-center gap-3 p-3 rounded-2xl border ${isEn ? 'text-left' : 'text-right'} transition-all ${
                          isSelected
                            ? 'border-2 text-white shadow-lg'
                            : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md"
                          style={{ background: c.gradient }}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-black truncate">{c.name.split('(')[0]}</div>
                          <div className="text-[10px] text-slate-400 font-mono" dir="ltr">{c.hex}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font Family Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Type className="w-4 h-4 text-cyan-400" />
                    <span>{isEn ? 'Primary Typography Font' : 'نوع الخط الأساسي (Typography)'}</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {isEn ? 'Active:' : 'الخط النشط:'} <strong className="text-white">{config.fontFamily}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {THEME_FONTS.map((f) => {
                    const isSelected = config.fontFamily === f.id;
                    const activeColor = THEME_COLORS[config.themeColor]?.hex || '#06b6d4';
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => onChangeConfig({ ...config, fontFamily: f.id })}
                        style={{
                          fontFamily: `'${f.id}', system-ui, sans-serif`,
                          borderColor: isSelected ? activeColor : undefined,
                          backgroundColor: isSelected ? `${activeColor}15` : undefined,
                        }}
                        className={`p-3.5 rounded-2xl border ${isEn ? 'text-left' : 'text-right'} transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'border-2 text-white shadow-md'
                            : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-black text-white">{f.name}</div>
                          <div className="text-[11px] text-slate-400 mt-1 font-normal">{f.description}</div>
                        </div>
                        {isSelected && (
                          <span 
                            className="w-5 h-5 rounded-full flex items-center justify-center text-slate-950 flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: activeColor }}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LINKS & SOCIALS (Telegram, WhatsApp, YouTube, Twitter, etc.) */}
          {activeSubTab === 'links' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-4">
                <label className="block text-xs font-bold text-emerald-300 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>{isEn ? 'Seller WhatsApp Phone (For Receiving Orders)' : 'رقم واتساب البائع / المطور (لاستلام طلبات الشراء والأكواد)'}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.whatsappSettings?.sellerPhone || '+213563710494'}
                    onChange={(e) => onChangeConfig({ 
                      ...config, 
                      whatsappSettings: {
                        sellerPhone: e.target.value,
                        sellerName: config.whatsappSettings?.sellerName || 'TechnoApp Theme Official',
                        allowWhatsAppOrder: true
                      }
                    })}
                    className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-white pr-9 focus:outline-none focus:border-emerald-400 font-mono text-xs"
                    placeholder="+213563710494"
                    dir="ltr"
                  />
                  <MessageCircle className={`w-4 h-4 text-emerald-400 absolute ${isEn ? 'right-3' : 'left-3'} top-3`} />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {isEn ? 'Buyers will send WhatsApp checkout messages with their order details to this number.' : 'يقوم المشترون بإرسال تفاصيل طلباتهم وإشعارات الدفع إلى هذا الرقم عبر واتساب.'}
                </span>
              </div>

              <div className="bg-gradient-to-r from-sky-500/10 to-blue-500/10 border border-sky-500/20 rounded-xl p-4">
                <label className="block text-xs font-bold text-sky-300 mb-2 flex items-center gap-2">
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>{isEn ? 'Primary Telegram Channel URL' : 'رابط قناة التيليجرام الأساسية (Telegram Channel)'}</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.telegramChannelUrl}
                    onChange={(e) => onChangeConfig({ 
                      ...config, 
                      telegramChannelUrl: e.target.value,
                      socialLinks: { ...config.socialLinks, telegram: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-sky-500/40 rounded-xl px-3.5 py-2.5 text-white pr-9 focus:outline-none focus:border-sky-400 font-mono text-xs"
                    placeholder="https://t.me/YourChannel"
                    dir="ltr"
                  />
                  <Send className={`w-4 h-4 text-sky-400 absolute ${isEn ? 'right-3' : 'left-3'} top-3`} />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {isEn ? 'Appears in join buttons, top bar, and footer links.' : 'يظهر في أزرار الانضمام بالقالب وفي الشريط العلوي والفوتر.'}
                </span>
              </div>

              {/* Social Media Grid */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{isEn ? 'Social Media & Community Channels' : 'روابط منصات التواصل الاجتماعي للقالب (Social Media Links)'}</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="flex items-center gap-1.5 text-slate-300 mb-1 font-medium">
                      <Youtube className="w-3.5 h-3.5 text-rose-500" />
                      <span>YouTube Channel</span>
                    </label>
                    <input
                      type="text"
                      value={config.socialLinks.youtube || ''}
                      onChange={(e) => onChangeConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, youtube: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      placeholder="https://youtube.com/@Channel"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-slate-300 mb-1 font-medium">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Group/Channel</span>
                    </label>
                    <input
                      type="text"
                      value={config.socialLinks.whatsapp || ''}
                      onChange={(e) => onChangeConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, whatsapp: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      placeholder="https://whatsapp.com/channel/..."
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-slate-300 mb-1 font-medium">
                      <Twitter className="w-3.5 h-3.5 text-sky-400" />
                      <span>Twitter / X</span>
                    </label>
                    <input
                      type="text"
                      value={config.socialLinks.twitter || ''}
                      onChange={(e) => onChangeConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, twitter: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      placeholder="https://twitter.com/username"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-slate-300 mb-1 font-medium">
                      <Facebook className="w-3.5 h-3.5 text-blue-500" />
                      <span>Facebook Page</span>
                    </label>
                    <input
                      type="text"
                      value={config.socialLinks.facebook || ''}
                      onChange={(e) => onChangeConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, facebook: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      placeholder="https://facebook.com/page"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-slate-300 mb-1 font-medium">
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      <span>Instagram</span>
                    </label>
                    <input
                      type="text"
                      value={config.socialLinks.instagram || ''}
                      onChange={(e) => onChangeConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, instagram: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      placeholder="https://instagram.com/username"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-slate-300 mb-1 font-medium">
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      <span>TikTok</span>
                    </label>
                    <input
                      type="text"
                      value={config.socialLinks.tiktok || ''}
                      onChange={(e) => onChangeConfig({
                        ...config,
                        socialLinks: { ...config.socialLinks, tiktok: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                      placeholder="https://tiktok.com/@username"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FEATURES & ADS */}
          {activeSubTab === 'features' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {isEn ? 'Download & Interactive Features' : 'خصائص التحميل والتفاعل'}
                </h3>
                
                {/* Download Timer Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Timer className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="font-semibold text-white">
                        {isEn ? 'Smart Countdown Download Timer' : 'مؤقت التحميل التنازلي الذكي'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {isEn ? 'Display seconds countdown before showing direct download button' : 'إظهار عداد ثوانٍ قبل تفعيل زر التحميل المباشر لزيادة التفاعل'}
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.enableDownloadTimer}
                      onChange={(e) => onChangeConfig({ ...config, enableDownloadTimer: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>

                {config.enableDownloadTimer && (
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                    <span className="text-slate-300">{isEn ? 'Timer duration (seconds):' : 'مدة الانتظار بالثواني:'}</span>
                    <div className="flex items-center gap-2">
                      {[5, 10, 15, 20].map((sec) => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => onChangeConfig({ ...config, timerDuration: sec })}
                          className={`px-3 py-1 rounded-lg font-bold ${
                            config.timerDuration === sec
                              ? 'bg-cyan-500 text-black'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {sec} {isEn ? 's' : 'ثانية'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Breaking Ticker Toggle */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <div>
                      <div className="font-semibold text-white">
                        {isEn ? 'Breaking News & Updates Ticker' : 'شريط الأخبار والتحديثات العاجلة'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {isEn ? 'Display a modern scrolling ticker with latest updates' : 'عرض شريط علوي متحرك بأحدث الإصدارات والتطبيقات'}
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.enableBreakingTicker}
                      onChange={(e) => onChangeConfig({ ...config, enableBreakingTicker: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>

                {/* Ads Slot Toggle */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <Megaphone className="w-5 h-5 text-rose-400" />
                    <div>
                      <div className="font-semibold text-white">
                        {isEn ? 'AdSense & Banner Placements' : 'مساحات الإعلانات (Google AdSense Ready)'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {isEn ? 'Pre-configured responsive ad slots in header, article body, and sidebar' : 'تضمين أماكن إعلانات مدروسة في الهيدر، المقال، والشريط الجانبي'}
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.enableAdPlacements}
                      onChange={(e) => onChangeConfig({ ...config, enableAdPlacements: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-950 transition"
          >
            {isEn ? 'Save & Apply Changes' : 'حفظ وتطبيق التغييرات'}
          </button>
        </div>

      </div>
    </div>
  );
};
