import { Component, OnInit } from '@angular/core';
import { VoteService } from './services/vote'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  candidatos: any[] = [];

  constructor(private voteService: VoteService) {}

  ngOnInit() {
    this.voteService.getCandidatos().subscribe({
      next: (data) => {
        this.candidatos = data;
        console.log('Candidatos recibidos:', data);
      },
      error: (err) => console.error('Error al conectar con la API', err)
    });
  }
}