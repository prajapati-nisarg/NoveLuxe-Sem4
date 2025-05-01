import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginVerifierService } from '../../Services/login-verifier.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  // Mock admin credentials - in a real app these would be validated against a backend
  private adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  constructor(private router: Router, private loginVerifier: LoginVerifierService) { }

  login() {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;

    // Simulate API call with timeout
    setTimeout(() => {
      // Validate credentials (in a real app, this would be done by your backend)
      if (this.username === this.adminCredentials.username &&
        this.password === this.adminCredentials.password) {

        this.loginVerifier.setLoginStatus(true);
        alert("Logged in successfully!");
        
        // Navigate to admin dashboard
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }

      this.isLoading = false;
    }, 800);
  }
}
