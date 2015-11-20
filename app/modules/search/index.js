import angular from 'angular';

require("./search.styl");

export default angular.module('search', [require('../navbar')])
    .config(require('./search.routing'))
    .controller('SearchController', require('./search.js'))
    .name;
