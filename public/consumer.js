var consumer = {
    stories: {
        // from 1 to 10 are special placeholder ids.
        // for such action items there will no link be displayed. Just story text
        1: 'Non-ScrumA Activities',
        2: 'Regression Testing',
        3322: 'Test Story',
        3131: 'Test Story 2'

    },
    getTaskUrl: function (taskId) {
        return 'URL to task nubmer ' + taskId;
    },
    alerts: {
        noBlockerPerson: 'Alert text for the case when user forgot to mention the person who blocks his activities',
        noTicketNumber: 'Alert text for the case when action item is not specified.'
    },
    //we cannot use simple array here, because AngularJS works incorrectly with it.
    team: {
        'Developer 1': {},
        'Developer 2': {}
    },
    locations: {
        'Location1':{},
        'Location2':{},
        'Location3':{}
    }
}
