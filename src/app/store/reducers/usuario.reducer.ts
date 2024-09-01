import { Action, createReducer, on } from "@ngrx/store";
import * as actions from "../actions/index";
import { Usuario } from "../../models/usuarios.model";

export interface UsuarioState{
    id: string | null,
    user: Usuario | null,
    loaded: boolean,
    loading: boolean,
    error: any
}

const usuariosInitialState: UsuarioState={
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
}

const _usuarioReducer = createReducer(
    usuariosInitialState,
    on(actions.cargarUsuario, (state,{id}) => {
        return ({ ...state, loading: true, id: id })}),
    on(actions.cargarUsuarioSuccess, (state, {usuario}) => {
        return ({ ...state, loading: false, loaded: true, user: {...usuario}, error: null })
    }),
    on(actions.cargarUsuarioError, (state, {payload}) => ({ ...state, id: null, loading: false, loaded: true, user: null, error: {url: payload.url, message: payload.message, name: payload.name} })),

);

export function UsuarioReducer(state: UsuarioState | undefined, action: Action) {
    return _usuarioReducer(state, action);
}

