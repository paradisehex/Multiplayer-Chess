function updateThreatenedSquares(){
	//Clear last moves clutter
	for (var i = 0; i < Board.length; i++){
		for (var i2 = 0; i2 < Board[i].UnderAttack.length; i2++){
			Board[i].UnderAttack[i2] = false;
		}
	}
	
	//Run through every single move
	for (var i = 0; i < Board.length; i++){
		if(Board[i].piece != 0){
			var team = Board[i].team;
			switch(Board[i].piece){
			case 1:		//Pawn
				if(((team*2)-1  == Board[i].S) || ((team*2)-2  == Board[i].S)){
				
					var poly = getSquareUpLeft(Board[i].S ,Board[i].N ,Players);
					checkForPiece(poly,team);	
				
					var poly = getSquareUpRight(Board[i].S ,Board[i].N ,Players);
					checkForPiece(poly,team);
				
				}else{
				
					var poly = getSquareDownLeft(Board[i].S ,Board[i].N ,Players);
					checkForPiece(poly,team);
				
					var poly = getSquareDownRight(Board[i].S ,Board[i].N ,Players);
					checkForPiece(poly,team);
			
				}
				break;
			
			
			
			case 2:		//Rook
				//Foward
					checkDirLine(getSquareUp, Board[i], Players, team, getSquareDown);
				//Reverse
					checkDirLine(getSquareDown, Board[i], Players, team, "null");
				//Right
					checkDirLine(getSquareRight,Board[i],Players,team, "null");
				//Left
					checkDirLine(getSquareLeft,Board[i],Players,team, "null");
				break;
			
			
			
			case 3:		//Horse
				//Up Up Left
					checkDirHorse(getSquareUp, getSquareDown, getSquareUpLeft, getSquareDownRight, Board[i], Players, team);
				//Up Up Right
					checkDirHorse(getSquareUp, getSquareDown, getSquareUpRight, getSquareDownLeft, Board[i], Players, team);
				//Right Right Up
					checkDirHorse(getSquareRight, getSquareLeft, getSquareUpRight, getSquareDownLeft, Board[i], Players, team);
				//Right Right Down
					checkDirHorse(getSquareRight, getSquareLeft, getSquareDownRight, getSquareUpLeft, Board[i], Players, team);
				//Down Down Right
					checkDirHorse(getSquareDown, getSquareUp, getSquareDownRight, getSquareUpLeft, Board[i], Players, team);
				//Down Down Left
					checkDirHorse(getSquareDown, getSquareUp, getSquareDownLeft, getSquareUpRight, Board[i], Players, team);
				//Left Left Down
					checkDirHorse(getSquareLeft, getSquareRight, getSquareDownLeft, getSquareUpRight, Board[i], Players, team);
				//Left Left Up
					checkDirHorse(getSquareLeft, getSquareRight, getSquareUpLeft, getSquareDownRight, Board[i], Players, team);
				break;
			
			
			
			case 4:		//Bishop
				//Up Left
					checkDirLine(getSquareUpLeft, Board[i], Players, team, getSquareDownRight);
				//Up Right
					checkDirLine(getSquareUpRight, Board[i], Players, team, getSquareDownLeft);
				//Down Left
					checkDirLine(getSquareDownLeft, Board[i], Players, team, "null");
				//Down Right
					checkDirLine(getSquareDownRight, Board[i], Players, team, "null");
				break;
			
			
			
			case 5:		//Queen
				//Foward
					checkDirLine(getSquareUp, Board[i], Players, team, getSquareDown);
				//Reverse
					checkDirLine(getSquareDown, Board[i], Players, team, "null");
				//Right
					checkDirLine(getSquareRight,Board[i],Players,team, "null");
				//Left
					checkDirLine(getSquareLeft,Board[i],Players,team, "null");
				//Up Left
					checkDirLine(getSquareUpLeft, Board[i], Players, team, getSquareDownRight);
				//Up Right
					checkDirLine(getSquareUpRight, Board[i], Players, team, getSquareDownLeft);
				//Down Left
					checkDirLine(getSquareDownLeft, Board[i], Players, team, "null");
				//Down Right
					checkDirLine(getSquareDownRight, Board[i], Players, team, "null");
				break;
			
			
			
			case 6:		//King
				//Foward
					checkDirOnce(getSquareUp, Board[i], Players, team);
				//Reverse
					checkDirOnce(getSquareDown, Board[i], Players, team);
				//Right
					checkDirOnce(getSquareRight,Board[i],Players,team);
				//Left
					checkDirOnce(getSquareLeft,Board[i],Players,team);
				//Up Left
					checkDirOnce(getSquareUpLeft, Board[i], Players, team);
				//Up Right
					checkDirOnce(getSquareUpRight, Board[i], Players, team);
				//Down Left
					checkDirOnce(getSquareDownLeft, Board[i], Players, team);
				//Down Right
					checkDirOnce(getSquareDownRight, Board[i], Players, team);
				//Castling
					if(!Board[i].moved){
						//Left
						if((getPolygon(Board[i].S, Board[i].N-1).piece == 0)&&
						(getPolygon(Board[i].S, Board[i].N-2).piece == 0)&&
						(getPolygon(Board[i].S, Board[i].N-3).piece == 0)&&
						(getPolygon(Board[i].S, Board[i].N-4).piece == 2)&&
						(getPolygon(Board[i].S, Board[i].N-4).team == team)&&
						(getPolygon(Board[i].S, Board[i].N-4).moved == false)){
							getPolygon(Board[i].S, Board[i].N-2).UnderAttack[team-1] = true;
						}
						//Right
						if((getPolygon(Board[i].S, Board[i].N+1).piece == 0)&&
						(getPolygon(Board[i].S, Board[i].N+2).piece == 0)&&
						(getPolygon(Board[i].S, Board[i].N+3).piece == 2)&&
						(getPolygon(Board[i].S, Board[i].N+3).team == team)&&
						(getPolygon(Board[i].S, Board[i].N+3).moved == false)){
							getPolygon(Board[i].S, Board[i].N+2).UnderAttack[team-1] = true;
						}
					}
				break;
			}
		}
	}
	
	function checkForPiece(poly,team){
		if(poly[0].team != 0){
			poly[1] = 2;
			if(poly[0].team != team){
				poly[0].UnderAttack[team-1] = true;
			}
		}
	}

	function checkDirLine(theSquFunction, square, Players, team, reverseSquF){
		var poly = theSquFunction(square.S ,square.N ,Players);
		checkForPiece(poly,team);
		while(poly[1]==0){
			poly[0].state = 3;
			var poly = theSquFunction(poly[0].S ,poly[0].N ,Players);
			checkForPiece(poly,team);
		}
	
		if(poly[1]==1){
			poly[1] = 0;
			while(poly[1]==0){
				poly[0].state = 3;
				var poly = reverseSquF(poly[0].S ,poly[0].N ,Players);
				checkForPiece(poly,team);
			}
		}
	}


	function checkDirOnce(theSquFunction, square, Players, team){
		var poly = theSquFunction(square.S ,square.N ,Players);
		checkForPiece(poly,team);
		if((poly[1]==0)||(poly[1]==1)){
			poly[0].UnderAttack[team-1] = true;
		}
	}


	function checkDirHorse(F1, F1R, F2, F2R, square, Players, team){
		var poly = getSquareHorse(square.S ,square.N ,Players, F1, F1R, F2, F2R);
		if(poly[1] == 2){return;}
		checkForPiece(poly,team);
		if((poly[1]==0)||(poly[1]==1)){
			poly[0].UnderAttack[team-1] = true;
		}
	}
}
