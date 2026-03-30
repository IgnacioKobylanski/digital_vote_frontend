import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteService } from '../../services/vote';
import { Voter } from '../../models/voter.model';
import { Candidate } from '../../models/candidate.model';
import { Vote } from '../../models/vote.model'; // Asegurate de importar el modelo Vote

@Component({
  selector: 'app-voter-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voter-dashboard.html',
  styleUrls: ['./voter-dashboard.scss']
})
export class VoterDashboard implements OnInit {
  @Input() voter!: Voter;
  
  candidates: Candidate[] = [];
  errorMsg: string = '';

  constructor(private voteService: VoteService) {}

  ngOnInit(): void {
    this.loadCandidates();
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

  // Este es el método que te faltaba
  onVote(candidate: Candidate): void {
    // Confirmación simple antes de mandar el voto
    const confirmacion = confirm(`¿Estás seguro de que querés votar a ${candidate.name}?`);
    
    if (confirmacion && this.voter) {
      const voteData: Vote = {
        candidateId: candidate.id,
        voterId: this.voter.id, // O el campo que use tu backend para identificar al votante
        votedAt: new Date()
      };

      this.voteService.submitVote(voteData).subscribe({
        next: () => {
          alert('¡Voto emitido con éxito!');
          // Acá podrías redirigir a una página de "Gracias" o bloquear la pantalla
        },
        error: (err) => {
          this.errorMsg = 'Hubo un error al procesar tu voto. Por favor, intentá de nuevo.';
        }
      });
    }
  }
}