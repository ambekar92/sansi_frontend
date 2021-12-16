import React, { Component } from 'react'  
import Layout from '../../Layout/Layout';  
import ViewProduct  from './ViewProduct';
import AddProduct from './AddProduct';


export class Product extends Component {  
    constructor(props) {
        super(props);
        this.state={
            view:false,
            add:true
        };
    }

    viewProduct = () =>{
        this.setState({add: false});
        this.setState({view: true});
    }

    addProduct = () =>{
        this.setState({add: true});
        this.setState({view: false});
    }

    render() {       
        let getAddStatus= this.state.add; 
        let getViewStatus= this.state.view; 
        let comp='';

        if (getAddStatus) {
            comp = <AddProduct/>      
        } 
          
        if(getViewStatus) {      
            comp = <ViewProduct/>  
        }

        return (
            <div>
                <Layout/>
                <div id="content-wrapper" className="d-flex flex-column">  
                    <div id="content">  
                        <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Inventory</h1>
                        </div>

                            <section className="section">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-body">   

                                            <div className="col-lg-12 col-xs-6 textt-right">
                                                <button type="button"  className="btn btn-primary rounded-pill" onClick={this.addProduct}>
                                                    <i className="bi bi-plus-circle"></i> Add Product</button>
                                                <button type="button"  className="btn btn-primary rounded-pill" onClick={this.viewProduct}>
                                                    <i className="bi bi-eye"></i> View Product</button>
                                            </div>

                                                {comp}
                                                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>                    
                        </main>
                    </div>
                </div>

            </div>
            
        );
    }
}
    
export default Product;  