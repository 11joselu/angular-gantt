(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttTaskBackgroundComponent', {
            bindings: {},
            require: {
                taskCmp: '^ganttTaskComponent'
            },
            controller: ['$scope', '$element', function($scope, $element) {
                this.$postLink = function() {
                    if (this.taskCmp.hasColor()) {
                        $element.css({'background-color': this.taskCmp.getColor()});
                    }
                };
            }],
        });
}());