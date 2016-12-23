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
            getSampleData: function(base, suicide) {
                if (base && !suicide) {
                    return [
                        // Order is optional. If not specified it will be assigned automatically
                        {name: 'Milestones', height: '3em', sortable: false, drawTask: false, classes: 'gantt-row-milestone', color: '#45607D', tasks: [
                            // Dates can be specified as string, timestamp or javascript date object. The data attribute can be used to attach a custom object
                            {name: 'Kickoff', color: '#93C47D', from: '2013-10-07T09:00:00', to: '2013-10-07T10:00:00', data: 'Can contain any custom data or object'},
                            {name: 'Concept approval', color: '#93C47D', from: new Date(2013, 9, 18, 18, 0, 0), to: new Date(2013, 9, 18, 18, 0, 0), est: new Date(2013, 9, 16, 7, 0, 0), lct: new Date(2013, 9, 19, 0, 0, 0)},
                            {name: 'Development finished', color: '#93C47D', from: new Date(2013, 10, 15, 18, 0, 0), to: new Date(2013, 10, 15, 18, 0, 0)},
                            {name: 'Shop is running', color: '#93C47D', from: new Date(2013, 10, 22, 12, 0, 0), to: new Date(2013, 10, 22, 12, 0, 0)},
                            {name: 'Go-live', color: '#93C47D', from: new Date(2013, 10, 29, 16, 0, 0), to: new Date(2013, 10, 29, 16, 0, 0)}
                        ], data: 'Can contain any custom data or object'},
                        {name: 'Status meetings', tasks: [
                            {name: 'Demo #1', color: '#9FC5F8', from: new Date(2013, 9, 25, 15, 0, 0), to: new Date(2013, 9, 25, 18, 30, 0)},
                        ]},
                        {name: 'Kickoff', movable: {allowResizing: false}, tasks: [
                            {name: 'Day 1', color: '#9FC5F8', from: new Date(2013, 9, 7, 9, 0, 0), to: new Date(2013, 9, 7, 17, 0, 0),
                                progress: {percent: 100, color: '#3C8CF8'}, movable: false},
                        ]},
                        {name: 'Create concept', tasks: [
                            {name: 'Create concept', priority: 20, content: '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}', color: '#F1C232', from: new Date(2013, 9, 10, 8, 0, 0), to: new Date(2013, 9, 16, 18, 0, 0), est: new Date(2013, 9, 8, 8, 0, 0), lct: new Date(2013, 9, 18, 20, 0, 0),
                                progress: 100}
                        ]},
                        {name: 'Finalize concept', tasks: [
                            {id: 'Finalize concept', name: 'Finalize concept', priority: 10, color: '#F1C232', from: new Date(2013, 9, 17, 8, 0, 0), to: new Date(2013, 9, 18, 18, 0, 0),
                                progress: 100}
                        ]},
                        {name: 'Development', children: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4'], content: '<i class="fa fa-file-code-o" ng-click="scope.handleRowIconClick(row.model)"></i> {{row.model.name}}'},
                        {name: 'Sprint 1', tooltips: false, tasks: [
                            {id: 'Product list view', name: 'Product list view', color: '#F1C232', from: new Date(2013, 11, 21, 8, 0, 0), to: new Date(2013, 11, 25, 15, 0, 0),
                                progress: 25, dependencies: [{to: 'Order basket'}, {from: 'Finalize concept'}]}
                        ]},
                        {name: 'Sprint 2', tasks: [
                            {id: 'Order basket', name: 'Order basket', color: '#F1C232', from: new Date(2013, 9, 28, 8, 0, 0), to: new Date(2013, 10, 1, 15, 0, 0),
                                dependencies: {to: 'Checkout'}}
                        ]},
                        {name: 'Sprint 3', tasks: [
                            {id: 'Checkout', name: 'Checkout', color: '#F1C232', from: new Date(2013, 10, 4, 8, 0, 0), to: new Date(2013, 10, 8, 15, 0, 0),
                                dependencies: {to: 'Login & Signup & Admin Views'}}
                        ]},
                        {name: 'Sprint 4', tasks: [
                            {id: 'Login & Signup & Admin Views', name: 'Login & Signup & Admin Views', color: '#F1C232', from: new Date(2013, 10, 11, 8, 0, 0), to: new Date(2013, 10, 15, 15, 0, 0),
                                dependencies: [{to: 'HW'}, {to: 'SW / DNS/ Backups'}]}
                        ]},
                        {name: 'Hosting', children: ['Server', 'Deployment']},
                        {name: 'Setup', tasks: [
                            {id: 'HW', name: 'HW', color: '#F1C232', from: new Date(2013, 10, 18, 8, 0, 0), to: new Date(2013, 10, 18, 12, 0, 0)}
                        ]},
                        {name: 'Config', tasks: [
                            {id: 'SW / DNS/ Backups', name: 'SW / DNS/ Backups', color: '#F1C232', from: new Date(2013, 10, 18, 12, 0, 0), to: new Date(2013, 10, 21, 18, 0, 0)}
                        ]},
                        {name: 'Server',  children: ['Setup', 'Config']},
                        {name: 'Deployment',  tasks: [
                            {name: 'Depl. & Final testing', color: '#F1C232', from: new Date(2013, 10, 21, 8, 0, 0), to: new Date(2013, 10, 22, 12, 0, 0), 'classes': 'gantt-task-deployment'}
                        ]},
                        {name: 'Workshop', tasks: [
                            {name: 'On-side education', color: '#F1C232', from: new Date(2013, 10, 24, 9, 0, 0), to: new Date(2013, 10, 25, 15, 0, 0)}
                        ]},
                        {name: 'Content', tasks: [
                            {name: 'Supervise content creation', color: '#F1C232', from: new Date(2013, 10, 26, 9, 0, 0), to: new Date(2013, 10, 29, 16, 0, 0)}
                        ]},
                        {name: 'Documentation', tasks: [
                            {name: 'Technical/User documentation', color: '#F1C232', from: new Date(2013, 10, 26, 8, 0, 0), to: new Date(2013, 10, 28, 18, 0, 0)}
                        ]}
                    ];
                }

                if (!base && !suicide) {
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
                }

                if (!base && suicide) {
                    return [{
                            "name": "ARTE Project",
                            "id": 15345,
                            "data": {
                                "isControlAccount": false,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "codeWBS": "0",
                                "plan": {
                                "from": "2016-01-13T23:00:00.000Z",
                                "to": "2018-08-07T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-01-12T23:00:00.000Z",
                                "to": "2016-12-19T12:00:59.086Z"
                                },
                                "locked": false,
                                "isProject": true,
                                "milestones": [{
                                "name": "UEC availability",
                                "id": 2417,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "Release ARTE_SW Version 1.0",
                                "id": 2416,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "BPL availability",
                                "id": 2415,
                                "data": {
                                    "plan": "2017-05-26"
                                }
                                }, {
                                "name": "ETS availability",
                                "id": 2414,
                                "data": {
                                    "plan": "2017-05-09"
                                }
                                }, {
                                "name": "PSM2BN availability",
                                "id": 2413,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "GPA-R1 detailed design finished",
                                "id": 2412,
                                "data": {
                                    "plan": "2016-08-03"
                                }
                                }, {
                                "name": "Non-qualified RASID 15 HD delivery",
                                "id": 2411,
                                "data": {
                                    "plan": "2017-12-08"
                                }
                                }, {
                                "name": "GBA_GEF availability",
                                "id": 2410,
                                "data": {
                                    "plan": "2016-12-05"
                                }
                                }, {
                                "name": "GPA 2 refitting ready for Integration",
                                "id": 2409,
                                "data": {
                                    "plan": "2017-06-22"
                                }
                                }, {
                                "name": "GSA_CEOE availability",
                                "id": 2408,
                                "data": {
                                    "plan": "2017-07-14"
                                }
                                }, {
                                "name": "RASID-15HD Automatic Validation SW finished",
                                "id": 2407,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "OIB availability",
                                "id": 2406,
                                "data": {
                                    "plan": "2016-08-05"
                                }
                                }, {
                                "name": "GPA-R1 ready for Integration",
                                "id": 2405,
                                "data": {
                                    "plan": "2017-03-09"
                                }
                                }, {
                                "name": "CAA_CAG availability",
                                "id": 2404,
                                "data": {
                                    "plan": "2017-03-02"
                                }
                                }, {
                                "name": "GPA 1 refitting detailed design finished",
                                "id": 2403,
                                "data": {
                                    "plan": "2016-09-07"
                                }
                                }, {
                                "name": "GPA-R2 ready for Integration",
                                "id": 2402,
                                "data": {
                                    "plan": "2017-10-03"
                                }
                                }, {
                                "name": "GPA-R2 detailed design finished",
                                "id": 2401,
                                "data": {
                                    "plan": "2017-03-14"
                                }
                                }, {
                                "name": "Collimation System PO Placed",
                                "id": 2400,
                                "data": {
                                    "plan": "2016-07-06"
                                }
                                }, {
                                "name": "Internal Kick-of meeting",
                                "id": 2399,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "TIG availability",
                                "id": 2398,
                                "data": {
                                    "plan": "2017-07-19"
                                }
                                }, {
                                "name": "SIP availability",
                                "id": 2397,
                                "data": {
                                    "plan": "2017-02-17"
                                }
                                }, {
                                "name": "ARTE 2nd delivery",
                                "id": 2396,
                                "data": {
                                    "plan": "2018-08-08"
                                }
                                }, {
                                "name": "CTA-R1 ready for Integration",
                                "id": 2395,
                                "data": {
                                    "plan": "2016-01-15"
                                }
                                }, {
                                "name": "DCA_CCCD availability",
                                "id": 2394,
                                "data": {
                                    "plan": "2016-11-16"
                                }
                                }, {
                                "name": "CTA-R1 detailed design finished",
                                "id": 2393,
                                "data": {
                                    "plan": "2016-01-15"
                                }
                                }, {
                                "name": "CPA_CPM availability",
                                "id": 2392,
                                "data": {
                                    "plan": "2017-06-12"
                                }
                                }, {
                                "name": "GPA 1 refitting ready for Integration",
                                "id": 2391,
                                "data": {
                                    "plan": "2016-11-17"
                                }
                                }, {
                                "name": "TCC availability",
                                "id": 2390,
                                "data": {
                                    "plan": "2017-01-16"
                                }
                                }, {
                                "name": "GPA 2 refitting detailed design finished",
                                "id": 2389,
                                "data": {
                                    "plan": "2016-12-14"
                                }
                                }, {
                                "name": "JCB availability",
                                "id": 2388,
                                "data": {
                                    "plan": "2017-02-07"
                                }
                                }, {
                                "name": "SDI availability",
                                "id": 2387,
                                "data": {
                                    "plan": "2017-06-15"
                                }
                                }, {
                                "name": "CEA_CEG availability",
                                "id": 2386,
                                "data": {
                                    "plan": "2017-03-02"
                                }
                                }, {
                                "name": "CEB_CEC availability",
                                "id": 2385,
                                "data": {
                                    "plan": "2017-06-01"
                                }
                                }, {
                                "name": "CVI-CVE availability",
                                "id": 2384,
                                "data": {
                                    "plan": "2016-08-15"
                                }
                                }, {
                                "name": "ETI availability",
                                "id": 2383,
                                "data": {
                                    "plan": "2016-12-28"
                                }
                                }, {
                                "name": "Remaining qualified RASID 15 HD delivery",
                                "id": 2382,
                                "data": {
                                    "plan": "2018-04-09"
                                }
                                }, {
                                "name": "SIF availability",
                                "id": 2381,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "CASTOR HD availability",
                                "id": 2380,
                                "data": {
                                    "plan": "2017-05-01"
                                }
                                }, {
                                "name": "Kick-off meeting",
                                "id": 2379,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "Qualification completed",
                                "id": 2378,
                                "data": {
                                    "plan": "2018-02-08"
                                }
                                }, {
                                "name": "PSFN availability",
                                "id": 2377,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "TDM availability",
                                "id": 2376,
                                "data": {
                                    "plan": "2016-10-12"
                                }
                                }, {
                                "name": "FAM availability",
                                "id": 2375,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "PDR",
                                "id": 2374,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "CPPR2 availability",
                                "id": 2373,
                                "data": {
                                    "plan": "2017-02-01"
                                }
                                }, {
                                "name": "EOB availability",
                                "id": 2372,
                                "data": {
                                    "plan": "2017-06-30"
                                }
                                }, {
                                "name": "QTE Ready",
                                "id": 2371,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "HIF availability",
                                "id": 2370,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "ARTE 1st delivery",
                                "id": 2369,
                                "data": {
                                    "plan": "2018-03-12"
                                }
                                }, {
                                "name": "EXT PSU availability",
                                "id": 2368,
                                "data": {
                                    "plan": "2016-12-07"
                                }
                                }, {
                                "name": "CDR",
                                "id": 2367,
                                "data": {
                                    "plan": "2017-02-08"
                                }
                                }, {
                                "name": "Cables Availability",
                                "id": 2366,
                                "data": {
                                    "plan": "2016-12-05"
                                }
                                }, {
                                "name": "First qualified RASID 15 HD delivery",
                                "id": 2365,
                                "data": {
                                    "plan": "2018-03-08"
                                }
                                }, {
                                "name": "Motion System PO Placed",
                                "id": 2364,
                                "data": {
                                    "plan": "2016-07-13"
                                }
                                }, {
                                "name": "SYS availability",
                                "id": 2363,
                                "data": {
                                    "plan": "2016-06-22"
                                }
                                }, {
                                "name": "VDM-VSB availability",
                                "id": 2362,
                                "data": {
                                    "plan": "2017-06-27"
                                }
                                }]
                            },
                            "dependencies": false,
                            "children": [15563, 15449, 15597, 15657, 15582]
                            }, {
                            "name": "ARTE SYSTEM",
                            "id": 15563,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15345,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "1",
                                "locked": false
                            },
                            "children": [15341, 15507, 15496, 15568, 15695, 15659, 15319, 15423, 15530, 15364, 15668, 15453, 15540, 15421, 15666]
                            }, {
                            "name": "ARTE.SYS.5% RM",
                            "id": 15341,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 91112.84,
                                "codeWBS": "1.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-04-10T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-04-10T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SYS.5% RM",
                                "id": 15341,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-04-10T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-04-10T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SYS.15% HOURS",
                            "id": 15507,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 140038.29,
                                "codeWBS": "1.2",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-12-11T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-12-11T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SYS.15% HOURS",
                                "id": 15507,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-12-11T23:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-12-11T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE INTEGRATION TASKS",
                            "id": 15496,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 87927.25,
                                "codeWBS": "1.3",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-12-20T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-12-20T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE INTEGRATION TASKS",
                                "id": 15496,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-12-20T23:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-12-20T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SYS.Specification",
                            "id": 15568,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 31,
                                "canDelete": false,
                                "budget": 3395.2,
                                "codeWBS": "1.4",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-24T22:00:00.000Z",
                                "to": "2016-08-31T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SYS.Specification",
                                "id": 15568,
                                "progress": 31,
                                "from": "2016-07-24T22:00:00.000Z",
                                "to": "2016-08-31T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SYS.Design",
                            "id": 15695,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 19,
                                "canDelete": false,
                                "budget": 2011.8,
                                "codeWBS": "1.5",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-24T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-29T22:00:00.000Z",
                                "to": "2016-04-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SYS.Design",
                                "id": 15695,
                                "progress": 19,
                                "from": "2016-03-29T22:00:00.000Z",
                                "to": "2016-04-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-24T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SYS.Integration",
                            "id": 15659,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 12532.7,
                                "codeWBS": "1.6",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-08-01T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-08-01T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SYS.Integration",
                                "id": 15659,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-08-01T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-08-01T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SYS.Testing",
                            "id": 15319,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2347.1,
                                "codeWBS": "1.7",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SYS.Testing",
                                "id": 15319,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SYS.Documentation",
                            "id": 15423,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 6,
                                "canDelete": false,
                                "budget": 37954.5,
                                "codeWBS": "1.8",
                                "plan": {
                                "from": "2016-01-13T23:00:00.000Z",
                                "to": "2016-04-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-05-03T22:00:00.000Z",
                                "to": "2016-10-10T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SYS.Documentation",
                                "id": 15423,
                                "progress": 6,
                                "from": "2016-05-03T22:00:00.000Z",
                                "to": "2016-10-10T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-13T23:00:00.000Z",
                                "to": "2016-04-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.MNG.Project Management",
                            "id": 15530,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 55,
                                "canDelete": false,
                                "budget": 87295,
                                "codeWBS": "1.9",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-01-01T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-01-17T23:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.MNG.Project Management",
                                "id": 15530,
                                "progress": 55,
                                "from": "2016-01-17T23:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-01-01T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.MNG.Software Management",
                            "id": 15364,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 89,
                                "canDelete": false,
                                "budget": 16094.4,
                                "codeWBS": "1.10",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-04-12T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-02-22T23:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.MNG.Software Management",
                                "id": 15364,
                                "progress": 89,
                                "from": "2016-02-22T23:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-04-12T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.MNG.Hardware Management",
                            "id": 15668,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 46,
                                "canDelete": false,
                                "budget": 24648,
                                "codeWBS": "1.11",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-04-12T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-01-13T23:00:00.000Z",
                                "to": "2016-10-25T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.MNG.Hardware Management",
                                "id": 15668,
                                "progress": 46,
                                "from": "2016-01-13T23:00:00.000Z",
                                "to": "2016-10-25T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-04-12T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.MNG.Internal Meetings",
                            "id": 15453,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 12,
                                "canDelete": false,
                                "budget": 30563.15,
                                "codeWBS": "1.12",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-03-13T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-01-12T23:00:00.000Z",
                                "to": "2016-08-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.MNG.Internal Meetings",
                                "id": 15453,
                                "progress": 12,
                                "from": "2016-01-12T23:00:00.000Z",
                                "to": "2016-08-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-03-13T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.MNG.Design Support",
                            "id": 15540,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 17604.4,
                                "codeWBS": "1.13",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.MNG.Design Support",
                                "id": 15540,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.MNG.Manufacturing Support",
                            "id": 15421,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 2,
                                "canDelete": false,
                                "budget": 17570.87,
                                "codeWBS": "1.14",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-03-01T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-04-06T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.MNG.Manufacturing Support",
                                "id": 15421,
                                "progress": 2,
                                "from": "2016-04-06T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-03-01T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SYS.ZATE Debugging",
                            "id": 15666,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15563,
                                "workPackage": true,
                                "progress": 41,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "1.15",
                                "plan": {
                                "from": "2016-08-09T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-09T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SYS.ZATE Debugging",
                                "id": 15666,
                                "progress": 41,
                                "from": "2016-08-09T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-09T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "HW PACKAGES",
                            "id": 15449,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15345,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2",
                                "locked": false
                            },
                            "children": [15711, 15688, 15628, 15710, 15574, 15493, 15632, 15298, 15640, 15371, 15608]
                            }, {
                            "name": "WP-ARTE.HW.TRS",
                            "id": 15711,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.1",
                                "locked": false
                            },
                            "children": [15536, 15635, 15533, 15324]
                            }, {
                            "name": "WP-ARTE.HW.TRS for GPA1",
                            "id": 15536,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15711,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.1.1",
                                "locked": false
                            },
                            "children": [15599, 15629, 15440, 15699]
                            }, {
                            "name": "ARTE.HW.TRS.CPPR2",
                            "id": 15599,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15536,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 51.35,
                                "codeWBS": "2.1.1.1",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.CPPR2",
                                "id": 15599,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.HIF",
                            "id": 15629,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15536,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 102.7,
                                "codeWBS": "2.1.1.2",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.HIF",
                                "id": 15629,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.OIB",
                            "id": 15440,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15536,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 102.7,
                                "codeWBS": "2.1.1.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.OIB",
                                "id": 15440,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.ETI",
                            "id": 15699,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15536,
                                "workPackage": true,
                                "progress": 71,
                                "canDelete": false,
                                "budget": 460.04,
                                "codeWBS": "2.1.1.4",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-15T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.ETI",
                                "id": 15699,
                                "progress": 71,
                                "from": "2016-06-15T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.TRS for GPA2",
                            "id": 15635,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15711,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.1.2",
                                "locked": false
                            },
                            "children": [15667, 15623, 15435, 15648, 15575, 15434, 15604, 15411]
                            }, {
                            "name": "ARTE.HW.TRS.SYS",
                            "id": 15667,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15635,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1911.44,
                                "codeWBS": "2.1.2.1",
                                "plan": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.SYS",
                                "id": 15667,
                                "progress": 0,
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.JCB",
                            "id": 15623,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15635,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 102.7,
                                "codeWBS": "2.1.2.2",
                                "plan": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.JCB",
                                "id": 15623,
                                "progress": 0,
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.GSP_PGE",
                            "id": 15435,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15635,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1822.34,
                                "codeWBS": "2.1.2.3",
                                "plan": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-20T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-20T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.GSP_PGE",
                                "id": 15435,
                                "progress": 0,
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-20T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-20T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.GSA_CEOE",
                            "id": 15648,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15635,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 3811,
                                "codeWBS": "2.1.2.4",
                                "plan": {
                                "from": "2016-09-20T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-20T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.GSA_CEOE",
                                "id": 15648,
                                "progress": 0,
                                "from": "2016-09-20T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-20T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.CPA_CPM",
                            "id": 15575,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15635,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1911.44,
                                "codeWBS": "2.1.2.5",
                                "plan": {
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-05T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-05T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.CPA_CPM",
                                "id": 15575,
                                "progress": 0,
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-05T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-05T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.EOB",
                            "id": 15434,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15635,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1893.62,
                                "codeWBS": "2.1.2.6",
                                "plan": {
                                "from": "2016-10-05T22:00:00.000Z",
                                "to": "2016-10-12T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-05T22:00:00.000Z",
                                "to": "2016-10-12T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.EOB",
                                "id": 15434,
                                "progress": 0,
                                "from": "2016-10-05T22:00:00.000Z",
                                "to": "2016-10-12T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-05T22:00:00.000Z",
                                "to": "2016-10-12T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.DCA_CCCD",
                            "id": 15604,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15635,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1911.44,
                                "codeWBS": "2.1.2.7",
                                "plan": {
                                "from": "2016-10-12T22:00:00.000Z",
                                "to": "2016-10-18T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-12T22:00:00.000Z",
                                "to": "2016-10-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.DCA_CCCD",
                                "id": 15604,
                                "progress": 0,
                                "from": "2016-10-12T22:00:00.000Z",
                                "to": "2016-10-18T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-12T22:00:00.000Z",
                                "to": "2016-10-18T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.CASTOR HD",
                            "id": 15411,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15635,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1751.06,
                                "codeWBS": "2.1.2.8",
                                "plan": {
                                "from": "2016-10-18T22:00:00.000Z",
                                "to": "2016-10-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-18T22:00:00.000Z",
                                "to": "2016-10-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.CASTOR HD",
                                "id": 15411,
                                "progress": 0,
                                "from": "2016-10-18T22:00:00.000Z",
                                "to": "2016-10-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-18T22:00:00.000Z",
                                "to": "2016-10-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.TRS for GPA-R1",
                            "id": 15533,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15711,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.1.3",
                                "locked": false
                            },
                            "children": [15396, 15408, 15312, 15438, 15337, 15482, 15625, 15419, 15684, 15552, 15518, 15384, 15376]
                            }, {
                            "name": "ARTE.HW.TRS.PSU",
                            "id": 15396,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 26,
                                "canDelete": false,
                                "budget": 681.15,
                                "codeWBS": "2.1.3.1",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-17T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-06T22:00:00.000Z",
                                "to": "2016-08-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.PSU",
                                "id": 15396,
                                "progress": 26,
                                "from": "2016-06-06T22:00:00.000Z",
                                "to": "2016-08-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-17T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.CVI-CVE",
                            "id": 15408,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 22,
                                "canDelete": false,
                                "budget": 460.04,
                                "codeWBS": "2.1.3.2",
                                "plan": {
                                "from": "2016-01-17T23:00:00.000Z",
                                "to": "2016-01-18T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-05T22:00:00.000Z",
                                "to": "2016-08-28T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.CVI-CVE",
                                "id": 15408,
                                "progress": 22,
                                "from": "2016-06-05T22:00:00.000Z",
                                "to": "2016-08-28T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-17T23:00:00.000Z",
                                "to": "2016-01-18T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.TDM",
                            "id": 15312,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 68,
                                "canDelete": false,
                                "budget": 1433.58,
                                "codeWBS": "2.1.3.3",
                                "plan": {
                                "from": "2016-01-18T23:00:00.000Z",
                                "to": "2016-01-27T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-02-11T23:00:00.000Z",
                                "to": "2016-08-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.TDM",
                                "id": 15312,
                                "progress": 68,
                                "from": "2016-02-11T23:00:00.000Z",
                                "to": "2016-08-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-18T23:00:00.000Z",
                                "to": "2016-01-27T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.GBA_GEF",
                            "id": 15438,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 89,
                                "canDelete": false,
                                "budget": 1194.65,
                                "codeWBS": "2.1.3.4",
                                "plan": {
                                "from": "2016-01-26T23:00:00.000Z",
                                "to": "2016-02-07T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.GBA_GEF",
                                "id": 15438,
                                "progress": 89,
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-26T23:00:00.000Z",
                                "to": "2016-02-07T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.CAA_CAG",
                            "id": 15337,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 100,
                                "readOnly": true,
                                "canDelete": false,
                                "budget": 770.25,
                                "codeWBS": "2.1.3.5",
                                "plan": {
                                "from": "2016-02-07T23:00:00.000Z",
                                "to": "2016-02-10T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-05-02T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.CAA_CAG",
                                "id": 15337,
                                "progress": 100,
                                "from": "2016-05-02T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-02-07T23:00:00.000Z",
                                "to": "2016-02-10T23:00:00.000Z"
                                },
                                "movable": false
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.CEA_CEG",
                            "id": 15482,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 57,
                                "canDelete": false,
                                "budget": 770.25,
                                "codeWBS": "2.1.3.6",
                                "plan": {
                                "from": "2016-02-10T23:00:00.000Z",
                                "to": "2016-02-15T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-04-25T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.CEA_CEG",
                                "id": 15482,
                                "progress": 57,
                                "from": "2016-04-25T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-02-10T23:00:00.000Z",
                                "to": "2016-02-15T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.FAM",
                            "id": 15625,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 28,
                                "canDelete": false,
                                "budget": 681.15,
                                "codeWBS": "2.1.3.7",
                                "plan": {
                                "from": "2016-02-15T23:00:00.000Z",
                                "to": "2016-02-16T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-10T23:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.FAM",
                                "id": 15625,
                                "progress": 28,
                                "from": "2016-03-10T23:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-02-15T23:00:00.000Z",
                                "to": "2016-02-16T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.TIG",
                            "id": 15419,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 82,
                                "canDelete": false,
                                "budget": 1433.58,
                                "codeWBS": "2.1.3.8",
                                "plan": {
                                "from": "2016-02-16T23:00:00.000Z",
                                "to": "2016-02-24T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-02-16T23:00:00.000Z",
                                "to": "2016-08-22T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.TIG",
                                "id": 15419,
                                "progress": 82,
                                "from": "2016-02-16T23:00:00.000Z",
                                "to": "2016-08-22T22:00:00.000Z",
                                "base": {
                                "from": "2016-02-16T23:00:00.000Z",
                                "to": "2016-02-24T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.THHN",
                            "id": 15684,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 83,
                                "canDelete": false,
                                "budget": 716.79,
                                "codeWBS": "2.1.3.9",
                                "plan": {
                                "from": "2016-02-24T23:00:00.000Z",
                                "to": "2016-03-01T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-09T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.THHN",
                                "id": 15684,
                                "progress": 83,
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-09T23:00:00.000Z",
                                "base": {
                                "from": "2016-02-24T23:00:00.000Z",
                                "to": "2016-03-01T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.PSFN",
                            "id": 15552,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 43,
                                "canDelete": false,
                                "budget": 442.22,
                                "codeWBS": "2.1.3.10",
                                "plan": {
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-01T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-21T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.PSFN",
                                "id": 15552,
                                "progress": 43,
                                "from": "2016-08-21T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-01T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.PSM2B",
                            "id": 15518,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 28,
                                "canDelete": false,
                                "budget": 636.6,
                                "codeWBS": "2.1.3.11",
                                "plan": {
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-02T22:00:00.000Z",
                                "to": "2016-08-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.PSM2B",
                                "id": 15518,
                                "progress": 28,
                                "from": "2016-06-02T22:00:00.000Z",
                                "to": "2016-08-18T22:00:00.000Z",
                                "base": {
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.UEC",
                            "id": 15384,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 16,
                                "canDelete": false,
                                "budget": 256.75,
                                "codeWBS": "2.1.3.12",
                                "plan": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-18T22:00:00.000Z",
                                "to": "2016-08-28T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.UEC",
                                "id": 15384,
                                "progress": 16,
                                "from": "2016-08-18T22:00:00.000Z",
                                "to": "2016-08-28T22:00:00.000Z",
                                "base": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.SIF",
                            "id": 15376,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15533,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 256.75,
                                "codeWBS": "2.1.3.13",
                                "plan": {
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.SIF",
                                "id": 15376,
                                "progress": 0,
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.TRS for GPA-R2",
                            "id": 15324,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15711,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.1.4",
                                "locked": false
                            },
                            "children": [15330, 15356, 15606, 15304, 15561, 15462, 15404]
                            }, {
                            "name": "ARTE.HW.TRS.VDM-VSB",
                            "id": 15330,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15324,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1433.58,
                                "codeWBS": "2.1.4.1",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2016-12-18T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2016-12-18T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.VDM-VSB",
                                "id": 15330,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2016-12-18T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2016-12-18T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.CEB_CEC",
                            "id": 15356,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15324,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1911.44,
                                "codeWBS": "2.1.4.2",
                                "plan": {
                                "from": "2016-12-18T23:00:00.000Z",
                                "to": "2017-01-01T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-18T23:00:00.000Z",
                                "to": "2017-01-01T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.CEB_CEC",
                                "id": 15356,
                                "progress": 0,
                                "from": "2016-12-18T23:00:00.000Z",
                                "to": "2017-01-01T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-18T23:00:00.000Z",
                                "to": "2017-01-01T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.TCC",
                            "id": 15606,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15324,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1911.44,
                                "codeWBS": "2.1.4.3",
                                "plan": {
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-05T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-05T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.TCC",
                                "id": 15606,
                                "progress": 0,
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-05T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-05T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.BPL",
                            "id": 15304,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15324,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1194.65,
                                "codeWBS": "2.1.4.4",
                                "plan": {
                                "from": "2017-01-05T23:00:00.000Z",
                                "to": "2017-01-09T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-05T23:00:00.000Z",
                                "to": "2017-01-09T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.BPL",
                                "id": 15304,
                                "progress": 0,
                                "from": "2017-01-05T23:00:00.000Z",
                                "to": "2017-01-09T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-05T23:00:00.000Z",
                                "to": "2017-01-09T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.SDI",
                            "id": 15561,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15324,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 513.5,
                                "codeWBS": "2.1.4.5",
                                "plan": {
                                "from": "2017-01-09T23:00:00.000Z",
                                "to": "2017-01-11T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-09T23:00:00.000Z",
                                "to": "2017-01-11T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.SDI",
                                "id": 15561,
                                "progress": 0,
                                "from": "2017-01-09T23:00:00.000Z",
                                "to": "2017-01-11T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-09T23:00:00.000Z",
                                "to": "2017-01-11T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.ETS",
                            "id": 15462,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15324,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 716.79,
                                "codeWBS": "2.1.4.6",
                                "plan": {
                                "from": "2017-01-11T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-11T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.ETS",
                                "id": 15462,
                                "progress": 0,
                                "from": "2017-01-11T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-11T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.TRS.SIP",
                            "id": 15404,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15324,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 442.22,
                                "codeWBS": "2.1.4.7",
                                "plan": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.TRS.SIP",
                                "id": 15404,
                                "progress": 0,
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.MF.Adaptation",
                            "id": 15688,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.2",
                                "locked": false
                            },
                            "children": [15527, 15538, 15593, 15381, 15498]
                            }, {
                            "name": "ARTE.HW.MF.ZATE Structure Migration",
                            "id": 15527,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15688,
                                "workPackage": true,
                                "progress": 47,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "2.2.1",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-28T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-31T22:00:00.000Z",
                                "to": "2016-09-22T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.MF.ZATE Structure Migration",
                                "id": 15527,
                                "progress": 47,
                                "from": "2016-03-31T22:00:00.000Z",
                                "to": "2016-09-22T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-28T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.MF.ZATE Obsolescences Resolution",
                            "id": 15538,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15688,
                                "workPackage": true,
                                "progress": 74,
                                "canDelete": false,
                                "budget": 6706,
                                "codeWBS": "2.2.2",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-31T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-31T22:00:00.000Z",
                                "to": "2016-09-19T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.MF.ZATE Obsolescences Resolution",
                                "id": 15538,
                                "progress": 74,
                                "from": "2016-03-31T22:00:00.000Z",
                                "to": "2016-09-19T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-31T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.MF.HDSDI Modifications (MF&CU&PXI)",
                            "id": 15593,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15688,
                                "workPackage": true,
                                "progress": 32,
                                "canDelete": false,
                                "budget": 2011.8,
                                "codeWBS": "2.2.3",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-20T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-04-13T22:00:00.000Z",
                                "to": "2016-05-15T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.MF.HDSDI Modifications (MF&CU&PXI)",
                                "id": 15593,
                                "progress": 32,
                                "from": "2016-04-13T22:00:00.000Z",
                                "to": "2016-05-15T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-20T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.MF.HDSDI Cables Design (MF&PXI)",
                            "id": 15381,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15688,
                                "workPackage": true,
                                "progress": 66,
                                "canDelete": false,
                                "budget": 2011.8,
                                "codeWBS": "2.2.4",
                                "plan": {
                                "from": "2016-04-11T22:00:00.000Z",
                                "to": "2016-04-20T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-04-11T22:00:00.000Z",
                                "to": "2016-05-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.MF.HDSDI Cables Design (MF&PXI)",
                                "id": 15381,
                                "progress": 66,
                                "from": "2016-04-11T22:00:00.000Z",
                                "to": "2016-05-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-04-11T22:00:00.000Z",
                                "to": "2016-04-20T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.MF.HDSDI Cables CAD",
                            "id": 15498,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15688,
                                "workPackage": true,
                                "progress": 50,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "2.2.5",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-20T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-05-04T22:00:00.000Z",
                                "to": "2016-05-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.MF.HDSDI Cables CAD",
                                "id": 15498,
                                "progress": 50,
                                "from": "2016-05-04T22:00:00.000Z",
                                "to": "2016-05-18T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-20T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.GPA-R1",
                            "id": 15628,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.3",
                                "locked": false
                            },
                            "children": [15394, 15634, 15549, 15465, 15362, 15616, 15299, 15359, 15372, 15596, 15605]
                            }, {
                            "name": "ARTE.HW.GPA-R1.Board Design",
                            "id": 15394,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 2,
                                "canDelete": false,
                                "budget": 33124.3,
                                "codeWBS": "2.3.1",
                                "plan": {
                                "from": "2016-05-10T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-05-10T22:00:00.000Z",
                                "to": "2016-08-31T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1.Board Design",
                                "id": 15394,
                                "progress": 2,
                                "from": "2016-05-10T22:00:00.000Z",
                                "to": "2016-08-31T22:00:00.000Z",
                                "base": {
                                "from": "2016-05-10T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R1.CAD PCB",
                            "id": 15634,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 12448.3,
                                "codeWBS": "2.3.2",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1.CAD PCB",
                                "id": 15634,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R1.Mechanical Design",
                            "id": 15549,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "2.3.3",
                                "plan": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-13T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-13T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1.Mechanical Design",
                                "id": 15549,
                                "progress": 0,
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-13T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-13T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R1.CAD MEC",
                            "id": 15465,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "2.3.4",
                                "plan": {
                                "from": "2016-03-13T23:00:00.000Z",
                                "to": "2016-03-17T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-13T23:00:00.000Z",
                                "to": "2016-03-17T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1.CAD MEC",
                                "id": 15465,
                                "progress": 0,
                                "from": "2016-03-13T23:00:00.000Z",
                                "to": "2016-03-17T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-13T23:00:00.000Z",
                                "to": "2016-03-17T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R1.CBL Design",
                            "id": 15362,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 28,
                                "canDelete": false,
                                "budget": 4694.2,
                                "codeWBS": "2.3.5",
                                "plan": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-04-05T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-04-04T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1.CBL Design",
                                "id": 15362,
                                "progress": 28,
                                "from": "2016-04-04T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z",
                                "base": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-04-05T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R1.CAD CBL",
                            "id": 15616,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "2.3.6",
                                "plan": {
                                "from": "2016-04-11T22:00:00.000Z",
                                "to": "2016-04-25T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-04-11T22:00:00.000Z",
                                "to": "2016-04-25T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1.CAD CBL",
                                "id": 15616,
                                "progress": 0,
                                "from": "2016-04-11T22:00:00.000Z",
                                "to": "2016-04-25T22:00:00.000Z",
                                "base": {
                                "from": "2016-04-11T22:00:00.000Z",
                                "to": "2016-04-25T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R1.UABs-UACs Design",
                            "id": 15299,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 55,
                                "canDelete": false,
                                "budget": 7062.4,
                                "codeWBS": "2.3.7",
                                "plan": {
                                "from": "2016-05-08T22:00:00.000Z",
                                "to": "2016-06-12T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-05-05T22:00:00.000Z",
                                "to": "2016-08-31T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1.UABs-UACs Design",
                                "id": 15299,
                                "progress": 55,
                                "from": "2016-05-05T22:00:00.000Z",
                                "to": "2016-08-31T22:00:00.000Z",
                                "base": {
                                "from": "2016-05-08T22:00:00.000Z",
                                "to": "2016-06-12T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R1.CAD UABs-UACs",
                            "id": 15359,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 60,
                                "canDelete": false,
                                "budget": 6905.3,
                                "codeWBS": "2.3.8",
                                "plan": {
                                "from": "2016-06-12T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-17T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1.CAD UABs-UACs",
                                "id": 15359,
                                "progress": 60,
                                "from": "2016-07-17T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-12T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R1 Validation",
                            "id": 15372,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 3395.2,
                                "codeWBS": "2.3.9",
                                "plan": {
                                "from": "2017-03-01T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-01T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1 Validation",
                                "id": 15372,
                                "progress": 0,
                                "from": "2017-03-01T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-01T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R1.UUTs Integration",
                            "id": 15596,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 24394.8,
                                "codeWBS": "2.3.10",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-04-16T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-04-16T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1.UUTs Integration",
                                "id": 15596,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-04-16T22:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-04-16T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R1.Manufacturing Engineering",
                            "id": 15605,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15628,
                                "workPackage": true,
                                "progress": 2,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "2.3.11",
                                "plan": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-04-07T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R1.Manufacturing Engineering",
                                "id": 15605,
                                "progress": 2,
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z",
                                "base": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-04-07T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.GPA-R2",
                            "id": 15710,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.4",
                                "locked": false
                            },
                            "children": [15562, 15502, 15417, 15400, 15315, 15678, 15407, 15385, 15588, 15712, 15649]
                            }, {
                            "name": "ARTE.HW.GPA-R2.Board Design",
                            "id": 15562,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 25935.3,
                                "codeWBS": "2.4.1",
                                "plan": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-03-13T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-03-13T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.Board Design",
                                "id": 15562,
                                "progress": 0,
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-03-13T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-03-13T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R2.CAD PCB",
                            "id": 15502,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 8246.5,
                                "codeWBS": "2.4.2",
                                "plan": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-13T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-13T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.CAD PCB",
                                "id": 15502,
                                "progress": 0,
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-13T22:00:00.000Z",
                                "base": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-13T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R2.Mechanical Design",
                            "id": 15417,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1173.55,
                                "codeWBS": "2.4.3",
                                "plan": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-19T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-19T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.Mechanical Design",
                                "id": 15417,
                                "progress": 0,
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-19T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-19T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R2.CAD MEC",
                            "id": 15400,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "2.4.4",
                                "plan": {
                                "from": "2017-01-19T23:00:00.000Z",
                                "to": "2017-02-02T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-19T23:00:00.000Z",
                                "to": "2017-02-02T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.CAD MEC",
                                "id": 15400,
                                "progress": 0,
                                "from": "2017-01-19T23:00:00.000Z",
                                "to": "2017-02-02T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-19T23:00:00.000Z",
                                "to": "2017-02-02T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R2.CBL Design",
                            "id": 15315,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 10729.6,
                                "codeWBS": "2.4.5",
                                "plan": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-03-07T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-03-07T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.CBL Design",
                                "id": 15315,
                                "progress": 0,
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-03-07T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-03-07T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R2.CAD CBL",
                            "id": 15678,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 8047.2,
                                "codeWBS": "2.4.6",
                                "plan": {
                                "from": "2017-03-07T23:00:00.000Z",
                                "to": "2017-04-18T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-07T23:00:00.000Z",
                                "to": "2017-04-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.CAD CBL",
                                "id": 15678,
                                "progress": 0,
                                "from": "2017-03-07T23:00:00.000Z",
                                "to": "2017-04-18T22:00:00.000Z",
                                "base": {
                                "from": "2017-03-07T23:00:00.000Z",
                                "to": "2017-04-18T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R2.UABs-UACs Design",
                            "id": 15407,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 7062.4,
                                "codeWBS": "2.4.7",
                                "plan": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-02-13T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-02-13T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.UABs-UACs Design",
                                "id": 15407,
                                "progress": 0,
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-02-13T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-02-13T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R2.CAD UABs-UACs",
                            "id": 15385,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 6905.3,
                                "codeWBS": "2.4.8",
                                "plan": {
                                "from": "2017-02-13T23:00:00.000Z",
                                "to": "2017-03-13T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-02-13T23:00:00.000Z",
                                "to": "2017-03-13T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.CAD UABs-UACs",
                                "id": 15385,
                                "progress": 0,
                                "from": "2017-02-13T23:00:00.000Z",
                                "to": "2017-03-13T23:00:00.000Z",
                                "base": {
                                "from": "2017-02-13T23:00:00.000Z",
                                "to": "2017-03-13T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R2.Validation",
                            "id": 15588,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 3395.2,
                                "codeWBS": "2.4.9",
                                "plan": {
                                "from": "2017-09-25T22:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-09-25T22:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.Validation",
                                "id": 15588,
                                "progress": 0,
                                "from": "2017-09-25T22:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z",
                                "base": {
                                "from": "2017-09-25T22:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R2.UUTs Integration",
                            "id": 15712,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 23514.35,
                                "codeWBS": "2.4.10",
                                "plan": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-11-05T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-11-05T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.UUTs Integration",
                                "id": 15712,
                                "progress": 0,
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-11-05T23:00:00.000Z",
                                "base": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-11-05T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.GPA-R2.Manufacturing Engineering",
                            "id": 15649,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15710,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "2.4.11",
                                "plan": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-02-09T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-02-09T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.GPA-R2.Manufacturing Engineering",
                                "id": 15649,
                                "progress": 0,
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-02-09T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-02-09T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.GPA1 Refitting",
                            "id": 15574,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.5",
                                "locked": false
                            },
                            "children": [15598, 15525, 15603, 15338, 15698]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA1 UACs Design",
                            "id": 15598,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15574,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2112.39,
                                "codeWBS": "2.5.1",
                                "plan": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-09-06T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-09-06T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA1 UACs Design",
                                "id": 15598,
                                "progress": 0,
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-09-06T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-09-06T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA1 CAD UACs",
                            "id": 15525,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15574,
                                "workPackage": true,
                                "progress": 18,
                                "canDelete": false,
                                "budget": 3353,
                                "codeWBS": "2.5.2",
                                "plan": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-22T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-09-06T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA1 CAD UACs",
                                "id": 15525,
                                "progress": 18,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-09-06T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-22T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA1 Validation",
                            "id": 15603,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15574,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "2.5.3",
                                "plan": {
                                "from": "2016-11-14T23:00:00.000Z",
                                "to": "2016-11-16T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-11-14T23:00:00.000Z",
                                "to": "2016-11-16T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA1 Validation",
                                "id": 15603,
                                "progress": 0,
                                "from": "2016-11-14T23:00:00.000Z",
                                "to": "2016-11-16T23:00:00.000Z",
                                "base": {
                                "from": "2016-11-14T23:00:00.000Z",
                                "to": "2016-11-16T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA1 UUTs Integration",
                            "id": 15338,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15574,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "2.5.4",
                                "plan": {
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-23T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-23T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA1 UUTs Integration",
                                "id": 15338,
                                "progress": 0,
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-23T23:00:00.000Z",
                                "base": {
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-23T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA1 Manufacturing Engineering",
                            "id": 15698,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15574,
                                "workPackage": true,
                                "progress": 41,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "2.5.5",
                                "plan": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-09-01T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-22T22:00:00.000Z",
                                "to": "2016-09-05T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA1 Manufacturing Engineering",
                                "id": 15698,
                                "progress": 41,
                                "from": "2016-08-22T22:00:00.000Z",
                                "to": "2016-09-05T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-09-01T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.GPA2 Refitting",
                            "id": 15493,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.6",
                                "locked": false
                            },
                            "children": [15303, 15499, 15626, 15528, 15344, 15613, 15490]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA2 UACs Design",
                            "id": 15303,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15493,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 9153.69,
                                "codeWBS": "2.6.1",
                                "plan": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-12-13T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-12-13T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA2 UACs Design",
                                "id": 15303,
                                "progress": 0,
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-12-13T23:00:00.000Z",
                                "base": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-12-13T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA2 CAD UACs",
                            "id": 15499,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15493,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 6706,
                                "codeWBS": "2.6.2",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA2 CAD UACs",
                                "id": 15499,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA2 HDSDI Cables Design",
                            "id": 15626,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15493,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "2.6.3",
                                "plan": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-11-01T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-11-01T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA2 HDSDI Cables Design",
                                "id": 15626,
                                "progress": 0,
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-11-01T23:00:00.000Z",
                                "base": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-11-01T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA2 HDSDI Cables CAD",
                            "id": 15528,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15493,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "2.6.4",
                                "plan": {
                                "from": "2016-11-01T23:00:00.000Z",
                                "to": "2016-11-07T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-11-01T23:00:00.000Z",
                                "to": "2016-11-07T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA2 HDSDI Cables CAD",
                                "id": 15528,
                                "progress": 0,
                                "from": "2016-11-01T23:00:00.000Z",
                                "to": "2016-11-07T23:00:00.000Z",
                                "base": {
                                "from": "2016-11-01T23:00:00.000Z",
                                "to": "2016-11-07T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA2 Validation",
                            "id": 15344,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15493,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1005.9,
                                "codeWBS": "2.6.5",
                                "plan": {
                                "from": "2017-06-18T22:00:00.000Z",
                                "to": "2017-06-21T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-06-18T22:00:00.000Z",
                                "to": "2017-06-21T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA2 Validation",
                                "id": 15344,
                                "progress": 0,
                                "from": "2017-06-18T22:00:00.000Z",
                                "to": "2017-06-21T22:00:00.000Z",
                                "base": {
                                "from": "2017-06-18T22:00:00.000Z",
                                "to": "2017-06-21T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA2 UUTs Integration",
                            "id": 15613,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15493,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 13076.7,
                                "codeWBS": "2.6.6",
                                "plan": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA2 UUTs Integration",
                                "id": 15613,
                                "progress": 0,
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ZGPAs.GPA2 Manufacturing Engineering",
                            "id": 15490,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15493,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1676.5,
                                "codeWBS": "2.6.7",
                                "plan": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-11-02T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-11-02T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ZGPAs.GPA2 Manufacturing Engineering",
                                "id": 15490,
                                "progress": 0,
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-11-02T23:00:00.000Z",
                                "base": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-11-02T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.CTA-R1",
                            "id": 15632,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.7",
                                "locked": false
                            },
                            "children": [15318, 15370, 15611, 15398, 15647]
                            }, {
                            "name": "ARTE.HW.CTA-R1.Mechanical Design",
                            "id": 15318,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15632,
                                "workPackage": true,
                                "progress": 22,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "2.7.1",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-27T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-05-08T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.CTA-R1.Mechanical Design",
                                "id": 15318,
                                "progress": 22,
                                "from": "2016-05-08T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-27T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.CTA-R1.CBL Design",
                            "id": 15370,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15632,
                                "workPackage": true,
                                "progress": 37,
                                "canDelete": false,
                                "budget": 3353,
                                "codeWBS": "2.7.2",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-02-01T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-05-23T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.CTA-R1.CBL Design",
                                "id": 15370,
                                "progress": 37,
                                "from": "2016-05-23T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-02-01T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.CTA-R1.CAD Design",
                            "id": 15611,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15632,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 3353,
                                "codeWBS": "2.7.3",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.CTA-R1.CAD Design",
                                "id": 15611,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.CTA-R1.Integration",
                            "id": 15398,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15632,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "2.7.4",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.CTA-R1.Integration",
                                "id": 15398,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.CTA-R1.Manufacturing Engineering",
                            "id": 15647,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15632,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2011.8,
                                "codeWBS": "2.7.5",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-04T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.CTA-R1.Manufacturing Engineering",
                                "id": 15647,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-04T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.Validation Tools",
                            "id": 15298,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.8",
                                "locked": false
                            },
                            "children": [15587, 15633, 15602]
                            }, {
                            "name": "ARTE.HW.VAL.Design",
                            "id": 15587,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15298,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "2.8.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.VAL.Design",
                                "id": 15587,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.VAL. CAD Design",
                            "id": 15633,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15298,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "2.8.2",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-12T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-12T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.VAL. CAD Design",
                                "id": 15633,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-12T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-12T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.VAL.Integration",
                            "id": 15602,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15298,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4647.3,
                                "codeWBS": "2.8.3",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.VAL.Integration",
                                "id": 15602,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.QTE",
                            "id": 15640,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.9",
                                "locked": false
                            },
                            "children": [15523, 15325, 15644, 15553]
                            }, {
                            "name": "ARTE.HW.QTE.Design",
                            "id": 15523,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15640,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "2.9.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.QTE.Design",
                                "id": 15523,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.QTE.CAD Design",
                            "id": 15325,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15640,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2011.8,
                                "codeWBS": "2.9.2",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.QTE.CAD Design",
                                "id": 15325,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.QTE.Integration",
                            "id": 15644,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15640,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 3395.2,
                                "codeWBS": "2.9.3",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.QTE.Integration",
                                "id": 15644,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.QTE.Manufacturing Engineering",
                            "id": 15553,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15640,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1005.9,
                                "codeWBS": "2.9.4",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.QTE.Manufacturing Engineering",
                                "id": 15553,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.ESS",
                            "id": 15371,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.10",
                                "locked": false
                            },
                            "children": [15347, 15558, 15444, 15452]
                            }, {
                            "name": "ARTE.HW.ESS.Design",
                            "id": 15347,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15371,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "2.10.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ESS.Design",
                                "id": 15347,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ESS.CAD Design",
                            "id": 15558,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15371,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2011.8,
                                "codeWBS": "2.10.2",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ESS.CAD Design",
                                "id": 15558,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ESS.Integration",
                            "id": 15444,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15371,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "2.10.3",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ESS.Integration",
                                "id": 15444,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.ESS.Manufacturing Engineering",
                            "id": 15452,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15371,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "2.10.4",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.ESS.Manufacturing Engineering",
                                "id": 15452,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.HW.Alignment Mechanical Adaptors",
                            "id": 15608,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15449,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "2.11",
                                "locked": false
                            },
                            "children": [15307, 15615, 15662]
                            }, {
                            "name": "ARTE.HW.LOS.Design",
                            "id": 15307,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15608,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 6077.6,
                                "codeWBS": "2.11.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.LOS.Design",
                                "id": 15307,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.LOS.CAD Design",
                            "id": 15615,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15608,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "2.11.2",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-19T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-19T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.LOS.CAD Design",
                                "id": 15615,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-19T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-07-19T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.HW.LOS.Integration",
                            "id": 15662,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15608,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "2.11.3",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-24T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.HW.LOS.Integration",
                                "id": 15662,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-24T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "SW PACKAGES",
                            "id": 15597,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15345,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3",
                                "locked": false
                            },
                            "children": [15403, 15509, 15548, 15572, 15306, 15665]
                            }, {
                            "name": "WP-ARTE.SW.Drivers for instrumentation",
                            "id": 15403,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15597,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.1",
                                "locked": false
                            },
                            "children": [15557, 15556]
                            }, {
                            "name": "WP-ARTE.SW.Motion Table comms",
                            "id": 15557,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15403,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.1.1",
                                "locked": false
                            },
                            "children": [15320, 15467, 15570, 15614, 15497]
                            }, {
                            "name": "ARTE.SW.MOT.Specification",
                            "id": 15320,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15557,
                                "workPackage": true,
                                "progress": 19,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.1.1.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-19T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.MOT.Specification",
                                "id": 15320,
                                "progress": 19,
                                "from": "2016-06-19T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.MOT.Design",
                            "id": 15467,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15557,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1005.9,
                                "codeWBS": "3.1.1.2",
                                "plan": {
                                "from": "2016-06-26T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-26T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.MOT.Design",
                                "id": 15467,
                                "progress": 0,
                                "from": "2016-06-26T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-26T22:00:00.000Z",
                                "to": "2016-07-03T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.MOT.Implementation",
                            "id": 15570,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15557,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.1.1.3",
                                "plan": {
                                "from": "2016-07-03T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-03T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.MOT.Implementation",
                                "id": 15570,
                                "progress": 0,
                                "from": "2016-07-03T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-03T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.MOT.Unit Testing",
                            "id": 15614,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15557,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.1.1.4",
                                "plan": {
                                "from": "2016-07-10T22:00:00.000Z",
                                "to": "2016-07-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-10T22:00:00.000Z",
                                "to": "2016-07-26T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.MOT.Unit Testing",
                                "id": 15614,
                                "progress": 0,
                                "from": "2016-07-10T22:00:00.000Z",
                                "to": "2016-07-26T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-10T22:00:00.000Z",
                                "to": "2016-07-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.MOT.Integration",
                            "id": 15497,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15557,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.1.1.5",
                                "plan": {
                                "from": "2016-07-26T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-26T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.MOT.Integration",
                                "id": 15497,
                                "progress": 0,
                                "from": "2016-07-26T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-26T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.New instrumentation comms",
                            "id": 15556,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15403,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.1.2",
                                "locked": false
                            },
                            "children": [15368, 15654, 15369, 15522, 15395]
                            }, {
                            "name": "ARTE.SW.INSTR.Specification",
                            "id": 15368,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15556,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.1.2.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.INSTR.Specification",
                                "id": 15368,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.INSTR.Design",
                            "id": 15654,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15556,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.1.2.2",
                                "plan": {
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.INSTR.Design",
                                "id": 15654,
                                "progress": 0,
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.INSTR.Implementation",
                            "id": 15369,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15556,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.1.2.3",
                                "plan": {
                                "from": "2016-07-07T22:00:00.000Z",
                                "to": "2016-07-24T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-07T22:00:00.000Z",
                                "to": "2016-07-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.INSTR.Implementation",
                                "id": 15369,
                                "progress": 0,
                                "from": "2016-07-07T22:00:00.000Z",
                                "to": "2016-07-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-07T22:00:00.000Z",
                                "to": "2016-07-24T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.INSTR.Unit Testing",
                            "id": 15522,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15556,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.1.2.4",
                                "plan": {
                                "from": "2016-07-24T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-24T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.INSTR.Unit Testing",
                                "id": 15522,
                                "progress": 0,
                                "from": "2016-07-24T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-24T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.INSTR.Integration",
                            "id": 15395,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15556,
                                "workPackage": true,
                                "progress": 6,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "3.1.2.5",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-12T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.INSTR.Integration",
                                "id": 15395,
                                "progress": 6,
                                "from": "2016-07-12T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.Functional tests for modules",
                            "id": 15509,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15597,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2",
                                "locked": false
                            },
                            "children": [15672, 15387, 15373, 15328, 15617, 15576, 15340, 15486, 15488, 15627, 15504, 15697, 15594, 15377, 15476, 15334]
                            }, {
                            "name": "WP-ARTE.SW.FT.GBA_GEF Functional Tests",
                            "id": 15672,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.1",
                                "locked": false
                            },
                            "children": [15638, 15420, 15427, 15630]
                            }, {
                            "name": "ARTE.SW.FT.GBA_GEF.Specification",
                            "id": 15638,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15672,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.1.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GBA_GEF.Specification",
                                "id": 15638,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.GBA_GEF.Design",
                            "id": 15420,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15672,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.1.2",
                                "plan": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GBA_GEF.Design",
                                "id": 15420,
                                "progress": 0,
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.GBA_GEF.Implementation",
                            "id": 15427,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15672,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.2.1.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GBA_GEF.Implementation",
                                "id": 15427,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.GBA_GEF.Integration",
                            "id": 15630,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15672,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.2.1.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GBA_GEF.Integration",
                                "id": 15630,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.THHN Functional Tests",
                            "id": 15387,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.2",
                                "locked": false
                            },
                            "children": [15513, 15674, 15336, 15402]
                            }, {
                            "name": "ARTE.SW.FT.THHN.Specification",
                            "id": 15513,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15387,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.2.1",
                                "plan": {
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.THHN.Specification",
                                "id": 15513,
                                "progress": 0,
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.THHN.Design",
                            "id": 15674,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15387,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.2.2",
                                "plan": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.THHN.Design",
                                "id": 15674,
                                "progress": 0,
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.THHN.Implementation",
                            "id": 15336,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15387,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2011.8,
                                "codeWBS": "3.2.2.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-04T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.THHN.Implementation",
                                "id": 15336,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-04T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.THHN.Integration",
                            "id": 15402,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15387,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.2.2.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.THHN.Integration",
                                "id": 15402,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.CVI-CVE Tests",
                            "id": 15373,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.3",
                                "locked": false
                            },
                            "children": [15354, 15391, 15492, 15621]
                            }, {
                            "name": "ARTE.SW.FT.CVI-CVE.Specification",
                            "id": 15354,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15373,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.3.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CVI-CVE.Specification",
                                "id": 15354,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CVI-CVE.Design",
                            "id": 15391,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15373,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.3.2",
                                "plan": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CVI-CVE.Design",
                                "id": 15391,
                                "progress": 0,
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CVI-CVE.Implementation",
                            "id": 15492,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15373,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.2.3.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CVI-CVE.Implementation",
                                "id": 15492,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CVI-CVE.Integration",
                            "id": 15621,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15373,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.2.3.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-15T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-15T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CVI-CVE.Integration",
                                "id": 15621,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-15T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-15T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.CEB_CEC Tests",
                            "id": 15328,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.4",
                                "locked": false
                            },
                            "children": [15451, 15460, 15329, 15631]
                            }, {
                            "name": "ARTE.SW.FT.CEB_CEC.Specification",
                            "id": 15451,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15328,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.4.1",
                                "plan": {
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-02T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-02T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CEB_CEC.Specification",
                                "id": 15451,
                                "progress": 0,
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-02T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-02T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CEB_CEC.Design",
                            "id": 15460,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15328,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.4.2",
                                "plan": {
                                "from": "2017-01-02T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-02T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CEB_CEC.Design",
                                "id": 15460,
                                "progress": 0,
                                "from": "2017-01-02T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-02T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CEB_CEC.Implementation",
                            "id": 15329,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15328,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "3.2.4.3",
                                "plan": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-09T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-09T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CEB_CEC.Implementation",
                                "id": 15329,
                                "progress": 0,
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-09T22:00:00.000Z",
                                "base": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-09T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CEB_CEC.Integration",
                            "id": 15631,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15328,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "3.2.4.4",
                                "plan": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-26T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CEB_CEC.Integration",
                                "id": 15631,
                                "progress": 0,
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-26T22:00:00.000Z",
                                "base": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.VDM-VSB Tests",
                            "id": 15617,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.5",
                                "locked": false
                            },
                            "children": [15636, 15441, 15705, 15418]
                            }, {
                            "name": "ARTE.SW.FT.VDM-VSB.Specification",
                            "id": 15636,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15617,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.5.1",
                                "plan": {
                                "from": "2016-12-18T23:00:00.000Z",
                                "to": "2016-12-20T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-18T23:00:00.000Z",
                                "to": "2016-12-20T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.VDM-VSB.Specification",
                                "id": 15636,
                                "progress": 0,
                                "from": "2016-12-18T23:00:00.000Z",
                                "to": "2016-12-20T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-18T23:00:00.000Z",
                                "to": "2016-12-20T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.VDM-VSB.Design",
                            "id": 15441,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15617,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.5.2",
                                "plan": {
                                "from": "2016-12-20T23:00:00.000Z",
                                "to": "2016-12-21T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-20T23:00:00.000Z",
                                "to": "2016-12-21T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.VDM-VSB.Design",
                                "id": 15441,
                                "progress": 0,
                                "from": "2016-12-20T23:00:00.000Z",
                                "to": "2016-12-21T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-20T23:00:00.000Z",
                                "to": "2016-12-21T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.VDM-VSB.Implementation",
                            "id": 15705,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15617,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "3.2.5.3",
                                "plan": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.VDM-VSB.Implementation",
                                "id": 15705,
                                "progress": 0,
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-02T22:00:00.000Z",
                                "base": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.VDM-VSB.Integration",
                            "id": 15418,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15617,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "3.2.5.4",
                                "plan": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-19T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-19T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.VDM-VSB.Integration",
                                "id": 15418,
                                "progress": 0,
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-19T22:00:00.000Z",
                                "base": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-19T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.CPA_CPM Tests",
                            "id": 15576,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.6",
                                "locked": false
                            },
                            "children": [15353, 15349, 15446, 15703]
                            }, {
                            "name": "ARTE.SW.FT.CPA_CPM.Specification",
                            "id": 15353,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15576,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.6.1",
                                "plan": {
                                "from": "2016-10-05T22:00:00.000Z",
                                "to": "2016-10-06T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-05T22:00:00.000Z",
                                "to": "2016-10-06T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CPA_CPM.Specification",
                                "id": 15353,
                                "progress": 0,
                                "from": "2016-10-05T22:00:00.000Z",
                                "to": "2016-10-06T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-05T22:00:00.000Z",
                                "to": "2016-10-06T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CPA_CPM.Design",
                            "id": 15349,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15576,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.6.2",
                                "plan": {
                                "from": "2016-10-06T22:00:00.000Z",
                                "to": "2016-10-10T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-06T22:00:00.000Z",
                                "to": "2016-10-10T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CPA_CPM.Design",
                                "id": 15349,
                                "progress": 0,
                                "from": "2016-10-06T22:00:00.000Z",
                                "to": "2016-10-10T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-06T22:00:00.000Z",
                                "to": "2016-10-10T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CPA_CPM.Implementation",
                            "id": 15446,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15576,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "3.2.6.3",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CPA_CPM.Implementation",
                                "id": 15446,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CPA_CPM.Integration",
                            "id": 15703,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15576,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 6706,
                                "codeWBS": "3.2.6.4",
                                "plan": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CPA_CPM.Integration",
                                "id": 15703,
                                "progress": 0,
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z",
                                "base": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.SYSTEM Tests",
                            "id": 15340,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.7",
                                "locked": false
                            },
                            "children": [15660, 15643, 15589, 15569]
                            }, {
                            "name": "ARTE.SW.FT.SYS.Specification",
                            "id": 15660,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15340,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.7.1",
                                "plan": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-15T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-15T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SYS.Specification",
                                "id": 15660,
                                "progress": 0,
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-15T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-15T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SYS.Design",
                            "id": 15643,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15340,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.7.2",
                                "plan": {
                                "from": "2016-09-15T22:00:00.000Z",
                                "to": "2016-09-19T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-15T22:00:00.000Z",
                                "to": "2016-09-19T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SYS.Design",
                                "id": 15643,
                                "progress": 0,
                                "from": "2016-09-15T22:00:00.000Z",
                                "to": "2016-09-19T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-15T22:00:00.000Z",
                                "to": "2016-09-19T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SYS.Implementation",
                            "id": 15589,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15340,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.2.7.3",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SYS.Implementation",
                                "id": 15589,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SYS.Integration",
                            "id": 15569,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15340,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "3.2.7.4",
                                "plan": {
                                "from": "2017-07-24T22:00:00.000Z",
                                "to": "2017-08-17T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-07-24T22:00:00.000Z",
                                "to": "2017-08-17T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SYS.Integration",
                                "id": 15569,
                                "progress": 0,
                                "from": "2017-07-24T22:00:00.000Z",
                                "to": "2017-08-17T22:00:00.000Z",
                                "base": {
                                "from": "2017-07-24T22:00:00.000Z",
                                "to": "2017-08-17T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.GSP_PGE Tests",
                            "id": 15486,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.8",
                                "locked": false
                            },
                            "children": [15607, 15704, 15610, 15471]
                            }, {
                            "name": "ARTE.SW.FT.GSP_PGE.Specification",
                            "id": 15607,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15486,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.8.1",
                                "plan": {
                                "from": "2016-09-20T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-20T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GSP_PGE.Specification",
                                "id": 15607,
                                "progress": 0,
                                "from": "2016-09-20T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-20T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.GSP_PGE.Design",
                            "id": 15704,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15486,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.8.2",
                                "plan": {
                                "from": "2016-09-21T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-21T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GSP_PGE.Design",
                                "id": 15704,
                                "progress": 0,
                                "from": "2016-09-21T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-21T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.GSP_PGE.Implementation",
                            "id": 15610,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15486,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "3.2.8.3",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GSP_PGE.Implementation",
                                "id": 15610,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.GSP_PGE.Integration",
                            "id": 15471,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15486,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 13546.12,
                                "codeWBS": "3.2.8.4",
                                "plan": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-24T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GSP_PGE.Integration",
                                "id": 15471,
                                "progress": 0,
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-24T22:00:00.000Z",
                                "base": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-24T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.GSA_CEOE Tests",
                            "id": 15488,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.9",
                                "locked": false
                            },
                            "children": [15464, 15708, 15295, 15601]
                            }, {
                            "name": "ARTE.SW.FT.GSA_CEOE.Specification",
                            "id": 15464,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15488,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.9.1",
                                "plan": {
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GSA_CEOE.Specification",
                                "id": 15464,
                                "progress": 0,
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.GSA_CEOE.Design",
                            "id": 15708,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15488,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.9.2",
                                "plan": {
                                "from": "2016-10-02T22:00:00.000Z",
                                "to": "2016-10-04T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-02T22:00:00.000Z",
                                "to": "2016-10-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GSA_CEOE.Design",
                                "id": 15708,
                                "progress": 0,
                                "from": "2016-10-02T22:00:00.000Z",
                                "to": "2016-10-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-02T22:00:00.000Z",
                                "to": "2016-10-04T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.GSA_CEOE.Implementation",
                            "id": 15295,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15488,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 6706,
                                "codeWBS": "3.2.9.3",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-23T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-23T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GSA_CEOE.Implementation",
                                "id": 15295,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-23T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-23T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.GSA_CEOE.Integration",
                            "id": 15601,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15488,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 10729.6,
                                "codeWBS": "3.2.9.4",
                                "plan": {
                                "from": "2017-07-13T22:00:00.000Z",
                                "to": "2017-09-03T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-07-13T22:00:00.000Z",
                                "to": "2017-09-03T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.GSA_CEOE.Integration",
                                "id": 15601,
                                "progress": 0,
                                "from": "2017-07-13T22:00:00.000Z",
                                "to": "2017-09-03T22:00:00.000Z",
                                "base": {
                                "from": "2017-07-13T22:00:00.000Z",
                                "to": "2017-09-03T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.EOB Tests",
                            "id": 15627,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.10",
                                "locked": false
                            },
                            "children": [15581, 15428, 15393, 15494]
                            }, {
                            "name": "ARTE.SW.FT.EOB.Specification",
                            "id": 15581,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15627,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.10.1",
                                "plan": {
                                "from": "2016-10-12T22:00:00.000Z",
                                "to": "2016-10-13T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-12T22:00:00.000Z",
                                "to": "2016-10-13T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.EOB.Specification",
                                "id": 15581,
                                "progress": 0,
                                "from": "2016-10-12T22:00:00.000Z",
                                "to": "2016-10-13T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-12T22:00:00.000Z",
                                "to": "2016-10-13T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.EOB.Design",
                            "id": 15428,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15627,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.10.2",
                                "plan": {
                                "from": "2016-10-13T22:00:00.000Z",
                                "to": "2016-10-17T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-13T22:00:00.000Z",
                                "to": "2016-10-17T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.EOB.Design",
                                "id": 15428,
                                "progress": 0,
                                "from": "2016-10-13T22:00:00.000Z",
                                "to": "2016-10-17T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-13T22:00:00.000Z",
                                "to": "2016-10-17T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.EOB.Implementation",
                            "id": 15393,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15627,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.2.10.3",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.EOB.Implementation",
                                "id": 15393,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-04T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.EOB.Integration",
                            "id": 15494,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15627,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "3.2.10.4",
                                "plan": {
                                "from": "2017-06-29T22:00:00.000Z",
                                "to": "2017-07-18T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-06-29T22:00:00.000Z",
                                "to": "2017-07-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.EOB.Integration",
                                "id": 15494,
                                "progress": 0,
                                "from": "2017-06-29T22:00:00.000Z",
                                "to": "2017-07-18T22:00:00.000Z",
                                "base": {
                                "from": "2017-06-29T22:00:00.000Z",
                                "to": "2017-07-18T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.DCA_CCCD Tests",
                            "id": 15504,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.11",
                                "locked": false
                            },
                            "children": [15406, 15652, 15350, 15696]
                            }, {
                            "name": "ARTE.SW.FT.DCA_CCCD.Specification",
                            "id": 15406,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15504,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.11.1",
                                "plan": {
                                "from": "2016-10-18T22:00:00.000Z",
                                "to": "2016-10-19T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-18T22:00:00.000Z",
                                "to": "2016-10-19T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.DCA_CCCD.Specification",
                                "id": 15406,
                                "progress": 0,
                                "from": "2016-10-18T22:00:00.000Z",
                                "to": "2016-10-19T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-18T22:00:00.000Z",
                                "to": "2016-10-19T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.DCA_CCCD.Design",
                            "id": 15652,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15504,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.11.2",
                                "plan": {
                                "from": "2016-10-19T22:00:00.000Z",
                                "to": "2016-10-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-19T22:00:00.000Z",
                                "to": "2016-10-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.DCA_CCCD.Design",
                                "id": 15652,
                                "progress": 0,
                                "from": "2016-10-19T22:00:00.000Z",
                                "to": "2016-10-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-19T22:00:00.000Z",
                                "to": "2016-10-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.DCA_CCCD.Implementation",
                            "id": 15350,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15504,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "3.2.11.3",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.DCA_CCCD.Implementation",
                                "id": 15350,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.DCA_CCCD.Integration",
                            "id": 15696,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15504,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 9388.4,
                                "codeWBS": "3.2.11.4",
                                "plan": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-06T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-06T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.DCA_CCCD.Integration",
                                "id": 15696,
                                "progress": 0,
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-06T22:00:00.000Z",
                                "base": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-08-06T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.Castor HD Tests",
                            "id": 15697,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.12",
                                "locked": false
                            },
                            "children": [15475, 15473, 15542, 15686]
                            }, {
                            "name": "ARTE.SW.FT.CastorHD.Specification",
                            "id": 15475,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15697,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.12.1",
                                "plan": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-10-24T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-10-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CastorHD.Specification",
                                "id": 15475,
                                "progress": 0,
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-10-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-23T22:00:00.000Z",
                                "to": "2016-10-24T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CastorHD.Design",
                            "id": 15473,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15697,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.12.2",
                                "plan": {
                                "from": "2016-10-24T22:00:00.000Z",
                                "to": "2016-10-25T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-24T22:00:00.000Z",
                                "to": "2016-10-25T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CastorHD.Design",
                                "id": 15473,
                                "progress": 0,
                                "from": "2016-10-24T22:00:00.000Z",
                                "to": "2016-10-25T22:00:00.000Z",
                                "base": {
                                "from": "2016-10-24T22:00:00.000Z",
                                "to": "2016-10-25T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CastorHD.Implementation",
                            "id": 15542,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15697,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "3.2.12.3",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CastorHD.Implementation",
                                "id": 15542,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CastorHD.Integration",
                            "id": 15686,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15697,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "3.2.12.4",
                                "plan": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-07-18T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-07-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CastorHD.Integration",
                                "id": 15686,
                                "progress": 0,
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-07-18T22:00:00.000Z",
                                "base": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-07-18T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.PSU Tests",
                            "id": 15594,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.13",
                                "locked": false
                            },
                            "children": [15374, 15578, 15397, 15316]
                            }, {
                            "name": "ARTE.SW.FT.PSU.Specification",
                            "id": 15374,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15594,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.13.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSU.Specification",
                                "id": 15374,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.PSU.Design",
                            "id": 15578,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15594,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.2.13.2",
                                "plan": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSU.Design",
                                "id": 15578,
                                "progress": 0,
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.PSU.Implementation",
                            "id": 15397,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15594,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.2.13.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSU.Implementation",
                                "id": 15397,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.PSU.Integration",
                            "id": 15316,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15594,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.2.13.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-15T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-15T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSU.Integration",
                                "id": 15316,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-15T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-15T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.JCB Tests",
                            "id": 15377,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.14",
                                "locked": false
                            },
                            "children": [15571, 15531, 15653, 15693]
                            }, {
                            "name": "ARTE.SW.FT.JCB.Specification",
                            "id": 15571,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15377,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 33.53,
                                "codeWBS": "3.2.14.1",
                                "plan": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.JCB.Specification",
                                "id": 15571,
                                "progress": 0,
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.JCB.Design",
                            "id": 15531,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15377,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 33.53,
                                "codeWBS": "3.2.14.2",
                                "plan": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.JCB.Design",
                                "id": 15531,
                                "progress": 0,
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-14T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.JCB.Implementation",
                            "id": 15653,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15377,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.14.3",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2016-12-14T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2016-12-14T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.JCB.Implementation",
                                "id": 15653,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2016-12-14T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2016-12-14T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.JCB.Integration",
                            "id": 15693,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15377,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.14.4",
                                "plan": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-06-25T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-06-25T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.JCB.Integration",
                                "id": 15693,
                                "progress": 0,
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-06-25T22:00:00.000Z",
                                "base": {
                                "from": "2017-06-21T22:00:00.000Z",
                                "to": "2017-06-25T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.CAA_CAG Tests",
                            "id": 15476,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.15",
                                "locked": false
                            },
                            "children": [15700, 15669, 15455, 15677]
                            }, {
                            "name": "ARTE.SW.FT.CAA_CAG.Specification",
                            "id": 15700,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15476,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.15.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CAA_CAG.Specification",
                                "id": 15700,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CAA_CAG.Design",
                            "id": 15669,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15476,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.15.2",
                                "plan": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CAA_CAG.Design",
                                "id": 15669,
                                "progress": 0,
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CAA_CAG.Implementation",
                            "id": 15455,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15476,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.2.15.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CAA_CAG.Implementation",
                                "id": 15455,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CAA_CAG.Integration",
                            "id": 15677,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15476,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.2.15.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CAA_CAG.Integration",
                                "id": 15677,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.CEA_CEG Tests",
                            "id": 15334,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15509,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.2.16",
                                "locked": false
                            },
                            "children": [15466, 15559, 15323, 15363]
                            }, {
                            "name": "ARTE.SW.FT.CEA_CEG.Specification",
                            "id": 15466,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15334,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.16.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CEA_CEG.Specification",
                                "id": 15466,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CEA_CEG.Design",
                            "id": 15559,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15334,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.2.16.2",
                                "plan": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CEA_CEG.Design",
                                "id": 15559,
                                "progress": 0,
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CEA_CEG.Implementation",
                            "id": 15323,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15334,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.2.16.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CEA_CEG.Implementation",
                                "id": 15323,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CEA_CEG.Integration",
                            "id": 15363,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15334,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.2.16.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CEA_CEG.Integration",
                                "id": 15363,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-21T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.Functional tests for boards",
                            "id": 15548,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15597,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3",
                                "locked": false
                            },
                            "children": [15534, 15392, 15365, 15641, 15477, 15327, 15355, 15651, 15422, 15317, 15351, 15383, 15500, 15691, 15366, 15447]
                            }, {
                            "name": "WP-ARTE.SW.FT.TCC Functional Tests",
                            "id": 15534,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.1",
                                "locked": false
                            },
                            "children": [15379, 15658, 15413, 15302]
                            }, {
                            "name": "ARTE.SW.FT.TCC.Specification",
                            "id": 15379,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15534,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.3.1.1",
                                "plan": {
                                "from": "2017-01-05T23:00:00.000Z",
                                "to": "2017-01-08T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-05T23:00:00.000Z",
                                "to": "2017-01-08T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TCC.Specification",
                                "id": 15379,
                                "progress": 0,
                                "from": "2017-01-05T23:00:00.000Z",
                                "to": "2017-01-08T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-05T23:00:00.000Z",
                                "to": "2017-01-08T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.TCC.Design",
                            "id": 15658,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15534,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.3.1.2",
                                "plan": {
                                "from": "2017-01-08T23:00:00.000Z",
                                "to": "2017-01-09T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-08T23:00:00.000Z",
                                "to": "2017-01-09T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TCC.Design",
                                "id": 15658,
                                "progress": 0,
                                "from": "2017-01-08T23:00:00.000Z",
                                "to": "2017-01-09T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-08T23:00:00.000Z",
                                "to": "2017-01-09T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.TCC.Implementation",
                            "id": 15413,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15534,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "3.3.1.3",
                                "plan": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TCC.Implementation",
                                "id": 15413,
                                "progress": 0,
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-02T22:00:00.000Z",
                                "base": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.TCC.Integration",
                            "id": 15302,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15534,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 7041.3,
                                "codeWBS": "3.3.1.4",
                                "plan": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-11-02T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-11-02T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TCC.Integration",
                                "id": 15302,
                                "progress": 0,
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-11-02T23:00:00.000Z",
                                "base": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-11-02T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.TIG Functional Tests",
                            "id": 15392,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.2",
                                "locked": false
                            },
                            "children": [15468, 15526, 15514, 15503]
                            }, {
                            "name": "ARTE.SW.FT.TIG.Specification",
                            "id": 15468,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15392,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.3.2.1",
                                "plan": {
                                "from": "2016-02-24T23:00:00.000Z",
                                "to": "2016-02-29T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-02-24T23:00:00.000Z",
                                "to": "2016-02-29T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TIG.Specification",
                                "id": 15468,
                                "progress": 0,
                                "from": "2016-02-24T23:00:00.000Z",
                                "to": "2016-02-29T23:00:00.000Z",
                                "base": {
                                "from": "2016-02-24T23:00:00.000Z",
                                "to": "2016-02-29T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.TIG.Design",
                            "id": 15526,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15392,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1005.9,
                                "codeWBS": "3.3.2.2",
                                "plan": {
                                "from": "2016-02-29T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-02-29T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TIG.Design",
                                "id": 15526,
                                "progress": 0,
                                "from": "2016-02-29T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z",
                                "base": {
                                "from": "2016-02-29T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.TIG.Implementation",
                            "id": 15514,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15392,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.3.2.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TIG.Implementation",
                                "id": 15514,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.TIG.Integration",
                            "id": 15503,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15392,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4358.89,
                                "codeWBS": "3.3.2.4",
                                "plan": {
                                "from": "2017-07-18T22:00:00.000Z",
                                "to": "2017-08-07T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-07-18T22:00:00.000Z",
                                "to": "2017-08-07T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TIG.Integration",
                                "id": 15503,
                                "progress": 0,
                                "from": "2017-07-18T22:00:00.000Z",
                                "to": "2017-08-07T22:00:00.000Z",
                                "base": {
                                "from": "2017-07-18T22:00:00.000Z",
                                "to": "2017-08-07T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.TDM Functional Tests",
                            "id": 15365,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.3",
                                "locked": false
                            },
                            "children": [15564, 15311, 15680, 15685]
                            }, {
                            "name": "ARTE.SW.FT.TDM.Specification",
                            "id": 15564,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15365,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.3.3.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TDM.Specification",
                                "id": 15564,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.TDM.Design",
                            "id": 15311,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15365,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.3.3.2",
                                "plan": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TDM.Design",
                                "id": 15311,
                                "progress": 0,
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-06-27T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.TDM.Implementation",
                            "id": 15680,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15365,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.3.3.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TDM.Implementation",
                                "id": 15680,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.TDM.Integration",
                            "id": 15685,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15365,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "3.3.3.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-28T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-28T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.TDM.Integration",
                                "id": 15685,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-28T22:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-28T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.HIF Functional Tests",
                            "id": 15641,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.4",
                                "locked": false
                            },
                            "children": [15305, 15309, 15491, 15515]
                            }, {
                            "name": "ARTE.SW.FT.HIF.Specification",
                            "id": 15305,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15641,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 33.53,
                                "codeWBS": "3.3.4.1",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.HIF.Specification",
                                "id": 15305,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.HIF.Design",
                            "id": 15309,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15641,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 33.53,
                                "codeWBS": "3.3.4.2",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.HIF.Design",
                                "id": 15309,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.HIF.Implementation",
                            "id": 15491,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15641,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.3.4.3",
                                "plan": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.HIF.Implementation",
                                "id": 15491,
                                "progress": 0,
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.HIF.Integration",
                            "id": 15515,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15641,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1005.9,
                                "codeWBS": "3.3.4.4",
                                "plan": {
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-22T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-22T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.HIF.Integration",
                                "id": 15515,
                                "progress": 0,
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-22T23:00:00.000Z",
                                "base": {
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-22T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.PSM2B Functional Tests",
                            "id": 15477,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.5",
                                "locked": false
                            },
                            "children": [15656, 15560, 15314, 15390]
                            }, {
                            "name": "ARTE.SW.FT.PSM2B.Specification",
                            "id": 15656,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15477,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.5.1",
                                "plan": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSM2B.Specification",
                                "id": 15656,
                                "progress": 0,
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.PSM2B.Design",
                            "id": 15560,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15477,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.5.2",
                                "plan": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSM2B.Design",
                                "id": 15560,
                                "progress": 0,
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.PSM2B.Implementation",
                            "id": 15314,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15477,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.3.5.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSM2B.Implementation",
                                "id": 15314,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.PSM2B.Integration",
                            "id": 15390,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15477,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.3.5.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSM2B.Integration",
                                "id": 15390,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.BPL Functional Tests",
                            "id": 15327,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.6",
                                "locked": false
                            },
                            "children": [15585, 15551, 15405, 15445]
                            }, {
                            "name": "ARTE.SW.FT.BPL.Specification",
                            "id": 15585,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15327,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.3.6.1",
                                "plan": {
                                "from": "2017-01-09T23:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-09T23:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.BPL.Specification",
                                "id": 15585,
                                "progress": 0,
                                "from": "2017-01-09T23:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-09T23:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.BPL.Design",
                            "id": 15551,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15327,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.3.6.2",
                                "plan": {
                                "from": "2017-01-10T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-10T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.BPL.Design",
                                "id": 15551,
                                "progress": 0,
                                "from": "2017-01-10T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-10T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.BPL.Implementation",
                            "id": 15405,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15327,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.3.6.3",
                                "plan": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-20T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-20T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.BPL.Implementation",
                                "id": 15405,
                                "progress": 0,
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-20T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-20T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.BPL.Integration",
                            "id": 15445,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15327,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.3.6.4",
                                "plan": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-15T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-15T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.BPL.Integration",
                                "id": 15445,
                                "progress": 0,
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-15T22:00:00.000Z",
                                "base": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-15T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.FAM Functional Tests",
                            "id": 15355,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.7",
                                "locked": false
                            },
                            "children": [15671, 15543, 15539, 15322]
                            }, {
                            "name": "ARTE.SW.FT.FAM.Specification",
                            "id": 15671,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15355,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.7.1",
                                "plan": {
                                "from": "2016-02-16T23:00:00.000Z",
                                "to": "2016-02-17T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-02-16T23:00:00.000Z",
                                "to": "2016-02-17T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.FAM.Specification",
                                "id": 15671,
                                "progress": 0,
                                "from": "2016-02-16T23:00:00.000Z",
                                "to": "2016-02-17T23:00:00.000Z",
                                "base": {
                                "from": "2016-02-16T23:00:00.000Z",
                                "to": "2016-02-17T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.FAM.Design",
                            "id": 15543,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15355,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.7.2",
                                "plan": {
                                "from": "2016-02-17T23:00:00.000Z",
                                "to": "2016-02-17T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-02-17T23:00:00.000Z",
                                "to": "2016-02-17T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.FAM.Design",
                                "id": 15543,
                                "progress": 0,
                                "from": "2016-02-17T23:00:00.000Z",
                                "to": "2016-02-17T23:00:00.000Z",
                                "base": {
                                "from": "2016-02-17T23:00:00.000Z",
                                "to": "2016-02-17T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.FAM.Implementation",
                            "id": 15539,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15355,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.3.7.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.FAM.Implementation",
                                "id": 15539,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.FAM.Integration",
                            "id": 15322,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15355,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.3.7.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.FAM.Integration",
                                "id": 15322,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.PSFN Functional Tests",
                            "id": 15651,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.8",
                                "locked": false
                            },
                            "children": [15681, 15331, 15367, 15586]
                            }, {
                            "name": "ARTE.SW.FT.PSF.Specification",
                            "id": 15681,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15651,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.3.8.1",
                                "plan": {
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSF.Specification",
                                "id": 15681,
                                "progress": 0,
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-01T23:00:00.000Z",
                                "to": "2016-03-02T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.PSF.Design",
                            "id": 15331,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15651,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.3.8.2",
                                "plan": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-07T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-07T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSF.Design",
                                "id": 15331,
                                "progress": 0,
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-07T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-02T23:00:00.000Z",
                                "to": "2016-03-07T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.PSF.Implementation",
                            "id": 15367,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15651,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.3.8.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSF.Implementation",
                                "id": 15367,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.PSF.Integration",
                            "id": 15586,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15651,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.3.8.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.PSF.Integration",
                                "id": 15586,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-12T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.ETS Functional Tests",
                            "id": 15422,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.9",
                                "locked": false
                            },
                            "children": [15415, 15584, 15506, 15386]
                            }, {
                            "name": "ARTE.SW.FT.ETS.Specification",
                            "id": 15415,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15422,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.9.1",
                                "plan": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.ETS.Specification",
                                "id": 15415,
                                "progress": 0,
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.ETS.Design",
                            "id": 15584,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15422,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.9.2",
                                "plan": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.ETS.Design",
                                "id": 15584,
                                "progress": 0,
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-15T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.ETS.Implementation",
                            "id": 15506,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15422,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.3.9.3",
                                "plan": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-16T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-16T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.ETS.Implementation",
                                "id": 15506,
                                "progress": 0,
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-16T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-16T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.ETS.Integration",
                            "id": 15386,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15422,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 670.6,
                                "codeWBS": "3.3.9.4",
                                "plan": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-04T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.ETS.Integration",
                                "id": 15386,
                                "progress": 0,
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-04T22:00:00.000Z",
                                "base": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-04T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.ETI Functional Tests",
                            "id": 15317,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.10",
                                "locked": false
                            },
                            "children": [15352, 15624, 15348, 15510]
                            }, {
                            "name": "ARTE.SW.FT.ETI.Specification",
                            "id": 15352,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15317,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 335.3,
                                "codeWBS": "3.3.10.1",
                                "plan": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-08-28T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-08-28T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.ETI.Specification",
                                "id": 15352,
                                "progress": 0,
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-08-28T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-08-28T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.ETI.Design",
                            "id": 15624,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15317,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 502.95,
                                "codeWBS": "3.3.10.2",
                                "plan": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.ETI.Design",
                                "id": 15624,
                                "progress": 0,
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.ETI.Implementation",
                            "id": 15348,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15317,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.3.10.3",
                                "plan": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-15T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-15T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.ETI.Implementation",
                                "id": 15348,
                                "progress": 0,
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-15T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-15T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.ETI.Integration",
                            "id": 15510,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15317,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.3.10.4",
                                "plan": {
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-11T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-11T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.ETI.Integration",
                                "id": 15510,
                                "progress": 0,
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-11T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-01T23:00:00.000Z",
                                "to": "2017-01-11T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.SDI Functional Tests",
                            "id": 15351,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.11",
                                "locked": false
                            },
                            "children": [15479, 15483, 15388, 15296]
                            }, {
                            "name": "ARTE.SW.FT.SDI.Specification",
                            "id": 15479,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15351,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.11.1",
                                "plan": {
                                "from": "2017-01-11T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-11T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SDI.Specification",
                                "id": 15479,
                                "progress": 0,
                                "from": "2017-01-11T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-11T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SDI.Design",
                            "id": 15483,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15351,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.11.2",
                                "plan": {
                                "from": "2017-01-12T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-12T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SDI.Design",
                                "id": 15483,
                                "progress": 0,
                                "from": "2017-01-12T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-12T23:00:00.000Z",
                                "to": "2017-01-12T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SDI.Implementation",
                            "id": 15388,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15351,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.3.11.3",
                                "plan": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-26T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SDI.Implementation",
                                "id": 15388,
                                "progress": 0,
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-26T22:00:00.000Z",
                                "base": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SDI.Integration",
                            "id": 15296,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15351,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.3.11.4",
                                "plan": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-15T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-15T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SDI.Integration",
                                "id": 15296,
                                "progress": 0,
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-15T22:00:00.000Z",
                                "base": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-15T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.SIP Functional Tests",
                            "id": 15383,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.12",
                                "locked": false
                            },
                            "children": [15532, 15646, 15707, 15335]
                            }, {
                            "name": "ARTE.SW.FT.SIP.Specification",
                            "id": 15532,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15383,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.12.1",
                                "plan": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SIP.Specification",
                                "id": 15532,
                                "progress": 0,
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-15T23:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SIP.Design",
                            "id": 15646,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15383,
                                "workPackage": true,
                                "progress": 80,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.12.2",
                                "plan": {
                                "from": "2017-01-16T23:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-19T22:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SIP.Design",
                                "id": 15646,
                                "progress": 80,
                                "from": "2016-07-19T22:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-16T23:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SIP.Implementation",
                            "id": 15707,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15383,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.3.12.3",
                                "plan": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-20T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-20T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SIP.Implementation",
                                "id": 15707,
                                "progress": 0,
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-20T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-03-20T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SIP.Integration",
                            "id": 15335,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15383,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.3.12.4",
                                "plan": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-08T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-08T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SIP.Integration",
                                "id": 15335,
                                "progress": 0,
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-08T22:00:00.000Z",
                                "base": {
                                "from": "2017-10-02T22:00:00.000Z",
                                "to": "2017-10-08T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.OIB Functional Tests",
                            "id": 15500,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.13",
                                "locked": false
                            },
                            "children": [15550, 15682, 15544, 15414]
                            }, {
                            "name": "ARTE.SW.FT.OIB.Specification",
                            "id": 15550,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15500,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.13.1",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.OIB.Specification",
                                "id": 15550,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.OIB.Design",
                            "id": 15682,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15500,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.13.2",
                                "plan": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.OIB.Design",
                                "id": 15682,
                                "progress": 0,
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-03T22:00:00.000Z",
                                "to": "2016-08-03T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.OIB.Implementation",
                            "id": 15544,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15500,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.13.3",
                                "plan": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.OIB.Implementation",
                                "id": 15544,
                                "progress": 0,
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.OIB.Integration",
                            "id": 15414,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15500,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.13.4",
                                "plan": {
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-17T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-17T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.OIB.Integration",
                                "id": 15414,
                                "progress": 0,
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-17T23:00:00.000Z",
                                "base": {
                                "from": "2016-11-17T23:00:00.000Z",
                                "to": "2016-11-17T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.CPPR2 Functional Tests",
                            "id": 15691,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.14",
                                "locked": false
                            },
                            "children": [15297, 15425, 15361, 15709]
                            }, {
                            "name": "ARTE.SW.FT.CPPR2.Specification",
                            "id": 15297,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15691,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.14.1",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CPPR2.Specification",
                                "id": 15297,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CPPR2.Design",
                            "id": 15425,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15691,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.14.2",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CPPR2.Design",
                                "id": 15425,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CPPR2.Implementation",
                            "id": 15361,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15691,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.14.3",
                                "plan": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CPPR2.Implementation",
                                "id": 15361,
                                "progress": 0,
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-11T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.CPPR2.Integration",
                            "id": 15709,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15691,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.14.4",
                                "plan": {
                                "from": "2017-01-31T23:00:00.000Z",
                                "to": "2017-01-31T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-31T23:00:00.000Z",
                                "to": "2017-01-31T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.CPPR2.Integration",
                                "id": 15709,
                                "progress": 0,
                                "from": "2017-01-31T23:00:00.000Z",
                                "to": "2017-01-31T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-31T23:00:00.000Z",
                                "to": "2017-01-31T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.SIF Functional Tests",
                            "id": 15366,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.15",
                                "locked": false
                            },
                            "children": [15612, 15706, 15508, 15454]
                            }, {
                            "name": "ARTE.SW.FT.SIF.Specification",
                            "id": 15612,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15366,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 33.53,
                                "codeWBS": "3.3.15.1",
                                "plan": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SIF.Specification",
                                "id": 15612,
                                "progress": 0,
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SIF.Design",
                            "id": 15706,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15366,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 33.53,
                                "codeWBS": "3.3.15.2",
                                "plan": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SIF.Design",
                                "id": 15706,
                                "progress": 0,
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-06T23:00:00.000Z",
                                "to": "2016-03-06T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SIF.Implementation",
                            "id": 15508,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15366,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.15.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SIF.Implementation",
                                "id": 15508,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.SIF.Integration",
                            "id": 15454,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15366,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 134.12,
                                "codeWBS": "3.3.15.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.SIF.Integration",
                                "id": 15454,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.FT.UEC Functional Tests",
                            "id": 15447,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15548,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.3.16",
                                "locked": false
                            },
                            "children": [15443, 15619, 15332, 15573]
                            }, {
                            "name": "ARTE.SW.FT.UEC.Specification",
                            "id": 15443,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15447,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 33.53,
                                "codeWBS": "3.3.16.1",
                                "plan": {
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.UEC.Specification",
                                "id": 15443,
                                "progress": 0,
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.UEC.Design",
                            "id": 15619,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15447,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 33.53,
                                "codeWBS": "3.3.16.2",
                                "plan": {
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.UEC.Design",
                                "id": 15619,
                                "progress": 0,
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z",
                                "base": {
                                "from": "2016-03-03T23:00:00.000Z",
                                "to": "2016-03-03T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.UEC.Implementation",
                            "id": 15332,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15447,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 67.06,
                                "codeWBS": "3.3.16.3",
                                "plan": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.UEC.Implementation",
                                "id": 15332,
                                "progress": 0,
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-02T22:00:00.000Z",
                                "to": "2016-08-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.FT.UEC.Integration",
                            "id": 15573,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15447,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 134.12,
                                "codeWBS": "3.3.16.4",
                                "plan": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.FT.UEC.Integration",
                                "id": 15573,
                                "progress": 0,
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z",
                                "base": {
                                "from": "2017-03-08T23:00:00.000Z",
                                "to": "2017-03-08T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.AUXILIARY SOFTWARE",
                            "id": 15572,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15597,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.4",
                                "locked": false
                            },
                            "children": [15487, 15661, 15590, 15676, 15436]
                            }, {
                            "name": "WP-ARTE.SW.QUA.Qualification SW",
                            "id": 15487,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15572,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.4.1",
                                "locked": false
                            },
                            "children": [15609, 15579, 15474, 15380]
                            }, {
                            "name": "ARTE.SW.QUA.Specification",
                            "id": 15609,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15487,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2032.9,
                                "codeWBS": "3.4.1.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.QUA.Specification",
                                "id": 15609,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.QUA.Design",
                            "id": 15579,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15487,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.4.1.2",
                                "plan": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.QUA.Design",
                                "id": 15579,
                                "progress": 0,
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.QUA.Implementation",
                            "id": 15474,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15487,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "3.4.1.3",
                                "plan": {
                                "from": "2016-07-06T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-06T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.QUA.Implementation",
                                "id": 15474,
                                "progress": 0,
                                "from": "2016-07-06T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-06T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.QUA.Integration",
                            "id": 15380,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15487,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 5564.1,
                                "codeWBS": "3.4.1.4",
                                "plan": {
                                "from": "2016-08-29T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-29T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.QUA.Integration",
                                "id": 15380,
                                "progress": 0,
                                "from": "2016-08-29T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-29T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.VGPA.Validation SW",
                            "id": 15661,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15572,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.4.2",
                                "locked": false
                            },
                            "children": [15505, 15333, 15701, 15555]
                            }, {
                            "name": "ARTE.SW.VGPA.Specification",
                            "id": 15505,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15661,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2546.4,
                                "codeWBS": "3.4.2.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.VGPA.Specification",
                                "id": 15505,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.VGPA.Design",
                            "id": 15333,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15661,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.4.2.2",
                                "plan": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.VGPA.Design",
                                "id": 15333,
                                "progress": 0,
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.VGPA.Implementation",
                            "id": 15701,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15661,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 3353,
                                "codeWBS": "3.4.2.3",
                                "plan": {
                                "from": "2016-07-06T22:00:00.000Z",
                                "to": "2016-07-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-06T22:00:00.000Z",
                                "to": "2016-07-26T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.VGPA.Implementation",
                                "id": 15701,
                                "progress": 0,
                                "from": "2016-07-06T22:00:00.000Z",
                                "to": "2016-07-26T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-06T22:00:00.000Z",
                                "to": "2016-07-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.VGPA.Integration",
                            "id": 15555,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15661,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 3798.5,
                                "codeWBS": "3.4.2.4",
                                "plan": {
                                "from": "2016-07-26T22:00:00.000Z",
                                "to": "2016-08-31T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-26T22:00:00.000Z",
                                "to": "2016-08-31T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.VGPA.Integration",
                                "id": 15555,
                                "progress": 0,
                                "from": "2016-07-26T22:00:00.000Z",
                                "to": "2016-08-31T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-26T22:00:00.000Z",
                                "to": "2016-08-31T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.VAL.Validation SW",
                            "id": 15590,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15572,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.4.3",
                                "locked": false
                            },
                            "children": [15519, 15580, 15639, 15431]
                            }, {
                            "name": "ARTE.SW.VALIDATION.Specification",
                            "id": 15519,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15590,
                                "workPackage": true,
                                "progress": 68,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.4.3.1",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-24T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-05-26T22:00:00.000Z",
                                "to": "2016-09-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.VALIDATION.Specification",
                                "id": 15519,
                                "progress": 68,
                                "from": "2016-05-26T22:00:00.000Z",
                                "to": "2016-09-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-01-24T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.VALIDATION.Design",
                            "id": 15580,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15590,
                                "workPackage": true,
                                "progress": 31,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.4.3.2",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-22T22:00:00.000Z",
                                "to": "2016-09-12T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.VALIDATION.Design",
                                "id": 15580,
                                "progress": 31,
                                "from": "2016-08-22T22:00:00.000Z",
                                "to": "2016-09-12T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.VALIDATION.Implementation",
                            "id": 15639,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15590,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "3.4.3.3",
                                "plan": {
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-07-25T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-07-25T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.VALIDATION.Implementation",
                                "id": 15639,
                                "progress": 0,
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-07-25T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-07-25T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.VALIDATION.Integration",
                            "id": 15431,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15590,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 6706,
                                "codeWBS": "3.4.3.4",
                                "plan": {
                                "from": "2016-07-24T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-24T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.VALIDATION.Integration",
                                "id": 15431,
                                "progress": 0,
                                "from": "2016-07-24T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-24T22:00:00.000Z",
                                "to": "2016-09-25T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.ESS.ZATE-ESS test sequences",
                            "id": 15676,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15572,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.4.4",
                                "locked": false
                            },
                            "children": [15663, 15642, 15439, 15520]
                            }, {
                            "name": "ARTE.SW.ESS.Specification",
                            "id": 15663,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15676,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1005.9,
                                "codeWBS": "3.4.4.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.ESS.Specification",
                                "id": 15663,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.ESS.Design",
                            "id": 15642,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15676,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1005.9,
                                "codeWBS": "3.4.4.2",
                                "plan": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-04T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.ESS.Design",
                                "id": 15642,
                                "progress": 0,
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-04T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.ESS.Implementation",
                            "id": 15439,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15676,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2011.8,
                                "codeWBS": "3.4.4.3",
                                "plan": {
                                "from": "2016-07-04T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-04T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.ESS.Implementation",
                                "id": 15439,
                                "progress": 0,
                                "from": "2016-07-04T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-04T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.ESS.Integration",
                            "id": 15520,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15676,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2011.8,
                                "codeWBS": "3.4.4.4",
                                "plan": {
                                "from": "2016-07-17T22:00:00.000Z",
                                "to": "2016-07-27T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-17T22:00:00.000Z",
                                "to": "2016-07-27T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.ESS.Integration",
                                "id": 15520,
                                "progress": 0,
                                "from": "2016-07-17T22:00:00.000Z",
                                "to": "2016-07-27T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-17T22:00:00.000Z",
                                "to": "2016-07-27T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.SUPPORT.RASID-15HD Support SW",
                            "id": 15436,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15572,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.4.5",
                                "locked": false
                            },
                            "children": [15472, 15664, 15432, 15692]
                            }, {
                            "name": "ARTE.SW.SUPPORT.Specification",
                            "id": 15472,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15436,
                                "workPackage": true,
                                "progress": 5,
                                "canDelete": false,
                                "budget": 2546.4,
                                "codeWBS": "3.4.5.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-03T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.SUPPORT.Specification",
                                "id": 15472,
                                "progress": 5,
                                "from": "2016-07-03T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-06-28T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.SUPPORT.Design",
                            "id": 15664,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15436,
                                "workPackage": true,
                                "progress": 11,
                                "canDelete": false,
                                "budget": 1341.2,
                                "codeWBS": "3.4.5.2",
                                "plan": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-03T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.SUPPORT.Design",
                                "id": 15664,
                                "progress": 11,
                                "from": "2016-07-03T22:00:00.000Z",
                                "to": "2016-07-10T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-28T22:00:00.000Z",
                                "to": "2016-07-05T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.SUPPORT.Implementation",
                            "id": 15432,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15436,
                                "workPackage": true,
                                "progress": 3,
                                "canDelete": false,
                                "budget": 5364.8,
                                "codeWBS": "3.4.5.3",
                                "plan": {
                                "from": "2016-07-06T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-03T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.SUPPORT.Implementation",
                                "id": 15432,
                                "progress": 3,
                                "from": "2016-07-03T22:00:00.000Z",
                                "to": "2016-08-04T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-06T22:00:00.000Z",
                                "to": "2016-08-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.SUPPORT.Integration",
                            "id": 15692,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15436,
                                "workPackage": true,
                                "progress": 3,
                                "canDelete": false,
                                "budget": 10101.2,
                                "codeWBS": "3.4.5.4",
                                "plan": {
                                "from": "2016-08-29T22:00:00.000Z",
                                "to": "2016-10-13T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-04T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.SUPPORT.Integration",
                                "id": 15692,
                                "progress": 3,
                                "from": "2016-07-04T22:00:00.000Z",
                                "to": "2016-09-14T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-29T22:00:00.000Z",
                                "to": "2016-10-13T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.SPECIFIC PURPOSE SOFTWARE",
                            "id": 15306,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15597,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.5",
                                "locked": false
                            },
                            "children": [15409, 15378, 15485]
                            }, {
                            "name": "WP-ARTE.SW.Flying Probe",
                            "id": 15409,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15306,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.5.1",
                                "locked": false
                            },
                            "children": [15326, 15357]
                            }, {
                            "name": "ARTE.SW.Flying Probe.Implementation",
                            "id": 15326,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15409,
                                "workPackage": true,
                                "progress": 6,
                                "canDelete": false,
                                "budget": 8382.5,
                                "codeWBS": "3.5.1.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-01T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-24T22:00:00.000Z",
                                "to": "2016-10-12T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.Flying Probe.Implementation",
                                "id": 15326,
                                "progress": 6,
                                "from": "2016-08-24T22:00:00.000Z",
                                "to": "2016-10-12T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-01T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.Flying Probe.Integration",
                            "id": 15357,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15409,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 11735.5,
                                "codeWBS": "3.5.1.2",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.Flying Probe.Integration",
                                "id": 15357,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.DIT-MCO",
                            "id": 15378,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15306,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.5.2",
                                "locked": false
                            },
                            "children": [15529, 15463]
                            }, {
                            "name": "ARTE.SW.DIT-MCO.Implementation",
                            "id": 15529,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15378,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "3.5.2.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.DIT-MCO.Implementation",
                                "id": 15529,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.DIT-MCO.Integration",
                            "id": 15463,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15378,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "3.5.2.2",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.DIT-MCO.Integration",
                                "id": 15463,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.JTAG",
                            "id": 15485,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15306,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.5.3",
                                "locked": false
                            },
                            "children": [15343, 15416]
                            }, {
                            "name": "ARTE.SW.JTAG.Implementation",
                            "id": 15343,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15485,
                                "workPackage": true,
                                "progress": 13,
                                "canDelete": false,
                                "budget": 10059,
                                "codeWBS": "3.5.3.1",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-13T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-09T22:00:00.000Z",
                                "to": "2016-10-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.JTAG.Implementation",
                                "id": 15343,
                                "progress": 13,
                                "from": "2016-08-09T22:00:00.000Z",
                                "to": "2016-10-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-13T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.JTAG.Integration",
                            "id": 15416,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15485,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 16094.4,
                                "codeWBS": "3.5.3.2",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-10-16T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-10-16T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.JTAG.Integration",
                                "id": 15416,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-10-16T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-10-16T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "WP-ARTE.SW.MNG",
                            "id": 15665,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15597,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "3.6",
                                "locked": false
                            },
                            "children": [15433, 15412, 15595, 15480, 15591]
                            }, {
                            "name": "ARTE.SW.MNG.Initial setup",
                            "id": 15433,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15665,
                                "workPackage": true,
                                "progress": 16,
                                "canDelete": false,
                                "budget": 3353,
                                "codeWBS": "3.6.1",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-02-03T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-04-19T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.MNG.Initial setup",
                                "id": 15433,
                                "progress": 16,
                                "from": "2016-04-19T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-02-03T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.MNG.Specification",
                            "id": 15412,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15665,
                                "workPackage": true,
                                "progress": 17,
                                "canDelete": false,
                                "budget": 3353,
                                "codeWBS": "3.6.2",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-02-08T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-04-17T22:00:00.000Z",
                                "to": "2016-09-01T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.MNG.Specification",
                                "id": 15412,
                                "progress": 17,
                                "from": "2016-04-17T22:00:00.000Z",
                                "to": "2016-09-01T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-02-08T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.MNG.Design",
                            "id": 15595,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15665,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.6.3",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.MNG.Design",
                                "id": 15595,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.MNG.Releases Management",
                            "id": 15480,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15665,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.6.4",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.MNG.Releases Management",
                                "id": 15480,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-07T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.SW.MNG.Documentation",
                            "id": 15591,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15665,
                                "workPackage": true,
                                "progress": 14,
                                "canDelete": false,
                                "budget": 2682.4,
                                "codeWBS": "3.6.5",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-02-01T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-05-26T22:00:00.000Z",
                                "to": "2016-07-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.SW.MNG.Documentation",
                                "id": 15591,
                                "progress": 14,
                                "from": "2016-05-26T22:00:00.000Z",
                                "to": "2016-07-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-02-01T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE PRODUCTION",
                            "id": 15657,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15345,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4",
                                "locked": false
                            },
                            "children": [15456, 15478, 15424, 15470, 15300, 15689, 15554, 15512, 15429]
                            }, {
                            "name": "NEW GPAs Manufacturing",
                            "id": 15456,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15657,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.1",
                                "locked": false
                            },
                            "children": [15448, 15489]
                            }, {
                            "name": "GPA-R1",
                            "id": 15448,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15456,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.1.1",
                                "locked": false
                            },
                            "children": [15360, 15637, 15495, 15511, 15545, 15679]
                            }, {
                            "name": "PURCHASING MEC",
                            "id": 15360,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15448,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.1.1.1",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING MEC",
                                "id": 15360,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "PURCHASING CBL",
                            "id": 15637,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15448,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.1.1.2",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING CBL",
                                "id": 15637,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "PURCHASING BOARD",
                            "id": 15495,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15448,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.1.1.3",
                                "plan": {
                                "from": "2016-09-25T22:00:00.000Z",
                                "to": "2016-11-27T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-25T22:00:00.000Z",
                                "to": "2016-11-27T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING BOARD",
                                "id": 15495,
                                "progress": 0,
                                "from": "2016-09-25T22:00:00.000Z",
                                "to": "2016-11-27T23:00:00.000Z",
                                "base": {
                                "from": "2016-09-25T22:00:00.000Z",
                                "to": "2016-11-27T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "PURCHASING UACs-UABs",
                            "id": 15511,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15448,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.1.1.4",
                                "plan": {
                                "from": "2016-07-10T22:00:00.000Z",
                                "to": "2016-08-09T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-10T22:00:00.000Z",
                                "to": "2016-08-09T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING UACs-UABs",
                                "id": 15511,
                                "progress": 0,
                                "from": "2016-07-10T22:00:00.000Z",
                                "to": "2016-08-09T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-10T22:00:00.000Z",
                                "to": "2016-08-09T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.GPA-R1.Manufacturing (SN:01 & SN:02)",
                            "id": 15545,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15448,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 58128.85,
                                "codeWBS": "4.1.1.5",
                                "plan": {
                                "from": "2016-11-27T23:00:00.000Z",
                                "to": "2017-03-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-11-27T23:00:00.000Z",
                                "to": "2017-03-26T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.GPA-R1.Manufacturing (SN:01 & SN:02)",
                                "id": 15545,
                                "progress": 0,
                                "from": "2016-11-27T23:00:00.000Z",
                                "to": "2017-03-26T22:00:00.000Z",
                                "base": {
                                "from": "2016-11-27T23:00:00.000Z",
                                "to": "2017-03-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.GPA-R1.Testing (SN:02)",
                            "id": 15679,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15448,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 10814,
                                "codeWBS": "4.1.1.6",
                                "plan": {
                                "from": "2017-03-26T22:00:00.000Z",
                                "to": "2017-04-26T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-26T22:00:00.000Z",
                                "to": "2017-04-26T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.GPA-R1.Testing (SN:02)",
                                "id": 15679,
                                "progress": 0,
                                "from": "2017-03-26T22:00:00.000Z",
                                "to": "2017-04-26T22:00:00.000Z",
                                "base": {
                                "from": "2017-03-26T22:00:00.000Z",
                                "to": "2017-04-26T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "GPA-R2",
                            "id": 15489,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15456,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.1.2",
                                "locked": false
                            },
                            "children": [15600, 15577, 15313, 15469, 15459, 15622]
                            }, {
                            "name": "PURCHASING MEC",
                            "id": 15600,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15489,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.1.2.1",
                                "plan": {
                                "from": "2017-02-02T23:00:00.000Z",
                                "to": "2017-04-06T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-02-02T23:00:00.000Z",
                                "to": "2017-04-06T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING MEC",
                                "id": 15600,
                                "progress": 0,
                                "from": "2017-02-02T23:00:00.000Z",
                                "to": "2017-04-06T22:00:00.000Z",
                                "base": {
                                "from": "2017-02-02T23:00:00.000Z",
                                "to": "2017-04-06T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "PURCHASING CBL",
                            "id": 15577,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15489,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.1.2.2",
                                "plan": {
                                "from": "2017-04-18T22:00:00.000Z",
                                "to": "2017-06-20T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-04-18T22:00:00.000Z",
                                "to": "2017-06-20T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING CBL",
                                "id": 15577,
                                "progress": 0,
                                "from": "2017-04-18T22:00:00.000Z",
                                "to": "2017-06-20T22:00:00.000Z",
                                "base": {
                                "from": "2017-04-18T22:00:00.000Z",
                                "to": "2017-06-20T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "PURCHASING BOARD",
                            "id": 15313,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15489,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.1.2.3",
                                "plan": {
                                "from": "2017-04-13T22:00:00.000Z",
                                "to": "2017-06-15T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-04-13T22:00:00.000Z",
                                "to": "2017-06-15T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING BOARD",
                                "id": 15313,
                                "progress": 0,
                                "from": "2017-04-13T22:00:00.000Z",
                                "to": "2017-06-15T22:00:00.000Z",
                                "base": {
                                "from": "2017-04-13T22:00:00.000Z",
                                "to": "2017-06-15T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "PURCHASING UACs-UABs",
                            "id": 15469,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15489,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.1.2.4",
                                "plan": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-12T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-12T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING UACs-UABs",
                                "id": 15469,
                                "progress": 0,
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-12T22:00:00.000Z",
                                "base": {
                                "from": "2017-03-13T23:00:00.000Z",
                                "to": "2017-04-12T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.GPA-R2.Manufacturing (SN:01 & SN:02)",
                            "id": 15459,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15489,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 79409.14,
                                "codeWBS": "4.1.2.5",
                                "plan": {
                                "from": "2017-06-20T22:00:00.000Z",
                                "to": "2017-10-18T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-06-20T22:00:00.000Z",
                                "to": "2017-10-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.GPA-R2.Manufacturing (SN:01 & SN:02)",
                                "id": 15459,
                                "progress": 0,
                                "from": "2017-06-20T22:00:00.000Z",
                                "to": "2017-10-18T22:00:00.000Z",
                                "base": {
                                "from": "2017-06-20T22:00:00.000Z",
                                "to": "2017-10-18T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.GPA-R2.Testing (SN:02)",
                            "id": 15622,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15489,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 8131.6,
                                "codeWBS": "4.1.2.6",
                                "plan": {
                                "from": "2017-10-18T22:00:00.000Z",
                                "to": "2017-11-07T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-10-18T22:00:00.000Z",
                                "to": "2017-11-07T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.GPA-R2.Testing (SN:02)",
                                "id": 15622,
                                "progress": 0,
                                "from": "2017-10-18T22:00:00.000Z",
                                "to": "2017-11-07T23:00:00.000Z",
                                "base": {
                                "from": "2017-10-18T22:00:00.000Z",
                                "to": "2017-11-07T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "Main Frame Manufacturing",
                            "id": 15478,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15657,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.2",
                                "locked": false
                            },
                            "children": [15501, 15401, 15389]
                            }, {
                            "name": "PURCHASING",
                            "id": 15501,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15478,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.2.1",
                                "plan": {
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING",
                                "id": 15501,
                                "progress": 0,
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-29T22:00:00.000Z",
                                "to": "2016-08-30T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.MF.Manufacturing",
                            "id": 15401,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15478,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 109638.36,
                                "codeWBS": "4.2.2",
                                "plan": {
                                "from": "2016-08-31T22:00:00.000Z",
                                "to": "2016-10-13T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-31T22:00:00.000Z",
                                "to": "2016-10-13T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.MF.Manufacturing",
                                "id": 15401,
                                "progress": 0,
                                "from": "2016-08-31T22:00:00.000Z",
                                "to": "2016-10-13T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-31T22:00:00.000Z",
                                "to": "2016-10-13T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.MF.Testing",
                            "id": 15389,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15478,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4023.6,
                                "codeWBS": "4.2.3",
                                "plan": {
                                "from": "2016-10-13T22:00:00.000Z",
                                "to": "2016-11-07T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-10-13T22:00:00.000Z",
                                "to": "2016-11-07T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.MF.Testing",
                                "id": 15389,
                                "progress": 0,
                                "from": "2016-10-13T22:00:00.000Z",
                                "to": "2016-11-07T23:00:00.000Z",
                                "base": {
                                "from": "2016-10-13T22:00:00.000Z",
                                "to": "2016-11-07T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "Collimation System Manufacturing",
                            "id": 15424,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15657,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.3",
                                "locked": false
                            },
                            "children": [15410, 15702, 15430]
                            }, {
                            "name": "PURCHASING",
                            "id": 15410,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15424,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.3.1",
                                "plan": {
                                "from": "2016-07-05T22:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-05T22:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING",
                                "id": 15410,
                                "progress": 0,
                                "from": "2016-07-05T22:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z",
                                "base": {
                                "from": "2016-07-05T22:00:00.000Z",
                                "to": "2017-01-17T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.COLL.Manufacturing",
                            "id": 15702,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15424,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 16706.3,
                                "codeWBS": "4.3.2",
                                "plan": {
                                "from": "2017-01-17T23:00:00.000Z",
                                "to": "2017-01-25T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-17T23:00:00.000Z",
                                "to": "2017-01-25T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.COLL.Manufacturing",
                                "id": 15702,
                                "progress": 0,
                                "from": "2017-01-17T23:00:00.000Z",
                                "to": "2017-01-25T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-17T23:00:00.000Z",
                                "to": "2017-01-25T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.COLL.Testing",
                            "id": 15430,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15424,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 8488,
                                "codeWBS": "4.3.3",
                                "plan": {
                                "from": "2017-01-25T23:00:00.000Z",
                                "to": "2017-02-12T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-01-25T23:00:00.000Z",
                                "to": "2017-02-12T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.COLL.Testing",
                                "id": 15430,
                                "progress": 0,
                                "from": "2017-01-25T23:00:00.000Z",
                                "to": "2017-02-12T23:00:00.000Z",
                                "base": {
                                "from": "2017-01-25T23:00:00.000Z",
                                "to": "2017-02-12T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "Motion System Manufacturing",
                            "id": 15470,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15657,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.4",
                                "locked": false
                            },
                            "children": [15461, 15426, 15592]
                            }, {
                            "name": "PURCHASING",
                            "id": 15461,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15470,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.4.1",
                                "plan": {
                                "from": "2016-07-12T22:00:00.000Z",
                                "to": "2017-07-10T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-07-12T22:00:00.000Z",
                                "to": "2017-07-10T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING",
                                "id": 15461,
                                "progress": 0,
                                "from": "2016-07-12T22:00:00.000Z",
                                "to": "2017-07-10T22:00:00.000Z",
                                "base": {
                                "from": "2016-07-12T22:00:00.000Z",
                                "to": "2017-07-10T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.MOT.Manufacturing",
                            "id": 15426,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15470,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 9099.04,
                                "codeWBS": "4.4.2",
                                "plan": {
                                "from": "2017-07-10T22:00:00.000Z",
                                "to": "2017-07-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-07-10T22:00:00.000Z",
                                "to": "2017-07-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.MOT.Manufacturing",
                                "id": 15426,
                                "progress": 0,
                                "from": "2017-07-10T22:00:00.000Z",
                                "to": "2017-07-23T22:00:00.000Z",
                                "base": {
                                "from": "2017-07-10T22:00:00.000Z",
                                "to": "2017-07-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.MOT.Testing",
                            "id": 15592,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15470,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4904.05,
                                "codeWBS": "4.4.3",
                                "plan": {
                                "from": "2017-07-23T22:00:00.000Z",
                                "to": "2017-08-06T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-07-23T22:00:00.000Z",
                                "to": "2017-08-06T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.MOT.Testing",
                                "id": 15592,
                                "progress": 0,
                                "from": "2017-07-23T22:00:00.000Z",
                                "to": "2017-08-06T22:00:00.000Z",
                                "base": {
                                "from": "2017-07-23T22:00:00.000Z",
                                "to": "2017-08-06T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ZATE GPAs Manufacturing",
                            "id": 15300,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15657,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.5",
                                "locked": false
                            },
                            "children": [15675, 15442, 15321]
                            }, {
                            "name": "GPA 1+",
                            "id": 15675,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15300,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.5.1",
                                "locked": false
                            },
                            "children": [15346, 15342, 15458, 15537]
                            }, {
                            "name": "PURCHASING GPA1",
                            "id": 15346,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15675,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.5.1.1",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING GPA1",
                                "id": 15346,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "PURCHASING FOR REFITING",
                            "id": 15342,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15675,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.5.1.2",
                                "plan": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-07T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-07T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING FOR REFITING",
                                "id": 15342,
                                "progress": 0,
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-07T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-06T22:00:00.000Z",
                                "to": "2016-09-07T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.GPA1+.Manufacturing",
                            "id": 15458,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15675,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 28720.4,
                                "codeWBS": "4.5.1.3",
                                "plan": {
                                "from": "2016-09-11T22:00:00.000Z",
                                "to": "2016-11-14T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-11T22:00:00.000Z",
                                "to": "2016-11-14T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.GPA1+.Manufacturing",
                                "id": 15458,
                                "progress": 0,
                                "from": "2016-09-11T22:00:00.000Z",
                                "to": "2016-11-14T23:00:00.000Z",
                                "base": {
                                "from": "2016-09-11T22:00:00.000Z",
                                "to": "2016-11-14T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.GPA1+.Testing",
                            "id": 15537,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15675,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 3049.56,
                                "codeWBS": "4.5.1.4",
                                "plan": {
                                "from": "2016-11-14T23:00:00.000Z",
                                "to": "2016-11-23T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-11-14T23:00:00.000Z",
                                "to": "2016-11-23T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.GPA1+.Testing",
                                "id": 15537,
                                "progress": 0,
                                "from": "2016-11-14T23:00:00.000Z",
                                "to": "2016-11-23T23:00:00.000Z",
                                "base": {
                                "from": "2016-11-14T23:00:00.000Z",
                                "to": "2016-11-23T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "GPA 2+",
                            "id": 15442,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15300,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.5.2",
                                "locked": false
                            },
                            "children": [15375, 15516, 15310, 15546]
                            }, {
                            "name": "PURCHASING GPA2",
                            "id": 15375,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15442,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.5.2.1",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING GPA2",
                                "id": 15375,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "PURCHASING FOR REFITING",
                            "id": 15516,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15442,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.5.2.2",
                                "plan": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-02-14T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-02-14T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING FOR REFITING",
                                "id": 15516,
                                "progress": 0,
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-02-14T23:00:00.000Z",
                                "base": {
                                "from": "2016-12-13T23:00:00.000Z",
                                "to": "2017-02-14T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.GPA2+.Manufacturing",
                            "id": 15310,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15442,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 46111.31,
                                "codeWBS": "4.5.2.3",
                                "plan": {
                                "from": "2017-02-14T23:00:00.000Z",
                                "to": "2017-06-18T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-02-14T23:00:00.000Z",
                                "to": "2017-06-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.GPA2+.Manufacturing",
                                "id": 15310,
                                "progress": 0,
                                "from": "2017-02-14T23:00:00.000Z",
                                "to": "2017-06-18T22:00:00.000Z",
                                "base": {
                                "from": "2017-02-14T23:00:00.000Z",
                                "to": "2017-06-18T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.GPA2+.Testing",
                            "id": 15546,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15442,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 4346.76,
                                "codeWBS": "4.5.2.4",
                                "plan": {
                                "from": "2017-06-18T22:00:00.000Z",
                                "to": "2017-07-04T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2017-06-18T22:00:00.000Z",
                                "to": "2017-07-04T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.GPA2+.Testing",
                                "id": 15546,
                                "progress": 0,
                                "from": "2017-06-18T22:00:00.000Z",
                                "to": "2017-07-04T22:00:00.000Z",
                                "base": {
                                "from": "2017-06-18T22:00:00.000Z",
                                "to": "2017-07-04T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "GPA for VTB",
                            "id": 15321,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15300,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.5.3",
                                "locked": false
                            },
                            "children": [15541, 15673, 15645]
                            }, {
                            "name": "PURCHASING",
                            "id": 15541,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15321,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.5.3.1",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING",
                                "id": 15541,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.GPA_VTB.Manufacturing",
                            "id": 15673,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15321,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 27339.52,
                                "codeWBS": "4.5.3.2",
                                "plan": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-11-01T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-11-01T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.GPA_VTB.Manufacturing",
                                "id": 15673,
                                "progress": 0,
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-11-01T23:00:00.000Z",
                                "base": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-11-01T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.GPA_VTB.Testing",
                            "id": 15645,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15321,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 3222.52,
                                "codeWBS": "4.5.3.3",
                                "plan": {
                                "from": "2016-11-01T23:00:00.000Z",
                                "to": "2016-11-10T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-11-01T23:00:00.000Z",
                                "to": "2016-11-10T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.GPA_VTB.Testing",
                                "id": 15645,
                                "progress": 0,
                                "from": "2016-11-01T23:00:00.000Z",
                                "to": "2016-11-10T23:00:00.000Z",
                                "base": {
                                "from": "2016-11-01T23:00:00.000Z",
                                "to": "2016-11-10T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "CTA-R1 Manufacturing",
                            "id": 15689,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15657,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.6",
                                "locked": false
                            },
                            "children": [15565, 15521, 15524]
                            }, {
                            "name": "PURCHASING",
                            "id": 15565,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15689,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.6.1",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING",
                                "id": 15565,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.CTA-R1.Manufacturing (SN:01 & SN:02)",
                            "id": 15521,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15689,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 16845.4,
                                "codeWBS": "4.6.2",
                                "plan": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.CTA-R1.Manufacturing (SN:01 & SN:02)",
                                "id": 15521,
                                "progress": 0,
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-29T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.CTA-R1.Testing (SN:01 & SN:02)",
                            "id": 15524,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15689,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 864.8,
                                "codeWBS": "4.6.3",
                                "plan": {
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-06T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-06T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.CTA-R1.Testing (SN:01 & SN:02)",
                                "id": 15524,
                                "progress": 0,
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-06T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-29T22:00:00.000Z",
                                "to": "2016-10-06T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "JIGS & TOOLS Manufacturing",
                            "id": 15554,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15657,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.7",
                                "locked": false
                            },
                            "children": [15670, 15358, 15690]
                            }, {
                            "name": "ESS",
                            "id": 15670,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15554,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.7.1",
                                "locked": false
                            },
                            "children": [15566, 15301, 15694]
                            }, {
                            "name": "PURCHASING",
                            "id": 15566,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15670,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.7.1.1",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING",
                                "id": 15566,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.ESS.Manufacturing",
                            "id": 15301,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15670,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 6962,
                                "codeWBS": "4.7.1.2",
                                "plan": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.ESS.Manufacturing",
                                "id": 15301,
                                "progress": 0,
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.ESS.Testing",
                            "id": 15694,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15670,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 216.2,
                                "codeWBS": "4.7.1.3",
                                "plan": {
                                "from": "2016-09-18T22:00:00.000Z",
                                "to": "2016-09-19T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-18T22:00:00.000Z",
                                "to": "2016-09-19T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.ESS.Testing",
                                "id": 15694,
                                "progress": 0,
                                "from": "2016-09-18T22:00:00.000Z",
                                "to": "2016-09-19T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-18T22:00:00.000Z",
                                "to": "2016-09-19T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "JIGS & TOOLS Manufacturing",
                            "id": 15358,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15554,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.7.2",
                                "locked": false
                            },
                            "children": [15399, 15547, 15687]
                            }, {
                            "name": "PURCHASING",
                            "id": 15399,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15358,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.7.2.1",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING",
                                "id": 15399,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.JIGS.Manufacturing",
                            "id": 15547,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15358,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 63623.16,
                                "codeWBS": "4.7.2.2",
                                "plan": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-11-10T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-11-10T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.JIGS.Manufacturing",
                                "id": 15547,
                                "progress": 0,
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-11-10T23:00:00.000Z",
                                "base": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-11-10T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.JIGS.Testing",
                            "id": 15687,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15358,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 8581.66,
                                "codeWBS": "4.7.2.3",
                                "plan": {
                                "from": "2016-11-10T23:00:00.000Z",
                                "to": "2016-11-24T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-11-10T23:00:00.000Z",
                                "to": "2016-11-24T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.JIGS.Testing",
                                "id": 15687,
                                "progress": 0,
                                "from": "2016-11-10T23:00:00.000Z",
                                "to": "2016-11-24T23:00:00.000Z",
                                "base": {
                                "from": "2016-11-10T23:00:00.000Z",
                                "to": "2016-11-24T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "QUALIFICATION",
                            "id": 15690,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15554,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.7.3",
                                "locked": false
                            },
                            "children": [15450, 15683, 15620]
                            }, {
                            "name": "PURCHASING",
                            "id": 15450,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15690,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "4.7.3.1",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "PURCHASING",
                                "id": 15450,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2016-08-23T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.QTE.Manufacturing",
                            "id": 15683,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15690,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 13441.4,
                                "codeWBS": "4.7.3.2",
                                "plan": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-13T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-13T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.QTE.Manufacturing",
                                "id": 15683,
                                "progress": 0,
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-13T22:00:00.000Z",
                                "base": {
                                "from": "2016-08-28T22:00:00.000Z",
                                "to": "2016-09-13T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.QTE.Testing",
                            "id": 15620,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15690,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 1697.6,
                                "codeWBS": "4.7.3.3",
                                "plan": {
                                "from": "2016-09-13T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-09-13T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.QTE.Testing",
                                "id": 15620,
                                "progress": 0,
                                "from": "2016-09-13T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z",
                                "base": {
                                "from": "2016-09-13T22:00:00.000Z",
                                "to": "2016-09-18T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.FAB.PTYPE.Testing",
                            "id": 15512,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15657,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 36445.69,
                                "codeWBS": "4.8",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.FAB.PTYPE.Testing",
                                "id": 15512,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2017-01-16T23:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE PROD SUPPORT",
                            "id": 15429,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15657,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "4.9",
                                "locked": false
                            },
                            "children": [15339, 15583, 15437, 15457]
                            }, {
                            "name": "ARTE.PROD.Components Engineering",
                            "id": 15339,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15429,
                                "workPackage": true,
                                "progress": 77,
                                "canDelete": false,
                                "budget": 8818.39,
                                "codeWBS": "4.9.1",
                                "plan": {
                                "from": "2016-03-31T22:00:00.000Z",
                                "to": "2016-04-25T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-03-31T22:00:00.000Z",
                                "to": "2016-09-08T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.PROD.Components Engineering",
                                "id": 15339,
                                "progress": 77,
                                "from": "2016-03-31T22:00:00.000Z",
                                "to": "2016-09-08T22:00:00.000Z",
                                "base": {
                                "from": "2016-03-31T22:00:00.000Z",
                                "to": "2016-04-25T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.PROD.Purchasing & Incoming Support",
                            "id": 15583,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15429,
                                "workPackage": true,
                                "progress": 2,
                                "canDelete": false,
                                "budget": 10185.6,
                                "codeWBS": "4.9.2",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-07-18T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.PROD.Purchasing & Incoming Support",
                                "id": 15583,
                                "progress": 2,
                                "from": "2016-06-23T22:00:00.000Z",
                                "to": "2016-07-18T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-07-17T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.PROD.Configuration & Quality",
                            "id": 15437,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15429,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 13276,
                                "codeWBS": "4.9.3",
                                "plan": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.PROD.Configuration & Quality",
                                "id": 15437,
                                "progress": 0,
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-22T22:00:00.000Z",
                                "to": "2016-09-21T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE.PROD.Manufacturing Scheduling",
                            "id": 15457,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15429,
                                "workPackage": true,
                                "progress": 19,
                                "canDelete": false,
                                "budget": 32864,
                                "codeWBS": "4.9.4",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-05-09T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-04-05T22:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "ARTE.PROD.Manufacturing Scheduling",
                                "id": 15457,
                                "progress": 19,
                                "from": "2016-04-05T22:00:00.000Z",
                                "to": "2017-01-10T23:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2016-05-09T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "Milestones",
                            "id": 15582,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15345,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "5",
                                "locked": false
                            },
                            "children": [15535, 15655, 15382]
                            }, {
                            "name": "RASID-15HD Contractual Milestones ",
                            "id": 15535,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15582,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "5.1",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2018-08-07T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2018-08-07T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "tasks": [{
                                "name": "RASID-15HD Contractual Milestones ",
                                "id": 15535,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2018-08-07T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2018-08-07T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE Internal Milestones",
                            "id": 15655,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15582,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "5.2",
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "children": [15618, 15650, 15308, 15481, 15567]
                            }, {
                            "name": "GPAs Desig Activities Finished",
                            "id": 15618,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15655,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "5.2.1",
                                "locked": false,
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            },
                            "tasks": [{
                                "name": "GPAs Desig Activities Finished",
                                "id": 15618,
                                "progress": 0,
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "GPAs Ready for Integration",
                            "id": 15650,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15655,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "5.2.2",
                                "locked": false,
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            },
                            "tasks": [{
                                "name": "GPAs Ready for Integration",
                                "id": 15650,
                                "progress": 0,
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE PURCHASING Milestones",
                            "id": 15308,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15655,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "5.2.4",
                                "locked": false,
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            },
                            "tasks": [{
                                "name": "ARTE PURCHASING Milestones",
                                "id": 15308,
                                "progress": 0,
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE CTA-R1",
                            "id": 15481,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15655,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "5.2.5",
                                "locked": false,
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            },
                            "tasks": [{
                                "name": "ARTE CTA-R1",
                                "id": 15481,
                                "progress": 0,
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "ARTE SW Milestones",
                            "id": 15567,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15655,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "5.2.6",
                                "locked": false,
                                "plan": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            },
                            "tasks": [{
                                "name": "ARTE SW Milestones",
                                "id": 15567,
                                "progress": 0,
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z",
                                "base": {
                                "from": "2016-01-14T23:00:00.000Z",
                                "to": "2017-10-02T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "RASID-15HD UUT availability Milestones",
                            "id": 15382,
                            "data": {
                                "isControlAccount": true,
                                "parentCode": 15582,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": false,
                                "budget": 0,
                                "codeWBS": "5.3",
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                },
                                "locked": false
                            },
                            "children": [15484, 15517]
                            }, {
                            "name": "Modules Availability",
                            "id": 15484,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15382,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "5.3.1",
                                "locked": false,
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                }
                            },
                            "tasks": [{
                                "name": "Modules Availability",
                                "id": 15484,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                }
                            }]
                            }, {
                            "name": "Boards Availability",
                            "id": 15517,
                            "data": {
                                "isControlAccount": false,
                                "parentCode": 15382,
                                "workPackage": true,
                                "progress": 0,
                                "canDelete": true,
                                "codeWBS": "5.3.2",
                                "locked": false,
                                "plan": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                },
                                "control": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                }
                            },
                            "tasks": [{
                                "name": "Boards Availability",
                                "id": 15517,
                                "progress": 0,
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z",
                                "base": {
                                "from": "2016-06-21T22:00:00.000Z",
                                "to": "2017-07-24T22:00:00.000Z"
                                }
                            }]
                        }]
                }

                return [];
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
