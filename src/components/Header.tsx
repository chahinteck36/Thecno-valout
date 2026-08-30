import React, { useState } from 'react';
import { 
  Eye, BookOpen, Settings, Download, 
  FolderArchive, ShoppingCart, Languages, Menu, X
} from 'lucide-react';
import { ThemeConfig, ThemeLanguage } from '../types';
import { t } from '../utils/translations';

export type ActiveTab = 'preview' | 'guide';

interface Props {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenCustomizer: () => void;
  onQuickDownloadXml: () => void;
  onQuickDownloadWpZip?: () => void;
  config: ThemeConfig;
  onChangeLanguage?: (lang: ThemeLanguage) => void;
  isDark: boolean;
  onToggleDark: () => void;
  isUnlocked?: boolean;
}

export const Header: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  onOpenCustomizer,
  onQuickDownloadXml,
  onQuickDownloadWpZip,
  config,
  onChangeLanguage,
  isUnlocked = false,
}) => {
  const isEn = config.language === 'en';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'preview', label: t('tabPreview', config.language), icon: Eye },
    { id: 'guide', label: t('tabGuide', config.language), icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-xl" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Main Header Bar */}
        <div className="flex items-center justify-between h-15 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Title & Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/25 overflow-hidden border border-white/10 flex-shrink-0">
              <img src="/favicon.png" alt="TechnoApp Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-base md:text-lg text-white tracking-tight truncate">
                  {t('studioTitle', config.language)}
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] sm:text-[10px] font-black hidden sm:inline flex-shrink-0">
                  {t('studioBadge', config.language)}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden md:block truncate">
                {t('studioSubtitle', config.language)}
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop & Tablet) */}
          <nav className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-950'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language, Customize, Download */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            
            {/* Language Switcher */}
            {onChangeLanguage && (
              <button
                onClick={() => onChangeLanguage(isEn ? 'ar' : 'en')}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 sm:py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-[11px] sm:text-xs font-bold transition"
                title={isEn ? "تبديل إلى اللغة العربية" : "Switch to English"}
              >
                <Languages className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-extrabold text-cyan-300">{isEn ? 'EN' : 'عربي'}</span>
              </button>
            )}

            {/* Customizer Button (Desktop & Tablet) */}
            <button
              onClick={onOpenCustomizer}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                isUnlocked 
                  ? 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border-emerald-500/40' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
              title={isUnlocked ? t('licensed', config.language) : t('availableForBuyers', config.language)}
            >
              <Settings className={`w-3.5 h-3.5 ${isUnlocked ? 'text-emerald-400' : 'text-cyan-400'}`} />
              <span className="hidden md:inline">{t('customizeTheme', config.language)}</span>
            </button>

            {/* WordPress Download Button (Desktop) */}
            {onQuickDownloadWpZip && (
              <button
                onClick={onQuickDownloadWpZip}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs shadow-md transition"
                title={t('downloadWpZip', config.language)}
              >
                <FolderArchive className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>WP ZIP</span>
              </button>
            )}

            {/* Main Download Button */}
            <button
              onClick={onQuickDownloadXml}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs shadow-md transition"
              title={t('downloadXml', config.language)}
            >
              {isUnlocked ? (
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
              <span className="text-[11px] sm:text-xs">{isUnlocked ? (isEn ? 'Download' : 'تحميل') : (isEn ? 'Get Theme' : 'شراء القالب')}</span>
            </button>

            {/* Mobile Actions Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 sm:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation & Actions Sub-bar */}
        <div className="sm:hidden pb-2.5 pt-1 border-t border-slate-800/60 flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1 flex-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-bold transition ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : 'text-slate-300 bg-slate-900 border border-slate-800'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 text-[11px] font-bold"
          >
            <Settings className="w-3 h-3" />
            <span>{isEn ? 'Customize' : 'تخصيص'}</span>
          </button>
        </div>

        {/* Mobile Expanded Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-3 px-1 border-t border-slate-800 space-y-2 animate-fade-in text-xs">
            {onQuickDownloadWpZip && (
              <button
                onClick={() => {
                  onQuickDownloadWpZip();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold"
              >
                <div className="flex items-center gap-2">
                  <FolderArchive className="w-4 h-4" />
                  <span>{t('downloadWpZip', config.language)}</span>
                </div>
                <span className="text-[10px] bg-blue-500 text-slate-950 px-2 py-0.5 rounded-full font-black">.ZIP</span>
              </button>
            )}

            <button
              onClick={() => {
                onQuickDownloadXml();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>{t('downloadXml', config.language)}</span>
              </div>
              <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-black">.XML</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};


