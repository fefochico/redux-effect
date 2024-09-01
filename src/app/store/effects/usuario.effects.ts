import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { UsuarioService } from "../../services/usuario.service";
import { of } from "rxjs";
import * as actions from "../actions/index";

@Injectable()
export class UsuarioEffect{
    constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService){}

    cargarUsuario$= createEffect(
        () => this.actions$.pipe(
            ofType(actions.cargarUsuario),//comprueba que es esta accion
            tap(data=> console.log('effect')),
            exhaustMap((action) => {
                return this.usuarioService.getUser(action.id).pipe(
                    tap(data=> console.log(data)),
                    map( user=> actions.cargarUsuarioSuccess({usuario: user})),
                    catchError(err => {
                        console.log(err)
                        return of(actions.cargarUsuarioError({payload: err }))
                    })
                )
            })
        )
    )
}