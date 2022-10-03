import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import Login from './forms/Login';
import Signup from './forms/Signup';
import AdminPrivateRoute from "./AdminPrivateRoute";
import PublicRoute from "./PublicRoute";
import React from 'react'



import './App.css'


axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <BrowserRouter>
      <div>
      

        <Switch>
          <AdminPrivateRoute path="/admin" name="Admin" />

          <Route path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to="/" /> :  <Login />}
          </Route>
          <Route path="/register">
            {localStorage.getItem('auth_token') ? <Redirect to="/" /> :  <Signup />}
          </Route>

          <PublicRoute path="/" name="Home"/> 

        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
