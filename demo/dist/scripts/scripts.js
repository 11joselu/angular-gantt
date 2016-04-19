'use strict';

/**
 * @ngdoc overview
 * @name angularGanttDemoApp
 * @description
 * # angularGanttDemoApp
 *
 * Main module of the application.
 */
angular.module('angularGanttDemoApp', [
    'gantt', // angular-gantt.
    'gantt.sortable',
    'gantt.movable',
    'gantt.drawtask',
    'gantt.tooltips',
    'gantt.bounds',
    'gantt.progress',
    'gantt.table',
    'gantt.tree',
    'gantt.groups',
    'gantt.dependencies',
    'gantt.overlap',
    'gantt.resizeSensor',
    'ngAnimate',
    'mgcrea.ngStrap'
]).config(['$compileProvider', function($compileProvider) {
    $compileProvider.debugInfoEnabled(false); // Remove debug info (angularJS >= 1.3)
}]);

'use strict';

/**
 * @ngdoc function
 * @name angularGanttDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularGanttDemoApp
 */
angular.module('angularGanttDemoApp')
    .controller('MainCtrl', ['$scope', '$timeout', '$log', 'ganttUtils', 'GanttObjectModel', 'Sample', 'FSDependencies', 'ResizeDependencies',
        'ganttMouseOffset', 'ganttDebounce', 'moment', function($scope, $timeout, $log, utils, ObjectModel, Sample, FSDependencies, Resize, mouseOffset, debounce, moment) {
        var objectModel;
        var dataToRemove;



        function greaterThan(dateOne, dateTwo) {
            if(dateOne.diff(dateTwo) > 0) {
                return 1;
            } else {
                if(dateOne.diff(dateTwo) === 0) {
                    return 0;
                }
            }

            return -1;
        }

        function getDifference(dateOne, dateTwo) {
            return dateOne.diff(dateTwo, 'days')
        }

        function findDependencies(task) {
            if(task.dependencies) {
                for(var i = 0; i < task.dependencies.length; i++) {
                    updateDate(task.dependencies[i], task);
                }
            }
        };

        var updateDate = function(dependency) {
            var dependencies = new FSDependencies(dependency);
            dependencies.setDate();
            if(dependencies.gotDependencies()) {
                dependencies.updateChildTasks($scope.data)
            }

            $scope.$digest();

            function getTaskModel(model) {
                if(model.task && model.task.model) {
                    return model.task.model;
                }

                return model;
            }
        };

        // Event handler
        var logScrollEvent = function(left, date, direction) {
            if (date !== undefined) {
                //$log.info('[Event] api.on.scroll: ' + left + ', ' + (date === undefined ? 'undefined' : date.format()) + ', ' + direction);
            }
        };

        // Event handler
        var logDataEvent = function(eventName) {
            //$log.info('[Event] ' + eventName);
        };

        // Event handler
        var logTaskEvent = function(eventName, task) {
            //$log.info('[Event] ' + eventName + ': ' + task.model.name);
        };

        // Event handler
        var logRowEvent = function(eventName, row) {
            //$log.info('[Event] ' + eventName + ': ' + row.model.name);
        };

        // Event handler
        var logTimespanEvent = function(eventName, timespan) {
            //$log.info('[Event] ' + eventName + ': ' + timespan.model.name);
        };

        // Event handler
        var logLabelsEvent = function(eventName, width) {
            //$log.info('[Event] ' + eventName + ': ' + width);
        };

        // Event handler
        var logColumnsGenerateEvent = function(columns, headers) {
            //$log.info('[Event] ' + 'columns.on.generate' + ': ' + columns.length + ' column(s), ' + headers.length + ' header(s)');
        };

        // Event handler
        var logRowsFilterEvent = function(rows, filteredRows) {
            //$log.info('[Event] rows.on.filter: ' + filteredRows.length + '/' + rows.length + ' rows displayed.');
        };

        // Event handler
        var logTasksFilterEvent = function(tasks, filteredTasks) {
            //$log.info('[Event] tasks.on.filter: ' + filteredTasks.length + '/' + tasks.length + ' tasks displayed.');
        };

        // Event handler
        var logReadyEvent = function() {
            //$log.info('[Event] core.on.ready');
        };

        // Event utility function
        var addEventName = function(eventName, func) {
            return function(data) {
                return func(eventName, data);
            };
        };

        // angular-gantt options
        $scope.options = {
            mode: 'custom',
            scale: 'day',
            sortMode: undefined,
            sideMode: 'TreeTable',
            daily: false,
            maxHeight: false,
            width: false,
            zoom: 1,
            columns: ['model.name', 'from', 'to'],
            treeTableColumns: ['from', 'to'],
            columnsHeaders: {'model.name' : 'Name', 'from': 'From', 'to': 'To'},
            columnsClasses: {'model.name' : 'gantt-column-name', 'from': 'gantt-column-from', 'to': 'gantt-column-to'},
            columnsFormatters: {
                'from': function(from) {
                    return from !== undefined ? from.format('lll') : undefined;
                },
                'to': function(to) {
                    return to !== undefined ? to.format('lll') : undefined;
                }
            },
            treeHeaderContent: '<i class="fa fa-align-justify"></i> {{getHeader()}}',
            columnsHeaderContents: {
                'model.name': '<i class="fa fa-align-justify"></i> {{getHeader()}}',
                'from': '<i class="fa fa-calendar"></i> {{getHeader()}}',
                'to': '<i class="fa fa-calendar"></i> {{getHeader()}}'
            },
            autoExpand: 'none',
            taskOutOfRange: 'truncate',
            fromDate: moment(null),
            toDate: undefined,
            rowContent: '<i class="fa fa-align-justify"></i> {{row.model.name}}',
            taskContent : '<i class="fa fa-tasks"></i> {{task.model.name}}',
            allowSideResizing: true,
            labelsEnabled: true,
            currentDate: 'line',
            currentDateValue: new Date(2016, 4, 3, 11, 20, 0),
            draw: false,
            readOnly: false,
            groupDisplayMode: 'group',
            filterTask: '',
            filterRow: '',
            timeFrames: {
                'day': {
                    start: moment('8:00', 'HH:mm'),
                    end: moment('20:00', 'HH:mm'),
                    color: '#ACFFA3',
                    working: true,
                    default: true
                },
                'noon': {
                    start: moment('12:00', 'HH:mm'),
                    end: moment('13:30', 'HH:mm'),
                    working: false,
                    default: true
                },
                'closed': {
                    working: false,
                    default: true
                },
                'weekend': {
                    working: false
                },
                'holiday': {
                    working: false,
                    color: 'red',
                    classes: ['gantt-timeframe-holiday']
                }
            },
            dateFrames: {
                'weekend': {
                    evaluator: function(date) {
                        return date.isoWeekday() === 6 || date.isoWeekday() === 7;
                    },
                    targets: ['weekend']
                },
                '11-november': {
                    evaluator: function(date) {
                        return date.month() === 10 && date.date() === 11;
                    },
                    targets: ['holiday']
                }
            },
            timeFramesWorkingMode: 'hidden',
            timeFramesNonWorkingMode: 'visible',
            columnMagnet: '15 minutes',
            timeFramesMagnet: true,
            dependencies: {
                enabled: true,
                conflictChecker: true
            },
            targetDataAddRowIndex: undefined,
            canDraw: function(event) {
                var isLeftMouseButton = event.button === 0 || event.button === 1;
                return $scope.options.draw && !$scope.options.readOnly && isLeftMouseButton;
            },
            drawTaskFactory: function() {
                return {
                    id: utils.randomUuid(),  // Unique id of the task.
                    name: 'Drawn task', // Name shown on top of each task.
                    color: '#AA8833' // Color of the task in HEX format (Optional).
                };
            },
            api: function(api) {
                // API Object is used to control methods and events from angular-gantt.
                $scope.api = api;

                api.core.on.ready($scope, function() {
                    // Log various events to console
                    api.scroll.on.scroll($scope, logScrollEvent);
                    api.core.on.ready($scope, logReadyEvent);

                    api.data.on.remove($scope, addEventName('data.on.remove', logDataEvent));
                    api.data.on.load($scope, addEventName('data.on.load', logDataEvent));
                    api.data.on.clear($scope, addEventName('data.on.clear', logDataEvent));
                    api.data.on.change($scope, addEventName('data.on.change', logDataEvent));

                    api.tasks.on.add($scope, addEventName('tasks.on.add', logTaskEvent));
                    api.tasks.on.change($scope, addEventName('tasks.on.change', logTaskEvent));
                    api.tasks.on.rowChange($scope, addEventName('tasks.on.rowChange', logTaskEvent));
                    api.tasks.on.remove($scope, addEventName('tasks.on.remove', logTaskEvent));

                    if (api.tasks.on.moveBegin) {
                        api.tasks.on.moveBegin($scope, addEventName('tasks.on.moveBegin', function(evt, task) {
                        }));
                        //api.tasks.on.move($scope, addEventName('tasks.on.move', logTaskEvent));
                        api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', function(evt, task) {
                            var resizeTask = new Resize(task);
                            resizeTask.updateDependencies($scope.data);
                        }));

                        api.tasks.on.resizeBegin($scope, addEventName('tasks.on.resizeBegin', logTaskEvent));
                        //api.tasks.on.resize($scope, addEventName('tasks.on.resize', logTaskEvent));
                        api.tasks.on.resizeEnd($scope, addEventName('tasks.on.resizeEnd', function(evt, task) {
                            var resizeTask = new Resize(task);
                            resizeTask.updateDependencies($scope.data);
                        }));
                    }

                    api.rows.on.add($scope, addEventName('rows.on.add', logRowEvent));
                    api.rows.on.change($scope, addEventName('rows.on.change', logRowEvent));
                    api.rows.on.move($scope, addEventName('rows.on.move', logRowEvent));
                    api.rows.on.remove($scope, addEventName('rows.on.remove', logRowEvent));

                    api.side.on.resizeBegin($scope, addEventName('labels.on.resizeBegin', logLabelsEvent));
                    //api.side.on.resize($scope, addEventName('labels.on.resize', logLabelsEvent));
                    api.side.on.resizeEnd($scope, addEventName('labels.on.resizeEnd', logLabelsEvent));

                    api.timespans.on.add($scope, addEventName('timespans.on.add', logTimespanEvent));
                    api.columns.on.generate($scope, logColumnsGenerateEvent);

                    api.rows.on.filter($scope, logRowsFilterEvent);
                    api.tasks.on.filter($scope, logTasksFilterEvent);

                    api.data.on.change($scope, function(newData) {
                        if (dataToRemove === undefined) {
                            /*dataToRemove = [
                                {'id': newData[2].id}, // Remove Kickoff nrow
                                {
                                    'id': newData[0].id, 'tasks': [
                                    {'id': newData[0].tasks[0].id},
                                    {'id': newData[0].tasks[3].id}
                                ]
                                }, // Remove some Milestones
                                {
                                    'id': newData[7].id, 'tasks': [
                                    {'id': newData[7].tasks[0].id}
                                ]
                                } // Remove order basket from Sprint 2
                            ];*/
                        }
                    });


                    // DEPENDENCIES
                    api.dependencies.on.add($scope, function(task) {
                       updateDate(task);
                    });

                    // When gantt is ready, load data.
                    // `data` attribute could have been used too.
                    $scope.load();

                    // Add some DOM events
                    api.directives.on.new($scope, function(directiveName, directiveScope, element) {
                        if (directiveName === 'ganttTask') {
                            element.bind('click', function(event) {
                                event.stopPropagation();
                                logTaskEvent('task-click', directiveScope.task);
                            });
                            element.bind('mousedown touchstart', function(event) {
                                event.stopPropagation();
                                $scope.live.row = directiveScope.task.row.model;
                                if (directiveScope.task.originalModel !== undefined) {
                                    $scope.live.task = directiveScope.task.originalModel;
                                } else {
                                    $scope.live.task = directiveScope.task.model;
                                }
                                $scope.$digest();
                            });
                        } else if (directiveName === 'ganttRow') {
                            element.bind('click', function(event) {
                                event.stopPropagation();
                                logRowEvent('row-click', directiveScope.row);
                            });
                            element.bind('mousedown touchstart', function(event) {
                                event.stopPropagation();
                                $scope.live.row = directiveScope.row.model;
                                $scope.$digest();
                            });
                        } else if (directiveName === 'ganttRowLabel') {
                            element.bind('click', function() {
                                logRowEvent('row-label-click', directiveScope.row);
                            });
                            element.bind('mousedown touchstart', function() {
                                $scope.live.row = directiveScope.row.model;
                                $scope.$digest();
                            });
                        }
                    });

                    api.tasks.on.rowChange($scope, function(task) {
                        $scope.live.row = task.row.model;
                    });

                    objectModel = new ObjectModel(api);
                });
            }
        };

        $scope.handleTaskIconClick = function(taskModel) {
            alert('Icon from ' + taskModel.name + ' task has been clicked.');
        };

        $scope.handleRowIconClick = function(rowModel) {
            alert('Icon from ' + rowModel.name + ' row has been clicked.');
        };

        $scope.expandAll = function() {
            $scope.api.tree.expandAll();
        };

        $scope.collapseAll = function() {
            $scope.api.tree.collapseAll();
        };

        $scope.$watch('options.sideMode', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.api.side.setWidth(undefined);
                $timeout(function() {
                    $scope.api.columns.refresh();
                });
            }
        });

        $scope.canAutoWidth = function(scale) {
            if (scale.match(/.*?hour.*?/) || scale.match(/.*?minute.*?/)) {
                return false;
            }
            return true;
        };

        $scope.getColumnWidth = function(widthEnabled, scale, zoom) {
            if (!widthEnabled && $scope.canAutoWidth(scale)) {
                return undefined;
            }

            if (scale.match(/.*?week.*?/)) {
                return 150 * zoom;
            }

            if (scale.match(/.*?month.*?/)) {
                return 300 * zoom;
            }

            if (scale.match(/.*?quarter.*?/)) {
                return 500 * zoom;
            }

            if (scale.match(/.*?year.*?/)) {
                return 800 * zoom;
            }

            return 40 * zoom;
        };

        // Reload data action
        $scope.load = function() {
            $scope.data = Sample.getSampleData();
            dataToRemove = undefined;

            $scope.timespans = Sample.getSampleTimespans();
        };

        $scope.reload = function() {
            $scope.load();
        };

        // Remove data action
        $scope.remove = function() {
            $scope.api.data.remove(dataToRemove);
            $scope.api.dependencies.refresh();
        };

        // Clear data action
        $scope.clear = function() {
            $scope.data = [];
        };

        // Add data to target row index
        $scope.addOverlapTaskToTargetRowIndex = function() {
            var targetDataAddRowIndex = parseInt($scope.options.targetDataAddRowIndex);

            if (targetDataAddRowIndex) {
                var targetRow = $scope.data[$scope.options.targetDataAddRowIndex];

                if (targetRow && targetRow.tasks && targetRow.tasks.length > 0) {
                    var firstTaskInRow = targetRow.tasks[0];
                    var copiedColor = firstTaskInRow.color;
                    var firstTaskEndDate = firstTaskInRow.to.toDate();
                    var overlappingFromDate = new Date(firstTaskEndDate);

                    overlappingFromDate.setDate(overlappingFromDate.getDate() - 1);

                    var overlappingToDate = new Date(overlappingFromDate);

                    overlappingToDate.setDate(overlappingToDate.getDate() + 7);

                    targetRow.tasks.push({
                        'name': 'Overlapping',
                        'from': overlappingFromDate,
                        'to': overlappingToDate,
                        'color': copiedColor
                    });
                }
            }
        };


        // Visual two way binding.
        $scope.live = {};

        var debounceValue = 1000;

        var listenTaskJson = debounce(function(taskJson) {
            if (taskJson !== undefined) {
                var task = angular.fromJson(taskJson);
                objectModel.cleanTask(task);
                var model = $scope.live.task;
                angular.extend(model, task);
            }
        }, debounceValue);
        $scope.$watch('live.taskJson', listenTaskJson);

        var listenRowJson = debounce(function(rowJson) {
            if (rowJson !== undefined) {
                var row = angular.fromJson(rowJson);
                objectModel.cleanRow(row);
                var tasks = row.tasks;

                delete row.tasks;
                delete row.drawTask;

                var rowModel = $scope.live.row;

                angular.extend(rowModel, row);

                var newTasks = {};
                var i, l;

                if (tasks !== undefined) {
                    for (i = 0, l = tasks.length; i < l; i++) {
                        objectModel.cleanTask(tasks[i]);
                    }

                    for (i = 0, l = tasks.length; i < l; i++) {
                        newTasks[tasks[i].id] = tasks[i];
                    }

                    if (rowModel.tasks === undefined) {
                        rowModel.tasks = [];
                    }
                    for (i = rowModel.tasks.length - 1; i >= 0; i--) {
                        var existingTask = rowModel.tasks[i];
                        var newTask = newTasks[existingTask.id];
                        if (newTask === undefined) {
                            rowModel.tasks.splice(i, 1);
                        } else {
                            objectModel.cleanTask(newTask);
                            angular.extend(existingTask, newTask);
                            delete newTasks[existingTask.id];
                        }
                    }
                } else {
                    delete rowModel.tasks;
                }

                angular.forEach(newTasks, function(newTask) {
                    rowModel.tasks.push(newTask);
                });
            }
        }, debounceValue);
        $scope.$watch('live.rowJson', listenRowJson);

        $scope.$watchCollection('live.task', function(task) {
            $scope.live.taskJson = angular.toJson(task, true);
            $scope.live.rowJson = angular.toJson($scope.live.row, true);
        });

        $scope.$watchCollection('live.row', function(row) {
            $scope.live.rowJson = angular.toJson(row, true);
            if (row !== undefined && row.tasks !== undefined && row.tasks.indexOf($scope.live.task) < 0) {
                $scope.live.task = row.tasks[0];
            }
        });

        $scope.$watchCollection('live.row.tasks', function() {
            $scope.live.rowJson = angular.toJson($scope.live.row, true);
        });

    }]);

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
                            ]
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
                            ]
                        },

                        // this is a summary task
                        {
                            name: 'Node 1',
                            children: [
                                'Milestone 2',
                                'Control account 1',
                                'Control account 2',
                            ],
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
                            ]
                        },

                        {
                            name: 'Control account 1',
                            children: [
                                'Milestone 3',
                                'Work package 1',
                                'Work package 2'
                            ]
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
                            ]
                        },

                        {
                            name: 'Work package 1',
                            children: [
                                'Milestone 4',
                                'Activity 1',
                                'Activity 2',
                            ]
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
                            ]
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
                            ]
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
                            ]
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
                            ]
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
                            ]
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
                            ]
                        },

                        {
                            name: 'Node 2',
                            children: [
                                'Control account 4',
                                'Control account 5',
                            ]
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
                            ]
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
                            ]
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

'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .factory('FSDependencies', function () {

        var Dependencies = function(dependency, fromTask, toTask) {
            this.fromTask = fromTask || dependency.getFromTask().model;
            this.toTask = toTask || dependency.getToTask().model;

            this.greaterThan = function greaterThan(dateOne, dateTwo) {

                if(dateOne.diff(dateTwo) > 0) {
                    return 1;
                } else {
                    if(dateOne.diff(dateTwo) === 0) {
                        return 0;
                    }
                }

                return -1;
            };

            this.difference = function getDifference(dateOne, dateTwo) {
                return dateOne.diff(dateTwo, 'days')
            };


            this.setDate = function() {
                var greater = this.greaterThan(this.fromTask.from, this.toTask.from);

                if (greater < 0) {
                    var diff = this.difference(this.toTask.from, this.fromTask.to);
                    this.toTask.from = angular.copy(this.fromTask.to);
                    this.toTask.to.subtract(diff, 'days');

                } else {

                    if(greater > 0) {
                        var diff = this.difference(this.fromTask.to, this.toTask.from);
                        this.toTask.from = angular.copy(this.fromTask.to);
                        this.toTask.to.add(diff, 'days');
                    }

                }
            };

            this.gotDependencies = function() {
                return (this.toTask.dependencies)?
                        this.toTask.dependencies.length > 0 :
                        false ;
            };

            this.findTask = function(data, obj) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].tasks) {
                        var childTask = data[i].tasks;
                        for(var j=0; j < childTask.length; j++) {

                            if(childTask[j].id === obj.to) {
                                return childTask[j];
                            }
                        }
                    }
                }
            }

            this.updateChildTasks = function updateDate(data) {
                if(this.gotDependencies()) {
                    for(var i = 0; i < this.toTask.dependencies.length; i++) {
                        var toTask = this.findTask(data, this.toTask.dependencies[i]);

                        var dependency = new Dependencies(null, this.toTask, toTask);
                        dependency.setDate();
                        dependency.updateChildTasks(data);
                    }
                }
            }


        };


        return Dependencies;
    });
;

'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .factory('ResizeDependencies', ['FSDependencies', function (Dependencies) {

        var Resize = function(task) {
            this.task = task;
            this.model = task.model;

            this.updateDependencies = function(data) {
                if(this.model.dependencies) {
                    for(var i = 0; i < this.model.dependencies.length; i++) {
                        var toTask = this.findTask(data, this.model.dependencies[i]);
                        var dependencies = new Dependencies(null, this.model, toTask);
                        dependencies.setDate();
                        dependencies.updateChildTasks(data);
                    }
                }
            }

            this.findTask = function(data, obj) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].tasks) {
                        var childTask = data[i].tasks;
                        for(var j=0; j < childTask.length; j++) {

                            if(childTask[j].id === obj.to) {
                                return childTask[j];
                            }
                        }
                    }
                }
            }
        };


        return Resize;
    }]);
;
