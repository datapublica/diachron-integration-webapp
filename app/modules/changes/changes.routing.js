export default ($stateProvider) => {
    $stateProvider
        .state('changes', {
            url: '/changes/{dataset}?from&to&type&measure&dimension&offset&limit&property&measure_val&value',
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
                        measure_val: $stateParams.measure_val,
                        dimension: $stateParams.dimension,
                        property: $stateParams.property,
                        value: $stateParams.value
                    }, $stateParams.offset, $stateParams.limit);
                }

			}
        });
}