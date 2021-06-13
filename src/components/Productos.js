import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Producto from './Producto';

// Actions de Redux
import {
  obtenerProductos
} from '../actions/productosActions';

const Productos = () => {

  const dispatch = useDispatch();
  const productos = useSelector(state => state.productos.productos)
  const cargando = useSelector(state => state.productos.loading)
  const error = useSelector(state => state.productos.error)
  // Consultar API
  const cargarProductos = () => dispatch( obtenerProductos() );

  useEffect(() => {
    cargarProductos();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>

      { error ? <p className="alert alert-danger p2 mt-4 text-center font-weight-bold">Hubo un error</p> : null}
      { cargando ? <p className="text-center">Cargando...</p> : null}

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          { productos.length === 0 ? 'No hay productos' : (
            productos.map(producto => (
              <Producto
                key={producto.id}
                producto={producto}
              />
            ))
          )}
        </tbody>
      </table>

    </Fragment>
  );
}

export default Productos;