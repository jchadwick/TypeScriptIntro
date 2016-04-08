var TodosService = (function () {

    // Constructor takes an array of Todo 
    // or string objects (or both)
    function TodosService(todos) {

        this._todos = [];

        // Save a reference for use in the closure
        var _this = this;

        (todos || []).forEach(function (todo) {
            _this.addTodo(todo);
        });
    }

    // Singleton/"Static" property
    TodosService.__id = 0;

    // Method that accepts either a string or a Todo object
    TodosService.prototype.addTodo = function (todo) {
        
        if(!todo) 
            return;
        
        var newTodo = todo;
        
        if(typeof newTodo == 'string') {
            newTodo = { name: todo };
        } 

        newTodo.id = TodosService.__id += 1;
        newTodo.completed = !!newTodo.completed; // Force boolean

        this._todos.push(newTodo);
        
        return newTodo;
    }

    TodosService.prototype.clearCompleted = function () {
        
        this._todos = this._todos.filter(function (todo) {
            return !todo.completed;
        })
        
    }

    TodosService.prototype.get = function (todoId) {
        return clone(this._find(todoId));
    }

    TodosService.prototype.getAll = function () {
        return clone(this._todos);
    }

    TodosService.prototype.toggleCompleted = function (todoId) {
        var todo = this._find(todoId);

        if (!todo)
            return null;

        return todo.completed = !todo.completed;
    }


    // "Private" method (but not really)
    TodosService.prototype._find = function (todoId) {
        var filtered = this._todos.filter(function (x) {
            return x.id == todoId;
        });

        return filtered.length ? filtered[0] : null;
    }


    // "Private" method not available anywhere else but in this scope
    // Same type goes in and comes out, 
    // but TypeScript won't be able to infer that
    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    return TodosService;
})();
