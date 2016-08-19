(function() {
    angular.module('app.faculty')
        .component('facultyFilterSettings', {
            templateUrl: 'src/faculty/settings/filter-settings.html',
            controller: FilterSettingsComponent,
            controllerAs: 'filterSettings'
        });
    FilterSettingsComponent.$inject = ['FacultyFilterSettingsService', 'EventEmitterService', 'FacultyEvents'];

    function FilterSettingsComponent(FacultyFilterSettingsService, EventEmitterService, FacultyEvents) {
        var filterSettings = this;
        filterSettings.limits = [
            '25', '50', '75', '100'
        ];
        filterSettings.shown = true;
        filterSettings.filter = FacultyFilterSettingsService;
        filterSettings.onChangeLimit = onChangeLimit;
        filterSettings.onChangePage = onChangePage;
        EventEmitterService.onComplete(FacultyEvents.GET_FACULTIES, function(result) {
            for (var i = 1; i <= result.pages; i++) {
                filterSettings.filter.pages = [];
                filterSettings.filter.pages.push(i);
            }
            filterSettings.total = result.total;
        });

        function onChangeLimit() {
            filterSettings.filter.page = 1;
            EventEmitterService.emit(FacultyEvents.GET_FACULTIES, filterSettings.filter);
        }

        function onChangePage() {
            EventEmitterService.emit(FacultyEvents.GET_FACULTIES, filterSettings.filter);
        }
    }
})();