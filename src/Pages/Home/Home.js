import React, { useEffect,useState } from "react";
import Layout from '../../Layout/Layout'; 
import ItemService from "../../services/commonService";

const Home = () => {
    let [dashboardData, setDashboardData] = useState([]);

    const dashboardDetails = () => {
        let obj = {};
        ItemService.dashboard_details(obj).then((items) => {
            // console.log(">> items",items);
            if (items.status !== false) {
                setDashboardData(items);
            } else {
                console.log(">> Not able get Dashboard Data");            
            }
          });
    }

    useEffect(() => {
        console.log(">> Home Running");
        localStorage.setItem('menu','Home')
        dashboardDetails();
      }, []);

    return (  
        <div>  
            <Layout/>
            <div id="content-wrapper" className="d-flex flex-column">  
                    <div id="content">  
                        <main id="main" className="main">
                            <div className="pagetitle">
                            <h1>Home</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">Complete Details of the Product</li>
                                </ol>
                            </nav>
                            </div>

                            <section className="section dashboard">
                                <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">
                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="card-body">
                                                    <h5 className="card-title">Number of Codes</h5>
                                                    <div className="d-flex align-items-center">
                                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                        <i className="bi bi-pencil-square"></i>
                                                        </div>
                                                        <div className="ps-3">
                                                        <h6>145</h6>

                                                        {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="card-body">
                                                    <h5 className="card-title">Code Triggered</h5>
                                                    <div className="d-flex align-items-center">
                                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                        <i className="bi bi-gear-fill"></i>
                                                        </div>
                                                        <div className="ps-3">
                                                        <h6>145</h6>
                                                        {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="card-body">
                                                    <h5 className="card-title">Total Users</h5>
                                                    <div className="d-flex align-items-center">
                                                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                        <i className="bi bi-people-fill"></i>
                                                        </div>
                                                        <div className="ps-3">
                                                        <h6>{dashboardData.users}</h6>
                                                        {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                
                                {/* <div className="col-lg-4">
                                    <div className="card info-card sales-card">
                                        Test Card
                                    </div>
                                </div>     */}

                                </div>
                            </section>
                            
                        </main>       
                    </div>
            </div>       
            
        </div>  
    ); 
};  
  
export default Home  