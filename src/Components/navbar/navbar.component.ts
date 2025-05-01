import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginVerifierService } from '../../Services/login-verifier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private loginVerifier: LoginVerifierService) { }

  isLoggedIn(): boolean {
    return this.loginVerifier.getLoginStatus();
  }
}
