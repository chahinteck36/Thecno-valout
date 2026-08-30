import React, { useState } from 'react';
import { ThemeConfig } from '../types';
import { THEME_COLORS } from '../utils/themeStyles';
import { StaticPageType } from './StaticPageView';
import { t } from '../utils/translations';
import { 
  Moon, Sun, Search, Send, Menu, X, Smartphone, 
  Monitor, Cpu, ShieldCheck, BookOpen, Home, Youtube, 
  Twitter, Facebook, MessageCircle, Instagram, Info, Mail 
} from 'lucide-react';

interface Props {
  config: ThemeConfig;
  isDark: boolean;
  onToggleDark: () => void;
  activeCategory: string | null;
  activeStaticPage?: StaticPageType | null;
  onSelectCategory: (categorySlug: string | null) => void;
  onSelectStaticPage?: (page: StaticPageType | null) => void;
  onGoHome: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const BloggerNavbar: React.FC<Props> = ({
  config,
  isDark,
  onToggleDark,
  activeCategory,
  activeStaticPage,
  onSelectCategory,
  onSelectStaticPage,
  onGoHome,
  searchQuery,
  onSearchChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isEn = config.language === 'en';
  const activeTheme = THEME_COLORS[config.themeColor] || THEME_COLORS.cyan;

  const navItems = [
    { label: t('home', config.language), slug: null, icon: Home },
    { label: t('androidApps', config.language), slug: 'android-apps', icon: Smartphone },
    { label: t('windowsSoftware', config.language), slug: 'windows-software', icon: Monitor },
    { label: t('aiTools', config.language), slug: 'ai-tools', icon: Cpu },
    { label: t('securityTools', config.language), slug: 'security-tools', icon: ShieldCheck },
    { label: t('techTutorials', config.language), slug: 'tutorials', icon: BookOpen },
  ];

  const staticLinks: { type: StaticPageType; label: string; icon: any }[] = [
    { type: 'about', label: t('aboutUs', config.language), icon: Info },
    { type: 'privacy', label: t('privacyPolicy', config.language), icon: ShieldCheck },
    { type: 'contact', label: t('contactUs', config.language), icon: Mail },
  ];

  return (
    <header 
      dir={isEn ? 'ltr' : 'rtl'}
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        isDark ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
      } backdrop-blur-md`}
    >
      
      {/* Top Mini Bar with Socials & Static Pages */}
      <div className={`hidden sm:block border-b py-1.5 px-4 sm:px-6 text-[11px] transition-colors ${
        isDark ? 'bg-slate-950/80 border-slate-800/80 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Top Quick Links */}
          <div className="flex items-center gap-4">
            {staticLinks.map((link) => {
              const isSelected = activeStaticPage === link.type;
              return (
                <button
                  key={link.type}
                  onClick={() => onSelectStaticPage && onSelectStaticPage(link.type)}
                  style={{ color: isSelected ? activeTheme.hex : undefined }}
                  className={`hover:text-white transition font-medium flex items-center gap-1 ${
                    isSelected ? 'font-bold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Top Social Media Quick Icons */}
          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-medium">{isEn ? 'Follow us:' : 'تابعنا:'}</span>
            
            <a
              href={config.socialLinks.telegram || config.telegramChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:text-sky-300 transition"
              title="Telegram"
            >
              <Send className="w-3.5 h-3.5" />
            </a>

            <a
              href={config.socialLinks.youtube || 'https://youtube.com'}
              target="_blank"
              rel="noreferrer"
              className="text-rose-500 hover:text-rose-400 transition"
              title="YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>

            <a
              href={config.socialLinks.whatsapp || 'https://whatsapp.com'}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            <a
              href={config.socialLinks.twitter || 'https://twitter.com'}
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white transition"
              title="X / Twitter"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>

            <a
              href={config.socialLinks.facebook || 'https://facebook.com'}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:text-blue-400 transition"
              title="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>

            <a
              href={config.socialLinks.instagram || 'https://instagram.com'}
              target="_blank"
              rel="noreferrer"
              className="text-pink-400 hover:text-pink-300 transition"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-15 sm:h-20 gap-2 sm:gap-4">
          
          {/* Logo */}
          <div 
            onClick={onGoHome}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-shrink"
          >
            {config.logoUrl ? (
              <div className="h-9 sm:h-12 max-w-[130px] sm:max-w-[200px] flex items-center justify-center flex-shrink-0">
                <img 
                  src={config.logoUrl} 
                  alt={config.siteName} 
                  className="max-h-full max-w-full object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div 
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl text-white flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform flex-shrink-0"
                style={{ background: activeTheme.gradient }}
              >
                <span className="text-lg sm:text-xl">⚡</span>
              </div>
            )}
            
            <div className="min-w-0">
              <div className="font-black text-sm sm:text-xl tracking-tight flex items-center gap-1">
                <span className="truncate">{config.siteName.split('|')[0] || config.siteName}</span>
                <span 
                  className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-bold flex-shrink-0"
                  style={{
                    backgroundColor: `${activeTheme.hex}22`,
                    color: activeTheme.hex,
                  }}
                >
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium hidden sm:block truncate">
                {config.siteDescription || (isEn ? 'Premium Tech Apps & Software Hub' : 'منصة التطبيقات والبرامج التقنية')}
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.slug && !activeStaticPage;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onSelectCategory(item.slug);
                    if (item.slug === null) onGoHome();
                  }}
                  style={{
                    backgroundColor: isActive ? activeTheme.hex : undefined,
                    color: isActive ? '#020617' : undefined,
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'shadow-sm'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Search, Dark Mode, Telegram, Menu */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            
            {/* Search Input on Desktop */}
            <div className="relative hidden md:block w-48 lg:w-60">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t('searchPlaceholder', config.language)}
                style={{
                  borderColor: searchQuery ? activeTheme.hex : undefined,
                }}
                className={`w-full text-xs rounded-xl px-3 py-2 ${isEn ? 'pl-8' : 'pr-8'} border transition focus:outline-none ${
                  isDark 
                    ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
              <Search className={`w-3.5 h-3.5 text-slate-400 absolute ${isEn ? 'left-2.5' : 'right-2.5'} top-2.5`} />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 sm:p-2.5 rounded-xl border md:hidden ${
                isDark ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
              }`}
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleDark}
              className={`p-2 sm:p-2.5 rounded-xl border transition ${
                isDark 
                  ? 'border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700' 
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title={isDark ? (isEn ? 'Switch to Light Mode' : 'التحويل للوضع النهاري') : (isEn ? 'Switch to Dark Mode' : 'التحويل للوضع الليلي')}
              aria-label="Theme mode toggle"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Telegram Channel Button */}
            <a
              href={config.telegramChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition hidden xs:flex items-center justify-center"
              title={t('joinTelegram', config.language)}
              aria-label="Telegram"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 sm:p-2.5 rounded-xl border lg:hidden ${
                isDark ? 'border-slate-700 bg-slate-800 text-white' : 'border-slate-200 bg-slate-100 text-slate-900'
              }`}
              aria-label="Toggle Category Menu"
            >
              {isMobileMenuOpen ? <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {isSearchOpen && (
        <div className="pb-3 px-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('searchPlaceholder', config.language)}
              className={`w-full text-xs rounded-xl px-3 py-2 ${isEn ? 'pl-8' : 'pr-8'} border ${
                isDark 
                  ? 'bg-slate-950 border-slate-700 text-white' 
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
              autoFocus
            />
            <Search className={`w-3.5 h-3.5 text-slate-400 absolute ${isEn ? 'left-2.5' : 'right-2.5'} top-2.5`} />
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={`py-3 px-4 border-t lg:hidden space-y-2 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.slug && !activeStaticPage;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onSelectCategory(item.slug);
                    if (item.slug === null) onGoHome();
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    backgroundColor: isActive ? activeTheme.hex : undefined,
                    color: isActive ? '#020617' : undefined,
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold ${isEn ? 'text-left' : 'text-right'} transition ${
                    isActive
                      ? 'font-black'
                      : isDark
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" style={{ color: isActive ? '#020617' : activeTheme.hex }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Static pages in Mobile Menu */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-xs">
            {staticLinks.map((link) => (
              <button
                key={link.type}
                onClick={() => {
                  if (onSelectStaticPage) onSelectStaticPage(link.type);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  color: activeStaticPage === link.type ? activeTheme.hex : undefined,
                }}
                className={`px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition ${
                  activeStaticPage === link.type ? 'font-bold bg-slate-800' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

