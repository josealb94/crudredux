import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
import {
  crearNuevoProducto
} from '../actions/productosActions';
import {
  mostrarAlerta,
  ocultarAlerta,
} from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

  // Uso de useDispatch y genera una función
  const dispatch = useDispatch();

  // Acceder al state del store
  const cargando = useSelector( state => state.productos.loading );
  const error = useSelector( state => state.productos.error );
  const alerta = useSelector( state => state.alertas.alerta );

  // Manda a llamar el action de productoAction
  const agregarProducto = producto => dispatch( crearNuevoProducto(producto) );

  // State de componente
  const [ producto, setProducto ] = useState({
    nombre: '',
    precio: 0
  });

  const { nombre, precio } = producto;

  const handleChange = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    // Validar formulario
    if (nombre.trim() === '' || precio <= 0) {
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch( mostrarAlerta(alerta) );
      return;
    }

    // Si no hay errores
      dispatch( ocultarAlerta() );

    // Crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    });

    // Redireccionar al home
    history.push('/');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            { alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

            <form
              onSubmit={ handleSubmit }
            >
              <div className="form-group">
                <label>Nombre Producto:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  onChange={ handleChange }
                  value={ nombre }
                />
              </div>
              <div className="form-group">
                <label>Precio Producto:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  onChange={ handleChange }
                  value={ precio }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >Agregar</button>
            </form>
            { cargando ? <p>Cargando...</p> : null}
            { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoProducto;