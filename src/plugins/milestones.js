(function(){
  'use strict';
  angular.module('gantt.milestones', ['gantt', 'gantt.milestones.templates'])
    .directive('ganttMilestones', ['moment', '$compile', '$document', function(moment, $compile, $document) {
      return {
        restrict: 'E',
        require: '^gantt',
        scope: {
          enabled: '=?'
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
              angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');
              var lineElement = $document[0].createElement('gantt-task-milestones');
              if (attrs.templateUrl !== undefined) {
                angular.element(lineElement).attr('data-template-url', attrs.templateUrl);
              }
              if (attrs.template !== undefined) {
                angular.element(lineElement).attr('data-template', attrs.template);
              }
              angular.element(ifElement).append(lineElement);
              taskElement.append($compile(ifElement)(lineScope));
            }
          });
        }
      };
    }]);
}());
