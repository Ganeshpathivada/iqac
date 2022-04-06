import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateRankDailogComponent } from './add-update-rank-dailog.component';

describe('AddUpdateRankDailogComponent', () => {
  let component: AddUpdateRankDailogComponent;
  let fixture: ComponentFixture<AddUpdateRankDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateRankDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateRankDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
