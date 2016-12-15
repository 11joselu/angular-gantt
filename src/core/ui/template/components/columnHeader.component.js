(function(){
    'use strict';
    angular.module('gantt')
        .component('ganttColumnHeaderComponent', {
            bindings: {
                column: '<'
            },
            controller: ['$scope', '$element', function($scope, $element) {
                this.$onInit = function() {
                    this.column.$element = $element;
                    this.column.$scope = $scope;
                };

                this.$postLink = function() {
                    this.column.updateView();
                };
                
            }],
            template: '<div>{{::$ctrl.column.label}}</div>'
        });
}());