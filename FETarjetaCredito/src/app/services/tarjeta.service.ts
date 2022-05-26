import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(private http:HttpClient) { }

  private myAppUrl:string = 'https://localhost:44372/';
  private myApiUrl:string = 'api/tarjetaCredito/'

  getListTarjetas():Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteTarjeta(id:number):Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveTarjeta(tarjeta:any):Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  updateTarjeta(id:number, tarjeta:any):Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }
}
