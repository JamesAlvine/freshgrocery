import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'

const Checkout = () => {

  const navigate = useHistory();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [destinationList, setDestinationList] = useState([]);
  const [error, setError] = useState([]);
  const [checkoutInput, setCheckout] = useState({
    firstname: '',
    lastname: '',
    email: '',
    destination_id: '',
    contact_no: '',
  });

  var totalCartPrice = 0;

  if (!localStorage.getItem('auth_token')) {
    swal("Warning", "Login to continue", "error");
    navigate.push('/login');
  }
  useEffect(() => {

    document.title = 'Checkout | Freshgrocery';
    let isMounted = true;

    axios.get('/api/all-destination').then(res => {
      if (res.data.status === 200) {
        setDestinationList(res.data.destination);
      }
    });

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


  const handleInput = (e) => {
    e.persist();
    setCheckout({ ...checkoutInput, [e.target.name]: e.target.value });
  }

  var orderinfo_data = {
    firstname: checkoutInput.firstname,
    lastname: checkoutInput.lastname,
    email: checkoutInput.email,
    destination_id: checkoutInput.destination_id,
    contact_no: checkoutInput.contact_no,
    payment_mode: 'Paid by PayPal',
    payment_id: ''
  }

  //Paypal
  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalCartPrice/100,
          },
        },
      ],
    });
  }
  const onApprove = (data, actions) => {
    //return actions.order.caputer();
    return actions.order.caputer().then(function(details){
      console.log(details);
      orderinfo_data.payment_id = details.id;

      axios.post('/api/place-order', orderinfo_data).then(res => {
        if (res.data.status === 200) {
          swal("Order placed successfully", res.data.message, 'success');

          navigate.push('/');
        }
        else if (res.data.status === 422) {
          swal("All fields are mandatory", "", 'error');
          setError(res.data.errors);
        }
      });
    });
  }
  //Paypal

  const submitOrder = (e, payment_mode) => {
    e.preventDefault();

    const data = {
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      email: checkoutInput.email,
      destination_id: checkoutInput.destination_id,
      contact_no: checkoutInput.contact_no,
      payment_mode: payment_mode,
      payment_id: ''
    }

    switch (payment_mode) {
      case 'cod':
        axios.post('/api/place-order', data).then(res => {
          if (res.data.status === 200) {
            swal("Order placed successfully", res.data.message, 'success');

            navigate.push('/');
          }
          else if (res.data.status === 422) {
            swal("All fields are mandatory", "", 'error');
            setError(res.data.errors);
          }
        });
        break;
      case 'payonline':
        axios.post('/api/place-order', data).then(res => {
          if (res.data.status === 200) {
            setError([]);

            var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
            myModal.show();
          }
          else if (res.data.status === 422) {
            swal("All fields are mandatory", "", 'error');
            setError(res.data.errors);
          }
        });
        break;

      default:
        break;
    }


  }


  if (loading) {
    return (
      <h4>Loading checkout...</h4>
    )
  }

  var checkout_HTML = '';

  if (cart.length > 0) {
    checkout_HTML =
      <div className="row">
        <div className="col-md-7">
          <div className="card">
            <div className="card-header">
              <h5>Basic Information</h5>
            </div>
            <div className="card-body">
              <div className="row">

                <div className="col-md-6">
                  <div className="form-group row my-3 mx-3">
                    <label htmlFor="firstname" className="col-form-label text-md-right">Firstname</label>
                    <input id="firstname" type="text" className="form-control" name="firstname" value={checkoutInput.firstname} onChange={handleInput} />
                    <span className="text-danger">{error.firstname}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row my-3 mx-3">
                    <label htmlFor="lastname" className="col-form-label text-md-right">Lastname</label>
                    <input id="lastname" type="text" className="form-control" name="lastname" value={checkoutInput.lastname} onChange={handleInput} />
                    <span className="text-danger">{error.lastname}</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group row my-3 mx-3">
                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>
                    <input id="email" type="email" className="form-control" name="email" value={checkoutInput.email} onChange={handleInput} />
                    <span className="text-danger">{error.email}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row my-3 mx-3">
                    <label htmlFor="destination" className="col-form-label text-md-right">Deivery destination</label>
                    <select id="destination" type="text" className="form-control" name="destination_id" value={checkoutInput.destination_id} onChange={handleInput}>
                      <option>Select delivery destination</option>
                      {
                        destinationList.map((destination) => {
                          return (
                            <option value={destination.id} key={destination.id}>{destination.name}</option>
                          )
                        })
                      }
                    </select>
                    <span className="text-danger">{error.destination_id}</span>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group row my-3 mx-3">
                    <label htmlFor="contact_no" className="col-form-label text-md-right">Contact number</label>
                    <input id="contact_no" type="text" className="form-control" name="contact_no" value={checkoutInput.contact_no} onChange={handleInput} />
                    <span className="text-danger">{error.contact_no}</span>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group text-end my-3 mx-3">
                    <button type="button" onClick={(e) => submitOrder(e, 'cod')} className="btn btn-primary mx-2">Pay on Delivery</button>
                    <button type="button" onClick={(e) => submitOrder(e, 'payonline')} className="btn btn-warning mx-2">Pay Online</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="50%">Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                totalCartPrice += item.product.selling_price * item.quantity_id;
                return (
                  <tr key={idx}>
                    <td>{item.product.name}</td>
                    <td>Kes. {item.selling_price}</td>
                    <td>{item.quantity_id}</td>
                    <td>kes. {item.product.selling_price * item.quantity_id}</td>
                  </tr>
                )
              })}
              <tr>
                <td colSpan="2" className="text-end fw-bold">Total</td>
                <td colSpan="2" className="text-end fw-bold">Kes. {totalCartPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  }

  else {
    checkout_HTML =
      <div>
        <div className="card card-body py-5 text-center">
          <h4>Your shopping Cart is Empty</h4>
        </div>
      </div>
  }
  return <div>
    <div class="modal fade" id="payOnlineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Online payment Mode</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <br />
            <PayPalButton
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            /> 
          </div>
        </div>
      </div>
    </div>
    <div className="form-header text-center py-5">
      <h4 className="text-uppercase">Checkout</h4>
    </div>
    <div className="container my-5">
      {checkout_HTML}
    </div>
  </div>;
}

export default Checkout;
