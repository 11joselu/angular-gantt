/* globals jsPlumb */
(function() {
    'use strict';

    angular.module('gantt.grDependencies').factory('GrDependenciesManager', ['GanttGroupDependencyTaskMouseHandler', 'GroupsDependenciesEvents', function(GroupMouseHandler, DependenciesEvents) {
        var DependenciesManager = function(gantt, pluginScope, api) {
            var self = this;

            this.gantt = gantt;
            this.pluginScope = pluginScope;
            this.api = api;
            this.allTaskGroup = [];
            this.api.registerEvent('grDependencies', 'add');
            this.api.registerEvent('grDependencies', 'change');
            this.api.registerEvent('grDependencies', 'remove');
            this.api.registerEvent('grDependencies', 'displayed');

            this.plumb = jsPlumb.getInstance();
            this.plumb.importDefaults(this.pluginScope.jsPlumbDefaults);

            this.events = new DependenciesEvents(this);

            var addEndpoints = function(groupsTask) {
                if (!groupsTask.dependencies) {
                    groupsTask.dependencies = {};
                }

                groupsTask.dependencies.endpoints = [];

                if (self.pluginScope.endpoints) {
                    for (var i = 0; i < self.pluginScope.endpoints.length; i++) {
                        var controllerElement = angular.element(groupsTask.$element)[0];
                        var groupElement = angular.element(controllerElement).children();
                        if(groupElement[0]) {
                            var endpointObject = self.plumb.addEndpoint(groupElement, self.pluginScope.endpoints[i]);
                            endpointObject.setVisible(false, true, true); // hide endpoint
                            endpointObject.$groupTask = groupsTask;
                            groupsTask.dependencies.endpoints.push(endpointObject);
                        }
                    }
                }
            };

            var addHandler = function(groupsTask) {
                if (!groupsTask.dependencies) {
                    groupsTask.dependencies = {};
                }

                if (!self.pluginScope.readOnly) {
                    groupsTask.dependencies.mouseHandler = new GroupMouseHandler(self, groupsTask);
                    groupsTask.dependencies.mouseHandler.install();
                }

                // WARNING: Performances issues
                self.allTaskGroup.push(groupsTask);
            };

            this.setTasks = function(groupsTask) {
                self.plumb.setSuspendDrawing(true);
                try {
                    addEndpoints(groupsTask);
                    addHandler(groupsTask);
                } finally {
                    self.plumb.setSuspendDrawing(false, true);
                }
            };

            this.setDraggingConnection = function(connection) {

                if (connection) {
                    self.draggingConnection = connection;
                    angular.forEach(self.allTaskGroup, function(task) {
                        task.dependencies.mouseHandler.release();
                    });
                } else {
                    self.draggingConnection = undefined;
                    angular.forEach(self.allTaskGroup, function(task) {
                        task.dependencies.mouseHandler.install();
                    });
                }
            };

        };

        return DependenciesManager;
    }]);
}());
