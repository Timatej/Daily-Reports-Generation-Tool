function StorageService() {
    this.storage = localStorage;

    this.save = function(result) {
        this.storage['dailyReport'] = angular.toJson(result);
    }

    this.get = function() {
        return angular.fromJson(this.storage['dailyReport']);
    }

    this.reportExists = function() {
        return angular.isDefined(this.storage['dailyReport']);
    }

    this.listExists = function() {
        var reports = angular.fromJson(this.storage['listReport']);
        if (!reports) return false;
        return (new Date).toLocaleDateString() in reports;
    }

    this.saveList = function(list) {
        var reports = angular.fromJson(this.storage['listReport']);
        if (!reports) reports = {};
        reports[(new Date).toLocaleDateString()] = list;
        this.storage['listReport'] = angular.toJson(reports);
    }

    this.getList = function() {
        var reports = angular.fromJson(this.storage['listReport']);
        return reports[(new Date).toLocaleDateString()];
    }
}

angular
    .module('daily')
    .service('StorageService', StorageService);