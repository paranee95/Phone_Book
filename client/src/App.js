import React, { useState } from 'react';
import Axio from 'axios';
import './App.css';

function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addNewNumber = () => {
    Axio.post('http://localhost:8080/new-phone', { name, phone })
      .then((response) => {
        console.log('New number added');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewNumber = () => {
    Axio.get(`http://localhost:8080/view-phone/${id}`)
      .then((response) => {
        const { name, phone } = response.data;
        setName(name);
        setPhone(phone);
        console.log('Number retrieved:', name, phone);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateNumber = () => {
    Axio.put(`http://localhost:8080/update-phone/${id}`, { name, phone })
      .then((response) => {
        console.log('Number updated');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteNumber = () => {
    Axio.delete(`http://localhost:8080/delete-phone/${id}`)
      .then((response) => {
        console.log('Number deleted');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container"> 
      <center>
        <h1 className="heading">Phone Book</h1>
      </center>
      <div>
        <div>
          <input type="text" onChange={(e) => setId(e.target.value)} placeholder="ID" className="input" /> 
          <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" className="input" /> 
          <input type="text" onChange={(e) => setPhone(e.target.value)} placeholder="Number" className="input" /> 
          <div className="buttonContainer">
          <button className="button" onClick={() => addNewNumber()}>Add Phone</button>
          <button className="button" onClick={() => viewNumber()}>View Phone</button>
          <button className="button" onClick={() => updateNumber()}>Update Phone</button>
          <button className="button" onClick={() => deleteNumber()}>Delete Phone</button>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default App;

