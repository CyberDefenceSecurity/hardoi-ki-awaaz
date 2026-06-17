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
    'hero.title.part1': { hi: 'हरदोई की ', en: "Hardoi's " },
    'hero.title.highlight': { hi: 'आवाज़', en: 'Voice' },
    'hero.title.part2': { hi: ' — अब दबेगी नहीं!', en: " — Won't Be Suppressed!" },
    'hero.tagline': { hi: 'हरदोई की आवाज़, जनता की पहचान — हम हरदोई के नागरिकों की आवाज़ हैं', en: "Hardoi's Voice, People's Identity — We are the voice of Hardoi's citizens" },
    'hero.cta.idcard': { hi: '🪪 आईडी कार्ड बनवाएं', en: '🪪 Get Your ID Card' },
    'hero.cta.join': { hi: '✊ आंदोलन से जुड़ें', en: '✊ Join Movement' },

    // Hero Homepage
    'hero.home.title': { hi: 'हरदोई की आवाज़ — Hardoi ki Awaaz', en: 'Hardoi ki Awaaz — Hardoi ki Awaaz' },
    'hero.home.desc': { hi: 'हरदोई शहर के नागरिकों का स्वतंत्र मंच — ID Card बनवाएं, समस्याएं दर्ज करें, प्रदर्शनों में शामिल हों, और शहर के विकास में अपना योगदान दें।', en: "Independent citizen platform of Hardoi city — Get ID Card, Report Issues, Join Protests, and contribute to the city's development." },
    'hero.home.cta.idcard': { hi: '🪪 ID Card बनाएं', en: '🪪 Create ID Card' },
    'hero.home.cta.issues': { hi: '📢 समस्या दर्ज करें', en: '📢 Report Issue' },
    'hero.home.cta.news': { hi: '📰 खबरें पढ़ें', en: '📰 Read News' },

    // Homepage sections
    'home.stats.title': { hi: '📊 हमारी ताकत — हमारे आंकड़े', en: '📊 Our Strength — Our Numbers' },
    'home.stats.subtitle': { hi: 'Hardoi ki Awaaz की बढ़ती ताकत — हर महीने बढ़ रहे हैं आंकड़े 📈', en: 'Growing strength of Hardoi ki Awaaz — Numbers increasing every month 📈' },
    'home.features.title': { hi: '🚀 हमारी सुविधाएं', en: '🚀 Our Features' },
    'home.features.subtitle': { hi: 'Hardoi ki Awaaz — आपकी आवाज़, आपकी पहचान', en: 'Hardoi ki Awaaz — Your Voice, Your Identity' },
    'home.social.title': { hi: '📱 हमसे जुड़ें — Social Media', en: '📱 Connect With Us — Social Media' },
    'home.social.subtitle': { hi: 'हरदोई की असलियत जानने के लिए फॉलो करें', en: 'Follow us to know the reality of Hardoi' },

    // Feature cards
    'feature.idcard.title': { hi: 'ID Card Generator', en: 'ID Card Generator' },
    'feature.idcard.desc': { hi: 'Hardoi ki Awaaz का Official ID Card मुफ्त में बनवाएं। अपनी पहचान बनाएं और आंदोलन का हिस्सा बनें।', en: 'Get your free official ID Card from Hardoi ki Awaaz. Create your identity and be part of the movement.' },
    'feature.issues.title': { hi: 'समस्या दर्ज करें', en: 'Report Issue' },
    'feature.issues.desc': { hi: 'शहर की समस्याएं देखें, support करें, और अपनी समस्या फोटो के साथ दर्ज करें।', en: 'View city issues, support, and submit your issue with photos.' },
    'feature.news.title': { hi: 'ताज़ा खबरें', en: 'Latest News' },
    'feature.news.desc': { hi: 'Hardoi और UP की लेटेस्ट अपडेट्स, खबरें, और सफलताएं एक ही जगह पढ़ें।', en: 'Read latest updates, news, and successes from Hardoi and UP in one place.' },
    'feature.protest.title': { hi: 'प्रदर्शन Schedule', en: 'Protest Schedule' },
    'feature.protest.desc': { hi: 'आगामी धरने, प्रदर्शन और जनसभाओं की जानकारी — शामिल हों और बदलाव लाएं।', en: 'Upcoming protests, demonstrations and public meetings — Join and bring change.' },
    'feature.manifesto.title': { hi: 'हमारा Manifesto', en: 'Our Manifesto' },
    'feature.manifesto.desc': { hi: 'हमारी मांगें और प्रगति — सड़क, पानी, बिजली, स्वास्थ्य, शिक्षा के लिए हमारा एजेंडा।', en: 'Our demands and progress — Our agenda for roads, water, electricity, health, education.' },
    'feature.about.title': { hi: 'हमारा मिशन', en: 'Our Mission' },
    'feature.about.desc': { hi: 'हम कौन हैं, हम क्या करते हैं — हरदोई की आवाज़ के बारे में जानें और जुड़ें।', en: 'Who we are, what we do — Learn about Hardoi ki Awaaz and join us.' },

    // Stats
    'stat.cards': { hi: 'आईडी कार्ड बने', en: 'ID Cards Generated' },
    'stat.supporters': { hi: 'समर्थक', en: 'Supporters' },
    'stat.issues': { hi: 'समस्याएं दर्ज', en: 'Issues Raised' },
    'stat.coverage': { hi: 'शहर कवरेज', en: 'City Coverage' },

    // Footer
    'footer.tagline': { hi: '🎙️ हरदोई की आवाज़', en: '🎙️ Hardoi ki Awaaz' },
    'footer.desc': { hi: 'हरदोई शहर के नागरिकों की आवाज़ — Hardoi ki Awaaz, Hardoi ki Asliyat। हम बदलाव के लिए एक साथ खड़े हैं। स्वतंत्र नागरिक मंच, किसी भी राजनीतिक दल से संबद्ध नहीं।', en: "Voice of Hardoi's citizens — Hardoi ki Awaaz, Hardoi ki Asliyat. We stand together for change. Independent citizen platform, not affiliated to any political party." },
    'footer.quicklinks': { hi: 'Quick Links', en: 'Quick Links' },
    'footer.services': { hi: 'सेवाएं', en: 'Services' },
    'footer.followus': { hi: 'हमें फॉलो करें', en: 'Follow Us' },
    'footer.social.desc': { hi: 'Hardoi ki Asliyat — Social Media', en: 'Hardoi ki Asliyat — Social Media' },
    'footer.newsletter': { hi: 'न्यूज़लेटर', en: 'Newsletter' },
    'footer.copyright': { hi: '© 2026 Hardoi ki Awaaz. Citizen Powered. | स्वतंत्र नागरिक मंच — किसी भी राजनीतिक दल से संबद्ध नहीं।', en: '© 2026 Hardoi ki Awaaz. Citizen Powered. | Independent citizen platform — not affiliated to any political party.' },

    // ID Card page
    'idcard.title': { hi: '🪪 आईडी कार्ड जनरेटर', en: '🪪 ID Card Generator' },
    'idcard.subtitle': { hi: 'Hardoi ki Awaaz — अपना ऑफिशियल आईडी कार्ड बनाएं और मेंबर बनें', en: 'Hardoi ki Awaaz — Create Your Official ID Card and Become a Member' },
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
    'idcard.steps.title': { hi: '📋 ID Card कैसे बनाएं?', en: '📋 How to Create ID Card?' },
    'idcard.step1.title': { hi: '📝 Form भरें', en: '📝 Fill Form' },
    'idcard.step1.desc': { hi: 'अपना नाम, मोबाइल और इलाका फॉर्म में डालें', en: 'Enter your name, mobile and area in the form' },
    'idcard.step2.title': { hi: '📸 Photo लगाएं', en: '📸 Add Photo' },
    'idcard.step2.desc': { hi: 'वैकल्पिक फोटो अपलोड करें (या अवतार इस्तेमाल होगा)', en: 'Upload optional photo (or avatar will be used)' },
    'idcard.step3.title': { hi: '⬇️ Download करें', en: '⬇️ Download' },
    'idcard.step3.desc': { hi: 'अपना ऑफिशियल ID Card डाउनलोड करें', en: 'Download your official ID Card' },
    'idcard.saved.title': { hi: '📂 आपके सेव किए गए कार्ड', en: '📂 Your Saved Cards' },

    // ID Card Generator form labels
    'idcard.form.tag': { hi: 'Your Tag / Hashtag (वैकल्पिक)', en: 'Your Tag / Hashtag (Optional)' },
    'idcard.form.tag.desc': { hi: 'अपना हैशटैग या स्लोगन लिखें जो ID Card पर दिखेगा', en: 'Write your hashtag or slogan that will appear on the ID Card' },
    'idcard.form.photo.hint': { hi: '📷 क्लिक करें या फोटो यहां ड्रैग करें', en: '📷 Click or drag photo here' },
    'idcard.form.photo.size': { hi: 'JPG, PNG, WebP up to 5MB', en: 'JPG, PNG, WebP up to 5MB' },

    // Verification
    'verify.title': { hi: '✅ आईडी कार्ड वेरिफिकेशन', en: '✅ ID Card Verification' },
    'verify.desc': { hi: 'अपने आईडी कार्ड को वेरिफाई करें — नंबर डालकर चेक करें', en: 'Verify your ID Card — Enter the number to check' },
    'verify.placeholder': { hi: 'HKA-2026-XXXX', en: 'HKA-2026-XXXX' },
    'verify.btn': { hi: '✅ वेरिफाई करें', en: '✅ Verify' },
    'verify.valid': { hi: '✅ वेरिफाइड — ओरिजिनल आईडी कार्ड', en: '✅ Verified — Original ID Card' },
    'verify.invalid': { hi: '❌ अमान्य आईडी फॉर्मेट', en: '❌ Invalid ID Format' },
    'verify.notfound': { hi: '⚠️ यह आईडी कार्ड हमारे सिस्टम में नहीं मिला', en: '⚠️ This ID Card was not found in our system' },

    // Issues page
    'issues.title': { hi: '🔍 शहर की समस्याएं', en: '🔍 City Issues' },
    'issues.subtitle': { hi: 'अपनी समस्या फोटो के साथ भेजें | सपोर्ट करें | बदलाव लाएं', en: 'Submit your issue with photos | Support | Bring Change' },
    'issues.section.prominent': { hi: '📋 शहर की प्रमुख समस्याएं', en: '📋 Prominent City Issues' },
    'issues.section.user': { hi: '📸 जनता द्वारा भेजी गई समस्याएं', en: '📸 Issues Submitted by Citizens' },
    'issues.section.user.desc': { hi: 'फोटो और मैसेज के साथ दर्ज की गई समस्याएं', en: 'Issues submitted with photos and messages' },
    'issues.filter.all': { hi: '🌐 सभी', en: '🌐 All' },
    'issues.filter.roads': { hi: '🛤️ सड़क', en: '🛤️ Roads' },
    'issues.filter.water': { hi: '💧 पानी', en: '💧 Water' },
    'issues.filter.electricity': { hi: '⚡ बिजली', en: '⚡ Electricity' },
    'issues.filter.health': { hi: '🏥 स्वास्थ्य', en: '🏥 Health' },
    'issues.filter.education': { hi: '📚 शिक्षा', en: '📚 Education' },
    'issues.filter.safety': { hi: '🛡️ सुरक्षा', en: '🛡️ Safety' },
    'issues.filter.garbage': { hi: '🗑️ कचरा', en: '🗑️ Garbage' },
    'issues.filter.user': { hi: '📸 User Issues', en: '📸 User Issues' },
    'issues.loading': { hi: '🔍 Issues लोड हो रहे हैं...', en: '🔍 Loading issues...' },
    'issues.empty': { hi: 'अभी तक कोई समस्या दर्ज नहीं हुई। पहले व्यक्ति बनें! 💪', en: "No issues yet. Be the first one! 💪" },
    'issues.status.active': { hi: '⚠️ सक्रिय', en: '⚠️ Active' },
    'issues.status.resolved': { hi: '✅ हल हो गई', en: '✅ Resolved' },
    'issues.status.inprogress': { hi: '🟠 प्रगति में', en: '🟠 In Progress' },
    'issues.support.btn': { hi: '❤️ सपोर्ट करें', en: '❤️ Support' },
    'issues.supported': { hi: '✅ सपोर्ट किया', en: '✅ Supported' },
    'issues.reply.btn': { hi: '💬 जवाब दें', en: '💬 Reply' },
    'issues.reply.placeholder': { hi: 'इस समस्या पर अपनी टिप्पणी लिखें...', en: 'Write your comment on this issue...' },
    'issues.comment.btn': { hi: '💬 टिप्पणी करें', en: '💬 Comment' },
    'issues.comments': { hi: '💬 टिप्पणियाँ', en: '💬 Comments' },
    'issues.noreplies': { hi: 'अभी तक कोई जवाब नहीं। पहले जवाब दें! 💬', en: 'No replies yet. Be the first to reply! 💬' },
    'issues.comments.count': { hi: 'टिप्पणियाँ', en: 'Comments' },
    'issues.nocomments': { hi: 'अभी तक कोई टिप्पणी नहीं। पहली टिप्पणी करें! 💬', en: 'No comments yet. Leave the first comment! 💬' },
    'issues.delete.btn': { hi: '🗑️ मेरी समस्या हटाएं', en: '🗑️ Delete My Issue' },
    'issues.delete.confirm': { hi: 'क्या आप वाकई अपनी समस्या हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।', en: 'Are you sure you want to delete your issue? This action cannot be undone.' },
    'issues.delete.denied': { hi: 'आप केवल अपनी समस्या हटा सकते हैं!', en: 'You can only delete your own issue!' },
    'issues.deleted': { hi: '✅ आपकी समस्या हटा दी गई!', en: '✅ Your issue has been deleted!' },

    // Upload form
    'upload.title': { hi: '📢 अपनी समस्या दर्ज करें', en: '📢 Submit Your Issue' },
    'upload.subtitle': { hi: 'Photo और Message भेजें — हमारा सिस्टम जाँच करेगा कि यह वास्तविक समस्या है या नहीं', en: 'Send Photo and Message — Our system will verify this is a genuine issue' },
    'upload.dropzone': { hi: '📷 फोटो यहाँ खींचें या क्लिक करें', en: '📷 Drag photos here or click' },
    'upload.dropzone.hint': { hi: 'JPG, PNG, WebP (Max 5MB) — अनुचित फोटो तुरंत ब्लॉक होंगे', en: 'JPG, PNG, WebP (Max 5MB) — Inappropriate photos will be blocked immediately' },
    'upload.name.placeholder': { hi: 'आपका नाम (Optional)', en: 'Your Name (Optional)' },
    'upload.category.placeholder': { hi: 'समस्या का प्रकार चुनें', en: 'Select issue category' },
    'upload.message.placeholder': { hi: 'अपनी समस्या विस्तार से बताएं... (कम से कम 10 शब्द)', en: 'Describe your issue in detail... (at least 10 words)' },
    'upload.location.placeholder': { hi: '📍 समस्या का स्थान चुनें — गाँव/इलाका', en: '📍 Select issue location — Village/Area' },
    'upload.location.custom': { hi: 'अपने गाँव/इलाके का नाम लिखें', en: 'Write your village/area name' },
    'upload.map.btn': { hi: '🗺️ मैप से लोकेशन चुनें', en: '🗺️ Select location from map' },
    'upload.custom.btn': { hi: '✏️ खुद लिखें', en: '✏️ Write manually' },
    'upload.agree': { hi: '✅ मैं पुष्टि करता हूँ कि यह एक वास्तविक समस्या है और कोई अनुचित सामग्री नहीं है', en: '✅ I confirm this is a genuine issue and contains no inappropriate content' },
    'upload.submit': { hi: '📤 समस्या भेजें', en: '📤 Submit Issue' },
    'upload.checking': { hi: '⏳ जाँच की जा रही है...', en: '⏳ Checking...' },
    'upload.invalid.type': { hi: 'केवल JPG, PNG, WebP images allowed!', en: 'Only JPG, PNG, WebP images allowed!' },
    'upload.file.too.large': { hi: 'File 5MB से बड़ी है!', en: 'File exceeds 5MB!' },
    'upload.blocked': { hi: 'अनुचित सामग्री ब्लॉक की गई!', en: 'Inappropriate content blocked!' },
    'upload.sending': { hi: '⏳ भेजा जा रहा है...', en: '⏳ Sending...' },

    // Protests page
    'protests.title': { hi: '✊ प्रदर्शन Schedule', en: '✊ Protest Schedule' },
    'protests.subtitle': { hi: 'आगामी धरने, प्रदर्शन और जनसभाओं की जानकारी', en: 'Upcoming protests, demonstrations and public meetings' },
    'protests.upcoming': { hi: '✊ आगामी प्रदर्शन', en: '✊ Upcoming Protests' },
    'protests.past': { hi: '✅ पिछले प्रदर्शन', en: '✅ Past Protests' },
    'protests.gallery': { hi: '📸 प्रदर्शन की तस्वीरें', en: '📸 Protest Photos' },
    'protests.gallery.desc': { hi: 'प्रदर्शनों की तस्वीरें — हरदोई की आवाज़', en: 'Protest photos — Hardoi ki Awaaz' },
    'protests.rsvp': { hi: '✅ RSVP — Join', en: '✅ RSVP — Join' },
    'protests.share': { hi: '📤 Share', en: '📤 Share' },
    'protests.rsvp.done': { hi: '✅ Confirmed!', en: '✅ Confirmed!' },
    'protests.rsvp.already': { hi: 'आप पहले ही RSVP कर चुके हैं! 🙏', en: 'You have already RSVPed! 🙏' },

    // Contact page
    'contact.title': { hi: '📞 संपर्क करें', en: '📞 Contact Us' },
    'contact.subtitle': { hi: 'अपनी समस्या भेजें | सवाल पूछें | जुड़ें', en: 'Send your issue | Ask questions | Connect' },
    'contact.direct': { hi: '📱 सीधे संपर्क करें', en: '📱 Direct Contact' },
    'contact.form.title': { hi: '📝 संदेश भेजें', en: '📝 Send Message' },
    'contact.form.name': { hi: 'आपका नाम *', en: 'Your Name *' },
    'contact.form.mobile': { hi: 'मोबाइल नंबर *', en: 'Mobile Number *' },
    'contact.form.area': { hi: 'इलाका / Area', en: 'Area' },
    'contact.form.category': { hi: 'समस्या का प्रकार', en: 'Issue Type' },
    'contact.form.message': { hi: 'अपनी समस्या विस्तार से बताएं...', en: 'Describe your issue in detail...' },
    'contact.form.submit': { hi: '📤 संदेश भेजें', en: '📤 Send Message' },
    'contact.form.hint': { hi: 'दिए गए contacts पर भी अपनी problems share कर सकते हैं 📱', en: 'You can also share your problems on the given contacts 📱' },
    'contact.map.title': { hi: '🗺️ Hardoi, Uttar Pradesh', en: '🗺️ Hardoi, Uttar Pradesh' },
    'contact.map.desc': { hi: 'Hardoi City Map — 27.19°N, 80.13°E', en: 'Hardoi City Map — 27.19°N, 80.13°E' },

    // About page
    'about.title': { hi: 'हरदोई की आवाज़ के बारे में', en: 'About Hardoi ki Awaaz' },
    'about.tagline': { hi: 'हम एक स्वतंत्र नागरिक मंच हैं — किसी भी राजनीतिक दल से संबद्ध नहीं', en: 'We are an independent citizen platform — not affiliated to any political party' },
    'about.mission.title': { hi: '🎯 हमारा मिशन', en: '🎯 Our Mission' },
    'about.mission.desc': { hi: '"हरदोई की आवाज़" हरदोई शहर के नागरिकों को एक मंच पर लाने का प्रयास है। हमारा उद्देश्य शहर की समस्याओं को उजागर करना, नागरिकों की आवाज़ को मजबूत बनाना, और शहर के विकास में सक्रिय भूमिका निभाना है।', en: '"Hardoi ki Awaaz" is an effort to bring the citizens of Hardoi city on one platform. Our aim is to highlight city issues, strengthen citizens\' voice, and play an active role in the city\'s development.' },
    'about.who.title': { hi: '📋 हम कौन हैं?', en: '📋 Who Are We?' },
    'about.who.desc': { hi: 'हम हरदोई के आम नागरिक हैं — छात्र, व्यापारी, किसान, शिक्षक, और कामगार। हम किसी पार्टी से नहीं, बल्कि शहर के लोगों से जुड़े हैं। हमारा एक ही मकसद है — हरदोई को बेहतर बनाना।', en: 'We are ordinary citizens of Hardoi — students, traders, farmers, teachers, and workers. We are not connected to any party, but to the people of the city. Our only goal is to make Hardoi better.' },
    'about.what.title': { hi: '🔥 हम क्या करते हैं?', en: '🔥 What We Do?' },
    'about.what.list1': { hi: 'शहर की समस्याओं का दस्तावेज़ीकरण और प्रसार', en: 'Documentation and dissemination of city issues' },
    'about.what.list2': { hi: 'नागरिकों को Digital ID Card प्रदान करना', en: 'Providing Digital ID Cards to citizens' },
    'about.what.list3': { hi: 'शांतिपूर्ण विरोध प्रदर्शनों का आयोजन', en: 'Organizing peaceful protests' },
    'about.what.list4': { hi: 'सोशल मीडिया पर जन जागरूकता अभियान', en: 'Public awareness campaigns on social media' },
    'about.what.list5': { hi: 'प्रशासन के साथ संवाद और समाधान की मांग', en: 'Dialogue with administration and demand for solutions' },
    'about.join.title': { hi: '📌 हमसे जुड़ें', en: '📌 Join Us' },
    'about.join.desc': { hi: 'अगर आप भी हरदोई के बदलाव में योगदान देना चाहते हैं, तो अभी जुड़ें:', en: 'If you also want to contribute to the change in Hardoi, join now:' },

    // Manifesto page
    'manifesto.title': { hi: '📜 हमारी मांगें — Manifesto', en: '📜 Our Demands — Manifesto' },
    'manifesto.subtitle': { hi: 'हरदोई के विकास के लिए हमारी बढ़ती मांगें — समाचार के अनुसार अपडेट होती रहती हैं 📈', en: 'Our growing demands for Hardoi\'s development — Updated according to news 📈' },
    'manifesto.cta.title': { hi: '✊ इन मांगों का समर्थन करें!', en: '✊ Support These Demands!' },
    'manifesto.cta.subtitle': { hi: 'ID Card बनवाएं और बदलाव का हिस्सा बनें', en: 'Get ID Card and be part of the change' },
    'manifesto.cta.btn': { hi: '🪪 ID Card बनाएं', en: '🪪 Create ID Card' },
    'manifesto.progress': { hi: 'प्रगति', en: 'Progress' },

    // Bulletin page
    'bulletin.title': { hi: '📰 बुलेटिन — ताज़ा खबरें', en: '📰 Bulletin — Latest News' },
    'bulletin.subtitle': { hi: 'Hardoi और आसपास के अपडेट्स', en: 'Hardoi and surrounding updates' },
    'bulletin.featured': { hi: '🔥 Featured', en: '🔥 Featured' },
    'bulletin.recent': { hi: '📋 हाल के अपडेट्स', en: '📋 Recent Updates' },
    'bulletin.success': { hi: '✅ Success', en: '✅ Success' },
    'bulletin.update': { hi: '📢 Update', en: '📢 Update' },
    'bulletin.alert': { hi: '⚠️ Alert', en: '⚠️ Alert' },
    'bulletin.minread': { hi: 'मिनट पढ़ें', en: 'min read' },

    // News
    'news.title': { hi: '📰 ताज़ा खबरें', en: '📰 Latest News' },
    'news.subtitle': { hi: 'हरदोई और उत्तर प्रदेश की लेटेस्ट अपडेट्स', en: 'Latest updates from Hardoi and Uttar Pradesh' },
    'news.loading': { hi: '📰 समाचार लोड हो रहे हैं...', en: '📰 Loading news...' },
    'news.readmore': { hi: '📖 पूरा पढ़ें →', en: '📖 Read More →' },
    'news.all': { hi: '📰 सभी खबरें देखें →', en: '📰 See All News →' },
    'news.error': { hi: 'News fetch नहीं हो पाई', en: 'Could not fetch news' },
    'news.error.desc': { hi: 'Backend API से कनेक्ट नहीं हो पाया। कृपया पुनः प्रयास करें।', en: 'Could not connect to backend API. Please try again.' },
    'news.retry': { hi: '🔄 दोबारा प्रयास करें', en: '🔄 Retry' },
    'news.none': { hi: 'कोई खबर नहीं है', en: 'No news available' },
    'news.footer.desc': { hi: 'हरदोई शहर के नागरिकों की आवाज़। हम बदलाव के लिए एक साथ खड़े हैं।', en: "Voice of Hardoi's citizens. We stand together for change." },
    'news.refresh': { hi: '🔄 Refresh', en: '🔄 Refresh' },
    'news.refreshing': { hi: '⏳ Refreshing...', en: '⏳ Refreshing...' },
    'news.search.placeholder': { hi: '🔍 खबरें खोजें...', en: '🔍 Search news...' },
    'news.search.noresults': { hi: 'से कोई मैच नहीं मिला', en: 'No matches found for' },
    'news.search.try': { hi: 'दूसरे कीवर्ड से प्रयास करें', en: 'Try with different keywords' },
    'news.close': { hi: '✕ बंद करें', en: '✕ Close' },
    'news.share': { hi: '📤 Share करें', en: '📤 Share' },

    // Comments
    'comments.title': { hi: '💬 टिप्पणियां', en: '💬 Comments' },
    'comments.nocomments': { hi: 'अभी तक कोई टिप्पणी नहीं। पहली टिप्पणी करें!', en: 'No comments yet. Be the first to comment!' },
    'comments.nameplaceholder': { hi: 'आपका नाम', en: 'Your Name' },
    'comments.placeholder': { hi: 'अपनी टिप्पणी लिखें...', en: 'Write your comment...' },
    'comments.submit': { hi: '✅ भेजें', en: '✅ Submit' },
    'comments.added': { hi: '✅ टिप्पणी जोड़ दी गई!', en: '✅ Comment added!' },
    'comments.replybtn': { hi: '↩️ जवाब दें', en: '↩️ Reply' },
    'comments.replyplaceholder': { hi: 'जवाब लिखें...', en: 'Write reply...' },
    'comments.writereply': { hi: 'जवाब लिखें...', en: 'Write reply...' },

    // Share
    'share.issue': { hi: '📤 Share', en: '📤 Share' },

    // Map
    'map.title': { hi: '🗺️ अपनी लोकेशन चुनें', en: '🗺️ Select Your Location' },
    'map.locate.error': { hi: 'आपके ब्राउज़र में GPS की सुविधा नहीं है।', en: 'Your browser does not have GPS capability.' },
    'map.locate.fail': { hi: 'लोकेशन नहीं मिल पाई। GPS चालू करें या मैप पर क्लिक करें।', en: 'Could not find location. Enable GPS or click on map.' },
    'map.permission.denied': { hi: '📍 लोकेशन की अनुमति नहीं दी गई। कृपया मैप पर क्लिक करके लोकेशन चुनें।', en: '📍 Location permission denied. Please click on the map to select location.' },
    'map.select.error': { hi: 'कृपया मैप पर अपनी लोकेशन चुनें!', en: 'Please select your location on the map!' },
    'map.click': { hi: '🖱️ मैप पर क्लिक करके अपनी लोकेशन चुनें', en: '🖱️ Click on the map to select your location' },
    'map.locate': { hi: '📍 मेरी लोकेशन', en: '📍 My Location' },
    'map.locating': { hi: '⏳ खोज रहा है...', en: '⏳ Locating...' },
    'map.confirm': { hi: '✅ चुनें', en: '✅ Select' },
    'map.loading': { hi: '⏳ लोकेशन की जानकारी लाई जा रही है...', en: '⏳ Fetching location info...' },
    'map.notfound': { hi: '⚠️ मैप लोड नहीं हो पाया। कृपया पुनः प्रयास करें।', en: '⚠️ Could not load map. Please try again.' },
    'map.selected': { hi: '✅ लोकेशन चुन ली गई:', en: '✅ Location selected:' },

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
    'toast.issue.submitted.check': { hi: 'कृपया पुष्टि करें कि यह एक वास्तविक समस्या है!', en: 'Please confirm this is a genuine issue!' },
    'toast.issue.location': { hi: 'कृपया समस्या का स्थान चुनें (गाँव/इलाका)!', en: 'Please select the issue location (village/area)!' },
    'toast.issue.category': { hi: 'कृपया समस्या का प्रकार चुनें!', en: 'Please select the issue category!' },
    'toast.issue.detail': { hi: 'कृपया समस्या विस्तार से लिखें (कम से कम 10 शब्द)!', en: 'Please describe the issue in detail (at least 10 words)!' },

    // Thank you modal
    'thankyou.title': { hi: '🙏 धन्यवाद!', en: '🙏 Thank You!' },
    'thankyou.msg': { hi: 'आपके सपोर्ट के लिए शुक्रिया।', en: 'Thank you for your support.' },
    'thankyou.sub': { hi: 'हम जल्द ही बेहतर होंगे! 💪', en: 'We will be better soon! 💪' },
    'thankyou.detail': { hi: 'आपका सहयोग अनमोल है। Hardoi ki Awaaz आपके साथ है। साथ मिलकर हम हरदोई को बेहतर बनाएंगे।', en: 'Your support is invaluable. Hardoi ki Awaaz is with you. Together we will make Hardoi better.' },
    'thankyou.close': { hi: '🙏 बंद करें', en: '🙏 Close' },

    // Category names
    'cat.roads': { hi: 'सड़क/रास्ते', en: 'Roads/Paths' },
    'cat.water': { hi: 'पानी/नाली', en: 'Water/Drainage' },
    'cat.electricity': { hi: 'बिजली', en: 'Electricity' },
    'cat.health': { hi: 'स्वास्थ्य', en: 'Health' },
    'cat.education': { hi: 'शिक्षा', en: 'Education' },
    'cat.safety': { hi: 'सुरक्षा', en: 'Safety' },
    'cat.garbage': { hi: 'कचरा/सफाई', en: 'Garbage/Cleaning' },
    'cat.other': { hi: 'अन्य', en: 'Other' },

    // Status
    'status.active': { hi: 'सक्रिय', en: 'Active' },
    'status.inprogress': { hi: 'प्रगति में', en: 'In Progress' },
    'status.resolved': { hi: 'हल हो गई', en: 'Resolved' },

    // Misc buttons
    'btn.close': { hi: '✕ बंद करें', en: '✕ Close' },
    'btn.submit': { hi: '➡️ भेजें', en: '➡️ Submit' },
    'btn.send': { hi: '➡️ भेजें', en: '➡️ Send' },
    'btn.share': { hi: '📤 Share', en: '📤 Share' },
    'btn.closeModal': { hi: '🙏 बंद करें', en: '🙏 Close' },

    // ID card generator page
    'idcard.name.label': { hi: 'पूरा नाम / Full Name', en: 'Full Name' },
    'idcard.name.placeholder': { hi: 'अपना नाम लिखें', en: 'Enter your name' },
    'idcard.mobile.placeholder': { hi: '9876543210', en: '9876543210' },
    'idcard.area.placeholder': { hi: '— अपना गाँव/इलाका चुनें —', en: '— Select your village/area —' },
    'idcard.area.gps': { hi: '📍 अपनी लोकेशन शेयर करें', en: '📍 Share Your Location' },
    'idcard.area.write': { hi: '✏️ खुद लिखें', en: '✏️ Write manually' }
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
        // Handle different element types
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', translated);
          } else {
            el.value = translated;
          }
        } else {
          el.textContent = translated;
        }
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
      'index': { hi: 'हरदोई की आवाज़ | Hardoi ki Awaaz — नागरिकों की आवाज़, बदलाव की पहचान', en: "Hardoi ki Awaaz — Citizen's Voice, Identity of Change" },
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

    // Re-apply any page-specific custom translations
    if (typeof window._applyPageTranslations === 'function') {
      window._applyPageTranslations();
    }
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
