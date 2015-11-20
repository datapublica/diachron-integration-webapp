export default ngModule => {
    require('./search-bar')(ngModule);
    require('./search-result')(ngModule);
    require('./services')(ngModule);
};