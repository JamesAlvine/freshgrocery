import React, { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { Route, Redirect, useHistory } from 'react-router-dom'
import MasterLayout from './layouts/admin/MasterLayout';


const AdminPrivateRoute = ({ ...rest }) => {

    const navigate = useHistory();

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('/api/checkingAuthenticated').then(res => {
            if (res.data.status === 200) {
                setAuthenticated(true)
            }

            setLoading(false)
        });

        return () => {
            setAuthenticated(false)
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, "warning");
            navigate.push("/");
        }
        return Promise.reject(err);
    })

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {

        if (error.response.status === 403)
        {
            swal("Forbidden", error.response.data.message, "warning");
            navigate.push("/403");
        }
        else if (error.response.status === 404) 
        {
            swal("404 Error", "Url page Not found", "warning");
            navigate.push("/404");
        }
        return Promise.reject(error);
    }
    );

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>

            <Route {...rest}
                render={({ props, location }) =>
                    authenticated ?
                        (<MasterLayout {...props} />) :
                        (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
                }
            />


        </div>
    )
}

export default AdminPrivateRoute