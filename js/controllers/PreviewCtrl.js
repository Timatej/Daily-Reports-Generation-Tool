function PreviewCtrl(StoriesService, ResultService) {
    this.stories = StoriesService.stories;
    this.result = ResultService.result;

    this.reportContent = '';

    this.sendReport = function() {
        var body = angular.toJson(this.result);
        window.location.href = 'mailto:' + consumer.email.to
            + '?subject=' + consumer.email.subject
            + '&body=' + encodeURIComponent(body);
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