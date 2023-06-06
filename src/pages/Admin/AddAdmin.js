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
    function createAdmin()
    {
      
        var adminName = document.getElementById("newAdminName").value;
        var adminEmail = document.getElementById("newAdminEmail").value;
        var adminPassword = document.getElementById("newAdminPassword").value;

        fetch('https://api.maristproject.online/api/admins/add', { method: "POST",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"email":adminEmail,"user_type":"admin","name":adminName,"password":adminPassword}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }
    return(<>
    {navState && <Navigate to ="/admins" />}
    <div className='main-data-container'>
        <h2>Add New Admin</h2>
    <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='newAdminName' label='Admin Name' />
      <MDBInput className='mb-4' type='email' id='newAdminEmail' label='Email address' />
      <MDBInput className='mb-4' type='password' id='newAdminPassword' label='Password' />
        {errorState && <p className='error error-note'>Please check all details and try again</p>}

      <MDBBtn type='button' block onClick={createAdmin}>
        Add Admin
      </MDBBtn>
    </form>
    </div>
    </>);
}