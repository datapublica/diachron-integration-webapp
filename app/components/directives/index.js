export default ngModule => {
    require('./search-bar')(ngModule);
    require('./search-result')(ngModule);
    require('./highcharts')(ngModule);
    require('./checkbox-chart')(ngModule);
};