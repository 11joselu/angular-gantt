'use strict';

/**
 * @ngdoc service
 * @name angularGanttDemoApp.Sample
 * @description
 * # Sample
 * Service in the angularGanttDemoApp.
 */
angular.module('angularGanttDemoApp')
    .factory('ResizeDependencies', ['FSDependencies', 'Utils', function (Dependencies, Utils) {
        var utils = new Utils();

        var Resize = function(task) {
          this.task = task;
          this.model = task.model;
          /**
           * Update all task dependencies
           * @param  {[Array]} data [Array of taks]
           * @param  {[API]} api  [Api events]
           * @return {[type]}      [description]
           */
          this.updateDependencies = function(data, api) {
            var task = this.updateDuration(data);
            if (this.model.dependencies) {
              // update model values from weekend updates
              this.model = angular.copy(task);
              for(var i = 0; i < this.model.dependencies.length; i++) {
                var toTask = utils.findTask(data, this.model.dependencies[i]);
                var dependencies = new Dependencies(null, this.model, toTask);
                dependencies.setDate(data, api, true);
                dependencies.updateChildTasks(data, api);
              }

              return;
            }

            var task = utils.setMonday(this.task.model);
            this.task.model.from = task.from;
            this.task.model.to = task.to;
            api.columns.generate();
          };

          /**
           * Update Task duration column
           * @param  {[Array]} data [Array of taks]
           * @return {[Task]}
           */
          this.updateDuration = function(data) {
            var task = utils.setMonday(this.model);

            // Warning: this.model lose references
            var taskIndex = utils.getIndexTask(data, this.model);
            data[taskIndex].tasks[0] = angular.copy(task);

            data[taskIndex].data.duration = Math.abs(utils.difference(this.model.from, this.model.to, 'days')) + " d";
            this.updatePredecessors(data, taskIndex);

            return task;
          };

          /**
           * Update all tasks predecessors values
           * @param  {[Array]} data [Array of taks]
           * @param  {[Integer]} index [index of tasks]
           * @return {[String]} all predecessors values
           */
          this.updatePredecessors = function(data, index) {
            var vm = this;

            if(utils.hasPredecessors(data[index])) {
              var predecessors = data[index];
              // Get predecessors values
              var days = utils.getPredecessorsValues(predecessors.data.predecessors);

              var totalDays = days.parent.map(function(parentIndex) {
                var fromTask = data[parentIndex].tasks[0];
                var daysDiff = utils.difference(vm.model.from, fromTask.to, 'days');
                var str = parentIndex + "FS";

                if (utils.isPositiveLag(daysDiff) > 0) {
                  var days = daysDiff - utils.DAY;
                  if (days > 0 ) {
                    return str + "+" + days + " d;";
                  } else {
                    return str;
                  }
                } else {
                  if (utils.isPositiveLag(daysDiff) < 0) {
                    return str + daysDiff + " d;";
                  }
                }

                return str;
              });

              predecessors.data.predecessors = totalDays.join(";");
            }
          };
        };



        return Resize;
    }]);
;
