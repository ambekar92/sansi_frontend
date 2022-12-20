import menuData from './menuData.json'
import config from './configuration.json'

let localData = localStorage.getItem('userData');
let userData={}
if(localData){
    userData = JSON.parse(localData);
    // console.log(">> Check ",userData);
}

/* Service Function starts here */

async function getMenuList(response) {
    return menuData.menu;
}

async function getConfig(response) {
    return config;
}

async function handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
}

async function handleError(error) {
    console.log(error.message);
}

async function callGET(api_url) {
    return fetch(api_url,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Authorization": 'Bearer '+ userData.token
                }
            }).then(response => {
                if (!response.ok) {
                    handleResponseError(response);
                }
                return response.json();
            }).then(items => {
                if(items.responseCode !== 401){
                    // console.log(">> GET Service Call",items);
                    localStorage.setItem('info','');
                    return items;
                }else{
                    console.log(">> Session Timeout",items);
                    localStorage.setItem('token',''); 
                    localStorage.setItem('userData','');
                    localStorage.setItem('info','Session Timeout');
                    window.location="/login";
                }            
            }).catch(error => {
                handleError(error);
            });
}

async function callPOST(api_url,param) {
    return fetch(api_url,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    "Authorization": 'Bearer '+ userData.token
                },
                body:JSON.stringify(param)
            }).then(response => {
                if (!response.ok) {
                    handleResponseError(response);
                }
                return response.json();
            }).then(items => {
                // console.log(">> Service Login Data",items);
                if(items.responseCode !== 401){
                    // console.log(">> POST Service Call",items);
                    localStorage.setItem('info','');
                    return items;
                }else{
                    console.log(">> Session Timeout",items);
                    localStorage.setItem('token',''); 
                    localStorage.setItem('userData','');
                    localStorage.setItem('info','Session Timeout');
                    window.location="/login";
                }     
               
            }).catch(error => {
                handleError(error);
            });
}

//POST
async function login(param) {
    let api_url= config.BASE_URL + 'api/login';
    return fetch(api_url,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body:JSON.stringify(param)
            }).then(response => {
                if (!response.ok) {
                    handleResponseError(response);
                }
                return response.json();
            }).then(items => {
                //console.log(">> Service Login Data",items);
                localStorage.setItem('token',items.token); 
                localStorage.setItem('userData',JSON.stringify(items)); 
                // sessionStorage.setItem('token',items.token); 
                return items;
            }).catch(error => {
                handleError(error);
            });
}

//POST
async function logout(param) {
    let api_url= config.BASE_URL + 'api/logout';
    return fetch(api_url,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authentication": 'Bearer '+ userData.token
        },
        body:JSON.stringify(param)
    }).then(response => {
        if (!response.ok) {
            handleResponseError(response);
        }
        return response.json();
    }).then(items => {
        console.log(">> Service Logout",items);
        localStorage.setItem('token',''); 
        localStorage.setItem('userData',''); 
        localStorage.setItem('info',''); 
        return items;
    }).catch(error => {
        handleError(error);
    });
}

//POST
async function registerUser(param) {
    let api_url= config.BASE_URL + 'api/register_user';
    return callPOST(api_url,param);
}
//GET
async function getUsersList() {
    let api_url= config.BASE_URL + 'api/getusers';
    return callGET(api_url);
}
//POST
async function userDelete(param) {
    let api_url= config.BASE_URL + 'api/delete_user';
    return callPOST(api_url,param);
}
//POST
async function dashboard_details(param) {
    let api_url= config.BASE_URL + 'api/dashboard_details';
    return callPOST(api_url,param);
}
//POST
async function saveConfigData(param) {
    let api_url= config.BASE_URL + 'api/save_configdata';
    return callPOST(api_url,param);
}
//GET
async function getSaveConfigData() {
    let api_url= config.BASE_URL + 'api/getsave_configdata';
    return callGET(api_url);
}

//GET
async function getSaveSMSDataALL() {
    let api_url= config.BASE_URL + 'api/getsave_smsinfo';
    return callGET(api_url);
}

//POST  // Get User releated SMS
async function getUserSMSData(param) {
    let api_url= config.BASE_URL + 'api/getuser_smsinfo';
    return callPOST(api_url,param);
}

//POST
async function saveCode(param) {
    let api_url= config.BASE_URL + 'api/save_code';
    return callPOST(api_url,param);
}
//GET
async function getSaveCode() {
    let api_url= config.BASE_URL + 'api/getsave_code';
    return callGET(api_url);
}
//POST Common Delete function
async function deleteRecord(param) {
    let api_url= config.BASE_URL + 'api/delete_user';
    return callPOST(api_url,param);
}

//POST // SEND SMS
async function sendSMS(param) {
    let api_url= config.BASE_URL + 'api/send_sms';
    return callPOST(api_url,param);
}

// eslint-disable-next-line
const func = {
    getConfig,
    getMenuList,
    handleResponseError,
    handleError,
    callGET,
    callPOST,
    login,
    logout,
    getUsersList,
    registerUser,
    userDelete,
    dashboard_details,
    saveConfigData,
    getSaveConfigData,
    getSaveSMSDataALL,
    saveCode,
    getSaveCode,
    deleteRecord,
    getUserSMSData,
    sendSMS
};

export default func;