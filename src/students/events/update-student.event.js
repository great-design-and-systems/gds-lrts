(function() {
	'use strict';
	angular.module('app.students').run(Event);
	Event.$inject = [ '$rootScope', 'StudentsResourceService', 'StudentsEvents' ];

	function Event($rootScope, StudentsResourceService, StudentsEvents) {
		$rootScope.$on(StudentsEvents.UPDATE_STUDENT, function($event, data,
				callback) {
			vendors.pace.restart();
			StudentsResourceService.updateStudent(data, function(err, result) {
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