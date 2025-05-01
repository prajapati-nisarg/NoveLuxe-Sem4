import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginVerifierService {
  private isLoggedIn: boolean = false; // Default value is false

  constructor() { }

  // Function to set the login status
  setLoginStatus(status: boolean) {
    this.isLoggedIn = status;
  }

  // Function to get the login status
  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }
}
