function setVaildMoves(L,board,players){
	var team = board[L].team;
	
	switch(board[L].piece){
	
		case 1:		//Pawn
			if(((team*2)-1  == board[L].S) || ((team*2)-2  == board[L].S)){
			
				//Check Forward
				var poly = getSquareUp(board[L].S ,board[L].N ,players);
				if((poly[1] != 2) && (poly[0].team == 0)){poly[0].state = 3;}
				
				if( ((team*2)-2  == board[L].S) && (poly[0].state == 3) ){
					//Check if it's going in reverse
					if(poly[1]){
						var poly2 = getSquareDown(poly[0].S , poly[0].N ,players);
						if((poly2[1] != 2) && (poly2[0].team == 0)){poly2[0].state = 3;}
					}else{
						var poly2 = getSquareUp(poly[0].S , poly[0].N ,players);
						if((poly2[1] != 2) && (poly2[0].team == 0)){poly2[0].state = 3;}
					}
				}
				
				var poly = getSquareUpLeft(board[L].S ,board[L].N ,players);
				checkForEnemy(poly,team);	
				
				var poly = getSquareUpRight(board[L].S ,board[L].N ,players);
				checkForEnemy(poly,team);
				
			}else{
			
				var poly = getSquareDown(board[L].S ,board[L].N ,players);
				if((poly[1] != 2) && (poly[0].team == 0)){poly[0].state = 3;}
				
				var poly = getSquareDownLeft(board[L].S ,board[L].N ,players);
				checkForEnemy(poly,team);
				
				var poly = getSquareDownRight(board[L].S ,board[L].N ,players);
				checkForEnemy(poly,team);
			
			}
			break;
			
			
			
		case 2:		//Rook
			//Foward
				checkDirLine(getSquareUp, board[L], players, team, getSquareDown);
			//Reverse
				checkDirLine(getSquareDown, board[L], players, team, "null");
			//Right
				checkDirLine(getSquareRight,board[L],players,team, "null");
			//Left
				checkDirLine(getSquareLeft,board[L],players,team, "null");
			break;
			
			
			
		case 3:		//Horse
			//Up Up Left
				checkDirHorse(getSquareUp, getSquareDown, getSquareUpLeft, getSquareDownRight, board[L], players, team);
			//Up Up Right
				checkDirHorse(getSquareUp, getSquareDown, getSquareUpRight, getSquareDownLeft, board[L], players, team);
			//Right Right Up
				checkDirHorse(getSquareRight, getSquareLeft, getSquareUpRight, getSquareDownLeft, board[L], players, team);
			//Right Right Down
				checkDirHorse(getSquareRight, getSquareLeft, getSquareDownRight, getSquareUpLeft, board[L], players, team);
			//Down Down Right
				checkDirHorse(getSquareDown, getSquareUp, getSquareDownRight, getSquareUpLeft, board[L], players, team);
			//Down Down Left
				checkDirHorse(getSquareDown, getSquareUp, getSquareDownLeft, getSquareUpRight, board[L], players, team);
			//Left Left Down
				checkDirHorse(getSquareLeft, getSquareRight, getSquareDownLeft, getSquareUpRight, board[L], players, team);
			//Left Left Up
				checkDirHorse(getSquareLeft, getSquareRight, getSquareUpLeft, getSquareDownRight, board[L], players, team);
			break;
			
			
			
		case 4:		//Bishop
			//Up Left
				checkDirLine(getSquareUpLeft, board[L], players, team, getSquareDownRight);
			//Up Right
				checkDirLine(getSquareUpRight, board[L], players, team, getSquareDownLeft);
			//Down Left
				checkDirLine(getSquareDownLeft, board[L], players, team, "null");
			//Down Right
				checkDirLine(getSquareDownRight, board[L], players, team, "null");
			break;
			
			
			
		case 5:		//Queen
			//Foward
				checkDirLine(getSquareUp, board[L], players, team, getSquareDown);
			//Reverse
				checkDirLine(getSquareDown, board[L], players, team, "null");
			//Right
				checkDirLine(getSquareRight,board[L],players,team, "null");
			//Left
				checkDirLine(getSquareLeft,board[L],players,team, "null");
			//Up Left
				checkDirLine(getSquareUpLeft, board[L], players, team, getSquareDownRight);
			//Up Right
				checkDirLine(getSquareUpRight, board[L], players, team, getSquareDownLeft);
			//Down Left
				checkDirLine(getSquareDownLeft, board[L], players, team, "null");
			//Down Right
				checkDirLine(getSquareDownRight, board[L], players, team, "null");
			break;
			
			
			
		case 6:		//King
			//Foward
				checkDirOnce(getSquareUp, board[L], players, team);
			//Reverse
				checkDirOnce(getSquareDown, board[L], players, team);
			//Right
				checkDirOnce(getSquareRight,board[L],players,team);
			//Left
				checkDirOnce(getSquareLeft,board[L],players,team);
			//Up Left
				checkDirOnce(getSquareUpLeft, board[L], players, team);
			//Up Right
				checkDirOnce(getSquareUpRight, board[L], players, team);
			//Down Left
				checkDirOnce(getSquareDownLeft, board[L], players, team);
			//Down Right
				checkDirOnce(getSquareDownRight, board[L], players, team);
			//Castling
				if(!board[L].moved){
					//Left
					if((getPolygon(board[L].S, board[L].N-1).piece == 0)&&
					(getPolygon(board[L].S, board[L].N-2).piece == 0)&&
					(getPolygon(board[L].S, board[L].N-3).piece == 0)&&
					(getPolygon(board[L].S, board[L].N-4).piece == 2)&&
					(getPolygon(board[L].S, board[L].N-4).team == team)&&
					(getPolygon(board[L].S, board[L].N-4).moved == false)){
						getPolygon(board[L].S, board[L].N-2).state = 3;
					}
					//Right
					if((getPolygon(board[L].S, board[L].N+1).piece == 0)&&
					(getPolygon(board[L].S, board[L].N+2).piece == 0)&&
					(getPolygon(board[L].S, board[L].N+3).piece == 2)&&
					(getPolygon(board[L].S, board[L].N+3).team == team)&&
					(getPolygon(board[L].S, board[L].N+3).moved == false)){
						getPolygon(board[L].S, board[L].N+2).state = 3;
					}
				}
			break;
	}
}

function checkForPiece(poly,team){
	if(poly[0].team != 0){
		poly[1] = 2;
		if(poly[0].team != team){
			poly[0].state = 3;
		}
	}
}

function checkForEnemy(poly,team){
	if(poly[0].team != 0){
		if(poly[0].team != team){
			poly[0].state = 3;
		}
	}
}

function checkDirLine(theSquFunction, square, players, team, reverseSquF){
	var poly = theSquFunction(square.S ,square.N ,players);
	checkForPiece(poly,team);
	while(poly[1]==0){
		poly[0].state = 3;
		var poly = theSquFunction(poly[0].S ,poly[0].N ,players);
		checkForPiece(poly,team);
	}
	
	if(poly[1]==1){
		poly[1] = 0;
		while(poly[1]==0){
			poly[0].state = 3;
			var poly = reverseSquF(poly[0].S ,poly[0].N ,players);
			checkForPiece(poly,team);
		}
	}
}


function checkDirOnce(theSquFunction, square, players, team){
	var poly = theSquFunction(square.S ,square.N ,players);
	checkForPiece(poly,team);
	if((poly[1]==0)||(poly[1]==1)){
		poly[0].state = 3;
	}
}


function checkDirHorse(F1, F1R, F2, F2R, square, players, team){
	var poly = getSquareHorse(square.S ,square.N ,players, F1, F1R, F2, F2R);
	if(poly[1] == 2){return;}
	checkForPiece(poly,team);
	if((poly[1]==0)||(poly[1]==1)){
		poly[0].state = 3;
	}
}


/*
	0 = good to go
	1 = reverse
	2 = deadend
	3 = enemy
*/
function getSquareUp(Segment,Num,Players){
	if(Segment%2==0){//It's base zone
		if(Num < 8){//Row 1
			return [getPolygon(Segment,Num+8),0];
		}else{//Row 2
			if(Num< 12){//Left side
				return [getPolygon(Segment+1,Num-8),0];
			}else{//Right side
				return [getPolygon(Segment-1, 27-Num),1];
			}
		}
	}else{//It's tran zone
		if(Num < 12){//Not row 4
			return [getPolygon(Segment,Num+4),0];
		}else{//Row 4
			return [getPolygon(Segment+1, 27-Num),1];
		}
	}
}

function getSquareDown(Segment,Num,Players){
	if(Segment%2==0){//It's base zone
		if(Num < 8){//Row 1
			return [getPolygon(Segment,Num),2];
		}else{//Row 2
			return [getPolygon(Segment,Num-8),0];
		}
	}else{//It's tran zone
		if(Num > 3){//Not row 1
			return [getPolygon(Segment,Num-4),0];
		}else{//Row 1
			return [getPolygon(Segment-1,Num+8),0];
		}
	}
}

function getSquareRight(Segment,Num,Players){
	if(Segment%2==0){//It's base zone
		if((Num == 7)||(Num == 15)){//It's on the edge
			return [getPolygon(Segment,Num),2];
		}else{//It's all good
			return [getPolygon(Segment,Num+1),0];
		}
	}else{//It's tran zone
		if((Num == 3)||(Num == 7)||(Num == 11)||(Num == 15)){//It's on the edge
			return [getPolygon(Segment,Num),2];
		}else{//It's all good
			return [getPolygon(Segment,Num+1),0];
		}
	}
}

function getSquareLeft(Segment,Num,Players){
	if(Segment%2==0){//It's base zone
		if((Num == 0)||(Num == 8)){//It's on the edge
			return [getPolygon(Segment,Num),2];
		}else{//It's all good
			return [getPolygon(Segment,Num-1),0];
		}
	}else{//It's tran zone
		if((Num == 0)||(Num == 4)||(Num == 8)||(Num == 12)){//It's on the edge
			return [getPolygon(Segment,Num),2];
		}else{//It's all good
			return [getPolygon(Segment,Num-1),0];
		}
	}
}

function getSquareUpLeft(Segment,Num,players){
	if(Segment%2==0){//It's base zone
		if(Num < 8){//It's a back row
			if(Num == 0){//It's an edge
				return [getPolygon(Segment,Num),2];
			}else{
				return [getPolygon(Segment,Num+7),0];
			}
		}else{//It's a front row
			if(Num == 8){//Edge
				return [getPolygon(Segment,Num),2];
			}
			if(Num <= 12){//Left side
				return [getPolygon(Segment+1,Num-9),0];
			}
			return [getPolygon(Segment-1, 28-Num),1];
		}
	}else{//It's tran zone
		if((Num == 0)||(Num == 4)||(Num == 8)||(Num == 12)){//It's on the edge
			return [getPolygon(Segment,Num),2];
		}else{
			if(Num > 12){//It's at the top
				return [getPolygon(Segment+1, 28-Num),1];
			}else{//It's all good
				return [getPolygon(Segment,Num+3),0];
			}
		}
	}
}

function getSquareUpRight(Segment,Num,players){
	if(Segment%2==0){//It's base zone
		if(Num < 8){//It's a back row
			if(Num == 7){//It's an edge
				return [getPolygon(Segment,Num),2];
			}else{
				return [getPolygon(Segment,Num+9),0];
			}
		}else{//It's a front row
			if(Num == 15){//Edge
				return [getPolygon(Segment,Num),2];
			}
			if(Num <= 10){//Left side
				return [getPolygon(Segment+1,Num-7),0];
			}
			if(Num == 14){return [getPolygon(Segment-1, 12),1];}
			if(Num == 13){return [getPolygon(Segment-1, 13),1];}
			if(Num == 12){return [getPolygon(Segment-1, 14),1];}
			if(Num == 11){return [getPolygon(Segment-1, 15),1];}
		}
	}else{//It's tran zone
		if((Num == 3)||(Num == 7)||(Num == 11)){//It's on the edge
			return [getPolygon(Segment,Num),2];
		}else{
			if(Num >= 12){//It's at the top
				if(Num == 15){return [getPolygon(Segment+1, 11),1];}
				if(Num == 14){return [getPolygon(Segment+1, 12),1];}
				if(Num == 13){return [getPolygon(Segment+1, 13),1];}
				if(Num == 12){return [getPolygon(Segment+1, 14),1];}
			}else{//It's all good
				return [getPolygon(Segment,Num+5),0];
			}
		}
	}
}

function getSquareDownLeft(Segment,Num,players){
	if(Segment%2==0){//It's base zone
		if(Num < 8){//It's a back row
			return [getPolygon(Segment,Num),2];
		}else{//Front row
			if(Num == 8){//Edge
				return [getPolygon(Segment,Num),2];
			}//Else all clear
			return [getPolygon(Segment,Num-9),0];
		}
	}else{//It's tran zone
		if((Num == 0)||(Num == 4)||(Num == 8)||(Num == 12)){//It's on the edge
			return [getPolygon(Segment,Num),2];
		}else{
			if(Num < 4){//Bottom row
				return [getPolygon(Segment-1, Num+7), 0];
			}//All clear
			return [getPolygon(Segment,Num-5),0];
		}
	}
}

function getSquareDownRight(Segment,Num,players){
	if(Segment%2==0){//It's base zone
		if(Num < 8){//It's a back row
			return [getPolygon(Segment,Num),2];
		}else{//Front row
			if(Num == 15){//Edge
				return [getPolygon(Segment,Num),2];
			}//Else all clear
			return [getPolygon(Segment,Num-7),0];
		}
	}else{//It's a tran zone
		if((Num == 7)||(Num == 11)||(Num == 15)){//It's on the edge
			return [getPolygon(Segment,Num),2];
		}else{
			if(Num < 4){//Bottom row
				return [getPolygon(Segment-1, Num+9), 0];
			}//All clear
			return [getPolygon(Segment,Num-3),0];
		}
	}
}

function getSquareHorse(Segment, Num, players, F1, F1R, F2, F2R){
	//Get square in straight line
	var Poly = F1(Segment, Num, players);
	
	//Get square on diagonal
		if(Poly[1] == 0){//All Clear
			return F2(Poly[0].S, Poly[0].N, players);
		}
	
		if(Poly[1] == 1){//Reverse
			return F2R(Poly[0].S, Poly[0].N, players);
		}
	
	
	//Dead End so try going the other way
	var Poly = F2(Segment, Num, players);
	
	//Get square on diagonal
		if(Poly[1] == 0){//All Clear
			return F1(Poly[0].S, Poly[0].N, players);
		}
	
		if(Poly[1] == 1){//Reverse
			return F1R(Poly[0].S, Poly[0].N, players);
		}
		
	//Dead End Give Up
	return [getPolygon(Segment,Num),2];
}
