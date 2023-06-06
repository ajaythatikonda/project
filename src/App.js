
import { createContext, useState, useContext, useEffect } from 'react';
import './App.css';
import Master from './components/Master';
import {Route, Routes, Link, Navlink} from 'react-router-dom';
import Login from './pages/Login';
import ViewUser from './pages/User/ViewUser';
import EditUser from './pages/User/EditUser';
import AddUser from './pages/User/AddUser';
import ViewTeam from './pages/Team/ViewTeam';
import EditTeam from './pages/Team/EditTeam';
import AddTeam from './pages/Team/AddTeam';
import ViewAdmin from './pages/Admin/ViewAdmin';
import EditAdmin from './pages/Admin/EditAdmin';
import AddAdmin from './pages/Admin/AddAdmin';
import ViewPage from './pages/Page/ViewPage';
import EditPage from './pages/Page/EditPage';
import AddPage from './pages/Page/AddPage';
import ViewFaq from './pages/Faq/ViewFaq';
import EditFaq from './pages/Faq/EditFaq';
import AddFaq from './pages/Faq/AddFaq';
import ViewBanner from './pages/Banner/ViewBanner';
import EditBanner from './pages/Banner/EditBanner';
import AddBanner from './pages/Banner/AddBanner';
import ViewMessage from './pages/Message/ViewMessage';
import EditMessage from './pages/Message/EditMessage';




export const userdatactx = createContext();
export const usertokenctx = createContext();
export const userloginctx = createContext();
export const userlogoutctx = createContext();

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(
   () =>{ if(localStorage.getItem("userTokenLocal"))
  {
    setUserInfo(localStorage.getItem("userDataLocal"));
    setUserToken(localStorage.getItem("userTokenLocal"));
  }},[userToken]
  )
  

  const userLogin = (loggedin) => {
    localStorage.setItem("userTokenLocal", loggedin.userToken);
    localStorage.setItem("userDataLocal", loggedin.userData);
    setUserInfo(loggedin.userData);
    setUserToken(loggedin.userToken);

  }

  

  const userLogout = () => {
    localStorage.removeItem("userTokenLocal");
    localStorage.removeItem("userDataLocal");
    setUserInfo(null);
    setUserToken(null);

  }

  
  


  return (
    <>
    <userdatactx.Provider value={userInfo} >
        <usertokenctx.Provider value={userToken} >
          <userloginctx.Provider value={userLogin} >
            <userlogoutctx.Provider value={userLogout} >
            {!userToken && <Routes><Route path="/" element={<Login/>} /></Routes>}
            {userToken && <>
              <Routes>
                  <Route path="/" element={<Master/>} >
                    <Route index element={<ViewUser/>}/>

                    <Route path="users"  >
                        <Route index element={<ViewUser/>}/>
                        <Route path="edit/:id" element={<EditUser/>} />
                        <Route path="add" element={<AddUser/>} />
                    </Route>
                    <Route path="admins"  >
                        <Route index element={<ViewAdmin/>}/>
                        <Route path="edit/:id" element={<EditAdmin/>} />
                        <Route path="add" element={<AddAdmin/>} />
                    </Route>
                    <Route path="teams"  >
                        <Route index element={<ViewTeam/>}/>
                        <Route path="edit/:id" element={<EditTeam/>} />
                        <Route path="add" element={<AddTeam/>} />
                    </Route>
                    <Route path="banners"  >
                        <Route index element={<ViewBanner/>}/>
                        <Route path="edit/:id" element={<EditBanner/>} />
                        <Route path="add" element={<AddBanner/>} />
                    </Route>
                    <Route path="pages"  >
                        <Route index element={<ViewPage/>}/>
                        <Route path="edit/:id" element={<EditPage/>} />
                        <Route path="add" element={<AddPage/>} />
                    </Route>
                    <Route path="faqs"  >
                        <Route index element={<ViewFaq/>}/>
                        <Route path="edit/:id" element={<EditFaq/>} />
                        <Route path="add" element={<AddFaq/>} />
                    </Route>
                    <Route path="messages"  >
                        <Route index element={<ViewMessage/>}/>
                        <Route path="edit/:id" element={<EditMessage/>} />
                    </Route>
                  </Route>
              </Routes>
              </> }
            </userlogoutctx.Provider>
          </userloginctx.Provider>
        </usertokenctx.Provider>
    </userdatactx.Provider>
    </>
  );
}

export default App;
