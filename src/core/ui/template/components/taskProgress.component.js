(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskProgressComponent', {
            require: {
                'taskCMP': '^ganttTaskComponent'
            },
            controller: ['$scope', '$element', '$attrs', 'GanttComponentService', 
            function ControllerFn($scope, $element, $attrs, GanttComponentService) {
                var self = this;

                var getCss = function() {
                    var css = {};
                    var progress;

                    if (self.taskCMP.task.model.progress !== undefined) {
                        if (typeof(self.taskCMP.task.model.progress) === 'object') {
                            progress = self.taskCMP.task.model.progress;
                        } else {
                            progress = {percent: self.taskCMP.task.model.progress};
                        }
                    }

                    if (progress) {
                        if (progress.color) {
                            css['background-color'] = progress.color;
                        } else {
                            css['background-color'] = '#6BC443';
                        }

                        css.width = progress.percent + '%';
                    }

                    return css;
                };

                this.$postLink = function() {
                    if (self.taskCMP.task.model.progress !== undefined) {
                        $element.find('div').css(getCss());
                    } else {
                        $element.remove();
                    }
                };
            }],
            template: ['<div class="gantt-task-progress"></div>'].join('') 
        });
}());