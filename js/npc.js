class Npc extends Entity {
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
		this.collidingWithOther = 0;
		this.lastD = options.lastD || "lS"
		this.needToGetAwayFromNPC = false;
		this.curDWalk = "r"
		var d = new Date();
		this.lastAdjustment = d.getMilliseconds();
		var npcImage = new Image;
		var choice = Math.random();
		if (choice > 0.8) {
			npcImage.src = "images/npc1.png";
		} else if (choice > 0.6) {
			npcImage.src = "images/base_player.png";
		} else if (choice > 0.4) {
			npcImage.src = "images/npc2.png";
		} else if (choice > 0.2) {
			npcImage.src = "images/npc3.png";
		} else {
			npcImage.src = "images/npc4.png";
		}
		this.image = npcImage;
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
							this.xVel = 0;
				
						}
					} else if(exT.x>this.x) {
						if ((this.y >= exT.y && this.y <= exT.y+exT.height) || (this.y+exT.height >= exT.y && this.y <= exT.y) ) {
							this.x = this.prevX = exT.x-this.width;
							this.y = this.prevY;
							this.xVel = 0;

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

	}

	update(modifier) {
		this.prevX = this.x;
		this.prevY = this.y;
		var d = new Date();
		var n = d.getMilliseconds();
		if (Math.abs(this.lastAdjustment-n) > 100 && this.needToGetAwayFromNPC == false) {
			var chance = Math.random();
			if (chance>0.90) {
				if (chance < 0.97) {
					if (this.curDWalk == "r" || this.curDWalk && this.curDWalk != "s") {
						this.curDWalk = "l"
					} else if (this.curDWalk == "l" && this.curDWalk != "s") {
						this.curDWalk = "r";
					}
				} else {
					this.curDWalk = "s"
					if (chance > 0.982) {
						if (Math.random() > 0.5) {
							this.curDWalk = "r";
						} else {
							this.curDWalk = "l";
						}
					}
				}	

				
			}
			this.lastAdjustment = n;
		}

		var collidingWithNone = true;
		for (var npc=0;npc<npcs.length; npc++) {
			if(npcs[npc] != this) {
				if (this.isColliding(npcs[npc])) {
					this.collidingWithOther++;
					// var bothStanding = true;
					// if (this.curDWalk != "s") bothStanding = false;
					// if (npcs[npc].curDWalk != "s") bothStanding = false;
					if (this.collidingWithOther > 100 && this.needToGetAwayFromNPC == false) {
						console.log("we've got some people stuck together")
						npcs[npc].curDWalk = "s"
						this.needToGetAwayFromNPC = true;
						if (Math.random() > 0.5) {
							this.curDWalk = "r";
						} else {
							this.curDWalk = "l";
						}
					}

					if (this.curDWalk == "s" && npcs[npc].curDWalk == "s") console.log("just chilling togther")

					// if (this.curDWalk == npcs[npc].curDWalk && this.curDWalk != "s") {
					// 	this.curDWalk = "s";
					// }
					collidingWithNone = false;
				}
				
			} 
		}
		if (this.collidingWithOther == 0) this.needToGetAwayFromNPC = false;

		// console.log(this.collid.ingWithOther)



		if (collidingWithNone) this.collidingWithOther = 0;
		
		
		if (this.curDWalk == "l") {
			this.xVel = -1.5;
		} else if (this.curDWalk == "r") {
			this.xVel = 1.5;
		} else if (this.curDWalk == "s"){
			this.xVel = 0;
		} 
		this.yVel += 1;

		this.collisions();


		if (this.xVel == 0 && this.curDWalk != "s") {
			if (this.curDWalk == "r") this.curDWalk = "l";
			if (this.curDWalk == "l") this.curDWalk = "r";
		}

		// if (upMove && this.standingOG) {
		// 	this.yVel -= 200 * modifier * scale;
		// }

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
	}
}


function assignNPCCords() {
	var location = [-1,-1]
	while (location[0] == -1) {
		hIndex = getRandomInt(0,bgTiles.length-1)
		wIndex = getRandomInt(0,bgTiles[0].length)
		if (bgTiles[hIndex][wIndex].isSolid == false && hIndex != bgTiles.length-1) {
			if (bgTiles[hIndex+1][wIndex].isSolid) {
				location = [bgTiles[hIndex][wIndex].x, bgTiles[hIndex][wIndex].y]
			}
		}
	}
	return location

}