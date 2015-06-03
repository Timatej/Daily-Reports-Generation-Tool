function PreviewCtrl(StoriesService, ResultService, $http) {
    this.stories = StoriesService.stories;
    this.result = ResultService.result;

    this.reportContent = '';

    this.sendReport = function() {
        var body = angular.toJson(this.result);

        $http.post(
            'https://api.appery.io/rest/1/db/collections/report',
            body,
            {
                'headers': {
                    'X-Appery-Database-Id': '556f059ee4b047fd4ca85293',
                    'Content-Type': 'application/json'
                }
            }
        );
    };

    this.showCode = function(){
        this.reportContent = angular.toJson(this.result);
    };
}

function PreviewConfig($routeProvider) {
    $routeProvider
        .when('/preview', {
            templateUrl: 'pages/preview.html',
            controller: 'PreviewCtrl',
            controllerAs: 'preview'
        })
}

angular
    .module('daily')
    .controller('PreviewCtrl', PreviewCtrl)
    .config(PreviewConfig);