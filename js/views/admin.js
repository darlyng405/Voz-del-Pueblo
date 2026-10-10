import { P, ST, NEXT, IMG } from "../data.js";
import { $, app } from "../dom.js";
import { state } from "../state.js";
import { pr } from "../format.js";
import { hdr, foot, badge } from "../components.js";

// Vista: panel del gestor (#/admin) y registro de cambios de estado.
export function admin() {
  if (!state.adminIn) return (location.hash = "#/admin/login");
  const p = P.find((x) => x.id == state.sel),
    o = NEXT[p.s],
    q = ($("#aq") || {}).value || "";
  const L = P.filter((x) => pr(x.id).toLowerCase().includes(q.toLowerCase()));
  app.innerHTML =
    hdr(1) +
    `<div class="adm"><div class="side"><a>Resumen</a><a class="on">Propuestas</a><a>Mapa</a><a>Consultas</a><a>Métricas</a><a>Reportes</a><hr><small>Elena Ruiz<br><b>Gestora ambiental</b></small><br><a href="#/admin/login" onclick="vl.signOut()">Cerrar sesión</a></div><div style="padding:28px"><h1 style="font-size:32px">Propuestas</h1><div class="bar"><input class="f" id="aq" placeholder="Buscar por protocolo" value="${q}" oninput="vl.admin()"></div><div class="panel"><div><table><thead><tr><th>Protocolo</th><th>Propuesta</th><th>Estado</th><th>Límite</th></tr></thead><tbody>${L.map((x) => `<tr class="${x.od && x.s === "recibida" ? "od" : ""} ${x.id == state.sel ? "sel" : ""}" onclick="vl.select(${x.id})"><td><a>${pr(x.id)}</a></td><td>${x.t}</td><td>${ST[x.s]}</td><td>${x.lim}${x.od && x.s === "recibida" ? `<br><small style="color:var(--rd)">Vencida sin respuesta</small>` : ""}</td></tr>`).join("")}</tbody></table></div>
<div class="box" style="margin:0"><a>${pr(p.id)}</a><img src="${IMG[p.im]}" style="width:100%;border-radius:10px;margin:10px 0" alt=""><h3 style="margin:0">${p.t}</h3>${badge(p.s)}<p>${p.c} · ${p.a} apoyos<br>${p.d}</p><b>Historial de solo adición</b>${p.h.map((h) => `<p style="margin:8px 0;font-size:14px">${h[1]} · ${ST[h[0]]}<br>Nota: ${h[2]}</p>`).join("")}<h3>Registrar cambio</h3>${o.length ? `<small>Desde ${ST[p.s]} solo puedes elegir:</small>${o.map((k, i) => `<label class="opt" ${k === "rechazada" ? 'style="background:#fbe3e1"' : ""}><input type="radio" name="n" value="${k}" ${i ? "" : "checked"} onchange="vl.chk()"> ${ST[k]}</label>`).join("")}<b>Nota oficial · obligatoria al rechazar</b><br><textarea id="nt" rows="3" style="width:100%" placeholder="Escribe el motivo..." oninput="vl.chk()"></textarea><div id="er" class="err"></div><br><button class="btn" id="sv" onclick="vl.save()">Registrar cambio</button>` : `<small>Estado final: no admite más cambios.</small>`}</div></div></div></div>`;
  if (o.length) chk();
}
export function chk() {
  const r = document.querySelector("input[name=n]:checked"),
    n = $("#nt").value.trim(),
    bad = r && r.value === "rechazada" && !n;
  $("#sv").disabled = bad;
  $("#er").textContent = bad
    ? "Indica el motivo del rechazo. No se puede guardar hasta indicarlo."
    : "";
}
export function save() {
  const p = P.find((x) => x.id == state.sel),
    k = document.querySelector("input[name=n]:checked").value,
    n = $("#nt").value.trim() || "Cambio registrado por la gestión.";
  const first = p.s === "recibida";
  p.h.push([
    k,
    new Date().toISOString().slice(0, 16).replace("T", " · ") + " UTC",
    n,
  ]);
  p.s = k;
  if (first && p.od) state.late++;
  admin();
}
