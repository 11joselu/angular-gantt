'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .factory('FSDependencies', function () {

        var Dependencies = function(dependency, fromTask, toTask) {
            this.fromTask = fromTask || dependency.getFromTask().model;
            this.toTask = toTask || dependency.getToTask().model;

            this.greaterThan = function greaterThan(dateOne, dateTwo) {

                if(dateOne.diff(dateTwo) > 0) {
                    return 1;
                } else {
                    if(dateOne.diff(dateTwo) === 0) {
                        return 0;
                    }
                }

                return -1;
            };

            this.difference = function getDifference(dateOne, dateTwo) {
                return dateOne.diff(dateTwo, 'days')
            };


            this.setDate = function() {
                var greater = this.greaterThan(this.fromTask.from, this.toTask.from);

                if (greater < 0) {
                    var diff = this.difference(this.toTask.from, this.fromTask.to);
                    this.toTask.from = angular.copy(this.fromTask.to);
                    this.toTask.to.subtract(diff, 'days');

                } else {

                    if(greater > 0) {
                        var diff = this.difference(this.fromTask.to, this.toTask.from);
                        this.toTask.from = angular.copy(this.fromTask.to);
                        this.toTask.to.add(diff, 'days');
                    }

                }
            };

            this.gotDependencies = function() {
                return (this.toTask.dependencies)?
                        this.toTask.dependencies.length > 0 :
                        false ;
            };

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

            this.updateChildTasks = function updateDate(data) {
                if(this.gotDependencies()) {
                    for(var i = 0; i < this.toTask.dependencies.length; i++) {
                        var toTask = this.findTask(data, this.toTask.dependencies[i]);

                        var dependency = new Dependencies(null, this.toTask, toTask);
                        dependency.setDate();
                        dependency.updateChildTasks(data);
                    }
                }
            }


        };


        return Dependencies;
    });
;
