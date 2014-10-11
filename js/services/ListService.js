function ListService(StorageService) {
    //list of people should be provided by consumer
    this.list = consumer.team;

    this.blockers = {};

    this.refreshBlockers = function(){
        this.blockers = {};
        for ( var name in this.list) {
            var report = this.list[name];

            if (!report.blockers) continue;

            for (var i = 0; i < report.blockers.length; i++){
                var blocker = report.blockers[i];
                var key = blocker.id;

                if (!angular.isDefined(this.blockers[key]))
                    this.blockers[key] = new Array();

                this.blockers[key].push(
                    {
                        comment:blocker.comment,
                        reporter:name,
                        person:blocker.person
                    }
                );
            }
        }
    }

    this.save = function(){
        StorageService.saveList(this.list);
    }

    if (StorageService.listExists()) {
        this.list = StorageService.getList();
        this.refreshBlockers();
    }

}

angular
    .module('daily')
    .service('ListService', ListService);