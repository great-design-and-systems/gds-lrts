(function() {
	'use strict';
	angular.module('app.students').service('StudentsResourceService',
			StudentsResourceService);
	StudentsResourceService.$inject = [ '$resource', 'API_HOST',
			'STUDENT_CONTEXT' ];

	function StudentsResourceService($resource, API_HOST, STUDENT_CONTEXT) {
		var resource = $resource(API_HOST + STUDENT_CONTEXT, {}, {
			getProfileByStudentId : {
				method : 'GET',
				url : API_HOST + STUDENT_CONTEXT + 'getProfileByStudentId?param=studentId::studentId',
				params : {
					studentId : '@studentId'
				}
			},
			createStudent : {
				method : 'POST',
				url : API_HOST + STUDENT_CONTEXT + 'create'
			},
			updateStudent : {
				method : 'PUT',
				url : API_HOST + STUDENT_CONTEXT + 'update?param=studentId::studentId',
				params : {
					studentId : '@studentId'
				}
			},
			deleteStudent : {
				method : 'DELETE',
				url : API_HOST + STUDENT_CONTEXT + 'delete?param=studentId::studentId',
				params : {
					studentId : '@studentId'
				}
			},
			getStudents : {
				method : 'GET',
				url : API_HOST + STUDENT_CONTEXT + 'get-students'
			}
		});

		return {
			getProfileByStudentId : getProfileByStudentId,
			createStudent : createStudent,
			updateStudent : updateStudent,
			deleteStudent : deleteStudent,
			getStudents : getStudents
		};

		function getProfileByStudentId(studentId, callback) {
			return resource.getProfileByStudentId({
				studentId : studentId
			}, //success result
			function(result) {
				callback(undefined, result);
			},
			//err reason
			function(err) {
				console.error('students-resource.service', err);
				callback(err);
			});
		}

		function createStudent(studentId, firstName, lastName, callback) {
			return resource.createStudent({
				studentId : studentId,
				firstName : firstName,
				lastName : lastName
			}, function(result) {
				callback(undefined, result);
			}, function(err) {
				callback(err);
			});
		}

		function updateStudent(data, callback) {
			return resource.updateStudent(data, function(result) {
				callback(undefined, result);
			}, function(err) {
				callback(err);
			});
		}
		
		function deleteStudent(studentId, callback) {
			return resource.deleteStudent({
				studentId: studentId
			}, function(result) {
				callback(undefined, result);
			}, function(err) {
				callback(err);
			});
		}
		
		function getStudents(page, limit, sort, callback) {
			return resource.getStudents({
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