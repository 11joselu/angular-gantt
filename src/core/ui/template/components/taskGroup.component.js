(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskGroupComponent', {
            bindings: {},
            require: {
              rowCMP: '^ganttRowComponent'  
            },
            controller: ['$scope', '$element', '$attrs', 'GanttComponentService', 'GanttHierarchy',  'GanttTaskGroup',
            function ControllerFn($scope, $element, $attrs, GanttComponentService, Hierarchy, TaskGroup) {
                var self = this;

                var updateTaskGroup = function() {
                    self.taskGroup = new TaskGroup(self.rowCMP.row, self);

                    self.rowCMP.row.setFromTo();
                    self.rowCMP.row.setFromToByValues(self.taskGroup.from, self.taskGroup.to);
                    $element.css({'left': self.taskGroup.left + 'px', 'width': self.taskGroup.width + 'px'});
                    self.taskGroup.$element = $element;

                    self.rowCMP.ganttInstance.api.groups.raise.displayed(self.taskGroup);
                    self.rowCMP.ganttInstance.api.groups.raise.viewChange(self.taskGroup);
                };

                var addListener = function() {
                    self.rowCMP.ganttInstance.api.tasks.on.viewChange($scope, updateTaskGroup);
                };


                this.$onInit = function() {
                    this.hierarchy = new Hierarchy();
                    this.gantt = this.rowCMP.ganttInstance;
                };

                this.$postLink = function() {
                    this.refresh();
                    addListener();
                };

                this.refresh = function refresh() {
                    this.hierarchy.refresh(this.gantt.rowsManager.filteredRows);
                };

                $scope.$watch('$ctrl.gantt.rowsManager.filteredRows', updateTaskGroup);
            }],
            template:  [
                        '<div class="gantt-task-group-left-main"></div>',
                        '<div class="gantt-task-group-right-main"></div>',
                        '<div class="gantt-task-group-left-symbol"></div>',
                        '<div class="gantt-task-group-right-symbol"></div>',
                        ].join('')
        
        });
}());