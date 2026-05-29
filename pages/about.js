/* ============================================================
   pages/about.js
   ============================================================ */
function pageAbout() {
  return `
  <div class="page">
    ${pageBannerHTML('About Us','Our Story &amp; Mission','Mansa Colley School has been shaping generations of Gambians in Brikama, providing quality education from Nursery through Senior Secondary.')}
    <section class="section" style="background:var(--bg)">
      <div class="container">
        <div class="grid-2" style="align-items:start;gap:4rem">
          <div class="reveal">
            <div class="slabel">Who We Are</div>
            <h2 class="stitle">A Foundation Built on Excellence</h2>
            <p class="sdesc" style="margin-bottom:1.2rem">Mansa Colley School is one of Brikama's leading educational institutions, offering a comprehensive and inclusive education from Nursery through Senior Secondary. Over the years, we have built a reputation for academic rigour, character development, and community impact.</p>
            <p class="sdesc" style="margin-bottom:1.2rem">Our school bears the name of a distinguished Gambian figure, and we honour that legacy every day by striving to produce graduates who are confident, capable, and committed to the progress of The Gambia.</p>
            <p class="sdesc">We are more than a school — we are a community of learners, educators, parents, and partners united by a shared belief in the transformative power of education.</p>
          </div>
          <div class="reveal delay-2">
            ${[
              ['🎯','Our Mission','To provide accessible, high-quality education that cultivates intellectual excellence, moral integrity, and civic responsibility, empowering every student to lead a purposeful and successful life.'],
              ['🔭','Our Vision','To be the leading school in West Africa known for producing graduates who are academically accomplished, culturally grounded, and globally competitive.'],
            ].map(([ic,t,d]) => `
              <div style="background:var(--white);border:1px solid var(--border);border-radius:var(--radiuslg);padding:1.8rem;margin-bottom:1.2rem">
                <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:0.8rem;color:var(--g7)">${ic} ${t}</h3>
                <p class="sdesc" style="font-size:14px">${d}</p>
              </div>`).join('')}
            <div style="background:var(--white);border:1px solid var(--border);border-radius:var(--radiuslg);padding:1.8rem">
              <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:1rem;color:var(--g7)">💫 Our Core Values</h3>
              <div style="display:flex;flex-wrap:wrap;gap:8px">
                ${['Excellence','Integrity','Inclusion','Innovation','Community','Discipline','Respect','Responsibility']
                  .map(v => `<span style="background:var(--g0);color:var(--g7);border:1px solid var(--g1);padding:5px 13px;border-radius:100px;font-size:13px;font-weight:700">${v}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section" style="background:var(--white)">
      <div class="container">
        <div class="center reveal" style="margin-bottom:3rem"><div class="slabel">Why Choose Us</div><h2 class="stitle">What Sets Us Apart</h2></div>
        <div class="grid-3">
          ${[['📖','Academic Rigour','Curriculum aligned with national standards and enriched with programmes for deeper learning.'],
             ['🏆','Proven Track Record','Top results in GABECE and WASSCE national examinations, year after year.'],
             ['👨‍🏫','Experienced Educators','Highly qualified, passionate educators committed to continuous professional development.'],
             ['🌍','Inclusive Community','Students from diverse backgrounds across The Gambia, fostering a rich environment.'],
             ['🤝','Parental Partnership','Regular parent-teacher engagements, portals, and open-door policies keep families connected.'],
             ['🔬','Modern Facilities','Science labs, computer room, sports field and library designed for 21st-century learning.']]
            .map(([ic,t,d]) => `
            <div class="card reveal" style="padding:1.8rem">
              <div style="font-size:2.2rem;margin-bottom:1rem">${ic}</div>
              <h3 style="font-size:1.05rem;font-weight:800;margin-bottom:8px">${t}</h3>
              <p style="font-size:13.5px;color:var(--muted);line-height:1.65">${d}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>
    <section class="exc-section">
      <div class="container" style="position:relative;z-index:2">
        <div class="center reveal" style="margin-bottom:3rem">
          <div class="slabel" style="color:var(--goldi)">By the Numbers</div>
          <h2 class="stitle exc-stitle">Mansa Colley at a Glance</h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem">
          ${[['1,200+','Students Enrolled'],['60+','Teaching & Support Staff'],['4','School Levels'],['98%','WASSCE Pass Rate 2024']]
            .map(([n,l]) => `<div class="stat-box reveal" style="text-align:center"><div class="stat-num">${n}</div><div class="stat-lbl">${l}</div></div>`).join('')}
        </div>
      </div>
    </section>
    ${nlStripHTML()}
  </div>`;
}

/* ============================================================
   pages/schools.js
   ============================================================ */
function pageSchools() {
  const schools = [
    { cls:'nursery',em:'🌱',name:'Nursery School',level:'Ages 3–5 · Foundation Level',color:'#fef3c7',
      overview:'Our Nursery School provides a nurturing, play-based learning environment where the youngest members of our community take their first exciting steps in education. Using a play-based curriculum, children explore language, numeracy, arts, and social skills in a warm, structured environment.',
      feats:['Early literacy and phonics','Number recognition and counting','Creative arts, music and movement','Social and emotional development','Outdoor play and physical activity','Story time and language enrichment'],
      highlight:'🌟 Nursery students progress to Primary with strong foundational skills in reading, writing, and numeracy.' },
    { cls:'primary',em:'📚',name:'Primary School',level:'Ages 6–11 · Grades 1–6',color:'#d0f0db',
      overview:'Primary School covers Grades 1 through 6, with a broad and balanced curriculum developing literacy, numeracy, scientific thinking, social studies, and the arts. Our teachers use diverse, engaging methods to ensure every learner is challenged and supported.',
      feats:['English Language and Literature','Mathematics and problem-solving','Integrated Science and Social Studies','Physical Education and Sports','Music and Performing Arts','Values and Citizenship Education'],
      highlight:'🌟 Our Grade 6 students consistently achieve above the national average in primary school assessments.' },
    { cls:'upper',em:'🎒',name:'Upper Basic School',level:'Ages 12–15 · Grades 7–9',color:'#dbeafe',
      overview:'Covering Grades 7 to 9, our Upper Basic School prepares students for the GABECE examination. Students explore a wider range of subjects including Sciences, Social Studies, Arabic, French, and ICT. Student leadership and extracurricular activities are strongly encouraged.',
      feats:['GABECE examination preparation','Mathematics, English, and Sciences','Social Studies and ICT','Arabic and French language options','Student leadership programme','Career guidance and counselling'],
      highlight:'🌟 Over 94% of our Upper Basic students pass the GABECE on their first attempt.' },
    { cls:'senior',em:'🎓',name:'Senior Secondary School',level:'Ages 16–18 · Grades 10–12',color:'#bbf7d0',
      overview:'The Senior Secondary School (Grades 10–12) is the culmination of the Mansa Colley journey. Students choose from Science, Arts, or Commerce streams and prepare for the WASSCE. University application support and scholarship guidance are available to all SSS3 students.',
      feats:['WASSCE examination preparation','Three streams: Science, Arts, Commerce','Advanced Mathematics and Sciences','University and career counselling','Scholarship application support','Student leadership and debate club'],
      highlight:'🌟 98% WASSCE pass rate in 2024, with multiple students achieving distinctions in all subjects.' },
  ];
  return `
  <div class="page">
    ${pageBannerHTML('Our Schools','Four Levels of Learning Excellence','From your child\'s very first day to their graduation — Mansa Colley is with them every step of the way.')}
    <section class="section" style="background:var(--bg)">
      <div class="container" style="display:flex;flex-direction:column;gap:3rem">
        ${schools.map(s => `
        <div class="reveal" style="background:var(--white);border:1px solid var(--border);border-radius:var(--radiuslg);overflow:hidden">
          <div style="background:linear-gradient(135deg,${s.color},${s.color}88);padding:2.5rem">
            <div style="display:flex;align-items:center;gap:1.2rem;flex-wrap:wrap">
              <div style="font-size:3.5rem">${s.em}</div>
              <div>
                <div style="font-family:var(--font-heading);font-size:1.6rem;font-weight:800;color:var(--dark)">${s.name}</div>
                <div style="font-size:12px;font-weight:700;color:var(--g6);text-transform:uppercase;letter-spacing:0.8px;margin-top:3px">${s.level}</div>
              </div>
            </div>
          </div>
          <div style="padding:2rem;display:grid;grid-template-columns:1.4fr 1fr;gap:2.5rem;align-items:start">
            <div>
              <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:0.8rem">Overview</h3>
              <p style="font-size:14px;color:var(--muted);line-height:1.75;margin-bottom:1.5rem">${s.overview}</p>
              <div style="background:var(--g0);border:1px solid var(--g1);border-radius:var(--radius);padding:1rem;font-size:13.5px;color:var(--g7);font-weight:600;line-height:1.6">${s.highlight}</div>
            </div>
            <div>
              <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:1rem">What We Offer</h3>
              <div class="sc-features" style="gap:9px">${s.feats.map(f => `<div class="sc-feat">${f}</div>`).join('')}</div>
              <button class="btn btn-green btn-sm" style="margin-top:1.5rem;width:100%" onclick="go('admission')">Apply for ${s.name} →</button>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </section>
    ${nlStripHTML()}
  </div>`;
}

/* ============================================================
   pages/excellence.js
   ============================================================ */
function pageExcellence() {
  const heroes = [
    {av:'FA',name:'Fatou Amadou',stream:'SSS3 Science',ach:'Best Student in Science — WASSCE 2024 · 9 A grades',badge:'🏆 Top of Nation',quote:'I owe everything to my teachers and family. Mansa Colley gave me the tools to dream without limits.'},
    {av:'MB',name:'Modou Badjie',stream:'SSS2 Science',ach:'Mathematics Olympiad National Champion 2024',badge:'🥇 National Champion',quote:'Mathematics is the language of the universe. At Mansa Colley, I was given the space to truly love it.'},
    {av:'AJ',name:'Aisha Jallow',stream:'SSS3 Arts',ach:'Best Student in Arts — WASSCE 2024 · Scholarship Recipient',badge:'🎓 Scholarship',quote:'This school believed in me before I believed in myself. That makes all the difference.'},
    {av:'SK',name:'Samba Krubally',stream:'Grade 9A',ach:'Student Council President & Community Leadership Award',badge:'⭐ Leadership',quote:'True leadership is about service. Mansa Colley taught me to lead with purpose.'},
    {av:'MJ',name:'Mariama Jobe',stream:'Grade 9B',ach:'Head Girl 2024/2025 · Best All-Round Student Award',badge:'🌟 All-Round',quote:'Education is the greatest equaliser. I am proud to represent every girl at this school.'},
    {av:'BC',name:'Bakary Ceesay',stream:'SSS2 Commerce',ach:'Best Business Studies Student · Young Entrepreneur Award',badge:'💼 Entrepreneur',quote:'Mansa Colley showed me that commerce is about creating opportunity for others.'},
  ];
  return `
  <div class="page">
    ${pageBannerHTML('Academic Excellence','Meet Our Heroes','We celebrate students who represent the very best of Mansa Colley — academically, socially, and as future leaders of The Gambia.')}
    <section class="exc-section">
      <div class="container">
        <div class="exc-grid">
          <div class="reveal">
            <div class="slabel" style="color:var(--goldi)">Our Record</div>
            <h2 class="stitle exc-stitle">Excellence by the Numbers</h2>
            <p class="sdesc exc-sdesc">Year after year, Mansa Colley students set the standard for academic achievement across The Gambia.</p>
            <div class="stat-grid" style="grid-template-columns:repeat(3,1fr)">
              ${[['98%','WASSCE Pass Rate'],['94%','GABECE Pass Rate'],['85%','University Placements'],['12','Scholarships 2024'],['24','National Awards'],['6','National Champions']]
                .map(([n,l]) => `<div class="stat-box"><div class="stat-num">${n}</div><div class="stat-lbl">${l}</div></div>`).join('')}
            </div>
          </div>
          <div class="reveal delay-2">
            <div style="font-size:12px;color:rgba(255,255,255,0.45);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:1.2rem">Top Heroes 2023/2024</div>
            <div class="hero-cards-list">
              ${heroes.slice(0,4).map(h => `
              <div class="hcard">
                <div class="hcard-avatar">${h.av}</div>
                <div><div class="hcard-name">${h.name}</div><div class="hcard-ach">${h.ach}</div><div class="hcard-badge">${h.badge}</div></div>
              </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section" style="background:var(--bg)">
      <div class="container">
        <div class="center reveal" style="margin-bottom:2.5rem"><div class="slabel">Hall of Fame</div><h2 class="stitle">2023/2024 Academic Heroes</h2></div>
        <div class="grid-3">
          ${heroes.map(h => `
          <div class="card reveal" style="padding:2rem;text-align:center">
            <div class="hcard-avatar" style="width:72px;height:72px;font-size:24px;margin:0 auto 1rem">${h.av}</div>
            <div style="font-family:var(--font-heading);font-weight:800;font-size:1.1rem;margin-bottom:3px">${h.name}</div>
            <div style="font-size:12px;color:var(--g6);font-weight:700;margin-bottom:0.8rem">${h.stream}</div>
            <div style="display:inline-block;background:var(--g0);color:var(--g6);border:1px solid var(--g1);font-size:11.5px;font-weight:700;padding:3px 11px;border-radius:100px;margin-bottom:1rem">${h.badge}</div>
            <p style="font-size:13px;color:var(--muted);line-height:1.65;font-style:italic;margin-bottom:1rem">"${h.quote}"</p>
            <div style="font-size:12.5px;color:var(--muted)">${h.ach}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section" style="background:var(--white)">
      <div class="container">
        <div class="center reveal" style="margin-bottom:2.5rem"><div class="slabel">Student Voice</div><h2 class="stitle">Student Leadership Council 2024/2025</h2></div>
        <div class="grid-3">
          ${[
            ['SK','Samba Krubally','Head Boy','SSS3 Science','👑',"Serving my school is my greatest honour. I am committed to making Mansa Colley better for every student who comes after me."],
            ['MJ','Mariama Jobe','Head Girl','SSS3 Arts','🌟',"I am proud to represent every girl at this school. Education is empowerment, and I will use my position to inspire others."],
            ['BC','Bakary Ceesay','Council Secretary','SSS2 Commerce','📣',"Our council gives every student a voice — we are building tomorrow's leaders right here in Brikama."],
          ].map(([av,n,r,s,e,q]) => `
          <div class="reveal" style="background:var(--white);border:1px solid var(--border);border-radius:var(--radiuslg);padding:2rem;text-align:center">
            <div style="font-size:2.8rem;margin-bottom:1rem">${e}</div>
            <div class="hcard-avatar" style="width:64px;height:64px;font-size:22px;margin:0 auto 1rem">${av}</div>
            <div style="font-family:var(--font-heading);font-weight:800;font-size:1.1rem">${n}</div>
            <div style="color:var(--g6);font-size:13px;font-weight:700;margin-top:3px">${r}</div>
            <div style="color:var(--light);font-size:12px;margin-top:2px">${s}</div>
            <p style="font-size:13px;color:var(--muted);line-height:1.65;font-style:italic;margin-top:1rem">"${q}"</p>
          </div>`).join('')}
        </div>
      </div>
    </section>
    ${nlStripHTML()}
  </div>`;
}

/* ============================================================
   pages/news.js
   ============================================================ */
async function pageNews() {
  let news = [], events = [], anns = [];
  try {
    [news, events, anns] = await Promise.all([
      dbGet('news', { eq: { is_published: true }, order: 'published_at', asc: false }),
      dbGet('events', { eq: { is_active: true }, order: 'event_date', asc: true }),
      dbGet('announcements', { eq: { is_active: true }, order: 'published_at', asc: false }),
    ]);
  } catch (err) { console.error(err); }

  const colors = ['var(--g7),var(--g4)','var(--g6),var(--g3)','#7c3aed,#5b21b6','#0f766e,#0d9488','#c2410c,#ea580c'];
  return `
  <div class="page">
    ${pageBannerHTML('News & Events','Latest from Mansa Colley','School events, academic achievements, sports news, and community stories.')}
    <section class="section" style="background:var(--bg)">
      <div class="container">
        ${news.length
          ? `<div class="grid-auto">${news.map((n,i) => `
            <div class="news-card card-hover-lift reveal">
              <div class="nc-img${n.is_featured?' feat':''}" style="background:linear-gradient(135deg,${colors[i%5]})">
                <span>${n.emoji||'📰'}</span><div class="nc-tag">${n.category}</div>
              </div>
              <div class="nc-body">
                <div class="nc-date">📅 ${fmtDate(n.published_at)}</div>
                <div class="nc-title${n.is_featured?' lg':''}">${n.title}</div>
                <div class="nc-excerpt">${n.excerpt}</div>
                <button class="nc-more">Read more →</button>
              </div>
            </div>`).join('')}</div>`
          : emptyHTML('📰','No news articles yet','Check back soon for the latest updates from Mansa Colley School.')}
      </div>
    </section>
    <section class="section" style="background:var(--white)">
      <div class="container">
        <div class="grid-2" style="gap:3rem;align-items:start">
          <div class="reveal">
            <div class="slabel">Upcoming Events</div><h2 class="stitle">School Calendar</h2>
            ${events.length
              ? events.map(e => `
              <div style="display:flex;gap:1rem;align-items:center;padding:1rem 0;border-bottom:1px solid var(--border)">
                <div style="background:var(--g0);border:1px solid var(--g1);border-radius:var(--radius);padding:0.7rem 1rem;text-align:center;min-width:56px">
                  <div style="font-size:1.3rem;font-weight:900;font-family:var(--font-heading);color:var(--g7)">${new Date(e.event_date).getDate()}</div>
                  <div style="font-size:10px;font-weight:700;color:var(--g5);text-transform:uppercase">${new Date(e.event_date).toLocaleString('default',{month:'short'})}</div>
                </div>
                <div>
                  <div style="font-weight:700;font-size:14.5px;margin-bottom:3px">${e.title}</div>
                  <div style="font-size:12px;color:var(--light)">${fmtDate(e.event_date)}</div>
                  ${e.description?`<div style="font-size:13px;color:var(--muted);margin-top:2px">${e.description}</div>`:''}
                </div>
              </div>`).join('')
              : emptyHTML('📅','No upcoming events','Events will appear here once added.')}
          </div>
          <div class="reveal delay-2">
            <div class="slabel">School Notices</div><h2 class="stitle">Announcements</h2>
            ${anns.length
              ? anns.map(a => `
              <div class="ann-item ${a.is_urgent?'urgent':a.type||'info'}">
                <div class="ann-title">${a.title}</div>
                <div class="ann-meta">📅 ${fmtDate(a.published_at)} · ${a.author_name}</div>
                <div class="ann-body">${a.body}</div>
              </div>`).join('')
              : emptyHTML('📢','No announcements','Announcements will appear here.')}
          </div>
        </div>
      </div>
    </section>
    ${nlStripHTML()}
  </div>`;
}

/* ============================================================
   pages/staff.js
   ============================================================ */
async function pageStaff() {
  let staff = [];
  try { staff = await dbGet('staff', { eq: { status: 'Active' }, order: 'created_at', asc: true }); }
  catch (err) { console.error(err); }
  const avClasses = ['av-gold','av-green','av-sage','av-earth'];
  return `
  <div class="page">
    ${pageBannerHTML('Our Team','Meet Our Dedicated Staff','Our teachers and administrators are the heart of Mansa Colley — passionate, experienced, and committed to every student\'s success.')}
    <section class="section" style="background:var(--bg)">
      <div class="container">
        ${staff.length
          ? `<div class="grid-4">${staff.map((s,i) => `
            <div class="staff-card reveal">
              <div class="staff-av ${s.photo_url?'':avClasses[i%4]}">
                ${s.photo_url?`<img src="${s.photo_url}" alt="${s.full_name}">`:initials(s.full_name)}
              </div>
              <div class="staff-name">${s.full_name}</div>
              <div class="staff-role">${s.role}</div>
              <div class="staff-dept">${s.department}</div>
              <div style="margin-top:0.8rem"><span class="badge badge-green">${s.status}</span></div>
            </div>`).join('')}</div>`
          : `<div class="center">${loadingHTML('Loading staff…')}</div>`}
      </div>
    </section>
    <section class="section" style="background:var(--white)">
      <div class="container center">
        <div class="slabel">Join Our Team</div>
        <h2 class="stitle">Careers at Mansa Colley</h2>
        <p class="sdesc" style="max-width:480px;margin:0 auto 2rem">We are always looking for dedicated, passionate educators who share our commitment to excellence and community.</p>
        <button class="btn btn-green" onclick="go('contact')">Enquire About Vacancies →</button>
      </div>
    </section>
    ${nlStripHTML()}
  </div>`;
}

/* ============================================================
   pages/admission.js
   ============================================================ */
function pageAdmission() {
  return `
  <div class="page">
    ${pageBannerHTML('Admissions','Join the Mansa Colley Family','We welcome students eager to learn and grow. Our admissions process is straightforward and transparent.')}
    <section class="section" style="background:var(--bg)">
      <div class="container">
        <div class="grid-2" style="gap:4rem;align-items:start">
          <div class="reveal">
            <div class="slabel">How to Apply</div><h2 class="stitle">Admissions Process</h2>
            <div style="margin-top:1.8rem">
              ${[
                ['Submit Your Enquiry','Fill in the form with your child\'s details and preferred school level. Our team will contact you within 2 business days.'],
                ['Visit the School','Schedule a guided tour to meet teachers, see facilities, and ask any questions.'],
                ['Submit Application','Complete the official form and submit it with required documents.'],
                ['Enrolment Confirmed','Upon acceptance, receive a confirmation letter with all details to begin your child\'s journey.'],
              ].map(([t,d],i) => `
              <div class="step-item">
                <div class="step-num">${i+1}</div>
                <div><div class="step-title">${t}</div><div class="step-desc">${d}</div></div>
              </div>`).join('')}
            </div>
            <div style="background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;margin-top:1rem">
              <div style="font-weight:700;font-size:14px;margin-bottom:1rem;color:var(--g8)">📎 Downloadable Resources</div>
              ${['Application Form 2025/2026','School Prospectus','Volunteer / Partnership Form'].map(l => `
              <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)">
                <span style="color:var(--g6);font-size:15px">⬇</span>
                <button style="color:var(--g6);font-size:14px;font-weight:700;background:none;border:none;cursor:pointer;text-align:left;font-family:var(--font-body)" onclick="toast('${l} downloading…')"> ${l}</button>
              </div>`).join('')}
            </div>
            <div style="background:var(--g0);border:1px solid var(--g1);border-radius:var(--radius);padding:1.3rem;margin-top:1rem">
              <div style="font-weight:700;font-size:13.5px;color:var(--g7);margin-bottom:6px">📅 Key Admission Dates 2025</div>
              ${[['Applications Open','1 March 2025'],['Applications Close','30 June 2025'],['Results Notification','15 July 2025'],['Term Begins','1 September 2025']]
                .map(([l,d]) => `<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0;color:var(--muted)"><span>${l}</span><span style="font-weight:700;color:var(--g7)">${d}</span></div>`).join('')}
            </div>
          </div>
          <div class="reveal delay-2">
            <div class="form-wrap">
              <div class="form-title">Admission Enquiry Form</div>
              <div class="form-sub">Fill in the form and our admissions team will be in touch shortly.</div>
              <div class="form-row">
                <div class="fg"><label>Parent / Guardian Name *</label><input class="fi" id="_pn" placeholder="Full name"></div>
                <div class="fg"><label>Child's Full Name *</label><input class="fi" id="_cn" placeholder="Full name"></div>
              </div>
              <div class="fg"><label>Phone Number *</label><input class="fi" id="_pph" placeholder="+220 XXX XXXX"></div>
              <div class="fg"><label>Email Address</label><input class="fi" id="_pe" placeholder="your@email.com" type="email"></div>
              <div class="form-row">
                <div class="fg"><label>School Level *</label>
                  <select class="fsel" id="_plv">
                    <option value="">Select level</option>
                    <option>Nursery School</option><option>Primary School</option>
                    <option>Upper Basic School</option><option>Senior Secondary School</option>
                  </select>
                </div>
                <div class="fg"><label>Child's Age *</label><input class="fi" id="_pa" type="number" placeholder="Age" min="3" max="18"></div>
              </div>
              <div class="fg"><label>Message / Additional Info</label><textarea class="fta" id="_pm" placeholder="Any questions or additional information..."></textarea></div>
              <button class="btn-submit" id="_admBtn" onclick="submitAdmission()">Send Enquiry →</button>
              <div style="font-size:12px;color:var(--light);text-align:center;margin-top:0.8rem">Your information is kept strictly confidential.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${nlStripHTML()}
  </div>`;
}

/* ============================================================
   pages/donors.js
   ============================================================ */
function pageDonors() {
  return `
  <div class="page">
    ${pageBannerHTML('Donors & Partners','Support Our Mission','Our donors make it possible to provide quality education and life-changing opportunities for students across Brikama and beyond.')}
    <section class="section" style="background:var(--g9)">
      <div class="container">
        <div class="grid-3 reveal" style="margin-bottom:2.5rem">
          ${[['dt-plat','💎','Platinum Partner','GMD 100,000+ per year','Named building · Premier recognition · Annual impact report · School visit · Advisory board seat'],
             ['dt-gold','🥇','Gold Sponsor','GMD 50,000–99,999 per year','Prominent recognition · Named scholarship fund · Newsletter feature · School visit'],
             ['dt-silv','🥈','Silver Friend','GMD 10,000–49,999 per year','Website recognition · Certificate of appreciation · Annual impact report · Prize-giving invitation']]
            .map(([c,i,n,a,p]) => `
            <div class="donor-tier ${c}">
              <div class="tier-icon">${i}</div>
              <div class="tier-name">${n}</div>
              <div class="tier-amt">${a}</div>
              <div class="tier-perks">${p}</div>
            </div>`).join('')}
        </div>
        <div class="reveal" style="background:rgba(201,162,39,0.12);border:1px solid rgba(201,162,39,0.25);border-radius:var(--radiuslg);padding:2.2rem;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap">
          <div>
            <div style="font-family:var(--font-heading);font-size:1.5rem;font-weight:800;color:#fff">Ready to Make a Difference?</div>
            <div style="color:rgba(255,255,255,0.6);font-size:14px;margin-top:5px">Contact us to discuss how your support can transform lives in Brikama, The Gambia.</div>
          </div>
          <button class="btn btn-gold" onclick="go('contact')">Become a Donor →</button>
        </div>
      </div>
    </section>
    <section class="section" style="background:var(--bg)">
      <div class="container">
        <div class="center reveal" style="margin-bottom:2.5rem"><div class="slabel">Impact</div><h2 class="stitle">Your Donation at Work</h2></div>
        <div class="grid-3">
          ${[['🔬','Science Laboratory','Funded by international donors in 2025. Used by 300+ Senior Secondary students for Biology, Chemistry and Physics.'],
             ['📚','School Library','Over 5,000 books across all levels, made possible by donor contributions and our reading programme fund.'],
             ['💻','Computer Room','12 desktop computers enabling ICT lessons from Grade 4 upwards, opening doors to digital skills.'],
             ['🏫','Classroom Renovation','Three classrooms renovated in 2024, providing a better learning environment for 150+ Primary students.'],
             ['🎓','Scholarship Fund','Annual fund supports 12 outstanding Senior Secondary students who might otherwise be unable to continue.'],
             ['⚽','Sports Facilities','New football pitch and athletics track supporting PE for 1,200+ students and our award-winning teams.']]
            .map(([i,t,d]) => `
            <div class="card reveal" style="padding:1.8rem">
              <div style="font-size:2.2rem;margin-bottom:1rem">${i}</div>
              <h3 style="font-size:1rem;font-weight:800;margin-bottom:8px">${t}</h3>
              <p style="font-size:13.5px;color:var(--muted);line-height:1.65">${d}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section" style="background:var(--white)">
      <div class="container">
        <div class="grid-2" style="gap:4rem;align-items:start">
          <div class="reveal">
            <div class="slabel">Partnership</div><h2 class="stitle">Become a School Partner</h2>
            <p class="sdesc" style="margin-bottom:1.5rem">Beyond financial donations, we welcome partnerships with organisations offering expertise, training, internships, or volunteer support.</p>
            ${[['🌐','NGO & International Organisations','Programme support, skills training, volunteer placements, capacity building.'],
               ['🏢','Private Companies','Sponsorship, mentorship, internships, scholarship funds, CSR initiatives.'],
               ['🎓','Universities & Research Bodies','Curriculum development, research partnerships, teacher training.'],
               ['🏛️','Government Institutions','Policy alignment, infrastructure support, national examination preparation.']]
              .map(([ic,t,d]) => `
              <div style="display:flex;gap:1rem;margin-bottom:1.3rem">
                <div style="font-size:1.8rem;flex-shrink:0">${ic}</div>
                <div><div style="font-weight:700;font-size:14.5px;margin-bottom:3px">${t}</div><div style="font-size:13.5px;color:var(--muted)">${d}</div></div>
              </div>`).join('')}
          </div>
          <div class="reveal delay-2">
            <div class="form-wrap">
              <div class="form-title">Partner / Donor Enquiry</div>
              <div class="fg"><label>Organisation / Name *</label><input class="fi" id="_do" placeholder="Name"></div>
              <div class="form-row">
                <div class="fg"><label>Contact Name *</label><input class="fi" id="_dc" placeholder="Your name"></div>
                <div class="fg"><label>Email *</label><input class="fi" id="_de" placeholder="email@example.com" type="email"></div>
              </div>
              <div class="fg"><label>Type of Support *</label>
                <select class="fsel" id="_dt">
                  <option value="">Select type</option>
                  <option>Platinum Partnership</option><option>Gold Sponsorship</option><option>Silver Friend</option>
                  <option>Scholarship Fund</option><option>In-Kind Donation</option><option>Volunteer Programme</option><option>Other</option>
                </select>
              </div>
              <div class="fg"><label>Message *</label><textarea class="fta" id="_dm" placeholder="Tell us about your interest in supporting Mansa Colley..."></textarea></div>
              <button class="btn-submit" onclick="submitDonor()">Send Enquiry →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${nlStripHTML()}
  </div>`;
}

/* ============================================================
   pages/contact.js
   ============================================================ */
function pageContact() {
  return `
  <div class="page">
    ${pageBannerHTML('Get in Touch','Contact Mansa Colley School','We would love to hear from you — whether you are a prospective parent, partner, donor, or volunteer.')}
    <section class="section" style="background:var(--bg)">
      <div class="container">
        <div class="grid-2" style="gap:4rem;align-items:start">
          <div class="reveal">
            <div class="slabel">Our Details</div><h2 class="stitle">Reach Us</h2>
            <div style="display:flex;flex-direction:column;gap:1.3rem;margin-top:1.5rem;margin-bottom:2rem">
              ${[['📍','Location','Brikama, West Coast Region, The Gambia'],
                 ['📞','Phone','+220 XXX XXXX'],
                 ['✉️','Email','info@mansacolley.gm'],
                 ['🕐','Office Hours','Monday – Friday: 8:00 AM – 4:00 PM']]
                .map(([ic,l,val]) => `
                <div class="contact-item">
                  <div class="ci-icon">${ic}</div>
                  <div><div class="ci-lbl">${l}</div><div class="ci-val">${val}</div></div>
                </div>`).join('')}
            </div>
            <div class="social-row">
              ${['f','𝕏','W','▶'].map(i => `<div class="social-btn">${i}</div>`).join('')}
            </div>
            <div style="margin-top:2rem;background:var(--white);border:1px solid var(--border);border-radius:var(--radiuslg);padding:1.5rem">
              <div style="font-weight:800;font-size:1rem;margin-bottom:1rem">Frequently Asked Questions</div>
              ${[['How do I apply for admission?','Visit our Admissions page or fill in the enquiry form. Our team will guide you through the process.'],
                 ['What are the school fees?','Fees vary by level. Please contact us or visit the school for the current fee schedule.'],
                 ['Do you offer scholarships?','Yes, we have a scholarship fund for outstanding Senior Secondary students. Contact us for eligibility.'],
                 ['Is there a school uniform?','Yes. Uniform policy and details are available from the school office during the admissions process.']]
                .map(([q,a]) => `
                <div style="margin-bottom:1rem;border-bottom:1px solid var(--border);padding-bottom:1rem">
                  <div style="font-weight:700;font-size:13.5px;margin-bottom:4px">${q}</div>
                  <div style="font-size:13px;color:var(--muted);line-height:1.65">${a}</div>
                </div>`).join('')}
            </div>
          </div>
          <div class="reveal delay-2">
            <div class="form-wrap">
              <div class="form-title">Send Us a Message</div>
              <div class="form-row">
                <div class="fg"><label>Your Name *</label><input class="fi" id="_ctn" placeholder="Full name"></div>
                <div class="fg"><label>Email *</label><input class="fi" id="_cte" placeholder="your@email.com" type="email"></div>
              </div>
              <div class="fg"><label>Subject *</label>
                <select class="fsel" id="_cts">
                  <option value="">Select a subject</option>
                  <option>Admission Enquiry</option><option>Partnership / Donation</option>
                  <option>Volunteering</option><option>Media / Press</option><option>General Enquiry</option>
                </select>
              </div>
              <div class="fg"><label>Message *</label><textarea class="fta" id="_ctm" rows="5" placeholder="How can we help you?"></textarea></div>
              <button class="btn-submit" onclick="submitContact()">Send Message →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${nlStripHTML()}
  </div>`;
}

/* ============================================================
   pages/login.js
   ============================================================ */
function pageLogin() {
  return `
  <div class="page" style="background:var(--g9);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem">
    <div style="width:100%;max-width:420px">
      <div style="text-align:center;margin-bottom:2rem">
        <div class="nav-logo-badge" style="width:60px;height:60px;font-size:22px;margin:0 auto 1rem">MC</div>
        <h1 style="font-family:var(--font-heading);font-size:1.8rem;font-weight:900;color:#fff;margin-bottom:6px">Sign In</h1>
        <div style="font-size:14px;color:rgba(255,255,255,0.55)">Mansa Colley Staff, Student & Parent Portal</div>
      </div>
      <div class="form-wrap fade-up">
        <div class="form-title">Welcome Back</div>
        <div class="form-sub">Sign in to access your portal, results, announcements, and more.</div>
        <div class="fg"><label>Email Address *</label>
          <input class="fi" id="_lemail" placeholder="your@email.com" type="email" onkeydown="if(event.key==='Enter')doLogin()">
        </div>
        <div class="fg"><label>Password *</label>
          <input class="fi" id="_lpwd" placeholder="Password" type="password" onkeydown="if(event.key==='Enter')doLogin()">
        </div>
        <button class="btn-submit" id="_loginBtn" onclick="doLogin()">Sign In →</button>
        <div style="text-align:center;margin-top:1rem;font-size:13px;color:var(--muted)">
          New student? <button style="color:var(--g5);font-weight:700;background:none;border:none;cursor:pointer;font-family:var(--font-body)" onclick="go('admission')">Apply for Admission</button>
        </div>
      </div>
      <div style="text-align:center;margin-top:1.5rem">
        <button style="color:rgba(255,255,255,0.45);font-size:13px;background:none;border:none;cursor:pointer;font-family:var(--font-body)" onclick="go('home')">← Back to Website</button>
      </div>
    </div>
  </div>`;
}
