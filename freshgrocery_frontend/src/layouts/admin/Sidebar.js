import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const user = localStorage.getItem('auth_name');
    
    return (
        <div>
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>
                        <Link className="nav-link" to='/admin/dashboard'>
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </Link>
                        <Link className="nav-link" to='/admin/profile'>
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Profile
                        </Link>
                        
                        <Link className="nav-link" to="/admin/orders">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            Orders
                        </Link>
                        <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsecategories" aria-expanded="false" aria-controls="collapsecategories">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Categories
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapsecategories" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="/admin/add-category">Add Category</Link>
                                <Link className="nav-link" to="/admin/view-category">View Category</Link>
                            </nav>
                        </div>
                      
                        <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseproducts" aria-expanded="false" aria-controls="collapseproducts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Products
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapseproducts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="/admin/add-product">Add Product</Link>
                                <Link className="nav-link" to="/admin/view-product">View product</Link>
                            </nav>
                        </div>
                        <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsedestinations" aria-expanded="false" aria-controls="collapsedestinations">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Destinations
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="collapsedestinations" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="/admin/add-destination">Add Destination</Link>
                                <Link className="nav-link" to="/admin/view-destination">View Destinations</Link>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as: {user}</div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar