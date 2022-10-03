import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

const ViewDestination = () => {
    const [loading, setLoading] = useState(true);
    const [destination, setDestination] = useState([]);

    useEffect(() => {
        fetchDestination();
        // eslint-disable-next-line
    }, []);

    const fetchDestination = async() => {
        await axios.get('/api/view-destination').then(res => {
            if (res.status === 200) {
                setDestination(res.data.destination);
            }
            setLoading(false);
        });
    }

    const deleteDestination = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-destination/${id}`).then(res => {
            if(res.data.status === 200) 
            {
                swal('Success', res.data.message, 'success');
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal('Error', res.data.message, 'error');
                thisClicked.innerText = "Delete";
            }
        });
    }

    var viewDestination_HTMLTABLE = "";
    if (loading) {
        return <h4>Loading Destinations....</h4>
    }
    else {
        viewDestination_HTMLTABLE =
            destination.map((destination) => {
                return (
                    <tr key={destination.id}>
                        <td>{destination.id}</td>
                        <td>{destination.name}</td>
                        <td>{destination.slug}</td>
                        <td>
                            <Link className="btn btn-success btn-sm" to={`edit-destination/${destination.id}`}>Edit</Link>
                        </td>
                        <td>
                            <button type="button" onClick={ (e) => deleteDestination(e, destination.id)}  className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                )
            });
    }

    return (
        <div className='container px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>Destination list
                        <Link className="btn btn-primary btn-sm float-end" to="/admin/add-destination">Add Destination</Link>
                    </h4>
                </div>
                <div className='card-body'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewDestination_HTMLTABLE}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default ViewDestination