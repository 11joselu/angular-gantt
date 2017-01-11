(function() {
    'use strict';

    angular.module('gantt').factory('GanttDependenciesTaskManager', ['GanttDependency', 'ganttDom', 'GanttDependenciesEvents', 'GanttDependencyTaskMouseHandler', 'DependenciesTracker', function(Dependency, dom, DependenciesEvents, TaskMouseHandler, Tracker) {
        var DependenciesManager = function(gantt, pluginScope, api) {
            this.gantt = gantt;
            this.rowsManager = gantt.rowsManager;
            this.pluginScope = pluginScope.$ctrl;
            this.api = api;

            this.plumb = Tracker.getPlumbInstance();
            this.plumb.importDefaults(this.pluginScope.jsPlumbDefaults);

            this.rowsManager.dependenciesFrom = {};
            this.rowsManager.dependenciesTo = {};
            this.task = null;

            this.events = new DependenciesEvents(this);
        };

        var hasDependencies = function(task) {
            var taskDependencies = task.model.dependencies;

            return taskDependencies !== undefined && taskDependencies;
        };

        var hasReadOnly = function(task) {
            var data = task.row.model.data;

            return (data)? data.readOnly : false;
        };


        /**
         * Add all dependencies defined from a task. Dependencies will be added only if plugin is enabled.
         *
         * @param task
         */
        DependenciesManager.prototype.addDependenciesFromTask = function(task) {
            if (this.pluginScope.enabled && hasDependencies(task)) {
                var taskDependencies = task.model.dependencies;

                if (!angular.isArray(taskDependencies)) {
                    taskDependencies = [taskDependencies];
                    task.model.dependencies = taskDependencies;
                }

                for (var i = 0; i < taskDependencies.length; i++) {
                    var dependency = this.addDependency(task, taskDependencies[i]);
                    if (dependency) {
                        dependency.connect();
                    }
                }
            }
        };

        /**
        * Add definition of a dependency.
        *
        * @param task Task defining the dependency.
        * @param model Model object for the dependency.
        * @param allowPartial if true, dependency linking to a missing task will still be added.
        */
        DependenciesManager.prototype.addDependency = function(task, model) {
            var dependency = new Dependency(this, task, model);
            Tracker.addDependency(dependency);

            return dependency;
        };

        DependenciesManager.prototype.getTask = function(id) {
            var task = Tracker.getTaskByID(id);

            if (!task) {
                Tracker.getTaskGroupByID(id);
            }

            return task;
        };

        DependenciesManager.prototype.getTaskDependencies = function(task) {
            return Tracker.getTaskDependencies(task);
        };

        /**
         * Remove definition of a dependency
         *
         * @param dependency Dependency object
         * @param keepConnection if true, dependency will not be disconnected.
         */
        DependenciesManager.prototype.removeDependency = function(dependency, keepConnection) {
            var fromDependencies = Tracker.getDependenciesFromByID(dependency.getFromTaskId());
            var fromRemove = [];
            var i = 0;

            if (fromDependencies) {
                for (i = 0; i < fromDependencies.length; i++) {
                    if (dependency === fromDependencies[i]) {
                        fromRemove.push(dependency);
                    }
                }
            }

            var toDependencies = Tracker.getDependenciesToByID(dependency.getToTaskId());
            var toRemove = [];

            if (toDependencies) {
                for (i = 0; i < toDependencies.length; i++) {
                    if (dependency === toDependencies[i]) {
                        toRemove.push(dependency);
                    }
                }
            }

            for (i = 0; i < fromRemove.length; i++) {
                if (!keepConnection) {
                    fromRemove[i].disconnect();
                }
                fromDependencies.splice(fromDependencies.indexOf(dependency), 1);
            }

            for (i = 0; i < toRemove.length; i++) {
                if (!keepConnection) {
                    toRemove[i].disconnect();
                }
                toDependencies.splice(toDependencies.indexOf(dependency), 1);
            }

            if (Tracker.getDependenciesFromByID(dependency.getFromTaskId()) &&
            Tracker.getDependenciesFromByID(dependency.getFromTaskId()).length === 0) {
                Tracker.deleteFromDependencyByID(dependency.getFromTaskId());
            }

            if (Tracker.getDependenciesToByID(dependency.getToTaskId()) &&
            Tracker.getDependenciesToByID(dependency.getToTaskId()).length === 0) {
                Tracker.deleteToDependencyByID(dependency.getToTaskId());
            }
        };

        /**
         * Remove all dependencies defined for a task.
         *
         * @param task
         * @param keepConnection if true, dependency will not be disconnected.
         */
        DependenciesManager.prototype.removeDependenciesFromTask = function(task, keepConnection) {
            var dependencies = this.getTaskDependencies(task);

            if (dependencies) {
                for (var i = 0; i < dependencies.length; i++) {
                    if (!keepConnection) {
                        dependencies[i].disconnect();
                    }

                    this.removeDependency(dependencies[i], keepConnection);
                }
            }
        };

        DependenciesManager.prototype.getFromTaskDependencies = function(task) {
            return Tracker.getFromTaskDependenciesByTask(task);
        };

        DependenciesManager.prototype.getToTaskDependencies = function(task) {
            return Tracker.getToTaskDependenciesByTask(task);
        };

        DependenciesManager.prototype.addTask = function(task) {
            Tracker.addTask(task);
        };

        DependenciesManager.prototype.addTaskGroup = function(taskGroup) {
            Tracker.addTaskGroup(taskGroup);
        };

        var taskDependencyAcction = function(tasks, release) {
            var isTaskVisible = function(task) {
                if (task === undefined || task.$element === undefined) {
                    return false;
                }
                var element = task.$element[0];
                return dom.isElementVisible(element);
            };

            for (var key in tasks) {
                var task = tasks[key];

                if (!hasReadOnly(task) && isTaskVisible(task)) {
                    if (release) {
                        task.dependencies.mouseHandler.release();
                    } else {
                        task.dependencies.mouseHandler.install();
                    }
                }

            }

        };

         DependenciesManager.prototype.setDraggingConnection = function(connection) {
             var allTasks = Tracker.getAllTask();
             if (connection) {
                 this.draggingConnection = connection;
                taskDependencyAcction(allTasks, true);
             } else {
                 this.draggingConnection = undefined;
                 taskDependencyAcction(allTasks);
             }

         };

         var addTaskEndpoints = function(task) {
            if (!task.dependencies) {
                task.dependencies = {};
            }

            task.dependencies.endpoints = [];

            if (this.pluginScope.endpoints && task.$element) {
                for (var i = 0; i < this.pluginScope.endpoints.length; i++) {
                    var endpointObject = this.plumb.addEndpoint(task.$element, this.pluginScope.endpoints[i]);
                    endpointObject.setVisible(false, true, true); // hide endpoint
                    endpointObject.$task = task;
                    task.dependencies.endpoints.push(endpointObject);
                }
            }

         };

        var removeTaskEndpoint = function(task) {
            if (task.dependencies && task.dependencies.endpoints) {
                for (var i = 0; i < task.dependencies.endpoints.length; i++) {
                    var endpointObject = task.dependencies.endpoints[i];
                    this.plumb.deleteEndpoint(endpointObject);
                    endpointObject.$task = undefined;
                }

                task.dependencies.endpoints = undefined;
            }
        };

        var addTaskMouseHandler = function(task) {
            if (!task.dependencies) {
                task.dependencies = {};
            }

            if (!this.pluginScope.readOnly && !hasReadOnly(task)) {
                task.dependencies.mouseHandler = new TaskMouseHandler(this, task);
                task.dependencies.mouseHandler.install();
            }
        };

        var removeTaskMouseHandler = function(task) {
            if (task.dependencies && task.dependencies.mouseHandler) {
                task.dependencies.mouseHandler.release();
                task.dependencies.mouseHandler = undefined;
            }
        };

        var isTaskEnabled = function(task) {
            var rowDependencies = task.row.model.dependencies;
            if (rowDependencies !== undefined) {
                return rowDependencies !== false;
            }
            var taskDependencies = task.model.dependencies;
            if (taskDependencies !== undefined) {
                return taskDependencies !== false;
            }
            return true;
        };

        DependenciesManager.prototype.setTasks = function(task, isTask) {
            this.removeAll(task);
            if (isTaskEnabled(task)) {
                addTaskMouseHandler.call(this, task);
                addTaskEndpoints.call(this, task);

                if (isTask) {
                    Tracker.addTask(task, this.rowsManager);
                } else {
                    Tracker.addTaskGroup(task, this.rowsManager);
                }

            }
        };

        DependenciesManager.prototype.removeAll = function(task) {
            removeTaskMouseHandler(task);
            removeTaskEndpoint.call(this, task);
        };

        DependenciesManager.prototype.removeGroup = function(taskGroup) {
            if (taskGroup.dependencies) {
                removeTaskMouseHandler(taskGroup);
                removeTaskEndpoint.call(this, taskGroup);
            }
        };

        DependenciesManager.prototype.setGroup = function(taskGroup) {
            removeTaskMouseHandler(taskGroup);
            removeTaskEndpoint.call(this, taskGroup);

            if (isTaskEnabled(taskGroup)) {
                addTaskMouseHandler.call(this, taskGroup);
                addTaskEndpoints.call(this, taskGroup);
            }
        };


        var disconnectTaskDependencies = function(task) {
            var dependencies = this.getTaskDependencies(task);
            if (dependencies) {
                for (var i = 0; i < dependencies.length; i++) {
                    dependencies[i].disconnect();
                }
            }

            return dependencies;
        };

        var connectTaskDependencies = function(task) {
            var dependencies = this.getTaskDependencies(task);
            if (dependencies) {
                for (var i = 0; i < dependencies.length; i++) {
                    dependencies[i].connect();
                }
            }

            return dependencies;
        };

        DependenciesManager.prototype.setTask = function(task) {
            this.plumb.setSuspendDrawing(true);
            try {
                var oldTask = Tracker.getTaskByID(task.model.id);
                var isTask = true;

                if (!oldTask) {
                    oldTask = Tracker.getTaskGroupByID(task.model.id);
                    isTask = false;
                }

                if (oldTask !== undefined) {
                    disconnectTaskDependencies.call(this, oldTask);
                    removeTaskMouseHandler(oldTask);
                    removeTaskEndpoint.call(this, oldTask);
                }

                if (isTaskEnabled(task)) {
                    if (isTask) {
                        Tracker.addTask(task);
                    } else {
                        Tracker.addTaskGroup(task);
                    }

                    addTaskEndpoints.call(this, task);
                    addTaskMouseHandler.call(this, task);
                    connectTaskDependencies.call(this, task);
                }
            } finally {
                this.plumb.setSuspendDrawing(false, true);
            }
        };

        var getSourceEndpoints = function(task) {
            return task.dependencies.endpoints.filter(function(endpoint) {
                return endpoint.isSource;
            });
        };

        var getTargetEndpoints = function(task) {
            return task.dependencies.endpoints.filter(function(endpoint) {
                return endpoint.isTarget;
            });
        };

        /**
         * Connects two tasks together using source endpoint from fromTask and target endpoint from toTask.
         *
         * @param fromTask
         * @param toTask
         * @param model
         * @returns connection object
         */
         DependenciesManager.prototype.connect = function(fromTask, toTask, model) {
            var sourceEndpoints = getSourceEndpoints(fromTask);
            var targetEndpoints = getTargetEndpoints(toTask);
            if (sourceEndpoints && targetEndpoints) {
                var sourceEndpoint;
                var targetEndpoint;

                if (model.connectParameters && model.connectParameters.sourceEndpointIndex) {
                    sourceEndpoint = sourceEndpoints[model.connectParameters.sourceEndpointIndex];
                } else {
                    sourceEndpoint = sourceEndpoints[0];
                }

                if (model.connectParameters && model.connectParameters.targetEndpointIndex) {
                    targetEndpoint = targetEndpoints[model.connectParameters.targetEndpointIndex];
                } else {
                    targetEndpoint = targetEndpoints[0];
                }

                var connection = this.plumb.connect({
                    source: sourceEndpoint,
                    target: targetEndpoint
                }, model.connectParameters);

                return connection;
            }
        };

        /**
         * Get all defined dependencies.
         *
         * @returns {Array}
         */
        DependenciesManager.prototype.getDependencies = function() {
            return Tracker.getDependencies();
        };

        DependenciesManager.prototype.refresh = function(tasks) {
            this.plumb.setSuspendDrawing(true);
            var self = this;
            try {
                var tasksDependencies;
                var i;

                if (tasks && !angular.isArray(tasks)) {
                    tasks = [tasks];
                }

                if (!tasks) {
                    tasks = Tracker.getAllTask();
                    tasksDependencies = this.getDependencies();
                } else {
                    tasksDependencies = [];
                    angular.forEach(tasks, function(task) {
                        var taskDependencies = self.getTaskDependencies(task);
                        angular.forEach(taskDependencies, function(taskDependency) {
                            if (!(taskDependency in tasksDependencies)) {
                                tasksDependencies.push(taskDependency);
                            }
                        });
                    });
                }

                for (i = 0; i < tasksDependencies.length; i++) {
                    this.removeDependency(tasksDependencies[i]);
                }

                angular.forEach(tasks, function(task) {
                    self.addDependenciesFromTask(task);
                });

            }  finally {
                self.plumb.setSuspendDrawing(false, true);
            }
        };


        return DependenciesManager;
    }]);
}());
