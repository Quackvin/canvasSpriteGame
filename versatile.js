let cv = document.getElementById('cv');
let ctx = cv.getContext('2d');

let player = new sprite();

player.createAnimation('idle');
player.animations['idle'].addFrame('./animations/idle/idle-2.png');
player.animations['idle'].addFrame('./animations/idle/idle-1.png');
player.animations['idle'].addFrame('./animations/idle/idle0.png');
player.animations['idle'].addFrame('./animations/idle/idle1.png');
player.animations['idle'].addFrame('./animations/idle/idle2.png');
player.animations['idle'].addFrame('./animations/idle/idle1.png');
player.animations['idle'].addFrame('./animations/idle/idle0.png');
player.animations['idle'].addFrame('./animations/idle/idle-1.png');
player.animations['idle'].startFrame = 2;

player.createAnimation('run');
player.animations['run'].addFrame('./animations/run/run-2.png');
player.animations['run'].addFrame('./animations/run/run-1.png');
player.animations['run'].addFrame('./animations/run/run0.png');
player.animations['run'].addFrame('./animations/run/run1.png');
player.animations['run'].addFrame('./animations/run/run2.png');
player.animations['run'].addFrame('./animations/run/run1.png');
player.animations['run'].addFrame('./animations/run/run0.png');
player.animations['run'].addFrame('./animations/run/run-1.png');
player.animations['run'].startFrame = 2;

player.loadAnimation('idle');

setInterval(function(){
	ctx.fillStyle = 'beige';
	ctx.fillRect(0, 0, cv.width, cv.height);

	player.drawFrame();
	player.nextFrame();
	player.move();
}, 30);

document.addEventListener('keypress', function(evt){
	if(evt.code == 'KeyA'){
		player.direction = 'left';
		player.moveL = true;
	}
	if(evt.code == 'KeyD'){
		player.direction = 'right';
		player.moveR = true;
	}
});

document.addEventListener('keyup', function(evt){
	if(evt.code == 'KeyA'){
		player.moveL = false;
	}
	if(evt.code == 'KeyD'){
		player.moveR = false;
	}
});

function sprite(){
	this.frames = []
	this.frameNum = 2;
	this.numFrames = 0;
	this.frameCounter = 0;
	this.currAnim = ''
	this.x = 0;
	this.y = 0;
	this.direction = 'right';
	this.moveL = false;
	this.moveR = false;
	this.animations = [];

	this.drawFrame = function(){
		img = this.frames[this.frameNum];
		if(this.direction == 'right'){
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.drawImage(img, 0, 0);
			ctx.restore();
		}
		else{
			ctx.save();
			ctx.translate(this.x + img.width, this.y);
			ctx.scale(-1,1);
			ctx.drawImage(img, 0, 0);
			ctx.restore();
		}
	}

	this.loadAnimation = function(animName){
		this.frames = this.animations[animName].frames;
		this.frameNum = this.animations[animName].startFrame;
		this.numFrames = this.animations[animName].numFrames;
		this.currAnim = animName;
	}

	this.createAnimation = function(animName){
		this.animations[animName] = new Animation();
	}

	this.nextFrame = function(){
		if((this.moveL || this.moveR) && this.currAnim != 'run'){
			this.loadAnimation('run');
		}
		if(!this.moveL && !this.moveR && this.currAnim != 'idle'){
			this.loadAnimation('idle');
		}

		this.frameCounter++;
		if(this.frameCounter == 3){
			this.frameNum++;
			if(this.frameNum >= this.numFrames){
				this.frameNum = 0;
			}
			this.frameCounter = 0;
		}
	}

	this.move = function(){
		if(this.moveL || this.moveR){
			if(this.direction == 'left'){
				this.x -= 5;
			}
			if(this.direction == 'right'){
				this.x += 5;
			}
		}
	}
}

function Animation(){
	this.frames = [];
	this.startFrame = 0;
	this.numFrames = 0;

	this.addFrame = function(src){
		let img = new Image;
		img.src = src;
		this.frames.push(img);
		this.numFrames++;
	}
}

