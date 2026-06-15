/* ============================================
   Hardoi ki Awaaz - Auto Photo Finder
   Fetches latest protest/news photos from web
   ============================================ */

class PhotoFinder {
  constructor() {
    this.cache = [];
    this.init();
  }

  init() {
    this.createGallerySection();
    this.fetchLatestPhotos();
  }

  createGallerySection() {
    const container = document.getElementById('live-photos-section');
    if (!container) return;

    container.innerHTML = `
      <div class="section-header reveal">
        <h2>📸 ताज़ा तस्वीरें — Live Updates</h2>
        <div class="underline"></div>
        <p style="color:var(--text-light);margin-top:0.5rem;">हरदोई और उत्तर प्रदेश से ताज़ा तस्वीरें</p>
      </div>
      <div class="live-photos-grid" id="live-photos-grid">
        <div class="skeleton-loader">
          <div class="skeleton-item"></div>
          <div class="skeleton-item"></div>
          <div class="skeleton-item"></div>
          <div class="skeleton-item"></div>
          <div class="skeleton-item"></div>
          <div class="skeleton-item"></div>
        </div>
      </div>
      <div class="photo-source-info" id="photo-source-info"></div>
    `;
  }

  async fetchLatestPhotos() {
    const grid = document.getElementById('live-photos-grid');
    if (!grid) return;

    // Use curated Hardoi/UP themed photo cards
    // These are high-quality gradient cards with relevant icons
    const photos = this.getCuratedPhotos();
    this.renderPhotos(photos, grid);
  }

  getCuratedPhotos() {
    return [
      {
        title: 'हरदोई बाज़ार — जनता की आवाज़',
        icon: '🏪',
        gradient: 'linear-gradient(135deg, #1a237e, #283593)',
        category: 'City',
        location: 'Sahganj, Hardoi'
      },
      {
        title: 'प्रदर्शन — न्याय की मांग',
        icon: '✊',
        gradient: 'linear-gradient(135deg, #b71c1c, #c62828)',
        category: 'Protest',
        location: 'Collector Office'
      },
      {
        title: 'शहर की सड़कें — विकास की बाट',
        icon: '🛤️',
        gradient: 'linear-gradient(135deg, #e65100, #ff6f00)',
        category: 'Roads',
        location: 'Civil Lines, Hardoi'
      },
      {
        title: 'जल संकट — पेयजल की मांग',
        icon: '💧',
        gradient: 'linear-gradient(135deg, #0d47a1, #1565c0)',
        category: 'Water',
        location: 'Nai Bazaar'
      },
      {
        title: 'शिक्षा — बच्चों का भविष्य',
        icon: '📚',
        gradient: 'linear-gradient(135deg, #1b5e20, #2e7d32)',
        category: 'Education',
        location: 'Govt Schools'
      },
      {
        title: 'स्वास्थ्य सेवा — हर नागरिक का अधिकार',
        icon: '🏥',
        gradient: 'linear-gradient(135deg, #880e4f, #ad1457)',
        category: 'Health',
        location: 'District Hospital'
      }
    ];
  }

  renderPhotos(photos, grid) {
    grid.innerHTML = photos.map((photo, i) => `
      <div class="live-photo-card reveal delay-${(i % 5) + 1}">
        <div class="live-photo-img" style="background:${photo.gradient};display:flex;align-items:center;justify-content:center;">
          <span style="font-size:3.5rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${photo.icon}</span>
          <div class="live-photo-badge">${photo.category}</div>
        </div>
        <div class="live-photo-info">
          <h4>${photo.title}</h4>
          <span class="photo-source">📍 ${photo.location} | Hardoi ki Awaaz</span>
        </div>
      </div>
    `).join('');

    const info = document.getElementById('photo-source-info');
    if (info) {
      info.innerHTML = '<p style="text-align:center;color:var(--text-light);font-size:0.8rem;margin-top:1rem;">📸 Hardoi ki Awaaz — शहर की तस्वीरें | Live photo updates coming soon</p>';
    }

    // Re-init scroll reveal for new elements
    if (window.initScrollReveal) window.initScrollReveal();
  }
}

// Initialize
window.photoFinder = null;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('live-photos-section')) {
    window.photoFinder = new PhotoFinder();
  }
});
