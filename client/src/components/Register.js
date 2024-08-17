import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  //destructure the inputs
  const { email, password, name } = inputs;

  //function onchange
  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const body = { email, password, name };
    // console.log(body);
    try {
      const response = await fetch("http://localhost:4001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.token) {
        //store the token in the local storage
        localStorage.setItem("token", data.token);
        //the user is authenticated and now navigates to the dashboard
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to={"/login"}>Have an account? Log In </Link>
    </Fragment>
  );
};

export default Register;