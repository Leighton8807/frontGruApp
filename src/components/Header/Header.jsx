import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  // Esta función podría obtener el estado de autenticación desde tu backend al cargar la página
  const verificarAutenticacion = () => {
    // Simulación: podrías hacer una llamada al backend para verificar si el usuario está autenticado
    const autenticado = localStorage.getItem('authToken') !== null;
    setUsuarioAutenticado(autenticado);
  };

  useEffect(() => {
    verificarAutenticacion();
  }, []);

  const handleLogout = () =>{

      // elimina el token
    localStorage.removeItem('authToken');
      // Actualizamos el estado para reflejar que el usuario ya no está autenticado
    setUsuarioAutenticado(false);

  }

  document.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  return (
    <header className='header'>
      <div className="logo">
        <a href="/">
          <h1>Gruapp
            <hr className='hr1'/>
          </h1>        
        </a>
      </div>
      <nav className='navbar'>
        <ul>
          <li>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/gruas">Gruas</NavLink>
                 {/* Mostrar el enlace de Log Out solo si el usuario está autenticado */}
                 {usuarioAutenticado && (
              <NavLink to="/" onClick={handleLogout}>Log out</NavLink>
            )}
            {/* Mostrar el enlace de inicio de sesión solo si el usuario no está autenticado */}
            {!usuarioAutenticado && (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
