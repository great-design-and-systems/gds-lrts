(function () {
    angular.module('app.code')
        .service('CodeResourceService', CodeResourceService);
    CodeResourceService.$inject = ['$resource', 'SCHOOL_ID', 'API_HOST', 'SCHOOL_CONTEXT'];
    function CodeResourceService($resource, SCHOOL_ID, API_HOST, SCHOOL_CONTEXT) {
        var codeResource = $resource(API_HOST + SCHOOL_CONTEXT + ':action?param=codeId::codeId');
        return {
            deleteCode: deleteCode
        };
        function deleteCode(codeId, callback) {
            codeResource.delete({
                action: 'deleteCode',
                codeId: codeId
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
    }
})();