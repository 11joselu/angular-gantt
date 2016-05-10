(function() {
    'use strict';
    angular.module('gantt').service('ganttUtils', [function() {

         var isDescOrAnces = function(arr, model, toTaskId) {
            return arr.some(function(row, index) {
               if (row.model.id === toTaskId || row.model.name === toTaskId) {
                   model.dependencies.splice(getIndex(model.dependencies, row.model), 1);
                   return true;
               }

               return false;
           });
        }

        var getIndex = function(dependencies, model) {
            for(var i = 0; i < dependencies.length; i++) {
                if (dependencies[i].to === model.id || dependencies[i].to === model.name) {
                    return i;
                }
            }

            return -1;
        }

        return {
            createBoundedWrapper: function(object, method) {
                return function() {
                    return method.apply(object, arguments);
                };
            },
            firstProperty: function(objects, propertyName, defaultValue) {
                for (var i = 0, l = objects.length; i < l; i++) {
                    var object = objects[i];
                    if (object !== undefined && propertyName in object) {
                        if (object[propertyName] !== undefined) {
                            return object[propertyName];
                        }
                    }
                }
                return defaultValue;
            },
            angularIndexOf: function(arr, obj) {
                for (var i = 0; i < arr.length; i++) {
                    if (angular.equals(arr[i], obj)) {
                        return i;
                    }
                }
                return -1;
            },
            random4: function() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            },
            randomUuid: function() {
                return this.random4() + this.random4() + '-' + this.random4() + '-' + this.random4() + '-' +
                    this.random4() + '-' + this.random4() + this.random4() + this.random4();
            },
            newId: (function() {
                var seedId = new Date().getTime();
                return function() {
                    return seedId += 1;
                };
            })(),

            denyDrop: function(dependency) {
               var model        = dependency.task.model;
               var descendants  = dependency.task.descendants;
               var ancestors    = dependency.task.ancestors;
               var toTask       = dependency.getToTask();
               var toTaskId     = dependency.getToTaskId();

               if (descendants) {
                    if (isDescOrAnces(descendants, model, toTaskId)) {
                        return true;
                    }
               }

               if (ancestors) {
                    if (isDescOrAnces(ancestors, model, toTaskId)) {
                        return true;
                    }
               }

               if (toTask.model.children && toTask.model.children.indexOf(model.id) >= 0) {
                   model.dependencies.splice(getIndex(model.dependencies, model), 1);
                   return true;
               }

               if (toTask.model.children && toTask.descendants) {
                    for (var i = 0; i < toTask.descendants.length; i++) {
                        var modl = toTask.descendants[i].model;
                        if (modl.id === model.id || modl.id === model.name || modl.name === model.name) {
                            model.dependencies.splice(getIndex(model.dependencies, modl))
                            return true;
                        }
                    }
               }

               return false;
            }
        };
    }]);
}());

