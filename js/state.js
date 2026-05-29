/* ============================================================
   STATE.JS — App State & Routing
   ============================================================ */

const state = {
  page:          'home',
  user:          null,       // Supabase auth user
  profile:       null,       // profiles table row
  mobileMenuOpen: false,
  adminTab:      'overview',
  dashTab:       'overview',
  loading:       false,
};

/* ---- Navigation ---- */
function go(page, sub = null) {
  state.page         = page;
  state.subPage      = sub;
  state.mobileMenuOpen = false;
  state.adminTab     = 'overview';
  state.dashTab      = 'overview';
  window.scrollTo(0, 0);
  render();
}

function setAdminTab(t) { state.adminTab = t; render(); }
function setDashTab(t)  { state.dashTab  = t; render(); }

function toggleMenu() {
  state.mobileMenuOpen = !state.mobileMenuOpen;
  const m = document.getElementById('_mmenu');
  if (m) m.classList.toggle('open', state.mobileMenuOpen);
}

/* ---- Helpers ---- */
function v(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function fmtDate(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
  catch { return d; }
}

function fmtDateTime(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
  catch { return d; }
}

function gradeColor(grade) {
  if (!grade) return 'badge-gray';
  if (grade.startsWith('A')) return 'badge-green';
  if (grade.startsWith('B')) return 'badge-blue';
  if (grade.startsWith('C')) return 'badge-gold';
  return 'badge-red';
}

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

/* ---- Loading state ---- */
function loadingHTML(msg = 'Loading…') {
  return `<div class="loading"><div class="spinner"></div>${msg}</div>`;
}

function emptyHTML(icon, title, desc) {
  return `<div class="empty-state">
    <div class="es-icon">${icon}</div>
    <div class="es-title">${title}</div>
    <div class="es-desc">${desc}</div>
  </div>`;
}

/* ---- Scroll reveal ---- */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  reveals.forEach(el => obs.observe(el));
}
