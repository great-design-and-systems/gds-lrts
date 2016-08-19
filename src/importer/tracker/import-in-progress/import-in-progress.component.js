(function() {
    'use strict';
    angular.module('app.importer')
        .component('importInProgress', {
            templateUrl: 'src/importer/tracker/import-in-progress/import-in-progress.html',
            controller: ImportInProgressComponent,
            controllerAs: 'importInProgress'
        });
    ImportInProgressComponent.$inject = ['EventEmitterService', 'ImporterEvents'];

    function ImportInProgressComponent(EventEmitterService, ImporterEvents) {
        var importInProgress = this;
        importInProgress.$onInit = onInit;
        importInProgress.shown = true;
        importInProgress.getPercent = getPercent;
        EventEmitterService.onComplete(ImporterEvents.GET_IN_PROGRESS_EVENT, function(imports) {
            importInProgress.imports = imports;
        });

        function onInit() {
            importInProgress.isLoading = true;
            EventEmitterService.emit(ImporterEvents.GET_IN_PROGRESS_EVENT, function() {
                importInProgress.isLoading = false;
            });
        }

        function getPercent(importTracker) {
            return importTracker.progressCount / importTracker.progressLimit * 100;
        }
    }
})();