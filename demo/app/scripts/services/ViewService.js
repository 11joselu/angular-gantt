'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .factory('ViewService', [function () {
        var View = function (control, plan) {
            this.control = control;
            this.plan = plan;
            var controlCopy = angular.copy(this.control);
            var planCopy = angular.copy(this.plan);

            this.toControl = function() {
                return this.control;
            };

            this.toPlan = function() {
                for (var i = 0; i < controlCopy.length; i++) {
                    if (controlCopy[i].tasks) {
                        var tasks = controlCopy[i].tasks;

                        for (var j = 0; j < tasks.length; j++) {
                            for (var k = 0; k < planCopy.length; k++) {
                                if (tasks[j].name === planCopy[k].name) {
                                    tasks[j].from = planCopy[k].from;
                                    tasks[j].to = planCopy[k].to;
                                    planCopy.splice(k, 1);
                                    break;
                                }
                            }
                        }

                        controlCopy[i].dependencies = false;
                    }
                }

                return controlCopy;
            };
        }

        return View;
    }]);
;
