import { Injectable } from '@angular/core';
import { NgbDate, NgbDatepicker, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import moment from 'moment-mini';
import { DateRange } from '../enums/date-range';
import { DateRangeChange } from '../models/date-range-change';

import { DefaultDateRanges } from '../models/default-date-ranges';

/**
 * A utility class for the date range picker component
 */
@Injectable()
export class DateRangePickerUtils {
  constructor() {}

  /**
   * Returns the start and end dates of a given date range key as moment objects.
   *
   * @param dateRangeKey The string value representing the selected date range key.
   *
   * @returns An array of two moment.Moment objects representing the start and end dates of the selected date range.
   */
  getDateRangeAsMoments(dateRangeKey: string): [moment.Moment, moment.Moment] {
    const dateRanges = this.getDefaultDateRanges();
    const [startDate, endDate] = dateRanges[dateRangeKey];
    return [moment(startDate), moment(endDate)];
  }

  /**
   * Returns the corresponding DateRange enum value based on a given string key.
   *
   * @param rangeKey The string value representing the selected date range key.
   *
   * @returns The corresponding DateRange enum value if found, or DateRange.Last28Days as a default.
   */
  getDateRangeFromKey(rangeKey: string): DateRange {
    const range = DateRange[rangeKey as keyof typeof DateRange];
    return range !== undefined ? range : DateRange.Last28Days;
  }

  /**
   * Returns a formatted label for the selected date range, based on the provided start and end moment objects.
   *
   * @param fromMoment The moment object representing the start date of the selected date range.
   * @param toMoment The moment object representing the end date of the selected date range.
   *
   * @returns A formatted string label for the selected date range.
   */
  getSelectedRangeDateLabel(fromMoment: moment.Moment, toMoment: moment.Moment): string {
    const dateFormat = 'DD MMM';
    const dateFormatWithYear = `${dateFormat} YYYY`;

    if (fromMoment.year() === toMoment.year()) {
      return `${fromMoment.format(dateFormat)}-${toMoment.format(dateFormatWithYear)}`;
    } else {
      return `${fromMoment.format(dateFormatWithYear)}-${toMoment.format(dateFormatWithYear)}`;
    }
  }

  /**
   * Focuses on a specific date in a NgbDatepicker component.
   *
   * @param dateRangerPicker The NgbDatepicker component to focus on.
   * @param fromDate The NgbDate object representing the date to focus on.
   *
   * @returns None.
   */
  focusDateInPicker(dateRangerPicker: NgbDatepicker | undefined, fromDate: NgbDate) {
    dateRangerPicker?.focusDate(fromDate);
  }

  /**
   * Converts a moment object to a NgbDate object.
   *
   * @param momentObj The moment object to convert.
   *
   * @returns The corresponding NgbDate object.
   */
  convertToNgbDate(momentObj: moment.Moment): NgbDate {
    return new NgbDate(momentObj.year(), momentObj.month() + 1, momentObj.date());
  }

  /**
   * Closes the NgbDropdown component if it is open.
   *
   * @param dropdown The NgbDropdown component to close.
   *
   * @returns None.
   */
  closeDropDown(dropdown: NgbDropdown | undefined) {
    dropdown?.close();
  }

  /**
   * Returns an object containing default date ranges for the date range picker.
   *
   * @returns An object containing default date ranges, with the keys being the DateRange enum values and the values being arrays of start and end dates as strings.
   */
  getDefaultDateRanges(): DefaultDateRanges {
    const now = moment();
    const getNowCloned = (m: moment.Moment) => m.clone();
    const dateRanges: DefaultDateRanges = {};

    for (const rangeKey of Object.keys(DateRange)) {
      const range = DateRange[rangeKey as keyof typeof DateRange];
      switch (range) {
        case DateRange.Today:
          dateRanges[rangeKey] = [getNowCloned(now).startOf('day'), getNowCloned(now).endOf('day')];
          break;
        case DateRange.Yesterday:
          dateRanges[rangeKey] = [getNowCloned(now).subtract(1, 'day').startOf('day'), getNowCloned(now).subtract(1, 'day').endOf('day')];
          break;
        case DateRange.Last7Days:
          dateRanges[rangeKey] = [getNowCloned(now).subtract(6, 'day').startOf('day'), getNowCloned(now)];
          break;
        case DateRange.Last28Days:
          dateRanges[rangeKey] = [getNowCloned(now).subtract(27, 'day').startOf('day'), getNowCloned(now)];
          break;
        case DateRange.Last30Days:
          dateRanges[rangeKey] = [getNowCloned(now).subtract(29, 'day').startOf('day'), getNowCloned(now)];
          break;
        case DateRange.Last90Days:
          dateRanges[rangeKey] = [getNowCloned(now).subtract(89, 'day').startOf('day'), getNowCloned(now)];
          break;
        case DateRange.ThisMonth:
          dateRanges[rangeKey] = [getNowCloned(now).startOf('month'), getNowCloned(now).endOf('month')];
          break;
        case DateRange.LastMonth:
          dateRanges[rangeKey] = [
            getNowCloned(now).subtract(1, 'month').startOf('month'),
            getNowCloned(now).subtract(1, 'month').endOf('month')
          ];
          break;
        case DateRange.Last12Months:
          dateRanges[rangeKey] = [getNowCloned(now).subtract(11, 'month').startOf('month'), getNowCloned(now)];
          break;
        case DateRange.LastCalendarYear:
          dateRanges[rangeKey] = [
            getNowCloned(now).subtract(1, 'year').startOf('year'),
            getNowCloned(now).subtract(1, 'year').endOf('year')
          ];
          break;
        case DateRange.ThisYear:
          dateRanges[rangeKey] = [getNowCloned(now).startOf('year'), getNowCloned(now)];
          break;
        case DateRange.Custom:
          dateRanges[rangeKey] = [getNowCloned(now), getNowCloned(now)];
          break;
      }
    }
    return dateRanges;
  }

  // /**
  //  * Returns a string representation of a DateRangeChange object.
  //  *
  //  * @param dateRangeChange The DateRangeChange object to convert to a string.
  //  * @returns A string representing the DateRangeChange object.
  //  */
  // dateRangeChangeToString(dateRangeChange: DateRangeChange): string {
  //   return `${dateRangeChange.dateRange}, ${dateRangeChange.startDate.format('YYYY-MM-DD')} to ${dateRangeChange.endDate.format(
  //     'YYYY-MM-DD'
  //   )}`;
  // }
}
