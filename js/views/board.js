import { P, ST, COL, LET } from "../data.js";
import { $, app } from "../dom.js";
import { pr } from "../format.js";
import { hdr, foot, card } from "../components.js";
import { stats } from "../stats.js";

// Vista: tablero público (#/).
export function board() {
  const S = stats(),
    q = ($("#q") || {}).value || "",
    e = ($("#e") || {}).value || "";
  const L = P.filter(
    (p) =>
      pr(p.id).toLowerCase().includes(q.toLowerCase()) && (!e || p.s === e),
  );
  app.innerHTML =
    hdr() +
    `<main><div class="hero"><div><div class="eyebrow">VILLA VERDE · TABLERO PÚBLICO</div><h1>Cada propuesta,<br>un camino visible.</h1><p style="color:var(--mu)">Consulta qué se propuso, qué respuesta recibió y cuándo. Sin iniciar sesión y sin datos personales.</p></div><div class="note"><h3 style="margin:0 0 8px">Número + plazo + historial</h3>La primera respuesta tiene un plazo de 15 días. Cada evento queda fechado y no se puede editar ni borrar.</div></div>
<div class="grid4"><div class="stat"><b>40</b>Propuestas registradas<br><small>Instantánea al 9 oct 2026</small></div><div class="stat on"><b>${S.pct}%</b>Respondidas en plazo<br><small>26 de 40 propuestas · plazo de 15 días</small></div><div class="stat"><b>${S.fr}</b>Primera respuesta<br><small>26 en plazo · ${S.late} fuera de plazo</small></div><div class="stat"><b>${S.od}</b>Vencidas sin respuesta<br><small>Siguen en Recibida</small></div></div>
${
  S.od
    ? `<div class="warn"><b>${S.od} vencidas sin respuesta</b><p style="margin:6px 0">Siguen Recibida y su fecha límite ya pasó. Vencimiento no es un estado.</p>${P.filter(
        (p) => p.od && p.s === "recibida",
      )
        .map(
          (p) =>
            `<div class="r"><b>${p.t}</b><a href="#/p/${p.id}">${pr(p.id)}</a><span style="color:var(--wt)">Límite: ${p.lim}</span></div>`,
        )
        .join("")}</div>`
    : ""
}
<h2>El territorio, por estado</h2><div class="map"><i style="left:0;top:22%;width:100%;height:10px;transform:rotate(-4deg)"></i><i style="left:0;top:70%;width:100%;height:10px;transform:rotate(-6deg)"></i><i style="left:30%;top:0;width:10px;height:100%;transform:rotate(6deg)"></i><i style="left:62%;top:0;width:10px;height:100%;transform:rotate(8deg)"></i><div class="pk"></div>${P.map((p) => `<div class="pin" title="${p.t}" onclick="location.hash='#/p/${p.id}'" style="left:${p.x}%;top:${p.y}%;background:${COL[p.s]}">${LET[p.s]}</div>`).join("")}</div>
<div class="legend">${Object.keys(ST)
      .map(
        (k) =>
          `<span><b style="color:${COL[k]}">●</b> ${LET[k]} · ${ST[k]}</span>`,
      )
      .join("")}</div>
<h2>Propuestas del municipio</h2><div class="bar"><input class="f" id="q" placeholder="Buscar por protocolo. Ej. VL-2026-000023" value="${q}" oninput="vl.board()"><select id="e" onchange="vl.board()"><option value="">Estado</option>${Object.keys(
      ST,
    )
      .map(
        (k) =>
          `<option value="${k}" ${e === k ? "selected" : ""}>${ST[k]}</option>`,
      )
      .join(
        "",
      )}</select></div><small style="color:var(--mu)">${L.length} propuestas mostradas · Sin información personal</small><div class="cards">${L.map(card).join("")}</div></main>` +
    foot;
  const i = $("#q");
  if (i && q) {
    i.focus();
    i.setSelectionRange(q.length, q.length);
  }
}
