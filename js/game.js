var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1008;
canvas.height = 544;
document.body.appendChild(canvas);
scale = 4;

// var bgReady = false;
// var bgImage = new Image;
// bgImage.onload = function () {
// 	bgReady = true;
// }
// bgImage.src = "images/experimental_bg.png";
var alerts = "";
var ammoCount = 0;
var changeRooms = false;
var nextRoom;
var changeDoor;
var doors = {};

var curRoom = room1;


var bgTiles = [];
var interactables = [];
var bullets = [];
var npcs = [];

var alreadyJump = false;
var alreadyShot = false;
var alreadyPick = false;
var leftMove = false;
var rightMove = false;
var upMove = false;
var pickUpPress = false;
var shootPress = false;
var concealPress = false;

var playerReady = false;
var playerImage = new Image;
playerImage.onload = function () {
	playerReady = true;
}
playerImage.src = "images/base_player.png";

var plyrParams = {
	x: 5*8*scale,
	y: 4*8*scale,
	xVel: 0,
	yVel: 0,
	context: canvas.getContext("2d"),
	width: 16*scale,
	height: 16*scale,
	image: playerImage,
	curDirection: "r"
};
var player = new Player(plyrParams);


bgTiles = loadRoom(room1.bg,room1.fg, player);

for(var r=0; r<curRoom.bg.length-5; r++) {
	var npcLoc = assignNPCCords();
	var npcParams = {
		x: npcLoc[0],
		y: npcLoc[1],
		xVel: 0,
		yVel: 0,
		context: canvas.getContext("2d"),
		width: 16*scale,
		height: 16*scale,
		curDirection: "r"
	};
	var npc = new Npc(npcParams);
	npcs.push(npc);
}

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	if (e.keyCode == 32) {
		alreadyJump = false;
	}
	if (e.keyCode == 87) {
		alreadyShot = false;
	}
	if (e.keyCode == 69) {
		alreadyPick = false;
	}
}, false);

var update = function (modifier) {
	if (32 in keysDown && alreadyJump == false) {
		upMove = true;
		alreadyJump = true;
	} else {
		upMove = false;
	}
	if (65 in keysDown) {
		leftMove = true;
	} else { 
		leftMove = false;
	}
	if (68 in keysDown) {
		rightMove = true;
	} else {
		rightMove = false;
	}

	if (69 in keysDown) {
		pickUpPress = true;
	} else {
		pickUpPress = false;
	}

	if (87 in keysDown && alreadyShot==false) {
		shootPress = true;
		alreadyShot = true;
	} else {
		shootPress = false;
	}

	if (83 in keysDown) {
		concealPress = true;
	} else {
		concealPress = false;
	}
	player.update(modifier);
	for (var n=0; n<npcs.length; n++) {
		npcs[n].update(modifier)
	}

	for(e=0; e<interactables.length;e++) {
		interactables[e].update(pickUpPress, player, alreadyPick);
		if (interactables[e].type == "door") {
			if (interactables[e].playerEntered == true) {
				changeRooms = true;
				changeDoor = interactables[e];
			}
		}
	}


	for (b=0;b<bullets.length;b++) {
		bullets[b].update(modifier, bgTiles, bullets);
	}

	if (changeRooms == true) {
		curRoom = nextRoom
		// I put the player in the middle of nowhere so there is no chance he enters another door.
		player.x = 320;
		player.y = 120;
		bgTiles = loadRoom(nextRoom.bg, nextRoom.fg);
		// New interactables
		for (var i=0;i<interactables.length;i++) {
			if (interactables[i].type == "door") {
				if(interactables[i].id == changeDoor.id) {
					console.log(interactables[i].x + " " + interactables[i].y)
					interactables[i].placePlayer();
				}
			}
		}
		console.log("Changing through door-" + changeDoor.id)
		nextRoom = undefined;
		changeRooms = false;
	}


}

var render = function () {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	for(h=0;h<bgTiles.length;h++) {
		for(w=0;w<bgTiles[h].length;w++) {
			bgTiles[h][w].render();
		}
	}
	for(e=0; e<interactables.length;e++) {
		interactables[e].render();
	}


	for (b=0;b<bullets.length;b++) {
		bullets[b].render();
	}


	for (var n=0; n<npcs.length; n++) {
		npcs[n].render()
	}
	player.render();




	ctx.font = "40px Geo";
	ctx.fillStyle = "rgb(218,165,32)";
	ctx.fillText(alerts,8,bgTiles[bgTiles.length-1][0].y+64);

	ctx.font = "40px Geo";
	ctx.fillStyle = "rgb(218,165,32)";
	ctx.fillText("AMMO: "+ammoCount,bgTiles[0][bgTiles[0].length-1].x-96,bgTiles[bgTiles.length-1][0].y+64);
	
}

var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
main();
