angular.module('KLDashboardClient.directorio').factory('Tools', [function() {
    return{
        comboFecha: function(){
            var fecha_actual = new Date();
            var x = 0;
            var dias = [];
            var anios = [];
            var meses = [
                {value: '01', label: 'enero'},
                {value: '02', label: 'febrero'},
                {value: '03', label: 'marzo'},
                {value: '04', label: 'abril'},
                {value: '05', label: 'mayo'},
                {value: '06', label: 'junio'},
                {value: '07', label: 'julio'},
                {value: '08', label: 'agosto'},
                {value: '09', label: 'septiembre'},
                {value: '10', label: 'octubre'},
                {value: '11', label: 'noviembre'},
                {value: '12', label: 'diciembre'}
            ];
            var index = '';
            var anioActual = fecha_actual.getFullYear();
            var anio = '';
            for( x = 1; x < 32; x++){
                if( x < 10 ){
                    dias.push( { value: '0' + x, label: '0' + x } );
                }else{
                    dias.push( { value: x, label: x } );
                }
            }
            for( x = 35; x > 0; x-- ){
                anio = anioActual--;
                anios.push( { value: anio, label: anio } );
            }

            var info = { dias : dias, meses: meses, anios: anios };

            return info;
        },
        comboHora: function(){
            var horas = [];
            var minutos = [];
            var segundos = [];
            var x = 0;

            for( x = 0; x < 25; x++){
                if( x < 10 ){
                    horas.push( { value: '0' + x, label: '0' + x } );
                }else{
                    horas.push( { value: x, label: x } );
                }
            }

            for( x = 0; x < 60; x++){
                if( x < 10 ){
                    minutos.push( { value: '0' + x, label: '0' + x } );
                    segundos.push( { value: '0' + x, label: '0' + x } );
                }else{
                    minutos.push( { value: x, label: x } );
                    segundos.push( { value: x, label: x } );
                }
            }

            var info = { horas : horas, minutos: minutos, segundos: segundos };
            return info;
        }
    };
}]);