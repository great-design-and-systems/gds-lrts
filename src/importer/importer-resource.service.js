(function() {
    'use strict';
    angular.module('app.importer')
        .service('ImporterResourceService', ImporterResourceService);
    ImporterResourceService.$inject = ['$resource', 'API_HOST', 'IMPORT_CONTEXT'];

    function ImporterResourceService() {

    }
})();