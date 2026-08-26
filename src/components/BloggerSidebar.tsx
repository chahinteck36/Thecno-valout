import React from 'react';
import { TechAppPost, CategoryInfo, ThemeConfig } from '../types';
import { THEME_COLORS } from '../utils/themeStyles';
import { t } from '../utils/translations';
import { 
  Send, Layers, TrendingUp, Download, Star 
} from 'lucide-react';
import { SidebarSlider } from './SidebarSlider';
import { SocialFollowWidget } from './SocialFollowWidget';

interface Props {
  isDark: boolean;
  categories: CategoryInfo[];
  popularPosts: TechAppPost[];
  config: ThemeConfig;
  onSelectCategory: (categorySlug: string) => void;
  onSelectPost: (post: TechAppPost) => void;
}

export const BloggerSidebar: React.FC<Props> = ({
  isDark,
  categories,
  popularPosts,
  config,
  onSelectCategory,
  onSelectPost,
}) => {
  const isEn = config.language === 'en';
  const activeTheme = THEME_COLORS[config.themeColor] || THEME_COLORS.cyan;

  return (
    <aside className="space-y-6">
      
      {/* 1. Interactive Sidebar Slider */}
      <SidebarSlider
        posts={popularPosts}
        config={config}
        isDark={isDark}
        onSelectPost={onSelectPost}
      />

      {/* 2. Social Media Follow Box */}
      <SocialFollowWidget
        config={config}
        isDark={isDark}
      />

      {/* 3. Telegram VIP Channel Widget */}
      <div 
        className="rounded-2xl p-5 text-white shadow-xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.3)',
        }}
      >
        <div className="relative z-10 space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center mx-auto shadow-inner">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg">
              {isEn ? 'Official Telegram Channel' : 'قناتنا الرسمية على تليجرام'}
            </h3>
            <p className="text-xs text-sky-100 mt-1 leading-relaxed">
              {isEn 
                ? 'Get the latest premium app releases and instant updates on your phone' 
                : 'احصل على أحدث التطبيقات والألعاب والبرامج المحدثة يومياً فور نزولها'}
            </p>
          </div>
          <a
            href={config.telegramChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-white text-sky-700 hover:bg-sky-50 font-black rounded-xl text-xs shadow-lg transition-transform hover:scale-102"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isEn ? 'Join 55,000+ Members Free' : 'انضم لأكثر من 55,000 عضو مجاناً'}</span>
          </a>
        </div>
      </div>

      {/* 4. Categories Widget */}
      <div className={`rounded-2xl border p-5 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 
          className="font-black text-sm pb-3 border-b border-slate-800/80 mb-3 flex items-center gap-2"
          style={{ color: activeTheme.hex }}
        >
          <Layers className="w-4 h-4" />
          <span>{t('categories', config.language)}</span>
        </h3>

        <div className="space-y-1">
          {categories.map((cat) => {
            const catName = isEn ? (cat.nameEn || cat.name) : cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition ${
                  isDark 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: activeTheme.hex }} 
                  />
                  <span>{catName}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Most Downloaded Apps Widget */}
      <div className={`rounded-2xl border p-5 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className="font-black text-sm pb-3 border-b border-slate-800/80 mb-4 flex items-center gap-2 text-amber-400">
          <TrendingUp className="w-4 h-4" />
          <span>{t('mostDownloaded', config.language)}</span>
        </h3>

        <div className="space-y-3">
          {popularPosts.slice(0, 4).map((app, idx) => {
            const displayTitle = isEn ? (app.titleEn || app.title) : app.title;
            const displayCategory = isEn ? (app.categoryEn || app.category) : app.category;
            return (
              <div
                key={app.id}
                onClick={() => onSelectPost(app)}
                className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition ${
                  isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={app.iconUrl} 
                    alt={displayTitle} 
                    className="w-11 h-11 rounded-xl object-cover border border-slate-700/50 bg-slate-800" 
                  />
                  <span 
                    className={`absolute -top-1.5 ${isEn ? '-left-1.5' : '-right-1.5'} w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black text-slate-950`}
                    style={{ backgroundColor: idx === 0 ? '#fbbf24' : activeTheme.hex }}
                  >
                    {idx + 1}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-400">
                    {displayTitle}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{displayCategory}</span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{app.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </aside>
  );
};
