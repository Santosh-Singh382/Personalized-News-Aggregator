import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashbosrd } from './admin-dashbosrd';

describe('AdminDashbosrd', () => {
  let component: AdminDashbosrd;
  let fixture: ComponentFixture<AdminDashbosrd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashbosrd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashbosrd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
