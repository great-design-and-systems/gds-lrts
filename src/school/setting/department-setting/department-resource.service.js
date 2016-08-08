(function () {
    angular.module('app.school')
        .service('DepartmentSettingResourceService', DepartmentSettingResourceService);
    DepartmentSettingResourceService.$inject = ['$resource', 'SCHOOL_ID', 'API_HOST', 'SCHOOL_CONTEXT'];

    function DepartmentSettingResourceService($resource, SCHOOL_ID, API_HOST, SCHOOL_CONTEXT) {
        var resource = $resource(API_HOST + SCHOOL_CONTEXT + ':action?param=schoolId::schoolId', {}, {
            createDepartment: {
                method: 'post',
                url: API_HOST + SCHOOL_CONTEXT + 'createDepartment'
            },
            updateDepartment: {
                method: 'put',
                url: API_HOST + SCHOOL_CONTEXT + 'updateDepartment?param=departmentId::departmentId',
                params: {
                    departmentId: '@departmentId'
                }
            },
            deleteDepartment: {
                method: 'delete',
                url: API_HOST + SCHOOL_CONTEXT + 'deleteDepartment?param=departmentId::departmentId',
                params: {
                    departmentId: '@departmentId'
                }
            }
        });
        return {
            createDepartment: createDepartment,
            updateDepartment: updateDepartment,
            getDepartments: getDepartments,
            deleteDepartment: deleteDepartment
        };
        function deleteDepartment(id, callback) {
            resource.deleteDepartment({
                departmentId: id
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
        function getDepartments(callback) {
            resource.query({
                action: 'getDepartmentBySchoolId',
                schoolId: SCHOOL_ID
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
        function updateDepartment(id, name, description, updatedBy, callback) {
            resource.updateDepartment({
                departmentId: id,
                name: name,
                description: description,
                updatedBy: updatedBy
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
        function createDepartment(name, description, createdBy, callback) {
            resource.createDepartment({
                name: name,
                description: description,
                createdBy: createdBy,
                schoolId: SCHOOL_ID
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }

    }
})();