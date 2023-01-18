import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Liste } from '../model/liste';
import { Tache } from '../model/tache';

@Injectable({
  providedIn: 'root'
})
export class ListesService {
  private url:string = 'http://localhost:3000/listes/';
  constructor(private http: HttpClient) { }

  getListes():Observable<Array<Liste>> {
    return this.http.get<Array<Liste>>(this.url, {withCredentials:true});
  }

  ajoutListes(liste:Liste):Observable<Liste> {
    return this.http.post<Liste>(this.url, liste, {withCredentials:true});
  }

  removeListes(liste:Liste):Observable<Liste> {
    return this.http.delete<Liste>(this.url+liste._id, {withCredentials:true});
  }
}
