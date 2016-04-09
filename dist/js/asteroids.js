//debug
var debug = false;

//variables:
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width =  window.innerWidth - 30;
canvas.height = window.innerHeight - 30;

var background;
var running = false;

var things = []; //to hold all bullets and asteroids
var colors = ['red', 'green', 'white', 'orange', 'aqua'];

var stats = {
	dropCount: 0,
	hits: 0,
	misses: 0,
	score: 0,
	highScore: 0
};

var level = 1;

if(debug == true){
	level = Number(prompt("level:"));
}

//object for anything that moves
var thing = function (x, y, speed, angle, color, xsize, ysize, type) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.angle = angle;
	this.color = color;
	this.xsize = xsize;
	this.ysize = ysize;
	this.type = type;
};

var ship = {
	x1: 100,
	y1: canvas.height - 30,
	x2: 108,
	y2: canvas.height - 40,
	x3: 116,
	y3: canvas.height - 45,
	w1: 40,
	h1: 12,
	w2: 25,
	h2: 10,
	w3: 10,
	h3: 4,
	color: 'rgba(255,100,0,.9)',
	speed: 8,
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x1,this.y1, this.w1,this.h1);
		ctx.fillRect(this.x2,this.y2, this.w2,this.h2);
		ctx.fillRect(this.x3, this.y3, this.w3, this.h3);
	}
};

//constants:
var KEYLEFT = 37;
var KEYRIGHT = 39;
var KEYDOWN = 40;

var countDiv = document.getElementById('count');
var hitsDiv = document.getElementById('hits');
var missesDiv = document.getElementById('misses');
var scoreDiv = document.getElementById('score');

//event listeners:
	//listen for left,right, and down keys:
document.addEventListener('keydown', function(e) {
	if(running == true){
		if(e.keyCode == KEYLEFT){
			moveShip(-ship.speed);
		}
		if(e.keyCode == KEYRIGHT){
			moveShip(ship.speed);
		}
		if(e.keyCode == KEYDOWN) {
			fire();
		}
	}
});

function generateAsteroid(){
	//increase level every 10 dropped asteroids
	if (stats.dropCount % 10 == 0 && stats.dropCount != 0){
		level += 1;
		generateBackground(); // new star background for every new level
	};
	x = Math.floor(Math.random() * 100 + canvas.width / 3);
	ang = (Math.floor(Math.random() * (5 - 1 + 1)) + 1) - 2;
	xsize = Math.floor(Math.random() * (40 - 5 + 1)) + 5;
	ysize = xsize;
	thisAst = things.push(new thing(x, 0, level, ang, colors[Math.floor(Math.random() * 5)], xsize, ysize, "asteroid"));
	
	stats.dropCount += 1;
	
	draw(thisAst);
};

//move the thing object	
function move(array) {
	clear()
	checkHit();
	for(i = 0; i < array.length; i++) {
		var thing = array[i];
		thing.y += thing.speed;
		thing.x = Math.floor(thing.x + thing.angle / 3);
		draw(thing);
	};
	
	if (stats.score >= 0){
		raf = window.requestAnimationFrame(function () {
			move(array)
		});
	} else {
		gameOver();
	};
};

//draw the thing object
 function draw(thing){
		ctx.fillStyle = thing.color;
		ctx.fillRect(thing.x, thing.y, thing.xsize, thing.ysize);
};

function moveShip(x){
	ship.x1 += x;
	ship.x2 += x;
	ship.x3 += x;
	ship.draw();
};

function fire() {
    thisBull = things.push(new thing(ship.x3 + 3, ship.y3 - 7,-level * 3, 0, 'white', 3, 10, "bullet"));
	draw(thisBull);
};

function checkHit() {
	var asteroidNeeded = false; //indicates that an asteroid was destroyed somehow and a new one is needed.
	var deadThings = [];//to hold destroyed things so they can be removed
	//loop through all moving objects and check for collision:
	for(i=0;i<things.length;i++){
	//asteroid off screen due to angle, flag for removal and continue	
	    if (things[i].type == 'asteroid' && (things[i].x > canvas.width || things[i].x <= 0)) {
	        deadThings.push(i);
	        asteroidNeeded = true;
	    };

    //asteroid hits spaceship:
		if (things[i].type == "asteroid"
			&& things[i].x <= ship.x1 + ship.w1
			&& things[i].x >= ship.x1 - ship.w1
			&& things[i].y <= ship.y1 + ship.h1
			&& things[i].y >= ship.y1 - ship.h1) {
		    stats.score -= 100;
		    deadThings.push(i);
		    asteroidNeeded = true;
		    explode(things[i]);
		};

    //asteroid hits ground detection:
		if (things[i].type == 'asteroid' && things[i].y >= canvas.height - 10) {
		    stats.misses += 1;
		    stats.score -= 5;
		    deadThings.push(i);
		    asteroidNeeded = true;
			explode(things[i]);
			};

	//bullet leaves top of screen
	if(things[i].type == "bullet" && things[i].y < 0) {
			deadThings.push(i);//flag for removal, no need to generate an asteroid as the bullet just left the screen
		};

	//bullet hits asteroid
		if(things[i].type == "bullet") {	
		    for(j=0;j<things.length;j++){
				    if(things[j].type == "asteroid" 
					    && things[i].x >= things[j].x 
					    && things[i].x <= things[j].x + things[j].xsize 
					    && things[i].y >= things[j].y 
					    && things[i].y <= things[j].y + things[j].ysize) {
						
						    deadThings.push(j);
							deadThings.push(i);
						    stats.hits += 1;
						    stats.score += 10;
						    asteroidNeeded = true;
						    explode(things[j]);
                        }
			    }
		}
	}; //end of for loop

	deadThings.sort(compareNumbers);
	things.sort(compareNumbers);
	
	//remove dead things
	for (i = deadThings.length - 1; i >= 0; i--) {
			things.splice(deadThings[i], 1);
	};

	//clean up the deadthings
	for (i = deadThings.length - 1; i >= 0; i--) {
		deadThings.splice(i,1);
	}

	
	if(asteroidNeeded == true){
		generateAsteroid();	
	}
	updateStats();
};

function explode(thing) {
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.arc(thing.x + thing.xsize / 2, thing.y + thing.ysize / 2, thing.xsize * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function compareNumbers(a, b) {
  return a - b;
}

function init() {
	running = true;
	generateBackground();
	updateStats();
	ship.draw();
	generateAsteroid();			
	move(things);
};

function gameOver() {
	running = false;
	clear();
	ctx.fillStyle= "red";
	ctx.font = "48px serif";
	ctx.textAlign = "center";
	ctx.fillText("Game Over! high score: " + stats.highScore, canvas.width / 2, canvas.height / 3);
	raf = window.cancelAnimationFrame(move);
};

//clear the screen of previous drawings so moved objects can be drawn:
function clear() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.putImageData(background, 0,0);
	ship.draw();
};

function generateBackground() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.shadowColor = 'white';

	
	
	for(i=0;i<100;i++){
		ctx.beginPath();
		ctx.fillStyle = 'rgba(255,255,255,.7)';
			ctx.shadowBlur = 7;
		randx = Math.random() * canvas.width;
		randy = Math.random() * canvas.height;
		ctx.arc(randx,randy,1,0,Math.PI*2);
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = 'rgba(255,255,255,.8)';
			ctx.shadowBlur = 10;
		randx = Math.random() * canvas.width;
		randy = Math.random() * canvas.height;
		ctx.arc(randx,randy,2,0,Math.PI*2);
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = 'rgba(255,255,255,.9)';
			ctx.shadowBlur = 12;
		randx = Math.random() * canvas.width;
		randy = Math.random() * canvas.height;
		ctx.arc(randx,randy,3,0,Math.PI*2);
		ctx.fill();

	}

	background = ctx.getImageData(0,0,canvas.width,canvas.height);
	ctx.shadowBlur = 0;
}

function updateStats(){
	if (stats.score > stats.highScore)
	{
		stats.highScore = stats.score;
	};
	if (stats.score >= 0)
	{
		countDiv.innerHTML = "count: " + stats.dropCount;
		hitsDiv.innerHTML = "hits: " + stats.hits;
		missesDiv.innerHTML = "misses: " + stats.misses;
		scoreDiv.innerHTML = "score: " + stats.score;
	};
};

//begin play on page load:
init();

/*
to do:

fix angle to increase ground hits

add levels:
	text that shows current level
	more small and fast things
	advanced paths

	nnumber of ship hits - start at 3 - extra life at 1000
	
sound effects
explosions

*/