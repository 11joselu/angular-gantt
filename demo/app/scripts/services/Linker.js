  'use strict';

var module = angular.module('angularGanttDemoApp');

module.factory('Linker', ['Utils', 'FSDependencies', Linker]);

/**
 * Linker class
 */
function Linker(Utils, Dependencies) {
    var utils = new Utils();

    var isIn = function(selected, task) {
        if (!angular.isArray(selected)) {
            selected = [selected];
        }

        for (var i = 0, len = selected.length; i < len; i++) {
            if (selected[i].name === task.name || selected[i].id === task.id) {
                return true;
            }
        }

        return false;
    }

    var getParents = function(data) {
        var tree = {};
        var project = null;



        return tree;
    };

    var setNewChild = function(parents, parentChild, child) {
        for (var key in parents) {

        }
    };

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

                    if (!isIn(fromTask.model, links[i]) || !isIn(links[i], fromTask)) {


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
        var isIn = function(model, task) {
            if (!model.dependencies) { return false;}
            for(var i = 0; i < model.dependencies.length; i++) {
                if (model.dependencies[i].to === task.model.id) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Remove all selected task from predecessors values
         * @param  {[Array of data]} data
         * @param  {[Task]} fromTask     [description]
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
         * Remove dependencies from Task model
         * @param  {[Array]} data     Array of data
         * @param  {[Task]} link     [Task model]
         * @param  {[Task]} fromTask
         * @return {[Array]} taskDepen [new Task dependencies]
         */
        var removeFromDependencies = function(data, link, fromTask) {
            var taskDepend = link.model.dependencies;
            for (var dep = 0; dep < taskDepend.length; dep ++) {
                if (taskDepend[dep].to === fromTask.model.id) {
                    removeFromPredecessors(data, fromTask, taskDepend[dep].to);
                    taskDepend.splice(dep, 1);
                }
            }
            return taskDepend;
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
                        // Case when first selected Task is 'FromTask'
                        if (dependencies[i].to === links[j].model.id) {
                            removeFromPredecessors(link.data, fromTask, dependencies[i].to);
                            dependencies.splice(i, 1);
                        } else {
                            // Case when first selected Task is 'toTask' with dependencies
                            if (links[j].model.dependencies) {
                                var taskDepend = removeFromDependencies(link.data, links[j], fromTask);

                                links[j].model.dependencies = angular.copy(taskDepend);
                            }
                        }

                    // removeClasses(links[j]);
                    }
                }

                fromTask.model.dependencies = dependencies;

            } else {
                // Case when selected task is 'toTask' WITHOUT dependencies
                for (var i = 1; i < links.length; i++) {
                    if (links[i].model.dependencies) {
                        var taskDepend = removeFromDependencies(link.data, links[i], fromTask);

                        links[i].model.dependencies = angular.copy(taskDepend);
                    }
                }
            }

            // return [];
            return links;
        }
    };

    Linker.prototype.identTask = function(links) {
        if (!links) {return;}

        var parents = getParents(this.data);
        for (var key in parents) {
            // console.log(parents[key]);
            if (parents[key].indexOf(links.model.id) >= 0) {
                // console.log(key, links)
            }
        }
    };



    return Linker;
}

