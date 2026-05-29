/* ============================================================
   pages/admin.js — Admin Dashboard
   ============================================================ */

async function pageAdmin() {
  if (!requireAuth('admin')) return '';
  const tab = state.adminTab || 'overview';

  const adminTabs = [
    ['overview','📊','Overview'],
    ['students','🎓','Students'],
    ['staff','👨‍🏫','Staff'],
    ['admissions','📋','Admissions'],
    ['results','📈','Results'],
    ['announcements','📢','Announcements'],
    ['news','📰','News'],
    ['events','📅','Events'],
  ];

  let content = `<div class="loading"><div class="spinner"></div>Loading…</div>`;

  try {
    if (tab === 'overview')       content = await adminOverview();
    else if (tab === 'students')  content = await adminStudents();
    else if (tab === 'staff')     content = await adminStaff();
    else if (tab === 'admissions')content = await adminAdmissions();
    else if (tab === 'results')   content = await adminResults();
    else if (tab === 'announcements') content = await adminAnnouncements();
    else if (tab === 'news')      content = await adminNews();
    else if (tab === 'events')    content = await adminEvents();
  } catch (err) {
    content = `<div class="empty-state"><div class="es-icon">⚠️</div><div class="es-title">Error loading data</div><div class="es-desc">${err.message}</div></div>`;
  }

  return `
  <div class="page dash-layout">
    ${sidebarHTML(adminTabs, tab, 'admin')}
    <div class="dash-main">
      <div class="dash-header">
        <div>
          <div class="dash-title">Admin Dashboard</div>
          <div class="dash-sub">Welcome back, ${state.profile.full_name} · ${new Date().toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
        </div>
        <button class="btn btn-outline-g btn-sm" onclick="go('home')">← View Website</button>
      </div>
      <div class="tabs">${adminTabs.map(([t,ic,l]) => `<button class="tab${tab===t?' active':''}" onclick="setAdminTab('${t}')">${ic} ${l}</button>`).join('')}</div>
      <div id="adminContent">${content}</div>
    </div>
  </div>`;
}

/* ---- OVERVIEW ---- */
async function adminOverview() {
  const [students, staff, admissions, anns] = await Promise.all([
    dbGet('students', {}),
    dbGet('staff', {}),
    dbGet('admissions', { eq: { status: 'Pending' } }),
    dbGet('announcements', { eq: { is_active: true } }),
  ]);
  const allAdm = await dbGet('admissions', {});
  const levels = ['Nursery','Primary','Upper Basic','Senior Secondary'];
  const levelCounts = levels.map(l => ({
    name: l,
    count: (await dbGet('students', { eq: { level: l } }) || []).length,
  }));

  return `
  <div class="metric-grid">
    ${[
      ['🎓', students.length, 'Total Students', '↑ +45 this term', 'change-up'],
      ['👨‍🏫', staff.length, 'Staff Members', 'All active', 'change-up'],
      ['📋', admissions.length, 'Pending Admissions', 'Awaiting review', 'change-dn'],
      ['📢', anns.length, 'Active Announcements', 'Published', 'change-up'],
    ].map(([ic,val,lbl,chg,cls]) => `
      <div class="metric-card">
        <div class="metric-icon">${ic}</div>
        <div class="metric-val">${val}</div>
        <div class="metric-lbl">${lbl}</div>
        <div class="metric-change ${cls}">${chg}</div>
      </div>`).join('')}
  </div>
  <div class="grid-2" style="gap:1.5rem;margin-top:1.5rem">
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">Recent Admissions</div>
        <button class="btn btn-outline-g btn-xs" onclick="setAdminTab('admissions')">View All</button>
      </div>
      <div class="panel-table">
        <table class="data-table">
          <thead><tr><th>Student</th><th>Level</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            ${allAdm.slice(0,5).map(a => `
            <tr>
              <td><strong>${a.student_name}</strong><br><span style="color:var(--muted);font-size:12px">${a.parent_name}</span></td>
              <td>${a.level.replace(' School','')}</td>
              <td><span class="badge ${a.status==='Approved'?'badge-green':a.status==='Pending'?'badge-gold':a.status==='Rejected'?'badge-red':'badge-blue'}">${a.status}</span></td>
              <td>${fmtDate(a.submitted_at)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><div class="panel-title">Enrolment by Level</div></div>
      <div class="panel-body">
        ${levelCounts.map(({name,count}) => `
        <div style="margin-bottom:1rem">
          <div style="display:flex;justify-content:space-between;font-size:13.5px;font-weight:600;margin-bottom:4px">
            <span>${name}</span><span>${count}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${students.length?Math.round(count/students.length*100):0}%"></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
  <div class="panel" style="margin-top:1.5rem">
    <div class="panel-header">
      <div class="panel-title">Latest Announcements</div>
      <button class="btn btn-green btn-xs" onclick="setAdminTab('announcements')">Manage →</button>
    </div>
    <div class="panel-body">
      ${anns.slice(0,3).map(a => `
      <div class="ann-item ${a.is_urgent?'urgent':a.type||'info'}" style="margin-bottom:0.6rem">
        <div class="ann-title">${a.title}</div>
        <div class="ann-meta">📅 ${fmtDate(a.published_at)} · ${a.author_name}</div>
      </div>`).join('')}
    </div>
  </div>`;
}

/* ---- STUDENTS ---- */
async function adminStudents() {
  const students = await dbGet('students', { order: 'created_at', asc: false });
  return `
  <div class="filter-row">
    <div class="search-bar" style="flex:1;max-width:300px">
      <span class="search-icon">🔍</span>
      <input placeholder="Search students…" oninput="filterStudentTable(this.value, ${JSON.stringify(students).replace(/"/g,'&quot;')})">
    </div>
    <select class="fsel" style="max-width:180px" onchange="filterStudentLevel(this.value, ${JSON.stringify(students).replace(/"/g,'&quot;')})">
      <option value="">All Levels</option>
      <option>Nursery</option><option>Primary</option><option>Upper Basic</option><option>Senior Secondary</option>
    </select>
    <button class="btn btn-green btn-sm" onclick="openStudentModal()">+ Add Student</button>
  </div>
  <div class="panel">
    <div class="panel-table">
      <table class="data-table">
        <thead><tr><th>Student</th><th>Level</th><th>Class</th><th>Gender</th><th>Admission Date</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody id="_stbody">${studentRowsHTML(students)}</tbody>
      </table>
    </div>
  </div>`;
}

function studentRowsHTML(students) {
  if (!students.length) return `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--muted)">No students found.</td></tr>`;
  return students.map(s => `
  <tr>
    <td><strong>${s.full_name}</strong><br><span style="color:var(--muted);font-size:12px">Adm: ${fmtDate(s.admission_date)}</span></td>
    <td>${s.level}</td><td>${s.class}</td><td>${s.gender||'—'}</td>
    <td>${fmtDate(s.admission_date)}</td>
    <td><span class="badge ${s.status==='Active'?'badge-green':s.status==='Graduated'?'badge-blue':'badge-red'}">${s.status}</span></td>
    <td style="display:flex;gap:6px;flex-wrap:wrap">
      <button class="btn btn-danger btn-xs" onclick="deleteStudent('${s.id}')">Remove</button>
    </td>
  </tr>`).join('');
}

function filterStudentTable(q, students) {
  const filtered = q ? students.filter(s => s.full_name.toLowerCase().includes(q.toLowerCase()) || s.class.toLowerCase().includes(q.toLowerCase())) : students;
  const tb = document.getElementById('_stbody');
  if (tb) tb.innerHTML = studentRowsHTML(filtered);
}

function filterStudentLevel(level, students) {
  const filtered = level ? students.filter(s => s.level === level) : students;
  const tb = document.getElementById('_stbody');
  if (tb) tb.innerHTML = studentRowsHTML(filtered);
}

/* ---- STAFF ---- */
async function adminStaff() {
  const staff = await dbGet('staff', { order: 'created_at', asc: false });
  const avClasses = ['av-gold','av-green','av-sage','av-earth'];
  return `
  <div style="display:flex;justify-content:flex-end;margin-bottom:1.2rem">
    <button class="btn btn-green btn-sm" onclick="openStaffModal()">+ Add Staff Member</button>
  </div>
  <div class="panel">
    <div class="panel-table">
      <table class="data-table">
        <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Joined</th><th>Contact</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${staff.length ? staff.map((s,i) => `
          <tr>
            <td>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="staff-av ${s.photo_url?'':avClasses[i%4]}" style="width:36px;height:36px;font-size:13px;margin:0">
                  ${s.photo_url?`<img src="${s.photo_url}" alt="${s.full_name}">`:initials(s.full_name)}
                </div>
                <strong>${s.full_name}</strong>
              </div>
            </td>
            <td>${s.role}</td>
            <td>${s.department}</td>
            <td>${fmtDate(s.joined_date)}</td>
            <td>${s.email||'—'}<br><span style="font-size:12px;color:var(--muted)">${s.phone||''}</span></td>
            <td><span class="badge badge-green">${s.status}</span></td>
            <td><button class="btn btn-danger btn-xs" onclick="deleteStaff('${s.id}')">Remove</button></td>
          </tr>`).join('')
          : `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--muted)">No staff members found. Add your first staff member.</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---- ADMISSIONS ---- */
async function adminAdmissions() {
  const admissions = await dbGet('admissions', { order: 'submitted_at', asc: false });
  return `
  <div class="panel">
    <div class="panel-table">
      <table class="data-table">
        <thead><tr><th>Student</th><th>Parent</th><th>Phone</th><th>Level</th><th>Applied</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${admissions.length ? admissions.map(a => `
          <tr>
            <td><strong>${a.student_name}</strong>${a.age?`<br><span style="font-size:12px;color:var(--muted)">Age: ${a.age}</span>`:''}</td>
            <td>${a.parent_name}</td>
            <td>${a.phone}</td>
            <td>${a.level}</td>
            <td>${fmtDate(a.submitted_at)}</td>
            <td><span class="badge ${a.status==='Approved'?'badge-green':a.status==='Pending'?'badge-gold':a.status==='Rejected'?'badge-red':'badge-blue'}">${a.status}</span></td>
            <td style="display:flex;gap:5px;flex-wrap:wrap">
              ${a.status!=='Approved'?`<button class="btn btn-green btn-xs" onclick="updateAdmissionStatus('${a.id}','Approved')">Approve</button>`:''}
              ${a.status==='Pending'?`<button class="btn btn-gray btn-xs" onclick="updateAdmissionStatus('${a.id}','Under Review')">Review</button>`:''}
              <button class="btn btn-danger btn-xs" onclick="deleteAdmission('${a.id}')">Del</button>
            </td>
          </tr>`).join('')
          : `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--muted)">No admission enquiries yet.</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---- RESULTS ---- */
async function adminResults() {
  const [students, subjects, results] = await Promise.all([
    dbGet('students', { eq: { status: 'Active' }, order: 'full_name', asc: true }),
    dbGet('subjects', { order: 'name', asc: true }),
    dbGet('results', { order: 'created_at', asc: false, limit: 50,
      select: '*, students(full_name,class), subjects(name)' }),
  ]);
  return `
  <div style="display:flex;justify-content:flex-end;margin-bottom:1.2rem">
    <button class="btn btn-green btn-sm" onclick="openResultModal(${JSON.stringify(students).replace(/"/g,'&quot;')}, ${JSON.stringify(subjects).replace(/"/g,'&quot;')})">+ Enter Result</button>
  </div>
  <div class="panel">
    <div class="panel-table">
      <table class="data-table">
        <thead><tr><th>Student</th><th>Subject</th><th>Term</th><th>Year</th><th>Score</th><th>Grade</th><th>Remarks</th><th>Actions</th></tr></thead>
        <tbody>
          ${results.length ? results.map(r => `
          <tr>
            <td><strong>${r.students?.full_name||'—'}</strong><br><span style="font-size:12px;color:var(--muted)">${r.students?.class||''}</span></td>
            <td>${r.subjects?.name||'—'}</td>
            <td>${r.term}</td>
            <td>${r.academic_year}</td>
            <td><strong>${r.score}%</strong></td>
            <td><span class="badge ${gradeColor(r.grade)}">${r.grade||'—'}</span></td>
            <td>${r.remarks||'—'}</td>
            <td><button class="btn btn-danger btn-xs" onclick="deleteResult('${r.id}')">Del</button></td>
          </tr>`).join('')
          : `<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--muted)">No results entered yet. Click '+ Enter Result' to get started.</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---- ANNOUNCEMENTS ---- */
async function adminAnnouncements() {
  const anns = await dbGet('announcements', { order: 'published_at', asc: false });
  return `
  <div style="display:flex;justify-content:flex-end;margin-bottom:1.2rem">
    <button class="btn btn-green btn-sm" onclick="openAnnModal()">+ Post Announcement</button>
  </div>
  ${anns.length ? anns.map(a => `
  <div class="ann-item ${a.is_urgent?'urgent':a.type||'info'}" style="margin-bottom:0.8rem">
    <div style="display:flex;align-items:start;justify-content:space-between;gap:1rem;flex-wrap:wrap">
      <div>
        <div class="ann-title">${a.title}</div>
        <div class="ann-meta">📅 ${fmtDateTime(a.published_at)} · ${a.author_name} · <span class="badge ${a.is_active?'badge-green':'badge-gray'}">${a.is_active?'Active':'Hidden'}</span></div>
        <div class="ann-body">${a.body}</div>
      </div>
      <div style="display:flex;gap:6px;flex-shrink:0;flex-wrap:wrap">
        <button class="btn btn-gray btn-xs" onclick="toggleAnnouncement('${a.id}',${a.is_active})">${a.is_active?'Hide':'Show'}</button>
        <button class="btn btn-danger btn-xs" onclick="deleteAnnouncement('${a.id}')">Delete</button>
      </div>
    </div>
  </div>`).join('')
  : emptyHTML('📢','No announcements yet','Click the button above to post your first announcement.')}`;
}

/* ---- NEWS ---- */
async function adminNews() {
  const news = await dbGet('news', { order: 'published_at', asc: false });
  return `
  <div style="display:flex;justify-content:flex-end;margin-bottom:1.2rem">
    <button class="btn btn-green btn-sm" onclick="openNewsModal()">+ Publish Article</button>
  </div>
  <div class="panel">
    <div class="panel-table">
      <table class="data-table">
        <thead><tr><th>Title</th><th>Category</th><th>Published</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${news.length ? news.map(n => `
          <tr>
            <td><strong>${n.emoji} ${n.title.substring(0,55)}${n.title.length>55?'…':''}</strong></td>
            <td><span class="badge badge-blue">${n.category}</span></td>
            <td>${fmtDate(n.published_at)}</td>
            <td>${n.is_featured?'<span class="badge badge-gold">⭐ Featured</span>':'—'}</td>
            <td><span class="badge ${n.is_published?'badge-green':'badge-gray'}">${n.is_published?'Published':'Draft'}</span></td>
            <td style="display:flex;gap:6px">
              <button class="btn btn-gray btn-xs" onclick="toggleFeatured('${n.id}',${n.is_featured})">${n.is_featured?'Unfeature':'Feature'}</button>
              <button class="btn btn-danger btn-xs" onclick="deleteNews('${n.id}')">Delete</button>
            </td>
          </tr>`).join('')
          : `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--muted)">No articles yet. Publish your first news article.</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---- EVENTS ---- */
async function adminEvents() {
  const events = await dbGet('events', { order: 'event_date', asc: true });
  return `
  <div style="display:flex;justify-content:flex-end;margin-bottom:1.2rem">
    <button class="btn btn-green btn-sm" onclick="openEventModal()">+ Add Event</button>
  </div>
  <div class="panel">
    <div class="panel-table">
      <table class="data-table">
        <thead><tr><th>Event</th><th>Date</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${events.length ? events.map(e => `
          <tr>
            <td><strong>${e.title}</strong>${e.description?`<br><span style="font-size:12px;color:var(--muted)">${e.description}</span>`:''}</td>
            <td>${fmtDate(e.event_date)}</td>
            <td><span class="badge badge-blue">${e.type}</span></td>
            <td><span class="badge ${e.is_active?'badge-green':'badge-gray'}">${e.is_active?'Active':'Hidden'}</span></td>
            <td><button class="btn btn-danger btn-xs" onclick="deleteEvent('${e.id}')">Delete</button></td>
          </tr>`).join('')
          : `<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--muted)">No events yet. Add your first school event.</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}
