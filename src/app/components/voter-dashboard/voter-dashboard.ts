import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VoteService } from '../../services/vote';
import { Voter } from '../../models/voter.model';
import { Candidate } from '../../models/candidate.model';
import { CandidateCard } from '../candidate-card/candidate-card';
import { VoteRequest } from '../../models/vote-request.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-voter-dashboard',
  standalone: true,
  imports: [CommonModule, CandidateCard, MatDialogModule],
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
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
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
  if (!this.voter || !this.voter.dni || this.votedSuccessfully) return;

  // Abrimos el diálogo pasándole la data (los PROPS)
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Confirmar Votación',
      candidateName: candidate.name,
      party: candidate.party?.name || 'Sin Partido'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    // result es lo que devuelve el botón [mat-dialog-close]="true"
    if (result) {
      const voteRequest: VoteRequest = {
        dni: this.voter!.dni,
        candidateId: Number(candidate.id)
      };

      this.voteService.submitVote(voteRequest).subscribe({
        next: (res) => {
          this.votedSuccessfully = true;
          if (this.voter) this.voter.hasVoted = true;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMsg = err.message || 'Error al registrar el voto';
        }
      });
    }
  });
}
}