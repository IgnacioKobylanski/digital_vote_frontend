import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  @Input() voter!: Voter;
  @Input() candidates: Candidate[] = [];
  
  errorMsg: string = '';

  constructor(private voteService: VoteService) {}

  ngOnInit(): void {
    if (this.candidates.length === 0) {
      this.loadCandidates();
    }
  }

  loadCandidates(): void {
    this.voteService.getCandidates().subscribe({
      next: (data) => {
        this.candidates = data;
      },
      error: () => {
        this.errorMsg = 'No se pudo cargar la lista de candidatos. Reintentá más tarde.';
      }
    });
  }

  onVote(candidate: Candidate): void {
    const confirmacion = confirm(`¿Estás seguro de que querés votar a ${candidate.name}?`);
    
    if (confirmacion && this.voter) {
      const voteData: Vote = {
        candidateId: candidate.id,
        voterId: this.voter.id,
        votedAt: new Date()
      };

      this.voteService.submitVote(voteData).subscribe({
        next: () => {
          alert('¡Voto emitido con éxito!');
        },
        error: (err) => {
          this.errorMsg = 'Hubo un error al procesar tu voto. Por favor, intentá de nuevo.';
        }
      });
    }
  }
}