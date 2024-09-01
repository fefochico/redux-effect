import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { cargarUsuario } from '../../store/actions';
import { Usuario } from '../../models/usuarios.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit{
  public usuario: Usuario|null= null;
  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.router.params.subscribe(({id}) =>{
      this.store.dispatch(cargarUsuario({ id }))
    });
    this.store.select('usuario').subscribe(({user, loading, error})=>{
      this.usuario= user
    })
  }

  


}
