/* ============================================================
   pages/portal.js — Student & Parent Portal
   ============================================================ */

async function pagePortal() {
  if (!state.user || !state.profile) { go('login'); return ''; }
  const tab     = state.dashTab || 'overview';
  const isStaff = state.profile.role === 'staff';
  const isStudent = state.profile.role === 'student';
  const isParent  = state.profile.role === 'parent';

  const tabs = isStaff
    ? [['overview','🏠','Overview'],['students','🎓','Students'],['results','📈','Enter Results'],['announcements','📢','Notices'],['profile','👤','Profile']]
    : isStudent
      ? [['overview','🏠','Overview'],['results','📊','My Results'],['timetable','📅','Timetable'],['announcements','📢','Notices'],['messages','✉️','Messages'],['profile','👤','Profile']]
      : [['overview','🏠','Overview'],['child','🎓','My Child'],['announcements','📢','Notices'],['messages','✉️','Messages'],['profile','👤','Profile']];

  let content = loadingHTML('Loading your portal…');
  try {
    if (tab === 'overview')       content = await portalOverview();
    else if (tab === 'results' && isStaff) content = await staffResults();
    else if (tab === 'results')   content = await studentResults();
    else if (tab === 'students')  content = await staffStudents();
    else if (tab === 'timetable') content = portalTimetable();
    else if (tab === 'announcements') content = await portalAnnouncements();
    else if (tab === 'messages')  content = portalMessages();
    else if (tab === 'child')     content = await portalChild();
    else if (tab === 'profile')   content = portalProfile();
  } catch (err) {
    content = `<div class="empty-state"><div class="es-icon">⚠️</div><div class="es-title">Error</div><div class="es-desc">${err.message}</div></div>`;
  }

  const roleLabel = isStaff ? 'Staff Portal' : isStudent ? 'Student Portal' : 'Parent Portal';

  return `
  <div class="page dash-layout">
    ${sidebarHTML(tabs, tab, 'portal')}
    <div class="dash-main">
      <div class="dash-header">
        <div>
          <div class="dash-title">${roleLabel}</div>
          <div class="dash-sub">Welcome, ${state.profile.full_name.split(' ')[0]} · ${new Date().toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
        </div>
      </div>
      <div class="tabs">${tabs.map(([t,ic,l]) => `<button class="tab${tab===t?' active':''}" onclick="setDashTab('${t}')">${ic} ${l}</button>`).join('')}</div>
      ${content}
    </div>
  </div>`;
}

/* ---- PORTAL OVERVIEW ---- */
async function portalOverview() {
  const [anns, events] = await Promise.all([
    dbGet('announcements', { eq: { is_active: true }, order: 'published_at', asc: false, limit: 4 }),
    dbGet('events', { eq: { is_active: true }, order: 'event_date', asc: true, limit: 5 }),
  ]);

  // Fetch student-specific data
  let studentData = null;
  let resultsSummary = [];
  if (state.profile.role === 'student') {
    const students = await dbGet('students', { eq: { user_id: state.user.id } });
    studentData = students?.[0] || null;
    if (studentData) {
      resultsSummary = await dbGet('results', {
        eq: { student_id: studentData.id },
        order: 'created_at', asc: false, limit: 6,
        select: '*, subjects(name)',
      });
    }
  }

  const metrics = state.profile.role === 'student'
    ? [
        ['📊', studentData ? (resultsSummary.reduce((s,r)=>s+r.score,0)/Math.max(resultsSummary.length,1)).toFixed(1)+'%' : '—', 'Current Average'],
        ['📅', 'Term 2', 'Current Term'],
        ['📋', resultsSummary.length, 'Results Entered'],
        ['🏆', '—', 'Class Position'],
      ]
    : state.profile.role === 'parent'
      ? [
          ['🎓', '—', 'Child Enrolled'],
          ['📊', '—', "Child's Average"],
          ['📋', '—', 'Current Class'],
          ['💳', 'Active', 'Portal Status'],
        ]
      : [
          ['👥', '—', 'Students in Class'],
          ['📈', resultsSummary.length, 'Results Entered'],
          ['📋', '—', 'Department'],
          ['📢', anns.length, 'Active Notices'],
        ];

  return `
  <div class="portal-nav">
    ${(state.profile.role === 'student'
      ? [['overview','🏠','Overview'],['results','📊','Results'],['timetable','📅','Timetable'],['announcements','📢','Notices'],['messages','✉️','Messages'],['profile','👤','Profile']]
      : state.profile.role === 'parent'
        ? [['overview','🏠','Overview'],['child','🎓','My Child'],['announcements','📢','Notices'],['messages','✉️','Messages'],['profile','👤','Profile']]
        : [['overview','🏠','Overview'],['students','🎓','Students'],['results','📈','Results'],['announcements','📢','Notices'],['profile','👤','Profile']])
      .map(([t,ic,l]) => `
      <div class="portal-nav-item${state.dashTab===t?' active':''}" onclick="setDashTab('${t}')">
        <div class="pni-icon">${ic}</div>
        <div class="pni-label">${l}</div>
      </div>`).join('')}
  </div>

  <div class="metric-grid">
    ${metrics.map(([ic,val,lbl]) => `
    <div class="metric-card">
      <div class="metric-icon">${ic}</div>
      <div class="metric-val" style="font-size:1.3rem">${val}</div>
      <div class="metric-lbl">${lbl}</div>
    </div>`).join('')}
  </div>

  <div class="grid-2" style="gap:1.5rem;margin-top:1.5rem">
    <div class="panel">
      <div class="panel-header"><div class="panel-title">📢 Latest Notices</div></div>
      <div class="panel-body">
        ${anns.length
          ? anns.map(a => `
          <div class="ann-item ${a.is_urgent?'urgent':a.type||'info'}" style="margin-bottom:0.6rem">
            <div class="ann-title">${a.title}</div>
            <div class="ann-meta">📅 ${fmtDate(a.published_at)}</div>
          </div>`).join('')
          : emptyHTML('📢','No notices','Nothing posted yet.')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><div class="panel-title">📅 Upcoming Events</div></div>
      <div class="panel-body">
        ${events.length
          ? events.map(e => `
          <div style="display:flex;gap:1rem;align-items:center;padding:8px 0;border-bottom:1px solid var(--border)">
            <div style="background:var(--g0);border-radius:8px;padding:4px 8px;text-align:center;min-width:44px">
              <div style="font-weight:900;font-size:1.1rem;font-family:var(--font-heading);color:var(--g7)">${new Date(e.event_date).getDate()}</div>
              <div style="font-size:9px;font-weight:700;color:var(--g5);text-transform:uppercase">${new Date(e.event_date).toLocaleString('default',{month:'short'})}</div>
            </div>
            <div>
              <div style="font-size:13.5px;font-weight:600">${e.title}</div>
              <div style="font-size:11.5px;color:var(--light)">${fmtDate(e.event_date)}</div>
            </div>
          </div>`).join('')
          : emptyHTML('📅','No upcoming events','')}
      </div>
    </div>
  </div>`;
}

/* ---- STUDENT RESULTS ---- */
async function studentResults() {
  const students = await dbGet('students', { eq: { user_id: state.user.id } });
  const student  = students?.[0];
  if (!student) return emptyHTML('📊','No student record found','Please contact the school administration.');

  const results = await dbGet('results', {
    eq:     { student_id: student.id },
    order:  'created_at',
    asc:    false,
    select: '*, subjects(name)',
  });

  if (!results.length) return emptyHTML('📊','No results yet','Your results will appear here once they are entered by the school.');

  const terms = [...new Set(results.map(r => r.term))];
  const avg   = results.length ? (results.reduce((s,r)=>s+parseFloat(r.score||0),0)/results.length).toFixed(1) : '—';

  return `
  <div class="panel">
    <div class="panel-header">
      <div class="panel-title">My Results — ${student.full_name}</div>
      <span class="badge badge-green">${student.class}</span>
    </div>
    <div class="panel-body">
      <div class="tabs" style="margin-bottom:1rem">
        ${terms.map((t,i) => `<button class="tab${i===0?' active':''}" onclick="showTerm('${t}',this)">${t}</button>`).join('')}
      </div>
      ${terms.map((term,i) => {
        const termResults = results.filter(r => r.term === term);
        const termAvg = (termResults.reduce((s,r)=>s+parseFloat(r.score||0),0)/termResults.length).toFixed(1);
        return `
        <div id="term_${term.replace(' ','_')}" style="${i>0?'display:none':''}">
          <table class="data-table">
            <thead><tr><th>Subject</th><th>Score</th><th>Grade</th><th>Remarks</th></tr></thead>
            <tbody>
              ${termResults.map(r => `
              <tr>
                <td><strong>${r.subjects?.name||'—'}</strong></td>
                <td><strong>${r.score}%</strong></td>
                <td><span class="badge ${gradeColor(r.grade)}">${r.grade||'—'}</span></td>
                <td>${r.remarks||'—'}</td>
              </tr>`).join('')}
            </tbody>
          </table>
          <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1.5rem">
            ${[
              [termAvg+'%','Term Average'],
              [termResults.length,'Subjects'],
              [termResults.filter(r=>r.grade?.startsWith('A')).length,'Distinctions'],
            ].map(([val,lbl]) => `
            <div class="metric-card" style="flex:1;min-width:110px">
              <div class="metric-val">${val}</div>
              <div class="metric-lbl">${lbl}</div>
            </div>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function showTerm(term, btn) {
  document.querySelectorAll('[id^="term_"]').forEach(el => el.style.display='none');
  document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
  const el = document.getElementById('term_'+term.replace(' ','_'));
  if (el) el.style.display = 'block';
  if (btn) btn.classList.add('active');
}

/* ---- STAFF: ENTER RESULTS ---- */
async function staffResults() {
  const [students, subjects, recentResults] = await Promise.all([
    dbGet('students', { eq: { status: 'Active' }, order: 'full_name', asc: true }),
    dbGet('subjects', { order: 'name', asc: true }),
    dbGet('results', {
      order: 'created_at', asc: false, limit: 20,
      select: '*, students(full_name,class), subjects(name)',
    }),
  ]);

  return `
  <div style="display:flex;justify-content:flex-end;margin-bottom:1.2rem">
    <button class="btn btn-green btn-sm" onclick="openResultModal(${JSON.stringify(students).replace(/"/g,'&quot;')}, ${JSON.stringify(subjects).replace(/"/g,'&quot;')})">+ Enter Result</button>
  </div>
  <div class="panel">
    <div class="panel-header"><div class="panel-title">Recently Entered Results</div></div>
    <div class="panel-table">
      <table class="data-table">
        <thead><tr><th>Student</th><th>Subject</th><th>Term</th><th>Year</th><th>Score</th><th>Grade</th><th>Actions</th></tr></thead>
        <tbody>
          ${recentResults.length
            ? recentResults.map(r => `
            <tr>
              <td><strong>${r.students?.full_name||'—'}</strong><br><span style="font-size:12px;color:var(--muted)">${r.students?.class||''}</span></td>
              <td>${r.subjects?.name||'—'}</td>
              <td>${r.term}</td>
              <td>${r.academic_year}</td>
              <td><strong>${r.score}%</strong></td>
              <td><span class="badge ${gradeColor(r.grade)}">${r.grade||'—'}</span></td>
              <td><button class="btn btn-danger btn-xs" onclick="deleteResult('${r.id}')">Del</button></td>
            </tr>`).join('')
            : `<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--muted)">No results entered yet.</td></tr>`}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---- STAFF: VIEW STUDENTS ---- */
async function staffStudents() {
  const students = await dbGet('students', { eq: { status: 'Active' }, order: 'full_name', asc: true });
  return `
  <div class="panel">
    <div class="panel-header">
      <div class="panel-title">Active Students (${students.length})</div>
      <div class="search-bar" style="max-width:240px">
        <span class="search-icon">🔍</span>
        <input placeholder="Search…" oninput="filterStaffStudentTable(this.value, ${JSON.stringify(students).replace(/"/g,'&quot;')})">
      </div>
    </div>
    <div class="panel-table">
      <table class="data-table" id="_sfstudents">
        <thead><tr><th>Student</th><th>Level</th><th>Class</th><th>Gender</th><th>Status</th></tr></thead>
        <tbody id="_sfstbody">
          ${students.map(s => `
          <tr>
            <td><strong>${s.full_name}</strong></td>
            <td>${s.level}</td>
            <td>${s.class}</td>
            <td>${s.gender||'—'}</td>
            <td><span class="badge badge-green">${s.status}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function filterStaffStudentTable(q, students) {
  const filtered = q ? students.filter(s => s.full_name.toLowerCase().includes(q.toLowerCase()) || s.class.toLowerCase().includes(q.toLowerCase())) : students;
  const tb = document.getElementById('_sfstbody');
  if (tb) tb.innerHTML = filtered.map(s => `
    <tr>
      <td><strong>${s.full_name}</strong></td>
      <td>${s.level}</td><td>${s.class}</td>
      <td>${s.gender||'—'}</td>
      <td><span class="badge badge-green">${s.status}</span></td>
    </tr>`).join('');
}

/* ---- TIMETABLE ---- */
function portalTimetable() {
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
  const periods = [
    { time:'08:00–08:45', type:'class', subjects:['Mathematics','English','Biology','Chemistry','Physics'] },
    { time:'08:45–09:30', type:'class', subjects:['English','Mathematics','Chemistry','Biology','ICT'] },
    { time:'09:30–10:15', type:'class', subjects:['Biology','Physics','Mathematics','English','Mathematics'] },
    { time:'10:15–10:30', type:'break', subjects:['☕ Break','☕ Break','☕ Break','☕ Break','☕ Break'] },
    { time:'10:30–11:15', type:'class', subjects:['Chemistry','ICT','English','Physics','Biology'] },
    { time:'11:15–12:00', type:'class', subjects:['Physics','Biology','ICT','Mathematics','English'] },
    { time:'12:00–13:00', type:'lunch', subjects:['🍽 Lunch','🍽 Lunch','🍽 Lunch','🍽 Lunch','🍽 Lunch'] },
    { time:'13:00–13:45', type:'class', subjects:['ICT','Chemistry','Physics','ICT','Chemistry'] },
  ];
  return `
  <div class="panel">
    <div class="panel-header"><div class="panel-title">Class Timetable</div></div>
    <div class="timetable-wrap">
      <table class="timetable">
        <thead>
          <tr>
            <th style="min-width:100px">Time</th>
            ${days.map(d => `<th>${d}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${periods.map(p => `
          <tr class="${p.type==='break'?'break-row':p.type==='lunch'?'lunch-row':''}">
            <td class="time-col">${p.time}</td>
            ${p.subjects.map(s => `<td>${s}</td>`).join('')}
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ---- ANNOUNCEMENTS ---- */
async function portalAnnouncements() {
  const anns = await dbGet('announcements', { eq: { is_active: true }, order: 'published_at', asc: false });
  return `
  <div style="display:flex;flex-direction:column;gap:0.8rem">
    ${anns.length
      ? anns.map(a => `
      <div class="ann-item ${a.is_urgent?'urgent':a.type||'info'}">
        <div style="display:flex;align-items:start;justify-content:space-between;gap:1rem;flex-wrap:wrap">
          <div class="ann-title">${a.title}</div>
          ${a.is_urgent?'<span class="badge badge-red">Urgent</span>':''}
        </div>
        <div class="ann-meta">📅 ${fmtDateTime(a.published_at)} · ${a.author_name}</div>
        <div class="ann-body">${a.body}</div>
      </div>`).join('')
      : emptyHTML('📢','No announcements','Nothing has been posted yet. Check back soon.')}
  </div>`;
}

/* ---- MESSAGES ---- */
function portalMessages() {
  return `
  <div class="panel" style="max-width:600px">
    <div class="panel-header"><div class="panel-title">Send a Message to the School</div></div>
    <div class="panel-body">
      <div class="fg">
        <label>Subject *</label>
        <select class="fsel" id="_msgsubj">
          <option value="Academic Query">Academic Query</option>
          <option value="Fee Enquiry">Fee Enquiry</option>
          <option value="Absence Notice">Absence Notice</option>
          <option value="General">General Enquiry</option>
        </select>
      </div>
      <div class="fg">
        <label>Message *</label>
        <textarea class="fta" id="_msgbody" rows="6" placeholder="Write your message to the school here..."></textarea>
      </div>
      <button class="btn-submit" onclick="sendPortalMessage()">Send Message →</button>
      <div style="margin-top:1rem;padding:1rem;background:var(--g0);border-radius:var(--radius);font-size:13px;color:var(--muted)">
        📞 You can also reach us directly at <strong>+220 XXX XXXX</strong> or email <strong>info@mansacolley.gm</strong> during school hours (Monday–Friday, 8:00 AM–4:00 PM).
      </div>
    </div>
  </div>`;
}

/* ---- PARENT: MY CHILD ---- */
async function portalChild() {
  // In production: fetch child linked to this parent
  // For now show a helpful placeholder
  const students = await dbGet('students', { order: 'full_name', asc: true, limit: 1 });
  const student  = students?.[0];
  if (!student) return emptyHTML('🎓','No student linked','Please contact the school administration to link your child to your account.');

  const results = await dbGet('results', {
    eq: { student_id: student.id },
    order: 'created_at', asc: false,
    select: '*, subjects(name)',
    limit: 10,
  });

  const avg = results.length
    ? (results.reduce((s,r)=>s+parseFloat(r.score||0),0)/results.length).toFixed(1)+'%'
    : '—';

  return `
  <div class="grid-2" style="gap:1.5rem;align-items:start">
    <div class="panel">
      <div class="panel-header"><div class="panel-title">Child Information</div></div>
      <div class="panel-body">
        <div style="display:flex;align-items:center;gap:1.2rem;margin-bottom:1.5rem;padding:1rem;background:var(--g0);border-radius:var(--radius)">
          <div class="hcard-avatar" style="width:60px;height:60px;font-size:20px">
            ${student.photo_url ? `<img src="${student.photo_url}" alt="${student.full_name}" style="width:100%;height:100%;border-radius:50%;object-fit:cover">` : initials(student.full_name)}
          </div>
          <div>
            <div style="font-family:var(--font-heading);font-weight:800;font-size:1.1rem">${student.full_name}</div>
            <div style="color:var(--g6);font-size:13px;font-weight:700;margin-top:2px">${student.class} · ${student.level}</div>
            <span class="badge badge-green" style="margin-top:4px">${student.status}</span>
          </div>
        </div>
        ${[
          ['School Level', student.level],
          ['Class', student.class],
          ['Gender', student.gender||'—'],
          ['Admission Date', fmtDate(student.admission_date)],
          ['Current Average', avg],
        ].map(([l,val]) => `
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);font-size:14px">
          <span style="color:var(--muted);font-weight:600">${l}</span>
          <span style="font-weight:700">${val}</span>
        </div>`).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><div class="panel-title">Recent Results</div></div>
      <div class="panel-body">
        ${results.length
          ? results.map(r => `
          <div class="result-row">
            <div>
              <div class="result-subject">${r.subjects?.name||'—'}</div>
              <div style="font-size:12px;color:var(--muted)">${r.term} · ${r.academic_year}</div>
            </div>
            <div style="display:flex;align-items:center;gap:1rem">
              <div class="result-score">${r.score}%</div>
              <span class="badge ${gradeColor(r.grade)}">${r.grade||'—'}</span>
            </div>
          </div>`).join('')
          : emptyHTML('📊','No results yet','Results will appear here once entered by the school.')}
      </div>
    </div>
  </div>`;
}

/* ---- PROFILE ---- */
function portalProfile() {
  const u = state.profile;
  return `
  <div class="panel" style="max-width:500px">
    <div class="panel-header"><div class="panel-title">My Profile</div></div>
    <div class="panel-body">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;padding:1rem;background:var(--g0);border-radius:var(--radius)">
        <div class="sidebar-user-av" style="width:56px;height:56px;font-size:20px">
          ${u.avatar_url ? `<img src="${u.avatar_url}" alt="avatar">` : initials(u.full_name)}
        </div>
        <div>
          <div style="font-weight:800;font-size:1.1rem">${u.full_name}</div>
          <div style="color:var(--g6);font-size:13px;font-weight:700;text-transform:capitalize;margin-top:2px">${u.role}</div>
        </div>
      </div>
      ${[
        ['Full Name', u.full_name],
        ['Role', u.role.charAt(0).toUpperCase()+u.role.slice(1)],
        ['Phone', u.phone||'—'],
        ['Member Since', fmtDate(u.created_at)],
      ].map(([l,val]) => `
      <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);font-size:14px">
        <span style="color:var(--muted);font-weight:600">${l}</span>
        <span style="font-weight:700">${val}</span>
      </div>`).join('')}
      <div style="margin-top:1.2rem;padding:1rem;background:var(--g0);border-radius:var(--radius);font-size:13px;color:var(--muted)">
        To update your profile details or reset your password, please contact the school administration office.
      </div>
      <button class="btn btn-danger btn-sm" style="margin-top:1.2rem;width:100%" onclick="logout()">Sign Out</button>
    </div>
  </div>`;
}
