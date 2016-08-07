(function () {
    angular.module('app.school')
        .service('PurposeSettingResourceService', PurposeSettingResourceService);
    PurposeSettingResourceService.$inject = ['$resource', 'SCHOOL_ID', 'API_HOST', 'SCHOOL_CONTEXT'];
    function PurposeSettingResourceService($resource, SCHOOL_ID, API_HOST, SCHOOL_CONTEXT) {
        var purposeResource = $resource(API_HOST + SCHOOL_CONTEXT + ':action?param=codeType::codeType&param=schoolId::schoolId', {}, {
            createPurpose: {
                method: 'POST',
                url: API_HOST + SCHOOL_CONTEXT + 'createCode'
            },
            updatePurpose: {
                method: 'PUT',
                url: API_HOST + SCHOOL_CONTEXT + 'updateCode?param=codeId::codeId',
                params: {
                    codeId: '@codeId'
                }
            }
        });
        return {
            getPurposes: getPurposes,
            createPurpose: createPurpose,
            updatePurpose: updatePurpose
        };
        function getPurposes(callback) {
            purposeResource.query({
                codeType: 'purpose',
                action: 'getCodes',
                schoolId: SCHOOL_ID
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
        function createPurpose(name, value, createdBy, callback) {
            purposeResource.createPurpose({
                codeType: 'purpose',
                codeName: name,
                codeValue: value,
                createdBy: createdBy,
                schoolId: SCHOOL_ID
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
        function updatePurpose(_id, name, value, updatedBy, callback) {
            purposeResource.updatePurpose({
                codeId: _id,
                codeName: name,
                codeValue: value,
                updatedBy: updatedBy,
                schoolId: SCHOOL_ID
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
    }
})();