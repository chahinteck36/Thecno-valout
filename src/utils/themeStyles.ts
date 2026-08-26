import type { CSSProperties } from 'react';
import { ThemeConfig, ThemeColor, ThemeFont } from '../types';

export interface ThemeColorPalette {
  id: ThemeColor;
  name: string;
  hex: string;
  hoverHex: string;
  glowHex: string;
  badgeBg: string;
  badgeText: string;
  gradient: string;
  bgClass: string;
}

export const THEME_COLORS: Record<ThemeColor, ThemeColorPalette> = {
  cyan: {
    id: 'cyan',
    name: 'أزرق تقني (Cyber Cyan)',
    hex: '#06b6d4',
    hoverHex: '#0891b2',
    glowHex: 'rgba(6, 182, 212, 0.25)',
    badgeBg: 'rgba(6, 182, 212, 0.12)',
    badgeText: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
    bgClass: 'bg-cyan-500',
  },
  emerald: {
    id: 'emerald',
    name: 'أخضر زمردي (Emerald Pro)',
    hex: '#10b981',
    hoverHex: '#059669',
    glowHex: 'rgba(16, 185, 129, 0.25)',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    badgeText: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
    bgClass: 'bg-emerald-500',
  },
  indigo: {
    id: 'indigo',
    name: 'بنفسجي ملكي (Royal Indigo)',
    hex: '#6366f1',
    hoverHex: '#4f46e5',
    glowHex: 'rgba(99, 102, 241, 0.25)',
    badgeBg: 'rgba(99, 102, 241, 0.12)',
    badgeText: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #9333ea 100%)',
    bgClass: 'bg-indigo-500',
  },
  amber: {
    id: 'amber',
    name: 'كهرماني ذهبي (Sunset Amber)',
    hex: '#f59e0b',
    hoverHex: '#d97706',
    glowHex: 'rgba(245, 158, 11, 0.25)',
    badgeBg: 'rgba(245, 158, 11, 0.12)',
    badgeText: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
    bgClass: 'bg-amber-500',
  },
  crimson: {
    id: 'crimson',
    name: 'أحمر نيون (Neon Crimson)',
    hex: '#f43f5e',
    hoverHex: '#e11d48',
    glowHex: 'rgba(244, 63, 94, 0.25)',
    badgeBg: 'rgba(244, 63, 94, 0.12)',
    badgeText: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)',
    bgClass: 'bg-rose-500',
  },
};

export const THEME_FONTS: { id: ThemeFont; name: string; description: string }[] = [
  { id: 'Cairo', name: 'خط كايرو (Cairo)', description: 'الخط العربي الأكثر انتشاراً واحترافية للمواقع التقنية' },
  { id: 'Tajawal', name: 'خط تجوال (Tajawal)', description: 'خط عصري حديث فائق الوضوح ومريح للقراءة' },
  { id: 'IBM Plex Sans Arabic', name: 'خط آي بي إم (IBM Plex)', description: 'خط الشركات التقنية العالمية بتصميم هندسي دقيق' },
  { id: 'Almarai', name: 'خط المراعي (Almarai)', description: 'خط سلس وجميل متناسق مع تطبيقات الموبايل' },
  { id: 'Changa', name: 'خط تشانغا (Changa)', description: 'خط عريض وجريء ممتاز للعناوين والألعاب' },
  { id: 'Alexandria', name: 'خط الإسكندرية (Alexandria)', description: 'تصميم هندسي فخم ومميز للمنصات الحديثة' },
  { id: 'Readex Pro', name: 'خط ريدكس برو (Readex)', description: 'خط مستقبلي تقني أنيق جداً' },
];

export const THEME_FONTS_EN: { id: string; name: string; description: string }[] = [
  { id: 'Inter', name: 'Inter Display', description: 'Clean modern Silicon Valley standard typography' },
  { id: 'Outfit', name: 'Outfit Rounded', description: 'Contemporary tech-focused geometric sans' },
  { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', description: 'High-contrast premium editorial tech font' },
  { id: 'Poppins', name: 'Poppins Pro', description: 'Friendly, balanced, ultra-legible modern font' },
  { id: 'Roboto', name: 'Roboto', description: 'Android & Google standard material typography' },
  { id: 'Space Grotesk', name: 'Space Grotesk', description: 'Futuristic developer & tech aesthetic' },
];

/**
 * Returns dynamic CSS variables and inline styles for any container according to themeConfig
 */
export function getThemeRootStyle(config: ThemeConfig): CSSProperties {
  const color = THEME_COLORS[config.themeColor] || THEME_COLORS.cyan;
  const isEn = config.language === 'en';
  const font = isEn 
    ? (config.fontFamilyEn || 'Inter') 
    : (config.fontFamily || 'Cairo');

  return {
    '--theme-primary': color.hex,
    '--theme-primary-hover': color.hoverHex,
    '--theme-primary-glow': color.glowHex,
    '--theme-badge-bg': color.badgeBg,
    '--theme-badge-text': color.badgeText,
    '--theme-gradient': color.gradient,
    '--theme-font': `'${font}', system-ui, -apple-system, sans-serif`,
    fontFamily: `'${font}', system-ui, -apple-system, sans-serif`,
    direction: isEn ? 'ltr' : 'rtl',
  } as CSSProperties;
}

