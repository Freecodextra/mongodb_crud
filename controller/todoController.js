const collection  = require("../model/Todos");

// get all todos
const getAllTodos = async (req, res) => {
  const todos = await collection.find().toArray();
  return res.status(200).json({ todos });
};

// add new todo
const addNewTodo = async (req, res) => {
  const newTodo = await req.body;
  newTodo.timestamp = new Date();
  await collection.insertOne(newTodo);
  res.status(201).json({
    message: "Added Successfully",
    newTodo,
  });
};

//  get single todo
const getTodo = async (req, res) => {
  let title = await req.params.title;
  let todo = await collection.findOne({ title: title });
  if (!todo) {
    return res.status(404).json({ message: "Todo Not Found" });
  }
  return res.status(200).json({ todo });
};

//  update todo
const updateTodo = async (req, res) => {
  const title = await req.params.title;
  const update = await req.body;
  update.timestamp = new Date();
  const todo = await collection.updateOne(
    { title: title },
    {
      $set: {
        title: update.title,
        description: update.description,
        timestamp: update.timestamp,
      },
    }
  );
  if (!todo) {
    return res.status(404).json({ message: "Todo Not Found" });
  }
  return res.status(200).json({
    message: "Updated Successfully",
    update,
  });
};

//  update todo
const deleteTodo = async (req, res) => {
  const title = await req.params.title;
  const todo = await collection.deleteOne({ title: title });
  if (todo.deletedCount === 0) {
    return res.status(404).json({ message: "Todo Not Found" });
  }
  return res.status(200).json({
    message: "Deleted Successfully",
    todo,
  });
};

module.exports = {
  getAllTodos,
  addNewTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
