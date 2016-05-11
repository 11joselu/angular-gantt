  'use strict';

var module = angular.module('angularGanttDemoApp');

module.factory('Linker', ['Utils', 'FSDependencies', Linker]);

/**
 * Linker class
 */
function Linker(Utils, Dependencies) {
    var utils = new Utils();

    var Linker = function(data, api) {
        var link    = this;

        link.data   = data;
        link.api    = api;

        /**
         * Link all array task to first selected task
         * @param  {[Array of tasks]} links
         * @return Array of tasks
         */
        link.linkTaks = function(links) {
            if (links.length === 0) { return []};

            var fromTask = links[0];

            if (fromTask) {
                if (!fromTask.model.dependencies) {
                    fromTask.model.dependencies = [];
                }

                // removeClasses(fromTask);

                for (var i = 1; i < links.length; i++) {

                    if (!isIn(fromTask.model.dependencies, links[i])) {


                        fromTask.model.dependencies.push({
                            to: links[i].model.id
                        });

                        // Create new dependencies FS
                        var dependencies = new Dependencies(null, fromTask.model, links[i].model);
                        dependencies.setDate(link.data, link.api);

                        if(dependencies.gotDependencies()) {
                            dependencies.updateChildTasks(link.data, link.api)
                        }
                    }


                    // removeClasses(links[i]);

                    // api.dependencies.refresh();
                }

                return links;
            }

            return links;
        };

        // Remove all selected classes
        var removeClasses = function(task) {
            task.row.model.classes = [];
        }

        /**
         * Search for toTask at fromTask dependencies
         * @param  {[Array of objects]}  dependencies
         * @param  {[Task]}  task
         * @return {Boolean}
         */
        var isIn = function(dependencies, task) {
            for(var i = 0; i < dependencies.length; i++) {
                if (dependencies[i].to === task.model.id) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Remove all selected task from predecessors values
         * @param  {[Array of data]} data
         * @param  {[Tasj]} fromTask     [description]
         * @param  {[Dependency Id]} dependencyID [description]
         * @return
         */
        var removeFromPredecessors = function(data, fromTask, dependencyID) {
            var dependencyIdx = utils.getIndexTask(data, dependencyID);

            if (data[dependencyIdx].data) {
                var pred = utils.getPredecessorsValues(data[dependencyIdx].data.predecessors);
                var fromIdex = utils.getIndexTask(fromTask);
                var idx = pred.parent.indexOf(fromIdex);
                pred.parent.splice(idx);
                pred.days.splice(idx);

                data[dependencyIdx].data.predecessors = pred.parent.map(function(value, index) {
                    return utils.getString(value, pred.days[index])
                })
                .join(";");
            }
        };

        /**
         * Remove all dependencies from fromTask
         * @param  {[Array of selected tasks]} links
         * @param  {[API event]} api
         * @return {[Array of selected tasks]}
         */
        link.unLinkTasks = function(links, api) {
            if (links.length === 0) {return []};

            var fromTask = links[0];

            if (fromTask.model.dependencies) {
                var dependencies = fromTask.model.dependencies;

                for (var i = 0; i < dependencies.length; i++ ) {

                    for(var j = 0; j < links.length; j++) {
                        if (dependencies[i].to === links[j].model.id) {
                            removeFromPredecessors(link.data, fromTask, dependencies[i].to);
                            dependencies.splice(i, 1);
                        }

                    // removeClasses(links[j]);
                    }
                }

                fromTask.model.dependencies = dependencies;
            }

            // return [];
            return links;
        }
    };



    return Linker;
}

