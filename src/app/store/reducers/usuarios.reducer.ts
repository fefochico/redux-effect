import { Action, createReducer, on } from "@ngrx/store";
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from "../actions/usuarios.actions";
import { Usuario } from "../../models/usuarios.model";

export interface UsuariosState{
    users: Usuario[],
    loaded: boolean,
    loading: boolean,
    error: any
}

const usuariosInitialState: UsuariosState={
    users: [],
    loaded: false,
    loading: false,
    error: null
}

const _usuariosReducer = createReducer(
    usuariosInitialState,
    on(cargarUsuarios, state => {
        return ({ ...state, loading: true })}),
    on(cargarUsuariosSuccess, (state, {usuarios}) => {
        return ({ ...state, loading: false, loaded: true, users: [...usuarios], error: null })
    }),
    on(cargarUsuariosError, (state, {payload}) => ({ ...state, loading: false, loaded: true, users: [], error: {url: payload.url, message: payload.message, name: payload.name} })),

);

export function UsuariosReducer(state: UsuariosState | undefined, action: Action) {
    return _usuariosReducer(state, action);
}

