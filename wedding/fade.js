 var myForm = $('#form'), myImage = $('#cf4');

 myImage.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {

   myForm.removeClass("hidden");
   myImage.addClass("hidden");
  });