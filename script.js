/**
 * Govind Solar Solutions - Modern High-Converting Interactive Engine
 * Author: Govind Solar Solutions (Maneet Singh, Bulandshahr)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initScrollSpy();
  initRoiCalculator();
  initProductTabs();
  initWorkingSitesTabs();
  initSiteLightbox();
  initFaqAccordion();
  initDualActionContactForm();
});

/* ==========================================================================
   1. MOBILE & TABLET NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const navToggle = document.getElementById('navToggleBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link, .btn-header-calc, .btn-header-call');

  if (!navToggle || !mainNav) return;

  function toggleMenu(open) {
    if (open) {
      mainNav.classList.add('open');
      navToggle.classList.add('open');
      document.body.classList.add('menu-open');
    } else {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  }

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('open');
    toggleMenu(!isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && !navToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   2. HEADER SCROLL EFFECT & SCROLL SPY
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isCurrent = href === '#' + currentId;
      link.classList.toggle('active', isCurrent);
    });
  }, { passive: true });
}

/* ==========================================================================
   3. SOLAR ROI & SAVINGS CALCULATOR (INTERACTIVE ENGINE)
   ========================================================================== */
function initRoiCalculator() {
  const slider = document.getElementById('billSlider');
  const displayBill = document.getElementById('displayBillValue');
  const presetBtns = document.querySelectorAll('.preset-pill-btn');

  // Result Elements
  const calcKw = document.getElementById('calcKw');
  const calcSubsidy = document.getElementById('calcSubsidy');
  const calcArea = document.getElementById('calcArea');
  const calcMonthlySavings = document.getElementById('calcMonthlySavings');
  const calcLifetimeSavings = document.getElementById('calcLifetimeSavings');
  const calcPayback = document.getElementById('calcPayback');
  const calcWaCta = document.getElementById('calcWaCta');

  if (!slider || !displayBill) return;

  function calculateSolarROI(bill) {
    let kw = 3;
    let subsidy = 78000;
    let area = 300;
    let paybackYears = '2.8 - 3.2 Years';

    if (bill <= 2500) {
      kw = 1;
      subsidy = 30000;
      area = 100;
      paybackYears = '3.0 - 3.5 Years';
    } else if (bill <= 4500) {
      kw = 2;
      subsidy = 60000;
      area = 200;
      paybackYears = '2.7 - 3.1 Years';
    } else if (bill <= 6500) {
      kw = 3;
      subsidy = 78000;
      area = 300;
      paybackYears = '2.8 - 3.0 Years';
    } else if (bill <= 8500) {
      kw = 4;
      subsidy = 78000;
      area = 400;
      paybackYears = '2.9 - 3.2 Years';
    } else if (bill <= 11500) {
      kw = 5;
      subsidy = 78000;
      area = 500;
      paybackYears = '2.8 - 3.1 Years';
    } else if (bill <= 14500) {
      kw = 8;
      subsidy = 78000;
      area = 800;
      paybackYears = '2.9 - 3.3 Years';
    } else {
      kw = 10;
      subsidy = 78000;
      area = 1000;
      paybackYears = '3.0 - 3.4 Years';
    }

    // Monthly savings is ~90% of electricity bill
    const monthlySavings = Math.round(bill * 0.90);
    const annualSavings = monthlySavings * 12;
    const lifetimeSavingsLakhs = ((annualSavings * 25) / 100000).toFixed(1);

    // Update Slider track color fill
    const min = parseFloat(slider.min) || 1500;
    const max = parseFloat(slider.max) || 15000;
    const percentage = ((bill - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #F59E0B 0%, #F59E0B ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`;

    // Update UI Values
    displayBill.textContent = `₹${bill.toLocaleString('en-IN')}`;
    if (calcKw) calcKw.textContent = `${kw} kW`;
    if (calcSubsidy) calcSubsidy.textContent = `₹${subsidy.toLocaleString('en-IN')}`;
    if (calcArea) calcArea.textContent = `${area} sq. ft.`;
    if (calcMonthlySavings) calcMonthlySavings.textContent = `₹${monthlySavings.toLocaleString('en-IN')}`;
    if (calcLifetimeSavings) calcLifetimeSavings.textContent = `₹${lifetimeSavingsLakhs} Lakhs+`;
    if (calcPayback) calcPayback.textContent = paybackYears;

    // Update WhatsApp CTA Link dynamically
    if (calcWaCta) {
      const waText = `Hello Maneet Ji, maine Govind Solar website par Solar ROI Calculator use kiya.\n\n⚡ Mera Monthly Bill: ₹${bill.toLocaleString('en-IN')}\n☀️ Recommended System: ${kw} kW\n🏛️ Expected PM Surya Ghar Subsidy: ₹${subsidy.toLocaleString('en-IN')}\n💰 Estimated Monthly Savings: ₹${monthlySavings.toLocaleString('en-IN')}\n\nMujhe free site inspection aur quotation chahiye.`;
      calcWaCta.href = `https://wa.me/917055507719?text=${encodeURIComponent(waText)}`;
      calcWaCta.innerHTML = `<span>Claim ₹${subsidy.toLocaleString('en-IN')} Subsidy & Get ${kw} kW Quote on WhatsApp &rarr;</span>`;
    }
  }

  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    // Remove active state from preset buttons
    presetBtns.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-preset-bill'), 10) === val);
    });
    calculateSolarROI(val);
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = parseInt(btn.getAttribute('data-preset-bill'), 10);
      slider.value = val;
      calculateSolarROI(val);
    });
  });

  // Initial Run with default value (4500)
  calculateSolarROI(parseInt(slider.value, 10) || 4500);
}

/* ==========================================================================
   4. PRODUCT SHOWCASE FILTER TABS
   ========================================================================== */
function initProductTabs() {
  const tabs = document.querySelectorAll('.product-filter-btn');
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
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px) scale(0.98)';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. WORKING SITES & LIGHTBOX ENGINE
   ========================================================================== */
const WORKING_SITES_DATA = [
  {
    id: 1,
    title: 'Residential Rooftop Solar System',
    type: 'Residential 5 kW',
    image: 'images/site-1.jpg',
    alt: 'Residential Rooftop Solar System in Shanti Niketan Colony Devpuri-II Bulandshahr',
    location: '657, Shanti Niketan Colony, Devpuri-II, Bulandshahr, UP',
    gps: 'Lat 28.415064° | Long 77.841741°',
    structure: 'Custom Hot-Dip Galvanized Iron (GI) Structure',
    capacity: '5 kW Monocrystalline On-Grid System',
    desc: 'Devpuri-II Bulandshahr mein premium residential rooftop solar installation. High-efficiency monocrystalline solar panels aur heavy-duty galvanized iron frame ke sath set up kiya gaya hai. Customer ko direct ₹78,000 PM Surya Ghar subsidy aur PVVNL net meter sanction hua.',
    waMessage: 'Hello Maneet Ji, maine website par Devpuri-II Shanti Niketan Colony wala solar setup dekha. Mujhe bhi apne ghar ke liye aisa 5 kW system lagwana hai.'
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
    location: '165/1, Girdhari Nagar Marg, Shanti Niketan, Bulandshahr, UP',
    gps: 'Lat 28.414945° | Long 77.840835°',
    structure: 'Anti-Rust Elevated GI with Easy Maintenance Access',
    capacity: '5 kW High-Efficiency On-Grid Rooftop System',
    desc: 'Girdhari Nagar Marg Bulandshahr mein live installation. Is design mein panels ke neeche walking aur water hose pipe cleaning ke liye proper height di gayi hai taaki customer aasani se panels clean karke saal bhar peak generation le sakein.',
    waMessage: 'Hello Maneet Ji, maine website par Girdhari Nagar Shanti Niketan wala elevated solar plant dekha. Mujhe bhi regular maintenance-friendly solar lagwane ki details chahiye.'
  },
  {
    id: 6,
    title: '300+ Rooftop Solar Projects Milestone',
    type: 'Milestone 400+ Sites',
    image: 'images/site-300-plus.jpg',
    alt: '400 Plus Solar Projects Milestone in Bulandshahr by Govind Solar Solutions',
    location: 'Bulandshahr, Khurja, Sikandrabad & NCR Region',
    gps: 'Covering 400+ Rooftops across Western UP',
    structure: 'Custom Residential & Commercial High-Grade GI Mounting',
    capacity: '2+ Megawatts Combined Clean Energy Output',
    desc: 'Govind Solar Solutions dwara Bulandshahr aur aas-paas ke ilaaqon mein 400 se zyada safal solar rooftop systems complete kiye ja chuke hain. 220+ Residential homes, 95+ Commercial sheds aur 85+ agricultural setups par Tier-1 panels, PVVNL net metering aur direct PM Surya Ghar subsidy approval mil chuki hai.',
    waMessage: 'Hello Maneet Ji, maine website par aapka 400+ Solar Projects Milestone dekha. Mujhe bhi apne yahan best rooftop solar system lagwana hai, quotation bhejiye.'
  }
];

let currentLightboxIndex = 0;

function initWorkingSitesTabs() {
  const filterBtns = document.querySelectorAll('.site-filter-btn');
  const siteCards = document.querySelectorAll('.site-card');

  if (!filterBtns.length || !siteCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      siteCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        const matches = filter === 'all' || cat.includes(filter);

        if (matches) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px) scale(0.98)';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });
}

function initSiteLightbox() {
  const modal = document.getElementById('siteLightboxModal');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const backdrop = document.getElementById('lightboxBackdrop');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  if (!modal) return;

  function renderLightbox() {
    const data = WORKING_SITES_DATA[currentLightboxIndex];
    if (!data) return;

    document.getElementById('lightboxImg').src = data.image;
    document.getElementById('lightboxImg').alt = data.alt;
    document.getElementById('lightboxTitle').textContent = data.title;
    document.getElementById('lightboxLoc').textContent = data.location;
    document.getElementById('lightboxGps').textContent = data.gps;
    document.getElementById('lightboxStructure').textContent = data.structure;
    document.getElementById('lightboxCapacity').textContent = data.capacity;
    document.getElementById('lightboxDesc').textContent = data.desc;
    document.getElementById('lightboxCounter').textContent = `${currentLightboxIndex + 1} / ${WORKING_SITES_DATA.length}`;

    const waBtn = document.getElementById('lightboxWaBtn');
    if (waBtn) {
      waBtn.href = `https://wa.me/917055507719?text=${encodeURIComponent(data.waMessage)}`;
    }
  }

  window.openSiteLightbox = function(siteId) {
    const idx = WORKING_SITES_DATA.findIndex(s => s.id === siteId);
    if (idx !== -1) {
      currentLightboxIndex = idx;
      renderLightbox();
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
      renderLightbox();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentLightboxIndex = (currentLightboxIndex + 1) % WORKING_SITES_DATA.length;
      renderLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') window.closeSiteLightbox();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const icon = item.querySelector('.faq-toggle-icon');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherIcon = other.querySelector('.faq-toggle-icon');
        if (otherIcon) otherIcon.textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

/* ==========================================================================
   7. DUAL-ACTION LEAD CAPTURE & CONTACT FORM
   ========================================================================== */
function initDualActionContactForm() {
  const form = document.getElementById('contactForm');
  const waBtn = document.getElementById('btnSubmitWa');
  const callbackBtn = document.getElementById('btnSubmitCallback');
  const modal = document.getElementById('callbackModal');
  const modalClose = document.getElementById('callbackModalClose');

  if (!form) return;

  function validateFormData() {
    const name = form.userName ? form.userName.value.trim() : '';
    const phone = form.userPhone ? form.userPhone.value.trim() : '';
    const city = form.userCity ? form.userCity.value.trim() : 'Bulandshahr';
    const bill = form.userBill ? form.userBill.value : '₹3,000 - ₹5,000';
    const system = form.userService ? form.userService.value : 'On-Grid Rooftop Solar';

    if (!name || name.length < 2) {
      alert('Kripya apna poora naam enter karein.');
      if (form.userName) form.userName.focus();
      return null;
    }

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      alert('Kripya valid 10-digit mobile number enter karein (e.g. 7055507719).');
      if (form.userPhone) form.userPhone.focus();
      return null;
    }

    return { name, phone, city, bill, system };
  }

  // 1. WhatsApp Dispatch Action
  if (waBtn) {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = validateFormData();
      if (!data) return;

      const waText = `*☀️ New Solar Inquiry - Govind Solar Solutions*\n\n👤 *Name:* ${data.name}\n📞 *Phone:* ${data.phone}\n📍 *Area/City:* ${data.city}\n💡 *Monthly Bill:* ${data.bill}\n⚡ *System Type:* ${data.system}\n\n_Mujhe Govind Solar se call & free site inspection chahiye._\n🌐 Source: govindsolarsolutions.com`;

      const url = `https://wa.me/917055507719?text=${encodeURIComponent(waText)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      form.reset();
    });
  }

  // 2. Callback Request Action (Modal + LocalStorage)
  if (callbackBtn) {
    callbackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = validateFormData();
      if (!data) return;

      // Save inquiry to localStorage
      try {
        const inquiries = JSON.parse(localStorage.getItem('govind_solar_leads') || '[]');
        inquiries.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem('govind_solar_leads', JSON.stringify(inquiries));
      } catch (err) {
        console.warn(err);
      }

      // Show Confirmation Modal
      if (modal) {
        const modalMsg = document.getElementById('callbackModalMsg');
        if (modalMsg) {
          modalMsg.innerHTML = `Dhanyawaad <strong>${data.name}</strong>! Aapki solar inquiry register ho gayi hai.<br>Maneet Singh ji (Govind Solar) aapse number <strong>${data.phone}</strong> par agle 15 minutes mein contact karenge.`;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      form.reset();
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}
