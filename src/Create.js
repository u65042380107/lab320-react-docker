import React from 'react'
import './Create.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Create() {
    const [id,setid] = useState('')
    const [fname,setfname] = useState('')
    const [lname,setlname] = useState('')
    const [phone,setphone] = useState('')
    const [major,setmajor] = useState([])

    const [major_id,setmajor_id] = useState('')
    const nav = useNavigate();
    useEffect(()=>{
        axios.get('http://localhost:5000/major').then(res=>setmajor(res.data)).catch(err=>console.log(err))
    })

    const handledata=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:5000/create',{id,fname,lname,phone,major_id}).then(
            res =>{
                nav('/');

            }
        ).catch(err=> console.log(err))

    }


  return (
    <div className="create">
      <div className="container">
        <form onSubmit={handledata}>
            <h2>Add Student</h2>
            <div className="mb-2">
            <label htmlFor="">ID</label>
            <input type="text" name="" id="" placeholder='Enter id' className="form-control"
            onChange={e=> setid(e.target.value)}/> 
            
        </div>
        <div className="mb-2">
            <label htmlFor="">First-Name</label>
            <input type="text" name="" id="" placeholder='Enter first-name' className="form-control"
            onChange={e=> setfname(e.target.value)}/> 
            {/* onChange={e=> setName(e.target.value)} */}
        </div>
        <div className="mb-2">
            <label htmlFor="">Last-Name</label>
            <input type="text" name="" id="" placeholder='Enter last-name' className="form-control"
            onChange={e=> setlname(e.target.value)}/> 
            {/* onChange={e=> setName(e.target.value)} */}
        </div>
        <div className="mb-2">
            <label htmlFor="">Phone</label>
            <input type="text" name="" id="" placeholder='Enter phone' className="form-control"
            onChange={e=> setphone(e.target.value)}/>
        </div>
        <div className="mb-2">
            <label htmlFor="">Major</label>
                <select name="" id="" onChange={e=> setmajor_id(e.target.value)} className="select">
                    {major.map(d=>(
                        <option className="option" key= {d.major_id} value={d.major_id}>{d.major_name}</option>
                    ))}
                </select>
        </div>
        <button className="btn-add">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Create