import React, { useState } from 'react'
import {useHistory} from 'react-router-dom';


const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "",cpassword:"" })
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name,email,password,cpassword}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/user", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.s

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViM2E4MzNlZWJmNmQwNWY0ZWMwMTEzIn0sImlhdCI6MTcwNjI3MzMzMH0._kvgfyub9dx6EMcCH_y9pqobWMDbvRV0SoPXZ2-NJ9c"

      },
      body: JSON.stringify({name,email,password,cpassword })
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
    localStorage.setItem('token',json.authtoken);
    history.push("/");
    props.showAlert("Successfull","success")
    }
    else{
      props.showAlert("Invalid creds","danger")
    }
  
    }
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }

  return (
    <div> <form onSubmit={handleSubmit}>
       <div className='mt-3'>
        <h2>Create an account to begin using NotesSB</h2>
    <div className="mb-3 mt-5">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name='name' aria-describedby="emailHelp" autoFocus/>
      </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword12" required minLength={5}/>
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" name='cpassword' value={credentials.cpassword} onChange={onChange} id="exampleInputPassword1" required minLength={5}/>
    </div>
    
     
    <button type="submit" className="btn btn-primary" >Signup <i class="fa-solid fa-arrow-right-to-bracket"></i></button>
    </div>
  </form></div>
  )
}

export default Signup