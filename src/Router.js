
import React from 'react'   
import { Route, Routes } from 'react-router-dom';

// import Layout  from './Layout/Layout';
import Page404 from './Pages/Medical/404Page';
import Login from './Pages/Login/Login';
import MedicalHome from './Pages/Medical/MedicalHome';
import Inventory from './Pages/Medical/Inventory';

import Test from './Pages/Test/Test';

function RouterNav() {
    return(
        <div className="App">  
            {/* <Page404/> */}
            {/* <Layout/> */}
            <Routes>
                <Route path='*' element={<Page404 />}></Route>
                <Route path='/' element={<MedicalHome />}></Route>
                <Route path='/home' element={<MedicalHome />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/inventory' element={<Inventory />}></Route>
                <Route path='/test' element={<Test />}></Route>
            </Routes>  
            {/* <Footer/>     */}
        </div>
    );
}


export default RouterNav;