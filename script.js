
// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('show'));
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('show');
    }
  });
}

// Dark mode with memory
const darkToggle = document.getElementById('darkToggle');
if (localStorage.getItem('dark-mode') === 'on') {
  document.body.classList.add('dark-mode');
  if (darkToggle) darkToggle.textContent = '☀️';
}
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark ? 'on' : 'off');
    darkToggle.textContent = isDark ? '☀️' : '🌙';
  });
}

// Scroll animations (fade-in, slide-left, slide-right)
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => animObserver.observe(el));

// Typewriter effect
const typedLines = [
  'Full Stack PHP Developer',
  'Laravel 12 Expert',
  'REST API Engineer',
  'Filament & Livewire Builder',
  'EdTech Platform Developer',
  'AI-Assisted Coder'
];
let lineIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');
function typeWriter() {
  if (!typedEl) return;
  const current = typedLines[lineIndex];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) { isDeleting = true; setTimeout(typeWriter, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) { isDeleting = false; lineIndex = (lineIndex + 1) % typedLines.length; }
  }
  setTimeout(typeWriter, isDeleting ? 60 : 80);
}
typeWriter();

// Counter animation for stats
function animateCounter(el, target, suffix) {
  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + (suffix || '+');
    if (count >= target) clearInterval(timer);
  }, 40);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target, '+');
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

