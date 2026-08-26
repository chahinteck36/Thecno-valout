import React from 'react';
import { ThemeConfig } from '../types';
import { 
  Send, Youtube, Twitter, Facebook, MessageCircle, 
  Instagram, Share2 
} from 'lucide-react';
import { t } from '../utils/translations';

interface Props {
  config: ThemeConfig;
  isDark: boolean;
}

export const SocialFollowWidget: React.FC<Props> = ({ config, isDark }) => {
  const isEn = config.language === 'en';
  
  const socials = [
    {
      name: isEn ? 'Telegram' : 'تيليجرام (Telegram)',
      url: config.socialLinks.telegram || config.telegramChannelUrl,
      count: isEn ? '55K+ Subs' : '55,000+ مشترك',
      icon: Send,
      color: 'bg-[#229ED9]',
      hoverColor: 'hover:bg-[#1e8bc0]',
      textColor: 'text-white',
      badge: isEn ? 'VIP Channel' : 'قناة البرامج',
    },
    {
      name: isEn ? 'YouTube' : 'يوتيوب (YouTube)',
      url: config.socialLinks.youtube || 'https://youtube.com',
      count: isEn ? '32K+ Subs' : '32,000+ متابع',
      icon: Youtube,
      color: 'bg-[#FF0000]',
      hoverColor: 'hover:bg-[#d90000]',
      textColor: 'text-white',
      badge: isEn ? 'Videos' : 'شروحات بالفيديو',
    },
    {
      name: isEn ? 'WhatsApp' : 'واتساب (WhatsApp)',
      url: config.socialLinks.whatsapp || 'https://whatsapp.com',
      count: isEn ? 'Active Community' : 'مجتمع نشط',
      icon: MessageCircle,
      color: 'bg-[#25D366]',
      hoverColor: 'hover:bg-[#20ba5a]',
      textColor: 'text-slate-950',
      badge: isEn ? 'Group' : 'جروب التحديثات',
    },
    {
      name: isEn ? 'X / Twitter' : 'تويتر / إكس (X / Twitter)',
      url: config.socialLinks.twitter || 'https://twitter.com',
      count: isEn ? '18K+ Followers' : '18,500+ متابع',
      icon: Twitter,
      color: 'bg-[#0f1419] border border-slate-700',
      hoverColor: 'hover:bg-slate-800',
      textColor: 'text-white',
      badge: isEn ? 'Tech News' : 'أخبار تقنية',
    },
    {
      name: isEn ? 'Facebook' : 'فيسبوك (Facebook)',
      url: config.socialLinks.facebook || 'https://facebook.com',
      count: isEn ? '40K+ Fans' : '40,000+ معجب',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#166fe5]',
      textColor: 'text-white',
      badge: isEn ? 'Official' : 'الصفحة الرسمية',
    },
    {
      name: isEn ? 'Instagram' : 'إنستغرام (Instagram)',
      url: config.socialLinks.instagram || 'https://instagram.com',
      count: isEn ? '25K+ Followers' : '25,000+ متابع',
      icon: Instagram,
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      hoverColor: 'opacity-90',
      textColor: 'text-white',
      badge: isEn ? 'Reels' : 'ريلز وكواليس',
    },
  ];

  return (
    <div className={`rounded-2xl border p-5 ${
      isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <h3 className="font-black text-sm flex items-center gap-2 text-cyan-400">
          <Share2 className="w-4 h-4" />
          <span>{isEn ? 'Follow Our Channels' : 'تابعنا على السوشيال ميديا'}</span>
        </h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
          {isEn ? 'Community' : 'مجتمعنا التقني'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {socials.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2.5 p-2.5 rounded-xl ${item.color} ${item.hoverColor} ${item.textColor} transition transform hover:scale-[1.02] shadow-sm`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-black leading-tight truncate">{item.name}</div>
                <div className="text-[9px] opacity-80 truncate">{item.count}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
