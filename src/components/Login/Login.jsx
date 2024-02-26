import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRedirect = () => {
    // Redirigir al usuario a la página de inicio después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la solicitud al backend
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta del servidor
        console.log('Respuesta del servidor:', data);

        // Verificar si la autenticación fue exitosa
        if (data.status === 'Successful authentication') {
          // Almacenar el token en el estado o en localStorage para su uso posterior
          const token = data.token;
          // Puedes almacenar el token en el estado o en localStorage según tus necesidades
          console.log('Token recibido:', token);
          localStorage.setItem('authToken', token);

          // Configurar el mensaje de éxito
          setMessage('Inicio de sesión exitoso. ¡Bienvenido!');

          // Redirigir al usuario a la página de inicio después de un breve retraso
          handleRedirect();
        } else {
          // Manejar la autenticación fallida, mostrar un mensaje de error, etc.
          console.error('Error de autenticación:', data.error);

          // Configurar el mensaje de error
          setMessage('Error de autenticación. Por favor, verifica tus credenciales.');
        }
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className='iniciar'>Iniciar Sesión</h2>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Iniciar Sesión</button>

        {/* Mostrar el mensaje */}
        <p className={message.includes('exitoso') ? 'success-message' : 'error-message'}>{message}</p>
      </form>
    </div>
  );
};

export default Login;
