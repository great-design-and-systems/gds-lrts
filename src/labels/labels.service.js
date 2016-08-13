(function () {
    angular.module('app.labels')
        .service('LabelsService', LabelsService);
    LabelsService.$inject = ['vendors', 'EventEmitterService', 'LabelsEvents'];
    function LabelsService(vendors, EventEmitterService, LabelsEvents) {
        var label = this;
        label.setLabels = setLabels;
        function setLabels(labelData) {
            label.values = {};
            var limit = labelData.length - 1;
            angular.forEach(labelData, function (value, $index) {
                vendors.lodash.set(this.values, value.codeName, value.codeValue);
                if ($index === limit) {
                    EventEmitterService.emit(LabelsEvents.CASCADE_LABELS, this.values);
                }
            }, label);
        }
    }
})();