# Voz Local · prototipo de alta fidelidad

Prototipo sin backend ni build. Usa módulos ES, así que se sirve por HTTP (no abre con doble clic):

    python3 -m http.server 8080     # o: npx serve

Abrir http://localhost:8080

## Estructura

    index.html          esqueleto (solo carga css y js/main.js)
    css/styles.css      tokens de diseño en :root + estilos
    assets/img/         fotos de ejemplo
    js/data.js          datos ficticios, estados, colores y transiciones permitidas
    js/state.js         estado en memoria (propuesta seleccionada, sesión)
    js/format.js        número de protocolo
    js/stats.js         indicadores del tablero
    js/components.js    cabecera, pie, insignia y tarjeta
    js/views/           una vista por pantalla: board, ficha, login, admin
    js/router.js        enrutador por hash
    js/main.js          arranque

## Pendiente conocido
Los templates siguen siendo cadenas HTML largas con manejadores inline (`vl.*`).
