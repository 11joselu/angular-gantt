  'use strict';

  var module = angular.module('angularGanttDemoApp');

  module
  .factory('Utils', [Utils]);

  function Utils() {
    /*All utils functions*/
    var Utils = function() {
      var util        = this;

      util.DAY        = 1;
      util.SATURDAY   = 6;
      util.SUNDAY     = 0;

      /**
       * Comparation between dates
       * @param  {[Date]} dateOne
       * @param  {[Date]} dateTwo
       * @return {[Number]}
       */
       util.greaterThan = function greaterThan(to, frm) {

            if(to.diff(frm) > 0) {
                  return 1;
            } else {
                if(to.diff(frm) === 0) {
                    return 0;
                }
            }

            return -1;
        };

        /**
         * Get Predecessors column values
         * @param  {[Integer]} idx  [description]
         * @param  {[Integer]} days [description]
         * @return {[String]}      String concatenate values
         */
        util.getString = function (idx, days) {
            var str = idx .toString();
            if (days > 0) {
                str += "FS +" + days + "d";
            } else {
                if (days < 0) {
                    str += "FS " + days + "d";
                }
            }

            return str;
        };

      /**
       * Detect if fromTask and ToTask has bi-directional dependencies
       * @param  {[Task]} fromTask
       * @param  {[Task]} toTask
       * @return {[Boolean]}
       */
        util.sameDependencies = function(fromTask, toTask) {

            if (toTask.dependencies && toTask.dependencies.length > 0) {
                for(var i = 0; i < toTask.dependencies.length; i++) {
                    var depend = toTask.dependencies[i];
                    if (depend.to === fromTask.name) {
                        toTask.dependencies.splice(i, 1);
                        return true;
                    }
                }
            }

            return false;
        };

      /**
       * Deny on same hierarchy
       * @param dependency
       * @returns {boolean}
       */
        util.denyDropOnChild = function(dependency) {

            var model = dependency.task.model;
            var toTaskId = dependency.getToTaskId();
            var descendants = dependency.task.descendants;

            if (descendants) {
                return descendants.some(function(row, index) {
                    if (row.model.id === toTaskId || row.model.name === toTaskId) {
                        model.dependencies.splice(index, 1);
                        return true;
                    }

                    return false;
                });
            }

            return false;

        };


      /**
       * Comparation with lags
       * @param  {[type]}  lag
       * @return {Boolean}
       */
        util.isPositiveLag = function(lag) {
            if (lag > 0){
                return 1
            } else {
                if (lag < 0) {
                    return -1
                }
            }

            return 0;
        };

      /**
       * Difference between dates
       * @param  {[Date]} dateOne
       * @param  {[Date]} dateTwo
       * @param  {[String]} type    [Day, ms, s.. etc]
       * @return {[Milliseconds]}
       */
        util.difference = function getDifference(dateOne, dateTwo, type) {
            return dateOne.diff(dateTwo, type)
        };

      /**
       * Interval Dates
       * @param  {[Date]}  fromTask
       * @param  {[Task]}  Task
       * @return {Boolean} if Date is between dates
       */
        util.isBetween = function(fromTask, toTask) {
            return toTask.from.isBetween(fromTask.from, fromTask.to) || toTask.to.isBetween(fromTask.from, fromTask.to);
        };

      /**
       * Search for Task
       * @param  {[Array]} data [Array of tasks]
       * @param  {[type]} obj  [description]
       * @return {[type]}      [description]
       */
        util.findTask = function(data, obj) {
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

        util.findTaskGroup = function(data, dependency) {
            for(var i = 0; i < data.length; i++) {
                if (data[i].id === dependency.to) {
                    return data[i];
                }
            }
        };

      /**
       * Return index of Task
       * @param  {[Array]} data [Array of tasks]
       * @param  {[Task]} task [Task to search]
       * @return {[Integer]}
       */
        util.getIndexTask = function(data, task) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name && (data[i].name === task.name)) {
                    return i;
                }

                if (data[i].tasks) {
                    var childTask = data[i].tasks;
                    for(var j=0; j < childTask.length; j++) {
                        if(childTask[j].id === task.id || childTask[j].id === task) {
                            return i;
                        }
                    }
                }
            }

            return -1;
        };

      /**
       * Return predecessors values (days and index of parent)
       * @param  {[String]} predecessors
       * @return {[Object]}
       */
        util.getPredecessorsValues = function(pred) {
            var predecessors = pred.split(";");
            var days = predecessors.map(function(value) {
                var days = value.match(/[+|-]\d*/g, "");

                return  (days)? Number(days[0]) : 0;

            })
            .filter(function(value) {

                return value || value === 0;
            });

            var parent = predecessors.map(function(value) {
            var parent = value.replace(/\FS.*$/g, "");

                return Number(parent);
            })
            .filter(function(value) {

                return value;
            });

            return {
                days: days,
                parent: parent
            }

        };

        function getString(idx, days) {
            var str = idx .toString();
            if (days > 0) {
                str += "FS +" + days + "d";
            } else {
                if (days < 0) {
                    str += "FS -" + days + "d";
                }
            }

            return str;
        };

        /**
        * Return if task has predecessors
        * @param  {[Taks]}  task
        * @return {Boolean}
        */
        util.hasPredecessors = function(task) {
            return angular.isDefined(task.data) &&
                angular.isDefined(task.data.predecessors);
        };

      /**
       * Update Task only when from || to has weekend value
       * @param {[Task]} taskModel
       */
        util.setMonday = function(taskModel) {
            if (!taskModel.isMilestone) {
                var task = angular.copy(taskModel);
                if(util.isWeekend(task.from)) {

                    if(util.getWeekDay(task.from) === util.SATURDAY) {
                        task.to.add(2, 'days');
                        task.from.add(2, 'days');
                    } else {
                        task.to.add(1, 'days');
                        task.from.add(1, 'days');
                    }
                }

                if(util.isWeekend(task.to)) {
                    if(util.getWeekDay(task.to) === util.SATURDAY) {
                        task.to.add(2, 'days');
                    } else {
                        task.to.add(1, 'days');
                    }
                }

                var fromHours = util.getHours(task.from, 8);
                var toHours = util.getHours(task.to, 17);
                task.from = fromHours.date;
                task.to = toHours.date;

                return task;

            }

            return taskModel;
        };

        /**
        * Return day value
        * @param  {[Date]} date
        * @return {[Integer]}
        */
        util.getWeekDay = function(date) {
            return date.weekday();
        };

        /**
        * Return if Date is weekend
        * @param  {[Date]}  date
        * @return {Boolean}
        */
        util.isWeekend = function(date) {
            return  (util.getWeekDay(date) === util.SATURDAY) ||
                    (util.getWeekDay(date)  === util.SUNDAY);
        };

        util.isInArray = function(arr, search) {
            return ~arr.indexOf(search) ? true : false;
        };

        util.getHours = function(date, min) {
            var _date = angular.copy(date);
            var updated = false;
            var nextDay = angular.copy(date);
            nextDay.set('hours', min).set('minutes', 0).set('milliseconds', 0).add(1, 'days');

            var beforeDay = angular.copy(date);
            beforeDay.set('hours', min).set('minutes', 0).set('milliseconds', 0).subtract(1, 'day');

            var toNext = _date.diff(nextDay, 'hours');
            var toBefore = _date.diff(beforeDay, 'hours');

            if (Math.abs(toBefore) < Math.abs(toNext)) {
                _date.hour(min);
                _date.minutes(0);
                _date.milliseconds(0);
                updated = false;

            } else {
            // reset time
                _date.set('hours', min).set('minutes', 0).set('milliseconds', 0);
                updated = true;
            }

            return {
                date: _date,
                updated: updated
            }

        };

};


return Utils;
}

