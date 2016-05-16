(function(){
    'use strict';
    angular.module('gantt.groups').controller('GanttGroupController', ['$scope', 'GanttTaskGroup', 'ganttUtils', 'ganttArrays', function($scope, TaskGroup, utils, arrays) {
        /**
         * Emit event for any TaskGroup change
         * @param  {[TaskGroup]}  taskGroup
         * @param  {[API]}  api
         */
        var hasChange = function(taskGroup, api) {
            var arrTaskGroups = arrays.getGroup();

            for (var i = 0;  i < arrTaskGroups.length; i++) {
                if (taskGroup.row.model.id === arrTaskGroups[i].row.model.id) {
                    if ((taskGroup.left !== arrTaskGroups[i].left ||
                        taskGroup.width !== arrTaskGroups[i].width) &&
                        !$scope.isResizing) {
                        api.groups.raise.move(arrTaskGroups[i]);
                        // set new value
                        arrTaskGroups[i] = taskGroup;
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

                if ($scope.taskGroup.descendants.length > 0) {
                    arrays.pushGroup($scope.taskGroup);
                    if (angular.isUndefined($scope.taskGroup.model)) {
                        $scope.taskGroup.model = {};
                    }

                    $scope.taskGroup.model = $scope.taskGroup.row.model;
                    $scope.taskGroup.model.from = $scope.taskGroup.row.from;
                    $scope.taskGroup.model.to = $scope.taskGroup.row.to;
                }

                hasChange($scope.taskGroup, $scope.gantt.api);

            } else {
                $scope.taskGroup = undefined;
                $scope.display = undefined;
            }
        };

        $scope.isResizing = false;

        if ($scope.gantt.api.side) {
            $scope.gantt.api.side.on.resizeBegin($scope, function(){
                $scope.isResizing = true;
            });

            $scope.gantt.api.side.on.resizeEnd($scope, function() {
                $scope.isResizing = false;
            });
        }

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

        var removeWatch = $scope.pluginScope.$watch('display', function() {
            arrays.resetGroup();
            updateTaskGroup()
        });

        $scope.$watchCollection('gantt.rowsManager.filteredRows', updateTaskGroup);

        $scope.gantt.api.columns.on.refresh($scope, function() {
            arrays.resetGroup();
            updateTaskGroup();
        });

        $scope.gantt.api.data.on.clear($scope, function() {
            arrays.resetGroup();
        });

        $scope.gantt.api.tasks.on.change($scope, function() {
            arrays.resetGroup();
        })

        $scope.$on('$destroy', removeWatch);
    }]);
}());

