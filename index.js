let cv = document.getElementById('cv');
let ctx = cv.getContext('2d');

let sprite = new function(){
	this.frames = []
	this.frameNum = 2;
	this.numFrames = 0;
	this.frameCounter = 0;
	this.x = 0;
	this.y = 0;

	this.addFrame = function(path){
		let img = new Image;
		img.src = path;
		this.frames.push(img);
		this.numFrames++;
	}
	this.nextFrame = function(){
		this.frameCounter++;
		if(this.frameCounter == 3){
			this.frameNum++;
			if(this.frameNum >= this.numFrames){
				this.frameNum = 0;
			}
			this.frameCounter = 0;
		}
	}

	this.addFrame('./animations/idle/idle-2.png');
	this.addFrame('./animations/idle/idle-1.png');
	this.addFrame('./animations/idle/idle0.png');
	this.addFrame('./animations/idle/idle1.png');
	this.addFrame('./animations/idle/idle2.png');
	this.addFrame('./animations/idle/idle1.png');
	this.addFrame('./animations/idle/idle0.png');
	this.addFrame('./animations/idle/idle-1.png');
}



setInterval(function(){
	ctx.fillStyle = 'beige';
	ctx.fillRect(0, 0, cv.width, cv.height);

	ctx.drawImage(sprite.frames[sprite.frameNum], sprite.x, sprite.y);

	sprite.nextFrame();
}, 30);





