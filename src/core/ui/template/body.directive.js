(function(){
    'use strict';
    angular.module('gantt').directive('ganttBody', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttBody');
        builder.controller = function($scope, $element, $attrs, ctrl) {
            $scope.gantt.body.$element = $element;
            $scope.gantt.body.$scope = $scope;
            ctrl.$element = $element[0];
        };
        return builder.build();
    }]);
}());

