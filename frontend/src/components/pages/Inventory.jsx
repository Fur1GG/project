import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';
import Sidebar from './Sidebar';
import NavbarHome from './TopbarHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';


function Inventory() {
    const [items1, setItems1] = useState([]);
    const [items2, setItems2] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const [newItem, setNewItem] = useState({nome: '', quantidade: '', sala: '' });

    useEffect(() => {
      fetchItemsRoom1();
      fetchItemsRoom2();
    }, []);

    const handleSearchChange = e => {
      setSearchQuery(e.target.value);
    };

    const filteredInv1 = items1.filter(
      item =>
        item.objectname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredInv2 = items2.filter(
      item =>
        item.objectname.toLowerCase().includes(searchQuery.toLowerCase())
    );

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


    const addItem = () => {
      setShowDialog(true)
    }

    
    const saveItem = async () => {
      try {
        const response = await axios.put('http://localhost:3001/setinventory', {
          objectname: newItem.nome,
          quantity: newItem.quantidade,
          room: selectedRoom,
        });
        console.log(response.data); // Exibe a resposta do servidor
        // Limpa os campos do novo item após adicionar com sucesso
        setNewItem({ id: '', nome: '', quantidade: '', estado: '' });
        // Atualiza a lista de itens para exibir o novo item
        if (selectedRoom === '1') {
          setItems1([...items1, response.data.item]);
        } else if (selectedRoom === '2') {
          setItems2([...items2, response.data.item]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    


    const removeItem = async (itemId) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this item?');
      if (confirmDelete) {
        axios
          .delete('http://localhost:3001/removeItem', {
            data: { itemid: String(itemId) },
            headers: { 'Content-Type': 'application/json' }
          })
          .then(() => {
            const updatedItems1 = items1.filter(item => item.id !== itemId);
            setItems1(updatedItems1);
            const updatedItems2 = items2.filter(item => item.id !== itemId);
            setItems2(updatedItems2);
          })
          .catch(error => {
            console.log(error);
          });
      }
    };



    const requestItem = async (itemId) => {
      const confirmRequest = window.confirm('Are you sure you want to request this item?');
      if (confirmRequest) {
        try {
          const response = await axios.post('http://localhost:3001/requestItem', {
            itemId,
          });
          console.log(response.data); // Exibe a resposta do servidor
          // Atualiza o estado isRequesting do item para true
          if (selectedRoom === '1') {
            setItems1(items1.map(item => (item.id === itemId ? { ...item, isRequesting: true } : item)));
          } else if (selectedRoom === '2') {
            setItems2(items2.map(item => (item.id === itemId ? { ...item, isRequesting: true } : item)));
          }
        } catch (error) {
          console.log(error);
        }
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
                    onClick={() => handleRoomButtonClick('1')}
                    style={{ marginRight: '50px' }}><FontAwesomeIcon icon={faWarehouse} /> Sala 1</button>
                <button 
                    className={selectedRoom === '2' ? 'active' : ''}
                    onClick={() => handleRoomButtonClick('2')}
                    style={{ marginLeft: '50px' }}><FontAwesomeIcon icon={faWarehouse} /> Sala 2</button>
            </div>

            <ul className="item-list">



              {selectedRoom != '' &&
                    <div>
                      <div className="add_item_button" >
                        <button onClick={addItem}>
                          <FontAwesomeIcon icon={faPlus} /> Add Item
                        </button>
                      </div>
                      <div className='search_bar'>
                        <input
                          type='text'
                          placeholder='Search by object name'
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                      </div>
                    
                    
                  </div>
              }

              <table className='invtable'>
                <tbody>
                  {selectedRoom === '1' &&
                      filteredInv1.map((item) => (
                          <tr key={item.id}>
                              <td>{item.objectname}</td>
                              <td>
                                {item.state ? (
                                  <>
                                    Disponivel
                                  </>
                                ) : (
                                  <>
                                    Ocupado
                                  </>
                                )}
                              </td>
                              <td className='icon'><FontAwesomeIcon icon={faTrash} onClick={() => removeItem(item.id)}/></td> 
                              <td className='requisitar_btn'><button onClick={requestItem}>Requisitar</button></td>                            
                          </tr>
                  ))}

                  {selectedRoom === '2' &&
                                      filteredInv2.map((item) => (
                                          <tr key={item.id}>
                                              <td>{item.objectname}</td>
                                              <td>
                                                {item.state ? (
                                                  <>
                                                    Disponivel
                                                  </>
                                                ) : (
                                                  <>
                                                    Ocupado
                                                  </>
                                                )}
                                              </td>
                                              <td className='icon'><FontAwesomeIcon icon={faTrash} onClick={() => removeItem(item.id)}/></td>
                                          </tr>
                                  ))}

                </tbody>
              </table>


            </ul>
            
            {showDialog && (
              <div className="dialog-container">
                <div className="dialog">
                  <h2>Adicionar Item</h2>
                  <form onSubmit={saveItem}>
                    <label>
                      Nome:
                      <input
                        type="text"
                        value={newItem.nome}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            nome: e.target.value
                          })
                        }
                        required
                      />
                    </label>
                    <label>
                      Quantidade:
                      <input
                        type="number"
                        value={newItem.quantidade}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            quantidade: e.target.value
                          })
                        }
                        required
                      />
                    </label>
                    <div className="dialog-buttons">
                      <button type="submit">Adicionar</button>
                      <button onClick={() => setShowDialog(false)}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
            
        </div>
      </div>

  );
}

export default Inventory;
