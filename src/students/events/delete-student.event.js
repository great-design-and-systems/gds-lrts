(function() {
	'use strict';
	angular.module('app.students').run(Event);
	Event.$inject = [ '$rootScope', 'StudentsResourceService', 'StudentsEvents', 'vendors' ];

	function Event($rootScope, StudentsResourceService, StudentsEvents, vendors) {
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