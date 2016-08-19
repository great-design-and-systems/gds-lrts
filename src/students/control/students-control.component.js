(function() {
    'use strict';
    angular.module('app.students')
        .component('studentsControl', {
            templateUrl: 'src/students/control/students-control.html',
            controller: StudentsControlComponent,
            controllerAs: 'studentsControl'
        });
    StudentsControlComponent.$inject = ['FilterSettingsService'];

    function StudentsControlComponent(FilterSettingsService) {
        var studentsControl = this;
        studentsControl.importData = {};
        studentsControl.importData.dataFor = 'student';
        studentsControl.filter = FilterSettingsService;
    }
})();