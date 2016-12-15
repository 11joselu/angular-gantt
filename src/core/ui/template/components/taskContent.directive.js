(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskContentComponent', {
            bindings: {},
            require: {
                taskCmp: '^ganttTaskComponent'
            },
            template: ['<span unselectable="on" gantt-bind-compile-html="$ctrl.taskCmp.task.getTaskContent()"/>'].join('')
        });
}());