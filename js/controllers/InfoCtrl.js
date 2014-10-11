function InfoCtrl(StoriesService, ResultService, StorageService) {
    this.stories = StoriesService.stories;
    this.taskURL = StoriesService.taskURL;
    this.qcURL = StoriesService.qcURL;
    this.result = ResultService.result;
    this.locations = consumer.locations;
    this.getTaskUrl = consumer.getTaskUrl;
    this.storiesFilterValue = '';

    this.blocker = {
        id: '',
        comment: '',
        error: false
    }

    this.today = {
        id: '',
        comment: '',
        error: false
    }

    this.tomorrow = {
        id: '',
        comment: '',
        error: false
    }

    this.addBlocker = function() {
        if (!this.blocker.person) {
            alert(consumer.alerts.noBlockerPerson);
            return;
        }
        this.add(this.blocker, this.result.blockers);
    }

    this.removeBlocker = function(id) {
        this.remove(id, this.result.blockers);
    }

    this.addToday = function() {
        this.add(this.today, this.result.today);
    }

    this.removeToday = function(id) {
        this.remove(id, this.result.today);
    }

    this.addTomorrow = function() {
        this.add(this.tomorrow, this.result.tomorrow);
    }

    this.removeTomorrow = function(id) {
        this.remove(id, this.result.tomorrow);
    }

    this.add = function(what, where) {
        if (angular.isUndefined(this.stories[what.id])) {
            alert(consumer.alerts.noTicketNumber);
            what.error = true;
            return;
        }
        where.push(angular.copy(what));
        what.id = '';
        what.comment = '';
        what.person = '';

        StorageService.save(this.result);
    }

    this.remove = function(id, where) {
        where.splice(id, 1);
        StorageService.save(this.result);
    }

}

function InfoConfig($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/info.html',
            controller: 'InfoCtrl',
            controllerAs: 'info'
        })
}

angular
    .module('daily')
    .controller('InfoCtrl', InfoCtrl)
    .config(InfoConfig);