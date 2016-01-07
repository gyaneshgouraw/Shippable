angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
		    templateUrl: 'module1/dashboard.html',
		    controller: 'DashboardController'
		})

		.when('/dashboard', {
		    templateUrl: 'module1/dashboard.html',
		    controller: 'DashboardController'
		})

		.when('/aboutme', {
		    templateUrl: 'module2/home.html',
		    controller: 'MainController'
		})
     .otherwise({
         redirectTo: '/'
     });

	$locationProvider.html5Mode(true);

}]);

