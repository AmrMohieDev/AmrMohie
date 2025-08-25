// Theme toggle with localStorage persistence
(function(){
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const stored = localStorage.getItem('theme');
  let isDark = stored ? stored === 'dark' : prefersDark.matches;

  function applyTheme(){
    if(isDark){
      root.style.setProperty('--bg', '#0b1220');
      root.style.setProperty('--bg-elev', '#0f172a');
      root.style.setProperty('--text', '#e2e8f0');
      root.style.setProperty('--muted', '#94a3b8');
      document.body.dataset.theme = 'dark';
    } else {
      root.style.setProperty('--bg', '#ffffff');
      root.style.setProperty('--bg-elev', '#f8fafc');
      root.style.setProperty('--text', '#0f172a');
      root.style.setProperty('--muted', '#475569');
      document.body.dataset.theme = 'light';
    }
  }

  applyTheme();

  if(toggle){
    toggle.addEventListener('click', function(){
      isDark = !isDark;
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      toggle.setAttribute('aria-pressed', String(isDark));
      applyTheme();
    });
  }
})();

// Mobile nav toggle
(function(){
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if(!navToggle || !navList) return;
  navToggle.addEventListener('click', function(){
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });
  navList.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Update year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
  anchor.addEventListener('click', function(e){
    const id = this.getAttribute('href');
    if(!id || id === '#') return;
    const el = document.querySelector(id);
    if(!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({top: y, behavior: 'smooth'});
  });
});
