import React, { Component } from 'react';  
import Leftside from './Leftside';  
import Header from './Header'   
import ItemService from '../Service/commonService';
//import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

export class Layout extends Component {  
    constructor(props) {
        super(props);  
        this.itemService = new ItemService();
        this.state={
            menu:[]
        }
      }

    componentDidMount() {
        this.getMenuList();        
    }

    getMenuList() {        
      this.itemService.getMenuList().then(items => {
          //console.log("getMenuList >>",items);
          this.setState({menu: items});
      });
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>  
    render() {  
        return (  
            <div>  
                <div id="wrapper">  
                    <Leftside info={this.state.menu}/>
                    <Header /> 
                </div>  
            </div>  
        )  
    }  
}  
  
export default Layout 