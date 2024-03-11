import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const [name, setName] = useState('');
    const [idmenu, setIdmenu] = useState('');
    const navigate = useNavigate();
    const {idcus} = useParams();
    const [menu,setmenu] = useState([])


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8082/update/'+idcus, { name, idmenu })
            .then(res => {
                console.log('Data submitted successfully:', res.data);
                navigate('/');
            })
            .catch(err => {
                console.error('Error submitting data:', err);
            });
    }

    useEffect(()=>{
        axios.get('http://localhost:8082/menu').then(res=>setmenu(res.data)).catch(err=>console.log(err))
    })

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='e-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Customer</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input
                            type='text'
                            placeholder='กรอกชื่อลูกค้า'
                            className='form-control' // corrected typo here
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

                    <button type='submit' className='btn btn-success'>Update</button> {/* corrected class name and added type attribute */}
                </form>
            </div>
        </div>
    );
}

export default Update;
