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
            this.control = angular.copy(control);
            this.plan = angular.copy(plan);

            var isMilestone = function(obj) {
                return moment(obj.from).diff(obj.to) === 0;
            };

            this.concat = function() {

                for (var i = 0; i < this.plan.length; i++) {
                    if (plan[i].tasks) {
                        var tasks = plan[i].tasks;
                        for (var j = 0;  j < tasks.length; j++) {

                            if (isMilestone(tasks[j])) {
                                tasks[j].movable = false;
                                // this.control[i].tasks.push(tasks[j]);
                                break;
                            } else {
                                this.control[i].tasks[j].base = {
                                    from: tasks[j].from,
                                    to: tasks[j].to
                                }
                            }
                        }
                    }
                }
            };

            this.getConcatenated = function() {
                return this.control;
            }
        }

        return View;
    }]);
;
