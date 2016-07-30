(function () {
    'use strict';
    angular.module('gdsApp')
        .service('SchoolResourceService', SchoolResourceService);
    SchoolResourceService.$inject = ['$resource', 'CONFIG_HOST', 'SCHOOL_CONTEXT', 'SCHOOL_KEY'];

    function SchoolResourceService($resource, CONFIG_HOST, SCHOOL_CONTEXT, SCHOOL_KEY) {
        var configResource = $resource(CONFIG_HOST + SCHOOL_CONTEXT + ':action');

        return {
            getSchool: getSchool
        };

        function getSchool(callback) {
            return configResource.get({
                    action: SCHOOL_KEY
                },
                function (data) {
                    callback(undefined, data);
                },
                function (err) {
                    callback(err);
                });
        }
    }
})();