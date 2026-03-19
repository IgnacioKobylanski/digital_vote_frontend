import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidate } from '../models/candidate.model';
import { Vote } from '../models/vote.model';
import { ElectionResult } from '../models/election-result.model';

@Injectable({ providedIn: 'root' })
export class VoteService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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