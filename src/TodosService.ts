/// <reference path="../scripts/typings/angularjs/angular.d.ts" />

interface Todo {
    id: number;
    name: string;
    completed?: boolean;
}


class TodosService {
    static __id = 0;

    todos: Todo[] = [
        { id: TodosService.__id++, name: 'Clean cave', completed: false },
        { id: TodosService.__id++, name: 'Dryclean cape', completed: true },
        { id: TodosService.__id++, name: 'Save Gotham', completed: false },
    ];

    add(todo: string)
    add(todo: Todo)
    add(todo: any) {
	
        // Expect/accept 'todo' parameter as either a string...
        var newTodo: Todo = {
            id: TodosService.__id += 1,
            name: todo
        };
	
        // or a Todo object
        if (typeof todo === 'object') {
            newTodo = todo;
        }

        newTodo.completed = false;

        this.todos.push(newTodo);
    }

    clearCompleted() {
        var completed = this.todos.filter(function (x) { return x.completed; });
        completed.forEach((x) => { this.remove(x) });
    }

    getAll() {
        return this.todos;
    }

    remove(todoId: number) {
        var instance = this._find(todoId);
        this.todos.splice(this.todos.indexOf(instance), 1);
    }

    // "Private" function... but not really.
    private _find(todoId: number) {
        var filtered = this.todos.filter(function (x) { return x.id == todoId; });
        return filtered.length ? filtered[0] : null;
    }

}


/*  AngularJS stuff */
angular.module('TodoApp').service('TodosService', TodosService);