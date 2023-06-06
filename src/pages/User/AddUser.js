import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { usertokenctx } from '../../App';

export default function AddUser()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const userTokenData = useContext(usertokenctx);
    function createUser()
    {
      
        var userName = document.getElementById("newUserName").value;
        var userEmail = document.getElementById("newUserEmail").value;
        var userPassword = document.getElementById("newUserPassword").value;

        fetch('https://api.maristproject.online/api/users/add', { method: "POST",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"email":userEmail, "name":userName,"password":userPassword}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }
    return(<>
    {navState && <Navigate to ="/users" />}
    <div className='main-data-container'>
        <h2>Add New User</h2>
    <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='newUserName' label='User Name' />
      <MDBInput className='mb-4' type='email' id='newUserEmail' label='Email address' />
      <MDBInput className='mb-4' type='password' id='newUserPassword' label='Password' />
        {errorState && <p className='error error-note'>Please check all details and try again</p>}

      <MDBBtn type='button' block onClick={createUser}>
        Add User
      </MDBBtn>
    </form>
    </div>
    </>);
}