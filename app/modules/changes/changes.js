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

		function toggleFilter(attr) {
			var values = $location.search()[attr] || [];
			var i = values.indexOf(this.category);
			if (i >= 0) {
				values.splice(i, 1);
			} else {
				values.push(this.category);
			}
			$location.search(attr, values);
			$scope.$apply();
		}


		var filterChartConfig = {
			chart: {
				type: 'bar',
				marginLeft: 200
			},
			legend: {
				enabled: false
			},
			tooltip: {
				enabled: false,
				style: {
					padding: 10,
					fontWeight: 'bold'
				}
			},
			plotOptions: {
				series: {
					cursor: 'pointer'
				},
				bar: {
					pointWidth: 20,
					grouping: false
				}
			},
			yAxis: {
				minTickInterval: 1
			},
			allowPointSelect: true
		};

		function toList(object) {
			var list = [];

			angular.forEach(object, (value, key) => {
				list.push({
					key: key,
					value: value
				})
			});

			return list;
		}

		function createChart(attr, facetItems, config, title) {

			if (facetItems && facetItems.length) {
				return angular.merge({
					title: {
						text: title
					},
					series: [{
						name: "occurences",
						data: facetItems.map(f => f.value)
					}],
					xAxis: {
						categories: facetItems.map(f => f.key)
//							.map(s => s.replace("http://www.data-publica.com/lod/publication/", ""))
					},
					plotOptions: {
						series: {
							point: {
								events: {
									click: function () {
										toggleFilter.apply(this, [attr]);
									}
								}
							}
						},
						bar: {
							pointWidth: 20
						}
					}
				}, config);
			} else return null;
		}

		ctrl.typeChartConfig =
			createChart("type", toList(changes.facets.types), filterChartConfig, "Change types");

		ctrl.measureChartConfig =
			createChart("measure", toList(changes.facets.parameters && changes.facets.parameters.measure),
				filterChartConfig, "Impacted measures");

		ctrl.dimensionChartConfig =
			createChart("dimension", toList(changes.facets.parameters && changes.facets.parameters.dimension),
				filterChartConfig, "Impacted dimensions");

		ctrl.measureValueChartConfig =
			createChart("measure_val", toList(changes.facets.parameters && changes.facets.parameters.measure_val),
				filterChartConfig, "Impacted measures values");

		ctrl.propertyChartConfig =
			createChart("property", toList(changes.facets.parameters && changes.facets.parameters.property),
				filterChartConfig, "Impacted properties");

		ctrl.valueChartConfig =
			createChart("value", toList(changes.facets.parameters && changes.facets.parameters.value),
				filterChartConfig, "Impacted values");
	}
}