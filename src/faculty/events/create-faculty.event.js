(function() {
	'use strict';
	angular.module('app.faculty').run(Event);
	Event.$inject = [ '$rootScope', 'FacultyResourceService', 'FacultyEvents' ];

	function Event($rootScope, FacultyResourceService, FacultyEvents, vendors) {
		$rootScope.$on(FacultyEvents.CREATE_FACULTY, function($event, data,
				callback) {
			vendors.pace.restart();
			FacultyResourceService.createFaculty(data.facultyId,
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