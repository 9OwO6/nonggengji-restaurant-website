/**
 * Legacy entrypoint: configure Supabase via environment variables only.
 * Run: node scripts/create-admin-standalone.js (same env requirements).
 */
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then use scripts/create-admin-standalone.js",
  );
  process.exit(1);
}

console.log("Use: node scripts/create-admin-standalone.js (credentials from env).");
process.exit(0);
