import React from 'react'
import Todo from '../Todo/Todo';
import "./ToDos.css";

const ToDos = ({todos, dispatch, hideCompleted, isDisplayedHandlerer}) => {
  return (
    <div>
        {todos.map((todo) => {
            return (
               <Todo key={todo.id} todo={todo} hideCompleted={hideCompleted} dispatch={dispatch} />
            )
        })}
    </div>
  )
}

export default ToDos