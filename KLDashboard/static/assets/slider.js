$(function() {
  equipo();
});

function equipo(){
    console.log("LLamando a quipo");
    $('#equipoSlider').bxSlider({
        minSlides: 2,
        maxSlides: 2,
        slideWidth: 250,
        slideMargin: 0,
        pager:false
    });
}
