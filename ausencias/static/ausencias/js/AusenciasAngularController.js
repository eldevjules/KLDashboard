'use strict';

function AusenciasAngularController($scope, $http){


}

var time=30;
var cont=0;
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

function MiasAngularController($scope, $http){


  $('.progress').each(function(index){
    progreso($(this).attr('id'));
  });

}

function HistorialAngularController($scope, $http){


}

function NotificacionesAngularController($scope, $http){


}

function EquipoAngularController($scope, $http){


}

function ReglasAngularController($scope, $http){


}

function AdminAngularController($scope, $http){


}
