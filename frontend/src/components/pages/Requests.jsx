import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Requests.css';
import Sidebar from './Sidebar';
import NavbarHome from './TopbarHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCode, faSave, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';




const RequestsList = () => {
    const [users, setUsers] = useState([]);
    const [profs, setProfs] = useState([])
    const [acceptedUser, setAcceptedUser] = useState(null);
    const [editedRole, setEditedRole] = useState('');
    const [editedAdvisor, setAdvidor] = useState('');
    console.log("olaaaa", users.length)

    useEffect(() => {
        //se o state for um vai buscar os utilizadores sem role
        let data1 = {state: '1'}
        axios.post('http://localhost:3001/requests', data1,
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
        })

        //se o state for dois vai buscar os professores
        let data2 = {state: '2'}
        axios.post('http://localhost:3001/requests', data2,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(response => {
            setProfs(response.data.profs)
        }).catch(error => {
            console.log(error)
        })


    }, [])



    const handleEditUser = (userid, updatedUserData) => {
        setAcceptedUser(userid)
        setEditedRole(updatedUserData.role);
        
    }

    const handleSaveChanges = () => {
        if (acceptedUser && editedRole) {
            let data = {
                role : String(editedRole),
                userid: String(acceptedUser)
            }


            if(editedRole != 'aluno') {
            axios.put(
                'http://localhost:3001/updateUser', data,
                {
                  headers: { 'Content-Type': 'application/json' }
                }
              )
              .then(response => {
                const updatedUsers = users.map(user => {
                  if (user.id === acceptedUser) {
                    let data1 = {state: '1'}
                    axios.post('http://localhost:3001/requests', data1,
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
                setAcceptedUser(null);
                setEditedRole('');
              })
              .catch(error => {
                console.log(error);
              });
            }

            if(editedRole === 'aluno') {
                if (editedAdvisor) {
                    let dataAdvisor = {
                        advisor : String(editedAdvisor),
                        userid: String(acceptedUser)
                    }
    
                    axios.put(
                        'http://localhost:3001/updateAdvisor', dataAdvisor,
                    {
                      headers: { 'Content-Type': 'application/json' }
                    }
                    )
                    .catch(error => {
                        console.log(error)
                    })
    
                    axios.put(
                        'http://localhost:3001/updateUser', data,
                        {
                          headers: { 'Content-Type': 'application/json' }
                        }
                      )
                      .then(response => {
                        const updatedUsers = users.map(user => {
                          if (user.id === acceptedUser) {
                            let data1 = {state: '1'}
                            axios.post('http://localhost:3001/requests', data1,
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
                        setAcceptedUser(null);
                        setEditedRole('');
                      })
                      .catch(error => {
                        console.log(error);
                      }
                      );
                }else {
                alert('É obrigatório definir um orientador para um aluno ')
            }
                
            } 
        }
    }



    const handleCancelEdit = () => {
        setAcceptedUser(null);
        setEditedRole('');
    };


    const handleRemoveUser = userid => {
        const confirmDelete = window.confirm('Are you sure you want to reject this user?');
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

    return (
        <div className='requests_container'>
            <Sidebar/>
            <div className='requests_content'>
                <NavbarHome/>
                <div className='requests'>

                {users.length === 0 ? (
                    <div className='no_requests'>
                        <p>De momento não existem novos pedidos de autenticação...</p>
                        <FontAwesomeIcon icon={faCode} />
                    </div>
                ):(
                    <table>

                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.number}</td>
                                <td>{user.email}</td> 
                                    {acceptedUser === user.id ? (
                                        <td>
                                            <div className='add_role'>
                                                <h3>Adicionar Role</h3>

                                                <select 
                                                    value={editedRole}
                                                    onChange={e => setEditedRole(e.target.value)}
                                                    >
                                                    <option value={' '}>Select Role</option>
                                                    <option value="aluno">Aluno</option>
                                                    <option value="professor">Professor</option>
                                                    <option value="admin">Admin</option>
                                                </select> 

                                                {editedRole === 'aluno' && (
                                                    <select 
                                                    value={editedAdvisor}
                                                    
                                                    onChange={e => setAdvidor(e.target.value)}>
                                                            <option value={' '}>Select Orientador</option>
                                                            {profs.map(professor =>(
                                                            
                                                                <option value={`${professor.username} ${professor.number}`}>{professor.username} {professor.number}</option>
                                                            
                                                            ))}

                                                    </select>
                                                )}
                                                
                                            </div>
                                        </td>
                                    ) : (
                                        user.role
                                    )} 
                                <td>
                                        {acceptedUser === user.id ? (
                                            <div className='ola'>

                                                <div className='actions'>
                                                    <FontAwesomeIcon 
                                                    icon={faSave}
                                                    onClick={handleSaveChanges}
                                                    title='Save' />
                                                </div>

                                                <div className='actions'>
                                                    <FontAwesomeIcon 
                                                    icon={faTimes}
                                                    onClick={handleCancelEdit}
                                                    title='Cancel' />
                                                </div>


                                            </div>
                                        ) : (
                                            <div>
                                                <div className='actions'>
                                                    <FontAwesomeIcon 
                                                    icon={faCircleCheck}
                                                    onClick={() => handleEditUser(user.id, { role: user.role })}
                                                    title='Accept' />
                                                </div>

                                                <div className='actions'>
                                                    <FontAwesomeIcon 
                                                    icon={faTimesCircle}
                                                    onClick={() => handleRemoveUser(user.id)} />
                                                </div>
                                            </div>
                                        )}
                                </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RequestsList;