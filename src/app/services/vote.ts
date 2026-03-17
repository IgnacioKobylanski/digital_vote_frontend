import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCandidatos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/candidatos`);
  }

  enviarVoto(idCandidato: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/votar`, { id: idCandidato });
  }
}