(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttDependenciesComponent', {
            require: {
                ganttCMP: '^gantt',
                ganttBody: '^ganttBody'
            },
            bindings: {
                task: '='
            },
            controller: ['$scope', '$element', 'ganttDebounce', 'DependenciesTracker', 'GanttDependenciesTaskManager', 'GanttDependenciesChecker',
            function($scope, $element, debounce, Tracker, DependenciesTaskManager, DependenciesChecker) {
                var manager, checker, api;
                var watcher;
                var self = this;

                function createLeftOverlay() {
                    return angular.element('<span><span class="gantt-endpoint-overlay start-endpoint arrow-right"></span></span>');
                }

                function createRightOverlay() {
                    return angular.element('<span><span class="gantt-endpoint-overlay end-endpoint arrow-right"></span></span>');
                }

                function createLeftFallbackOverlay() {
                    return angular.element('<span><span class="gantt-endpoint-overlay start-endpoint fallback-endpoint"></span></span>');
                }

                function createRightFallbackOverlay() {
                    return angular.element('<span><span class="gantt-endpoint-overlay end-endpoint fallback-endpoint"></span></span>');
                }

                this.$onInit = function() {
                    api = this.ganttCMP.gantt.api;
                    this.$scope = $scope;
                    this.hierarchy = true;
                    this.conflictChecker = false;
                    this.readOnly = false;
                    this.enabled = true;

                    this.jsPlumbDefaults = {
                        Endpoint: ['Dot', {radius: 4}],
                        Connector: 'Flowchart',
                        ConnectionOverlays: [['Arrow', {location: 1, length: 12, width: 12}]],
                        EndpointStyles : [{ fill:"red" }, { fill:"red" }]
                    };

                    this.endpoints = [
                        {
                        anchor: 'Left',
                        isSource: false,
                        isTarget: true,
                        maxConnections: -1,
                        cssClass: 'gantt-endpoint start-endpoint target-endpoint',
                        overlays: [
                            ['Custom', {create: createLeftOverlay}]
                        ]

                        }, {
                            anchor: 'Right',
                            isSource: true,
                            isTarget: false,
                            maxConnections: -1,
                            cssClass: 'gantt-endpoint end-endpoint source-endpoint',
                            overlays: [
                                ['Custom', {create: createRightOverlay}]
                            ]
                        }
                    ];

                    this.fallbackEndpoints = [
                        {
                            endpoint: 'Blank',
                            anchor: 'Left',
                            isSource: false,
                            isTarget: true,
                            maxConnections: 0,
                            cssClass: 'gantt-endpoint start-endpoint fallback-endpoint',
                            overlays: [
                                ['Custom', {create: createLeftFallbackOverlay}]
                            ]
                        }, {
                            endpoint: 'Blank',
                            anchor: 'Right',
                            isSource: true,
                            isTarget: false,
                            maxConnections: 0,
                            cssClass: 'gantt-endpoint end-endpoint fallback-endpoint',
                            overlays: [
                                ['Custom', {create: createRightFallbackOverlay}]
                            ]
                        }
                    ];

                    Tracker.setContainer(this.ganttBody.$element);
                    manager = new DependenciesTaskManager(this.ganttCMP.gantt, $scope, api);
                    checker = new DependenciesChecker(manager, $scope, api);
                };

                var isTask = function(task) {
                    return !task.row.model.children;
                };

                this.$postLink = function() {
                    manager.setTasks(this.task, isTask(this.task));
                    manager.addDependenciesFromTask(self.task);

                    api.tasks.on.remove($scope, function(task) {
                        manager.removeDependenciesFromTask(task);
                    });

                    watcher = $scope.$watchGroup(['$ctrl.task.width', '$ctrl.task.left'], function() {
                        manager.plumb.revalidate(self.task.$element[0]);
                        manager.refresh();
                    });

                    api.dependencies.on.refresh($scope, function() {
                        manager.refresh();
                    });
                };

                this.$onDestroy = function() {
                    manager.removeAll(this.task);
                    watcher();
                };


            }]
        });
}());
