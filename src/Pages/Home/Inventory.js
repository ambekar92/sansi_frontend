import React, { Component } from 'react'  
import Layout from '../../Layout/Layout';  
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import {MultiSelect} from 'primereact/multiselect';
import ItemService from '../../services/commonService';
import $ from 'jquery'; 
import ReactDOM from 'react-dom';


export class Inventory extends Component {  
    constructor(props) {
        super(props);

        this.itemService = new ItemService();
        this.state={           
            headerName:'View Product',
            items:[],
            menu:[],
            rowSelected:[]
        };
        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
       // this.showSuccess = this.showSuccess.bind(this);
    }

    componentDidMount() {
        console.log("<< Inventory Loaded componentDidMount >>");       
        document.getElementById("addP").style.display = 'none';   
        this.getMenuList();    
    }

    getMenuList() {        
        this.itemService.getMenuList().then(items => {
            console.log("ViewProduct getMenuList >>",items);
            this.setState({menu: items});
           
            this.loadDataTable();
        });        

        this.itemService.getAllUsers().then(items => {
            console.log("Server getMenuList >>",items);
        });        

    }

    // showSuccess() {
    //     // this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    //     // this.toast.show({severity:'info', summary: 'Success Message', detail:'Message Content', life: 3000});
    //     // this.toast.show({severity:'warn', summary: 'Success Message', detail:'Message Content', life: 3000});
    //     this.toast.show({severity:'error', summary: 'Success Message', detail:'Message Content', life: 3000});

    //     confirmDialog({
    //         message: 'Are you sure you want to proceed?',
    //         header: 'Confirmation',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: this.accept,
    //         reject: this.reject,
    //         data:[]
    //     });
    // }

    viewProduct = () =>{
        this.setState({headerName:'View Product'});
        document.getElementById("addP").style.display = 'none';
        document.getElementById("addV").style.display = 'block';
    }

    addProduct = () =>{
        document.getElementById("addP").reset();
        this.setState({headerName:'Add Product'});
        document.getElementById("addP").style.display = 'block';
        document.getElementById("addV").style.display = 'none';
    }

    accept() {
        this.toast.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    reject() {
        this.toast.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        this.confirm1();
    }
    // confirm1() {
    //     confirmDialog({
    //         message: 'Are you sure you want to proceed?',
    //         header: 'Confirmation',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: this.accept,
    //         reject: this.reject
    //     });
    // }

    confirm1() {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: this.accept,
            reject: this.reject
        });
    }

    loadDataTable(){
       
        if(this.state.menu.length === 0){
            $('#example').DataTable({
                "paging":false,
                 "ordering":true,
                 "info":true,
                 "searching":false,         
                 "destroy":true,
             }).clear().draw();

        }else{
            let storeData = this.state.menu;
            let dataTableLoaded = $('#example').DataTable( {
                'paging'      : true,
                'lengthChange': false,
                'searching'   : true,
                'ordering'    : true,
                'info'        : true,
                'autoWidth'   : false,
                "destroy":true,
                "data":storeData,   
                "columns": [
                  {data:null,"SlNo":false,className: "text-center"},
                  { data: "name" },
                  { data: "data_bs_target"},
                  { data: "hrefLink" ,className:'text-right',
                    render: function (data, type, row, meta) {
                        if(typeof row.hrefLink === 'undefined'){
                            return '-';
                        }else{
                            var a=row.hrefLink;
                            return a;
                        }
                    }
                  },
                  { data: "name" } 
                  ],
                  columnDefs: [
                    {
                        targets: 4,
                        createdCell: (td, cellData, rowData, row, col) => {                            
                            let a= <Button label="" icon="bi bi-pencil-square" className="p-button-raised p-button-info" onClick={() => this.editJob(rowData)}/>;
                            let b= <Button label="" icon="bi bi-trash" className="p-button-raised p-button-danger" onClick={() => this.editJob(rowData)}/>;

                            let buttons = (<>
                                    {a}{b}
                            </>);

                            ReactDOM.render(
                                buttons, td);
                            }
                      } 
                ]
               });

               dataTableLoaded.on( 'order.dt search.dt', function () {
                dataTableLoaded.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        cell.innerHTML = i+1;
                    } );
                } ).draw(); 
        }
    }

    editJob(data){
        console.log("Edit >>", data);
        this.setState({rowSelected:data});
        this.addProduct();
        document.getElementsByName("position")[0].value = data.name;
        document.getElementsByName("office")[0].value = data.data_bs_target;
        document.getElementsByName("age")[0].value = data.hrefLink;
        //this.loadForm();
    }

    publish= (id) =>{
        console.log("editJob>",id);
    }

    
    render() {  
        const style = {
            divStyle:{height: "100px"}
        };
        const citySelectItems = [
            {label: 'New York', value: 'NY'},
            {label: 'Rome', value: 'RM'},
            {label: 'London', value: 'LDN'},
            {label: 'Istanbul', value: 'IST'},
            {label: 'Paris', value: 'PRS'}
        ];
        let headerName= this.state.headerName; 
        //console.log("Inventory state >>", this.state);

       
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

                    {/* <ConfirmDialog visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="Are you sure you want to proceed?"
                        header="Confirmation" icon="pi pi-exclamation-triangle" accept={this.accept} reject={this.reject}/>
                    <Button onClick={() => this.setState({ visible: true })} icon="pi pi-check" label="Confirm" /> */}

                </div>                                  

                <form className="col-lg-8" onSubmit={this.onSubmit.bind(this)}  id="addP">

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Position</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="position" onChange={this.onChange.bind(this)}/>
                    </div>                                               
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Office</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="office" onChange={this.onChange.bind(this)}/>
                    </div>                                               
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Age</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="age" onChange={this.onChange.bind(this)}/>
                    </div>                                               
                    </div>





                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Text</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="text" onChange={this.onChange.bind(this)}/>
                    </div>                                               
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Text</label>
                    <div className="col-sm-10">
                        <MultiSelect className="form-control" name="NewSelect" options={citySelectItems} onChange={this.onChange.bind(this)} />
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" name="email" onChange={this.onChange.bind(this)} />
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Number</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" name="number" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">File Upload</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="file" id="formFile" name="formFile" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Date</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" name="date" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Time</label>
                    <div className="col-sm-10">
                        <input type="time" className="form-control" name="time" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Color Picker</label>
                    <div className="col-sm-10">
                        <input type="color" className="form-control form-control-color" id="exampleColorInput" value="#4154f1" title="Choose your color" name="color" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Textarea</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" style={style.divStyle} name="textarea" onChange={this.onChange.bind(this)}></textarea>
                    </div>
                    </div>
                    <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked onChange={this.onChange.bind(this)}/>
                        <label className="form-check-label">
                            First radio
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" onChange={this.onChange.bind(this)}/>
                        <label className="form-check-label">
                            Second radio
                        </label>
                        </div>
                        <div className="form-check disabled">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios" value="option" disabled onChange={this.onChange.bind(this)}/>
                        <label className="form-check-label">
                            Third disabled radio
                        </label>
                        </div>
                    </div>
                    </fieldset>
                    <div className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">Checkboxes</legend>
                    <div className="col-sm-10">

                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck1" name="check1" onChange={this.onChange.bind(this)}/>
                        <label className="form-check-label">
                            Example checkbox
                        </label>
                        </div>

                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck2" checked name="check2" onChange={this.onChange.bind(this)}/>
                        <label className="form-check-label">
                            Example checkbox 2
                        </label>
                        </div>

                    </div>
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Disabled</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" value="Read only / Disabled" disabled name="checkNA" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Select</label>
                    <div className="col-sm-10">
                        <select className="form-select" aria-label="Default select example" name="select" onChange={this.onChange.bind(this)}>
                        <option >Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </select>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Multi Select</label>
                    <div className="col-sm-10">
                        <select className="form-select" multiple aria-label="multiple select example" name="mulSelect" onChange={this.onChange.bind(this)}>
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </select>
                    </div>
                    </div>

                    <div className="row mb-6">
                    {/* <label className="col-sm-2 col-form-label">Submit Button</label> */}
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Submit Form</button>
                    </div>
                    </div>

                </form>

                <div className="resTable" id="addV"> 
                    <table id="example" className="row-border order-column hover">
                        {/* table table-striped table-bordered */}
                        <thead>
                            <tr>
                                <th width="2%">SlNo</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tfoot>
                            <tr>
                                <th>SlNo</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>                                                
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
    
export default Inventory;  