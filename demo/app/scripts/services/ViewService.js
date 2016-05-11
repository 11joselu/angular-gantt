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
        /**
         * View controller class
         * @param {[type]} control [description]
         * @param {[type]} plan    [description]
         */
        var View = function (control, plan) {
            var view        = this;

            view.control    = angular.copy(control);
            view.plan       = angular.copy(plan);

            var isMilestone = function(obj) {
                return moment(obj.from).diff(obj.to) === 0;
            };

            /**
             * Concat all planed task to Control task
             * @return {[type]} [description]
             */
            view.concat = function() {

                for (var i = 0; i < view.plan.length; i++) {
                    if (plan[i].tasks) {
                        var tasks = plan[i].tasks;
                        for (var j = 0;  j < tasks.length; j++) {
                                view.control[i].tasks[j].base = {
                                    from: tasks[j].from,
                                    to: tasks[j].to,
                                    classes: isMilestone(tasks[j])? ['task-milestone-planned', 'task-base-milestone'] : []
                                }
                        }
                    }
                }
            };

            /**
             * Return concatenated array
             * @return {[type]} [description]
             */
            view.getConcatenated = function() {
                return view.control;
            }
        }

        return View;
    }]);
;
