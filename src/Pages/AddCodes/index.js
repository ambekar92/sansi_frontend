import React, { useEffect, useState, useRef } from "react";
import Layout from "../../Layout/Layout";
import $ from "jquery";
import ReactDOM from "react-dom";
import { Toast } from "primereact/toast";

import ItemService from "../../services/commonService";

const AddCodes = () => {
  let [userData] = useState(JSON.parse(localStorage.getItem('userData'))); // User Details from LocalStorage
  let [name, setName] = useState('');
  let [code, setCode] = useState('');

  let [rowData, setRowData] = useState([]);
  let [updateBtn, setUpdateBtn] = useState(false);
  let toast = useRef();

  const resetFrom = (e) => {
    e.preventDefault();
    setName("");
    setCode("");

    setUpdateBtn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      name,
      code,
      'updatedBy':userData.data.email,
      'updatedOn':Date()
    };
    // console.log(">> handleSubmit", obj);
    if (name !== '' && code !== '') {
        ItemService.saveCode(obj).then((items) => {
            // console.log(">> Add User ", items);
            if (items.status === false) {
              toastMsg("error", "Info", items.message);
            } else {
              toastMsg("success", "Confirmed", "User Added successfully !!");
              resetFrom(e);
              loadTable();
            }
          });
    }else{
        toastMsg("warn", "Info", "All fields are mandatory !!!");
    }
   
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let obj = {
      name,
      code,
      "_id":rowData._id,
      'modifiedBy':userData.data.code,
      'modifiedOn':Date()
    };
    // console.log(">> handleUpdate", obj);
    if (name !== '' && code !== '') {
        ItemService.saveCode(obj).then((items) => {
            // console.log(">> Update User ", items);
            if (items.status === false) {
              toastMsg("error", "Info", items.message);
            } else {
              toastMsg("success", "Confirmed", "Updated successfully !!");
              resetFrom(e);
              setUpdateBtn(false);
              loadTable();              
            }
          });
    }else{
        toastMsg("warn", "Info", "All fields are mandatory !!!");
    }
   
  };
  
  const handleDelete = (id) => {
    let obj = {
      id,
      'key':'code'
    };
    // console.log(">> handleDelete", obj);
    ItemService.deleteRecord(obj).then((items) => {
      // console.log(">> Record Delete ", items);
      if (items.status === false) {
        toastMsg("error", "Info", items.message);
      } else {
        toastMsg("error", "Confirmed", "Record Deleted successfully !!");
        loadTable();
      }
    });
  };

  const handleEdit = (rowData) => {
    document.getElementById('flush-collapseOne').classList.add('show');
    document.getElementById('addUser').classList.remove('collapsed');
    setName(rowData.name);
    setCode(rowData.code);

    setRowData(rowData);    
    setUpdateBtn(true);
  }

  const toastMsg = (a, b, c) => {
    // "success" , "error", "warn", "info"
    //toastMsg("success","Confirmed","User Added successfully !!");
    toast.current.show({
      severity: a,
      summary: b,
      detail: c,
      life: 3000,
    });
  };

  const getLoadTable = (userTableData) => {
    if (userTableData?.length === 0) {
      $("#example")
        .DataTable({
          paging: true,
          ordering: true,
          info: true,
          searching: true,
          destroy: true,
        })
        .clear()
        .draw();
    } else {
      let dataTableLoaded = $("#example").DataTable({
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        destroy: true,
        data: userTableData,
        columns: [
          { data: null, SlNo: true, className: "text-center" },
          { data: "name" },
          {
            data: "code",
            className: "text-right",
            render: function (data, type, row, meta) {
              if (typeof row.code === "undefined") {
                return "-";
              } else {
                var a = row.code;
                return a;
              }
            },
          },
          { data: "_id" },
        ],
        columnDefs: [
          {
            targets: [3],
            createdCell: (td, cellData, rowData, row, col) => {
              let a = (
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={() => handleEdit(rowData)}
                >
                  <i className="bi bi-pencil-square"></i>{" "}
                </button>
              );
              let b = (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cellData)}
                >
                  <i className="bi bi-trash"></i>{" "}
                </button>
              );
              let buttons = (<> </>);

              if(rowData.role === 'ADMIN'){
                buttons = (<> - </>);
              }else{
                buttons = (<>{a}&nbsp;{b}</>);
              }

              ReactDOM.render(buttons, td);
            },
          },
        ],
      });

      dataTableLoaded
        .on("order.dt search.dt", function () {
          dataTableLoaded
            .column(0, { search: "applied", order: "applied" })
            .nodes()
            .each(function (cell, i) {
              cell.innerHTML = i + 1;
            });
        })
        .draw();
    }
  };

  const loadTable = () => {
    ItemService.getSaveCode().then((items) => {
      getLoadTable(items.data);
    });
  };

  useEffect(() => {
    console.log(">> Add Code Running");
    localStorage.setItem('menu','Codes')
    loadTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Layout />
      <Toast ref={toast} />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <main id="main" className="main">
            <div className="pagetitle">
              <h1>SMS Codes</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    Add Codes to Trigger from Mobile Application
                  </li>
                </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">

              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button id="addUser" className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Add Code
                    </button>
                  </h2>
                  <div id="flush-collapseOne" className="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      
                          <div className="card">
                          <div className="card-body">
                            {/* <h5 className="card-title">Add Users</h5> */}

                            <form>
                              {/* Row 1 */}
                              <div className="row mb-3">
                                <div className="col-sm-4">
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-12 col-form-label"
                                  >
                                    Code Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>

                                <div className="col-sm-4">
                                  <label
                                    htmlFor="inputText"
                                    className="col-sm-12 col-form-label"
                                  >
                                    Code
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="code"
                                    value={code || ""}
                                    onChange={(e) => setCode(e.target.value)}
                                  />
                                </div>
                                
                              </div>

                              <div className="row mb-3">
                                <div className="col-sm-10">
                                  {!updateBtn && 
                                      <button
                                      className="btn btn-primary"
                                      onClick={handleSubmit}
                                      >
                                      <i className="bi bi-person-plus-fill"></i> Add Code
                                      </button>
                                  }
                                  {updateBtn && 
                                      <button
                                      className="btn btn-warning"
                                      onClick={handleUpdate}
                                      >
                                      <i className="bi bi-person-plus-fill"></i> Update Code
                                      </button>
                                  }
                                      <button
                                      className="btn btn-danger"
                                      onClick={resetFrom}
                                      >
                                      <i className="bi bi-clean"></i> Clear
                                      </button>

                                </div>
                              </div>
                            </form>
                          </div>
                          </div>
                      
                      </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button id="viewUser" className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                       View List of Codes
                    </button>
                  </h2>
                  <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">

                          <div className="card">
                          <div className="card-body">
                           

                            <table
                              id="example"
                              className="row-border order-column hover"
                            >
                              <thead>
                                <tr>
                                  <th scope="col">Sl.No</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Code</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                            </table>
                          </div>
                          </div>

                    </div>
                  </div>
                </div>
               
              </div>


                  
                </div>
              </div>
            </section>

            {/* <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  
                </div>
              </div>
            </section> */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AddCodes;
