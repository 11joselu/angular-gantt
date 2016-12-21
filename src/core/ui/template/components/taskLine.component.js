(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskLineComponent', {
            require: {
                'ganttCMP': '^gantt'
            },
            bindings: {
                task: '='
            },
            controller: ['$scope', '$element', '$attrs', 'GanttComponentService', 
            function ControllerFn($scope, $element, $attrs, GanttComponentService) {
                var self = this;
                var toPaint = false;
                var manager = null;

                var isDefined = function(value) {

                    return angular.isDefined(value);
                };

                this.$onInit = function() {
                   manager = this.task.rowsManager;
                   
                   if (this.task.model.base) {
                       toPaint = isDefined(this.task.model.base.from) && isDefined(this.task.model.base.to);
                   }
                   
                   if (toPaint) {
                       this.task.model.base.from = moment(this.task.model.base.from).startOf('day');
                       this.task.model.base.to = moment(this.task.model.base.to).endOf('day');
                   }
                };

                this.getCss = function() {
                    var css = {};
                    if (this.task.model.base) {
                        var left = manager.gantt.getPositionByDate(this.task.model.base.from);
                        var width = manager.gantt.getPositionByDate(this.task.model.base.to);
                        
                        css = {
                            left: left + 'px',
                            width: width - left + 'px'
                        };
                    }

                    return css; 
                };
            }],
            template: ['<div class="gantt-task-base-line" ng-style="$ctrl.getCss()" ng-if="$ctrl.ganttCMP.gantt.$scope.baselineEnabled"></div>'].join('')
        
        });
}());