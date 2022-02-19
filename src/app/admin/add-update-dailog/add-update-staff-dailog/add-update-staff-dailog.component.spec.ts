import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateStaffDailogComponent } from './add-update-staff-dailog.component';

describe('AddUpdateStaffDailogComponent', () => {
  let component: AddUpdateStaffDailogComponent;
  let fixture: ComponentFixture<AddUpdateStaffDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateStaffDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateStaffDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
