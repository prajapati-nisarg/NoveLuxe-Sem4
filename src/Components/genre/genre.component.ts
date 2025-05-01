import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NovelFetcherService } from '../../Services/novel-fetcher.service';


@Component({
  selector: 'app-genre',
  standalone: true,
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
  imports: [CommonModule, FormsModule, MatSelectModule, MatFormFieldModule, RouterModule]
})
export class GenreComponent {

  constructor(private router: Router, private novelFetcher: NovelFetcherService) { }

  novelName: string = 'Test Novel';
  // Method for direct navigation
  goToDisp(name: string) {
    this.novelName = String(name);
    console.log(this.novelName);
    this.novelFetcher.setNovelName(name);
    this.router.navigate(['/novel-disp']);
  }

  genres: string[] = [
    'All',
    'Action',
    'Comedy',
    'Cultivation',
    'Martial Arts',
    'Romance',
    'Fantasy',
    'System',
    'Tragedy',
    'Magic',
    'Revenge',
    'Reincarnation',
    'Isekai'
  ];

  selectedGenre: string = 'All';
  // Default selected genre
  onGenreChange(event: any) {
    this.selectedGenre = event.value;
    console.log(this.selectedGenre);
    this.novels = [];
    console.log("Array Cleared")// Clear the novels array before fetching new data
    this.fetchNovels(this.selectedGenre); // Fetch novels based on the selected genre
  }
  novels: any[] = [];

  fetchNovels: any = async (genre: string) => {
    try {
      const response = await fetch('https://noveluxe-b64a4-default-rtdb.asia-southeast1.firebasedatabase.app/novels-details/-OOS0dpTwrtJ89xOU7Wx.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const dataArray = Array.isArray(data) ? data : Object.values(data);
      for (let x of dataArray) {
        console.log(x.genre);
        if (x.genre.includes(genre) && genre != 'All') {
          console.log("if");
          console.log(x);
          this.novels.push(x);
        } else if (genre == 'All') {
          console.log(x);
          console.log("else");
          this.novels.push(x);
        } else {
          console.log("Novel not found");
        }
      }
      console.log(this.novels);
    } catch (error) {
      console.error('Error fetching novels:', error);
    }
  };

  ngOnInit() {
    console.log(this.selectedGenre);
    this.fetchNovels(this.selectedGenre);
  }

}