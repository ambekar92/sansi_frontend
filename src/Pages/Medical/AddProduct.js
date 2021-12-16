import React, { Component } from 'react'  

import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

export class AddProduct extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            password: null,
            email: null
        }

        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
        this.confirm1 = this.confirm1.bind(this);
        this.confirm2 = this.confirm2.bind(this);
        // this.confirmPosition = this.confirmPosition.bind(this);
    } 
    
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.confirm1()
        // let login = this.state.login;
        // let password = this.state.password;
        // etc
    }

    accept() {
        this.toast.show({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    reject() {
        this.toast.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    confirm1() {
        console.log("Working.....");
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: this.accept,
            reject: this.reject
        });
    }

    confirm2() {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: this.accept,
            reject: this.reject
        });
    }



    render() {  
        const divStyle = {
            height: "100px"
        };

        return (  
            <div>                
              
                <Toast ref={(el) => this.toast = el} />               
                <div className="col-lg-12"><br/>
                <form className="col-lg-8" onSubmit={this.onSubmit.bind(this)}>

               
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Text</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="text" onChange={this.onChange.bind(this)}/>
                    </div>                                               
                    </div>
                  
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" name="email" onChange={this.onChange.bind(this)} />
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Number</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" name="number" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">File Upload</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="file" id="formFile" name="formFile" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Date</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" name="date" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Time</label>
                    <div className="col-sm-10">
                        <input type="time" className="form-control" name="time" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Color Picker</label>
                    <div className="col-sm-10">
                        <input type="color" className="form-control form-control-color" id="exampleColorInput" value="#4154f1" title="Choose your color" name="color" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Textarea</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" style={divStyle} name="textarea" onChange={this.onChange.bind(this)}></textarea>
                    </div>
                    </div>
                    <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked onChange={this.onChange.bind(this)}/>
                        <label className="form-check-label">
                            First radio
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" onChange={this.onChange.bind(this)}/>
                        <label className="form-check-label">
                            Second radio
                        </label>
                        </div>
                        <div className="form-check disabled">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios" value="option" disabled onChange={this.onChange.bind(this)}/>
                        <label className="form-check-label">
                            Third disabled radio
                        </label>
                        </div>
                    </div>
                    </fieldset>
                    <div className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">Checkboxes</legend>
                    <div className="col-sm-10">

                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck1" name="check1" onChange={this.onChange.bind(this)}/>
                        <label className="form-check-label">
                            Example checkbox
                        </label>
                        </div>

                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck2" checked name="check2" onChange={this.onChange.bind(this)}/>
                        <label className="form-check-label">
                            Example checkbox 2
                        </label>
                        </div>

                    </div>
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Disabled</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" value="Read only / Disabled" disabled name="checkNA" onChange={this.onChange.bind(this)}/>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Select</label>
                    <div className="col-sm-10">
                        <select className="form-select" aria-label="Default select example" name="select" onChange={this.onChange.bind(this)}>
                        <option >Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </select>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Multi Select</label>
                    <div className="col-sm-10">
                        <select className="form-select" multiple aria-label="multiple select example" name="mulSelect" onChange={this.onChange.bind(this)}>
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </select>
                    </div>
                    </div>

                    <div className="row mb-6">
                    {/* <label className="col-sm-2 col-form-label">Submit Button</label> */}
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Submit Form</button>
                    </div>
                    </div>

                </form>

                </div>
                </div>
        
        ) ; 
    }  
}  
    
export default AddProduct  