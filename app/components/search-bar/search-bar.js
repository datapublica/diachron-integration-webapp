export default ngModule => {

    ngModule.directive('searchBar', ($state) => {
        require('./search-bar.styl');
        return {
            restrict: 'E',
            scope: {
                float: '='
            },
            template: require('./search-bar.html'),
            controllerAs: 'SearchBar',
            controller: function ($scope, $location) {
                const ctrl = this;

                ctrl.float = angular.isDefined($scope.float) ? $scope.float : true;
                ctrl.query = $location.search().q || '';
                ctrl.searchQuery = (query) => {
                    if(angular.isDefined(query) && query.trim() !== ''){
                        $state.go('search', {q: query});
                    }
                };
            }
        };
    });
};