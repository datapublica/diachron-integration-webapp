class Changes {
    constructor($http){
        this.http = $http;
    }

    get(dataset, from, to) {
        return this.http.get('/api/change/' + dataset, { params: {
            fromVersion: from,
            toVersion: to
        }}).then(response => response.data);
    }

    static instance($http){
        return new Changes($http);
    }
}

angular.module('diachron').service('Changes', Changes.instance);

export default 'Changes';