import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateReportsDailogComponent } from './add-update-reports-dailog.component';

describe('AddUpdateReportsDailogComponent', () => {
  let component: AddUpdateReportsDailogComponent;
  let fixture: ComponentFixture<AddUpdateReportsDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateReportsDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateReportsDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
