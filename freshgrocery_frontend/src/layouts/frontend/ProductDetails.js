import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'

const ProductDetails = (props) => {

  const navigate = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    document.title = 'Product details | Freshgrocery';
    let isMounted = true;

    const category_slug = props.match.params.category;
    const product_slug = props.match.params.product;
    axios.get(`/api/view-productDetails/${category_slug}/${product_slug}`).then(res => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.product);
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

  }, [props.match.params.category, props.match.params.product, navigate]);

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prevCount => prevCount - 1);
    }
  }

  const handleIncrement = () => {
    setQuantity(prevCount => prevCount + 1);
  }

  const submitAddtoCart = () => {

    const data = {
      product_id: product.id,
      product_quantity: quantity

    }

    axios.post('api/add-to-cart', data).then(res=> {
      if(res.data.status === 201){
        swal('Success', res.data.message, 'success');
      }
      else if(res.data.status === 409){
        swal('Success', res.data.message, 'success');
      }
      else if(res.data.status === 401){
        swal('Error', res.data.message, 'error');
      }
      else if(res.data.status === 404){
        swal('Warning', res.data.message, 'warning');
      }
    });

  }

  if (loading) {
    return (
      <h4>Loading product details...</h4>
    )
  }
  else {
    var availableStock = '';
    if (product.quantity > 0) {
      availableStock =
        <div>
          <label className="btn-sm btn-success px-4 mt-2">In stock</label>
          <div className="row">
            <div className="col-md-3 mt-3">
              <div className="input-group">
                <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                <div className="form-control text center">{quantity}</div>
                <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <button type="button" onClick={submitAddtoCart} className="btn btn-primary w-100">Add to Cart</button>
            </div>
          </div>
        </div>
    }
    else {
      availableStock =
        <div>
          <label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
        </div>
    }

  }
  return <div>
    <div className="form-header text-center py-5">
      <h4 className="text-uppercase">{product.name} details</h4>
    </div>
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4 border-end">
          <img className="w-100" src={`http://127.0.0.1:8000/${product.image}`} alt="product" height="230px"/>
        </div>
        <div className="col-md-8">
          <h4>
            {product.name}
          </h4>
          <p> {product.description}</p>
          <h4 className="mb-1">
            kes :  {product.selling_price}
            <s className="ms-2">kes:  {product.original_price}</s>
          </h4>
          <div>
            {availableStock}
          </div>

          {/* <button type="button" className="btn btn-danger mt-3">Add to Wishlist</button> */}
        </div>
      </div>
    </div>
  </div>;
}

export default ProductDetails;
