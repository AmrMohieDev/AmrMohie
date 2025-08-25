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

// Parallax blobs
(function(){
  const container = document.querySelector('.parallax');
  if(!container) return;
  const blobs = Array.from(container.querySelectorAll('[data-depth]'));
  function update(e){
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const x = (e.clientX - cx) / cx;
    const y = (e.clientY - cy) / cy;
    blobs.forEach(function(b){
      const d = parseFloat(b.getAttribute('data-depth')) || 0;
      b.style.transform = 'translate(' + (x * 20 * d) + 'px,' + (y * 20 * d) + 'px)';
    });
  }
  window.addEventListener('mousemove', update, {passive:true});
})();

// Scroll reveal
(function(){
  const items = Array.from(document.querySelectorAll('[data-reveal]'));
  if(!items.length) return;
  const io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, {root:null, rootMargin:'-10% 0px', threshold:0.1});
  items.forEach(function(el){ io.observe(el); });
})();

// Card tilt
(function(){
  const cards = Array.from(document.querySelectorAll('[data-tilt]'));
  if(!cards.length) return;
  cards.forEach(function(card){
    let raf = 0;
    function onMove(e){
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function(){
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const rx = (py * -8).toFixed(2);
        const ry = (px * 8).toFixed(2);
        card.classList.add('tilting');
        card.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(0)';
      });
    }
    function reset(){
      card.classList.remove('tilting');
      card.style.transform = '';
    }
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
    card.addEventListener('touchstart', function(){ card.classList.add('tilting'); }, {passive:true});
    card.addEventListener('touchend', reset);
  });
})();

// Cursor spotlight
(function(){
  function onMove(e){
    document.body.style.setProperty('--mx', e.clientX + 'px');
    document.body.style.setProperty('--my', e.clientY + 'px');
  }
  window.addEventListener('pointermove', onMove, {passive:true});
})();
