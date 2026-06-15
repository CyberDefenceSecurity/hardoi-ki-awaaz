/* ============================================
   Hardoi ki Awaaz — Analytics & Visitor Counter
   Tracks page views, shows stats in footer
   Optional Google Analytics (add your GA ID)
   ============================================ */

const HKAnalytics = {
  // === CONFIG ===
  // Set your Google Analytics Measurement ID here (e.g., 'G-XXXXXXXXXX')
  // Leave empty to skip Google Analytics
  GA_MEASUREMENT_ID: '',

  // === INIT ===
  init() {
    this.trackPageView();
    this.updateVisitorCounter();
    if (this.GA_MEASUREMENT_ID) {
      this.loadGoogleAnalytics();
    }
  },

  // === SIMPLE VISITOR COUNTER (localStorage-based) ===
  trackPageView() {
    try {
      // Total page views
      let totalViews = parseInt(localStorage.getItem('hka_total_views') || '0');
      totalViews++;
      localStorage.setItem('hka_total_views', totalViews.toString());

      // Unique visitors (first visit ever)
      if (!localStorage.getItem('hka_visited_before')) {
        let uniqueVisitors = parseInt(localStorage.getItem('hka_unique_visitors') || '0');
        uniqueVisitors++;
        localStorage.setItem('hka_unique_visitors', uniqueVisitors.toString());
        localStorage.setItem('hka_visited_before', 'true');
      }

      // Today's views
      const today = new Date().toDateString();
      const lastDate = localStorage.getItem('hka_last_visit_date');
      if (lastDate !== today) {
        localStorage.setItem('hka_last_visit_date', today);
        localStorage.setItem('hka_today_views', '1');
      } else {
        let todayViews = parseInt(localStorage.getItem('hka_today_views') || '0');
        todayViews++;
        localStorage.setItem('hka_today_views', todayViews.toString());
      }
    } catch (e) {
      // localStorage might be disabled
      console.warn('Analytics: localStorage not available');
    }
  },

  // === UPDATE FOOTER DISPLAY ===
  updateVisitorCounter() {
    const counters = document.querySelectorAll('.visitor-counter');
    if (!counters.length) return;

    try {
      const totalViews = localStorage.getItem('hka_total_views') || '0';
      const uniqueVisitors = localStorage.getItem('hka_unique_visitors') || '0';
      const todayViews = localStorage.getItem('hka_today_views') || '0';

      counters.forEach(el => {
        el.innerHTML = `👁️ आज: ${todayViews} | कुल: ${totalViews} | विज़िटर: ${uniqueVisitors}`;
      });
    } catch (e) {
      counters.forEach(el => { el.textContent = ''; });
    }
  },

  // === GOOGLE ANALYTICS (gtag.js) ===
  loadGoogleAnalytics() {
    const id = this.GA_MEASUREMENT_ID;
    if (!id) return;

    // Skip if already loaded
    if (window.gtag) return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id);
  }
};

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => HKAnalytics.init());
