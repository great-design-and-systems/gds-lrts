(function() {
	'use strict';
	angular.module('app.faculty').run(Event);
	Event.$inject = [ '$rootScope', 'FacultyResourceService', 'FacultyEvents' ];

	function Event($rootScope, FacultyResourceService, FacultyEvents, vendors) {
		$rootScope.$on(FacultyEvents.DELETE_FACULTY, function($event, facultyId,
				callback) {
			vendors.pace.restart();
			FacultyResourceService.deleteFaculty(facultyId, function(err, result) {
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