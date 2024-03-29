import React, { Component } from 'react'  
// import ItemService from '../services/commonService';

export class Leftside extends Component {  
    constructor(props) {
      super(props);    
      this.state = {        
        flag:false,
        addActiveClass:null,
        userData: JSON.parse(localStorage.getItem('userData')) // User Details from LocalStorage
      };      
    }

   

    render() {  
      let menuItem= this.props.info;
      let saveState=this.state;
      let userData = this.state.userData;
      
      let renderItems=null;
      let selectedMenu = localStorage.getItem('menu');
      if (menuItem.length>0) {
            // console.log(">> menuItem",menuItem);
            // eslint-disable-next-line
            renderItems = menuItem.map(function(item, i) {  
              let Cardval;
              
              if (item.children.length>0) {  // Render Child Menu here              
                let childItem = item.children.map(function(child_item, i) {
                    let child = <li key={child_item.name}>
                                  <a href={child_item.hrefLink} className={saveState.addActiveClass}>
                                    <i className={child_item.icon}></i><span>{child_item.name}</span>
                                  </a>
                                </li>
                    return child;
                });

                Cardval =<li key={item.name} className="nav-item">
                            <a className="nav-link collapsed" data-bs-target={item.data_bs_targetp} data-bs-toggle="collapse" href="/">
                              <i className={item.icon}></i><span>{item.name}</span><i className="bi bi-chevron-down ms-auto"></i>
                            </a>
                            <ul id={item.data_bs_target} className="nav-content collapse " data-bs-parent="#sidebar-nav">
                              {childItem}
                            </ul>
                          </li> 
                                
                return Cardval;
              }else{ // Render Parent Menu Here

                if(item.roleInfo.includes(userData.data.role)){
                  let specCase;
                  if(item.name === selectedMenu){
                    specCase ="nav-link";
                  }else{
                    specCase ="nav-link collapsed dasdas";
                  }
                  Cardval = <li  key={item.name} className="nav-item">
                              <a className={specCase} href={item.hrefLink} >
                              <i className={item.icon}></i>
                                <span>{item.name}</span> 
                              </a>
                            </li>

                  return Cardval;
                }
                
              }
               
                        
            });
      }else{
        renderItems = <h1>Not found</h1>
      }

        return (  
            <div>  
              <aside id="sidebar" className="sidebar">

              <ul className="sidebar-nav" id="sidebar-nav">

                {renderItems} {/* Menu loads here */}

                {/* <li className="nav-item">
                  <a className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="/">
                    <i className="bi bi-menu-button-wide"></i><span>Components</span><i className="bi bi-chevron-down ms-auto"></i>
                  </a>
                  <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                      <a href="components-alerts.html">
                        <i className="bi bi-circle"></i><span>Alerts</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-accordion.html">
                        <i className="bi bi-circle"></i><span>Accordion</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-badges.html">
                        <i className="bi bi-circle"></i><span>Badges</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-breadcrumbs.html">
                        <i className="bi bi-circle"></i><span>Breadcrumbs</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-buttons.html">
                        <i className="bi bi-circle"></i><span>Buttons</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-cards.html">
                        <i className="bi bi-circle"></i><span>Cards</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-carousel.html">
                        <i className="bi bi-circle"></i><span>Carousel</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-list-group.html">
                        <i className="bi bi-circle"></i><span>List group</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-modal.html">
                        <i className="bi bi-circle"></i><span>Modal</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-tabs.html">
                        <i className="bi bi-circle"></i><span>Tabs</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-pagination.html">
                        <i className="bi bi-circle"></i><span>Pagination</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-progress.html">
                        <i className="bi bi-circle"></i><span>Progress</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-spinners.html">
                        <i className="bi bi-circle"></i><span>Spinners</span>
                      </a>
                    </li>
                    <li>
                      <a href="components-tooltips.html">
                        <i className="bi bi-circle"></i><span>Tooltips</span>
                      </a>
                    </li>
                  </ul>
                </li> */}


              </ul>

              </aside> 
            </div>  
        )  
    }  
}  
  
export default Leftside