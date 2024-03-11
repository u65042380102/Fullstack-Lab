import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8082/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    });

    const navigate = useNavigate();

    const handleDelete = (idcus) => {
        axios.delete('http://localhost:8082/delete/'+idcus)
            .then(res => navigate('/'))
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
            <div className='bg-white rounded w-50 p-3'>
                <h2>My Restaurant</h2>
                <Link to="/create" className='btn btn-success'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>idmenu</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d ,i) => (
                            <tr key={i}>
                                <td>{d.name}</td>
                                <td>{d.idmenu}</td>
                                <td>
                                    <Link to={`/update/${d.idcus}`} className='btn btn-sm btn-primary'>Update</Link>
                                    <button onClick={e => handleDelete(d.idcus)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
