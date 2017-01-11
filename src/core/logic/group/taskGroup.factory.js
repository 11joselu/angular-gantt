(function() {
    'use strict';

    angular.module('gantt').factory('GanttTaskGroup', ['ganttUtils', function(utils) {
        var TaskGroup = function(row, pluginScope) {
            var self = this;

            self.row = row;
            self.pluginScope = pluginScope;

            self.descendants = self.pluginScope.hierarchy.descendants(self.row);

            self.tasks = [];
            self.to = undefined;
            self.from = undefined;
            this.createModel();
        };

        TaskGroup.prototype.getContentElement = function() {
            if (this.$element !== undefined) {

                return this.$element;
            }
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

        TaskGroup.prototype.generateValues = function() {
            this.descendants = this.pluginScope.hierarchy.descendants(this.row);
            this.addTaskByDescendants();

            this.left = this.row.rowsManager.gantt.getPositionByDate(this.from);
            this.width = this.row.rowsManager.gantt.getPositionByDate(this.to) - this.left;
            this.createModel();
        };

        TaskGroup.prototype.createModel = function() {
            this.model = this.row.model;
            this.model.from = this.row.from;
            this.model.to = this.row.to;

            if (!this.row.model.data) {
                this.row.model.data = {};
            }

            if (this.row.from) {
                var days = utils.workingDaysBetweenDates(this.row.from.toDate(), this.row.to.toDate(), this.row.model);

                if (this.row.model.data && this.row.model.data.isMilestonesGantt) {
                days = 0;
                }

                this.row.model.data.duration = days;
            }
        };

        TaskGroup.prototype.setFromToByTask = function(task) {
            if (this.from === undefined || this.from > task.model.from) {
                this.from = task.model.from;
                this.row.model.from = this.from;
            }

            if (this.to === undefined || this.to < task.model.to) {
                this.to = task.model.to;
                this.row.model.to = this.to;
            }
        };

        return TaskGroup;
    }]);
}());
