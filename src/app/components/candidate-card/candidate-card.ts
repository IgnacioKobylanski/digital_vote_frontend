import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidate } from '../../models/candidate.model';

@Component({
  selector: 'app-candidate-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-card.html',
  styleUrls: ['./candidate-card.scss']
})
export class CandidateCard {
  @Input({ required: true }) candidate!: Candidate;
  @Input() isVoted: boolean = false; // Agregamos esto para saber si bloquear el botón
  
  @Output() candidateSelected = new EventEmitter<Candidate>();
  
  onVoteClick(): void {
    if (!this.isVoted) {
      this.candidateSelected.emit(this.candidate);
    }
  }
}