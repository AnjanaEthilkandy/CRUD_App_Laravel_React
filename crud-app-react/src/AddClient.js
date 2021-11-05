import Header from './Header'
import React, {useState} from "react"
import {useHistory} from 'react-router-dom'
function AddClient() {
    const history = useHistory()
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [name, setName] = useState("")
    const [file, setFile] = useState("")
    const [email, setEmail] = useState("")

    async function addClient(){
        console.warn({name, file, email});
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);
        formData.append('email', email);
        formData.append('admin_id', user.id);
        let result = await fetch("http://localhost:8000/api/add", {
            method : 'POST',
            body : formData
        });
        history.push("/")
    }
    return (
        <div>
            <Header/>
            <div className="col-sm-6 offset-sm-3 form-wrapper">
                <br/>
                <input type="text" onChange={(e)=>setName(e.target.value)} className="form-field" placeholder="Name"/>
                <br/> 
                <input type="text" onChange={(e)=>setEmail(e.target.value)} className="form-field" placeholder="Email"/>
                <br/>
                <input type="file" onChange={(e)=>setFile(e.target.files[0])}  className="form-control" placeholder="Profile Pic"/>      
                <br/>      
                <button onClick={addClient} className="btn form-button">Add Client</button>
            </div>
        </div>
    )
}

export default AddClient