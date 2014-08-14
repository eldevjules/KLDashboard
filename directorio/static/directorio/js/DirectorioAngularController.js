'use strict';

function DirectorioAngularController($scope, $http, Tools){
    $scope.fechaModule = 'nola'
    $scope.usuarios = [];
    $scope.usuariosAdmin = [];

}

function DirectorioListAdminAngularController( $scope, $http, Tools ){
    
}

function DirectorioListAngularController( $scope, $http, Tools ){
    $scope.sections = [ 
    { label: 'Todas', value: '' },
    { label: 'Administración', value: 'Administracion' },
    { label: 'Agencia', value: 'Agencia' },
    { label: 'Laboratorio', value: 'Laboratorio' } ];
    $scope.filter_section = $scope.sections[0];

    $scope.areas = [ 
    { label: 'Todos', value: '' },
    { label: 'Estrategia', value: 'Estrategia' },
    { label: 'Diseño', value: 'Diseño' },
    { label: 'Dirección', value: 'Direccion' },
    { label: 'Desarrollo', value: 'Desarrollo' },
    { label: 'Recursos Humanos', value: 'Recursos Humanos' } ];
    $scope.filter_area = $scope.areas[0];
}

// function DirectorioAngularController($scope, $http, Tools){
//     moment.lang('es', {
//         months : [
//             "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
//             "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
//         ],
//         monthsMin : [
//             "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul",
//             "Ago", "Sep", "Oct", "Nov", "Dic"
//         ],
//         weekdaysMin : ["D", "L", "M", "M", "J", "V", "S"],
//         weekdays : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

//     });

//     // $scope.dashboardModule = 'Directorio';
//     $scope.fechaModule = moment().format( 'dddd D MMMM', 'es' );
//     $scope.usuarioIndex = -1;
//     $scope.usuarios = [];
//     $scope.usuario = {};
//     $scope.usuario.avatar = 'DEFAULT_MANGA.png';

//     $scope.sections = [ 
//     { label: 'Todas', value: '' },
//     { label: 'Administración', value: 'Administracion' },
//     { label: 'Agencia', value: 'Agencia' },
//     { label: 'Laboratorio', value: 'Laboratorio' } ];
//     $scope.filter_section = $scope.sections[0];

//     $scope.areas = [ 
//     { label: 'Todos', value: '' },
//     { label: 'Estrategia', value: 'Estrategia' },
//     { label: 'Diseño', value: 'Diseño' },
//     { label: 'Dirección', value: 'Direccion' },
//     { label: 'Desarrollo', value: 'Desarrollo' },
//     { label: 'Recursos Humanos', value: 'Recursos Humanos' } ];
//     $scope.filter_area = $scope.areas[0];

//     var infoFecha = Tools.comboFecha();

//     $scope.years = infoFecha.anios;
//     $scope.months = infoFecha.meses;
//     $scope.days = infoFecha.dias;

//     $http.get('api-users').success(function(data, status, headers, config){
//         if( data ){
//             angular.forEach( data, function(usuario, index) {
//                 if( !usuario.is_superuser ){
//                     usuario.birth_date = moment( usuario.birth_date ).format( 'D-MMM', 'es' );
//                     usuario.admission_date = moment( usuario.admission_date ).format( 'DD-MM-YY', 'es' );
//                     $scope.usuarios.push(usuario);
//                 }
//             });
//         }
//     }).error(function(data, status, headers, config) {
//         console.log( 'Error :: Consulta Usuarios' );
//     });

//     $scope.validador = function(actual, expected) {
//         console.log( actual + '' + expected );
//         return true;
//     }
// }

// function DirectorioAltaAngularController($scope, $http, $state){
//     // Fecha Nacimiento valores predeterminados
//     $scope.birth_day = $scope.days[0];
//     $scope.birth_month = $scope.months[0];
//     $scope.birth_year = $scope.years[0];

//     // Fecha Ingreso valores predeterminados
//     $scope.entry_day = $scope.days[0];
//     $scope.entry_month = $scope.months[0];
//     $scope.entry_year = $scope.years[0];

//     // Radio Buttons valores predeterminados
//     $scope.usuario.gender = 'F';
//     $scope.usuario.is_active = '1';
//     $scope.usuario.job_time = 'completo';

//     //Guardar usuario
//     $scope.submitUsuario = function(){
//         // Ejecutamos la actualizacion solo si el form es valido
//         if( $scope.userForm.$valid ){
//             $scope.usuario.birth_date = $scope.birth_year.value +'-'+ $scope.birth_month.value +'-'+ $scope.birth_day.value;
//             $scope.usuario.admission_date = $scope.entry_year.value +'-'+ $scope.entry_month.value +'-'+ $scope.entry_day.value;

//             $http.post('api-create-user/', $scope.usuario).success(function(data, status, headers, config){
//                 if( data.detail ){
//                     alert( data.detail );
//                 }else{
//                     if( data ){
//                         data.birth_date = moment( data.birth_date ).format( 'D-MMM', 'es' );
//                         data.admission_date = moment( data.admission_date ).format( 'DD-MM-YY', 'es' );
//                         $scope.usuarios.push( data );
//                         $state.go( 'directorio.lista' );
//                     }
//                 }
//             }).error(function(data, status, headers, config) {
//                 console.log( 'Error :: Alta Usuario' );
//             });
//         }
//     };

//     $scope.cancelarUsuario = function(){
//         $state.go( 'directorio.lista' );
//     };
// }

// function DirectorioEdicionAngularController($scope, $http, $state, $stateParams){
//     $scope.indexUsuario = -1;

//     if( $scope.usuarios.length === 0 ){
//         //Consultamos los usuarios nuevamente
//         $http.get('api-users').success(function(data, status, headers, config){
//             if( data ){
//                 $scope.usuarios = data;
//                 //En base al kamikaze_id obtenemos el usuario
//                 angular.forEach( $scope.usuarios, function(usuario, index) {
//                     if( usuario.kamikaze_number == $stateParams.id && usuario.is_superuser != 1 ){
//                         $scope.usuario = usuario;
//                         $scope.indexUsuario = index;
//                     }
//                 }, $scope.usuarios);

//                 if( $scope.indexUsuario != -1 ){
//                     $scope.asignaDatos( $scope.usuario );
//                 }else{
//                     alert( 'Usuario no localizado' );
//                     $state.go( 'directorio.lista' );
//                 }
                
//             }
//         }).error(function(data, status, headers, config) {
//             console.log( 'Error :: Consulta Usuarios' );
//         });
//     }else{
//         var url = '';
//         //En base al kamikaze_id obtenemos la url del usuario
//         angular.forEach( $scope.usuarios, function(usuario, index) {
//             if( usuario.kamikaze_number === $stateParams.id ){
//                 url = usuario.url;
//                 $scope.indexUsuario = index;
//             }
//         }, $scope.usuarios);

//         if( url !== '' ){
//             //Volvemos a consultar la infor del usuario para tener los ultimos datos
//             $http.post('api-user/', { 'url': url }).success(function(data, status, headers, config){
//                 if( data ){
//                     $scope.usuario = data;
//                     $scope.asignaDatos( $scope.usuario );
//                 }
//             }).error(function(data, status, headers, config) {
//                 console.log( 'Error :: Consulta Usuario' );
//             });
//         }else{
//             alert( 'Usuario no localizado' );
//             $state.go( 'directorio.lista' );
//         }
//     }

//     //Asigna fechas info usuario
//     $scope.asignaDatos = function( usuario ){

//         var fn = usuario.birth_date.split('-');
//         var fa = usuario.admission_date.split('-');

//         // Asignacion fecha de nacimiento
//         angular.forEach( $scope.years, function(year, index) {
//             if( String(year.label) === String(fn[0]) ){
//                 $scope.birth_year = $scope.years[index];
//             }
//         });
//         angular.forEach( $scope.months, function(months, index) {
//             if( String(months.value) === String(fn[1]) ){
//                 $scope.birth_month = $scope.months[index];
//             }
//         });
//         angular.forEach( $scope.days, function(day, index) {
//             if( String(day.label) === String(fn[2]) ){
//                 $scope.birth_day = $scope.days[index];
//             }
//         });

//         // Asignacion fecha ingreso
//         angular.forEach( $scope.years, function(year, index) {
//             if( String(year.label) === String(fa[0]) ){
//                 $scope.entry_year = $scope.years[index];
//             }
//         });
//         angular.forEach( $scope.months, function(month, index) {
//             if( String(month.value) === String(fa[1]) ){
//                 $scope.entry_month = $scope.months[index];
//             }
//         });
//         angular.forEach( $scope.days, function(day, index) {
//             if( String(day.label) === String(fa[2]) ){
//                 $scope.entry_day = $scope.days[index];
//             }
//         });
//     }

//     //Guardar usuario
//     $scope.submitUsuario = function(){
//         // Ejecutamos la actualizacion solo si el form es valido
//         if( $scope.userForm.$valid ){
//             $scope.usuario.birth_date = $scope.birth_year.value +'-'+ $scope.birth_month.value +'-'+ $scope.birth_day.value;
//             $scope.usuario.admission_date = $scope.entry_year.value +'-'+ $scope.entry_month.value +'-'+ $scope.entry_day.value;

//             $http.post('api-update-user/', $scope.usuario).success(function(data, status, headers, config){
//                 if( data.detail ){
//                     alert( data.detail );
//                 }else{
//                     alert( 'Registro actualizado con éxito' );
//                     $scope.usuario = data;
//                     $scope.usuarios[ $scope.indexUsuario ].username = data.username;
//                     $scope.usuarios[ $scope.indexUsuario ].email = data.email;
//                     $scope.usuarios[ $scope.indexUsuario ].is_active = data.is_active;
//                     $scope.usuarios[ $scope.indexUsuario ].first_name = data.first_name;
//                     $scope.usuarios[ $scope.indexUsuario ].last_name = data.last_name;
//                     $scope.usuarios[ $scope.indexUsuario ].maternal_last_name = data.maternal_last_name;
//                     $scope.usuarios[ $scope.indexUsuario ].gender = data.gender;
//                     $scope.usuarios[ $scope.indexUsuario ].birth_date = moment( data.birth_date ).format( 'D-MMM', 'es' );
//                     $scope.usuarios[ $scope.indexUsuario ].admission_date = moment( data.admission_date ).format( 'DD-MM-YY', 'es' );
//                     $scope.usuarios[ $scope.indexUsuario ].job = data.job;
//                     $scope.usuarios[ $scope.indexUsuario ].job_time = data.job_time;
//                     $scope.usuarios[ $scope.indexUsuario ].work_area = data.work_area;
//                     $scope.usuarios[ $scope.indexUsuario ].boss = data.boss;
//                     $scope.usuarios[ $scope.indexUsuario ].kamikaze_number = data.kamikaze_number;
//                     $scope.usuarios[ $scope.indexUsuario ].phone = data.phone;
//                     $scope.usuarios[ $scope.indexUsuario ].twitter = data.twitter;
//                     $scope.usuarios[ $scope.indexUsuario ].avatar = data.avatar;

//                     $state.go( 'directorio.lista' );
//                 }
//             }).error(function(data, status, headers, config) {
//                 console.log( 'Error :: Edicion Usuarios' );
//             });
//         }
//     };

//     $scope.cancelarUsuario = function(){
//         $state.go( 'directorio.lista' );
//     };
// }
