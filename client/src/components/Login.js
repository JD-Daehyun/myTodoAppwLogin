import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  //destructure the inputs
  const { email, password } = inputs;

  //function onchange
  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const onSubmitForm = async (event) => {
    event.preventDefault();
    const body = { email, password };
    // console.log(body);
    try {
      const response = await fetch("http://localhost:4001/auth/login", {
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
        toast.success("Login Successfully");
      }else{
        setAuth(false);
        toast.error(data);
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
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
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to={"/register"}>Create your account!</Link>
    </Fragment>
  );
};

export default Login;