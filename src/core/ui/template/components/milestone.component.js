(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskMilestone', {
            binding: {
                item: '=',
                task: '='
            },
            controller: ['$scope', '$element', '$attrs', 'GanttComponentService', 
            function ControllerFn($scope, $element, $attrs, GanttComponentService) {
                var self = this;

                this.simplifyMoment = function(d) {
                    return moment.isMoment(d) ? d.unix() : d;
                };

                this.getDate = function() {

                    if (typeof this.item.date === 'string') {
                        this.item.date = moment(this.item.date);
                    }

                    return this.item.date.format('MMM DD');
                };

                this.$onInit = function() {
                    if (this.item && this.item.date) {
                        $scope.$watchGroup(['$ctrl.simplifyMoment($ctrl.item.date)', '$ctrl.task.left', '$ctrl.task.width'], function() {
                            var left = self.task.rowsManager.gantt.getPositionByDate(self.item.date);
                            $element.parent().css('left', left - self.task.left + 'px');
                        });
                    }
                };
            }],
            templateUrl: 'template/ganttTaskMilestoneItem.tmpl.html'
        });
}());