class UtilsService {
    constructor(){
    }

    getFormattedCompanyName(name) {
        name = name.replace(/[\W_]+/g,"-");
        return name;
    }

    static utilsService(){
        return new UtilsService();
    }
}

angular.module('utilsService', [])
    .service('UtilsService', UtilsService.utilsService);

export default 'utilsService';