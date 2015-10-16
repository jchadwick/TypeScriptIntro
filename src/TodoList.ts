/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="todosservice.ts" />

class TodoList {

    static $inject = ['TodosService'];

    private todos: Todo[] = [];

    constructor(private _todosService: TodosService) {

        this.loadTodos();
    }

    loadTodos() {
        this.todos = this._todosService.getAll();
    }

    remove(todo: Todo) {
        this._todosService.remove(todo.id);
    }
}


/*  AngularJS stuff */
angular.module("TodoApp")
	.controller('TodoList', TodoList)
	.directive('todoList', function () {

	    return {
	        scope: {},
	        controller: 'TodoList',
	        controllerAs: 'vm',
	        template: '' +
			'<ul ng-controller="TodoList" class="list-group">' +
            '    <li ng-repeat="todo in vm.todos" class="list-group-item">' +
            '        <div class="input-lg">' +
            '            <input type="checkbox" ng-model="todo.completed" />' +
            '            <span ng-class="{ \'text-strikethrough\': todo.completed }">{{todo.name}}</span>' +
            '            <i ng-click="vm.remove(todo)" class="delete glyphicon glyphicon-remove-circle pull-right" title="Remove"></i>' +
            '        </div>' +
            '    </li>' +
            '</ul>'
	    };

	});