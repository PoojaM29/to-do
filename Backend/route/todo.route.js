
const control = require('../controller/todo.controller');

module.exports=function(app) {
	//Test API
	app.get("/testConnection", function(req,res) {
		res.send({'success':true,'message':'Successfully Connected!'})
	});

	app.post("/add", control.addtodo);
	app.get("/get", control.getAllTodo);
	app.put("/update", control.updateTodo);
	app.delete("/delete/:id", control.deleteTodo);
};