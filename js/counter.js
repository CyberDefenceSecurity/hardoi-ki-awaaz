/* ============================================
   Hardoi ki Awaaz - Stats Counter Animation
   ============================================ */

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
