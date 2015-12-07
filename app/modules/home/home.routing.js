export default ($stateProvider) => {
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                "@": {
                    template: require('./home.html'),
                    controller: 'HomeController',
                    controllerAs: 'Home'
				},
				'navbar@': {
					template: require('../navbar/navbar.html'),
					controller: 'NavbarController',
					controllerAs: 'Navbar'
                }
			}, resolve: {
				datasets : ($stateParams, $state, $timeout, Metadata) => {
					return Metadata.get();
				}

			}
        });
}