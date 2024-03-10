import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
// require('dotenv').config();


function Home() {
    const [data,setData] = useState([]);
    const [major,setmajor] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/major').then(res=>setmajor(res.data)).catch(err=>console.log(err))

        axios.get('http://localhost:5000/').then(res=>setData(res.data)).catch(err=>console.log(err))
    })
    const navigate = useNavigate();
    const handleDelete = (id)=>{
        axios.delete('http://localhost:5000/delete/'+id).then(res=>navigate('/')).catch(err=>console.log(err))
    }


  return (
    <div className="home">
        <div className="container">
            <h2 align='center'>Student</h2>
            <Link to="/create" align='center' className='btn-add'>เพิ่มข้อมูล</Link>
            <table className="table" align='center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Major</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d,i)=>(
                        <tr>
                            <td>{d.id}</td>
                            <td>{d.fname} {d.lname}</td>
                            <td>{d.phone}</td>
                            <td>{d.major_id}</td>
                            <td>
                                <Link to={`/update/${d.id}`} className="btn-sm" >แก้ไข</Link>
                                <button onClick={e=> handleDelete(d.id)} className="btn-cc">ลบ</button>
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