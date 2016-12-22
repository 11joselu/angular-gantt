(function() {
    'use strict';

    angular.module('gantt').factory('GanttComponentService', [function() {
        var utilsFn = {
            raiseNewDirective: function(directiveName, $scope, $element, $attrs, controller) {
                $scope.$applyAsync(function() {
                    $scope.gantt.api.directives.raise.new(directiveName, $scope, $element, $attrs, controller);
                });
            },

            raiseNewController: function(directiveName, $scope, $element, $attrs, controller) {
                $scope.gantt.api.directives.raise.controller(directiveName, $scope, $element, $attrs, controller);
            },

            raiseDestroyDirective: function(directiveName, $scope, $element, $attrs, controller) {
                $scope.gantt.api.directives.raise.destroy(directiveName, $scope, $element, $attrs, controller);
            },

            raiseAll: function(directiveName, $scope, $element, $attrs, controller) {
                utilsFn.raiseNewController(directiveName, $scope, $element, $attrs, controller);
                utilsFn.raiseNewDirective(directiveName, $scope, $element, $attrs, controller);
            }
       };

       return utilsFn;
    }]);
}());
