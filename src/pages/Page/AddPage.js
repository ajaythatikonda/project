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

export default function AddPage()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const userTokenData = useContext(usertokenctx);
    function createPage()
    {
      
        var pageTitle = document.getElementById("newPageTitle").value;
        var pageContent = document.getElementById("newPageContent").value;
        var pageSlug = document.getElementById("newPageSlug").value;

        fetch('https://api.maristproject.online/api/pages/add', { method: "POST",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"content":pageContent, "title":pageTitle,"slug":pageSlug}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }
    return(<>
    {navState && <Navigate to ="/pages" />}
    <div className='main-data-container'>
        <h2>Add New Page</h2>
    <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='newPageTitle' label='Page Title' />
      <MDBInput className='mb-4' type='text' id='newPageSlug' label='Page URL Slug' />
      <MDBTextArea className='mb-4'  id='newPageContent' label='Page Content' />
        {errorState && <p className='error error-note'>Please check all details and try again</p>}

      <MDBBtn type='button' block onClick={createPage}>
        Add Page
      </MDBBtn>
    </form>
    </div>
    </>);
}