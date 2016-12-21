(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskTooltipComponent', {
            require: {
                taskCMP: '^ganttTaskComponent',
                ganttCMP: '^gantt'
            },
            controller: ['$scope', '$element', '$log','$timeout', '$compile', '$document', '$templateCache', 'ganttDebounce', 'ganttSmartEvent', 
            function ControllerFn($scope, $element, $log, $timeout, $compile, $document, $templateCache, debounce, smartEvent) {
                var self = this;
                var bodyElement = angular.element($document[0].body);
                var parentElement = undefined;
                var showTooltipPromise;
                var visible = undefined;
                var mouseEnterX;
                var mouseMoveHandler;
                var api = undefined;
                var task = undefined;

                self.$onInit = function() {
                    // Init task
                    task = self.taskCMP.task;
                    // Set defaults, add provider to customize default values
                    self.enabled = true;
                    self.dateFormat = 'MMM DD, HH:mm';
                    self.content = '{{$ctrl.taskCMP.task.model.name}}</br>'+
                                    '<small>'+
                                    '{{$ctrl.taskCMP.task.isMilestone() === true && $ctrl.getFromLabel() || $ctrl.getFromLabel() + \' - \' + $ctrl.getToLabel()}}'+
                                    '</small>';
                    self.delay = 500;

                    api = self.ganttCMP.gantt.api;
                    parentElement = task.$element;
                    visible = false;  
                };

                self.$postLink = function() {

                    if (task.isMoving) {
                        // Display tooltip because task has been moved to a new row
                        displayTooltip(true, false);
                    }

                    task.getContentElement().bind('mousemove', function(evt) {
                        mouseEnterX = evt.clientX;
                    });

                    task.getContentElement().bind('mouseenter', function(evt) {
                        mouseEnterX = evt.clientX;
                        displayTooltip(true, true);
                    });

                    task.getContentElement().bind('mouseleave', function() {
                        displayTooltip(false);
                    });
                };

                self.$onDestroy = function() {
                };

                self.getFromLabel = function() {
                    var taskTooltips = task.model.tooltips;
                    var rowTooltips = task.row.model.tooltips;

                    if (typeof(taskTooltips) === 'boolean') {
                        taskTooltips = {enabled: taskTooltips};
                    }

                    if (typeof(rowTooltips) === 'boolean') {
                        rowTooltips = {enabled: rowTooltips};
                    }

                    // pass as attribute to Gantt Provider
                    return task.model.from.format('MM DD');
                };

                self.getToLabel = function() {
                    var taskTooltips = task.model.tooltips;
                    var rowTooltips = task.row.model.tooltips;

                    if (typeof(taskTooltips) === 'boolean') {
                        taskTooltips = {enabled: taskTooltips};
                    }

                    if (typeof(rowTooltips) === 'boolean') {
                        rowTooltips = {enabled: rowTooltips};
                    }

                    // pass as attribute to Gantt Provider
                    return task.model.to.format('MM DD');
                };

                var getViewPortWidth = function() {
                    var d = $document[0];
                    return d.documentElement.clientWidth || d.documentElement.getElementById('body')[0].clientWidth;
                };

                var updateTooltip = function(x) {
                    var childElement = $element.find('article');
                    // Check if info is overlapping with view port
                    if (x + $element[0].offsetWidth > getViewPortWidth()) {
                        childElement.css('left', (x + 20 - $element[0].offsetWidth) + 'px');
                        self.isRightAligned = true;
                    } else {
                        childElement.css('left', (x - 20) + 'px');
                        self.isRightAligned = false;
                    }
                };

                var showTooltip = function(x) {
                    visible = true;
                    mouseMoveHandler.bind();

                    self.displayed = true;

                    $scope.$evalAsync(function() {
                        var restoreNgHide;
                        if ($element.hasClass('ng-hide')) {
                            $element.removeClass('ng-hide');
                            restoreNgHide = true;
                        }
                        self.elementHeight = parentElement[0].offsetHeight;
                        if (restoreNgHide) {
                            $element.addClass('ng-hide');
                        }
                        self.taskRect = parentElement[0].getBoundingClientRect();
                        updateTooltip(x);
                    });
                };

                var hideTooltip = function() {
                    visible = false;
                    mouseMoveHandler.unbind();
                    $scope.$evalAsync(function() {
                        self.displayed = false;
                    });
                };

                var displayTooltip = function(newValue, showDelayed) {
                    if (showTooltipPromise) {
                        $timeout.cancel(showTooltipPromise);
                    }

                    var taskTooltips = task.model.tooltips;
                    var rowTooltips = task.row.model.tooltips;

                    if (typeof(taskTooltips) === 'boolean') {
                        taskTooltips = {enabled: taskTooltips};
                    }

                    if (typeof(rowTooltips) === 'boolean') {
                        rowTooltips = {enabled: rowTooltips};
                    }

                    var enabled = self.enabled;
                    if (enabled && !visible && mouseEnterX !== undefined && newValue) {
                        var content = self.content;
                        self.content = content;

                        if (showDelayed) {
                            showTooltipPromise = $timeout(function() {
                                showTooltip(mouseEnterX);
                            }, 500, false);
                        } else {
                            showTooltip(mouseEnterX);
                        }
                    } else if (!newValue) {
                        if (!task.active) {
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
                            !self.taskRect ||
                            e.clientX < self.taskRect.left ||
                            e.clientX > self.taskRect.right ||
                            e.clientY > self.taskRect.bottom ||
                            e.clientY < self.taskRect.top
                        ) {
                            displayTooltip(false, false);
                        }

                        updateTooltip(e.clientX);
                    }
                }, 5, false));


            }],
            templateUrl: 'template/ganttTaskTooltip.tmpl.html'
        });
}());