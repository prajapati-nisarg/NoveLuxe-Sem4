import { Component, OnInit, OnDestroy } from '@angular/core';
import { NovelFetcherService } from '../../Services/novel-fetcher.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-novel-disp',
  imports: [CommonModule, FormsModule, HttpClientModule],
  standalone: true,
  templateUrl: './novel-disp.component.html',
  styleUrls: ['./novel-disp.component.css']
})
export class NovelDispComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  novel: any = null;
  selectedChapter: number = 1;
  chapterArray: number[] = [];
  chapterContent: string[] = [];
  chapterTitle: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private novelFetcher: NovelFetcherService, private http: HttpClient) { }

  ngOnInit() {
    // Subscribe to the novelName changes
    this.subscription = this.novelFetcher.novelName$.subscribe(novelName => {
      console.log('Novel name changed to:', novelName);
      this.resetComponent();

      if (novelName !== 'Test Novel') {
        this.fetchNovels(novelName);
      } else {
        console.log('No novels to fetch for the test case.');
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resetComponent() {
    this.chapterArray = [];
    this.selectedChapter = 1;
    this.chapterContent = [];
    this.chapterTitle = '';
    this.errorMessage = '';
  }

  async fetchNovels(novelName: string) {
    this.isLoading = true;
    try {
      const response = await fetch('https://noveluxe-b64a4-default-rtdb.asia-southeast1.firebasedatabase.app/novels-details/-OOS0dpTwrtJ89xOU7Wx.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const temp = await response.json();
      this.novel = temp[novelName];

      if (!this.novel) {
        throw new Error('Novel not found');
      }

      console.log('Novel data:', this.novel);

      // Generate chapter array based on chapter count
      this.generateChapterArray(this.novel.chapterCount);

      // Load the first chapter
      this.loadChapter(1);
    } catch (error : any) {
      console.error('Error fetching novels:', error);
      this.errorMessage = `Failed to load novel: ${error.message}`;
    } finally {
      this.isLoading = false;
    }
  }

  generateChapterArray(chapterCount: number) {
    this.chapterArray = Array.from({ length: chapterCount }, (_, i) => i + 1);
    console.log('Chapter array created:', this.chapterArray);
  }

  async loadChapter(chapterNumber: number) {
    this.isLoading = true;
    this.errorMessage = '';

    if (!this.novel || !this.novel.folderName) {
      this.errorMessage = 'No novel data available';
      this.isLoading = false;
      return;
    }

    const chapterUrl = `assets/novel/${this.novel.folderName}/chap${chapterNumber}.txt`;
    console.log('Fetching chapter from:', chapterUrl);

    try {
      const response = await fetch(chapterUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      console.log('Chapter data loaded:', data);
      const lines = data.split('\n');
      this.chapterTitle = lines[0] || `Chapter ${chapterNumber}`;
      this.chapterContent = lines.slice(1);
    } catch (error : any) {
      console.error('Error loading chapter:', error);
      this.errorMessage = `Failed to load chapter ${chapterNumber}: ${error.message || 'Connection error'}`;
    } finally {
      this.isLoading = false;
    }
  }

  changeChapter() {
    if (this.selectedChapter > 0 && this.selectedChapter <= (this.novel?.chapterCount || 0)) {
      this.loadChapter(this.selectedChapter);
    }
  }

  nextChapter() {
    if (this.selectedChapter < (this.novel?.chapterCount || 0)) {
      this.selectedChapter++;
      this.loadChapter(this.selectedChapter);
    }
  }

  previousChapter() {
    if (this.selectedChapter > 1) {
      this.selectedChapter--;
      this.loadChapter(this.selectedChapter);
    }
  }
}