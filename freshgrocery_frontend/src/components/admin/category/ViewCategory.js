import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

const ViewCategory = () => {

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetchCategory();
        // eslint-disable-next-line
    }, []);

    const fetchCategory = async() => {
        await axios.get('/api/view-category').then(res => {
            if (res.status === 200) {
                setCategoryList(res.data.category);
            }
            setLoading(false);
        });
    }

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-category/${id}`).then(res => {
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

    var viewCategory_HTMLTABLE = "";
    if (loading) {
        return <h4>Loading Category....</h4>
    }
    else {
        viewCategory_HTMLTABLE =
            categoryList.map((category) => {
                return (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.slug}</td>
                        <td>
                            <Link className="btn btn-success btn-sm" to={`edit-category/${category.id}`}>Edit</Link>
                        </td>
                        <td>
                            <button type="button" onClick={ (e) => deleteCategory(e, category.id)}  className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                )
            });
    }

    return (
        <div className='container px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>Category list
                        <Link className="btn btn-primary btn-sm float-end" to="/admin/add-category">Add Category</Link>
                    </h4>
                </div>
                <div className='card-body'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewCategory_HTMLTABLE}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default ViewCategory