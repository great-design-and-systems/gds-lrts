(function() {
	'use strict';
	angular.module('app.students').run(Event);
	Event.$inject = [ '$rootScope', 'StudentsResourceService', 'StudentsEvents' ];

	function Event($rootScope, StudentsResourceService, StudentsEvents, vendors) {
		$rootScope.$on(StudentsEvents.CREATE_STUDENT, function($event, data,
				callback) {
			vendors.pace.restart();
			StudentsResourceService.createStudent(data.studentId,
					data.firstName, data.lastName, function(err, result) {
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