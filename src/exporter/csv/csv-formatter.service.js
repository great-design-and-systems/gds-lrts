(function () {
    angular.module('app.exporter')
        .service('CsvFormatterService', CsvFormatterService);
    CsvFormatterService.$inject = ['vendors'];
    function CsvFormatterService(vendors) {
        var lodash = vendors.lodash;
        return {
            execute: execute
        };
        function execute(rawItems, columnMap, callback) {
            var csvFormattedItems = [];
            var length = rawItems.length;
            angular.forEach(rawItems, function (item) {
                try {
                    var formattedItem = item;
                    if (columnMap) {
                        formattedItem = {};
                        lodash.forEach(lodash.sortBy(columnMap, lodash.property(['index'])), function (column) {
                            var keyValue = lodash.get(item, column.field) ? lodash.get(item, column.field) : 'N/A';
                            var keyFormat = column.format;
                            if (column.format instanceof Array) {
                                keyFormat = column.format[0];
                                keyValue = column.format[1](keyValue).toString();
                            }
                            lodash.set(formattedItem, keyFormat, keyValue);
                        });
                    }
                    this.push(formattedItem);
                    if (csvFormattedItems.length === length) {
                        callback(undefined, csvFormattedItems);
                    }
                } catch (err) {
                    callback(err);
                }
            }, csvFormattedItems);
        }
    }
})();