import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Students.css';
import Sidebar from './Sidebar';
import NavbarHome from './TopbarHome';
import jwt_decode from "jwt-decode";

const StudentsList = () => {

    const[students, setStudents] = useState([]);
    const[number, setNumber] = useState([]);
    const[username, setUsername] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        const decoded = jwt_decode(accessToken);
        setNumber(decoded.number);
        setUsername(decoded.name);
    }, []);
    
    
    useEffect(() => {
        axios.post('http://localhost:3001/students', { advisor: `${username} ${number}` }, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            setStudents(response.data.students);
            console.log("students", students);
        })
        .catch(error => {
            console.log(error);
        });
    }, [number]);
    





    return (
        <div className='students_container'>
            <Sidebar/>
            <div className='students_content'>
                <NavbarHome/>
                <div className='students'>
                    {students.length === 0 ? (
                        <div className='no_students'>
                            <p>De momento ainda não tem alunos a orientar</p>
                        </div>
                    ):(
                        <table>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.username}</td>
                                        <td>{student.number}</td>
                                        <td>{student.course}</td>
                                        <td>{student.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                    } 
                        
                </div>
            </div>
        </div>
    )
}

export default StudentsList;