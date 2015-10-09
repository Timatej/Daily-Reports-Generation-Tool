function PreviewCtrl(StoriesService, ResultService, $http) {
    this.stories = StoriesService.stories;
    this.result = ResultService.result;

    this.reportContent = '';

    this.sendReport = function() {
        if (this.result.info.name) {
            $http.post('/reports.php?action=save', {
                person: this.result.info.name,
                report: this.result
            })
        } else {
            alert('Please, choose your name');
        }
    }

    this.showCode = function(){
        this.reportContent = angular.toJson(this.result);
    }
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