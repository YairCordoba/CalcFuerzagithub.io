const k = 8.99e9;  // Constante de Coulomb

function calcularFuerza() {
  let q1 = parseFloat(document.getElementById("q1").value);
  let q2 = parseFloat(document.getElementById("q2").value);
  let r = parseFloat(document.getElementById("r").value);
  let direccion = document.getElementById("direccion").value;

  if (isNaN(q1) || isNaN(q2) || isNaN(r) || r <= 0) {
    alert("Por favor, ingrese valores válidos para las cargas y la distancia.");
    return;
  }

  let fuerza = (k * Math.abs(q1 * q2)) / (r * r);
  let tipoFuerza = (q1 * q2 > 0) ? "Repulsiva" : "Atractiva";
  let cargaActuante = direccion === "q1" ? "Carga 1 (q1)" : "Carga 2 (q2)";
  let cargaAfectada = direccion === "q1" ? "Carga 2 (q2)" : "Carga 1 (q1)";
  let razon = (tipoFuerza === "Atractiva") ? 
              "porque tienen signos opuestos." : 
              "porque tienen el mismo signo.";

  document.getElementById("resultado").innerHTML = `
    <h2>Resultados:</h2>
    <p>La magnitud de la fuerza es: <strong>${fuerza.toFixed(2)} N</strong></p>
    <p>La fuerza es: <strong>${tipoFuerza}</strong></p>
    <p>${cargaActuante} le hace fuerza a ${cargaAfectada}. ${razon}</p>
  `;

  dibujarGrafico(q1, q2, tipoFuerza, direccion);
}

function dibujarGrafico(q1, q2, tipoFuerza, direccion) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const escala = 100;
  const q1Pos = { x: 100, y: canvas.height / 2 };
  const q2Pos = { x: 50 + (1.50 * escala), y: canvas.height / 2 };

  function drawCharge(chargePos, color, carga) {
    ctx.beginPath();
    ctx.arc(chargePos.x, chargePos.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText(`q = ${carga} C`, chargePos.x - 15, chargePos.y - 15);
  }

  function drawForceVector(start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
    const headlen = 20;
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    ctx.beginPath();
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(end.x - headlen * Math.cos(angle - Math.PI / 6), end.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(end.x - headlen * Math.cos(angle + Math.PI / 6), end.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }

  function draw() {
    drawCharge(q1Pos, "blue", q1);
    drawCharge(q2Pos, "green", q2);
    
    if (direccion === "q1") {
      tipoFuerza === "Atractiva" ? drawForceVector(q2Pos, q1Pos) : drawForceVector(q1Pos, { x: q1Pos.x - (q2Pos.x - q1Pos.x), y: q1Pos.y });
    } else {
      tipoFuerza === "Atractiva" ? drawForceVector(q1Pos, q2Pos) : drawForceVector(q2Pos, { x: q2Pos.x + (q2Pos.x - q1Pos.x), y: q2Pos.y });
    }
  }

  draw();
}
