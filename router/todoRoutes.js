const express = require('express');
const {getAllTodos, addNewTodo, getTodo, updateTodo, deleteTodo} = require("../controller/todoController");
const router = express.Router();



router.route("/")
.get(getAllTodos)
.post(addNewTodo);

router.route("/:title")
.get(getTodo)
.put(updateTodo)
.delete(deleteTodo);

module.exports = router;