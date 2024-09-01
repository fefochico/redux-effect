import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuarios.model';

export const cargarUsuario = createAction(
    '[Usuario] Cargar Usuario',
    props<{id: string}>()
);

export const cargarUsuarioSuccess = createAction(
    '[Usuario] Cargar UsuariosSuccess',
    props<{usuario:Usuario}>()
);

export const cargarUsuarioError = createAction(
    '[Usuario] Cargar Usuario Error',
    props<{payload: any}>()
);
