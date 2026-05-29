/* ============================================================
   js/main.js — Render Engine & App Entry Point
   ============================================================ */

/* ---- MAIN RENDER FUNCTION ---- */
async function render() {
  const p = state.page;

  // Pages that skip nav/footer
  const barePages   = ['login'];
  const noFooter    = ['admin','portal','login'];
  const noNLStrip   = ['admin','portal','login','home'];

  // Show loading spinner while page builds
  const app = document.getElementById('app');
  if (!app) return;

  // Keep nav visible immediately (non-async)
  if (!barePages.includes(p)) {
    app.innerHTML =
      navHTML() +
      `<div id="_pageWrap" style="min-height:80vh">${loadingHTML('Loading…')}</div>` +
      `<div class="toast" id="_toast"></div>` +
      `<div class="modal-overlay" id="_moverlay" style="display:none" onclick="overlayClick(event)"><div class="modal" id="_mbody"></div></div>`;
  }

  // Resolve page content (async pages return Promises)
  let pageContent = '';
  try {
    if      (p === 'home')        pageContent = await pageHome();
    else if (p === 'about')       pageContent = pageAbout();
    else if (p === 'schools')     pageContent = pageSchools();
    else if (p === 'excellence')  pageContent = pageExcellence();
    else if (p === 'news')        pageContent = await pageNews();
    else if (p === 'staff')       pageContent = await pageStaff();
    else if (p === 'admission')   pageContent = pageAdmission();
    else if (p === 'donors')      pageContent = pageDonors();
    else if (p === 'contact')     pageContent = pageContact();
    else if (p === 'login')       pageContent = pageLogin();
    else if (p === 'admin')       pageContent = await pageAdmin();
    else if (p === 'portal')      pageContent = await pagePortal();
    else                          pageContent = await pageHome();
  } catch (err) {
    console.error('Page render error:', err);
    pageContent = `
      <div class="page" style="display:flex;align-items:center;justify-content:center;min-height:60vh">
        <div class="empty-state">
          <div class="es-icon">⚠️</div>
          <div class="es-title">Something went wrong</div>
          <div class="es-desc">${err.message}</div>
          <button class="btn btn-green" style="margin-top:1.5rem" onclick="go('home')">← Back to Home</button>
        </div>
      </div>`;
  }

  // Full HTML assembly
  if (barePages.includes(p)) {
    app.innerHTML =
      navHTML() +
      `<div>${pageContent}</div>` +
      `<div class="toast" id="_toast"></div>` +
      `<div class="modal-overlay" id="_moverlay" style="display:none" onclick="overlayClick(event)"><div class="modal" id="_mbody"></div></div>`;
  } else {
    app.innerHTML =
      navHTML() +
      `<div id="_pageWrap">${pageContent}</div>` +
      (!noFooter.includes(p) ? footerHTML() : '') +
      `<div class="toast" id="_toast"></div>` +
      `<div class="modal-overlay" id="_moverlay" style="display:none" onclick="overlayClick(event)"><div class="modal" id="_mbody"></div></div>`;
  }

  // Post-render hooks
  initReveal();
  window.scrollTo(0, 0);
}

/* ---- APP BOOT ---- */
async function boot() {
  // Restore Supabase session silently
  await restoreSession();

  // Redirect logged-in users away from login page
  if (state.page === 'login' && state.user) {
    state.page = state.profile?.role === 'admin' ? 'admin' : 'portal';
  }

  // Initial render
  await render();
}

/* ---- START ---- */
boot();
