import React from 'react';
import './Create.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [major_id, setMajorId] = useState('');

  const [major, setMajor] = useState([]);
  const [odata, setOdata] = useState([]);

  const nav = useNavigate();
  const { id } = useParams();

  const handleData = (event) => {
    event.preventDefault();
    axios.put('http://localhost:5000/update/' + id, { fname, lname, phone, major_id })
      .then((res) => {
        nav('/');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('http://localhost:5000/major');
        setMajor(response1.data);
  
        const response2 = await axios.get('http://localhost:5000/update/' + id);
        setOdata(response2.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);
  
  useEffect(() => {
    
    setFname(odata.fname);
    setLname(odata.lname);
    setPhone(odata.phone);
    setMajorId(odata.major_id);
    
  }, [odata]);
  
  
    
    // console.log(fname)
  return (
    <div className="create">
      <div className="container">
        <form onSubmit={handleData}>
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="">First-Name</label>
            <input
              type="text"
              value={fname}
              placeholder="Enter first-name"
              className="form-control"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Last-Name</label>
            <input
              type="text"
              value={lname}
              placeholder="Enter last-name"
              className="form-control"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Phone</label>
            <input
              type="text"
              value={phone}
              placeholder="Enter phone"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Major</label>
            <select
              onChange={(e) => setMajorId(e.target.value)}
              className="select"
              value={major_id}
            >
              {major.map((d) => (
                <option className="option" key={d.major_id} value={d.major_id}>
                  {d.major_name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn-add">แก้ไข</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
