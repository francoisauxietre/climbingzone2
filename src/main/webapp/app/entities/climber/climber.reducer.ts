import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IClimber, defaultValue } from 'app/shared/model/climber.model';

export const ACTION_TYPES = {
  FETCH_CLIMBER_LIST: 'climber/FETCH_CLIMBER_LIST',
  FETCH_CLIMBER: 'climber/FETCH_CLIMBER',
  CREATE_CLIMBER: 'climber/CREATE_CLIMBER',
  UPDATE_CLIMBER: 'climber/UPDATE_CLIMBER',
  DELETE_CLIMBER: 'climber/DELETE_CLIMBER',
  RESET: 'climber/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IClimber>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ClimberState = Readonly<typeof initialState>;

// Reducer

export default (state: ClimberState = initialState, action): ClimberState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CLIMBER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CLIMBER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CLIMBER):
    case REQUEST(ACTION_TYPES.UPDATE_CLIMBER):
    case REQUEST(ACTION_TYPES.DELETE_CLIMBER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CLIMBER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CLIMBER):
    case FAILURE(ACTION_TYPES.CREATE_CLIMBER):
    case FAILURE(ACTION_TYPES.UPDATE_CLIMBER):
    case FAILURE(ACTION_TYPES.DELETE_CLIMBER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIMBER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIMBER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CLIMBER):
    case SUCCESS(ACTION_TYPES.UPDATE_CLIMBER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CLIMBER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/climbers';

// Actions

export const getEntities: ICrudGetAllAction<IClimber> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CLIMBER_LIST,
    payload: axios.get<IClimber>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IClimber> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CLIMBER,
    payload: axios.get<IClimber>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IClimber> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CLIMBER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IClimber> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CLIMBER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IClimber> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CLIMBER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
