import React from 'react';
import { 
  Eye, BookOpen, Settings, Download, 
  FolderArchive, ShoppingCart, Languages
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

  const tabs: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'preview', label: t('tabPreview', config.language), icon: Eye },
    { id: 'guide', label: t('tabGuide', config.language), icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-xl" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/25 overflow-hidden border border-white/10">
              <img src="/favicon.png" alt="TechnoApp Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-sm sm:text-lg text-white tracking-tight">
                  {t('studioTitle', config.language)}
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] sm:text-[10px] font-black hidden md:inline">
                  {t('studioBadge', config.language)}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block">
                {t('studioSubtitle', config.language)}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
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
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-purple-500 text-white text-[9px] font-black uppercase">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Language, Customize, Download */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language Switcher */}
            {onChangeLanguage && (
              <button
                onClick={() => onChangeLanguage(isEn ? 'ar' : 'en')}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition hover:border-cyan-500/50"
                title={isEn ? "تبديل إلى اللغة العربية" : "Switch to English (Default)"}
              >
                <Languages className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-extrabold text-cyan-300">{isEn ? 'EN' : 'العربية'}</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">{isEn ? '→ AR' : '→ EN'}</span>
              </button>
            )}

            <button
              onClick={onOpenCustomizer}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                isUnlocked 
                  ? 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border-emerald-500/40 shadow-sm' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
              title={isUnlocked ? t('licensed', config.language) : t('availableForBuyers', config.language)}
            >
              <Settings className={`w-3.5 h-3.5 ${isUnlocked ? 'text-emerald-400' : 'text-cyan-400'}`} />
              <span className="hidden md:inline">{t('customizeTheme', config.language)}</span>
              {!isUnlocked && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              )}
            </button>

            {onQuickDownloadWpZip && (
              <button
                onClick={onQuickDownloadWpZip}
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs shadow-lg shadow-blue-950 transition"
                title={t('downloadWpZip', config.language)}
              >
                <FolderArchive className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden xl:inline">{t('downloadWpZip', config.language)}</span>
              </button>
            )}

            <button
              onClick={onQuickDownloadXml}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-950 transition"
              title={t('downloadXml', config.language)}
            >
              {isUnlocked ? (
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
              <span className="hidden sm:inline">{t('downloadXml', config.language)}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};


