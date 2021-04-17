import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  //traer el listado al refrescar
  invocarTraerContenido = new EventEmitter;
  invocarTraerContenidoSubscription: Subscription;

  public GetProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}productos/GetProductos/`);
  }
  public PostProductos(datos){
    return this.http.post(`${environment.apiUrl}productos/PostProductos/`, datos)
  }
  public PutProductos(id,datos){
    return this.http.put(`${environment.apiUrl}productos/PutProductos/${id}`, datos)
  }
  public DeleteProductos(idProducto){
    return this.http.delete(`${environment.apiUrl}productos/DeleteProductos/${idProducto}`)
  }
  //Invocar Metodo 
  public invocarMetodoTraerContenido() {
    this.invocarTraerContenido.emit();
  }
}
