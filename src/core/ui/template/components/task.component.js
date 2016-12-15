(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskComponent', {
            bindings: {
                task: '='
            },
            transclude: true,
            controller: ['$scope', '$element', '$attrs', 'GanttComponentService', 
            function ControllerFn($scope, $element, $attrs, GanttComponentService) {
                var self = this;
                
                this.$onInit = function() {
                    this.task.$element = $element;
                    this.task.$scope = $scope;
                    $scope.gantt = this.task.rowsManager.gantt;
                };


                this.getTaskContent = function() {
                    if (this.task.model.content !== undefined) {
                        return this.task.model.content;
                    }

                    return this.task.rowsManager.gantt.options.value('taskContent');
                };

                this.$postLink = function() {
                    this.task.updatePosAndSize();
                    this.task.addClasses();
                    GanttComponentService.raiseAll('ganttTask', $scope, $element, $attrs, ControllerFn);
                };

                this.simplifyMoment = function(d) {
                    return moment.isMoment(d) ? d.unix() : d;
                };

                this.getColor = function() {
                    return this.task.model.color;
                };

                this.hasColor = function() {
                    return typeof this.task.model.color !== 'undefined';
                };

                $scope.$watchGroup(['$ctrl.simplifyMoment($ctrl.task.model.from)', '$ctrl.simplifyMoment($ctrl.task.model.to)'], function() {
                    self.task.updatePosAndSize();
                });

                 this.$onDestroy = function() {
                    GanttComponentService.raiseDestroyDirective('ganttTask', $scope, $element, $attrs, ControllerFn);
                };
                
            }],
            template: [
                        '<gantt-task-background-component class="gantt-task-background"></gantt-task-background-component>',
                        '<gantt-task-foreground-component class="gantt-task-foreground"></gantt-task-foreground-component>',
                        '<gantt-task-content-component class="gantt-task-content"></gantt-task-content-component>',
                        '<ng-transclude></ng-transclude>'
                      ].join('')
        
        });
}());