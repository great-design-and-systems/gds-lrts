(function () {
    angular.module('app.students')
        .component('studentsLink', {
            templateUrl: 'src/students/links/students-link.html',
            controller: StudentsLinkComponent,
            controllerAs: 'studentsLink'
        });
    function StudentsLinkComponent() {

    }
})();