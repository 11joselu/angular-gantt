  'use strict';

  var module = angular.module('angularGanttDemoApp');

  module
    .factory('Utils', [Utils]);

   function Utils() {
    /*All utils functions*/
    var Utils = function() {
      this.DAY        = 1;
      this.SATURDAY   = 6;
      this.SUNDAY     = 0;
      /**
       * Comparation between dates
       * @param  {[Date]} dateOne
       * @param  {[Date]} dateTwo
       * @return {[Number]}
       */
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

      /**
       * Detect if fromTask and ToTask has bi-directional dependencies
       * @param  {[Task]} fromTask
       * @param  {[Task]} toTask
       * @return {[Boolean]}
       */
      this.sameDependencies = function(fromTask, toTask) {
        if (toTask.dependencies && toTask.dependencies.length > 0) {
          for(var i = 0; i < toTask.dependencies.length; i++) {
            var depend = toTask.dependencies[i];
            if(depend.to === fromTask.name) {
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
     this.denyDropOnChild = function(dependency) {
        var fromTask = dependency.getFromTask();
        var toTask = dependency.getToTaskId();

        for (var i = 0; i < fromTask.tasks.length; i++) {
            if (fromTask.tasks[i].model.id === toTask) {
                return true;
            }
        }

        for (var i = 0; i < fromTask.descendants.length; i++ ){
            if (fromTask.descendants[i].model.id === toTask) {
                return true;
            }
        }

        return false;

     };


      /**
       * Comparation with lags
       * @param  {[type]}  lag
       * @return {Boolean}
       */
      this.isPositiveLag = function(lag) {
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
      this.difference = function getDifference(dateOne, dateTwo, type) {
        return dateOne.diff(dateTwo, type)
      };

      /**
       * Interval Dates
       * @param  {[Date]}  fromTask
       * @param  {[Task]}  Task
       * @return {Boolean} if Date is between dates
       */
      this.isBetween = function(fromTask, toTask) {
        return toTask.from.isBetween(fromTask.from, fromTask.to) || toTask.to.isBetween(fromTask.from, fromTask.to);
      };

      /**
       * Search for Task
       * @param  {[Array]} data [Array of tasks]
       * @param  {[type]} obj  [description]
       * @return {[type]}      [description]
       */
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

      /**
       * Return index of Task
       * @param  {[Array]} data [Array of tasks]
       * @param  {[Task]} task [Task to search]
       * @return {[Integer]}
       */
      this.getIndexTask = function(data, task) {
        for (var i = 0; i < data.length; i++) {

          if (data[i].name && (data[i].name === task.name)) {
            return i;
          }

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

      /**
       * Return predecessors values (days and index of parent)
       * @param  {[String]} predecessors
       * @return {[Object]}
       */
      this.getPredecessorsValues = function(pred) {
        // var days = pred.match(/[\+|\-]\d*/g);
            var predecessors = pred.split(";");
            var days = predecessors.map(function(value) {
              var days = value.match(/[+|-]\d*/g, "");
              return  (days)? Number(days[0]) : 0;
            }).filter(function(value) {
              return value || value === 0;
            });

            var parent = predecessors.map(function(value) {
              var parent = value.replace(/\FS.*$/g, "");
              return Number(parent);
            }).filter(function(value) {
              return value;
            });

            return {
              days: days,
              parent: parent
            }

      };

      /**
       * Update all lag columns values
       * @param  {[Array]} _allPred [Array of predecessors values]
       * @param  {[Array]} data     [description]
       * @param  {[Taks]} model    [description]
       * @return {[Array]} Array of strings
       */
      this.updateAllLag = function(_allPred, data, model) {
         var self = this;
         return _allPred.parent.map(function(parentIndex) {
            var _str = parentIndex + "FS";
            var _endStr = "", _sp = "";
            var fromTask = (data[parentIndex].tasks) ?
                            data[parentIndex].tasks[0] :
                            data[parentIndex];

            var diff = self.difference(model.from, fromTask.to, 'days');
            if (diff > 0) {
                _endStr = " +" + diff + "d";
            } else {
                if (diff < 0) {
                    _endStr = "" + diff + "d";
                }
            }

            return  _sp + _str + _endStr;
         });
      }

      /**
       * Return if task has predecessors
       * @param  {[Taks]}  task
       * @return {Boolean}
       */
      this.hasPredecessors = function(task) {
        return angular.isDefined(task.data) &&
          angular.isDefined(task.data.predecessors);
      };

      /**
       * Update Task only when from || to has weekend value
       * @param {[Task]} taskModel
       */
      this.setMonday = function(taskModel) {
        var task = angular.copy(taskModel);
        if(this.isWeekend(task.from)) {

          if(this.getWeekDay(task.from) === this.SATURDAY) {
            task.to.add(2, 'days');
            task.from.add(2, 'days');
          } else {
            task.to.add(1, 'days');
            task.from.add(1, 'days');
          }
        }

        if(this.isWeekend(task.to)) {
          if(this.getWeekDay(task.to) === this.SATURDAY) {
            task.to.add(2, 'days');
          } else {
            task.to.add(1, 'days');
          }
        }

        this.getHours(task.from, 8);
        this.getHours(task.to, 17);

        return task;
      };

      /**
       * Return day value
       * @param  {[Date]} date
       * @return {[Integer]}
       */
      this.getWeekDay = function(date) {
        return date.weekday();
      };

      /**
       * Return if Date is weekend
       * @param  {[Date]}  date
       * @return {Boolean}
       */
      this.isWeekend = function(date) {
        return  (this.getWeekDay(date) === this.SATURDAY) ||
          (this.getWeekDay(date)  === this.SUNDAY);
      };

      this.isInArray = function(arr, search) {
        return ~arr.indexOf(search) ? true : false;
      };

      // TO DO
      this.getHours = function(date, min) {

        var nextDay = angular.copy(date);
        nextDay.set('hours', min).set('minutes', 0).set('milliseconds', 0).add(1, 'days');

        var beforeDay = angular.copy(date);
            beforeDay.set('hours', min).set('minutes', 0).set('milliseconds', 0).subtract(1, 'day');

        var toNext = date.diff(nextDay, 'hours');
        var toBefore = date.diff(beforeDay, 'hours');

        if (Math.abs(toBefore) < Math.abs(toNext)) {
            date.hour(min);
            date.minutes(0);
            date.milliseconds(0);
        } else {
            date.set('hours', min).set('minutes', 0).set('milliseconds', 0)
        }

        return date;
      };

    };


    return Utils;
  }

