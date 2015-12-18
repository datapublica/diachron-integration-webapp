const angular = require('angular');

if(ON_TEST){
    require('angular-mocks/angular-mocks');
}

require('file?name=favicon.ico!./assets/img/favicon.ico');

require('angular-material/angular-material.css');
require('./variables.styl');

//require('highcharts/lib/adapters/standalone-framework');
//require('highcharts-commonjs');
//require('highcharts/lib/highcharts.src');
//require('highcharts/lib/highcharts-more');
//require('highcharts/lib/modules/exporting');
require("font-awesome-webpack");

import d3 from "d3";
import d3Tip from "d3-tip";
d3.tip = d3Tip;

const ngModule = angular.module('diachron', [
	require('ui-router/release/angular-ui-router'),
	require('angular-material'),
	require('./modules/home'),
	require('./modules/changes'),
	require('./modules/navbar'),
	'ngLocale', 'ngMaterial'
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