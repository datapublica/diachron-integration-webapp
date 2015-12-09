export default class ChangesController {
    constructor(dataset, changes, $location, $scope) {
		var ctrl = this;
		ctrl.dataset = dataset;
		ctrl.changes = changes;

		ctrl.search = (item, version) => {

			if (ctrl.selectedVersion) {
				ctrl.selectedVersion.selected = false;
			}
			if (ctrl.selectedItem) {
				ctrl.selectedItem.selected = false;
			}
			version.selected = true;
			ctrl.selectedVersion = version;
			ctrl.selectedItem = item;

			// get version details
			Changes.get(item.uri, version.id - 1, version.id).then(changes => {
				ctrl.changes = changes;
			})

		};

		var typeChartConfig = {
			chart: {
				type: 'bar'
			},
			tooltip: {
				style: {
					padding: 10,
					fontWeight: 'bold'
				}
			},
			plotOptions: {
				series: {
					cursor: 'pointer',
					point: {
						events: {
							click: function () {
								var t = $location.search().type || [];
								var i = t.indexOf(this.category);
								if (i >= 0) {
									t.splice(i, 1);
								} else {
									t.push(this.category);
								}
								$location.search("type", t);
								$scope.$apply();
							}
						}
					}
				}
			}
		};

		var typeFacets = [];
		angular.forEach(changes.facets.type, (value, key) => {
			typeFacets.push({
				key: key,
				value: value
			})
		});
		ctrl.typeChartConfig = angular.extend({
			series: [{
				name: "occurences",
				data: typeFacets.map(f => f.value)
			}],
			xAxis: {
				categories: typeFacets.map(f => f.key)
			}
		}, typeChartConfig);


    }
}