import { P, ST, IMG } from "../data.js";
import { app } from "../dom.js";
import { pr } from "../format.js";
import { hdr, foot, badge } from "../components.js";

// Vista: ficha pública de una propuesta (#/p/:id).
export function ficha(id) {
  const p = P.find((x) => x.id == id);
  if (!p) return (location.hash = "#/");
  const fr = p.h.find((h) => h[0] !== "recibida");
  app.innerHTML =
    hdr() +
    `<main><a href="#/">← Tablero público / ${pr(p.id)}</a><div style="margin-top:16px">${badge(p.s)}</div><h1>${p.t}</h1><div style="color:var(--mu)">${p.c} · ${p.pl} · ${p.a} apoyos registrados en la app</div><div class="two" style="margin-top:20px"><div><img src="${IMG[p.im]}" alt=""><h3>La propuesta</h3><p>${p.d}</p><div class="box"><b>Ubicación</b><br>${p.pl}<br>${p.ad}</div>${fr ? `<div class="box" style="background:var(--soft)"><h3 style="margin:0 0 6px">Respuesta oficial</h3>${fr[2]}<br><small style="color:var(--mu)">Publicada el ${fr[1].replace(" UTC", "")} UTC</small></div>` : ""}<div class="box"><b>Enlace compartible</b><br><a>vozlocal.example/p/${pr(p.id)}</a><br><br><button class="btn out" onclick="navigator.clipboard&&navigator.clipboard.writeText('vozlocal.example/p/${pr(p.id)}');this.textContent='¡Copiado!'">Copiar enlace</button></div></div>
<div><div class="box" style="margin-top:0"><h3 style="margin:0 0 6px">Plazo y primera respuesta</h3>Creada: ${p.cr}<br>Fecha límite: ${p.lim}<br>Primera respuesta: ${fr ? fr[1].split(" ·")[0] : "Sin respuesta"}<br>${fr ? "Respondida en plazo" : `<b style="color:var(--wt)">Vencida sin respuesta</b>`}</div><h2 style="font-size:22px">Historial inmutable</h2><small style="color:var(--mu)">Fechas en UTC. Cada evento tiene nota y no se edita ni se borra.</small><div class="tl" style="margin-top:14px">${p.h.map((h) => `<div><b>${ST[h[0]]}</b><br><small>${h[1]}</small><br>${h[2]}</div>`).join("")}</div><div class="note"><b style="color:var(--g)">Información pública, sin datos personales</b><br>Esta ficha no muestra nombres, correo ni edad. Para apoyar una propuesta, utiliza la app; aquí solo puedes consultar.</div></div></div></main>` +
    foot;
}
