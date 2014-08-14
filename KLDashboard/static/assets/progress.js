var time=25;
var cont=0;
$(function() {
   $('#indicadores .progress').each(function(index){
       progreso($(this).attr('id'));
   });
});

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
