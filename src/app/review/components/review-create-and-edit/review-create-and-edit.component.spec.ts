import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCreateAndEditComponent } from './review-create-and-edit.component';

describe('ReviewCreateAndEditComponent', () => {
  let component: ReviewCreateAndEditComponent;
  let fixture: ComponentFixture<ReviewCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
