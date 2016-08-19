(function() {
    'use strict';
    angular.module('app.faculty')
        .service('FacultyFilterSettingsService', FilterSettingsService);

    function FilterSettingsService() {
        var filterSetting = this;
        filterSetting.pages = [];
        filterSetting.page = 1;
        filterSetting.limit = 25;
    }
})();