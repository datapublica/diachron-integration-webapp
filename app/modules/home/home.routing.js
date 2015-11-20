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
				datasets : ($stateParams, $state, $timeout, UtilsService) => {
					return [
						{
							name: "Dataset 1",
							versions: [
								{name: "Version 1", date: new Date()},
								{name: "Version 2", date: new Date()},
								{name: "Version 3", date: new Date()},
							]
						},
						{
							name: "Dataset 2",
							versions: [
								{name: "Version 1", date: new Date()},
								{name: "Version 2", date: new Date()},
								{name: "Version 3", date: new Date()},
							]
						},
						{
							name: "Dataset 3",
							versions: [
								{name: "Version 1", date: new Date()},
								{name: "Version 2", date: new Date()},
								{name: "Version 3", date: new Date()},
							]
						}
					];
				}

			}
        });
}