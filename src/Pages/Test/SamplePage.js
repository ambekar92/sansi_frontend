import React, { Component } from 'react'  
import Layout from '../../Layout/Layout';  

export class ViewProduct extends Component {  
    constructor(props) {
        super(props);

        this.state = {
            customers1: null,
            customers2: null,
            filters1: null            
        };     
    }

    componentDidMount() {
        console.log("Loaded componentDidMount");
    }

    render() {        
        return (
            <div>
                <Layout/>
                <div id="content-wrapper" className="d-flex flex-column">  
                    <div id="content">  
                        <main id="main" className="main">
                            <section className="section">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">View Product</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>                    
                        </main>
                    </div>
                </div>

            </div>
            
        );
    }
}
    
export default ViewProduct  