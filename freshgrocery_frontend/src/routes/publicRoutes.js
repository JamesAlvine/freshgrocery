import Home from '../layouts/frontend/Home';
import AboutUs from '../layouts/frontend/AboutUs';
import Profile from '../layouts/frontend/Profile';
import Cart from '../layouts/frontend/Cart';
import Product from '../layouts/frontend/Product';
import ProductDetails from '../layouts/frontend/ProductDetails';
import Checkout from '../layouts/frontend/Checkout';
import Page404 from "../components/errors/Page404";
import Page403 from "../components/errors/Page403";



const publicRoutes = [
    {path: '/', exact: true, name: 'Home', component: Home},
    {path: '/403', exact: true, name: '403', component: Page403},
    {path: '/404', exact: true, name: '404', component: Page404},
    {path: '/about', exact: true, name: 'About', component: AboutUs},
    {path: '/profile', exact:true, name: 'Profile', component: Profile},
    {path: '/cart', exact: true, name: 'Cart', component: Cart},
    {path: '/checkout', exact: true, name: 'Checkout', component: Checkout},
    {path: '/:slug', exact: true, name: 'Product', component: Product},
    {path: '/:category/:product', exact: true, name: 'ProductDetails', component: ProductDetails},
   
];

export default publicRoutes;