$(function() {
   hov();
});

function hov(){
    $('.nav-section').on('mouseenter',function(){
	$('.hov').css({
	    top: $(this).offset().top
		-$(this).parent().offset().top
	}); 
    });
    $('.nav').on('mouseout', function(){
	$(this).find('.nav-section').each(function(index){
	    if($(this).height()>54){
		$('.hov').css({top:$('.nav-section').eq(index).offset().top - ($('.nav-section').height()+24)});
		$('.nav-link').removeClass('active');
		$('.nav-section').eq(index).find('.nav-link').addClass('active');
		if(index==0){
		    $('.hov').css({top:0});
		}
	    }
	    
	});
    });
    $( ".sub-links a" ).click(function() {
	$( ".sub-links a" ).removeClass('active');
	$(this).addClass('active');
    });
}
