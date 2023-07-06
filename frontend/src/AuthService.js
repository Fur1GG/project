import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ auth, setAuth }) => {
  const [statusChecked, setStatusChecked] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const token = localStorage.getItem('token');
      console.log("uiiiiiiiiiiiiiiiiiiiiiiiiii")

      if (token !== undefined) {
        try {
          // Realize aqui qualquer lógica adicional que você precise com o token

          // Defina o estado de autenticação
          setAuth(true);
        } catch (error) {
          console.error('Error checking user login status', error);
        } finally {
          setStatusChecked(true);
        }
      } else {
        setStatusChecked(false);
      }
    }

    checkStatus();
  }, [setAuth]);

  if (!statusChecked) {
    return <div>Loading...</div>;
  }

  return auth ? <Outlet auth={auth} /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
