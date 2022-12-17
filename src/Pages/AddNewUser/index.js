import React, { useEffect, useState, useRef } from "react";
import Layout from "../../Layout/Layout";
import $ from "jquery";
import ReactDOM from "react-dom";
import { Toast } from "primereact/toast";

import ItemService from "../../services/commonService";

const AddUser = () => {
  let [name, setName] = useState('');
  let [password, setPassword] = useState('');
  let [email, setEmail] = useState('');
  let [mobile, setMobile] = useState('');
  let [role, setRole] = useState("USER");
  let [city, setCity] = useState('');
  let [rowData, setRowData] = useState([]);
  let [updateBtn, setUpdateBtn] = useState(false);
  let toast = useRef();

  const resetFrom = (e) => {
    e.preventDefault();
    setName("");
    setPassword("");
    setEmail("");
    setMobile("");
    setCity("");
    setUpdateBtn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      name,
      password,
      email,
      mobile,
      role,
      city,
    };
    // console.log(">> handleSubmit", obj);
    if (name !== '' && password !== '' && email !== '' && mobile !== '' && city !== '') {
        ItemService.registerUser(obj).then((items) => {
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
      password,
      email,
      mobile,
      role,
      city,
      "_id":rowData._id
    };
    // console.log(">> handleUpdate", obj);
    if (name !== '' && password !== '' && email !== '' && mobile !== '' && city !== '') {
        ItemService.registerUser(obj).then((items) => {
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
    };
    // console.log(">> handleDelete", obj);
    ItemService.userDelete(obj).then((items) => {
      // console.log(">> User Delete ", items);
      if (items.status === false) {
        toastMsg("error", "Info", items.message);
      } else {
        toastMsg("error", "Confirmed", "User Deleted successfully !!");
        loadTable();
      }
    });
  };

  const handleEdit = (rowData) => {
    setName(rowData.name);
    setPassword(rowData.password);
    setEmail(rowData.email);
    setMobile(rowData.mobile);
    setCity(rowData.city);
    setRole(rowData.role);
    setRowData(rowData);
    
    setUpdateBtn(true);
  }

  const handleNumChange = (event) => {
    const limit = 10;
    setMobile(event.target.value.slice(0, limit));
  };

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

  const getLoadTable = (userData) => {
    if (userData?.length === 0) {
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
        data: userData,
        columns: [
          { data: null, SlNo: true, className: "text-center" },
          { data: "name" },
          { data: "mobile" },
          {
            data: "email",
            className: "text-right",
            render: function (data, type, row, meta) {
              if (typeof row.email === "undefined") {
                return "-";
              } else {
                var a = row.email;
                return a;
              }
            },
          },
          { data: "password" },
          { data: "role", className: "text-right",
            render: function (data, type, row, meta) {
                if (row.role === "ADMIN") {
                    return '<span class="badge bg-primary">'+row.role+'</span>';
                } else {
                    return '<span class="badge bg-secondary">'+row.role+'</span>';
                }
            },
          },
          { data: "city" },
          { data: "_id" },
        ],
        columnDefs: [
          {
            targets: [7],
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
    ItemService.getUsersList().then((items) => {
      getLoadTable(items.data);
    });
  };

  useEffect(() => {
    console.log(">> Add User Running");
    localStorage.setItem('menu','Users')
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
              <h1>Users</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    Add Complete Details Users and View list of Users
                  </li>
                </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Add Users</h5>

                      <form>
                        <div className="row mb-3">
                          <div className="col-sm-4">
                            <label
                              htmlFor="inputText"
                              className="col-sm-12 col-form-label"
                            >
                              User Name
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
                              Mobile Number
                            </label>
                            <input
                              type="number"
                              maxLength={10}
                              className="form-control"
                              name="mobile"
                              value={mobile || ""}
                              onChange={handleNumChange}
                            />
                          </div>

                          <div className="col-sm-4">
                            <label
                              htmlFor="inputText"
                              className="col-sm-12 col-form-label"
                            >
                              Role
                            </label>
                            <select
                              className="form-select"
                              id="floatingSelect"
                              aria-label="Floating label select example"
                              onChange={(e) => setRole(e.target.value)}
                              value={role || ""}
                            >
                              <option value="USER" defaultValue>USER</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-sm-4">
                            <label
                              htmlFor="inputText"
                              className="col-sm-12 col-form-label"
                            >
                              Email ID
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              value={email || ""}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div className="col-sm-4">
                            <label
                              htmlFor="inputText"
                              className="col-sm-12 col-form-label"
                            >
                              Password
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="password"
                              value={password || ""}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>

                          <div className="col-sm-4">
                            <label
                              htmlFor="inputText"
                              className="col-sm-12 col-form-label"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              value={city || ""}
                              onChange={(e) => setCity(e.target.value)}
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
                                <i className="bi bi-person-plus-fill"></i> Add User
                                </button>
                            }
                            {updateBtn && 
                                <button
                                className="btn btn-warning"
                                onClick={handleUpdate}
                                >
                                <i className="bi bi-person-plus-fill"></i> Update User
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
            </section>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">List of Users</h5>

                      <table
                        id="example"
                        className="row-border order-column hover"
                      >
                        <thead>
                          <tr>
                            <th scope="col">Sl.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Role</th>
                            <th scope="col">City</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
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
};

export default AddUser;
