import {Link, Navlink, Outlet} from 'react-router-dom';
import { useContext } from 'react';
import { userdatactx, userlogoutctx, usertokenctx } from '../App';
import { Button } from 'react-bootstrap';


function Master()
{
    const userInfoData = useContext(userdatactx);
    const userTokenData = useContext(usertokenctx);
    const userLogoutCtx = useContext(userlogoutctx)

    const LoggedinUser = JSON.parse(userInfoData);
    function userLogout()
    {
        
      fetch('https://api.maristproject.online/api/logout', {method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + userTokenData,
      },
      }).then((res) => res.json())
      .then((json) => {
                        if(json.status == "success")
                        {userLogoutCtx()}
                      }
                      )
                      {userLogoutCtx()}
    }
    return(
       <>
         <div className='header-top'>
         <img src='/images/logo.jpg' />
          <h2>Hello {LoggedinUser.name}</h2>
         </div>
        <div className='main-container'>
        <div className='sidebar'>
              <ul className="sidebar-nav">
                  <li className="nav-item"><Link className="nav-link" to="/admins">Admins</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>         
                  <li className="nav-item"><Link className="nav-link" to="/banners">Banners</Link></li>         
                  <li className="nav-item"><Link className="nav-link" to="/pages">Pages</Link></li>         
                  <li className="nav-item"><Link className="nav-link" to="/faqs">FAQ's</Link></li>         
                  <li className="nav-item"><Link className="nav-link" to="/messages">Messages</Link></li>
              </ul>
                  <Button className="logout" onClick={userLogout}>Logout</Button>         
        </div>
        <Outlet/>
        </div>
        <div className='footer-bottom'>
         <p style={{textAlign:"center",padding:"10px",backgroundColor:"#000",coloe:"#fff"}}>&copy; Marist Team, All Rights Reserved</p>
         </div>
        </>
    )
}

export default Master;