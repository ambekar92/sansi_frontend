import React, { useEffect,useState, useRef } from "react";
import Layout from '../../Layout/Layout'; 
import { InputSwitch } from 'primereact/inputswitch';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from "primereact/toast";
import Moment from 'react-moment';
import ItemService from "../../services/commonService";

const Home = () => {
    let [dashboardData, setDashboardData] = useState([]);
    let [smsData, setSmsData] = useState([]);
    let [codeData, setCodeData] = useState([]);
    let [showCard, setShowCard] = useState(false);
    let [admin, setAdmin] = useState(false);
    let [getSmsStatus, setSmsStatus] = useState();
    let toast = useRef();
        
    let [userData] = useState(JSON.parse(localStorage.getItem('userData'))); // User Details from LocalStorage

    const dashboardDetails = () => {
        let obj = {};

        if(userData.data.role === 'ADMIN'){
            obj={};
        }else{
            obj = {'buildId': userData.data.buildId}
        }
        
        // GET Dashboard Details
        ItemService.dashboard_details(obj).then((items) => {
            if (items?.status) {
                setDashboardData(items);
            } else {
                console.log(">> Not able get Dashboard Data");            
            }
        });

        // Read Login user SMS from DB  // Func to get all the SMS getSaveSMSDataALL
        ItemService.getUserSMSData(obj).then(async (items) => {
            if (items?.status) {
                setSmsData(items.data);
            } else {
                console.log(">> Not able get SMS Data");            
            }
        });

        // GET Codes
        ItemService.getSaveCode().then((items) => {
            if (items?.status) {
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

    /* If LIST Code is added then this will be used */ 
    // const ListItem = ({value}) => {
    //     let [start, setStart] = useState(true);
    //     const handleStart=(code)=>{
    //         // console.log(">> handleStart Code",code);
    //         // send SMS
    //         let obj={
    //             "message" : code,
    //             "number":userData.data.senderMobile,
    //             "email":userData.data.email,
    //             "mobile":userData.data.mobile,
    //             "buildId":userData.data.buildId,
    //         }
    //         ItemService.sendSMS(obj).then((items) => {
    //             console.log(">> SMS Sent",items);   
    //         });

    //         setStart(false);
    //     }
        
    //     const handleStop=(code)=>{
    //         console.log(">> handleStop Code",code);
    //         setStart(true);
    //     }
        
    //     return (
    //         <li className="list-group-item d-flex justify-content-between align-items-start">
    //             <div className="ms-2 me-auto">
    //                 <div className="fw-bold">{value.code}</div>
    //                     {value.name}
    //             </div>
                
    //             {start &&
    //                 <button type="button" className="btn btn-dark rounded-pill btn-sm" onClick={(e)=>handleStart(value.code)}>
    //                     Start <i className="bi bi-arrow-right-circle"></i>
    //                 </button>                     
    //             }

    //             {!start &&
    //                 <button type="button" className="btn btn-primary rounded-pill btn-sm" onClick={(e)=>handleStop(value.code)}>
    //                     Stop <i className="bi bi-arrow-right-circle"></i>
    //                 </button>                     
    //             }

    //         </li>
    //     );
    // };

     /* testing */ 
    // const AddCodeButton = ({code_value}) => {

    //     // let [start, setStart] = useState(true);
    //     let [value, setValue] = useState('off');
    //     console.log(">> test>>",value); 
        
    //     let idVal="mainDivToggle_"+code_value.code;

    //     const test=()=>{
    //         if(value==='off'){
    //             document.getElementById(idVal).style.backgroundColor='#00d500';
    //             setValue('on'); 
    //         }else{
    //             document.getElementById(idVal).style.backgroundColor='red';
    //             setValue('off'); 
    //         }            
    //         // console.log(">> test>>",value);  
    //     }

    //     // const handleStart=(code)=>{
    //     //     // console.log(">> handleStart Code",code);
    //     //     // send SMS
    //     //     let obj={
    //     //         "message" : code,
    //     //         "number":userData.data.senderMobile,
    //     //         "email":userData.data.email,
    //     //         "mobile":userData.data.mobile,
    //     //         "buildId":userData.data.buildId,
    //     //     }
    //     //     ItemService.sendSMS(obj).then((items) => {
    //     //         console.log(">> SMS Sent",items);   
    //     //     });
    //     //     setStart(false);
    //     // }
        
    //     // const handleStop=(code)=>{
    //     //     console.log(">> handleStop Code",code);
    //     //     setStart(true);
    //     // }
        
    //     return (
    //         <>
    //             <div className="mainCode">
    //                 <div className="ms-2 me-auto">
    //                     <div className="fw-bold">{code_value.code}</div>                        
    //                 </div>
    //                 <div className="mainDivToggle" id={idVal}>
    //                     <input id="toggle" className="toggle" type="checkbox" role="switch" onClick={(e)=>test()} name="toggle" value={value} />
    //                     <label  className="slot"> {/* htmlFor="toggle" */}
    //                         <span className="slot__label">OOFF</span>
    //                         <span className="slot__label">OON</span>
    //                     </label>
    //                 </div>
                    
    //                 <div className="codeDetails">
    //                     <p>{code_value.name}</p>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // };
   
    const callGetStatus=()=>{
        let getSms = {"userBuildId":userData.data.buildId, "status":1}    
            ItemService.getSMSDetails(getSms).then((items) => {
                console.log(">>GET SMS Sent",items); 
                setSmsStatus(items.data)
                if(items.data.length > 0){
                    for(let i=0; i<items.data.length; i++){
                        let id=items.data[i].code + "_1";
                        if(items.data[i].status===1){
                            document.getElementById(id).style.backgroundColor='#00d500';
                            document.getElementById(items.data[i].code).checked = true;
                        }else{
                            document.getElementById(id).style.backgroundColor='red';
                            document.getElementById(items.data[i].code).checked = false;
                        }
                    }
                    
                }
                
            }); 
    }
    const handleAcccept=(e)=>{
        document.getElementById(e.target.id+"_1").style.backgroundColor='#00d500';
        e.target.checked=true;

        let obj={
                "number":userData.data.senderMobile,
                "email":userData.data.email,
                "mobile":userData.data.mobile,
                "buildId":userData.data.buildId,
                "status":1,
                "code":e.target.id
            }
            ItemService.sendSMS(obj).then((items) => {
                console.log(">> SMS Sent",items); 
                toast.current.show({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'Motor is Running Now !!',
                    life: 5000,
                });  
            }); 
            callGetStatus();
        
    }
    const handleReject=(e)=>{
        document.getElementById(e.target.id+"_1").style.backgroundColor='red';
        e.target.checked=false;
    }
    const handleOnOff=(e)=>{
        // console.log(">> idVal",e);
        // console.log(">> idVal",e.target.checked);
        if(e.target.checked){  // ON          
            confirmDialog({
                message: 'Are you sure you want to proceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    handleAcccept(e)
                },    
                reject:  () => {
                    handleReject(e)
                }                                   
            });
            document.getElementById(e.target.id+"_1").style.backgroundColor='red';
            e.target.checked=false;
        }else{  // OFF
            document.getElementById(e.target.id+"_1").style.backgroundColor='red';
            e.target.checked=false;

            let obj={
                "buildId":userData.data.buildId,
                "_id":getSmsStatus[0]._id,
                "status":0
            }
            ItemService.sendSMS(obj).then((items) => {
                console.log(">> Update OFF",items); 
                toast.current.show({
                    severity: 'warn',
                    summary: 'Confirmed',
                    detail: 'Motor is STOP Now !!',
                    life: 5000,
                });
                callGetStatus();
            }); 
                       
           
        }            
    }

    useEffect(() => {
        console.log(">> Home Running");
        localStorage.setItem('menu','Home');

        if(userData.data.role === 'ADMIN'){
            setAdmin(true);
        }else{
            setAdmin(false)
        }
        dashboardDetails();
        // callGetStatus();

        setTimeout(() => {
            callGetStatus();
        }, 300);


        // setInterval(() => { 
        //     console.log('>> --> setInterval GET SMS Status');
        //     callGetStatus();
        // }, 3000);

        // eslint-disable-next-line
    }, []);
    

    return (  
        <div>              
            <Layout/>
            <Toast ref={toast} />
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
                                    <InputSwitch checked={showCard} onChange={(e) => setShowCard(!showCard)} />
                                </div>
                            </div>

                            {/* <p><Moment format='MMMM Do YYYY, h:mm:ss a'>{date}</Moment></p> */}
                            

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
                                                                {userData.data.role === 'ADMIN' && <a href="/add-code"><i className="bi bi-pencil-square"></i></a>}
                                                                {userData.data.role !== 'ADMIN' && <i className="bi bi-pencil-square"></i>}

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
                                        
                                    <hr/>                             
                                    </div>
                                </section>
                            }

                            <section>
                                {/* <h5 className="pagetitle">List of Codes: </h5> */}
                                    {!admin && 
                                        codeData.length? codeData.map((value,index) => {
                                            // return <AddCodeButton key={index} code_value={value} /> 
                                            let idVal="mainDivToggle_"+value.code;   
                                            return (
                                                    <div className="mainCode" key={index}>
                                                        <div className="ms-2 me-auto">
                                                            <div className="fw-bold">{value.name}</div>                        
                                                        </div>
                                                        <div className="mainDivToggle" id={idVal+"_1"}>
                                                            <input id={idVal} className="toggle" type="checkbox" role="switch" onClick={(e)=>handleOnOff(e)} name="toggle" value={'off'}/>
                                                            {/* value={valueOnOff}  */}
                                                            <label  className="slot"> {/* htmlFor="toggle" */}
                                                                <span className="slot__label">OOFF</span>
                                                                <span className="slot__label">OON</span>
                                                            </label>
                                                        </div>
                                                        
                                                        <div className="codeDetails">
                                                            <b>Motor Start Time : </b>
                                                            <p><Moment format='MMMM Do YYYY'>{getSmsStatus?getSmsStatus[0].sent_time:''}</Moment><br/>
                                                            <Moment format='hh:mm:ss A'>{getSmsStatus?getSmsStatus[0].sent_time:''}</Moment></p>
                                                        </div>

                                                        <div className="codeDetails">
                                                            <b>Motor Start Time : </b>
                                                            <p><Moment format='MMMM Do YYYY'>{getSmsStatus?getSmsStatus[0].sent_time:''}</Moment><br/>
                                                            <Moment format='hh:mm:ss A'>{getSmsStatus?getSmsStatus[0].sent_time:''}</Moment></p>
                                                        </div>

                                                        <div className="list-group">
                                                            <a href="/#" className="list-group-item list-group-item-action active" aria-current="true">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">List group item heading</h5>
                                                                <small>3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Some placeholder content in a paragraph.</p>
                                                            <small>And some small print.</small>
                                                            </a>
                                                            <a href="/#" className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">List group item heading</h5>
                                                                <small className="text-muted">3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Some placeholder content in a paragraph.</p>
                                                            <small className="text-muted">And some muted small print.</small>
                                                            </a>
                                                            <a href="/#" className="list-group-item list-group-item-action">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">List group item heading</h5>
                                                                <small className="text-muted">3 days ago</small>
                                                            </div>
                                                            <p className="mb-1">Some placeholder content in a paragraph.</p>
                                                            <small className="text-muted">And some muted small print.</small>
                                                            </a>
                                                        </div>
                                                        
                                                    </div>
                                            );    
                                        })
                                    : null}
                                
                                <ol className="list-group list-group-numbered">
                                    {/* Show in the list */}
                                    {/* {!admin && 
                                        codeData.length? codeData.map((value,index) => {
                                            return <ListItem key={index} value={value} />        
                                        })
                                    : null} */}

                                    {/* Show in ON OFF Button */}
                                    {admin && 
                                    codeData.length? codeData.map((value,index) => {
                                        return <AdminListItem key={index} value={value} />        
                                    })
                                    : null}                                  
                                    
                                    {/* List of Messages received from Mobile */}
                                    <ul><br/>
                                    {smsData &&  
                                        smsData.map((value,index) => {
                                            // let data = <><p><b>Address</b>: {value.address}<br/><b>BuildID</b>: {value.buildId}<br/><b>Body</b>: {value.body}</p>  </> 
                                            let data = <li key={index}><b>Address</b>: {value.address}<br/><b>BuildID</b>: {value.buildId}<br/><b>Body</b>: {value.body} <hr/></li>  
                                            return data; 
                                        })
                                    }
                                    </ul>
                                </ol>
                            </section>
                            
                        </main>       
                    </div>
            </div>       
            
        </div>  
    ); 
};  
  
export default Home  