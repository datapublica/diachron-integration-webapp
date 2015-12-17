class Changes {
    constructor($http){
        this.http = $http;
    }

    search(dataset, db, from, to, filter, offset, limit) {
        filter = filter || {};
        return this.http.post('/api/changes/' + dataset + '/' + db, filter, { params: {
//            fromVersion: from,
//            toVersion: to,
            p: offset,
            s: limit
        }}).then(response => response.data);
    }

    static instance($http){
        return new Changes($http);
    }
}

angular.module('diachron').service('Changes', Changes.instance);

export default 'Changes';
