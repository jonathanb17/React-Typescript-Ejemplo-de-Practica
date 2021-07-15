// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import { useRef, useState } from "react";

// import {BrowserRouter as Router,Route ,Switch} from 'react-router-dom'

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {

  // asignas un valor al estado
  // lo que tenga el estado lo asigno al array
  const [newTask, setNewTask] = useState<string>("");

  const [tasks, setTasks] = useState<ITask[]>([]); // este array se llena

  // le puse el tipo de dato el ref ,esta haciendo referencia a un input
const taskInput = useRef<HTMLInputElement>(null)


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // agrego lo que tipies al estado
    addTask(newTask);
    console.log(tasks);
    setNewTask(""); //recitiame el formulario
    taskInput.current?.focus();
  };

  // este metodo actualiza el estado
  const addTask = (name: string) => {
    const newTasks = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number) => {
    const newTasks = [...tasks];
    newTasks[i].done = !newTasks[i].done; // si esta en true cambiala a su contrario y asi... :D
    setTasks(newTasks); // alteramos el estado
  };

  const removeTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks)
    console.log(i);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="form-control"
                  autoFocus
                  ref={taskInput}
                />
                <button className="btn btn-primary form-control mt-2">
                  Save
                </button>
              </form>
            </div>
          </div>

          {tasks.map((task: ITask, i: number) => (
            <div key={i} className="card card-body">
              <h1 style={{ textDecoration: task.done ? "line-through" : "" }}>
                {task.name}
              </h1>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(i)}
                >
                  {task.done ? "✓" : "✗"}
                </button>

                <button
                  className="btn btn-outline-primary"
                  onClick={() => removeTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
