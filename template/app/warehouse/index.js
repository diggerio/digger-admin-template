var modulename = module.exports = 'dryhire.warehouse';

angular
  .module(modulename, [
    require('digger-admin'),
    'ngRoute'
  ])

  
  .config(function($routeProvider){

    $routeProvider

      .when('/', {
        templateUrl: "/admin/views/dashboard.html",
        controller:'DashboardCtrl'
      })

      .when('/products', {
        templateUrl: "/admin/views/products.html",
        controller:'ProductsCtrl'
      })

      .when('/editor', {
        templateUrl: "/admin/views/editor.html",
        controller:'EditorCtrl'
      })


  })

  .controller('BaseCtrl', function($scope){
    $digger.blueprint.loadstatic([
      '/blueprints/shop.xml'
    ])
  })

  .controller('DashboardCtrl', function($scope){
    console.log('-------------------------------------------');
    console.log('DashboardCtrl');
  })

  .factory('$iconfn', function(){
    return function(container){
      if(!container){
        return 'fa-folder';
      }
      if(container.is('folder')){
        return 'fa-folder';
      }
      else if(container.is('_supplychain')){
        return 'fa-sitemap';
      }
      return 'fa-cog';
    }
  })

  .factory('$blueprintfn', function(){
    return function(container){

      if(container.is('folder') || container.is('_supplychain')){
        return [
          $digger.blueprint.get('folder'),
          $digger.blueprint.get('dehumidifier')
        ]  
      }
      else{
        return [];
      }
      
    }
  })

  .controller('ProductsCtrl', function($scope, $iconfn, $blueprintfn){
    
    $scope.products = $digger.connect('/wholesaler/products');
    $scope.products.attr('title', 'Products');

    $scope.settings = {
      showchildren:false,
      showdigger:true,
      showjson:true,
      shownav:false,
      showbuttons:false,
      showadd:true,
      blueprintfn:$blueprintfn,
      iconfn:$iconfn
    } 

  })

  .controller('EditorCtrl', function($scope, $iconfn, $blueprintfn){
    
    //$scope.products = $digger.connect('/wholesaler/products');
    //$scope.products.attr('title', 'Products');

    $scope.warehouse = $digger.connect('/wholesaler/products');
    $scope.warehouse.attr('name', 'Products');

    $scope.settings = {
      showchildren:true,
      showdigger:true,
      showjson:true,
      shownav:true,
      showbuttons:true,
      showadd:true,
      blueprintfn:$blueprintfn,
      iconfn:$iconfn
    } 

  })

  .directive('resourceSummary', function($safeApply){

    //field.required && showvalidate && containerForm[field.name].$invalid
    return {
      restrict:'EA',
      scope:{
        container:'=',
        settings:'='
      },
      replace:true,
      transclude:true,
      templateUrl: "/admin/views/resourcesummary.html",
      controller:function($scope){
        
      },
      link:function($scope, $elem, $attrs){
        
      }
    }
  })

  .directive('resourceIcon', function($safeApply){

    //field.required && showvalidate && containerForm[field.name].$invalid
    return {
      restrict:'EA',
      scope:{
        container:'=',
        settings:'='
      },
      replace:true,
      transclude:true,
      templateUrl: "/admin/views/resourceicon.html",
      controller:function($scope){
        
      },
      link:function($scope, $elem, $attrs){
        
      }
    }
  })
