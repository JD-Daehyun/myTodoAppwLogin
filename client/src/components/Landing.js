import React from "react";
import { Link } from "react-router-dom";

const Landing = () =>{
    return (
        // jumbotron is from boothstrap 4
        <div className="jumbotron mt-5">
            <h1>Welcome to My Todo App </h1>
            <p>Sign-In and Start Building Your Todo List</p>
            <Link to ={'/login'} className="btn btn-primary">Login</Link>
            <Link to ={'/register'} className="btn btn-primary ml-3">Register</Link>

        </div>
    )
};

export default Landing;