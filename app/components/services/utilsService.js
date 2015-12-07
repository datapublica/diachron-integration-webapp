class Utils {
    constructor(){
    }

    getFormattedCompanyName(name) {
        name = name.replace(/[\W_]+/g,"-");
        return name;
    }

    static instance(){
        return new Utils();
    }
}

angular.module('diachron').service('Utils', Utils.instance);

export default 'Utils';