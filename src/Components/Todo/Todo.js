import './Todo.css';
import React, { useState } from "react";
import PopUp from "../ToDos.js/PopUp/PopUp";

const Todo = ({ todo, hideCompleted, dispatch }) => {
    const [completed, setCompleted] = useState(todo.isCompleted);

    const changeCompleteHandler = async(e) => {
        const isChecked = e.target.checked;
        setCompleted(isChecked);

        const res = await fetch(`http://localhost:5000/todos/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                ...todo, isCompleted: isChecked
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json();
        return data;
    }
  return (
    <div
      className={completed && hideCompleted ? "hiddenTodos" : "shownTodos"}
      key={todo.id}
    >
      <div >
        <input
          type="checkbox"
          defaultChecked={completed}
          onChange={changeCompleteHandler}
          className='completed-checkbox'
        />
        <span className={completed ? "completed" : "not-completed"}>
          {todo.toDo}
        </span>
      </div>
      
      <PopUp todo={todo} dispatch={dispatch} />
    </div>
  );
};

export default Todo;
