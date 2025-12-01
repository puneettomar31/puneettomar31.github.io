
// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) menuBtn.addEventListener('click', () => navLinks.classList.toggle('show'));

// Dark mode with memory
const darkToggle = document.getElementById('darkToggle');
if (localStorage.getItem('dark-mode') === 'on') document.body.classList.add('dark-mode');
if (darkToggle) darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode') ? 'on' : 'off');
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); }});
},{threshold:0.15});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

