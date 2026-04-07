import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VoteService } from '../../services/vote';

@Component({
  selector: 'app-voter-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voter-login.html',
  styleUrls: ['./voter-login.scss']
})
export class VoterLogin {
  error: string = '';

  constructor(
    private voteService: VoteService,
    private router: Router
  ) {}

  onLogin(dni: string): void {
    if (!dni || dni.trim().length < 8) {
      this.error = 'DNI inválido. Debe tener al menos 8 caracteres.';
      return;
    }

    this.voteService.getVoterData(dni).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.message || 'Error al validar el DNI.';
      }
    });
  }
}