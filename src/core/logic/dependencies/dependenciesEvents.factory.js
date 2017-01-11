(function() {
    'use strict';

    angular.module('gantt').factory('GanttDependenciesEvents', [function() {
        /**
         * Creates a new DependenciesEvents object.
         *
         * @param manager DependenciesManager object
         * @constructor
         */
        var DependenciesEvents = function(manager) {
            var self = this;

            this.manager = manager;

            // Deny the start of a drag when in readonly
            var denyDragWhenReadOnly = function () {
                return !self.manager.pluginScope.readOnly;
            };

            this.manager.plumb.bind('beforeDrag', denyDragWhenReadOnly);
            this.manager.plumb.bind('beforeStartDetach', denyDragWhenReadOnly);

            // Deny drop on the same task.
            var denyDropOnSameTask = function(params) {
                return params.sourceId !== params.targetId;
            };

            this.manager.plumb.bind('beforeDrop', denyDropOnSameTask);


            // Notify the manager that a connection is being created.
            this.manager.plumb.bind('connectionDrag', function(connection) {
                self.manager.setDraggingConnection(connection);
            });

            this.manager.plumb.bind('connectionDragStop', function() {
                self.manager.setDraggingConnection(undefined);
            });

            this.manager.plumb.bind('beforeDrop', function() {
                self.manager.setDraggingConnection(undefined);
                return true;
            });

            var isChildTask = function(sourceModel, targetEndpoint) {
                var isChild = false;

                if (sourceModel.children && sourceModel.children.length > 0) {
                    var toTask = targetEndpoint.$task;
                    if (sourceModel.children.indexOf(toTask.model.id) >= 0 || sourceModel.children.indexOf(toTask.model.name) >= 0) {
                        isChild = true;
                    }
                }

                return isChild;
            };

            var isCircularDependency = function(sourceModel, targetEndpoint) {
                var toTask = targetEndpoint.$task;

                var isDependency = isAlreadyDependency(toTask.model.dependencies, sourceModel);

                return isDependency;
            };

            var isAlreadyDependency = function(dependencies, model) {
                if (!dependencies) {
                    return false;
                }

                return dependencies.some(function(dependency) {
                    var exitFrom = dependency.from === model.id || dependency.from === model.name;
                    var existTo = dependency.to === model.id || dependency.to === model.name;

                    return exitFrom || existTo;
                });
            };

            var isParent = function(sourceModel, targetEndpoint) {
                var toTask = targetEndpoint.$task;
                var isChild = false;

                if (toTask.model.children) {
                    isChild = toTask.model.children.indexOf(sourceModel.id) >= 0;

                    if (!isChild) {
                        isChild = toTask.model.children.indexOf(sourceModel.name) >= 0;
                    }
                }

                return isChild;
            };

            var createConnection = function(info, mouseEvent) {

                if (mouseEvent) {
                    var oldDependency;
                    if (info.connection.$dependency) {
                        oldDependency = info.connection.$dependency;
                    }

                    var sourceEndpoint = info.sourceEndpoint;
                    var targetEndpoint = info.targetEndpoint;

                    var sourceModel = sourceEndpoint.$task.model;

                    if (isChildTask(sourceModel, targetEndpoint)) {
                        sourceEndpoint.detachFrom(targetEndpoint);
                        return;
                    }

                    if (isCircularDependency(sourceModel, targetEndpoint)) {
                        sourceEndpoint.detachFrom(targetEndpoint);
                        return;
                    }

                    if (isParent(sourceModel, targetEndpoint)) {
                        sourceEndpoint.detachFrom(targetEndpoint);
                        return;
                    }

                    var dependenciesModel = sourceModel.dependencies;
                    if (dependenciesModel === undefined) {
                        dependenciesModel = [];
                        sourceModel.dependencies = dependenciesModel;
                    }

                    var connectionModel = {to: targetEndpoint.$task.model.id};
                    dependenciesModel.push(connectionModel);

                    if (oldDependency) {
                        oldDependency.removeFromTaskModel();
                        self.manager.removeDependency(oldDependency, true); // Connection will be disconnected later by jsPlumb.
                    }

                    var dependency = self.manager.addDependency(sourceEndpoint.$task, connectionModel);
                    info.connection.$dependency = dependency;
                    dependency.connection = info.connection;

                    self.manager.api.dependencies.raise.add(dependency);
                }
            };

            var updateConnection = function(info, mouseEvent) {
                if (mouseEvent) {
                    var oldDependency;
                    if (info.connection.$dependency) {
                        oldDependency = info.connection.$dependency;
                    }

                    var sourceEndpoint = info.newSourceEndpoint;
                    var targetEndpoint = info.newTargetEndpoint;

                    var sourceModel = sourceEndpoint.$task.model;

                    if (isChildTask(sourceModel, targetEndpoint)) {
                        sourceEndpoint.detachFrom(targetEndpoint);
                        return;
                    }

                    if (isCircularDependency(sourceModel, targetEndpoint)) {
                        sourceEndpoint.detachFrom(targetEndpoint);
                        return;
                    }

                    if (isParent(sourceModel, targetEndpoint)) {
                        sourceEndpoint.detachFrom(targetEndpoint);
                        return;
                    }

                    var dependenciesModel = sourceModel.dependencies;
                    if (dependenciesModel === undefined) {
                        dependenciesModel = [];
                        sourceModel.dependencies = dependenciesModel;
                    }

                    var connectionModel = {to: targetEndpoint.$task.model.id};
                    dependenciesModel.push(connectionModel);

                    if (oldDependency) {
                        oldDependency.removeFromTaskModel();
                        self.manager.removeDependency(oldDependency, true); // Connection will be disconnected later by jsPlumb.
                    }

                    var dependency = self.manager.addDependency(sourceEndpoint.$task, connectionModel);
                    info.connection.$dependency = dependency;
                    dependency.connection = info.connection;

                    self.manager.api.dependencies.raise.change(dependency, oldDependency);
                }
            };

            var deleteConnection = function(info, mouseEvent) {
                if (mouseEvent) {
                    var dependency = info.connection.$dependency;

                    dependency.removeFromTaskModel();
                    self.manager.removeDependency(dependency, true); // Connection will be disconnected later by jsPlumb.
                    self.manager.api.dependencies.raise.remove(dependency);
                }
            };

            this.manager.plumb.bind('connectionMoved', updateConnection);
            this.manager.plumb.bind('connection', createConnection);
            this.manager.plumb.bind('connectionDetached', deleteConnection);

        };
        return DependenciesEvents;
    }]);
}());
