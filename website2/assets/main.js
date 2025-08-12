// Add this script to enable microanimations and interactivity

// Add `js` class for CSS progressive enhancement
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  // Animate hero section on load
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = 0;
    hero.style.transform = 'translateY(40px)';
    setTimeout(() => {
      hero.style.transition =
        'opacity 0.8s cubic-bezier(.77,0,.18,1), transform 0.8s cubic-bezier(.77,0,.18,1)';
      hero.style.opacity = 1;
      hero.style.transform = 'translateY(0)';
    }, 200);
  }

  // Disable feature reveal in dev to avoid accidental hidden content
  const features = document.querySelectorAll('.feature');
  features.forEach((f) => f.classList.add('visible'));

  // Scroll progress bar
  const progress = document.getElementById('progress');
  const updateProgress = () => {
    if (!progress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.max(0, Math.min(1, scrollTop / docHeight));
    progress.style.setProperty('--progress', `${pct * 100}%`);
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Hover tilt effect for product cards
  document.querySelectorAll('.tilt').forEach((card) => {
    const maxTilt = 8; // degrees
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * maxTilt;
      const tiltY = (x - 0.5) * maxTilt;
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };
    const reset = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', reset);
  });

  // Animate-on-scroll with Web Animations API (no hiding before)
  const animateOnScrollEls = document.querySelectorAll('.animate-on-scroll');
  const animator = (el) => {
    try {
      el.animate(
        [
          { opacity: 0.001, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0px)' },
        ],
        { duration: 650, easing: 'cubic-bezier(.2,.6,.2,1)', fill: 'both' }
      );
    } catch (_) {
      // Fallback: set styles directly
      el.style.opacity = 1;
      el.style.transform = 'none';
    }
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animator(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    animateOnScrollEls.forEach((el) => io.observe(el));
  } else {
    animateOnScrollEls.forEach((el) => animator(el));
  }

  // Button microanimation
  const ctaBtns = document.querySelectorAll('.cta-btn');
  ctaBtns.forEach((btn) => {
    btn.addEventListener('mousedown', () => {
      btn.classList.add('pressed');
    });
    btn.addEventListener('mouseup', () => {
      btn.classList.remove('pressed');
    });
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('pressed');
    });
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('primary-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  const showBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 200) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  };
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', showBackToTop);
    showBackToTop();
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // IntersectionObserver for .fade-in sections
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: add immediately
    fadeEls.forEach((el) => el.classList.add('animated'));
  }

  // Newsletter form handling (demo only)
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    const status = newsletterForm.querySelector('.newsletter-status');
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email =
        /** @type {HTMLInputElement} */ (newsletterForm.querySelector('#newsletter-email'))
          ?.value || '';
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (status) status.textContent = 'Please enter a valid email.';
        return;
      }
      if (status) status.textContent = 'Subscribed! Check your inbox for a confirmation.';
      newsletterForm.reset();
    });
  }

  // Contact form handling (demo only)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = contactForm.querySelector('.newsletter-status');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = /** @type {HTMLInputElement} */ (
        contactForm.querySelector('#name')
      )?.value.trim();
      const email = /** @type {HTMLInputElement} */ (
        contactForm.querySelector('#email')
      )?.value.trim();
      const message = /** @type {HTMLTextAreaElement} */ (
        contactForm.querySelector('#message')
      )?.value.trim();
      if (!name || !email || !message) {
        if (status) status.textContent = 'Please complete all fields.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (status) status.textContent = 'Please enter a valid email.';
        return;
      }
      if (status) status.textContent = 'Thanks! Your message has been sent.';
      contactForm.reset();
    });
  }

  // Register/unregister service worker
  if ('serviceWorker' in navigator) {
    const isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
    const isHttps = window.location.protocol === 'https:';
    if (!isLocalhost && isHttps) {
      navigator.serviceWorker.register('/assets/sw.js').catch(() => {});
    } else {
      // In development: ensure any existing SW is removed and caches cleared
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
      if (window.caches) {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
      }
    }
  }
});
