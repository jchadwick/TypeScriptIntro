TodosService.__id = 0;

function TodosService() {

	this.todos = [
		{ id: TodosService.__id++, name: 'Clean cave', completed: false },
		{ id: TodosService.__id++, name: 'Dryclean cape', completed: true },
		{ id: TodosService.__id++, name: 'Save Gotham', completed: false },
	];

}

TodosService.prototype.add = function add(todo) {
	
	// Expect/accept 'todo' parameter as either a string...
	var newTodo = { name: todo };
	
	// or a Todo object
	if(typeof todo === 'object') {
		newTodo = todo;
	} 
	
	newTodo.id = TodosService.__id += 1;
	newTodo.completed = false;
	
	this.todos.push(newTodo);
}

TodosService.prototype.clearCompleted = function clearCompleted() {
	var completed = this.todos.filter(function (x) { return x.completed; });

	var _this = this;	// Save a reference to "this" for use in the closure
	completed.forEach(function (x) { _this.remove(x) });
}

TodosService.prototype.getAll = function getAll() {
	return this.todos;
}

TodosService.prototype.remove = function remove(todo) {
	var instance = this._find(todo);
	this.todos.splice(this.todos.indexOf(instance), 1);
}

// "Private" function... but not really.
TodosService.prototype._find = function _find(todoId) {
	var filtered = this.todos.filter(function (x) { return x.id == todoId; });
	return filtered.length ? filtered[0] : null;
}


/*  AngularJS stuff */
angular.module('TodoApp').service('TodosService', TodosService);