console.log('ready');

var G = 9.8;
var AIR_RESISTANCE = 4;
var FRAME_TIME = 30;
var WIDTH = 3000;
var HEIGHT = 500;

function degToRad(angle) {
	return angle * Math.PI * 2 / 360;
}

function Grenade(element,
		 width,
		 height) {
	var self = this;

	var initialWidth = width;
	var initialHeight = height;

	this.el = element;
	this.x = 0;
	this.y = 0;
	this.xAcc = 0;
	this.yAcc = 0;
	this.angle = 0;
	this.angleSpeed = 0;
	this.width = width;
	this.height = height;

	this.update = function (timePassed) {
		self.angleSpeed -= (timePassed / 1000) * AIR_RESISTANCE;
		self.yAcc -= (timePassed / 1000) * G; 
		self.x += self.xAcc;
		self.y += self.yAcc;
		self.angle += self.angleSpeed;
		if(self.y <= 0) {
			self.angle = 0;
			self.y = 0;
			self.yAcc = 0;
			self.xAcc = 0;
			self.angleSpeed = 0;
		}			
		//self.height = initialHeight * Math.sin(degToRad(self.angle)) +
		//	      initialWidth * Math.sin(degToRad(180 - self.angle - 90));
	}

	this.draw = function () {
		self.el.style.top = HEIGHT - self.y - self.height;
		self.el.style.left = self.x;
		self.el.style.transform = "rotate(" + self.angle + "deg)";
	}

	this.throw = function (angle, initialA, rotSpeed) {
		self.xAcc = initialA * Math.cos(degToRad(angle));
		self.yAcc = initialA * Math.sin(degToRad(angle));
		self.angleSpeed = rotSpeed;	
	} 
}

document.body.style.width = WIDTH;
document.body.style.height = HEIGHT;

var grenade = new Grenade(document.getElementById('smoke-grenade'),
			  30,
			  50);
window.setInterval(function() {
	grenade.update(FRAME_TIME);
	grenade.draw();
}, FRAME_TIME);

document.querySelector('.controls button[name=throw]').onclick = function() {
	var angle = document.querySelector('.controls input[name=angle]').value;
	var force = document.querySelector('.controls input[name=force]').value;
	var rotSpeed = document.querySelector('.controls input[name=rotation-speed]').value;	
	grenade.throw(angle, force, rotSpeed);
}

document.querySelector('.controls button[name=reset]').onclick = function() {
	grenade.x = 0;
	grenade.y = 0;
	grenade.xAcc = 0;
	grenade.yAcc = 0;	
}

document.querySelector('.controls button[name=do-not-press]').onclick = function() {
	var grenadeElement = document.getElementById('smoke-grenade'); 
	grenadeElement.style.backgroundColor = "transparent";
	grenadeElement.style.backgroundImage = "url(/img/kostyan_ebalo.png)";
	grenadeElement.style.backgroundSize = "100px 100px";
	grenadeElement.style.width = "100px";
	grenadeElement.style.height = "100px";
	grenade = new Grenade(grenadeElement,
			  100,
			  100);
}


