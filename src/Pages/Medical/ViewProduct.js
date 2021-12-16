import React, { Component } from 'react'  
import ItemService from '../../Service/commonService';
import $ from 'jquery'; 

export class ViewProduct extends Component {  
    constructor(props) {
        super(props);
        this.itemService = new ItemService();
        this.state = {
            menu:[]          
        };     
    }

    componentDidMount() {
        console.log("Loaded componentDidMount");
       
        this.getMenuList();
         //initialize datatable
        //$(document).ready(function () {
            //$('#example').DataTable();
       // });
    }

    getMenuList() {        
        this.itemService.getMenuList().then(items => {
            console.log("ViewProduct getMenuList >>",items);
            this.setState({menu: items});
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
                  }
                  // { data: "descp",
                  //   render: function (data, type, row, meta) {
                  //    var a="<textarea readonly>"+row.descp+"</textarea>";
                  //     return a;
                  //   }
                  // },
                //   { data: "salary",className:'text-right',
                //     render: function (data, type, row, meta) {
                //      var a="&#8377;"+tempData.compFresher.formatNumber(row.salary);
                //       return a;
                //     }
                //   },
                  ]
               });

               dataTableLoaded.on( 'order.dt search.dt', function () {
                dataTableLoaded.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                        cell.innerHTML = i+1;
                    } );
                } ).draw(); 
        }
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
                        </tr>
                    </thead>
                    
                    <tfoot>
                        <tr>
                            <th>SlNo</th>
                            <th>Position</th>
                            <th>Office</th>
                            <th>Age</th>
                        </tr>
                    </tfoot>
                </table>                                                
            </div>
        </div>

            
        );
    }
}
    
export default ViewProduct  