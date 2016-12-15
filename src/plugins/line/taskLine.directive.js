(function(){
  'use strict';
  angular.module('gantt.line').directive('ganttTaskBaseLine', ['moment', '$compile', '$timeout', function(moment, $compile, $timeout) {
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
      link: function($scope, $element, $attr, ganttCtrl) {
        $scope.gantt = ganttCtrl.gantt;

        var updatePositionElement = function() {
          $element.find('div').remove();
          var $line = angular.element('<div class="gantt-task-base-line" ng-show="!row.model.children"></div>');

          $scope.row.tasks.forEach(function(task) {

            if (!task.model.base) { task.model.base = {}; }

            if (task.model.base.from && task.model.base.to) {
              task.model.base.from = moment(task.model.base.from);
              task.model.base.to = moment(task.model.base.to);
              var left = task.rowsManager.gantt.getPositionByDate(task.model.base.from.startOf('day'));
              var width = task.rowsManager.gantt.getPositionByDate(task.model.base.to.endOf('day'));

              $line.css('left', left + 'px');
              $line.css('width', width - left + 'px');

              if (task.model.isMilestone) {
                $line.addClass('task-is-milestone')
              } else {
                $line.removeClass('task-is-milestone')
              }

              $element.append($compile($line)($scope));
            } else {
              $element.find('div').remove();
            }
          });
        };

        updatePositionElement();

        $scope.gantt.api.rows.on.refresh($scope, function() {
          $timeout(updatePositionElement, 0)
        });
      }
    };
  }]);
}());
