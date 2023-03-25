import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerUtils } from '../../utils/date-ranges-utils';
import { DateRangePickerComponent } from './date-range-picker.component';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateRangePickerComponent],
      imports: [NgbDropdownModule],
      providers: [DateRangePickerUtils]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
