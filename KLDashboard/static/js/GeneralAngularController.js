'use strict';

angular.module('KLDashboardClient.general').controller('GeneralAngularController', ['$scope', '$rootScope', '$location', 'Global', function ($scope, $rootScope, $location, Global) {

    $scope.global = Global;
    $scope.dashboardModule = "";
    $scope.activeItem = '';

    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
       $scope.dashboardModule = "Directorio";
       $scope.activeItem = 'directorio';
    })


    if(window.location.pathname != '/'){

      $('.nav-section').height('42px');
      $('.sub-links a').filter(function(){
          if ($(this).prop('href').indexOf(location.pathname) != -1){
            $(this).parent().parent().find('h2 a').addClass('active');
          };
      });

      var itemactivo = $('a.active');
      var th= itemactivo.closest('.nav-section');
      th.height( ( ($(th).find(".sub-links a").length)*40 ) + 42 +"px" );
      if($('a.active').parent().parent().parent().offset()){
        $('.hov').css({ top: $('a.active').parent().parent().offset().top - $('a.active').parent().parent().parent().offset().top });
      }
    }

   $('.nav-section').on('mouseenter',function(){
	    $('.hov').css({ top: $(this).offset().top - $(this).parent().offset().top });
   });

   $('.nav').on('mouseout', function(){
	    $(this).find('.nav-section').each(function(index){
	       if($(this).height()>42){

            //$('.hov').css({top:$('.nav-section').eq(index).offset().top - ($('.nav-section').height()+20)});
        	  $('.hov').css({ top: $(this).offset().top - $(this).parent().offset().top });
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
      $('.nav-section').height('42px');
      var th=$(this).closest('.nav-section');
      th.height( ( ($(th).find(".sub-links a").length)*40 ) + 42 +"px" );
   });

}]);
