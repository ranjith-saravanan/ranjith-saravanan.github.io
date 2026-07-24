/* ==========================================================================
   ENHANCED AI PORTFOLIO WEBSITE - MAIN JS
   # PURPOSE: Handles theme persistence, mobile menu drawer, scroll spy nav,
   custom cursor follower, top progress bar, and numerical stat counters.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollProgressAndSpy();
  initCustomCursor();
  initBackToTop();
  initStatCounters();
});

/* --------------------------------------------------------------------------
   1. THEME MANAGEMENT (DARK / LIGHT TOGGLE)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
  const savedTheme = localStorage.getItem('portfolio-theme');

  // Check user preference or saved localStorage
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
  } else {
    document.body.classList.remove('light-theme');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
      if (themeIcon) {
        themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. SCROLL PROGRESS BAR & SCROLL SPY NAV (OPTIMIZED VIA rAF)
   -------------------------------------------------------------------------- */
function initScrollProgressAndSpy() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let ticking = false;

  function updateScrollState() {
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }

    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. CUSTOM FOLLOW-CURSOR (OPTIMIZED HIGH PERFORMANCE LERP LOOP)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const outline = document.querySelector('.custom-cursor-outline');

  if (!dot || !outline) return;

  document.body.classList.add('cursor-active');

  let mouseX = -100, mouseY = -100;
  let outlineX = -100, outlineY = -100;

  window.addEventListener('mousemove', (e) => {
    document.body.classList.add('cursor-active');
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  function renderCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
    window.requestAnimationFrame(renderCursor);
  }
  window.requestAnimationFrame(renderCursor);

  // Scale cursor on hover over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .glass-card, .filter-btn, .project-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('custom-cursor-hover'), { passive: true });
    el.addEventListener('mouseleave', () => document.body.classList.remove('custom-cursor-hover'), { passive: true });
  });

  window.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'), { passive: true });
}

/* --------------------------------------------------------------------------
   5. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   6. ANIMATED STATISTICAL COUNTERS
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;

          const counter = setInterval(() => {
            current += step;
            if (current >= target) {
              stat.textContent = target;
              clearInterval(counter);
            } else {
              stat.textContent = current;
            }
          }, 16);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('hero-stats');
  if (statsSection) observer.observe(statsSection);
}
