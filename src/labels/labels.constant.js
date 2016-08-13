(function () {
    angular.module('app.labels')
        .constant('LabelsEvents', {
            GET_LABELS: 'getLabels',
            CASCADE_LABELS: 'cascadeLabels'
        });
})();