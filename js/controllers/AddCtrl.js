function AddCtrl(StoriesService, ListService) {
    this.stories = StoriesService.stories;
    this.list = ListService.list;

    this.newReport = '';

    this.add = function(){
        var str = this.newReport.replace(/\\"/g, '\'').replace(/[^\w{}":,\[\]\/':\.]/gi, ' ');
        var report = angular.fromJson(str);
        var name = report.info.name;

        //alert if name is incorrect
        if (!(name in this.list)) {
            alert('No such name in your team!');
            return;
        }

        this.list[name] = report

        this.newReport = '';
        ListService.refreshBlockers();
        ListService.save();
    }

}

function AddConfig($routeProvider) {
    $routeProvider
        .when('/add', {
            templateUrl: 'pages/add.html',
            controller: 'AddCtrl',
            controllerAs: 'add'
        })
}

angular
    .module('daily')
    .controller('AddCtrl', AddCtrl)
    .config(AddConfig);