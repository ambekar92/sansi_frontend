import React, { Component } from 'react';  
import Leftside from './Leftside';  
import Header from './Header'  
import Footer from './Footer'  
import Home from '../Pages/Main/Home.js'  
// import { Route, Switch, Redirect } from 'react-router-dom';  
export class Layout extends Component {  
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>  
    render() {  
        return (  
            <div>  
                <div id="wrapper">  
                    <Leftside></Leftside>  
                    <div id="content-wrapper" className="d-flex flex-column">  
                        <div id="content">  
                            <Header />  
                            <Home></Home>    
                        </div>  
                        <Footer />  
                    </div>  
                </div>  
            </div>  
        )  
    }  
}  
  
export default Layout 