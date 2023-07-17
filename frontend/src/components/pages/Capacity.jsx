import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import NavbarHome from './TopbarHome';
import './Capacity.css';


function Capacity () {
    const [capacity, setCapacity] = useState('')

    useEffect(() => {
        handleGetCapacity();
      }, []);

    
    const handleGetCapacity = async () => {
        try{
        const response = await axios.get('http://localhost:3001/getCapacity'
            );

        setCapacity(response.data)
        console.log("Capacity",response.data)
        } catch (error){
        console.log(error)
        }
    }



    return (
        <div className='capacity_container'>
          <Sidebar />
          <div className='capacity_content'>
            <NavbarHome />
            <div className='capacity'>
                <h2>Existe(m) {capacity} pessoa(s) no laboratório:</h2><h1>SINS-LAB</h1>
            </div>
          </div>
        </div>
    );
}



export default Capacity;