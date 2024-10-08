import React, { Fragment, useState } from "react";

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      const body = { description };
      const response = await fetch("http://localhost:4001/dashboard/todos", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      //   //once res then refresh the page and show the changes
      //   window.location = "/";
      const data = await response.json();
      // console.log(data);
      setTodosChange(true);
      setDescription('');
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center mt-5">PERN Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
        placeholder="Add Todo"
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
