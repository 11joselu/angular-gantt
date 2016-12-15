(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskForegroundComponent', {
            bindings: {},
            require: {
                taskCmp: '^ganttTaskComponent'
            },
            template: ['<div ng-if="$ctrl.taskCmp.task.truncatedRight" class="gantt-task-truncated-right">&gt;</div>',
                       '<div ng-if="$ctrl.taskCmp.task.truncatedLeft" class="gantt-task-truncated-left">&lt;</div>'].join('')
        });
}());