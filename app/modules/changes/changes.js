export default class ChangesController {
    constructor(dataset, changes, db, $location, $scope, $state, $mdDialog, $timeout, Changes) {
		var ctrl = this;
		ctrl.dataset = dataset;
		ctrl.checkboxChart = {};

		ctrl.changes = processChanges(changes);
		ctrl.selections = {};
		angular.forEach($location.search(), (value, param) => ctrl.selections[param] = value);

		ctrl.db = db;

		function refresh() {
			var params = $location.search();
			var filter = {};
			angular.forEach(params, (value, key) => {
				if (['from', 'to', 'offset', 'limit'].indexOf(key) < 0) {
					filter[key] = value;
				}
			});

			// get version details
			Changes.search(dataset.name, ctrl.db, params.from, params.to, filter, params.offset, params.limit).then(changes => {
				ctrl.changes = processChanges(changes);
				$timeout(() => $scope.$apply(), 100);
			});
		};

		function processChanges(changes) {
			if (changes.results) {
				changes.headers = changes.results.reduce((arr, el) => {
					angular.forEach(el.properties, (v, k) => {
						if (arr.indexOf(k) < 0) arr.push(k);
					});
					return arr;
				}, []);
				changes.data = changes.results.map(el => {
					var row = [];
					changes.headers.forEach(h => {
						row.push(getLabel(el.properties[h]));
					});
					return row;
				});
			}
			if (changes.facets.parameters) {
				for (var f in changes.facets.parameters) {
					changes.facets[f] = changes.facets.parameters[f];
				}
				delete changes.facets.parameters;
			}
			changes.currentPage = 0;
			return changes;
		}

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

		function getLabel(key) {
			if (!key) return key;

			var resolved = (ctrl.changes || changes).resolved[key];
			var label = (resolved && resolved.after && resolved.after.label) || (resolved && resolved.before && resolved.before.label);
			if (label) return label;

			// remove url
			var spl = key.split(/\//);
			label = spl[spl.length - 1];

			// types
			label = label.toLowerCase().replace(/_/g, " ");

			// capitalisation

			return label;
		}

		function createBins(facets, dic, truncateTo) {
			var bins = [];
			angular.forEach(facets, (value, key) => bins.push({
				key: key,
				count: value,
				label: (dic && dic[key]) || getLabel(key) || key
			}));
			return truncateTo ? bins.slice(0, truncateTo) : bins;
		}

		function remainder(facets, truncateTo) {
			// add the "others" box
			if (truncateTo && facets.length > truncateTo) {
				return facets.terms.slice(facets.truncateTo).reduce(function (count, facet) {
					count += facet.count;
					return count;
				}, 0);
			} else {
				return 0;
			}
		}

		function createCheckboxChart(param, facets, dic, truncateTo) {
			ctrl.checkboxChart[param] = {
				id: "checkbox-chart-" + param,
				urlParam: param,
				chartData: {
					bins: createBins(facets, dic || {})
				},
				select: Object.keys(facets),
				selectedFilters: $location.search()[param],
				remainder: remainder(facets, truncateTo),
				truncateTo: truncateTo
			};
		}

		/**
		 * Filters viz configs
		 */
		if(Object.keys(ctrl.changes.facets).length > 0) {
			angular.forEach(ctrl.changes.facets, (value, key) => {
				if (value && Object.keys(value).length > 0) createCheckboxChart(key, value)
			});
		}

		ctrl.checkedType = function (type) {
			var param = {};
			var currentType = $location.search()[type.urlParam];
			if(angular.isDefined($location.search().q)){
				param.q = $location.search().q;
			}
			if(angular.isUndefined(currentType) || currentType !== type.key.toLowerCase()){
				param.type = type.key.toLowerCase();
			}
			$location.search(param);
		};

		ctrl.getMoreCheckboxes = function(config) {
			config.truncateTo += 5;
			createCheckboxChart(config.urlParam, ctrl.changes.facets[config.urlParam], {}, config.truncateTo);
		};

		ctrl.filter = function (filter) {
			var params = $location.search();
			if (angular.isDefined(params[filter.urlParam])) {
				/*
				 var checkedParam = [].concat(params[filter.urlParam]);
				 if (checkedParam.indexOf(filter.key) > -1) {
				 checkedParam.splice(checkedParam.indexOf(filter.key), 1);
				 } else {
				 checkedParam.push(filter.key);
				 }
				 */
				ctrl.selections[filter.urlParam] = null;
				$location.search(filter.urlParam, filter.key);
			} else {
				ctrl.selections[filter.urlParam] = filter.key;
				$location.search(filter.urlParam, filter.key);
			}
		};

		ctrl.deleteFilter = function (filter) {
			delete ctrl.changes.facets[filter.urlParam][filter.key];
			var confirm = $mdDialog.confirm()
				.title('Hide ' + filter.key + '?')
				.content('If you confirm, changes concerning ' + filter.urlParam + ' ' + filter.key + ' will forever be hidden')
				//.targetEvent(ev)
				.ok('Hide')
				.cancel('Cancel');
			$mdDialog.show(confirm).then(function() {
				Changes.hide(ctrl.dataset.name, ctrl.db, filter.urlParam, filter.key).then(refresh);
			});
		};

		ctrl.deleteType = function (filter) {
			delete ctrl.changes.facets.types[filter.key];
			ctrl.changes.facets.joinTypes && delete ctrl.changes.facets.joinTypes[filter.key];
			var confirm = $mdDialog.confirm()
				.title('Hide change type ' + filter.key + '?')
				.content('If you confirm, ' + filter.key + ' changes will forever be hidden')
				//.targetEvent(ev)
				.ok('Hide')
				.cancel('Cancel');
			$mdDialog.show(confirm).then(function() {
				Changes.hide(ctrl.dataset.name, ctrl.db, 'type', filter.key).then(refresh);
			});
		};

		ctrl.reset = function (p) {
			var params = $location.search();
			if (p) {
				if (typeof p === 'string') {
					p = [p];
				}
				p.forEach(s => delete params[s])
			} else {
				for (var param in params) {
					if (param !== 'q') {
						delete params[param];
					}
				}
			}
			$location.search(params);
		};

		var dico = {
		};

		ctrl.getFacetName = function (param, key) {
			return dico[param] && dico[param][key];
		};

		ctrl.paginate = function(pageNumber) {

		};

		ctrl.selectDB = function() {
			$state.go('changes', {
				dataset: ctrl.dataset.name,
				db: ctrl.db
			});
		}

	}
}