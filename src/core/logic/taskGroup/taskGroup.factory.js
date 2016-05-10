(function() {
    'use strict';

    angular.module('gantt').factory('GanttTasksGroup', ['ganttUtils', 'GanttTask', '$timeout',  function(utils, Task, $timeout) {
        var TaskGroup = function(row, model) {
            var self            = this;
            this.rowsManager    = row.rowsManager;
            this.row            = row;
            this.model          = model;

            this.getContentElement = function() {

                return row.$element[0].querySelector('.gantt-task-group');
            };

            $timeout(function() {
                self.from   = row.from;
                self.to     = row.to;
            }, 0);

        };

        TaskGroup.prototype.clone = function() {
            return new TaskGroup(this.row, angular.copy(this.model));
        };

        return TaskGroup;
    }]);
}());
