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

        var Dependencies = function(dependency, fromTask, toTask) {
            this.fromTask = fromTask || dependency.getFromTask().model;
            this.toTask = toTask || dependency.getToTask().model;
            this.toTaskObj = null;

            var utils = new Utils();

            this.add = function(toTask, dateOne, dateTwo) {
                var dates = utils.difference(dateOne, dateTwo, 'ms');
                toTask.add(dates, 'ms');
            };

            this.calculateLag = function(dateOne, dateTwo) {
                return utils.difference(dateOne, dateTwo, 'days');
            };

            this.updateDuration = function(dateOne, dateTwo) {
                var days = utils.difference(dateOne, dateTwo, 'days');
                return days + " d";
            };

            this.setDate = function(api) {
                var greater = utils.greaterThan(this.fromTask.from, this.toTask.from);
                if (greater < 0) {
                    if (utils.isBetween(this.fromTask, this.toTask.from)) {
                        this.add(this.toTask.to, this.fromTask.to, this.toTask.from);
                        this.toTask.from = angular.copy(this.fromTask.to);
                    }

                } else {
                    // se está comiendo el
                    if(greater > 0) {
                        this.add(this.toTask.to, this.fromTask.to, this.toTask.from);
                        this.toTask.from = angular.copy(this.fromTask.to);
                    }

                }

                api.columns.generate();
            };

            this.gotDependencies = function() {
                return (this.toTask.dependencies)?
                        this.toTask.dependencies.length > 0 :
                        false ;
            };

            this.updateChildTasks = function updateDate(data) {
                if(this.gotDependencies()) {
                    for(var i = 0; i < this.toTask.dependencies.length; i++) {
                        var toTask = utils.findTask(data, this.toTask.dependencies[i]);

                        var dependency = new Dependencies(null, this.toTask, toTask);
                        dependency.setDate();
                        dependency.updateChildTasks(data);
                    }
                }
            }


        };


        return Dependencies;
    }]);
;
