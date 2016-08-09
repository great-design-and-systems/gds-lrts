(function() {
    angular.module('app.school')
        .service('SemesterSettingResourceService', SemesterSettingResourceService);
    SemesterSettingResourceService.$inject = ['$resource', 'API_HOST', 'SCHOOL_CONTEXT'];

    function SemesterSettingResourceService($resource, API_HOST, SCHOOL_CONTEXT) {
        var resource = $resource(API_HOST + SCHOOL_CONTEXT + ':action?param=schoolYearId::schoolYearId', {}, {
            createSchoolSem: {
                method: 'post',
                url: API_HOST + SCHOOL_CONTEXT + 'createSchoolSem'
            },
            updateSchoolSem: {
                method: 'put',
                url: API_HOST + SCHOOL_CONTEXT + 'updateSchoolSem?param=schoolSemId::schoolSemId',
                params: {
                    schoolSemId: '@schoolSemId'
                }
            },
            deleteSchoolSem: {
                method: 'delete',
                url: API_HOST + SCHOOL_CONTEXT + 'deleteSchoolSem?param=schoolSemId::schoolSemId',
                params: {
                    schoolSemId: '@schoolSemId'
                }
            }
        });
        return {
            createSemester: createSemester,
            updateSemester: updateSemester,
            getSemesters: getSemesters,
            deleteSemester: deleteSemester
        };

        function deleteSemester(id, callback) {
            resource.deleteSchoolSem({
                schoolSemId: id
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function getSemesters(schoolYearId, callback) {
            resource.query({
                action: 'getSchoolSemBySchoolYearId',
                schoolYearId: schoolYearId
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function updateSemester(id, description, dateStart, dateEnd, updatedBy, callback) {
            resource.updateSchoolSem({
                schoolSemId: id,
                description: description,
                updatedBy: updatedBy,
                dateStart: dateStart,
                dateEnd: dateEnd
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

        function createSemester(schoolYearId, description, dateStart, dateEnd, createdBy, callback) {
            resource.createSchoolSem({
                description: description,
                createdBy: createdBy,
                schoolYearId: schoolYearId,
                dateStart: dateStart,
                dateEnd: dateEnd
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }

    }
})();