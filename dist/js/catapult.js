var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;
var running = false;
var loaded = true;
var cleared = false;
var score = 0;

var winWidth =  window.innerWidth;
var winHeigth = window.innerHeight;
canvas.height = winHeigth - 30;
canvas.width = winWidth - 30;

var startX = winWidth * .70;
var startY = winHeigth * .55;

var box = {
	x: canvas.width - (canvas.width * .05),
	y: canvas.height - (canvas.height * .10),
	drawBox: function() {
		ctx.fillStyle = "black";
		ctx.fillRect(this.x, this.y , canvas.width / 10, canvas.height);
	}
	
};

function buildWalls() {
	//left wall
	ctx.fillStyle = "gray";
	ctx.fillRect(0, 0, 10, winHeigth);

	//bottom - grass
	ctx.fillStyle = "green";
	ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
	
	box.drawBox();
	
	//catapult
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.moveTo(startX,startY);
	ctx.lineTo(startX, canvas.height);
	ctx.stroke();
};

var ball = {
  x: startX,
  y: startY,
  vx: 5,
  vy: 1,
  radius: winHeigth / 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

function clear() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  buildWalls();
  cleared = true;
}

function draw() {
	if (running){
		clear();
		ball.draw();
		buildWalls();
		ball.x -= ball.vx;
		ball.y -= ball.vy;
		ball.vy *= .99;
		ball.vy -= .25;
	  
		if (ball.y + ball.vy > canvas.height - 10) {
			score -= 1;
			stop();
		}
		
		if (ball.x + ball.vx < 5) {
			score += 1;
			stop();
		}
	
		raf = window.requestAnimationFrame(draw);
		cleared = false;
	}
}

canvas.addEventListener('mousedown', function(e){
	
	var downx = e.clientX;
	var downy = e.clientY;
	
	canvas.addEventListener('mousemove', function(e) {	
	  if (!running && loaded) {
		clear();
		ball.x = e.clientX;
		ball.y = e.clientY;
		
		ctx.fillStype = "black";
		ctx.beginPath();
		ctx.moveTo(startX,startY);
		ctx.lineTo(ball.x, ball.y);
		ctx.stroke();
		
		ball.vx =  (e.clientX - downx) * .10;
		ball.vy =  (e.clientY - downy) * .10;		
		
		ball.draw();
		buildWalls();
	  }
	});	
});

canvas.addEventListener("click",function(e){
	if (!running && loaded && cleared) {
		raf = window.requestAnimationFrame(draw);
		running = true;
		cleared = false;
	}
  
  // if (!loaded && !running) {
	// clear();
	// //ball.x = startX;
	// //ball.y = startY;
	// //ball.draw();
	// //buildWalls();
	// //loaded = true;
  // }  
});

canvas.addEventListener("click", function(e) {
	if (!running && loaded && !cleared){
		var x = event.pageX;
		var y = event.pageY;
		if(x > 100 && y > 100) {
			
			ball.draw();
		}
	}
	
	if(!running && !loaded && !cleared){
		clear();
		loaded = true;
	}
});

function stop(){
  window.cancelAnimationFrame(raf);
  running = false;
  loaded = false;
};

ball.draw();
buildWalls();
