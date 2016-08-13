(function () {
    angular.module('app.labels')
        .service('LabelsResourceService', LabelsResourceService);
    LabelsResourceService.$inject = ['$resource', 'API_HOST', 'SCHOOL_CONTEXT', 'SCHOOL_ID'];
    function LabelsResourceService($resource, API_HOST, SCHOOL_CONTEXT, SCHOOL_ID) {
        var resource = $resource(API_HOST + SCHOOL_CONTEXT + 'getCodes?param=codeType::codeType&param=schoolId::schoolId');
        return {
            getLabels: getLabels
        };
        function getLabels(callback) {
            return resource.query({
                codeType: 'label',
                schoolId: SCHOOL_ID
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
    }
})();