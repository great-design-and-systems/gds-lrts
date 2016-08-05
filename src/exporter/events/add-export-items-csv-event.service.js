(function () {
    'use strict';
    angular.module('app.exporter')
        .run(AddExportItemsCsvEventService);
    AddExportItemsCsvEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents', 'vendors'];

    function AddExportItemsCsvEventService($rootScope, ExporterResourceService, ExporterEvents, vendors) {
        $rootScope.$on(ExporterEvents.ADD_EXPORT_ITEMS_CSV, function ($event, data, callback) {
            var csvItems = [];
            for (var i = 0; i < data.items.length; i++) {
                var item = data.items[i];
                csvItems.push({
                    'Time': vendors.moment(item.when).format('LTS'),
                    'Full name': item.fullname,
                    'Purpose': item.purpose,
                    'Department': item.department,
                    'Person type': item.personType,
                    'ID': item.personId ? item.personId : 'N/A',
                    'Date': vendors.moment(item.when).format('MMM Do YY')
                });
            }
            ExporterResourceService.addExportItemsCSV(data.exportId, csvItems, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }

})();