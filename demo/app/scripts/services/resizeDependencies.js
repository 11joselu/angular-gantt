'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .factory('ResizeDependencies', ['FSDependencies', function (Dependencies) {

        var Resize = function(task) {
            this.task = task;
            this.model = task.model;

            this.updateDependencies = function(data) {
                if(this.model.dependencies) {
                    for(var i = 0; i < this.model.dependencies.length; i++) {
                        var toTask = this.findTask(data, this.model.dependencies[i]);
                        var dependencies = new Dependencies(null, this.model, toTask);
                        dependencies.setDate();
                        dependencies.updateChildTasks(data);
                    }
                }
            }

            this.findTask = function(data, obj) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].tasks) {
                        var childTask = data[i].tasks;
                        for(var j=0; j < childTask.length; j++) {

                            if(childTask[j].id === obj.to) {
                                return childTask[j];
                            }
                        }
                    }
                }
            }
        };


        return Resize;
    }]);
;
