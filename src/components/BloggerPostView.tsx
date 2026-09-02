import React, { useState, useEffect } from 'react';
import { TechAppPost, ThemeConfig } from '../types';
import { THEME_COLORS } from '../utils/themeStyles';
import { t } from '../utils/translations';
import { 
  Download, ShieldCheck, Star, Calendar, Eye, Share2, 
  ArrowRight, HardDrive, User, CheckCircle2, ChevronLeft,
  ExternalLink, Copy, Check, MessageSquare, Clock, Sparkles, Send,
  Smartphone, Monitor, Cpu, Layers
} from 'lucide-react';

interface Props {
  post: TechAppPost;
  config: ThemeConfig;
  isDark: boolean;
  onBackToHome: () => void;
  onSelectRelatedPost: (p: TechAppPost) => void;
  allPosts: TechAppPost[];
}

export const BloggerPostView: React.FC<Props> = ({
  post,
  config,
  isDark,
  onBackToHome,
  onSelectRelatedPost,
  allPosts,
}) => {
  const isEn = config.language === 'en';
  const [timerCount, setTimerCount] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerTargetUrl, setTimerTargetUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const [comments, setComments] = useState<{ id: string; name: string; date: string; text: string }[]>([
    { 
      id: '1', 
      name: isEn ? 'Alex Vance' : 'أحمد التميمي', 
      date: isEn ? '2 hours ago' : 'منذ ساعتين', 
      text: isEn 
        ? 'Great application! Direct high-speed download with no popups or misleading ads. Highly recommended!' 
        : 'تطبيق رائع جداً وسرعة التحميل المباشر ممتازة وخالية من الإعلانات المزعجة، شكراً لكم!' 
    },
    { 
      id: '2', 
      name: isEn ? 'Dev. Liam' : 'م/ سفيان التقني', 
      date: isEn ? '5 hours ago' : 'منذ 5 ساعات', 
      text: isEn 
        ? 'Scanned the package and verified 100% clean and safe. Keep up the high quality work!' 
        : 'تم فحص ملف الـ APK والتأكد من أمانه بنسبة 100%، استمروا في هذا المحتوى القيم.' 
    }
  ]);

  const activeTheme = THEME_COLORS[config.themeColor] || THEME_COLORS.cyan;

  const displayTitle = isEn ? (post.titleEn || post.title) : post.title;
  const displaySummary = isEn ? (post.summaryEn || post.summary) : post.summary;
  const displayCategory = isEn ? (post.categoryEn || post.category) : post.category;
  const displayFeatures = (isEn && post.featuresEn) ? post.featuresEn : post.features;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timerCount !== null && timerCount > 0) {
      interval = setInterval(() => {
        setTimerCount((prev) => (prev !== null ? prev - 1 : 0));
      }, 1000);
    } else if (timerCount === 0 && timerTargetUrl) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerCount, timerTargetUrl]);

  const handleStartDownload = (url: string) => {
    if (config.enableDownloadTimer) {
      setTimerTargetUrl(url);
      setTimerCount(config.timerDuration || 10);
      setIsTimerActive(true);
      
      const timerElem = document.getElementById('downloadHubSection');
      if (timerElem) {
        timerElem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(url, '_blank');
    }
  };

  const handleCopyPostLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      {
        id: `${Date.now()}`,
        name: isEn ? 'Verified Visitor' : 'زائر تقني',
        date: isEn ? 'Just now' : 'الآن',
        text: commentText.trim()
      }
    ]);
    setCommentText('');
  };

  const relatedPosts = allPosts.filter(p => p.id !== post.id && p.categorySlug === post.categorySlug).slice(0, 3);

  return (
    <div className="space-y-8" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Breadcrumbs & Back Button */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBackToHome}
            className="hover:text-white transition font-bold flex items-center gap-1"
          >
            <ArrowRight className={`w-3.5 h-3.5 ${isEn ? 'rotate-180' : ''}`} />
            <span>{t('home', config.language)}</span>
          </button>
          <span>/</span>
          <span className="font-semibold" style={{ color: activeTheme.hex }}>{displayCategory}</span>
          <span>/</span>
          <span className="truncate max-w-[200px] sm:max-w-xs">{displayTitle}</span>
        </div>

        <button
          onClick={handleCopyPostLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition text-[11px]"
        >
          {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
          <span>{copiedLink ? t('copied', config.language) : t('share', config.language)}</span>
        </button>
      </div>

      {/* Post Article Card */}
      <article className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-8 ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        
        {/* Post Title */}
        <h1 className="text-lg sm:text-2xl md:text-3xl font-black leading-snug mb-4">
          {displayTitle}
        </h1>

        {/* Post Meta Data Bar */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 pb-4 sm:pb-6 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" style={{ color: activeTheme.hex }} />
            <span>{t('author', config.language)}: <strong className="text-slate-200">{post.developer}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('lastUpdate', config.language)}: <strong className="text-slate-200">{post.updatedDate}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('views', config.language)}: <strong className="text-slate-200">{post.viewsCount.toLocaleString()}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{t('rating', config.language)}: <strong className="text-slate-200">{post.rating} / 5.0</strong></span>
          </div>
        </div>

        {/* Top In-Article Ad Placement */}
        {config.enableAdPlacements && config.adSettings.inArticleTopCode && (
          <div className={`p-4 rounded-2xl border mb-6 text-center ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-2">
              {t('adSpace', config.language)}
            </span>
            <div dangerouslySetInnerHTML={{ __html: config.adSettings.inArticleTopCode }} />
          </div>
        )}

        {/* Quick App Header Box */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-6 sm:mb-8 ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <img 
            src={post.iconUrl} 
            alt={displayTitle} 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl object-cover shadow-xl border border-slate-700 bg-slate-800 flex-shrink-0"
          />
          <div className={`space-y-2 text-center ${isEn ? 'sm:text-left' : 'sm:text-right'} flex-1`}>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span 
                className="px-3 py-1 rounded-full text-slate-950 text-xs font-black"
                style={{ backgroundColor: activeTheme.hex }}
              >
                {displayCategory}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('verifiedClean', config.language)}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {displaySummary}
            </p>
          </div>
          <button
            onClick={() => handleStartDownload(post.downloadLinks.direct)}
            style={{
              backgroundColor: activeTheme.hex,
              boxShadow: `0 6px 20px ${activeTheme.glowHex}`,
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl text-slate-950 font-black text-sm transition-transform hover:scale-105 flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>{t('directDownloadBtn', config.language)}</span>
          </button>
        </div>

        {/* Article Summary & Details */}
        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
              <span>{isEn ? 'About the Application & Overview' : 'نبذة وتفاصيل البرنامج'}</span>
            </h2>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              {displaySummary} {isEn 
                ? 'Equipped with cutting-edge performance improvements, responsive lightweight architecture, and robust encryption safeguards.' 
                : 'يتميز هذا الإصدار الجديد لعام 2026 بالعديد من التحسينات الجذرية في السرعة والأداء والتوافق التام مع مختلف أنظمة التشغيل، بالإضافة إلى خلوه من أي برمجيات ضارة.'}
            </p>
          </div>

          {/* Key Features List */}
          <div>
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
              <span>{t('features', config.language)}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {displayFeatures.map((feat, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                    isDark ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-semibold">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
              <span>{t('technicalSpecs', config.language)}</span>
            </h2>
            
            <div className="overflow-hidden rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left">
                <tbody>
                  <tr className={`border-b border-slate-800 ${isDark ? 'bg-slate-950/60' : 'bg-slate-50'}`}>
                    <td className={`p-3.5 font-bold text-slate-400 w-1/3 ${isEn ? 'text-left' : 'text-right'}`}>{t('appName', config.language)}</td>
                    <td className={`p-3.5 font-semibold text-white ${isEn ? 'text-left' : 'text-right'}`}>{displayTitle}</td>
                  </tr>
                  <tr className={`border-b border-slate-800 ${isDark ? 'bg-slate-900/60' : 'bg-white'}`}>
                    <td className={`p-3.5 font-bold text-slate-400 ${isEn ? 'text-left' : 'text-right'}`}>{t('developer', config.language)}</td>
                    <td className={`p-3.5 font-semibold text-white ${isEn ? 'text-left' : 'text-right'}`}>{post.developer}</td>
                  </tr>
                  <tr className={`border-b border-slate-800 ${isDark ? 'bg-slate-950/60' : 'bg-slate-50'}`}>
                    <td className={`p-3.5 font-bold text-slate-400 ${isEn ? 'text-left' : 'text-right'}`}>{t('version', config.language)}</td>
                    <td className={`p-3.5 font-mono font-bold text-cyan-400 ${isEn ? 'text-left' : 'text-right'}`}>{post.version}</td>
                  </tr>
                  <tr className={`border-b border-slate-800 ${isDark ? 'bg-slate-900/60' : 'bg-white'}`}>
                    <td className={`p-3.5 font-bold text-slate-400 ${isEn ? 'text-left' : 'text-right'}`}>{t('fileSize', config.language)}</td>
                    <td className={`p-3.5 font-semibold text-white ${isEn ? 'text-left' : 'text-right'}`}>{post.size}</td>
                  </tr>
                  <tr className={`border-b border-slate-800 ${isDark ? 'bg-slate-950/60' : 'bg-slate-50'}`}>
                    <td className={`p-3.5 font-bold text-slate-400 ${isEn ? 'text-left' : 'text-right'}`}>{t('requirements', config.language)}</td>
                    <td className={`p-3.5 font-semibold text-white ${isEn ? 'text-left' : 'text-right'}`}>{post.requirements}</td>
                  </tr>
                  <tr className={isDark ? 'bg-slate-900/60' : 'bg-white'}>
                    <td className={`p-3.5 font-bold text-slate-400 ${isEn ? 'text-left' : 'text-right'}`}>{t('license', config.language)}</td>
                    <td className={`p-3.5 font-semibold text-emerald-400 ${isEn ? 'text-left' : 'text-right'}`}>{t('freeClean', config.language)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pre-Download In-Article Banner */}
          {config.enableAdPlacements && config.adSettings.inArticleBottomCode && (
            <div className={`p-4 rounded-2xl border mb-6 text-center ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-2">
                {t('adSpace', config.language)}
              </span>
              <div dangerouslySetInnerHTML={{ __html: config.adSettings.inArticleBottomCode }} />
            </div>
          )}

          {/* DOWNLOAD HUB BOX (With Timer) */}
          <div id="downloadHubSection" className={`p-6 sm:p-8 rounded-3xl border text-center space-y-6 ${
            isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
          }`}>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-slate-950 shadow-lg" style={{ background: activeTheme.gradient }}>
                <Download className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h2 className="text-xl font-black text-white">
                {t('downloadCenter', config.language)}
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {t('safeServersNote', config.language)}
              </p>
            </div>

            {/* Interactive Timer State */}
            {isTimerActive && timerCount !== null && (
              <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-6 max-w-md mx-auto space-y-4 animate-fade-in shadow-2xl">
                <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-sm">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>{t('preparingLink', config.language)}</span>
                </div>
                <div className="text-4xl font-black text-white font-mono">
                  {timerCount} <span className="text-xs text-slate-400">{t('seconds', config.language)}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t('timerWaitHint', config.language)}
                </p>
              </div>
            )}

            {/* Active Direct Link Button when Timer Finishes or Timer Disabled */}
            {(!isTimerActive || timerCount === 0) && (
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-2 w-full max-w-xl mx-auto">
                <button
                  onClick={() => window.open(post.downloadLinks.direct, '_blank')}
                  style={{
                    backgroundColor: activeTheme.hex,
                    boxShadow: `0 6px 22px ${activeTheme.glowHex}`,
                  }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl text-slate-950 font-black text-sm transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>{t('directDownloadBtn', config.language)} ({post.size})</span>
                </button>

                {post.downloadLinks.mirror1 && (
                  <button
                    onClick={() => handleStartDownload(post.downloadLinks.mirror1!)}
                    className="w-full sm:w-auto px-4 sm:px-5 py-3 rounded-2xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    <span>Mediafire Mirror</span>
                  </button>
                )}

                {post.downloadLinks.mirror2 && (
                  <button
                    onClick={() => handleStartDownload(post.downloadLinks.mirror2!)}
                    className="w-full sm:w-auto px-4 sm:px-5 py-3 rounded-2xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>Google Drive Mirror</span>
                  </button>
                )}

                <a
                  href={config.telegramChannelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 sm:px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('telegramDownload', config.language)}</span>
                </a>
              </div>
            )}
          </div>

        </div>

      </article>

      {/* RELATED POSTS SECTION */}
      {relatedPosts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{t('relatedPosts', config.language)}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((rel) => {
              const relTitle = isEn ? (rel.titleEn || rel.title) : rel.title;
              const relCategory = isEn ? (rel.categoryEn || rel.category) : rel.category;
              return (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelatedPost(rel)}
                  className={`p-4 rounded-2xl border cursor-pointer group transition-all hover:-translate-y-1 ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:bg-slate-850' : 'bg-white border-slate-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img 
                      src={rel.iconUrl} 
                      alt={relTitle} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-slate-800"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-cyan-400">{relCategory}</span>
                      <h3 className="text-xs font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                        {relTitle}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                    <span>{rel.version}</span>
                    <span className="font-bold text-cyan-400">{t('downloadPage', config.language)} →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* COMMENTS SECTION */}
      <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h2 className="text-base font-black flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>{t('comments', config.language)} ({comments.length})</span>
          </h2>
          <span className="text-xs text-slate-400">{t('commentsNote', config.language)}</span>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleAddComment} className="space-y-3">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-500"
            placeholder={isEn ? 'Write your feedback or request an updated version...' : 'أضف تعليقك أو استفسارك حول التطبيق هنا...'}
          />
          <div className="flex items-center justify-end">
            <button
              type="submit"
              style={{ backgroundColor: activeTheme.hex }}
              className="px-5 py-2 rounded-xl text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('postComment', config.language)}</span>
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-3 pt-2">
          {comments.map((comm) => (
            <div 
              key={comm.id}
              className={`p-4 rounded-2xl border space-y-1.5 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                    {comm.name[0]}
                  </div>
                  <strong className="text-white">{comm.name}</strong>
                </div>
                <span className="text-slate-500 text-[11px]">{comm.date}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pr-8">
                {comm.text}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
