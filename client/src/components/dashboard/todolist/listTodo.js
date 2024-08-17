import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./editTodo";

const ListTodos = ({allTodos}) => {
  const [todos, setTodos] = useState([]);

  //delete todo function

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:4001/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: {token: localStorage.token}
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  //no longer necessary since we already have our dashboard fetch all of the todos and the name through getProfile so we just need to pass it down

//   const getTodos = async () => {
//     try {
//       const response = await fetch("http://localhost:4001/todos");
//       const jsonData = await response.json();

//       setTodos(jsonData);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//since it takes time to fetch the data, we need to useEffect to update whenever the todo is updated
  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

//   console.log(todos);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;