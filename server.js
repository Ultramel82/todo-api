var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

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

// POST - can take data
// URL will be /todos but method will be different
app.post('/todos', function(req, res) {
	var body = req.body;

	//add id field
	body.id = todoNextId++;
	//push body into array
	todos.push(body);
	res.json(body);
});

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
});