import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Product = (props) => {

  const navigate = useHistory();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  const productCount = product.length;
  useEffect(() => {
    let isMounted = true;

    const category_slug = props.match.params.slug;
    axios.get(`/api/get-productCategory/${category_slug}`).then(res => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.product_data.product);
          setCategory(res.data.product_data.category);
          setLoading(false);
        }
        else if (res.data.status === 400) {
          swal('Warning', res.data.message, 'error');
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

  }, [props.match.params.slug, navigate]);

  var showProducts = '';
  if (loading) {
    return (
      <h4>Loading product...</h4>
    )
  }
  else {
    if (productCount) {
      showProducts = product.map((item, idx) => {
        return (
          <div className="col-md-3 my-3" key={item.id}>
            <Link className="text-decoration-none" to={`/${item.category.slug}/${item.slug}`}>
              <div className="card">
                <img src={`http://127.0.0.1:8000/${item.image}`} className="card-img-top" alt={item.name} height="200" />
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="text-center product-name">{item.name}</h5>
                    </div>
                    <div className="col-md-12 product-price">
                      <s className="ms-2">kes:  {item.original_price}</s>
                      <h4 className="mb-1">
                        kes :  {item.selling_price}
                      </h4>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          </div>
        )
      })
    }
    else {
      showProducts =
        <div className="col-md-12">
          <h4 className="text-center">No product available for {category.name}</h4>
        </div>
    }

  }
  return <div>
    <div className="form-header text-center py-5">
      <h4 className="text-uppercase">{category.name}</h4>
    </div>
    <div className="container my-5">
      <div className="row">
        {showProducts}
      </div>
    </div>
  </div>;
}

export default Product;
