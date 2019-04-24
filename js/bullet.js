class Bullet extends Entity {
	constructor(options) {
		super(options)
		this.type = "bullet"
	}
	
	update(modifer, tiles, bullets) {
		this.prevX = this.x;
		this.prevY = this.y;
		this.x += this.xVel;
		this.y += this.yVel;
		for(h=0;h<tiles.length;h++) {
			for(w=0;w<tiles[h].length;w++) {
				if (this.isColliding(tiles[h][w]) && tiles[h][w].isSolid) {

					bullets.splice(bullets.indexOf(this),1);
				}
			}
		}
	}
}