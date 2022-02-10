import React, { Component } from 'react'  
import Layout from '../../Layout/Layout';  
import ViewProduct  from './ViewProduct';
import AddProduct from './AddProduct';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';


export class Product extends Component {  
    constructor(props) {
        super(props);
        this.state={
            view:true,
            add:false,
            headerName:'View Product',
            items:[]
        };
        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
    }
    showSuccess() {
        // this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
        // this.toast.show({severity:'info', summary: 'Success Message', detail:'Message Content', life: 3000});
        // this.toast.show({severity:'warn', summary: 'Success Message', detail:'Message Content', life: 3000});
        this.toast.show({severity:'error', summary: 'Success Message', detail:'Message Content', life: 3000});

        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: this.accept,
            reject: this.reject,
            data:[]
        });
    }

    viewProduct = () =>{
        this.setState({add: false});
        this.setState({view: true,headerName:'View Product'});
    }

    addProduct = () =>{
        this.setState({add: true,headerName:'Add Product'});
        this.setState({view: false});
    }

     accept() {
        this.toast.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    reject() {
        this.toast.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    handleCallback  = (data) => {
        this.setState({ items: data });
        //console.log("Product items >>",this.state);
    };

    render() {       

        console.log("Product state >>", this.state);

        let getAddStatus= this.state.add; 
        let getViewStatus= this.state.view; 
        let headerName= this.state.headerName; 
        let comp='';

        if (getAddStatus) {
            comp = <AddProduct/>      
        }           
        if(getViewStatus) {      
            comp = <ViewProduct sendData={getViewStatus} parentCallback={this.handleCallback}/>  
        }

        return (
            <div>
                <Layout/>
                
                <div id="content-wrapper" className="d-flex flex-column">  
                    <div id="content">  
                        <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Inventory (Store)</h1>
                        </div>
                       
                        <Toast ref={(el) => this.toast = el} />


                        {/* <Button label="Success" className="p-button-success" onClick={this.showSuccess} /> */}
                            <section className="section">
                                <div className="row">

                                <div className="card">
                                            <div className="card-body"> 

                                    <div className="p-grid">
                                        <div className="p-col-12 p-md-6 p-lg-6">                                            
                                            <div className="card-title">   
                                                <h3>{headerName}</h3>
                                            </div>
                                        </div>

                                        <div className="p-col-12 p-md-6 p-lg-6 textt-right">
                                            {/* <Button label="Click" icon="bi bi-eye" iconPos="right" className="p-button p-component p-button-rounded p-button-success" onClick={this.addProduct} /> */}   
                                            <Button label="Add Product" icon="bi bi-plus-circle" className="p-button-success" onClick={this.addProduct} />
                                            <Button label="View Product" icon="bi bi-eye" className="p-button-info" onClick={this.viewProduct} />
                                        </div>
                                    </div>                  

                                        {comp}                                              
                                                                                
                                                
                                            </div>
                                        </div>

                                </div>
                            </section>                    
                        </main>
                    </div>
                </div>

                <ConfirmDialog visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="Are you sure you want to proceed?"
                        header="Confirmation" icon="pi pi-exclamation-triangle" accept={this.accept} reject={this.reject}/>
                    <Button onClick={() => this.setState({ visible: true })} icon="pi pi-check" label="Confirm" />

            </div>
            
        );
    }
}
    
export default Product;  