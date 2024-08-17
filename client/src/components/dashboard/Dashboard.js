import React, { Fragment, useState, useEffect } from "react";

import { toast } from "react-toastify";

//components
import InputTodo from "./todolist/inputTodo";
import ListTodos from "./todolist/listTodo";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  //This state allows us to see the change instantly without needing to refresh
  const [todosChange, setTodosChange] = useState(false);

  async function getName() {
    try {
      const response = await fetch("http://localhost:4001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const data = await response.json();

      setAllTodos(data);
      setName(data[0].user_name);
    } catch (err) {
      console.log(err.message);
    }
  }

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged Out Successfully");
  };

  //whenever we set todosChange to true this will take effect and allow the web to load the new data instantly 
  useEffect(() => {
    getName();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <Fragment>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name}'s Todo List</h2>
        <button className="btn btn-primary" onClick={(e) => logOut(e)}>
          Log Out
        </button>
      </div>

      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </Fragment>
  );
};

export default Dashboard;
