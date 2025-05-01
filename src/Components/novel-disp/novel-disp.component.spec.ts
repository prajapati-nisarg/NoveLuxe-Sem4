import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelDispComponent } from './novel-disp.component';

describe('NovelDispComponent', () => {
  let component: NovelDispComponent;
  let fixture: ComponentFixture<NovelDispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovelDispComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
