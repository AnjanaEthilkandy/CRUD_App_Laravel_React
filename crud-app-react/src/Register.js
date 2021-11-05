import React, {useState, useEffect} from "react"
import {useHistory} from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios';
import config from './config';

function Register() {
    useEffect (() => {
        if(localStorage.getItem('user-info')){
            history.push("/")
        }
    },[])
    const [firstName, setFirstName] = useState("")
    const [surName, setSurName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [formError, setFormError] = useState("")
    const [token, setToken] = useState("")
    const history = useHistory()

    function signUp(){
        if(!token){
            setFormError("You must verify the captcha");
            return;
        }
        let name = firstName + " " + surName
        let item = {name, password, email, token}
        console.log(item);
        if(password != confirmPassword){
            setFormError("Password Not Matching");
        } else if(email != confirmEmail){
            setFormError("Email not matching");
        } else {
            axios.post(config.API_BASE + 'register',
            JSON.stringify(item) , 
            {   headers : {
                    "Content-Type" : 'application/json',
                    "Accept" : 'application/json'
                }
            })
	      	.then((response) => {
                console.log(response);
                localStorage.setItem("user-info", JSON.stringify(response.data))
                setToken("")
                history.push("/") 
	      	})
	      	.catch((error) => {
                console.log(error);
	      		let data = error.response.data;
                setFormError(data.errors);
	      	});
        }
    }
    return (
        <>
        <div className="col-sm-4 offset-sm-4 form-wrapper">
            <p class="form-title">Create your account</p>
            {formError=="" ? "" : <p className="text-danger form-error">{formError}</p>} 
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-field" placeholder="First name"/>
            <br/>
            <input type="text" value={surName} onChange={(e) => setSurName(e.target.value)} className="form-field" placeholder="Surname"/>
            <br/>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-field" placeholder="Email address"/>
            <br/>
            <input type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="form-field" placeholder="Confirm Email address"/>
            <br/>
            <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)} className="form-field" placeholder="Password"/>
            <br/>
            <input type="password" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)} className="form-field" placeholder="Repeat your Password"/>
            <br/>
            <ReCAPTCHA sitekey="6LdSifIcAAAAAIIcYO_T01f94oGR4ygndngVQPXK" className="google-recaptcha" onChange={token => setToken(token)}
             onExpired={e => setToken("")}/>
             <br/>
            <button onClick ={signUp} className="btn form-button create">Create Account</button>
            <br/>
            <p class="small-text">Already a member? <a href="/login">Sign In</a> </p>
        </div>
        </>
    )
}

export default Register