'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .service('Sample', function Sample() {
        return {
            getSampleData: function(one) {
                if (one) {
                    return [{
                        'name': 'Project Management',
                        'id': 5072,
                        'data': {
                            'isControlAccount': true,
                            'parentCode': 5071,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': false,
                            'budget': 0,
                            'codeWBS': '100',
                            'plan': {
                            'from': '2016-12-04T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-01-10T23:00:00.000Z',
                            'to': '2016-04-14T22:00:00.000Z'
                            },
                            'locked': false
                        },
                        'tasks': [{
                            'name': 'Project Management',
                            'id': 5072,
                            'progress': 20,
                            'from': '2016-12-04T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z',
                            'base': {
                            'from': '2016-12-04T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            },
                            'milestones': [{
                            'name': 'Project Closing',
                            'id': 867,
                            'data': {
                                'plan': '2017-03-10'
                            },
                            'date': '2017-03-10'
                            }, {
                            'name': '2nt Trip to switzerland',
                            'id': 866,
                            'data': {
                                'plan': '2017-03-07'
                            },
                            'date': '2017-03-07'
                            }, {
                            'name': 'Maintenance & Support Channel Set Up',
                            'id': 865,
                            'data': {
                                'plan': '2017-03-03'
                            },
                            'date': '2017-03-03'
                            }, {
                            'name': '1st Trip to Switzerland',
                            'id': 854,
                            'data': {
                                'plan': '2016-12-07'
                            },
                            'date': '2016-12-07'
                            }, {
                            'name': 'Project Kick Off',
                            'id': 853,
                            'data': {
                                'plan': '2016-12-05'
                            },
                            'date': '2016-12-05'
                            }]
                        }]
                        }]
                }

                return [{
                        'name': 'TALAIA OpenPPM - Stoxx LTD',
                        'id': 5071,
                        'data': {
                            'isControlAccount': false,
                            'workPackage': true,
                            'progress': 50,
                            'canDelete': false,
                            'plan': {
                            'from': '2016-12-04T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-01-10T23:00:00.000Z',
                            'to': '2016-04-14T22:00:00.000Z'
                            },
                            'locked': false,
                            'isProject': true
                        },
                        'dependencies': false,
                        'children': [5072, 5073]
                        }, {
                        'name': 'Project Management',
                        'id': 5072,
                        'data': {
                            'isControlAccount': true,
                            'parentCode': 5071,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': false,
                            'budget': 0,
                            'codeWBS': '100',
                            'plan': {
                            'from': '2016-12-04T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-01-10T23:00:00.000Z',
                            'to': '2016-04-14T22:00:00.000Z'
                            },
                            'locked': false
                        },
                        'tasks': [{
                            'name': 'Project Management',
                            'id': 5072,
                            'progress': 0,
                            'from': '2016-12-04T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z',
                            'base': {
                            'from': '2016-12-04T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            },
                            'milestones': [{
                            'name': 'Project Closing',
                            'id': 867,
                            'data': {
                                'plan': '2017-03-10'
                            },
                            'date': '2017-03-10'
                            }, {
                            'name': '2nt Trip to switzerland',
                            'id': 866,
                            'data': {
                                'plan': '2017-03-07'
                            },
                            'date': '2017-03-07'
                            }, {
                            'name': 'Maintenance & Support Channel Set Up',
                            'id': 865,
                            'data': {
                                'plan': '2017-03-03'
                            },
                            'date': '2017-03-03'
                            }, {
                            'name': '1st Trip to Switzerland',
                            'id': 854,
                            'data': {
                                'plan': '2016-12-07'
                            },
                            'date': '2016-12-07'
                            }, {
                            'name': 'Project Kick Off',
                            'id': 853,
                            'data': {
                                'plan': '2016-12-05'
                            },
                            'date': '2016-12-05'
                            }]
                        }]
                        }, {
                        'name': 'TALAIA OpenPPM Pack 2 Services',
                        'id': 5073,
                        'data': {
                            'isControlAccount': false,
                            'parentCode': 5071,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': true,
                            'codeWBS': '200',
                            'locked': false
                        },
                        'children': [5074, 5075, 5076, 5080, 5084, 5085, 5088]
                        }, {
                        'name': 'Analysis & Consulting',
                        'id': 5074,
                        'data': {
                            'isControlAccount': true,
                            'parentCode': 5073,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': false,
                            'budget': 0,
                            'codeWBS': '210',
                            'plan': {
                            'from': '2016-12-05T23:00:00.000Z',
                            'to': '2017-01-05T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-01-11T23:00:00.000Z',
                            'to': '2016-02-11T23:00:00.000Z'
                            },
                            'locked': false
                        },
                        'tasks': [{
                            'name': 'Analysis & Consulting',
                            'id': 5074,
                            'progress': 50,
                            'from': '2016-12-05T23:00:00.000Z',
                            'to': '2017-01-05T23:00:00.000Z',
                            'base': {
                            'from': '2016-12-05T23:00:00.000Z',
                            'to': '2017-01-05T23:00:00.000Z'
                            }
                        }]
                        }, {
                        'name': 'Settings & Configuration',
                        'id': 5075,
                        'data': {
                            'isControlAccount': true,
                            'parentCode': 5073,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': false,
                            'budget': 0,
                            'codeWBS': '220',
                            'plan': {
                            'from': '2016-12-11T23:00:00.000Z',
                            'to': '2017-03-02T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-01-17T23:00:00.000Z',
                            'to': '2016-04-07T22:00:00.000Z'
                            },
                            'locked': false
                        },
                        'tasks': [{
                            'name': 'Settings & Configuration',
                            'id': 5075,
                            'progress': 0,
                            'from': '2016-12-11T23:00:00.000Z',
                            'to': '2017-03-02T23:00:00.000Z',
                            'base': {
                            'from': '2016-12-11T23:00:00.000Z',
                            'to': '2017-03-02T23:00:00.000Z'
                            },
                            'milestones': [{
                            'name': 'Administration Module Configuration Completed',
                            'id': 864,
                            'data': {
                                'plan': '2017-03-03'
                            },
                            'date': '2017-03-03'
                            }, {
                            'name': 'OPA Configuration Completed',
                            'id': 860,
                            'data': {
                                'plan': '2017-02-08'
                            },
                            'date': '2017-02-08'
                            }]
                        }]
                        }, {
                        'name': 'Personalization & Adaptation',
                        'id': 5076,
                        'data': {
                            'isControlAccount': true,
                            'parentCode': 5073,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': false,
                            'budget': 0,
                            'codeWBS': '230',
                            'plan': {
                            'from': '2017-01-04T23:00:00.000Z',
                            'to': '2017-02-02T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-02-10T23:00:00.000Z',
                            'to': '2016-03-10T23:00:00.000Z'
                            },
                            'locked': false
                        },
                        'tasks': [{
                            'name': 'Personalization & Adaptation',
                            'id': 5076,
                            'progress': 0,
                            'from': '2017-01-04T23:00:00.000Z',
                            'to': '2017-02-02T23:00:00.000Z',
                            'base': {
                            'from': '2017-01-04T23:00:00.000Z',
                            'to': '2017-02-02T23:00:00.000Z'
                            },
                            'milestones': [{
                            'name': 'Personalization Implemented',
                            'id': 859,
                            'data': {
                                'plan': '2017-01-30'
                            },
                            'date': '2017-01-30'
                            }, {
                            'name': 'Personalizaton Validated',
                            'id': 856,
                            'data': {
                                'plan': '2017-01-23'
                            },
                            'date': '2017-01-23'
                            }, {
                            'name': 'Personalization List Validated',
                            'id': 855,
                            'data': {
                                'plan': '2017-01-16'
                            },
                            'date': '2017-01-16'
                            }]
                        }]
                        }, {
                        'name': 'Data Project Loads',
                        'id': 5080,
                        'data': {
                            'isControlAccount': true,
                            'parentCode': 5073,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': false,
                            'budget': 0,
                            'codeWBS': '240',
                            'plan': {
                            'from': '2017-02-05T23:00:00.000Z',
                            'to': '2017-03-05T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-03-13T23:00:00.000Z',
                            'to': '2016-04-10T22:00:00.000Z'
                            },
                            'locked': false
                        },
                        'tasks': [{
                            'name': 'Data Project Loads',
                            'id': 5080,
                            'progress': 0,
                            'from': '2017-02-05T23:00:00.000Z',
                            'to': '2017-03-05T23:00:00.000Z',
                            'base': {
                            'from': '2017-02-05T23:00:00.000Z',
                            'to': '2017-03-05T23:00:00.000Z'
                            }
                        }]
                        }, {
                        'name': 'Technical Infrastructure Deployment',
                        'id': 5084,
                        'data': {
                            'isControlAccount': true,
                            'parentCode': 5073,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': false,
                            'budget': 0,
                            'codeWBS': '250',
                            'plan': {
                            'from': '2017-01-22T23:00:00.000Z',
                            'to': '2017-02-22T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-02-28T23:00:00.000Z',
                            'to': '2016-03-30T22:00:00.000Z'
                            },
                            'locked': false
                        },
                        'tasks': [{
                            'name': 'Technical Infrastructure Deployment',
                            'id': 5084,
                            'progress': 0,
                            'from': '2017-01-22T23:00:00.000Z',
                            'to': '2017-02-22T23:00:00.000Z',
                            'base': {
                            'from': '2017-01-22T23:00:00.000Z',
                            'to': '2017-02-22T23:00:00.000Z'
                            },
                            'milestones': [{
                            'name': 'Stoxx Ltd Production Infrastructure Set Up',
                            'id': 861,
                            'data': {
                                'plan': '2017-02-20'
                            },
                            'date': '2017-02-20'
                            }, {
                            'name': 'Migration from local to Stoxx Infrastructure',
                            'id': 858,
                            'data': {
                                'plan': '2017-02-06'
                            },
                            'date': '2017-02-06'
                            }, {
                            'name': 'Stoxx Ltd Set Up',
                            'id': 857,
                            'data': {
                                'plan': '2017-02-02'
                            },
                            'date': '2017-02-02'
                            }]
                        }]
                        }, {
                        'name': 'TALAIA OpenPPM Training',
                        'id': 5085,
                        'data': {
                            'isControlAccount': false,
                            'parentCode': 5073,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': true,
                            'codeWBS': '260',
                            'locked': false
                        },
                        'children': [5086, 5087]
                        }, {
                        'name': 'User Training',
                        'id': 5086,
                        'data': {
                            'isControlAccount': true,
                            'parentCode': 5085,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': false,
                            'budget': 0,
                            'codeWBS': '261',
                            'plan': {
                            'from': '2017-03-07T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-04-12T22:00:00.000Z',
                            'to': '2016-04-14T22:00:00.000Z'
                            },
                            'locked': false
                        },
                        'tasks': [{
                            'name': 'User Training',
                            'id': 5086,
                            'progress': 0,
                            'from': '2017-03-07T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z',
                            'base': {
                            'from': '2017-03-07T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            }
                        }]
                        }, {
                        'name': 'Administration Training',
                        'id': 5087,
                        'data': {
                            'isControlAccount': true,
                            'parentCode': 5085,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': false,
                            'budget': 0,
                            'codeWBS': '262',
                            'plan': {
                            'from': '2017-03-07T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-04-12T22:00:00.000Z',
                            'to': '2016-04-14T22:00:00.000Z'
                            },
                            'locked': false
                        },
                        'tasks': [{
                            'name': 'Administration Training',
                            'id': 5087,
                            'progress': 0,
                            'from': '2017-03-07T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z',
                            'base': {
                            'from': '2017-03-07T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            }
                        }]
                        }, {
                        'name': 'Maintenance & Support',
                        'id': 5088,
                        'data': {
                            'isControlAccount': false,
                            'parentCode': 5073,
                            'workPackage': true,
                            'progress': 0,
                            'canDelete': true,
                            'codeWBS': '270',
                            'locked': false,
                            'plan': {
                            'from': '2016-12-04T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            },
                            'control': {
                            'from': '2016-01-10T23:00:00.000Z',
                            'to': '2016-04-14T22:00:00.000Z'
                            }
                        },
                        'tasks': [{
                            'name': 'Maintenance & Support',
                            'id': 5088,
                            'progress': 0,
                            'from': '2016-12-04T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z',
                            'base': {
                            'from': '2016-12-04T23:00:00.000Z',
                            'to': '2017-03-09T23:00:00.000Z'
                            }
                        }]
                        }]
            },
            getSampleTimespans: function() {
                return [
                        {
                            from: new Date(2013, 9, 21, 8, 0, 0),
                            to: new Date(2013, 9, 25, 15, 0, 0),
                            name: 'Sprint 1 Timespan'
                            //priority: undefined,
                            //classes: [],
                            //data: undefined
                        }
                    ];
            }
        };
    })
;
