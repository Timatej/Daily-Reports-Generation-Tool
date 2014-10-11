function PreviewCtrl(StoriesService, ResultService) {
    this.stories = StoriesService.stories;
    this.taskURL = StoriesService.taskURL;
    this.result = ResultService.result;

    this.reportContent = '';

    this.sendReport = function() {
        var subject = 'Daily Status Report';
        var to = 'tim.sakharchuk@hp.com';
        var body = angular.toJson(this.result);
        var link = 'mailto:' + to
            + '?subject=' + subject
            + '&body=' + encodeURIComponent(body);

        window.location.href = link;
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