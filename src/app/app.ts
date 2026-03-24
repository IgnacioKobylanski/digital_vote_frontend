import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteService } from './services/vote';
import { Voter } from './models/voter.model';
import { Candidate } from './models/candidate.model';

import { VoterLogin } from './components/voter-login/voter-login';
import { CandidateCard } from './components/candidate-card/candidate-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VoterLogin, CandidateCard],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  currentVoter: Voter | null = null;
  candidates: Candidate[] = [];
  errorMsg: string = '';

  constructor(
    private voteService: VoteService,
    private cdr: ChangeDetectorRef
  ) {}

  handleLogin(dni: string): void {
    this.errorMsg = ''; 

    this.voteService.getVoterData(dni).subscribe({
      next: (voter) => {
        this.currentVoter = voter;
        this.errorMsg = '';
        this.loadCandidates();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err.error?.message || err.message || 'Error de conexión con el servidor';
        this.currentVoter = null;
        this.cdr.detectChanges();
      }
    });
  }

  loadCandidates(): void {
    console.log('Buscando candidatos para:', this.currentVoter?.fullName);
  }
}