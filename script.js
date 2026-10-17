/**
 * Govind Solar Solutions - Clean & Lightweight JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initScrollSpy();
});

// Mobile Navigation Toggle
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-item, .drawer-actions a');

  if (!navToggle || !mainNav || !navOverlay) return;

  function setMenu(open) {
    if (open) {
      mainNav.classList.add('open');
      navToggle.classList.add('open');
      navOverlay.classList.add('active');
      document.body.classList.add('menu-open');
    } else {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  }

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('open');
    setMenu(!isOpen);
  });

  navOverlay.addEventListener('click', () => setMenu(false));

  navLinks.forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      setMenu(false);
    }
  });
}

// Header Shadow on Scroll
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// Active Nav Link Spy
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  if (!sections.length || !navItems.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  }, { passive: true });
}

// Contact Form Submit to WhatsApp
function submitToWhatsApp(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const requirement = form.requirement.value;
  const message = form.message ? form.message.value.trim() : '';

  if (!name || !phone || !requirement) {
    alert('Kripya naam, phone number aur requirement bharein.');
    return false;
  }

  let text = `*☀️ New Solar Inquiry - Govind Solar Solutions*\n\n`;
  text += `👤 *Name:* ${name}\n`;
  text += `📞 *Phone:* ${phone}\n`;
  text += `⚡ *Requirement:* ${requirement}\n`;
  if (message) text += `📍 *Message/Area:* ${message}\n`;
  text += `\n🌐 Source: govindsolarsolutions.com`;

  const waUrl = `https://wa.me/917055507707?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  form.reset();
  return false;
}
