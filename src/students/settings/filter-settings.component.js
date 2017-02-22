(function() {
    angular.module('app.students')
        .component('filterSettings', {
            templateUrl: 'src/students/settings/filter-settings.html',
            controller: FilterSettingsComponent,
            controllerAs: 'filterSettings'
        });
    FilterSettingsComponent.$inject = ['FilterSettingsService', 'EventEmitterService', 'StudentsEvents'];

    function FilterSettingsComponent(FilterSettingsService, EventEmitterService, StudentsEvents) {
        var filterSettings = this;
        filterSettings.limits = [
            '25', '50', '75', '100'
        ];
        filterSettings.shown = true;
        filterSettings.filter = FilterSettingsService;
        filterSettings.onChangeLimit = onChangeLimit;
        filterSettings.onChangePage = onChangePage;
        filterSettings.onNextPage = onNextPage;
        filterSettings.onPrevPage = onPrevPage;
        EventEmitterService.onComplete(StudentsEvents.GET_STUDENTS, function(result) {
            filterSettings.filter.pages = [];
            for (var i = 1; i <= result.pages; i++) {
                filterSettings.filter.pages.push(i);
            }
            filterSettings.total = result.total;
        });

        function onChangeLimit() {
            filterSettings.filter.page = 1;
            EventEmitterService.emit(StudentsEvents.GET_STUDENTS, filterSettings.filter);
        }

        function onChangePage() {
            EventEmitterService.emit(StudentsEvents.GET_STUDENTS, filterSettings.filter);
        }

        function onNextPage() {
            filterSettings.filter.page++;
            EventEmitterService.emit(StudentsEvents.GET_STUDENTS, filterSettings.filter);
        }

        function onPrevPage() {
            filterSettings.filter.page--;
            EventEmitterService.emit(StudentsEvents.GET_STUDENTS, filterSettings.filter);
        }
    }
})();