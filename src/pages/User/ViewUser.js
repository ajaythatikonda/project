import { useContext, useEffect, useState } from "react";
import { usertokenctx } from "../../App";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";




export default function ViewUser(){
const [usersList, setUsersList] = useState([]);
const userTokenData = useContext(usertokenctx);

useEffect( () => {fetch('https://api.maristproject.online/api/users', { method: "POST",
headers: {
  Accept: 'application.json',
  'Content-Type': 'application/json',
  'Authorization' : 'Bearer ' + userTokenData,
},
}).then((res) => res.json())
.then((json) => {setUsersList(json);})},[])

const columns = [
  {
      name: 'Id',
      selector: row => row.id,
  },
  {
    name: 'Name',
    selector: row => row.name,
},
  {
      name: 'Email',
      selector: row => row.email,
  },
  {
    name: 'Edit',
    selector: row =>  <Link className="btn btn-primary edit-button" to={"/users/edit/" + row.id}>Edit</Link>,
},
];



    return(<>
      <div className="main-data-container">
        <h2>All Users</h2>
        <div className="row">
          <div className="col float-right">
           <Link className="btn btn-secondary add-button" to="/users/add">Add New User</Link>
          </div>
        </div>
     <DataTable columns={columns} data={usersList} />
     </div>
     </>);
}