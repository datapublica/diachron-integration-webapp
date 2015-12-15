export default ngModule => {
    require('./services')(ngModule);
    require('./directives')(ngModule);
};