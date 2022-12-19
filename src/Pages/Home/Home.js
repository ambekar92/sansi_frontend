import React, { useEffect,useState } from "react";
import Layout from '../../Layout/Layout'; 
import { InputSwitch } from 'primereact/inputswitch';
import ItemService from "../../services/commonService";

const Home = () => {
    let [dashboardData, setDashboardData] = useState([]);
    // let [smsData, setSmsData] = useState([]);
    let [codeData, setCodeData] = useState([]);
    let [showCard, setShowCard] = useState(false);
    let [admin, setAdmin] = useState(false);
    
    let [userData] = useState(JSON.parse(localStorage.getItem('userData'))); // User Details from LocalStorage

    const dashboardDetails = () => {
        let obj = {};
        // GET Dashboard Details
        ItemService.dashboard_details(obj).then((items) => {
            if (items.status !== false) {
                setDashboardData(items);
            } else {
                console.log(">> Not able get Dashboard Data");            
            }
        });

        // Read SMS from DB
        // ItemService.getSaveSMSData().then(async (items) => {
        //     if (items.status !== false) {
        //         setSmsData(items.data);
        //     } else {
        //         console.log(">> Not able get SMS Data");            
        //     }
        // });

        // GET Codes
        ItemService.getSaveCode().then((items) => {
            if (items.status !== false) {
                setCodeData(items.data);
            } else {
                console.log(">> Not able get Code Data");            
            }
        });        
    }

   
    const AdminListItem = ({value}) => {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{value.code}</div>
                        {value.name}
                </div>
            </li>
        );
    };


    const ListItem = ({value}) => {
        let [start, setStart] = useState(true);
        const handleStart=(code)=>{
            console.log(">> handleStart Code",code);
            setStart(false);
        }
        
        const handleStop=(code)=>{
            console.log(">> handleStop Code",code);
            setStart(true);
        }
        
        return (
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{value.code}</div>
                        {value.name}
                </div>
                
                {start &&
                    <button type="button" className="btn btn-dark rounded-pill btn-sm" onClick={(e)=>handleStart(value.code)}>
                        Start <i className="bi bi-arrow-right-circle"></i>
                    </button>                     
                }

                {!start &&
                    <button type="button" className="btn btn-primary rounded-pill btn-sm" onClick={(e)=>handleStop(value.code)}>
                        Stop <i className="bi bi-arrow-right-circle"></i>
                    </button>                     
                }

            </li>
        );
    };

    useEffect(() => {
        console.log(">> Home Running");
        localStorage.setItem('menu','Home');

        if(userData.data.role === 'ADMIN'){
            setAdmin(true);
        }else{
            setAdmin(false)
        }
        dashboardDetails();
        
        // eslint-disable-next-line
    }, []);

    return (  
        <div>  
            <Layout/>
            <div id="content-wrapper" className="d-flex flex-column">  
                    <div id="content">  
                        <main id="main" className="main">
                            <div className="row">
                                <div className="pagetitle col-sm-11">
                                    <h1>Home</h1>
                                    <nav>
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">Complete Details of the Product</li>
                                        </ol>
                                    </nav>                               
                                </div>
                                <div className="col-sm-1">
                                    <InputSwitch checked={showCard} onChange={(e) => setShowCard(e.value)} />
                                </div>
                            </div>
                            {showCard && 
                                <section className="section dashboard">
                                    <div className="row">                    
                                        <div className="col-lg-12">
                                            <div className="row">
                                                    <div className="col-xxl-4 col-md-6">
                                                        <div className="card info-card sales-card">
                                                            <div className="card-body">
                                                            <h5 className="card-title">Code Triggered / Total Codes</h5>
                                                            <div className="d-flex align-items-center">
                                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <a href="/add-code"><i className="bi bi-pencil-square"></i></a>
                                                                </div>
                                                                <div className="ps-3">
                                                                <h6>d145 / d200</h6>

                                                                {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {userData.data.role === 'ADMIN' && 
                                                    <div className="col-xxl-4 col-md-6">
                                                        <div className="card info-card sales-card">
                                                            <div className="card-body">
                                                            <h5 className="card-title">Total Users</h5>
                                                            <div className="d-flex align-items-center">
                                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <a href="/add-user"><i className="bi bi-people-fill"></i></a>
                                                                </div>
                                                                <div className="ps-3">
                                                                <h6>{dashboardData.users}</h6>
                                                                {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    }
                                            </div>
                                        </div>                                
                                    </div>
                                </section>
                            }

                            <section>
                                <hr />
                                <h3 className="pagetitle">List of Codes: </h3>
                                <ol className="list-group list-group-numbered">
                                    {!admin && 
                                        codeData.length? codeData.map((value,index) => {
                                            return <ListItem key={index} value={value} />        
                                        })
                                    : null}
                                
                                     
                                    {admin && 
                                    codeData.length? codeData.map((value,index) => {
                                        return <AdminListItem key={index} value={value} />        
                                    })
                                    : null}


                                    {/* <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <span className="badge bg-primary rounded-pill">14</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <span className="badge bg-primary rounded-pill">14</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <span className="badge bg-primary rounded-pill">14</span>
                                    </li> */}
                                </ol>
                            </section>
                            
                        </main>       
                    </div>
            </div>       
            
        </div>  
    ); 
};  
  
export default Home  