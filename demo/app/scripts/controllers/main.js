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
        'ganttMouseOffset', 'ganttDebounce', 'moment', 'ViewService', 'Linker', function($scope, $timeout, $log, utils, ObjectModel, Sample, FSDependencies, Resize, mouseOffset, debounce, moment, View, Linker) {
        var objectModel;
        var dataToRemove;
        var toLink = [];
        var taskSelected = null;

        var toggleLink = function(directiveScope) {
            var model = directiveScope.task.row.model;
            if (toggleClass(directiveScope.task)) {
                if (toLink.indexOf(directiveScope.task) === -1) {
                    toLink.push(directiveScope.task);
                }
            }else {
                toLink.splice(toLink.indexOf(directiveScope.task), 1);
            }

        };

        var toggleClass = function(task) {
            var model = task.row.model;

            if (hasClass(model)) {
                removeClass(model);
                return false;
            }

            addClass(model);

            return true;
        }

        var hasClass = function(model) {
            if (model.classes == undefined) {
                model.classes = [];
                return false;
            }

            return ~model.classes.indexOf('task-is-selected') !== 0;
        };

        var removeClass = function(model) {
            model.classes.splice(model.classes.indexOf('task-is-selected'), 1);
        };

        var addClass = function(model) {
            if (!hasClass(model)) {
                model.classes.push('task-is-selected');
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

        var refreshTree = function(api) {
            api.tree.refresh()
        };

        // Event utility function
        var addEventName = function(eventName, func) {
            return function(data) {
                return func(eventName, data);
            };
        };

        $scope.linkTasks = function() {
            var linker = new Linker($scope.data, $scope.api);
            toLink = linker.linkTaks(toLink);
        };

        $scope.unLinkTasks = function() {
            var linker = new Linker($scope.data, $scope.api);
            toLink = linker.unLinkTasks(toLink);

            $timeout(function() {
                $scope.api.dependencies.refresh();
            }, 0)
        };

        // angular-gantt options
        $scope.options = {
            mode: 'custom',
            scale: 'day',
            progress: false,
            baseline: false,
            sortMode: undefined,
            sideMode: 'TreeTable',
            daily: true,
            maxHeight: false,
            width: true,
            zoom: 1,
            columns: ['model.name', 'from', 'to', 'model.wbs'],
            // tree columns
            treeTableColumns: [
                'model.data.predecessors',
                'model.data.wbs',
                'model.data.account',
                'model.data.package',
                'model.data.duration',
                'from',
                'to',
                'base.from',
                'base.to'
                ],
            // tree columns name
            columnsHeaders: {
                'model.name' : 'Name',
                'model.data.wbs': 'WBS Code',
                'model.data.account': 'Control Account',
                'model.data.package': 'Work Package',
                'model.data.predecessors': 'Predecessors',
                'model.data.duration': 'Duration',
                'from': 'Baseline Start',
                'to': 'Baseline Finish',
                'base.from': 'Baseline Start',
                'base.to': 'Baseline Finish'
            },
            // tree columns clases
            columnsClasses: {
                'model.name' :'gantt-column-name',
                'from': 'gantt-column-from',
                'to': 'gantt-column-to',
                'model.data.account': 'gantt-column-account',
                'model.data.package': 'gantt-column-package',
                'model.data.predecessors': 'gantt-column-predecessors',
                'model.data.duration': 'gantt-column-duration',
            },
            // tree columns formaters
            columnsFormatters: {
                'model.data.account': function(data, columName, d) {

                    return (data) ? "Yes" : "";
                },
                'model.data.package': function(data) {
                    return (data)? "Yes": "";
                },
                'model.data.predecessors': function(data) {
                    return data? data: "";
                },
                'from': function(from) {
                    // from.format('lll')
                    return from !== undefined ? from.format('DD/MM/YYYY hh:mm') : undefined;
                },
                'to': function(to) {
                    return to !== undefined ? to.format('DD/MM/YYYY hh:mm') : undefined;
                }
            },
            treeHeaderContent: '<i></i> {{getHeader()}}',
            //class="fa fa-align-justify"
            columnsHeaderContents: {
                'model.name': '<i class="fa fa-align-justify"></i> {{getHeader()}}',
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
                    end: moment('17:00', 'HH:mm'),
                    color: '#BEFFC0',
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
                    working: true,
                    default: true
                },
                'weekend': {
                    working: true
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
                conflictChecker: false
            },
            targetDataAddRowIndex: undefined,
            jsPlumbDefaults: {
                                Endpoint: ['Dot', {radius: 3}],
                                EndpointStyle: {fillStyle: '#456', strokeStyle: '#456', lineWidth: 1},
                                Connector: 'Flowchart',
                                PaintStyle: {
                                    fillStyle: "#000",
                                    strokeStyle: "#000"
                                },
                                ConnectionOverlays: [['Arrow', { foldback: 1, location: 1, length: 8, width: 8}]]
            },
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

                    api.side.setWidth(300);

                    api.groups.on.move($scope, function(task) {
                        console.log(task);
                    });

                    if (api.tasks.on.moveBegin) {
                        api.tasks.on.moveBegin($scope, addEventName('tasks.on.moveBegin', function(evt, task) {
                        }));
                        //api.tasks.on.move($scope, addEventName('tasks.on.move', logTaskEvent));
                        api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', function(evt, task) {
                            var resizeTask = new Resize(task);
                            resizeTask.updateDependencies($scope.data, api);
                            $scope.api.columns.generate();
                        }));

                        api.tasks.on.resizeBegin($scope, addEventName('tasks.on.resizeBegin', logTaskEvent));
                        //api.tasks.on.resize($scope, addEventName('tasks.on.resize', logTaskEvent));
                        api.tasks.on.resizeEnd($scope, addEventName('tasks.on.resizeEnd', function(evt, task, row) {
                            var resizeTask = new Resize(task);
                            resizeTask.updateDependencies($scope.data, api);
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
                        }
                    });


                    // DEPENDENCIES
                    api.dependencies.on.add($scope, function(task) {
                        if (!utils.denyDrop(task)) {
                            var dependencies = new FSDependencies(task);
                            dependencies.setDate($scope.data, api);
                            if(dependencies.gotDependencies()) {
                                dependencies.updateChildTasks($scope.data, api)
                            }

                        }
                    });

                    // DEPENDENCIES
                    api.dependencies.on.remove($scope, function(task) {
                       var dependencies = new FSDependencies(task);
                        dependencies.removeDependencies($scope.data, api);

                    });

                    // When gantt is ready, load data.
                    // `data` attribute could have been used too.
                    $scope.load();



                    // Add some DOM events
                    api.directives.on.new($scope, function(directiveName, directiveScope, element) {
                        if (directiveName === 'ganttTask') {
                            element.bind('click', function(event) {
                                event.stopPropagation();

                                if (event.ctrlKey) {
                                    if (taskSelected) {
                                        toLink.unshift(taskSelected);
                                        taskSelected = null;
                                    }

                                    toggleLink(directiveScope);
                                } else {

                                    addClass(directiveScope.task.row.model);

                                    if (taskSelected && taskSelected.model.id !== directiveScope.task.model.id ) {
                                        removeClass(taskSelected.row.model);
                                    }

                                    taskSelected = directiveScope.task;

                                    if (toLink.length > 0) {
                                        angular.forEach(toLink, function(task) {
                                            if (taskSelected.model.id !== task.model.id) {
                                                removeClass(task.row.model);
                                            }
                                        })
                                        toLink = [];
                                    }
                                }

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

        $scope.viewSelected = "plan";

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

        $scope.updateView = function() {

            switch ($scope.viewSelected) {
                case "plan":
                    $scope.options.progress = false;
                    $scope.options.baseline = false;
                    $scope.data = angular.copy(Sample.getPlanData());
                    $scope.options.columnsHeaders.from = "Baseline Start";
                    $scope.options.columnsHeaders.to = "Baseline Finish";
                    toLink = [];

                    break;

                case "control":
                    $scope.options.progress = true;
                    $scope.options.baseline = false;
                    $scope.data = angular.copy(Sample.getSampleData());
                    $scope.options.columnsHeaders.from = "Start";
                    $scope.options.columnsHeaders.to = "Finish";
                    toLink = [];

                    break;
                case "both":
                    var view = new View(Sample.getSampleData(), Sample.getPlanData());
                    view.concat();
                    var newData = view.getConcatenated();
                    $scope.options.progress = true;
                    $scope.options.baseline = true;
                    $scope.data = angular.copy(newData);
                    toLink = [];
                    break;
            }
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
            $scope.data = Sample.getPlanData();
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
