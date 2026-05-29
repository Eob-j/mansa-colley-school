/* ============================================================
   COMPONENTS.JS — Nav, Footer, Toast, Modal, Shared UI
   ============================================================ */

/* ---- TOAST ---- */
let _toastTimer;
function toast(msg, type = 'success') {
  clearTimeout(_toastTimer);
  const el = document.getElementById('_toast');
  if (!el) return;
  const icon = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : '✅';
  el.innerHTML = `${icon} ${msg}`;
  el.className = `toast show${type === 'error' ? ' error' : ''}`;
  _toastTimer = setTimeout(() => { el.classList.remove('show'); }, 3800);
}

/* ---- MODAL ---- */
function openModal(html) {
  const overlay = document.getElementById('_moverlay');
  const body    = document.getElementById('_mbody');
  if (overlay && body) {
    body.innerHTML = html;
    overlay.style.display = 'flex';
  }
}
function closeModal() {
  const overlay = document.getElementById('_moverlay');
  if (overlay) overlay.style.display = 'none';
}
function overlayClick(e) {
  if (e.target.id === '_moverlay') closeModal();
}

/* ---- MODAL OPENERS ---- */
function openAnnModal() {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-title">Post Announcement</div>
    <div class="modal-sub">Will appear on the public website and all portals.</div>
    <div class="fg"><label>Title *</label><input class="fi" id="_at" placeholder="Announcement title"></div>
    <div class="fg"><label>Body *</label><textarea class="fta" id="_ab" rows="4" placeholder="Full announcement text..."></textarea></div>
    <div class="form-row">
      <div class="fg"><label>Author</label><input class="fi" id="_aa" value="${state.profile?.full_name || 'Administration'}"></div>
      <div class="fg"><label>Type</label>
        <select class="fsel" id="_atype">
          <option value="info">Info</option>
          <option value="urgent">Urgent</option>
          <option value="event">Event</option>
          <option value="academic">Academic</option>
        </select>
      </div>
    </div>
    <button class="btn-submit" id="_annBtn" onclick="saveAnnouncement()">Post Announcement →</button>
  `);
}

function openStudentModal() {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-title">Add New Student</div>
    <div class="form-row">
      <div class="fg"><label>Full Name *</label><input class="fi" id="_sn" placeholder="Student full name"></div>
      <div class="fg"><label>Gender *</label>
        <select class="fsel" id="_sg"><option value="Male">Male</option><option value="Female">Female</option></select>
      </div>
    </div>
    <div class="form-row">
      <div class="fg"><label>School Level *</label>
        <select class="fsel" id="_sl">
          <option value="Nursery">Nursery</option>
          <option value="Primary">Primary</option>
          <option value="Upper Basic">Upper Basic</option>
          <option value="Senior Secondary">Senior Secondary</option>
        </select>
      </div>
      <div class="fg"><label>Class *</label><input class="fi" id="_sc" placeholder="e.g. Grade 5A"></div>
    </div>
    <div class="form-row">
      <div class="fg"><label>Date of Birth</label><input class="fi" id="_sdob" type="date"></div>
      <div class="fg"><label>Address</label><input class="fi" id="_saddr" placeholder="Home address"></div>
    </div>
    <button class="btn-submit" id="_studBtn" onclick="saveStudent()">Add Student →</button>
  `);
}

function openStaffModal() {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-title">Add Staff Member</div>
    <div class="form-row">
      <div class="fg"><label>Full Name *</label><input class="fi" id="_sfn" placeholder="Full name"></div>
      <div class="fg"><label>Role / Title *</label><input class="fi" id="_sfrole" placeholder="e.g. Head of Science"></div>
    </div>
    <div class="form-row">
      <div class="fg"><label>Department *</label><input class="fi" id="_sfdept" placeholder="e.g. Science"></div>
      <div class="fg"><label>Date Joined</label><input class="fi" id="_sfjoined" type="date"></div>
    </div>
    <div class="form-row">
      <div class="fg"><label>Email</label><input class="fi" id="_sfemail" placeholder="email@school.gm" type="email"></div>
      <div class="fg"><label>Phone</label><input class="fi" id="_sfphone" placeholder="+220 XXX XXXX"></div>
    </div>
    <button class="btn-submit" id="_staffBtn" onclick="saveStaff()">Add Staff Member →</button>
  `);
}

function openNewsModal() {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-title">Publish News Article</div>
    <div class="fg"><label>Title *</label><input class="fi" id="_nt" placeholder="Article title"></div>
    <div class="fg"><label>Excerpt *</label><textarea class="fta" id="_ne" rows="3" placeholder="Brief summary shown on the news page..."></textarea></div>
    <div class="form-row">
      <div class="fg"><label>Category *</label>
        <select class="fsel" id="_nc">
          <option value="Event">Event</option>
          <option value="Academic">Academic</option>
          <option value="Sports">Sports</option>
          <option value="Achievement">Achievement</option>
          <option value="Community">Community</option>
          <option value="General">General</option>
        </select>
      </div>
      <div class="fg"><label>Emoji Icon</label><input class="fi" id="_nem" placeholder="📰" value="📰" maxlength="4"></div>
    </div>
    <button class="btn-submit" id="_newsBtn" onclick="saveNews()">Publish Article →</button>
  `);
}

function openResultModal(students, subjects) {
  const studentOpts = students.map(s =>
    `<option value="${s.id}">${s.full_name} — ${s.class}</option>`
  ).join('');
  const subjectOpts = subjects.map(s =>
    `<option value="${s.id}">${s.name} (${s.level})</option>`
  ).join('');
  const currentYear = new Date().getFullYear();

  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-title">Enter / Update Result</div>
    <div class="fg"><label>Student *</label>
      <select class="fsel" id="_rsid"><option value="">Select student</option>${studentOpts}</select>
    </div>
    <div class="fg"><label>Subject *</label>
      <select class="fsel" id="_rsubid"><option value="">Select subject</option>${subjectOpts}</select>
    </div>
    <div class="form-row">
      <div class="fg"><label>Term *</label>
        <select class="fsel" id="_rterm">
          <option value="Term 1">Term 1</option>
          <option value="Term 2" selected>Term 2</option>
          <option value="Term 3">Term 3</option>
        </select>
      </div>
      <div class="fg"><label>Academic Year *</label>
        <input class="fi" id="_ryear" value="${currentYear}/${currentYear+1}" placeholder="2025/2026">
      </div>
    </div>
    <div class="form-row">
      <div class="fg"><label>Score (0–100) *</label><input class="fi" id="_rscore" type="number" min="0" max="100" placeholder="e.g. 85"></div>
      <div class="fg"><label>Remarks</label><input class="fi" id="_rremarks" placeholder="e.g. Excellent"></div>
    </div>
    <button class="btn-submit" id="_resultBtn" onclick="saveResult()">Save Result →</button>
  `);
}

function openEventModal() {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-title">Add School Event</div>
    <div class="fg"><label>Event Title *</label><input class="fi" id="_evtitle" placeholder="e.g. Sports Day 2025"></div>
    <div class="form-row">
      <div class="fg"><label>Date *</label><input class="fi" id="_evdate" type="date"></div>
      <div class="fg"><label>Type *</label>
        <select class="fsel" id="_evtype">
          <option value="academic">Academic</option>
          <option value="sports">Sports</option>
          <option value="ceremony">Ceremony</option>
          <option value="community">Community</option>
          <option value="general">General</option>
        </select>
      </div>
    </div>
    <div class="fg"><label>Description</label><textarea class="fta" id="_evdesc" rows="2" placeholder="Optional details..."></textarea></div>
    <button class="btn-submit" onclick="saveEvent()">Add Event →</button>
  `);
}

/* ---- NAV ---- */
function navHTML() {
  const links = [
    ['home','Home'],['about','About'],['schools','Schools'],
    ['excellence','Excellence'],['news','News'],['staff','Staff'],
    ['admission','Admission'],['donors','Donors'],['contact','Contact'],
  ];
  const userArea = state.user && state.profile
    ? `<div class="nav-user" onclick="go('${state.profile.role === 'admin' ? 'admin' : 'portal'}')">
         <div class="nav-avatar">${initials(state.profile.full_name)}</div>
         <span>${state.profile.full_name.split(' ')[0]}</span>
       </div>
       <button class="nav-link" onclick="logout()" style="color:rgba(255,255,255,0.5);font-size:12px">Sign Out</button>`
    : `<button class="nav-link nav-cta" onclick="go('login')">Sign In</button>`;

  return `
  <nav class="nav">
    <div class="nav-logo" onclick="go('home')">
      <div class="nav-logo-badge">MC</div>
      <div class="nav-logo-text">
        <div class="nav-logo-name">Mansa Colley School</div>
        <div class="nav-logo-sub">Brikama, The Gambia</div>
      </div>
    </div>
    <div class="nav-links">
      ${links.map(([p,l]) => `<button class="nav-link${state.page===p?' active':''}" onclick="go('${p}')">${l}</button>`).join('')}
      ${userArea}
    </div>
    <button class="hamburger" onclick="toggleMenu()">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-menu${state.mobileMenuOpen?' open':''}" id="_mmenu">
    ${links.map(([p,l]) => `<button class="mobile-link" onclick="go('${p}')">${l}</button>`).join('')}
    ${state.user && state.profile
      ? `<button class="mobile-link" onclick="go('${state.profile.role==='admin'?'admin':'portal'}')">My Portal</button>
         <button class="mobile-link" onclick="logout()">Sign Out</button>`
      : `<button class="mobile-link mobile-cta" onclick="go('login')">Sign In / Portal</button>`}
  </div>`;
}

/* ---- FOOTER ---- */
function footerHTML() {
  return `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.8rem">
            <div class="nav-logo-badge" style="width:36px;height:36px;font-size:14px">MC</div>
            <div>
              <div style="font-family:var(--font-heading);font-weight:700;font-size:15px">Mansa Colley School</div>
              <div style="font-size:11.5px;color:rgba(255,255,255,0.45)">Brikama, The Gambia</div>
            </div>
          </div>
          <div class="footer-desc">Nurturing excellence and transforming lives through quality education from Nursery to Senior Secondary in Brikama, The Gambia.</div>
        </div>
        <div>
          <div class="fcol-title">Quick Links</div>
          <ul class="flinks">
            ${[['home','Home'],['about','About Us'],['schools','Our Schools'],['excellence','Academic Excellence'],['staff','Our Staff'],['news','News & Events']]
              .map(([p,l]) => `<li><button onclick="go('${p}')">${l}</button></li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="fcol-title">Admissions</div>
          <ul class="flinks">
            ${[['admission','How to Apply'],['admission','Nursery School'],['admission','Primary School'],['admission','Upper Basic'],['admission','Senior Secondary'],['donors','Scholarships']]
              .map(([p,l]) => `<li><button onclick="go('${p}')">${l}</button></li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="fcol-title">Contact</div>
          <ul class="flinks">
            <li><button onclick="go('contact')">📍 Brikama, West Coast Region</button></li>
            <li><button>📞 +220 XXX XXXX</button></li>
            <li><button>✉️ info@mansacolley.gm</button></li>
            <li><button>🕐 Mon–Fri: 8:00 AM – 4:00 PM</button></li>
            <li><button onclick="go('login')">🔐 Student / Parent Portal</button></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="fcopy">© ${new Date().getFullYear()} Mansa Colley School, Brikama. All rights reserved.</div>
        <div style="font-size:12.5px;color:rgba(255,255,255,0.45)">🇬🇲 Proudly Gambian · Shaping the Future</div>
      </div>
    </div>
  </footer>`;
}

/* ---- NEWSLETTER STRIP ---- */
function nlStripHTML() {
  return `
  <div class="nl-strip">
    <div class="container">
      <div class="nl-inner">
        <div>
          <div class="nl-title">Stay Updated</div>
          <div class="nl-sub">Subscribe for school news, events, and opportunities.</div>
        </div>
        <div class="nl-form">
          <input type="email" id="_nle" class="nl-input" placeholder="Enter your email address">
          <button class="btn btn-green" onclick="subscribeNL()">Subscribe</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ---- PAGE BANNER (inner pages) ---- */
function pageBannerHTML(label, title, desc) {
  return `
  <div class="page-banner">
    <div class="container">
      <div class="slabel" style="color:var(--goldi)">${label}</div>
      <h1>${title}</h1>
      ${desc ? `<p>${desc}</p>` : ''}
    </div>
  </div>`;
}

/* ---- SIDEBAR (shared between admin and portal) ---- */
function sidebarHTML(tabs, activePage, role) {
  const siteLinks = [
    ['home','🏠','Public Website'],
    [role === 'admin' ? 'admin' : 'portal', '🔄', 'Refresh'],
  ];
  return `
  <div class="dash-sidebar">
    <div class="sidebar-section">
      <div class="sidebar-user">
        <div class="sidebar-user-av">
          ${state.profile?.avatar_url
            ? `<img src="${state.profile.avatar_url}" alt="avatar">`
            : initials(state.profile?.full_name || '?')}
        </div>
        <div>
          <div class="sidebar-user-name">${state.profile?.full_name || 'User'}</div>
          <div class="sidebar-user-role">${state.profile?.role || ''}</div>
        </div>
      </div>
      <div class="sidebar-label">Menu</div>
      ${tabs.map(([t,ic,l]) =>
        `<button class="sidebar-item${activePage===t?' active':''}" onclick="${role==='admin'?'setAdminTab':'setDashTab'}('${t}')">
           <span class="sidebar-icon">${ic}</span>${l}
         </button>`
      ).join('')}
    </div>
    <div class="sidebar-section">
      <div class="sidebar-label">Navigation</div>
      <button class="sidebar-item" onclick="go('home')"><span class="sidebar-icon">🏠</span>Public Website</button>
      <button class="sidebar-item" onclick="logout()"><span class="sidebar-icon">🚪</span>Sign Out</button>
    </div>
  </div>`;
}
