import React, { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

const Category = () => {

    const [categoryInput, setCategory] = useState({
        name: '',
        slug: '',
        error_list: ''
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const submitCategory = async (e) => {
        e.preventDefault();

        const data = {
            name: categoryInput.name,
            slug: categoryInput.slug,
        }

        await axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/store-category', data).then(res => {
                if(res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setCategory({...categoryInput, 
                        name: '',
                        slug: '',
                        error_list: ''
                    });
                }
                else if(res.data.status === 400){
                    setCategory({ ...categoryInput, error_list: res.data.errors });
                }
            });
        });

    }

    return (
        <div className="container-field px-4">
            <h3 className="mt-4">Category</h3>
            <form onSubmit={submitCategory}>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                    </li>

                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active card card-body" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="form-group row my-3">
                            <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                            <div className="col-md-8">
                                <input id="name" type="text" className="form-control" name="name" value={categoryInput.name} onChange={handleInput} />

                                <span className="text-danger">{categoryInput.error_list.name}</span>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="slug" className="col-md-4 col-form-label text-md-right">Slug</label>

                            <div className="col-md-8">
                                <input id="slug" type="text" className="form-control" name="slug" value={categoryInput.slug} onChange={handleInput} />

                                <span className="text-danger">{categoryInput.error_list.slug}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary px-4 mt-4">Submit</button>
                </div>
            </form>

        </div>
    )
}

export default Category