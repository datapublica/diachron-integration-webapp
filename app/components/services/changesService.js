class Changes {
    constructor($http){
        this.http = $http;
    }

    search(dataset, from, to, filter, offset, limit) {
        filter = filter || {};
        return this.http.post('/api/meta/changes/' + dataset, filter, { params: angular.extend({
//            fromVersion: from,
//            toVersion: to,
            offset: offset,
            limit: limit
        }, filter)}).then(response => response.data);
    }

    static instance($http){
        return new Changes($http);
    }
}

angular.module('diachron').service('Changes', Changes.instance);

export default 'Changes';
