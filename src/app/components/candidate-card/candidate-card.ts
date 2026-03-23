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
  @Input() candidate!: Candidate;
  @Output() onVote = new EventEmitter<number>();

  voteClick() {
    this.onVote.emit(this.candidate.id);
  }
}