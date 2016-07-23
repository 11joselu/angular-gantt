(function() {
    'use strict';

    angular.module('gantt').factory('GanttTasksGroupModel', ['ganttUtils', 'GanttTask', '$timeout',  function(utils, Task, $timeout) {
        var TaskGroup = function(row, model) {
            var self            = this;
            this.rowsManager    = row.rowsManager;
            this.row            = row;
            this.model          = model;

            this.getContentElement = function() {
                if (this.row.$element !== undefined) {
                    var contentElement = this.row.$element[0].querySelector('.gantt-task-group');
                    if (contentElement !== undefined) {
                        contentElement = angular.element(contentElement);
                    }
                    return contentElement;
                }
            };
        };

        TaskGroup.prototype.clone = function() {
            return new TaskGroup(this.row, angular.copy(this.model));
        };

        return TaskGroup;
    }]);
}());
