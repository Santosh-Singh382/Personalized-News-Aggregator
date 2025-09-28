import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerspectiveSwitcher } from './perspective-switcher';

describe('PerspectiveSwitcher', () => {
  let component: PerspectiveSwitcher;
  let fixture: ComponentFixture<PerspectiveSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerspectiveSwitcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerspectiveSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
