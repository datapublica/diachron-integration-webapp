
import angular from 'angular';

require('./highchart.styl');

function highchart($parse, $timeout) {
    var Highcharts = require('highcharts-commonjs');
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function (scope, element, attrs) {
            var config = $parse(attrs.config)(scope);
            Highcharts.createChart(element[0], config);
        }
    };
}

export default angular.module('diachron').directive('highchart', highchart).name;
