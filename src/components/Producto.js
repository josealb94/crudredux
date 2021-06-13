import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import {
  eliminarProducto,
  obtenerProducto,
} from '../actions/productosActions';

const Producto = ({producto}) => {
  const { id, nombre, precio } = producto;

  const dispatch = useDispatch();
  const borrarProducto = id => dispatch( eliminarProducto(id) );

  // Habilitar history para redireccion
  const history = useHistory();

  const confirmarEliminarProducto = () => {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Esta seguro de eliminar el producto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        borrarProducto(id);
      }
    });
  }

  // Funcion que redirige de forma programada
  const redireccionarEdicion = producto => {
    dispatch( obtenerProducto(producto) );
    history.push(`/productos/editar/${producto.id}`);
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td><span className="font-weight-bold">$ {precio}</span></td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={ () => redireccionarEdicion(producto) }
        >Editar</button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={ confirmarEliminarProducto }
        >Eliminar</button>
      </td>
    </tr>
  );
}

export default Producto;