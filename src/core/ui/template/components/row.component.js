(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttRowComponent', {
            bindings: {
                row: '=',
                ganttInstance: '='
            },
            transclude: true,
            controller: ['$scope', '$element', '$attrs', 'GanttComponentService', function ControllerFn($scope, $element, $attrs, GanttComponentService) {
                this.$onInit = function() {
                    this.row.$element = $element;
                    this.row.$scope = $scope;
                    $scope.gantt = this.ganttInstance;
                };

                this.$postLink = function() {
                    this.row.addClasses();
                    this.row.updateHeight();
                    GanttComponentService.raiseAll('ganttRow', $scope, $element, $attrs, ControllerFn);
                };

                this.$onDestroy = function() {
                    GanttComponentService.raiseDestroyDirective('ganttRow', $scope, $element, $attrs, ControllerFn);
                };

            }],
            template: '<div ng-transclude class="gantt-row-content"></div>'
        });
}());