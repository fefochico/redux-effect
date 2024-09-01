import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuarios.model';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit{
  public usuarios: Usuario[]=[];
  public loading: boolean=false;
  public error: any;
  constructor(private store: Store<AppState>,
    private router: Router
  ){}
  ngOnInit(): void {
    this.store.select('usuarios').subscribe(({users, loading, error})=>{
      this.usuarios=users;
      this.loading= loading;
      this.error= error;
    });
    this.store.dispatch(cargarUsuarios())
  }

  public irA(id: number){
    this.router.navigate([`/usuario/${id}`])
  }

}
