/* ==================== NAV MENU ==================== */
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose  = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}
if (navClose) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

/* Close menu on nav link click (mobile) */
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/* ==================== SKILLS TABS ==================== */
document.querySelectorAll('.skills__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    document.querySelectorAll('.skills__tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.skills__panel').forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.querySelector(`.skills__panel[data-panel="${target}"]`).classList.add('active');

    // Animate bars in newly activated panel
    animateSkillBarsIn(document.querySelector(`.skills__panel[data-panel="${target}"]`));
  });
});

/* ==================== SKILL BAR ANIMATION ==================== */
function animateSkillBarsIn(panel) {
  if (!panel) return;
  panel.querySelectorAll('.skill__item').forEach(item => {
    const fill  = item.querySelector('.skill__fill');
    const width = item.dataset.width;
    if (fill && width) {
      fill.style.width = '0';
      requestAnimationFrame(() => {
        setTimeout(() => { fill.style.width = width + '%'; }, 60);
      });
    }
  });
}

/* Animate bars in the default (first) active panel on load */
document.addEventListener('DOMContentLoaded', () => {
  const activePanel = document.querySelector('.skills__panel.active');
  if (activePanel) animateSkillBarsIn(activePanel);
});

/* ==================== QUALIFICATION TABS ==================== */
document.querySelectorAll('.qual__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.qtab;

    document.querySelectorAll('.qual__tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.qual__panel').forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.querySelector(`.qual__panel[data-qpanel="${target}"]`).classList.add('active');
  });
});

/* ==================== EMAIL JS ==================== */
const contactForm    = document.getElementById('contact-form');
const contactName    = document.getElementById('contact-name');
const contactEmail   = document.getElementById('contact-email');
const contactProject = document.getElementById('contact-project');
const contactMessage = document.getElementById('contact-message');

const sentEmail = (e) => {
  e.preventDefault();

  if (!contactName.value || !contactEmail.value || !contactProject.value) {
    contactMessage.classList.remove('color-blue');
    contactMessage.classList.add('color-red');
    contactMessage.textContent = 'Please fill all the details 📩';
    return;
  }

  emailjs.sendForm('service_22zun55', 'template_aza5dvj', '#contact-form', 'FMUmsp_OxWTjXq0YF')
    .then(() => {
      contactMessage.classList.remove('color-red');
      contactMessage.classList.add('color-blue');
      contactMessage.textContent = 'Message Sent ✅';
      setTimeout(() => { contactMessage.textContent = ''; }, 5000);
    }, (error) => {
      alert('OOPS! SOMETHING HAS FAILED...', error);
    });

  contactName.value    = '';
  contactEmail.value   = '';
  contactProject.value = '';
};

if (contactForm) contactForm.addEventListener('submit', sentEmail);

/* ==================== SCROLL ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');
    const navLinkEl     = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

    if (!navLinkEl) return;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinkEl.classList.add('active-link');
    } else {
      navLinkEl.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/* ==================== SCROLL UP ==================== */
const scrollUp = () => {
  const btn = document.getElementById('scroll-up');
  if (!btn) return;
  this.scrollY >= 350 ? btn.classList.add('show-scroll') : btn.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

/* ==================== DARK / LIGHT THEME ==================== */
/*
  Default is DARK (no class on body).
  Light mode adds class "light-theme" to body.
  Icon: moon = currently dark (click to go light), sun = currently light (click to go dark).
*/
const themeButton  = document.getElementById('theme-button');
const LIGHT_CLASS  = 'light-theme';
const SUN_ICON     = 'ri-sun-line';
const MOON_ICON    = 'ri-moon-line';

/* Restore saved preference */
const savedTheme = localStorage.getItem('jrr-theme');
if (savedTheme === 'light') {
  document.body.classList.add(LIGHT_CLASS);
  if (themeButton) themeButton.classList.replace(MOON_ICON, SUN_ICON);
}

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(LIGHT_CLASS);

    const isLight = document.body.classList.contains(LIGHT_CLASS);
    themeButton.classList.toggle(SUN_ICON,  isLight);
    themeButton.classList.toggle(MOON_ICON, !isLight);

    localStorage.setItem('jrr-theme', isLight ? 'light' : 'dark');
  });
}

/* ==================== SCROLL REVEAL ==================== */
const sr = ScrollReveal({
  origin:   'top',
  distance: '60px',
  duration: 2500,
  delay:    400,
});

sr.reveal('.hero__content, .projects__grid, .footer__container');
sr.reveal('.hero__visual',          { delay: 600, origin: 'bottom' });
sr.reveal('.about__photo-col',      { origin: 'left' });
sr.reveal('.about__content',        { origin: 'right' });
sr.reveal('.skills__tabs',          { origin: 'bottom' });
sr.reveal('.skills__panel.active',  { origin: 'bottom', delay: 500 });
sr.reveal('.qual__tabs',            { origin: 'bottom' });
sr.reveal('.service__card',         { interval: 100, origin: 'bottom' });
sr.reveal('.testimonial__card',     { interval: 100, origin: 'bottom' });
sr.reveal('.contact__info, .contact__form', { origin: 'bottom', interval: 100 });
