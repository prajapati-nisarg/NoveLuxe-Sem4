import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovelFetcherService {
  private novelNameSubject = new BehaviorSubject<string>('Test Novel');
  public novelName$ = this.novelNameSubject.asObservable();

  constructor() { }

  get novelName(): string {
    return this.novelNameSubject.value;
  }

  setNovelName(name: string) {
    this.novelNameSubject.next(String(name));
    console.log("Novel Name :", this.novelName);
  }
}