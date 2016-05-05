(function(){
    'use strict';
    angular.module('gantt.line').directive('ganttTaskBaseLine', ['$templateCache', 'moment', function($templateCache, moment) {
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
            controller: ['$scope', '$element', function($scope, $element) {

                $scope.simplifyMoment = function(d) {
                    return moment.isMoment(d) ? d.unix() : d;
                };

                 $scope.getClasses = function() {
                    var classes = [];

                    if (typeof($scope.task.model.base) === 'object') {
                        classes = $scope.task.model.base.classes;
                    }

                    return classes;
                };

                if ($scope.task.model.base) {
                    $scope.$watchGroup(['simplifyMoment(task.model.base.from)', 'simplifyMoment(task.model.base.to)', 'task.left', 'task.width'], function() {
                        var left = $scope.task.rowsManager.gantt.getPositionByDate($scope.task.model.base.from);
                        var right = $scope.task.rowsManager.gantt.getPositionByDate($scope.task.model.base.to);

                        $element.css('left', left + 'px');
                        $element.css('width', right - left + 'px');

                        if ($scope.task.model.base.color) {
                            $element.css('backgroundColor', $scope.task.model.base.color);
                        }

                    });
                }



                $scope.task.rowsManager.gantt.api.directives.raise.new('ganttTaskBaseLine', $scope, $element);
                $scope.$on('$destroy', function() {
                    $scope.task.rowsManager.gantt.api.directives.raise.destroy('ganttTaskBaseLine', $scope, $element);
                });
            }]
        };
    }]);
}());


