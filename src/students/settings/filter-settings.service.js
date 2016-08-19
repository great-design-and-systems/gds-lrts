(function() {
    'use strict';
    angular.module('app.students')
        .service('FilterSettingsService', FilterSettingsService);

    function FilterSettingsService() {
        var filterSetting = this;
        filterSetting.page = 1;
        filterSetting.limit = 25;
    }
})();