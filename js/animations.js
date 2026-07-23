/* ==========================================================================
   ENHANCED AI PORTFOLIO WEBSITE - ANIMATIONS & GRAPHICS
   # PURPOSE: Canvas background particle loop, typing effect, skill bar observer,
   project filtering, and Intersection Observer reveal transitions.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initCanvasParticles();
  initTypingEffect();
  initScrollAnimations();
  initSkillBars();
  initProjectFilters();
  initTestimonialsSlider();
});

/* --------------------------------------------------------------------------
   1. LOADING SCREEN DISMISSAL
   -------------------------------------------------------------------------- */
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
      }, 400);
    });
    // Fallback dismiss after 2s if window load event fired early
    setTimeout(() => {
      if (!loadingScreen.classList.contains('fade-out')) {
        loadingScreen.classList.add('fade-out');
      }
    }, 2000);
  }
}

/* --------------------------------------------------------------------------
   2. HTML5 CANVAS PARTICLE SYSTEM (AI NEURAL NETWORK CONNECTIONS)
   -------------------------------------------------------------------------- */
function initCanvasParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 18), 75);
  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(229, 169, 60, 0.65)';
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive push/attract
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= forceDirectionX * force * 1.5;
          this.y -= forceDirectionY * force * 1.5;
        }
      }
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - dist / 130) * 0.3;
          ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   3. ANIMATED TYPING EFFECT
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;

  const titles = [
    'AI & Data Science Student',
    'Machine Learning Researcher',
    'Computer Vision Enthusiast',
    'Full-Stack Developer'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingText.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. INTERSECTION OBSERVER SCROLL REVEALS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-up, .zoom-in, .slide-left, .slide-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. SKILL PROGRESS BARS ANIMATION
   -------------------------------------------------------------------------- */
function initSkillBars() {
  const progressBars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-progress');
        entry.target.style.width = targetWidth;
      }
    });
  }, { threshold: 0.3 });

  progressBars.forEach(bar => observer.observe(bar));
}

/* --------------------------------------------------------------------------
   6. PROJECT CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const categories = category.split(' ');
        if (filter === 'all' || categories.includes(filter) || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. TESTIMONIALS CAROUSEL SLIDER CONTROLS
   -------------------------------------------------------------------------- */
function initTestimonialsSlider() {
  const slider = document.getElementById('testimonials-slider');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (slider && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
    });
  }
}
