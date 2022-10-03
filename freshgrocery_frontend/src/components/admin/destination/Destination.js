import React, { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
const Destination = () => {
    const [destinationInput, setDestination] = useState({
        name: '',
        error_list: ''
    });

    const handleInput = (e) => {
        e.persist();
        setDestination({ ...destinationInput, [e.target.name]: e.target.value });
    }

    const submitDestination = async (e) => {
        e.preventDefault();

        const data = {
            name: destinationInput.name,
        }
        axios.post('/api/store-destination', data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setDestination({
                    ...destinationInput,
                    name: '',
                    slug: '',
                    error_list: ''
                });
            }
            else if (res.data.status === 400) {
                setDestination({ ...destinationInput, error_list: res.data.errors });
            }
        });


    }

    return (
        <div className="container-field px-4">
            <h3 className="mt-4">Add destination</h3>
            <form onSubmit={submitDestination}>
                <div className="tab-pane fade show active card card-body" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="form-group row my-3">
                        <label htmlFor="name" className="col-md-2 col-form-label text-md-right">Name</label>

                        <div className="col-md-10">
                            <input id="name" type="text" className="form-control" name="name" value={destinationInput.name} onChange={handleInput} />

                            <span className="text-danger">{destinationInput.error_list.name}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary px-4 mt-4">Submit</button>
                </div>
            </form>

        </div>
    )
}

export default Destination