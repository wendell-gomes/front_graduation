import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
    ) { }
  
  getAllCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('https://efeito-eco.herokuapp.com/categorias');
  }

  getByIdCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`https://efeito-eco.herokuapp.com/categorias/${id}`);
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>("https://efeito-eco.herokuapp.com/categorias", categoria);
  }
}
