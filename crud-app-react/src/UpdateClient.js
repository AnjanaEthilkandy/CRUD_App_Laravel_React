import Header from './Header'
import {withRouter} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
function UpdateClient(props) {
    const history = useHistory()
    const[data, setData] = useState([])
    const [name, setName] = useState("")
    const [file, setFile] = useState("")
    const [email, setEmail] = useState("")
    useEffect(async()=>{
        let result = await fetch("http://localhost:8000/api/client/"+props.match.params.id);
        result = await result.json();
        setData(result)
        setName(result.name)
        setEmail(result.email)
        setFile(result.file)
    },[])
    async function editClient(id) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);
        formData.append('email', email);
        let result = await fetch("http://localhost:8000/api/update/"+id+"?_method=PUT", {
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
                <input type="text" defaultValue={data.name} onChange={(e)=>setName(e.target.value)} className="form-field" placeholder="Name"/>
                <br/>               
                <input type="text" defaultValue={data.email}  onChange={(e)=>setEmail(e.target.value)} className="form-field" placeholder="Email"/>
                <br/> 
                <input type="file" defaultValue={data.profile_pic} onChange={(e)=>setFile(e.target.files[0])}  className="form-control" placeholder="Profile Pic"/>      
                <br/>
                <img style={{width:100}} src={"http://localhost:8000/"+data.profile_pic}/>
                <br/>
                <button className="btn form-button" onClick={()=>editClient(data.id)}>Update Client</button>
            </div>


        </div>
    )
}

export default withRouter(UpdateClient)