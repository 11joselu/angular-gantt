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

    /**
    * Constructor of task dependencias
    * @param {[Dependency]} dependency [dependency event values]
    * @param {[Task]} fromTask   [depend only in case resize or move]
    * @param {[Task]} toTask     [depend only in case resize or move]
    */
    var Dependencies = function(dependency, fromTask, toTask) {
        var dep = this;
        dep.fromTask = fromTask || dependency.getFromTask().model;
        dep.toTask = toTask || dependency.getToTask().model;
        dep.toTaskObj = null;

        /**
        * Update duration of only one task
        * @param  {[Date]} dateOne [from value]
        * @param  {[Date]} dateTwo [to value]
        * @return {[String]}         [string with days]
        */
        dep.updateDuration = function(dateOne, dateTwo) {
            var days = utils.difference(dateOne, dateTwo, 'days');
            return days + " d";
        };


        /**
        * Add to task days
        * @param {[Task]} toTask  [To task to add]
        * @param {[Date]} dateOne [Date from task]
        * @param {[Date]} dateTwo [Date to task]
        */
        dep.add = function(toTask, dateOne, dateTwo) {
            var dates = utils.difference(dateOne, dateTwo, 'ms');
            toTask.add(dates, 'ms');
        };

        /**
        * Set all date values
        * @param {[Date]} date [optional value]
        */
        dep.setValues = function(date) {
            var fromTask = date || dep.fromTask.to;
            dep.add(dep.toTask.to, fromTask, dep.toTask.from);
            dep.toTask.from = angular.copy(fromTask);

            if(utils.difference(dep.fromTask.to, dep.toTask.from, 'days') === 0) {
                dep.toTask.from.add(1, 'days');
                dep.toTask.to.add(1, 'days');
            }

            // Test if values are at the weekend
            var task = utils.setMonday(dep.toTask);
            dep.toTask.from = task.from;
            dep.toTask.to = task.to;
        }


        /**
         * Set predecessors columns
         * @param {[type]} data       [Array data]
         * @param {[Task]} fromTask
         * @param {[Task]} toTask
         * @param {[Boolean} parentMove
         */
        var setPredecessor = function(data, fromTask, toTask, parentMove) {

            var toIndex = utils.getIndexTask(data, fromTask);
            var idx = utils.getIndexTask(data, toTask);

            var diff = utils.difference(toTask.from, fromTask.to, 'days');

            if (diff > 0) {
                diff -= 1;
            }

            if (parentMove) { diff = Math.abs(diff) }

            // data[idx].data.predecessors = idx;
            setText(data[idx].data, toIndex, diff, parentMove);

            /**
             * Set text for ToTask
             */
            function setText(data, idx, days, move) {

                if (!data.predecessors) {
                    data.predecessors = utils.getString(idx, days);

                } else {
                    var pred = utils.getPredecessorsValues(data.predecessors);
                    var _indexParent = pred.parent.indexOf(idx);

                    if (_indexParent === -1) {
                        pred.parent.push(idx);
                        pred.days.push(days);
                    } else {
                        pred.days[_indexParent] = diff;
                    }

                    data.predecessors = pred.parent.map(function(value, index) {
                        return utils.getString(value, pred.days[index]);
                    })
                    .join(";");
                }
            }
        };

        /**
        * Set and update all tasks dependencies
        * @param {[Array of tasks]} data [Tasks values]
        * @param {[Api events]} api  [Container of all api events]
        */
        dep.setDate = function(data, api, taskGroups) {
            // Test if toTask is TaskGroup
            if (angular.isUndefined(taskGroups)) {
                taskGroups = (dep.toTask.children && dep.toTask.children.length > 0);
            }

            var self = dep;
            if (utils.sameDependencies(dep.fromTask, dep.toTask)) {
                return;
            }

            if (!taskGroups) {
                var greater = utils.greaterThan(dep.fromTask.to, dep.toTask.from);
                if (greater >= 0) {
                    var fromIdx = utils.getIndexTask(data, dep.fromTask);
                    var toIdx = utils.getIndexTask(data, dep.toTask);

                    if (utils.hasPredecessors(data[toIdx])) {
                        var predecessors = utils.getPredecessorsValues(data[toIdx].data.predecessors);
                        dep.setLag(predecessors, fromIdx);
                    } else {
                        dep.setValues();
                    }

                    setPredecessor(data, dep.fromTask, dep.toTask);

                }
            }

            setPredecessor(data, dep.fromTask, dep.toTask, true);
            api.columns.generate();
        };

        /**
         * Set lag difference for every task
         * @param {[Array of string]} arrayPred
         * @param {[Integer]} fromIdx
         */
        dep.setLag = function(arrayPred, fromIdx) {
            var idx = arrayPred.parent.indexOf(fromIdx);
            var lag = arrayPred.days[idx];

            var fromTsk = angular.copy(dep.fromTask);
            var toTsk = angular.copy(dep.toTask);

            if (lag < 0) {
                lag = Math.abs(lag);
                fromTsk.to.subtract(lag, 'days');
                var newDate = angular.copy(toTsk);

                var days = Math.abs(utils.difference(toTsk.from, toTsk.to, 'days'));

                toTsk.from = angular.copy(fromTsk.to);

                toTsk.to.add(lag, 'days');

                var newDays = Math.abs(utils.difference(toTsk.from, toTsk.to, 'days'));

                // if Parent dependencies has no updated (reset hours)
                // restore same From-Task date
                toTsk.to.subtract(newDays - days, 'days');

                var tsk = utils.setMonday(toTsk);
                dep.toTask.from = tsk.from;
                dep.toTask.to = tsk.to;


            } else {
                dep.setValues();
            }

        };

        /**
        * Return task has dependencies
        * @return {[Boolean]}
        */
        dep.gotDependencies = function() {
            return (dep.toTask.dependencies)?
                dep.toTask.dependencies.length > 0 :
                false ;
        };

        /**
        * Update all Dependencies
        * @param  {[Array]} data [Array of tasks]
        * @param  {[API]} api  [Api events]
        */
        dep.updateChildTasks = function updateDate(data, api) {
            if(dep.gotDependencies()) {
                for(var i = 0; i < dep.toTask.dependencies.length; i++) {
                    var toTask = utils.findTask(data, dep.toTask.dependencies[i]);
                    if(!utils.sameDependencies(dep.toTask, toTask)) {
                        var dependency = new Dependencies(null, dep.toTask, toTask);
                        dependency.setDate(data, api);
                        dependency.updateChildTasks(data, api);
                    }
                }
            }
        };

        /**
        * Remove index of task at predecessors columns
        * @param  {[Array of tasks]} data
        * @param  {[API]} api  [Api events]
        */
        dep.removeDependencies = function(data, api) {
            var fromIndex = utils.getIndexTask(data, dep.fromTask);
            var toIndex = utils.getIndexTask(data, dep.toTask);

            var pred = utils.getPredecessorsValues(data[toIndex].data.predecessors);

            var predIndex = pred.parent.indexOf(fromIndex);
            pred.parent.splice(predIndex, 1);
            pred.days.splice(predIndex, 1);

            data[toIndex].data.predecessors = pred.parent.map(function(value, index) {
                return utils.getString(value, pred.days[index]);
            })
            .join(";");

            api.columns.generate();

        };
    };

    return Dependencies;
}]);
