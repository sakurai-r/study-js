'use client';

import React, { useState } from 'react';

export default function Page() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') {
      return;
    }
    const todo = { id: Date.now(), text: newTodo.trim(), completed: false };
    setTodos([todo, ...todos]);
    setNewTodo('');
  };

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          className="m-2"
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="mx-2">
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              className="mx-2"
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <label
              className=""
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </label>
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
