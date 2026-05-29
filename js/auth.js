/* ============================================================
   AUTH.JS — Login, Logout, Session
   ============================================================ */

/* ---- Sign In ---- */
async function doLogin() {
  const email = v('_lemail');
  const pwd   = v('_lpwd');
  if (!email || !pwd) { toast('Please enter email and password', 'error'); return; }

  const btn = document.getElementById('_loginBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Signing in…'; }

  try {
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pwd });
    if (error) throw error;

    // Fetch profile
    const profile = await dbGet('profiles', { eq: { id: data.user.id }, single: true });
    state.user    = data.user;
    state.profile = profile;

    toast(`Welcome back, ${profile.full_name.split(' ')[0]}! 👋`);
    go(profile.role === 'admin' ? 'admin' : 'portal');
  } catch (err) {
    toast(err.message || 'Invalid email or password', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Sign In →'; }
  }
}

/* ---- Sign Out ---- */
async function logout() {
  await sb.auth.signOut();
  state.user    = null;
  state.profile = null;
  toast('Signed out successfully.');
  go('home');
}

/* ---- Restore Session on page load ---- */
async function restoreSession() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    try {
      const profile = await dbGet('profiles', { eq: { id: session.user.id }, single: true });
      state.user    = session.user;
      state.profile = profile;
    } catch {
      state.user    = null;
      state.profile = null;
    }
  }
}

/* ---- Guard: require login ---- */
function requireAuth(role = null) {
  if (!state.user || !state.profile) { go('login'); return false; }
  if (role && state.profile.role !== role) { go('home'); return false; }
  return true;
}

/* ---- Admin: create a new user account ---- */
async function adminCreateUser(email, password, fullName, role, extraData = {}) {
  // Create auth user via Supabase Admin API (requires service role – do via SQL function)
  // For now we use sign up and then set profile
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw error;

  // Insert profile
  const { error: profileError } = await sb.from('profiles').insert({
    id:        data.user.id,
    full_name: fullName,
    role,
    ...extraData,
  });
  if (profileError) throw profileError;
  return data.user;
}
