class Door extends Entity{
	constructor(options) {
		super(options)
		this.type = "door";
		this.status = false;
		this.closeCord = this.frameCord;	
		this.playerEntered = false;
		this.id = options.id;
		this.rooms = []

	}
	
	update(interact, plyr) {
		
		if (this.status == false) {
			bgTiles[this.y/8/scale][this.x/8/scale].isSolid = true;
			bgTiles[(this.y/8/scale)+1][this.x/8/scale].isSolid = true;
		} else {
			bgTiles[this.y/8/scale][this.x/8/scale].isSolid = false;
			bgTiles[(this.y/8/scale)+1][this.x/8/scale].isSolid = false;
		}
		if (interact == true && alreadyPick == false && (this.nearWall(plyr) != "n" || this.isColliding(plyr))) {
			alreadyPick = true;
			this.switchStatus(interact);
		}
		this.checkPlayerEntrance(plyr)
		// console.log(this.playerEntered)
	}

	switchStatus(interact) {
		if (this.status) {
			this.frameCord = this.closeCord;
			this.status = false;
		} else {
			this.frameCord = 0;
			this.status = true;
		}
		
	}

	checkPlayerEntrance(plyr) {
		if (this.isColliding(plyr)) {
			var posNext;
			for (var e=0; e<2; e++) {
				if (this.rooms[e] != curRoom) {
					posNext = this.rooms[e];
				}
			}
			if (posNext == undefined) posNext = curRoom;

			if (this.closeCord == 1) {
				if (this.x-this.width/2 > plyr.x) {
					this.playerEntered = true;
					nextRoom = posNext;

				}
			} else {
				if (this.x < plyr.x+plyr.width/3) {
					this.playerEntered = true;
					nextRoom = posNext;
				}
			}
			// console.log(nextRoom);


		
		}
	}

	placePlayer() {
		console.log("placing player + " + this.id)
		if (this.closeCord == 1) {
			player.x = this.x+this.width;
			player.y = this.y;
		} else {
			console.log("sdsad")
			player.x = this.x-this.width;
			player.y = this.y;
		}
	}

}

function generateDoor(dir, x, y) {

	var dImage = new Image;
	dImage.src = "images/doors.png";

	var options = {
		x: x,
		y: y,
		xVel: 0,
		yVel: 0,
		context: canvas.getContext("2d"),
		width: 8*scale,
		height: 16*scale,
		image: dImage,
		id: 1,
		room: curRoom
	};
	tDoor = new Door(options);
	determineDoorId(curRoom, tDoor);

	if (dir == "l") {
		tDoor.closeCord = 1;
		tDoor.frameCord = 1;
	} else {
		tDoor.closeCord = 2;
		tDoor.frameCord = 2;
	}

	return tDoor;

}




