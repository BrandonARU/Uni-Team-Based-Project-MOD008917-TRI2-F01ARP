/* ============================================================
   common.js  –  Math0ryx
   1. Dark / Light mode toggle (persisted)
   2. FAB – click + to open/close home, search, dark-mode in a row
   3. Hamburger – click or hover opens purple dropdown
   ============================================================ */


/* ── 1. DARK / LIGHT MODE ─────────────────────────────────── */

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('fabSettingsBtn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

(function () {
  applyTheme(localStorage.getItem('theme') || 'light');
})();


/* ── 2. FAB ───────────────────────────────────────────────── */

function buildFab() {
  const container  = document.querySelector('.fabContainer');
  const mainBtn    = container && container.querySelector('.fab');
  const optionsDiv = container && container.querySelector('.fabOptions');
  if (!container || !mainBtn || !optionsDiv) return;

  optionsDiv.innerHTML = `
    <button id="fabHomeBtn"     title="Home">🏠</button>
    <button id="fabSearchBtn"   title="Search">🔍</button>
    <button id="fabSettingsBtn" title="Toggle Dark/Light">🌙</button>
  `;

  const saved = localStorage.getItem('theme') || 'light';
  document.getElementById('fabSettingsBtn').textContent = saved === 'dark' ? '☀️' : '🌙';

  document.getElementById('fabHomeBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  document.getElementById('fabSearchBtn').addEventListener('click', () => {
    const bar = document.getElementById('headerSearchBar');
    if (bar) {
      bar.focus();
      bar.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  document.getElementById('fabSettingsBtn').addEventListener('click', toggleTheme);

  /* Toggle .open — CSS uses .fabContainer:not(.open) .fabOptions button { display:none } */
  mainBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = container.classList.toggle('open');
    mainBtn.textContent = isOpen ? '✕' : '+';
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove('open');
      mainBtn.textContent = '+';
    }
  });
}





/* Called by onclick="toggleHamburger()" in your HTML */
window.toggleHamburger = function () {
  const menu = document.getElementById('hamburgerMenu');
  if (!menu) return;
  menu.classList.toggle('active');
};

function buildHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const menu      = document.getElementById('hamburgerMenu');
  if (!hamburger || !menu) return;

  let leaveTimer;

  hamburger.addEventListener('mouseenter', () => {
    clearTimeout(leaveTimer);
    menu.classList.add('active');
  });

  hamburger.addEventListener('mouseleave', () => {
    leaveTimer = setTimeout(() => {
      if (!menu.matches(':hover')) menu.classList.remove('active');
    }, 150);
  });

  menu.addEventListener('mouseenter', () => clearTimeout(leaveTimer));
  menu.addEventListener('mouseleave', () => menu.classList.remove('active'));

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
}


/* ── 4. INIT ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildFab();
  buildHamburger();
});

















/* ── 4. INIT ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildFab();
  buildHamburger();
});
