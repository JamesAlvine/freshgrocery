import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

import './Common.css';

const Login = () => {

  const navigate = useHistory();
  // variables
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: []
  })

  // // errors variable
  // const [error, setError] = useState({
  //     type: "",
  //     message: ""
  // })

  // //success variable
  // const [success, setSuccess] = useState({
  //     type: ""
  // })

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }

    await axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('api/login', data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "success");
          if(res.data.role === 'admin')
          {
            navigate.push("/admin/dashboard");
          }
          else
          {
            navigate.push("/");
          }
         
        }
        else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        }
        else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  }

  return <div>
    <Navbar />
    <>
      <div className="form-header text-center py-5">
        <h4 className="text-uppercase">Login</h4>
      </div>
      <div>
        <div className="container col-md-6">
          <div className="d-flex justify-content-center align-items-center">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row py-3">
                  <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email Address</label>

                  <div className="col-md-8">
                    <input id="email" type="email" className="form-control" name="email" value={loginInput.email} onChange={handleInput} />

                    <span className="text-danger">{loginInput.error_list.email}</span>
                  </div>
                </div>

                <div className="form-group row py-3">
                  <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                  <div className="col-md-8">
                    <input id="password" type="password" className="form-control" name="password" value={loginInput.password} onChange={handleInput} />

                    <span className="text-danger">{loginInput.error_list.password}</span>
                  </div>
                </div>

                <div className="form-group row py-3 mb-0">
                  <div className="col-md-8 offset-md-4">
                    <button type="submit" className="form-btn">
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <div className="link d-flex justify-content-center">Not yet signed up?<a className="form-link" href="/register">Register</a></div>
            </div>
          </div>
        </div>
      </div>
    </>
    <Footer />
  </div>;
}

export default Login;
