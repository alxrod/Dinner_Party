function processForeground(fg) {
	interactables = []
	for(h=0;h<fg.length;h++) {
		for(w=0;w<fg[h].length;w++) {
			if (fg[h][w] == 20) {
				tDoor = generateDoor("l",w*scale*8,h*scale*8)
				interactables.push(tDoor)
			}
			if (fg[h][w] == 21) {
				tDoor = generateDoor("r",w*scale*8,h*scale*8)
				interactables.push(tDoor)
			}
		}
	}
}


function loadRoom(bg, fg, plyr) {
	console.log("Loading New Room...");
	var bTiles = []
	for (h=0;h<bg.length;h++) {
		var row = []
		for(w=0;w<bg[h].length;w++) {

			var tileReady = false;
			var tileImage = new Image;
			tileImage.onload = function () {
				tileReady = true;
			}
			tileImage.src = "images/world_edit/"+bg[h][w]+ ".png";

			var options = ({
				x: w*8*scale,
				y: h*8*scale,
				xVel: 0,
				yVel: 0,
				context: canvas.getContext("2d"),
				width: 8*scale,
				height: 8*scale,
				image: tileImage,
				id: bg[h][w],
			})
			t = new Tile(options)
			row.push(t);
		}
		bTiles.push(row);
	}

	processForeground(fg);

	if (Math.random() > 0.75 && player.hasGun == false) {
		var gunT = generateGun(bTiles);
		interactables.push(gunT);
	}
	if (Math.random() > 0.75) {
		var ammoT = generateAmmo(bTiles);
		interactables.push(ammoT);
	}

	return bTiles;

}

