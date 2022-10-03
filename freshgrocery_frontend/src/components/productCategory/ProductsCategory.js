import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './Product.css';

const ProductsCategory = () => {

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [curLink, setCurLink] = useState("home");
  const [hoverLink, setHoverLink] = useState({
    type: "fruits",
    style: "active"
  });

  useEffect(() => {
    setHoverLink(
      {
        ...hoverLink,
        type: curLink
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curLink]);

  useEffect(() => {

    let isMounted = true;
    axios.get(`/api/get-category`).then(res => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCategory(res.data.category);
          setLoading(false);
        }
      }
    });

    axios.get(`/api/get-product`).then(res => {
      if (isMounted) {
        if (res.data.status === 200) {
          setProduct(res.data.product);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    }

  }, []);

  var showCategoryLinks = '';
  var showProducts = '';
  if (loading) {
    return (
      <h1>Loading Products....</h1>
    )
  }
  else {
    showCategoryLinks = category.map((item) => {
      return (
        <li key={item.id}>
          <Link onClick={() => setCurLink(item.slug)}
            className={hoverLink.type === item.slug ? `${hoverLink.style} link-item` : "link-item"} to={`/${item.slug}`}>{item.name}
          </Link>
        </li>
      )
    });

    showProducts = product.map((item) => {
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
                    <s className="ms-2">Kes: {item.original_price}</s>
                    <h4 className="mb-1">
                      Kes: {item.selling_price}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )
    });
  }

  return <div>
    <div className="container my-5">
      <div className="row">
        <div className="col-12 text-center mb-4 links">
          <ul className="d-flex justify-content-center align-items-center">
            {showCategoryLinks}
          </ul>
        </div>

        {showProducts}

        {/* link to more
        <div className="col-md-12 col-sm-12 my-5 d-flex justify-content-center align-items-center">
          <div className="text-center py-3 more-btn">
            <Link className="more-btn-link" to="products">
              <div className="more">
                more <i className="bi bi-arrow-right"></i>
              </div>
            </Link>
          </div>

        </div> */}
      </div>
    </div>
  </div>;
}

export default ProductsCategory;
