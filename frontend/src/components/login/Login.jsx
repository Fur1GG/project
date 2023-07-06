import { useState } from "react";
import axios from 'axios';
import './Login.css';
import Navbar from "../landing_page/Navbar";
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";


function Login(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    const [role, setRole] = useState('')
    const token = localStorage.getItem('token');
   
    


    const handleLogin = async (e) => {
        e.preventDefault();
        

        

        
            try{
                
                const response = await axios.post('http://localhost:3001/login',
                    JSON.stringify({email, password}),
                    {
                        headers:{'Content-Type': 'application/json'}
                    }
                ).then(function(response) {

                    //Caso o response for pass errada ou o utilizador nao existe, manda um alert
                    if(response.data == "Pass errada" || response.data == "Utilizador nao existe!"){
                        alert("Email ou password inválidos")
                    }else {
                        //caso a resposta por parte do servidor nao sejam as definidas em cima, entao o login é aceite
                        localStorage.setItem('token', response.data.accessToken);
                        //ir para a pagina home
                        navigate('/home')
                        console.log('token',token)
                        

                    }
                })
                
                console.log(response.data);
                setUser(response.data);

                
            }catch(error){
                
                if(!error?.response){
                    setError('Erro ao conectar com o servidor');
                    console.log('Erro ao conectar com o servidor')
                    console.log(email, password)
                } else if(error.response.status == 401){
                setError('Utilizador ou senha inválidos')
                console.log('invalidas') 
                }
            }
    



    
    };

    
    const handleNavigate = () => {
        const decoded = jwt_decode(token);
       
        setRole(decoded.role)
        console.log(role)
        
        if (role == 'admin') {
            navigate('/home')
        }else {
            alert("A sua conta ainda se encontra em processo de verificação")
        }

    }


    return (
        <>
        <Navbar/>
        <div className="back_log">
      <div className="login-form-wrap">
        <div>       
      <h2>Login</h2>
      <form className='login-form'>
        <input type="email" name="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)}/> 
        <input type="password" 
            name="password" 
            placeholder='Password' 
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        <button type="submit" 
        className='btn-login'
        onClick={(e) => handleLogin(e)}>Login</button>
      </form>
      <p>{error}</p>
      </div>     
  
    </div>
    </div>
    </>
    );
}

  export default Login;