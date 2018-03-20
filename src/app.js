var todosService;

$(function initialize() {
    $('#add-todo').on('submit', addTodo);
    $('#clear-completed').on('click', clearCompleted);

    $.getJSON('todos.json')
        .then(function(todos) {

            todosService = new TodosService(todos);

            render();

            $('.loading').hide();
            $('.container.hidden').show();
        });
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
    var todoItemTemplate = $('#todo-item-template').text(),
        todoList = $('#todo-list').html(''),
        todos = todosService.getAll();

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
