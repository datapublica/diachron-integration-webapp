export default ($stateProvider) => {
    $stateProvider
        .state('changes', {
            url: '/changes/{dataset}/{db}?from&to&offset&limit&types&joinTypes&measure&dimension&property&measure_val&value',
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
                db: ($stateParams) => $stateParams.db,
                changes: ($stateParams, $rootScope, Changes) => {
                    $rootScope.loading = true;
                    return Changes.search($stateParams.dataset, $stateParams.db, $stateParams.from, $stateParams.to, {
                        types: $stateParams.types,
                        joinTypes: $stateParams.joinTypes,
                        measure: $stateParams.measure,
                        measure_val: $stateParams.measure_val,
                        dimension: $stateParams.dimension,
                        property: $stateParams.property,
                        value: $stateParams.value
                    }, $stateParams.offset, $stateParams.limit)
                        .finally(() => $rootScope.loading = false);
                }

			}
        });
}