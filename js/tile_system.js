class Tile extends Entity{
	constructor(options) {
		super(options);
		this.id = options.id
		this.isSolid = false;
		if (this.id == 5 || this.id == 4 || this.id == 16) {
		this.isSolid = true;
	}
	}
}