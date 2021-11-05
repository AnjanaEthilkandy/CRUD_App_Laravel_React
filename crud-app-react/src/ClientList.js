import Header from './Header'
import React, {useEffect, useState} from "react"
import {Table} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import client from './client.jpg';
function ClientList() {
    const[data, setData] =  useState([]);
    const history = useHistory()
    let user = JSON.parse(localStorage.getItem('user-info'))
    useEffect (() => {
        getData();
    }, [])
    async function deleteOperation(id) {
        let result = await fetch("http://localhost:8000/api/delete/"+id, {
            method : 'DELETE'
        });
        result = await result.json()
        getData();
    }
    async function getData () {
        if(user){
            let result = await fetch("http://localhost:8000/api/list/"+user.id,{
                method : 'POST'
            });
            result = await result.json();
            setData(result);
        }
    }
    return (
        <div>
            <Header/>
            <div className="col-sm-8 offset-sm-2 form-wrapper">
                {
                    data.length > 0 ?
                    <Table>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Profile Picture</td>
                        <td></td>
                    </tr>
                    {
                        data.map((item)=>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td><img style={{width:100}} src={"http://localhost:8000/"+item.profile_pic} /></td>
                                <td><button onClick = {()=>deleteOperation(item.id)} className="delete-button">Delete</button></td>
                                <td>
                                    <Link to={"update/"+item.id}>
                                        <button className="btn btn-primary">Update</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                </Table>
                : 
                <>
                    {
                    user ?
                    <>
                    <img src={client} height="250px" alt="Client Image"/>
                    <br/><br/><br/>
                    <p>Hi <strong>{user.name}</strong>, welcome to your admin account</p>
                    </>
                    :  
                    history.push("/login")
                    }
                </>
                }

            </div>
        </div>
    )
}

export default ClientList;