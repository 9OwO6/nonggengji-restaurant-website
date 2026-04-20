/**
 * Removes Next.js output and local webpack cache to fix stale chunk errors (e.g. Cannot find module './447.js').
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function rm(p) {
  try {
    fs.rmSync(p, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}

const nextDir = path.join(root, ".next");
if (rm(nextDir)) {
  console.log("[clean-next] removed .next");
} else {
  console.log("[clean-next] .next not found or already clean");
}

const webpackCache = path.join(root, "node_modules", ".cache");
if (fs.existsSync(webpackCache)) {
  rm(webpackCache);
  console.log("[clean-next] removed node_modules/.cache");
}
