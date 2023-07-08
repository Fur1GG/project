import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import NavbarHome from './TopbarHome';
import jwt_decode from "jwt-decode";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editedRole, setEditedRole] = useState('');
  const [Id, setId] = useState('')
  const [dataa, setData] = useState({})

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const decoded = jwt_decode(accessToken);
    setId(decoded.Id)
  
    let data = {
      id: String(decoded.Id)
    };
    console.log("ola", decoded.Id)
  
    axios.post('http://localhost:3001/users', data,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(response => {
        setUsers(response.data.users);
        console.log("data", users)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };


  const handleEditUser = (userid, updatedUserData) => {
    setEditingUser(userid);
    setEditedRole(updatedUserData.role);
    console.log("userid users", userid)
  };

  const handleSaveChanges = () => {
    if (editingUser && editedRole) {

      let data = {
        role: String(editedRole),
        userid: String(editingUser)
      };

      let dataId = {
        id: String(Id)
      }

      axios.put(
          'http://localhost:3001/updateUser', data,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        .then(response => {
          const updatedUsers = users.map(user => {
            if (user.id === editingUser) {
              axios.post('http://localhost:3001/users', dataId,
              {
                headers: { 'Content-Type': 'application/json' }
              }
              )
              .then(response => {
                setUsers(response.data.users);
                console.log("data", users)
              })
              .catch(error => {
                console.log(error);
              });
            }
            return user;
          });
          setUsers(updatedUsers);
          setEditingUser(null);
          setEditedRole('');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedRole('');
  };

  const handleRemoveUser = userid => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      axios
        .delete('http://localhost:3001/removeUser', {
          data: { userid: String(userid) },
          headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
          const updatedUsers = users.filter(user => user.id !== userid);
          setUsers(updatedUsers);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  

  const filteredUsers = users.filter(
    user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.number.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  

  return (
    <div className='users_container'>
      <Sidebar />
      <div className='users_content'>
        <NavbarHome />
        <div className='users'>
          <div className='search_bar'>
            <input
              type='text'
              placeholder='Search by username or number'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <table className='userstable'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Number</th>
                <th>Course</th>
                <th>Email</th>
                <th>Advisor</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.number}</td>
                  <td>{user.course}</td>
                  <td>{user.email}</td>
                  <td>{user.advisor}</td>
                  <td>
                    {editingUser === user.id ? (
                      <select
                        value={editedRole}
                        onChange={e => setEditedRole(e.target.value)}
                      >
                        <option value={' '}>Select Role</option>
                        <option value='aluno'>aluno</option>
                        <option value='professor'>professor</option>
                        <option value='admin'>admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>
                    {editingUser === user.id ? (
                      <div className='ola'>
                      <div className='actions'>
                        <FontAwesomeIcon
                          icon={faSave}
                          onClick={handleSaveChanges}
                          title='Save Changes'
                        />
                      </div>
                      <div className='actions'>
                        <FontAwesomeIcon
                          icon={faTimes}
                          onClick={handleCancelEdit}
                          title='Cancel'
                        />
                      </div>  
                      </div>
                    ) : (
                      <div>
                        <div className='actions'>
                          <FontAwesomeIcon
                            icon={faPen}
                            onClick={() => handleEditUser(user.id, { role: user.role })}
                            title='Edit Role'
                          />
                        </div>
                      
                        <div className='actions-trash'>
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => handleRemoveUser(user.id)}
                            title='Delete User'
                          />
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
