import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoServiceService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  } 
  
  getAllProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>('https://efeito-eco.herokuapp.com/produtos');
  }

  getByIdProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`https://efeito-eco.herokuapp.com/produtos/${id}`);
  }

  getByNomeProduto(nome: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`https://efeito-eco.herokuapp.com/produtos/nome/${nome}`);
  }

  deleteProduto(id: number) {
    return this.http.delete(`https://efeito-eco.herokuapp.com/produtos/${id}`, this.token);
  }
}
