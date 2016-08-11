(function () {
    angular.module('gdsApp')
        .config(AppConfig);
    AppConfig.$inject = ['$httpProvider'];

    function AppConfig($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }

})();