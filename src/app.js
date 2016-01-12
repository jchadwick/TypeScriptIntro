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
        todos = todosService.getAll();

    if (!todos.length) {
        $('#todo-list').html(`
        <div class="list-group-item text-center text-giant">
            <strong>You've completed everything you needed to do!</strong>
        </div>
        `)

        return;
    }
    
    todos.forEach(function (todo, index) {
        $(`
            <div class="todo-item list-group-item  ${todo.completed ? 'completed' : '' }">
                <div class="row">
                    <div class="col-md-2 text-center">
                        <i class="incomplete glyphicon glyphicon-unchecked text-muted text-giant"></i>
                        <i class="completed-indicator completed glyphicon glyphicon-ok text-giant"></i>
                    </div>
                    <div class="col-md-10">
                        <span class="incomplete text-giant">${todo.name}</span>
                        <span class="completed text-strikethrough text-muted text-giant">${todo.name}</span>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        `)
            .on('click', function todoClicked() {
                var completed = todosService.toggleCompleted(todo.id);
                $(this).toggleClass('completed', completed)
            })
            .appendTo(todoList)
    })
}
