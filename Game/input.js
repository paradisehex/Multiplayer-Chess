function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function runMouseDown(mousePos){
	var squareClicked = false;
	
	if((mousePos.x > height/2-20) && (mousePos.x < height/2+20) && (mousePos.y > height/2-20) && (mousePos.y < height/2+20)){
		if(++turn > Players){turn = 1;}
	}
	
	if(!upgrade){//Normal
		for (var i = 0; i < Board.length; i++) {
			if(Board[i] != null){
			
				var poly = [Board[i].X1, Board[i].Y1, Board[i].X4, Board[i].Y4, Board[i].X3, Board[i].Y3, Board[i].X2, Board[i].Y2];
				if(PolyK.ContainsPoint(poly, mousePos.x, mousePos.y)){
					squareClicked = true;
				
					if(Board[i].state == 3){
						//Move piece
						var current = getActive();
						
						//If Castling (is a castle and is (moving to 2 or 6) and has not moved yet)
						if( (current.piece == 6) && ( (Board[i].N == 2)||(Board[i].N == 6) ) && (!current.moved) ){
							Board[i].piece = 6;
							Board[i].team = current.team;
							
							//Queen side
							if(Board[i].N == 2){
								getPolygon(Board[i].S, 3).piece = 2;
								getPolygon(Board[i].S, 3).team = current.team;
								
								getPolygon(Board[i].S, 0).piece = 0;
								getPolygon(Board[i].S, 0).team = 0;
							//King side
							}else{
								getPolygon(Board[i].S, 5).piece = 2;
								getPolygon(Board[i].S, 5).team = current.team;
								
								getPolygon(Board[i].S, 7).piece = 0;
								getPolygon(Board[i].S, 7).team = 0;
							}
							nextPlayer();
							
						}else{
							//Normal piece move
							current.moved = true;
							Board[i].moved = true;
						
							Board[i].team = current.team;
							Board[i].piece = current.piece;
					
							//Pawn upgrading
							if((Board[i].piece == 1) && (Board[i].S%2 == 0) && (Board[i].N < 8)){
								upgrade = true;
								upgradeSquare = Board[i];
							}else{
								nextPlayer();
							}
						}
						//Clean up
						current.piece = 0;
						current.team = 0;
						clearActive();
						clearThree();
					}
				
					if(Board[i].state == 1){
						clearThree();
						clearActive();
					
						if(Board[i].team == turn){
							Board[i].state = 2;
							setVaildMoves(i,Board,Players);
						}
					}
				}
			}
		}
		if(!squareClicked){
			clearThree();
			clearActive();
		}
	}else{//Pawn being upgraded
		switch(selected){
			case 1:
				upgradeSquare.piece = 3;
				break;
			case 2:
				upgradeSquare.piece = 5;
				break;
			case 3:
				upgradeSquare.piece = 2;
				break;
			case 4:
				upgradeSquare.piece = 4;
				break;
		}
		//Next players turn
		nextPlayer();
		upgrade = false;
	}
}

function runMouseMove(mousePos){
	if(!upgrade){//Normal
		for (var i = 0; i < Board.length; i++) {
			if(Board[i] != null){
				var poly = [Board[i].X1, Board[i].Y1, Board[i].X4, Board[i].Y4, Board[i].X3, Board[i].Y3, Board[i].X2, Board[i].Y2];
				if(PolyK.ContainsPoint(poly, mousePos.x, mousePos.y)){
					if(Board[i].state == 0){
						Board[i].state = 1;
					}
				}else{
					if(Board[i].state == 1){
						Board[i].state = 0;
					}
				}
			}
		}
	}else{//Pawn being upgraded
		if(mousePos.x < height/2){
			if(mousePos.y < height/2){//Top Left
				selected = 1;
			}else{//Bottom Left
				selected = 3;
			}
		}else{
			if(mousePos.y < height/2){//Top Right
				selected = 2;
			}else{//Bottom Right
				selected = 4;
			}
		}
	}
}

function nextPlayer(){
	var checkRepeat = turn;
	if(++turn > Players){turn = 1;}
	while(!doesPlayerHaveKing(turn)){		
		if(++turn > Players){turn = 1;}
	}
	if(checkRepeat == turn){
		GameOver = true;
	}
}
