import { useContext, useEffect, useState } from "react";
import { usertokenctx } from "../../App";
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";




export default function ViewFaq(){
const [faqsList, setFaqsList] = useState([]);
const userTokenData = useContext(usertokenctx);

useEffect( () => {fetch('https://api.maristproject.online/api/faqs', { method: "POST",
headers: {
  Accept: 'application.json',
  'Content-Type': 'application/json',
  'Authorization' : 'Bearer ' + userTokenData,
},
}).then((res) => res.json())
.then((json) => {setFaqsList(json);})},[])

const columns = [
  {
      name: 'Id',
      selector: row => row.id,
  },
  {
    name: 'Question',
    selector: row => row.question,
},
  {
      name: 'Answer',
      selector: row => row.answer,
  },
  {
    name: 'Edit',
    selector: row =>  <Link className="btn btn-primary edit-button" to={"/faqs/edit/" + row.id}>Edit</Link>,
},
];



    return(<>
      <div className="main-data-container">
        <h2>FAQs</h2>
        <div className="row">
          <div className="col float-right">
           <Link className="btn btn-secondary add-button" to="/faqs/add">Add New FAQ</Link>
          </div>
        </div>
     <DataTable columns={columns} data={faqsList} />
     </div>
     </>);
}