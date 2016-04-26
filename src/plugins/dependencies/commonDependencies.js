(function() {
    'use strict';

    angular.module('gantt.dependencies')
    .factory('GanttDependenciesCommon', [function() {
        var common = {};

        common.setPlumb = function(plumbInstance) {
            this.plumb = plumbInstance;
        }

        common.setTasks = function(tasks) {
            this.tasks = tasks;
        }

        common.setTasksGroups = function(tasksGroups) {
            this.setTasksGroups = tasksGroups;
        }

        return common;
    }]);
}());
