(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskProgressComponent', {
            require: {
                'taskCMP': '^ganttTaskComponent'
            },
            controller: [function ControllerFn() {
                var self = this;

                this.getCss = function() {
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
            }],
            template: ['<div class="gantt-task-progress" ng-if="$ctrl.taskCMP.ganttCMP.gantt.$scope.progressEnabled" ng-style="$ctrl.getCss()"></div>'].join('')
        });
}());
