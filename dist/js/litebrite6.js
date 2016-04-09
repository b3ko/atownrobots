$(document).ready(function () {
	
	supports_local_storage()
	
	if(localStorage.name)
	{
		var savedArt = localStorage.name;
		document.getElementById("list").innerText = localStorage.name.toString();
	}
	
	$("#save" ).on( "click", function( event ) {
		var name = prompt("please enter a name to save your art.");
		if (name != '' && name != null)
		{
			if(!localStorage.name)
				localStorage.name = name;
			else
				localStorage.name = localStorage.name + "," + name;
			document.getElementById("list").innerText = localStorage.name.toString();	
			for(i=1;i<=240;i++)
				localStorage[name + document.getElementById("box" + i).id] = $(document.getElementById("box" + i)).css("background-color");
			alert("done saving");
		}
		else
		{
			alert("Save canceled. To save you must enter a name and click OK.");
		}
	});
	
	$("#load" ).on( "click", function( event ) {
		name = prompt("please enter the name of the art you want to load");
		for(i=1;i<=240;i++)
		{
			color = localStorage[name + document.getElementById("box" + i).id];
			$(document.getElementById("box" + i)).css("background-color", color);
		}
		//alert("done loading");
	});
	
	$("#clear" ).on( "click", function( event ) {
		if(confirm("Are you sure you want to clear the screen?"))
		{
			for(i=1;i<=240;i++)
			{
				color = "rgb(0, 0, 0)";
				$(document.getElementById("box" + i)).css("background-color", color);
				//alert($(document.getElementById("box" + i)).css("background-color"));
			}

		}
	});
	
	function supports_local_storage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
			} 
		catch(e)
			{
			alert("You are either using an outdated browser or have cookies disabled and won't be able to save your drawing!");
			return false;
			}
		}
	
	var color = "rgb(0, 0, 0)";
	var down = false;
	
	function changeColor(c) {
		switch(c.toString())
		{
			case "rgb(0, 0, 0)": 
			return "red";
			case "rgb(255, 0, 0)":
			return "orange";
			case "rgb(255, 165, 0)": 
			return "yellow";
			case "rgb(255, 255, 0)":
			return "green";
			case "rgb(0, 128, 0)":
			return "blue";
			case "rgb(0, 0, 255)":
			return "purple";
			case "rgb(128, 0, 128)":
			return "rgb(0, 0, 0)";
		}
	};

	function touchStart(event){
		event.preventDefulat();
		color = $(this).css("background-color");
		document.getElementById("frame").style.borderColor=color;
		$(".choice").css('box-shadow', "none");
		$(".choice").css('z-index', "1");
		$(this).css('box-shadow', "0 0 8px 3px " + color);
		$(this).css('z-index', "100000");
	};
	
	$(".choice").mousedown(function(){
		color = $(this).css("background-color");
		document.getElementById("frame").style.borderColor=color;
		$(".choice").css('box-shadow', "none");
		$(".choice").css('z-index', "1");
		$(this).css('box-shadow', "0 0 8px 3px " + color);
		$(this).css('z-index', "100000");
	});
	
	$(".box").mousedown(function(){
		$(this).css('background-color', color);
		down = true;
		//alert(c.toString());
	});
	
	$("body").mouseup(function(){
		down = false;
	});
	
	$(".box").on("mouseenter", function () {
		var shadowcolor;
		if(color == "rgb(0, 0, 0)") {
			shadowcolor = "rgb(255,255,255)"
		} else {
			shadowcolor = color;
		}
		$(this).css('box-shadow', "0 0 8px 3px " + shadowcolor);
		$(this).css('z-index', "100000");
		if(down == true) {
			$(this).css('background-color', color);
		}
	});

	$(".main").on("mouseleave", function () {
		down = false;
	});
	
	$(".box").on("mouseleave", function () {
		$(this).css('box-shadow', "none");
		$(this).css('z-index', "1");
	});
});