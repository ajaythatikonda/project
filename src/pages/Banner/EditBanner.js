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

export default function EditBanner()
{
    const [errorState, setErrorState] = useState(false);
    const [navState, setNavState] = useState(false);
    const [bannerTitle, setBannerTitle] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    
    const {id} = useParams();
    const userTokenData = useContext(usertokenctx);

    useEffect( () => {fetch('https://api.maristproject.online/api/banners/get', { method: "POST",
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + userTokenData,
    },
    body:JSON.stringify({"id": id}),
    }).then((res) => res.json())
    .then((json) => {setBannerTitle(json.title);setBannerImage(json.image);})},[])
    // async function editBanner()
    // {
      
    //     var Title = document.getElementById("bannerTitle").value;
    //     var upload_image = document.getElementById("banner_image").files[0];
    //     var formdata = new FormData();
       
    //     formdata.append('id', id);
    //     formdata.append('title', Title);
    //     formdata.append('image',upload_image );
       
    //     try {
    //         const res = await axios.put('https://api.maristproject.online/api/banners', formdata, {
    //           headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization' : 'Bearer ' + userTokenData,
    //           },
    //         });
      
    //         if (res.data.status == "success") {
    //             setNavState(true)
             
    //         }
    //       } catch (error) {
    //         setErrorState(true)
    //       }
    // }

    function deleteBanner()
    {
      
       

        fetch('https://api.maristproject.online/api/banners', { method: "DELETE",
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
        },
        body: JSON.stringify({"id": id}),
        }).then((res) => res.json())
        .then((json) => {if(json.status == "success"){setNavState(true)}})
    }


    return(<>
    {navState && <Navigate to ="/banners" />}
    <div className='main-data-container'>
        <h2>Edit Banner</h2>
        {bannerTitle && <form className='justify-content-center form-container' >
      <MDBInput className='mb-4' type='text' id='bannerTitle' label='Banner Title' value={bannerTitle} onChange={(e) => setBannerTitle(e.target.value)}/>
      <br></br>
      <img src={"https://api.maristproject.online/" + bannerImage} className="preview-image"/>
      <br></br>
      
      {/* <MDBFile name="banner_image" id="banner_image" label="Upload Banner" /> */}
      <br></br>
        {errorState && <p className='error error-note'>Please check all details and try again</p>}
<br></br>
      {/* <MDBBtn type='button' block onClick={editBanner}>
        Update Banner
      </MDBBtn> */}
      <MDBBtn type='button' block onClick={deleteBanner} className="btn btn-danger">
        Delete Banner
      </MDBBtn>
    </form>}
    
    </div>
    </>);
}