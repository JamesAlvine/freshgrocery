import React from 'react'
import { Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'


const Navbar = () => {

    const navigate = useHistory();

    const onLogout = (e) => {
        e.preventDefault();
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/logout`, ).then(res => {
                if (res.data.status === 200) {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_name');
                    swal("Success", res.data.message, "success");
                    navigate.push("/");
                }
                else {
                  
                }
    
            });
        });
    } 


    return (
        <div>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                {/* <!-- Navbar Brand--> */}
                <Link className="navbar-brand ps-3" to="/admin">Admin panel</Link>
                {/* <!-- Sidebar Toggle--> */}
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><span className="navbar-toggler-icon"></span></button>
                {/* <!-- Navbar Search--> */}
                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="bi bi-search"></i></button>
                    </div>
                </form>
                {/* <!-- Navbar--> */}
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person"></i>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><Link onClick={onLogout} className="dropdown-item" to="#!">Logout</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar