import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
} from '../types/index';

// Muestra la alerta
export const mostrarAlerta = alerta => {
  return dispatch => {
    dispatch( _mostrarAlerta(alerta) );
  }
}

const _mostrarAlerta = alerta => ({
  type: MOSTRAR_ALERTA,
  payload: alerta
})

// Oculta la alerta
export const ocultarAlerta = () => {
  return dispatch => {
    dispatch( _ocultarAlerta() );
  }
}

const _ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
})