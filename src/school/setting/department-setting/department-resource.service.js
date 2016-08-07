(function() {
    angular.module('app.school')
        .service('DepartmentSettingResourceService', DepartmentSettingResourceService);
    DepartmentSettingResourceService.$inject = ['$resource', 'SCHOOL_ID', 'API_HOST', 'SCHOOL_CONTEXT'];

    function DepartmentSettingResourceService($resource, SCHOOL_ID, API_HOST, SCHOOL_CONTEXT) {
        var resource = $resource(API_HOST + SCHOOL_CONTEXT + ':action', {}, {
            createDepartment: {
                method: 'post',
                url: API_HOST + SCHOOL_CONTEXT + 'createDepartment'
            }
        });
        return {
            createDepartment: createDepartment
        };

        function createDepartment() {
            resource.createDepartment({
                
            })
        }

    }
})();