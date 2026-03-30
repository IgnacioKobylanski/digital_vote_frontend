import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Candidate } from '../models/candidate.model';
import { Vote } from '../models/vote.model';
import { Voter } from '../models/voter.model';
import { Party } from '../models/party.model'; // Asegurate de tener este modelo
import { ElectionResult } from '../models/election-result.model';

@Injectable({ providedIn: 'root' })
export class VoteService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // --- Módulo de Padrón / Votante ---
  getVoterData(dni: string): Observable<Voter> {
    return this.http.get<Voter>(`${this.baseUrl}/voters/dni/${dni}`).pipe(
      map(voter => {
        if (voter.hasVoted) {
          throw 'Este DNI ya figura con un voto emitido.';
        }
        return voter;
      }),
      catchError(err => {
        const errorMsg = err.status === 404 
          ? 'El DNI ingresado no existe en el padrón.' 
          : (typeof err === 'string' ? err : 'Error de conexión con el servidor.');
        
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  // --- Módulo de Candidatos ---
  // Ahora trae el objeto Party anidado gracias al Include del Backend
  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/candidates`);
  }

  // --- Módulo de Partidos (Agregado para normalización) ---
  getParties(): Observable<Party[]> {
    return this.http.get<Party[]>(`${this.baseUrl}/parties`);
  }

  // --- Módulo de Votación ---
  submitVote(voteData: Vote): Observable<any> {
    // voteData debe contener candidateId y voterId (o DNI según tu backend)
    return this.http.post<any>(`${this.baseUrl}/votes`, voteData);
  }

  // --- Módulo de Resultados ---
  getResults(): Observable<ElectionResult[]> {
    return this.http.get<ElectionResult[]>(`${this.baseUrl}/candidates/results`);
  }
}