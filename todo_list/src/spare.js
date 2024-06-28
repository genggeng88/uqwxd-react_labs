import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    
    let todo = document.getElementById("todoAdd").value;
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos, newTodo]);
    } else {
      alert("Enter Valid Task");
    }
    document.getElementById("todoAdd").value = "";
  }

  function deleteTodo(id) {
    let updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editingText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="todoAdd" />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <div className="todo-text">
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleComplete(todo.id)}
            />
            {/* If it is edit mode, display input box, else display text */}
            {todo.id === todoEditing ? (
              <input
                type="text"
                id={todo.id}
                defaultValue={todo.text}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {/* If it is edit mode, allow submit edit, else allow edit */}
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => {
                setTodoEditing(todo.id);
                setEditingText(todo.text);
              }}>Edit</button>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
