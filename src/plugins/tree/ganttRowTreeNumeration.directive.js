(function(){
  'use strict';
  angular.module('gantt.tree').directive('ganttRowTreeNumeration', ['$compile', function($compile) {
    return {
      restrict: 'A',
      replace: true,
      template: '<span class="gantt-label-numeration" ng-style="{\'left\': (($parent.depth()-1) * -20) + \'px\'}">{{getRowIndex()}}  </span>',
    }
  }]);
}());
