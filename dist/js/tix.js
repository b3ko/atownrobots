$(document).ready(function () {
	
	var hrten = new Array(
		document.getElementById("hrten1").id
		,document.getElementById("hrten2").id
		,document.getElementById("hrten3").id);
	
	var hrone = new Array(
		document.getElementById("hrone1").id
		,document.getElementById("hrone2").id
		,document.getElementById("hrone3").id
		,document.getElementById("hrone4").id
		,document.getElementById("hrone5").id
		,document.getElementById("hrone6").id
		,document.getElementById("hrone7").id
		,document.getElementById("hrone8").id
		,document.getElementById("hrone9").id
	);
	
	var minten = new Array(
		document.getElementById("minten1").id
		,document.getElementById("minten2").id
		,document.getElementById("minten3").id
		,document.getElementById("minten4").id
		,document.getElementById("minten5").id
		,document.getElementById("minten6").id
	);	

	var minone = new Array(
		document.getElementById("minone1").id
		,document.getElementById("minone2").id
		,document.getElementById("minone3").id
		,document.getElementById("minone4").id
		,document.getElementById("minone5").id
		,document.getElementById("minone6").id
		,document.getElementById("minone7").id
		,document.getElementById("minone8").id
		,document.getElementById("minone9").id
	);

	setTime();
	
		function setTime(){
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
		
			if (h > 12) {
				h -= 12;
			} 
			else if (h === 0)
			{
				h = 12;
			}	
		
			var hrTenCnt = Math.floor(h / 10);
			var hrOneCnt = h % 10;
			var minTenCnt = Math.floor(m / 10);
			var minOneCnt = m % 10;

			var hrTenVal = new Array (0,0,0);
			var hrOneVal = new Array (0,0,0,0,0,0,0,0,0);
			var minTenVal = new Array (0,0,0,0,0,0);
			var minOneVal = new Array (0,0,0,0,0,0,0,0,0);			
			//alert(hrTenCnt + ' / ' + hrOneCnt + ' / ' + minTenCnt + ' / ' + minOneCnt);
			
			//alert(Math.floor(Math.random()*(2 - hrTenCnt)));
			
			for(i=0; i < hrTenVal.length; i++)
			{
				hrTenVal[i] = 0;
			}
			
			for (var c=0; c < hrTenCnt;)
			{
				var x = Math.floor(Math.random()*3)
				if (hrTenVal[x] === 0){
					hrTenVal[x] = 1;
					c++;
				}
			}
			
			for(var i=0; i < hrten.length; i++)
			{
				if (hrTenVal[i] === 1) {
					$(document.getElementById(hrten[i])).css('background-color','red');
				}
				else {
					$(document.getElementById(hrten[i])).css('background-color','#666666');
				}
			}
			//---------------------------------

			for (var c=0; c < hrOneCnt;)
			{
				var x = Math.floor(Math.random()*9)
				if (hrOneVal[x] == 0){
					hrOneVal[x] = 1;
					c++;
				}
			}			
				
				
			for(var i=0; i < hrone.length; i++)
			{
				if (hrOneVal[i] == 1) {
					$(document.getElementById(hrone[i])).css('background-color','red');
				}
				else {
					$(document.getElementById(hrone[i])).css('background-color','#666666');
				}
			}
			//-------------------------------------
			for (var c=0; c < minTenCnt;)
			{
				var x = Math.floor(Math.random()*9)
				if (minTenVal[x] == 0){
					minTenVal[x] = 1;
					c++;
				}
			}	
			
			for(var i=0; i < minten.length; i++)
			{
				if (minTenVal[i] == 1) {
					$(document.getElementById(minten[i])).css('background-color','red');
				}
				else {
					$(document.getElementById(minten[i])).css('background-color','#666666');
				}
			}
			
			//---------------------------------------------------
			for (var c=0; c < minOneCnt;)
			{
				var x = Math.floor(Math.random()*9)
				if (minOneVal[x] == 0){
					minOneVal[x] = 1;
					c++;
				}
			}	
			
			for(var i=0; i < minone.length; i++)
			{
				if (minOneVal[i] == 1) {
					$(document.getElementById(minone[i])).css('background-color','red');
				}
				else {
					$(document.getElementById(minone[i])).css('background-color','#666666');
				}
			}
			
			setTimeout(function(){setTime()},5000);
		}
	
	});