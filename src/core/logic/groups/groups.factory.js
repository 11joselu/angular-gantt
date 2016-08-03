(function() {
    'use strict';
    angular.module('gantt').factory('GanttGroup', ['moment', function(moment) {
        var Group = function(row, model) {
            this.rowsManager = row.rowsManager;
            this.row = row;
            this.model = model;
        };

        Group.prototype.getContentElement = function() {
            if (this.$element !== undefined) {
                var contentElement = this.$element[0].querySelector('.gantt-task-content');
                if (contentElement !== undefined) {
                    contentElement = angular.element(contentElement);
                }
                return contentElement;
            }
        };

        Group.prototype.setFrom = function(x, magnetEnabled) {
            this.model.from = this.rowsManager.gantt.getDateByPosition(x, magnetEnabled);
        };

        Group.prototype.setTo = function(x, magnetEnabled) {
            this.model.to = this.rowsManager.gantt.getDateByPosition(x, magnetEnabled);
        };

        Group.prototype.clone = function() {
            return new Group(this.row, angular.copy(this.model));
        };

        Group.prototype.updatePosAndSize = function() {
            var oldViewLeft = this.left;
            var oldViewWidth = this.width;

            this.modelLeft = this.rowsManager.gantt.getPositionByDate(this.model.from);
            this.modelWidth = this.rowsManager.gantt.getPositionByDate(this.model.to) - this.modelLeft;

        };

        return Group;
    }]);
}());

