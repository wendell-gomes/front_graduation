import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../models/UsuarioLogin';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { AtualizarUsuario } from '../models/AtualizarUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  } 

  logar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> { 
    return this.http.post<UsuarioLogin>('https://efeito-eco.herokuapp.com/usuarios/logar', usuarioLogin);
  }   

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://efeito-eco.herokuapp.com/usuarios/cadastrar', usuario);
  }

  getByIdUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`https://efeito-eco.herokuapp.com/usuarios/${id}`);
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>('https://efeito-eco.herokuapp.com/usuarios', usuario, this.token);
  }

  atualizarUsuario(id: number, usuario: AtualizarUsuario): Observable<Usuario> {
    return this.http.put<Usuario>(`https://efeito-eco.herokuapp.com/usuarios/${id}`, usuario, this.token);
  }

  adicionarProdutosComprados(idDoUsuario: number, idDosProdutosComprados: number[]): Observable<Usuario> {
    return this.http.put<Usuario>(`https://efeito-eco.herokuapp.com/usuarios/${idDoUsuario}/compras`, idDosProdutosComprados, this.token);
  }
  
  deleteUsuario(id: number) {
    return this.http.delete(`https://efeito-eco.herokuapp.com/usuarios/${id}`, this.token);
  }

  logado() {
    let ok: boolean = false;
    if(environment.token != '') {
      ok = true;
    }
    return ok;
  }

}
