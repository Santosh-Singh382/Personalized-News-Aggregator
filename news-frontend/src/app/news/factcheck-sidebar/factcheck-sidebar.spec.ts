import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactcheckSidebar } from './factcheck-sidebar';

describe('FactcheckSidebar', () => {
  let component: FactcheckSidebar;
  let fixture: ComponentFixture<FactcheckSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactcheckSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactcheckSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
