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

export default function EditAdmin()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const [userData, setUserData] = useState(null);
    const [adminDataName, setAdminDataName] = useState(null);
    const [adminDataEmail, setAdminDataEmail] = useState(null);
    const [adminDataPassword, setAdminDataPassword] = useState("");
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
    .then((json) => {setAdminDataName(json.name);setAdminDataEmail(json.email);})},[])
    function editAdmin()
    {
      

        fetch('https://api.maristproject.online/api/admins', { method: "PUT",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"id": id,"email":adminDataEmail,"user_type":"admin", "name":adminDataName,"password":adminDataPassword}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }

    function deleteAdmin()
    {
      
       

        fetch('https://api.maristproject.online/api/admins', { method: "DELETE",
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
    {navState && <Navigate to ="/admins" />}
    <div className='main-data-container'>
        <h2>Edit Admin</h2>
        {adminDataName && <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='newAdminName' label='Admin Name' value={adminDataName} onChange={(e) => setAdminDataName(e.target.value)}/>
      <MDBInput className='mb-4' type='email' id='newAdminEmail' label='Email address' value={adminDataEmail} onChange={(e) => setAdminDataEmail(e.target.value)}/>
      <MDBInput className='mb-4' type='password' id='newAdminPassword' label='Password' value={adminDataPassword}  onChange={(e) => setAdminDataPassword(e.target.value)}/>
        {errorState && <p className='error error-note'>Please check all details and try again</p>}

      <MDBBtn type='button' block onClick={editAdmin}>
        Update Admin
      </MDBBtn>
      <MDBBtn type='button' block onClick={deleteAdmin} className="btn btn-danger">
        Delete Admin
      </MDBBtn>
    </form>}
    
    </div>
    </>);
}