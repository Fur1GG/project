import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import NavbarHome from './TopbarHome';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker, StaticTimePicker } from '@mui/x-date-pickers';
import { TextField, Button } from '@mui/material';
import './Schedules.css';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);
dayjs.locale('pt');

function HorarioForm() {
  const [dataHora, setDataHora] = useState(null);
  const [horaSaida, setHoraSaida] = useState(null);
  const accessToken = localStorage.getItem('token');
  const decoded = jwt_decode(accessToken);
  const [showCalendar, setShowCalendar] = useState(false)
  const [myschedules, setMyschedules] = useState([])
  const [showMySchedule, setShowMySchedule] = useState(true)

  useEffect(() => {
    handleGetschedule();
  }, []);

  const handleShowCalendar = () => {
    setShowCalendar(true)
    setShowMySchedule(false)
  }

  const handleHideCalendar = () => {
    setShowCalendar(false)
    setShowMySchedule(true)
  }




  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedDataHora = dayjs(dataHora).format('YYYY-MM-DD HH:mm:ss');
    const formattedHoraSaida = dayjs(horaSaida).format('YYYY-MM-DD HH:mm:ss');

    const requestData = {
        userid: decoded.Id,
        entrydatetime: formattedDataHora,
        exitdatetime: formattedHoraSaida,
    };

    try {
        const response = await axios.post('http://localhost:3001/setSchedules', requestData, {
            headers: { 'Content-Type': 'application/json' }
        });

        alert(response.data)
        setDataHora(null)
        setHoraSaida(null)
        
    } catch (error) {
        console.log(error);
      }
  };


  const handleGetschedule = async () => {
    setShowMySchedule(true)
    setShowCalendar(false)
    let data = {userid: String(decoded.Id)}
    console.log("testar userid",decoded.Id)

    try{
      const response = await axios.post('http://localhost:3001/getmyschedule', data,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
      setMyschedules(response.data.schedules);
      console.log("My schedulesss",response.data.schedules)
    } catch (error){
      console.log(error)
    }
  }


  

  return (
    <div className='schedules_container'>
      <Sidebar />
      <div className='schedules_content'>
        <NavbarHome />
        <div className='schedules'>
            <div className='inventory_btns'>
                {showCalendar === false && (
                <button onClick={handleShowCalendar}>Marcar horário</button>  
                )}
                
                {showMySchedule === false && (
                <button onClick={handleGetschedule}>Ver meu horário</button>
                )}

            </div>


            {showMySchedule === true && (
                <div>
                    <h1>Meu horário</h1>
                    <table className='schedule_table'>
                        <thead>
                            <tr>
                                <th>Dia</th>
                                <th>Hora de entrada</th>
                                <th>Hora de saida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myschedules.map((myschedule) => (
                                <tr key={myschedule.Id}>
                                    <td>{dayjs(myschedule.entrydatetime).format('DD-MM-YYYY')}</td>
                                    <td>{dayjs(myschedule.entrydatetime).format('HH:mm:ss')}</td>
                                    <td>{dayjs(myschedule.exitdatetime).format('HH:mm:ss')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

           {showCalendar === true && (          
            <form className="schedule-form-container" onSubmit={handleSubmit}>
                <h1>Marcar horário</h1>
                <div className="schedule-form-group">
                <label className="schedule-label" htmlFor="data-hora">Data e Hora de entrada:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDateTimePicker
                    className="schedule-input"
                    id="data-hora"
                    value={dataHora}
                    onChange={(newValue) => setDataHora(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    orientation="landscape"
                    />
                </LocalizationProvider>
                </div>
                {dataHora && (
                <div className="schedule-form-group">
                    <label className="schedule-label" htmlFor="hora-saida">Hora de Saída:</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticTimePicker
                        orientation="landscape"
                        value={horaSaida}
                        onChange={(newValue) => setHoraSaida(dayjs(newValue).set('day', dayjs(dataHora).get('day')))}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </LocalizationProvider>
                </div>
                )}
                <div className='schedule_btns'>
                    <button className="schedule-button" type="submit">Enviar</button>
                    <button className="schedule-button" onClick={handleHideCalendar}>Cancelar</button>
                </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default HorarioForm;
