$("img").on("click", function() {
	$(".active").removeClass("active");
	$('#' + $(this).data("id")).addClass('active');
});