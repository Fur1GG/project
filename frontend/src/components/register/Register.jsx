import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../landing_page/Navbar';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


    //função que vai chamar a rota /login
    const handleLoginClick = () => {
      navigate('/login');
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    //requisição para o backend para registrar o utilizador
    axios.post('http://localhost:3001/register', { name, email, password } , {headers:{
        'Content-Type': 'application/json'
    }
    })

    .then((response) => {
      if (response.data == "Já existe um utilizador com esse Email") {
        alert(response.data)
      } else {
        handleLoginClick(); // redireciona o utilizador para a página de login após o registo
      }
      console.log(response.data);
      
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <>
      <Navbar/>
    <div className='back_res'>
    <div className='register_form'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <button className='submit_register' type="submit">Register</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default Register;