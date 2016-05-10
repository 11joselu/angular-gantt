  'use strict';

  var module = angular.module('angularGanttDemoApp');

  module
    .factory('Linker', ['Utils', 'FSDependencies', Linker]);

   function Linker(Utils, Dependencies) {
      var utils = new Utils();

      var Linker = function(data, api) {
        this.data = data;
        this.api = api;

        this.linkTaks = function(links) {
          var fromTask = links[0];

          if (fromTask) {
              if (!fromTask.model.dependencies) {
                  fromTask.model.dependencies = [];
              }

               removeClasses(fromTask);

               for (var i = 1; i < links.length; i++) {

                  if (fromTask.model.dependencies.indexOf(links[i].model.id) < 0) {

                      removeClasses(links[i]);

                      fromTask.model.dependencies.push({
                          to: links[i].model.id
                      });

                      var dependencies = new Dependencies(null, fromTask.model, links[i].model);
                      dependencies.setDate(this.data, this.api);

                      if(dependencies.gotDependencies()) {
                          dependencies.updateChildTasks(this.data, this.api)
                      }
                  }

                    // api.dependencies.refresh();
               }

               return [];
          }

          return links;
        };

        var removeClasses = function(task) {
          task.row.model.classes = [];
        }

        this.unLinkTasks = function(links, api) {
            var fromTask = links[0];

            if (fromTask) {
                if (!fromTask.model.dependencies) {
                    for (var i = 1; i < links.length; i++ ){
                        var model = links[i].model;
                        if (model.dependencies) {
                            model.dependencies = model.dependencies.filter(function(dependency) {
                                return dependency.to !== fromTask.model.id;
                            });
                        }

                        removeClasses(links[i]);
                        removeClasses(fromTask);

                    }
                } else {
                   var dependencies = fromTask.model.dependencies;

                   for (var i = 0; i < dependencies.length; i++ ) {

                        for(var j = 0; j < links.length; j++) {
                            if (dependencies[i].to === links[j].model.id) {
                                dependencies.splice(i, 1);
                            }

                            removeClasses(links[j]);
                        }
                   }

                   fromTask.model.dependencies = dependencies;
                }
                return [];
            }

            return links;

        }
      };



    return Linker;
  }

