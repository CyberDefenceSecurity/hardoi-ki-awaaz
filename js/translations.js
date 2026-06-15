/* ============================================
   Hardoi ki Awaaz — Translations
   Hindi/English language toggle
   ============================================ */

const Translations = {
  currentLang: localStorage.getItem('hka_lang') || 'hi',

  dict: {
    // Nav
    'nav.home': { hi: 'होम', en: 'Home' },
    'nav.news': { hi: 'समाचार', en: 'News' },
    'nav.about': { hi: 'हमारे बारे में', en: 'About' },
    'nav.issues': { hi: 'समस्याएं', en: 'Issues' },
    'nav.protests': { hi: 'प्रदर्शन', en: 'Protests' },
    'nav.idcard': { hi: 'आईडी कार्ड', en: 'ID Card' },
    'nav.contact': { hi: 'संपर्क', en: 'Contact' },
    'nav.manifesto': { hi: 'घोषणापत्र', en: 'Manifesto' },
    'nav.bulletin': { hi: 'बुलेटिन', en: 'Bulletin' },
    'nav.lang': { hi: 'EN', en: 'हिं' },

    // Hero
    'hero.badge': { hi: '📢 आवाज़ उठाओ, बदलाव लाओ', en: '📢 Speak Up, Bring Change' },
    'hero.title.part1': { hi: 'हरदोई की ', en: 'Hardoi\'s ' },
    'hero.title.highlight': { hi: 'आवाज़', en: 'Voice' },
    'hero.title.part2': { hi: ' — अब दबेगी नहीं!', en: ' — Won\'t Be Suppressed!' },
    'hero.tagline': { hi: 'हरदोई की आवाज़, जनता की पहचान — हम हरदोई के नागरिकों की आवाज़ हैं', en: 'Hardoi\'s Voice, People\'s Identity — We are the voice of Hardoi\'s citizens' },
    'hero.cta.idcard': { hi: '🪪 आईडी कार्ड बनवाएं', en: '🪪 Get Your ID Card' },
    'hero.cta.join': { hi: '✊ आंदोलन से जुड़ें', en: '✊ Join Movement' },

    // Stats
    'stat.cards': { hi: 'आईडी कार्ड बने', en: 'ID Cards Generated' },
    'stat.supporters': { hi: 'समर्थक', en: 'Supporters' },
    'stat.issues': { hi: 'समस्याएं दर्ज', en: 'Issues Raised' },
    'stat.coverage': { hi: 'शहर कवरेज', en: 'City Coverage' },

    // ID Card page
    'idcard.title': { hi: '🪪 आईडी कार्ड जनरेटर', en: '🪪 ID Card Generator' },
    'idcard.subtitle': { hi: 'हरदोई की आवाज़ — अपना ऑफिशियल आईडी कार्ड बनाएं और मेंबर बनें', en: 'Hardoi ki Awaaz — Create Your Official ID Card and Become a Member' },
    'idcard.form.title': { hi: '📝 अपनी जानकारी भरें', en: '📝 Fill Your Details' },
    'idcard.form.name': { hi: 'पूरा नाम', en: 'Full Name' },
    'idcard.form.mobile': { hi: 'मोबाइल नंबर', en: 'Mobile Number' },
    'idcard.form.area': { hi: 'इलाका', en: 'Area' },
    'idcard.form.photo': { hi: 'फोटो (वैकल्पिक)', en: 'Photo (Optional)' },
    'idcard.form.submit': { hi: '🎫 आईडी कार्ड बनाएं', en: '🎫 Create ID Card' },
    'idcard.preview.title': { hi: '🪪 आपका आईडी कार्ड', en: '🪪 Your ID Card' },
    'idcard.preview.empty': { hi: 'फॉर्म भरें और आईडी कार्ड यहां दिखेगा', en: 'Fill the form and your ID card will appear here' },
    'idcard.btn.download': { hi: '📥 डाउनलोड पीएनजी', en: '📥 Download PNG' },
    'idcard.btn.share': { hi: '📤 शेयर करें', en: '📤 Share' },

    // Issues page
    'issues.title': { hi: '🔍 शहर की समस्याएं', en: '🔍 City Issues' },
    'issues.subtitle': { hi: 'अपनी समस्या फोटो के साथ भेजें | सपोर्ट करें | बदलाव लाएं', en: 'Submit your issue with photos | Support | Bring Change' },
    'issues.filter.all': { hi: '🌐 सभी', en: '🌐 All' },
    'issues.filter.user': { hi: '📸 उपयोगकर्ता', en: '📸 User Issues' },
    'issues.loading': { hi: '🔍 Issues लोड हो रहे हैं...', en: '🔍 Loading issues...' },
    'issues.empty': { hi: 'अभी तक कोई समस्या दर्ज नहीं हुई। पहले व्यक्ति बनें! 💪', en: 'No issues yet. Be the first one! 💪' },
    'issues.support.btn': { hi: '❤️ सपोर्ट करें', en: '❤️ Support' },
    'issues.supported': { hi: '✅ सपोर्ट किया', en: '✅ Supported' },
    'issues.reply.btn': { hi: '💬 जवाब दें', en: '💬 Reply' },

    // Protests
    'protests.upcoming': { hi: '✊ आगामी प्रदर्शन', en: '✊ Upcoming Protests' },
    'protests.past': { hi: '✅ सफल प्रदर्शन', en: '✅ Successful Protests' },

    // Contact
    'contact.title': { hi: '📞 संपर्क करें', en: '📞 Contact Us' },

    // Footer
    'footer.desc': { hi: 'हरदोई शहर के नागरिकों की आवाज़। हम बदलाव के लिए एक साथ खड़े हैं।', en: 'Voice of Hardoi\'s citizens. We stand together for change.' },

    // Thank you
    'thankyou.title': { hi: '🙏 धन्यवाद!', en: '🙏 Thank You!' },
    'thankyou.msg': { hi: 'आपके सपोर्ट के लिए शुक्रिया।', en: 'Thank you for your support.' },
    'thankyou.sub': { hi: 'हम जल्द ही बेहतर होंगे! 💪', en: 'We will be better soon! 💪' },
    'thankyou.detail': { hi: 'आपका सहयोग अनमोल है। Hardoi ki Awaaz आपके साथ है। साथ मिलकर हम हरदोई को बेहतर बनाएंगे।', en: 'Your support is invaluable. Hardoi ki Awaaz is with you. Together we will make Hardoi better.' },
    'thankyou.close': { hi: '🙏 बंद करें', en: '🙏 Close' },

    // Share
    'share.issue': { hi: '📤 शेयर करें', en: '📤 Share' },

    // Toast
    'toast.supported': { hi: 'आप पहले ही सपोर्ट कर चुके हैं! 🙏', en: 'You have already supported! 🙏' },
    'toast.reply.sent': { hi: '✅ आपका जवाब भेज दिया गया!', en: '✅ Your reply has been sent!' },
    'toast.reply.required': { hi: 'कृपया जवाब लिखें!', en: 'Please write a reply!' },
    'toast.reply.error': { hi: 'जवाब भेजने में समस्या हुई। बाद में प्रयास करें।', en: 'Error sending reply. Please try again later.' },
    'toast.idcard.created': { hi: 'आईडी कार्ड बन गया! 🎉', en: 'ID Card Created! 🎉' },
    'toast.idcard.downloaded': { hi: '✅ आईडी कार्ड डाउनलोड हो गया!', en: '✅ ID Card Downloaded!' },
    'toast.issue.submitted': { hi: '✅ आपकी समस्या दर्ज हो गई! अब सभी लोग देख सकते हैं 🙏', en: '✅ Your issue has been submitted! Now everyone can see it 🙏' },
    'toast.issue.submitted.local': { hi: '✅ समस्या दर्ज हो गई (लोकल बैकअप) 🙏', en: '✅ Issue saved (local backup) 🙏' },
    'toast.server.error': { hi: 'सर्वर से कनेक्ट नहीं हो पाया। बाद में पुनः प्रयास करें।', en: 'Could not connect to server. Please try again later.' },

    // Verification
    'verify.title': { hi: '✅ आईडी कार्ड वेरिफिकेशन', en: '✅ ID Card Verification' },
    'verify.desc': { hi: 'अपने आईडी कार्ड को वेरिफाई करें — नंबर डालकर चेक करें', en: 'Verify your ID Card — Enter the number to check' },
    'verify.placeholder': { hi: 'HKA-2026-XXXX', en: 'HKA-2026-XXXX' },
    'verify.btn': { hi: '✅ वेरिफाई करें', en: '✅ Verify' },
    'verify.valid': { hi: '✅ वेरिफाइड — ओरिजिनल आईडी कार्ड', en: '✅ Verified — Original ID Card' },
    'verify.invalid': { hi: '❌ अमान्य आईडी फॉर्मेट', en: '❌ Invalid ID Format' },
    'verify.notfound': { hi: '⚠️ यह आईडी कार्ड हमारे सिस्टम में नहीं मिला', en: '⚠️ This ID Card was not found in our system' },

    // News
    'news.loading': { hi: '📰 समाचार लोड हो रहे हैं...', en: '📰 Loading news...' },
    'news.readmore': { hi: '📖 और पढ़ें', en: '📖 Read More' },
  },

  t(key) {
    const entry = this.dict[key];
    if (!entry) return key;
    return entry[this.currentLang] || entry.hi || key;
  },

  toggle() {
    this.currentLang = this.currentLang === 'hi' ? 'en' : 'hi';
    localStorage.setItem('hka_lang', this.currentLang);
    this.apply();
    // Update all lang-toggle buttons
    document.querySelectorAll('#lang-toggle').forEach(btn => {
      btn.textContent = this.currentLang === 'hi' ? 'EN' : 'हिं';
    });
  },

  apply() {
    // Translate all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(el => {
      const key = el.getAttribute('data-lang');
      const translated = this.t(key);
      if (translated && translated !== key) {
        el.textContent = translated;
      }
    });

    // Translate nav links by href (no data-lang needed on HTML)
    const navMap = {
      'index.html': 'nav.home',
      'news.html': 'nav.news',
      'about.html': 'nav.about',
      'issues.html': 'nav.issues',
      'protest-schedule.html': 'nav.protests',
      'id-card.html': 'nav.idcard',
      'contact.html': 'nav.contact',
      'manifesto.html': 'nav.manifesto',
      'bulletin/index.html': 'nav.bulletin'
    };
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      // Handle both 'index.html' and '../index.html' (bulletin page)
      const key = navMap[href] || navMap[href?.replace('../', '')];
      if (key) a.textContent = this.t(key);
    });

    // Update page title from pathname
    const titles = {
      'index': { hi: 'हरदोई की आवाज़ | Hardoi ki Awaaz — नागरिकों की आवाज़, बदलाव की पहचान', en: 'Hardoi ki Awaaz — Citizen\'s Voice, Identity of Change' },
      'issues': { hi: 'Issues & Problems | हरदोई की आवाज़ — शहर की समस्याएं', en: 'Issues & Problems | Hardoi ki Awaaz — City Issues' },
      'id-card': { hi: 'ID Card Generator | हरदोई की आवाज़ — अपना Official ID Card बनाएं', en: 'ID Card Generator | Hardoi ki Awaaz — Create Your Official ID Card' },
      'news': { hi: 'News | हरदोई की आवाज़ — शहर की खबरें', en: 'News | Hardoi ki Awaaz — City News' },
      'about': { hi: 'About Us | हरदोई की आवाज़ — हमारी कहानी', en: 'About Us | Hardoi ki Awaaz — Our Story' },
      'contact': { hi: 'Contact | हरदोई की आवाज़ — हमसे जुड़ें', en: 'Contact | Hardoi ki Awaaz — Get In Touch' },
      'manifesto': { hi: 'Manifesto | हरदोई की आवाज़ — हमारी मांगें', en: 'Manifesto | Hardoi ki Awaaz — Our Demands' },
      'protest-schedule': { hi: 'Protest Schedule | हरदोई की आवाज़ — आंदोलन', en: 'Protest Schedule | Hardoi ki Awaaz — Movements' },
    };
    const path = window.location.pathname;
    let pageKey = 'index';
    if (path.includes('issues')) pageKey = 'issues';
    else if (path.includes('id-card')) pageKey = 'id-card';
    else if (path.includes('news')) pageKey = 'news';
    else if (path.includes('about')) pageKey = 'about';
    else if (path.includes('contact')) pageKey = 'contact';
    else if (path.includes('manifesto')) pageKey = 'manifesto';
    else if (path.includes('protest')) pageKey = 'protest-schedule';
    if (titles[pageKey]) document.title = titles[pageKey][this.currentLang];
  },

  init() {
    // Set initial lang on buttons
    document.querySelectorAll('#lang-toggle').forEach(btn => {
      btn.textContent = this.currentLang === 'hi' ? 'EN' : 'हिं';
      btn.addEventListener('click', () => this.toggle());
    });
    this.apply();
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  Translations.init();
});
