(function(){
    'use strict';
    angular.module('gantt.line').directive('ganttTaskBaseLine', [function() {
        return {
            restrict: 'E',
            templateUrl: function(tElement, tAttrs) {
                var templateUrl;
                if (tAttrs.templateUrl === undefined) {
                    templateUrl = 'plugins/line/taskLine.tmpl.html';
                } else {
                    templateUrl = tAttrs.templateUrl;
                }
                if (tAttrs.template !== undefined) {
                    $templateCache.put(templateUrl, tAttrs.template);
                }
                return templateUrl;
            },
            replace: true,
            scope: true,
            require: '^gantt',
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
                if ($scope.task.model.base) {
                    $scope.showLine = true;
                    var left = $scope.task.rowsManager.gantt.getPositionByDate($scope.task.model.base.from);
                    var width = $scope.task.rowsManager.gantt.getPositionByDate($scope.task.model.base.to);
                    $scope.task.updatePosAndSize();
                } else {
                    $scope.showLine = false;
                }

                $scope.getCss = function() {
                    return {
                        left: left + 'px',
                        width: width + 'px'
                    }
                };
            }]
        };
    }]);
}());


