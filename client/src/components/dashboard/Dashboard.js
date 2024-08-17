import React, { Fragment, useState, useEffect } from "react";

import { toast } from "react-toastify";

const Dashboard = ({setAuth}) =>{
    const [name, setName] = useState('');

    async function getName(){
        try{    
            const response = await fetch('http://localhost:4001/dashboard/', {
                method: "GET",
                headers: {token: localStorage.token }
            });

            const data = await response.json();

            // console.log(data);
            setName(data.user_name);

        }catch(err){
            console.log(err.message);
        }
    }

    const logOut =(e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success('Logged Out Successfully');
    }

    useEffect(()=>{
        getName();
    }, []);

    return <Fragment>
        <h1>Dashboard {name}</h1>
        <button className="btn btn-primary"onClick={e => logOut(e)}>Log Out</button>
    </Fragment>
};


export default Dashboard;