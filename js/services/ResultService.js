function ResultService(StorageService) {
    this.result = {
        info: {
            name: '',
            location: 'India'
        },
        blockers: [],
        today: [],
        tomorrow: []
    };

    if (StorageService.reportExists()) {
        this.result = StorageService.get();
    }
}

angular
    .module('daily')
    .service('ResultService', ResultService);