(function(){
    'use strict';
    angular.module('gantt.groups').controller('GanttGroupController', ['$scope', 'GanttTaskGroup', 'ganttUtils',  function($scope, TaskGroup, utils) {
        var updateTaskGroup = function() {
            var rowGroups = $scope.row.model.groups;

            if (typeof(rowGroups) === 'boolean') {
                rowGroups = {enabled: rowGroups};
            }

            var enabledValue = utils.firstProperty([rowGroups], 'enabled', $scope.pluginScope.enabled);
            if (enabledValue) {
                $scope.display = utils.firstProperty([rowGroups], 'display', $scope.pluginScope.display);
                $scope.taskGroup = new TaskGroup($scope.row, $scope.pluginScope);

                $scope.row.setFromTo();
                $scope.row.setFromToByValues($scope.taskGroup.from, $scope.taskGroup.to);
                $scope.taskGroup.createModel();

                $scope.gantt.api.groups.raise.viewChange($scope.taskGroup);
            } else {
                $scope.taskGroup = undefined;
                $scope.display = undefined;
            }
        };

        $scope.gantt.api.tasks.on.viewChange($scope, function(task) {
            if ($scope.taskGroup !== undefined) {
                if ($scope.taskGroup.tasks.indexOf(task) > -1) {
                    updateTaskGroup();
                    if(!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$digest();
                    }
                } else {
                    var descendants = $scope.pluginScope.hierarchy.descendants($scope.row);
                    if (descendants.indexOf(task.row) > -1) {
                        updateTaskGroup();
                        $scope.gantt.api.groups.raise.displayed($scope.taskGroup);
                        if(!$scope.$$phase && !$scope.$root.$$phase) {
                            $scope.$digest();
                        }
                    }
                }
            }
        });

        $scope.gantt.api.groups.on.add($scope, function(groups) {
            console.log('Add: ', groups);
        });


        var removeWatch = $scope.pluginScope.$watch('display', function(){
            updateTaskGroup();
            $scope.gantt.api.groups.raise.displayed([$scope.taskGroup]);
        });

        $scope.$watchCollection('gantt.rowsManager.filteredRows', updateTaskGroup);

        $scope.gantt.api.columns.on.refresh($scope, updateTaskGroup);

        $scope.$on('$destroy', removeWatch);
    }]);
}());

