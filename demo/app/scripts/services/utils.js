'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .factory('Utils', [function () {

       var Utils = function() {
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

            this.isPositiveLag = function(lag) {
                if (lag > 0){
                    return 1
                } else {
                    if (lag < 0) {
                        return -1
                    }
                }

                return 0;
            }

            this.difference = function getDifference(dateOne, dateTwo, type) {
                return dateOne.diff(dateTwo, type)
            };

            this.isBetween = function(fromTask, toTask) {
                return toTask.from.isBetween(fromTask.from, fromTask.to) || toTask.to.isBetween(fromTask.from, fromTask.to);
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
            };

            this.getIndexTask = function(data, task) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].tasks) {
                        var childTask = data[i].tasks;
                        for(var j=0; j < childTask.length; j++) {

                            if(childTask[j].id === task.id) {
                                return i;
                            }
                        }
                    }
                }
            };

            this.getPredecessorsValues = function(predecessors) {
                var days = predecessors.match(/[\+|\-]\d*/g);
                var parent = predecessors.match(/[0-9]*\FS/g).map(function(str) {
                    return Number(str.substr(0, str.indexOf("FS")));
                });

                return {
                    days: days,
                    parent: parent
                }
            };

            this.hasPredecessors = function(task) {
                return angular.isDefined(task.data) &&
                        angular.isDefined(task.data.predecessors);
            }
       }


        return Utils;
    }]);
;
