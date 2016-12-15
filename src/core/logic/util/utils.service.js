(function() {
    'use strict';
    angular.module('gantt').service('ganttUtils', [function() {
        var getIndex = function(dependencies, model) {
            for(var i = 0; i < dependencies.length; i++) {
                if (dependencies[i].to === model.id || dependencies[i].to === model.name) {
                    return i;
                }
            }

            return -1;
        };

        var isDescOrAnces = function(arr, model, toTaskId) {
            return arr.some(function(row) {
                if (row.model.id === toTaskId || row.model.name === toTaskId) {
                    model.dependencies.splice(getIndex(model.dependencies, row.model), 1);

                    return true;
                }

                return false;
            });
        };

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
            denyDropIntoChild: function(dependency, api) {
                var hierarchy = api.tree.getHierarchy();
                var row = dependency.getFromTask();
                var toTaskID = dependency.getToTaskId();
                var descendants;
                var remove = false;
                var dependencies = row.model.dependencies;

                if (row.row) {
                  descendants = hierarchy.descendants(row.row);
                } else {
                  descendants = hierarchy.descendants(row);
                }

                remove = descendants.some(function(row) {
                  return row.model.id === toTaskID;
                });

                if (remove) {

                  row.model.dependencies = dependencies.filter(function(dependency) {

                    return dependency.to !== toTaskID;
                  });

                }

                return remove;
            },
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
                      model.dependencies.splice(getIndex(model.dependencies, modl));

                      return true;
                    }
                  }
                }

                return false;
            },

            workingDaysBetweenDates: function (startDate, endDate, model) {

                if (model) {
                  if (model.data.isMilestonesGantt || (model.data.tasks && model.data.tasks[0].isMilestone)) {
                    return 0;
                  }
                }

                if (endDate < startDate) {

                  return 0;
                }

                // Calculate days between dates
                var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
                var startDateCopy = angular.copy(startDate);
                var endDateCopy = angular.copy(endDate);

                startDateCopy.setHours(0,0,0,1);  // Start just after midnight
                endDateCopy.setHours(23,59,59,999);  // End just before midnight
                var diff = endDateCopy - startDateCopy;  // Milliseconds between datetime objects
                var days = Math.ceil(diff / millisecondsPerDay);

                // Subtract two weekend days for every week in between
                var weeks = Math.floor(days / 7);
                days = days - (weeks * 2);

                // Handle special cases
                var startDay = startDateCopy.getDay();
                var endDay = endDateCopy.getDay();

                // Remove weekend not previously removed.
                if (startDay - endDay > 1) {
                    days = days - 2;
                }

                // Remove start day if span starts on Sunday but ends before Saturday
                if (startDay === 0 && endDay !== 6) {
                  days = days - 1;
                }

                // Remove end day if span ends on Saturday but starts after Sunday
                if (endDay === 6 && startDay !== 0) {
                  days = days - 1;
                }

                return days;
            },
            getPredecessors: function(str) {

                return str.split(';')
                  .map(function(value) {
                    var regex = /(\-|\+)/g;

                    var index = value.substr(0).search(regex);
                    var str = value;
                    var lag = '';

                    if (index >= 0) {
                      str = value.substr(0, index);
                      lag = value.substr(index);
                    }

                    return {
                      index: str.replace(/[a-zA-Z]/g, ''),
                      lag: lag
                    }
                  });
            }
        };
    }]);
}());

