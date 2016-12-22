(function() {
    'use strict';

    angular.module('gantt')
        .factory('DependenciesTracker', [function() {
        var tracker = {
            _dependenciesFrom: {},
            _dependenciesTo: {},
            groups: {}
        };

        tracker.addDependency = function(dependency) {
            var fromTaskId = dependency.getFromTaskId();
            var fromTask = dependency.getFromTask();
            var toTaskId = dependency.getToTaskId();
            var toTask = dependency.getToTask();
            
            if (!(fromTaskId in this._dependenciesFrom)) {
                this._dependenciesFrom[fromTaskId] = [];
            }
            if (!(toTaskId in this._dependenciesTo)) {
                this._dependenciesTo[toTaskId] = [];
            }

            if (fromTaskId) {
                this._dependenciesFrom[fromTaskId].push(dependency);
            }

            if (toTaskId) {
                this._dependenciesTo[toTaskId].push(dependency);
            }

            dependency;
        };

        tracker.getTaskDependencies = function(task) {
            var dependencies = [];

            if (task) {
                var fromDependencies = this._dependenciesFrom[task.model.id];

                if (fromDependencies) {
                    dependencies = dependencies.concat(fromDependencies);
                }

                var toDependencies = this._dependenciesTo[task.model.id];

                if (toDependencies) {
                    dependencies = dependencies.concat(toDependencies);
                }
            }

            return dependencies;
        };

        tracker.getDependenciesFromByID = function(id) {
            return this._dependenciesFrom[id];
        };

        tracker.getDependenciesToByID = function(id) {
            return this._dependenciesTo[id];
        };

        tracker.deleteFromDependencyByID = function(id) {
            delete this._dependenciesFrom[id];
        };

        tracker.deleteToDependencyByID = function(id) {
            delete this._dependenciesTo[id];
        };

        tracker.getFromTaskDependenciesByTask = function(task) {
            var dependencies = [];

            if (task) {
                var fromDependencies = this._dependenciesFrom[task.model.id];

                if (fromDependencies) {
                    dependencies = dependencies.concat(fromDependencies);
                }

            }

            return dependencies;
        };

        tracker.getDependencies = function() {
            var allDependencies = [];

            angular.forEach(this._dependenciesFrom, function(dependencies) {
                for (var i = 0; i < dependencies.length; i++) {
                    if (!(dependencies[i] in allDependencies)) {
                        allDependencies.push(dependencies[i]);
                    }
                }
            });

            return allDependencies;
        };

        tracker.getToTaskDependenciesByTask = function(task) {
            var dependencies = [];

            if (task) {
                var fromDependencies = this._dependenciesTo[task.model.id];

                if (fromDependencies) {
                    dependencies = dependencies.concat(fromDependencies);
                }

            }

            return dependencies;
        };

        tracker.addTask = function(task, manager) {
            if (!this.tasks) {
                this.tasks = manager.taskMap;
            }

            if (!(task.model.id in this.tasks)) {
                this.tasks[task.model.id] = task;
            }

        };

        tracker.addTaskGroup = function(taskGroup, manager) {
            if (!(taskGroup.model.id in this.groups)) {
                this.groups[task.model.id] = taskGroup;
            }
        };

        tracker.getAllTask = function() {
            return angular.merge(this.tasks, this.groups);
        };

        tracker.getFromDependenciesObject = function() {
            return this._dependenciesFrom;
        };

        tracker.getTaskByID = function(id) {
            return this.tasks[id];
        };

        tracker.getTaskGroupByID = function(id) {
            return this.groups[id];
        };


        return tracker;
    }]);
})();