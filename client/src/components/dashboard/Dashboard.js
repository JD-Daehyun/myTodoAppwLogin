import React, { Fragment, useState, useEffect } from "react";

import { toast } from "react-toastify";

//components
import InputTodo from "./todolist/inputTodo";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:4001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const data = await response.json();

      console.log(data);
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

  useEffect(() => {
    getName();
  }, []);

  return (
    <Fragment>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name}'s Todo List</h2>
        <button className="btn btn-primary" onClick={(e) => logOut(e)}>
          Log Out
        </button>
      </div>

      <InputTodo />
    </Fragment>
  );
};

export default Dashboard;
