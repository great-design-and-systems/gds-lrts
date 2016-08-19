(function() {
    'use strict';
    angular.module('app.students')
        .service('StudentsResourceService', StudentsResourceService);
    StudentsResourceService.$inject = ['$resource', 'API_HOST', 'STUDENT_CONTEXT'];

    function StudentsResourceService($resource, API_HOST, STUDENT_CONTEXT) {
        var resource = $resource(API_HOST + STUDENT_CONTEXT, {}, {
            getProfileByStudentId: {
                method: 'GET',
                url: API_HOST + STUDENT_CONTEXT + '/getProfileByStudentId?param=studentId::studentId',
                params: {
                    studentId: '@studentId'
                }
            }
        });

        return { getProfileByStudentId: getProfileByStudentId };

        function getProfileByStudentId(studentId, callback) {
            return resource.getProfileByStudentId({
                    studentId: studentId
                }, //success result
                function(result) {
                    callback(undefined, result);
                },
                //err reason
                function(err) {
                    console.error('students-resource.service', err);
                    callback(err);
                }
            );
        }
    }
})();