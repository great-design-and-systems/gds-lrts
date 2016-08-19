(function() {
	'use strict';
	angular.module('app.faculty').run(Event);
	Event.$inject = [ '$rootScope', 'FacultyResourceService', 'FacultyEvents', 'vendors' ];

	function Event($rootScope, FacultyResourceService, FacultyEvents, vendors) {
		$rootScope.$on(FacultyEvents.UPDATE_FACULTY, function($event, data,
				callback) {
			vendors.pace.restart();
			FacultyResourceService.updateFaculty(data, function(err, result) {
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