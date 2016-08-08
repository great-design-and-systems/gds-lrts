(function() {
    angular.module('app.school')
        .service('EducationLevelSettingResourceService', EducationLevelSettingResourceService);
    EducationLevelSettingResourceService.$inject = ['$resource', 'SCHOOL_ID', 'API_HOST', 'SCHOOL_CONTEXT'];

    function EducationLevelSettingResourceService($resource, SCHOOL_ID, API_HOST, SCHOOL_CONTEXT) {
        var resource = $resource(API_HOST + SCHOOL_CONTEXT + ':action?param=schoolId::schoolId', {}, {
            createEducationLevel: {
                method: 'post',
                url: API_HOST + SCHOOL_CONTEXT + 'createEducationLevel'
            },
            updateEducationLevel: {
                method: 'put',
                url: API_HOST + SCHOOL_CONTEXT + 'updateEducationLevel?param=educationLevelId::educationLevelId',
                params: {
                    educationLevelId: '@educationLevelId'
                }
            },
            deleteEducationLevel: {
                method: 'delete',
                url: API_HOST + SCHOOL_CONTEXT + 'deleteEducationLevel?param=educationLevelId::educationLevelId',
                params: {
                    educationLevelId: '@educationLevelId'
                }
            }
        });
        return {
            createEducationLevel: createEducationLevel,
            updateEducationLevel: updateEducationLevel,
            getEducationLevels: getEducationLevels,
            deleteEducationLevel: deleteEducationLevel
        };

        function deleteEducationLevel(id, callback) {
            resource.deleteEducationLevel({
                educationLevelId: id
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function getEducationLevels(callback) {
            resource.query({
                action: 'getEducationLevelBySchoolId',
                schoolId: SCHOOL_ID
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function updateEducationLevel(id, name, description, updatedBy, callback) {
            resource.updateEducationLevel({
                educationLevelId: id,
                name: name,
                description: description,
                updatedBy: updatedBy
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function createEducationLevel(name, description, createdBy, callback) {
            resource.createEducationLevel({
                name: name,
                description: description,
                createdBy: createdBy,
                schoolId: SCHOOL_ID
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

    }
})();