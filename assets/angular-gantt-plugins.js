/*
Project: angular-gantt v1.2.14 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: https://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function() {
    'use strict';
    angular.module('gantt.dependencies', ['gantt', 'gantt.dependencies.templates']).directive('ganttDependencies',
        ['$timeout', '$document', 'ganttDebounce', 'GanttDependenciesManager', 'GanttDependenciesChecker',
            function($timeout, $document, debounce, DependenciesManager, DependenciesChecker) {
                return {
                    restrict: 'E',
                    require: '^gantt',
                    scope: {
                        enabled: '=?',
                        hierarchy: '=?',
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

                        if (scope.hierarchy === undefined) {
                            scope.hierarchy = true;
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

                        var manager = new DependenciesManager(ganttCtrl.gantt, scope, api);
                        var checker = new DependenciesChecker(manager, scope, api);

                        scope.$watchGroup(['conflictChecker', 'enabled'], function(newValue, oldValue) {
                            if (newValue !== oldValue) {
                                var rows = ganttCtrl.gantt.rowsManager.rows;
                                var allTasks = [];
                                for (var i = 0; i < rows.length; i++) {
                                    allTasks.push.apply(allTasks, rows[i].tasks);
                                }
                                if (scope.conflictChecker && scope.enabled) {
                                    var tasksChecker = checker.refresh(allTasks);
                                    api.dependencies.raise.checked(tasksChecker);
                                } else {
                                    checker.clear(allTasks);
                                }

                            }
                        });


                        api.directives.on.new(scope, function(directiveName, directiveScope, directiveElement) {
                            if (directiveName === 'ganttBody') {
                                manager.plumb.setContainer(directiveElement);
                            }
                        });

                        api.tasks.on.add(scope, function(task) {
                            manager.addDependenciesFromTask(task, true);
                        });

                        api.tasks.on.remove(scope, function(task) {
                            manager.removeDependenciesFromTask(task);
                        });

                        api.tasks.on.displayed(scope, debounce(function(tasks) {
                            manager.setTasks(tasks);
                            manager.refresh();
                            if (scope.conflictChecker && scope.enabled) {
                                checker.refresh(tasks);
                            }
                        }));

                        api.rows.on.displayed(scope, function() {
                            manager.refresh();
                        });

                        api.tasks.on.viewChange(scope, function(task) {
                            if (task.$element) {
                                manager.plumb.revalidate(task.$element[0]);
                            }
                            if (scope.conflictChecker && scope.enabled) {
                                checker.refresh([task]);
                            }
                        });

                        api.tasks.on.viewRowChange(scope, function(task) {
                            manager.setTask(task);
                            if (scope.conflictChecker && scope.enabled) {
                                checker.refresh([task]);
                                var tasksChecker = checker.refresh([task]);
                                api.dependencies.raise.checked(tasksChecker);
                            }
                        });

                        api.dependencies.on.add(scope, function(dependency) {
                            if (scope.hierarchy) {
                                var hasRemoved = manager.denyDropIntoChild(dependency, api);

                                if (hasRemoved) {
                                  // emit remove Event History
                                  api.dependencies.raise.onChild(dependency);
                                }
                            }

                            if (scope.conflictChecker && scope.enabled) {
                                var taskChecker = checker.refresh([dependency.getFromTask(), dependency.getToTask()]);
                                if (taskChecker) {
                                    api.dependencies.raise.checked(taskChecker);
                                }
                            }
                        });

                        api.groups.on.displayed(scope, function(groups) {
                            manager.setGroups([groups]);
                        });

                        api.groups.on.viewChange(scope, function(group) {
                            if (group.$element) {
                                manager.plumb.revalidate(group.$element[0]);
                            }
                        });

                        api.groups.on.change(scope, function(group) {
                            manager.removeGroup(group);
                        });

                        api.dependencies.on.checker(scope, function() {
                            if (scope.enabled) {
                                api.dependencies.raise.checked(manager.getDependencies());
                            }
                        });

                        api.dependencies.on.change(scope, function(dependency) {
                            if (scope.conflictChecker && scope.enabled) {
                                var tasksChecker = checker.refresh([dependency.getFromTask(), dependency.getToTask()]);
                                api.dependencies.raise.checked(tasksChecker );
                            }
                        });

                        api.dependencies.on.remove(scope, function(dependency) {
                            if (scope.conflictChecker && scope.enabled) {
                                var fromTask = dependency.getFromTask();
                                var toTask = dependency.getToTask();

                                if (fromTask && toTask) {
                                    checker.refresh([fromTask, toTask]);
                                } else {

                                    if (fromTask) {
                                        checker.removeConflictClass(fromTask);
                                    } else {
                                        checker.removeConflictClass(toTask);
                                    }

                                }

                            }
                        });


                    }
                };
            }]);
}());


(function(){
  'use strict';
  angular.module('gantt.milestones', ['gantt', 'gantt.milestones.templates'])
    .directive('ganttMilestones', ['moment', '$compile', '$document', function(moment, $compile, $document) {
      return {
        restrict: 'E',
        require: '^gantt',
        scope: {
          enabled: '=?'
        },
        link: function(scope, element, attrs, ganttCtrl) {
          var api = ganttCtrl.gantt.api;

          if (scope.enabled === undefined) {
            scope.enabled = true;
          }

          api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
            if (directiveName === 'ganttTask') {
              var lineScope = taskScope.$new();
              lineScope.pluginScope = scope;

              var ifElement = $document[0].createElement('div');
              angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');
              var lineElement = $document[0].createElement('gantt-task-milestones');
              if (attrs.templateUrl !== undefined) {
                angular.element(lineElement).attr('data-template-url', attrs.templateUrl);
              }
              if (attrs.template !== undefined) {
                angular.element(lineElement).attr('data-template', attrs.template);
              }
              angular.element(ifElement).append(lineElement);
              taskElement.append($compile(ifElement)(lineScope));
            }
          });
        }
      };
    }]);
}());

(function(){
    'use strict';

    /* jshint latedef: false */
    angular.module('gantt.movable', ['gantt']).directive('ganttMovable', ['ganttMouseButton', 'ganttMouseOffset', 'ganttSmartEvent', 'ganttMovableOptions', 'ganttUtils', 'ganttDom', '$window', '$document', '$timeout',
        function(mouseButton, mouseOffset, smartEvent, movableOptions, utils, dom, $window, $document, $timeout) {
            // Provides moving and resizing of tasks
            return {
                restrict: 'E',
                require: '^gantt',
                scope: {
                    enabled: '=?',
                    allowMoving: '=?',
                    allowResizing: '=?',
                    allowRowSwitching: '=?'
                },
                link: function(scope, element, attrs, ganttCtrl) {
                    var api = ganttCtrl.gantt.api;

                    // Load options from global options attribute.
                    if (scope.options && typeof(scope.options.movable) === 'object') {
                        for (var option in scope.options.movable) {
                            scope[option] = scope.options[option];
                        }
                    }

                    movableOptions.initialize(scope);

                    api.registerEvent('tasks', 'move');
                    api.registerEvent('tasks', 'moveBegin');
                    api.registerEvent('tasks', 'moveEnd');
                    api.registerEvent('tasks', 'resize');
                    api.registerEvent('tasks', 'resizeBegin');
                    api.registerEvent('tasks', 'resizeEnd');
                    api.registerEvent('tasks', 'change');

                    var _hasTouch = ('ontouchstart' in $window) || $window.DocumentTouch && $document[0] instanceof $window.DocumentTouch;
                    var _pressEvents = 'touchstart mousedown';
                    var _moveEvents = 'touchmove mousemove';
                    var _releaseEvents = 'touchend mouseup';

                    var taskWithSmallWidth = 15;
                    var resizeAreaWidthBig = 5;
                    var resizeAreaWidthSmall = 3;
                    var scrollSpeed = 15;
                    var scrollTriggerDistance = 5;
                    var mouseStartOffsetX;
                    var moveStartX;

                    api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                        if (directiveName === 'ganttTask') {
                            var windowElement = angular.element($window);
                            
                            taskScope.row = taskScope.row || taskScope.$ctrl.task.row;
                            taskScope.task = taskScope.task || taskScope.$ctrl.task;

                            var ganttBodyElement = taskScope.row.rowsManager.gantt.body.$element;
                            var ganttScrollElement = taskScope.row.rowsManager.gantt.scroll.$element;

                            var taskHasBeenChanged = false;
                            var taskHasBeenMovedFromAnotherRow = false;
                            var scrollInterval;

                            var foregroundElement = taskScope.task.getForegroundElement();

                            // IE<11 doesn't support `pointer-events: none`
                            // So task content element must be added to support moving properly.
                            var contentElement = taskScope.task.getContentElement();

                            var onPressEvents = function(evt) {
                                evt.preventDefault();
                                if (_hasTouch) {
                                    evt = mouseOffset.getTouch(evt);
                                }
                                var taskMovable = taskScope.task.model.movable;
                                var rowMovable = taskScope.task.row.model.movable;

                                if (typeof(taskMovable) === 'boolean' || angular.isFunction(taskMovable)) {
                                    taskMovable = {enabled: taskMovable};
                                }

                                if (typeof(rowMovable) === 'boolean' || angular.isFunction(rowMovable)) {
                                    rowMovable = {enabled: rowMovable};
                                }

                                var enabledValue = utils.firstProperty([taskMovable, rowMovable], 'enabled', scope.enabled);
                                var enabled = angular.isFunction(enabledValue) ? enabledValue(evt, taskScope.task): enabledValue;
                                if (enabled) {
                                    var taskOffsetX = mouseOffset.getOffsetForElement(foregroundElement[0], evt).x;
                                    var mode = getMoveMode(taskOffsetX);
                                    if (mode !== '' && mouseButton.getButton(evt) === 1) {
                                        var bodyOffsetX = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt).x;
                                        enableMoveMode(mode, bodyOffsetX);
                                    }
                                    taskScope.$digest();
                                }
                            };
                            foregroundElement.on(_pressEvents, onPressEvents);
                            contentElement.on(_pressEvents, onPressEvents);

                            var onMousemove = function (evt) {
                                var taskMovable = taskScope.task.model.movable;
                                var rowMovable = taskScope.task.row.model.movable;

                                if (typeof(taskMovable) === 'boolean' || angular.isFunction(taskMovable)) {
                                    taskMovable = {enabled: taskMovable};
                                }

                                if (typeof(rowMovable) === 'boolean' || angular.isFunction(rowMovable)) {
                                    rowMovable = {enabled: rowMovable};
                                }

                                var enabledValue = utils.firstProperty([taskMovable, rowMovable], 'enabled', scope.enabled);
                                var enabled = angular.isFunction(enabledValue) ? enabledValue(evt, taskScope.task): enabledValue;
                                if (enabled && !taskScope.task.isMoving) {
                                    var taskOffsetX = mouseOffset.getOffsetForElement(foregroundElement[0], evt).x;
                                    var mode = getMoveMode(taskOffsetX);
                                    if (mode !== '' && mode !== 'M') {
                                        foregroundElement.css('cursor', getCursor(mode));
                                        contentElement.css('cursor', getCursor(mode));
                                    } else {
                                        foregroundElement.css('cursor', '');
                                        contentElement.css('cursor', '');
                                    }
                                }
                            };
                            foregroundElement.on('mousemove', onMousemove);
                            contentElement.on('mousemove', onMousemove);

                            var handleMove = function(evt) {
                                if (taskScope.task.isMoving && !taskScope.destroyed) {
                                    clearScrollInterval();
                                    moveTask(evt);
                                    scrollScreen(evt);
                                }
                            };

                            var moveTask = function(evt) {
                                var oldTaskHasBeenChanged = taskHasBeenChanged;

                                var mousePos = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt);
                                var x = mousePos.x;
                                taskScope.task.mouseOffsetX = x;
                                var taskOutOfRange = taskScope.task.row.rowsManager.gantt.options.value('taskOutOfRange');

                                var taskMovable = taskScope.task.model.movable;
                                var rowMovable = taskScope.task.row.model.movable;

                                if (typeof(taskMovable) === 'boolean' || angular.isFunction(taskMovable)) {
                                    taskMovable = {enabled: taskMovable};
                                }

                                if (typeof(rowMovable) === 'boolean' || angular.isFunction(rowMovable)) {
                                    rowMovable = {enabled: rowMovable};
                                }

                                if (taskScope.task.moveMode === 'M') {
                                    var allowRowSwitching = utils.firstProperty([taskMovable, rowMovable], 'allowRowSwitching', scope.allowRowSwitching);
                                    if (allowRowSwitching) {
                                        var scrollRect = ganttScrollElement[0].getBoundingClientRect();
                                        var rowCenterLeft = scrollRect.left + scrollRect.width / 2;
                                        var ganttBody = angular.element($document[0].querySelectorAll('.gantt-body'));
                                        ganttBody.css('pointer-events', 'auto'); // pointer-events must be enabled for following to work.
                                        var targetRowElement = dom.findElementFromPoint(rowCenterLeft, evt.clientY, function(element) {
                                            return angular.element(element).hasClass('gantt-row');
                                        });
                                        ganttBody.css('pointer-events', '');

                                        var rows = ganttCtrl.gantt.rowsManager.rows;
                                        var targetRow;
                                        for (var i= 0, l=rows.length; i<l; i++) {
                                            if (targetRowElement === rows[i].$element[0]) {
                                                targetRow = rows[i];
                                                break;
                                            }
                                        }

                                        var sourceRow = taskScope.task.row;

                                        if (targetRow !== undefined && sourceRow !== targetRow) {
                                            targetRow.moveTaskToRow(taskScope.task, true);
                                            taskHasBeenChanged = true;
                                        }
                                    }

                                    var allowMoving = utils.firstProperty([taskMovable, rowMovable], 'allowMoving', scope.allowMoving);
                                    if (allowMoving) {
                                        x = x - mouseStartOffsetX;

                                        if (taskOutOfRange !== 'truncate') {
                                            if (x < 0) {
                                                x = 0;
                                            } else if (x + taskScope.task.width >= taskScope.gantt.width) {
                                                x = taskScope.gantt.width - taskScope.task.width;
                                            }
                                        }

                                        taskScope.task.moveTo(x, true);
                                        taskScope.$digest();

                                        if (taskHasBeenChanged) {
                                            taskScope.row.rowsManager.gantt.api.tasks.raise.move(taskScope.task);
                                        }
                                        taskHasBeenChanged = true;
                                    }
                                } else if (taskScope.task.moveMode === 'E') {
                                    if (x <= taskScope.task.left) {
                                        x = taskScope.task.left;
                                        taskScope.task.moveMode = 'W';
                                        setGlobalCursor(getCursor(taskScope.task.moveMode ));
                                    }

                                    if (taskOutOfRange !== 'truncate' && x >= taskScope.gantt.width) {
                                        x = taskScope.gantt.width;
                                    }

                                    taskScope.task.setTo(x, true);
                                    taskScope.$digest();

                                    if (taskHasBeenChanged) {
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.resize(taskScope.task);
                                    }
                                    taskHasBeenChanged = true;
                                } else {
                                    if (x > taskScope.task.left + taskScope.task.width) {
                                        x = taskScope.task.left + taskScope.task.width;
                                        taskScope.task.moveMode = 'E';
                                        setGlobalCursor(getCursor(taskScope.task.moveMode ));
                                    }

                                    if (taskOutOfRange !== 'truncate' && x < 0) {
                                        x = 0;
                                    }

                                    taskScope.task.setFrom(x, true);
                                    taskScope.$digest();

                                    if (taskHasBeenChanged) {
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.resize(taskScope.task);
                                    }
                                    taskHasBeenChanged = true;
                                }

                                if (!oldTaskHasBeenChanged && taskHasBeenChanged && !taskHasBeenMovedFromAnotherRow) {
                                    if (taskScope.task.moveMode === 'M') {
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.moveBegin(taskScope.task);
                                    } else {
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.resizeBegin(taskScope.task);
                                    }
                                }
                            };

                            var scrollScreen = function(evt) {
                                var mousePos = mouseOffset.getOffsetForElement(ganttBodyElement[0], evt);
                                var leftScreenBorder = ganttScrollElement[0].scrollLeft;
                                var screenWidth = ganttScrollElement[0].offsetWidth;
                                var scrollWidth = ganttScrollElement[0].scrollWidth;
                                var rightScreenBorder = leftScreenBorder + screenWidth;
                                var keepOnScrolling = false;

                                if (mousePos.x < moveStartX) {
                                    // Scroll to the left
                                    if (leftScreenBorder > 0 && mousePos.x <= leftScreenBorder + scrollTriggerDistance) {
                                        mousePos.x -= scrollSpeed;
                                        keepOnScrolling = true;
                                        taskScope.row.rowsManager.gantt.api.scroll.left(scrollSpeed);
                                    }
                                } else {
                                    // Scroll to the right
                                    if (rightScreenBorder < scrollWidth && mousePos.x >= rightScreenBorder - scrollTriggerDistance) {
                                        mousePos.x += scrollSpeed;
                                        keepOnScrolling = true;
                                        taskScope.row.rowsManager.gantt.api.scroll.right(scrollSpeed);
                                    }
                                }

                                if (keepOnScrolling) {
                                    scrollInterval = $timeout(function() {
                                        handleMove(evt);
                                    }, 100, true);
                                }
                            };

                            var clearScrollInterval = function() {
                                if (scrollInterval !== undefined) {
                                    $timeout.cancel(scrollInterval);
                                    scrollInterval = undefined;
                                }
                            };

                            var getMoveMode = function(x) {
                                var distance = 0;


                                var taskMovable = taskScope.task.model.movable;
                                var rowMovable = taskScope.task.row.model.movable;

                                if (typeof(taskMovable) === 'boolean') {
                                    taskMovable = {enabled: taskMovable};
                                }

                                if (typeof(rowMovable) === 'boolean') {
                                    rowMovable = {enabled: rowMovable};
                                }

                                var allowResizing = utils.firstProperty([taskMovable, rowMovable], 'allowResizing', scope.allowResizing);
                                var allowRowSwitching = utils.firstProperty([taskMovable, rowMovable], 'allowRowSwitching', scope.allowRowSwitching);
                                var allowMoving = utils.firstProperty([taskMovable, rowMovable], 'allowMoving', scope.allowMoving);

                                // Define resize&move area. Make sure the move area does not get too small.
                                if (allowResizing) {
                                    distance = foregroundElement[0].offsetWidth < taskWithSmallWidth ? resizeAreaWidthSmall : resizeAreaWidthBig;
                                }

                                if (allowResizing && x > foregroundElement[0].offsetWidth - distance) {
                                    return 'E';
                                } else if (allowResizing && x < distance) {
                                    return 'W';
                                } else if ((allowMoving || allowRowSwitching) && x >= distance && x <= foregroundElement[0].offsetWidth - distance) {
                                    return 'M';
                                } else {
                                    return '';
                                }
                            };

                            var getCursor = function(mode) {
                                switch (mode) {
                                    case 'E':
                                        return 'e-resize';
                                    case 'W':
                                        return 'w-resize';
                                    case 'M':
                                        return 'move';
                                }
                            };

                            var setGlobalCursor = function(cursor) {
                                taskElement.css('cursor', cursor);
                                angular.element($document[0].body).css({
                                 '-moz-user-select': cursor === '' ? '': '-moz-none',
                                 '-webkit-user-select': cursor === '' ? '': 'none',
                                 '-ms-user-select': cursor === '' ? '': 'none',
                                 'user-select': cursor === '' ? '': 'none',
                                 'cursor': cursor
                                 });
                            };

                            var enableMoveMode = function(mode, x) {
                                // Clone taskModel
                                if (taskScope.task.originalModel === undefined) {
                                    taskScope.task.originalRow = taskScope.task.row;
                                    taskScope.task.originalModel = taskScope.task.model;
                                    taskScope.task.model = angular.copy(taskScope.task.originalModel);
                                }

                                // Init mouse start variables
                                if (!taskHasBeenMovedFromAnotherRow) {
                                    moveStartX = x;
                                    mouseStartOffsetX = x - taskScope.task.modelLeft;
                                }

                                // Init task move
                                taskHasBeenChanged = false;
                                taskScope.task.moveMode = mode;
                                taskScope.task.isMoving = true;
                                taskScope.task.active = true;

                                // Apply CSS style
                                var backgroundElement = taskScope.task.getBackgroundElement();
                                if (taskScope.task.moveMode === 'M') {
                                    backgroundElement.addClass('gantt-task-resizing');
                                } else {
                                    backgroundElement.addClass('gantt-task-moving');
                                }

                                // Add move event handler
                                var taskMoveHandler = function(evt) {
                                    evt.stopImmediatePropagation();
                                    if (_hasTouch) {
                                        evt = mouseOffset.getTouch(evt);
                                    }

                                    handleMove(evt);
                                };
                                var moveSmartEvent = smartEvent(taskScope, windowElement, _moveEvents, taskMoveHandler);
                                moveSmartEvent.bind();

                                // Remove move event handler on mouse up / touch end
                                smartEvent(taskScope, windowElement, _releaseEvents, function(evt) {
                                    if (_hasTouch) {
                                        evt = mouseOffset.getTouch(evt);
                                    }
                                    moveSmartEvent.unbind();
                                    disableMoveMode(evt);
                                    taskScope.$digest();
                                }).bindOnce();

                                setGlobalCursor(getCursor(mode));
                            };

                            var disableMoveMode = function() {
                                if (taskScope.task.originalModel !== undefined) {

                                    taskScope.task.originalModel.from = taskScope.task.model.from;
                                    taskScope.task.originalModel.to = taskScope.task.model.to;
                                    taskScope.task.originalModel.lct = taskScope.task.model.lct;
                                    taskScope.task.originalModel.est = taskScope.task.model.est;

                                    taskScope.task.model = taskScope.task.originalModel;
                                    if (taskScope.task.row.model.id !== taskScope.task.originalRow.model.id) {
                                        var targetRow = taskScope.task.row;
                                        targetRow.removeTask(taskScope.task.model.id, false, true);
                                        taskScope.task.row = taskScope.task.originalRow;
                                        targetRow.moveTaskToRow(taskScope.task, false);
                                    }
                                    delete taskScope.task.originalModel;
                                    delete taskScope.task.originalRow;

                                    taskScope.$apply();
                                }

                                taskHasBeenMovedFromAnotherRow = false;
                                taskScope.task.isMoving = false;
                                taskScope.task.active = false;

                                // Remove CSS class
                                var getBackgroundElement = taskScope.task.getBackgroundElement();
                                getBackgroundElement.removeClass('gantt-task-moving');
                                getBackgroundElement.removeClass('gantt-task-resizing');

                                // Stop any active auto scroll
                                clearScrollInterval();

                                // Set mouse cursor back to default
                                setGlobalCursor('');

                                // Raise task changed event
                                if (taskHasBeenChanged === true) {
                                    // Raise move end event
                                    if (taskScope.task.moveMode === 'M') {
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.moveEnd(taskScope.task);
                                    } else {
                                        taskScope.row.rowsManager.gantt.api.tasks.raise.resizeEnd(taskScope.task);
                                    }

                                    taskHasBeenChanged = false;
                                    taskScope.task.row.sortTasks(); // Sort tasks so they have the right z-order
                                    taskScope.row.rowsManager.gantt.api.tasks.raise.change(taskScope.task);
                                }

                                taskScope.task.moveMode = undefined;
                            };

                            // Stop scroll cycle (if running) when scope is destroyed.
                            // This is needed when the task is moved to a new row during scroll because
                            // the old scope will continue to scroll otherwise
                            taskScope.$on('$destroy', function() {
                                taskScope.destroyed = true;
                                clearScrollInterval();
                            });

                            if (taskScope.task.isResizing) {
                                taskHasBeenMovedFromAnotherRow = true;
                                enableMoveMode('E', taskScope.task.mouseOffsetX);
                                delete taskScope.task.isResizing;
                            } else if (taskScope.task.isMoving) {
                                // In case the task has been moved to another row a new controller is created by angular.
                                // Enable the move mode again if this was the case.
                                taskHasBeenMovedFromAnotherRow = true;
                                enableMoveMode('M', taskScope.task.mouseOffsetX);
                            }
                        }
                    });
                }
            };
        }]);
}());


(function(){
    /* global ResizeSensor: false */
    /* global ElementQueries: false */
    'use strict';
    angular.module('gantt.resizeSensor', ['gantt']).directive('ganttResizeSensor', [function() {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.progress) === 'object') {
                    for (var option in scope.options.progress) {
                        scope[option] = scope.options[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                function buildSensor() {
                    var ganttElement = element.parent().parent().parent()[0].querySelectorAll('div.gantt')[0];
                    return new ResizeSensor(ganttElement, function() {
                        // See issue #664
                        if (Math.abs(ganttElement.clientWidth - ganttCtrl.gantt.$scope.ganttElementWidth) > 1) {
                            ganttCtrl.gantt.$scope.ganttElementWidth = ganttElement.clientWidth;
                            ganttCtrl.gantt.$scope.$apply();
                        }
                    });
                }

                var rendered = false;
                var sensor;

                api.core.on.rendered(scope, function() {
                    rendered = true;
                    if (sensor !== undefined) {
                        sensor.detach();
                    }
                    if (scope.enabled) {
                        ElementQueries.update();
                        sensor = buildSensor();
                    }
                });

                scope.$watch('enabled', function(newValue) {
                    if (rendered) {
                        if (newValue && sensor === undefined) {
                            ElementQueries.update();
                            sensor = buildSensor();
                        } else if (!newValue && sensor !== undefined) {
                            sensor.detach();
                            sensor = undefined;
                        }
                    }
                });
            }
        };
    }]);
}());


(function(){
    'use strict';

    var moduleName = 'gantt.sortable';
    var directiveName = 'ganttSortable';
    var pluginDependencies = [
        'gantt',
        {module:'ang-drag-drop', url:'https://github.com/ganarajpr/angular-dragdrop.git#master'}
    ];

    var failedDependencies = [];
    var loadedDependencies = [];
    var failedDependency;

    for (var i = 0, l = pluginDependencies.length; i < l; i++) {
        var currentDependency = pluginDependencies[i];
        try {
            if (angular.isString(currentDependency)) {
                currentDependency = {module: currentDependency};
                pluginDependencies[i] = currentDependency;
            }
            angular.module(currentDependency.module);
            loadedDependencies.push(currentDependency.module);
        } catch (e) {
            currentDependency.exception = e;
            failedDependencies.push(currentDependency);
        }
    }

    if (failedDependencies.length > 0) {
        angular.module(moduleName, []).directive(directiveName, ['$log', function($log) {
            return {
                restrict: 'E',
                require: '^gantt',
                scope: {
                    enabled: '=?'
                },
                link: function() {
                    $log.warn(moduleName + ' module can\'t require some dependencies:');
                    for (var i= 0,l =failedDependencies.length; i<l; i++) {
                        failedDependency = failedDependencies[i];

                        var errorMessage = failedDependency.module;
                        if (failedDependency.url) {
                            errorMessage += ' (' + failedDependency.url + ')';
                        }
                        if (failedDependency.exception && failedDependency.exception.message) {
                            errorMessage += ': ' + failedDependency.exception.message;
                        }

                        $log.warn(errorMessage);
                    }
                    $log.warn(directiveName + ' plugin directive won\'t be available');
                }
            };
        }]);
    } else {
        angular.module(moduleName, loadedDependencies).directive(directiveName, ['ganttUtils', '$compile', function(utils, $compile) {
            // Provides the row sort functionality to any Gantt row
            // Uses the sortableState to share the current row

            return {
                restrict: 'E',
                require: '^gantt',
                scope: {
                    enabled: '=?'
                },
                link: function(scope, element, attrs, ganttCtrl) {
                    var api = ganttCtrl.gantt.api;

                    // Load options from global options attribute.
                    if (scope.options && typeof(scope.options.sortable) === 'object') {
                        for (var option in scope.options.sortable) {
                            scope[option] = scope.options[option];
                        }
                    }

                    if (scope.enabled === undefined) {
                        scope.enabled = true;
                    }

                    api.directives.on.new(scope, function(directiveName, rowScope, rowElement) {
                        if (directiveName === 'ganttRowLabel' && rowElement.attr('drag') === undefined) {
                            rowScope.checkDraggable = function() {
                                var rowSortable = rowScope.row.model.sortable;

                                if (typeof(rowSortable) === 'boolean') {
                                    rowSortable = {enabled: rowSortable};
                                }

                                return utils.firstProperty([rowSortable], 'enabled', scope.enabled);
                            };

                            rowScope.onDropSuccess = function() {
                                rowScope.$evalAsync();
                            };

                            rowScope.onDrop = function(evt, data) {
                                var row = rowScope.row.rowsManager.rowsMap[data.id];
                                if (row !== rowScope) {
                                    rowScope.row.rowsManager.moveRow(row, rowScope.row);
                                    rowScope.$evalAsync();
                                }
                            };

                            rowElement.attr('ui-draggable', '{{checkDraggable()}}');
                            rowElement.attr('drag-channel', '\'sortable\'');
                            rowElement.attr('ui-on-drop', 'onDrop($event, $data)');
                            rowElement.attr('on-drop-success', 'onDropSuccess()');

                            rowElement.attr('drop-channel', '\'sortable\'');
                            rowElement.attr('drag', 'row.model');

                            $compile(rowElement)(rowScope);
                        }
                    });

                }
            };
        }]);
    }

}());


(function(){
    'use strict';
    angular.module('gantt.table', ['gantt', 'gantt.table.templates']).directive('ganttTable', ['ganttUtils', '$compile', '$document', function(utils, $compile, $document) {
        // Provides the row sort functionality to any Gantt row
        // Uses the sortableState to share the current row

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                columns: '=?',
                headers: '=?',
                classes: '=?',
                contents: '=?',
                headerContents: '=?',
                formatters: '=?',
                headerFormatter: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.sortable) === 'object') {
                    for (var option in scope.options.sortable) {
                        scope[option] = scope.options[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                if (scope.columns === undefined) {
                    scope.columns = ['model.name'];
                }

                if (scope.headers === undefined) {
                    scope.headers = {'model.name': 'Name'};
                }

                if (scope.contents === undefined) {
                    scope.contents = {};
                }

                if (scope.headerContents === undefined) {
                    scope.headerContents = {};
                }

                if (scope.classes === undefined) {
                    scope.classes = {};
                }

                if (scope.formatters === undefined) {
                    scope.formatters = {};
                }

                api.directives.on.new(scope, function(directiveName, sideContentScope, sideContentElement) {
                    if (directiveName === 'ganttSideContent') {
                        var tableScope = sideContentScope.$new();
                        tableScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');
                        angular.element(ifElement).addClass('side-element');

                        var tableElement = $document[0].createElement('gantt-side-content-table');
                        angular.element(ifElement).append(tableElement);

                        sideContentElement.append($compile(ifElement)(tableScope));
                    }
                });

            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.tooltips', ['gantt', 'gantt.tooltips.templates']).directive('ganttTooltips', ['$compile', '$document', function($compile, $document) {
        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                dateFormat: '=?',
                content: '=?',
                delay: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.tooltips) === 'object') {
                    for (var option in scope.options.tooltips) {
                        scope[option] = scope.options[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }
                if (scope.dateFormat === undefined) {
                    scope.dateFormat = 'MMM DD, HH:mm';
                }
                if (scope.delay === undefined) {
                    scope.delay = 500;
                }
                if (scope.content === undefined) {
                    scope.content = '{{task.model.name}}</br>'+
                                    '<small>'+
                                    '{{task.isMilestone() === true && getFromLabel() || getFromLabel() + \' - \' + getToLabel()}}'+
                                    '</small>';
                }

                scope.api = api;

                api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                    if (directiveName === 'ganttTask') {
                        var tooltipScope = taskScope.$new();

                        tooltipScope.pluginScope = scope;
                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');

                        var tooltipElement = $document[0].createElement('gantt-tooltip');
                        if (attrs.templateUrl !== undefined) {
                            angular.element(tooltipElement).attr('data-template-url', attrs.templateUrl);
                        }
                        if (attrs.template !== undefined) {
                            angular.element(tooltipElement).attr('data-template', attrs.template);
                        }

                        angular.element(ifElement).append(tooltipElement);
                        taskElement.append($compile(ifElement)(tooltipScope));
                    }
                });
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.tree', ['gantt', 'gantt.tree.templates', 'ui.tree']).directive('ganttTree', ['ganttUtils', '$compile', '$document', function(utils, $compile, $document) {
        // Provides the row sort functionality to any Gantt row
        // Uses the sortableState to share the current row

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                header: '=?',
                content: '=?',
                headerContent: '=?',
                keepAncestorOnFilterRow: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.sortable) === 'object') {
                    for (var option in scope.options.sortable) {
                        scope[option] = scope.options[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                if (scope.header === undefined) {
                    scope.header = 'Name';
                }

                if (scope.headerContent === undefined) {
                    scope.headerContent = '{{getHeader()}}';
                }

                if (scope.keepAncestorOnFilterRow === undefined) {
                    scope.keepAncestorOnFilterRow = false;
                }

                api.directives.on.new(scope, function(directiveName, sideContentScope, sideContentElement) {
                    if (directiveName === 'ganttSideContent') {
                        var labelsScope = sideContentScope.$new();
                        labelsScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');
                        angular.element(ifElement).addClass('side-element');

                        var labelsElement = $document[0].createElement('gantt-side-content-tree');
                        angular.element(ifElement).append(labelsElement);

                        sideContentElement.append($compile(ifElement)(labelsScope));
                    }
                });
            }
        };
    }]);
}());


(function() {
    'use strict';

    angular.module('gantt.dependencies').factory('GanttDependenciesChecker', [function() {
        /**
         * Creates a new DependenciesChecker object.
         *
         * @constructor
         */
        var GanttDependenciesChecker = function(manager) {
            function handleTaskConflict(conflictsList, task) {
                if (!(task.model.id in conflictsList) && task.$element) {
                    task.$element.addClass('gantt-task-conflict');
                    conflictsList[task.model.id] = task;
                }
            }

            function handleTaskNonConflict(conflictsList, allTasks) {
                for (var i = 0, l = allTasks.length; i < l; i++) {
                    var task = allTasks[i];
                    if (!(task.model.id in conflictsList) && task.$element) {
                        task.$element.removeClass('gantt-task-conflict');
                    }
                }
            }

            /**
             * Refresh the conflict status of given tasks.
             *
             * @param tasks
             */
            this.refresh = function(tasks) {
                var allTasks = tasks.slice(0);
                var conflictsList = [];

                for (var i = 0; i < tasks.length; i++) {
                    var taskDependencies = manager.getTaskDependencies(tasks[i]);

                    for (var j = 0; j < taskDependencies.length; j++) {
                        var dependency = taskDependencies[j];

                        var fromTask = dependency.getFromTask();
                        var toTask = dependency.getToTask();

                        if (!(fromTask in allTasks)) {
                            allTasks.push(fromTask);
                        }

                        if (!(toTask in allTasks)) {
                            allTasks.push(toTask);
                        }

                        if (fromTask.model.to > toTask.model.from) {
                            handleTaskConflict(conflictsList, fromTask);
                            handleTaskConflict(conflictsList, toTask);
                        }
                    }
                }

                handleTaskNonConflict(conflictsList, allTasks);
            };

            this.removeConflictClass = function(task) {
                task.$element.removeClass('gantt-task-conflict');
            };

            /**
             * Remove the conflict status of given tasks.
             *
             * @param tasks
             */
            this.clear = function(tasks) {
                var allTasks = tasks.slice(0);
                handleTaskNonConflict([], allTasks);
            };

        };
        return GanttDependenciesChecker;
    }]);
}());

(function() {
    'use strict';

    angular.module('gantt.dependencies').factory('GanttDependenciesEvents', [function() {
        /**
         * Creates a new DependenciesEvents object.
         *
         * @param manager DependenciesManager object
         * @constructor
         */
        var DependenciesEvents = function(manager) {
            var self = this;

            this.manager = manager;

            // Deny the start of a drag when in readonly
            var denyDragWhenReadOnly = function () {
                return !self.manager.pluginScope.readOnly;
            };

            this.manager.plumb.bind('beforeDrag', denyDragWhenReadOnly);
            this.manager.plumb.bind('beforeStartDetach', denyDragWhenReadOnly);

            // Deny drop on the same task.
            var denyDropOnSameTask = function(params) {
                return params.sourceId !== params.targetId;
            };

            this.manager.plumb.bind('beforeDrop', denyDropOnSameTask);


            // Notify the manager that a connection is being created.
            this.manager.plumb.bind('connectionDrag', function(connection) {
                self.manager.setDraggingConnection(connection);
            });

            this.manager.plumb.bind('connectionDragStop', function() {
                self.manager.setDraggingConnection(undefined);
            });

            this.manager.plumb.bind('beforeDrop', function() {
                self.manager.setDraggingConnection(undefined);
                return true;
            });

            var createConnection = function(info, mouseEvent) {
                if (mouseEvent) {
                    var oldDependency;
                    if (info.connection.$dependency) {
                        oldDependency = info.connection.$dependency;
                    }

                    var sourceEndpoint = info.sourceEndpoint;
                    var targetEndpoint = info.targetEndpoint;

                    var sourceModel = sourceEndpoint.$task.model;

                    var dependenciesModel = sourceModel.dependencies;
                    if (dependenciesModel === undefined) {
                        dependenciesModel = [];
                        sourceModel.dependencies = dependenciesModel;
                    }

                    var connectionModel = {to: targetEndpoint.$task.model.id};
                    dependenciesModel.push(connectionModel);

                    if (oldDependency) {
                        oldDependency.removeFromTaskModel();
                        self.manager.removeDependency(oldDependency, true); // Connection will be disconnected later by jsPlumb.
                    }

                    var dependency = self.manager.addDependency(sourceEndpoint.$task, connectionModel);
                    info.connection.$dependency = dependency;
                    dependency.connection = info.connection;

                    self.manager.api.dependencies.raise.add(dependency);

                }
            };

            var updateConnection = function(info, mouseEvent) {
                if (mouseEvent) {
                    var oldDependency;
                    if (info.connection.$dependency) {
                        oldDependency = info.connection.$dependency;
                    }

                    var sourceEndpoint = info.newSourceEndpoint;
                    var targetEndpoint = info.newTargetEndpoint;

                    var sourceModel = sourceEndpoint.$task.model;

                    var dependenciesModel = sourceModel.dependencies;
                    if (dependenciesModel === undefined) {
                        dependenciesModel = [];
                        sourceModel.dependencies = dependenciesModel;
                    }

                    var connectionModel = {to: targetEndpoint.$task.model.id};
                    dependenciesModel.push(connectionModel);

                    if (oldDependency) {
                        oldDependency.removeFromTaskModel();
                        self.manager.removeDependency(oldDependency, true); // Connection will be disconnected later by jsPlumb.
                    }

                    var dependency = self.manager.addDependency(sourceEndpoint.$task, connectionModel);
                    info.connection.$dependency = dependency;
                    dependency.connection = info.connection;

                    self.manager.api.dependencies.raise.change(dependency, oldDependency);
                }
            };

            var deleteConnection = function(info, mouseEvent) {
                if (mouseEvent) {
                    var dependency = info.connection.$dependency;

                    dependency.removeFromTaskModel();
                    self.manager.removeDependency(dependency, true); // Connection will be disconnected later by jsPlumb.
                    self.manager.api.dependencies.raise.remove(dependency);
                }
            };

            this.manager.plumb.bind('connectionMoved', updateConnection);
            this.manager.plumb.bind('connection', createConnection);
            this.manager.plumb.bind('connectionDetached', deleteConnection);

        };
        return DependenciesEvents;
    }]);
}());

/* globals jsPlumb */
(function() {
  'use strict';

  angular.module('gantt.dependencies').factory('GanttDependenciesManager', ['GanttDependency', 'GanttDependenciesEvents', 'GanttDependencyTaskMouseHandler', 'ganttUtils', function(Dependency, DependenciesEvents, TaskMouseHandler, ganttUtils) {
    var DependenciesManager = function(gantt, pluginScope, api) {
      var self = this;

      this.gantt = gantt;
      this.pluginScope = pluginScope;
      this.api = api;

      this.api.registerEvent('dependencies', 'add');
      this.api.registerEvent('dependencies', 'change');
      this.api.registerEvent('dependencies', 'remove');
      this.api.registerEvent('dependencies', 'checker');
      this.api.registerEvent('dependencies', 'checked');
      this.api.registerEvent('dependencies', 'onChild');


      this.plumb = jsPlumb.getInstance();
      this.plumb.importDefaults(this.pluginScope.jsPlumbDefaults);

      this.dependenciesFrom = {};
      this.dependenciesTo = {};

      this.tasksList = [];
      this.tasks = {};
      this.groupsList =[];
      this.groups = {};

      this.events = new DependenciesEvents(this);

      this.pluginScope.$watch('enabled', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.refresh();
        }
      });

      this.pluginScope.$watch('readOnly', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.setTasks(self.tasksList);
          self.refresh();
        }
      });

      this.pluginScope.$watch('jsPlumbDefaults', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          self.plumb.importDefaults(newValue);
          self.refresh();
        }
      }, true);

      /**
       * Add all dependencies defined from a task. Dependencies will be added only if plugin is enabled.
       *
       * @param task
       */
      this.addDependenciesFromTask = function(task, allowPartial) {
        if (this.pluginScope.enabled) {
          var taskDependencies = task.model.dependencies;

          if (taskDependencies !== undefined && taskDependencies) {
            if (!angular.isArray(taskDependencies)) {
              taskDependencies = [taskDependencies];
              task.model.dependencies = taskDependencies;
            }

            for (var i = 0, l = taskDependencies.length; i < l; i++) {
              var dependency = self.addDependency(task, taskDependencies[i], allowPartial);
              if (dependency) {
                  dependency.connect();
              }

            }
          }
        }
      };

      /**
       * Remove all dependencies defined for a task.
       *
       * @param task
       * @param keepConnection if true, dependency will not be disconnected.
       */
      this.removeDependenciesFromTask = function(task, keepConnection) {
        var dependencies = this.getTaskDependencies(task);

        if (dependencies) {
          for (var i = 0; i < dependencies.length; i++) {
            if (!keepConnection) {
              dependencies[i].disconnect();
            }
            self.removeDependency(dependencies[i]);
          }
        }
      };

      /**
       * Add definition of a dependency.
       *
       * @param task Task defining the dependency.
       * @param model Model object for the dependency.
       * @param allowPartial if true, dependency linking to a missing task will still be added.
       */
      this.addDependency = function(task, model, allowPartial) {
        var dependency = new Dependency(this, task, model);
        var fromTaskId = dependency.getFromTaskId();
        var fromTask = dependency.getFromTask();
        var toTaskId = dependency.getToTaskId();
        var toTask = dependency.getToTask();

        if (!(fromTaskId in this.dependenciesFrom)) {
          this.dependenciesFrom[fromTaskId] = [];
        }
        if (!(toTaskId in this.dependenciesTo)) {
          this.dependenciesTo[toTaskId] = [];
        }

        if (!allowPartial && (!toTask || !fromTask)) {
          // Partial dependency is not allowed, remove it.
          this.removeDependency(dependency, true);
          dependency.removeFromTaskModel();

          return null;
        } else {
          if (fromTaskId) {
            this.dependenciesFrom[fromTaskId].push(dependency);
          }

          if (toTaskId) {
            this.dependenciesTo[toTaskId].push(dependency);
          }
        }


        return dependency;
      };

      /**
       * Remove definition of a dependency
       *
       * @param dependency Dependency object
       * @param keepConnection if true, dependency will not be disconnected.
       */
      this.removeDependency = function(dependency, keepConnection) {
        var fromDependencies = this.dependenciesFrom[dependency.getFromTaskId()];
        var fromRemove = [];
        var i;

        if (fromDependencies) {
          for (i = 0; i < fromDependencies.length; i++) {
            if (dependency === fromDependencies[i]) {
              fromRemove.push(dependency);
            }
          }
        }

        var toDependencies = this.dependenciesTo[dependency.getToTaskId()];
        var toRemove = [];

        if (toDependencies) {
          for (i = 0; i < toDependencies.length; i++) {
            if (dependency === toDependencies[i]) {
              toRemove.push(dependency);
            }
          }
        }

        for (i = 0; i < fromRemove.length; i++) {
          if (!keepConnection) {
            fromRemove[i].disconnect();
          }
          fromDependencies.splice(fromDependencies.indexOf(dependency), 1);
        }

        for (i = 0; i < toRemove.length; i++) {
          if (!keepConnection) {
            toRemove[i].disconnect();
          }
          toDependencies.splice(toDependencies.indexOf(dependency), 1);
        }

        if (this.dependenciesFrom[dependency.getFromTaskId()] &&
          this.dependenciesFrom[dependency.getFromTaskId()].length === 0) {
          delete this.dependenciesFrom[dependency.getFromTaskId()];
        }

        if (this.dependenciesTo[dependency.getToTaskId()] &&
          this.dependenciesTo[dependency.getToTaskId()].length === 0) {
          delete this.dependenciesTo[dependency.getToTaskId()];
        }
      };

      this.getTaskDependencies = function(task) {
        var dependencies = [];

        if (task) {
          var fromDependencies = self.dependenciesFrom[task.model.id];

          if (fromDependencies) {
            dependencies = dependencies.concat(fromDependencies);
          }

          var toDependencies = self.dependenciesTo[task.model.id];
          if (toDependencies) {
            dependencies = dependencies.concat(toDependencies);
          }
        }

        return dependencies;
      };

      this.getFromTaskDependencies = function(task) {
        var dependencies = [];

        if (task) {
          var fromDependencies = self.dependenciesFrom[task.model.id];

          if (fromDependencies) {
            dependencies = dependencies.concat(fromDependencies);
          }

        }

        return dependencies;
      };

      this.getToTaskDependencies = function(task) {
        var dependencies = [];
        if (task) {
          var toDependencies = self.dependenciesTo[task.model.id];
          if (toDependencies) {
            dependencies = dependencies.concat(toDependencies);
          }
        }

        return dependencies;
      };

      var collect = function collect() {
        var ret = {};
        var len = arguments.length;
        for (var i=0; i<len; i++) {
          for (var p in arguments[i]) {
            if (arguments[i].hasOwnProperty(p)) {
              ret[p] = arguments[i][p];
            }
          }
        }
        return ret;
      };

      this.setDraggingConnection = function(connection) {
        var allTask = collect(self.tasks, self.groups);
        var manager = self.gantt.rowsManager;
        var hasReadOnly = function(task) {
          var data = task.row.model.data;
          if (!data) {
            data = {};
          }
          return data.readOnly;
        };
        if (connection) {
          self.draggingConnection = connection;
          angular.forEach(allTask, function(task) {
            
            if (!hasReadOnly(task)) {
              task.dependencies.mouseHandler.release();
            }

          });
        } else {
          self.draggingConnection = undefined;
          angular.forEach(allTask, function(task) {

            if (!hasReadOnly(task)) {
              task.dependencies.mouseHandler.install();
            }
          });
        }
      };

      var isTaskEnabled = function(task) {
        var rowDependencies = task.row.model.dependencies;
        if (rowDependencies !== undefined) {
          return rowDependencies !== false;
        }
        var taskDependencies = task.model.dependencies;
        if (taskDependencies !== undefined) {
          return taskDependencies !== false;
        }
        return true;
      };

      var addTaskEndpoints = function(task) {
        if (!task.dependencies) {
          task.dependencies = {};
        }

        task.dependencies.endpoints = [];

        if (self.pluginScope.endpoints && task.$element) {
          for (var i = 0; i < self.pluginScope.endpoints.length; i++) {
            var endpointObject = self.plumb.addEndpoint(task.$element, self.pluginScope.endpoints[i]);
            endpointObject.setVisible(false, true, true); // hide endpoint
            endpointObject.$task = task;
            task.dependencies.endpoints.push(endpointObject);
          }
        }

      };

      var removeTaskEndpoint = function(task) {
        if (task.dependencies.endpoints) {
          for (var i = 0; i < task.dependencies.endpoints.length; i++) {
            var endpointObject = task.dependencies.endpoints[i];
            self.plumb.deleteEndpoint(endpointObject);
            endpointObject.$task = undefined;
          }

          task.dependencies.endpoints = undefined;
        }
      };

      var addTaskMouseHandler = function(task) {
        if (!task.dependencies) {
          task.dependencies = {};
        }

        var data = task.row.model.data;
        if (!data) {
            data = {};
        }

        if (!self.pluginScope.readOnly && !data.readOnly) {
          task.dependencies.mouseHandler = new TaskMouseHandler(self, task);
          task.dependencies.mouseHandler.install();
        }
      };

      var removeTaskMouseHandler = function(task) {
        if (task.dependencies.mouseHandler) {
          task.dependencies.mouseHandler.release();
          task.dependencies.mouseHandler = undefined;
        }
      };

      /**
       * Set tasks objects that can be used to display dependencies.
       *
       * @param tasks
       */
      this.setTasks = function(tasks) {
        angular.forEach(self.tasks, function(task) {
          removeTaskMouseHandler(task);
          removeTaskEndpoint(task);
        });

        var newTasks = {};
        var tasksList = [];
        for (var i = 0; i < tasks.length; i++) {
          var task = tasks[i];
          if (isTaskEnabled(task)) {
            newTasks[task.model.id] = task;
            tasksList.push(task);
            addTaskEndpoints(task);
            addTaskMouseHandler(task);
          }
        }
        self.tasks = newTasks;
        self.tasksList = tasks;
      };

      this.removeGroup = function(group) {
        if (group.dependencies) {
          removeTaskMouseHandler(group);
          removeTaskEndpoint(group);
        }
      };

      this.setGroups = function(groups) {
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          if (isTaskEnabled(group)) {
            self.groups[group.model.id] = group;
            self.groupsList.push(group);
            addTaskEndpoints(group);
            addTaskMouseHandler(group);
          }
        }
      };


      var disconnectTaskDependencies = function(task) {
        var dependencies = self.getTaskDependencies(task);
        if (dependencies) {
          for (var i = 0; i < dependencies.length; i++) {
            dependencies[i].disconnect();
          }
        }
        return dependencies;
      };

      var connectTaskDependencies = function(task) {
        var dependencies = self.getTaskDependencies(task);

        if (dependencies) {
          for (var i = 0; i < dependencies.length; i++) {
            dependencies[i].connect();
          }
        }
        return dependencies;
      };

      /**
       * Set task object in replacement of an existing with the same id.
       *
       * @param task
       */
      this.setTask = function(task) {
        self.plumb.setSuspendDrawing(true);
        try {
          var oldTask = self.tasks[task.model.id];
          var isTask = true;

          if (!oldTask) {
            oldTask = self.groups[task.model.id];
            isTask = false;
          }
          if (oldTask !== undefined) {
            disconnectTaskDependencies(oldTask);
            removeTaskMouseHandler(oldTask);
            removeTaskEndpoint(oldTask);
          }
          if (isTaskEnabled(task)) {
            if (isTask) {
              self.tasks[task.model.id] = task;
            } else {
              self.groups[task.model.id] = task;
            }
            addTaskEndpoints(task);
            addTaskMouseHandler(task);
            connectTaskDependencies(task);
          }
        } finally {
          self.plumb.setSuspendDrawing(false, true);
        }
      };

      /**
       * Retrieve the task from it's id.
       *
       * @param taskId id of the task element to retrieve.
       * @returns {*}
       */
      this.getTask = function(taskId) {
        if (self.tasks[taskId]) return self.tasks[taskId];

        return self.groups[taskId];
      };

      var getSourceEndpoints = function(task) {
        return task.dependencies.endpoints.filter(function(endpoint) {
          return endpoint.isSource;
        });
      };

      var getTargetEndpoints = function(task) {
        return task.dependencies.endpoints.filter(function(endpoint) {
          return endpoint.isTarget;
        });
      };

      /**
       * Connects two tasks together using source endpoint from fromTask and target endpoint from toTask.
       *
       * @param fromTask
       * @param toTask
       * @param model
       * @returns connection object
       */
      this.connect = function(fromTask, toTask, model) {
        var sourceEndpoints = getSourceEndpoints(fromTask);
        var targetEndpoints = getTargetEndpoints(toTask);
        if (sourceEndpoints && targetEndpoints) {
          var sourceEndpoint;
          var targetEndpoint;

          if (model.connectParameters && model.connectParameters.sourceEndpointIndex) {
            sourceEndpoint = sourceEndpoints[model.connectParameters.sourceEndpointIndex];
          } else {
            sourceEndpoint = sourceEndpoints[0];
          }

          if (model.connectParameters && model.connectParameters.targetEndpointIndex) {
            targetEndpoint = targetEndpoints[model.connectParameters.targetEndpointIndex];
          } else {
            targetEndpoint = targetEndpoints[0];
          }

          var connection = self.plumb.connect({
            source: sourceEndpoint,
            target: targetEndpoint
          }, model.connectParameters);
          return connection;
        }
      };

      /**
       * Get all defined dependencies.
       *
       * @returns {Array}
       */
      this.getDependencies = function() {
        var allDependencies = [];

        angular.forEach(this.dependenciesFrom, function(dependencies) {
          for (var i = 0; i < dependencies.length; i++) {
            if (!(dependencies[i] in allDependencies)) {
              allDependencies.push(dependencies[i]);
            }
          }
        });

        return allDependencies;
      };

      /**
       * Refresh jsplumb status based on tasks dependencies models.
       */
      this.refresh = function(tasks) {
        self.plumb.setSuspendDrawing(true);
        var manager = self.gantt.rowsManager;
        try {
          var tasksDependencies;
          var i;
          if (tasks && !angular.isArray(tasks)) {
            tasks = [tasks];
          }

          if (tasks === undefined) {
            tasks = this.tasks;
            tasksDependencies = this.getDependencies();
          } else {
            tasksDependencies = [];
            angular.forEach(tasks, function(task) {
              var taskDependencies = self.getTaskDependencies(task);
              angular.forEach(taskDependencies, function(taskDependency) {
                if (!(taskDependency in tasksDependencies)) {
                  tasksDependencies.push(taskDependency);
                }
              });
            });
          }

          for (i = 0; i < tasksDependencies.length; i++) {
            self.removeDependency(tasksDependencies[i]);
          }

          angular.forEach(tasks, function(task) {
            self.addDependenciesFromTask(task);
          });


          angular.forEach(self.groups, function(task) {
            if (manager.rows.indexOf(task.row) > 0) {
              var row = manager.rows[manager.rows.indexOf(task.row)];

              if (row.model.tasks && row.model.tasks.length > 0) {
                delete self.groups[task.model.id];
              } else {
                self.addDependenciesFromTask(task);
              }
            }

          });

        } finally {
          self.plumb.setSuspendDrawing(false, true);
        }
      };


      this.denyDrop = function(dependency) {
        return ganttUtils.denyDrop(dependency);
      };

      this.denyDropIntoChild = function(dependency, api) {
        return ganttUtils.denyDropIntoChild(dependency, api);
      };

      this.getRowDependency = function() {

        if (arguments[0]) {

          return self.getTaskDependencies(arguments[0]);
        }

        return []
      };

      this.api.registerMethod('dependencies', 'refresh', this.refresh, this);
      this.api.registerMethod('dependencies', 'getRowDependency', this.getRowDependency, this);

    };
    return DependenciesManager;
  }]);
}());
(function() {
    'use strict';

    angular.module('gantt.dependencies').factory('GanttDependency', ['ganttUtils', 'ganttDom', function(utils, dom) {
        /**
         * Constructor of Dependency object.
         * 
         * @param manager Dependency manager used by this dependency
         * @param task Task declaring the dependency
         * @param model model of the dependency
         *
         * @constructor
         *
         * @see https://jsplumbtoolkit.com/community/apidocs/classes/jsPlumb.html#method_connect
         */
        var Dependency = function(manager, task, model) {
            var self = this;

            this.manager = manager;
            this.task = task;
            this.model = model;
            this.connection = undefined;
            this.fallbackEndpoints = [];

            /**
             * Check if this dependency is connected.
             *
             * @returns {boolean}
             */
            this.isConnected = function() {
                if (this.connection) {
                    return true;
                }
                return false;
            };

            /**
             * Disconnect this dependency.
             */
            this.disconnect = function() {
                if (this.connection) {
                    if (this.connection.endpoints) {
                        this.manager.plumb.detach(this.connection);
                    }
                    this.connection.$dependency = undefined;
                    this.connection = undefined;
                }

                this.deleteFallbackEndpoints();
            };

            this.deleteFallbackEndpoints = function() {
                if (this.fallbackEndpoints) {
                    for (var i=0; i<this.fallbackEndpoints.length; i++) {
                        self.manager.plumb.deleteEndpoint(this.fallbackEndpoints[i]);
                    }
                    this.fallbackEndpoints = [];
                }
            };

            this.getFromTaskId = function() {
                if (this.model.from !== undefined) {
                    return this.model.from;
                }
                return this.task.model.id;
            };

            this.getToTaskId = function() {
                if (this.model.to !== undefined) {
                    return this.model.to;
                }
                return this.task.model.id;
            };

            this.getFromTask = function() {
                if (this.model.from !== undefined) {
                    return this.manager.getTask(this.model.from);
                }
                return this.task;
            };

            this.getToTask = function() {
                if (this.model.to !== undefined) {
                    return this.manager.getTask(this.model.to);
                }
                return this.task;
            };

            this.removeFromTaskModel = function() {
                var modelIndex = utils.angularIndexOf(this.task.model.dependencies, this.model);
                if (modelIndex >= 0) {
                    this.task.model.dependencies.splice(modelIndex, 1);
                }
                return modelIndex;
            };

            var isTaskVisible = function(task) {
                if (task === undefined || task.$element === undefined) {
                    return false;
                }
                var element = task.$element[0];
                return dom.isElementVisible(element);
            };

            /**
             * Connect this dependency if both elements are available.
             *
             * @returns {boolean}
             */
            this.connect = function() {
                var fromTask = this.getFromTask();
                var toTask = this.getToTask();

                if (!isTaskVisible(fromTask)) {
                    fromTask = undefined;
                }

                if (!isTaskVisible(toTask)) {
                    toTask = undefined;
                }

                if (fromTask && toTask) {
                    var connection = this.manager.connect(fromTask, toTask, this.model);
                    if (connection) {
                        connection.$dependency = this;
                        this.connection = connection;
                        return true;
                    }
                }

                this.deleteFallbackEndpoints();
                if (fromTask !== undefined) {
                    var toFallbackEndpoint = this.manager.pluginScope.fallbackEndpoints[1];
                    this.fallbackEndpoints.push(this.manager.plumb.addEndpoint(fromTask.$element, toFallbackEndpoint));
                }
                if (toTask !== undefined) {
                    var fromFallbackEndpoint = this.manager.pluginScope.fallbackEndpoints[0];
                    this.fallbackEndpoints.push(this.manager.plumb.addEndpoint(toTask.$element, fromFallbackEndpoint));
                }
                return false;
            };
        };
        return Dependency;
    }]);
}());

(function() {
    'use strict';

    angular.module('gantt.dependencies').factory('GanttDependencyTaskMouseHandler', ['$timeout', function($timeout) {
        var TaskMouseHandler = function(manager, task) {
            var self = this;

            this.manager = manager;
            this.task = task;
            this.installed = false;
            this.elementHandlers = [];

            this.display = true;
            this.hideEndpointsPromise = undefined;

            /**
             * Handler for a single DOM element.
             *
             * @param element
             * @constructor
             */
            var ElementHandler = function(element) {
                this.element = element;

                this.mouseExitHandler = function() {
                    $timeout.cancel(self.hideEndpointsPromise);
                    self.hideEndpointsPromise = $timeout(self.hideEndpoints, 1000, false);
                };

                this.mouseEnterHandler = function() {
                    $timeout.cancel(self.hideEndpointsPromise);
                    self.displayEndpoints();
                };

                this.install = function() {
                    this.element.bind('mouseenter', this.mouseEnterHandler);
                    this.element.bind('mouseleave', this.mouseExitHandler);
                };

                this.release = function() {
                    this.element.unbind('mouseenter', this.mouseEnterHandler);
                    this.element.unbind('mouseleave', this.mouseExitHandler);
                    $timeout.cancel(self.hideEndpointsPromise);
                };

            };



            /**
             * Install mouse handler for this task, and hide all endpoints.
             */
            this.install = function() {
                if (!self.installed) {
                    self.hideEndpoints();

                    if (self.task.getContentElement()) {
                        self.elementHandlers.push(new ElementHandler(self.task.getContentElement()));
                        angular.forEach(self.task.dependencies.endpoints, function(endpoint) {
                            self.elementHandlers.push(new ElementHandler(angular.element(endpoint.canvas)));
                        });

                        angular.forEach(self.elementHandlers, function(elementHandler) {
                            elementHandler.install();
                        });

                        self.installed = true;
                    }
                }
            };

            /**
             * Release mouse handler for this task, and display all endpoints.
             */
            this.release = function() {
                if (self.installed) {
                    angular.forEach(self.elementHandlers, function(elementHandler) {
                        elementHandler.release();
                    });

                    self.elementHandlers = [];

                    self.displayEndpoints();
                    self.installed = false;
                }
            };

            /**
             * Display all endpoints for this task.
             */
            this.displayEndpoints = function() {
                self.display = true;
                angular.forEach(self.task.dependencies.endpoints, function(endpoint) {
                    endpoint.setVisible(true, true, true);
                });
            };

            /**
             * Hide all endpoints for this task.
             */
            this.hideEndpoints = function() {
                angular.forEach(self.task.dependencies.endpoints, function(endpoint) {
                    endpoint.setVisible(false, true, true);
                });
                self.display = false;
            };
        };
        return TaskMouseHandler;
    }]);
}());

(function(){
  'use strict';
  angular.module('gantt.milestones')
    .directive('ganttTaskMilestoneItem', [function() {
      return {
        restrict: 'E',
        replace: true,
        template: '<div class="task-milestones-container" tooltip-template="\'plugins/milestones/tooltip.tmpl.html\'" tooltip-placement="top-right"><span class="gantt-task-milestone-item milestone-item-top"></span>'+
        '<span class="gantt-task-milestone-item milestone-item-bottom"></span></div>',
        scope: {
          item: '='
        },
        controller: ['$scope', '$element', function($scope, $element) {

          $scope.simplifyMoment = function(d) {
            return moment.isMoment(d) ? d.unix() : d;
          };

          if ($scope.item.date) {
            $scope.$watchGroup(['simplifyMoment(item.date)', '$parent.task.left', '$parent.task.width'], function() {
              var left = $scope.$parent.task.rowsManager.gantt.getPositionByDate($scope.item.date);
              $element.parent().css('left', left - $scope.$parent.task.left + 'px');
            });
          }

          $scope.getDate = function() {

            if (typeof $scope.item.date === 'string') {
              $scope.item.date = moment($scope.item.date);
            }

            return $scope.item.date.format('MMM DD');
          };

          $scope.$parent.task.rowsManager.gantt.api.directives.raise.new('ganttTaskMilestoneItem', $scope, $element);
          $scope.$on('$destroy', function() {
            $scope.$parent.task.rowsManager.gantt.api.directives.raise.destroy('ganttTaskMilestoneItem', $scope, $element);
          });


        }]
      };
    }]);
}());

(function(){
  'use strict';
  angular.module('gantt.milestones')
    .directive('ganttTaskMilestones', ['moment', function(moment) {
      return {
        restrict: 'E',
        templateUrl: function(tElement, tAttrs) {
          var templateUrl;
          if (tAttrs.templateUrl === undefined) {
            templateUrl = 'plugins/milestones/milestones.tmpl.html';
          } else {
            templateUrl = tAttrs.templateUrl;
          }
          if (tAttrs.template !== undefined) {
            $templateCache.put(templateUrl, tAttrs.template);
          }
          return templateUrl;
        },
        replace: true,
        scope: true,
        require: '^gantt',
        controller: ['$scope', '$element', function($scope, $element) {

          var updateDatesToMoment = function(milestone) {
            milestone.date = moment(milestone.date);
          };

          if ($scope.task.model.milestones) {
            $scope.task.model.milestones.forEach(updateDatesToMoment);
          }

        }]
      };
    }]);
}());

(function(){
    'use strict';
    angular.module('gantt.movable').factory('ganttMovableOptions', [function() {
        return {
            initialize: function(options) {

                options.enabled = options.enabled !== undefined ? options.enabled : true;
                options.allowMoving = options.allowMoving !== undefined ? !!options.allowMoving : true;
                options.allowResizing = options.allowResizing !== undefined ? !!options.allowResizing : true;
                options.allowRowSwitching = options.allowRowSwitching !== undefined ? !!options.allowRowSwitching : true;

                return options;
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.table').directive('ganttSideContentTable', ['GanttDirectiveBuilder', 'ganttLayout', function(Builder, layout) {
        var builder = new Builder('ganttSideContentTable', 'plugins/table/sideContentTable.tmpl.html');
        builder.controller = function($scope) {
            var hScrollBarHeight = layout.getScrollBarHeight();

            $scope.getMaxHeightCss = function() {
                var css = {};

                if ($scope.maxHeight) {
                    var bodyScrollBarHeight = $scope.gantt.scroll.isHScrollbarVisible() ? hScrollBarHeight : 0;
                    css['max-height'] = $scope.maxHeight - bodyScrollBarHeight - $scope.gantt.header.getHeight() + 'px';
                }

                return css;
            };
        };
        return builder.build();
    }]);
}());


(function() {
    'use strict';
    angular.module('gantt.table').controller('TableColumnController', ['$scope', function($scope) {
        $scope.getHeader = function() {
            var header = $scope.pluginScope.headers[$scope.column];
            if (header !== undefined) {
                return header;
            }
            if ($scope.pluginScope.headerFormatter !== undefined) {
                header = $scope.pluginScope.headerFormatter($scope.column);
            }
            if (header !== undefined) {
                return header;
            }
            return header;
        };

        $scope.getHeaderContent = function() {
            var headerContent = $scope.pluginScope.headerContents[$scope.column];
            if (headerContent === undefined) {
                return '{{getHeader()}}';
            }
            return headerContent;
        };

        $scope.getClass = function() {
            return $scope.pluginScope.classes[$scope.column];
        };
    }]);
}());


(function() {
    'use strict';
    angular.module('gantt.table').controller('TableColumnRowController', ['$scope', function($scope) {
        $scope.getValue = function() {
            var value = $scope.$eval($scope.column, $scope.row);

            var formatter = $scope.pluginScope.formatters[$scope.column];
            if (formatter !== undefined) {
                value = formatter(value, $scope.column, $scope.row);
            }

            return value;
        };

        $scope.getRowContent = function() {
            var content;
            if ($scope.row.model.columnContents) {
                content = $scope.row.model.columnContents[$scope.column];
            }
            if (content === undefined && $scope.column === 'model.name') {
                content = $scope.row.model.content;
            }
            if (content === undefined) {
                content = $scope.pluginScope.contents[$scope.column];
            }
            if (content === undefined && $scope.column === 'model.name') {
                content = $scope.row.rowsManager.gantt.options.value('rowContent');
            }
            if (content === undefined && $scope.pluginScope.content !== undefined) {
                content = $scope.pluginScope.content;
            }
            if (content === undefined) {
                return '{{getValue()}}';
            }
            return content;
        };
    }]);
}());


(function() {
    'use strict';
    angular.module('gantt.tooltips').directive('ganttTooltip', ['$log','$timeout', '$compile', '$document', '$templateCache', 'ganttDebounce', 'ganttSmartEvent', function($log, $timeout, $compile, $document, $templateCache, debounce, smartEvent) {
        // This tooltip displays more information about a task

        return {
            restrict: 'E',
            templateUrl: function(tElement, tAttrs) {
                var templateUrl;
                if (tAttrs.templateUrl === undefined) {
                    templateUrl = 'plugins/tooltips/tooltip.tmpl.html';
                } else {
                    templateUrl = tAttrs.templateUrl;
                }
                if (tAttrs.template !== undefined) {
                    $templateCache.put(templateUrl, tAttrs.template);
                }
                return templateUrl;
            },
            scope: true,
            replace: true,
            controller: ['$scope', '$element', 'ganttUtils', function($scope, $element, utils) {
                var bodyElement = angular.element($document[0].body);
                var parentElement = $scope.task.$element;
                var showTooltipPromise;
                var visible = false;
                var mouseEnterX;
                var mouseMoveHandler;

                $scope.content = '{{task.model.name}}</br>'+
                                    '<small>'+
                                    '{{task.isMilestone() === true && getFromLabel() || getFromLabel() + \' - \' + getToLabel()}}'+
                                    '</small>';

                var getViewPortWidth = function() {
                    var d = $document[0];
                    return d.documentElement.clientWidth || d.documentElement.getElementById('body')[0].clientWidth;
                };

                var updateTooltip = function(x) {
                    // Check if info is overlapping with view port
                    if (x + $element[0].offsetWidth > getViewPortWidth()) {
                        $element.css('left', (x + 20 - $element[0].offsetWidth) + 'px');
                        $scope.isRightAligned = true;
                    } else {
                        $element.css('left', (x - 20) + 'px');
                        $scope.isRightAligned = false;
                    }
                };

                var showTooltip = function(x) {
                    visible = true;
                    mouseMoveHandler.bind();

                    $scope.displayed = true;

                    $scope.$evalAsync(function() {
                        var restoreNgHide;
                        if ($element.hasClass('ng-hide')) {
                            $element.removeClass('ng-hide');
                            restoreNgHide = true;
                        }
                        $scope.elementHeight = $element[0].offsetHeight;
                        if (restoreNgHide) {
                            $element.addClass('ng-hide');
                        }
                        $scope.taskRect = parentElement[0].getBoundingClientRect();
                        updateTooltip(x);
                    });
                };

                var hideTooltip = function() {
                    visible = false;
                    mouseMoveHandler.unbind();
                    $scope.$evalAsync(function() {
                        $scope.displayed = false;
                    });
                };

                var displayTooltip = function(newValue, showDelayed) {
                    if (showTooltipPromise) {
                        $timeout.cancel(showTooltipPromise);
                    }

                    var taskTooltips = $scope.task.model.tooltips;
                    var rowTooltips = $scope.task.row.model.tooltips;

                    if (typeof(taskTooltips) === 'boolean') {
                        taskTooltips = {enabled: taskTooltips};
                    }

                    if (typeof(rowTooltips) === 'boolean') {
                        rowTooltips = {enabled: rowTooltips};
                    }

                    var enabled = utils.firstProperty([taskTooltips, rowTooltips], 'enabled', true);
                    if (enabled && !visible && mouseEnterX !== undefined && newValue) {
                        var content = utils.firstProperty([taskTooltips, rowTooltips], 'content', $scope.content);
                        $scope.content = content;

                        if (showDelayed) {
                            showTooltipPromise = $timeout(function() {
                                showTooltip(mouseEnterX);
                            }, 500, false);
                        } else {
                            showTooltip(mouseEnterX);
                        }
                    } else if (!newValue) {
                        if (!$scope.task.active) {
                            hideTooltip();
                        }
                    }
                };

                mouseMoveHandler = smartEvent($scope, bodyElement, 'mousemove', debounce(function(e) {
                    if (!visible) {
                        mouseEnterX = e.clientX;
                        displayTooltip(true, false);
                    } else {
                        // check if mouse goes outside the parent
                        if(
                            !$scope.taskRect ||
                            e.clientX < $scope.taskRect.left ||
                            e.clientX > $scope.taskRect.right ||
                            e.clientY > $scope.taskRect.bottom ||
                            e.clientY < $scope.taskRect.top
                        ) {
                            displayTooltip(false, false);
                        }

                        updateTooltip(e.clientX);
                    }
                }, 5, false));

                $scope.getFromLabel = function() {
                    var taskTooltips = $scope.task.model.tooltips;
                    var rowTooltips = $scope.task.row.model.tooltips;

                    if (typeof(taskTooltips) === 'boolean') {
                        taskTooltips = {enabled: taskTooltips};
                    }

                    if (typeof(rowTooltips) === 'boolean') {
                        rowTooltips = {enabled: rowTooltips};
                    }

                    var dateFormat = utils.firstProperty([taskTooltips, rowTooltips], 'dateFormat', '');
                    return $scope.task.model.from.format('MM DD');
                };

                $scope.getToLabel = function() {
                    var taskTooltips = $scope.task.model.tooltips;
                    var rowTooltips = $scope.task.row.model.tooltips;

                    if (typeof(taskTooltips) === 'boolean') {
                        taskTooltips = {enabled: taskTooltips};
                    }

                    if (typeof(rowTooltips) === 'boolean') {
                        rowTooltips = {enabled: rowTooltips};
                    }

                    var dateFormat = utils.firstProperty([taskTooltips, rowTooltips], 'dateFormat', $scope.pluginScope.dateFormat);
                    return $scope.task.model.to.format(dateFormat);
                };

                $scope.task.getContentElement().bind('mousemove', function(evt) {
                    mouseEnterX = evt.clientX;
                });

                $scope.task.getContentElement().bind('mouseenter', function(evt) {
                    mouseEnterX = evt.clientX;
                    displayTooltip(true, true);
                });

                $scope.task.getContentElement().bind('mouseleave', function() {
                    displayTooltip(false);
                });

/*                if ($scope.pluginScope.api.tasks.on.moveBegin) {
                    $scope.pluginScope.api.tasks.on.moveBegin($scope, function(task) {
                        if (task === $scope.task) {
                            displayTooltip(true);
                        }
                    });

                    $scope.pluginScope.api.tasks.on.moveEnd($scope, function(task) {
                        if (task === $scope.task) {
                            displayTooltip(false);
                        }
                    });

                    $scope.pluginScope.api.tasks.on.resizeBegin($scope, function(task) {
                        if (task === $scope.task) {
                            displayTooltip(true);
                        }
                    });

                    $scope.pluginScope.api.tasks.on.resizeEnd($scope, function(task) {
                        if (task === $scope.task) {
                            displayTooltip(false);
                        }
                    });
                }*/

                if ($scope.task.isMoving) {
                    // Display tooltip because task has been moved to a new row
                    displayTooltip(true, false);
                }

                $scope.gantt.api.directives.raise.new('ganttTooltip', $scope, $element);
                $scope.$on('$destroy', function() {
                    $scope.gantt.api.directives.raise.destroy('ganttTooltip', $scope, $element);
                });
            }]
        };
    }]);
}());


(function(){
  'use strict';
  angular.module('gantt.tree').directive('ganttRowTreeNumeration', ['$compile', function($compile) {
    return {
      restrict: 'A',
      replace: true,
      template: '<span class="gantt-label-numeration" ng-style="{\'left\': (($parent.depth()-1) * -20) + \'px\'}">{{getRowIndex()}}  </span>',
    }
  }]);
}());

(function(){
    'use strict';
    angular.module('gantt.tree').directive('ganttRowTreeLabel', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttRowTreeLabel');
        builder.restrict = 'A';
        builder.templateUrl = undefined;
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.tree').directive('ganttSideContentTree', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttSideContentTree', 'plugins/tree/sideContentTree.tmpl.html');
        return builder.build();
    }]);
}());


(function() {
    'use strict';
    angular.module('gantt.tree').controller('GanttTreeController', ['$scope', '$filter', 'GanttHierarchy', function($scope, $filter, Hierarchy) {
        $scope.rootRows = [];

        $scope.getHeader = function() {
            return $scope.pluginScope.header;
        };

        var hierarchy = new Hierarchy();

        $scope.pluginScope.$watchGroup(['keepAncestorOnFilterRow', 'enabled'], function(value) {
            var keepAncestor = value[0] && value[1];

            if (keepAncestor) {
                var filterImpl = function(sortedRows, filterRow, filterRowComparator) {
                    hierarchy.refresh(sortedRows);

                    var leaves = [];
                    for (var i = 0; i < sortedRows.length; i++) {
                        var children = hierarchy.children(sortedRows[i]);
                        if (!children || children.length === 0) {
                            leaves.push(sortedRows[i]);
                        }
                    }

                    var filteredLeaves = $filter('filter')(leaves, filterRow, filterRowComparator);

                    var filterRowKeepAncestor = function(row) {
                        if (filteredLeaves.indexOf(row) > -1) {
                            return true;
                        }

                        var descendants = hierarchy.descendants(row);

                        for (var i = 0; i < descendants.length; i++) {
                            if (filteredLeaves.indexOf(descendants[i]) > -1) {
                                return true;
                            }
                        }

                        return false;
                    };

                    return $filter('filter')(sortedRows, filterRowKeepAncestor, filterRowComparator);
                };
                $scope.gantt.rowsManager.setFilterImpl(filterImpl);
            } else {
                $scope.gantt.rowsManager.setFilterImpl(false);
            }
        });

        var isVisible = function(row) {
            var parentRow = $scope.parent(row);
            while (parentRow !== undefined) {
                if (parentRow !== undefined && parentRow._collapsed) {
                    return false;
                }
                parentRow = $scope.parent(parentRow);
            }
            return true;
        };

        var filterRowsFunction = function(rows) {
            return rows.filter(function(row) {
                return isVisible(row);
            });
        };

        var sortRowsFunction = function(rows) {
            var sortedRows = [];
            var rootRows = [];

            var hasParent = false;

            for (var i=0; i<rows.length; i++) {
                var rowParent = $scope.parent(rows[i]);
                if (rowParent === undefined) {
                    rootRows.push(rows[i]);
                } else {
                    hasParent = true;
                }
            }

            var handleChildren = function(row) {
                sortedRows.push(row);
                var children = $scope.children(row);


                if (children !== undefined && children.length > 0) {
                    var sortedChildren = children.sort(function(a, b) {
                        return rows.indexOf(a) - rows.indexOf(b);
                    });

                    for (var i=0;i<sortedChildren.length;i++) {
                        handleChildren(sortedChildren[i]);
                    }
                }
            };

            for (i=0; i<rootRows.length; i++) {
                handleChildren(rootRows[i]);
            }

            return sortedRows;
        };
        $scope.gantt.api.rows.addRowSorter(sortRowsFunction);
        $scope.gantt.api.rows.addRowFilter(filterRowsFunction);

        $scope.$on('$destroy', function() {
            $scope.gantt.api.rows.removeRowSorter(sortRowsFunction);
            $scope.gantt.api.rows.removeRowFilter(filterRowsFunction);
        });

        var refresh = function() {
            $scope.rootRows = hierarchy.refresh($scope.gantt.rowsManager.filteredRows);

            if ($scope.gantt.rowsManager.filteredRows.length > 0) {
                $scope.gantt.api.rows.sort();
                $scope.gantt.api.rows.refresh();
            }
        };

        $scope.gantt.api.rows.on.remove($scope, refresh);
        $scope.gantt.api.rows.on.add($scope, refresh);

        var isRowCollapsed = function(rowId) {
            var row;
            if (typeof rowId === 'string') {
                row = $scope.gantt.rowsManager.rowsMap[rowId];
            } else {
                row = rowId;
            }
            if (row === undefined) {
                return undefined;
            }
            if (row._collapsed === undefined) {
                return false;
            }
            return row._collapsed;
        };

        var expandRow = function(rowId) {
            var row;
            if (typeof rowId === 'string' || typeof  rowId === 'number') {
                row = $scope.gantt.rowsManager.rowsMap[rowId];
            } else {
                row = rowId;
            }
            if (row === undefined) {
                return;
            }

            var rowScope = $scope.nodeScopes[row.model.id];
            if (rowScope.collapsed) {
                rowScope.toggle();
            }
        };

        var collapseRow = function(rowId) {
            var row;
            if (typeof rowId === 'string' || typeof  rowId === 'number') {
                row = $scope.gantt.rowsManager.rowsMap[rowId];
            } else {
                row = rowId;
            }
            if (row === undefined) {
                return;
            }

            var rowScope = $scope.nodeScopes[row.model.id];
            if (!rowScope.collapsed) {
                rowScope.toggle();
            }
        };

        var getHierarchy = function() {
            return hierarchy;
        };

        $scope.getHeaderContent = function() {
            return $scope.pluginScope.headerContent;
        };

        $scope.gantt.api.registerMethod('tree', 'refresh', refresh, this);
        $scope.gantt.api.registerMethod('tree', 'isCollapsed', isRowCollapsed, this);
        $scope.gantt.api.registerMethod('tree', 'expand', expandRow, this);
        $scope.gantt.api.registerMethod('tree', 'collapse', collapseRow, this);

        $scope.gantt.api.registerEvent('tree', 'collapsed');

        $scope.gantt.api.registerMethod('tree', 'getHierarchy', getHierarchy, this);

        $scope.$watchCollection('gantt.rowsManager.filteredRows', function() {
            refresh();
        });

        $scope.children = function(row) {
            if (row === undefined) {
                return $scope.rootRows;
            }
            return hierarchy.children(row);
        };

        $scope.parent = function(row) {
            return hierarchy.parent(row);
        };

        $scope.nodeScopes = {};
    }])
    .controller('GanttUiTreeController', ['$scope', function($scope) {
        var collapseAll = function() {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        var expandAll = function() {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };

        $scope.gantt.api.registerMethod('tree', 'collapseAll', collapseAll, $scope);
        $scope.gantt.api.registerMethod('tree', 'expandAll', expandAll, $scope);
    }])
    .controller('GanttTreeNodeController', ['$scope', function($scope) {
        delete $scope.row._parentRow;

        if ($scope.$parentNodeScope) {

            if ($scope.$parentNodeScope.row.model.id !== $scope.row.model.id) {
                $scope.row._parentRow = $scope.$parentNodeScope.row;
            }
        }

        $scope.$parent.nodeScopes[$scope.row.model.id] = $scope;
        $scope.$on('$destroy', function() {
            delete $scope.$parent.nodeScopes[$scope.row.model.id];
        });

        $scope.$watch('children(row)', function(newValue) {
            if (newValue) {
                // Children rows may have been filtered out
                // So we need to filter the raw hierarchy before displaying children in tree.
                var visibleRows = $scope.row.rowsManager.filteredRows;

                var filteredChildrenRows = [];
                for (var i = 0; i < newValue.length; i++) {
                    var childRow = newValue[i];
                    if (visibleRows.indexOf(childRow) > -1) {
                        filteredChildrenRows.push(childRow);
                    }
                }

                $scope.$parent.childrenRows = filteredChildrenRows;
            } else {
                $scope.$parent.childrenRows = newValue;
            }
        });

        $scope.isCollapseDisabled = function() {
            return !$scope.$parent.childrenRows || $scope.$parent.childrenRows.length === 0;
        };


        $scope.isMilestone = function() {
          if ($scope.row.model.tasks) {
            return (angular.isDefined($scope.row.model.tasks[0].isMilestone) && $scope.row.model.tasks[0].isMilestone) || (angular.isDefined($scope.row.model.data.isMilestonesGantt) && $scope.row.model.data.isMilestonesGantt);
          }

          return false;
        };

        $scope.isControlAccount = function() {
          return $scope.row.model.data.isControlAccount;
        };

        $scope.isWorkPackage = function() {
          return $scope.row.model.data.workPackage;
        };

        $scope.getValue = function() {
            return $scope.row.model.name;
        };

        $scope.getRowContent = function() {
            if ($scope.row.model.content !== undefined) {
                return $scope.row.model.content;
            }
            if ($scope.pluginScope.content !== undefined) {
                return $scope.pluginScope.content;
            }

            var content = $scope.row.rowsManager.gantt.options.value('rowContent');
            if (content === undefined) {
                content = '{{row.model.name}}';
            }
            return content;
        };


        $scope.getRowIndex = function() {

            return $scope.row.rowIndex;
        };

        $scope.$watch('collapsed', function(newValue) {
            if ($scope.$modelValue._collapsed !== newValue) {
                var oldValue = $scope.$modelValue._collapsed;
                $scope.$modelValue._collapsed = newValue; // $modelValue contains the Row object
                if (oldValue !== undefined && newValue !== oldValue) {
                    $scope.gantt.api.tree.raise.collapsed($scope, $scope.$modelValue, newValue);
                    $scope.gantt.api.rows.refresh();
                }
            }
        });
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.tree').directive('ganttTreeBody', ['GanttDirectiveBuilder', 'ganttLayout', function(Builder, layout) {
        var builder = new Builder('ganttTreeBody', 'plugins/tree/treeBody.tmpl.html');
        builder.controller = function($scope) {
            var hScrollBarHeight = layout.getScrollBarHeight();
            $scope.getLabelsCss = function() {
                var css = {};

                if ($scope.maxHeight) {
                    var bodyScrollBarHeight = $scope.gantt.scroll.isHScrollbarVisible() ? hScrollBarHeight : 0;
                    css['max-height'] = $scope.maxHeight - bodyScrollBarHeight - $scope.gantt.header.getHeight() + 'px';
                }

                return css;
            };
        };
        return builder.build();
    }]);
}());



(function(){
    'use strict';
    angular.module('gantt.tree').directive('ganttTreeHeader', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttTreeHeader', 'plugins/tree/treeHeader.tmpl.html');
        return builder.build();
    }]);
}());


angular.module('gantt.bounds.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.dependencies.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.drawtask.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.groups.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.labels.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.line.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.milestones.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.movable.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.overlap.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.progress.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.resizeSensor.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.sortable.templates', []).run(['$templateCache', function($templateCache) {

}]);

angular.module('gantt.table.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/table/sideContentTable.tmpl.html',
        '<div class="gantt-side-content-table">\n' +
        '\n' +
        '    <div class="gantt-table-column {{getClass()}}" ng-repeat="column in pluginScope.columns" ng-controller="TableColumnController">\n' +
        '\n' +
        '        <div class="gantt-table-header" ng-style="{height: ganttHeaderHeight + \'px\'}">\n' +
        '            <div ng-show="ganttHeaderHeight" class="gantt-row-label-header gantt-row-label gantt-table-row gantt-table-header-row">\n' +
        '                <span class="gantt-label-text" gantt-bind-compile-html="getHeaderContent()"/>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="gantt-table-content" ng-style="getMaxHeightCss()">\n' +
        '            <div gantt-vertical-scroll-receiver>\n' +
        '                <div class="gantt-table-row" ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id" ng-controller="TableColumnRowController">\n' +
        '                    <div gantt-row-label class="gantt-row-label gantt-row-height" ng-class="row.model.classes" ng-style="{\'height\': row.model.height}">\n' +
        '                        <div class="gantt-valign-container">\n' +
        '                            <div class="gantt-valign-content">\n' +
        '                                <span class="gantt-label-text" gantt-bind-compile-html="getRowContent()"></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
}]);

angular.module('gantt.tooltips.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/tooltips/tooltip.tmpl.html',
        '<div ng-cloak\n' +
        '     class="gantt-task-info"\n' +
        '     ng-show="displayed"\n' +
        '     ng-class="isRightAligned ? \'gantt-task-infoArrowR\' : \'gantt-task-infoArrow\'"\n' +
        '     ng-style="{top: taskRect.top + \'px\', marginTop: -elementHeight - 8 + \'px\'}">\n' +
        '    <div class="gantt-task-info-content">\n' +
        '        <div gantt-bind-compile-html="content"></div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
}]);

angular.module('gantt.tree.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('plugins/tree/sideContentTree.tmpl.html',
        '<div class="gantt-side-content-tree" ng-controller="GanttTreeController">\n' +
        '    <gantt-tree-header>\n' +
        '    </gantt-tree-header>\n' +
        '    <gantt-tree-body>\n' +
        '    </gantt-tree-body>\n' +
        '</div>\n' +
        '');
    $templateCache.put('plugins/tree/treeBody.tmpl.html',
        '<div class="gantt-tree-body" ng-style="getLabelsCss()">\n' +
        '    <div gantt-vertical-scroll-receiver>\n' +
        '        <div class="gantt-row-label-background">\n' +
        '            <div class="gantt-row-label gantt-row-height"\n' +
        '                 ng-class="row.model.classes"\n' +
        '                 ng-style="{\'height\': row.model.height}"\n' +
        '                 ng-repeat="row in gantt.rowsManager.visibleRows track by row.model.id">\n' +
        '                &nbsp;\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div ui-tree ng-controller="GanttUiTreeController" data-drag-enabled="false" data-empty-place-holder-enabled="false">\n' +
        '            <ol class="gantt-tree-root" ui-tree-nodes ng-model="rootRows">\n' +
        '                <li ng-repeat="row in rootRows" ui-tree-node\n' +
        '                    ng-include="\'plugins/tree/treeBodyChildren.tmpl.html\'">\n' +
        '                </li>\n' +
        '            </ol>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('plugins/tree/treeBodyChildren.tmpl.html',
        '<div ng-controller="GanttTreeNodeController"\n' +
        '     class="gantt-row-label gantt-row-height"\n' +
        '     ng-class="row.model.classes"\n' +
        '     ng-style="{\'height\': row.model.height}">\n' +
        '    <div class="gantt-valign-container">\n' +
        '        <div class="gantt-valign-content">\n' +
        '            <a ng-disabled="isCollapseDisabled()" data-nodrag\n' +
        '               class="gantt-tree-handle-button btn btn-xs"\n' +
        '               ng-class="{\'gantt-tree-collapsed\': collapsed, \'gantt-tree-expanded\': !collapsed}"\n' +
        '               ng-click="!isCollapseDisabled() && toggle()"><span\n' +
        '                class="gantt-tree-handle glyphicon glyphicon-chevron-down"\n' +
        '                ng-class="{\n' +
        '                \'glyphicon-chevron-right\': collapsed, \'glyphicon-chevron-down\': !collapsed,\n' +
        '                \'gantt-tree-collapsed\': collapsed, \'gantt-tree-expanded\': !collapsed}"></span>\n' +
        '            </a>\n' +
        '            <span gantt-row-label class="gantt-label-text" gantt-bind-compile-html="getRowContent()"/>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<ol ui-tree-nodes ng-class="{hidden: collapsed}" ng-model="childrenRows">\n' +
        '    <li ng-repeat="row in childrenRows" ui-tree-node>\n' +
        '        <div ng-include="\'plugins/tree/treeBodyChildren.tmpl.html\'"></div>\n' +
        '    </li>\n' +
        '</ol>\n' +
        '');
    $templateCache.put('plugins/tree/treeHeader.tmpl.html',
        '<div class="gantt-tree-header" ng-style="{height: $parent.ganttHeaderHeight + \'px\'}">\n' +
        '    <div ng-if="$parent.ganttHeaderHeight" class="gantt-row-label gantt-row-label-header gantt-tree-row gantt-tree-header-row"><span class="gantt-label-text" gantt-bind-compile-html="getHeaderContent()"/></div>\n' +
        '</div>\n' +
        '');
}]);

//# sourceMappingURL=angular-gantt-plugins.js.map