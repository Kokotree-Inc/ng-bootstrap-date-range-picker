import { TestBed } from '@angular/core/testing';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment-mini';
import { DATE_RANGE_OPTIONS } from '../constants/date-range-options';
import { DateRange } from '../enums/date-range';
import { DateRangePickerUtils } from './date-ranges-utils';

describe('DateRangePickerUtils', () => {
  let utils: DateRangePickerUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateRangePickerUtils]
    });

    utils = TestBed.inject(DateRangePickerUtils);
  });

  it('should create', () => {
    expect(utils).toBeTruthy();
  });

  describe('getDateRangeAsMoments', () => {
    it('should return an array of two moment objects', () => {
      const result = utils.getDateRangeAsMoments(DATE_RANGE_OPTIONS.Last30Days);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(result[0].isValid()).toBe(true);
      expect(result[1].isValid()).toBe(true);
    });
  });

  describe('getDateRangeFromKey', () => {
    it('should return the corresponding DateRange enum value', () => {
      const result = utils.getDateRangeFromKey('Last30Days');
      expect(result).toBe(DateRange.Last30Days);
    });

    it('should return the default value if the key is not found', () => {
      const result = utils.getDateRangeFromKey('Invalid');
      expect(result).toBe(DateRange.Last28Days);
    });
  });

  describe('getSelectedRangeDateLabel', () => {
    it('should return a formatted string label', () => {
      const from = new Date(2022, 2, 1);
      const to = new Date(2022, 2, 10);
      const fromMoment = moment(from);
      const toMoment = moment(to);
      const result = utils.getSelectedRangeDateLabel(fromMoment, toMoment);
      expect(result).toBe('01 Mar-10 Mar 2022');
    });
  });

  describe('focusDateInPicker', () => {
    it('should call focusDate on NgbDatepicker component', () => {
      const datepicker: any = {
        focusDate: jasmine.createSpy('focusDate')
      };
      const date = new NgbDate(2022, 3, 1);
      utils.focusDateInPicker(datepicker, date);
      expect(datepicker.focusDate).toHaveBeenCalledWith(date);
    });

    it('should not call focusDate if NgbDatepicker component is undefined', () => {
      const datepicker: any = undefined;
      const date = new NgbDate(2022, 3, 1);
      utils.focusDateInPicker(datepicker, date);
      expect(datepicker).toBeUndefined();
    });
  });

  describe('convertToNgbDate', () => {
    it('should return the corresponding NgbDate object', () => {
      const momentObj = moment('2022-03-01', 'YYYY-MM-DD');
      const result = utils.convertToNgbDate(momentObj);
      expect(result instanceof NgbDate).toBe(true);
      expect(result.year).toBe(momentObj.year());
      expect(result.month).toBe(momentObj.month() + 1);
      expect(result.day).toBe(momentObj.date());
    });
  });

  describe('closeDropDown', () => {
    it('should call close on NgbDropdown component', () => {
      const dropdown: any = {
        close: jasmine.createSpy('close')
      };
      utils.closeDropDown(dropdown);
      expect(dropdown.close).toHaveBeenCalled();
    });

    it('should not call close if NgbDropdown component is undefined', () => {
      const dropdown = jasmine.createSpyObj('NgbDropdown', ['close']);
      utils.closeDropDown(undefined);
      expect(dropdown.close).not.toHaveBeenCalled();
    });
  });

  describe('getDefaultDateRanges', () => {
    it('should return an object with default date ranges', () => {
      const result = utils.getDefaultDateRanges();
      expect(Object.keys(result).length).toBeGreaterThan(0);

      const rangeKeys = Object.keys(DateRange);
      for (const rangeKey of rangeKeys) {
        const range = DateRange[rangeKey as keyof typeof DateRange];
        const [startDate, endDate] = result[rangeKey];
        expect(moment(startDate).isValid()).toBeTrue();
        expect(moment(endDate).isValid()).toBeTrue();

        switch (range) {
          case DateRange.Today:
            expect(moment(startDate).isSame(moment(), 'day')).toBeTrue();
            expect(moment(endDate).isSame(moment(), 'day')).toBeTrue();
            break;
          case DateRange.Yesterday:
            expect(moment(startDate).isSame(moment().subtract(1, 'day'), 'day')).toBeTrue();
            expect(moment(endDate).isSame(moment().subtract(1, 'day'), 'day')).toBeTrue();
            break;
          case DateRange.Last7Days:
            expect(moment(endDate).isSame(moment(), 'day')).toBeTrue();
            expect(moment(endDate).diff(moment(startDate), 'days')).toBe(6);
            break;
          case DateRange.Last28Days:
            expect(moment(endDate).isSame(moment(), 'day')).toBeTrue();
            expect(moment(endDate).diff(moment(startDate), 'days')).toBe(27);
            break;
          case DateRange.Last30Days:
            expect(moment(endDate).isSame(moment(), 'day')).toBeTrue();
            expect(moment(endDate).diff(moment(startDate), 'days')).toBe(29);
            break;
          case DateRange.Last90Days:
            expect(moment(endDate).isSame(moment(), 'day')).toBeTrue();
            expect(moment(endDate).diff(moment(startDate), 'days')).toBe(89);
            break;
          case DateRange.ThisMonth:
            expect(moment(startDate).isSame(moment().startOf('month'), 'day')).toBeTrue();
            expect(moment(endDate).isSame(moment().endOf('month'), 'day')).toBeTrue();
            break;
          case DateRange.LastMonth:
            expect(moment(startDate).isSame(moment().subtract(1, 'month').startOf('month'), 'day')).toBeTrue();
            expect(moment(endDate).isSame(moment().subtract(1, 'month').endOf('month'), 'day')).toBeTrue();
            break;
          case DateRange.Last12Months:
            expect(moment(endDate).isSame(moment(), 'day')).toBeTrue();
            expect(moment(endDate).diff(moment(startDate), 'months')).toBe(11);
            break;
          case DateRange.LastCalendarYear:
            expect(moment(startDate).isSame(moment().subtract(1, 'year').startOf('year'), 'day')).toBeTrue();
            expect(moment(endDate).isSame(moment().subtract(1, 'year').endOf('year'), 'day')).toBeTrue();
            break;
          case DateRange.ThisYear:
            expect(moment(startDate).isSame(moment().startOf('year'), 'day')).toBeTrue();
            expect(moment(endDate).isSame(moment(), 'day')).toBeTrue();
            break;
          case DateRange.Custom:
            expect(moment(startDate).isSame(moment(), 'day')).toBeTrue();
            expect(moment(endDate).isSame(moment(), 'day')).toBeTrue();
            break;
          default:
            fail(`Unknown date range: ${range}`);
        }
      }
    });
  });
});
