import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'

const EditDestination = (props) => {
    const navigate = useHistory();
    const [loading, setLoading] = useState(true);
    const [destinationInput, setDestination] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const destination_id = props.match.params.id;
        axios.get(`/api/edit-destination/${destination_id}`).then(res => {
            if (res.data.status === 200) {
                setDestination(res.data.destination);
            }
            else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                navigate.push('/admin/view-destination');
            }
            setLoading(false);
        });
    }, [props.match.params.id, navigate]);

    const handleInput = (e) => {
        e.persist();
        setDestination({ ...destinationInput, [e.target.name]: e.target.value });
    }

    const updateDestination = async (e) => {
        e.preventDefault();
        const data = destinationInput;
        const destination_id = props.match.params.id;

        axios.put(`/api/update-destination/${destination_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate.push('/admin/view-category');
            }

        });

    }

    if (loading) {
        return <h4>Loading Edit Destination...</h4>
    }

    return (
        <div className="container px-4">
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>Edit Category
                        <Link className="btn btn-primary btn-sm float-end" to="/admin/view-destination">Back</Link>
                    </h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={updateDestination}>
                        <div className="tab-pane fade show active card card-body" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="form-group row my-3">
                                <label htmlFor="name" className="col-md-2 col-form-label text-md-right">Name</label>

                                <div className="col-md-10">
                                    <input id="name" type="text" className="form-control" name="name" value={destinationInput.name} onChange={handleInput} />

                                    <span className="text-danger">{error.name}</span>
                                </div>
                            </div>
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

export default EditDestination