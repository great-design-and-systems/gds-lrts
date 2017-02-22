(function() {
    'use strict';
    angular.module('app.students')
        .service('FilterSettingsService', FilterSettingsService);

    function FilterSettingsService() {
        var filterSetting = this;
        filterSetting.pages = [];
        filterSetting.page = 1;
        filterSetting.limit = 25;
        filterSetting.isPrevDisabled = isPrevDisabled;
        filterSetting.isNextDisabled = isNextDisabled;
        filterSetting.prev = prev;
        filterSetting.next = next;

        function isPrevDisabled() {
            return filterSetting.page === 1;
        }

        function isNextDisabled() {
            return filterSetting.page === filterSetting.pages.length;
        }

        function prev() {
            filterSetting.page--;
        }

        function next() {
            filterSetting.page++;
        }
    }
})();