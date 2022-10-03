import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'

const Cart = () => {

  const navigate = useHistory();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  var totalCartPrice = 0;

  if (!localStorage.getItem('auth_token')) {
    swal("Warning", "Login to continue", "error");
    navigate.push('/login');
  }
  useEffect(() => {

    document.title = 'Cart | Freshgrocery';
    let isMounted = true;

    axios.get('/api/cart').then(res => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCart(res.data.cart);
          setLoading(false);
        }
        else if (res.data.status === 404) {
          swal('Warning', res.data.message, 'error');
          navigate.push('/');
        }
      }
    });

    return () => {
      isMounted = false;
    }

  }, [navigate]);

  const handleDecrement = (card_id) => {
    setCart(cart =>
      cart.map((item) =>
        card_id === item.id ? { ...item, quantity_id: item.quantity_id - (item.quantity_id > 1 ? 1 : 0) } : item
      )
    );
    updateQuantity(card_id, 'dec')
  }

  const handleIncrement = (card_id) => {
    setCart(cart =>
      cart.map((item) =>
        card_id === item.id ? { ...item, quantity_id: item.quantity_id + 1 } : item
      )
    );
    updateQuantity(card_id, 'inc')
  }

  function updateQuantity(card_id, scope) {

    axios.put(`/api/cart-quantityUpdate/${card_id}/${scope}`).then(res => {
      if (res.data.status === 401) {
        swal('Warning', res.data.message, 'warning');
      }
    });
  }

  const deleteCartItem = async (e, card_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Removing";

    await axios.delete(`/api/delete-cartItem/${card_id}`).then(res => {
      if (res.data.status === 200) {
        swal('Success', res.data.message, 'success');
        thisClicked.closest("tr").remove();
      }
      else if (res.data.status === 404) {
        swal('Error', res.data.message, 'error');
        thisClicked.innerText = "Remove";
      }
    });
  }


  if (loading) {
    return (
      <h4>Loading cart...</h4>
    )
  }

  var card_HTML = '';

  if (cart.length > 0) {
    card_HTML =
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                totalCartPrice += item.product.selling_price * item.quantity_id;
                return (
                  <tr key={idx}>
                    <td width="10%">
                      <img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} width="50px" height="50px" />
                    </td>
                    <td>{item.product.name}</td>
                    <td width="15%" className="text-center">Kes. {item.product.selling_price}</td>
                    <td width="15%">
                      <div className="input-group">
                        <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
                        <div className="form-control text-center">{item.quantity_id}</div>
                        <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>
                      </div>
                    </td>
                    <td width="15%" className="text-center">Kes. {item.product.selling_price * item.quantity_id}</td>
                    <td width="10%">
                      <button type="button" onClick={(e) => deleteCartItem(e, item.id)} className="btn btn-danger btn-sm">Remove</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="card card-body mt-3">
              <h4>Total =
                <span className="float-end">Kes. {totalCartPrice}</span>
              </h4>
              <br />
              <Link className="btn btn-primary" to="/checkout">Checkout</Link>
            </div>
          </div>
        </div>
      </div>
  }
  else {
    card_HTML =
      <div>
        <div className="card card-body py-5 text-center">
          <h4>Your shopping Cart is Empty</h4>
        </div>
      </div>
  }


  return (
    <div>
      <div className="form-header text-center py-5">
        <h4 className="text-uppercase">Cart</h4>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            {card_HTML}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart