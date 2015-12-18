export default class NavbarController {
    constructor($scope, $state) {
        $scope.logo = require("../../assets/img/logo.png");
        $scope.title = '';
        switch($state.current.name) {
            case 'changes' : $scope.title = 'Change exploration'; break;
            case 'home' : $scope.title = 'Datasets'; break;
        }
    }
}