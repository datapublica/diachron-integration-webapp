(function () {
    "use strict";

    var app = angular.module('acolad');

    app.directive('checkboxChart', function () {
        require('./checkbox-chart.styl');
        return {
            scope: {
                config: '=',
                onCheck: '&'
            },
            template: require('./checkbox-chart.part.html'),
            link: function (scope) {

                scope.squareBox = !scope.config.useRadio;

                // Pre-checking boxes
                if (angular.isDefined(scope.config.selectedFilters)) {
                    // Only an array if multiple values, so we cast it to an array if it's a string(so annoying..)
                    if (typeof scope.config.selectedFilters === 'string') {
                        scope.config.selectedFilters = [scope.config.selectedFilters];
                    }
                    angular.forEach(scope.config.chartData.bins, function (value) {
                        if (scope.config.select
                                .filter(function(el) { return typeof el === 'string'})
                                .map(function(el) {return el.toLowerCase();})
                                .indexOf(value.key.toLowerCase()) < 0) {
                            return;
                        }
                        if (scope.config.selectedFilters.map(function(el) { return el.toLowerCase(); }).indexOf(value.key.toLowerCase()) > -1) {
                            //filter is selected, checking the box
                            value.checked = true;
                        }
                    });
                }

                scope.selectFilter = function (filter) {
                    filter.checked = !filter.checked;
                    filter.urlParam = scope.config.urlParam;
                    scope.onCheck({data: filter});
                };

				var maxLabelLength = 19;
				function truncateLabel(label) {
					if (label && label.length > maxLabelLength) {
						label = label.substr(0, maxLabelLength) + "..."
					}
					return label;
				}

                // d3 chart

                // We select only the bins that are desired by config.select
                //var dataset = scope.config.chartData.bins;
                //console.log(dataset);

                // Make the dataset available to draw checkboxes
                scope.dataset = scope.config.chartData.bins;

                function draw(dataset) {
                    var barHeight = 20;
                    var margin = {
                        left: 5,
                        right: 15
                    };

                    var w = 220, h = (barHeight+5) * dataset.length;

					/* Initialize tooltip */
					var tip = d3.tip()
						.attr('class', 'd3-tip blue ' + scope.config.id)
						.direction('e')
						.offset([0, 16])
						.html(function (d) {
							return d.label;
						});

					var xScale = d3.scale.linear()
                        .domain([0, d3.max(dataset, function (d) {
                            return d.count;
                        }) * 1.1])
                        .range([0, w - margin.right]);

                    var svg = d3.select('#' + scope.config.id + ' .chart').append('svg')
                        .attr('width', w - margin.right)
                        .attr('height', h);

                    svg.selectAll("*").remove();

					svg.call(tip);

					var container = svg.selectAll(".data").data(dataset).enter();

                    var bars = container
                        .append('rect')
                        .attr('class', function () {
                            return 'bar ' + scope.config.urlParam;
                        })
                        .attr('x', margin.left)
                        .attr('y', function (d, i) {
                            return i * (barHeight + 5);
                        })
                        .attr('height', barHeight)
                        .attr('width', 0)
                        .classed('hover', function (d) {
                            return d.checked; // coloring the bar if it's checked
                        });

                    bars.transition()
                        .duration(500)
                        .attr('width', function (d) {
                            return d.count > 0 ? xScale(d.count) : 0;
                        });

                    var labelText = container
                        .append("text")
                        .attr('class', function (d) {
                            return 'count ' + d.key.toLowerCase().replace(/[^a-z]+/, "-");
                        })
                        .attr("x", function () {
                            return margin.left + 12;
                        })
                        .attr('y', function (d, i) {
                            return i * 25 + 15;
                        })
                        .attr('width', function (d) {
                            return xScale(d.count) - margin.right;
                        })
                        .attr('fill', function (d) {
                            return d.count > 0 ? 'white' : '#262b40';
                        });
                    // To display the count. we need another svg element for styling purpose
                    labelText.append('tspan')
                        .text(function (d) {
                            return d.count > 0 ? d3.format(",")(d.count) + '  ' : '';
                        })
                        .classed('small', true);
                    labelText.append('tspan')
                        .text(function (d) {
                            return (truncateLabel(d.label) || d.key) + " ";
                        });

                    // we need transparent rect container on top of the bars and labels to bind the d3-tip (g won't work, and binding on text breaks on FF)
                    container
                        // same positionning as the bars but full width
                        .append('rect')
                        .attr('x', margin.left)
                        .attr('y', function (d, i) {
                            return i * (barHeight + 5);
                        })
                        .attr('height', barHeight)
                        .attr('width', w - margin.right-10)
                        .style('opacity', 0)
                        .style('cursor', 'pointer')
                        // Bar selection and tooltip manipulation
                        .on('click', function (d) {
                            scope.selectFilter(d);
                            scope.$apply(); //outside angular so digest cycle needed
                            tip.hide(d);
                        })
                        .on('mouseover', function (d) {
                            bars.classed('hover', function (bar) {
                                //adding the hover class to the right bar when hovering the text
                                return d === bar || bar.checked;
                            });
                            if (d.label) tip.show(d);
                        })
                        .on('mouseout', function (d) {
                            bars.classed('hover', function (d) {
                                return d.checked;
                            }); // we just remove the hover class from the non selected bars
                            tip.hide(d);
                        });

                    return svg;
                }

                var svg;

                scope.$watch("config.chartData.bins", function() {
                    scope.dataset = scope.config.chartData.bins;
                    if (svg) svg.remove();
                    svg = draw(scope.dataset);
                })
            }
        };
    });
})();
