import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBTextArea
  } from 'mdb-react-ui-kit';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usertokenctx } from '../../App';

export default function EditTeam()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userDataName, setUserDataName] = useState(null);
    const [userDataEmail, setUserDataEmail] = useState(null);
    const [userDataDesignation, setUserDataDesignation] = useState("");
    const [userDataDescription, setUserDataDescription] = useState("");
    const {id} = useParams();
    const userTokenData = useContext(usertokenctx);

    useEffect( () => {fetch('https://api.maristproject.online/api/teams/get', { method: "POST",
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + userTokenData,
    },
    body:JSON.stringify({"id": id}),
    }).then((res) => res.json())
    .then((json) => {setUserDataName(json.name);setUserDataEmail(json.email);setUserDataDesignation(json.designation);setUserDataDescription(json.description);})},[])
    function editUser()
    {
      
        var userName = document.getElementById("newUserName").value;
        var userEmail = document.getElementById("newUserEmail").value;
        var userDesignation = document.getElementById("newUserDesignation").value;
        var userDescription = document.getElementById("newUserDescription").value;

        fetch('https://api.maristproject.online/api/teams', { method: "PUT",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"id": id,"email":userDataEmail, "name":userDataName,"designation":userDataDesignation,"description":userDataDescription}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }

    function deleteUser()
    {
      
       

        fetch('https://api.maristproject.online/api/teams', { method: "DELETE",
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
    {navState && <Navigate to ="/teams" />}
    <div className='main-data-container'>
        <h2>Edit User</h2>
        {userDataName && <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='newUserName' label='User Name' value={userDataName} onChange={(e) => setUserDataName(e.target.value)}/>
      <MDBInput className='mb-4' type='email' id='newUserEmail' label='Email address' value={userDataEmail} onChange={(e) => setUserDataEmail(e.target.value)}/>
      <MDBInput className='mb-4' type='text' id='newUserDesignation' label='Designation' value={userDataDesignation}  onChange={(e) => setUserDataDesignation(e.target.value)}/>
      <MDBTextArea className='mb-4' id='newUserDescription' label='Description' value={userDataDescription}  onChange={(e) => setUserDataDescription(e.target.value)}/>
        {errorState && <p className='error error-note'>Please check all details and try again</p>}

      <MDBBtn type='button' block onClick={editUser}>
        Update Team Member Data
      </MDBBtn>
      <MDBBtn type='button' block onClick={deleteUser} className="btn btn-danger">
        Delete Team Member
      </MDBBtn>
    </form>}
    
    </div>
    </>);
}