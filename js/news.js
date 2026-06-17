/* ============================================
   Hardoi ki Awaaz - News System
   Fetches from backend API (configured by user)
   Auto-updates, detail modal for full articles
   ============================================ */

const HKANews = {
  // Config — backend URL
  API_ENDPOINT: 'https://hardoi-ki-awaaz-backend.onrender.com/api/news',
  REFRESH_INTERVAL: 300000, // 5 min auto-refresh

  // State
  articles: [],
  currentArticle: null,
  refreshTimer: null,
  isLoaded: false,

  /* ---------- Fetch News ---------- */
  async fetchNews() {
    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-cache'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }

      return data.map((a, i) => ({
        id: a.id || `news-${i}-${a.title ? a.title.substring(0,10).replace(/\s/g,'-') : Date.now()}`,
        title: a.title || 'Hardoi ki Awaaz News',
        summary: a.summary || '',
        content: a.content || a.summary || '',
        image_url: a.image_url || null,
        image_credit: a.image_credit || '',
        category: a.category || 'Announcement',
        date: a.date || new Date().toISOString(),
        location: a.location || 'Hardoi, UP',
        source: a.source || 'हरदोई की आवाज़'
      }));
    } catch (err) {
      console.error('News fetch error:', err);
      return null;
    }
  },

  /* ---------- Fallback (when API is not ready) ---------- */
  getFallbackArticles() {
    return [
      {
        id: 'fallback-1',
        title: 'हरदोई की आवाज़ — जनता की आवाज़',
        summary: 'हम हरदोई के नागरिकों की आवाज़ हैं। शहर की समस्याओं को उजागर करना और बदलाव लाना हमारा मिशन है।',
        content: '<p>हरदोई की आवाज़ एक स्वतंत्र नागरिक मंच है। हम किसी भी राजनीतिक दल से संबद्ध नहीं हैं।</p><p>हमारा उद्देश्य हरदोई शहर की समस्याओं को उजागर करना, नागरिकों को एकजुट करना, और प्रशासन से समाधान की मांग करना है।</p><p>आज ही हमारे साथ जुड़ें और बदलाव का हिस्सा बनें। अपना ID Card बनवाएं, अपनी समस्या दर्ज करें, और हमारे सोशल मीडिया चैनलों से जुड़ें।</p>',
        image_url: null,
        image_credit: '',
        category: 'Featured',
        date: new Date().toISOString(),
        location: 'Hardoi, Uttar Pradesh',
        source: 'हरदोई की आवाज़'
      },
      {
        id: 'fallback-2',
        title: 'ID Card बनवाएं — अपनी पहचान बनाएं',
        summary: 'Hardoi ki Awaaz का Official ID Card बनवाएं और इस आंदोलन का हिस्सा बनें। फ्री में बनवाएं और डाउनलोड करें।',
        content: '<p>Hardoi ki Awaaz का Official ID Card अब बिल्कुल फ्री में बनवाएं। यह आपकी पहचान है, आपकी आवाज़ की ताकत है।</p><p>ID Card बनवाने के लिए बस अपना नाम, मोबाइल नंबर और इलाका दर्ज करें। चाहें तो फोटो भी लगा सकते हैं।</p><p><a href="id-card.html">यहाँ क्लिक करें →</a></p>',
        image_url: null,
        image_credit: '',
        category: 'Announcement',
        date: new Date().toISOString(),
        location: 'Hardoi, UP',
        source: 'हरदोई की आवाज़'
      },
      {
        id: 'fallback-3',
        title: 'बदलाव के लिए एकजुट हों',
        summary: 'हरदोई की आवाज़ एक नागरिक-संचालित प्लेटफॉर्म है। हमारे साथ जुड़ें और शहर को बेहतर बनाएं।',
        content: '<p>हरदोई की आवाज़ के साथ जुड़कर आप अपने शहर की बेहतरी में योगदान दे सकते हैं।</p><p>हमारे Discord, Telegram, Instagram और WhatsApp चैनलों से जुड़ें। अपनी समस्याएं साझा करें, प्रदर्शनों में हिस्सा लें, और बदलाव का हिस्सा बनें।</p><p>साथ मिलकर हम हरदोई को बेहतर बना सकते हैं।</p>',
        image_url: null,
        image_credit: '',
        category: 'Announcement',
        date: new Date().toISOString(),
        location: 'Hardoi',
        source: 'हरदोई की आवाज़'
      }
    ];
  },

  /* ---------- Category Styles ---------- */
  getCategoryStyle(category) {
    const styles = {
      'Protest': { bg: 'linear-gradient(135deg,#b71c1c,#c62828)', emoji: '✊' },
      'Water': { bg: 'linear-gradient(135deg,#0d47a1,#1565c0)', emoji: '💧' },
      'Electricity': { bg: 'linear-gradient(135deg,#f57f17,#ff8f00)', emoji: '⚡' },
      'Infrastructure': { bg: 'linear-gradient(135deg,#e65100,#ff6f00)', emoji: '🛤️' },
      'Education': { bg: 'linear-gradient(135deg,#1b5e20,#388e3c)', emoji: '📚' },
      'Health': { bg: 'linear-gradient(135deg,#1b5e20,#2e7d32)', emoji: '🏥' },
      'Safety': { bg: 'linear-gradient(135deg,#4a148c,#7b1fa2)', emoji: '🛡️' },
      'Environment': { bg: 'linear-gradient(135deg,#00695c,#00897b)', emoji: '🌿' },
      'Development': { bg: 'linear-gradient(135deg,#0d47a1,#1976d2)', emoji: '🏗️' },
      'Announcement': { bg: 'linear-gradient(135deg,#ff6f00,#ff8f00)', emoji: '📢' },
      'Meeting': { bg: 'linear-gradient(135deg,#4a148c,#6a1b9a)', emoji: '🤝' },
      'Featured': { bg: 'linear-gradient(135deg,#1a237e,#283593)', emoji: '⭐' },
      'Government': { bg: 'linear-gradient(135deg,#0d47a1,#1976d2)', emoji: '🏛️' },
      'Success': { bg: 'linear-gradient(135deg,#1b5e20,#2e7d32)', emoji: '✅' },
      'Alert': { bg: 'linear-gradient(135deg,#b71c1c,#d32f2f)', emoji: '⚠️' }
    };
    return styles[category] || { bg: 'linear-gradient(135deg,#37474f,#455a64)', emoji: '📰' };
  },

  /* ---------- Format Date ---------- */
  formatDate(dateStr) {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('hi-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  },

  /* ---------- Show Loading ---------- */
  showLoading(container) {
    var loadingMsg = (typeof Translations !== 'undefined') ? Translations.t('news.loading') : '📰 News load ho rahi hai...';
    container.innerHTML = `
      <div class="news-loading">
        <div class="news-loading-spinner"></div>
        <p>${loadingMsg}</p>
      </div>
    `;
  },

  /* ---------- Show Error ---------- */
  showError(container) {
    var reloadBtn = (typeof Translations !== 'undefined') ? Translations.t('news.retry') : '🔄 Dobara try karein';
    var errTitle = (typeof Translations !== 'undefined') ? Translations.t('news.error') : 'News fetch nahi ho paai';
    var errDesc = (typeof Translations !== 'undefined') ? Translations.t('news.error.desc') : 'Backend API se konekt nahi ho paaya.';
    container.innerHTML = `
      <div class="news-error">
        <span style="font-size:3rem;display:block;margin-bottom:0.5rem;">⚠️</span>
        <h3>${errTitle}</h3>
        <p style="color:var(--text-light);">${errDesc}</p>
        <button onclick="HKANews.loadNews()" class="cta-btn" style="margin-top:1rem;">${reloadBtn}</button>
      </div>
    `;
  },

  /* ---------- Open Detail Modal ---------- */
  openDetail(article) {
    this.currentArticle = article;
    const overlay = document.getElementById('news-detail-overlay');
    const content = document.getElementById('news-detail-content');
    if (!overlay || !content) return;

    const style = this.getCategoryStyle(article.category);
    const date = this.formatDate(article.date);
    
    // Generate Picsum fallback URL for detail image
    var detailImgStyle = style.bg;
    if (article.image_url) {
      var picsumSeed = encodeURIComponent((article.title || 'news') + '-detail');
      var fallbackPicsum = 'https://picsum.photos/seed/' + picsumSeed + '/800/600';
      detailImgStyle = style.bg + ';background-image:url(' + article.image_url + ');background-size:cover;background-position:center;background-blend-mode:overlay;';
      // Add fallback via a small inline script
    }

    content.innerHTML = `
      <button class="news-detail-close" onclick="HKANews.closeDetail()">✕</button>
      <div class="news-detail-image" id="detail-img-${article.id}" style="background:${detailImgStyle};">
        ${!article.image_url ? `<span class="news-detail-img-emoji">${style.emoji}</span>` : ''}
        <div class="news-detail-img-overlay">
          <span class="news-detail-category">${article.category}</span>
          <span class="news-detail-date">${date}</span>
        </div>
      </div>
      <div class="news-detail-body">
        <h1 class="news-detail-title">${article.title}</h1>
        <div class="news-detail-meta">
          <span>📍 ${article.location}</span>
          <span>📰 ${article.source}</span>
        </div>
        <div class="news-detail-text">
          ${article.content}
        </div>
        ${article.image_credit ? `<div class="news-detail-credit" style="font-size:0.7rem;color:var(--text-light);text-align:center;padding-bottom:0.5rem;border-bottom:1px solid rgba(0,0,0,0.04);margin-bottom:0.5rem;">${article.image_credit}</div>` : ''}
        <div class="news-detail-actions">
          <button class="cta-btn primary" onclick="HKANews.shareArticle()">📤 Share karein</button>
          <button class="cta-btn" style="background:var(--danger);" onclick="HKANews.closeDetail()">✕ बंद करें / Exit</button>
        </div>
        <!-- Comments Section -->
        <div class="comments-section" style="margin-top:1.5rem;border-top:1px solid rgba(0,0,0,0.06);padding-top:1.5rem;">
          <h3 style="font-size:1.1rem;margin-bottom:1rem;color:var(--primary);" data-lang="comments.title">💬 टिप्पणियां</h3>
          <div id="comments-list-${article.id}" class="comments-list" style="margin-bottom:1rem;">
            <p style="text-align:center;color:var(--text-light);font-size:0.85rem;" id="comments-empty-${article.id}" data-lang="comments.nocomments">अभी तक कोई टिप्पणी नहीं। पहली टिप्पणी करें!</p>
          </div>
          <div class="comment-form" style="display:flex;flex-direction:column;gap:0.5rem;">
            <input type="text" id="comment-name-${article.id}" placeholder="आपका नाम" style="padding:0.6rem 0.8rem;border:2px solid #e0e0e0;border-radius:8px;font-size:0.85rem;background:var(--bg);color:var(--text);" data-lang="comments.nameplaceholder">
            <div style="display:flex;gap:0.5rem;">
              <textarea id="comment-text-${article.id}" placeholder="अपनी टिप्पणी लिखें..." rows="2" style="flex:1;padding:0.6rem 0.8rem;border:2px solid #e0e0e0;border-radius:8px;font-size:0.85rem;resize:none;background:var(--bg);color:var(--text);" data-lang="comments.placeholder"></textarea>
              <button onclick="HKANews.submitComment('${article.id}')" class="cta-btn primary" style="white-space:nowrap;font-size:0.8rem;padding:0.6rem 1rem;" data-lang="comments.submit">✅ भेजें</button>
            </div>
          </div>
        </div>
      </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add image onerror fallback for detail image
    var detailImgContainer = document.getElementById('detail-img-' + article.id);
    if (detailImgContainer && article.image_url) {
      detailImgContainer.addEventListener('error', function() {
        var seed = encodeURIComponent((article.title || 'news') + '-detail');
        this.style.backgroundImage = 'url(https://picsum.photos/seed/' + seed + '/800/600)';
      });
      // Also try loading img to detect error
      var imgTester = new Image();
      imgTester.onerror = function() {
        if (detailImgContainer) {
          var seed = encodeURIComponent((article.title || 'news') + '-detail');
          detailImgContainer.style.backgroundImage = 'url(https://picsum.photos/seed/' + seed + '/800/600)';
        }
      };
      if (article.image_url) imgTester.src = article.image_url;
    }
    
    // Load existing comments for this article
    this.loadComments(article.id);
  },

  closeDetail() {
    const overlay = document.getElementById('news-detail-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
    this.currentArticle = null;
  },

  shareArticle() {
    const article = this.currentArticle;
    if (!article) return;
    const text = `📰 ${article.title}\n\n${article.summary}\n\n${window.location.href}`;
    if (navigator.share) {
      navigator.share({ title: 'Hardoi ki Awaaz News', text });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  },

  /* ---------- Comments System ---------- */
  getCommentsKey(articleId) {
    return `hka_comments_${articleId}`;
  },

  getComments(articleId) {
    try {
      return JSON.parse(localStorage.getItem(this.getCommentsKey(articleId))) || [];
    } catch { return []; }
  },

  saveComments(articleId, comments) {
    localStorage.setItem(this.getCommentsKey(articleId), JSON.stringify(comments));
  },

  loadComments(articleId) {
    const list = document.getElementById(`comments-list-${articleId}`);
    const empty = document.getElementById(`comments-empty-${articleId}`);
    if (!list) return;
    
    const comments = this.getComments(articleId);
    if (comments.length === 0) {
      if (empty) empty.style.display = '';
      return;
    }
    
    if (empty) empty.style.display = 'none';
    list.innerHTML = comments.map(c => `
      <div class="comment-item" style="padding:0.6rem;background:var(--bg-alt);border-radius:8px;margin-bottom:0.5rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem;">
          <strong style="font-size:0.8rem;color:var(--primary);">${c.name || 'Anonymous'}</strong>
          <span style="font-size:0.65rem;color:var(--text-light);">${c.date || ''}</span>
        </div>
        <p style="font-size:0.85rem;color:var(--text);margin:0;">${c.text}</p>
      </div>
    `).join('');
  },

  submitComment(articleId) {
    const nameInput = document.getElementById(`comment-name-${articleId}`);
    const textInput = document.getElementById(`comment-text-${articleId}`);
    if (!nameInput || !textInput) return;
    
    const name = nameInput.value.trim() || 'Anonymous';
    const text = textInput.value.trim();
    if (!text) {
      try { showToast('कृपया टिप्पणी लिखें!', 'error'); } catch(_) {}
      return;
    }
    
    const comment = {
      id: Date.now(),
      name,
      text,
      date: new Date().toLocaleDateString('hi-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    
    const comments = this.getComments(articleId);
    comments.unshift(comment);
    this.saveComments(articleId, comments);
    
    // Clear form
    textInput.value = '';
    
    // Reload display
    this.loadComments(articleId);
    try { showToast('✅ टिप्पणी जोड़ दी गई!', 'success'); } catch(_) {}
  },

  /* ---------- Render News Cards ---------- */
  renderArticles(container, articles) {
    this.articles = articles;
    this.isLoaded = true;

    if (!articles || articles.length === 0) {
      container.innerHTML = `<div class="news-empty"><span style="font-size:3rem;">📭</span><p>Koi news nahi hai</p></div>`;
      return;
    }

    // Helper to generate a Picsum fallback URL
    const getPicsumFallback = function(title, index) {
      var seed = encodeURIComponent((title || 'news') + '-' + (index || 0));
      return 'https://picsum.photos/seed/' + seed + '/800/600';
    };

    const cardsHtml = articles.map((article, i) => {
      const style = this.getCategoryStyle(article.category);
      const date = this.formatDate(article.date);

      // Always use a background image — try primary URL first, fallback to Picsum
      var imgUrl = article.image_url || getPicsumFallback(article.title, i);
      var imgSection = '<div class="news-card-img" style="background:' + style.bg + ';background-image:url(' + imgUrl + ');background-size:cover;background-position:center;background-blend-mode:overlay;">';

      return `
      <div class="news-card reveal delay-${(i % 5) + 1}">
        ${imgSection}
          ${!article.image_url ? `<span class="news-card-icon">${style.emoji}</span>` : `<span style="display:none;">${style.emoji}</span>`}
          <span class="news-card-category">${article.category}</span>
        </div>
        <div class="news-card-body">
          <div class="news-card-date">${date}</div>
          <h3 class="news-card-title">${article.title}</h3>
          <p class="news-card-summary">${article.summary}</p>
          <div class="news-card-footer">
            <span class="news-card-location">📍 ${article.location}</span>
            <button class="news-readmore-btn" data-id="${article.id}">📖 पूरा पढ़ें →</button>
          </div>
          ${article.image_credit ? `<div class="news-card-credit" style="font-size:0.65rem;color:var(--text-light);padding:0.3rem 1.2rem 0.5rem;line-height:1.3;">${article.image_credit}</div>` : ''}
        </div>
      </div>`;
    }).join('');

    container.innerHTML = `<div class="daily-news-scroll">${cardsHtml}</div>`;

    // Preload images for news cards — if any fail, replace with Picsum fallback
    var self = this;
    container.querySelectorAll('.news-card-img').forEach(function(imgDiv, idx) {
      var bgImage = imgDiv.style.backgroundImage;
      if (bgImage && bgImage !== 'none') {
        var urlMatch = bgImage.match(/url\(["']?([^"')"]+)["']?\)/);
        if (urlMatch && urlMatch[1] && !urlMatch[1].includes('picsum.photos')) {
          var tester = new Image();
          var origUrl = urlMatch[1];
          tester.onerror = function() {
            var articleData = self.articles && self.articles[idx];
            var fallbackUrl = getPicsumFallback(articleData ? articleData.title : 'fallback', idx);
            imgDiv.style.backgroundImage = 'url(' + fallbackUrl + ')';
          };
          tester.src = origUrl;
        }
      }
    });

    // Bind read more buttons
    container.querySelectorAll('.news-readmore-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const article = this.articles.find(a => a.id === id);
        if (article) this.openDetail(article);
      });
    });

    // Re-init scroll reveal
    setTimeout(() => { if (typeof initScrollReveal === 'function') initScrollReveal(); }, 200);
  },

  /* ---------- Render Homepage Teaser ---------- */
  renderHomeTeaser(articles) {
    const container = document.getElementById('home-news-teaser');
    if (!container) return;

    if (!articles || articles.length === 0) {
      container.innerHTML = '';
      return;
    }

    const top3 = articles.slice(0, 3);

    // Build teaser cards with data attributes instead of onclick
    const teaserCards = top3.map((article, i) => {
      const style = this.getCategoryStyle(article.category);
      var teaserFallbackUrl = 'https://picsum.photos/seed/' + encodeURIComponent((article.title || 'teaser') + '-' + i) + '/800/600';
      var teaserBg = 'background:' + style.bg + ';';
      if (article.image_url) {
        teaserBg = 'background:' + style.bg + ';background-image:url(' + article.image_url + ');background-size:cover;background-position:center;background-blend-mode:overlay;';
      } else {
        teaserBg = 'background:' + style.bg + ';background-image:url(' + teaserFallbackUrl + ');background-size:cover;background-position:center;background-blend-mode:overlay;';
      }
      return `
      <div class="home-news-teaser-card reveal delay-${(i % 3) + 1}" data-teaser-id="${article.id}">
        <div class="home-news-teaser-img" style="${teaserBg}">
          ${!article.image_url ? style.emoji : ''}
        </div>
        <div class="home-news-teaser-info">
          <span class="home-news-teaser-category">${article.category}</span>
          <h3>${article.title}</h3>
          <p>${article.summary.substring(0, 80)}...</p>
        </div>
      </div>`;
    }).join('');

    container.innerHTML = `
      <div class="section-header reveal">
        <h2>📰 ताज़ा खबरें</h2>
        <div class="underline"></div>
      </div>
      <div class="home-news-teaser-grid" id="home-teaser-grid">
        ${teaserCards}
      </div>
      <div style="text-align:center;margin-top:2rem;">
        <a href="news.html" class="cta-btn">📰 सभी खबरें देखें →</a>
      </div>
    `;

    // Bind click via event delegation on the grid to avoid injection issues
    const grid = document.getElementById('home-teaser-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const card = e.target.closest('.home-news-teaser-card');
        if (!card) return;
        const id = card.getAttribute('data-teaser-id');
        const article = this.articles.find(a => a.id === id);
        if (article) this.openDetail(article);
      });
    }

    setTimeout(() => { if (typeof initScrollReveal === 'function') initScrollReveal(); }, 200);
  },

  /* ---------- Search ---------- */
  initSearch() {
    const searchInput = document.getElementById('news-search-input');
    if (!searchInput) return;
    // Guard: if already initialized, don't add another listener
    if (searchInput.dataset.hkaSearchInit === 'true') return;
    searchInput.dataset.hkaSearchInit = 'true';

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.search(e.target.value);
      }, 300); // debounce 300ms
    });
  },

  getSearchQuery() {
    const input = document.getElementById('news-search-input');
    return input ? input.value.trim() : '';
  },

  search(query) {
    const container = document.getElementById('news-main-container');
    if (!container || !this.articles) return;

    const q = query.trim().toLowerCase();
    if (!q) {
      // No query — show all
      this.renderArticles(container, this.articles);
      return;
    }

    const filtered = this.articles.filter(a => {
      const title = (a.title || '').toLowerCase();
      const summary = (a.summary || '').toLowerCase();
      const category = (a.category || '').toLowerCase();
      const location = (a.location || '').toLowerCase();
      const content = (a.content || '').toLowerCase().substring(0, 500);
      return title.includes(q) || summary.includes(q) || category.includes(q) || location.includes(q) || content.includes(q);
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="news-empty"><span style="font-size:3rem;">🔍</span><h3>"${query}" से कोई मैच नहीं मिला</h3><p style="color:var(--text-light);margin-top:0.5rem;">दूसरे कीवर्ड से try करें</p></div>`;
      return;
    }

    this.renderArticles(container, filtered);
  },

  /* ---------- Main Load ---------- */
  async loadNews() {
    // Page-specific containers
    const mainContainer = document.getElementById('news-main-container');
    const homeTeaser = document.getElementById('home-news-teaser');

    if (!mainContainer && !homeTeaser) return;

    // Show loading on news page
    if (mainContainer) this.showLoading(mainContainer);

    // Fetch
    let articles = await this.fetchNews();

    // Fallback if API fails
    if (!articles) {
      articles = this.getFallbackArticles();
    }

    // Render
    if (mainContainer) this.renderArticles(mainContainer, articles);
    if (homeTeaser) this.renderHomeTeaser(articles);

    // Init search — re-apply current query after rendering
    this.initSearch();
    const currentQuery = this.getSearchQuery();
    if (currentQuery) this.search(currentQuery);

    // Auto-refresh
    if (this.refreshTimer) clearInterval(this.refreshTimer);
    this.refreshTimer = setInterval(async () => {
      const q = this.getSearchQuery();
      const fresh = await this.fetchNews();
      if (fresh) {
        this.articles = fresh;
        if (mainContainer) {
          this.renderArticles(mainContainer, fresh);
          if (q) this.search(q); // Re-apply search after refresh
        }
        if (homeTeaser) this.renderHomeTeaser(fresh);
      }
    }, this.REFRESH_INTERVAL);
  },

  /* ---------- Refresh (Manual) ---------- */
  async refreshNow() {
    // Force-fetch fresh news from backend by calling /api/refresh
    const refreshBtn = document.getElementById('news-refresh-btn');
    if (refreshBtn) {
      refreshBtn.textContent = '⏳ Refreshing...';
      refreshBtn.disabled = true;
    }
    
    if (this.refreshTimer) clearInterval(this.refreshTimer);
    
    // First try the /api/refresh endpoint (returns articles directly or triggers backend generation)
    try {
      const resp = await fetch('https://hardoi-ki-awaaz-backend.onrender.com/api/refresh', { cache: 'no-cache' });
      if (resp.ok) {
        const data = await resp.json();
        // API may return articles directly or just success status
        if (data && data.articles && Array.isArray(data.articles)) {
          this.articles = data.articles;
          const mainContainer = document.getElementById('news-main-container');
          const homeTeaser = document.getElementById('home-news-teaser');
          if (mainContainer) this.renderArticles(mainContainer, data.articles);
          if (homeTeaser) this.renderHomeTeaser(data.articles);
          try { showToast(data.fresh ? '🔄 Fresh news loaded!' : '⚠️ Fallback articles loaded', data.fresh ? 'success' : 'info'); } catch(_) {}
          if (refreshBtn) { refreshBtn.textContent = '🔄 Refresh'; refreshBtn.disabled = false; }
          return;
        }
        // If API returned success but no articles, re-fetch news
        if (data && data.success) {
          await this.loadNews();
          try { showToast('🔄 News refreshed!', 'success'); } catch(_) {}
          if (refreshBtn) { refreshBtn.textContent = '🔄 Refresh'; refreshBtn.disabled = false; }
          return;
        }
      }
    } catch (e) {
      console.error('Refresh endpoint failed, trying direct fetch...', e);
    }
    
    // Fallback: directly fetch fresh news from API endpoint
    try {
      const fresh = await this.fetchNews();
      if (fresh && fresh.length > 0) {
        this.articles = fresh;
        const mainContainer = document.getElementById('news-main-container');
        const homeTeaser = document.getElementById('home-news-teaser');
        if (mainContainer) this.renderArticles(mainContainer, fresh);
        if (homeTeaser) this.renderHomeTeaser(fresh);
        try { showToast('🔄 News refreshed!', 'success'); } catch(_) {}
        if (refreshBtn) { refreshBtn.textContent = '🔄 Refresh'; refreshBtn.disabled = false; }
        return;
      }
    } catch (e) {
      console.error('Direct fetch also failed', e);
    }
    
    // Last resort: use static fallback articles so the page is never blank
    this.articles = this.getFallbackArticles();
    const mainContainer = document.getElementById('news-main-container');
    const homeTeaser = document.getElementById('home-news-teaser');
    if (mainContainer) this.renderArticles(mainContainer, this.articles);
    if (homeTeaser) this.renderHomeTeaser(this.articles);
    try { showToast('⚠️ Using offline articles - backend unavailable', 'info'); } catch(_) {}
    if (refreshBtn) { refreshBtn.textContent = '🔄 Refresh'; refreshBtn.disabled = false; }
  }
};

// Expose globally so onclick="HKANews.closeDetail()" works
window.HKANews = HKANews;

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  HKANews.loadNews();

  // Close detail modal on overlay click
  const overlay = document.getElementById('news-detail-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) HKANews.closeDetail();
    });
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') HKANews.closeDetail();
    });
  }
});
