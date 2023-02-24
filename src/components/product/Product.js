import React from 'react'
import '../../asset/css/components/product/product.scss'
import { NavLink, Outlet } from 'react-router-dom';

const Product = () => {

    return (
        <div className='container'>
            <div className="product">
                    <div className="row">
                        <div className="col col-3 product__left">
                            <h3 className='mt-5'>Categories:</h3>
                            <div className="product__feature">
                                <NavLink to={"novels"}><span>Novel Books</span></NavLink>
                                <NavLink to={"sciences"}><span>Science Books</span></NavLink>
                            </div>
                        </div>
                        <div className="col col-9 p-0">
                            <div className="product__show">
                                <Outlet />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Product