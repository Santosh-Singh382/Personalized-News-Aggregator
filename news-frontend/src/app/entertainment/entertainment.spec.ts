import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entertainment } from './entertainment';

describe('Entertainment', () => {
  let component: Entertainment;
  let fixture: ComponentFixture<Entertainment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entertainment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Entertainment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
