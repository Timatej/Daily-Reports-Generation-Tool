function TaskListDirective(StoriesService) {
    return {
        scope:{
            list:"="
            //story:"@",
            //defect:"@"
        },
        templateUrl:'directives/task-list.html',
        link: function (scope, element, attrs) {
            scope.stories = StoriesService.stories;
            scope.getTaskUrl = StoriesService.getTaskUrl;
        }

    }
}

angular
    .module('daily')
    .directive('taskList', TaskListDirective);