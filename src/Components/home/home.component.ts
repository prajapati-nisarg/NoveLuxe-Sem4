import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NovelFetcherService } from '../../Services/novel-fetcher.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  novelName: string = 'Test Novel';

  constructor(private router: Router, private novelFetcher: NovelFetcherService) { }

  // Method for direct navigation
  goToDisp(name: string) {
    this.novelName = String(name);
    console.log(this.novelName);
    this.novelFetcher.setNovelName(name);
    this.router.navigate(['/novel-disp']);
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
      return novels.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
    } else {
      console.error('Provided novels is not an array:', novels);
      return [];
    }
  }

}
