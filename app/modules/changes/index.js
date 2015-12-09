import angular from 'angular';

require("./changes.styl");

export default angular.module('changes', [])
        .config(require('./changes.routing.js'))
        .controller('ChangesController', require('./changes.js'))
        .name;
