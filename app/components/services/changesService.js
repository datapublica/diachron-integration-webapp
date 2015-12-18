class Changes {
    constructor($http){
        this.http = $http;
    }

    function

    search(dataset, db, from, to, filter, offset, limit) {
        filter = filter || {};
        return this.http.post('/api/changes/' + dataset + '/' + db, filter, { params: {
//            fromVersion: from,
//            toVersion: to,
            p: offset,
            s: limit
        }}).then(response => response.data);
    }

    hide(dataset, db, key, value) {
        return this.http.delete('/api/changes/' + dataset + '/' + db
            + '?key=' + encodeURIComponent(key)
            + '&value=' + encodeURIComponent(value)
        ).then(response => response.data);
    }

    static instance($http){
        return new Changes($http);
    }
}

angular.module('diachron').service('Changes', Changes.instance);

export default 'Changes';
