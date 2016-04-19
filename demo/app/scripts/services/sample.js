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
                                predecessors: "8FS-1 d",
                                duration: '21 d',
                                isProject: true
                            }
                        },

                        // this is a milestone
                        {
                            name: 'Milestone',
                            tasks: [
                                {
                                    name: "Milestone",
                                    id: "Milestone",
                                    from: new Date(2016, 3, 2, 8, 0, 0),
                                    to: new Date(2016, 3, 2, 8, 0, 0),
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
                                    from: new Date(2016, 3, 9, 8, 0, 0),
                                    to: new Date(2016, 3, 9, 8, 0, 0),
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
                                    to: new Date(2016, 3, 4, 8, 0, 0),
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
                                    from: new Date(2016, 3, 7, 8, 0, 0),
                                    to: new Date(2016, 3, 8, 8, 0, 0),
                                    progress: 75
                                }
                            ],
                            data: {
                                wbs: "2.2.2.3",
                                duration: '2 d',
                                predecessors: '8Fs-1 d'
                            }
                        },

                        {
                            name: 'Work package 2',
                            tasks: [
                                {
                                    name: 'Work package 2',
                                    id: 'Work package 2',
                                    from: new Date(2016, 3, 9, 8, 0, 0),
                                    to: new Date(2016, 3, 15, 8, 0, 0),
                                    progress: 0
                                }
                            ],
                            data: {
                                wbs: "2.2.3",
                                duration: '5 d',
                                package: true,
                                predecessors: '6'
                            }
                        },

                        {
                            name: 'Control account 2',
                            tasks: [
                                {
                                    name: 'Control account 2',
                                    id: 'Control account 2',
                                    from: new Date(2016, 3, 16, 8, 0, 0),
                                    to: new Date(2016, 3, 22, 8, 0, 0),
                                    progress: 0
                                }
                            ],
                            data: {
                                wbs: "2.3",
                                duration: '5 d',
                                account: true,
                                package: true,
                                predecessors: '4'
                            }
                        },

                        {
                            name: 'Control account 3',
                            tasks: [
                                {
                                    name: 'Control account 3',
                                    id: 'Control account 3',
                                    from: new Date(2016, 3, 23, 8, 0, 0),
                                    to: new Date(2016, 3, 29, 8, 0, 0),
                                    progress: 0
                                }
                            ],
                            data: {
                                wbs: "3",
                                account: true,
                                package: true,
                                predecessors: '2',
                                duration: '5 d'
                            }
                        },

                        {
                            name: 'Node 2',
                            children: [
                                'Control account 4',
                                'Control account 5',
                            ],
                            data: {
                                wbs: "4",
                                predecessors: '10FS+2 d',
                                duration: '10 d'
                            }
                        },

                        {
                            name: 'Control account 4',
                            tasks: [
                                {
                                    name: 'Control account 4',
                                    id: 'Control account 4',
                                    from: new Date(2016, 3, 30, 8, 0, 0),
                                    to: new Date(2016, 4, 5, 8, 0, 0),
                                    progress: 0
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
                                    from: new Date(2016, 4, 6, 8, 0, 0),
                                    to: new Date(2016, 4, 12, 8, 0, 0),
                                    progress: 0
                                }
                            ],
                            data: {
                                wbs: "4.1",
                                account: true,
                                package: true,
                                predecessors: '14',
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
            }
        };
    })
;
