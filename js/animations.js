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
  init3DMotionEffect();
  init3DNeuralCoreStage();
  initAbout3DDataScienceModel();
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
    'AI Systems Engineer',
    'Deep Learning Specialist',
    'Computer Vision & NLP Engineer',
    'MLOps & Backend Developer'
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

/* --------------------------------------------------------------------------
   8. INTERACTIVE 3D MOTION & TILT EFFECT FOR PROFILE IMAGE & CARDS
   -------------------------------------------------------------------------- */
function init3DMotionEffect() {
  const tiltElements = document.querySelectorAll('[data-tilt-3d="true"], .hero-avatar-wrapper');

  tiltElements.forEach((container) => {
    const card = container.querySelector('.avatar-image-card') || container;
    const img = container.querySelector('img');
    const glare = container.querySelector('.avatar-glare-overlay');
    const badges = container.querySelectorAll('.avatar-3d-badge');

    let bounds = null;
    let isHovered = false;

    // Current & Target rotation angles for spring interpolation
    let currRotateX = 0;
    let currRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;

    // Idle motion wave counter
    let idleAngle = Math.random() * 100;

    function updateBounds() {
      bounds = container.getBoundingClientRect();
    }

    function onMouseEnter() {
      isHovered = true;
      updateBounds();
      if (glare) glare.style.opacity = '1';
    }

    function onMouseMove(e) {
      if (!bounds) updateBounds();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      // Normalize tilt coordinates (-1 to 1)
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      // Max tilt degrees (24 deg)
      targetRotateX = -percentY * 24;
      targetRotateY = percentX * 24;

      // Dynamic Glare Spotlight position
      if (glare) {
        const glareX = Math.max(0, Math.min(100, (x / bounds.width) * 100));
        const glareY = Math.max(0, Math.min(100, (y / bounds.height) * 100));
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 75%)`;
      }
    }

    function onMouseLeave() {
      isHovered = false;
      targetRotateX = 0;
      targetRotateY = 0;
      if (glare) glare.style.opacity = '0';
    }

    function onTouchMove(e) {
      if (e.touches && e.touches.length > 0) {
        onMouseMove(e.touches[0]);
      }
    }

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('touchstart', onMouseEnter, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onMouseLeave, { passive: true });
    window.addEventListener('resize', updateBounds);

    function animate3DMotion() {
      if (isHovered) {
        // Smooth Lerp physics towards cursor
        currRotateX += (targetRotateX - currRotateX) * 0.12;
        currRotateY += (targetRotateY - currRotateY) * 0.12;
      } else {
        // Continuous 3D floating wave motion when idle
        idleAngle += 0.025;
        const idleX = Math.sin(idleAngle) * 7;
        const idleY = Math.cos(idleAngle * 0.7) * 9;

        currRotateX += (idleX - currRotateX) * 0.05;
        currRotateY += (idleY - currRotateY) * 0.05;
      }

      // Apply 3D perspective rotation to avatar card
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(${currRotateX.toFixed(2)}deg) rotateY(${currRotateY.toFixed(2)}deg) translateZ(10px)`;
        card.style.boxShadow = `${-currRotateY * 1.5}px ${currRotateX * 1.5 + 25}px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.45)`;
      }

      // Pop image forward with 3D depth layer
      if (img) {
        img.style.transform = `translateZ(35px) scale(${isHovered ? 1.08 : 1.04})`;
      }

      // Parallax offset for floating badges
      badges.forEach((badge, idx) => {
        const factor = (idx + 1) * 12;
        const badgeX = currRotateY * 0.45;
        const badgeY = -currRotateX * 0.45;
        badge.style.transform = `translate3d(${badgeX}px, ${badgeY}px, ${65 + factor}px)`;
      });

      requestAnimationFrame(animate3DMotion);
    }

    animate3DMotion();
  });
}

/* --------------------------------------------------------------------------
   9. HOLOGRAPHIC 3D NEURAL CORE STAGE (HERO SHOWCASE)
   -------------------------------------------------------------------------- */
function init3DNeuralCoreStage() {
  const canvas = document.getElementById('hero-mini-3d-canvas') || document.getElementById('avatar-neural-canvas');
  const container = document.querySelector('.frameless-hero-profile') || document.querySelector('.hero-avatar-wrapper');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  const size = 400;
  canvas.width = size;
  canvas.height = size;
  const center = { x: size / 2, y: size / 2 };

  container.addEventListener('click', () => {
    container.classList.toggle('model-active');
  });

  container.addEventListener('touchstart', () => {
    container.classList.toggle('model-active');
  }, { passive: true });

  // Theme Palette: Warm Golden Amber, Orange, and Gold
  const themeColors = ['#e5a93c', '#f97316', '#f59e0b', '#d97706', '#faf6f0'];

  // 1. Build High-Density 3D Quantum Neural Dot Matrix
  const dots = [];
  const rings = 18;
  const dotsPerRing = 20;
  const radius = 138;

  for (let i = 0; i < rings; i++) {
    const phi = Math.acos(-1 + (2 * i) / rings);
    for (let j = 0; j < dotsPerRing; j++) {
      const theta = (2 * Math.PI * j) / dotsPerRing;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const color = themeColors[(i + j) % themeColors.length];

      dots.push({
        origX: x, origY: y, origZ: z,
        baseRadius: Math.random() * 1.5 + 2.0,
        phase: Math.random() * Math.PI * 2,
        color: color
      });
    }
  }

  let rotX = 0.2;
  let rotY = 0.4;
  let time = 0;

  // Replicated Clones Particle Pool
  let replicatedClones = [];
  let mousePos = { x: -999, y: -999 };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mousePos = { x: -999, y: -999 };
  });

  // Touch / Click Burst Replication
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // Trigger Mega Replication Burst
    for (let k = 0; k < 28; k++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.5;
      replicatedClones.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1.8,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  });

  function project3D(x, y, z) {
    let cos = Math.cos(rotX);
    let sin = Math.sin(rotX);
    let y1 = y * cos - z * sin;
    let z1 = y * sin + z * cos;

    cos = Math.cos(rotY);
    sin = Math.sin(rotY);
    let x2 = x * cos + z1 * sin;
    let z2 = -x * sin + z1 * cos;

    const fov = 340;
    const scale = fov / (fov + z2 + 110);
    return {
      x: center.x + x2 * scale,
      y: center.y + y1 * scale,
      scale: scale,
      z: z2
    };
  }

  function renderHero3DDots() {
    ctx.clearRect(0, 0, size, size);
    time += 0.015;

    rotX += 0.003;
    rotY += 0.005;

    const projected = dots.map((dot) => {
      const wave = Math.sin(time * 2 + dot.phase) * 8;
      const p = project3D(dot.origX, dot.origY + wave, dot.origZ);
      p.color = dot.color;
      p.baseRadius = dot.baseRadius;

      // Mouse Proximity Replication Check
      const distToMouse = Math.hypot(p.x - mousePos.x, p.y - mousePos.y);
      if (distToMouse < 45 && Math.random() < 0.35) {
        // Replicate micro twin dot
        replicatedClones.push({
          x: p.x,
          y: p.y,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5,
          radius: p.baseRadius * 0.9,
          color: '#faf6f0',
          life: 1.0,
          decay: 0.04
        });
      }

      return p;
    });

    projected.sort((a, b) => b.z - a.z);

    // Warm Amber Neural mesh connections
    for (let i = 0; i < projected.length; i++) {
      const p1 = projected[i];
      if (p1.z > 50) continue;
      for (let j = i + 1; j < projected.length; j++) {
        const p2 = projected[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 48) {
          const alpha = (1 - dist / 48) * 0.35 * Math.min(p1.scale, p2.scale);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(229, 169, 60, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Render 3D Dots
    projected.forEach((p) => {
      const r = Math.max(1, p.baseRadius * p.scale);
      const alpha = Math.max(0.25, Math.min(1, (p.z + 150) / 280));
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1.0;
    });

    // Render & Update Replicated Clones
    replicatedClones = replicatedClones.filter(clone => clone.life > 0);
    replicatedClones.forEach((clone) => {
      clone.x += clone.vx;
      clone.y += clone.vy;
      clone.life -= clone.decay;

      ctx.beginPath();
      ctx.arc(clone.x, clone.y, Math.max(0.5, clone.radius * clone.life), 0, Math.PI * 2);
      ctx.fillStyle = clone.color;
      ctx.shadowColor = '#e5a93c';
      ctx.shadowBlur = 10;
      ctx.globalAlpha = Math.max(0, clone.life);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
    });

    requestAnimationFrame(renderHero3DDots);
  }

  renderHero3DDots();
}

/* --------------------------------------------------------------------------
   10. INTERACTIVE 3D DOT MOTION GRAPHICS ENGINE (ABOUT ME SHOWCASE)
   -------------------------------------------------------------------------- */
function initAbout3DDataScienceModel() {
  const canvas = document.getElementById('about-3d-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const size = 380;
  canvas.width = size;
  canvas.height = size;

  const center = { x: size / 2, y: size / 2 };

  // Theme Palette: Warm Golden Amber, Orange, Gold, Cream
  const themeColors = ['#e5a93c', '#f97316', '#f59e0b', '#d97706', '#faf6f0'];

  // 1. Generate 3D Dot Matrix Cloud (Sphere & Wave Lattice)
  const dots = [];
  const numRings = 14;
  const dotsPerRing = 16;
  const radius = 135;

  for (let i = 0; i < numRings; i++) {
    const phi = Math.acos(-1 + (2 * i) / numRings);
    for (let j = 0; j < dotsPerRing; j++) {
      const theta = (2 * Math.PI * j) / dotsPerRing;

      // 3D Sphere base coordinates with subtle wave perturbation
      const origX = radius * Math.sin(phi) * Math.cos(theta);
      const origY = radius * Math.cos(phi);
      const origZ = radius * Math.sin(phi) * Math.sin(theta);

      const color = themeColors[(i + j) % themeColors.length];

      dots.push({
        origX, origY, origZ,
        x: origX, y: origY, z: origZ,
        baseRadius: Math.random() * 1.5 + 2.2,
        phase: Math.random() * Math.PI * 2,
        waveSpeed: 0.002 + Math.random() * 0.003,
        color: color
      });
    }
  }

  // Add inner central core 3D dots
  for (let k = 0; k < 25; k++) {
    const r = Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    dots.push({
      origX: r * Math.sin(phi) * Math.cos(theta),
      origY: r * Math.cos(phi),
      origZ: r * Math.sin(phi) * Math.sin(theta),
      x: 0, y: 0, z: 0,
      baseRadius: Math.random() * 2 + 1.5,
      phase: Math.random() * Math.PI * 2,
      waveSpeed: 0.004,
      color: '#f59e0b'
    });
  }

  // Interactive 3D Rotation State
  let rotX = 0.3;
  let rotY = 0.5;
  let rotZ = 0.1;
  let velX = 0.004;
  let velY = 0.007;

  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let mousePos = { x: -999, y: -999 };

  // Replicated Clones Array for Cursor Touch Replication
  let replicatedParticles = [];

  // Mouse & Touch Interactivity
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;

    if (isDragging) {
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      velX = dy * 0.0015;
      velY = dx * 0.0015;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    }
  });

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  // Touch & Click Replication Burst
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    // Trigger Mega Replication Burst on Touch / Click
    for (let k = 0; k < 35; k++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      replicatedParticles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3.5 + 2,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        life: 1.0,
        decay: Math.random() * 0.02 + 0.012
      });
    }
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  canvas.addEventListener('mouseleave', () => {
    mousePos = { x: -999, y: -999 };
    isDragging = false;
  });

  // Touch Support with Replication
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      const tx = e.touches[0].clientX - rect.left;
      const ty = e.touches[0].clientY - rect.top;
      mousePos.x = tx;
      mousePos.y = ty;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      // Spawn Replication Particles on Touch
      for (let k = 0; k < 12; k++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        replicatedParticles.push({
          x: tx,
          y: ty,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 1.5,
          color: themeColors[Math.floor(Math.random() * themeColors.length)],
          life: 1.0,
          decay: 0.025
        });
      }
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.touches[0].clientX - rect.left;
    mousePos.y = e.touches[0].clientY - rect.top;

    const dx = e.touches[0].clientX - prevMouseX;
    const dy = e.touches[0].clientY - prevMouseY;
    rotY += dx * 0.008;
    rotX += dy * 0.008;
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
  }, { passive: true });

  canvas.addEventListener('touchend', () => { isDragging = false; });

  // 3D Projection Calculation
  function project3D(x, y, z) {
    let cos = Math.cos(rotX);
    let sin = Math.sin(rotX);
    let y1 = y * cos - z * sin;
    let z1 = y * sin + z * cos;

    cos = Math.cos(rotY);
    sin = Math.sin(rotY);
    let x2 = x * cos + z1 * sin;
    let z2 = -x * sin + z1 * cos;

    cos = Math.cos(rotZ);
    sin = Math.sin(rotZ);
    let x3 = x2 * cos - y1 * sin;
    let y3 = x2 * sin + y1 * cos;

    const fov = 380;
    const scale = fov / (fov + z2 + 130);
    return {
      x: center.x + x3 * scale,
      y: center.y + y3 * scale,
      scale: scale,
      z: z2
    };
  }

  let time = 0;

  function render3DDotMotion() {
    ctx.clearRect(0, 0, size, size);
    time += 1;

    // Inertial rotation when not dragging
    if (!isDragging) {
      rotX += velX;
      rotY += velY;
      rotZ += 0.001;
      velX *= 0.98;
      velY *= 0.98;
      if (Math.abs(velX) < 0.002) velX = 0.003;
      if (Math.abs(velY) < 0.003) velY = 0.004;
    }

    // 1. Update 3D Dot Wave Motion & Project Coordinates
    const projectedDots = dots.map((dot) => {
      const wave = Math.sin(time * dot.waveSpeed + dot.phase) * 12;
      const curX = dot.origX + Math.cos(time * 0.015 + dot.phase) * 6;
      const curY = dot.origY + wave;
      const curZ = dot.origZ + Math.sin(time * 0.015 + dot.phase) * 6;

      const projected = project3D(curX, curY, curZ);
      projected.color = dot.color;
      projected.baseRadius = dot.baseRadius;

      // Mouse Touch Proximity & Replication Trigger
      const distToMouse = Math.hypot(projected.x - mousePos.x, projected.y - mousePos.y);
      projected.isHovered = distToMouse < 60;
      projected.hoverScale = projected.isHovered ? (1 - distToMouse / 60) * 2.2 : 0;

      // CONTINUOUS CURSOR TOUCH REPLICATION
      if (projected.isHovered && Math.random() < 0.35) {
        replicatedParticles.push({
          x: projected.x + (Math.random() - 0.5) * 8,
          y: projected.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5 - 0.5,
          radius: projected.baseRadius * 0.95,
          color: '#faf6f0', // Replicated Cream Highlight
          life: 1.0,
          decay: 0.03 + Math.random() * 0.02
        });
      }

      return projected;
    });

    // Sort dots by Z depth for accurate 3D rendering
    projectedDots.sort((a, b) => b.z - a.z);

    // 2. Render Warm Amber 3D Neural Mesh Connecting Lines
    const maxConnDist = 55;
    for (let i = 0; i < projectedDots.length; i++) {
      const p1 = projectedDots[i];
      if (p1.z > 60) continue;

      for (let j = i + 1; j < projectedDots.length; j++) {
        const p2 = projectedDots[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

        if (dist < maxConnDist) {
          const alpha = (1 - dist / maxConnDist) * 0.38 * Math.min(p1.scale, p2.scale);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(229, 169, 60, ${alpha})`;
          ctx.lineWidth = 0.95 * p1.scale;
          ctx.stroke();
        }
      }
    }

    // 3. Render 3D Glowing Amber Dots
    projectedDots.forEach((p) => {
      const depthScale = Math.max(0.4, p.scale);
      const dotRadius = Math.max(1, (p.baseRadius + p.hoverScale * 2.5) * depthScale);
      const alpha = Math.max(0.2, Math.min(1, (p.z + 180) / 320));

      ctx.beginPath();
      ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);

      // Glowing effect on hover & front dots
      if (p.isHovered || p.z < -20) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.isHovered ? 18 : 8;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = p.isHovered ? '#ffffff' : p.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
    });

    // 4. Render Active Replicated Clones Particle Trail
    replicatedParticles = replicatedParticles.filter(p => p.life > 0);
    replicatedParticles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.6, p.radius * p.life), 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = '#e5a93c';
      ctx.shadowBlur = 12;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
    });

    requestAnimationFrame(render3DDotMotion);
  }

  render3DDotMotion();
}
