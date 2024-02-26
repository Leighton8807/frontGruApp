// Contacto.jsx

import React, { useState } from 'react';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de envío del formulario
    console.log('Formulario enviado:', formData);
    // También puedes realizar una solicitud de envío a un servidor
    // utilizando fetch, axios, u otra librería para peticiones HTTP.
  };

  return (
    <div className="contact-container">
      <h2 className='tituloContacto'>Contactanos</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Mensaje:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button className='buttoncontac' type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default Contacto;
