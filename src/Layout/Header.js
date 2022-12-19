import React, { useEffect,useState } from "react";
import ItemService from "../services/commonService";

const Header = () => {
  let [flag, setFlag] = useState(true);
  let [userData] = useState(JSON.parse(localStorage.getItem('userData'))); // User Details from LocalStorage
  let [headerName, setHeaderName] = useState();
  let [headerLogo, setHeaderLogo] = useState();  

  const getConfig=()=>{
    ItemService.getConfig().then(items => {
        setHeaderName(items.PRODUCT_NAME);                
        setHeaderLogo(items.PRODUCT_LOGO);     
        saveConfigData(items);           
    });         
  }

  const saveConfigData=(param)=>{
    ItemService.saveConfigData(param).then(items => {
       console.log(">> Config Data Saved in DB");               
    });         
  }

  const handleUpdate = (e) => {
    setFlag(!flag);
    if (flag === true) {
      document.body.classList.add("toggle-sidebar");
    } else {
      document.body.classList.remove("toggle-sidebar");
    }
  };

  const handleLogout=()=>{
    let obj= {'email':userData.data.email};
    ItemService.logout(obj).then(items => {
      if(items.responseCode === 401){
        window.location="/login";
      }      
    });  
  }

  const handleReload=()=>{
    window.location.reload()
  }

  useEffect(() => {
    getConfig();  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="/home" className="logo d-flex align-items-center">
            <img src={headerLogo} alt="" />
            <span className="d-none d-lg-block">{headerName}</span>
          </a>
          <i
            className="bi bi-list toggle-sidebar-btn"
            onClick={handleUpdate}
          ></i>
        </div>

        {/* <div className="search-bar">
          <form
            className="search-form d-flex align-items-center">
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            {/* <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="/">
                <i className="bi bi-search"></i>
              </a>
            </li> */}

            {/* <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="/"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="/">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="/">Show all notifications</a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="/"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="/">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="/">
                    <img
                      src="assets/img/messages-1.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="/">
                    <img
                      src="assets/img/messages-2.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="/">
                    <img
                      src="assets/img/messages-3.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                  <a href="/">Show all messages</a>
                </li>
              </ul>
            </li> */}

            <li className="nav-item dropdown">     
              <span className="nav-link nav-icon">          
                <i className="bi bi-arrow-repeat" onClick={handleReload}></i>   
              </span>           
            </li>

            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="/"
                data-bs-toggle="dropdown"
              >
                <img
                  src="assets/img/profile-img.png"
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {userData.data.name}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6> {userData.data.name}</h6>
                  <span><b>{userData.data.email}</b></span><br/>
                  <span>Role: <b>{userData.data.role}</b></span><br/>
                  <span>Mobile Num: <b>{userData.data.mobile}</b></span><br/>
                  <span>Sender Num: <b>{userData.data.senderMobile}</b></span><br/>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </a>
                </li> */}
                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* <li>
              <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                <i className="bi bi-gear"></i>
                <span>Account Settings</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider"/>
            </li>

            <li>
              <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                <i className="bi bi-question-circle"></i>
                <span>Need Help?</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider"/>
            </li> */}

                <li>
                  <button className="dropdown-item d-flex align-items-center" onClick={handleLogout} >  
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
// export class Header extends Component {

//     state = { flag : true }

//     handleUpdate = () => {
//         this.setState({flag: !this.state.flag});
//         if(this.state.flag===true){
//             document.body.classList.add('toggle-sidebar');
//         }else{
//             document.body.classList.remove('toggle-sidebar');
//         }
//     }

//     render() {
//         return (
//             <div>

//   <header id="header" className="header fixed-top d-flex align-items-center">

//     <div className="d-flex align-items-center justify-content-between">
//       <a href="index.html" className="logo d-flex align-items-center">
//         <img src="assets/img/logo.png" alt=""/>
//         <span className="d-none d-lg-block">SanSii</span>
//       </a>
//       <i className="bi bi-list toggle-sidebar-btn" onClick = {this.handleUpdate}></i>
//     </div>

//     <div className="search-bar">
//       <form className="search-form d-flex align-items-center" method="POST" action="/">
//         <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
//         <button type="submit" title="Search"><i className="bi bi-search"></i></button>
//       </form>
//     </div>

//     <nav className="header-nav ms-auto">
//       <ul className="d-flex align-items-center">

//         <li className="nav-item d-block d-lg-none">
//           <a className="nav-link nav-icon search-bar-toggle " href="/">
//             <i className="bi bi-search"></i>
//           </a>
//         </li>

//         <li className="nav-item dropdown">

//           <a className="nav-link nav-icon" href="/" data-bs-toggle="dropdown">
//             <i className="bi bi-bell"></i>
//             <span className="badge bg-primary badge-number">4</span>
//           </a>

//           <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
//             <li className="dropdown-header">
//               You have 4 new notifications
//               <a href="/"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
//             </li>
//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             <li className="notification-item">
//               <i className="bi bi-exclamation-circle text-warning"></i>
//               <div>
//                 <h4>Lorem Ipsum</h4>
//                 <p>Quae dolorem earum veritatis oditseno</p>
//                 <p>30 min. ago</p>
//               </div>
//             </li>

//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             <li className="notification-item">
//               <i className="bi bi-x-circle text-danger"></i>
//               <div>
//                 <h4>Atque rerum nesciunt</h4>
//                 <p>Quae dolorem earum veritatis oditseno</p>
//                 <p>1 hr. ago</p>
//               </div>
//             </li>

//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             <li className="notification-item">
//               <i className="bi bi-check-circle text-success"></i>
//               <div>
//                 <h4>Sit rerum fuga</h4>
//                 <p>Quae dolorem earum veritatis oditseno</p>
//                 <p>2 hrs. ago</p>
//               </div>
//             </li>

//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             <li className="notification-item">
//               <i className="bi bi-info-circle text-primary"></i>
//               <div>
//                 <h4>Dicta reprehenderit</h4>
//                 <p>Quae dolorem earum veritatis oditseno</p>
//                 <p>4 hrs. ago</p>
//               </div>
//             </li>

//             <li>
//               <hr className="dropdown-divider"/>
//             </li>
//             <li className="dropdown-footer">
//               <a href="/">Show all notifications</a>
//             </li>

//           </ul>

//         </li>

//         <li className="nav-item dropdown">

//           <a className="nav-link nav-icon" href="/" data-bs-toggle="dropdown">
//             <i className="bi bi-chat-left-text"></i>
//             <span className="badge bg-success badge-number">3</span>
//           </a>

//           <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
//             <li className="dropdown-header">
//               You have 3 new messages
//               <a href="/"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
//             </li>
//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             <li className="message-item">
//               <a href="/">
//                 <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle"/>
//                 <div>
//                   <h4>Maria Hudson</h4>
//                   <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
//                   <p>4 hrs. ago</p>
//                 </div>
//               </a>
//             </li>
//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             <li className="message-item">
//               <a href="/">
//                 <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle"/>
//                 <div>
//                   <h4>Anna Nelson</h4>
//                   <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
//                   <p>6 hrs. ago</p>
//                 </div>
//               </a>
//             </li>
//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             <li className="message-item">
//               <a href="/">
//                 <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle"/>
//                 <div>
//                   <h4>David Muldon</h4>
//                   <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
//                   <p>8 hrs. ago</p>
//                 </div>
//               </a>
//             </li>
//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             <li className="dropdown-footer">
//               <a href="/">Show all messages</a>
//             </li>

//           </ul>

//         </li>

//         <li className="nav-item dropdown pe-3">

//           <a className="nav-link nav-profile d-flex align-items-center pe-0" href="/" data-bs-toggle="dropdown">
//             <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
//             <span className="d-none d-md-block dropdown-toggle ps-2">Santhosh Ambekar</span>
//           </a>

//           <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
//             <li className="dropdown-header">
//               <h6>Santhosh Ambekar</h6>
//               <span>Web Designer</span>
//             </li>
//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             <li>
//               <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
//                 <i className="bi bi-person"></i>
//                 <span>My Profile</span>
//               </a>
//             </li>
//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             {/* <li>
//               <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
//                 <i className="bi bi-gear"></i>
//                 <span>Account Settings</span>
//               </a>
//             </li>
//             <li>
//               <hr className="dropdown-divider"/>
//             </li>

//             <li>
//               <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
//                 <i className="bi bi-question-circle"></i>
//                 <span>Need Help?</span>
//               </a>
//             </li>
//             <li>
//               <hr className="dropdown-divider"/>
//             </li> */}

//             <li>
//               <a className="dropdown-item d-flex align-items-center" href="/login">
//                 <i className="bi bi-box-arrow-right"></i>
//                 <span>Sign Out</span>
//               </a>
//             </li>

//           </ul>
//         </li>

//       </ul>
//     </nav>

//   </header>
//             </div>
//         )
//     }
// }

export default Header;
