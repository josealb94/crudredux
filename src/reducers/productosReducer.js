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

const initialState = {
  productos: [],
  error: null,
  loading: false,
  productoSeleccionado: null
}

const reducer = ( state = initialState, action ) => {
  switch(action.type) {
    case AGREGAR_PRODUCTO:
    case COMENZAR_DESCARGA_PRODUCTOS:
    case COMENZAR_EDICIÓN_PRODUCTO:
      return {
        ...state,
        loading: true,
      }
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: [ ...state.productos, action.payload ],
      }
    case AGREGAR_PRODUCTO_ERROR:
    case DESCARGA_PRODUCTOS_ERROR:
    case PRODUCTO_ELIMINAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        productoSeleccionado: null,
      }
    case DESCARGA_PRODUCTOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: action.payload,
      }
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoSeleccionado: state.productos.find(producto => producto.id === action.payload),
        loading: true,
      }
    case PRODUCTO_ELIMINAR_EXITO:
      return {
        ...state,
        productos: state.productos.filter(producto => producto.id !== state.productoSeleccionado.id),
        productoSeleccionado: null,
      }
    case OBTENER_PRODUCTO_EDITAR:
      return {
        ...state,
        productoSeleccionado: action.payload,
      }
    case PRODUCTO_EDITAR_EXITO:
      return {
        ...state,
        loading: false,
        productoSeleccionado: null,
        productos: state.productos.map(producto =>
          producto.id === action.payload.id ? producto = action.payload : producto
        ),
      }
    case PRODUCTO_EDITAR_ERROR:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default reducer;