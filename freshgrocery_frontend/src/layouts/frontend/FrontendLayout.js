import React from 'react'
import publicRoutes from '../../routes/publicRoutes';
import { Switch, Route} from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const FrontendLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Switch>
                    {publicRoutes.map((routedata, idx) => {
                        return (
                            routedata.component && (
                                <Route
                                    key={idx}
                                    path={routedata.path}
                                    exact={routedata.exact}
                                    name={routedata.name}
                                    render={(props) => (
                                        <routedata.component {...props} />
                                    )}
                                />
                            )
                        )
                    })}
                </Switch>

                <Footer />
            </div>
        </div>
    )
}

export default FrontendLayout