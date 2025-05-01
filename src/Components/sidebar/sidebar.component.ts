import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovelFetcherService } from '../../Services/novel-fetcher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  novelName: string = 'test string';
  
  constructor(private novelFetcher: NovelFetcherService) { }

  nameFetch: any = (name: string) => {
    this.novelName = String(name);
    this.novelFetcher.setNovelName(name);
    console.log('Novel Name Set:', this.novelName);
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

  sortByRating: any = function (novels: any[]) {
    if (Array.isArray(novels)) {
      return novels.sort((a, b) => b.rating - a.rating).slice(0,5);
    } else {
      console.error('Provided novels is not an array:', novels);
      return [];
    }
  };
}
