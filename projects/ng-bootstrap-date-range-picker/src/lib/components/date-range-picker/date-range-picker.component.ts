import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepicker, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'moment-mini';
import { DATE_RANGE_OPTIONS } from '../../constants/date-range-options';
import { DateRange } from '../../enums/date-range';
import { DateRangeChange } from '../../models/date-range-change';
import { DateRangePickerUtils } from '../../utils/date-ranges-utils';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {
  /**
   * The default date range option to show.
   * @default DATE_RANGE_OPTIONS.Last28Days
   */
  @Input() dateRangeKey = DATE_RANGE_OPTIONS.Last28Days;

  /**
   * The CSS class to apply to the "Apply" button.
   * @default 'btn-primary'
   */
  @Input() btnApplyClass = 'btn-primary';

  /**
   * The CSS class to apply to the date range picker.
   * @default ''
   */
  @Input() pickerCustomClass = '';

  /**
   * Emitted when the date range selection is changed.
   */
  @Output() readonly rangeChanged: EventEmitter<DateRangeChange> = new EventEmitter<DateRangeChange>();

  @ViewChild('dp') dateRangerPicker: NgbDatepicker | undefined; // Reference to the datepicker element
  @ViewChild(NgbDropdown) dropdown: NgbDropdown | undefined; // Reference to the dropdown element

  selectedDateRangeKey!: string;
  selectedDateRangeTempKey!: string;

  selectedRangeLabel!: string; // Selected date range label to display
  selectedRangeDateLabel!: string; // Selected date range with formatted date range to display
  selectedRangeTempLabel!: string; // Temporary selected date range label used before applying it
  selectedDateRange = this.dateRangeKey; // Currently selected date range

  hoveredDate: NgbDate | null = null; // Currently hovered date for the custom date range
  startNgbDate!: NgbDate; // Start date for the selected date range
  endNgbDate!: NgbDate | null; // End date for the selected date range, can be null in case of custom date range

  startDate!: Moment; // Moment object for start date
  endDate!: Moment; // Moment object for end date, can be null in case of custom date range

  dateRangeOptions: { key: string; value: string }[] = [];

  constructor(
    private dateRangePickerUtils: DateRangePickerUtils,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {
    this.dateRangeOptions = Object.entries(DateRange).map(([key, value]) => ({ key, value }));

    // Set the default date range option
    const [startDate, endDate] = this.dateRangePickerUtils.getDateRangeAsMoments(this.dateRangeKey);
    this.startNgbDate = this.dateRangePickerUtils.convertToNgbDate(startDate);
    this.endNgbDate = this.dateRangePickerUtils.convertToNgbDate(endDate);

    this.startDate = startDate;
    this.endDate = endDate;

    this.selectedRangeLabel = this.selectedRangeTempLabel = this.dateRangePickerUtils.getDateRangeFromKey(this.dateRangeKey);
    this.selectedRangeDateLabel = this.dateRangePickerUtils.getSelectedRangeDateLabel(startDate, endDate);
  }

  // onDateSelection(date: NgbDate) {
  //   if (!this.startNgbDate && !this.endNgbDate) {
  //     this.startNgbDate = date;
  //   } else if (this.startNgbDate && !this.endNgbDate && date && date.after(this.startNgbDate)) {
  //     this.endNgbDate = date;
  //   } else {
  //     this.endNgbDate = null;
  //     this.startNgbDate = date;
  //   }

  //   this.setRange(DATE_RANGE_OPTIONS.Custom);
  // }

  isHovered(date: NgbDate) {
    // Returns true if the start date, hovered date, and selected date satisfy the conditions for a range.
    return this.startNgbDate && !this.endNgbDate && this.hoveredDate && date.after(this.startNgbDate) && date.before(this.hoveredDate);
  }

  onDateSelection(date: NgbDate) {
    // If both the start and end dates are not set, set the start date to the selected date
    if (!this.startNgbDate && !this.endNgbDate) {
      this.startNgbDate = date;
    }
    // If the start date is set, but not the end date, and the selected date is after the start date, set the end date to the selected date
    else if (this.startNgbDate && !this.endNgbDate && date && date.after(this.startNgbDate)) {
      this.endNgbDate = date;
    }
    // Reset the selected dates if both the start and end dates are set, or if the selected date is before the start date.
    else {
      this.endNgbDate = null;
      this.startNgbDate = date;
    }

    // Update the date range to "Custom" and emit the rangeChanged event
    this.setRange(DATE_RANGE_OPTIONS.Custom);
  }

  isInside(date: NgbDate) {
    // Returns true if the end date is set, and the selected date is after the start date and before the end date
    return this.endNgbDate && date.after(this.startNgbDate) && date.before(this.endNgbDate);
  }

  isRange(date: NgbDate) {
    // Returns true if the selected date is the start date, the end date, inside the range, or hovered over
    return (
      date.equals(this.startNgbDate) || (this.endNgbDate && date.equals(this.endNgbDate)) || this.isInside(date) || this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    // Parses the input string and returns a NgbDate object if the input is valid and within the calendar range
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  changeDateRange(rangeKey: string, event: Event) {
    // Stops the event from propagating and updates the date range
    event.stopPropagation();
    this.setRange(rangeKey);
  }

  cancel() {
    // Closes the dropdown menu
    this.dateRangePickerUtils.closeDropDown(this.dropdown);
  }

  isActiveRange(range: string) {
    return this.selectedRangeTempLabel === range;
  }

  apply() {
    this.selectedDateRangeKey = this.selectedDateRangeTempKey;

    // Update the selected range label
    this.selectedRangeLabel = this.selectedRangeTempLabel;

    // Calculate the selected range date label based on the selected date range
    this.selectedRangeDateLabel = this.dateRangePickerUtils.getSelectedRangeDateLabel(this.startDate, this.endDate);

    // Emit the range changed event with the selected range date range
    this.emitRangeChanged();

    // Close the date range picker dropdown
    this.dateRangePickerUtils.closeDropDown(this.dropdown);
  }

  private setRange(dateRangeKey: string) {
    const dateRange = this.dateRangePickerUtils.getDateRangeFromKey(dateRangeKey);

    this.selectedDateRangeTempKey = dateRangeKey;

    // Check if the selected range is 'Custom'
    if (dateRangeKey === DATE_RANGE_OPTIONS.Custom) {
      // If the user has selected both the start and end date
      if (this.startNgbDate && this.endNgbDate) {
        // Set the selected range label to 'Custom'
        this.selectedRangeTempLabel = dateRange;
      }
    } else {
      // Get the start and end moments of the selected range
      const [startDate, endDate] = this.dateRangePickerUtils.getDateRangeAsMoments(dateRangeKey);

      // Convert start and end moments to NgbDate
      this.startNgbDate = this.dateRangePickerUtils.convertToNgbDate(startDate);
      this.endNgbDate = this.dateRangePickerUtils.convertToNgbDate(endDate);

      // Set the start and end dates
      this.startDate = startDate;
      this.endDate = endDate;

      // Set the selected range label
      this.selectedRangeTempLabel = dateRange;

      // Focus on the start date in the date picker
      this.dateRangePickerUtils.focusDateInPicker(this.dateRangerPicker, this.startNgbDate);
    }
  }

  private emitRangeChanged() {
    // Emit event with selected date range and dates
    const dateRangeChange: DateRangeChange = {
      dateRange: this.selectedDateRangeKey,
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.rangeChanged.emit(dateRangeChange);
  }
}
