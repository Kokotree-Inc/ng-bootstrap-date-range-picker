import { Moment } from 'moment-mini';

export interface DateRangeChange {
  dateRange: string; // Key of DateRangeOptions will come here
  startDate: Moment;
  endDate: Moment;
}
