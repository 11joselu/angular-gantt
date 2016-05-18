'use strict';

/**
 * @ngdoc function
 * @name angularGanttDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularGanttDemoApp
 */
angular.module('angularGanttDemoApp')
    .controller('MainCtrl', ['$scope', '$timeout',  'ganttUtils', 'Sample', 'FSDependencies', 'ResizeDependencies', 'moment', 'MenuService', 'Linker', function($scope, $timeout,  utils, Sample, FSDependencies, Resize,  moment, View, Linker) {
        var toLink = [];
        var taskSelected = null;
        var vm = this;
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

        // Event utility function
        var addEventName = function(eventName, func) {
            return function(data) {
                return func(eventName, data);
            };
        };

        vm.identTask = function() {
            var ident = new Linker(vm.data, vm.api);
            if (toLink.length === 0) {
                ident.identTask(taskSelected);
            } else {
                ident.identTask(toLink);
            }
        };

        vm.linkTasks = function() {
            var linker = new Linker(vm.data, vm.api);
            toLink = linker.linkTaks(toLink);
        };

        vm.unLinkTasks = function() {
            var linker = new Linker(vm.data, vm.api);
            toLink = linker.unLinkTasks(toLink);

            $timeout(function() {
                vm.api.dependencies.refresh();
            }, 0)
        };

        // angular-gantt options
        vm.options = {
            mode: 'custom',
            scale: 'day',
            progress: false,
            baseline: false,
            sortMode: undefined,
            sideMode: 'TreeTable',
            daily: false,
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
                }
            },
            timeFramesWorkingMode: 'hidden',
            timeFramesNonWorkingMode: 'visible',
            columnMagnet: '15 minutes',
            dependencies: {
                enabled: true,
                conflictChecker: false
            },
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
            api: function(api) {
                // API Object is used to control methods and events from angular-gantt.
                vm.api = api;

                api.core.on.ready($scope, function() {
                    // Log various events to console
                    api.side.setWidth(300);

                    api.groups.on.move($scope, function(task) {
                        var resizeTask = new Resize(task, true);
                            resizeTask.updateDependencies(vm.data, api);
                            vm.api.columns.generate();
                    });

                    if (api.tasks.on.moveBegin) {

                        api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', function(evt, task) {
                            var resizeTask = new Resize(task);
                            resizeTask.updateDependencies(vm.data, api);
                            vm.api.columns.generate();
                        }));

                        api.tasks.on.resizeEnd($scope, addEventName('tasks.on.resizeEnd', function(evt, task, row) {
                            var resizeTask = new Resize(task);
                            resizeTask.updateDependencies(vm.data, api);
                        }));
                    }



                    // DEPENDENCIES
                    api.dependencies.on.add($scope, function(task) {
                        if (!utils.denyDrop(task)) {
                            var dependencies = new FSDependencies(task);
                            dependencies.setDate(vm.data, api);
                            if(dependencies.gotDependencies()) {
                                dependencies.updateChildTasks(vm.data, api)
                            }

                        }
                    });

                    // DEPENDENCIES
                    api.dependencies.on.remove($scope, function(task) {
                       var dependencies = new FSDependencies(task);
                        dependencies.removeDependencies(vm.data, api);

                    });

                    // When gantt is ready, load data.
                    // `data` attribute could have been used too.
                    vm.load();



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


                        }
                    });
                });
            }
        };

        vm.viewSelected = "plan";


        vm.expandAll = function() {
            vm.api.tree.expandAll();
        };

        vm.collapseAll = function() {
            vm.api.tree.collapseAll();
        };

        vm.updateView = function() {

            switch (vm.viewSelected) {
                case "plan":
                    vm.options.progress = false;
                    vm.options.baseline = false;
                    vm.data = angular.copy(Sample.getPlanData());
                    vm.options.columnsHeaders.from = "Baseline Start";
                    vm.options.columnsHeaders.to = "Baseline Finish";
                    toLink = [];

                    break;

                case "control":
                    vm.options.progress = true;
                    vm.options.baseline = false;
                    vm.data = angular.copy(Sample.getSampleData());
                    vm.options.columnsHeaders.from = "Start";
                    vm.options.columnsHeaders.to = "Finish";
                    toLink = [];

                    break;
                case "both":
                    var view = new View(Sample.getSampleData(), Sample.getPlanData());
                    view.concat();
                    var newData = view.getConcatenated();
                    vm.options.progress = true;
                    vm.options.baseline = true;
                    vm.data = angular.copy(newData);
                    toLink = [];
                    break;
            }
        };

        vm.canAutoWidth = function(scale) {
            if (scale.match(/.*?hour.*?/) || scale.match(/.*?minute.*?/)) {
                return false;
            }
            return true;
        };

        vm.getColumnWidth = function(widthEnabled, scale, zoom) {
            if (!widthEnabled && vm.canAutoWidth(scale)) {
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
        vm.load = function() {
            vm.data = Sample.getPlanData();
            vm.timespans = Sample.getSampleTimespans();
        };

        vm.reload = function() {
            vm.load();
        };

    }]);
