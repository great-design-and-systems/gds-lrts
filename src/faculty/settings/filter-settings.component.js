(function() {
    angular.module('app.faculty')
        .component('filterSettings', {
            templateUrl: 'src/faculty/settings/filter-settings.html',
            controller: FilterSettingsComponent,
            controllerAs: 'filterSettings'
        });
    FilterSettingsComponent.$inject = ['FilterSettingsService', 'EventEmitterService', 'FacultyEvents'];

    function FilterSettingsComponent(FilterSettingsService, EventEmitterService, FacultyEvents) {
        var filterSettings = this;
        filterSettings.limits = [
            '25', '50', '75', '100'
        ];
        filterSettings.shown = true;
        filterSettings.filter = FilterSettingsService;
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