import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voter-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voter-login.html',
  styleUrls: ['./voter-login.scss']
})
export class VoterLogin {
  @Input() error: string = ''; 
  
  @Output() login = new EventEmitter<string>();

  onLogin(dni: string): void {
    if (dni && dni.trim().length >= 8) {
      this.login.emit(dni);
    } else {
      console.warn("DNI inválido");
    }
  }
}