import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { UsuarioService } from "../../services/usuario.service";
import { of } from "rxjs";
import * as actions from "../actions/index";

@Injectable()
export class UsuariosEffect{
    constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService){}

    cargarUsuarios$= createEffect(
        () => this.actions$.pipe(
            ofType(actions.cargarUsuarios),//comprueba que es esta accion
            tap(data=> console.log('effect')),
            exhaustMap(() => {
                return this.usuarioService.getUsers().pipe(
                    tap(data=> console.log(data)),
                    map( users=> actions.cargarUsuariosSuccess({usuarios: users})),
                    catchError(err => {
                        console.log(err)
                        return of(actions.cargarUsuariosError({payload: err }))
                    })
                )
            })
        )
    )
}