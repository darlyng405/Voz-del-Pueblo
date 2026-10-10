import { board } from "./views/board.js";
import { ficha } from "./views/ficha.js";
import { login } from "./views/login.js";
import { admin } from "./views/admin.js";

// Enrutador por hash.
export function route() {
  const h = location.hash.slice(1) || "/";
  scrollTo(0, 0);
  if (h.startsWith("/p/")) ficha(h.split("/")[2]);
  else if (h === "/admin/login") login();
  else if (h === "/admin") admin();
  else board();
}
