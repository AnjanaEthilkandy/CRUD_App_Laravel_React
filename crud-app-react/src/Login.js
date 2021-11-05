import Header from './Header'
import React, {useState, useEffect} from "react"
import {useHistory} from 'react-router-dom'

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect (() => {
        if(localStorage.getItem('user-info')){
            history.push("/add")
        }
    },[])
    async function login (){
        let item = {email, password}
        console.warn(item)
        let result = await fetch("http://localhost:8000/api/login", {
            method : 'POST',
            body : JSON.stringify(item),
            headers : {
                "Content-Type" : 'application/json',
                "Accept" : 'application/json'
            }
        })
        result = await result.json()
        localStorage.setItem("user-info", JSON.stringify(result))
        history.push("/")
    }
    return (        
        <div>
            <div className="col-sm-4 offset-sm-4 form-wrapper">
                <p class="form-title">Login</p>
                <input type="text" value={email} placeholder="Email address" onChange={(e) => setEmail(e.target.value)} className="form-field"/>
                <br/>
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}  className="form-field"/>
                <br/>
                <button  onClick={login} className="btn form-button">Sign in</button>
                <br/>
                <p class="small-text">No account yet? <a href="/register">Create one here</a> </p>
            </div>
        </div>
    )
}

export default Login