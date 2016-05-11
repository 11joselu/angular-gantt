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

            if (!this.model.isMilestone) {
               /* var task = utils.setMonday(this.task.model);
                this.model.from = task.from;
                this.model.to = task.to;*/
            }

            this.updatePredecessors(data);
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
              return task;
          };

          /**
           * Update all lag columns values
           * @param  {[Array]} _allPred [Array of predecessors values]
           * @param  {[Array]} data     [description]
           * @param  {[Taks]} model    [description]
           * @return {[Array]} Array of strings
           */
          this.updatePredecessors = function(data) {
             var vm = this;

             if (this.task.row.model.data && this.task.row.model.data.predecessors) {
                 var rowData = this.task.row.model.data;
                 var pred = utils.getPredecessorsValues(rowData.predecessors);

                 var arr = pred.parent.map(function(value, index) {
                     var fromTasks = data[value];

                     if (fromTasks.tasks) {
                        var fromTask = fromTasks.tasks[0];
                        var diff = utils.difference(fromTask.to, vm.model.from, 'days');

                        if (diff < 0) {
                            diff = Math.abs(diff)
                        } else {
                            diff = -diff;
                        }

                        pred.days[index] = diff;

                        return utils.getString(value, pred.days[index]);
                     }
                 });

                 rowData.predecessors = arr.join(";");

             }
          };
        };



        return Resize;
    }]);
;
