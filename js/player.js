class Player extends Entity {
	constructor(options) {
		super(options);
		this.curD = options.curDirection;
		this.right = [0,1,0,2];
		this.rightG = [8,9,8,10];
		this.left = [3,4,3,5];
		this.leftG = [11,12,11,13];
		this.jumpLeft = [7];
		this.jumpLeftG = [15]
		this.jumpRight = [6];
		this.jumpRightG = [14];
		this.standLeft = [3];
		this.standLeftG = [11]
		this.standRight = [0];
		this.standRightG = [8]
		this.curSpS = {}
		this.isFlushToRightWall = false;
		this.isFlushToLeftWall = false;
		this.frameIndex = 0;
		this.standingOG = false;
		this.hasGun = false;
		this.firstShot = true;
		this.timeSince;
		this.lastD = options.lastD || "lS"
	}

	updateSpS() {
		if(this.curD == "l") {
			if (this.hasGun) {
				this.curSpS = this.leftG;
			} else {
				this.curSpS = this.left;
			}
		} else if (this.curD == "r") {
			if (this.hasGun) {
				this.curSpS = this.rightG;
			} else {
				this.curSpS = this.right;
			}
		} else if (this.curD == "lS") {
			if (this.hasGun) {
				this.curSpS = this.standLeftG;
			} else {
				this.curSpS = this.standLeft;
			}
		} else if (this.curD == "rS") {
			if (this.hasGun) {
				this.curSpS = this.standRightG;
			} else {
				this.curSpS = this.standRight;
			}
		} else if (this.curD == "uL") {
			if (this.hasGun) {
				this.curSpS = this.jumpLeftG;
			} else {
				this.curSpS = this.jumpLeft;
			}
		} else if (this.curD == "uR") {
			if (this.hasGun) {
				this.curSpS = this.jumpRightG;
			} else {
				this.curSpS = this.jumpRight;
			}
		}
	}
	
	


	movementSpS() {
		if (this.yVel != 0 && (this.lastD == "l" || this.lastD == "lS" || this.lastD == "uL")) {
			this.curD = "uL"
		} else if (this.yVel != 0 && (this.lastD == "r" || this.lastD == "rS" || this.lastD == "uR") ) {
			this.curD = "uR"
		} else if (this.xVel < 0) {
			this.curD = "l";
		} else if (this.xVel > 0) {
			this.curD = "r";
		} else if (this.lastD == "l" || this.lastD == "lS" || this.lastD == "uL") {
			this.curD = "lS"
		} else {
			this.curD = "rS"
		}
		this.lastD = this.curD;
		this.updateSpS();
	}
	
	collisions() {
		var acX = this.x+8*scale
		var somethingUnder = false;


		for(h=0;h<bgTiles.length;h++) {
			for(w=0;w<bgTiles[h].length;w++) {
				var exT = bgTiles[h][w]
				if (this.isColliding(exT) && exT.isSolid) {	
					
					if(exT.y>this.y) {
						if ((acX  > exT.x && acX  < exT.x+exT.width) || acX  == exT.x) {
							this.x = this.prevX;
							this.y = this.prevY = exT.y-this.height;
							somethingUnder = true;
							this.yVel = 0;
							
						}
					}

					if(exT.y<this.y) {
						if ((acX  > exT.x && acX  < exT.x+exT.width) || acX  == exT.x) {
							this.x = this.prevX;
							this.y = this.prevY = exT.y+this.height;
							this.yVel = 0;
							
						}
					} else if(exT.x<this.x) {
						if ((this.y >= exT.y && this.y <= exT.y+exT.height) || (this.y+exT.height >= exT.y && this.y <= exT.y) ) {
							this.x = this.prevX = exT.x+exT.width;
							this.y = this.prevY;
							leftMove = false;
				
						}
					} else if(exT.x>this.x) {
						if ((this.y >= exT.y && this.y <= exT.y+exT.height) || (this.y+exT.height >= exT.y && this.y <= exT.y) ) {
							this.x = this.prevX = exT.x-this.width;
							this.y = this.prevY;
							rightMove = false;

						}
					}
				}
				
			}

			if(somethingUnder) {
				this.standingOG = true;
			} else {
				this.standingOG = false;
			}
		}

		alerts = " ";
		for(var e=0; e<interactables.length; e++) {
			if (this.isColliding(interactables[e])) {
				if (interactables[e].type == "gun") {
					alerts = "Hit 'E' to pick up the gun!";
					
				} else if (interactables[e].type == "ammo") {
					alerts = "Hit 'E' to pick up the bullets!";
				}
			}
		}
	}

	update(modifier) {
		this.prevX = this.x;
		this.prevY = this.y;

		
		if (leftMove) {
			this.xVel = -3;
		} else if (rightMove) {
			this.xVel = 3;
		} else  {
			this.xVel = 0;
		} 
		this.yVel += 1;

		this.collisions();

		if (upMove && this.standingOG) {
			this.yVel -= 20;
		}

		this.movementSpS();

		this.tickCount += 1;
		if (this.tickCount > this.ticksPerFrame) {
			this.tickCount = 0;
			this.frameIndex += 1;
		}

		if (this.frameIndex > this.curSpS.length-1) {
			this.frameIndex = 0;
		}

		this.frameCord = this.curSpS[this.frameIndex];
		
		this.x += this.xVel;
		this.y += this.yVel;

		if (pickUpPress) {
			for(e=0; e<interactables.length; e++) {
				if (alerts == "Hit 'E' to pick up the gun!") {
					if(interactables[e].type == "gun") {
						this.hasGun = true;
						interactables.splice(e, 1);
					}
				} else if (alerts == "Hit 'E' to pick up the bullets!") {
					if(interactables[e].type == "ammo") {
						ammoCount += 2;
						interactables.splice(e, 1);
					}
				}
			}
		}

		if (shootPress && this.hasGun && ammoCount > 0) {
			// 8 across 12 down
			var bReady = false;
			var bImage = new Image;
			bImage.onload = function () {
				bReady = true;
			}
			
			if (this.curD == "l" || this.curD == "lS" || this.curD == "uL") {
				var dirCo = -1;
			} else {
				var dirCo = 1;
			}

			if (dirCo == -1) {bImage.src = "images/bullet2.png";}
			if (dirCo == 1) {bImage.src = "images/bullet1.png";}

			var options = {
				x: this.x+8*scale,
				y: this.y+12*scale,
				xVel: 10*dirCo,
				yVel: 0,
				context: canvas.getContext("2d"),
				width: 3*scale,
				height: 1*scale,
				image: bImage
			};

			var bulletT = new Bullet(options);
			bullets.push(bulletT);
			ammoCount-=1;
			shootPress=false;
		}
	}
}