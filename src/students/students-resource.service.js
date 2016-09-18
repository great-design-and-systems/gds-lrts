(function () {
    'use strict';
    angular.module('app.students').service('StudentsResourceService',
        StudentsResourceService);
    StudentsResourceService.$inject = ['$resource', 'API_HOST',
        'STUDENT_CONTEXT'
    ];

    function StudentsResourceService($resource, API_HOST, STUDENT_CONTEXT) {
        var resource = $resource(API_HOST + STUDENT_CONTEXT, {}, {
            getProfileByStudentId: {
                method: 'GET',
                url: API_HOST + STUDENT_CONTEXT + 'getProfileByStudentId?param=studentId::studentId',
                params: {
                    studentId: '@studentId'
                }
            },
            createStudent: {
                method: 'POST',
                url: API_HOST + STUDENT_CONTEXT + 'createStudent'
            },
            updateStudent: {
                method: 'PUT',
                url: API_HOST + STUDENT_CONTEXT + 'updateStudent?param=studentId::studentId',
                params: {
                    studentId: '@studentId'
                }
            },
            deleteStudent: {
                method: 'DELETE',
                url: API_HOST + STUDENT_CONTEXT + 'deleteStudent?param=studentId::studentId',
                params: {
                    studentId: '@studentId'
                }
            },
            getStudents: {
                method: 'GET',
                url: API_HOST + STUDENT_CONTEXT + 'getStudents'
            },
            validateStudentId: {
                method: 'GET',
                url: API_HOST + STUDENT_CONTEXT + 'validateStudentId'
            }
        });

        return {
            getProfileByStudentId: getProfileByStudentId,
            createStudent: createStudent,
            updateStudent: updateStudent,
            deleteStudent: deleteStudent,
            getStudents: getStudents,
            createStudentWithDetail: createStudentWithDetail,
            validateStudentId: validateStudentId
        };

        function getProfileByStudentId(studentId, callback) {
            return resource.getProfileByStudentId({
                    studentId: studentId
                }, //success result
                function (result) {
                    callback(undefined, result);
                },
                //err reason
                function (err) {
                    console.error('students-resource.service', err);
                    callback(err);
                });
        }

        function createStudent(studentId, firstName, lastName, callback) {
            return resource.createStudent({
                studentId: studentId,
                firstName: firstName,
                lastName: lastName
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }

        function createStudentWithDetail(data,
                                         callback) {
            return resource.createStudent({
                studentId: data.studentId,
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName,
                gender: data.gender,
                contactNo: data.contactNo,
                emailAddress: data.emailAddress,
                department: data.department,
                level: data.level,
                imageId: data.imageId
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }

        function updateStudent(data, callback) {
            return resource.updateStudent(data, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }

        function deleteStudent(studentId, callback) {
            return resource.deleteStudent({
                studentId: studentId
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }

        function getStudents(page, limit, sort, callback) {
            return resource.getStudents({
                page: page,
                limit: limit,
                sort: sort
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }

        function validateStudentId(studentId, callback) {
            return resource.validateStudentId({
                studentId: studentId
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
    }
})();