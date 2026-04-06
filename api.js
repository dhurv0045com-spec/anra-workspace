// ALL backend communication goes through this file.
// Never import fetch or call URLs from any component directly.

const BASE = "/api";

/**
 * GET /api/health
 * Returns { status, service, phase }
 */
export async function healthCheck() {
  const res = await fetch(`${BASE}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
  return res.json();
}
