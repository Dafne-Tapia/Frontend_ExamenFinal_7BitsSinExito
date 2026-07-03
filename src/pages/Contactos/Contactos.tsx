import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getContactos, createContacto, updateContacto, deleteContacto } from '../../services/contactosService.ts';
import './Contactos.css';

function Contactos() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    tipo: '',
    descripcion: '',
    valor: ''
  });

  const cargarContactos = async () => {
    try {
      const data = await getContactos();
      setContactos(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await updateContacto(editandoId, { ...formData, orden: 0 });
      } else {
        await createContacto({ ...formData, orden: 0 });
      }
      cargarContactos();
      setMostrarForm(false);
      setEditandoId(null);
      setFormData({ tipo: '', descripcion: '', valor: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este contacto?')) {
      try {
        await deleteContacto(id);
        cargarContactos();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (cargando) {
    return <div className="cargando">Cargando contactos...</div>;
  }

  const grupos = {};
  contactos.forEach(c => {
    if (!grupos[c.tipo]) grupos[c.tipo] = [];
    grupos[c.tipo].push(c);
  });

  return (
    <>
      <Navbar />
      <div className="contactos-page">
        <div className="contactos-header">
          <div>
            <h1>📞 Contactos</h1>
            <p className="subtitulo">Canales de atención de AAPOS Potosí</p>
          </div>
          <button className="btn-agregar" onClick={() => setMostrarForm(true)}>
            + Nuevo Contacto
          </button>
        </div>

        {mostrarForm && (
          <form className="formulario-contacto" onSubmit={handleSubmit}>
            <h3>{editandoId ? '✏️ Editar Contacto' : '📝 Nuevo Contacto'}</h3>
            <div className="form-grid">
              <input
                name="tipo"
                placeholder="Tipo (EMERGENCIA, OFICINA...)"
                value={formData.tipo}
                onChange={handleInputChange}
                required
              />
              <input
                name="descripcion"
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={handleInputChange}
                required
              />
              <input
                name="valor"
                placeholder="Valor (teléfono, dirección...)"
                value={formData.valor}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-botones">
              <button type="submit" className="btn-guardar">
                {editandoId ? 'Actualizar' : 'Guardar'}
              </button>
              <button
                type="button"
                className="btn-cancelar"
                onClick={() => {
                  setMostrarForm(false);
                  setEditandoId(null);
                  setFormData({ tipo: '', descripcion: '', valor: '' });
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="contactos-grid">
          {Object.keys(grupos).map(tipo => (
            <div key={tipo} className="grupo-contacto">
              <h2 className="tipo-contacto">{tipo}</h2>
              {grupos[tipo].map(c => (
                <div key={c.id} className="item-contacto">
                  <div className="info-contacto">
                    <span className="descripcion">{c.descripcion}</span>
                    <span className="valor">{c.valor}</span>
                  </div>
                  <div className="acciones">
                    <button
                      className="btn-editar"
                      onClick={() => {
                        setEditandoId(c.id);
                        setFormData({
                          tipo: c.tipo,
                          descripcion: c.descripcion,
                          valor: c.valor
                        });
                        setMostrarForm(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleDelete(c.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contactos;