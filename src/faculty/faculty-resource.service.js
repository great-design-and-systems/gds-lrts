(function() {
    'use strict';
    angular.module('app.faculty').service('FacultyResourceService',
        FacultyResourceService);
    FacultyResourceService.$inject = ['$resource', 'API_HOST',
        'FACULTY_CONTEXT'
    ];

    function FacultyResourceService($resource, API_HOST, FACULTY_CONTEXT) {
        var resource = $resource(API_HOST + FACULTY_CONTEXT, {}, {
            getProfileByFacultyId: {
                method: 'GET',
                url: API_HOST + FACULTY_CONTEXT + 'getProfileByFacultyId?param=facultyId::facultyId',
                params: {
                    facultyId: '@facultyId'
                }
            },
            createFaculty: {
                method: 'POST',
                url: API_HOST + FACULTY_CONTEXT + 'createFaculty'
            },
            updateFaculty: {
                method: 'PUT',
                url: API_HOST + FACULTY_CONTEXT + 'updateFaculty?param=facultyId::facultyId',
                params: {
                    facultyId: '@facultyId'
                }
            },
            deleteFaculty: {
                method: 'DELETE',
                url: API_HOST + FACULTY_CONTEXT + 'deleteFaculty?param=facultyId::facultyId',
                params: {
                    facultyId: '@facultyId'
                }
            },
            getFaculties: {
                method: 'GET',
                url: API_HOST + FACULTY_CONTEXT + 'getFaculties'
            }
        });

        return {
            getProfileByFacultyId: getProfileByFacultyId,
            createFaculty: createFaculty,
            updateFaculty: updateFaculty,
            deleteFaculty: deleteFaculty,
            getFaculties: getFaculties
        };

        function getProfileByFacultyId(facultyId, callback) {
            return resource.getProfileByFacultyId({
                    facultyId: facultyId
                }, //success result
                function(result) {
                    callback(undefined, result);
                },
                //err reason
                function(err) {
                    console.error('faculty-resource.service', err);
                    callback(err);
                });
        }

        function createFaculty(facultyId, firstName, lastName, callback) {
            return resource.createFaculty({
                facultyId: facultyId,
                firstName: firstName,
                lastName: lastName
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function updateFaculty(data, callback) {
            return resource.updateFaculty(data, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function deleteFaculty(facultyId, callback) {
            return resource.deleteFaculty({
                facultyId: facultyId
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function getFaculties(page, limit, sort, callback) {
            return resource.getFaculties({
                page: page,
                limit: limit,
                sort: sort
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }
    }
})();