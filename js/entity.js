class Entity {

	constructor(options) {
		this.frameCord = 0,
		this.tickCount = 0,
		this.ticksPerFrame = options.ticksPerFrame || 6;
		this.numberOfFrames = options.numberOfFrames || 1;

		this.x = options.x;
		this.y = options.y;
		this.prevX = this.x;
		this.prevY = this.y;
		this.xVel = options.xVel;
		this.yVel = options.yVel;
		this.context = options.context;
		this.width = options.width;
		this.height = options.height;
		this.image = options.image;
	}

	render() {
		this.context.drawImage(
			this.image,
			this.frameCord * this.width,
			0,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height);
	}

	update(modifier) {
		this.prevX = this.x;
		this.prevY = this.y;
		this.x += this.xVel;
		this.y += this.yVel;
		// yata yata yata
	}

	isColliding(obj) {
		if (this.x >= obj.x + obj.width) { return false;}
		if (this.x + this.width <= obj.x) { return false;}
		if (this.y >= obj.y + obj.height) { return false;}
		if (this.y + this.height < obj.y) { return false;}
	
		
		return true;
	}

	nearWall(obj) {
		if (this.x == obj.x + obj.width && this.y > obj.y-16 && this.y < obj.y+obj.height+16) { return "l";}
		if (this.x + this.width == obj.x && this.y > obj.y-16 && this.y < obj.y+obj.height+16) { return "r"}
		if (this.y == obj.y + obj.height) { return "u"}
		if (this.y + this.height == obj.y) { return "d"}
		return "n"
	}
}