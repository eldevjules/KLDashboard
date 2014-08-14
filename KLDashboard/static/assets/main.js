var time=25;
var cont=0;
$(function() {
    hov(); //Menu principal
    indicadores(); //Indicador Ausencias
    sliderEqipo(); //Slider para equipo
    sliderDirectorio(); //Slider para equipo
    scroll();//Aplica estilo de scrollbar
    listas();//Lista con tabs
    //file(); // Estilo input file
    menu();
});
function indicadores(){
    $('.progress').each(function(index){
        progreso($(this).attr('id'));
    });
}
function progreso(id){
    var myCanvas = document.getElementById(id);
    var limit= parseInt(myCanvas.getAttribute("porcentaje"))/100;
    var circle = new ProgressCircle({
        canvas: myCanvas,
	minRadius: 53,
	arcWidth: 3
    });
    
    circle.addEntry({
        fillColor: 'rgba(34,195,170,1)',
        progressListener: function() {
            return cont;
        }
    }); 
    var val = setTimeout(function(){
	cont+=0.01;
	circle.start(time);
	if(cont<limit)
	    progreso(id);
	else
	    clearTimeout(val); 
    },time);   
}
function sliderEqipo(){
    $('#equipoSlider').bxSlider({
        minSlides: 2,
        maxSlides: 2,
        slideWidth: 250,
        slideMargin: 0,
        pager:false
    });
}
function sliderDirectorio(){
    $('#directorioSlider').bxSlider({
        minSlides: 5,
        maxSlides: 5,
        slideWidth: 250,
        slideMargin: 0,
        pager:false
    });
}
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
    $(".nav-link" ).click(function(e) {
        e.preventDefault();
        $('.nav-section').height('54px');
	var th=$(this).closest('.nav-section');
        console.log($(th).find(".sub-links a").length);
            th.height((($(th).find(".sub-links a").length)+1)*54+"px");
    });
}
function scroll(){
   $('.scroll').jScrollPane();
}
function listas(){
    $('.item-tab h4').click(function(e){
        e.preventDefault();
        var padre=$(this).closest('.tab-main');
        var actual=$(this).parent();
        $(padre).find('.item-tab').removeClass('active');
        $(actual).addClass('active');
        $(padre).find('.tab-content').slideUp();
        $(actual).find('.tab-content').slideDown();
        $(padre).find('.icon').removeClass('up-arrow').addClass('down-arrow');
        $(actual).find('.icon').removeClass('down-arrow').addClass('up-arrow');
    });
}
function file(){
    document.querySelector('#botonFile').addEventListener('click', function(e) {
        document.querySelector('#inputFile').click();
}, false);
}

function menu(){
   function goToByScroll(id){
      // Remove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top-78},
        'slow');
}

$(".nav-section a").click(function(e) { 
      // Prevent a page reload when a link is pressed
    e.preventDefault(); 
      // Call the scroll function
    goToByScroll($(this).attr("href"));           
});
}
