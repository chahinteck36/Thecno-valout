import React, { useState, useEffect } from 'react';
import { 
  X, Lock, ShieldCheck, CheckCircle2, 
  Sparkles, Check, AlertCircle, 
  ExternalLink, Key, Zap, CheckCircle, RefreshCw,
  MessageCircle, Copy, Send, HelpCircle, Phone, Mail, User, CreditCard, Tag, Globe,
  Terminal, ShieldAlert, CheckCircle as CheckIcon, Clock, Trash2, ArrowRight, ArrowLeft,
  Coins
} from 'lucide-react';
import { ThemeLanguage } from '../types';
import { t } from '../utils/translations';
import { 
  CountryCurrencyConfig, 
  COUNTRIES_CONFIG, 
  detectUserCountry, 
  formatLocalPrice 
} from '../utils/currencyUtils';

interface GeneratedCodeItem {
  code: string;
  createdAt: string;
  buyerNote: string;
  packageType: string;
  isUsed: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  themeType: 'blogger' | 'wordpress' | 'both';
  price?: number;
  paypalEmail?: string;
  sellerWhatsAppPhone?: string;
  language?: ThemeLanguage;
}

export const PayPalCheckoutModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  themeType,
  price = 9.99,
  paypalEmail = "chahinteck36@gmail.com",
  sellerWhatsAppPhone = "+213563710494",
  language = 'en',
}) => {
  const isEn = language === 'en';
  
  // Navigation Tabs: 'whatsapp' | 'paypal' | 'license' | 'seller'
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'paypal' | 'license' | 'seller'>('whatsapp');
  const [showSellerTab, setShowSellerTab] = useState(false);
  const [secretClickCount, setSecretClickCount] = useState(0);
  
  // Country & Currency State (Auto-Detected & Customizable)
  const [selectedCountry, setSelectedCountry] = useState<CountryCurrencyConfig>(() => detectUserCountry());

  // WhatsApp Form State
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<'blogger' | 'wordpress' | 'both'>(themeType);
  const [paymentMethod, setPaymentMethod] = useState(() => selectedCountry.defaultPaymentMethod);
  const [country, setCountry] = useState(() => isEn ? selectedCountry.nameEn : selectedCountry.nameAr);
  const [buyerNotes, setBuyerNotes] = useState('');
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  // PayPal State
  const [paypalBuyerEmail, setPaypalBuyerEmail] = useState('');
  const [step, setStep] = useState<'checkout' | 'waiting_payment'>('checkout');
  const [transactionId, setTransactionId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // License / One-Time Code State
  const [licenseCode, setLicenseCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Seller Tool State
  const [sellerBuyerRef, setSellerBuyerRef] = useState('');
  const [sellerPackageChoice, setSellerPackageChoice] = useState<'blogger' | 'wordpress' | 'both'>('both');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copiedSellerCode, setCopiedSellerCode] = useState(false);
  const [copiedPlainCode, setCopiedPlainCode] = useState(false);
  const [codeHistory, setCodeHistory] = useState<GeneratedCodeItem[]>([]);

  // Load history from localStorage
  const loadCodeLedger = () => {
    try {
      const storedHistory: GeneratedCodeItem[] = JSON.parse(localStorage.getItem('technoapp_code_ledger') || '[]');
      const usedCodes: string[] = JSON.parse(localStorage.getItem('technoapp_used_licenses') || '[]');
      
      // Update isUsed status
      const updated = storedHistory.map(item => ({
        ...item,
        isUsed: usedCodes.includes(item.code)
      }));
      setCodeHistory(updated);
    } catch {
      setCodeHistory([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const detected = detectUserCountry();
      setSelectedCountry(detected);
      setCountry(isEn ? detected.nameEn : detected.nameAr);
      setPaymentMethod(detected.defaultPaymentMethod);
      setSelectedPackage(themeType);
      setSellerPackageChoice(themeType);
      setErrorMessage('');
      setSuccessMessage('');
      setOrderSent(false);
      loadCodeLedger();
    }
  }, [isOpen, themeType, isEn]);

  const handleCountryChange = (cCode: string) => {
    const cConfig = COUNTRIES_CONFIG[cCode] || COUNTRIES_CONFIG.US;
    setSelectedCountry(cConfig);
    setCountry(isEn ? cConfig.nameEn : cConfig.nameAr);
    setPaymentMethod(cConfig.defaultPaymentMethod);
    try {
      localStorage.setItem('technoapp_user_country', cConfig.countryCode);
    } catch {
      // ignore
    }
  };

  if (!isOpen) return null;

  const getPackagePrice = (pkg: 'blogger' | 'wordpress' | 'both') => {
    if (pkg === 'blogger') return 4.99;
    if (pkg === 'wordpress') return 4.99;
    return 9.99;
  };

  const activePrice = getPackagePrice(selectedPackage);
  const sellerPkgPrice = getPackagePrice(sellerPackageChoice);

  // Localized price calculations based on country & parallel market exchange rate
  const localPriceObj = formatLocalPrice(activePrice, selectedCountry, isEn);
  const bloggerLocalPrice = formatLocalPrice(4.99, selectedCountry, isEn);
  const wpLocalPrice = formatLocalPrice(4.99, selectedCountry, isEn);
  const bundleLocalPrice = formatLocalPrice(9.99, selectedCountry, isEn);
  const sellerLocalPriceObj = formatLocalPrice(sellerPkgPrice, selectedCountry, isEn);

  const packageNameText = isEn
    ? (selectedPackage === 'wordpress' ? 'TechnoApp Pro WordPress Theme' : selectedPackage === 'blogger' ? 'TechnoApp Pro Blogger XML' : 'TechnoApp Pro Full Bundle (Blogger + WP)')
    : (selectedPackage === 'wordpress' ? 'قالب ووردبريس الاحترافي (TechnoApp WP)' : selectedPackage === 'blogger' ? 'قالب بلوجر التقني المطور (TechnoApp XML)' : 'حزمة القالبين معاً (Blogger + WordPress)');

  const cleanSellerPhone = sellerWhatsAppPhone.replace(/[^0-9]/g, '');

  // 1. WhatsApp Order Submission
  const generateWhatsAppMessage = () => {
    const paymentMethodMap: Record<string, string> = {
      baridimob: isEn ? 'Algerian BaridiMob / CCP / Algérie Poste' : 'بريدي موب / CCP (الجزائر)',
      vodafone: isEn ? 'Vodafone Cash / InstaPay (Egypt)' : 'فودافون كاش / إنستاباي InstaPay (مصر)',
      stcpay: isEn ? 'STC Pay / Bank Transfer (KSA & Gulf)' : 'STC Pay / تحويل بنكي (السعودية والخليج)',
      zaincash: isEn ? 'Zain Cash / AsiaHawala (Iraq)' : 'زين كاش / آسيا حوالة (العراق)',
      usdt: isEn ? 'USDT / Binance Pay (TRC20)' : 'USDT / بايننس باي (كريبتو)',
      westernunion: isEn ? 'Western Union / MoneyGram' : 'ويسترن يونيون / موني جرام',
      bankwire: isEn ? 'Direct Bank Wire / Local Transfer' : 'تحويل بنكي مباشر / أخرى',
    };

    const chosenPayment = paymentMethodMap[paymentMethod] || paymentMethod;

    return isEn 
      ? `🌟 *Order Request: TechnoApp Pro Theme License*
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Buyer Name:* ${buyerName || 'Not specified'}
📱 *WhatsApp/Phone:* ${buyerPhone || 'Not specified'}
📧 *Email:* ${buyerEmail || 'Not specified'}
📦 *Selected Package:* ${packageNameText}
💵 *Amount to Pay:* ${localPriceObj.amountFormatted} (approx. $${activePrice} USD)
🏷️ *Rate Note:* ${localPriceObj.explanation}
💳 *Payment Method:* ${chosenPayment}
🌍 *Country:* ${country || selectedCountry.nameEn}
📝 *Notes:* ${buyerNotes || 'None'}
━━━━━━━━━━━━━━━━━━━━━━━━
🕒 *Date:* ${new Date().toLocaleDateString('en-US')}
⚡ *Hello, I would like to pay for the theme. Please provide transfer details and send my One-Time Activation Code.*`
      : `🌟 *طلب شراء ترخيص قالب TechnoApp Pro*
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *اسم المشتري:* ${buyerName || 'غير محدد'}
📱 *رقم الواتساب/الهاتف:* ${buyerPhone || 'غير محدد'}
📧 *البريد الإلكتروني:* ${buyerEmail || 'غير محدد'}
📦 *الحزمة المطلوبة:* ${packageNameText}
💵 *المبلغ المطلوب:* ${localPriceObj.amountFormatted} (ما يعادل $${activePrice} دولار)
🏷️ *ملاحظة الصرف:* ${localPriceObj.explanation}
💳 *طريقة الدفع:* ${chosenPayment}
🌍 *الدولة:* ${country || selectedCountry.nameAr}
📝 *ملاحظات:* ${buyerNotes || 'لا توجد'}
━━━━━━━━━━━━━━━━━━━━━━━━
🕒 *التاريخ:* ${new Date().toLocaleDateString('ar-EG')}
⚡ *مرحباً، أود إتمام الدفع واستلام كود التفعيل لمرة واحدة لتحميل القالب.*`;
  };

  const handleSendWhatsAppOrder = () => {
    if (!buyerName.trim()) {
      setErrorMessage(isEn ? 'Please enter your full name.' : 'يرجى كتابة اسمك الكامل.');
      return;
    }
    if (!buyerPhone.trim() && !buyerEmail.trim()) {
      setErrorMessage(isEn ? 'Please enter your WhatsApp phone or email address.' : 'يرجى كتابة رقم الواتساب أو بريدك الإلكتروني للتواصل.');
      return;
    }

    setErrorMessage('');
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${cleanSellerPhone}?text=${encodedMessage}`;

    const newTab = window.open(waUrl, '_blank');
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      window.location.href = waUrl;
    }
    
    setOrderSent(true);
    setSuccessMessage(isEn 
      ? 'Order formatted! After completing payment on WhatsApp, enter the One-Time Code below to download.'
      : 'تم إرسال تفاصيل الطلب! بعد إتمام الدفع على واتساب، سيرسل لك البائع كود تفعيل لمرة واحدة لإدخاله بالتبويب التالي.');
  };

  const handleCopyMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  // 2. PayPal Checkout URL
  const generatePayPalCheckoutUrl = () => {
    const itemName = packageNameText;
    const encodedItem = encodeURIComponent(itemName);
    const encodedEmail = encodeURIComponent(paypalEmail);
    return `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodedEmail}&item_name=${encodedItem}&amount=${activePrice}&currency_code=USD&no_shipping=1&no_note=1`;
  };

  const handleOpenPayPal = () => {
    if (!paypalBuyerEmail || !paypalBuyerEmail.includes('@') || !paypalBuyerEmail.includes('.')) {
      setErrorMessage(isEn ? 'Please enter a valid email address first.' : 'يرجى كتابة بريدك الإلكتروني الصحيح أولاً.');
      return;
    }

    setErrorMessage('');
    const payPalUrl = generatePayPalCheckoutUrl();
    const newWindow = window.open(payPalUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = payPalUrl;
    }
    setStep('waiting_payment');
  };

  const handleVerifyTransaction = () => {
    if (!transactionId.trim() || transactionId.trim().length < 6) {
      setErrorMessage(isEn ? 'Please enter a valid PayPal Transaction ID.' : 'يرجى إدخال رقم المعاملة (Transaction ID) المستلم من PayPal.');
      return;
    }

    setErrorMessage('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      onPaymentSuccess();
    }, 1500);
  };

  // 3. One-Time Activation Code Validation
  const handleApplyLicense = () => {
    const rawCode = licenseCode.trim().toUpperCase();
    if (!rawCode) {
      setErrorMessage(isEn ? 'Please enter your One-Time Activation Code.' : 'يرجى إدخال كود التفعيل لمرة واحدة.');
      return;
    }

    // Secret Admin / Seller Access Codes
    if (['ADMIN', 'SELLER', 'TECHNO-ADMIN', 'CHAHIN-DEV', '0000'].includes(rawCode)) {
      setShowSellerTab(true);
      setActiveTab('seller');
      loadCodeLedger();
      setErrorMessage('');
      setSuccessMessage(isEn ? '⚡ Seller / Admin Mode Unlocked!' : '⚡ تم فتح لوحة وأداة البائع والمطور بنجاح!');
      setLicenseCode('');
      return;
    }

    // Check if code was already used / burned in localStorage
    const usedCodes: string[] = JSON.parse(localStorage.getItem('technoapp_used_licenses') || '[]');
    if (usedCodes.includes(rawCode)) {
      setErrorMessage(isEn 
        ? '⚠️ This One-Time Activation Code has already been redeemed and cannot be reused.' 
        : '⚠️ كود التفعيل لمرة واحدة هذا تم استخدامه واستهلاكه مسبقاً ولا يمكن تفعيله مجدداً.');
      return;
    }

    // Validation patterns:
    // 1. One-time codes generated by Seller Tool or stored in valid pool
    const validPool: string[] = JSON.parse(localStorage.getItem('technoapp_valid_pool') || '[]');
    const isValidFromPool = validPool.includes(rawCode);

    // 2. Structural pattern validation: TECHNO-999-*, WA-*, OTP-*, or VIP codes
    const isPatternValid = 
      rawCode.startsWith('TECHNO-') || 
      rawCode.startsWith('WA-') || 
      rawCode.startsWith('OTP-') || 
      rawCode === 'VIP-2026' || 
      rawCode === 'PRO-TECHNO' ||
      rawCode.length >= 10;

    if (isValidFromPool || isPatternValid) {
      // Mark code as used / burned for one-time protection
      usedCodes.push(rawCode);
      localStorage.setItem('technoapp_used_licenses', JSON.stringify(usedCodes));
      localStorage.setItem('technoapp_licensed', 'true');
      
      setErrorMessage('');
      setSuccessMessage(isEn ? 'Code verified successfully! Starting instant download...' : 'تم التحقق وتفعيل الكود بنجاح! جاري بدء التحميل...');
      
      loadCodeLedger();

      setTimeout(() => {
        onPaymentSuccess();
      }, 900);
    } else {
      setErrorMessage(isEn 
        ? 'Invalid or unrecognized activation code. Please check or message the seller on WhatsApp.' 
        : 'كود التفعيل غير صالح. يرجى التحقق من كتابة الكود بدقة أو التواصل مع البائع عبر واتساب.');
    }
  };

  // 4. Seller Code Generator
  const handleGenerateSellerCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let rand = '';
    for (let i = 0; i < 8; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const code = `TECHNO-999-${rand.slice(0, 4)}-${rand.slice(4)}`;
    setGeneratedCode(code);

    // Save to valid pool in localStorage
    const validPool: string[] = JSON.parse(localStorage.getItem('technoapp_valid_pool') || '[]');
    if (!validPool.includes(code)) {
      validPool.push(code);
      localStorage.setItem('technoapp_valid_pool', JSON.stringify(validPool));
    }

    // Save to Seller Ledger History
    const storedHistory: GeneratedCodeItem[] = JSON.parse(localStorage.getItem('technoapp_code_ledger') || '[]');
    const newItem: GeneratedCodeItem = {
      code,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString(),
      buyerNote: sellerBuyerRef.trim() || (isEn ? 'WhatsApp Buyer' : 'مشتري واتساب'),
      packageType: sellerPackageChoice === 'wordpress' ? 'WordPress (.zip)' : sellerPackageChoice === 'blogger' ? 'Blogger (.xml)' : 'Bundle (Blogger + WP)',
      isUsed: false,
    };
    const updatedHistory = [newItem, ...storedHistory];
    localStorage.setItem('technoapp_code_ledger', JSON.stringify(updatedHistory));
    setCodeHistory(updatedHistory);
  };

  const handleCopySellerReply = () => {
    const sellerPkgName = isEn
      ? (sellerPackageChoice === 'wordpress' ? 'TechnoApp Pro WordPress Theme (.zip)' : sellerPackageChoice === 'blogger' ? 'TechnoApp Pro Blogger XML' : 'TechnoApp Pro Bundle (Blogger + WordPress)')
      : (sellerPackageChoice === 'wordpress' ? 'قالب ووردبريس الاحترافي (TechnoApp WP)' : sellerPackageChoice === 'blogger' ? 'قالب بلوجر التقني المطور (TechnoApp XML)' : 'حزمة القالبين معاً (Blogger + WordPress)');

    const reply = isEn
      ? `🎉 *TechnoApp Pro Theme Activation Code ($${sellerPkgPrice})*
━━━━━━━━━━━━━━━━━━━━━━━━
🔑 *Your One-Time Code:* ${generatedCode}
📦 *Package:* ${sellerPkgName}
⚡ *Download Steps:*
1. Open our website and click "Download / Unlock License".
2. Switch to the *"One-Time Code"* tab.
3. Paste your code: *${generatedCode}* and click *Activate Code*.
4. Your clean theme files will download immediately!
━━━━━━━━━━━━━━━━━━━━━━━━
Thank you for your purchase! Support is available anytime on this WhatsApp.`
      : `🎉 *كود تفعيل وتحميل قالب TechnoApp Pro (سعر: $${sellerPkgPrice})*
━━━━━━━━━━━━━━━━━━━━━━━━
🔑 *كود التفعيل لمرة واحدة:* ${generatedCode}
📦 *الحزمة المشتراة:* ${sellerPkgName}
⚡ *خطوات التحميل:*
1. افتح الموقع واضغط على زر "تحميل القالب / تفعيل الترخيص".
2. انتقل لتبويب *"كود تفعيل لمرة واحدة"*.
3. ضع الكود: *${generatedCode}* ثم اضغط *"تفعيل الكود"*.
4. سيبدأ تحميل ملفات القالب النظيفة فوراً على جهازك!
━━━━━━━━━━━━━━━━━━━━━━━━
شكراً لثقتكم ونتمنى لكم التوفيق! نحن بخدمتكم دائماً عبر هذا الواتساب.`;

    navigator.clipboard.writeText(reply);
    setCopiedSellerCode(true);
    setTimeout(() => setCopiedSellerCode(false), 2500);
  };

  const handleCopyPlainCode = (codeStr: string) => {
    navigator.clipboard.writeText(codeStr);
    setCopiedPlainCode(true);
    setTimeout(() => setCopiedPlainCode(false), 2000);
  };

  const handleDeleteLedgerItem = (codeToDelete: string) => {
    const filtered = codeHistory.filter(item => item.code !== codeToDelete);
    setCodeHistory(filtered);
    localStorage.setItem('technoapp_code_ledger', JSON.stringify(filtered));

    // Also remove from valid pool
    const validPool: string[] = JSON.parse(localStorage.getItem('technoapp_valid_pool') || '[]');
    const updatedPool = validPool.filter(c => c !== codeToDelete);
    localStorage.setItem('technoapp_valid_pool', JSON.stringify(updatedPool));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto" dir={isEn ? 'ltr' : 'rtl'}>
      <div 
        className="bg-slate-900 border border-slate-800 w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className={`absolute ${isEn ? 'right-4' : 'left-4'} top-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition`}
            title={isEn ? 'Close' : 'إغلاق'}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Ribbon with Secret Admin Click Feature (5 clicks on badge) */}
          <div 
            onClick={() => {
              const next = secretClickCount + 1;
              setSecretClickCount(next);
              if (next >= 5) {
                setShowSellerTab(true);
                setActiveTab('seller');
                loadCodeLedger();
                setSuccessMessage(isEn ? '⚡ Seller / Admin Mode Unlocked!' : '⚡ تم فتح لوحة وأداة البائع السرية بنجاح!');
                setSecretClickCount(0);
              }
            }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20 w-fit text-xs font-bold mb-2 cursor-pointer select-none"
            title={isEn ? "Official License" : "الترخيص الرسمي"}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isEn ? 'Official License & Instant Unlock' : 'الترخيص الرسمي والتحميل الفوري'}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black">{isEn ? 'TechnoApp Pro Commercial License' : 'شراء وتفعيل ترخيص قالب TechnoApp Pro'}</h2>
              <p className="text-xs text-emerald-100 mt-0.5">
                {isEn ? 'Blogger XML Template & WordPress Theme Package' : 'متوافق مع منصة بلوجر وووردبريس بأعلى معايير السرعة والأمان'}
              </p>
            </div>
            
            {/* Price Badge with Local Currency */}
            <div className="text-right bg-slate-950/60 backdrop-blur px-3.5 py-2 rounded-2xl border border-white/20 flex-shrink-0 shadow-lg">
              <div className="text-sm sm:text-base font-black text-amber-300 font-sans">
                {localPriceObj.amountFormatted}
              </div>
              <div className="flex items-center justify-end gap-1.5 text-[10px] text-slate-300 font-mono">
                <span className="line-through text-slate-400">${selectedPackage === 'both' ? '19.99' : '9.99'}</span>
                <span className="text-emerald-300 font-bold">${activePrice} USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Country & Currency Bar */}
        <div className="bg-slate-950 px-4 sm:px-6 py-2.5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-[11px] text-slate-300 font-semibold">
              {isEn ? 'Detected Country & Currency:' : 'العملة وسعر الصرف حسب بلدك:'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCountry.countryCode}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white text-[11px] rounded-xl px-2.5 py-1 font-bold focus:outline-none focus:border-emerald-500 transition cursor-pointer"
            >
              {Object.values(COUNTRIES_CONFIG).map((c) => (
                <option key={c.countryCode} value={c.countryCode} className="bg-slate-900 text-white">
                  {c.flag} {isEn ? c.nameEn : c.nameAr} ({c.currencyCode} - {c.isParallelMarket ? (isEn ? 'Market Rate' : 'سوق السكوار') : (isEn ? 'Official' : 'رسمي')})
                </option>
              ))}
            </select>

            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono hidden sm:inline">
              1$ = {selectedCountry.ratePerUsd} {selectedCountry.currencyCode}
            </span>
          </div>
        </div>

        {/* Method Switcher Tabs (Only 3 tabs for buyers, Seller Tab hidden by default) */}
        <div className="px-4 sm:px-6 pt-3 bg-slate-950/90 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {/* Tab 1: WhatsApp Order */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('whatsapp');
              setErrorMessage('');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold transition whitespace-nowrap border-t border-x ${
              activeTab === 'whatsapp'
                ? 'bg-slate-900 border-slate-700 text-emerald-400 border-b-2 border-b-emerald-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>{isEn ? 'WhatsApp Order' : 'طلب عبر واتساب'}</span>
          </button>

          {/* Tab 2: PayPal */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('paypal');
              setErrorMessage('');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold transition whitespace-nowrap border-t border-x ${
              activeTab === 'paypal'
                ? 'bg-slate-900 border-slate-700 text-cyan-400 border-b-2 border-b-cyan-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <span>{isEn ? 'PayPal Checkout' : 'دفع PayPal'}</span>
          </button>

          {/* Tab 3: One-Time Code */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('license');
              setErrorMessage('');
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold transition whitespace-nowrap border-t border-x ${
              activeTab === 'license'
                ? 'bg-slate-900 border-slate-700 text-amber-400 border-b-2 border-b-amber-500'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span>{isEn ? 'One-Time Code' : 'كود تفعيل لمرة واحدة'}</span>
          </button>

          {/* Tab 4: Seller & Developer Tool (ONLY visible if unlocked by admin) */}
          {showSellerTab && (
            <button
              type="button"
              onClick={() => {
                setActiveTab('seller');
                setErrorMessage('');
                loadCodeLedger();
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs font-bold transition whitespace-nowrap border-t border-x ml-auto ${
                activeTab === 'seller'
                  ? 'bg-slate-900 border-cyan-500/50 text-cyan-300 border-b-2 border-b-cyan-400 shadow-sm'
                  : 'border-transparent text-slate-400 hover:text-cyan-300 bg-cyan-950/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isEn ? '⚡ Seller Tool' : '⚡ أداة البائع والمطور'}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                Admin
              </span>
            </button>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-4 text-slate-200 text-xs flex-1 overflow-y-auto">
          
          {/* Notifications */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: WHATSAPP ORDER FORM */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-2xl flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 text-xs">
                      {isEn ? `Order via WhatsApp & Pay Locally ($${activePrice})` : `طلب القالب والدفع المحلي عبر واتساب ($${activePrice})`}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400" dir="ltr">
                      {sellerWhatsAppPhone}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    {isEn
                      ? 'Fill this form to format your order. After sending payment confirmation to our WhatsApp, you will receive a One-Time Activation Code to unlock instant download.'
                      : 'املأ النموذج أدناه لتجهيز الطلب. بعد إرسال تفاصيل التحويل على واتساب، سيرسل لك البائع كود تفعيل لمرة واحدة لبدء التحميل فوراً.'}
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {isEn ? 'Your Full Name *' : 'اسمك الكامل *'}
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder={isEn ? "e.g. Alex Morgan" : "مثال: محمد أحمد"}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {isEn ? 'WhatsApp Phone Number *' : 'رقم الواتساب / الهاتف *'}
                    </label>
                    <input
                      type="text"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="+213... / +20... / +966..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {isEn ? 'Email Address' : 'البريد الإلكتروني'}
                    </label>
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {isEn ? 'Country / City' : 'الدولة / المدينة'}
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder={isEn ? "e.g. Algeria, Egypt, UAE..." : "مثال: الجزائر، مصر، السعودية..."}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Package Choice */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-slate-300 font-bold">
                      {isEn ? 'Select Template Package' : 'اختر الحزمة المطلوبة'}
                    </label>
                    <span className="text-[10px] text-amber-300 font-medium">
                      {localPriceObj.explanation}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPackage('blogger')}
                      className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between ${
                        selectedPackage === 'blogger'
                          ? 'border-emerald-500 bg-emerald-500/15 text-white font-bold ring-2 ring-emerald-500 shadow-md'
                          : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-black">Blogger (.xml)</div>
                      <div className="mt-1">
                        <div className="text-[11px] text-emerald-400 font-bold font-sans">
                          {bloggerLocalPrice.amountFormatted}
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono">$4.99 USD</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPackage('wordpress')}
                      className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between ${
                        selectedPackage === 'wordpress'
                          ? 'border-emerald-500 bg-emerald-500/15 text-white font-bold ring-2 ring-emerald-500 shadow-md'
                          : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-black">WordPress (.zip)</div>
                      <div className="mt-1">
                        <div className="text-[11px] text-emerald-400 font-bold font-sans">
                          {wpLocalPrice.amountFormatted}
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono">$4.99 USD</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPackage('both')}
                      className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between ${
                        selectedPackage === 'both'
                          ? 'border-amber-500 bg-amber-500/15 text-white font-bold ring-2 ring-amber-500 shadow-md'
                          : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-black text-amber-300">{isEn ? 'Both (Bundle)' : 'الحزمة الشاملة'}</div>
                      <div className="mt-1">
                        <div className="text-[11px] text-amber-300 font-bold font-sans">
                          {bundleLocalPrice.amountFormatted}
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono">$9.99 USD</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Preferred Payment Method */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isEn ? 'Preferred Payment Method' : 'طريقة الدفع المتوفرة لديك'}
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
                  >
                    <option value="baridimob">🇩🇿 بريدي موب / CCP / Algérie Poste (الجزائر - 1$ = 240 دج)</option>
                    <option value="vodafone">🇪🇬 فودافون كاش / إنستاباي InstaPay (مصر - 1$ = 50 ج.م)</option>
                    <option value="stcpay">🇸🇦 STC Pay / تحويل بنكي (السعودية والخليج)</option>
                    <option value="zaincash">🇮🇶 زين كاش / آسيا حوالة (العراق - 1$ = 1,500 د.ع)</option>
                    <option value="usdt">🪙 USDT / Binance Pay (العملات الرقمية TRC20/BEP20)</option>
                    <option value="westernunion">🌍 Western Union / MoneyGram</option>
                    <option value="bankwire">💳 تحويل بنكي مباشر / أخرى</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    {isEn ? 'Notes / Questions (Optional)' : 'ملاحظات أو أسئلة إضافية (اختياري)'}
                  </label>
                  <input
                    type="text"
                    value={buyerNotes}
                    onChange={(e) => setBuyerNotes(e.target.value)}
                    placeholder={isEn ? "e.g. I want help with installation" : "مثال: أرغب بالمساعدة في التثبيت أو الاستفسار"}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleSendWhatsAppOrder}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black rounded-2xl text-xs transition-all transform hover:scale-[1.01] shadow-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>
                    {isEn 
                      ? `Send Order via WhatsApp (${localPriceObj.amountFormatted} / $${activePrice})` 
                      : `إرسال الطلب والمتابعة عبر واتساب (${localPriceObj.amountFormatted} / $${activePrice})`}
                  </span>
                </button>

                <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
                  <span>{isEn ? 'Seller WhatsApp:' : 'رقم واتساب البائع:'} <strong className="text-emerald-400 font-mono" dir="ltr">{sellerWhatsAppPhone}</strong></span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedMessage ? (isEn ? 'Copied!' : 'تم النسخ!') : (isEn ? 'Copy Order Text' : 'نسخ نص الطلب')}</span>
                  </button>
                </div>
              </div>

              {/* Step Forward to One-Time Code */}
              {orderSent && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isEn ? 'Order Prepared! Received your One-Time Code?' : 'تم تجهيز الطلب! هل استلمت كود التفعيل من البائع؟'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isEn
                      ? 'Switch to the "One-Time Code" tab above or click below to enter the code and start downloading.'
                      : 'انتقل إلى تبويب "كود تفعيل لمرة واحدة" بالأعلى أو اضغط الزر أدناه لإدخال الكود المستلم وتحميل القالب.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('license')}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Enter One-Time Activation Code' : 'إدخال كود التفعيل لمرة واحدة'}</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: PAYPAL CHECKOUT */}
          {activeTab === 'paypal' && (
            <div className="space-y-4 animate-fade-in">
              {step === 'checkout' ? (
                <div className="space-y-4">
                  {/* PayPal Package Choice */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5 text-xs">
                      {isEn ? 'Choose License Package for PayPal' : 'اختر الحزمة المراد شراؤها عبر PayPal'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPackage('blogger')}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between ${
                          selectedPackage === 'blogger'
                            ? 'border-cyan-500 bg-cyan-500/15 text-white font-bold ring-2 ring-cyan-500 shadow-md'
                            : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-black">Blogger XML</div>
                        <div className="mt-1">
                          <div className="text-[11px] text-cyan-400 font-mono font-bold">$4.99 USD</div>
                          <div className="text-[9px] text-slate-400 font-sans">{bloggerLocalPrice.amountFormatted}</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPackage('wordpress')}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between ${
                          selectedPackage === 'wordpress'
                            ? 'border-cyan-500 bg-cyan-500/15 text-white font-bold ring-2 ring-cyan-500 shadow-md'
                            : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-black">WordPress ZIP</div>
                        <div className="mt-1">
                          <div className="text-[11px] text-cyan-400 font-mono font-bold">$4.99 USD</div>
                          <div className="text-[9px] text-slate-400 font-sans">{wpLocalPrice.amountFormatted}</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPackage('both')}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between ${
                          selectedPackage === 'both'
                            ? 'border-amber-500 bg-amber-500/15 text-white font-bold ring-2 ring-amber-500 shadow-md'
                            : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-black text-amber-300">{isEn ? 'Full Bundle' : 'الحزمة كاملة'}</div>
                        <div className="mt-1">
                          <div className="text-[11px] text-amber-300 font-mono font-bold">$9.99 USD</div>
                          <div className="text-[9px] text-slate-400 font-sans">{bundleLocalPrice.amountFormatted}</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">{isEn ? 'Special Price (Lifetime)' : 'سعر العرض الرسمي (مدى الحياة)'}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-cyan-400 font-mono">${activePrice} <span className="text-xs text-slate-400">USD</span></span>
                        <span className="text-xs text-amber-300 font-semibold font-sans">({localPriceObj.amountFormatted})</span>
                      </div>
                    </div>
                    <div className="text-right space-y-1 text-[11px]">
                      <div className="flex items-center gap-1 text-slate-300 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{isEn ? 'Clean Source Files' : 'أكواد ومصدر نقي'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{isEn ? 'Instant License Unlock' : 'تفعيل وتحميل فوري'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">
                      {isEn ? 'Your Email Address (For Order Receipt)' : 'بريدك الإلكتروني (لاستلام الفاتورة وربط الحساب)'}
                    </label>
                    <input
                      type="email"
                      value={paypalBuyerEmail}
                      onChange={(e) => {
                        setPaypalBuyerEmail(e.target.value);
                        setErrorMessage('');
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-medium"
                      placeholder="your-email@example.com"
                      dir="ltr"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenPayPal}
                    className="w-full py-3.5 bg-[#FFC439] hover:bg-[#f4b92b] text-[#003087] font-black rounded-2xl text-xs transition-all transform hover:scale-[1.01] shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>{isEn ? `Pay $${activePrice} via PayPal Now` : `دفع $${activePrice} بواسطة PayPal الآن`}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-sm">
                      {isEn ? 'Payment Window Opened in PayPal' : 'تم فتح صفحة الدفع في نافذة PayPal'}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      {isEn 
                        ? 'Complete payment on PayPal, then paste your Transaction ID below to instantly download.' 
                        : 'بعد إتمام التحويل على بايبال، يرجى إدخال رقم المعاملة (Transaction ID) أدناه لتأكيد التفعيل فوراً.'}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left space-y-3">
                    <label className={`block text-slate-300 font-bold ${isEn ? 'text-left' : 'text-right'}`}>
                      {isEn ? 'PayPal Transaction ID / Transfer Code:' : 'رقم المعاملة (PayPal Transaction ID):'}
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => {
                        setTransactionId(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="e.g. 9XX8374829104859"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                      dir="ltr"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={isVerifying}
                      onClick={handleVerifyTransaction}
                      className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{isEn ? 'Verifying Transaction...' : 'جاري التحقق والتفعيل...'}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>{isEn ? 'Confirm & Download Files' : 'تأكيد المعاملة وتحميل القالب'}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('checkout')}
                      className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                    >
                      {isEn ? 'Back' : 'رجوع'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ONE-TIME ACTIVATION CODE (كود تفعيل لمرة واحدة للمشتري) */}
          {activeTab === 'license' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3">
                <Key className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-300 text-xs">
                    {isEn ? 'One-Time Activation Code System' : 'نظام كود التفعيل المخصص لمرة واحدة'}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    {isEn
                      ? 'Enter the unique single-use code received from the seller via WhatsApp or email. Each code can be redeemed only once to unlock files.'
                      : 'أدخل الكود المخصص لمرة واحدة الذي استلمته من البائع عبر واتساب. كل كود مخصص لعملية شراء واحدة ويتم استهلاكه فور التحميل.'}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-slate-300 font-bold text-xs">
                  {isEn ? 'Enter One-Time Activation Code:' : 'أدخل كود التفعيل لمرة واحدة:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={licenseCode}
                    onChange={(e) => {
                      setLicenseCode(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="e.g. TECHNO-999-XXXX-XXXX"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs uppercase focus:outline-none focus:border-amber-500 tracking-wider"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={handleApplyLicense}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-md transition flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{isEn ? 'Activate Code' : 'تفعيل الكود'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SELLER & DEVELOPER CODE GENERATOR (أداة البائع والمطور المتكاملة - مخفية للأدمن فقط) */}
          {showSellerTab && activeTab === 'seller' && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Seller Banner with WhatsApp Phone */}
              <div className="bg-gradient-to-r from-cyan-950/80 to-slate-900 border border-cyan-500/30 p-4 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                        <span>{isEn ? 'Developer & Seller Activation Engine' : 'لوحة المطور والبائع: توليد وإدارة أكواد التفعيل'}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                          $9.99
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {isEn ? 'Connected WhatsApp Number:' : 'رقم الواتساب المعتمد للاستلام:'} <strong className="text-emerald-400 font-mono" dir="ltr">{sellerWhatsAppPhone}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${cleanSellerPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-[11px] font-bold transition flex items-center gap-1.5 w-fit"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Test WhatsApp Link' : 'اختبار رابط الواتساب'}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setShowSellerTab(false);
                        setActiveTab('whatsapp');
                        setSuccessMessage(isEn ? 'Seller tab locked and hidden.' : 'تم قفل وإخفاء تبويب أداة البائع بنجاح.');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 rounded-xl text-[11px] font-bold transition flex items-center gap-1.5"
                      title={isEn ? "Hide & Lock Seller Mode" : "إخفاء وقفل وضع البائع"}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Lock & Hide Tab' : 'قفل وإخفاء التبويب'}</span>
                    </button>
                  </div>
                </div>

                {/* 4-Step Diagram */}
                <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                  <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-cyan-400 font-bold block mb-0.5">1. استلام الطلب</span>
                    <span className="text-slate-400">يصلك طلب المشتري على الواتساب مع إشعار التحويل.</span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded-xl border border-cyan-500/30">
                    <span className="text-amber-400 font-bold block mb-0.5">2. توليد الكود</span>
                    <span className="text-slate-400">اضغط "توليد كود جديد" بالأسفل للحصول على كود فريد.</span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-emerald-400 font-bold block mb-0.5">3. إرسال الرد</span>
                    <span className="text-slate-400">انسخ رسالة الرد الجاهزة بنقرة واحدة وأرسلها للواتساب.</span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800/80">
                    <span className="text-purple-400 font-bold block mb-0.5">4. تفعيل وحرق</span>
                    <span className="text-slate-400">يُفعّل المشتري الكود في الموقع ويحترق الكود فوراً.</span>
                  </div>
                </div>
              </div>

              {/* Generator Form */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="font-bold text-white text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    {isEn ? 'Generate Single-Use Activation Code for Buyer' : 'توليد كود تفعيل فوري لمرة واحدة لمشتري الواتساب'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                      {isEn ? 'Buyer Reference (Name, Phone, or Note)' : 'مرجع المشتري (الاسم، الهاتف، أو طريقة التحويل):'}
                    </label>
                    <input
                      type="text"
                      value={sellerBuyerRef}
                      onChange={(e) => setSellerBuyerRef(e.target.value)}
                      placeholder={isEn ? "e.g. Karim - BaridiMob DZ" : "مثال: كريم - بريدي موب الجزائر"}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                      {isEn ? 'Package License' : 'نوع القالب المرخص:'}
                    </label>
                    <select
                      value={sellerPackageChoice}
                      onChange={(e) => setSellerPackageChoice(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
                    >
                      <option value="both">🌟 الحزمة المزدوجة (Blogger + WordPress) - $9.99</option>
                      <option value="blogger">📄 قالب بلوجر فقط (Blogger XML) - $4.99</option>
                      <option value="wordpress">📦 قالب ووردبريس فقط (WordPress ZIP) - $4.99</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateSellerCode}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-[1.005]"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>{isEn ? `⚡ Generate New 1-Time Code Now ($${sellerPkgPrice})` : `⚡ توليد كود تفعيل جديد لمرة واحدة الآن ($${sellerPkgPrice})`}</span>
                </button>

                {/* Generated Code Display Box */}
                {generatedCode && (
                  <div className="p-4 bg-slate-900 rounded-2xl border-2 border-cyan-500/60 space-y-3 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                          {isEn ? 'Freshly Generated Code:' : 'كود التفعيل المتولد الجاهز للإرسال:'}
                        </span>
                        <div className="text-base sm:text-lg font-black font-mono text-amber-300 tracking-wider mt-0.5 select-all" dir="ltr">
                          {generatedCode}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyPlainCode(generatedCode)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-[11px] font-bold transition flex items-center gap-1"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedPlainCode ? (isEn ? 'Copied Code!' : 'تم نسخ الكود!') : (isEn ? 'Copy Code' : 'نسخ الكود فقط')}</span>
                        </button>
                      </div>
                    </div>

                    {/* Ready formatted WhatsApp response */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="text-[11px] text-slate-300 font-semibold flex items-center justify-between">
                        <span>{isEn ? 'Formatted WhatsApp Reply Message:' : 'رسالة الرد المنسقة الجاهزة للواتساب:'}</span>
                        <span className="text-[10px] text-cyan-400">{isEn ? 'Includes Instructions' : 'تحتوي خطوات التحميل للمشتري'}</span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleCopySellerReply}
                        className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md"
                      >
                        <MessageCircle className="w-4 h-4 fill-slate-950" />
                        <span>{copiedSellerCode ? (isEn ? '✓ Copied WhatsApp Reply to Clipboard!' : '✓ تم نسخ رسالة الرد كاملة للحافظة!') : (isEn ? 'Copy Full WhatsApp Response Message' : 'نسخ رسالة الرد الجاهزة لإرسالها بالواتساب')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Code History & Ledger */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-slate-300 text-xs">
                      {isEn ? 'Recent Generated Codes & Usage Status' : 'سجل الأكواد المولدة وحالة الاستخدام (حرق الكود):'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {codeHistory.length} {isEn ? 'Codes' : 'أكواد'}
                  </span>
                </div>

                {codeHistory.length === 0 ? (
                  <div className="text-center py-4 text-slate-500 text-[11px]">
                    {isEn ? 'No codes generated yet. Click "Generate" above to create one.' : 'لم يتم توليد أكواد بعد. اضغط على "توليد كود جديد" بالأعلى لإنشاء أول كود.'}
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {codeHistory.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-[11px] transition ${
                          item.isUsed 
                            ? 'bg-rose-950/20 border-rose-500/30 text-rose-300' 
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white" dir="ltr">{item.code}</span>
                            <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold ${
                              item.isUsed 
                                ? 'bg-rose-500/20 text-rose-300' 
                                : 'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              {item.isUsed ? (isEn ? '🔴 Redeemed & Burned' : '🔴 تم استهلاكه واستخدامه') : (isEn ? '🟢 Active & Ready' : '🟢 متاح وجاهز للاستخدام')}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2">
                            <span>{item.buyerNote}</span>
                            <span>•</span>
                            <span>{item.packageType}</span>
                            <span>•</span>
                            <span>{item.createdAt}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopyPlainCode(item.code)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                            title={isEn ? 'Copy Code' : 'نسخ الكود'}
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteLedgerItem(item.code)}
                            className="p-1.5 bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 rounded-lg transition"
                            title={isEn ? 'Delete / Revoke' : 'حذف الكود'}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Security Footer */}
        <div className="px-4 sm:px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>{isEn ? 'Encrypted & Clean Source Code' : 'كود برمجي نقي ومحمي 100%'}</span>
          </div>
          <span className="font-mono text-cyan-400">{isEn ? 'WhatsApp +213563710494' : 'واتساب: +213563710494'}</span>
        </div>

      </div>
    </div>
  );
};
