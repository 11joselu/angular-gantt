'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .factory('ResizeDependencies', ['FSDependencies', 'Utils', function (Dependencies, Utils) {

        var Resize = function(task) {
            this.task = task;
            this.model = task.model;
            var utils = new Utils();
            this.updateDependencies = function(data, api) {
                this.updateDuration(data, this.model);

                if(this.model.dependencies) {
                    for(var i = 0; i < this.model.dependencies.length; i++) {
                        var toTask = utils.findTask(data, this.model.dependencies[i]);
                        var dependencies = new Dependencies(null, this.model, toTask);
                        dependencies.setDate(api);
                        dependencies.updateChildTasks(data);
                    }

                    return;
                }

                api.columns.generate();
            }

            this.updateDuration = function(data, task) {
                var index = utils.getIndexTask(data, task);
                data[index].data.duration = Math.abs(utils.difference(task.from, task.to, 'days')) + " d";
            }
        };


        return Resize;
    }]);
;
