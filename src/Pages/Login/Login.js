import React, { Component } from 'react'  
import ItemService from '../../Service/commonService';
  
export class Login extends Component {  
    constructor(props) {
        super(props);

        this.itemService = new ItemService();
        this.state = {
          error: null,
          isLoaded: false,
          items: [],          
          setEmail: null,
          setPassword: null
        };
    }

    componentDidMount() {
        this.getItems();        
    }


    login=(e)=>{
        e.preventDefault();
        //this.getItems(); 
        //console.log("Login  >>", this.state);
        this.itemService.getItem(this.state).then(items => {
            console.log("Res getItem >>",items);
        });       
        localStorage.setItem('user-token',JSON.stringify(this.state));        
        window.location="/home";
    }

    getItems() {        
        this.itemService.retrieveItems().then(items => {
            console.log("getItems >>",items);
            this.setState({items: items});
        });
    }



    render() {         

        //console.log("this.state  >>", this.state );
        // const { items1 } = this.state;

        return (  
            <div>  
                
               <main>
                    <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                        
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div className="d-flex justify-content-center py-4">
                                <a href="index.html" className="logo d-flex align-items-center w-auto">
                                <img src="assets/img/logo.png" alt="" />
                                <span className="d-none d-lg-block">Medical Store</span>
                                </a>
                            </div>

                            <div className="card mb-3">
                                <div className="card-body">
                                <div className="pt-4 pb-2">
                                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                    <p className="text-center small">Enter your username & password to login</p>
                                </div>

                                <form className="row g-3 needs-validation">

                                    <div className="col-12 leftAl">
                                    <label className="form-label">Username</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-person-square iconCol"></i></span>
                                        <input type="text" name="username" className="form-control" id="yourUsername" onChange={(e)=>this.setState({setEmail:e.target.value})} required />
                                    </div>
                                    </div>

                                    <div className="col-12 leftAl">
                                    <label className="form-label">Password</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-shield-lock-fill iconCol"></i></span>
                                        <input type="password" name="password" className="form-control" id="yourPassword" onChange={(e)=>this.setState({setPassword:e.target.value})} required />
                                    </div>                                    
                                    </div>

                                    {/* <div className="col-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                        <label className="form-check-label" for="rememberMe">Remember me</label>
                                    </div>
                                    </div> */}
                                    <div className="col-12">
                                        <br/>
                                    <button className="btn btn-primary w-100" onClick={this.login}>Login</button>                                   
                                    </div>
                                    {/* <div className="col-12">
                                    <p className="small mb-0">Don't have account? <a href="pages-register.html">Create an account</a></p>
                                    </div> */}
                                </form>

                                </div>
                            </div>

                            <div className="credits">                               
                                Designed by <a href="/login">Sansi Team</a>
                            </div>

                            </div>
                        </div>
                        </div>

                    </section>

                    </div>
                </main>

                <a href="/login" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

            </div>  
        )  
    }  
}  
  
export default Login