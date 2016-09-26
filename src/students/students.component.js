(function() {
    'use strict';
    angular.module('app.students')
        .component('students', {
            templateUrl: 'src/students/students.html',
            controller: StudentsComponent,
            controllerAs: 'studentsComponent'
        });
    StudentsComponent.$inject = ['EventEmitterService', 'StudentsEvents', 'FilterSettingsService'];

    function StudentsComponent(EventEmitterService, StudentsEvents, FilterSettingsService) {
        var studentsComponent = this;
        studentsComponent.columns = [
            'studentId',
            'firstName',
            'middleName',
            'lastName',
            'gender',
            'contactNo',
            'emailAddress',
            'department/grade',
            'level/section'
        ];
        studentsComponent.$onInit = onInit;
        studentsComponent.$onDestroy = onDestroy;

        EventEmitterService.onComplete(StudentsEvents.GET_STUDENTS, function(result) {
            studentsComponent.students = result.docs;
        });

        function onInit() {
            studentsComponent.isLoading = true;
            studentsComponent.filter = FilterSettingsService;
            EventEmitterService.emit(StudentsEvents.GET_STUDENTS, studentsComponent.filter, function() {
                studentsComponent.isLoading = false;
            });
        }

        function onDestroy() {
            studentsComponent.isLoading = undefined;
            studentsComponent.filter = undefined;
        }


    }
})();