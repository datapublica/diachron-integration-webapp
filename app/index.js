const angular = require('angular');

if(ON_TEST){
    require('angular-mocks/angular-mocks');
}

require('angular-material/angular-material.css');
require('./variables.styl');

const ngModule = angular.module('diachron', [
	require('ui-router/release/angular-ui-router'),
	require('angular-material'),
	require('./modules/home'),
	require('./modules/navbar'),
	'ngLocale'
])
	.config(require('./app'))
	.run(($rootScope, $log) => {

		$rootScope.$on("$stateChangeStart", () => {
			$rootScope.changingState = true;
		});

		$rootScope.$on("$stateChangeSuccess", () => {
			$rootScope.changingState = false;
		});

		$rootScope.$on("$stateChangeError", (event, toState, toParams, fromState, fromParams, error) => {
			$rootScope.changingState = false;
			$log.error("state change error: ", error);
		});
	});

require('./components')(ngModule);
require('./config')(ngModule);