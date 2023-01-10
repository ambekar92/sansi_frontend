
import React, { useState } from 'react'   
import { Route, Routes } from 'react-router-dom';

// import Layout  from './Layout/Layout';
import Page404 from './Pages/Home/404Page';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import AddUser from './Pages/AddNewUser';
import AddCodes from './Pages/AddCodes';
import UserReport from './Pages/UserReport';


// import Inventory from './Pages/Home/Inventory';
// import Test from './Pages/Test/Test';

function getToken() {
    const token = localStorage.getItem('token');
    return token
}

function RouterNav() {
    const [token] = useState(getToken());
    // console.log(">> RouterNav", token);
    if(!token) {
      return <Login/>
    }

    return(
        <div className="App">  
            {/* <Page404/> */}
            {/* <Layout/> */}
            <Routes>
                <Route path='*' element={<Page404 />}></Route>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login/>}></Route>                
                <Route path='/home' element={<Home />}></Route>
                <Route path='/add-user' element={<AddUser />}></Route>
                <Route path='/add-code' element={<AddCodes />}></Route>
                <Route path='/report' element={<UserReport />}></Route>
                {/* <Route path='/inventory' element={<Inventory />}></Route>
                <Route path='/test' element={<Test />}></Route> */}
            </Routes>  
            {/* <Footer/>     */}
        </div>
    );
}


export default RouterNav;