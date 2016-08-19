(function() {
    angular.module('app.students')
        .component('filterSettings', {
            templateUrl: 'src/students/settings/filter-settings.html',
            controller: FilterSettingsComponent,
            controllerAs: 'filterSettings'
        });
    FilterSettingsComponent.$inject = ['FilterSettingsService'];

    function FilterSettingsComponent(FilterSettingsService) {
        var filterSettings = this;
        filterSettings.limits = [
            '25', '50', '75', '100'
        ];
        filterSettings.shown = true;
        filterSettings.filter = FilterSettingsService;
    }
})();