(function () {
    angular.module('app.monitor')
        .service('EntryExportLayoutService', EntryExportLayoutService);
    EntryExportLayoutService.$inject = ['CsvFormatterService', 'vendors'];
    function EntryExportLayoutService(CsvFormatterService, vendors) {
        return {
            execute: execute
        };
        function execute(rawItems, callback) {
            CsvFormatterService.execute(rawItems,
                [
                    {
                        index: 0,
                        field: 'when',
                        format: ['Time', function (value) {
                            return vendors.moment(value).format('LTS');
                        }]
                    },
                    { index: 1, field: 'fullname', format: 'Full name' },
                    { index: 3, field: 'purpose', format: 'Purpose' },
                    { index: 4, field: 'department', format: 'Department' },
                    { index: 5, field: 'personType', format: 'Persont Type' },
                    { index: 6, field: 'personId', format: 'ID' },
                    {
                        index: 7, field: 'when',
                        format: ['Date', function (value) {
                            return vendors.moment(value).format('MMM Do YY');
                        }]
                    }

                ], function (errFormatted, csvFormattedData) {
                    if (errFormatted) {
                        callback(errFormatted);
                    } else {
                        callback(undefined, csvFormattedData);
                    }
                });
        }
    }
})();