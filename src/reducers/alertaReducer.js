import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
} from '../types';

const initialState = {
  alerta: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        alerta: action.payload
      }
    case OCULTAR_ALERTA:
      return {
        ...state,
        alert: null
      }
    default:
      return state;
  }
}

export default reducer;