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

export default function EditPage()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const [pageTitle, setPageTitle] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const [pageSlug, setPageSlug] = useState("");
    
    const {id} = useParams();
    const userTokenData = useContext(usertokenctx);

    useEffect( () => {fetch('https://api.maristproject.online/api/pages/get', { method: "POST",
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + userTokenData,
    },
    body:JSON.stringify({"id": id}),
    }).then((res) => res.json())
    .then((json) => {setPageTitle(json.title);setPageContent(json.content);setPageSlug(json.slug);})},[])
    function editPage()
    {
      
        var pageTitle = document.getElementById("newPageTitle").value;
        var pageContent = document.getElementById("newPageContent").value;
        var pageSlug = document.getElementById("newPageSlug").value;

        fetch('https://api.maristproject.online/api/pages', { method: "PUT",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"id": id,"title":pageTitle, "content":pageContent,"slug":pageSlug}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }

    function deletePage()
    {
      
       

        fetch('https://api.maristproject.online/api/pages', { method: "DELETE",
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
    {navState && <Navigate to ="/pages" />}
    <div className='main-data-container'>
        <h2>Edit Page</h2>
        {pageTitle && <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='newPageTitle' label='Page Title' value={pageTitle} onChange={(e) => setPageTitle(e.target.value)}/>
      <MDBInput className='mb-4' type='text' id='newPageSlug' label='URL / Slug' value={pageSlug} onChange={(e) => setPageSlug(e.target.value)}/>
      <MDBTextArea className='mb-4' id='newPageContent' label='Page Content' value={pageContent}  onChange={(e) => setPageContent(e.target.value)}/>
        {errorState && <p className='error error-note'>Please check all details and try again</p>}

      <MDBBtn type='button' block onClick={editPage}>
        Update Page
      </MDBBtn>
      <MDBBtn type='button' block onClick={deletePage} className="btn btn-danger">
        Delete Page
      </MDBBtn>
    </form>}
    
    </div>
    </>);
}