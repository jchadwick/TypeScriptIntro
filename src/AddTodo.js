AddTodo.$inject = [ 'TodosService' ];

function AddTodo(_todosService) {
	
	this._todosService = _todosService;

	this.newTaskName = '';
	
}

AddTodo.prototype.add = 
	function add() {
		this._todosService.add(this.newTaskName);
		this.newTaskName = '';
	}


/*  AngularJS stuff */
angular.module("TodoApp")
	.controller('AddTodo', AddTodo)
	.directive('addTodo', function () {

	    return {
	        controller: 'AddTodo',
	        controllerAs: 'vm',
	        template:
			'<form ng-controller="AddTodo" ng-submit="vm.add()">' +
			'	<div class="form-group">' +
			'		<div class="input-group">' +
			'			<span class="input-group-btn">' +
			'				<button type="submit" class="btn btn-primary input-lg">Add</button>' +
			'			</span>' +
			'			<input ng-model="vm.newTaskName" required type="text" class="form-control input-lg" placeholder="Task description..." />' +
			'		</div>' +
			'	</div>' +
			'</form>'
	    }

	});