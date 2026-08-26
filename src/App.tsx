import React, { useState } from 'react';
import { TechAppPost, ThemeConfig } from './types';
import { MOCK_POSTS, CATEGORIES_DATA, DEFAULT_THEME_CONFIG } from './data/mockPosts';
import { generateBloggerXml } from './utils/bloggerXmlGenerator';
import { createWordPressThemeZip } from './utils/wordPressThemeGenerator';
import { Header, ActiveTab } from './components/Header';
import { BloggerPreview } from './components/BloggerPreview';
import { InstallGuide } from './components/InstallGuide';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { PayPalCheckoutModal } from './components/PayPalCheckoutModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview');
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [posts, setPosts] = useState<TechAppPost[]>(MOCK_POSTS);
  const [activePost, setActivePost] = useState<TechAppPost | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Payment State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [pendingDownloadType, setPendingDownloadType] = useState<'blogger' | 'wordpress'>('blogger');

  // Actual execution of Blogger XML download (Clean Raw XML Template)
  const executeBloggerXmlDownload = () => {
    const xmlCode = generateBloggerXml(themeConfig);
    const blob = new Blob([xmlCode], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `TechnoApp_Pro_Blogger_Theme_2026.xml`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Actual execution of WordPress ZIP download (Clean Raw WordPress Theme ZIP)
  const executeWordPressZipDownload = async () => {
    try {
      const zipBlob = await createWordPressThemeZip(themeConfig);
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `TechnoApp_Pro_WordPress_Theme_2026.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error creating WordPress ZIP:', err);
    }
  };

  // Quick download theme.xml (Blogger) - Intercepted with PayPal Checkout
  const handleQuickDownloadXml = () => {
    if (!isUnlocked) {
      setPendingDownloadType('blogger');
      setIsCheckoutModalOpen(true);
      return;
    }
    executeBloggerXmlDownload();
  };

  // Quick download WordPress Theme ZIP - Intercepted with PayPal Checkout
  const handleQuickDownloadWpZip = () => {
    if (!isUnlocked) {
      setPendingDownloadType('wordpress');
      setIsCheckoutModalOpen(true);
      return;
    }
    executeWordPressZipDownload();
  };

  // Callback when PayPal payment succeeds or license key is valid
  const handlePaymentSuccess = () => {
    setIsUnlocked(true);
    setIsCheckoutModalOpen(false);

    // Auto-trigger the pending download immediately
    if (pendingDownloadType === 'wordpress') {
      executeWordPressZipDownload();
    } else {
      executeBloggerXmlDownload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Main Studio Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'preview') {
            setActivePost(null);
          }
        }}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onQuickDownloadXml={handleQuickDownloadXml}
        onQuickDownloadWpZip={handleQuickDownloadWpZip}
        config={themeConfig}
        onChangeLanguage={(lang) => setThemeConfig({ ...themeConfig, language: lang })}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
        isUnlocked={isUnlocked}
      />

      {/* Main Studio Viewport */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        
        {activeTab === 'preview' && (
          <BloggerPreview
            posts={posts}
            categories={CATEGORIES_DATA}
            config={themeConfig}
            activePost={activePost}
            onSelectPost={(p) => setActivePost(p)}
            isDark={isDark}
            onToggleDark={() => setIsDark(!isDark)}
            deviceMode={deviceMode}
            onChangeDeviceMode={setDeviceMode}
            hideInnerToolbar={false}
          />
        )}

        {activeTab === 'guide' && (
          <InstallGuide
            onGoToPreview={() => setActiveTab('preview')}
            onDownloadWpZip={handleQuickDownloadWpZip}
            onDownloadXml={handleQuickDownloadXml}
            language={themeConfig.language}
          />
        )}

      </main>

      {/* Theme Customizer Modal */}
      <ThemeCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={themeConfig}
        onChangeConfig={setThemeConfig}
        isUnlocked={isUnlocked}
        onRequestUnlock={() => {
          setPendingDownloadType('blogger');
          setIsCheckoutModalOpen(true);
        }}
      />

      {/* PayPal & WhatsApp Checkout Modal */}
      <PayPalCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        themeType={pendingDownloadType}
        price={themeConfig.paypalSettings?.priceUsd || 9.99}
        paypalEmail={themeConfig.paypalSettings?.paypalEmail || "chahinteck36@gmail.com"}
        sellerWhatsAppPhone={themeConfig.whatsappSettings?.sellerPhone || "+213563710494"}
        language={themeConfig.language}
      />

    </div>
  );
}


