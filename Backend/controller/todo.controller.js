const chalk = require('chalk');                           //For Displaying Logs in different Colors
const mongoose = require('mongoose');             //For Mongodb Schema
const Todo = mongoose.model('Todo');

//1. For Testing Connection
async function todo(req, res) {
    try {
        res.send({ 'success': true, 'msg': 'Test API Responded!' });
    } catch (error) {
        res.status(500).send({ 'success': false, 'msg': 'Error!', 'error': error });
    }
}

async function addtodo(req, res) {
    try {
        let todo = req.body;
        const newTodo = new Todo(todo);
        let savedTodo = await newTodo.save();
        return res.send({ 'success': true, 'msg': 'Added ToDo!', 'data': savedTodo });
    } catch (error) {
        return res.status(500).send({ 'success': false, 'msg': 'Error to add!', 'error': error });
    }

}

async function getAllTodo(req, res) {
    try {
        const todoList = await Todo.find();
        return res.send({ 'sucess': true, 'msg': 'All todos list', 'data': todoList })
    } catch (error) {
        return res.status(500).send({ 'success': false, 'msg': 'Error to get list!', 'error': error });
    }
}

async function updateTodo(req, res) {
    try {
        const data = req.body;
        const response = await Todo.findOneAndUpdate({_id:data._id},{$set:data},{new: true});
        return res.send({ 'sucess': true, 'msg': 'todo Updated', 'data': response })
    } catch (error) {
        return res.status(500).send({ 'success': false, 'msg': 'Error to get list!', 'error': error });
    }
}

async function deleteTodo(req, res) {
    try {
        const todoDeleteId = req.params;
        const response = await Todo.deleteOne({_id:todoDeleteId.id});
        return res.send({ 'sucess': true, 'msg': 'todo Deleted', 'data': response })
    } catch (error) {
        return res.status(500).send({ 'success': false, 'msg': 'Error to get list!', 'error': error });
    }
}

module.exports = { addtodo, getAllTodo, updateTodo, deleteTodo }