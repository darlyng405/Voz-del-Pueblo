import { state } from "./state.js";
import { route } from "./router.js";
import { board } from "./views/board.js";
import { admin, chk, save } from "./views/admin.js";

// Los templates usan manejadores inline (onclick="vl.x()"), por eso se exponen aquí.
// Pendiente: reemplazarlos por delegación de eventos.
window.vl = {
  board,
  admin,
  chk,
  save,
  select: (id) => {
    state.sel = id;
    admin();
  },
  signIn: () => {
    state.adminIn = true;
    location.hash = "#/admin";
  },
  signOut: () => {
    state.adminIn = false;
  },
};

addEventListener("hashchange", route);
route();
