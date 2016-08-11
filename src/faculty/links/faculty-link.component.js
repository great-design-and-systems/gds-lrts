(function () {
    angular.module('app.faculty')
        .component('facultyLink', {
            templateUrl: 'src/faculty/links/faculty-link.html',
            controller: FacultyLinkComponent,
            controllerAs: 'facultyLink'
        });
    function FacultyLinkComponent() {

    }
})();