(function() {
    'use strict';

    angular.module('gantt').factory('GanttTaskGroup', ['ganttUtils', 'GanttTask', '$timeout', function(utils, Task, $timeout) {
        var TaskGroup = function(row, pluginScope) {
            var self = this;

            self.row = row;
            self.pluginScope = pluginScope;

            self.descendants = self.pluginScope.hierarchy.descendants(self.row);

            self.tasks = [];
            self.overviewTasks = [];
            self.promotedTasks = [];
            self.showGrouping = false;

            var groupRowGroups = self.row.model.groups;
            if (typeof(groupRowGroups) === 'boolean') {
                groupRowGroups = {enabled: groupRowGroups};
            }

            var getTaskDisplay = function(task) {
                var taskGroups = task.model.groups;
                if (typeof(taskGroups) === 'boolean') {
                    taskGroups = {enabled: taskGroups};
                }

                var rowGroups = task.row.model.groups;
                if (typeof(rowGroups) === 'boolean') {
                    rowGroups = {enabled: rowGroups};
                }

                var enabledValue = utils.firstProperty([taskGroups, rowGroups, groupRowGroups], 'enabled', self.pluginScope.enabled);

                if (enabledValue) {
                    var display = utils.firstProperty([taskGroups, rowGroups, groupRowGroups], 'display', self.pluginScope.display);
                    return display;
                }
            };

            for (var i = 0; i < self.descendants.length; i++) {
                var tasks = self.descendants[i].tasks;

                for (var j = 0; j < tasks.length; j++) {
                    var task = tasks[j];

                    var taskDisplay = getTaskDisplay(task);
                    if (taskDisplay !== undefined) {
                        self.tasks.push(task);
                        var clone = new Task(self.row, task.model);

                        if (taskDisplay === 'overview') {
                            self.overviewTasks.push(clone);
                        } else if (taskDisplay === 'promote') {
                            self.promotedTasks.push(clone);
                        } else {
                            self.showGrouping = true;
                        }
                    }
                }
            }

            self.from = undefined;
            if (groupRowGroups) {
                self.from = groupRowGroups.from;
            }
            if (self.from === undefined) {
                for (i=0; i<self.tasks.length; i++) {
                    if (self.from === undefined || self.tasks[i].model.from < self.from) {
                        self.from = self.tasks[i].model.from;
                    }
                }
            }

            self.to = undefined;
            if (groupRowGroups) {
                self.to = groupRowGroups.to;
            }
            if (self.to === undefined) {
                for (i=0; i<self.tasks.length; i++) {
                    if (self.to === undefined || self.tasks[i].model.to > self.to) {
                        self.to = self.tasks[i].model.to;
                    }
                }
            }

            if (self.showGrouping) {
                self.left = row.rowsManager.gantt.getPositionByDate(self.from);
                self.width = row.rowsManager.gantt.getPositionByDate(self.to) - self.left;
            }
        };

        TaskGroup.prototype.createModel = function() {
            this.model = this.row.model;
            this.model.from = this.from;
            this.model.to = this.to;
            this.getContentElement();
        };

        TaskGroup.prototype.getContentElement = function() {
            if (this.row.$element) {
                this.$rowElement = this.row.$element
                var contentElement = this.row.$element[0].querySelector('.gantt-task-group');
                if (contentElement) {
                    this.$element = contentElement;
                }
            }

            return angular.element(this.$element);
        };

        return TaskGroup;
    }]);
}());
