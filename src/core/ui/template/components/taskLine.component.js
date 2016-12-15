(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskLineComponent', {
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
                   toPaint = isDefined(this.task.model.base.from) && isDefined(this.task.model.base.to);
                   
                   if (toPaint) {
                       this.task.model.base.from = moment(this.task.model.base.from).startOf('day');
                       this.task.model.base.to = moment(this.task.model.base.to).endOf('day');
                   }

                   
                };

                this.$postLink = function() {
                    if (!toPaint) {
                        return;
                    }

                    var left = manager.gantt.getPositionByDate(this.task.model.base.from);
                    var width = manager.gantt.getPositionByDate(this.task.model.base.to);
                    $element.find('div').css({
                        left: left + 'px',
                        width: width - left + 'px'
                    });
                    
                };
            }],
            template: ['<div class="gantt-task-base-line"></div>'].join('')
        
        });
}());