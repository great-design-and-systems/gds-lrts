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
                url: API_HOST + FACULTY_CONTEXT + 'updateFaculty?param=facultyId::id',
                params: {
                    id: '@id'
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
            },
            validateFacultyId: {
                method: 'GET',
                url: API_HOST + FACULTY_CONTEXT + 'validateFacultyId'
            }
        });

        return {
            getProfileByFacultyId: getProfileByFacultyId,
            createFaculty: createFaculty,
            updateFaculty: updateFaculty,
            deleteFaculty: deleteFaculty,
            getFaculties: getFaculties,
            createFacultyWithDetail: createFacultyWithDetail,
            validateFacultyId: validateFacultyId
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
		function createFacultyWithDetail(data, callback) {
			return resource.createFaculty({
				facultyId : data.facultyId,
				firstName : data.firstName,
				lastName : data.lastName,
				middleName : data.middleName,
				gender : data.gender,
				contactNo : data.contactNo,
				emailAddress : data.emailAddress,
				department : data.department,
				imageId : data.imageId
			}, function(result) {
				callback(undefined, result);
			}, function(err) {
				callback(err);
			});
		}
        function updateFaculty(data, callback) {
            return resource.updateFaculty({
                id: data._id,
				facultyId : data.facultyId,
				firstName : data.firstName,
				lastName : data.lastName,
				middleName : data.middleName,
				gender : data.gender,
				contactNo : data.contactNo,
				emailAddress : data.emailAddress,
				department : data.department,
				imageId : data.imageId
			}, function(result) {
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

        function validateFacultyId(facultyId, callback) {
            return resource.validateFacultyId({
                facultyId: facultyId
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
    }
})();