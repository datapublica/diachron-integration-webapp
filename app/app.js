export default ($urlRouterProvider, $locationProvider) => {
    if(ON_PROD) {
        //$locationProvider.html5Mode(true);
    }
    $urlRouterProvider.otherwise('/');
}