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
    let [getSmsStatus, setSmsStatus] = useState([]);
    let [getLast3Status, setLast3Status] = useState([]);
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

    // const AdminListItem = ({value}) => {
    //     return (
    //         <li className="list-group-item d-flex justify-content-between align-items-start">
    //             <div className="ms-2 me-auto">
    //                 <div className="fw-bold">{value.code}</div>
    //                     {value.name}
    //             </div>
    //         </li>
    //     );
    // };

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
                console.log(">>callGetStatus ",items); 
                setSmsStatus(items.data)
                setLast3Status(items.last3info)
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
                "code":e.target.id,
                "message":"*ON#"
            }
            ItemService.sendSMS(obj).then((items) => {
                console.log(">> SMS Sent",items); 
                callGetStatus();
                toast.current.show({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'Motor is Running Now !!',
                    life: 5000,
                });  
            }); 
            
        
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

            let param ={
                "buildId":userData.data.buildId,
                "body":"Motor Turn Off by the USER",
                "address": "+91"+ userData.data.mobile,
                "date":Date.now()  
            }
            ItemService.saveSmsinfo(param).then((items) => {
                console.log(">> Trun Off By USER",items);                 
            }); 

            let obj={
                "buildId":userData.data.buildId,
                "_id":getSmsStatus[0]._id,
                "status":0,
                "message":"*OFF#",
                "number":userData.data.senderMobile,
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
        }, 800);


        setInterval(() => { 
            console.log('>> --> setInterval GET SMS Status');
            callGetStatus();
        }, 60000);

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
                                    <ol className="mb-0 breadcrumb">
                                        <li className="breadcrumb-item">Complete Details of the Motor ON / OFF</li>
                                    </ol>
                                </nav>                               
                            </div>
                            <div className="col-sm-1">
                                <InputSwitch checked={showCard} onChange={(e) => setShowCard(!showCard)} />
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
                                                        <h5 className="card-title">Today Triggered [ <Moment format='Do MMM YY'></Moment> ]</h5>
                                                        <div className="d-flex align-items-center">
                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                            <i className="bi bi-clock-history"></i>
                                                            </div>
                                                            <div className="ps-4">
                                                            <h6 className="countDisplay">{dashboardData.count}</h6>
                                                            {/* <span className="text-success small pt-1 fw-bold">01</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
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
                                                            <div className="ps-4">
                                                            <h6 className="countDisplay">{dashboardData.users}</h6>
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
                                                    <div className="me-auto">
                                                        <div className="fw-bold">{value.name}</div>                        
                                                    </div>
                                                    <div className="mainDivToggle" id={idVal+"_1"}>
                                                        <input id={idVal} className="toggle" type="checkbox" role="switch" onClick={(e)=>handleOnOff(e)} name="toggle" value={'off'}/>
                                                        <label  className="slot"> {/* htmlFor="toggle" */}
                                                            <span className="slot__label">OOFF</span>
                                                            <span className="slot__label">OON</span>
                                                        </label>
                                                    </div>
                                                    
                                                    {getSmsStatus.length > 0 && 
                                                        <div className="row mt-3 rowTitle">
                                                            <div className="col-sm-6">
                                                                <b>Start Time</b><br/>
                                                                <span className="time"><Moment format='Do MMM YY'>{getSmsStatus.length > 0?getSmsStatus[0].sent_time:''}</Moment> </span>
                                                                <br/>
                                                                <span className="time"><Moment format='hh:mm:ss A'>{getSmsStatus.length > 0?getSmsStatus[0].sent_time:''}</Moment></span>
                                                            </div>

                                                            <div className="col-sm-6 completedTime">
                                                            {/* <div class="spinner-grow text-success spinner-grow-sm" role="status">
                                                                <span class="visually-hidden">Loading...</span>  
                                                            </div> */}
                                                            <b> Running Time</b><br/>
             
                                                                <span className="time"><Moment format='Do MMM YY'>{getSmsStatus.length>0?getSmsStatus[0].stop_time:''}</Moment></span>
                                                                <br/>
                                                                <span className="time"><Moment format='hh:mm:ss A'>{getSmsStatus.length>0?getSmsStatus[0].stop_time:''}</Moment></span>
                                                            </div>

                                                            <div className="col-sm-12 duration">
                                                                <p>{getSmsStatus.length > 0 ? getSmsStatus[0].timeDuration : ''}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                        
                                                </div>
                                        );    
                                    })
                                : null}

                                                    
                                {!admin && 
                                    getLast3Status.length? getLast3Status.map((value,index) => {
                                        return (
                                            <div className="col-lg-12" key={index}>
                                                <div className="list-group">
                                                    <a href="/#" className="list-group-item list-group-item-action" aria-current="true">
                                                    <div className="d-flex w-200 justify-content-between">
                                                        <h5 className="mb-1 listTitle">{ value ? value.smsBody:''}</h5>
                                                    </div>
                                                    
                                                    <div className="row">
                                                        <div className="col-sm-1">
                                                            <div className="d-flex justify-content-center">
                                                                <i className="bi bi-recycle clockfill"></i>
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
                                                    </a>
                                                    
                                                </div>
                                            </div>
                                        )
                                    })
                                : null}      
                                                
                            
                            <ol className="list-group list-group-numbered">
                                {/* Show in ON OFF Button */}
                                {/* {admin && 
                                codeData.length? codeData.map((value,index) => {
                                    return <AdminListItem key={index} value={value} />        
                                })
                                : null}                                   */}
                                
                                {/* List of Messages received from Mobile */}
                                <ul><br/>
                                {admin &&  
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