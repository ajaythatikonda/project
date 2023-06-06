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

export default function EditUser()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const [userData, setUserData] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const {id} = useParams();
    const userTokenData = useContext(usertokenctx);

    useEffect( () => {fetch('https://api.maristproject.online/api/faqs/get', { method: "POST",
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + userTokenData,
    },
    body:JSON.stringify({"id": id}),
    }).then((res) => res.json())
    .then((json) => {setQuestion(json.question);setAnswer(json.answer);})},[])
    function editFaq()
    {
      
        fetch('https://api.maristproject.online/api/faqs', { method: "PUT",
        headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"id": id,"question":question, "answer":answer}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }

    function deleteFaq()
    {
      
        fetch('https://api.maristproject.online/api/faqs', { method: "DELETE",
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
    {navState && <Navigate to ="/faqs" />}
    <div className='main-data-container'>
        <h2>Edit FAQ</h2>
        {question && <form className='justify-content-center form-container' style={{width:"100%"}} >
      <MDBInput className='mb-4' type='text' id='question' label='Question' value={question} onChange={(e) => setQuestion(e.target.value)}/>
      <MDBTextArea className='mb-4' id='answer' label='Answer' value={answer}  onChange={(e) => setAnswer(e.target.value)}/>
        {errorState && <p className='error error-note'>Please check all details and try again</p>}

      <MDBBtn type='button' block onClick={editFaq}>
        Update FAQ
      </MDBBtn>
      <MDBBtn type='button' block onClick={deleteFaq} className="btn btn-danger">
        Delete FAQ
      </MDBBtn>
    </form>}
    
    </div>
    </>);
}