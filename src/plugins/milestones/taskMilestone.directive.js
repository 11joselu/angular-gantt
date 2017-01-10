(function(){
  'use strict';
  angular.module('gantt.milestones')
    .directive('ganttTaskMilestones', ['moment', '$templateCache', function(moment, $templateCache) {
      return {
        restrict: 'E',
        templateUrl: function(tElement, tAttrs) {
          var templateUrl;
          if (tAttrs.templateUrl === undefined) {
            templateUrl = 'plugins/milestones/milestones.tmpl.html';
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

          var updateDatesToMoment = function(milestone) {
            milestone.date = moment(milestone.date);
          };

          if ($scope.task.model.milestones) {
            $scope.task.model.milestones.forEach(updateDatesToMoment);
          }

        }]
      };
    }]);
}());
