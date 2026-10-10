import { ST, IMG } from "./data.js";
import { pr } from "./format.js";

// Piezas de UI reutilizables: cabecera, pie, insignia de estado y tarjeta.
export const hdr = (a) =>
  `<div class="top">${a ? "Gestión" : "Web pública"} · Prototipo</div><header class="nav"><div class="logo"><i>🌱</i><div><b>Voz Local</b><small>Villa Verde · Participación ambiental</small></div></div><nav><a href="#/">Tablero público</a> &nbsp; <a href="#/admin/login" style="font-weight:400;color:var(--mu)">Acceso gestor ↗</a></nav></header><div class="demo">Demo · Datos ficticios</div>`;
export const foot = `<footer>Voz Local · Villa Verde<br>Participación abierta. Seguimiento transparente. · Sin registro para consultar · Sin datos personales</footer>`;
export const badge = (s) => `<span class="badge s-${s}">● ${ST[s]}</span>`;
export function card(p) {
  return `<div class="pc" onclick="location.hash='#/p/${p.id}'"><img src="${IMG[p.im]}" alt=""><div class="row"><span>${p.c}</span>${badge(p.s)}</div><h3>${p.t}</h3><a>${pr(p.id)}</a><div class="row"><span>${p.a} apoyos · ${p.pl}</span></div>${p.od && p.s === "recibida" ? `<div class="row" style="color:var(--wt)">Vencida sin respuesta · ${p.lim}</div>` : ""}</div>`;
}
