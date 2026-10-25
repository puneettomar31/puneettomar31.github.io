
document.documentElement.classList.add('js');

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('show');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  };
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('show')) {
      closeMenu();
      menuBtn.focus();
    }
  });
}

// Dark mode with memory
const darkToggle = document.getElementById('darkToggle');
if (localStorage.getItem('dark-mode') === 'on') {
  document.body.classList.add('dark-mode');
  if (darkToggle) {
    darkToggle.textContent = '☀️';
    darkToggle.setAttribute('aria-pressed', 'true');
  }
}
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark ? 'on' : 'off');
    darkToggle.textContent = isDark ? '☀️' : '🌙';
    darkToggle.setAttribute('aria-pressed', String(isDark));
  });
}

// Scroll animations (fade-in, slide-left, slide-right)
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => animObserver.observe(el));

// Counter animation for stats
function animateCounter(el, target, suffix) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = target + suffix;
    return;
  }

  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + suffix;
    if (count >= target) clearInterval(timer);
  }, 40);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target, el.dataset.suffix || '');
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], div[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(a => {
    a.style.background = '';
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.background = 'var(--brand-soft)';
      a.style.color = 'var(--brand)';
    }
  });
}, { passive: true });
