/**
 * Govind Solar Solutions - Clean & Lightweight JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initScrollSpy();
  initProductTabs();
  initBrandTabs();
  initFaqAccordion();
});

// Mobile & Tablet Navigation Toggle
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navOverlay = document.getElementById('navOverlay');
  const drawerClose = document.getElementById('drawerClose');
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

  if (drawerClose) {
    drawerClose.addEventListener('click', () => setMenu(false));
  }

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
      const isCurrent = item.getAttribute('href') === '#' + current;
      item.classList.toggle('active', isCurrent);
      item.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });
  }, { passive: true });
}

// Interactive Product Category Filter Tabs
function initProductTabs() {
  const tabs = document.querySelectorAll('.product-tab');
  const cards = document.querySelectorAll('.product-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      cards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        const matches = filter === 'all' || categories.includes(filter);

        if (matches) {
          card.classList.remove('is-hidden');
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px) scale(0.98)';
          card.classList.add('is-hidden');
          setTimeout(() => {
            if (card.classList.contains('is-hidden')) {
              card.style.display = 'none';
            }
          }, 220);
        }
      });
    });
  });
}

// Interactive Brand Dealership Tabs
function initBrandTabs() {
  const brandTabs = document.querySelectorAll('.brand-tab');
  const cards = document.querySelectorAll('.product-card');
  if (!brandTabs.length) return;

  brandTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const selectedBrand = tab.getAttribute('data-brand');

      brandTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      if (selectedBrand === 'all') {
        cards.forEach(card => {
          card.classList.remove('brand-highlighted');
        });
      } else {
        let firstMatch = null;
        cards.forEach(card => {
          const cardBrand = card.getAttribute('data-brand');
          if (cardBrand === selectedBrand) {
            card.classList.add('brand-highlighted');
            if (!firstMatch) firstMatch = card;
          } else {
            card.classList.remove('brand-highlighted');
          }
        });

        // Ensure "All Products" category tab is active so all cards are visible
        const allTab = document.querySelector('.product-tab[data-filter="all"]');
        if (allTab && !allTab.classList.contains('active')) {
          allTab.click();
        }

        if (firstMatch) {
          firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });
}

// Interactive FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const toggleIcon = item.querySelector('.faq-toggle-icon');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.faq-question');
        const otherIcon = otherItem.querySelector('.faq-toggle-icon');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherIcon) otherIcon.textContent = '+';
      });

      // If clicked item wasn't open, open it
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        if (toggleIcon) toggleIcon.textContent = '−';
      }
    });
  });
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
