import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteService } from '../../services/vote';
import { Voter } from '../../models/voter.model';
import { Candidate } from '../../models/candidate.model';

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
}