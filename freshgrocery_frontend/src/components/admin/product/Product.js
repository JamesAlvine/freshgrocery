import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

const Product = () => {

  const [productInput, setProduct] = useState({
    category_id: '',
    name: '',
    slug: '',
    description: '',
    
    original_price: '',
    selling_price: '',
    quantity: '',
  });
  const [picture, setPicture] = useState([]);
  const [error, setError] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [checkbox, setCheckbox] = useState([]);

  useEffect (() => {

    document.title = "Freshgrocery | Add product";
    axios.get('/api/all-category').then( res => {
      if(res.data.status === 200)
      {
        setCategoryList(res.data.category);
      }
    });
  },[]);

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  }

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  }

  const handleCheckbox = (e) => {
    e.persist();
    setCheckbox({ ...checkbox, [e.target.name]: e.target.checked });
  }


  const submitProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', picture.image);
    formData.append('category_id', productInput.category_id);
    formData.append('name', productInput.name);
    formData.append('slug', productInput.slug);
    formData.append('description', productInput.description);

    formData.append('original_price', productInput.original_price);
    formData.append('selling_price', productInput.selling_price);
    formData.append('quantity', productInput.quantity);
    formData.append('status', checkbox.status ? '1' : '0');

    console.log(formData)

    axios.post('/api/store-product', formData).then(res => {
      if(res.data.status === 200)
      {
        swal('Success', res.data.message, 'success');
        setProduct({...productInput,
          category_id: '',
          name: '',
          slug: '',
          description: '',
          
          original_price: '',
          selling_price: '',
          quantity: '',
        });
        setError([]);
      }
      else if(res.data.status === 422){
        setError(res.data.errors);
      }
    });

  }


  return (
    <div className="container px-4">
      <div className='card mt-4'>
        <div className='card-header'>
          <h4>Add Product
            <Link className="btn btn-primary btn-sm float-end" to="/admin/view-product">View Product</Link>
          </h4>
        </div>
        <div className='card-body'>
          <form onSubmit={submitProduct} encType='multipart/form-data'>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="form-group row my-3">
                  <label htmlFor="category" className="col-md-4 col-form-label text-md-right">Category</label>

                  <div className="col-md-8">
                    <select id="category" type="text" className="form-control" name="category_id" value={productInput.category_id} onChange={handleInput}>
                    <option>Select category</option>
                      {
                        categoryList.map((category) => {
                          return(
                            <option value={category.id} key={category.id}>{category.name}</option>
                          )
                        })
                      }
                      
                    </select>

                    <span className="text-danger">{error.category_id}</span>
                  </div>
                </div>
                <div className="form-group row my-3">
                  <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                  <div className="col-md-8">
                    <input id="name" type="text" className="form-control" name="name" value={productInput.name} onChange={handleInput} />

                    <span className="text-danger">{error.name}</span>
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label htmlFor="slug" className="col-md-4 col-form-label text-md-right">Slug</label>

                  <div className="col-md-8">
                    <input id="slug" type="text" className="form-control" name="slug" value={productInput.slug} onChange={handleInput} />

                    <span className="text-danger">{error.slug}</span>
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label htmlFor="description" className="col-md-4 col-form-label text-md-right">Description</label>

                  <div className="col-md-8">
                    <textarea id="description" type="text" className="form-control" name="description" value={productInput.description} onChange={handleInput}></textarea>

                    <span className="text-danger">{error.description}</span>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade card-body border" id="otherdetails" role="tabpanel" aria-labelledby="contact-tab">

                  <div className="form-group row my-3">
                    <label htmlFor="original_price" className="col-md-4 col-form-label text-md-right">Original Price</label>

                    <div className="col-md-8">
                      <input id="original_price" type="text" className="form-control" name="original_price" value={productInput.original_price} onChange={handleInput} />

                      <span className="text-danger">{error.original_price}</span>
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label htmlFor="selling_price" className="col-md-4 col-form-label text-md-right">Selling Price</label>

                    <div className="col-md-8">
                      <input id="selling_price" type="text" className="form-control" name="selling_price" value={productInput.selling_price} onChange={handleInput} />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label htmlFor="quantity" className="col-md-4 col-form-label text-md-right">Quantity</label>

                    <div className="col-md-8">
                      <input id="quantity" type="text" className="form-control" name="quantity" value={productInput.quantity} onChange={handleInput} />

                      <span className="text-danger">{error.quantity}</span>
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label htmlFor="image" className="col-md-4 col-form-label text-md-right">Image</label>

                    <div className="col-md-8">
                      <input id="image" type="file" className="form-control" name="image" onChange={handleImage} />

                      <span className="text-danger">{error.image}</span>
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label htmlFor="status" className="col-md-4 col-form-label text-md-right">Status (checked=Hidden)</label>

                    <div className="col-md-8">
                      <input id="status" type="checkbox" className="w-50 h-50" name="status" defaultChecked={checkbox.status === 1 ? true:false} onChange={handleCheckbox} />
                    </div>
                  </div>
              </div>
              <div>
                    <button type="submit" className="btn btn-primary px-4 mt-4">Submit</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Product