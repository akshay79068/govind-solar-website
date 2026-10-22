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
  initWorkingSitesTabs();
  initSiteLightbox();
  initWorkingSitesAnimation();
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

  const waUrl = `https://wa.me/917055507719?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  form.reset();
  return false;
}

/* ==========================================================================
   OUR WORKING SITES - INTERACTIVITY, LIGHTBOX & ANIMATIONS
   ========================================================================== */

const WORKING_SITES_DATA = [
  {
    id: 1,
    title: 'Residential Rooftop Solar System',
    type: 'Residential 5 kW',
    image: 'images/site-1.jpg',
    alt: 'Residential Rooftop Solar System in Shanti Niketan Colony Devpuri-II Bulandshahr',
    location: '657, Shanti Niketan Colony, Awas Vikas, Devpuri-II, Bulandshahr, UP',
    gps: 'Lat 28.415064° | Long 77.841741°',
    structure: 'Custom Hot-Dip Galvanized Iron (GI) Structure',
    capacity: '5 kW Monocrystalline On-Grid System',
    desc: 'Devpuri-II Bulandshahr mein premium residential rooftop solar installation. High-efficiency monocrystalline solar panels aur heavy-duty galvanized iron frame ke sath set up kiya gaya hai. Customer ko direct ₹78,000 PM Surya Ghar subsidy aur PVVNL net meter sanction hua.',
    waMessage: 'Hello Maneet Ji, maine aapki website par Devpuri-II Shanti Niketan Colony wala solar setup dekha. Mujhe bhi apne ghar ke liye aisa 5 kW system lagwana hai.'
  },
  {
    id: 2,
    title: 'Elevated Pergola Rooftop Solar Structure',
    type: 'Elevated 6 kW',
    image: 'images/site-2.jpg',
    alt: 'Elevated Pergola Rooftop Solar Structure in Kailashpuri Bulandshahr',
    location: '501, Kailashpuri, Bulandshahr, Uttar Pradesh 203001',
    gps: 'Lat 28.398090° | Long 77.853241°',
    structure: 'High-Clearance Elevated Iron Pergola Structure',
    capacity: '6 kW Dual-Row Elevated Solar Plant',
    desc: 'Kailashpuri Bulandshahr mein high-clearance elevated solar structure. Is setup se chhat ka poora floor area 100% walkable aur khula rehta hai jisse terrace use bilkul band nahi hota, sath hi neeche ka ghar dhoop se cool bana rehta hai.',
    waMessage: 'Hello Maneet Ji, maine website par Kailashpuri wala Elevated Solar pergola structure dekha. Mujhe apni chhat par bina space roke solar lagwana hai.'
  },
  {
    id: 3,
    title: 'Heavy RCC Foundation Rooftop Solar Array',
    type: 'Residential 7 kW',
    image: 'images/site-3.jpg',
    alt: 'Rooftop Solar Array with Concrete Foundations in Amba Enclave Khurja Marg Bulandshahr',
    location: 'A-163, Khurja Marg, Amba Enclave, Bulandshahr, UP 203001',
    gps: 'Lat 28.394145° | Long 77.840713°',
    structure: 'RCC Concrete Pedestals + Heavy GI Mounting',
    capacity: '7 kW High-Wind Resistant Grid-Tied Solar',
    desc: 'Amba Enclave, Khurja Marg par storm & earthquake resistant solar structure. Har mounting leg ko solid concrete base par anchor kiya gaya hai jisse tezz aandhi-toofan mein bhi panels aur chhat dono poori tarah surakshit rehte hain.',
    waMessage: 'Hello Maneet Ji, maine website par Amba Enclave Khurja Marg wala heavy RCC foundation solar setup dekha. Mujhe apne makaan ke liye is system ki quotation chahiye.'
  },
  {
    id: 4,
    title: 'Commercial & Industrial Factory Shed Solar Plant',
    type: 'Commercial 50+ kW',
    image: 'images/site-4.jpg',
    alt: 'Commercial and Industrial Rooftop Solar Plant on Factory Shed in Bulandshahr',
    location: 'Industrial Area, Bulandshahr District, UP',
    gps: 'Bulandshahr Industrial Cluster, UP',
    structure: 'Zero-Penetration Tin Shed Industrial Mounting',
    capacity: '50+ kW High-Output Commercial System',
    desc: 'Bulandshahr industrial belt mein factory shed rooftop par high-capacity on-grid solar plant. Zero roof puncture clamps dwara tin-shed par mount kiya gaya hai jisse roof leakage ka koi khatra nahi hota aur company ko har mahine lakho rupaye ki power bachat hoti hai.',
    waMessage: 'Hello Maneet Ji, maine website par Commercial Industrial Shed Solar Plant dekha. Mujhe apni Factory / Godown ke liye commercial solar ka quotation chahiye.'
  },
  {
    id: 5,
    title: 'Service-Clearance Elevated Solar Plant',
    type: 'Residential 5 kW',
    image: 'images/site-5.jpg',
    alt: 'Rooftop Solar Plant with Water Wash Cleaning Clearance in Girdhari Nagar Marg Bulandshahr',
    location: '165/1, Girdhari Nagar Marg, Shanti Niketan / Devpuri-2, Bulandshahr, UP 203001',
    gps: 'Lat 28.414945° | Long 77.840835°',
    structure: 'Anti-Rust Elevated GI with Easy Maintenance Access',
    capacity: '5 kW High-Efficiency On-Grid Rooftop System',
    desc: 'Girdhari Nagar Marg, Shanti Niketan Bulandshahr mein live installation. Is design mein panels ke neeche walking aur water hose pipe cleaning ke liye proper height di gayi hai taaki customer aasani se panels clean karke saal bhar peak generation le sakein.',
    waMessage: 'Hello Maneet Ji, maine website par Girdhari Nagar Shanti Niketan wala elevated solar plant dekha. Mujhe bhi regular maintenance-friendly solar lagwane ki details chahiye.'
  },
  {
    id: 6,
    title: '300+ Rooftop Solar Projects Milestone',
    type: 'Milestone 300+ Sites',
    image: 'images/site-300-plus.jpg',
    alt: '300 Plus Solar Projects Milestone in Bulandshahr by Govind Solar Solutions',
    location: 'Bulandshahr, Khurja, Sikandrabad & NCR Region',
    gps: 'Covering 300+ Rooftops across Western UP',
    structure: 'Custom Residential & Commercial High-Grade GI Mounting',
    capacity: '1.5+ Megawatts Combined Clean Energy Output',
    desc: 'Govind Solar Solutions dwara Bulandshahr aur aas-paas ke ilaaqon mein 300 se zyada safal solar rooftop systems complete kiye ja chuke hain. 180+ Residential homes, 75+ Commercial sheds aur 45+ agricultural setups par Tier-1 panels, PVVNL net metering aur direct PM Surya Ghar subsidy approval mil chuki hai.',
    waMessage: 'Hello Maneet Ji, maine website par aapka 300+ Solar Projects Milestone dekha. Mujhe bhi apne yahan best rooftop solar system lagwana hai, quotation bhejiye.'
  }
];

// Toggle Collapsible Section inside Milestone Card
function toggleSiteCollapse(e, btn) {
  if (e) e.stopPropagation();
  const isExpanded = btn.classList.contains('expanded');
  btn.classList.toggle('expanded', !isExpanded);
  btn.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
  const arrow = btn.querySelector('.collapse-arrow-icon');
  if (arrow) {
    arrow.textContent = !isExpanded ? '−' : '+';
  }
}
window.toggleSiteCollapse = toggleSiteCollapse;

let currentLightboxIndex = 0;

// Working Sites Category Filter Tabs
function initWorkingSitesTabs() {
  const filterBtns = document.querySelectorAll('.site-filter-btn');
  const siteCards = document.querySelectorAll('.site-card');

  if (!filterBtns.length || !siteCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      siteCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const matches = filter === 'all' || category === filter;

        if (matches) {
          card.classList.remove('is-hidden');
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px) scale(0.97)';
          card.classList.add('is-hidden');
          setTimeout(() => {
            if (card.classList.contains('is-hidden')) {
              card.style.display = 'none';
            }
          }, 240);
        }
      });
    });
  });
}

// Lightbox Modal Initializer
function initSiteLightbox() {
  const modal = document.getElementById('siteLightboxModal');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const backdrop = document.getElementById('lightboxBackdrop');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  if (!modal) return;

  // Window global function so card clicks trigger it
  window.openSiteLightbox = function(siteId) {
    const idx = WORKING_SITES_DATA.findIndex(s => s.id === siteId);
    if (idx !== -1) {
      currentLightboxIndex = idx;
      renderLightboxContent();
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeSiteLightbox = function() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', window.closeSiteLightbox);
  if (backdrop) backdrop.addEventListener('click', window.closeSiteLightbox);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentLightboxIndex = (currentLightboxIndex - 1 + WORKING_SITES_DATA.length) % WORKING_SITES_DATA.length;
      renderLightboxContent();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentLightboxIndex = (currentLightboxIndex + 1) % WORKING_SITES_DATA.length;
      renderLightboxContent();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') window.closeSiteLightbox();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

function renderLightboxContent() {
  const data = WORKING_SITES_DATA[currentLightboxIndex];
  if (!data) return;

  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCap');
  const title = document.getElementById('lightboxTitle');
  const location = document.getElementById('lightboxLocation');
  const gps = document.getElementById('lightboxGps');
  const structure = document.getElementById('lightboxStructure');
  const desc = document.getElementById('lightboxDesc');
  const counter = document.getElementById('lightboxCounter');
  const waBtn = document.getElementById('lightboxWaBtn');

  if (img) {
    img.style.opacity = '0.3';
    img.src = data.image;
    img.alt = data.alt;
    img.onload = () => { img.style.opacity = '1'; };
  }

  if (cap) cap.textContent = data.type;
  if (title) title.textContent = data.title;
  if (location) location.textContent = data.location;
  if (gps) gps.textContent = data.gps;
  if (structure) structure.textContent = data.structure;
  if (desc) desc.textContent = data.desc;
  if (counter) counter.textContent = `${currentLightboxIndex + 1} / ${WORKING_SITES_DATA.length}`;

  if (waBtn) {
    const waUrl = `https://wa.me/917055507719?text=${encodeURIComponent(data.waMessage)}`;
    waBtn.href = waUrl;
  }
}

// Staggered Scroll Animation for Working Sites
function initWorkingSitesAnimation() {
  const cards = document.querySelectorAll('.site-card');
  if (!cards.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 90);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease';
      observer.observe(card);
    });
  }
}
