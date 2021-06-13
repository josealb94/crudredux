import Swal from 'sweetalert2';
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINAR_EXITO,
  PRODUCTO_ELIMINAR_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICIÓN_PRODUCTO,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR,
} from '../types';
import clienteAxios from '../config/axios';

// Crear nuevos productos
export const crearNuevoProducto = producto => {
  return async (dispatch) => {
    dispatch( agregarProductos() );
      try {
        // Insertar en la api
        await clienteAxios.post('/productos', producto);

        // Actualiza el state
        dispatch( agregarProductoExito(producto) );

        // Alert
        Swal.fire(
          'Correcto',
          'El producto se agregó correctamente',
          'success'
        );
      } catch (error) {
        console.log(error);
        // Cambio de state con errror
        dispatch( agregarProductoError(true) );

        // Alerta de error
        Swal.fire(
          'Error',
          'Error al almacenar el producto',
          'error'
        );
      }
  }
}

const agregarProductos = () => ({
  type: AGREGAR_PRODUCTO
});

const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});

// Funcion que descarga los productos de la base de datos
export const obtenerProductos = () => {
  return async(dispatch) => {
    dispatch( comenzarDescargaProductos() );
    try {
      const respuesta = await clienteAxios.get('/productos');
      dispatch( descargaProductosExitosa(respuesta.data) );
    } catch(error) {
      console.log(error);
      dispatch( descargaProductosError(true) );
    }
  }
}

const comenzarDescargaProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
})

const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
})

const descargaProductosError = estado => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: estado
})

// Selecciona y eliminar el producto
export const eliminarProducto = id => {
  return async(dispatch) => {
    try {
      dispatch( obtenerProductoEliminar(id) );
      await clienteAxios.delete(`/productos/${id}`);
      dispatch( productoEliminarExitoso() );
      Swal.fire(
        'Eliminado!',
        'El producto ha sido eliminado.',
        'success'
      )
    } catch(error) {
      console.log(error);
      dispatch( productoEliminarError(true) );
    }
  }
}

const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
})

const productoEliminarExitoso = () => ({
  type: PRODUCTO_ELIMINAR_EXITO
})

const productoEliminarError = estado => ({
  type: PRODUCTO_ELIMINAR_ERROR,
  payload: estado
})

// Color producto en edicion
export const obtenerProducto = producto => {
  return async(dispatch) => {
    try {
      dispatch( obtenerProductoEditar(producto) );
    } catch(error) {
      console.log(error);
      dispatch( productoEditarError(true) );
    }
  }
}

const obtenerProductoEditar = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
})

const productoEditarError = estado => ({
  type: PRODUCTO_EDITAR_ERROR,
  payload: estado
})

// Editar un registro
export const editarProducto = producto => {
  return async(dispatch) => {
    try {
      dispatch( _editarProducto() );

      clienteAxios.put(`/productos/${producto.id}`, producto);

      dispatch( _editarProductoExito(producto) );
    } catch(error) {
      console.log(error);
      dispatch( productoEditarError(true) );
    }
  }
}

const _editarProducto = () => ({
  type: COMENZAR_EDICIÓN_PRODUCTO
})

const _editarProductoExito = producto => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto,
})