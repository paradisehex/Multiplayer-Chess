function Polygon(X1,Y1,X2,Y2,X3,Y3,X4,Y4,ID){
	this.UnderAttack = new Array(Players);
	this.ID = ID;
	this.S = Math.floor(ID/16);
	this.N = ID-(this.S*16);
	
	var r = 0.05;
	var DY = Y3-Y1;
	var DX = X3-X1;
	var DY1 = r*DY;
	var DX1 = r*DX;
	
	var DY = Y4-Y2;
	var DX = X4-X2;
	var DY2 = r*DY;
	var DX2 = r*DX;
	
	var DY = Y1-Y3;
	var DX = X1-X3;
	var DY3 = r*DY;
	var DX3 = r*DX;
	
	var DY = Y2-Y4;
	var DX = X2-X4;
	var DY4 = r*DY;
	var DX4 = r*DX;
	
	this.X1 = X1;
	this.Y1 = Y1;
	this.X2 = X2;
	this.Y2 = Y2;
	this.X3 = X3;
	this.Y3 = Y3;
	this.X4 = X4;
	this.Y4 = Y4;
	
	this.RX1 = X1+DX1;
	this.RY1 = Y1+DY1;
	
	this.RX2 = X2+DX2;
	this.RY2 = Y2+DY2;
	
	this.RX3 = X3+DX3;
	this.RY3 = Y3+DY3;
	
	this.RX4 = X4+DX4;
	this.RY4 = Y4+DY4;
	
	this.state = 0;
	this.piece = 0;
	this.team = 0;
	this.moved = false;
}
function update(Xcorner, Ycorner, Xcorner2, Ycorner2, Xcorner3, Ycorner3, Xcorner4, Ycorner4, ID){
	var newSquare = new Polygon(Xcorner, Ycorner, Xcorner2, Ycorner2, Xcorner3, Ycorner3, Xcorner4, Ycorner4, ID);
	newSquare.state = Board[ID].state;
	newSquare.piece = Board[ID].piece;
	newSquare.team = Board[ID].team;
	newSquare.moved = Board[ID].moved;
	
	Board[ID] = newSquare;
}

function renderBoard(){
	context.fillStyle = "#808080";
	for (var i = 0; i < Board.length; i++) {
		if(Board[i] != null){
		 	context.beginPath();
			context.moveTo(Board[i].RX1+1,Board[i].RY1+1);
			context.lineTo(Board[i].RX2+1,Board[i].RY2+1);
			context.lineTo(Board[i].RX3+1,Board[i].RY3+1);
			context.lineTo(Board[i].RX4+1,Board[i].RY4+1);
			context.closePath();
			context.fill();
		}
 	}
 	
 	
 	
	
	
	for (var i = 0; i < Board.length; i++) {
		if(Board[i] != null){
			switch(Board[i].state){
				case 1:
					context.fillStyle = "#999999";
					break;
				case 2:
					context.fillStyle = "#555555";
					break;
				case 3:
					context.fillStyle = "#777777";
					break;
				default:
					context.fillStyle = "#AAAAAA";
			}
		 	context.beginPath();
			context.moveTo(Board[i].RX1,Board[i].RY1);
			context.lineTo(Board[i].RX2,Board[i].RY2);
			context.lineTo(Board[i].RX3,Board[i].RY3);
			context.lineTo(Board[i].RX4,Board[i].RY4);
			context.closePath();
			context.fill();
			context.fillStyle = getColor(Board[i].team);
			context.font="15px Arial";
			
			var TX = (Board[i].RX1+Board[i].RX2+Board[i].RX3+Board[i].RX4)/4;
			var TY = (Board[i].RY1+Board[i].RY2+Board[i].RY3+Board[i].RY4)/4;
			
			var top = Board[i].RY1;
			if(Board[i].RY2 < top){top = Board[i].RY2;}
			if(Board[i].RY3 < top){top = Board[i].RY3;}
			if(Board[i].RY4 < top){top = Board[i].RY4;}
			
			var bottom = Board[i].RY1;
			if(Board[i].RY2 > bottom){bottom = Board[i].RY2;}
			if(Board[i].RY3 > bottom){bottom = Board[i].RY3;}
			if(Board[i].RY4 > bottom){bottom = Board[i].RY4;}
			
			var Size = (bottom-top)*0.6;
			
			var top = Board[i].RX1;
			if(Board[i].RX2 < top){top = Board[i].RX2;}
			if(Board[i].RX3 < top){top = Board[i].RX3;}
			if(Board[i].RX4 < top){top = Board[i].RX4;}
			
			var bottom = Board[i].RX1;
			if(Board[i].RX2 > bottom){bottom = Board[i].RX2;}
			if(Board[i].RX3 > bottom){bottom = Board[i].RX3;}
			if(Board[i].RX4 > bottom){bottom = Board[i].RX4;}
			
			var SizeX = (bottom-top)*0.6;
			
			if(SizeX < Size){
				Size = SizeX;
			}
			
			switch(Board[i].piece){
				case 1:
					drawShape(Size, TX, TY, Pawn);
					break;
				case 2:
					drawShape(Size, TX, TY, Rook);
					break;
				case 3:
					drawShape(Size, TX, TY, Horse);
					break;
				case 4:
					drawShape(Size, TX, TY, Bishop);
					break;
				case 5:
					drawShape(Size, TX, TY, Queen);
					break;
				case 6:
					drawShape(Size, TX, TY, King);
					break;
			}
		}
 	}
 	
	context.fillStyle = getColor(turn);
	context.fillRect(height/2-5, height/2-5, 10, 10);
}

function getPolygon(Segment,Num){
	if(Segment >= Board.length/16){Segment = 0;}
	if(Segment < 0){Segment = (Board.length/16)-1;}
	return Board[Segment*16+Num];
}

function getSegment(Location){
	return Math.floor(Location/16);
}

function getColor(num) {
	var sat = 1;
	if (num%2==0){
		sat = 0.5;
	}
	return HSVtoRGB(num/Players, sat);
}

function HSVtoRGB(h, v) {
	var r, g, b, i, f, q, t;
	i = Math.floor(h * 6);
	f = h * 6 - i;
	q = v * (1 - f);
	t = v * (1 - (1 - f));
	switch (i % 6) {
		case 0: r = v, g = t, b = 0; break;
		case 1: r = q, g = v, b = 0; break;
		case 2: r = 0, g = v, b = t; break;
		case 3: r = 0, g = q, b = v; break;
		case 4: r = t, g = 0, b = v; break;
		case 5: r = v, g = 0, b = q; break;
	}
	
	return "rgb("
		+Math.floor(r * 255)+","
		+Math.floor(g * 255)+","
		+Math.floor(b * 255)+")"
	;
}
function clearThree(){for (var i = 0; i < Board.length; i++) {if(Board[i] != null){if((Board[i].state == 3) || (Board[i].state == 4)){Board[i].state = 0;}}}}
function clearActive(){for (var i = 0; i < Board.length; i++) {if(Board[i] != null){if(Board[i].state == 2){Board[i].state = 0;}}}}
function getActive(){for (var i = 0; i < Board.length; i++) {if(Board[i] != null){if(Board[i].state == 2){return Board[i];}}}}
