'use strict';

function DirectorioAngularController($scope, $http, Tools){

    $scope.usuarios = [];
    $scope.usuariosAdmin = [];
    $scope.person = [];
    $scope.personRols = [];
    $scope.roles = [];

    var infoFecha = Tools.comboFecha();

    $scope.years = infoFecha.anios;
    $scope.months = infoFecha.meses;
    $scope.days = infoFecha.dias;

}

function DirectorioListAdminAngularController( $scope, $http ){

    // Consultamos los usuarios
    $http.get('persons-admin').success(function(data, status, headers, config){
        if( data ){
            angular.forEach( data.persons, function(persona, index) {

                persona.birth_date = moment( persona.birth_date ).format( 'D-MMM', 'es' );
                persona.admission_date = moment( persona.admission_date ).format( 'DD-MM-YY', 'es' );
                // $scope.usuariosAdmin.push(persona);

            });
            $scope.usuariosAdmin = data.persons;
        }
    }).error(function(data, status, headers, config) {
        console.log( 'Error :: Consulta Usuarios' );
    });


}

function DirectorioListAngularController( $scope, $http ){

    // Iniciamos los filtradores
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

    // Consultamos los usuarios
    $http.get('persons').success(function(data, status, headers, config){
        if( data ){
            angular.forEach( data.persons, function(persona, index) {

                persona.birth_date = moment( persona.birth_date ).format( 'D-MMM', 'es' );
                persona.admission_date = moment( persona.admission_date ).format( 'DD-MM-YY', 'es' );

            });
            $scope.usuarios = data.persons;
        }
    }).error(function(data, status, headers, config) {
        console.log( 'Error :: Consulta Usuarios' );
    });

}

function DirectorioEdicionAngularController($scope, $http, $state, $stateParams){
    var x;

    // Consultamos los roles
    $http.get('rols').success(function(data, status, headers, config){
        if( data ){
            $scope.roles = data.rols
            // Seteamos la opcion 0
            $scope.selectRoles = $scope.roles[0];

            $http.post('person-admin/', $stateParams).success(function(data, status, headers, config){
                if( data ){
                    $scope.personRols = data.rols;
                    $scope.person = data.person;
                    $scope.person.admission_date = moment.utc( data.person.admission_date ).format( 'YYYY-MM-DD', 'es' );
                    $scope.asignaDatos( $scope.person );
                }
            }).error(function(data, status, headers, config) {
                console.log( 'Error :: Consulta Usuarios' );
            });
        }else{
            $state.go( 'directorio.listaAdmin' );
        }

    }).error(function(data, status, headers, config) {
        console.log( 'Error :: Consulta Roles' );
    });

    // ========== Controles Roles y Permisos ========== //

    $scope.agregaRol = function(){
        var index = -1;

        // Revisamos que no lo tengamos ya
        for( x = 0; x < $scope.personRols.length; x++ ){
            if( $scope.personRols[x].value == $scope.selectRoles.value ){
                index = x;
                break;
            }
        }

        if( index == -1 ){
            index = -1;
            // Buscamos el registro en el arreglo
            for( x = 0; x < $scope.roles.length; x++ ){
                if( $scope.roles[x].value == $scope.selectRoles.value ){
                    index = x;
                    break;
                }
            }

            if( index != -1 ){
                $scope.personRols.push( $scope.roles[index] );
            }
        }else{
            $scope.selectRoles = $scope.roles[0];
        }
    };

    $scope.quitaRol = function( value ){
        var index = -1;
        for( x = 0; x < $scope.personRols.length; x++ ){
            if( $scope.personRols[x].value == value ){
                index = x;
                break;
            }
        }

        if( index != -1 ){
            index = -1;
            $scope.personRols.splice( index, 1 )
        }
    };

    $scope.asignaQuitaRol = function( rol, perm ){
        var index = -1;
        for( x = 0; x < $scope.personRols.length; x++ ){
            if( $scope.personRols[x].value == rol ){
                index = x;
                break;
            }
        }

        if( index != -1 ){
            var indexP = -1;
            for( x = 0; x < $scope.personRols[index].permissions.length; x++ ){
                if( $scope.personRols[index].permissions[x].id == perm ){
                    indexP = x;
                    break;
                }
            }
            if( $scope.personRols[index].permissions[indexP].selected ){
                $scope.personRols[index].permissions[indexP].selected = false;
            }else{
                $scope.personRols[index].permissions[indexP].selected = true;
            }
        }
    };

    //Asigna fechas info usuario
    $scope.asignaDatos = function( person ){
        var fn = person.birth_date.split('-');
        var fa = person.admission_date.split('-');

        // Asignacion fecha de nacimiento
        angular.forEach( $scope.years, function(year, index) {
            if( String(year.label) === String(fn[0]) ){
                $scope.birth_year = $scope.years[index];
            }
        });
        angular.forEach( $scope.months, function(months, index) {
            if( String(months.value) === String(fn[1]) ){
                $scope.birth_month = $scope.months[index];
            }
        });
        angular.forEach( $scope.days, function(day, index) {
            if( String(day.label) === String(fn[2]) ){
                $scope.birth_day = $scope.days[index];
            }
        });

        // Asignacion fecha ingreso
        angular.forEach( $scope.years, function(year, index) {
            if( String(year.label) === String(fa[0]) ){
                $scope.entry_year = $scope.years[index];
            }
        });
        angular.forEach( $scope.months, function(month, index) {
            if( String(month.value) === String(fa[1]) ){
                $scope.entry_month = $scope.months[index];
            }
        });
        angular.forEach( $scope.days, function(day, index) {
            if( String(day.label) === String(fa[2]) ){
                $scope.entry_day = $scope.days[index];
            }
        });
    }

    //Guardar usuario
    $scope.submitUsuario = function(){
        // Ejecutamos la actualizacion solo si el form es valido
        if( $scope.userForm.$valid ){
            $scope.person.birth_date = $scope.birth_year.value +'-'+ $scope.birth_month.value +'-'+ $scope.birth_day.value;
            $scope.person.admission_date = $scope.entry_year.value +'-'+ $scope.entry_month.value +'-'+ $scope.entry_day.value;

            if( typeof($scope.person.id) != 'undefined' ){
                var id = $scope.person.id;
            }else{
                var id = '';
            }

            var obj = {
                id: id,
                admission_date: $scope.person.admission_date,
                area: $scope.person.area,
                avatar: $scope.person.avatar,
                birth_date: $scope.person.birth_date,
                boss: $scope.person.boss,
                company: $scope.person.company,
                email: $scope.person.email,
                gender: $scope.person.gender,
                job: $scope.person.job,
                job_time: $scope.person.job_time,
                kamikaze_number: $scope.person.kamikaze_number,
                maternal_surname: $scope.person.maternal_surname,
                names: $scope.person.names,
                paternal_surname: $scope.person.paternal_surname,
                phone: $scope.person.phone,
                status: $scope.person.status,
                twitter: $scope.person.twitter,
                roles: '',
                permissions: ''
            }

            for( x = 0; x < $scope.personRols.length; x++ ){
                if( obj.roles == '' ){
                    obj.roles = $scope.personRols[x].value
                }else{
                    obj.roles = $scope.personRols[x].value + ',' + obj.roles
                }
                for( var y = 0; y < $scope.personRols[x].permissions.length; y++ ){
                    if( $scope.personRols[x].permissions[y].selected ){
                        if( obj.permissions == '' ){
                            obj.permissions = $scope.personRols[x].permissions[y].id
                        }else{
                            obj.permissions = $scope.personRols[x].permissions[y].id + ',' + obj.permissions
                        }
                    }
                }
            }

            $http.post('submit-person/', obj ).success(function(data, status, headers, config){
                if( data.response ){
                    $state.go( 'directorio.listaAdmin' );
                }else{
                    alert( data.msg );
                }
            }).error(function(data, status, headers, config) {
                console.log( 'Error :: Edicion Usuarios' );
            });
        }
    };

    $scope.cancelarUsuario = function(){
        $state.go( 'directorio.listaAdmin' );
    };
}
