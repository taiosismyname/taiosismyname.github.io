// ============================================
// TYLER OSBORNE — PORTFOLIO SCRIPTS
// ============================================

// ── Scroll nav effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Intersection Observer fade-ins ──
const fadeEls = document.querySelectorAll(
  '.project-card, .pillar, .service-item, .contact-card, .stat, .hero-content, .phil-quote'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Stagger cards
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.dataset.delay = i * 80;
});
document.querySelectorAll('.pillar').forEach((el, i) => {
  el.dataset.delay = i * 100;
});
document.querySelectorAll('.stat').forEach((el, i) => {
  el.dataset.delay = i * 120;
});

fadeEls.forEach(el => observer.observe(el));

// ── Hero orb parallax ──
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelector('.orb-1').style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
  document.querySelector('.orb-2').style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
  document.querySelector('.orb-3').style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});

// ── Smooth anchor scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Typing effect for hero tag ──
const heroTag = document.querySelector('.hero-tag');
if (heroTag) {
  const text = heroTag.textContent;
  heroTag.textContent = '';
  heroTag.style.opacity = '1';
  let i = 0;
  setTimeout(() => {
    const type = () => {
      if (i < text.length) {
        heroTag.textContent += text[i++];
        setTimeout(type, 40);
      }
    };
    type();
  }, 400);
}

// ── Project card glow follow mouse ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const glow = card.querySelector('.project-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(168,85,247,0.10) 0%, transparent 60%)`;
    }
  });
});

// ── Stat counter animation ──
const animateCount = (el, target, suffix = '') => {
  const isInfinity = target === '∞';
  if (isInfinity) return;
  const num = parseInt(target);
  const duration = 1200;
  const steps = 40;
  const step = num / steps;
  let current = 0;
  const interval = setInterval(() => {
    current = Math.min(current + step, num);
    el.textContent = Math.floor(current) + suffix;
    if (current >= num) clearInterval(interval);
  }, duration / steps);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target.querySelector('.stat-num');
      const raw = num.textContent;
      if (raw.includes('+')) animateCount(num, raw.replace('+', ''), '+');
      else if (!isNaN(raw)) animateCount(num, raw);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(el => statObserver.observe(el));

console.log('👋 Built with too many tabs open. — T.O.');
