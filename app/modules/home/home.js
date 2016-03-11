export default class HomeController {
    constructor(datasets, Changes, Metadata) {
        var ctrl = this;
        ctrl.selectedItem = null;
        ctrl.selectedVersion = null;
        ctrl.datasets = datasets;
        ctrl.selectVersion = (item, version) => {

            if (ctrl.selectedVersion) {
                ctrl.selectedVersion.selected = false;
            }
            version.selected = true;

            ctrl.selectedVersion = version;
            ctrl.selectedItem = item;

            // get version details
            Changes.search(item.uri, version.id - 1, version.id).then(changes => {
                ctrl.changes = changes;
            });
            Metadata.quality(item.name, version.id).then(quality => {

                ctrl.qualityChartConfig = {
                    chart: {
                        type: 'bar',
                        width: 400
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        enabled: true,
                        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}%</b><br/>' +
                        '<span style="color:{point.color}">\u25CF</span> Group: <b>{point.base.group}</b><br/>'+
                        '<span style="color:{point.color}">\u25CF</span> Category: <b>{point.base.category}</b><br/>'+
                        '<span style="color:{point.color}">\u25CF</span> Date: <b>{point.base.date}</b><br/>',
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    },

                    series: [{
                        name: "Quality Metrics",
                        data: quality.map(f => {
                            return {
                                y: f.value*100,
                                base: f
                            }
                        })
                    }],
                    plotOptions: {

                        bar: {
                            dataLabels: {
                                enabled: true,
                                align: "left",
                                inside: true,
                                verticalAlign: "middle",
                                color: "black",
                                overflow: "none",
                                y: -2,
                                crop: false,
                                formatter: function() {
                                    return this.x;
                                }
                            },
                            pointPadding: 0,
                            groupPadding: 0.1
                        }
                    },
                    xAxis: {
                        categories: quality.map(f => f.type),
                        labels: {
                            enabled: false,
                            step: 1
                        },
                        tickmarkPlacement: "on"
                    },
                    yAxis: {
                        title: {
                            text: null
                        },
                        gridLineWidth:0
                    },
                    title: {
                        text: null
                    }
                };
            });
        };
        ctrl.toggle = (item) => {
            item.expanded = !item.expanded;
        }
    }
}