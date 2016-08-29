(function() {
    'use strict';
    angular.module('app.faculty')
        .component('faculty', {
            templateUrl: 'src/faculty/faculty.html',
            controller: FacultyComponent,
            controllerAs: 'facultyComponent'
        });
    FacultyComponent.$inject = ['EventEmitterService', 'FacultyEvents', 'FacultyFilterSettingsService'];

    function FacultyComponent(EventEmitterService, FacultyEvents, FacultyFilterSettingsService) {
        var facultyComponent = this;
        facultyComponent.columns = [
            'facultyId',
            'firstName',
            'middleName',
            'lastName',
            'gender',
            'contactNo',
            'emailAddress',
            'department'
        ];
        facultyComponent.$onInit = onInit;
        facultyComponent.$onDestroy = onDestroy;

        EventEmitterService.onComplete(FacultyEvents.GET_FACULTIES, function(result) {
            facultyComponent.faculty = result.docs;
        });

        function onInit() {
            facultyComponent.isLoading = true;
            facultyComponent.filter = FacultyFilterSettingsService;
            EventEmitterService.emit(FacultyEvents.GET_FACULTIES, facultyComponent.filter, function() {
                facultyComponent.isLoading = false;
            });
        }

        function onDestroy() {
            facultyComponent.isLoading = undefined;
            facultyComponent.filter = undefined;
        }


    }
})();