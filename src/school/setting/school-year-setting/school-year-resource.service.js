(function() {
    angular.module('app.school')
        .service('SchoolYearSettingResourceService', SchoolYearSettingResourceService);
    SchoolYearSettingResourceService.$inject = ['$resource', 'SCHOOL_ID', 'API_HOST', 'SCHOOL_CONTEXT'];

    function SchoolYearSettingResourceService($resource, SCHOOL_ID, API_HOST, SCHOOL_CONTEXT) {
        var resource = $resource(API_HOST + SCHOOL_CONTEXT + ':action?param=schoolId::schoolId', {}, {
            createSchoolYear: {
                method: 'post',
                url: API_HOST + SCHOOL_CONTEXT + 'createSchoolYear'
            },
            updateSchoolYear: {
                method: 'put',
                url: API_HOST + SCHOOL_CONTEXT + 'updateSchoolYear?param=schoolYearId::schoolYearId',
                params: {
                    schoolYearId: '@schoolYearId'
                }
            },
            deleteSchoolYear: {
                method: 'delete',
                url: API_HOST + SCHOOL_CONTEXT + 'deleteSchoolYear?param=schoolYearId::schoolYearId',
                params: {
                    schoolYearId: '@schoolYearId'
                }
            }
        });
        return {
            createSchoolYear: createSchoolYear,
            updateSchoolYear: updateSchoolYear,
            getSchoolYears: getSchoolYears,
            deleteSchoolYear: deleteSchoolYear
        };

        function deleteSchoolYear(id, callback) {
            resource.deleteSchoolYear({
                schoolYearId: id
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function getSchoolYears(callback) {
            resource.query({
                action: 'getSchoolYearBySchoolId',
                schoolId: SCHOOL_ID
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function updateSchoolYear(id, name, description, dateStart, dateEnd, updatedBy, callback) {
            resource.updateSchoolYear({
                schoolYearId: id,
                name: name,
                description: description,
                updatedBy: updatedBy
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function createSchoolYear(name, description, dateStart, dateEnd, createdBy, callback) {
            resource.createSchoolYear({
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