export interface CountryCurrencyConfig {
  countryCode: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  currencyCode: string;
  currencySymbolAr: string;
  currencySymbolEn: string;
  ratePerUsd: number; // Parallel Market / Real Cash Rate
  isParallelMarket?: boolean; // e.g. Algeria Square, Egypt parallel, Iraq, Libya
  marketNoteAr?: string;
  marketNoteEn?: string;
  centsEquivalentNoteAr?: (usdAmount: number) => string; // e.g. "120 ألف سنتيم"
  phonePrefix: string;
  defaultPaymentMethod: string;
  timezones: string[];
}

export const COUNTRIES_CONFIG: Record<string, CountryCurrencyConfig> = {
  DZ: {
    countryCode: 'DZ',
    nameAr: 'الجزائر',
    nameEn: 'Algeria',
    flag: '🇩🇿',
    currencyCode: 'DZD',
    currencySymbolAr: 'دج',
    currencySymbolEn: 'DZD',
    ratePerUsd: 240, // سعر السوق الموازي / السكوار (1$ ≈ 240 دج)
    isParallelMarket: true,
    marketNoteAr: 'سعر السوق الموازي (السكوار / بريدي موب)',
    marketNoteEn: 'Parallel Market / BaridiMob Rate',
    centsEquivalentNoteAr: (usdAmount) => {
      const dzd = Math.round(usdAmount * 240);
      const thousands = Math.round(dzd / 10); // في الجزائر 1000 دج = 100 ألف سنتيم (dzd * 100 / 1000 = dzd / 10)
      return `${dzd.toLocaleString('ar-DZ')} دج (${thousands} ألف)`;
    },
    phonePrefix: '+213',
    defaultPaymentMethod: 'baridimob',
    timezones: ['Africa/Algiers'],
  },
  EG: {
    countryCode: 'EG',
    nameAr: 'مصر',
    nameEn: 'Egypt',
    flag: '🇪🇬',
    currencyCode: 'EGP',
    currencySymbolAr: 'ج.م',
    currencySymbolEn: 'EGP',
    ratePerUsd: 50, // سعر السوق الحر والموازي (1$ ≈ 50 ج.م)
    isParallelMarket: true,
    marketNoteAr: 'سعر فودافون كاش وإنستاباي',
    marketNoteEn: 'Vodafone Cash & InstaPay Rate',
    centsEquivalentNoteAr: (usdAmount) => `${Math.round(usdAmount * 50).toLocaleString('ar-EG')} جنيه مصري`,
    phonePrefix: '+20',
    defaultPaymentMethod: 'vodafone',
    timezones: ['Africa/Cairo'],
  },
  SA: {
    countryCode: 'SA',
    nameAr: 'السعودية',
    nameEn: 'Saudi Arabia',
    flag: '🇸🇦',
    currencyCode: 'SAR',
    currencySymbolAr: 'ر.س',
    currencySymbolEn: 'SAR',
    ratePerUsd: 3.75,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${(usdAmount * 3.75).toFixed(1)} ريال سعودي`,
    phonePrefix: '+966',
    defaultPaymentMethod: 'stcpay',
    timezones: ['Asia/Riyadh'],
  },
  AE: {
    countryCode: 'AE',
    nameAr: 'الإمارات',
    nameEn: 'UAE',
    flag: '🇦🇪',
    currencyCode: 'AED',
    currencySymbolAr: 'د.إ',
    currencySymbolEn: 'AED',
    ratePerUsd: 3.67,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${(usdAmount * 3.67).toFixed(1)} درهم إماراتي`,
    phonePrefix: '+971',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Asia/Dubai'],
  },
  MA: {
    countryCode: 'MA',
    nameAr: 'المغرب',
    nameEn: 'Morocco',
    flag: '🇲🇦',
    currencyCode: 'MAD',
    currencySymbolAr: 'د.م',
    currencySymbolEn: 'MAD',
    ratePerUsd: 10.0,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${Math.round(usdAmount * 10)} درهم مغربي`,
    phonePrefix: '+212',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Africa/Casablanca'],
  },
  TN: {
    countryCode: 'TN',
    nameAr: 'تونس',
    nameEn: 'Tunisia',
    flag: '🇹🇳',
    currencyCode: 'TND',
    currencySymbolAr: 'د.ت',
    currencySymbolEn: 'TND',
    ratePerUsd: 3.10,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${(usdAmount * 3.10).toFixed(1)} دينار تونسي`,
    phonePrefix: '+216',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Africa/Tunis'],
  },
  IQ: {
    countryCode: 'IQ',
    nameAr: 'العراق',
    nameEn: 'Iraq',
    flag: '🇮🇶',
    currencyCode: 'IQD',
    currencySymbolAr: 'د.ع',
    currencySymbolEn: 'IQD',
    ratePerUsd: 1500, // سعر السوق الموازي (1$ ≈ 1500 دينار)
    isParallelMarket: true,
    marketNoteAr: 'سعر السوق الموازي وزين كاش',
    marketNoteEn: 'Parallel Market & Zain Cash Rate',
    centsEquivalentNoteAr: (usdAmount) => `${Math.round(usdAmount * 1500).toLocaleString('ar-IQ')} دينار عراقي`,
    phonePrefix: '+964',
    defaultPaymentMethod: 'zaincash',
    timezones: ['Asia/Baghdad'],
  },
  LY: {
    countryCode: 'LY',
    nameAr: 'ليبيا',
    nameEn: 'Libya',
    flag: '🇱🇾',
    currencyCode: 'LYD',
    currencySymbolAr: 'د.ل',
    currencySymbolEn: 'LYD',
    ratePerUsd: 7.20, // سعر السوق الموازي (1$ ≈ 7.2 دينار)
    isParallelMarket: true,
    marketNoteAr: 'سعر السوق الموازي (سداد / تداول)',
    marketNoteEn: 'Parallel Market Rate',
    centsEquivalentNoteAr: (usdAmount) => `${(usdAmount * 7.20).toFixed(1)} دينار ليبي`,
    phonePrefix: '+218',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Africa/Tripoli'],
  },
  JO: {
    countryCode: 'JO',
    nameAr: 'الأردن',
    nameEn: 'Jordan',
    flag: '🇯🇴',
    currencyCode: 'JOD',
    currencySymbolAr: 'د.أ',
    currencySymbolEn: 'JOD',
    ratePerUsd: 0.71,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${(usdAmount * 0.71).toFixed(2)} دينار أردني`,
    phonePrefix: '+962',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Asia/Amman'],
  },
  KW: {
    countryCode: 'KW',
    nameAr: 'الكويت',
    nameEn: 'Kuwait',
    flag: '🇰🇼',
    currencyCode: 'KWD',
    currencySymbolAr: 'د.ك',
    currencySymbolEn: 'KWD',
    ratePerUsd: 0.31,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${(usdAmount * 0.31).toFixed(2)} دينار كويتي`,
    phonePrefix: '+965',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Asia/Kuwait'],
  },
  QA: {
    countryCode: 'QA',
    nameAr: 'قطر',
    nameEn: 'Qatar',
    flag: '🇶🇦',
    currencyCode: 'QAR',
    currencySymbolAr: 'ر.ق',
    currencySymbolEn: 'QAR',
    ratePerUsd: 3.64,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${(usdAmount * 3.64).toFixed(1)} ريال قطري`,
    phonePrefix: '+974',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Asia/Qatar'],
  },
  OM: {
    countryCode: 'OM',
    nameAr: 'سلطنة عمان',
    nameEn: 'Oman',
    flag: '🇴🇲',
    currencyCode: 'OMR',
    currencySymbolAr: 'ر.ع',
    currencySymbolEn: 'OMR',
    ratePerUsd: 0.385,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${(usdAmount * 0.385).toFixed(2)} ريال عماني`,
    phonePrefix: '+968',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Asia/Muscat'],
  },
  PS: {
    countryCode: 'PS',
    nameAr: 'فلسطين',
    nameEn: 'Palestine',
    flag: '🇵🇸',
    currencyCode: 'ILS',
    currencySymbolAr: '₪',
    currencySymbolEn: 'ILS',
    ratePerUsd: 3.65,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${(usdAmount * 3.65).toFixed(1)} شيكل`,
    phonePrefix: '+970',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Asia/Gaza', 'Asia/Hebron', 'Asia/Jerusalem'],
  },
  TR: {
    countryCode: 'TR',
    nameAr: 'تركيا',
    nameEn: 'Turkey',
    flag: '🇹🇷',
    currencyCode: 'TRY',
    currencySymbolAr: '₺',
    currencySymbolEn: 'TRY',
    ratePerUsd: 36.0,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${Math.round(usdAmount * 36)} ليرة تركية`,
    phonePrefix: '+90',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Europe/Istanbul'],
  },
  EU: {
    countryCode: 'EU',
    nameAr: 'أوروبا',
    nameEn: 'Europe',
    flag: '🇪🇺',
    currencyCode: 'EUR',
    currencySymbolAr: '€',
    currencySymbolEn: 'EUR',
    ratePerUsd: 0.95,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `${(usdAmount * 0.95).toFixed(2)} € (Paysera / Wise)`,
    phonePrefix: '+33',
    defaultPaymentMethod: 'bankwire',
    timezones: ['Europe/Paris', 'Europe/Berlin', 'Europe/Rome', 'Europe/Madrid', 'Europe/Brussels', 'Europe/Amsterdam'],
  },
  US: {
    countryCode: 'US',
    nameAr: 'دولي / أمريكا',
    nameEn: 'International / USD',
    flag: '🌍',
    currencyCode: 'USD',
    currencySymbolAr: '$',
    currencySymbolEn: '$',
    ratePerUsd: 1.0,
    isParallelMarket: false,
    centsEquivalentNoteAr: (usdAmount) => `$${usdAmount.toFixed(2)} USD`,
    phonePrefix: '+1',
    defaultPaymentMethod: 'usdt',
    timezones: ['America/New_York', 'America/Los_Angeles', 'America/Chicago', 'UTC'],
  },
};

/**
 * Automatically detects the user's country based on browser timezone and locale,
 * or returns previously stored user choice.
 */
export function detectUserCountry(): CountryCurrencyConfig {
  try {
    const savedCode = localStorage.getItem('technoapp_user_country');
    if (savedCode && COUNTRIES_CONFIG[savedCode]) {
      return COUNTRIES_CONFIG[savedCode];
    }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    
    // Check timezone match
    for (const country of Object.values(COUNTRIES_CONFIG)) {
      if (country.timezones.some(t => t.toLowerCase() === tz.toLowerCase())) {
        return country;
      }
    }

    // Secondary heuristic: timezone continent / city fragments
    if (tz.includes('Algiers')) return COUNTRIES_CONFIG.DZ;
    if (tz.includes('Cairo')) return COUNTRIES_CONFIG.EG;
    if (tz.includes('Riyadh')) return COUNTRIES_CONFIG.SA;
    if (tz.includes('Dubai')) return COUNTRIES_CONFIG.AE;
    if (tz.includes('Casablanca')) return COUNTRIES_CONFIG.MA;
    if (tz.includes('Tunis')) return COUNTRIES_CONFIG.TN;
    if (tz.includes('Baghdad')) return COUNTRIES_CONFIG.IQ;
    if (tz.includes('Tripoli')) return COUNTRIES_CONFIG.LY;
    if (tz.includes('Amman')) return COUNTRIES_CONFIG.JO;
    if (tz.includes('Kuwait')) return COUNTRIES_CONFIG.KW;
    if (tz.includes('Qatar')) return COUNTRIES_CONFIG.QA;
    if (tz.includes('Muscat')) return COUNTRIES_CONFIG.OM;
    if (tz.includes('Gaza') || tz.includes('Hebron') || tz.includes('Jerusalem')) return COUNTRIES_CONFIG.PS;
    if (tz.includes('Istanbul')) return COUNTRIES_CONFIG.TR;
    if (tz.startsWith('Europe/')) return COUNTRIES_CONFIG.EU;

    // Default to Algeria if Arabic locale, otherwise US/International
    const navLang = navigator.language || '';
    if (navLang.startsWith('ar')) {
      return COUNTRIES_CONFIG.DZ;
    }

    return COUNTRIES_CONFIG.US;
  } catch {
    return COUNTRIES_CONFIG.DZ;
  }
}

/**
 * Formats a USD price into local currency formatted string
 */
export function formatLocalPrice(
  usdAmount: number, 
  country: CountryCurrencyConfig, 
  isEn: boolean = false
): {
  amountFormatted: string;
  fullBadge: string;
  compactBadge: string;
  explanation: string;
} {
  const localVal = usdAmount * country.ratePerUsd;

  let amountFormatted = '';
  if (country.countryCode === 'DZ') {
    // Algeria formatting: 1,200 دج (120 ألف)
    const dzd = Math.round(localVal);
    const thousands = Math.round(dzd / 10);
    amountFormatted = isEn 
      ? `${dzd.toLocaleString()} DZD (${thousands}k)` 
      : `${dzd.toLocaleString('ar-DZ')} دج (${thousands} ألف)`;
  } else if (country.countryCode === 'EG') {
    const egp = Math.round(localVal);
    amountFormatted = isEn 
      ? `${egp.toLocaleString()} EGP` 
      : `${egp.toLocaleString('ar-EG')} ج.م`;
  } else if (country.countryCode === 'IQ') {
    const iqd = Math.round(localVal);
    amountFormatted = isEn 
      ? `${iqd.toLocaleString()} IQD` 
      : `${iqd.toLocaleString('ar-IQ')} د.ع`;
  } else if (country.countryCode === 'TR' || country.countryCode === 'MA') {
    const rounded = Math.round(localVal);
    const sym = isEn ? country.currencySymbolEn : country.currencySymbolAr;
    amountFormatted = isEn ? `${rounded} ${sym}` : `${rounded} ${sym}`;
  } else if (country.ratePerUsd < 1) {
    const sym = isEn ? country.currencySymbolEn : country.currencySymbolAr;
    amountFormatted = `${localVal.toFixed(2)} ${sym}`;
  } else {
    const sym = isEn ? country.currencySymbolEn : country.currencySymbolAr;
    amountFormatted = `${localVal.toFixed(1).replace('.0', '')} ${sym}`;
  }

  const compactBadge = `${country.flag} ${amountFormatted}`;
  const fullBadge = `$${usdAmount.toFixed(2)} USD ≈ ${amountFormatted}`;
  const explanation = country.isParallelMarket 
    ? (isEn ? `Real Parallel Rate: $1 ≈ ${country.ratePerUsd} ${country.currencyCode}` : `حسب سعر السوق الموازي: 1$ = ${country.ratePerUsd} ${country.currencySymbolAr}`)
    : (isEn ? `Official Rate: $1 ≈ ${country.ratePerUsd} ${country.currencyCode}` : `السعر الرسمي: 1$ = ${country.ratePerUsd} ${country.currencySymbolAr}`);

  return {
    amountFormatted,
    fullBadge,
    compactBadge,
    explanation,
  };
}
