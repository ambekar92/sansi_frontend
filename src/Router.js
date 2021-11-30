
import React from 'react'   
import { Route, Routes } from 'react-router-dom';

import Layout  from './Layout/Layout';
import MedicalHome from './Pages/Medical/MedicalHome';
import Test from './Pages/Test/Test';


function RouterNav() {
    return(
        <div className="App">  
            <h1>Iam Router</h1>
            <Routes>
                <Route path='/' element={<Layout />}></Route>
                <Route path='/home' element={<MedicalHome />}></Route>
                <Route path='/test' element={<Test />}></Route>
            </Routes>      
        </div>
    );
}


export default RouterNav;