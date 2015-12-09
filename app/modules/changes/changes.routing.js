export default ($stateProvider) => {
    $stateProvider
        .state('changes', {
            url: '/changes/{dataset}?from&to&type&measure&dimension&offset&limit',
            views: {
                "@": {
                    template: require('./changes.html'),
                    controller: 'ChangesController',
                    controllerAs: 'Changes'
				},
				'navbar@': {
					template: require('../navbar/navbar.html'),
					controller: 'NavbarController',
					controllerAs: 'Navbar'
                }
			}, resolve: {
                dataset: ($stateParams, Metadata) => {
                    return Metadata.get($stateParams.dataset);
                },
                changes: ($stateParams, Changes) => {
                    return Changes.search($stateParams.dataset, "0", "1", {
                        type: $stateParams.type,
                        measure: $stateParams.measure,
                        dimension: $stateParams.dimension
                    }, $stateParams.offset, $stateParams.limit);
                }

			}
        });
}