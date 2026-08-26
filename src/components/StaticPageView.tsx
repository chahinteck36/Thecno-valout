import React, { useState } from 'react';
import { ThemeConfig } from '../types';
import { 
  ShieldCheck, Info, Mail, AlertTriangle, ArrowRight, 
  Send, CheckCircle, Lock, Eye, FileText, Globe, Sparkles 
} from 'lucide-react';
import { t } from '../utils/translations';

export type StaticPageType = 'about' | 'privacy' | 'contact' | 'disclaimer';

interface Props {
  pageType: StaticPageType;
  config: ThemeConfig;
  isDark: boolean;
  onBackToHome: () => void;
  onSwitchPage: (page: StaticPageType) => void;
}

export const StaticPageView: React.FC<Props> = ({
  pageType,
  config,
  isDark,
  onBackToHome,
  onSwitchPage,
}) => {
  const isEn = config.language === 'en';
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSent(false);
    }, 3000);
  };

  const navTabs: { id: StaticPageType; label: string; icon: any }[] = [
    { id: 'about', label: t('aboutUs', config.language), icon: Info },
    { id: 'privacy', label: t('privacyPolicy', config.language), icon: ShieldCheck },
    { id: 'contact', label: t('contactUs', config.language), icon: Mail },
    { id: 'disclaimer', label: t('disclaimer', config.language), icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6 animate-fade-in" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBackToHome}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            isDark 
              ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800' 
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ArrowRight className={`w-4 h-4 ${isEn ? 'rotate-180' : ''}`} />
          <span>{isEn ? 'Back to Home & Applications' : 'العودة للرئيسية والتطبيقات'}</span>
        </button>

        {/* Page Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pageType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSwitchPage(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950 font-black'
                    : isDark
                      ? 'bg-slate-900/80 text-slate-400 hover:text-slate-200'
                      : 'bg-slate-200/80 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Page Card */}
      <article className={`rounded-3xl border p-6 md:p-10 transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      }`}>
        
        {/* ================= PAGE 1: ABOUT US ================= */}
        {pageType === 'about' && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold mb-3">
                <Info className="w-3.5 h-3.5" />
                <span>{isEn ? 'Platform Profile' : 'نبذة عن المنصة'}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">
                {isEn ? `About Us - ${config.siteName.split('|')[0]}` : `من نحن - منصة ${config.siteName.split('|')[0]}`}
              </h1>
              <p className="text-xs md:text-sm text-slate-400 mt-2">
                {isEn 
                  ? 'Your trusted, lightning-fast digital hub for verified software, applications, and technology tools.' 
                  : 'دليلك الأول والموثوق لتحميل وشرح أحدث التطبيقات والبرامج التقنية بروابط مباشرة وآمنة 100%'}
              </p>
            </div>

            <div className="prose prose-invert max-w-none text-xs md:text-sm leading-relaxed space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{isEn ? 'Who We Are' : 'من نحن؟'}</h3>
                <p>
                  {isEn 
                    ? `Welcome to ${config.siteName.split('|')[0]}, a specialized portal dedicated to providing verified software, desktop applications, mobile tools, and tech tutorials. Our mission is to make downloading reliable, high-speed, and free from malicious software or intrusive advertisements.` 
                    : `أهلاً بك في منصة ${config.siteName.split('|')[0]}، بوابتك المتخصصة في عالم التقنية والبرمجيات وتطبيقات الهواتف الذكية. نسعى جاهدين لتقديم تجربة تصفح وتحميل فريدة تجمع بين السرعة الفائقة والأمان الموثوق، حيث نضع بين يديك مراجعات دقيقة وشروحات مفصلة لكل تطبيق وبرنامج.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">1</div>
                  <h4 className="font-bold text-white text-sm">{isEn ? '100% Verified Safety' : 'فحص أمان شامل'}</h4>
                  <p className="text-xs text-slate-400">{isEn ? 'Every APK and executable is rigorously scanned with VirusTotal and multi-engine security layers.' : 'يتم فحص جميع ملفات الـ APK والبرامج عبر عدة برامج حماية موثوقة لضمان خلوها تماماً من أي ملفات خبيثة.'}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">2</div>
                  <h4 className="font-bold text-white text-sm">{isEn ? 'Direct High-Speed Mirrors' : 'روابط سريعة ومباشرة'}</h4>
                  <p className="text-xs text-slate-400">{isEn ? 'Instant download mirrors hosted on Mediafire, Google Drive, and Telegram without fake redirects.' : 'نوفر روابط تحميل مباشرة وسريعة على ميديا فاير وجوجل درايف وتليجرام بدون أي تحويلات مضللة أو إعلانات مزعجة.'}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">3</div>
                  <h4 className="font-bold text-white text-sm">{isEn ? 'Daily Latest Updates' : 'تحديثات يومية مستمرة'}</h4>
                  <p className="text-xs text-slate-400">{isEn ? 'Continuous daily catalog updates to guarantee you always have the latest feature releases.' : 'فريقنا التقني يعمل على مدار الساعة لتحديث البرامج وإضافة أحدث الإصدارات فور صدورها رسمياً.'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 2: PRIVACY POLICY ================= */}
        {pageType === 'privacy' && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isEn ? 'Privacy & Security Standards' : 'معايير الخصوصية والأمان'}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">{t('privacyPolicy', config.language)}</h1>
              <p className="text-xs md:text-sm text-slate-400 mt-2">
                {isEn 
                  ? 'Last updated: 2026. Your privacy and digital data security are our top priorities.' 
                  : 'آخر تحديث: عام 2026 - خصوصيتك وبياناتك الرقمية أولوية قصوى بالنسبة لنا'}
              </p>
            </div>

            <div className="prose prose-invert max-w-none text-xs md:text-sm leading-relaxed space-y-5">
              <p>
                {isEn
                  ? `In ${config.siteName.split('|')[0]}, we respect your privacy and are committed to protecting any personal information. This privacy policy explains what data we handle and how your browsing security is maintained.`
                  : `في منصة ${config.siteName.split('|')[0]}، نحن ندرك تماماً أهمية حماية بياناتك الشخصية وحقك في الخصوصية أثناء تصفحك لشبكة الإنترنت. توضح هذه الوثيقة طبيعة المعلومات التي قد يتم التعامل معها وكيفية الحفاظ على أمانك الرقمي.`}
              </p>

              <div>
                <h3 className="text-base font-bold text-white mb-2">{isEn ? '1. Log Files & Cookies' : '1. ملفات السجل (Log Files) وملفات الكوكيز'}</h3>
                <p className="text-slate-300">
                  {isEn
                    ? 'Like most websites, our servers collect standard non-personal analytics (such as browser type, ISP, operating system, and page visits) strictly to improve user experience and analyze download speed performance.'
                    : 'مثل معظم المواقع الإلكترونية، نستخدم ملفات السجل القياسية التي تتضمن معلومات غير شخصية مثل نوع المتصفح ومزود خدمة الإنترنت والتاريخ والوقت، وذلك بهدف تحليل أداء الموقع وتحسين تجربة التحميل للمستخدمين.'}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">{isEn ? '2. Advertising & Third-Party Services (Google AdSense)' : '2. إعلانات جوجل وشبكات الإعلانات (Google AdSense)'}</h3>
                <p className="text-slate-300">
                  {isEn
                    ? 'We may use reputable ad partners like Google AdSense. Google uses cookies (including the DART cookie) to serve relevant ads based on users’ prior visits to internet sites. Users may opt out by visiting the Google Ad and Content Network Privacy Policy.'
                    : 'قد نقوم بالاستعانة بشركات إعلانية موثوقة (مثل Google AdSense) لعرض الإعلانات عند زيارتك لموقعنا. تستخدم هذه الشركات ملفات تعريف الارتباط لعرض الإعلانات حسب اهتماماتك. يمكنك إلغاء ذلك من خلال زيارة سياسة خصوصية إعلانات Google.'}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">{isEn ? '3. Direct Download Links Safety' : '3. سلامة ملفات وروابط التحميل المباشرة'}</h3>
                <p className="text-slate-300">
                  {isEn
                    ? 'All software packages, applications, and APK files hosted or linked from our platform are scanned and guaranteed clean from trojans, spyware, or malicious payloads.'
                    : 'نلتزم بشكل صارم بأن جميع روابط التحميل وملفات البرامج والتطبيقات المتاحة بالمنصة تخضع لفحص دقيق لضمان سلامتها الكاملة وخلوها من أي برمجيات ضارة أو تجسسية.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 3: CONTACT US ================= */}
        {pageType === 'contact' && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold mb-3">
                <Mail className="w-3.5 h-3.5" />
                <span>{isEn ? 'Technical Support & Inquiries' : 'الدعم الفني والاستفسارات'}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">{t('contactUs', config.language)}</h1>
              <p className="text-xs md:text-sm text-slate-400 mt-2">
                {isEn 
                  ? 'Have a question, app suggestion, or partnership request? Drop us a message anytime!' 
                  : 'لديك استفسار، اقتراح لتطبيق معين، أو ترغب في الإبلاغ عن رابط غير صالح؟ تواصل مع فريقنا مباشرة'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information & Channels */}
              <div className="space-y-4 text-xs md:text-sm">
                <h3 className="text-base font-bold text-white mb-2">{isEn ? 'Communication Channels' : 'طرق التواصل المباشرة'}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {isEn
                    ? 'Our team reviews all incoming requests promptly. You can reach out directly via the form or through our verified Telegram support channels.'
                    : 'يسعدنا دائماً استقبال رسائلكم واستفساراتكم على مدار الساعة. يقوم فريقنا التقني بمراجعة الرسائل والرد عليها في أسرع وقت ممكن.'}
                </p>

                <div className="space-y-3 pt-3">
                  <a 
                    href={config.telegramChannelUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center gap-3 text-sky-400 hover:bg-sky-500/20 transition group"
                  >
                    <Send className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">{isEn ? 'Official Telegram Channel' : 'قناتنا الرسمية على تليجرام'}</div>
                      <div className="text-[11px] text-sky-300 font-mono" dir="ltr">{config.telegramChannelUrl}</div>
                    </div>
                  </a>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-slate-300">
                    <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white text-xs">{isEn ? 'Email Support' : 'البريد الإلكتروني للدعم'}</div>
                      <div className="text-[11px] text-slate-400 font-mono" dir="ltr">support@technoapp-pro.com</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Contact Form */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white">{isEn ? 'Send Us a Message' : 'أرسل رسالة سريعة'}</h3>
                
                {formSent ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center space-y-2 animate-fade-in">
                    <CheckCircle className="w-8 h-8 mx-auto stroke-[2.5]" />
                    <h4 className="font-black text-sm">{isEn ? 'Message Sent Successfully!' : 'تم إرسال رسالتك بنجاح!'}</h4>
                    <p className="text-xs text-slate-300">{isEn ? 'Thank you for reaching out. We will get back to you shortly.' : 'شكراً لتواصلك معنا، سنقوم بالرد عليك عبر بريدك الإلكتروني في أقرب وقت.'}</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">{isEn ? 'Your Name' : 'اسمك الكريم'}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                        placeholder={isEn ? 'John Doe' : 'محمد أحمد'}
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">{isEn ? 'Email Address' : 'بريدك الإلكتروني'}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                        placeholder="user@example.com"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">{isEn ? 'Message Subject' : 'موضوع الرسالة'}</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                        placeholder={isEn ? 'App Request / Feedback' : 'طلب تطبيق / بلاغ عن رابط'}
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">{isEn ? 'Message Content' : 'نص الرسالة'}</label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                        placeholder={isEn ? 'Write your message details here...' : 'اكتب تفاصيل استفسارك أو طلبك هنا...'}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl shadow-lg transition"
                    >
                      {isEn ? 'Submit Message' : 'إرسال الرسالة الآن'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 4: DISCLAIMER ================= */}
        {pageType === 'disclaimer' && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold mb-3">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{isEn ? 'Legal Notices & Rights' : 'الإشعارات القانونية وحقوق الملكية'}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">{t('disclaimer', config.language)}</h1>
              <p className="text-xs md:text-sm text-slate-400 mt-2">
                {isEn 
                  ? 'Legal terms, intellectual property disclosures, and DMCA copyright guidelines.' 
                  : 'بيان إخلاء المسؤولية القانونية وحقوق الملكية الفكرية وقانون الألفية الرقمية (DMCA)'}
              </p>
            </div>

            <div className="prose prose-invert max-w-none text-xs md:text-sm leading-relaxed space-y-5">
              <p>
                {isEn 
                  ? `All names, trademarks, logos, and digital software items mentioned on ${config.siteName.split('|')[0]} belong strictly to their respective owners and original developers. Our platform offers educational overviews, technical tutorials, and verified download pointers.`
                  : `جميع الأسماء والعلامات التجارية والشعارات والبرمجيات المذكورة في منصة ${config.siteName.split('|')[0]} هي ملك لأصحابها ومطوريها الأصليين. هدف المنصة هو تقديم شروحات ومراجعات تقنية وروابط مباشرة لمساعدة المستخدمين في الوصول للبرمجيات بسهولة.`}
              </p>

              <div>
                <h3 className="text-base font-bold text-white mb-2">{isEn ? 'DMCA Copyright Compliance' : 'حقوق الطبع والنشر وقانون الألفية (DMCA)'}</h3>
                <p className="text-slate-300">
                  {isEn
                    ? 'We respect intellectual property rights (DMCA). If you are a copyright owner and wish to request removal of content, please contact us immediately and we will take necessary measures within 24 hours.'
                    : 'إذا كنت مالكاً لأي تطبيق أو علامة تجارية منشورة في موقعنا وترى أن هناك انتهاكاً لحقوق الملكية الخاصة بك، يُرجى مراسلتنا فوراً وسنقوم بمراجعة الطلب وحذف المحتوى المطلوب خلال 24 ساعة كحد أقصى.'}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">{isEn ? 'External Links & Services' : 'روابط التحميل الخارجية'}</h3>
                <p className="text-slate-300">
                  {isEn
                    ? 'While we inspect all files carefully, downloading and running software is at the user’s discretion. We are not responsible for unintended consequences resulting from third-party service updates.'
                    : 'على الرغم من حرصنا البالغ وفحصنا الدوري لجميع الروابط، إلا أن المنصة لا تتحمل أي مسؤولية عن الاستخدام غير السليم للبرامج أو أي تغييرات تجريها خوادم التخزين السحابية الخارجية.'}
                </p>
              </div>
            </div>
          </div>
        )}

      </article>

    </div>
  );
};
