(function() {
    'use strict';
    angular.module('app.faculty')
        .component('facultyControl', {
            templateUrl: 'src/faculty/control/faculty-control.html',
            controller: FacultyControlComponent,
            controllerAs: 'facultyControl'
        });
    FacultyControlComponent.$inject = ['FilterSettingsService'];

    function FacultyControlComponent(FilterSettingsService) {
        var facultyControl = this;
        facultyControl.importData = {};
        facultyControl.importData.dataFor = 'faculty';
        facultyControl.filter = FilterSettingsService;
    }
})();