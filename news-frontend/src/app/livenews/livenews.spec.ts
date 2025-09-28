import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Livenews } from './livenews';

describe('Livenews', () => {
  let component: Livenews;
  let fixture: ComponentFixture<Livenews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Livenews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Livenews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
