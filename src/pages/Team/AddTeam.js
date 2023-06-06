import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBTextArea
  } from 'mdb-react-ui-kit';
import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { usertokenctx } from '../../App';

export default function AddTeam()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const userTokenData = useContext(usertokenctx);
    function createUser()
    {
      
        var userName = document.getElementById("newUserName").value;
        var userEmail = document.getElementById("newUserEmail").value;
        var userDesignation = document.getElementById("newUserDesignation").value;
        var userDescription = document.getElementById("newUserDescription").value;
        //var userPhoto = document.getElementById("newUserPhoto").value;

        fetch('https://api.maristproject.online/api/teams/add', { method: "POST",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"email":userEmail, "name":userName,"designation":userDesignation,"description":userDescription}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }
    return(<>
    {navState && <Navigate to ="/teams" />}
    <div className='main-data-container'>
        <h2>Add New User</h2>
    <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='newUserName' label='User Name' />
      <MDBInput className='mb-4' type='email' id='newUserEmail' label='Email address' />
      <MDBInput className='mb-4' type='text' id='newUserDesignation' label='Designation' />
      <MDBTextArea className='mb-4' id='newUserDescription'/>
        {errorState && <p className='error error-note'>Please check all details and try again</p>}

      <MDBBtn type='button' block onClick={createUser}>
        Add Team Member
      </MDBBtn>
    </form>
    </div>
    </>);
}