(function() {
    'use strict';
    angular.module('gantt.grDependencies', ['gantt']).directive('ganttGroupsDependencies',
        ['$timeout', '$document', 'GrDependenciesManager',
            function($timeout, $document, DependenciesManager) {
                return {
                    restrict: 'E',
                    require: '^gantt',
                    scope: {
                        enabled: '=?',
                        readOnly: '=?',
                        jsPlumbDefaults: '=?',
                        endpoints: '=?',
                        fallbackEndpoints: '=?',
                        conflictChecker: '=?'
                    },
                    link: function(scope, element, attrs, ganttCtrl) {
                        var api = ganttCtrl.gantt.api;
                        // Load options from global options attribute.
                        if (scope.options && typeof(scope.options.dependencies) === 'object') {
                            for (var option in scope.options.dependencies) {
                                scope[option] = scope.options[option];
                            }
                        }

                        if (scope.enabled === undefined) {
                            scope.enabled = true;
                        }

                        if (scope.readOnly === undefined) {
                            scope.readOnly = false;
                        }

                        if (scope.jsPlumbDefaults === undefined) {
                            // https://jsplumbtoolkit.com/community/doc/defaults.html
                            scope.jsPlumbDefaults = {
                                Endpoint: ['Dot', {radius: 4}],
                                EndpointStyle: {fillStyle: '#456', strokeStyle: '#456', lineWidth: 1},
                                Connector: 'Flowchart',
                                ConnectionOverlays: [['Arrow', {location: 1, length: 12, width: 12}]]
                            };
                        }

                        var manager = new DependenciesManager(ganttCtrl.gantt, scope, api);
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

                        if (scope.endpoints === undefined) {
                            scope.endpoints = [
                                {
                                    anchor: 'Left',
                                    isSource: false,
                                    isTarget: true,
                                    maxConnections: -1,
                                    cssClass: 'gantt-endpoint start-endpoint target-endpoint',
                                    overlays: [
                                        ['Custom', {create: createLeftOverlay}]
                                    ]

                                },
                                {
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
                        }

                        if (scope.fallbackEndpoints === undefined) {
                            scope.fallbackEndpoints = [
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
                                },
                                {
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
                        }

                        if (scope.conflictChecker === undefined) {
                            scope.conflictChecker = false;
                        }

                        api.directives.on.new(scope, function(directiveName, directiveScope, directiveElement) {
                            if (directiveName === 'ganttBody') {
                                manager.plumb.setContainer(directiveElement);
                            }
                        });

                        api.grDependencies.on.displayed(scope, function(groupTask) {
                            console.log('detected');
                            manager.setTasks(groupTask);
                        });

                    }
                };
            }]);
}());

