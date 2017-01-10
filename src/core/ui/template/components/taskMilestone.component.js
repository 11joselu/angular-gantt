(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskMilestonesComponent', {
            require: {
                'taskCMP': '^ganttTaskComponent'
            },
            transclude: true,
            controller: [function ControllerFn() {
                this.$onInit = function() {
                    this.task = this.taskCMP.task;
                };

            }],
            template: [
                '<div ng-if"$ctrl.task.model.milestones">',
                    '<div class="gantt-task-milestones" ng-repeat="milestone in $ctrl.task.model.milestones">',
                        '<gantt-task-milestone-item item="milestone" task="$ctrl.task"></gantt-task-milestone-item>',
                    '</div>',
                '</div>'
            ].join('')

        });
}());
