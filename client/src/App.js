import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneBook, setPhoneBook] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectEntry, setSelectEntry] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  const handleUpdateClick = (entry) => {
    setSelectEntry(entry);
    setShowUpdate(true);
  };

  const addNewNumber = () => {
    axios.post('http://localhost:8080/new-phone', { name, phone })
      .then((response) => {
        console.log('New number added');
        setName('');
        setPhone('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewNumber = () => {
    axios.get(`http://localhost:8080/view-phone/`)
      .then((response) => {
        console.log('Number retrieved');
        console.log(response.data.data.phoneNumber);
        setPhoneBook(response.data.data.phoneNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateNumber = () => {
    axios.put(`http://localhost:8080/update-phone/${id}`, { name: editName, phone: editPhone })
      .then((response) => {
        console.log('Number updated');
        setShowUpdate(false);
        setEditName('');
        setEditPhone('');
        viewNumber();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteNumber = () => {
    axios.delete(`http://localhost:8080/delete-phone/${id}`)
      .then((response) => {
        console.log('Number deleted');
        // Refresh the phone book after delete
        viewNumber();
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
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input" />
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Number" className="input" />
          <div className="buttonContainer">
            <button className="button" onClick={() => addNewNumber()}>Add Phone</button>
            <button className="button" onClick={viewNumber}>View Phone</button>
            <button className="button" onClick={() => updateNumber()} disabled={!showUpdate}>Update Phone</button>
            <button className="button" onClick={() => deleteNumber()} disabled={!showUpdate}>Delete Phone</button>
          </div>
          {showUpdate && selectEntry && (
            <div className="update-form">
              <h3>Edit Entry</h3>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" className="input" />
              <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="Number" className="input" />
            </div>
            
          )}
        </div>
      </div>
      <ul>
         {phoneBook.map((entry, i) => (
            <li key={i}>
              <div className="entry-details">
                <div className="entry-name">{entry.name}</div>
                <div className="entry-phone">{entry.phone}</div>
              </div>
              <div className="entry-actions">
                <button className="update-btnn" onClick={() => handleUpdateClick(entry)}>
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default App;

