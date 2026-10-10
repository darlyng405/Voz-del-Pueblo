import { P } from "./data.js";
import { state } from "./state.js";

// Indicadores del tablero público.
export function stats() {
  const od = P.filter((p) => p.od && p.s === "recibida").length,
    fr = 30 + state.late;
  return { od, fr, pct: Math.round((26 / 40) * 100), late: 4 + state.late };
}
