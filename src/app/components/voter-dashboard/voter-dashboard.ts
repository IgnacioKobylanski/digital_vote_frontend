import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VoteService } from '../../services/vote';
import { Voter } from '../../models/voter.model';
import { Candidate } from '../../models/candidate.model';
import { Vote } from '../../models/vote.model';
import { CandidateCard } from '../candidate-card/candidate-card';

@Component({
  selector: 'app-voter-dashboard',
  standalone: true,
  imports: [CommonModule, CandidateCard],
  templateUrl: './voter-dashboard.html',
  styleUrls: ['./voter-dashboard.scss']
})
export class VoterDashboard implements OnInit {
  voter: Voter | null = null;
  candidates: Candidate[] = [];
  errorMsg: string = '';
  votedSuccessfully: boolean = false;

  constructor(
    private voteService: VoteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.voter = this.voteService.getCurrentVoter();

    if (!this.voter) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.voter.hasVoted) {
      this.votedSuccessfully = true;
    }

    this.loadCandidates();
  }

  loadCandidates(): void {
    this.voteService.getCandidates().subscribe({
      next: (data: any[]) => {
        this.candidates = data.map(c => ({
          ...c,
          party: c.party || {
            id: c.partyId,
            name: c.partyName || c.name_1 || 'Sin Partido',
            logoUrl: c.logoUrl || ''
          }
        }));
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'No se pudo cargar la lista de candidatos. Reintentá más tarde.';
      }
    });
  }

  onVote(candidate: Candidate): void {
    if (!this.voter || this.voter.id === undefined) {
      return;
    }

    if (this.voter.hasVoted || this.votedSuccessfully) {
      this.errorMsg = 'Ya has emitido tu voto.';
      return;
    }

    const confirmacion = confirm(`¿Estás seguro de que querés votar a ${candidate.name}?`);
    
    if (confirmacion) {
      const voteData: Vote = {
        candidateId: candidate.id,
        voterId: this.voter.id,
        votedAt: new Date()
      };

      this.voteService.submitVote(voteData).subscribe({
        next: () => {
          this.votedSuccessfully = true;
          if (this.voter) this.voter.hasVoted = true; 
          alert('¡Voto emitido con éxito!');
        },
        error: () => {
          this.errorMsg = 'Hubo un error al procesar tu voto. Por favor, intentá de nuevo.';
        }
      });
    }
  }
}