'use strict';
const { Schema, model } = require('mongoose');
const toDoSchema = Schema({
    title: { type: String, required: true },
    description: String,
    isDone: { type:Boolean, default: false}
},
    { timestamps: true });


model('Todo', toDoSchema);