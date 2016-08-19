(function() {
	'use strict';
	angular.module('app.students').run(Event);
	Event.$inject = [ '$rootScope', 'StudentsResourceService', 'StudentsEvents' ];

	function Event($rootScope, StudentsResourceService, StudentsEvents) {
		$rootScope.$on(StudentsEvents.DELETE_STUDENT, function($event, studentId,
				callback) {
			vendors.pace.restart();
			StudentsResourceService.deleteStudent(studentId, function(err, result) {
				if (!err) {
					callback(undefined, result);
				} else {
					callback(err);
					//TODO: alert error
				}
			});
		});
	}
})();