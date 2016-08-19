(function() {
    'use strict';
    angular.module('app.students')
        .service('StudentsResourceService', StudentsResourceService);
    StudentsResourceService.$inject = ['$resource', 'API_HOST', 'STUDENT_CONTEXT'];

    function StudentsResourceService($resource, API_HOST, STUDENT_CONTEXT) {
        var resource = $resource(API_HOST + STUDENT_CONTEXT, {}, {

        });
    }
})();