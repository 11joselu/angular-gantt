(function(){
  'use strict';
  angular.module('gantt.milestones')
    .directive('ganttTaskMilestoneItem', [function() {
      return {
        restrict: 'E',
        replace: true,
        template: '<div class="task-milestones-container" tooltip-template="\'plugins/milestones/tooltip.tmpl.html\'" tooltip-placement="top-right"><span class="gantt-task-milestone-item milestone-item-top"></span>'+
        '<span class="gantt-task-milestone-item milestone-item-bottom"></span></div>',
        scope: {
          item: '='
        },
        controller: ['$scope', '$element', function($scope, $element) {

          $scope.simplifyMoment = function(d) {
            return moment.isMoment(d) ? d.unix() : d;
          };

          if ($scope.item.date) {
            $scope.$watchGroup(['simplifyMoment(item.date)', '$parent.task.left', '$parent.task.width'], function() {
              var left = $scope.$parent.task.rowsManager.gantt.getPositionByDate($scope.item.date);
              $element.parent().css('left', left - $scope.$parent.task.left + 'px');
            });
          }

          $scope.getDate = function() {

            if (typeof $scope.item.date === 'string') {
              $scope.item.date = moment($scope.item.date);
            }

            return $scope.item.date.format('MMM DD');
          };

          $scope.$parent.task.rowsManager.gantt.api.directives.raise.new('ganttTaskMilestoneItem', $scope, $element);
          $scope.$on('$destroy', function() {
            $scope.$parent.task.rowsManager.gantt.api.directives.raise.destroy('ganttTaskMilestoneItem', $scope, $element);
          });


        }]
      };
    }]);
}());
