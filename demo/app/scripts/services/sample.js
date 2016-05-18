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
            getSampleData: function() {
                return [
                        // this is a project
                        {
                            name: 'Development',
                            children: [
                                'Milestone',
                                'Node 1',
                                'Control account 3',
                                'Node 2'
                            ],
                            data: {
                                account: true,
                                wbs: 0,
                                package: true,
                                duration: '21 d',
                                isProject: true,
                            },
                            dependencies: false
                        },

                        // this is a milestone
                        {
                            name: 'Milestone',
                            tasks: [
                                {
                                    name: 'Milestone',
                                    id: 'Milestone',
                                    from: new Date(2016, 3, 5, 8, 0, 0),
                                    to: new Date(2016, 3, 5, 8, 0, 0),
                                    isMilestone: true,
                                    classes: ['task-is-milestone'],
                                    movable: {
                                        'allowResizing': false,
                                        'allowRowSwitching': false
                                    }
                                }
                            ],

                             data: {
                                wbs: 1,
                                duration: '0 d'
                            }
                        },

                        // this is a summary task
                        {
                            name: 'Node 1',
                            id: 'Node 1',
                            children: [
                                'Milestone 2',
                                'Control account 1',
                                'Control account 2',
                            ],
                            data: {
                                wbs: 2,
                                duration: '14 d'
                            }
                        },

                        // summary task milestone
                        {
                            name: 'Milestone 2',
                            tasks: [
                                {
                                    name: "Milestone 2",
                                    id: "Milestone 2",
                                    from: new Date(2016, 3, 12, 8, 0, 0),
                                    to: new Date(2016, 3, 12, 8, 0, 0),
                                    isMilestone: true,
                                    classes: ['task-is-milestone'],
                                    movable: {
                                        'allowResizing': false,
                                        'allowRowSwitching': false
                                    }
                                }
                            ],
                            data: {
                                wbs: 2.1,
                                duration: '0 d'
                            }
                        },

                        {
                            name: 'Control account 1',
                            id: 'Control account 1',
                            children: [
                                'Milestone 3',
                                'Work package 1',
                                'Work package 2'
                            ],
                            data: {
                                wbs: 2.2,
                                duration: '4 d',
                                account: true
                            }
                        },

                       {
                            name: 'Milestone 3',
                            tasks: [
                                {
                                    name: "Milestone 3",
                                    id: "Milestone 3",
                                    from: new Date(2016, 3, 10, 8, 0, 0),
                                    to: new Date(2016, 3, 10, 8, 0, 0),
                                    isMilestone: true,
                                    classes: ['task-is-milestone'],
                                    movable: {
                                        'allowResizing': false,
                                        'allowRowSwitching': false
                                    }
                                }
                            ],
                            data: {
                                wbs: "2.2.1",
                                duration: '0 d',
                            }
                        },

                        {
                            name: 'Work package 1',
                            id: 'Work package 1',
                            children: [
                                'Milestone 4',
                                'Activity 1',
                                'Activity 2',
                            ],
                            data: {
                                wbs: "2.2.2",
                                duration: '4 d',
                                package: true
                            }
                        },

                        {
                            name: 'Milestone 4',
                            tasks: [
                                {
                                    name: "Milestone 4",
                                    id: "Milestone 4",
                                    from: new Date(2016, 3, 3, 8, 0, 0),
                                    to: new Date(2016, 3, 3, 8, 0, 0),
                                    isMilestone: true,
                                    classes: ['task-is-milestone'],
                                    movable: {
                                        'allowResizing': false,
                                        'allowRowSwitching': false
                                    }
                                }
                            ],
                            data: {
                                wbs: "2.2.2.1",
                                duration: '0 d',
                            }
                        },

                        {
                            name: 'Activity 1',
                            tasks: [
                                {
                                    name: "Activity 1",
                                    id: "Activity 1",
                                    from: new Date(2016, 3, 2, 8, 0, 0),
                                    to: new Date(2016, 3, 4, 17, 0, 0),
                                    progress: 100
                                }
                            ],
                            data: {
                                wbs: "2.2.2.2",
                                duration: '3 d',
                            }
                        },

                        {
                            name: 'Activity 2',
                            tasks: [
                                {
                                    name: "Activity 2",
                                    id: "Activity 2",
                                    from: new Date(2016, 3, 4, 8, 0, 0),
                                    to: new Date(2016, 3, 7, 17, 0, 0),
                                    progress: 100
                                }
                            ],
                            data: {
                                wbs: "2.2.2.3",
                                duration: '2 d',
                            }
                        },

                        {
                            name: 'Work package 2',
                            tasks: [
                                {
                                    name: 'Work package 2',
                                    id: 'Work package 2',
                                    from: new Date(2016, 3, 12, 8, 0, 0),
                                    to: new Date(2016, 3, 18, 17, 0, 0),
                                    progress: 0
                                }
                            ],
                            data: {
                                wbs: "2.2.3",
                                duration: '5 d',
                                package: true,
                            }
                        },

                        {
                            name: 'Control account 2',
                            tasks: [
                                {
                                    name: 'Control account 2',
                                    id: 'Control account 2',
                                    from: new Date(2016, 3, 21, 8, 0, 0),
                                    to: new Date(2016, 3, 25, 17, 0, 0),
                                    progress: 0
                                }
                            ],
                            data: {
                                wbs: "2.3",
                                duration: '5 d',
                                account: true,
                                package: true,
                            }
                        },

                        {
                            name: 'Control account 3',
                            tasks: [
                                {
                                    name: 'Control account 3',
                                    id: 'Control account 3',
                                    from: new Date(2016, 3, 28, 8, 0, 0),
                                    to: new Date(2016, 4, 1, 17, 0, 0),
                                    progress: 0
                                }
                            ],
                            data: {
                                wbs: "3",
                                account: true,
                                package: true,
                                duration: '5 d'
                            }
                        },

                        {
                            name: 'Node 2',
                            id: 'Node 2',
                            children: [
                                'Control account 4',
                                'Control account 5',
                            ],
                            data: {
                                wbs: "4",
                                duration: '10 d'
                            }
                        },

                        {
                            name: 'Control account 4',
                            tasks: [
                                {
                                    name: 'Control account 4',
                                    id: 'Control account 4',
                                    from: new Date(2016, 3, 23, 8, 0, 0),
                                    to: new Date(2016, 3, 29, 17, 0, 0),
                                    color: "rgb(255,178,178)",
                                    progress: {
                                        percent: 75,
                                        color: "red"
                                    }
                                }
                            ],
                            data: {
                                wbs: "4.1",
                                account: true,
                                package: true,
                                duration: '5 d',
                            }
                        },

                        {
                            name: 'Control account 5',
                            tasks: [
                                {
                                    name: 'Control account 5',
                                    id: 'Control account 5',
                                    from: new Date(2016, 3, 30, 8, 0, 0),
                                    to: new Date(2016, 4, 5, 17, 0, 0),
                                    color: "rgb(255,178,178)",
                                    progress: {
                                        percent: 0.0,
                                        color: "red"
                                    }
                                }
                            ],
                            data: {
                                wbs: "4.1",
                                account: true,
                                package: true,
                                duration: '5 d'
                            }
                        },

                    ];
            },
            getSampleTimespans: function() {
                return [
                        {
                            from: new Date(2016, 2, 21, 8, 0, 0),
                            to: new Date(2016, 2, 25, 15, 0, 0),

                            name: 'Sprint 1 Timespan'
                            //priority: undefined,
                            //classes: [],
                            //data: undefined
                        }
                    ];
            },
            getPlanData: function() {
                return [
                        // this is a project
                        {
                            name: 'Development',
                            children: [
                                1,
                                2,
                                3,
                                4
                            ],
                            data: {
                                account: true,
                                wbs: 0,
                                package: true,
                                duration: '21 d',
                                isProject: true,
                                parent: null,
                            },
                            dependencies: false
                        },

                        // this is a milestone
                        {
                            name: 'Milestone',
                            id: 1,
                            tasks: [
                                {
                                    name: 'Milestone',
                                    id: 1,
                                    from: new Date(2016, 3, 8, 8, 0, 0),
                                    to: new Date(2016, 3, 8, 8, 0, 0),
                                    isMilestone: true,
                                    classes: ['task-is-milestone', 'task-milestone-planned'],
                                    movable: {
                                        'allowResizing': false,
                                        'allowRowSwitching': false
                                    }
                                }
                            ],

                             data: {
                                wbs: 1,
                                duration: '0 d',
                                parent: 1
                            }
                        },

                        // this is a summary task
                        {
                            name: 'Node 1',
                            id: 2,
                            children: [
                                12,
                                13,
                                14
                            ],
                            data: {
                                wbs: 2,
                                duration: '14 d',
                                parent: 1
                            }
                        },

                        // summary task milestone
                        {
                            name: 'Milestone 2',
                            id: 12,
                            tasks: [
                                {
                                    name: "Milestone 2",
                                    id: 12,
                                    from: new Date(2016, 3, 9, 8, 0, 0),
                                    to: new Date(2016, 3, 9, 8, 0, 0),
                                    isMilestone: true,
                                    classes: ['task-is-milestone', 'task-milestone-planned'],
                                    movable: {
                                        'allowResizing': false,
                                        'allowRowSwitching': false
                                    }
                                }
                            ],
                            data: {
                                wbs: 2.1,
                                duration: '0 d',
                                parent: 2
                            }
                        },

                        {
                            name: 'Control account 1',
                            id: 13,
                            children: [
                                131,
                                132,
                                133
                            ],
                            data: {
                                wbs: 2.2,
                                duration: '4 d',
                                account: true,
                                parent: 2
                            }
                        },

                       {
                            name: 'Milestone 3',
                            id: 131,
                            tasks: [
                                {
                                    name: "Milestone 3",
                                    id: 131,
                                    from: new Date(2016, 3, 10, 8, 0, 0),
                                    to: new Date(2016, 3, 10, 8, 0, 0),
                                    isMilestone: true,
                                    classes: ['task-is-milestone', 'task-milestone-planned'],
                                    movable: {
                                        'allowResizing': false,
                                        'allowRowSwitching': false
                                    }
                                }
                            ],
                            data: {
                                wbs: "2.2.1",
                                duration: '0 d',
                                parent: 13
                            }
                        },

                        {
                            name: 'Work package 1',
                            id: 132,
                            children: [
                                1321,
                                1322,
                                1323,
                            ],
                            data: {
                                wbs: "2.2.2",
                                duration: '4 d',
                                package: true,
                                parent: 13
                            }
                        },

                        {
                            name: 'Milestone 4',
                            id: 1321,
                            tasks: [
                                {
                                    name: "Milestone 4",
                                    id: 1321,
                                    from: new Date(2016, 3, 3, 8, 0, 0),
                                    to: new Date(2016, 3, 3, 8, 0, 0),
                                    isMilestone: true,
                                    classes: ['task-is-milestone', 'task-milestone-planned'],
                                    movable: {
                                        'allowResizing': false,
                                        'allowRowSwitching': false
                                    },
                                }
                            ],
                            data: {
                                wbs: "2.2.2.1",
                                duration: '0 d',
                                parent: 132
                            }
                        },

                        {
                            name: 'Activity 1',
                            id: 1322,
                            tasks: [
                                {
                                    name: "Activity 1",
                                    id: 1322,
                                    from: new Date(2016, 3, 2, 8, 0, 0),
                                    to: new Date(2016, 3, 4, 17, 0, 0),
                                    color: "#8F8F8F",

                                }
                            ],
                            data: {
                                wbs: "2.2.2.2",
                                duration: '3 d',
                                parent: 132
                            }
                        },

                        {
                            name: 'Activity 2',
                            id: 1323,
                            tasks: [
                                {
                                    name: "Activity 2",
                                    id: 1323,
                                    from: new Date(2016, 3, 4, 8, 0, 0),
                                    to: new Date(2016, 3, 7, 17, 0, 0),
                                    color: "#8F8F8F",

                                }
                            ],
                            data: {
                                wbs: "2.2.2.3",
                                duration: '2 d',
                                parent: 132
                            }
                        },

                        {
                            name: 'Work package 2',
                            id: 133,
                            tasks: [
                                {
                                    name: 'Work package 2',
                                    id: 133,
                                    from: new Date(2016, 3, 8, 8, 0, 0),
                                    to: new Date(2016, 3, 14, 17, 0, 0),
                                    color: "#8F8F8F",
                                }
                            ],
                            data: {
                                wbs: "2.2.3",
                                duration: '5 d',
                                package: true,
                            }
                        },

                        {
                            name: 'Control account 2',
                            id: 14,
                            tasks: [
                                {
                                    name: 'Control account 2',
                                    id: 14,
                                    from: new Date(2016, 3, 15, 8, 0, 0),
                                    to: new Date(2016, 3, 21, 17, 0, 0),
                                    color: "#8F8F8F",
                                }
                            ],
                            data: {
                                wbs: "2.3",
                                duration: '5 d',
                                account: true,
                                package: true,
                                parent: 2
                            }
                        },

                        {
                            name: 'Control account 3',
                            id: 3,
                            tasks: [
                                {
                                    name: 'Control account 3',
                                    id: 3,
                                    from: new Date(2016, 3, 22, 8, 0, 0),
                                    to: new Date(2016, 3, 28, 17, 0, 0),
                                    color: "#8F8F8F",

                                }
                            ],
                            data: {
                                wbs: "3",
                                account: true,
                                package: true,
                                duration: '5 d',
                                parent: 1
                            }
                        },

                        {
                            name: 'Node 2',
                            id: 4,
                            children: [
                                221,
                                222
                            ],
                            data: {
                                wbs: "4",
                                duration: '10 d',
                                parent: 1
                            }
                        },

                        {
                            name: 'Control account 4',
                            id: 221,
                            tasks: [
                                {
                                    name: 'Control account 4',
                                    id: 221,
                                    from: new Date(2016, 3, 17, 8, 0, 0),
                                    to: new Date(2016, 3, 23, 17, 0, 0),
                                    color: "#8F8F8F",
                                }
                            ],
                            data: {
                                wbs: "4.1",
                                account: true,
                                package: true,
                                duration: '5 d',
                                parent: 4
                            }
                        },

                        {
                            name: 'Control account 5',
                            id: 222,
                            tasks: [
                                {
                                    name: 'Control account 5',
                                    id: 222,
                                    from: new Date(2016, 3, 24, 8, 0, 0),
                                    to: new Date(2016, 3, 30, 17, 0, 0),
                                    color: "#8F8F8F",
                                }
                            ],
                            data: {
                                wbs: "4.1",
                                account: true,
                                package: true,
                                duration: '5 d',
                                parent: 4
                            }
                        },

                    ];
            },
        };
    })
;
