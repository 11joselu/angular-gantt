(function(){
    'use strict';
    angular.module('gantt.line', ['gantt', 'gantt.line.templates'])
        .directive('ganttLine', ['$compile', '$document',
            function( $compile, $document) {
        // Provides the row sort functionality to any Gantt row
        // Uses the sortableState to share the current row

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                 api.directives.on.new(scope, function(directiveName, taskScope, taskElement) {
                    if (directiveName === 'ganttTask') {
                        var lineScope = taskScope.$new();
                        lineScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        //angular.element(ifElement).attr('data-ng-if', 'task.model.progress !== undefined && pluginScope.enabled');

                        var lineElement = $document[0].createElement('gantt-task-line');
                        if (attrs.templateUrl !== undefined) {
                            angular.element(lineElement).attr('data-template-url', attrs.templateUrl);
                        }
                        if (attrs.template !== undefined) {
                            angular.element(lineElement).attr('data-template', attrs.template);
                        }
                        angular.element(ifElement).append(lineElement);
                        angular.element(taskElement).parent().append($compile(ifElement)(lineScope));
                    }
                });
            }
        };
    }]);
}());

