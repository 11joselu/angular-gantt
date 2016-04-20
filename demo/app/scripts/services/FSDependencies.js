'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .factory('FSDependencies', ['Utils', function (Utils) {
        var utils = new Utils();

        var setLagValue = function(data, lag){
            var str = (lag.lag > 0)? " +" : " ";

            if (utils.isPositiveLag(lag.lag) == 0) {
                data[lag.toTaskIdx].data.predecessors = lag.fromTaskIdx + "FS";
                return;
            }

            data[lag.toTaskIdx].data.predecessors = lag.fromTaskIdx + "FS" + str + lag.lag + " d";
        };

        var Dependencies = function(dependency, fromTask, toTask) {
            this.fromTask = fromTask || dependency.getFromTask().model;
            this.toTask = toTask || dependency.getToTask().model;
            this.toTaskObj = null;

            this.add = function(toTask, dateOne, dateTwo) {
                var dates = utils.difference(dateOne, dateTwo, 'ms');
                toTask.add(dates, 'ms');
            };

            this.updateDuration = function(dateOne, dateTwo) {
                var days = utils.difference(dateOne, dateTwo, 'days');
                return days + " d";
            };

            this.getLag = function(data, fromTask, toTask) {
                var fromTaskIdx = utils.getIndexTask(data, this.fromTask);
                var toTaskIdx = utils.getIndexTask(data, this.toTask);
                var diff = utils.difference(toTask.from, fromTask.to, 'days');

                return {
                    fromTaskIdx: fromTaskIdx,
                    toTaskIdx: toTaskIdx,
                    lag: diff
                }
            };

            this.setValues = function(date) {
                var fromTask = date || this.fromTask.to;
                this.add(this.toTask.to, fromTask, this.toTask.from);
                this.toTask.from = angular.copy(fromTask);
            }

            this.setDate = function(data, api) {
                var greater = utils.greaterThan(this.fromTask.to, this.toTask.from);

                if(greater < 0 ) {
                    if (utils.isBetween(this.fromTask, this.toTask)) {
                        this.setValues();
                    }
                }

                if(greater > 0) {
                    var taskIndex = utils.getIndexTask(data, this.toTask);
                    var taskData = data[taskIndex].data;
                    var date = angular.copy(this.fromTask.to);

                    if(taskData.predecessors) {
                        var predecessors = utils.getPredecessorsValues(taskData.predecessors)
                        if(predecessors.days) {
                            var number = Number(predecessors.days[0]);
                            if(number < 0) {
                                date.subtract(Math.abs(number), 'days');
                            }

                        }
                    }

                    this.setValues(date);
                }

                var lag = this.getLag(data, this.fromTask, this.toTask);
                setLagValue(data, lag);

                api.columns.generate();
            };

            this.gotDependencies = function() {
                return (this.toTask.dependencies)?
                        this.toTask.dependencies.length > 0 :
                        false ;
            };

            this.updateChildTasks = function updateDate(data, api) {
                if(this.gotDependencies()) {
                    for(var i = 0; i < this.toTask.dependencies.length; i++) {
                        var toTask = utils.findTask(data, this.toTask.dependencies[i]);

                        var dependency = new Dependencies(null, this.toTask, toTask);
                        dependency.setDate(data, api);
                        dependency.updateChildTasks(data, api);
                    }
                }
            }


        };

        return Dependencies;
    }]);
;
