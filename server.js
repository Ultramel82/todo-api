var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;
var _ = require('underscore');

app.use(bodyParser.json());

//GET request /todos
app.get('/todos', function(req, res) {
	res.json(todos); //converted into JSON and sent back
});

//GET request /todos/:id
//GET request /todos
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);

	var matchedTodo = _.findWhere(todos, {id: todoId});

	//REPLACED BY TOP CODE
	// var matchedTodo;

	// // Iteratre over todos array to find a match
	// // if found do res.json(todos) else 404 error

	// todos.forEach(function (todo) {
	// 	if (todoId === todo.id) {
	// 		matchedTodo = todo;
	// 	}
	// });

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
	
	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	// set body.description to be trimmed value
	body.description = body.description.trim();
	body.id = todoNextId++;

	todos.push(body);
	res.json(body);
});

//DELETE /todo/:id
app.delete('/todos/:id', function (req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (!matchedTodo) {
		res.status(404).json({"error": "No Todo found to delete"});
	}
	else
	{
		todos = _.without(todos, matchedTodo);	
		res.json(matchedTodo);
	}

});

// PUT /todos/:id
app.put('/todos/:id', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (!matchedTodo) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if(body.hasOwnProperty('completed')) {
		return res.status(400).send();

	} 

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if(body.hasOwnProperty('description')) {
		return res.status(400).send();
	} 

	// DO UPDATE
	 _.extend(matchedTodo, validAttributes);
	 res.json(matchedTodo);

});


// app.get('/', function(req, res) {
// 	res.send('Todo API Root');
// });

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT);
});