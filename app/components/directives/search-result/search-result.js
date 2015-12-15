export default ngModule => {

    ngModule.directive('searchResult', () => {
        require('./search-result.styl');
        return {
            restrict: 'E',
            scope: {
                result: '='
            },
            template: require('./search-result.html'),
            controller: function (UtilsService) {
                var ctrl = this;
                ctrl.getFormattedName = (name) => {
                    return UtilsService.getFormattedCompanyName(name)
                };
            },
            controllerAs: 'SearchResult',
            bindToController: true
        };
    });
};