/* ===== Navbar scroll state + progress bar ===== */
const navbar = document.getElementById('navbar');
const progress = document.getElementById('scrollProgress');
const toTop = document.getElementById('toTop');

function onScroll(){
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 60);
  toTop.classList.toggle('show', y > 500);

  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (y / h) * 100 + '%';
}
window.addEventListener('scroll', onScroll, {passive:true});

/* ===== Mobile menu ===== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ===== Active link on scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function setActiveLink(){
  let current = '';
  const offset = 140;
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - offset) current = sec.id;
  });
  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActiveLink, {passive:true});

/* ===== Reveal on scroll ===== */
const revealEls = document.querySelectorAll('.reveal');
const revObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
revealEls.forEach(el => revObserver.observe(el));

/* ===== Skill bars animate when visible ===== */
const skillBars = document.querySelectorAll('.skill-bar span');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.style.width = entry.target.dataset.width;
      skillObserver.unobserve(entry.target);
    }
  });
}, {threshold:0.4});
skillBars.forEach(bar => skillObserver.observe(bar));

/* ===== Animated counters ===== */
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const el = entry.target;
      const target = +el.dataset.target;
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        count += step;
        if (count >= target){ el.textContent = target; }
        else { el.textContent = count; requestAnimationFrame(tick); }
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, {threshold:0.5});
counters.forEach(c => counterObserver.observe(c));

/* ===== Download CV ===== */
document.getElementById('downloadCv').addEventListener('click', (e) => {
  e.preventDefault();
  window.open('Alaa-Abdelkarim-CV.pdf', '_blank');
});

/* ===== Footer year ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* init */
onScroll();
setActiveLink();
