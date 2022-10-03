import React from 'react'
import { Route } from 'react-router-dom'
import FrontendLayout from './layouts/frontend/FrontendLayout'

const PublicRoute = ({...rest}) => {
    return (
        <div>
            <Route  render= {(props) => <FrontendLayout {...props}/> } />
        </div>
    )
}

export default PublicRoute