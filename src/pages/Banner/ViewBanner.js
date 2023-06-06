import { useContext, useEffect, useState } from "react";
import { usertokenctx } from "../../App";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";




export default function ViewFaq(){
const [bannersList, setbannersList] = useState([]);
const userTokenData = useContext(usertokenctx);

useEffect( () => {fetch('https://api.maristproject.online/api/banners', { method: "POST",
headers: {
  Accept: 'application.json',
  'Content-Type': 'application/json',
  'Authorization' : 'Bearer ' + userTokenData,
},
}).then((res) => res.json())
.then((json) => {setbannersList(json);})},[])

const columns = [
  {
      name: 'Id',
      width: '150px',
      selector: row => row.id,
  },
  {
    name: 'Title',
    width: '300px',
    selector: row => row.title,
},
  {
      name: 'Image',
      width: '400px',
      selector: row => <img src={"https://api.maristproject.online/"+row.image} style={{display:"block",margin:"10px",width:"100%"}} />,
  },
  {
    name: 'Delete',
    selector: row =>  <Link className="btn btn-danger edit-button" to={"/banners/edit/" + row.id}>Delete</Link>,
},
];



    return(<>
      <div className="main-data-container">
        <h2>Banners</h2>
        <div className="row">
          <div className="col float-right">
           <Link className="btn btn-secondary add-button" to="/banners/add">Add New Banner</Link>
           <br></br>
          </div>
        </div>
     <DataTable columns={columns} data={bannersList} />
     </div>
     </>);
}