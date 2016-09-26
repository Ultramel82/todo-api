var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	description: 'Meet mom for breakfast',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: false
},{
	id: 3,
	description: 'Fetch the kids from school',
	completed: false
}];

//GET request /todos
app.get('/todos', function(req, res) {
	res.json(todos); //converted into JSON and sent back
});

//GET request /todos/:id
//GET request /todos
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo;

	// Iteratre over todos array to find a match
	// if found do res.json(todos) else 404 error

	todos.forEach(function (todo) {
		if (todoId === todo.id) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	}
	else
	{
		res.status(404).send();
	}

});


app.get('/', function(req, res) {
	res.send('Todo API Root');
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
});