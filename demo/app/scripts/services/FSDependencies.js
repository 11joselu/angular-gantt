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
            var utils = new Utils();

            this.add = function(toTask, dateOne, dateTwo) {
                var dates = utils.difference(dateOne, dateTwo);
                toTask.add(dates, 'ms');
            };

            this.setDate = function() {
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
