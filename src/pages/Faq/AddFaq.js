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

export default function AddFaq()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const userTokenData = useContext(usertokenctx);
    function createFaq()
    {
      
        var question = document.getElementById("question").value;
        var answer = document.getElementById("answer").value;

        fetch('https://api.maristproject.online/api/faqs/add', { method: "POST",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"question":question, "answer":answer}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }
    return(<>
    {navState && <Navigate to ="/faqs" />}
    <div className='main-data-container'>
        <h2>Add New FAQ</h2>
    <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='question' label='Question' />
      <MDBTextArea className='mb-4' id='answer' label='Answer' />
        {errorState && <p className='error error-note'>Please check all details and try again</p>}

      <MDBBtn type='button' block onClick={createFaq}>
        Add FAQ
      </MDBBtn>
    </form>
    </div>
    </>);
}