class GunResource extends Entity{
	constructor(options) {
		super(options);
		this.type = "gun";
	}
}

class AmmoResource extends Entity{
	constructor(options) {
		super(options);
		this.type = "ammo";
	}
}

function generateAmmo (bTiles) {
	var bReady = false;
	var bImage = new Image;
	bImage.onload = function () {
		bReady = true;
	}
	bImage.src = "images/bullets_icon.png";



	var location = [-1,-1]
	while (location[0] == -1) {
		hIndex = getRandomInt(0,bTiles.length-1)
		wIndex = getRandomInt(0,bTiles[0].length)
		if (bTiles[hIndex][wIndex].isSolid == false && hIndex != bTiles.length-1) {
			if (bTiles[hIndex+1][wIndex].isSolid) {
				location = [bTiles[hIndex][wIndex].x, bTiles[hIndex][wIndex].y]
			}
		}
	}

	var params1 = {
		x: location[0],
		y: location[1],
		xVel: 0,
		yVel: 0,
		context: canvas.getContext("2d"),
		width: 8*scale,
		height: 8*scale,
		image: bImage
	};
	ammoIcon = new AmmoResource(params1);

	return ammoIcon;

}

function generateGun (bTiles) {
	var gReady = false;
	var gImage = new Image;
	gImage.onload = function () {
		gReady = true;
	}
	gImage.src = "images/gun_icon.png";



	var location = [-1,-1]
	while (location[0] == -1) {
		hIndex = getRandomInt(0,bTiles.length-1)
		wIndex = getRandomInt(0,bTiles[0].length)
		if (bTiles[hIndex][wIndex].isSolid == false && hIndex != bTiles.length-1) {
			if (bTiles[hIndex+1][wIndex].isSolid) {
				location = [bTiles[hIndex][wIndex].x, bTiles[hIndex][wIndex].y]
			}
		}
	}

	var params2 = {
		x: location[0],
		y: location[1],
		xVel: 0,
		yVel: 0,
		context: canvas.getContext("2d"),
		width: 8*scale,
		height: 8*scale,
		image: gImage
	};
	gunIcon = new GunResource(params2);

	return gunIcon;

}