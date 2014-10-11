function ObjectsFilter() {
    return function(objects, filter) {
        var result = {};
        filter = filter.toLowerCase();
        for (var key in objects) {
            var str = key + angular.toJson(objects[key]);
            str = str.toLocaleLowerCase();

            if (str.indexOf(filter) >= 0) {
                result[key] = objects[key];
            }
        }
        return result;
    }
}

angular
    .module('daily')
    .filter('ObjectsFilter', ObjectsFilter);