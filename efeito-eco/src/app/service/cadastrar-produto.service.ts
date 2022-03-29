import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../models/CadastrarProduto';

@Injectable({
  providedIn: 'root'
})
export class CadastrarProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  } 

  postProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>('https://efeito-eco.herokuapp.com/produtos', produto, this.token);
  }

  putProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>('https://efeito-eco.herokuapp.com/produtos', produto, this.token);
  }
}
