import React from 'react';
import { TechAppPost, ThemeConfig } from '../types';
import { THEME_COLORS } from '../utils/themeStyles';
import { t } from '../utils/translations';
import { 
  Download, Star, ShieldCheck, HardDrive 
} from 'lucide-react';

interface Props {
  post: TechAppPost;
  config: ThemeConfig;
  isDark: boolean;
  onSelectPost: (post: TechAppPost) => void;
}

export const BloggerAppCard: React.FC<Props> = ({ post, config, isDark, onSelectPost }) => {
  const isEn = config.language === 'en';
  const activeTheme = THEME_COLORS[config.themeColor] || THEME_COLORS.cyan;

  const displayTitle = isEn ? (post.titleEn || post.title) : post.title;
  const displaySummary = isEn ? (post.summaryEn || post.summary) : post.summary;
  const displayCategory = isEn ? (post.categoryEn || post.category) : post.category;

  return (
    <article 
      onClick={() => onSelectPost(post)}
      className={`group cursor-pointer rounded-2xl border transition-all duration-300 flex flex-col p-4 sm:p-5 relative ${
        isDark 
          ? 'bg-slate-900/90 border-slate-800 hover:bg-slate-900 shadow-lg shadow-black/40' 
          : 'bg-white border-slate-200 hover:shadow-xl'
      } hover:-translate-y-1`}
    >
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span 
          style={{
            backgroundColor: `${activeTheme.hex}18`,
            color: activeTheme.hex,
            borderColor: `${activeTheme.hex}30`,
          }}
          className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border"
        >
          {displayCategory}
        </span>

        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{post.rating}</span>
        </div>
      </div>

      {/* Header: Icon & Title */}
      <div className="flex items-start gap-3.5 mb-3">
        <img 
          src={post.iconUrl} 
          alt={displayTitle} 
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-slate-700/40 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0 bg-slate-800"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-sm sm:text-base leading-snug line-clamp-2 transition-colors ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {displayTitle}
          </h3>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
            <span>{post.developer}</span>
            <span>•</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" /> {t('safe', config.language)}
            </span>
          </div>
        </div>
      </div>

      {/* Short Summary */}
      <p className={`text-xs line-clamp-2 mb-4 leading-relaxed ${
        isDark ? 'text-slate-300' : 'text-slate-600'
      }`}>
        {displaySummary}
      </p>

      {/* Platform & Version Pills */}
      <div className="flex items-center gap-2 flex-wrap mb-4 text-[11px]">
        <span className={`px-2 py-0.5 rounded-md font-mono font-bold ${
          isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
        }`}>
          {post.version}
        </span>
        <span className={`px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold ${
          isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
        }`}>
          <HardDrive className="w-3 h-3" /> {post.size}
        </span>
      </div>

      {/* Card Footer: Download CTA */}
      <div className={`mt-auto pt-3 border-t flex items-center justify-between ${
        isDark ? 'border-slate-800/80' : 'border-slate-100'
      }`}>
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Download className="w-3 h-3" /> {post.downloadsCount}
        </span>

        <button 
          style={{
            backgroundColor: activeTheme.hex,
            boxShadow: `0 4px 14px ${activeTheme.glowHex}`,
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-slate-950 text-xs font-black transition-transform group-hover:scale-105"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{t('downloadPage', config.language)}</span>
        </button>
      </div>

    </article>
  );
};
