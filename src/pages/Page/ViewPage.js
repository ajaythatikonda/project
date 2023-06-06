import { useContext, useEffect, useState } from "react";
import { usertokenctx } from "../../App";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";




export default function ViewPage(){
const [pagesList, setPagesList] = useState([]);
const userTokenData = useContext(usertokenctx);

useEffect( () => {fetch('https://api.maristproject.online/api/pages', { method: "POST",
headers: {
  Accept: 'application.json',
  'Content-Type': 'application/json',
  'Authorization' : 'Bearer ' + userTokenData,
},
}).then((res) => res.json())
.then((json) => {setPagesList(json);})},[])

const columns = [
  {
      name: 'Id',
      selector: row => row.id,
  },
  {
    name: 'Title',
    selector: row => row.title,
},
  {
      name: 'Slug',
      selector: row => row.slug,
  },
  {
    name: 'Edit',
    selector: row =>  <Link className="btn btn-primary edit-button" to={"/pages/edit/" + row.id}>Edit</Link>,
},
];



    return(<>
      <div className="main-data-container">
        <h2>Pages</h2>
        <div className="row">
          <div className="col float-right">
           <Link className="btn btn-secondary add-button" to="/pages/add">Add New Page</Link>
          </div>
        </div>
     <DataTable columns={columns} data={pagesList} />
     </div>
     </>);
}