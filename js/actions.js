/* ============================================================
   ACTIONS.JS — All Supabase Data Operations
   ============================================================ */

/* ============================================================
   ANNOUNCEMENTS
   ============================================================ */
async function saveAnnouncement() {
  const title  = v('_at');
  const body   = v('_ab');
  const author = v('_aa') || state.profile?.full_name || 'Administration';
  const type   = v('_atype');
  if (!title || !body) { toast('Please fill in all fields', 'error'); return; }

  const btn = document.getElementById('_annBtn');
  if (btn) btn.disabled = true;

  try {
    await dbInsert('announcements', {
      title, body,
      author_name: author,
      type,
      is_urgent:   type === 'urgent',
      created_by:  state.user?.id || null,
    });
    closeModal();
    toast('Announcement posted! ✅');
    render();
  } catch (err) {
    toast(err.message, 'error');
    if (btn) btn.disabled = false;
  }
}

async function deleteAnnouncement(id) {
  if (!confirm('Delete this announcement?')) return;
  try {
    await dbDelete('announcements', id);
    toast('Deleted.');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

async function toggleAnnouncement(id, current) {
  try {
    await dbUpdate('announcements', id, { is_active: !current });
    toast('Updated.');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

/* ============================================================
   NEWS
   ============================================================ */
async function saveNews() {
  const title    = v('_nt');
  const excerpt  = v('_ne');
  const category = v('_nc');
  const emoji    = v('_nem') || '📰';
  if (!title || !excerpt || !category) { toast('Please fill in all fields', 'error'); return; }

  const btn = document.getElementById('_newsBtn');
  if (btn) btn.disabled = true;

  try {
    await dbInsert('news', {
      title, excerpt, category, emoji,
      is_featured:   false,
      is_published:  true,
      created_by:    state.user?.id || null,
    });
    closeModal();
    toast('Article published! ✅');
    render();
  } catch (err) {
    toast(err.message, 'error');
    if (btn) btn.disabled = false;
  }
}

async function deleteNews(id) {
  if (!confirm('Delete this article?')) return;
  try {
    await dbDelete('news', id);
    toast('Deleted.');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

async function toggleFeatured(id, current) {
  try {
    await dbUpdate('news', id, { is_featured: !current });
    toast('Updated.');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

/* ============================================================
   STUDENTS
   ============================================================ */
async function saveStudent() {
  const fullName  = v('_sn');
  const gender    = v('_sg');
  const level     = v('_sl');
  const cls       = v('_sc');
  const dob       = v('_sdob');
  const address   = v('_saddr');
  if (!fullName || !level || !cls) { toast('Please fill in required fields', 'error'); return; }

  const btn = document.getElementById('_studBtn');
  if (btn) btn.disabled = true;

  try {
    await dbInsert('students', {
      full_name:      fullName,
      gender,
      level,
      class:          cls,
      date_of_birth:  dob || null,
      address:        address || null,
      admission_date: new Date().toISOString().split('T')[0],
      status:         'Active',
    });
    closeModal();
    toast('Student added! ✅');
    render();
  } catch (err) {
    toast(err.message, 'error');
    if (btn) btn.disabled = false;
  }
}

async function deleteStudent(id) {
  if (!confirm('Remove this student record?')) return;
  try {
    await dbDelete('students', id);
    toast('Student removed.');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

async function updateStudentStatus(id, status) {
  try {
    await dbUpdate('students', id, { status });
    toast('Status updated.');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

/* ============================================================
   STAFF
   ============================================================ */
async function saveStaff() {
  const fullName   = v('_sfn');
  const role       = v('_sfrole');
  const department = v('_sfdept');
  const email      = v('_sfemail');
  const phone      = v('_sfphone');
  const joined     = v('_sfjoined');
  if (!fullName || !role || !department) { toast('Please fill in required fields', 'error'); return; }

  const btn = document.getElementById('_staffBtn');
  if (btn) btn.disabled = true;

  try {
    await dbInsert('staff', {
      full_name:   fullName,
      role, department, email, phone,
      joined_date: joined || null,
      status:      'Active',
    });
    closeModal();
    toast('Staff member added! ✅');
    render();
  } catch (err) {
    toast(err.message, 'error');
    if (btn) btn.disabled = false;
  }
}

async function deleteStaff(id) {
  if (!confirm('Remove this staff member?')) return;
  try {
    await dbDelete('staff', id);
    toast('Staff member removed.');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

/* ============================================================
   ADMISSIONS
   ============================================================ */
async function submitAdmission() {
  const parentName   = v('_pn');
  const studentName  = v('_cn');
  const phone        = v('_pph');
  const email        = v('_pe');
  const level        = v('_plv');
  const age          = v('_pa');
  const message      = v('_pm');
  if (!parentName || !studentName || !phone || !level) {
    toast('Please fill in all required fields', 'error');
    return;
  }

  const btn = document.getElementById('_admBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

  try {
    await dbInsert('admissions', {
      parent_name:  parentName,
      student_name: studentName,
      phone, email,
      level,
      age:     age ? parseInt(age) : null,
      message: message || null,
      status:  'Pending',
    });
    toast('Thank you! Our admissions team will contact you shortly. 🎉');
    ['_pn','_cn','_pph','_pe','_plv','_pa','_pm'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  } catch (err) {
    toast(err.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Send Enquiry →'; }
  }
}

async function updateAdmissionStatus(id, status) {
  try {
    await dbUpdate('admissions', id, {
      status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: state.user?.id || null,
    });
    toast(`Application ${status.toLowerCase()}. ✅`);
    render();
  } catch (err) { toast(err.message, 'error'); }
}

async function deleteAdmission(id) {
  if (!confirm('Delete this admission enquiry?')) return;
  try {
    await dbDelete('admissions', id);
    toast('Deleted.');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

/* ============================================================
   RESULTS / GRADES
   ============================================================ */
async function saveResult() {
  const studentId  = v('_rsid');
  const subjectId  = v('_rsubid');
  const term       = v('_rterm');
  const year       = v('_ryear');
  const score      = parseFloat(v('_rscore'));
  const remarks    = v('_rremarks');
  if (!studentId || !subjectId || !term || !year || isNaN(score)) {
    toast('Please fill in all required fields', 'error');
    return;
  }
  if (score < 0 || score > 100) { toast('Score must be between 0 and 100', 'error'); return; }

  const btn = document.getElementById('_resultBtn');
  if (btn) btn.disabled = true;

  try {
    // Upsert — update if exists, insert if not
    const { error } = await sb.from('results').upsert({
      student_id:    studentId,
      subject_id:    subjectId,
      term, academic_year: year,
      score, remarks,
      entered_by:    state.user?.id || null,
    }, { onConflict: 'student_id,subject_id,term,academic_year' });
    if (error) throw error;
    closeModal();
    toast('Result saved! ✅');
    render();
  } catch (err) {
    toast(err.message, 'error');
    if (btn) btn.disabled = false;
  }
}

async function deleteResult(id) {
  if (!confirm('Delete this result?')) return;
  try {
    await dbDelete('results', id);
    toast('Result deleted.');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

/* ============================================================
   EVENTS
   ============================================================ */
async function saveEvent() {
  const title = v('_evtitle');
  const date  = v('_evdate');
  const type  = v('_evtype');
  const desc  = v('_evdesc');
  if (!title || !date) { toast('Please fill in required fields', 'error'); return; }

  try {
    await dbInsert('events', {
      title, event_date: date, type,
      description: desc || null,
      created_by:  state.user?.id || null,
    });
    closeModal();
    toast('Event added! ✅');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

async function deleteEvent(id) {
  if (!confirm('Delete this event?')) return;
  try {
    await dbDelete('events', id);
    toast('Event deleted.');
    render();
  } catch (err) { toast(err.message, 'error'); }
}

/* ============================================================
   CONTACT / DONOR FORMS (email only — no DB table needed)
   ============================================================ */
function submitContact() {
  const name    = v('_ctn');
  const email   = v('_cte');
  const subject = v('_cts');
  const message = v('_ctm');
  if (!name || !email || !subject || !message) {
    toast('Please fill in all required fields', 'error');
    return;
  }
  // In production: connect to EmailJS or Formspree here
  toast('Message sent! We will get back to you soon. ✅');
  ['_ctn','_cte','_cts','_ctm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function submitDonor() {
  const org  = v('_do');
  const name = v('_dc');
  const email= v('_de');
  const type = v('_dt');
  if (!org || !name || !email || !type) {
    toast('Please fill in all required fields', 'error');
    return;
  }
  toast('Thank you for your interest! We will be in touch. 🙏');
  ['_do','_dc','_de','_dt','_dm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function subscribeNL() {
  const el = document.getElementById('_nle');
  if (!el || !el.value || !el.value.includes('@')) {
    toast('Please enter a valid email address', 'error');
    return;
  }
  toast('Subscribed! Welcome to the Mansa Colley community 🎉');
  el.value = '';
}

/* ============================================================
   MESSAGES (portal)
   ============================================================ */
async function sendPortalMessage() {
  const subject = v('_msgsubj');
  const body    = v('_msgbody');
  if (!subject || !body) { toast('Please fill in all fields', 'error'); return; }

  try {
    await dbInsert('messages', {
      from_user: state.user.id,
      subject, body,
    });
    toast('Message sent to the school! ✅');
    const el = document.getElementById('_msgbody');
    if (el) el.value = '';
  } catch (err) { toast(err.message, 'error'); }
}

/* ============================================================
   PHOTO UPLOAD
   ============================================================ */
async function uploadStudentPhoto(studentId, file) {
  try {
    const path = `students/${studentId}/${file.name}`;
    const url  = await uploadFile('avatars', path, file);
    await dbUpdate('students', studentId, { photo_url: url });
    toast('Photo uploaded! ✅');
    return url;
  } catch (err) { toast(err.message, 'error'); }
}

async function uploadStaffPhoto(staffId, file) {
  try {
    const path = `staff/${staffId}/${file.name}`;
    const url  = await uploadFile('avatars', path, file);
    await dbUpdate('staff', staffId, { photo_url: url });
    toast('Photo uploaded! ✅');
    return url;
  } catch (err) { toast(err.message, 'error'); }
}
