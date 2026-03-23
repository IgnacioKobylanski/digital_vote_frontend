import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voter-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voter-login.html',
  styleUrls: ['./voter-login.scss']
})
export class VoterLogin {

  @Output() login = new EventEmitter<string>();

  onLogin(dni: string): void {
    console.log("DNI directo:", dni);

    if (dni && dni.trim().length >= 8) {
      this.login.emit(dni);
    } else {
      console.warn("DNI inválido");
    }
  }
}