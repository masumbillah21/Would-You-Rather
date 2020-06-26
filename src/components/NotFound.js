import React from 'react';
import { Link } from 'react-router-dom'

const NotFound =  () => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mt-5 text-center">
                    <h4>Sorry, this page not found</h4>
                    <Link className="btn btn-danger mt-5" to="/">Back to home </Link> 
               </div>
            </div>
        </div>
    )    
}


export default NotFound;