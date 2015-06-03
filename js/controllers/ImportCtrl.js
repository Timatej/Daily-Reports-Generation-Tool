function ImportCtrl(StorageService, ResultService) {
    this.newReport = '';

    this.add = function(){
        var str = this.newReport.replace(/\\"/g, '\'').replace(/[^\w{}":,\[\]\/':\.]/gi, ' ');
        console.log(str);
        var report = angular.fromJson(str);
        StorageService.save(report);
        this.newReport = '';
        ResultService.result = report;
    }

}

function ImportConfig($routeProvider) {
    $routeProvider
        .when('/import', {
            templateUrl: 'pages/import.html',
            controller: 'ImportCtrl',
            controllerAs: 'import'
        })
}

angular
    .module('daily')
    .controller('ImportCtrl', ImportCtrl)
    .config(ImportConfig);