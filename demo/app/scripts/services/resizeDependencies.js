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
        var resize      = this;

        resize.task     = task;
        resize.model    = task.model;
        /**
        * Update all task dependencies
        * @param  {[Array]} data [Array of taks]
        * @param  {[API]} api  [Api events]
        * @return {[type]}      [description]
        */
        resize.updateDependencies = function(data, api) {

            var task = resize.updateDuration(data);
            if (resize.model.dependencies) {
            // update model values from weekend updates
                resize.model = angular.copy(task);
                for(var i = 0; i < resize.model.dependencies.length; i++) {
                    var toTask = utils.findTask(data, resize.model.dependencies[i]);
                    var dependencies = new Dependencies(null, resize.model, toTask);
                    dependencies.setDate(data, api, true);
                    dependencies.updateChildTasks(data, api);
                }

                return;
            }

            if (!resize.model.isMilestone) {
                var task = utils.setMonday(resize.task.model);
                resize.model.from = task.from;
                resize.model.to = task.to;
            }

            resize.updatePredecessors(data);
            api.columns.generate();
        };

        /**
        * Update Task duration column
        * @param  {[Array]} data [Array of taks]
        * @return {[Task]}
        */
        resize.updateDuration = function(data) {
            var task = utils.setMonday(resize.model);

            // Warning: resize.model lose references
            var taskIndex = utils.getIndexTask(data, resize.model);
            data[taskIndex].tasks[0] = angular.copy(task);

            data[taskIndex].data.duration = Math.abs(utils.difference(resize.model.from, resize.model.to, 'days')) + " d";

            return task;
        };

        /**
        * Update all lag columns values
        * @param  {[Array]} _allPred [Array of predecessors values]
        * @param  {[Array]} data     [description]
        * @param  {[Taks]} model    [description]
        * @return {[Array]} Array of strings
        */
        resize.updatePredecessors = function(data) {
            var vm = resize;

            if (resize.task.row.model.data && resize.task.row.model.data.predecessors) {
                var rowData = resize.task.row.model.data;
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
