import React, { Component } from 'react'  
  
export class Home extends Component {  
    render() {  
        return (  
            <div>  
                <main id="main" className="main">
                    <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                    </div>

                    <section className="section dashboard">
                        <div className="row">

                        <div class="col-lg-8">
                            <div class="row">
                                    <div className="col-xxl-4 col-md-6">
                                        <div className="card info-card sales-card">
                                            <div className="card-body">
                                            <h5 className="card-title">Sales <span>| Today</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-cart"></i>
                                                </div>
                                                <div className="ps-3">
                                                <h6>145</h6>
                                                <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xxl-4 col-md-6">
                                        <div className="card info-card sales-card">
                                            <div className="card-body">
                                            <h5 className="card-title">Sales <span>| Today</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-cart"></i>
                                                </div>
                                                <div className="ps-3">
                                                <h6>145</h6>
                                                <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xxl-4 col-xl-12">
                                        <div className="card info-card sales-card">
                                            <div className="card-body">
                                            <h5 className="card-title">Sales <span>| Today</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-cart"></i>
                                                </div>
                                                <div className="ps-3">
                                                <h6>145</h6>
                                                <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-4">
                            <div className="card info-card sales-card">
                                d
                            </div>
                        </div>    

                        </div>
                    </section>
                    
                </main>              
                
            </div>  
        )  
    }  
}  
  
export default Home  