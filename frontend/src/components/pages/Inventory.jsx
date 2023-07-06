import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';
import Sidebar from './Sidebar';
import NavbarHome from './TopbarHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse, faPlus } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = 'https://api.example.com'; // substitua pela sua API de backend

function Inventory() {
  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');

  const [newItem, setNewItem] = useState({ id: '', nome: '', quantidade: '', estado: '' });

  useEffect(() => {
    fetchItemsRoom1();
    fetchItemsRoom2();
  }, []);

  const fetchItemsRoom1 = async () => {
    let data1 = {room: '1'}
    try {
      const response = await axios.post('http://localhost:3001/getinventory', data1,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
      setItems1(response.data.inv_room1);
      console.log(items1)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItemsRoom2 = async () => {
    let data2 = {room: '2'}
    try {
      const response = await axios.post('http://localhost:3001/getinventory', data2,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
      setItems2(response.data.inv_room2);
    } catch (error) {
      console.log(error);
    }
  };


  const handleRoomButtonClick = (room) => {
    setSelectedRoom(room);
    console.log("items1",items1.id)
  };


const consolelog = () => {
    console.log("ola")
}


  const addItem = async () => {
    try {
      await axios.post(`${API_BASE_URL}/items`, newItem);
      //fetchItems();
      setNewItem({ id: '', nome: '', quantidade: '', estado: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/items/${itemId}`);
      //fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="inv_container">
      <Sidebar />
      <div className="inv_content">
        <NavbarHome />
        <div className="inventory">

            <div className="room_buttons">
                <button 
                    className={selectedRoom === '1' ? 'active' : ''}
                    onClick={() => handleRoomButtonClick('1')}><FontAwesomeIcon icon={faWarehouse} /> Sala 1</button>
                <button 
                    className={selectedRoom === '2' ? 'active' : ''}
                    onClick={() => handleRoomButtonClick('2')}><FontAwesomeIcon icon={faWarehouse} /> Sala 2</button>
            </div>

            <button className="add_item_button" onClick={consolelog}>
                <FontAwesomeIcon icon={faPlus} /> Adicionar Item
            </button>

            <ul className="item-list">


                {selectedRoom === '1' &&
                    items1.map((item) => (
                        <li key={item.id}>
                            <span>Nome: {item.objectname}</span>
                            <span>Estado: {item.state}</span>
                            <button onClick={() => removeItem(item.id)}>Remover</button>
                        </li>
                ))}

                {selectedRoom === '2' &&
                    items2.map((item) => (
                        <li key={item.id}>
                            <span>Nome: {item.objectname}</span>
                            <span>Estado: {item.state}</span>
                            <button onClick={() => removeItem(item.id)}>Remover</button>
                        </li>
                ))}

            </ul>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
