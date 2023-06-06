import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usertokenctx } from '../../App';

export default function EditUser()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userDataName, setUserDataName] = useState(null);
    const [userDataEmail, setUserDataEmail] = useState(null);
    const [userDataPassword, setUserDataPassword] = useState("");
    const {id} = useParams();
    const userTokenData = useContext(usertokenctx);

    useEffect( () => {fetch('https://api.maristproject.online/api/users/get', { method: "POST",
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + userTokenData,
    },
    body:JSON.stringify({"id": id}),
    }).then((res) => res.json())
    .then((json) => {setUserDataName(json.name);setUserDataEmail(json.email);})},[])
    function editUser()
    {
      
        var userName = document.getElementById("newUserName").value;
        var userEmail = document.getElementById("newUserEmail").value;
        var userPassword = document.getElementById("newUserPassword").value;

        fetch('https://api.maristproject.online/api/users', { method: "PUT",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"id": id,"email":userDataEmail, "name":userDataName,"password":userDataPassword}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }

    function deleteUser()
    {
      
       

        fetch('https://api.maristproject.online/api/users', { method: "DELETE",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"id": id}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }


    return(<>
    {navState && <Navigate to ="/users" />}
    <div className='main-data-container'>
        <h2>Edit User</h2>
        {userDataName && <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='newUserName' label='User Name' value={userDataName} onChange={(e) => setUserDataName(e.target.value)}/>
      <MDBInput className='mb-4' type='email' id='newUserEmail' label='Email address' value={userDataEmail} onChange={(e) => setUserDataEmail(e.target.value)}/>
      <MDBInput className='mb-4' type='password' id='newUserPassword' label='Password' value={userDataPassword}  onChange={(e) => setUserDataPassword(e.target.value)}/>
        {errorState && <p className='error error-note'>Please check all details and try again</p>}

      <MDBBtn type='button' block onClick={editUser}>
        Update User
      </MDBBtn>
      <MDBBtn type='button' block onClick={deleteUser} className="btn btn-danger">
        Delete User
      </MDBBtn>
    </form>}
    
    </div>
    </>);
}