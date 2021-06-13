import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  editarProducto
} from '../actions/productosActions';

const EditarProducto = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  // State del componente
  const [ producto, setProducto ] = useState({
    nombre: '',
    precio: 0
  });

  // Obtener state global
  const productoSeleccionado = useSelector(state => state.productos.productoSeleccionado);

  // Llenar state automaticamente
  useEffect(() => {
    setProducto( productoSeleccionado );
  }, [productoSeleccionado]);

  // Leer datos del formulario
  const handleChange = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  if (!producto) return null;
  const { nombre, precio } = producto;

  console.log(productoSeleccionado);

  const handleSubmit = e => {
    e.preventDefault();

    // Validar campos

    // Ejecutar edicion
    dispatch( editarProducto(producto) );

    history.push('/');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
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
                  value={nombre}
                  onChange={ handleChange }
                />
              </div>
              <div className="form-group">
                <label>Precio Producto:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={ handleChange }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >Guardar Cambios</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarProducto;