function loadBoard(S,N,context,Board, setPieces){
	N *= 2;
	
	var Angle = 2*Math.PI/N;
	
	
	var H = S/2;
	var L = 2*H*Math.sin(Angle/2);
	var r = H*Math.cos(Angle/2);
	var Sl = L/8;
	
	
	var X = canvas.height/2;
	var Y = canvas.height/2;
	
	for(i = 0;i<N;++i){
		if(i%2==0){
			addPolygons(i, r, Angle, X, Y, L, Sl, 1, Board, setPieces);
			addPolygons(i, r, Angle, X, Y, L, Sl, 2, Board, setPieces);
		}
	}
	
	for(i = 0;i<N;++i){
		if(i%2==0){
			
			var DX1 = getPolygon(i+2,15).X3 - getPolygon(i,8).X2;
			var DY1 = getPolygon(i+2,15).Y3 - getPolygon(i,8).Y2;
			
			var DX2 = getPolygon(i+2,15).X2 - getPolygon(i,8).X3;
			var DY2 = getPolygon(i+2,15).Y2 - getPolygon(i,8).Y3;
			
			var DX3 = getPolygon(i+2,14).X2 - getPolygon(i,9).X3;
			var DY3 = getPolygon(i+2,14).Y2 - getPolygon(i,9).Y3;
			
			var DX4 = getPolygon(i+2,13).X2 - getPolygon(i,10).X3;
			var DY4 = getPolygon(i+2,13).Y2 - getPolygon(i,10).Y3;
			
			var DX5 = getPolygon(i+2,12).X2 - getPolygon(i,11).X3;
			var DY5 = getPolygon(i+2,12).Y2 - getPolygon(i,11).Y3;
			
			if(setPieces){
				for(i2 = 0;i2<4;++i2){
					Board[((i+1)*16)+4*i2] = new Polygon(
						getPolygon(i,8).X2+DX1*0.25*i2 , getPolygon(i,8).Y2+DY1*0.25*i2,
						getPolygon(i,8).X2+DX1*0.25*(i2+1) , getPolygon(i,8).Y2+DY1*0.25*(i2+1),
						getPolygon(i,8).X3+DX2*0.25*(i2+1) , getPolygon(i,8).Y3+DY2*0.25*(i2+1),
						getPolygon(i,8).X3+DX2*0.25*i2 , getPolygon(i,8).Y3+DY2*0.25*i2,
						((i+1)*16)+4*i2);
				}
						
				for(i2 = 0;i2<4;++i2){
					Board[((i+1)*16)+4*i2+1] = new Polygon(
						getPolygon(i,9).X2+DX2*0.25*i2 , getPolygon(i,9).Y2+DY2*0.25*i2,
						getPolygon(i,9).X2+DX2*0.25*(i2+1) , getPolygon(i,9).Y2+DY2*0.25*(i2+1),
						getPolygon(i,9).X3+DX3*0.25*(i2+1) , getPolygon(i,9).Y3+DY3*0.25*(i2+1),
						getPolygon(i,9).X3+DX3*0.25*i2 , getPolygon(i,9).Y3+DY3*0.25*i2,
						((i+1)*16)+4*i2+1);
				}
						
				for(i2 = 0;i2<4;++i2){
					Board[((i+1)*16)+4*i2+2] = new Polygon(
						getPolygon(i,10).X2+DX3*0.25*i2 , getPolygon(i,10).Y2+DY3*0.25*i2,
						getPolygon(i,10).X2+DX3*0.25*(i2+1) , getPolygon(i,10).Y2+DY3*0.25*(i2+1),
						getPolygon(i,10).X3+DX4*0.25*(i2+1) , getPolygon(i,10).Y3+DY4*0.25*(i2+1),
						getPolygon(i,10).X3+DX4*0.25*i2 , getPolygon(i,10).Y3+DY4*0.25*i2,
						((i+1)*16)+4*i2+2);
				}
						
				for(i2 = 0;i2<4;++i2){
					Board[((i+1)*16)+4*i2+3] = new Polygon(
						getPolygon(i,11).X2+DX4*0.25*i2 , getPolygon(i,11).Y2+DY4*0.25*i2,
						getPolygon(i,11).X2+DX4*0.25*(i2+1) , getPolygon(i,11).Y2+DY4*0.25*(i2+1),
						getPolygon(i,11).X3+DX5*0.25*(i2+1) , getPolygon(i,11).Y3+DY5*0.25*(i2+1),
						getPolygon(i,11).X3+DX5*0.25*i2 , getPolygon(i,11).Y3+DY5*0.25*i2,
						((i+1)*16)+4*i2+3);
				}
			}else{
				for(i2 = 0;i2<4;++i2){
					update(
						getPolygon(i,8).X2+DX1*0.25*i2 , getPolygon(i,8).Y2+DY1*0.25*i2,
						getPolygon(i,8).X2+DX1*0.25*(i2+1) , getPolygon(i,8).Y2+DY1*0.25*(i2+1),
						getPolygon(i,8).X3+DX2*0.25*(i2+1) , getPolygon(i,8).Y3+DY2*0.25*(i2+1),
						getPolygon(i,8).X3+DX2*0.25*i2 , getPolygon(i,8).Y3+DY2*0.25*i2,
						((i+1)*16)+4*i2);
				}
						
				for(i2 = 0;i2<4;++i2){
					update(
						getPolygon(i,9).X2+DX2*0.25*i2 , getPolygon(i,9).Y2+DY2*0.25*i2,
						getPolygon(i,9).X2+DX2*0.25*(i2+1) , getPolygon(i,9).Y2+DY2*0.25*(i2+1),
						getPolygon(i,9).X3+DX3*0.25*(i2+1) , getPolygon(i,9).Y3+DY3*0.25*(i2+1),
						getPolygon(i,9).X3+DX3*0.25*i2 , getPolygon(i,9).Y3+DY3*0.25*i2,
						((i+1)*16)+4*i2+1);
				}
						
				for(i2 = 0;i2<4;++i2){
					update(
						getPolygon(i,10).X2+DX3*0.25*i2 , getPolygon(i,10).Y2+DY3*0.25*i2,
						getPolygon(i,10).X2+DX3*0.25*(i2+1) , getPolygon(i,10).Y2+DY3*0.25*(i2+1),
						getPolygon(i,10).X3+DX4*0.25*(i2+1) , getPolygon(i,10).Y3+DY4*0.25*(i2+1),
						getPolygon(i,10).X3+DX4*0.25*i2 , getPolygon(i,10).Y3+DY4*0.25*i2,
						((i+1)*16)+4*i2+2);
				}
						
				for(i2 = 0;i2<4;++i2){
					update(
						getPolygon(i,11).X2+DX4*0.25*i2 , getPolygon(i,11).Y2+DY4*0.25*i2,
						getPolygon(i,11).X2+DX4*0.25*(i2+1) , getPolygon(i,11).Y2+DY4*0.25*(i2+1),
						getPolygon(i,11).X3+DX5*0.25*(i2+1) , getPolygon(i,11).Y3+DY5*0.25*(i2+1),
						getPolygon(i,11).X3+DX5*0.25*i2 , getPolygon(i,11).Y3+DY5*0.25*i2,
						((i+1)*16)+4*i2+3);
				}
			
			}
		}
	}
}



function addPolygons(i,r,Angle,X,Y,L,Sl,row,Board, setPieces){
	if(row == 1){
		var DX = r*Math.sin(Math.PI-Angle*i);
		var DY = r*Math.cos(Math.PI-Angle*i);
	}else{
		var DX = (r-Sl)*Math.sin(Math.PI-Angle*i);
		var DY = (r-Sl)*Math.cos(Math.PI-Angle*i);
	}
	
	var position = i*16;
	if(row==2){position+=8;}
			
	context.stroke();
	for(i2 = 0;i2<8;++i2){
		var DXEdge = (L/2-Sl*i2)*Math.cos(Math.PI-(Angle*i));
		var DYEdge = (L/2-Sl*i2)*Math.sin(Math.PI-(Angle*i));
			
		var Xcorner = X-DX+DXEdge;
		var Ycorner = Y-DY-DYEdge;
			
		var Xcorner2 = Xcorner+Sl*Math.sin(Angle*i);
		var Ycorner2 = Ycorner-Sl*Math.cos(Angle*i);
			
		var Xcorner3 = Xcorner2+Sl*Math.cos(Angle*i);
		var Ycorner3 = Ycorner2+Sl*Math.sin(Angle*i);
		
		var Xcorner4 = Xcorner3-Sl*Math.sin(Angle*i);
		var Ycorner4 = Ycorner3+Sl*Math.cos(Angle*i);
		
		
		if(setPieces){
			Board[position+i2] = new Polygon(Xcorner, Ycorner, Xcorner2, Ycorner2, Xcorner3, Ycorner3, Xcorner4, Ycorner4, position+i2);
			Board[position+i2].team = i/2+1;
			if(row == 1){
				if(i2==0){Board[position+i2].piece = 2;}
				if(i2==1){Board[position+i2].piece = 3;}
				if(i2==2){Board[position+i2].piece = 4;}
				if(i2==3){Board[position+i2].piece = 5;}
				if(i2==4){Board[position+i2].piece = 6;}
				if(i2==5){Board[position+i2].piece = 4;}
				if(i2==6){Board[position+i2].piece = 3;}
				if(i2==7){Board[position+i2].piece = 2;}
			}else{
				if(i2==0){Board[position+i2].piece = 1;}
				if(i2==1){Board[position+i2].piece = 1;}
				if(i2==2){Board[position+i2].piece = 1;}
				if(i2==3){Board[position+i2].piece = 1;}
				if(i2==4){Board[position+i2].piece = 1;}
				if(i2==5){Board[position+i2].piece = 1;}
				if(i2==6){Board[position+i2].piece = 1;}
				if(i2==7){Board[position+i2].piece = 1;}
			}
		}else{
			update(Xcorner, Ycorner, Xcorner2, Ycorner2, Xcorner3, Ycorner3, Xcorner4, Ycorner4, position+i2);
		}
	}
}

function doesPlayerHaveKing(Player){
	for (var i = 0; i < Board.length; i++) {
		if((Board[i].team == Player) && (Board[i].piece == 6)){
			return true;
		}
	}
	return false;
}
