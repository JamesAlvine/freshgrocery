import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

import './Common.css';

const Signup = () => {

  // variables
  const [registerInput, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    error_list: []
  })


  const navigate = useHistory();
  // error variables
  const [error, setError] = useState({
    type: "",
    message: ""
  })

  //success variable
  const [success, setSuccess] = useState({
    type: ""
  })

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: registerInput.username,
      email: registerInput.email,
      password: registerInput.password,
      passwordConfirmation: registerInput.confirm,
    }

    await axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`api/register`, data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "success");
          navigate.push("/");
        }
        else {
          setRegister({ ...registerInput, error_list: res.data.validation_errors });
        }

      });
    });

    //password check
    if (registerInput.password === registerInput.confirm) {
      setSuccess({
        ...success,
        type: "confirm"
      })
    }
    else {
      setError({
        ...error,
        type: "confirm",
        message: "Please confirm your password!"

      })
    }

  }


  return <div>
    <Navbar />
    <>
      <div className="form-header text-center py-5">
        <h4 className="text-uppercase">Register Today</h4>
      </div>
      <div>
        <div className="container col-md-6">
          <div className="d-flex justify-content-center align-items-center">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row py-3">
                  <label htmlFor="username" className="col-md-4 col-form-label text-md-right">Username</label>

                  <div className="col-md-8">
                    <input id="username" type="text" className="form-control" name="username" value={registerInput.username} onChange={handleInput} />

                    <span className="text-danger">{registerInput.error_list.username}</span>
                  </div>
                </div>

                <div className="form-group row py-3">
                  <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                  <div className="col-md-8">
                    <input id="email" type="email" className="form-control" name="email" value={registerInput.email} onChange={handleInput} />

                    <span className="text-danger">{registerInput.error_list.email}</span>
                  </div>
                </div>

                <div className="form-group row py-3">
                  <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                  <div className="col-md-8">
                    <input id="password" type="password" className="form-control" name="password" value={registerInput.password} onChange={handleInput} />

                    <span className="text-danger">{registerInput.error_list.password}</span>
                  </div>
                </div>

                <div className="form-group row py-3">
                  <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                  <div className="col-md-8">
                    <input id="password-confirm" type="password" className="form-control" name="confirm_password" value={registerInput.confirm} onChange={handleInput} />

                    <span className="text-danger">{registerInput.error_list.confirm}</span>
                  </div>
                </div>

                <div className="form-group row py-3">
                  <div className="col-md-8">
                    {(error.message !== "" && error.type === "confirmation") && <>
                      <span className="alert alert-danger alert-block">{error.message}</span>
                    </>}
                  </div>

                </div>

                <div className="form-group row py-3 mb-0">
                  <div className="col-md-8 offset-md-4">
                    <button type="submit" className="form-btn">
                      Register
                    </button>
                  </div>
                </div>
              </form>
              <div className="link d-flex justify-content-center">Already have an account?<a className="form-link" href="/login">Login now</a></div>
            </div>
          </div>
        </div>
      </div>
    </>
    <Footer />
  </div>;
}

export default Signup;
