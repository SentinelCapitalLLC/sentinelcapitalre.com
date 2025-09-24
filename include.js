// include.js
// Simple client-side includes (must be served over http/https, not file://)
async function fetchPartial(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.text();
}

// Inject helper: replaces the element itself with fetched HTML
async function inject(selector, path) {
  const host = document.querySelector(selector);
  if (!host) return false;
  try {
    const html = await fetchPartial(path);
    host.outerHTML = html;
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// Support both the new (#site-header/#site-footer) and old (data-include) patterns
async function doIncludes() {
  // NEW pattern
  const didHeader = await inject("#site-header", "header.html");
  const didFooter = await inject("#site-footer", "footer.html");

  // Fallback to OLD pattern if new placeholders not present
  if (!didHeader) await inject('[data-include="header.html"]', "header.html");
  if (!didFooter) await inject('[data-include="footer.html"]', "footer.html");

  // Tell nav.js (or anything else) that the shared parts are now in the DOM
  document.dispatchEvent(new Event("includes:loaded"));
}

window.addEventListener("DOMContentLoaded", doIncludes);
