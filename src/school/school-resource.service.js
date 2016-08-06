(function () {
    'use strict';
    angular.module('gdsApp')
        .service('SchoolResourceService', SchoolResourceService);
    SchoolResourceService.$inject = ['$resource', 'API_HOST', 'SCHOOL_CONTEXT', 'SCHOOL_ID'];

    function SchoolResourceService($resource, API_HOST, SCHOOL_CONTEXT, SCHOOL_ID) {
        var configResource = $resource(API_HOST + SCHOOL_CONTEXT + ':action?param=schoolId::schoolId');

        return {
            getSchool: getSchool
        };

        function getSchool(callback) {
            return configResource.get({
                action: 'getSchoolProfile',
                schoolId: SCHOOL_ID
            }, function (data) {
                callback(undefined, data);
            }, function (err) {
                callback(err);
            });
        }
    }
})();