function drawShape(Size, X, Y, Shape){
	//var BX = X;var BY = Y;context.fillStyle = "#FF0000";
	
	//The pieces were just a little to high
	Y += Size*0.05;
	
	X += Size * Math.sin(Shape[0].A) * Shape[0].L;
	Y -= Size * Math.cos(Shape[0].A) * Shape[0].L;

 	context.beginPath();
	context.moveTo(X, Y);
	for (var i = 1; i < Shape.length; i++) {
		X += Size * Math.sin(Shape[i].A) * Shape[i].L;
		Y -= Size * Math.cos(Shape[i].A) * Shape[i].L;
		context.lineTo(X, Y);
	}
	context.closePath();
	context.fill();
	
	//context.fillStyle = "#000000";context.beginPath();context.moveTo(BX-2, BY+2);context.lineTo(BX-2, BY-2);context.lineTo(BX+2, BY-2);context.lineTo(BX+2, BY+2);context.closePath();context.fill();
}

function Line(Length, Angle){
	this.L = Length;
	this.A = Angle/180*Math.PI;
}

var King = [
	new Line(0.5,196),
	new Line(0.2, -45),
	new Line(0.3, -22.5),
	new Line(0.2, -45),
	new Line(0.2, 10),
	new Line(0.2, 67.5),
	new Line(0.1, 90),
	new Line(0.2, 135),
	new Line(0.1, 45),
	new Line(0.05, -90),
	new Line(0.1, 0),
	new Line(0.1, 90),
	new Line(0.1, 180),
	new Line(0.05, -90),
	new Line(0.1, 135),
	new Line(0.2, 45),
	new Line(0.1, 90),
	new Line(0.2, 112.5),
	new Line(0.2, 170),
	new Line(0.2, -135),
	new Line(0.3, -157.5),
	new Line(0.2, -135)
]

var Queen = [
	new Line(0.5,197.5),
	new Line(0.2, -45),
	new Line(0.4, 0),
	new Line(0.4, -22.5),
	new Line(0.4, 135),
	new Line(0.4, 0),
	new Line(0.4, 157.5),
	new Line(0.4, 22.5),
	new Line(0.4, 180),
	new Line(0.4, 45),
	new Line(0.4, -157.5),
	new Line(0.4, 180),
	new Line(0.2, -135)
]

var Bishop = [
	new Line(0.6, 214),
	new Line(0.1, 0),
	new Line(0.25, 90),
	new Line(0.1, 0),
	new Line(0.2, -35),
	new Line(0.3, -18),
	new Line(0.3, 18),
	new Line(0.3, 45),
	new Line(0.3, 135),
	new Line(0.3, 162),
	new Line(0.3, -162),
	new Line(0.2, -145),
	new Line(0.1, 180),
	new Line(0.25, 90),
	new Line(0.1, 180)
]

var Rook = [
	new Line(0.625, 218),
	new Line(0.2, 0),
	new Line(0.2, 45),
	new Line(0.2, 0),
	new Line(0.2, -45),
	new Line(0.35, 0),
	new Line(0.15, 90),
	new Line(0.15, 180),
	new Line(0.15, 90),
	new Line(0.15, 0),
	new Line(0.15, 90),
	new Line(0.15, 180),
	new Line(0.15, 90),
	new Line(0.15, 0),
	new Line(0.15, 90),
	new Line(0.35, 180),
	new Line(0.2, -135),
	new Line(0.2, 180),
	new Line(0.2, 135),
	new Line(0.2, 180)
]

var Pawn = [
	new Line(0.53, 201),
	new Line(0.1, 0),
	new Line(0.15, 45),
	new Line(0.15, 0),
	new Line(0.15, 270),
	new Line(0.1, 0),
	new Line(0.2, 90),
	new Line(0.075, 292.5),
	new Line(0.075, 315),
	new Line(0.075, 337.5),
	new Line(0.075, 0),
	new Line(0.075, 22.5),
	new Line(0.075, 45),
	new Line(0.1, 80),
	new Line(0.1, 100),
	new Line(0.075, 135),
	new Line(0.075, 157.5),
	new Line(0.075, 180),
	new Line(0.075, 202.5),
	new Line(0.075, 225),
	new Line(0.075, 247.5),
	new Line(0.2, 90),
	new Line(0.1, 180),
	new Line(0.15, 270),
	new Line(0.15, 180),
	new Line(0.15, 135),
	new Line(0.1, 180)
]

var Horse = [
	new Line(0.6, 215),
	new Line(0.2, 0),
	new Line(0.2, 45),
	new Line(0.2, 0),
	new Line(0.2, 260),
	new Line(0.1, 315),
	new Line(0.1, 10),
	new Line(0.3, 45),
	new Line(0.2, 20),
	new Line(0.2, 150),
	new Line(0.2, 20),
	new Line(0.2, 150),
	new Line(0.2, 135),
	new Line(0.2, 170),
	new Line(0.579, 180)
]
