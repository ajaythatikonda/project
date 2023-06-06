import { useContext, useEffect, useState } from "react";
import { usertokenctx } from "../../App";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";




export default function ViewMessage(){
const [messagesList, setMessagesList] = useState([]);
const userTokenData = useContext(usertokenctx);

useEffect( () => {fetch('https://api.maristproject.online/api/messages', { method: "POST",
headers: {
  Accept: 'application.json',
  'Content-Type': 'application/json',
  'Authorization' : 'Bearer ' + userTokenData,
},
}).then((res) => res.json())
.then((json) => {setMessagesList(json);})},[])

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
      name: 'Message',
      selector: row => row.message,
  },
];



    return(<>
      <div className="main-data-container">
        <h2>Messages</h2>
        
     <DataTable columns={columns} data={messagesList} />
     </div>
     </>);
}