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
         * Update task predecessors on resize or move event
         * @return {[type]} [description]
         */
        var updatePre = function(getAllPred, data, toTask) {
            return utils.updateAllLag(getAllPred, data, toTask)
        };

        /**
         * Set String to precedessors column
         * @param {[type]} data [array of all data task]
         * @param {[type]} lag  [is lag values]
         */
        var setLagValue = function(data, lag, update, toTask){

            var fromTaskIdx = lag.fromTaskIdx;
            var toTaskIdx = lag.toTaskIdx;
            var diff = lag.diff - utils.DAY;
            var _data = data[toTaskIdx].data;
            var _str = fromTaskIdx + "FS";
            var _endStr = "", _sp = "";

            if (_data.predecessors) {
                var getAllPred = utils.getPredecessorsValues(_data.predecessors);

                if (utils.isInArray(getAllPred.parent, fromTaskIdx)) {
                    if (update) {
                        var days = updatePre(getAllPred, data, toTask);
                        _data.predecessors = days.join(";");
                    }
                    return;
                } else {
                    _sp = ";";
                }
            }



            if (diff > 0) {
                _endStr = " +" + diff + "d";
            } else {
                if (diff < 0) {
                    _endStr = "" + diff + "d";
                }
            }

            _data.predecessors = (_data.predecessors) ? _data.predecessors : "";
            _data.predecessors += _sp + _str + _endStr;
        };


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
             * Return index of predecessors and parent dependencies
             * @param  {[Array of Objects]} data     [All taks data]
             * @param  {[Task]} fromTask [From task dependencies]
             * @param  {[Task]} toTask   [To task dependencies]
             * @return {[Object]}  Object
             */
            this.getLag = function(data, fromTask, toTask) {
                var fromTaskIdx = utils.getIndexTask(data, this.fromTask);
                var toTaskIdx = utils.getIndexTask(data, this.toTask);
                var diff = utils.difference(toTask.from, fromTask.to, 'days');

                return {
                    fromTaskIdx: fromTaskIdx,
                    toTaskIdx: toTaskIdx,
                    diff: diff
                }
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

            /**
             * Set and update all tasks dependencies
             * @param {[Array of tasks]} data [Tasks values]
             * @param {[Api events]} api  [Container of all api events]
             */
            this.setDate = function(data, api, update) {

               if(!utils.sameDependencies(this.fromTask, this.toTask)) {
                    var greater = utils.greaterThan(this.fromTask.to, this.toTask.from);
                    if(greater < 0 ) {
                        // Move toTask at the end of fromTask
                        if (utils.isBetween(this.fromTask, this.toTask)) {
                            this.setValues();
                        }
                    }

                    if(greater > 0) {
                        var taskIndex = utils.getIndexTask(data, this.toTask);
                        var taskData = data[taskIndex].data;
                        var date = angular.copy(this.fromTask.to);
                        // Allow negatives lag
                        if(taskData.predecessors) {
                            var predecessors = utils.getPredecessorsValues(taskData.predecessors)
                            if(predecessors.days) {
                                var number = Number(predecessors.days[0]);
                                // Only add lag with negative numbers.
                                if(number < 0) {
                                    date.subtract(Math.abs(number), 'days');
                                }

                            }
                        }
                        // Set new Date of task with lags
                        this.setValues(date);
                    }

                    // set lag values
                    var lag = this.getLag(data, this.fromTask, this.toTask);
                    setLagValue(data, lag, update, this.toTask);
               }
                    // update tree table
                    api.columns.generate();
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
