export default ngModule => {
    ngModule.config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('blue-grey');
    });
}
