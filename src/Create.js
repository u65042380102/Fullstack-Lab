import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [name, setName] = useState('');
    const [idmenu, setIdmenu] = useState('');
    const navigate = useNavigate();
    const [menu,setmenu] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8082/create', {name, idmenu})
            .then(res => {
                console.log('Data submitted successfully:', res.data);
                navigate('/');
            })
            .catch(err => {
                console.error('Error submitting data:', err);
            });
    }
    useEffect(()=>{
        axios.get('http://localhost:8082/menu').then(res=>
        setmenu(res.data)).catch(err=>console.log(err))
    })


    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='e-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Customer</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input
                            type='text'
                            placeholder='กรอกชื่อลูกค้า'
                            className='form-control'
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Menu</label>
                        <select onChange={e=> setIdmenu(e.target.value)} className="select">
                    {menu.map(d=>(
                        <option className="option" key= {d.idmenu} value={d.idmenu}>{d.namemunu}</option>
                    ))}
                        </select>
                    </div>

                    <button type='submit' className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;
