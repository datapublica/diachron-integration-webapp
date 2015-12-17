import angular from 'angular';

require("./navbar.styl");


export default angular.module('navbar', [])
    .controller('NavbarController', require('./navbar.js'))
    .name;