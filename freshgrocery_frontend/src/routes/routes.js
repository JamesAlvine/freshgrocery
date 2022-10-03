import Dashboard  from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import OrderList from '../components/admin/order/OrderList';
import Category from '../components/admin/category/Category';
import ViewCategory from '../components/admin/category/ViewCategory';
import EditCategory from '../components/admin/category/EditCategory';
import Product from '../components/admin/product/Product';
import ViewProduct from '../components/admin/product/ViewProduct';
import EditProduct from '../components/admin/product/EditProduct';
import Destination from '../components/admin/destination/Destination';
import ViewDestination from '../components/admin/destination/ViewDestination';
import EditDestination from '../components/admin/destination/EditDestination';

const routes =[
    {path: '/admin', exact: true, name: 'Admin'},
    {path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    {path: '/admin/profile', exact: true, name: 'Profile', component: Profile},
    {path: '/admin/orders', exact: true, name: 'OrderList', component: OrderList},
    {path: '/admin/add-category', exact: true, name: 'Category', component: Category},
    {path: '/admin/view-category', exact: true, name: 'ViewCategory', component: ViewCategory},
    {path: '/admin/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory},
    {path: '/admin/add-product', exact: true, name: 'Product', component: Product},
    {path: '/admin/view-product', exact: true, name: 'ViewProduct', component: ViewProduct},
    {path: '/admin/edit-product/:id', exact: true, name: 'EditProduct', component: EditProduct},
    {path: '/admin/add-destination', exact: true, name: 'Destination', component: Destination},
    {path: '/admin/view-destination', exact: true, name: 'ViewDestination', component: ViewDestination},
    {path: '/admin/edit-destination/:id', exact: true, name: 'EditDestination', component: EditDestination},
];

export default routes;