$(document).ready(function () {
	//used to alternate between x and o
	var count = 1;
	var scoreX = 0;
	var scoreO = 0;
	//holds the placement of x and o, used to find winner (will later be used for 1 player mode)
	var left = ["","",""];  //top, mid, bottom
	var mid = ["","",""];   //top, mid, bottom
	var right = ["","",""]; //top, mid, bottom
	var grid = [left,mid,right];
	
	function setPosition(x, y, xORo) {
		if(grid[x][y] === "") {
			grid[x][y] = xORo;
			return true;
			}
		else
			return false;
	}
	
	function checkForWin()
	{
		if (checkRow() || checkCol() || checkDiag())
		{
			document.getElementById("myModalLabel").innerHTML = "Winner";
			document.getElementById("bigWinner").innerHTML = "Winner - " + getPlayer();
			$('#myModal').modal('show')
			return true;
		}
	}

//clean this up....all the check functions can be cleaned up. so much redundant code. yuck!
	function checkRow()
	{
		var plr = getPlayer();
		for (i = 0; i < 3; i++)
		{
			var inARow = 0;
			for(j = 0; j < 3; j++)
			{
				if(grid[j][i] == plr)
				{
					inARow++;
					if (inARow == 3)
						return true;
				}
			}
		}
		return false;
	}
	
	function checkCol()
	{
		var plr = getPlayer();
		for (i = 0; i < 3; i++)
		{
			var inARow = 0;
			for(j = 0; j < 3; j++)
			{
				if(grid[i][j] == plr)
				{
					inARow++;
					if (inARow == 3)
						return true;
				}
			}
		}
		return false;
	}
	
	function checkDiag()
	{
		var plr = getPlayer();
		var inARow = 0;
		for(j = 0, i = 0; j < 3; i++, j++)
		{
			if(grid[i][j] == plr)
			{
				inARow++;
				if (inARow == 3)
					return true;
			}
		}
		//this can be improved.
		if (grid[2][0] == "X" && grid[1][1] == "X" && grid[0][2] == "X")
			return true;
		if (grid[2][0] == "O" && grid[1][1] == "O" && grid[0][2] == "O")
			return true;
		else
			return false;
	}
	
	function clearBoard()
	{
		left.forEach(clearElement);
		mid.forEach(clearElement);
		right.forEach(clearElement);
		var elems = document.getElementsByClassName("box");
		Array.prototype.forEach.call(elems, function(el) { 
			el.innerText = "";
			});
		count = 1;
	}
	
	function setInner( elem, index, array)
	{
		array[index].innerText = "";
	}
	function clearElement( elem, index, array )
	{
		array[index] = "";
	}
	
	function getPlayer()
	{
		if (count%2 == 1)
			return "X";
		else
			return "O";
	}
	
	$(".newGame").click(function(){
		clearBoard();
	});
	
	$(".box").mousedown(function(){
		
		var plr = getPlayer();
		
		if(setPosition(this.dataset.x, this.dataset.y, plr))
		{
			if (plr == "X")
				$(this).append("<i class='fa fa-arrows-alt fa-2x x'></i>");
			else 
				$(this).append("<i class='fa fa-dot-circle-o fa-2x o'></i>");
			
			if(checkForWin())
			{
				if (plr == "X")
					scoreX++;
				else
					scoreO++;
				document.getElementById("scoreX").innerHTML = "X: " + scoreX;
				document.getElementById("scoreO").innerHTML = "O: " + scoreO;
			}
			else
			{
				count++;
			}
		}
	});
});