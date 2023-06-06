import { useContext } from "react";
import { userloginctx } from "../App";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';

export default function Login()
{
    const userLoginCtx = useContext(userloginctx)

    function userLogin()
    {
        var inputEmail = document.getElementById("userInputEmail").value;
        var inputPassword = document.getElementById("userInputPassword").value;

        fetch('https://api.maristproject.online/api/login', { method: "POST",
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email" : inputEmail, "password" : inputPassword}),
    }).then((res) => res.json())
    .then((json) => {
                      if(json.status == "success")
                      {userLoginCtx({"userData": JSON.stringify(json.data), "userToken": json.token})}
                    }
                    )
    }

    return(
        <> <MDBContainer className="my-5">

        <MDBCard>
          <MDBRow className='g-0'>
  
            <MDBCol md='6'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
            </MDBCol>
  
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>
  
                <div className='d-flex flex-row mt-2'>
                  <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                  <span className="h1 fw-bold mb-0"><img src="/images/logo.jpg" /></span>
                </div>
  
                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
  
                  <MDBInput wrapperClass='mb-4' label='Email address' id='userInputEmail' type='email' size="lg"/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='userInputPassword' type='password' size="lg"/>
  
                <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={userLogin}>Login</MDBBtn>
  
              </MDBCardBody>
            </MDBCol>
  
          </MDBRow>
        </MDBCard>
  
      </MDBContainer>
      </>
    )
}

