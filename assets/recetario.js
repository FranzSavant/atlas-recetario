// recetario.js — dos cosas: el contador de porciones de la ficha y el filtro del índice.
// Sin dependencias. Los datos vienen embebidos en la página (script#datos).

(function () {
  "use strict";

  // ---- números: 1.5 -> 1½, 0.75 -> ¾, 2.4 -> 2.4
  var FRACCIONES = [[0, ""], [0.25, "¼"], [1 / 3, "⅓"], [0.5, "½"], [2 / 3, "⅔"], [0.75, "¾"]];

  function formatear(v) {
    if (v === null || v === undefined || isNaN(v)) return "";
    if (v === 0) return "0";
    var entero = Math.floor(v + 1e-9);
    var resto = v - entero;
    var mejor = FRACCIONES[0], dist = 1;
    for (var i = 0; i < FRACCIONES.length; i++) {
      var d = Math.abs(resto - FRACCIONES[i][0]);
      if (d < dist) { dist = d; mejor = FRACCIONES[i]; }
    }
    if (dist > 0.06) return String(Math.round(v * 100) / 100);   // sin fracción clara
    if (entero === 0) return mejor[1] || "0";
    return mejor[1] ? entero + mejor[1] : String(entero);
  }

  // ---- contador de porciones
  var datos = document.getElementById("datos");
  var N = document.getElementById("n");
  if (datos && N) {
    var cfg;
    try { cfg = JSON.parse(datos.textContent); } catch (e) { cfg = null; }
    if (cfg && cfg.ingredientes) {
      var base = cfg.base || 4;
      var porGrupo = {};
      cfg.ingredientes.forEach(function (i) {
        (porGrupo[i.grupo] = porGrupo[i.grupo] || []).push(i);
      });

      var celdas = document.querySelectorAll(".lista-ing .cant");
      var actual = base;
      var MIN = 1, MAX = 24;

      function pintar() {
        var factor = actual / base;
        celdas.forEach(function (celda, idx) {
          var ing = cfg.ingredientes[idx];
          if (!ing) return;
          if (ing.cantidad === null || ing.cantidad === undefined) {
            celda.textContent = "";
            return;
          }
          celda.textContent = formatear(ing.cantidad * factor);
        });
        N.textContent = actual;
        menos.disabled = actual <= MIN;
        mas.disabled = actual >= MAX;
      }

      function mover(delta) {
        var nuevo = Math.min(MAX, Math.max(MIN, actual + delta));
        if (nuevo === actual) return;
        actual = nuevo;
        celdas.forEach(function (c) {
          c.classList.add("cambia");
          setTimeout(function () { c.classList.remove("cambia"); }, 140);
        });
        pintar();
      }

      var menos = document.getElementById("menos");
      var mas = document.getElementById("mas");
      if (menos) menos.addEventListener("click", function () { mover(-1); });
      if (mas) mas.addEventListener("click", function () { mover(1); });
      pintar();
    }
  }

  // ---- filtro del índice (por nombre y por ingrediente)
  var buscador = document.getElementById("buscar");
  if (buscador) {
    var filas = Array.prototype.slice.call(document.querySelectorAll(".indice .fila"));
    var vacio = document.getElementById("sin-resultados");
    var filtrar = function () {
      var q = buscador.value.trim().toLowerCase();
      var visibles = 0;
      filas.forEach(function (fila) {
        var coincide = !q || (fila.getAttribute("data-busca") || "").indexOf(q) !== -1;
        fila.hidden = !coincide;
        if (coincide) visibles++;
      });
      if (vacio) vacio.hidden = visibles !== 0;
    };
    buscador.addEventListener("input", filtrar);
  }
})();
