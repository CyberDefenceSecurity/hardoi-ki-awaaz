/* ============================================
   Hardoi ki Awaaz - Stats Counter Animation
   Auto-increments stats ~15-20 per month
   ============================================ */

// === AUTO-INCREMENT: Each stat grows ~15-20 per month ===
function applyMonthlyGrowth() {
  const STORAGE_KEY = 'hka_stats_base';
  const MONTHLY_INCREMENT_MIN = 15;
  const MONTHLY_INCREMENT_MAX = 20;

  // Base values (starting point) — ordered to match DOM [data-count] order
  const STAT_KEYS = ['id-cards', 'supporters', 'issues', 'coverage'];
  const BASE_STATS = {
    'id-cards': 12847,   // ID Cards Generated
    'supporters': 25000, // Supporters
    'issues': 340,       // Issues Raised
    'coverage': 35       // City Coverage % (start at 35% so growth is visible)
  };

  const now = new Date();
  const currentMonth = now.getFullYear() * 12 + now.getMonth(); // month number since epoch

  // Load stored state
  let stored = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch (_) {}

  const lastMonth = stored ? stored.month : null;
  let growthValues = stored ? stored.values : {};

  if (lastMonth === null) {
    // First time — store current month and base values
    growthValues = {};
    STAT_KEYS.forEach(key => {
      growthValues[key] = BASE_STATS[key];
    });
  } else {
    // Calculate months passed since last update
    const monthsPassed = currentMonth - lastMonth;
    if (monthsPassed > 0) {
      // Add growth for each month passed
      STAT_KEYS.forEach(key => {
        for (let m = 0; m < monthsPassed; m++) {
          const increment = MONTHLY_INCREMENT_MIN + Math.floor(Math.random() * (MONTHLY_INCREMENT_MAX - MONTHLY_INCREMENT_MIN + 1));
          // Cap coverage at 100
          if (key === 'coverage') {
            growthValues[key] = Math.min(100, (growthValues[key] || BASE_STATS[key]) + increment);
          } else {
            growthValues[key] = (growthValues[key] || BASE_STATS[key]) + increment;
          }
        }
      });
    }
  }

  // Save updated state
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ month: currentMonth, values: growthValues }));
  } catch (_) {}

  // Update data-count attributes on DOM elements (using order-based matching)
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach((el, index) => {
    const key = STAT_KEYS[index];
    if (key && growthValues[key]) {
      el.setAttribute('data-count', String(growthValues[key]));
    }
  });
}

class AnimatedCounter {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = target;
    this.duration = duration;
    this.start = 0;
    this.startTime = null;
    this.started = false;
  }

  animate(timestamp) {
    if (!this.startTime) this.startTime = timestamp;
    const progress = Math.min((timestamp - this.startTime) / this.duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * this.target);
    this.element.textContent = current.toLocaleString('en-IN');
    if (progress < 1) {
      requestAnimationFrame((t) => this.animate(t));
    } else {
      this.element.textContent = this.target.toLocaleString('en-IN');
    }
  }

  startCounting() {
    if (this.started) return;
    this.started = true;
    requestAnimationFrame((t) => this.animate(t));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Apply monthly growth BEFORE counter animation
  applyMonthlyGrowth();

  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const counter = new AnimatedCounter(el, target);
        counter.startCounting();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
});
