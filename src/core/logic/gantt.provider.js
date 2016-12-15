(function() {
    'use strict';
    angular.module('gantt').provider('GanttConfiguration', function GanttProvider() {
        var progress = false;
        var dependencies = false;
        var tooltips = true;
        var movable = false;

        this.setProgress = function(isActive) {
            progress = isActive;
        };

        this.setDependencies = function(isActive) {
            dependencies = isActive;
        };

        this.setTooltips = function(isActive) {
            tooltips = isActive;
        };

        this.setMovable = function(isMovable) {
            movable = true;
        };

        this.activeAllPlugins = function() {
            this.setProgress(true);
            this.setDependencies(true);
            this.setTooltips(true);
            this.setMovable(true);
        };

        this.unableAllPlugins = function() {
            this.setProgress(false);
            this.setDependencies(false);
            this.setTooltips(false);
            this.setMovable(false);
        };



        return{
            $get: {}
        };
    });
})();