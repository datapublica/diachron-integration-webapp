export default ngModule => {
    require('./angular-material/palette')(ngModule);
    require('./locale/angular-locale_fr-fr.js');
    require('./d3js/d3.config')(ngModule);
};
