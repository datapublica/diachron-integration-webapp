export default ($stateProvider) => {
    $stateProvider
        .state('search', {
            url: '/recherche?q',
            views: {
                '@': {
                    template: require('./search.html'),
                    controller: 'SearchController',
                    controllerAs: 'Search'
                },
                'navbar@': {
                    template: require('../navbar/navbar.html'),
                    controller: 'NavbarController',
                    controllerAs: 'Navbar'
                }
            },
            resolve: {
                searchResults: ($stateParams, $state, $timeout, SearchService) => {
                    if(angular.isUndefined($stateParams.q) || $stateParams.q.trim() === ''){
                        //redirection if no query
                        $timeout(function() {
                            $state.go('home')
                        });
                    } else {
                        return SearchService.search($stateParams.q);
                    }
                }
            }
        });
}