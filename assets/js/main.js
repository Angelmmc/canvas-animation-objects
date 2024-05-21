//Creacion de elementos img de html
let sun = new Image();
let moon = new Image();
let earth = new Image();
let panoramic = new Image();

const ctx = document.getElementById("canvasSolarSystem").getContext("2d");

function init() {
    sun.src = "./assets/img/canvas_sun.png"; sun.height = 100;
    moon.src = "./assets/img/canvas_moon.png";
    earth.src = "./assets/img/canvas_earth.png";
    window.requestAnimationFrame(draw);
    window.requestAnimationFrame(clock);
    drawPanoramic();
}

function draw() {

    //Especifica que cada imagen se sibuja encima de la siguiente
    ctx.globalCompositeOperation = "destination-over";
    //Limpia el canvas completo
    ctx.clearRect(0, 0, 300, 300); // clear canvas

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
    //Guarda el estado del dibujo
    ctx.save();
    ctx.translate(150, 150);

    // Earth
    let time = new Date();
    ctx.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds(),
    );
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 40, 24); // Shadow
    ctx.drawImage(earth, -12, -12);

    // Moon
    ctx.save();
    ctx.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
        ((2 * Math.PI) / 6000) * time.getMilliseconds(),
    );
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);

    window.requestAnimationFrame(draw);
}

function clock() {
    const now = new Date();
    const canvasClock = document.getElementById("canvasClock");
    const ctx = canvasClock.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, 300, 300);
    ctx.translate(150, 150);
    ctx.scale(0.4, 0.4);
    ctx.rotate(-Math.PI / 2);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    // Marcas de hora
    ctx.save();
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    ctx.restore();

    // Marcas de minuto
    ctx.save();
    ctx.lineWidth = 5;
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
            ctx.beginPath();
            ctx.moveTo(117, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    const sec = now.getSeconds();
    // To display a clock with a sweeping second hand, use:
    // const sec = now.getSeconds() + now.getMilliseconds() / 1000;
    const min = now.getMinutes();
    const hr = now.getHours() % 12;

    ctx.fillStyle = "black";

    // Write image description
    canvasClock.innerText = `The time is: ${hr}:${min}`;

    // Write Hours
    ctx.save();
    ctx.rotate(
        (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec,
    );
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // Write Minutes
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();

    // Write seconds
    ctx.save();
    ctx.rotate((sec * Math.PI) / 30);
    ctx.strokeStyle = "#D40000";
    ctx.fillStyle = "#D40000";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(83, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fillStyle = "rgb(0 0 0 / 0%)";
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#325FA2";
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.restore();

    window.requestAnimationFrame(clock);
}


// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.
panoramic.src = "./assets/img/panoramic.jpg";
const canvasXSize = 300;
const canvasYSize = 300;
const speed = 25; // lower is faster
const scale = 0.09;
const y = -4.5; // vertical offset

// Main program
const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctxPanoram;

panoramic.onload = () => {
    imgW = panoramic.width * scale;
    imgH = panoramic.height * scale;
  
    if (imgW > canvasXSize) {
      // Image larger than canvas
      x = canvasXSize - imgW;
    }
  
    // Check if image dimension is larger than canvas
    clearX = Math.max(imgW, canvasXSize);
    clearY = Math.max(imgH, canvasYSize);
  
    // Get canvas context
    ctxPanoram = document.getElementById("canvasPanoramic").getContext("2d");
  
    // Set refresh rate
    return setInterval(drawPanoramic, speed);
  };

function drawPanoramic() {
    ctxPanoram.clearRect(0, 0, clearX, clearY); // clear the canvas

  // If image is <= canvas size
  if (imgW <= canvasXSize) {
    // Reset, start from beginning
    if (x > canvasXSize) {
      x = -imgW + x;
    }

    // Draw additional image1
    if (x > 0) {
        ctxPanoram.drawImage(panoramic, -imgW + x, y, imgW, imgH);
    }

    // Draw additional image2
    if (x - imgW > 0) {
        ctxPanoram.drawImage(panoramic, -imgW * 2 + x, y, imgW, imgH);
    }
  } else {
    // Image is > canvas size
    // Reset, start from beginning
    if (x > canvasXSize) {
      x = canvasXSize - imgW;
    }

    // Draw additional image
    if (x > canvasXSize - imgW) {
        ctxPanoram.drawImage(panoramic, x - imgW + 1, y, imgW, imgH);
    }
  }

  // Draw image
  ctxPanoram.drawImage(panoramic, x, y, imgW, imgH);

  // Amount to move
  x += dx;
}

init();
