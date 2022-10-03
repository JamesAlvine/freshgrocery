import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const ViewProduct = () => {

  const [viewProduct, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    document.title = "View product | Freshgrocery";
    axios.get('/api/view-product').then(res => {
      if (res.data.status === 200) {
        //console.log(res.data.products);
        setProduct(res.data.products);
        setLoading(false);
      }
    });
  }, []);

  var displayProduct = '';
  if (loading) {
    return <h4>Loading Products....</h4>
  }
  else {

    var productStatus = '';
    displayProduct = viewProduct.map((product) => {

      // eslint-disable-next-line 
      if(product.status == '0'){
        productStatus = 'Shown'
      }
      // eslint-disable-next-line 
      else if(product.status == '1'){
        productStatus = 'Hidden'
      }
      return (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.category.name}</td>
          <td>{product.name}</td>
          <td>{product.selling_price}</td>
          <td><img src={`http://127.0.0.1:8000/${product.image}`} width="80px" alt={product.name} /></td>
          <td>
            <Link className="btn btn-success btn-sm" to={`edit-product/${product.id}`}>Edit</Link>
          </td>
          <td>
            {productStatus}
          </td>
        </tr>
      )
    });
  }


  return (
    <div className='container px-4'>
      <div className='card mt-4'>
        <div className='card-header'>
          <h4>Product list
            <Link className="btn btn-primary btn-sm float-end" to="/admin/add-product">Add Product</Link>
          </h4>
        </div>
        <div className='card-body'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Category name</th>
                <th>Product name</th>
                <th>Selling price</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayProduct}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default ViewProduct