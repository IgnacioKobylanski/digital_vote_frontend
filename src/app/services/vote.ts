import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Candidate } from '../models/candidate.model';
import { Vote } from '../models/vote.model';
import { Voter } from '../models/voter.model';
import { ElectionResult } from '../models/election-result.model';

@Injectable({ providedIn: 'root' })
export class VoteService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/candidates`);
  }

  submitVote(voteData: Vote): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/votes`, voteData);
  }

  getResults(): Observable<ElectionResult[]> {
    return this.http.get<ElectionResult[]>(`${this.baseUrl}/candidates/results`);
  }
}