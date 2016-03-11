class Metadata {
    constructor($http){
        this.http = $http;
    }

    get(id) {
        return this.http.get(id ? '/api/meta/' + id : '/api/meta').then(response => response.data);
    }

    quality(id, version) {
        return this.http.get('/api/archive/' + id + '/quality'+(version?("?versionId="+version):"")).then(response => response.data);
    }

    static instance($http){
        return new Metadata($http);
    }
}

angular.module('diachron').service('Metadata', Metadata.instance);

export default 'Metadata';