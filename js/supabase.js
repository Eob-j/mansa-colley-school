/* ============================================================
   SUPABASE.JS — Client Initialization
   ============================================================ */

const SUPABASE_URL  = 'https://lfmjuyzayaspsvclpnwt.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbWp1eXpheWFzcHN2Y2xwbnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NTc2NTUsImV4cCI6MjA5NTUzMzY1NX0.jdITwU-Ap5hJDh3ymM9EFIIpSGY96v-lXarVIFeNB-c';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON);

/* ---- Convenience query helpers ---- */

async function dbGet(table, options = {}) {
  let q = sb.from(table).select(options.select || '*');
  if (options.eq)     Object.entries(options.eq).forEach(([k,v]) => { q = q.eq(k,v); });
  if (options.order)  q = q.order(options.order, { ascending: options.asc ?? false });
  if (options.limit)  q = q.limit(options.limit);
  if (options.single) q = q.single();
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

async function dbInsert(table, payload) {
  const { data, error } = await sb.from(table).insert(payload).select().single();
  if (error) throw error;
  return data;
}

async function dbUpdate(table, id, payload) {
  const { data, error } = await sb.from(table).update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

async function dbDelete(table, id) {
  const { error } = await sb.from(table).delete().eq('id', id);
  if (error) throw error;
  return true;
}

/* ---- Storage helpers ---- */

async function uploadFile(bucket, path, file) {
  const { data, error } = await sb.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data: { publicUrl } } = sb.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

function getPublicUrl(bucket, path) {
  const { data: { publicUrl } } = sb.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}
