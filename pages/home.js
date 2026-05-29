/* ============================================================
   pages/home.js — Home Page
   ============================================================ */

async function pageHome() {
  // Fetch live data from Supabase
  let anns = [], news = [], events = [];
  try {
    [anns, news, events] = await Promise.all([
      dbGet('announcements', { eq: { is_active: true }, order: 'published_at', asc: false, limit: 3 }),
      dbGet('news', { eq: { is_published: true }, order: 'published_at', asc: false, limit: 3 }),
      dbGet('events', { eq: { is_active: true }, order: 'event_date', asc: true, limit: 4 }),
    ]);
  } catch (err) { console.error('Home data error:', err); }

  return `
  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-grid"></div>
    <div class="container">
      <div class="hero-inner">
        <div class="fade-up">
          <div class="hero-badge"><span class="hero-dot"></span>Admissions Open 2025/2026</div>
          <h1>Nurturing <em>Excellence</em><br>from Nursery to<br>Senior Secondary</h1>
          <p class="hero-desc">Mansa Colley School in Brikama, The Gambia — where every student's potential is cultivated through quality education, dedicated teachers, and a vibrant community.</p>
          <div class="hero-actions">
            <button class="btn btn-gold" onclick="go('admission')">Apply for Admission →</button>
            <button class="btn btn-outline-w" onclick="go('about')">Discover Our School</button>
          </div>
          <div class="hero-stats">
            <div><div class="hstat-num">1,200+</div><div class="hstat-label">Students Enrolled</div></div>
            <div><div class="hstat-num">98%</div><div class="hstat-label">WASSCE Pass Rate</div></div>
            <div><div class="hstat-num">60+</div><div class="hstat-label">Dedicated Staff</div></div>
          </div>
        </div>
        <div class="hero-right" style="position:relative;padding:2rem 0 2rem 1.5rem">
          <div class="float-badge top">🏆 School of Excellence 2024</div>
          <div class="hero-card">
            <div class="hero-card-title">Our Four Schools</div>
            <div class="level-grid">
              ${[['🌱','Nursery School','Ages 3–5'],['📚','Primary School','Ages 6–11'],['🎒','Upper Basic','Ages 12–15'],['🎓','Senior Secondary','Ages 16–18']]
                .map(([e,n,a]) => `
                <div class="level-tile" onclick="go('schools')">
                  <div class="level-emoji">${e}</div>
                  <div class="level-name">${n}</div>
                  <div class="level-ages">${a}</div>
                </div>`).join('')}
            </div>
          </div>
          <div class="float-badge bottom"><span class="fbdot"></span>Enrolment now open</div>
        </div>
      </div>
    </div>
  </section>

  <!-- MARQUEE -->
  <div class="marquee"><div class="mtrack">
    ${Array(2).fill([
      '🎓 Excellence in Education','📚 Nursery · Primary · Upper Basic · Senior Secondary',
      '🌍 Brikama, The Gambia','🏆 Academic Achievement Awards 2024',
      '📝 Admissions Open 2025/2026','🤝 Partner with Us'
    ].map(t => `<span class="mitem">${t} <span class="msep">◆</span></span>`).join('')).join('')}
  </div></div>

  <!-- ANNOUNCEMENTS -->
  <section class="section-sm" style="background:var(--white);border-bottom:1px solid var(--border)">
    <div class="container">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.2rem;flex-wrap:wrap;gap:1rem">
        <div><div class="slabel">Latest Updates</div><h2 class="stitle" style="font-size:1.5rem;margin:0">School Announcements</h2></div>
        <button class="btn btn-outline-g btn-sm" onclick="go('news')">All Notices →</button>
      </div>
      ${anns.length
        ? anns.map(a => `
          <div class="ann-item ${a.is_urgent?'urgent':a.type||'info'}">
            <div style="display:flex;align-items:start;justify-content:space-between;gap:1rem;flex-wrap:wrap">
              <div class="ann-title">${a.title}</div>
              <div class="ann-meta">📅 ${fmtDate(a.published_at)} · ${a.author_name}</div>
            </div>
            <div class="ann-body">${a.body.substring(0,180)}${a.body.length>180?'…':''}</div>
          </div>`).join('')
        : `<div class="ann-item info"><div class="ann-title">No announcements at the moment.</div></div>`}
    </div>
  </section>

  <!-- ABOUT PREVIEW -->
  <section class="section" style="background:var(--bg)">
    <div class="container">
      <div class="grid-2" style="align-items:center;gap:4rem">
        <div class="reveal">
          <div class="slabel">About Us</div>
          <h2 class="stitle">A Legacy of Learning in The Gambia</h2>
          <p class="sdesc">Mansa Colley School is a proud institution in Brikama, dedicated to delivering quality education from the earliest years through senior secondary. We believe every child deserves an environment that fosters curiosity, character, and achievement.</p>
          <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:1.2rem">
            ${[['📖','Academic Excellence','Rigorous curriculum aligned with national standards, with consistent top performance.'],
               ['🌱','Holistic Development','We nurture the whole child — intellectually, socially, morally, and physically.'],
               ['🤝','Community & Partnership','Deeply rooted in Brikama, building lasting partnerships with donors and NGOs.']]
              .map(([ic,t,d]) => `
              <div class="value-item">
                <div class="vi-icon">${ic}</div>
                <div><div class="vi-title">${t}</div><div class="vi-desc">${d}</div></div>
              </div>`).join('')}
          </div>
          <button class="btn btn-green" style="margin-top:1.8rem" onclick="go('about')">Learn More About Us →</button>
        </div>
        <div class="reveal delay-2" style="background:linear-gradient(135deg,var(--g8),var(--g5));border-radius:var(--radiuslg);aspect-ratio:4/3;display:flex;align-items:center;justify-content:center">
          <div style="text-align:center;color:#fff;padding:2rem">
            <div style="font-size:5rem;margin-bottom:1rem">🏫</div>
            <div style="font-family:var(--font-heading);font-size:1.7rem;font-weight:800;line-height:1.2">Mansa Colley School</div>
            <div style="font-size:13px;opacity:0.6;margin-top:6px">Est. Brikama, West Coast Region</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SCHOOLS PREVIEW -->
  <section class="section" style="background:var(--white)">
    <div class="container">
      <div class="center reveal" style="margin-bottom:3rem">
        <div class="slabel">Our Schools</div>
        <h2 class="stitle">Four Levels of Learning Excellence</h2>
        <p class="sdesc" style="max-width:520px">From your child's very first day to graduation — Mansa Colley is with them every step of the way.</p>
      </div>
      <div class="grid-4">
        ${[
          ['nursery','🌱','Nursery School','Ages 3–5','Playful, nurturing foundation for lifelong learning.',['Early literacy & numeracy','Creative arts & play','Social development']],
          ['primary','📚','Primary School','Ages 6–11','Strong foundations in literacy, numeracy and sciences.',['Core Maths, English, Science','Sports & music','Values education']],
          ['upper','🎒','Upper Basic','Ages 12–15','GABECE preparation and expanding subject options.',['GABECE preparation','Science labs','Student leadership']],
          ['senior','🎓','Senior Secondary','Ages 16–18','WASSCE preparation across Science, Arts and Commerce.',['WASSCE preparation','3 academic streams','University support']],
        ].map(([cls,em,name,lvl,desc,feats]) => `
          <div class="school-card reveal" onclick="go('schools')">
            <div class="sc-top ${cls}">
              <span class="sc-emoji">${em}</span>
              <div class="sc-name">${name}</div>
              <div class="sc-level">${lvl}</div>
            </div>
            <div class="sc-body">
              <p class="sc-desc">${desc}</p>
              <div class="sc-features">${feats.map(f => `<div class="sc-feat">${f}</div>`).join('')}</div>
              <button class="sc-link">Enroll now →</button>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- EXCELLENCE PREVIEW -->
  <section class="exc-section">
    <div class="container">
      <div class="exc-grid">
        <div class="reveal">
          <div class="slabel" style="color:var(--goldi)">Academic Excellence</div>
          <h2 class="stitle exc-stitle">Meet Our Heroes</h2>
          <p class="sdesc exc-sdesc">We celebrate students who exemplify dedication, resilience, and brilliance. Our academic heroes inspire the entire school community.</p>
          <div class="stat-grid">
            ${[['98%','WASSCE Pass Rate'],['85%','University Placements'],['24','National Awards'],['12','Scholarship Recipients']]
              .map(([n,l]) => `<div class="stat-box"><div class="stat-num">${n}</div><div class="stat-lbl">${l}</div></div>`).join('')}
          </div>
          <button class="btn btn-gold" style="margin-top:1.8rem" onclick="go('excellence')">View All Heroes →</button>
        </div>
        <div class="reveal delay-2">
          <div style="font-size:12px;color:rgba(255,255,255,0.45);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:1.2rem">2023/2024 Academic Heroes</div>
          <div class="hero-cards-list">
            ${[
              ['FA','Fatou Amadou','Best Student in Science — WASSCE 2024 · 9 A grades','🏆 Top of Nation'],
              ['MB','Modou Badjie','Mathematics Olympiad National Champion 2024','🥇 Champion'],
              ['AJ','Aisha Jallow','Best Student in Arts — WASSCE 2024, Scholarship','🎓 Scholarship'],
              ['SK','Samba Krubally','Student Council President & Leadership Award','⭐ Leadership'],
            ].map(([av,n,a,b]) => `
              <div class="hcard">
                <div class="hcard-avatar">${av}</div>
                <div>
                  <div class="hcard-name">${n}</div>
                  <div class="hcard-ach">${a}</div>
                  <div class="hcard-badge">${b}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- NEWS PREVIEW -->
  <section class="section" style="background:var(--bg)">
    <div class="container">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:2.5rem;flex-wrap:wrap;gap:1rem">
        <div class="reveal"><div class="slabel">News & Events</div><h2 class="stitle" style="margin:0">Latest from Mansa Colley</h2></div>
        <button class="btn btn-outline-g btn-sm" onclick="go('news')">All News →</button>
      </div>
      ${news.length ? `
      <div style="display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:1.5rem">
        ${news.map((n,i) => `
        <div class="news-card card-hover-lift reveal">
          <div class="nc-img${i===0?' feat':''}" style="background:linear-gradient(135deg,${['var(--g7),var(--g4)','var(--g6),var(--g3)','#7c3aed,#5b21b6'][i]})">
            <span>${n.emoji||'📰'}</span><div class="nc-tag">${n.category}</div>
          </div>
          <div class="nc-body">
            <div class="nc-date">📅 ${fmtDate(n.published_at)}</div>
            <div class="nc-title${i===0?' lg':''}">${n.title}</div>
            <div class="nc-excerpt">${n.excerpt.substring(0,100)}…</div>
            <button class="nc-more" onclick="go('news')">Read more →</button>
          </div>
        </div>`).join('')}
      </div>` : emptyHTML('📰','No news yet','Check back soon for updates.')}
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="section" style="background:var(--g0)">
    <div class="container">
      <div class="center reveal" style="margin-bottom:2.5rem">
        <div class="slabel">Testimonials</div>
        <h2 class="stitle">What Our Community Says</h2>
      </div>
      <div class="grid-3">
        ${[
          ['AB','Aminata Baldeh','Parent, Brikama',"Mansa Colley transformed my daughter's life. From nursery through senior secondary, the teachers nurtured her talents. She is now studying medicine in Dakar — a dream we never imagined possible."],
          ['PD','Prof. Peter Darboe','Education Specialist, UTG','As an education specialist, I have visited many schools across West Africa. Mansa Colley stands out for its commitment to quality and the genuine care every teacher shows for students.'],
          ['LG','Laura Gittens','NGO Partner Representative','Our organisation has partnered with Mansa Colley for three years. The transparency and impact make it one of the most effective educational partners we have supported.'],
        ].map(([av,n,r,t]) => `
          <div class="test-card reveal">
            <div class="test-stars">★★★★★</div>
            <div class="test-text">"${t}"</div>
            <div class="test-author">
              <div class="test-av">${av[0]}</div>
              <div><div class="test-name">${n}</div><div class="test-role">${r}</div></div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section style="background:var(--g7);padding:3.5rem 0">
    <div class="container" style="display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap">
      <div>
        <div style="font-family:var(--font-heading);font-size:1.6rem;font-weight:800;color:#fff;margin-bottom:6px">Ready to Join the Mansa Colley Family?</div>
        <div style="font-size:14.5px;color:rgba(255,255,255,0.65)">Admissions are open for all levels for the 2025/2026 academic year.</div>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <button class="btn btn-gold" onclick="go('admission')">Apply Now →</button>
        <button class="btn btn-outline-w" onclick="go('contact')">Contact Us</button>
      </div>
    </div>
  </section>

  ${nlStripHTML()}`;
}
