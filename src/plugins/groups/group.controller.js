(function(){
    'use strict';
    angular.module('gantt.groups').controller('GanttGroupController', ['$scope', 'GanttTaskGroup', 'ganttUtils', 'ganttArrays', function($scope, TaskGroup, utils, ganttArrays) {
        var hasChange = function(taskGroup, api) {
            var arrTaskGroups = ganttArrays.getGroup();
            for (var i = 0;  i < arrTaskGroups.length; i++) {
                if (taskGroup.row.model.id === arrTaskGroups[i].row.model.id) {
                    if ( (taskGroup.left !== arrTaskGroups[i].left ||
                          taskGroup.width !== arrTaskGroups[i].width) &&
                          !$scope.sideResize) {
                        ganttArrays.updateGroupValue(i, taskGroup);
                        api.groups.raise.move(arrTaskGroups[i]);
                    }
                }
            }
        };

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
                hasChange($scope.taskGroup, $scope.gantt.api);
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
                        if(!$scope.$$phase && !$scope.$root.$$phase) {
                            $scope.$digest();
                        }
                    }
                }
            }
        });

        var removeWatch = $scope.pluginScope.$watch('display', updateTaskGroup);

        $scope.$watchCollection('gantt.rowsManager.filteredRows', updateTaskGroup);

        $scope.gantt.api.columns.on.refresh($scope, updateTaskGroup);

        $scope.$on('$destroy', removeWatch);
    }]);
}());

