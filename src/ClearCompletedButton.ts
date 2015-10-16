/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="todosservice.ts" />

angular.module("TodoApp")
    .directive('clearCompleted', ['TodosService',
        function (TodosService: TodosService) {
			
            return {
				restrict: 'A',
				link: function(scope, element) {
					element.on('click', function() {

                        TodosService.clearCompleted();
						
						scope.$apply();
						
					})
				}
			}
			
		}
	]);