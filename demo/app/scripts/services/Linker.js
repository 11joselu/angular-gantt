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

    var createTree = function(list, task) {
        var treeList = [];
        var lookup = {};
        list.forEach(function(obj, index) {
            var newObj = {
                _index: index,
                id: obj.id,
                data: obj.data,
                name: obj.name,
                children: obj.children
            }

            lookup[newObj.id] = newObj;

            newObj.childrenTask = newObj.childrenTask || [];

            if (newObj.data.parent != null) {
                lookup[newObj.data.parent].childrenTask.push(newObj);
            } else {
                treeList.push(newObj);
            }
        });

        return treeList;
    };

    var searchParent = function(objectChild, id) {

        var childrenTask = objectChild.childrenTask;

        for (var i = 0, length = childrenTask.length; i < length; i++) {

            var children = childrenTask[i];

            if (children.id == id) {
                return objectChild;
            } else {
                var tree = searchParent(children, id);
                if (tree) {
                    return tree;
                }

            }
        }
    };


    var Linker = function(data, api) {
        var link    = this;

        link.data   = angular.copy(data);
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

    var updateData = function(data, parent, globalParent, id) {
        console.log(parent, globalParent);
        if (!globalParent) { return false; }

        var currentParent = data[parent._index];
        var nextParent = data[globalParent._index];
        currentParent.children.splice(currentParent.children.indexOf(id), 1);
        nextParent.children.push(id);

        return data;
    };


/*
    {
        name: 'Control account 1',
        id: 'Control account 1',
        children: [
            'Milestone 3',
            'Work package 1',
            'Work package 2'
        ],
        data: {
            wbs: 2.2,
            duration: '4 d',
            account: true
        }
    },*/
    var turnToParent = function(activity, children) {
        return {
            name: activity.model.name,
            id: activity.model.id,
            children: [1323],
            data: {
                wbs: '13.321',
                duration: '3d',
                account: false,
            }
        }
    };

    Linker.prototype.identTask = function(links, data) {
        if (!links) {return;}

        var parents = createTree(this.data);
        var parent = searchParent(parents[0], links.model.id);
        var index = parent.children.indexOf(links.model.id);
        var taskIndex = parent.childrenTask[index];
        console.log(taskIndex);
        var task = this.data[taskIndex._index];

        if (index === 0) {
            return false;
        }
        var newD = turnToParent(links);

        return {
            index: taskIndex._index,
            task: newD
        }
    };



    return Linker;
}

