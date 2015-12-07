class SearchService {
    constructor($http){
        this.http = $http;
    }

    search(query) {
        return this.http.post('/api/search', {query: query, page:0});
    }

    static searchService($http){
        return new SearchService($http);
    }
}

angular.module('diachron').service('SearchService', SearchService.searchService);

export default 'searchService';