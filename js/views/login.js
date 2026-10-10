import { app } from "../dom.js";
import { hdr, foot } from "../components.js";

// Vista: acceso del gestor (#/admin/login).
export function login() {
  app.innerHTML =
    hdr(1) +
    `<div class="login"><div class="l"><b>Voz Local / Villa Verde</b><h1 style="font-weight:400;font-size:46px;margin-top:40px">Escuchar. Responder.<br>Dejar huella.</h1><p>Un espacio de gestión para acompañar cada propuesta ambiental con una respuesta y un historial verificable.</p><p style="margin-top:40px"><b>Número único</b> &nbsp;·&nbsp; <b>15 días</b> &nbsp;·&nbsp; <b>Historial</b></p></div><div class="r"><h2 style="margin-top:0">Acceso del gestor</h2><p style="color:var(--mu)">Gestiona propuestas y consultas del municipio. Acceso exclusivo para personal autorizado.</p><label>Correo institucional</label><input value="elena@villaverde.example"><label>Contraseña</label><input type="password" value="demo-demo-12"><br><br><button class="btn" onclick="vl.signIn()">Entrar al panel</button><div class="note" style="margin-top:18px"><b style="color:var(--g)">Acceso institucional</b><br>Las cuentas de gestor se habilitan internamente. No hay registro público.</div><p><a href="#/">← Ir al tablero público</a></p></div></div>` +
    foot;
}
