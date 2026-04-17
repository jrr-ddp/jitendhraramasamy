/* ==================== HERO STAT COUNTER ==================== */
function animateCounter(element, end, duration) {
  let start          = 0;
  let startTimestamp = null;
  duration           = duration || 2000;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current  = Math.floor(progress * end);
    element.textContent = (current < 10 ? '0' + current : current) + '+';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = (end < 10 ? '0' + end : end) + '+';
    }
  };

  window.requestAnimationFrame(step);
}

/* Run counters when hero stats scroll into view */
document.addEventListener('DOMContentLoaded', () => {
  const statNums = document.querySelectorAll('.hero__stat-num[data-target]');
  if (!statNums.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateCounter(el, target, 2000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
});

/* ==================== DYNAMIC YEAR ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

/* ==================== TYPEWRITER EFFECT ==================== */
const roles = [
  'Full Stack Developer',
  'Integration & Automation Specialist',
  'Analyst',
  'Aspiring AI Engineer',
];

const textEl = document.getElementById('typewriter-text');
let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function typeEffect() {
  if (!textEl) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    textEl.textContent = currentRole.substring(0, charIndex--);
  } else {
    textEl.textContent = currentRole.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentRole.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex  = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

document.addEventListener('DOMContentLoaded', typeEffect);
