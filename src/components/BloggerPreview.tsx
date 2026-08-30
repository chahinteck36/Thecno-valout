import React, { useState } from 'react';
import { TechAppPost, ThemeConfig, CategoryInfo } from '../types';
import { BloggerNavbar } from './BloggerNavbar';
import { BloggerAppCard } from './BloggerAppCard';
import { BloggerSidebar } from './BloggerSidebar';
import { BloggerPostView } from './BloggerPostView';
import { StaticPageView, StaticPageType } from './StaticPageView';
import { getThemeRootStyle, THEME_COLORS } from '../utils/themeStyles';
import { t } from '../utils/translations';
import { 
  Monitor, Tablet, Smartphone, Zap, 
  Flame, Download
} from 'lucide-react';

interface Props {
  posts: TechAppPost[];
  categories: CategoryInfo[];
  config: ThemeConfig;
  activePost: TechAppPost | null;
  onSelectPost: (post: TechAppPost | null) => void;
  isDark: boolean;
  onToggleDark: () => void;
  deviceMode?: 'desktop' | 'tablet' | 'mobile';
  onChangeDeviceMode?: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  hideInnerToolbar?: boolean;
}

export const BloggerPreview: React.FC<Props> = ({
  posts,
  categories,
  config,
  activePost,
  onSelectPost,
  isDark,
  onToggleDark,
  deviceMode: externalDeviceMode,
  onChangeDeviceMode,
  hideInnerToolbar = false,
}) => {
  const isEn = config.language === 'en';
  const [internalDeviceMode, setInternalDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const deviceMode = externalDeviceMode || internalDeviceMode;
  const setDeviceMode = (mode: 'desktop' | 'tablet' | 'mobile') => {
    if (onChangeDeviceMode) {
      onChangeDeviceMode(mode);
    } else {
      setInternalDeviceMode(mode);
    }
  };

  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [activeStaticPage, setActiveStaticPage] = useState<StaticPageType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeTheme = THEME_COLORS[config.themeColor] || THEME_COLORS.cyan;

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const title = isEn ? (post.titleEn || post.title) : post.title;
    const summary = isEn ? (post.summaryEn || post.summary) : post.summary;
    const matchesCat = !activeCategorySlug || post.categorySlug === activeCategorySlug;
    const matchesSearch = !searchQuery || title.toLowerCase().includes(searchQuery.toLowerCase()) || summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredPosts = posts.filter(p => p.isFeatured);

  const containerWidthClass = {
    desktop: 'w-full',
    tablet: 'max-w-3xl mx-auto shadow-2xl border-x border-slate-800',
    mobile: 'max-w-sm mx-auto shadow-2xl border-x border-slate-800 rounded-3xl overflow-hidden my-4',
  }[deviceMode];

  const handleGoHome = () => {
    setActiveCategorySlug(null);
    setActiveStaticPage(null);
    onSelectPost(null);
    setSearchQuery('');
  };

  const themeStyle = getThemeRootStyle(config);

  return (
    <div className="space-y-4" dir={isEn ? 'ltr' : 'rtl'} style={themeStyle}>
      
      {/* Device Viewport Selector Toolbar (only if not hidden) */}
      {!hideInnerToolbar && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 shadow-md">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400">
              {isEn ? 'Preview Mode:' : 'المعاينة:'}
            </span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setDeviceMode('desktop')}
                style={{
                  backgroundColor: deviceMode === 'desktop' ? activeTheme.hex : undefined,
                  color: deviceMode === 'desktop' ? '#020617' : undefined,
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  deviceMode === 'desktop' ? 'shadow' : 'text-slate-400 hover:text-white'
                }`}
                title={isEn ? 'Desktop View' : 'شاشة كمبيوتر'}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isEn ? 'Desktop' : 'كمبيوتر'}</span>
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                style={{
                  backgroundColor: deviceMode === 'tablet' ? activeTheme.hex : undefined,
                  color: deviceMode === 'tablet' ? '#020617' : undefined,
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  deviceMode === 'tablet' ? 'shadow' : 'text-slate-400 hover:text-white'
                }`}
                title={isEn ? 'Tablet View' : 'جهاز لوحي'}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isEn ? 'Tablet' : 'تابلت'}</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                style={{
                  backgroundColor: deviceMode === 'mobile' ? activeTheme.hex : undefined,
                  color: deviceMode === 'mobile' ? '#020617' : undefined,
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  deviceMode === 'mobile' ? 'shadow' : 'text-slate-400 hover:text-white'
                }`}
                title={isEn ? 'Mobile View' : 'هاتف ذكي'}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isEn ? 'Mobile' : 'هاتف'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={onToggleDark}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-bold border transition text-[11px] sm:text-xs ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-amber-400' 
                  : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            >
              {isDark 
                ? (isEn ? '🌙 Dark' : '🌙 ليلي') 
                : (isEn ? '☀️ Light' : '☀️ نهاري')}
            </button>
          </div>
        </div>
      )}

      {/* Frame Container */}
      <div className={`transition-all duration-300 ${containerWidthClass}`}>
        <div className={`rounded-2xl sm:rounded-3xl overflow-hidden border min-h-[700px] flex flex-col transition-colors duration-300 ${
          isDark ? 'bg-[#0b0f19] border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}>
          
          {/* Blogger Navbar Header */}
          <BloggerNavbar
            config={config}
            isDark={isDark}
            onToggleDark={onToggleDark}
            activeCategory={activeCategorySlug}
            activeStaticPage={activeStaticPage}
            onSelectCategory={(slug) => {
              setActiveCategorySlug(slug);
              setActiveStaticPage(null);
              onSelectPost(null);
            }}
            onSelectStaticPage={(page) => {
              setActiveStaticPage(page);
              onSelectPost(null);
            }}
            onGoHome={handleGoHome}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Breaking News Ticker Bar */}
          {config.enableBreakingTicker && !activePost && !activeStaticPage && (
            <div className={`border-b py-2 px-3 sm:px-6 transition-colors ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 text-xs">
                <span 
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-slate-950 font-black flex items-center gap-1 sm:gap-1.5 flex-shrink-0 text-[10px] sm:text-xs"
                  style={{ background: activeTheme.gradient }}
                >
                  <Zap className="w-3 h-3 fill-current" />
                  <span>{t('exclusiveUpdates', config.language)}:</span>
                </span>
                <span className="truncate text-slate-400 font-medium text-[11px] sm:text-xs">
                  {t('tickerText', config.language)}
                </span>
              </div>
            </div>
          )}

          {/* Main Layout Area */}
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 w-full flex-1">
            
            {/* 1. Static Page View (About, Privacy, Contact, Disclaimer) */}
            {activeStaticPage ? (
              <StaticPageView
                pageType={activeStaticPage}
                config={config}
                isDark={isDark}
                onBackToHome={handleGoHome}
                onSwitchPage={(page) => setActiveStaticPage(page)}
              />
            ) : activePost ? (
              /* 2. Full Post Detail View */
              <BloggerPostView
                post={activePost}
                config={config}
                isDark={isDark}
                onBackToHome={() => onSelectPost(null)}
                onSelectRelatedPost={(p) => onSelectPost(p)}
                allPosts={posts}
              />
            ) : (
              /* 3. Homepage & Category Archive View */
              <div className="space-y-6 sm:space-y-8">
                
                {/* Hero Featured Grid (Only when on home and not searching) */}
                {!activeCategorySlug && !searchQuery && featuredPosts.length > 0 && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 
                        className="text-sm sm:text-lg font-black flex items-center gap-1.5 sm:gap-2"
                        style={{ color: activeTheme.hex }}
                      >
                        <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
                        <span>{t('featuredTitle', config.language)}</span>
                      </h2>
                      <span className="text-[11px] sm:text-xs text-slate-400 font-semibold">
                        {isEn ? '2026 Verified Releases' : 'تحديثات 2026 الحصرية'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {featuredPosts.slice(0, 3).map((app) => {
                        const displayTitle = isEn ? (app.titleEn || app.title) : app.title;
                        const displayCategory = isEn ? (app.categoryEn || app.category) : app.category;
                        return (
                          <div
                            key={app.id}
                            onClick={() => onSelectPost(app)}
                            className="group cursor-pointer rounded-2xl overflow-hidden relative border border-slate-800 bg-slate-900 h-44 sm:h-56 flex flex-col justify-end p-4 sm:p-5 shadow-lg transition-all hover:scale-[1.02]"
                          >
                            <img 
                              src={app.coverImage || app.iconUrl} 
                              alt={displayTitle} 
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-40 group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

                            <div className="relative z-10 space-y-1.5 sm:space-y-2">
                              <span 
                                className="text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-full text-slate-950 inline-block"
                                style={{ backgroundColor: activeTheme.hex }}
                              >
                                {displayCategory}
                              </span>
                              <h3 className="font-black text-xs sm:text-sm text-white line-clamp-2 leading-snug transition-colors">
                                {displayTitle}
                              </h3>
                              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-300 pt-0.5 sm:pt-1">
                                <span>{app.version}</span>
                                <span className="font-bold flex items-center gap-1" style={{ color: activeTheme.hex }}>
                                  <Download className="w-3 h-3" />
                                  <span>{t('downloadFast', config.language)}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Category Filter Pills Bar */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
                  <button
                    onClick={() => setActiveCategorySlug(null)}
                    style={{
                      backgroundColor: activeCategorySlug === null ? activeTheme.hex : undefined,
                      color: activeCategorySlug === null ? '#020617' : undefined,
                    }}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex-shrink-0 ${
                      activeCategorySlug === null
                        ? 'font-black shadow-md'
                        : isDark
                          ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {t('allApps', config.language)} ({posts.length})
                  </button>

                  {categories.map((c) => {
                    const isCurrent = activeCategorySlug === c.slug;
                    const catName = isEn ? (c.nameEn || c.name) : c.name;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setActiveCategorySlug(c.slug)}
                        style={{
                          backgroundColor: isCurrent ? activeTheme.hex : undefined,
                          color: isCurrent ? '#020617' : undefined,
                        }}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition flex-shrink-0 ${
                          isCurrent
                            ? 'font-black shadow-md'
                            : isDark
                              ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {catName} ({c.count})
                      </button>
                    );
                  })}
                </div>

                {/* Main Content Grid with Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  
                  {/* Apps Grid (2 Cols on Desktop) */}
                  <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm sm:text-lg font-black text-white flex items-center gap-2">
                        <span>{t('appsList', config.language)}</span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-normal">
                          {filteredPosts.length} {isEn ? 'apps' : 'منشور'}
                        </span>
                      </h2>
                    </div>

                    {filteredPosts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {filteredPosts.map((post) => (
                          <BloggerAppCard
                            key={post.id}
                            post={post}
                            config={config}
                            isDark={isDark}
                            onSelectPost={(p) => onSelectPost(p)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 sm:py-16 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
                        <div className="text-3xl">🔍</div>
                        <h3 className="font-bold text-white text-base">{t('noResults', config.language)}</h3>
                        <p className="text-xs text-slate-400">{t('tryOtherKeywords', config.language)}</p>
                      </div>
                    )}
                  </div>

                  {/* Sidebar (1 Col on Desktop) */}
                  <div className="space-y-6">
                    <BloggerSidebar
                      isDark={isDark}
                      categories={categories}
                      popularPosts={posts}
                      config={config}
                      onSelectCategory={(slug) => setActiveCategorySlug(slug)}
                      onSelectPost={(p) => onSelectPost(p)}
                    />
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Footer */}
          <footer className={`border-t py-8 px-4 sm:px-6 transition-colors ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
          }`}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className={`space-y-1 text-center ${isEn ? 'sm:text-left' : 'sm:text-right'}`}>
                <p className="font-bold text-slate-200">
                  {t('allRightsReserved', config.language)} © 2026 <span style={{ color: activeTheme.hex }}>{config.siteName.split('|')[0]}</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  {t('footerSub', config.language)}
                </p>
              </div>

              {/* Footer Static Page Links & Social */}
              <div className="flex items-center gap-4 text-xs flex-wrap justify-center">
                <button 
                  onClick={() => { setActiveStaticPage('about'); onSelectPost(null); }}
                  className="hover:text-white transition"
                >
                  {t('aboutUs', config.language)}
                </button>
                <span>•</span>
                <button 
                  onClick={() => { setActiveStaticPage('privacy'); onSelectPost(null); }}
                  className="hover:text-white transition"
                >
                  {t('privacyPolicy', config.language)}
                </button>
                <span>•</span>
                <button 
                  onClick={() => { setActiveStaticPage('contact'); onSelectPost(null); }}
                  className="hover:text-white transition"
                >
                  {t('contactUs', config.language)}
                </button>
                <span>•</span>
                <button 
                  onClick={() => { setActiveStaticPage('disclaimer'); onSelectPost(null); }}
                  className="hover:text-white transition"
                >
                  {t('disclaimer', config.language)}
                </button>
                <span>•</span>
                <a 
                  href={config.telegramChannelUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-bold hover:underline"
                  style={{ color: activeTheme.hex }}
                >
                  {t('telegram', config.language)}
                </a>
              </div>
            </div>
          </footer>

        </div>
      </div>

    </div>
  );
};
