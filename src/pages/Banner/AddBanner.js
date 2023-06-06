import axios from 'axios';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBTextArea,
    MDBFile
  } from 'mdb-react-ui-kit';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usertokenctx } from '../../App';

export default function AddBanner()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const [bannerTitle, setBannerTitle] = useState("");
    

    const userTokenData = useContext(usertokenctx);

    async function addBanner()
    {
      
        var Title = document.getElementById("bannerTitle").value;
        var upload_image = document.getElementById("banner_image").files[0];
        var formdata = new FormData();
       
        formdata.append('title', Title);
        formdata.append('image',upload_image );
       
        try {
            const res = await axios.post('https://api.maristproject.online/api/banners/add', formdata, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization' : 'Bearer ' + userTokenData,
              },
            });
      
            if (res.data.status == "success") {
                setNavState(true)
             
            }
          } catch (error) {
            setErrorState(true)
          }
    }

   

    return(<>
    {navState && <Navigate to ="/banners" />}
    <div className='main-data-container'>
        <h2>Add New Banner</h2>
       <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='bannerTitle' label='Banner Title' value={bannerTitle} onChange={(e)=>{setBannerTitle(e.target.value)}}/>
      <br></br>
     
      <br></br>
      
      <MDBFile name="banner_image" id="banner_image" label="Upload Banner" />
      <br></br>
        {errorState && <p className='error error-note'>Please check all details and try again</p>}
<br></br>
      <MDBBtn type='button' block onClick={addBanner}>
        Add Banner
      </MDBBtn>
    </form>
    
    </div>
    </>);
}