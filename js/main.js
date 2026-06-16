/* ============================================
   Hardoi ki Awaaz - Main JavaScript
   ============================================ */

// === CACHE BUSTER: Clear old caches on version change ===
(function() {
  const APP_VERSION = '1.0.1'; // Increment this to force cache clear on all browsers
  const storedVersion = localStorage.getItem('hka_app_version');
  
  if (storedVersion !== APP_VERSION) {
    // Clear all service worker caches
    if ('caches' in window) {
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName.startsWith('hka-cache-')) {
              console.log('🧹 Clearing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }).catch(function(err) {
        console.warn('Cache clear error:', err);
      });
      
      // Unregister old service workers
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          registrations.forEach(function(reg) {
            reg.unregister();
            console.log('🔁 Unregistered old service worker');
          });
        });
      }
    }
    
    // Force reload from server once (clear browser cache via no-cache)
    // Only do this if coming from an older version, not on every refresh
    if (storedVersion !== null && storedVersion !== APP_VERSION) {
      console.log('🔄 App version changed: ' + storedVersion + ' → ' + APP_VERSION + '. Reloading fresh content.');
    }
    
    localStorage.setItem('hka_app_version', APP_VERSION);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initDarkMode();
  initScrollReveal();
  initSmoothScroll();
});

// === HEADER SCROLL EFFECT ===
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// === MOBILE HAMBURGER MENU ===
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('active');
    document.body.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('nav-open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking a nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside the nav drawer (backdrop)
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && document.body.classList.contains('nav-open')) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMenu();
    }
  });

  // Add close button (×) — CSS hides it on desktop
  const closeBtn = document.createElement('button');
  closeBtn.className = 'nav-close-btn';
  closeBtn.innerHTML = '×';
  closeBtn.setAttribute('aria-label', 'Close menu');
  closeBtn.addEventListener('click', closeMenu);
  navLinks.prepend(closeBtn);

  // Prevent backdrop click events on nav drawer clicks
  navLinks.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// === DARK MODE TOGGLE ===
function initDarkMode() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.textContent = '\u2600\uFE0F';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      toggle.textContent = '\uD83C\uDF19';
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggle.textContent = '\u2600\uFE0F';
      localStorage.setItem('theme', 'dark');
    }
  });
}

// === SCROLL REVEAL ===
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .slide-left, .slide-right, .scale-up, .stagger-children');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });
}

// === UTILITY: Share on WhatsApp ===
function shareOnWhatsApp(text, url) {
  const msg = encodeURIComponent(text + ' ' + (url || window.location.href));
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

// === UTILITY: Share on Telegram ===
function shareOnTelegram(text, url) {
  window.open(`https://t.me/share/url?url=${encodeURIComponent(url || window.location.href)}&text=${encodeURIComponent(text)}`, '_blank');
}

// === UTILITY: Copy to clipboard ===
function copyToClipboard(text) {
  try {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Link copied!');
    });
  } catch(e) {
    // Clipboard API not available
  }
}

// === GLOBAL TOAST NOTIFICATION ===
// Used by: main.js, news.js, photo-uploader.js, id-generator.js
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `position:fixed;bottom:80px;right:24px;padding:12px 24px;border-radius:8px;color:#fff;font-size:0.85rem;z-index:10000;font-family:sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.2);background:${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : type === 'info' ? '#ff9800' : '#4caf50'};animation:slideIn 0.3s ease;`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Add slideIn animation keyframes once
if (!document.getElementById('toast-anim-style')) {
  const style = document.createElement('style');
  style.id = 'toast-anim-style';
  style.textContent = `@keyframes slideIn { from { transform:translateX(100px);opacity:0; } to { transform:translateX(0);opacity:1; } }`;
  document.head.appendChild(style);
}
