/**
 * VOYARA — Luxury Travel Experiences & Bespoke Journeys
 * Core Application Logic & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initCurrentYear();
  initModalListeners();
});

/* ==========================================================================
   1. THEME MANAGEMENT (Light / Dark Mode with LocalStorage)
   ========================================================================== */

function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  
  // Check localStorage or system preference (Default: dark mode for luxury cinema aesthetic)
  const savedTheme = localStorage.getItem('voyara-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark) || !savedTheme;
  
  applyTheme(isDark);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentlyDark = document.documentElement.classList.contains('dark');
      applyTheme(!currentlyDark);
      localStorage.setItem('voyara-theme', !currentlyDark ? 'dark' : 'light');
    });
  }

  function applyTheme(dark) {
    const header = document.getElementById('main-header');
    if (dark) {
      document.documentElement.classList.add('dark');
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
      if (header && window.scrollY > 50) {
        header.classList.remove('header-scrolled-light');
        header.classList.add('header-scrolled');
      }
    } else {
      document.documentElement.classList.remove('dark');
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
      if (header && window.scrollY > 50) {
        header.classList.add('header-scrolled-light');
        header.classList.add('header-scrolled');
      }
    }
  }
}

/* ==========================================================================
   2. NAVIGATION, STICKY HEADER & SCROLL SPY
   ========================================================================== */

function initNavigation() {
  const header = document.getElementById('main-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header background transition on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
      if (!document.documentElement.classList.contains('dark')) {
        header.classList.add('header-scrolled-light');
      }
    } else {
      header.classList.remove('header-scrolled', 'header-scrolled-light');
    }

    // Floating back to top button visibility
    const floatingBtn = document.getElementById('floating-back-to-top');
    if (floatingBtn) {
      if (window.scrollY > 400) {
        floatingBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        floatingBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        floatingBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        floatingBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    }

    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
    });

    // Close mobile menu when link clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}

/* ==========================================================================
   3. INTERACTIVE TRIP INSPIRATION FINDER
   ========================================================================== */

// Curated database of luxury journeys matched with selections
const travelRecommendationsDB = [
  {
    mood: 'relaxation',
    style: 'beach',
    name: 'Private Coral Atoll Sanctuary — Maldives',
    region: 'Indian Ocean',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    description: 'An idyllic escape tailored for pure unwinding and sensory restoration. Suspended stilted villas over crystalline waters with private reef swimming decks, customized Ayurvedic spa therapies, and private sandbank sunrise meditation.',
    highlight: 'Overwater Infinity Suite, Private Dhoni Cruise, Bespoke Sunset Sandbank Dining'
  },
  {
    mood: 'romance',
    style: 'beach',
    name: 'Cliffside Dolce Vita — Amalfi Coast & Capri, Italy',
    region: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    description: 'A timeless romantic sojourn along the vertical jewel of the Mediterranean. Private Riva yacht charters to hidden Faraglioni sea grottos, candlelit dinners under fragrant Ravello lemon groves, and terrace sunsets in Positano.',
    highlight: 'Historic Clifftop Palazzo, Vintage Riva Motor Yacht Charter, Ravello Wine Cellars'
  },
  {
    mood: 'adventure',
    style: 'mountains',
    name: 'Glacial Horizons & Heli-Alpine Expedition — Swiss Alps',
    region: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
    description: 'An adrenaline-infused alpine expedition through the pristine Swiss peaks. Private helicopter glacier landings, high-altitude powder descents with Olympic guides, followed by timber chalet cedar-sauna recovery.',
    highlight: 'Heli-Skiing at the Matterhorn, Glacier Express Excellence Suite, Private Sommelier'
  },
  {
    mood: 'culture',
    style: 'city',
    name: 'Imperial Tranquility & Tea Heritage — Kyoto, Japan',
    region: 'East Asia',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'A deeply meditative journey through Japan’s ancient cultural heart. Dawn entry into Zen moss gardens before public gates open, master tea ceremonies, private kaiseki gastronomy, and historic ryokan living.',
    highlight: 'Private Temple Cloisters, 15th-Gen Tea Master Sessions, Sukiya Heritage Ryokan'
  },
  {
    mood: 'culture',
    style: 'countryside',
    name: 'Royal Riads & Saharan Starlight — Marrakech & Agafay',
    region: 'Morocco',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80',
    description: 'An evocative tapestry of sights, scents, and ancient desert lore. Opulent mosaic courtyards scented with orange blossom, private spice ateliers, and luxury nomadic encampments beneath celestial Saharan skies.',
    highlight: 'Exclusive Historic Palace Access, Candlelit Desert Pavilion, Botanical Hammam Ritual'
  },
  {
    mood: 'relaxation',
    style: 'countryside',
    name: 'Spiritual Rainforest Sanctuary — Ubud & Uluwatu, Bali',
    region: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Harmonize body and mind surrounded by emerald canopies and cascading sacred rivers. Private morning yoga shalas, holistic Ayurvedic healing consultations, and sunset clifftop dinners overlooking the Indian Ocean.',
    highlight: 'Private Jungle Pool Villa, Resident Yoga Master, Traditional Water Temple Purification'
  }
];

window.findTripEscape = function() {
  const mood = document.getElementById('filter-mood').value;
  const style = document.getElementById('filter-style').value;
  const duration = document.getElementById('filter-duration').value;
  const budget = document.getElementById('filter-budget').value;
  const feedbackMsg = document.getElementById('finder-feedback-message');
  const resultContainer = document.getElementById('inspiration-result');

  // Validate all 4 dropdowns
  if (!mood || !style || !duration || !budget) {
    if (feedbackMsg) feedbackMsg.classList.remove('hidden');
    return;
  }

  if (feedbackMsg) feedbackMsg.classList.add('hidden');

  // Match best destination from database or fallback to dynamic custom tailored recommendation
  let match = travelRecommendationsDB.find(item => item.mood === mood && item.style === style);
  
  if (!match) {
    // Secondary match by mood or style
    match = travelRecommendationsDB.find(item => item.mood === mood) || 
            travelRecommendationsDB.find(item => item.style === style) || 
            travelRecommendationsDB[0];
  }

  // Format display labels
  const durationLabels = {
    'weekend': '3–4 Days (Extended Weekend)',
    '5-7': '5–7 Days (Signature Stay)',
    '10-14': '10–14 Days (Grand Expedition)'
  };

  const budgetLabels = {
    'premium': 'Premium Curated Tier',
    'luxury': 'Luxury Elite Tier',
    'ultra-luxury': 'Ultra-Luxury Bespoke Tier'
  };

  // Render the recommendation card
  resultContainer.innerHTML = `
    <div class="bg-white dark:bg-midnight-800 border-2 border-champagne rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <!-- Image with Badge -->
        <div class="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-midnight-900 shadow-md">
          <img src="${match.image}" alt="${match.name}" class="w-full h-full object-cover">
          <div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-midnight-900/80 backdrop-blur-md border border-champagne/40 text-[10px] uppercase tracking-luxury text-champagne">
            Voyara Tailored Recommendation
          </div>
          <div class="absolute bottom-4 left-4 right-4 px-3 py-1.5 rounded-xl bg-midnight-900/90 backdrop-blur-md text-[11px] text-ivory/90 flex justify-between">
            <span>${match.region}</span>
            <span class="text-champagne font-semibold">${durationLabels[duration] || 'Custom Pacing'}</span>
          </div>
        </div>

        <!-- Details -->
        <div class="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-champagne/15 text-champagne text-[10px] uppercase tracking-luxury font-semibold">
                ${budgetLabels[budget] || 'Luxury'}
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-midnight-800/10 dark:bg-white/10 text-midnight-700 dark:text-ivory/80 text-[10px] uppercase tracking-luxury">
                ${mood.toUpperCase()} &bull; ${style.toUpperCase()}
              </span>
            </div>

            <h3 class="font-serif text-2xl sm:text-3xl text-midnight-800 dark:text-white font-normal mb-3">
              ${match.name}
            </h3>

            <p class="text-xs sm:text-sm text-midnight-600 dark:text-ivory/80 leading-relaxed font-light mb-4">
              ${match.description}
            </p>

            <div class="p-3.5 rounded-xl bg-ivory dark:bg-midnight-900/70 border border-champagne/30 text-xs mb-6">
              <span class="text-champagne font-semibold text-[10px] uppercase tracking-luxury block mb-1">Recommended Inclusions</span>
              <span class="text-midnight-700 dark:text-ivory/90 font-light">${match.highlight}</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-3">
            <a href="#consultation" onclick="prefillConsultation('${match.name}', '${durationLabels[duration]}', '${budgetLabels[budget]}')" 
               class="w-full sm:w-auto px-6 py-3 rounded-full bg-champagne text-midnight-900 text-xs font-semibold uppercase tracking-luxury hover:bg-champagne-300 transition-all text-center">
              Inquire This Recommendation &rarr;
            </a>
            <button type="button" onclick="resetInspirationForm()" 
                    class="w-full sm:w-auto px-5 py-3 rounded-full border border-midnight-800/20 dark:border-ivory/20 text-xs uppercase tracking-luxury hover:border-champagne hover:text-champagne transition-all text-center">
              Try Another Combination
            </button>
          </div>

        </div>

      </div>
    </div>
  `;

  resultContainer.classList.remove('hidden');
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.resetInspirationForm = function() {
  document.getElementById('inspiration-form').reset();
  const feedbackMsg = document.getElementById('finder-feedback-message');
  const resultContainer = document.getElementById('inspiration-result');
  if (feedbackMsg) feedbackMsg.classList.add('hidden');
  if (resultContainer) {
    resultContainer.classList.add('hidden');
    resultContainer.innerHTML = '';
  }
};

window.prefillConsultation = function(destinationName, duration, budget) {
  const destInput = document.getElementById('consult-destination');
  const notesInput = document.getElementById('consult-notes');
  
  if (notesInput) {
    notesInput.value = `Inspired by the bespoke recommendation: ${destinationName} (${duration}, ${budget}).`;
  }
};

/* ==========================================================================
   4. MODALS & LIGHTBOXES
   ========================================================================== */

function initModalListeners() {
  // Close universal modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeUniversalModal();
      closeGalleryModal();
    }
  });

  // Close modal when clicking outside dialog
  const universalModal = document.getElementById('universal-modal');
  if (universalModal) {
    universalModal.addEventListener('click', (e) => {
      if (e.target === universalModal) {
        closeUniversalModal();
      }
    });
  }
}

window.openUniversalModal = function(title, badge, description, image, extraHtml = '') {
  const modal = document.getElementById('universal-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalDesc = document.getElementById('modal-description');
  const modalImage = document.getElementById('modal-image');
  const modalExtra = document.getElementById('modal-extra-content');

  if (modalTitle) modalTitle.textContent = title;
  if (modalBadge) modalBadge.textContent = badge;
  if (modalDesc) modalDesc.textContent = description;
  if (modalImage) {
    modalImage.src = image;
    modalImage.alt = title;
  }
  if (modalExtra) modalExtra.innerHTML = extraHtml;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
};

window.closeUniversalModal = function() {
  const modal = document.getElementById('universal-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

// Destination Modal
window.openDestinationModal = function(title, description, image, region) {
  const extraHtml = `
    <div class="pt-4 border-t border-champagne/20">
      <h4 class="text-xs uppercase tracking-luxury text-champagne font-semibold mb-3">Voyara Signature Touches</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-midnight-700 dark:text-ivory/80">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-champagne"></span>
          <span>Private Aviation &amp; Chauffeur Integration</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-champagne"></span>
          <span>Access to Private Estates &amp; Closed Sanctuaries</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-champagne"></span>
          <span>24/7 Dedicated Journey Host</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-champagne"></span>
          <span>Curated Dietary &amp; Epicurean Tastings</span>
        </div>
      </div>
    </div>
  `;
  openUniversalModal(title, region, description, image, extraHtml);
};

// Experience Modal
window.openExperienceModal = function(title, description, image, highlights = []) {
  let highlightsHtml = '';
  if (highlights && highlights.length) {
    highlightsHtml = `
      <div class="pt-4 border-t border-champagne/20">
        <h4 class="text-xs uppercase tracking-luxury text-champagne font-semibold mb-3">Key Experience Highlights</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${highlights.map(h => `
            <div class="flex items-center gap-2 text-xs text-midnight-700 dark:text-ivory/80">
              <span class="w-1.5 h-1.5 rounded-full bg-champagne"></span>
              <span>${h}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  openUniversalModal(title, 'Extraordinary Experience', description, image, highlightsHtml);
};

// Stay Modal
window.openStayModal = function(title, description, image, location, highlights = []) {
  let highlightsHtml = '';
  if (highlights && highlights.length) {
    highlightsHtml = `
      <div class="pt-4 border-t border-champagne/20">
        <h4 class="text-xs uppercase tracking-luxury text-champagne font-semibold mb-3">Property Highlights</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${highlights.map(h => `
            <div class="flex items-center gap-2 text-xs text-midnight-700 dark:text-ivory/80">
              <span class="w-1.5 h-1.5 rounded-full bg-champagne"></span>
              <span>${h}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  openUniversalModal(title, `Curated Stay Inspiration &bull; ${location}`, description, image, highlightsHtml);
};

// Itinerary Modal (Day-by-Day expansion)
window.openItineraryModal = function(title, destination, duration, overview, image, days = []) {
  let daysHtml = '';
  if (days && days.length) {
    daysHtml = `
      <div class="pt-4 border-t border-champagne/20">
        <h4 class="text-xs uppercase tracking-luxury text-champagne font-semibold mb-4">Sample Day-by-Day Progression</h4>
        <div class="space-y-4">
          ${days.map(d => `
            <div class="p-3.5 rounded-xl bg-ivory dark:bg-midnight-900 border border-champagne/20">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[11px] uppercase tracking-luxury text-champagne font-semibold">${d.day}</span>
                <span class="font-serif text-xs text-midnight-800 dark:text-white font-medium">${d.title}</span>
              </div>
              <p class="text-xs text-midnight-600 dark:text-ivory/70 font-light leading-relaxed">${d.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  openUniversalModal(`${title} (${duration})`, `Curated Itinerary &bull; ${destination}`, overview, image, daysHtml);
};

// Gallery Lightbox Modal
window.openGalleryModal = function(title, desc, image) {
  const lightbox = document.getElementById('gallery-lightbox');
  const lbImg = document.getElementById('lightbox-image');
  const lbTitle = document.getElementById('lightbox-title');
  const lbDesc = document.getElementById('lightbox-desc');

  if (lbImg) {
    lbImg.src = image;
    lbImg.alt = title;
  }
  if (lbTitle) lbTitle.textContent = title;
  if (lbDesc) lbDesc.textContent = desc;

  if (lightbox) {
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
};

window.closeGalleryModal = function() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (lightbox) {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

/* ==========================================================================
   5. CONSULTATION FORM VALIDATION & REALISTIC SUBMISSION
   ========================================================================== */

window.submitConsultationForm = function() {
  const name = document.getElementById('consult-name').value.trim();
  const email = document.getElementById('consult-email').value.trim();
  const destination = document.getElementById('consult-destination').value;
  const date = document.getElementById('consult-date').value.trim();
  const travelers = document.getElementById('consult-travelers').value;
  const style = document.getElementById('consult-style').value;
  const budget = document.getElementById('consult-budget').value;
  const notes = document.getElementById('consult-notes').value.trim();

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const destError = document.getElementById('dest-error');
  const dateError = document.getElementById('date-error');
  const travelersError = document.getElementById('travelers-error');
  const styleError = document.getElementById('style-error');
  const budgetError = document.getElementById('budget-error');
  const submitBtn = document.getElementById('consultation-submit-btn');
  const responseState = document.getElementById('consultation-response-state');

  // Reset errors
  [nameError, emailError, destError, dateError, travelersError, styleError, budgetError].forEach(el => {
    if (el) el.classList.add('hidden');
  });

  let hasError = false;

  if (!name) {
    if (nameError) nameError.classList.remove('hidden');
    hasError = true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    if (emailError) emailError.classList.remove('hidden');
    hasError = true;
  }

  if (!destination) {
    if (destError) destError.classList.remove('hidden');
    hasError = true;
  }

  if (!date) {
    if (dateError) dateError.classList.remove('hidden');
    hasError = true;
  }

  if (!travelers) {
    if (travelersError) travelersError.classList.remove('hidden');
    hasError = true;
  }

  if (!style) {
    if (styleError) styleError.classList.remove('hidden');
    hasError = true;
  }

  if (!budget) {
    if (budgetError) budgetError.classList.remove('hidden');
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // Set loading state on submit button
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin w-4 h-4 text-midnight-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Structuring Your Dossier...</span>
    `;
  }

  // Simulate network request with realistic honest disclosure
  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Request a Travel Consultation</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      `;
    }

    if (responseState) {
      responseState.classList.remove('hidden');
      responseState.className = 'p-6 rounded-2xl border border-champagne/40 bg-champagne/10 dark:bg-midnight-900/90 text-midnight-800 dark:text-ivory space-y-3 animate-fade-in-up';
      responseState.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-champagne text-midnight-900 flex items-center justify-center font-bold">✓</div>
          <div>
            <h4 class="font-serif text-base font-semibold text-midnight-900 dark:text-champagne">Consultation Request Prepared</h4>
            <p class="text-xs text-midnight-600 dark:text-ivory/70">Thank you, ${name}. Your journey dossier has been compiled with precision.</p>
          </div>
        </div>

        <div class="bg-white/80 dark:bg-midnight-800/80 p-4 rounded-xl border border-champagne/20 space-y-1.5 text-[11px]">
          <div class="flex justify-between"><strong>Destination:</strong> <span>${destination}</span></div>
          <div class="flex justify-between"><strong>Target Timeline:</strong> <span>${date}</span></div>
          <div class="flex justify-between"><strong>Party:</strong> <span>${travelers} &bull; ${style}</span></div>
          <div class="flex justify-between"><strong>Budget Bracket:</strong> <span>${budget}</span></div>
          <div class="flex justify-between"><strong>Confirmation Email:</strong> <span>${email}</span></div>
        </div>

        <p class="text-[11px] text-midnight-600 dark:text-ivory/60 leading-relaxed italic border-t border-champagne/20 pt-3">
          *Front-end validation successful. Note: In this demonstration build, no live email server is configured. For live production delivery, connect this form to your secure CRM or API endpoint (e.g., SendGrid, Formspree, or custom webhook).
        </p>
      `;

      // Reset form fields
      document.getElementById('consultation-form').reset();
    }
  }, 1200);
};

/* ==========================================================================
   6. NEWSLETTER SUBSCRIPTION
   ========================================================================== */

window.submitNewsletter = function() {
  const emailInput = document.getElementById('newsletter-email');
  const feedback = document.getElementById('newsletter-feedback');
  const email = emailInput.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    if (feedback) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.classList.remove('hidden', 'text-champagne');
      feedback.classList.add('text-rose-400');
    }
    return;
  }

  if (feedback) {
    feedback.textContent = `Thank you. ${email} has been registered to receive the VOYARA Private Dispatch. (Live distribution requires email marketing platform integration).`;
    feedback.classList.remove('hidden', 'text-rose-400');
    feedback.classList.add('text-champagne');
  }

  emailInput.value = '';
};

/* ==========================================================================
   7. FOOTER YEAR
   ========================================================================== */

function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
