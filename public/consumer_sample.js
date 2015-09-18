var consumer = {
    stories: {
        //generated_list

    },
    getTaskUrl: function (taskId) {
        return 'https://abcjira.disney.com/browse/' + taskId;
    },
    alerts: {
        noBlockerPerson: 'You should specify who is the person you are waiting for to continue work. Please contact Tim if you have any questions.',
        noTicketNumber: 'Your activity should be related to Story or Defect. Please contact Tim for a new one if needed.'
    },
    //we cannot use simple array here, because AngularJS work incorrectly with it.
    team: {
        'Igor Usovich': {},
        'Eduard Trayan': {},
        'Pavel Yaschenko': {},
        'Igor Ivanuto': {},
        'Aliaksandr Litvinok': {},
        'Alesia Korzun': {},
        'Tim Sakharchuk': {}
    },
    locations: {
        'US':{},
        'EMEA':{}
    },
    email: {
        'to': 'tsakharchuk@exadel.com',
        'subject': 'AppleTV Daily Status Report'
    }
};