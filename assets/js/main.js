const canvas = document.getElementById("canvas");
const canvasMulti = document.getElementById("canvasMulti");
const tableContent = document.getElementById("tableContent");

let ctx = canvas.getContext("2d");
let ctxMulti = canvasMulti.getContext("2d");

let xText = document.getElementById("xText");
let yText = document.getElementById("yText");

const window_height = "200";
const window_width = "300";

canvas.height = window_height;
canvas.width = window_width;
canvasMulti.height = window_height;
canvasMulti.width = window_width;

canvas.style.backgroundColor = "#ffca02";
canvasMulti.style.backgroundColor = "#ff6994";

class Circle {

  constructor(x, y, radius, color, text, backcolor, speed) {

    this.posX = x;

    this.posY = y;

    this.radius = radius;

    this.color = color;

    this.text = text;

    this.backcolor = backcolor;

    this.speed = speed;

    this.dx = 1 * this.speed;

    this.dy = 1 * this.speed;

  }

  draw(context) {

    //Rellena el objeto

    context.beginPath();

    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);

    context.fillStyle = this.backcolor;

    context.fill();

    //Dibuja la línea del objeto

    context.lineWidth = 5;

    context.strokeStyle = this.color;

    context.stroke();

    //Dibuja el texto al centro del objeto

    context.textAlign = "center";

    context.textBaseline = "middle";

    context.font = "bold 20px cursive";

    context.fillStyle = "white";

    context.fillText(this.text, this.posX, this.posY);

    context.closePath();

  }


  update(context, isMulti) {

    this.draw(context);

    //Si el circulo supera el margen derecho entonces se mueve a la izquierda

    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {

      this.dx = -this.dx;

    }

    //Si el circulo supera el margen superior entonces se mueve a abajo

    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {

      this.dy = -this.dy;

    }

    this.posX += this.dx;

    this.posY += this.dy;

    if (isMulti == false) {
      context.font = "16px Arial";
      context.fillStyle = "black";
      context.fillText('X: ' + this.posX.toFixed(2), 40, 20);
      context.fillText('Y: ' + this.posY.toFixed(2), 40, 40);
    } else {
      let row = document.getElementById(`circle-${this.text}`);
      row.cells[1].innerText = this.posX.toFixed(2);
      row.cells[2].innerText = this.posY.toFixed(2);
    }

  }

}

let randomRadius = Math.floor(Math.random() * 30 + 20);

let randomX = Math.random() * window_width;

let randomY = Math.random() * window_height;

let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";

let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";


randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;

randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, 3);

miCirculo.draw(ctx);

let updateCircle = function () {

  requestAnimationFrame(updateCircle);

  ctx.clearRect(0, 0, window_width, window_height);

  miCirculo.update(ctx, false);

};


updateCircle();

const nCircles = 4;

let circles = [];
tableContent.innerHTML = '';

for (let i = 0; i < nCircles; i++) {

  let randomRadius = Math.floor(Math.random() * 15 + 20);

  let randomX = Math.random() * window_width;

  let randomY = Math.random() * window_height;

  let randomBackcolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 1 + ")";

  let randomStrokecolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 1 + ")";

  let randomSpeed = Math.random() * 10 + 1;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;

  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;


  let miCirculoMulti = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, randomSpeed);

  circles.push(miCirculoMulti);

  let newRow = document.createElement('tr');
  newRow.setAttribute('id', `circle-${i + 1}`);
  newRow.innerHTML = `
            <td>${i + 1}</td>
            <td>${Math.floor(randomX)}</td>
            <td>${Math.floor(randomY)}</td>
        `;
  tableContent.appendChild(newRow);
}


let updateCircleMulti = function () {

  requestAnimationFrame(updateCircleMulti);

  ctxMulti.clearRect(0, 0, window_width, window_height);

  circles.forEach((circle) => {

    circle.update(ctxMulti, true);

  });

};

updateCircleMulti();


