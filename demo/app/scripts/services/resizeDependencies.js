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
        var utils = new Utils();
        var setPredecessors = function(toTask, value) {
            toTask
        };
        var Resize = function(task) {
            this.task = task;
            this.model = task.model;
            this.updateDependencies = function(data, api) {
                this.updateDuration(data);

                if(this.model.dependencies) {
                    for(var i = 0; i < this.model.dependencies.length; i++) {
                        var toTask = utils.findTask(data, this.model.dependencies[i]);
                        var dependencies = new Dependencies(null, this.model, toTask);
                        dependencies.setDate(data, api);
                        dependencies.updateChildTasks(data, api);
                    }

                    return;
                }

                api.columns.generate();
            }

            this.updateDuration = function(data) {
                var taskIndex = utils.getIndexTask(data, this.model);
                data[taskIndex].data.duration = Math.abs(utils.difference(this.model.from, this.model.to, 'days')) + " d";
                this.updatePredecessors(data, taskIndex);
            }

            this.updatePredecessors = function(data, index) {
                var vm = this;

                if(data[index].data && data[index].data.predecessors) {
                    var predecessors = data[index];
                    var days = utils.getPredecessorsValues(predecessors.data.predecessors);

                    var totalDays = days.parent.map(function(parentIndex) {
                        var fromTask = data[parentIndex].tasks[0];
                        var daysDiff = utils.difference(vm.model.from, fromTask.to, 'days');
                        var str = parentIndex + "FS";

                        if (utils.isPositiveLag(daysDiff) > 0) {
                            return str + " +" + daysDiff + " d";
                        } else {
                            if (utils.isPositiveLag(daysDiff) < 0) {
                                return str + " "+ daysDiff + " d";
                            }
                        }

                        return parentIndex + "FS";
                    });

                   predecessors.data.predecessors = totalDays.join(";");
                }
            };
        };


        return Resize;
    }]);
;
