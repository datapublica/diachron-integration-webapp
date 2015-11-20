import angular from 'angular';

require("./home.styl");

export default angular.module('home', [])
        .config(require('./home.routing'))
        .controller('HomeController', require('./home.js'))
        .name;
