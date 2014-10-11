function ListCtrl(StoriesService, ListService) {
    this.stories = StoriesService.stories;
    this.list = ListService.list;
    this.taskURL = StoriesService.taskURL;
    this.blockers = ListService.blockers;

    this.today = (new Date).toLocaleDateString();

    //add to Out of Office list
    this.toOOO = function(name) {
        this.list[name].ooo = true;
        console.log(this.list[name]);
    }

    //remove from Out of Office list
    this.fromOOO = function(name) {
        this.list[name].ooo = false;
    }
}

function ListConfig($routeProvider) {
    $routeProvider
        .when('/list', {
            templateUrl: 'pages/list.html',
            controller: 'ListCtrl',
            controllerAs: 'list'
        })
}

angular
    .module('daily')
    .controller('ListCtrl', ListCtrl)
    .config(ListConfig);