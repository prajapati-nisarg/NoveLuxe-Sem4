import { TestBed } from '@angular/core/testing';

import { NovelFetcherService } from './novel-fetcher.service';

describe('NovelFetcherService', () => {
  let service: NovelFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
