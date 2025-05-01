import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { LoginVerifierService } from '../../Services/login-verifier.service';


@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, MatDialogModule, DatePipe],
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(private loginVerifier: LoginVerifierService) { }

  stats = [
    { label: 'Users', value: 1024 },
    { label: 'Novels', value: 256 },
    { label: 'Genres', value: 12 },
    { label: 'Reviews', value: 512 },
    { label: 'Ratings', value: 2048 }
  ];

  logout = () => {
    this.loginVerifier.setLoginStatus(false);
    alert("Logged out successfully!");
    window.location.href = '/home'; // Redirect to home page after logout
  }
  
  novels: any[] = [];

  fetchNovels: any = async () => {
    try {
      const response = await fetch('https://noveluxe-b64a4-default-rtdb.asia-southeast1.firebasedatabase.app/novels-details/-OOS0dpTwrtJ89xOU7Wx.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const dataArray = Array.isArray(data) ? data : Object.values(data);
      for (let x of dataArray) {
        console.log(x);
        this.novels.push(x);
      }
      console.log(this.novels);
    } catch (error) {
      console.error('Error fetching novels:', error);
    }
  };

  ngOnInit() {
    this.fetchNovels();
  }

  sortByDate : any = function(novels: any[]) {
    if (Array.isArray(novels)) {
      return novels.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    } else {
      console.error('Provided novels is not an array:', novels);
      return [];
    }
  }

}

