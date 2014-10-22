function StoriesService() {
    this.stories = consumer.stories;
    this.getTaskUrl = consumer.getTaskUrl;

}

angular
    .module('daily')
    .service('StoriesService', StoriesService);