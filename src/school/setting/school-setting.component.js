(function () {
    angular.module('app.school')
        .component('schoolSetting', {
            templateUrl: 'src/school/setting/school-setting.html',
            controller: SchoolSettingComponent,
            controllerAs: 'schoolSetting'
        });
    function SchoolSettingComponent() {
        var schoolSetting = this;
    }
})();