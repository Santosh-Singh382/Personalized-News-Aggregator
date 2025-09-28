import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Poltics } from './poltics';

describe('Poltics', () => {
  let component: Poltics;
  let fixture: ComponentFixture<Poltics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Poltics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Poltics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
