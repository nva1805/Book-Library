import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <div className='mt-5'>
            <div class="page-wrap d-flex flex-row align-items-center mt-5">
                <div class="container">
                    <div class="row justify-content-center ">
                        <div class="col-md-12 text-center mt-5">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">The page you are looking for was not found.</div>
                            <Link to='/' className='btn btn-light margin-right-15'>Back To Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
