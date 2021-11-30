import React, { Component } from 'react';  
import Leftside from './Leftside';  
import Header from './Header'  
import Footer from './Footer'  
import MedicalHome from '../Pages/Medical/MedicalHome'  
//import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

export class Layout extends Component {  
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>  
    render() {  
        return (  
            <div>  
                <div id="wrapper">  
                    <Leftside />

                    <div id="content-wrapper" className="d-flex flex-column">  
                        <div id="content">  
                            <Header />  
                            <MedicalHome />    
                        </div>  
                        <Footer />  
                    </div>  
                </div>  

                    {/* <div id="wrapper">                        
                        <h1>Test Mammals</h1>
                        <Leftside />
                        <div id="content-wrapper" className="d-flex flex-column">  
                            <div id="content">  
                                <Header />  
                                <BrowserRouter>
                                    <Switch>
                                        <Route path="/home">
                                            <Home />   
                                        </Route>
                                    </Switch>
                                </BrowserRouter>
                                
                            </div>  
                            <Footer />  
                        </div>                       
                    </div> */}
                    
            </div>  
        )  
    }  
}  
  
export default Layout 