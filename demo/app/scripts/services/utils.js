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

            this.difference = function getDifference(dateOne, dateTwo, type) {
                return dateOne.diff(dateTwo, type)
            };

            this.isBetween = function(model, dateTwo) {
                return dateTwo.isBetween(model.from, model.to);
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
       }


        return Utils;
    }]);
;
