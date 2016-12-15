(function() {
    'use strict';

    angular.module('gantt').factory('GanttTaskGroup', [function() {
        var TaskGroup = function(row, pluginScope) {
            var self = this;

            self.row = row;
            self.pluginScope = pluginScope;

            self.descendants = self.pluginScope.hierarchy.descendants(self.row);

            self.tasks = [];
            self.to = undefined;
            self.from = undefined;
            this.addTaskByDescendants();

            self.left = row.rowsManager.gantt.getPositionByDate(self.from);
            self.width = row.rowsManager.gantt.getPositionByDate(self.to) - self.left;
        };

        TaskGroup.prototype.addTaskByDescendants = function() {
            for (var i = 0; i < this.descendants.length; i++) {
                var tasks = this.descendants[i].tasks;

                for (var j = 0; j < tasks.length; j++) {
                    var task = tasks[j];
                    this.tasks.push(task);
                    this.setFromToByTask(task);
                }
            }
        };

        TaskGroup.prototype.setFromToByTasks = function() {
            if (this.from === undefined || this.to === undefined) {
                for (var i = 0, len = this.tasks.length; i < len; i++) {
                    var task = this.tasks[i];

                    if (this.from === undefined || task.model.from < this.from) {
                        this.from = task.model.from;
                    }

                    if (this.to === undefined || task.model.to > this.to) {
                        this.to = task.model.to;
                    }
                }
            }
        };

        TaskGroup.prototype.setFromToByTask = function(task) {
            if (this.from === undefined ||task.model.from < this.from) {
                this.from = task.model.from;
            }

            if (this.to === undefined || task.model.to > this.to) {
                this.to = task.model.to
            }
        };

        return TaskGroup;
    }]);
}());
