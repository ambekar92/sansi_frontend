import React, { Component } from 'react'  
import ItemService from '../../Service/commonService';
import $ from 'jquery'; 
import ReactDOM from 'react-dom';
import { Button } from 'primereact/button';

export class ViewProduct extends Component {  
    constructor(props) {
        super(props);
       
        this.itemService = new ItemService();
        this.state = {
            menu:[],
            rowData:[], 
            rowSelected:null
                  
        };     
        
    }

    componentDidMount() {
        console.log("ViewProduct componentDidMount");       
        this.getMenuList();     
    }

    getMenuList() {        
        console.log("ViewProduct props >>",this.props.sendData);
        // this.itemService.getAllUsers().then(items => {
        this.itemService.getMenuList().then(items => {
            console.log("ViewProduct getMenuList >>",items);
            this.setState({menu: items});
            this.props.parentCallback(this.state); 
            this.loadDataTable();
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
                            
                            //let a=<button type="button" title="Edit" className="btn btn-primary btn-sm" onClick={() => this.editJob(rowData.id)}><i className="bi bi-pencil-square"></i> Edit </button>;
                            // let b=<button type="button" title="Delete" className="btn btn-danger btn-sm" onClick={() => this.editJob(rowData.id)}>  <i className="bi bi-plus-circle"></i> Delete </button>;
                            
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
        console.log("editJob >",data);
        this.setState({rowData:data});
        this.props.parentCallback(this.state); 
    }

    publish= (id) =>{
        console.log("editJob>",id);
    }


    render() {        
        return (
            <div>

                <div className="resTable"> 
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

            
        );
    }
}
    
export default ViewProduct  