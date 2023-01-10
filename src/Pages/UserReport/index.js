import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import Moment from 'react-moment';
// import $ from "jquery";
// import ReactDOM from "react-dom";
import ItemService from "../../services/commonService";

const AddCodes = () => {
  let [userData] = useState(JSON.parse(localStorage.getItem('userData'))); // User Details from LocalStorage
  let [getUserReport, setUserReport] = useState([])
  let [admin, setAdmin] = useState(false);


  const loadReport = () => {
    let obj ={
      "buildId":userData.data.buildId
    }
    ItemService.getUserReport(obj).then((items) => {
      //getLoadTable(items.data);
      setUserReport(items.data)
    });
  };

  useEffect(() => {
    console.log(">> Reports Running");
    localStorage.setItem('menu','Reports');
    if(userData.data.role === 'ADMIN'){
        setAdmin(true);
    }else{
        setAdmin(false)
    }
    loadReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Layout />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <main id="main" className="main">
            <div className="pagetitle">
              <h1>Report</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    History of Motor
                  </li>
                </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex justify-content-end pb-1">
                      <a href="/home" className=" badge bg-info text-dark"> <i class="bi bi-house-door me-1"></i> Home</a>
                  </div>
                {!admin && 
                    getUserReport.length? getUserReport.map((value,index) => {
                        return (
                            <div className="col-lg-12" key={index}>
                                <div className="list-group">
                                    <span className="list-group-item list-group-item-action" aria-current="true">
                                    <div className="d-flex w-200 justify-content-between">
                                        <h5 className="mb-1 listTitle">{ value.status === 1 ? "Running...":value.body }</h5>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-sm-1">
                                            <div className="d-flex justify-content-center">
                                                { value.status === 1 ? <i className="bi bi-recycle clockfill"></i> : <i className="bi bi-patch-check-fill clockfill"></i> }
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-11">
                                            <p className="mb-0 pFont">
                                                Start : <span className="listTime"><Moment format='Do MMM YY hh:mm:ss A'>{value ? value.sent_time:''}</Moment></span>
                                            </p>
                                            <p className="mb-0 pFont">
                                                End &nbsp;: <span className="listTime"><Moment format='Do MMM YY hh:mm:ss A'>{value ? value.stop_time:''}</Moment></span>
                                            </p>
                                            <p className="mb-0 pFont">
                                                Duration : <span class="badge bg-warning text-dark timeDuration"> {value ? value.timeDuration:''} </span>
                                            </p>
                                            {/* <small>And some small print.</small> */}
                                        </div>
                                    </div>
                                    </span>
                                    
                                </div>
                            </div>
                        )
                    })
                : null}   
                  
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default AddCodes;
