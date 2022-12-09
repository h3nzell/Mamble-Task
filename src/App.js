import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
import ToDos from "./Components/ToDos.js/ToDos";
import { getSettings, getToDo } from "./actions/todos";
import { reducer } from "./Components/Reducer/reducer";

function App() {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [todos, dispatch] = useReducer(reducer, []);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    getParams();
  }, []);


  //Getting functions from db.json
  const getParams = async () => {
    const todosDB = await getToDo();
    const settingsDB = await getSettings();

    dispatch({
      type: "getToDos",
      payload: {
        todos: todosDB.reverse(),
      },
    });

    setHideCompleted(settingsDB[0].isHidden);
  };

  //Adding todo in todo list
  const createTodoHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      body: JSON.stringify({
        toDo: todo,
        isCompleted: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    dispatch({ type: "addToDo", payload: data });
    setTodo("");
  };

  const changeHideCompletedHandler = async (e) => {
    setHideCompleted(e.target.checked);

    const res = await fetch("http://localhost:5000/settings/" + 1, {
      method: "PUT",
      body: JSON.stringify({
        isHidden: e.target.checked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  return (
    <div className="main-block">
      {todos.length > 0 && (
        <>
          <div className="hideToDos-block">
            <label htmlFor="hideToDos" className="hideToDos-label">
              {" "}
              Hide completed{" "}
            </label>
            <input
              type="checkbox"
              id="hideToDos"
              checked={hideCompleted}
              onChange={changeHideCompletedHandler}
            />
          </div>
        </>
      )}
      <form onSubmit={createTodoHandler}>
        <div>
          <label htmlFor="addTask"> Task </label>
          <input
            type="text"
            id="addTask"
            placeholder="Write here"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            maxLength={54}
            autoComplete="off"
          />
          {todo ? (
            <p style={{ color: "red" }}>
              {" "}
              Task content can contain max 54 characters{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        <label htmlFor="addToDo"></label>
        <input type="Submit" id="addToDo" defaultValue="Add" />
      </form>
      <div className={todos.length > 0 ? "hiddenText" : "shownText"}>
        <p className="shownText__subtitle">
          {" "}
          Your life is a blank page. You write on it.{" "}
        </p>
        <p className="shownText__title">
          {" "}
          So start by adding your tasks here.{" "}
        </p>
      </div>

      <ToDos hideCompleted={hideCompleted} todos={todos} dispatch={dispatch} />
    </div>
  );
}

export default App;
