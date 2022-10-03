import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'

const EditCategory = (props) => {

    const navigate = useHistory();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const category_id = props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
            }
            else if(res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                navigate.push('/admin/view-category');
            }
            setLoading(false);
        });
    }, [props.match.params.id, navigate]);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const updateCategory = async (e) => {
        e.preventDefault();
        const data = categoryInput;
        const category_id = props.match.params.id;
        await axios.get('/sanctum/csrf-cookie').then(response => {
            axios.put(`/api/update-category/${category_id}`, data).then(res => {
                if(res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setError([]);
                }
                else if(res.data.status === 422){
                   setError(res.data.errors);
                }
                else if(res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                    navigate.push('/admin/view-category');
                }

            });
        });

    }

    if(loading)
    {
        return <h4>Loading Edit Category....</h4>
    }

    return (
        <div className="container px-4">
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>Edit Category
                        <Link className="btn btn-primary btn-sm float-end" to="/admin/view-category">Back</Link>
                    </h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={updateCategory}>
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

                                        <span className="text-danger">{error.name}</span>
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor="slug" className="col-md-4 col-form-label text-md-right">Slug</label>

                                    <div className="col-md-8">
                                        <input id="slug" type="text" className="form-control" name="slug" value={categoryInput.slug} onChange={handleInput} />

                                        <span className="text-danger">{error.slug}</span>
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
            </div>
        </div>
    )
}

export default EditCategory