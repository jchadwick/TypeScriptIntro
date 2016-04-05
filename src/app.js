var todosService = new TodosService([
    { name: 'Pick up drycleaning', completed: false },
    { name: 'Clean Batcave', completed: true },
    { name: 'Save Gotham', completed: false },
]);

$(function initialize() {
    $('#add-todo').on('submit', addTodo);
    $('#clear-completed').on('click', clearCompleted);
    render();
});



function addTodo() {
    var todo = $('#add-todo input').val();

    todosService.addTodo(todo);

    $('input', this).val('');
    
    render();

    return false;
}

function clearCompleted() {
    todosService.clearCompleted()
    render();
}

function render() {
    var todoList = $('#todo-list').html(''),
        todos = todosService.getAll(),
        todoItemTemplate = $('#todo-item-template').text();

    if (!todos.length) {
        $('#todo-list').html(
            "<div class='list-group-item text-center text-giant'>" +
                "<strong>You've completed everything you needed to do!</strong>" +
            "</div>"
        );

        return;
    }
    
    todos.forEach(function (todo, index) {
        var completedClass = todo.completed ? "completed" : "",
            template = todoItemTemplate
                        .replace(new RegExp('TODO_NAME', 'g'), todo.name)
                        .replace("COMPLETED-CLASS", completedClass);
        
        $(template)
            .on('click', function todoClicked() {
                var completed = todosService.toggleCompleted(todo.id);
                $(this).toggleClass('completed', completed)
            })
            .appendTo(todoList)
    })
}
