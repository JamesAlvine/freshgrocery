import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';

const OrderList = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        document.title = "Orders | Freshgrocery";
        axios.get('/api/admin/orders').then(res => {
            if (res.data.status === 200) {
                //console.log(res.data.products);
                setOrders(res.data.orders);
                setLoading(false);
            }
        });
    }, []);

    var displayOrders = '';
    if (loading) {
        return <h4>Loading Products....</h4>
    }
    else {
        displayOrders = orders.map((order) => {
            return (
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.tracking_no}</td>
                    <td>{order.payment_id}</td>
                    <td>{order.contact_no}</td>
                    <td>{order.email}</td>
                    {/* <td>
                        <Link className="btn btn-success btn-sm" to={`view-order/${order.id}`}>View</Link>
                    </td> */}
                </tr>
            )
        });
    }


    return (
        <div className='container px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>Order list</h4>
                </div>
                <div className='card-body'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>tracking no</th>
                                <th>Payment id</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayOrders}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default OrderList