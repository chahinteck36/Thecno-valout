import React, { useState, useEffect } from 'react';
import { TechAppPost, ThemeConfig } from '../types';
import { THEME_COLORS } from '../utils/themeStyles';
import { t } from '../utils/translations';
import { 
  ChevronRight, ChevronLeft, Star, Download, Flame, ShieldCheck, ArrowRight 
} from 'lucide-react';

interface Props {
  posts: TechAppPost[];
  config?: ThemeConfig;
  isDark: boolean;
  onSelectPost: (post: TechAppPost) => void;
}

export const SidebarSlider: React.FC<Props> = ({ posts, config, isDark, onSelectPost }) => {
  const isEn = config?.language === 'en';
  const sliderPosts = posts.filter(p => p.isFeatured || p.isTopDownload || p.rating >= 4.7).slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeTheme = config ? (THEME_COLORS[config.themeColor] || THEME_COLORS.cyan) : THEME_COLORS.cyan;

  // Auto-play interval
  useEffect(() => {
    if (sliderPosts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderPosts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [sliderPosts.length]);

  if (sliderPosts.length === 0) return null;

  const currentApp = sliderPosts[currentIndex];
  const displayTitle = isEn ? (currentApp.titleEn || currentApp.title) : currentApp.title;
  const displayCategory = isEn ? (currentApp.categoryEn || currentApp.category) : currentApp.category;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + sliderPosts.length) % sliderPosts.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % sliderPosts.length);
  };

  return (
    <div className={`rounded-2xl border overflow-hidden transition ${
      isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      {/* Header Bar */}
      <div className="p-4 pb-3 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-black text-amber-400">
          <Flame className="w-4 h-4 fill-amber-400" />
          <span>{isEn ? 'Featured Apps (Spotlight)' : 'تطبيقات مختارة (سلايدر مميز)'}</span>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-1 rounded-lg bg-slate-800 hover:text-slate-950 text-slate-300 transition text-xs"
            title={isEn ? 'Previous' : 'السابق'}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded-lg bg-slate-800 hover:text-slate-950 text-slate-300 transition text-xs"
            title={isEn ? 'Next' : 'التالي'}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Slide Body */}
      <div 
        onClick={() => onSelectPost(currentApp)}
        className="p-4 cursor-pointer group space-y-3 relative overflow-hidden"
      >
        {/* Image Banner */}
        <div className="relative h-32 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
          <img 
            src={currentApp.coverImage || currentApp.iconUrl} 
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className={`absolute top-2.5 ${isEn ? 'left-2.5' : 'right-2.5'} flex items-center gap-1.5`}>
            <span 
              className="px-2 py-0.5 rounded-full text-slate-950 font-black text-[10px] shadow"
              style={{ backgroundColor: activeTheme.hex }}
            >
              {displayCategory}
            </span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 left-2.5 flex items-center justify-between text-white">
            <div className="flex items-center gap-1 text-[11px] bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-sm border border-slate-700">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-bold">{currentApp.rating}</span>
            </div>
            <div className="text-[10px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
              {currentApp.version}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {displayTitle}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-1">
            {isEn ? (currentApp.summaryEn || currentApp.summary) : currentApp.summary}
          </p>
        </div>

        {/* CTA Bar */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Download className="w-3 h-3" /> {currentApp.downloadsCount}
          </span>
          <span className="font-bold text-xs flex items-center gap-1 text-cyan-400 group-hover:translate-x-0.5 transition-transform">
            <span>{isEn ? 'Download Now' : 'تحميل التطبيق'}</span>
            <ArrowRight className={`w-3 h-3 ${isEn ? '' : 'rotate-180'}`} />
          </span>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {sliderPosts.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === i 
                  ? 'w-5 bg-cyan-400' 
                  : 'w-1.5 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
