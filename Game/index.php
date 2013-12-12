<html>
<head>
	<title>Chess</title>
	<link rel="shortcut icon" href="./Res/castle.png" />
	<script type="text/javascript" src="board.js" ></script>
	<script type="text/javascript" src="square.js" ></script>
	<script type="text/javascript" src="input.js" ></script>
	<script type="text/javascript" src="Lib/polyk.js" ></script>
	<script type="text/javascript" src="piece.js" ></script>
	<script type="text/javascript" src="renderPiece.js" ></script>
	<script type="text/javascript" src="attack.js" ></script>
</head>
<body style="background-color: #C0C0C0;margin: 0;">
	<canvas id="game" style="margin-left: auto; margin-right: auto; display: block;top:0;"></canvas>
	<script>
		/*
				Set this manully if you want
		*/
		var Players = <?php echo  mysql_real_escape_string($_POST['players']); ?>;
		/*
		
		*/
		
		var Board = new Array(Players*32);

		var canvas = document.getElementById("game");
		var context = canvas.getContext("2d");
		var height =  document.body.clientHeight;
		if(height > document.body.clientWidth){height =  document.body.clientWidth;}
		
		canvas.height = height;
		canvas.width = height;
		
		var turn = 1;
		
		var upgrade = false;
		var upgradeSquare;
		var selected = 0;
		
		var GameOver = false;
		
		loadBoard(height,Players,context,Board, true);
		renderBoard();

		canvas.addEventListener('mousemove', function(evt) {
			var mousePos = getMousePos(canvas, evt);
			runMouseMove(mousePos);
		}, false);
		
		canvas.addEventListener('mousedown', function(evt) {
			var mousePos = getMousePos(canvas, evt);
			runMouseDown(mousePos);
		}, false);
		
		function GameLoop(){
			if(height !=  document.body.clientHeight){
				height = document.body.clientHeight;
				if(height > document.body.clientWidth){height =  document.body.clientWidth;}
				canvas.height = height;
				canvas.width = height;
				loadBoard(height, Players, context, Board, false);
			}
			
			if(!GameOver){
				context.clearRect(0, 0, height, height);
				if(upgrade){
				
					if(selected == 1){context.fillStyle = getColor(upgradeSquare.team);
					}else{context.fillStyle = "#999999";}
					drawShape(height/4, height/4, height/4, Horse);
				
					if(selected == 2){context.fillStyle = getColor(upgradeSquare.team);
					}else{context.fillStyle = "#999999";}
					drawShape(height/4, height*3/4, height/4, Queen);
				
					if(selected == 3){context.fillStyle = getColor(upgradeSquare.team);
					}else{context.fillStyle = "#999999";}
					drawShape(height/4, height/4, height*3/4, Rook);
				
					if(selected == 4){context.fillStyle = getColor(upgradeSquare.team);
					}else{context.fillStyle = "#999999";}
					drawShape(height/4, height*3/4, height*3/4, Bishop);
				
				}else{
					renderBoard();
				}
			}else{
				context.clearRect(0, 0, height, height);
				context.fillStyle = getColor(turn);
				context.fillRect(height/2-20, height/2-20, 40, 40);
			}	
		}


		var lastLoop = new Date;
		setInterval(GameLoop, 100);
	</script>
</body>
</html>
