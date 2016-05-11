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
            this.fromTask = fromTask || dependency.getFromTask().model;
            this.toTask = toTask || dependency.getToTask().model;
            this.toTaskObj = null;

            /**
             * Update duration of only one task
             * @param  {[Date]} dateOne [from value]
             * @param  {[Date]} dateTwo [to value]
             * @return {[String]}         [string with days]
             */
            this.updateDuration = function(dateOne, dateTwo) {
                var days = utils.difference(dateOne, dateTwo, 'days');
                return days + " d";
            };


            /**
             * Add to task days
             * @param {[Task]} toTask  [To task to add]
             * @param {[Date]} dateOne [Date from task]
             * @param {[Date]} dateTwo [Date to task]
             */
            this.add = function(toTask, dateOne, dateTwo) {
                var dates = utils.difference(dateOne, dateTwo, 'ms');
                toTask.add(dates, 'ms');
            };

            /**
             * Set all date values
             * @param {[Date]} date [optional value]
             */
            this.setValues = function(date) {
                var fromTask = date || this.fromTask.to;
                this.add(this.toTask.to, fromTask, this.toTask.from);
                this.toTask.from = angular.copy(fromTask);

                if(utils.difference(this.fromTask.to, this.toTask.from, 'days') === 0) {
                    this.toTask.from.add(1, 'days');
                    this.toTask.to.add(1, 'days');
                }

                // Test if values are at the weekend
                var task = utils.setMonday(this.toTask);
                this.toTask.from = task.from;
                this.toTask.to = task.to;
            }

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

               function getString(idx, days) {
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

               function setText(data, idx, days, move) {


                   if (!data.predecessors) {
                       data.predecessors = getString(idx, days);

                   } else {
                       var pred = utils.getPredecessorsValues(data.predecessors);
                       var _indexParent = pred.parent.indexOf(idx);
                       console.log(_indexParent);
                       if (_indexParent === -1) {
                          pred.parent.push(idx);
                          pred.days.push(days);
                       } else {
                            pred.days[_indexParent] = diff;
                       }

                       data.predecessors = pred.parent.map(function(value, index) {
                           return getString(value, pred.days[index]);
                       }).join(";");
                   }
               }
            };

            /**
             * Set and update all tasks dependencies
             * @param {[Array of tasks]} data [Tasks values]
             * @param {[Api events]} api  [Container of all api events]
             */
            this.setDate = function(data, api, update) {
                var self = this;
                if (utils.sameDependencies(this.fromTask, this.toTask)) {
                    return;
                }

                var greater = utils.greaterThan(this.fromTask.to, this.toTask.from);
                if (greater >= 0) {
                    var fromIdx = utils.getIndexTask(data, this.fromTask);
                    var toIdx = utils.getIndexTask(data, this.toTask);

                    if (utils.hasPredecessors(data[toIdx])) {
                        var predecessors = utils.getPredecessorsValues(data[toIdx].data.predecessors);
                        this.setLag(predecessors, fromIdx);
                    } else {
                        this.setValues();
                    }

                    setPredecessor(data, this.fromTask, this.toTask);

                } else {
                    // update lag value from childs
                    setPredecessor(data, this.fromTask, this.toTask, true);
                }

                api.columns.generate();
            };

            this.setLag = function(arrayPred, fromIdx) {
                var idx = arrayPred.parent.indexOf(fromIdx);
                var lag = arrayPred.days[idx];

                var fromTsk = angular.copy(this.fromTask);
                var toTsk = angular.copy(this.toTask);

                if (lag < 0) {
                    lag = Math.abs(lag);
                    fromTsk.to.subtract(lag, 'days');
                    var newDate = angular.copy(toTsk);

                    var days = Math.abs(utils.difference(toTsk.from, toTsk.to, 'days'));

                    toTsk.from = angular.copy(fromTsk.to);

                    console.log(lag);
                    toTsk.to.add(lag, 'days');

                    var newDays = Math.abs(utils.difference(toTsk.from, toTsk.to, 'days'));

                    console.log(newDays - days);

                    toTsk.to.subtract(newDays - days, 'days');

                    var tsk = utils.setMonday(toTsk);
                    this.toTask.from = tsk.from;
                    this.toTask.to = tsk.to;


                } else {
                    this.setValues();
                }

            };

            /**
             * Return task has dependencies
             * @return {[Boolean]}
             */
            this.gotDependencies = function() {
                return (this.toTask.dependencies)?
                        this.toTask.dependencies.length > 0 :
                        false ;
            };

            /**
             * Update all Dependencies
             * @param  {[Array]} data [Array of tasks]
             * @param  {[API]} api  [Api events]
             */
            this.updateChildTasks = function updateDate(data, api) {
                if(this.gotDependencies()) {
                    for(var i = 0; i < this.toTask.dependencies.length; i++) {
                        var toTask = utils.findTask(data, this.toTask.dependencies[i]);
                        if(!utils.sameDependencies(this.toTask, toTask)) {
                            var dependency = new Dependencies(null, this.toTask, toTask);
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
            this.removeDependencies = function(data, api) {
                var _lag = this.getLag(data, this.fromTask, this.toTask);
                var index = utils.getIndexTask(data, this.toTask);
                var arr = data[index].data.predecessors.split(";");

                data[index].data.predecessors = removeFromArray(arr, _lag.fromTaskIdx).join(";");
                /**
                 * Search for index of removed task
                 */
                function removeFromArray(arr, str) {
                    for(var i = 0; i < arr.length; i++) {
                        if(arr[i].indexOf(str) >= 0) {
                            arr.splice(i, 1);
                        }
                    }

                    return arr;
                }
            };
        };

        return Dependencies;
    }]);
;
